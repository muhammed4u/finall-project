import { AddressData } from "../types/address.type";

export default function CheckoutAddressCard({
    address,
    isSelected,
    onSelect,
    }: {
    address: AddressData;
    isSelected: boolean;
    onSelect: () => void;
    }) {
    return (
        <div
        onClick={onSelect}
        className={`cursor-pointer p-4 rounded-3xl border ${
            isSelected ? "border-green-600 bg-green-50" : "border-gray-300 bg-white"
        } shadow hover:shadow-lg transition`}
        >
        <h3 className="font-semibold text-lg">{address.name || "Unnamed"}</h3>
        <p className="text-gray-600 text-sm truncate">{address.details}</p>
        <p className="text-gray-600 text-sm">{address.city}</p>
        <p className="text-gray-600 text-sm">{address.phone}</p>
        </div>
    );
}