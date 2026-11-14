import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

const logoPath = fileURLToPath(
  new URL("../assets/email-logo.webp", import.meta.url)
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendOTPEmail = async (email, otp) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Email credentials are missing in .env");
    }

    const mailOptions = {
      from: {
        name: "Integration Management Platform",
        address: process.env.EMAIL_USER
      },

      to: email,

      subject: "Email Verification Code | Integration Management Platform",

      text: `Your verification code is ${otp}. It is valid for 5 minutes. Do not share this code with anyone.`,

      attachments: [
        {
          filename: "integration-logo.png",
          path: logoPath,
          cid: "integrationLogo"
        }
      ],

      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>

      <body style="
        margin:0;
        padding:0;
        background:#f1f5f9;
        font-family:Arial,Helvetica,sans-serif;
      ">

        <table width="100%" cellpadding="0" cellspacing="0"
          style="background:#f1f5f9;padding:30px 10px;">

          <tr>
            <td align="center">

              <table width="100%" cellpadding="0" cellspacing="0"
                style="
                  max-width:560px;
                  background:#ffffff;
                  border-radius:14px;
                  overflow:hidden;
                ">

                <!-- LOGO HEADER -->
                <tr>
                  <td align="center"
                    style="padding:25px 20px;background:#ffffff;">

                    <img
                      src="cid:integrationLogo"
                      alt="Integration Management Platform Logo"
                      width="100%"
                      style="
                        display:block;
                        width:100%;
                        max-width:480px;
                        height:auto;
                        margin:auto;
                      "
                    />

                    <h2 style="
                      color:#102b57;
                      font-size:22px;
                      margin:15px 0 0;
                    ">
                      Integration Management Platform
                    </h2>

                    <p style="
                      color:#64748b;
                      font-size:12px;
                      letter-spacing:2px;
                      margin:8px 0 0;
                    ">
                      TRAVEL • EXPLORE • DISCOVER
                    </p>

                  </td>
                </tr>

                <!-- EMAIL CONTENT -->
                <tr>
                  <td style="padding:30px;">

                    <h2 style="
                      color:#172554;
                      text-align:center;
                      font-size:23px;
                    ">
                      Verify Your Email
                    </h2>

                    <p style="
                      color:#475569;
                      font-size:15px;
                      line-height:25px;
                      text-align:center;
                    ">
                      Hello!
                    </p>

                    <p style="
                      color:#475569;
                      font-size:15px;
                      line-height:25px;
                      text-align:center;
                    ">
                      Thank you for choosing Integration Management Platform.
                      Use the verification code below to continue.
                    </p>

                    <!-- OTP -->
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="margin:25px 0;">

                      <tr>
                        <td align="center"
                          style="
                            background:#eff6ff;
                            border:1px solid #bfdbfe;
                            border-radius:10px;
                            padding:25px 10px;
                          ">

                          <p style="
                            color:#475569;
                            font-size:12px;
                            letter-spacing:2px;
                          ">
                            YOUR VERIFICATION CODE
                          </p>

                          <h1 style="
                            color:#2563eb;
                            font-size:36px;
                            letter-spacing:12px;
                            margin:15px 0;
                          ">
                            ${otp}
                          </h1>

                          <p style="
                            color:#64748b;
                            font-size:13px;
                          ">
                            Valid for 5 minutes
                          </p>

                        </td>
                      </tr>

                    </table>

                    <p style="
                      color:#dc2626;
                      font-size:13px;
                      line-height:22px;
                      text-align:center;
                    ">
                      Security Notice: Never share your OTP with anyone.
                    </p>

                    <p style="
                      color:#475569;
                      font-size:14px;
                      line-height:23px;
                    ">
                      If you did not request this verification code,
                      please ignore this email.
                    </p>

                    <p style="
                      color:#475569;
                      font-size:14px;
                      line-height:23px;
                    ">
                      Regards,<br>
                      <strong>Integration Management Platform Team</strong>
                    </p>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td align="center"
                    style="
                      background:#f8fafc;
                      padding:20px;
                      border-top:1px solid #e2e8f0;
                    ">

                    <p style="
                      color:#64748b;
                      font-size:12px;
                    ">
                      © 2026 Integration Management Platform.
                      All rights reserved.
                    </p>

                    <p style="
                      color:#94a3b8;
                      font-size:11px;
                    ">
                      This is an automated email. Please do not reply.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
      </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Professional OTP email sent:", info.messageId);

    return info;

  } catch (error) {
    console.error("OTP Email Error:", error.message);
    throw error;
  }
};

export default sendOTPEmail;
