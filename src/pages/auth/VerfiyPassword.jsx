import React, { useEffect, useState } from 'react'
import DefaultInput from '../../component/Form/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import { useNavigate } from 'react-router-dom'
import Toast from '../../component/Toast/Toast'
import useForm from '../../hooks/useForm'
import API from '../../services/api'


const VerfiyPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const { values, handleChange } = useForm({ otp: '' });

    const otpToken = localStorage.getItem('otptoken')

    useEffect(() => {
        if (!localStorage.getItem("otptoken")) {
            navigate("/", { replace: true });
        }
    }, []);

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // const res = await API.post('/auth/verify-otp',
            //     { otp: values.otp.trim() },
            //     {
            //         headers: {
            //             Authorization: `Bearer ${otpToken}`,
            //             "x-device-id": "jehan-device-1"
            //         }
            //     }
            // )
            // console.log(res.data)
            const res = await API.post('/auth/verify-otp', { otp: values.otp.trim() });


            if (res.data.mfaRequired === true) {
                localStorage.setItem("mfaToken", res.data.token);
                localStorage.removeItem("otptoken");
                setToast({ success: true, message: "verify MFA" });
                setTimeout(() => navigate('/enroll-mfa'), 3000);
                return;
            }
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.removeItem("otptoken")
                setToast({ success: true, message: res.data.message });
                setTimeout(() => navigate('/dashboard'), 3000);
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
                        name={'otp'}
                        required
                        onChange={handleChange}
                        placeholder={"Enter OTP"}
                    />

                    <DefaultButton
                        type='submit'
                        label={loading ? 'Verifying' : "Verify Password"}
                    />
                </form>
            </div>
        </div>
    )
}

export default VerfiyPassword