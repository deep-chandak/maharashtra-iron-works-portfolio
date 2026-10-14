"""
Builds a SIMULATED transaction history for Maharashtra Iron Works.

Input : product_sheet.csv - the product sheet exported as CSV (names, prices, current stock)
Output: products.csv      (product sheet + simulated cost, supplier, lead time, reorder level)
        transactions.csv  (simulated stock IN / OUT history, staff: Rahul and Amit)

Everything about cost, suppliers, sales and restocks is simulated.
Final stock after replaying the history equals current_stock in the product sheet.
Run:  python make_simulated_data.py
"""

import numpy as np
import pandas as pd
from datetime import date, datetime, timedelta

SRC = "product_sheet.csv"          # your exported product sheet (do not upload it if it contains private links)
OUT = "./"                           # files are written next to the script
rng = np.random.default_rng(2026)          # fixed seed = same data every run

START, END = date(2026, 5, 1), date(2026, 10, 5)
CLOSED = {date(2026, 8, 15), date(2026, 10, 2)}      # holidays; shop closed on Sundays too

# ------------------------------------------------------------------ products
src = pd.read_csv(SRC)
src.columns = [c.strip() for c in src.columns]

prod = pd.DataFrame({
    "product_id":    src["Product ID"].astype(str).str.strip(),
    "product_code":  src["product code"].astype(str).str.strip(),
    "product_name":  src["product name"].astype(str).str.strip(),
    "brand":         src["brand"],
    "category":      src["category"],
    "material":      src["material"],
    "size":          src["size"],
    "rack":          src["Rack"],
    "selling_price": pd.to_numeric(src["selling price"]),
    "current_stock": pd.to_numeric(src["current stock"]).astype(int),
})

markup = {  # simulated gross markup over cost, by category
    "Fasteners": .32, "Hand Tools": .28, "Power Tools": .17, "Structural Steel": .09,
    "Welding Consumables": .20, "Welding": .15, "Electrical": .23, "Safety": .30,
    "Abrasives": .26, "Cutting Tools": .27, "Pipes & Fittings": .22, "Measuring Tools": .25,
    "Clamps": .28, "Door Hardware": .30, "Security Hardware": .29,
}
lead = {"Structural Steel": (3, 5), "Power Tools": (5, 10), "Welding": (6, 12)}
reorder = {"Fasteners": (15, 40), "Abrasives": (8, 20), "Welding Consumables": (8, 20),
           "Power Tools": (2, 5), "Welding": (1, 3), "Structural Steel": (5, 12),
           "Measuring Tools": (2, 6)}

brands = sorted(prod["brand"].unique())
supplier_of = {b: f"Supplier {i % 6 + 1}" for i, b in enumerate(brands)}

def cost_of(row):
    m = markup.get(row.category, .25) + rng.normal(0, .03)
    return round(row.selling_price / (1 + max(m, .05)), 2)

prod["cost_price"] = prod.apply(cost_of, axis=1)
prod["supplier"] = prod["brand"].map(supplier_of)
prod["lead_time_days"] = [int(rng.integers(*(lead.get(c, (2, 7))[0], lead.get(c, (2, 7))[1] + 1)))
                          for c in prod["category"]]
prod["reorder_level"] = [int(rng.integers(*(reorder.get(c, (5, 15))[0], reorder.get(c, (5, 15))[1] + 1)))
                         for c in prod["category"]]

# ------------------------------------------------------------ demand weights
cat_w = {"Fasteners": 1.3, "Abrasives": 1.2, "Hand Tools": 1.0, "Welding Consumables": 1.6,
         "Electrical": 1.1, "Cutting Tools": 1.0, "Safety": .9, "Pipes & Fittings": .9,
         "Measuring Tools": .6, "Clamps": .7, "Door Hardware": .6, "Structural Steel": .9,
         "Security Hardware": .5, "Power Tools": .6, "Welding": .25}
w = np.array([cat_w.get(c, .8) for c in prod["category"]]) * rng.lognormal(0, 1.3, len(prod))
dead = rng.choice(len(prod), size=int(.12 * len(prod)), replace=False)   # items that never sell
w[dead] = 0
base_w = w
monsoon_cats = {"Structural Steel", "Pipes & Fittings", "Fasteners"}

def qty_for(price, cat):
    if cat == "Structural Steel":
        q = rng.choice([1, 1, 2, 3, 5])
    elif price <= 5:
        q = rng.choice([5, 10, 10, 20, 25])
    elif price <= 20:
        q = rng.choice([2, 5, 5, 10, 10, 20])
    elif price <= 60:
        q = rng.choice([2, 5, 5, 10])
    elif price <= 200:
        q = rng.choice([1, 1, 2, 2, 5])
    elif price <= 1000:
        q = rng.choice([1, 1, 1, 2, 3])
    else:
        q = rng.choice([1, 1, 1, 2])
    if rng.random() < .06:                  # occasional contractor bulk order
        q *= int(rng.integers(2, 5))
    return int(q)

