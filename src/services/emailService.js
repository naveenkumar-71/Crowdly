const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOtpEmail = async (email, otp) => {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Crowdly Password Reset OTP",
        html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Crowdly Password Reset</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#ffffff;margin:40px auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

                    <tr>
                        <td align="center"
                            style="background:#000000;padding:30px;">
                            <h1 style="color:#ffffff;margin:0;">
                                Crowdly
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:40px;">

                            <h2 style="margin-top:0;color:#222;">
                                Password Reset Request
                            </h2>

                            <p style="font-size:16px;color:#555;line-height:1.6;">
                                We received a request to reset your Crowdly account password.
                                Use the verification code below to continue.
                            </p>

                            <div
                                style="
                                    margin:30px 0;
                                    text-align:center;
                                    background:#f8f9fa;
                                    border:2px dashed #d1d5db;
                                    border-radius:12px;
                                    padding:25px;
                                ">

                                <p style="margin:0;color:#777;">
                                    Your Verification Code
                                </p>

                                <h1
                                    style="
                                        letter-spacing:8px;
                                        font-size:42px;
                                        margin:15px 0 0;
                                        color:#000;
                                    ">
                                    ${otp}
                                </h1>

                            </div>

                            <p style="font-size:15px;color:#555;">
                                This code will expire in
                                <strong>5 minutes</strong>.
                            </p>

                            <p style="font-size:15px;color:#555;">
                                If you did not request a password reset,
                                you can safely ignore this email.
                            </p>

                            <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">

                            <p style="font-size:13px;color:#999;">
                                This is an automated email from Crowdly.
                                Please do not reply directly to this message.
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td
                            align="center"
                            style="
                                background:#f8f9fa;
                                padding:20px;
                                color:#888;
                                font-size:13px;
                            ">
                            © 2026 Crowdly. All Rights Reserved.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`
    });

};

module.exports = sendOtpEmail;