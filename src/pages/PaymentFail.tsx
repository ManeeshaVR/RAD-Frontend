import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const PaymentFail = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-center">
            <div className="relative bg-gray-900/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-gray-700 max-w-md flex flex-col items-center">
                <div className="animate-pulse text-red-500">
                    <MdCancel className="w-24 h-24 drop-shadow-lg" />
                </div>
                <h1 className="text-4xl font-extrabold text-red-400 mt-4 tracking-wide">Payment Failed</h1>
                <p className="text-gray-400 mt-2 text-lg">Oops! Something went wrong. Please try again.</p>

                <button
                    className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-full text-white text-lg shadow-lg ring-1 ring-red-500/50 hover:ring-red-400/80"
                    onClick={() => navigate('/')}
                >
                    Return Home
                </button>
            </div>
        </div>
    );
};

export default PaymentFail;
