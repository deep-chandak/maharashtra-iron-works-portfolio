const PRODUCT_SHEET = "product";
const TRANSACTION_SHEET = "transaction";


/* =====================================================
   WEB APP
===================================================== */

function doGet(e) {

  const page =
    e &&
    e.parameter &&
    e.parameter.page
      ? String(e.parameter.page).trim()
      : "";

  /* ADMIN PAGE */
  if (page === "admin") {

    return HtmlService
      .createHtmlOutputFromFile("Admin")
      .setTitle(
        "Maharashtra Iron Works - Inventory"
      );
  }


  /* PRODUCT / QR PAGE */

  const productId =
    e &&
    e.parameter &&
    e.parameter.id
      ? String(e.parameter.id).trim()
      : "";

  let product = null;

  if (productId) {
    product = getProduct(productId);
  }


  const template =
    HtmlService
      .createTemplateFromFile("Index");


  template.product =
    product;

  template.productId =
    productId;


  return template
    .evaluate()
    .setTitle(
      product
        ? (
            product.productName ||
            product.product_name ||
            "Product"
          )
        : "Product Not Found"
    );

}


/* =====================================================
   PRODUCT SHEET
===================================================== */

function getProductSheet_() {

  const sheet =
    SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(
        PRODUCT_SHEET
      );

  if (!sheet) {

    throw new Error(
      'Sheet "' +
      PRODUCT_SHEET +
      '" not found.'
    );

  }

  return sheet;

}


/* =====================================================
   GET ALL PRODUCTS
===================================================== */

function getAllProducts() {

  const sheet =
    getProductSheet_();

  const lastRow =
    sheet.getLastRow();


  if (lastRow < 2) {
    return [];
  }


  const values =
    sheet
      .getRange(
        2,
        1,
        lastRow - 1,
        13
      )
      .getValues();


  const products = [];


  values.forEach(function(row) {

    const empty =
      row.every(function(value) {

        return (
          value === "" ||
          value === null
        );

      });


    if (empty) {
      return;
    }


    products.push(
      makeProductObject_(row)
    );

  });


  return products;

}


/* =====================================================
   PRODUCT OBJECT
===================================================== */

function makeProductObject_(row) {

  const productId =
    row[0] !== undefined
      ? row[0]
      : "";

  const productCode =
    row[1] !== undefined
      ? row[1]
      : "";

  const productName =
    row[2] !== undefined
      ? row[2]
      : "";

  const brand =
    row[3] !== undefined
      ? row[3]
      : "";

  const category =
    row[4] !== undefined
      ? row[4]
      : "";

  const imageUrl =
    row[5] !== undefined
      ? row[5]
      : "";

  const sellingPrice =
    row[6] !== undefined
      ? row[6]
      : "";

  const material =
    row[7] !== undefined
      ? row[7]
      : "";

  const size =
    row[8] !== undefined
      ? row[8]
      : "";

  const rack =
    row[9] !== undefined
      ? row[9]
      : "";

  const currentStock =
    Number(row[10]) || 0;

  const qrUrl =
    row[11] !== undefined
      ? row[11]
      : "";

  const qrCode =
    row[12] !== undefined
      ? row[12]
      : "";


  return {

    /* Standard names */

    productId:
      productId,

    productCode:
      productCode,

    productName:
      productName,

    brand:
      brand,

    category:
      category,

    imageUrl:
      imageUrl,

    sellingPrice:
      sellingPrice,

    material:
      material,

    size:
      size,

    rack:
      rack,

    currentStock:
      currentStock,

    qrUrl:
      qrUrl,

    qrCode:
      qrCode,


    /* Index.html compatibility */

    product_id:
      productId,

    product_code:
      productCode,

    product_name:
      productName,

    image_url:
      imageUrl,

    selling_price:
      sellingPrice,

    current_stock:
      currentStock,

    qr_url:
      qrUrl,

    qr_code:
      qrCode,


    /* Sheet header compatibility */

    "Product ID":
      productId,

    "product code":
      productCode,

    "product name":
      productName,

    "brand":
      brand,

    "category":
      category,

    "image url":
      imageUrl,

    "selling price":
      sellingPrice,

    "material":
      material,

    "size":
      size,

    "Rack":
      rack,

    "current stock":
      currentStock,

    "QR url":
      qrUrl,

    "qr code":
      qrCode

  };

}


