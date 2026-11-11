import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";

export interface ReceiptData {
  amountFormatted: string;
  status?: string;
  timestamp: string;
  recipientName: string;
  recipientBankOrApp: string;
  recipientAccountMasked: string;
  senderName: string;
  senderWalletLabel: string;
  senderAccountMasked: string;
  transactionNo: string;
  feeFormatted: string;
}

// Helper to mask middle digits like "704****411"
export function maskAccountNumber(raw: string): string {
  const clean = raw.replace(/\s+/g, "");
  if (clean.length <= 6) return clean;
  const start = clean.slice(0, 3);
  const end = clean.slice(-3);
  return `${start}****${end}`;
}

export async function shareTransactionReceiptPDF(data: ReceiptData) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          body {
            background-color: #f4f2ed;
            padding: 24px;
            display: flex;
            justify-content: center;
          }
          .receipt-card {
            width: 100%;
            max-width: 440px;
            background-color: #ffffff;
            border-radius: 16px;
            padding: 32px 26px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
            border-top: 6px solid #009A49;
          }
          .watermark-layer {
            position: absolute;
            top: -40px;
            left: -40px;
            right: -40px;
            bottom: -40px;
            display: flex;
            flex-wrap: wrap;
            gap: 44px;
            transform: rotate(-24deg);
            pointer-events: none;
            opacity: 0.04;
            font-size: 22px;
            font-weight: 800;
            color: #009A49;
            z-index: 0;
          }
          .content {
            position: relative;
            z-index: 1;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .brand-badge {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: #009A49;
            color: #ffffff;
            font-weight: 800;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .brand-name {
            font-size: 22px;
            font-weight: 800;
            color: #1A1A1A;
            letter-spacing: -0.5px;
          }
          .doc-title {
            font-size: 14px;
            font-weight: 600;
            color: #555555;
          }
          .hero {
            text-align: center;
            margin-bottom: 26px;
          }
          .amount {
            font-size: 32px;
            font-weight: 800;
            color: #009A49;
            margin-bottom: 6px;
          }
          .status {
            font-size: 16px;
            font-weight: 700;
            color: #1A1A1A;
            margin-bottom: 4px;
          }
          .timestamp {
            font-size: 12px;
            color: #777777;
          }
          .divider {
            border-top: 1.5px dashed #E2DFD7;
            margin: 22px 0;
          }
          .row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 18px;
          }
          .row-label {
            font-size: 13px;
            color: #666666;
            width: 38%;
          }
          .row-value-group {
            text-align: right;
            width: 62%;
          }
          .row-primary {
            font-size: 13px;
            font-weight: 700;
            color: #1A1A1A;
            text-transform: uppercase;
            margin-bottom: 3px;
          }
          .row-secondary {
            font-size: 12px;
            color: #555555;
          }
          .tx-no {
            font-size: 12px;
            font-weight: 600;
            color: #1A1A1A;
            word-break: break-all;
          }
          .footer-note {
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #EFECE6;
            font-size: 11px;
            line-height: 1.5;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="receipt-card">
          <div class="watermark-layer">
            ${Array(36).fill("<span>Xenza</span>").join("")}
          </div>

          <div class="content">
            <!-- Header -->
            <div class="header">
              <div class="brand">
                <div class="brand-badge">X</div>
                <span class="brand-name">Xenza</span>
              </div>
              <span class="doc-title">Transaction Receipt</span>
            </div>

            <!-- Amount & Status -->
            <div class="hero">
              <div class="amount">${data.amountFormatted}</div>
              <div class="status">${data.status || "Successful"}</div>
              <div class="timestamp">${data.timestamp}</div>
            </div>

            <div class="divider"></div>

            <div class="row">
              <div class="row-label">Recipient Details</div>
              <div class="row-value-group">
                <div class="row-primary">${data.recipientName}</div>
                <div class="row-secondary">${data.recipientBankOrApp} | ${data.recipientAccountMasked}</div>
              </div>
            </div>

            <div class="row">
              <div class="row-label">Sender Details</div>
              <div class="row-value-group">
                <div class="row-primary">${data.senderName}</div>
                <div class="row-secondary">${data.senderWalletLabel} | ${data.senderAccountMasked}</div>
              </div>
            </div>

            <div class="row">
              <div class="row-label">Transaction Fee</div>
              <div class="row-value-group">
                <div class="row-secondary" style="font-weight: 600; color: #1A1A1A;">${data.feeFormatted}</div>
              </div>
            </div>

            <div class="row" style="margin-bottom: 0;">
              <div class="row-label">Transaction No.</div>
              <div class="row-value-group">
                <div class="tx-no">${data.transactionNo}</div>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer-note">
              Enjoy seamless cross-border transfers between Niger and Nigeria with Xenza. Send money instantly, convert XOF and NGN at live corridor rates, and pay everyday bills securely.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  // Generate PDF file on device
  const result = await Print.printToFileAsync({
    html: htmlContent,
    base64: true,
  });
  const { uri } = result;

  const safeFileName = `Xenza_Receipt_${data.transactionNo.replace(
    /[^a-zA-Z0-9-_]/g,
    "",
  )}.pdf`;
  const shareableUri = `${FileSystem.cacheDirectory}${safeFileName}`;

  const existingFile = await FileSystem.getInfoAsync(shareableUri);
  if (existingFile.exists) {
    await FileSystem.deleteAsync(shareableUri, { idempotent: true });
  }
  const pdfBase64 = result.base64;
  if (!pdfBase64) {
    throw new Error(`PDF data was not returned for ${uri}.`);
  }
  await FileSystem.writeAsStringAsync(shareableUri, pdfBase64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(shareableUri, {
      mimeType: "application/pdf",
      dialogTitle: "Share Xenza Transaction Receipt",
      UTI: "com.adobe.pdf",
    });
  } else {
    throw new Error("File sharing is not available on this device.");
  }

  return shareableUri;
}
