import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-center">
            <div className="p-10 rounded-2xl shadow-2xl bg-opacity-90 backdrop-blur-md bg-gray-700 border border-gray-500 flex flex-col items-center max-w-md transition-transform hover:scale-105">
                <FaCheckCircle className="text-green-400 w-24 h-24 mb-4 animate-pulse" />
                <h1 className="text-4xl font-extrabold text-white">Payment Successful!</h1>
                <p className="text-gray-300 mt-2">Your payment has been processed successfully.</p>
                <p className="text-gray-400">You will receive a confirmation email shortly.</p>
                <button
                    className="mt-6 px-6 py-3 rounded-lg text-lg font-semibold bg-green-500 hover:bg-green-600 transition-all shadow-lg text-white"
                    onClick={() => navigate('/')}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;