/* =====================================================
   GET ONE PRODUCT
   FAST DIRECT LOOKUP
===================================================== */

function getProduct(productId) {

  if (!productId) {
    return null;
  }


  const sheet =
    getProductSheet_();


  const lastRow =
    sheet.getLastRow();


  if (lastRow < 2) {
    return null;
  }


  const wanted =
    String(productId)
      .trim()
      .toUpperCase();


  const values =
    sheet
      .getRange(
        2,
        1,
        lastRow - 1,
        13
      )
      .getValues();


  for (
    let i = 0;
    i < values.length;
    i++
  ) {

    const id =
      String(
        values[i][0] || ""
      )
      .trim()
      .toUpperCase();


    const code =
      String(
        values[i][1] || ""
      )
      .trim()
      .toUpperCase();


    if (
      id === wanted ||
      code === wanted
    ) {

      return makeProductObject_(
        values[i]
      );

    }

  }


  return null;

}


/* =====================================================
   FIND PRODUCT ROW
===================================================== */

function findProductRow_(productId) {

  const sheet =
    getProductSheet_();


  const lastRow =
    sheet.getLastRow();


  if (lastRow < 2) {
    return null;
  }


  const wanted =
    String(productId)
      .trim()
      .toUpperCase();


  /*
    Read Product ID and Product Code
    together in one operation.
  */

  const values =
    sheet
      .getRange(
        2,
        1,
        lastRow - 1,
        2
      )
      .getDisplayValues();


  for (
    let i = 0;
    i < values.length;
    i++
  ) {

    const id =
      String(
        values[i][0] || ""
      )
      .trim()
      .toUpperCase();


    const code =
      String(
        values[i][1] || ""
      )
      .trim()
      .toUpperCase();


    if (
      id === wanted ||
      code === wanted
    ) {

      return {

        sheet:
          sheet,

        row:
          i + 2

      };

    }

  }


  return null;

}


/* =====================================================
   ADMIN ADD STOCK
   NO NAME REQUIRED
   SOURCE = ADMIN
===================================================== */

function addStock(
  productId,
  quantity
) {

  return updateStock_(
    productId,
    quantity,
    "IN",
    "",
    "ADMIN"
  );

}


/* =====================================================
   ADMIN REMOVE STOCK
   NO NAME REQUIRED
   SOURCE = ADMIN
===================================================== */

function removeStock(
  productId,
  quantity
) {

  return updateStock_(
    productId,
    quantity,
    "OUT",
    "",
    "ADMIN"
  );

}


/* =====================================================
   WORKER ADD STOCK
   NO NAME REQUIRED
   SOURCE = WORKER
===================================================== */

function workerAddStock(
  productId,
  quantity
) {

  return updateStock_(
    productId,
    quantity,
    "IN",
    "",
    "WORKER"
  );

}


/* =====================================================
   SELL PRODUCT
   STAFF NAME REQUIRED
   SOURCE = WORKER
===================================================== */

function sellProduct(
  productId,
  quantity,
  staffName
) {

  staffName =
    String(
      staffName || ""
    ).trim();


  if (!staffName) {

    throw new Error(
      "Please enter staff name."
    );

  }


  return updateStock_(
    productId,
    quantity,
    "OUT",
    staffName,
    "WORKER"
  );

}


/* =====================================================
   FAST STOCK UPDATE
===================================================== */

