export default function template(data) {

    let { name, link, time } = data;
    
    time = Math.ceil((time - Date.now()) / 1000 / 60);

    return (
        `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
            <h2 style="color: #333;">Hey, ${name}</h2>
            <p style="font-size: 16px; color: #555;">
                You have recently requested to reset your password.
            </p>
            <p style="font-size: 16px; color: #555;">
                Click the button below to proceed.
            </p>
            <div style="text-align: center;">
                <a href="${link}" style="display: inline-block; padding: 12px 20px; margin: 20px 0; background-color: rgb(50, 50, 50); color: #fff; text-decoration: none; border-radius: 30px;">
                Reset Password
                </a>
            </div>
            <p style="font-size: 14px; color: #999;">
                This link will expire in ${time} minutes.
            </p>
            <p style="font-size: 14px; color: #999;">
                If you didn’t request this, you can ignore this email.
            </p>
        </div>`
    );
}