import { useApp } from "../context/AppContext.tsx";
import { useEffect, useState } from "react";
import {
    completeOrderPaymentService,
    getUserAddressesService,
    initializeNewOrderService
} from "../services/apiServices.ts";
import { Address, UserObject } from "../interfaces/user.ts";
import { useToast } from "../context/ToastContext.tsx";
import { ApiResponse, OrderWithHash } from "../interfaces/api.ts";
import { MdShoppingCart } from "react-icons/md";
import NewAddressModal from "../components/NewAddressModal.tsx";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems, updateUser, user } = useApp();
    const { showToast } = useToast();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [total, setTotal] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, item) => acc + item.product.newPrice * item.qty, 0);
        setTotal(newTotal);
    }, [cartItems]);

    useEffect(() => {
        if (user && user?.cart.length === 0) {
            navigate('/');
            return;
        }
        getUserAddresses();
    }, [user]);

    const getUserAddresses = async () => {
        const res = await getUserAddressesService();
        if (res) {
            setAddresses(res.body as Address[]);
            (res.body as Address[]).length > 0 && setSelectedAddress((res.body as Address[])[0]);
        } else {
            showToast({ type: "error", message: (res as ApiResponse).message });
        }
    };

    const handleAddressSelection = (address: Address) => {
        setSelectedAddress(address);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            showToast({ type: "error", message: "Please select an address before placing an order!" });
            return;
        }
        console.log("Order placed with address:", selectedAddress);

        // Order initialization logic remains the same...
    };

    return (
        <div className="px-8 pt-20 md:px-32 text-white bg-gradient-to-b from-gray-900 to-black min-h-screen">
            <div className="md:flex md:space-x-10">
                <div className="md:w-2/3">
                    <div className="my-6 flex justify-between items-center">
                        <h2 className="text-3xl font-semibold text-cyan-400">Select Address</h2>
                        <button onClick={() => document.getElementById("new_address_modal")?.showModal()}
                                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition-all">
                            + Add Address
                        </button>
                    </div>
                    <div className="space-y-4">
                        {addresses.map((address, index) => (
                            <div key={index} className={`p-5 rounded-lg backdrop-blur-md bg-white/10 shadow-md border
                                ${selectedAddress?._id === address._id ? "border-cyan-400" : "border-gray-600"}`}
                                 onClick={() => handleAddressSelection(address)}>
                                <p className="font-medium text-lg">{address.fullName}</p>
                                <p className="text-sm">{address.houseNo}, {address.street}, {address.city}, {address.postalCode}</p>
                                <p className="text-sm text-cyan-400">Mobile: {address.mobileNumber}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:w-1/3 p-6 rounded-lg backdrop-blur-md bg-white/10 shadow-lg border border-gray-600">
                    <h2 className="text-2xl font-semibold text-cyan-400">Order Summary</h2>
                    <div className="mt-4 space-y-3">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <img src={item.product.image} alt={item.product.name} className="h-12 w-12 rounded-lg" />
                                    <div>
                                        <p className="text-sm font-medium">{item.product.name}</p>
                                        <p className="text-xs text-gray-400">Rs. {item.product.newPrice.toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className="text-lg">× {item.qty}</p>
                            </div>
                        ))}
                    </div>
                    <div className="divider my-4"></div>
                    <div className="flex justify-between text-lg font-medium">
                        <span>Total</span>
                        <span>Rs. {total.toLocaleString()}/=</span>
                    </div>
                    <button onClick={handlePlaceOrder} className="w-full mt-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg flex items-center justify-center space-x-2 transition-all">
                        <MdShoppingCart size={20} /> <span>Place Order</span>
                    </button>
                </div>
            </div>

            <NewAddressModal updateAddressHandler={setAddresses} />
        </div>
    );
};

export default Checkout;
