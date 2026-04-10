import { faCheck, faCreditCard, faMoneyBill, faShieldAlt, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface paymentMethodsProps {
    selectedMethod: 'cash' | 'card',
    changeMethod: (method: 'cash' | 'card')=> void
}

export default function PaymentMethods({selectedMethod, changeMethod}: paymentMethodsProps) {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-linear-to-r px-6 py-4 from-green-500 to-green-600">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FontAwesomeIcon icon={faWallet}/>
                        Payment Method
                    </h2>
                    <p className="mt-1 text-green-100 text-sm ">
                        Choose how you'd like to pay
                    </p>
                </div>

                <div className="p-6 space-y-4">
                    
                    <button
                    type="button"
                    onClick={()=> changeMethod('cash')}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                        selectedMethod === 'cash'
                        ? "border-green-500  bg-linear-to-r from-green-50 to-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                    }`}>
                        <div className={`w-14 h-14 rounded-xl  flex items-center justify-center transition-all ${
                            selectedMethod ==="cash"
                            ? "bg-linear-to-br from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/30"
                            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                        }`} >
                            <FontAwesomeIcon icon={faMoneyBill} className="text-xl"/>
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className={`text-gray-900 font-bold`}>Cash On Delivery</h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Pay when your order arrives at your doorstep
                            </p>
                        </div>
                        <div className={`w-7 h-7 rounded-full transition-all flex items-center justify-center ${
                            selectedMethod ==="cash"
                            ?"bg-green-500 text-white"
                            :"border-2 border-gray-200"
                        }`}>
                            {selectedMethod === "cash" && (<FontAwesomeIcon icon={faCheck} className="text-xs"/>)}
                        </div>
                    </button>

                    <button
                    type="button"
                    onClick={()=> changeMethod('card')}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                        selectedMethod === 'card'
                        ? "border-green-500  bg-linear-to-r from-green-50 to-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                    }`}>
                        <div className={`w-14 h-14 rounded-xl  flex items-center justify-center transition-all ${
                            selectedMethod ==="card"
                            ? "bg-linear-to-br from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/30"
                            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                        }`} >
                            <FontAwesomeIcon icon={faCreditCard} className="text-xl"/>
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className={`text-gray-900 font-bold`}>Pay Online</h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Secure payment with Credit/Debit Card via Stripe 
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                <img src="https://img.icons8.com/color/48/visa.png" alt="visa" className="h-5" />
                                <img src="https://img.icons8.com/color/48/mastercard.png" alt="mastercard" className="h-5" />
                                <img src="https://img.icons8.com/color/48/amex.png" alt="amex" className="h-5" />
                            </div>
                        </div>
                        <div className={`w-7 h-7 rounded-full transition-all flex items-center justify-center ${
                            selectedMethod ==="card"
                            ?"bg-green-500 text-white"
                            :"border-2 border-gray-200"
                        }`}>
                            {selectedMethod === "card" && (<FontAwesomeIcon icon={faCheck} className="text-xs"/>)}
                        </div>
                    </button>
                    
                    <div className="flex p-4 items-center gap-3 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-green-600"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-800">
                                Secure & Encrypted
                            </p>
                            <p className="text-sm text-green-600 mt-0.5">
                                Your payment info is protected with 256-bit SSL encryption
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
