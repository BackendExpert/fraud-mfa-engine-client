import React, { useEffect, useState } from 'react';
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import { useNavigate } from 'react-router-dom';
import Toast from '../../component/Toast/Toast';
import useForm from '../../hooks/useForm';
import API from '../../services/api'; // updated API with persistent deviceId

const VerfiyPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const { values, handleChange } = useForm({ otp: '' });
    const otpToken = localStorage.getItem('otptoken');

    // ✅ Redirect if OTP token is missing
    useEffect(() => {
        if (!otpToken) {
            navigate("/", { replace: true });
        }
    }, [otpToken, navigate]);

    // ✅ Handle OTP verification
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post(
                '/auth/verify-otp',
                { otp: values.otp.trim() }, // trim spaces
                {
                    headers: {
                        Authorization: `Bearer ${otpToken}`, // attach OTP token
                        // x-device-id is automatically added by API interceptor
                    }
                }
            );

            // ✅ MFA required → redirect to enroll MFA
            if (res.data.mfaRequired === true) {
                localStorage.setItem("mfaToken", res.data.token);
                localStorage.removeItem("otptoken");
                setToast({ success: true, message: "Please verify MFA" });
                setTimeout(() => navigate('/enroll-mfa'), 2000);
                return;
            }

            // ✅ OTP success → redirect to dashboard
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.removeItem("otptoken");
                setToast({ success: true, message: res.data.message });
                setTimeout(() => navigate('/dashboard'), 2000);
            }

        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "OTP verification failed"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 pt-32'>
            {toast && (
                <div className="absolute top-5 right-5 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
                <form method="post" onSubmit={handleVerifyOTP}>
                    <DefaultInput
                        type='text'
                        value={values.otp}
                        name='otp'
                        required
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        disabled={loading} // prevent typing while verifying
                    />

                    <DefaultButton
                        type='submit'
                        label={loading ? 'Verifying...' : "Verify Password"}
                        disabled={loading} // prevent double-submit
                    />
                </form>
            </div>
        </div>
    );
};

export default VerfiyPassword;
