import React, { useEffect, useState } from 'react'
import DefaultInput from '../../component/Form/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import { useNavigate } from 'react-router-dom'
import Toast from '../../component/Toast/Toast'
import useForm from '../../hooks/useForm'
import API from '../../services/api'

const CreateAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const { values, handleChange } = useForm({ email: '' });

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // const res = await API.post('/auth/create-auth', values, {
            //     headers: { "Content-Type": "application/json" },
            // })

            const res = await API.post("/auth/create-auth", { otp: values.otp.trim() });


            if (res.data.success) {
                localStorage.setItem('otptoken', res.data.token)
                setToast({ success: true, message: res.data.message });
                setTimeout(() => navigate('/verify-password'), 2000);
            }
            else {
                setToast({ success: false, message: res.data.message });
            }

        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong"
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
                <form method="post" onSubmit={handleRequestOTP}>
                    <DefaultInput
                        type='email'
                        value={values.email}
                        name={'email'}
                        required
                        onChange={handleChange}
                        placeholder={"Enter Your Email Address"}
                    />

                    <DefaultButton
                        type='submit'
                        label={loading ? 'Sending OTP' : "Request OTP"}
                    />
                </form>
            </div>
        </div>
    )
}

export default CreateAuth