function doPost(event) {
  if (!event || !event.parameter) {
    throw new Error("Missing form submission.");
  }

  const fields = [
    ["fiveYears", "Kita lima tahun dari sekarang"],
    ["natureTrip", "Destinasi alam impian tahun depan"],
    ["personalGoal", "Mimpi pribadi atau target besar"],
    ["relaxingDay", "Rutinitas hari santai di rumah"],
    ["newExperience", "Hal baru yang ingin dicoba bersama"],
    ["travelRoutine", "Pengalaman jalan-jalan yang ingin rutin"],
    ["support", "Dukungan saat hari terasa berat"],
    ["dreamHome", "Sudut di tempat tinggal impian"],
    ["feelingLoved", "Tiga hal kecil yang membuat merasa dicintai"],
    ["birthdayWish", "Doa dan harapan ulang tahun"],
    ["ownWish", "Keinginan atau cerita bebas", false],
  ];
  const answers = fields.map(([key, label, required = true]) => {
    const value = String(event.parameter[key] || "").trim();
    if ((required && !value) || value.length > 500) {
      throw new Error(`Invalid answer for ${label}.`);
    }
    return [label, value];
  });

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("This script must be bound to the destination spreadsheet.");
  }

  const headers = ["Waktu", ...fields.map(([, label]) => label)];
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    let sheetName = "Jawaban Harapan";
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (
      sheet &&
      sheet.getLastRow() > 0 &&
      sheet.getRange(1, 1, 1, headers.length).getValues()[0].some(
        (value, index) => value !== headers[index]
      )
    ) {
      sheetName = "Jawaban Harapan (Lengkap)";
      sheet = spreadsheet.getSheetByName(sheetName);
    }
    if (!sheet) sheet = spreadsheet.insertSheet(sheetName);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    const protectFormula = (value) =>
      /^[=+\-@]/.test(value) ? `'${value}` : value;
    sheet.appendRow([
      new Date(),
      ...answers.map(([, value]) => protectFormula(value)),
    ]);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(event) {
  const callback = event && event.parameter && event.parameter.callback;
  if (callback !== "receiveDreamResponses") {
    throw new Error("Unsupported callback.");
  }

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("This script must be bound to the destination spreadsheet.");
  }

  const sheets = ["Jawaban Harapan", "Jawaban Harapan (Lengkap)"]
    .map((name) => spreadsheet.getSheetByName(name))
    .filter(Boolean);
  const submissions = sheets
    .map((sheet) => sheet.getDataRange().getValues())
    .filter((values) => values.length > 1);
  const headers = [
    "Waktu",
    ...new Set(
      submissions.flatMap((values) => values[0].slice(1).map(String))
    ),
  ];
  const rows = submissions.flatMap((values) => {
    const sourceHeaders = values[0].map(String);
    return values.slice(1).map((sourceRow) => {
      const sourceValues = sourceRow.map((value) =>
        value instanceof Date ? value.toISOString() : value
      );
      return headers.map((header) => {
        const index = sourceHeaders.indexOf(header);
        return index < 0 ? "" : sourceValues[index];
      });
    });
  });
  rows.sort((left, right) => String(right[0]).localeCompare(String(left[0])));
  const result = { success: true, headers, rows };

  return ContentService.createTextOutput(
    `${callback}(${JSON.stringify(result)});`
  ).setMimeType(ContentService.MimeType.JAVASCRIPT);
}
