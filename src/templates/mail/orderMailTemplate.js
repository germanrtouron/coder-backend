export const orderMailTemplate = (order) => {
  const productsTable = order.products
    .map((product) => {
      return `
      <tr>
        <td style="text-align: left;  padding: 10px">${product.name}</td>
        <td style="text-align: center; padding: 10px">${product.quantity}</td>
        <td style="text-align: center; padding: 10px">$${product.price}</td>
        <td style="text-align: right; padding: 10px">$${product.quantity * product.price}</td>
      </tr>
    `;
    })
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Order Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333">
        <div style="background-color: #f5f5f5; padding: 20px">
          <h1 style="font-size: 28px; margin-bottom: 5px">Order Confirmation</h1>
          <p style="font-size: 16px; margin-top: 0">Dear ${order.email},</p>
        </div>
        <div style="padding: 0 20px 20px 20px">
          <p style="font-size: 16px; margin-top: 0">We confirm that your order has been received and successfully processed. The following products have been purchased:</p>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px">
            <thead>
              <tr style="background-color: #f5f5f5; font-size: 16px">
                <th style="text-align: left; padding: 10px">Product</th>
                <th style="text-align: center; padding: 10px">Quantity</th>
                <th style="text-align: center; padding: 10px">Unit Price</th>
                <th style="text-align: right; padding: 10px">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              ${productsTable}
            </tbody>
            <tfoot>
              <tr style="background-color: #dddddd; font-size: 16px">
                <th style="text-align: left; padding: 10px" colspan="3">Total</th>
                <th style="text-align: right; padding: 10px">$${order.totalPrice}</th>
              </tr>
            </tfoot>
          </table>
          <p style="font-size: 16px">Payment has been processed and confirmed. A confirmation has been sent to your registered email. If you have any questions or need further information, please do not hesitate to contact us.</p>
          <p style="font-size: 16px">Best regards,</p>
          <p style="font-size: 16px">German Touron</p>
          <div style="background-color: #f5f5f5; padding: 20px">
            <p style="font-size: 12px; margin: 0">This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
    </html>`;

  return html;
};
