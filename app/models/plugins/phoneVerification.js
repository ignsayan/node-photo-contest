import { createAndStoreOtp } from '../../services/index.js'
import transporter from '../../../configs/nodemailer.js'
import template from '../../../emails/verificationEmail.js'

const phoneVerification = (schema) => {

    schema.methods.sendPhoneVerification = async function () {
        const otp = await createAndStoreOtp(this, 'phone');
        if (otp) {
            // sms service to be implemented, until then
            const data = {
                name: this.first_name,
                code: otp.code.toString(),
                time: otp.expiry
            }
            await transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: this.email,
                subject: 'Phone Verification',
                html: template(data),
            });
        }
    };

    schema.methods.hasVerifiedPhone = function () {
        return !!this.phone_verified_at;
    };

    schema.methods.markPhoneAsVerified = async function () {
        this.phone_verified_at = new Date();
        await this.save();
    };
};

export default phoneVerification
