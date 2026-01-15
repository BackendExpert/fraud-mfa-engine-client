import React, { useEffect, useState } from 'react';
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import { useNavigate } from 'react-router-dom';
import Toast from '../../component/Toast/Toast';
import useForm from '../../hooks/useForm';
import API from '../../services/api'; // our updated API with persistent deviceId

const EnrollMFA = () => {
    const navigate = useNavigate();
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const { values, handleChange } = useForm({ otp: '' });
    const [mfaToken, setMfaToken] = useState(null);

    // ✅ Load MFA token from localStorage
    useEffect(() => {
        const token = localStorage.getItem("mfaToken");
        if (!token) {
            navigate("/", { replace: true });
            return;
        }
        setMfaToken(token);
    }, [navigate]);

    // ✅ Fetch MFA enrollment state (QR code)
    useEffect(() => {
        if (!mfaToken) return;

        const fetchEnrollState = async () => {
            try {
                const res = await API.post(
                    "/auth/mfa/enroll",
                    {}, // no body needed
                    {
                        headers: {
                            Authorization: `Bearer ${mfaToken}`, // attach token manually
                        }
                    }
                );

                if (res.data.qrCode) {
                    setQrCode(res.data.qrCode);
                } else {
                    setQrCode(null); // MFA already enabled
                }

            } catch (err) {
                console.error("MFA enroll fetch error:", err.response?.data || err.message);
                navigate("/", { replace: true });
            }
        };

        fetchEnrollState();
    }, [mfaToken, navigate]);

    // ✅ Handle MFA verification
    const handleVerifyMFA = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post(
                "/auth/mfa/verify",
                { token: values.otp.trim() }, // trim OTP input
                {
                    headers: {
                        Authorization: `Bearer ${mfaToken}`,
                    }
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.removeItem("mfaToken");

            setToast({ success: true, message: "MFA verified successfully!" });
            setTimeout(() => navigate("/dashboard", { replace: true }), 1500);

        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Invalid MFA code"
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

            {qrCode && (
                <div className="mb-4 text-center">
                    <img src={qrCode} alt="MFA QR Code" className="mx-auto" />
                    <p className="text-sm mt-2">Scan with your Authenticator app</p>
                </div>
            )}

            <form onSubmit={handleVerifyMFA}>
                <DefaultInput
                    placeholder="Enter 6-digit code"
                    type='text'
                    value={values.otp}
                    name='otp'
                    onChange={handleChange}
                    required
                    disabled={loading} // prevent input while verifying
                />

                <DefaultButton
                    type="submit"
                    label={loading ? "Verifying..." : "Verify MFA"}
                    disabled={loading} // prevent double-submit
                />
            </form>
        </div>
    );
};

export default EnrollMFA;
