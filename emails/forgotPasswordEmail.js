export default function template(link) {

    return (
        `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background: #f9f9f9; border-radius: 10px;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p style="font-size: 16px; color: #555;">
            Hello, you requested to reset your password. Click the button below to proceed:
            </p>
            <a href="${link}" style="display: inline-block; padding: 12px 20px; margin: 20px 0; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">
            Reset Password
            </a>
            <p style="font-size: 14px; color: #999;">
            If you didn’t request this, you can ignore this email.
            </p>
        </div>`
    );
};