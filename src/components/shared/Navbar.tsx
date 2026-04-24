"use client";
import {
    faBabyCarriage,
    faBars,
    faBolt,
    faCartShopping,
    faChevronDown,
    faEllipsis,
    faGift,
    faMagnifyingGlass,
    faPerson,
    faPersonDress,
    faPhone,
    faRightFromBracket,
    faSuitcaseMedical,
    faTruck,
    faUserPlus,
    faXmark,
    } from "@fortawesome/free-solid-svg-icons";
    import {
    faAddressCard,
    faEnvelope,
    faHeart,
    faUser,
    } from "@fortawesome/free-regular-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import Link from "next/link";
    import freshCartLogo from "../../assets/images/freshcart-logo.svg";
    import Image from "next/image";
    import { usePathname, useRouter } from "next/navigation";
    import { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import { AppState } from "@/store/store";
import useLogout from "@/features/auth/hooks/UseLogOut";

    export default function Navbar() {
    const accountRef = useRef<HTMLLIElement>(null);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    // open and close profile menu
    function toggleAccount() {
    setIsAccountOpen(!isAccountOpen);
    }

    const {logout} = useLogout()
    const {isAuthenticated , userInfo} =useSelector((appState:AppState)=>appState.auth)
    const pathName = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // open mobile menu
    function toggleMenu(){
        setIsMenuOpen(!isMenuOpen)
    }

    const {numOfCartItems} = useSelector((state:AppState)=> state.cart)
    const {count} = useSelector((state:AppState)=> state.wishlist)

    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    function handleSearch() {
    if (searchValue.trim() !== "") {
        router.push(`/search?query=${encodeURIComponent(searchValue)}`);
        setSearchValue("");
        setIsMenuOpen(false);
    }
}
const [isNavFixed, setIsNavFixed] = useState(false);

useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 100) {
        setIsNavFixed(true);
        } else {
        setIsNavFixed(false);
        }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accountRef.current && !accountRef.current.contains(event.target as HTMLElement)) {
                setIsAccountOpen(false); 
            }
        };

        if (isAccountOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isAccountOpen]);

    return (
        <>
            <nav
                className={`w-full transition-all duration-700 ease-in-out ${
                    isNavFixed
                    ? "fixed top-0 left-0 z-1000 glass-navbar shadow-2xl shadow-emerald-500/10"
                    : "relative bg-white border-b border-gray-100"
            }`}
            >
                <div className="container mx-auto px-4 sm:px-8 lg:px-16 flex justify-between items-center py-5">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="size-11 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:rotate-12 transition-transform duration-500">
                            <FontAwesomeIcon icon={faBolt} className="text-xl" />
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                            Swift<span className="text-emerald-500">Shop</span>
                        </h1>
                    </Link>

            <div className="relative hidden lg:block group">
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for products..."
                className="min-w-110 px-6 py-3 rounded-2xl bg-gray-50/50 border border-gray-200/60 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-500 hover:bg-white hover:shadow-md"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 px-4 rounded-xl bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600 transition-all duration-300">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    onClick={handleSearch}
                    className="text-sm"
                />
            </div>
            </div>

            <ul className="hidden lg:flex gap-8 items-center">
                <li>
                <Link
                    href={"/wishlist"}
                    className={`flex flex-col justify-center items-center gap-1 transition-all duration-300 relative group ${pathName === "/wishlist" ? "text-emerald-500" : "text-gray-500 hover:text-emerald-500"}`}
                >
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon className="text-xl" icon={faHeart} />
                        <span className="absolute -right-2.5 -top-1.5 size-5 flex justify-center items-center rounded-full bg-rose-500 text-white text-[10px] font-black border-2 border-white shadow-sm">{count}</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">Wishlist</span>
                </Link>
                </li>
                <li>
                <Link
                    href={"/cart"}
                    className={`flex flex-col justify-center items-center gap-1 transition-all duration-300 relative group ${pathName === "/cart" ? "text-emerald-500" : "text-gray-500 hover:text-emerald-500"}`}
                >
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon className="text-xl" icon={faCartShopping} />
                        <span className="absolute -right-2.5 -top-1.5 size-5 flex justify-center items-center rounded-full bg-emerald-500 text-white text-[10px] font-black border-2 border-white shadow-sm">{numOfCartItems}</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">Cart</span>
                </Link>
                </li>
                <li className="relative" ref={accountRef}>
                    <button
                        onClick={toggleAccount}
                        className="flex flex-col justify-center items-center gap-1 text-gray-500 hover:text-emerald-500 transition-all duration-300 group"
                    >
                        <div className="size-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                            <FontAwesomeIcon className="text-lg" icon={faUser} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">
                            {isAuthenticated && userInfo ? userInfo.name.split(' ')[0] : "Account"}
                        </span>
                    </button>

                    {isAccountOpen && (
                        <div className="absolute right-0 mt-4 w-60 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-3 border border-gray-100 z-1200 animate-slideUp">
                        <ul className="space-y-1 text-sm font-semibold">
                            <li>
                            <Link href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all duration-200">
                                <FontAwesomeIcon icon={faUser} className="opacity-50" />
                                My Profile
                            </Link>
                            </li>
                            <li>
                            <Link href="/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all duration-200">
                                <FontAwesomeIcon icon={faCartShopping} className="opacity-50" />
                                My Orders
                            </Link>
                            </li>
                            <li className="border-t border-gray-50 my-2 pt-2">
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-rose-500 hover:text-rose-600 transition-all duration-200 w-full"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} className="opacity-50" />
                                Sign Out
                            </button>
                            </li>
                        </ul>
                        </div>
                    )}
                </li>
                {!isAuthenticated && (
                    <li className="flex items-center gap-3 pl-4 border-l border-gray-100 ml-2">
                        <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-emerald-500 transition-colors">Log In</Link>
                        <Link href="/signup" className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">Sign Up</Link>
                    </li>
                )}
            </ul>

            <button className="lg:hidden size-10 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
            </button>
            </div>
            </nav>

        <nav className="bg-white border-b border-gray-50 py-3 hidden lg:flex items-center z-50 relative">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
            <div className="flex gap-10 items-center">
                <div className="relative group z-50">
                <button className="flex items-center gap-3 bg-gray-900 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-gray-900/10">
                    <FontAwesomeIcon icon={faBars} className="text-xs" />
                    <span className="text-sm font-bold tracking-tight">Categories</span>
                    <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-[10px] opacity-50 group-hover:rotate-180 transition-transform duration-300"
                    />
                </button>
                <menu className="hidden group-hover:block bg-white/95 backdrop-blur-xl absolute top-full mt-2 w-64 shadow-2xl border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50 animate-slideUp">
                    <li>
                    <Link className="flex gap-4 items-center p-4 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all" href={`/search?category=6439d5b90049ad0b52b90048`}>
                        <div className="size-8 rounded-lg bg-gray-50 flex items-center justify-center"><FontAwesomeIcon icon={faPerson} /></div>
                        <span className="font-bold text-sm">Men's Fashion</span>
                    </Link>
                    </li>
                    <li>
                    <Link className="flex gap-4 items-center p-4 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all" href={`/search?category=6439d58a0049ad0b52b9003f`}>
                        <div className="size-8 rounded-lg bg-gray-50 flex items-center justify-center"><FontAwesomeIcon icon={faPersonDress} /></div>
                        <span className="font-bold text-sm">Women's Fashion</span>
                    </Link>
                    </li>
                    <li>
                    <Link className="flex gap-4 items-center p-4 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all" href={`/search?category=6439d2d167d9aa4ca970649f`}>
                        <div className="size-8 rounded-lg bg-gray-50 flex items-center justify-center"><FontAwesomeIcon icon={faBolt} /></div>
                        <span className="font-bold text-sm">Electronics</span>
                    </Link>
                    </li>
                    <li>
                    <Link className="flex gap-4 items-center p-4 bg-gray-50/50 hover:bg-emerald-600 hover:text-white transition-all text-center justify-center" href={'/categories'}>
                        <span className="font-black text-[10px] uppercase tracking-widest">View All</span>
                    </Link>
                    </li>
                </menu>
                </div>

                <ul className="flex gap-8 items-center text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">
                <li>
                    <Link
                    className={`transition-colors duration-300 ${pathName === "/" ? "text-emerald-500" : "hover:text-emerald-500"}`}
                    href={"/"}
                    >
                    Home
                    </Link>
                </li>
                <li>
                    <Link
                    className={`transition-colors duration-300 ${pathName === "/shop" ? "text-emerald-500" : "hover:text-emerald-500"}`}
                    href={"/shop"}
                    >
                    Collection
                    </Link>
                </li>
                <li>
                    <Link
                    className={`transition-colors duration-300 ${pathName === "/brands" ? "text-emerald-500" : "hover:text-emerald-500"}`}
                    href={"/brands"}
                    >
                    Brands
                    </Link>
                </li>
                </ul>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                <FontAwesomeIcon
                    icon={faTruck}
                    className="text-emerald-500 text-sm opacity-50"
                />
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider">Free Delivery</p>
                </div>
                <div className="flex items-center gap-2">
                <FontAwesomeIcon
                    icon={faGift}
                    className="text-emerald-500 text-sm opacity-50"
                />
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider">Daily Offers</p>
                </div>
            </div>
            </div>
        </nav>

        {isMenuOpen && (
    <>
        
        <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={toggleMenu}
        ></div>

        <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 p-5
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
        
        <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-2">
                    <div className="size-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                        <FontAwesomeIcon icon={faBolt} className="text-sm" />
                    </div>
                    <span className="text-xl font-black text-gray-900 tracking-tight">
                        Swift<span className="text-emerald-500">Shop</span>
                    </span>
                </div>
            <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            >
            <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>

        <div className="relative my-5">
            <input
            type="text"
            placeholder="Search for products..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
        </div>

        <div>
            <h2 className="text-lg font-semibold mb-3">Main Menu</h2>
            <ul className="space-y-2">
            
            <li>
                <Link
                href="/wishlist"
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                ${
                    pathName === "/wishlist"
                    ? "bg-green-100 text-green-600"
                    : "hover:bg-gray-100"
                }`}
                >
                <div className="relative">
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {count}
                    </span>
                </div>
                <span>Wishlist</span>
                </Link>
            </li>

            <li>
                <Link
                href="/cart"
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                ${
                    pathName === "/cart"
                    ? "bg-green-100 text-green-600"
                    : "hover:bg-gray-100"
                }`}
                >
                <div className="relative">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-1">
                    {numOfCartItems}
                    </span>
                </div>
                <span>Cart</span>
                </Link>
            </li>

            <li>
                <Link
                href="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                ${
                    pathName === "/profile"
                    ? "bg-green-100 text-green-600"
                    : "hover:bg-gray-100"
                }`}
                >
                <FontAwesomeIcon icon={faUser} />
                <span>
                    {isAuthenticated && userInfo
                    ? userInfo.name
                    : "Account"}
                </span>
                </Link>
            </li>
            </ul>
        </div>

        <div className="border-t mt-6 pt-6">
            <h2 className="text-lg font-semibold mb-3">Account</h2>
            <ul className="space-y-2">
            {isAuthenticated ? (
                <li
                onClick={logout}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
                >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Log Out</span>
                </li>
            ) : (
                <>
                <li>
                    <Link
                    href="/signup"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Sign Up</span>
                    </Link>
                </li>
                <li>
                    <Link
                    href="/login"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                    <FontAwesomeIcon icon={faAddressCard} />
                    <span>Log In</span>
                    </Link>
                </li>
                </>
            )}
            </ul>
        </div>
        </div>
    </>
    )}
        </>
    );
}
