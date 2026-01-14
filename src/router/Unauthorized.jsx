import React from 'react';
import { MdLockOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Unauthorized = () => {
    const navigate = useNavigate();

    const healdeUnauthorized = () => {
        localStorage.clear()
        navigate('/', { replace: true })
    }

    return (
        <div className="flex items-center justify-center my-32 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center border border-gray-200">
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 text-red-500 p-4 rounded-full">
                        <MdLockOutline size={48} />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
                <p className="text-gray-600 mb-4">
                    You don’t have permission to access this page. Any unauthorized attempts are being recorded.
                </p>
                <p className="text-gray-600 mb-6">
                    Please logout and login with the correct credentials, or contact the administrator if you believe this is an error.
                </p>
                <p className="text-gray-500 mb-6">
                    Continued unauthorized access may result in restricted system privileges.
                </p>
                <button
                    onClick={healdeUnauthorized}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                    Logout & Go Back
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