hour_w = {9: .5, 10: 1, 11: 1.2, 12: .9, 13: .6, 14: .8, 15: 1, 16: 1.1, 17: 1.2, 18: 1, 19: .5}
hours = list(hour_w)
hp = np.array(list(hour_w.values())); hp = hp / hp.sum()
wk = {0: 1.0, 1: 1.0, 2: .95, 3: 1.0, 4: 1.05, 5: 1.3}   # Monday..Saturday

def stamp(d, hour=None):
    h = int(rng.choice(hours, p=hp)) if hour is None else hour
    return datetime(d.year, d.month, d.day, h, int(rng.integers(0, 60)), int(rng.integers(0, 60)))

days = [START + timedelta(n) for n in range((END - START).days + 1)]
open_days = [d for d in days if d.weekday() != 6 and d not in CLOSED]

# ------------------------------------------------------------------- sales
events = {pid: [] for pid in prod["product_id"]}     # pid -> list of [time, type, qty, staff, source]
idx = {pid: i for i, pid in enumerate(prod["product_id"])}
ids = prod["product_id"].tolist()
price = prod["selling_price"].tolist()
cats = prod["category"].tolist()

for d in open_days:
    progress = (d - START).days / (END - START).days
    lam = 7.0 * wk[d.weekday()] * (1 + .25 * progress) * (.9 if d.month in (6, 7, 8, 9) else 1)
    ww = base_w.copy()
    if d.month in (6, 7, 8):
        ww = ww * np.array([.7 if c in monsoon_cats else 1 for c in cats])
    p = ww / ww.sum()
    for _ in range(rng.poisson(lam)):
        i = int(rng.choice(len(ids), p=p))
        t = stamp(d)
        if t.hour < 14:
            staff = "Amit" if rng.random() < .6 else "Rahul"
        else:
            staff = "Rahul" if rng.random() < .6 else "Amit"
        events[ids[i]].append([t, "OUT", qty_for(price[i], cats[i]), staff, "WORKER"])

# admin corrections (damaged / miscounted items), no staff name
sellers = [pid for pid in ids if events[pid]]
for _ in range(25):
    pid = sellers[int(rng.integers(len(sellers)))]
    events[pid].append([stamp(open_days[int(rng.integers(len(open_days)))]), "OUT",
                        int(rng.integers(1, 4)), "", "ADMIN"])

# ---------------------------------------------------------------- restocks
cur = dict(zip(prod["product_id"], prod["current_stock"]))
for pid in ids:
    total_out = sum(e[2] for e in events[pid] if e[1] == "OUT")
    if total_out == 0:
        continue
    total_in = max(1, int(round(total_out * rng.uniform(.9, 1.1))))
    batch = max(cur[pid], 10) * rng.uniform(.8, 1.6)
    n = int(np.clip(round(total_in / batch), 1, 12))
    cuts = np.sort(rng.integers(0, total_in + 1, n - 1)) if n > 1 else np.array([], dtype=int)
    parts = np.diff(np.concatenate([[0], cuts, [total_in]]))
    for q in parts:
        if q > 0:
            events[pid].append([stamp(open_days[int(rng.integers(len(open_days)))], int(rng.integers(9, 13))),
                                "IN", int(q), "", "ADMIN"])

# ----------------------------------------- make history end at current_stock
# walk backwards from today's stock; shrink any restock that would make stock negative earlier
opening = {}
for pid in ids:
    ev = sorted(events[pid], key=lambda e: e[0])
    running = cur[pid]
    keep = []
    for e in reversed(ev):
        if e[1] == "OUT":
            running += e[2]
            keep.append(e)
        else:
            q = max(0, running - int(rng.integers(0, 4)))
            q = min(q, e[2])
            if q > 0:
                e[2] = q
                running -= q
                keep.append(e)
    events[pid] = list(reversed(keep))
    opening[pid] = running
prod["opening_stock_1_may"] = prod["product_id"].map(opening)

# ------------------------------------------------------------------ output
name = dict(zip(prod["product_id"], prod["product_name"]))
rows = [[e[0], pid, name[pid], e[1], e[2], e[3], e[4]] for pid in ids for e in events[pid]]
tx = pd.DataFrame(rows, columns=["txn_time", "product_id", "product_name", "type", "quantity", "staff", "source"])
tx = tx.sort_values("txn_time").reset_index(drop=True)
tx.insert(0, "txn_id", tx.index + 1)
tx["txn_time"] = tx["txn_time"].dt.strftime("%Y-%m-%d %H:%M:%S")

prod.to_csv(OUT + "products.csv", index=False)
tx.to_csv(OUT + "transactions.csv", index=False)
print("products:", len(prod), "| transactions:", len(tx))
