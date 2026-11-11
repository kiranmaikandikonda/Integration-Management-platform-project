import nodemailer from "nodemailer";

const sendOTPEmail = async (email, otp) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            throw new Error("Email configuration is missing");
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Integration Platform - OTP Verification",
            text: `Your OTP is ${otp}. It is valid for 5 minutes. Do not share it with anyone.`
        };

        await transporter.sendMail(mailOptions);

        return true;

    } catch (error) {
    console.error("EMAIL SENDING ERROR:", error);
    throw new Error(error.message || "Unable to send OTP email");
}
};

export default sendOTPEmail;
