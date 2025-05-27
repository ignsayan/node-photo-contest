import { createAndStoreOtp } from '../../services/index.js'

const phoneVerification = (schema) => {

    schema.methods.sendPhoneVerification = async function () {
        const otp = await createAndStoreOtp(this, 'phone');
        if (otp) {
            // sms service to be implemented
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