function updateStock_(
  productId,
  quantity,
  type,
  staffName,
  source
) {

  quantity =
    Number(quantity);


  if (
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {

    throw new Error(
      "Please enter a valid whole number."
    );

  }


  /*
    Protect simultaneous stock updates.
  */

  const lock =
    LockService.getScriptLock();


  if (!lock.tryLock(5000)) {

    throw new Error(
      "Another stock update is running. Please try again."
    );

  }


  try {

    const found =
      findProductRow_(
        productId
      );


    if (!found) {

      throw new Error(
        "Product not found: " +
        productId
      );

    }


    const sheet =
      found.sheet;

    const row =
      found.row;


    /*
      Read A:K ONCE.

      This gives us:
      Product ID
      Product Name
      Current Stock

      instead of doing multiple
      separate Spreadsheet reads.
    */

    const data =
      sheet
        .getRange(
          row,
          1,
          1,
          11
        )
        .getValues()[0];


    const actualProductId =
      data[0];

    const productName =
      data[2];

    const oldStock =
      Number(data[10]) || 0;


    let newStock;


    if (type === "IN") {

      newStock =
        oldStock + quantity;

    }

    else {

      if (
        quantity >
        oldStock
      ) {

        throw new Error(
          "Not enough stock. Available: " +
          oldStock
        );

      }


      newStock =
        oldStock - quantity;

    }


    /*
      ONLY update K.
    */

    sheet
      .getRange(
        row,
        11
      )
      .setValue(
        newStock
      );


    /*
      Record transaction.
    */

    recordTransaction_(
      actualProductId,
      productName,
      type,
      quantity,
      staffName,
      source
    );


    return {

      success:
        true,

      productId:
        actualProductId,

      oldStock:
        oldStock,

      quantity:
        quantity,

      newStock:
        newStock,

      type:
        type,

      staff:
        staffName,

      source:
        source

    };

  }

  finally {

    lock.releaseLock();

  }

}


/* =====================================================
   TRANSACTION SHEET
===================================================== */

function recordTransaction_(
  productId,
  productName,
  type,
  quantity,
  staff,
  source
) {

  const ss =
    SpreadsheetApp
      .getActiveSpreadsheet();


  let sheet =
    ss.getSheetByName(
      TRANSACTION_SHEET
    );


  if (!sheet) {

    sheet =
      ss.insertSheet(
        TRANSACTION_SHEET
      );

  }


  /*
    Add header if sheet is empty.
  */

  if (
    sheet.getLastRow() === 0
  ) {

    sheet
      .getRange(
        1,
        1,
        1,
        7
      )
      .setValues([[
        "Timestamp",
        "product id",
        "product name",
        "type",
        "quantity",
        "staff",
        "Source"
      ]]);

  }


  /*
    If the existing transaction sheet
    has the old 6-column structure,
    add Source as column G.
  */

  if (
    sheet.getRange(1, 7).getValue() === ""
  ) {

    sheet
      .getRange(1, 7)
      .setValue("Source");

  }


  /*
    One write operation.
  */

  sheet
    .getRange(
      sheet.getLastRow() + 1,
      1,
      1,
      7
    )
    .setValues([[
      new Date(),
      productId,
      productName,
      type,
      quantity,
      staff,
      source
    ]]);

}


/* =====================================================
   GET TRANSACTIONS
===================================================== */

function getTransactions() {

  const sheet =
    SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(
        TRANSACTION_SHEET
      );


  if (!sheet) {
    return [];
  }


  const lastRow =
    sheet.getLastRow();


  if (lastRow <= 1) {
    return [];
  }


  /*
    Read 7 columns so Source is included.
  */

  const values =
    sheet
      .getRange(
        2,
        1,
        lastRow - 1,
        7
      )
      .getValues();


  return values.map(
    function(row) {

      return {

        timestamp:
          row[0],

        productId:
          row[1],

        productName:
          row[2],

        type:
          row[3],

        quantity:
          row[4],

        staff:
          row[5],

        source:
          row[6]

      };

    }
  );

}