export const registrationMailTemplate = (user) => {
  const html = `
    <html>
      <head>
        <title>New User Registration</title>
      </head>
      <body style="font-family: Arial, sans-serif;">
        <div>
          <h1 style="font-size: 24px; margin-bottom: 20px;">New User Registration</h1>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">A new user has registered in our platform:</p>
          <ul style="font-size: 16px;">
            <li>Name: ${user.name}</li>
            <li>Last Name: ${user.lastname}</li>
            <li>Email: ${user.email}</li>
          </ul>
          <p style="font-size: 16px;">Thank you for your attention.</p>
          <p style="font-size: 16px">Best regards,</p>
          <p style="font-size: 16px">German Touron</p>
          <div style="background-color: #f5f5f5; padding: 20px">
            <p style="font-size: 12px; margin: 0">This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return html;
}
