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
        <div className="container">

            <nav
                className={`w-full flex justify-between items-center px-8 py-4  ${
                    isNavFixed
                    ? "fixed top-0 left-0  z-1000 bg-white/95 backdrop-blur-md shadow-md translate-y-0 transition-all duration-400 ease-in-out transform"
                    : "relative bg-white  "
            }`}
            >
            <h1>
                <Link href="/">
                <Image src={freshCartLogo} alt="Fresh Cart Logo" />
                </Link>
            </h1>

            <div className="relative hidden lg:block">
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for products..."
                className="min-w-95 px-5 py-3 rounded-full bg-white border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-300 hover:shadow-md"
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 cursor-pointer transition-colors duration-300"
            />
            </div>

            <ul className="hidden lg:flex gap-6 items-center">
                <li>
                <Link
                    href={"wishlist"}
                    className={`flex flex-col justify-center items-center gap-1 transition-colors duration-200 ${pathName === "/wishlist" ? "text-green-500" : " hover:text-green-500"}`}
                >
                    <div className="relative">
                        <FontAwesomeIcon className="text-lg" icon={faHeart} />
                        <span className="absolute left-3 top-0 -translate-y-1/2 size-4 flex justify-center items-center rounded-full bg-red-500 text-white text-xs">{count}</span>
                    </div>
                    <span className="text-xs">Wishlist</span>
                </Link>
                </li>
                <li>
                <Link
                    href={"cart"}
                    className={`flex flex-col justify-center items-center gap-1 transition-colors duration-200 ${pathName === "/cart" ? "text-green-500" : " hover:text-green-500"}`}
                >
                    <div className="relative">
                        <FontAwesomeIcon className="text-lg" icon={faCartShopping} />
                        <span className="absolute left-3 top-0 -translate-y-1/2 size-4 flex justify-center items-center rounded-full bg-green-500 text-white text-xs">{numOfCartItems}</span>
                    </div>
                    <span className="text-xs">Cart</span>
                </Link>
                </li>
                <li className="relative" ref={accountRef}>
                    <button
                        onClick={toggleAccount}
                        className="flex flex-col justify-center items-center gap-1 hover:text-green-500 transition-colors duration-200"
                    >
                        <FontAwesomeIcon className="text-lg mb-1.5" icon={faUser} />
                        <span className="text-xs">{isAuthenticated && userInfo ? userInfo.name : "Account"}</span>
                    </button>

                    {isAccountOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-xl p-3 z-1200">
                        <ul className="space-y-2 text-sm">
                            <li>
                            <Link href="/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-100 hover:text-green-500 transition-colors duration-200">
                                <FontAwesomeIcon icon={faUser} />
                                My Profile
                            </Link>
                            </li>

                            <li>
                            <Link href="/orders" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-100 hover:text-green-500 transition-colors duration-200">
                                <FontAwesomeIcon icon={faCartShopping} />
                                My Orders
                            </Link>
                            </li>

                            <li>
                            <Link href="/wishlist" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-100 hover:text-green-500 transition-colors duration-200">
                                <FontAwesomeIcon icon={faHeart} />
                                My Wishlist
                            </Link>
                            </li>

                            <li>
                            <Link href="/profile/addresses" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-100 hover:text-green-500 transition-colors duration-200">
                                <FontAwesomeIcon icon={faAddressCard} />
                                Addresses
                            </Link>
                            </li>

                            <li>
                            <Link href="/profile/settings" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-100 hover:text-green-500 transition-colors duration-200">
                                <FontAwesomeIcon icon={faUser} />
                                Settings
                            </Link>
                            </li>

                            <li className="border-t pt-3">
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors duration-200 w-full"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                Sign Out
                            </button>
                            </li>
                        </ul>
                        </div>
                    )}
                    </li>
                {
                    isAuthenticated? <><li onClick={logout} className="flex flex-col justify-center items-center gap-1 cursor-pointer hover:text-green-500 transition-colors duration-200">
                <FontAwesomeIcon className="text-lg mb-1" icon={faRightFromBracket} />
                <span className="text-xs">Log Out</span>
                </li></>: <><li>
                <Link
                    href={"signup"}
                    className={`flex flex-col justify-center items-center gap-1 transition-colors duration-200 ${pathName === "/signup" ? "text-green-500" : " hover:text-green-500"}`}
                >
                    <FontAwesomeIcon className="text-lg" icon={faUserPlus} />
                    <span className="text-xs">Sign Up</span>
                </Link>
                </li>
                <li>
                <Link
                    href={"login"}
                    className={`flex flex-col justify-center items-center gap-1 transition-colors duration-200 ${pathName === "/login" ? "text-green-500" : " hover:text-green-500"}`}
                >
                    <FontAwesomeIcon className="text-lg" icon={faAddressCard} />
                    <span className="text-xs">Log In</span>
                </Link>
                </li></>
                }
            </ul>

            <button className="lg:hidden btn bg-green-500 text-white" onClick={toggleMenu}>
                {isMenuOpen? <FontAwesomeIcon icon={faXmark} />: <FontAwesomeIcon icon={faBars} />}
            </button>
            </nav>
        </div>

        <nav className="bg-gray-50 py-4 hidden lg:flex items-center z-50 relative">
            <div className="container flex items-center justify-between ">
            <div className="flex gap-8 items-center ">
                <div className="relative group z-50">
                <button className="btn flex items-center gap-3 bg-green-500 text-white hover:bg-green-500/95">
                    <FontAwesomeIcon icon={faBars} />
                    <span>All Categories</span>
                    <FontAwesomeIcon
                    icon={faChevronDown}
                    className="group-hover:rotate-180 transition-transform duration-200"
                    />
                </button>
                <menu className="hidden group-hover:block bg-white absolute top-10 shadow-lg *:p-3 *:hover:bg-gray-200/50 rounded-lg divide-y-2 divide-gray-200">
                    <li>
                    <Link className="flex gap-2 items-center" href={`/search?category=6439d5b90049ad0b52b90048`}>
                        <FontAwesomeIcon
                        className="text-green-500 text-lg"
                        icon={faPerson}
                        />
                        <span>Men's Fashion</span>
                    </Link>
                    </li>
                    <li>
                    <Link className="flex gap-2 items-center" href={`/search?category=6439d58a0049ad0b52b9003f`}>
                        <FontAwesomeIcon
                        className="text-green-500 text-lg"
                        icon={faPersonDress}
                        />
                        <span>Women's Fashion</span>
                    </Link>
                    </li>
                    <li>
                    <Link className="flex gap-2 items-center" href={`/search?category=6439d40367d9aa4ca97064cc`}>
                        <FontAwesomeIcon
                        className="text-green-500 text-lg"
                        icon={faBabyCarriage}
                        />
                        <span>Baby & Toys</span>
                    </Link>
                    </li>
                    <li>
                    <Link className="flex gap-2 items-center" href={`/search?category=6439d30b67d9aa4ca97064b1`}>
                        <FontAwesomeIcon
                        className="text-green-500 text-lg"
                        icon={faSuitcaseMedical}
                        />
                        <span>Beauty & Health</span>
                    </Link>
                    </li>
                    <li>
                    <Link className="flex gap-2 items-center" href={`/search?category=6439d2d167d9aa4ca970649f`}>
                        <FontAwesomeIcon
                        className="text-green-500 text-lg"
                        icon={faBolt}
                        />
                        <span>Electronics</span>
                    </Link>
                    </li>
                    <li>
                    <Link className="flex gap-2 items-center" href={'/categories'}>
                        <FontAwesomeIcon
                        className="text-green-500 text-lg"
                        icon={faEllipsis}
                        />
                        <span>View All Categories</span>
                    </Link>
                    </li>
                </menu>
                </div>

                <ul className="flex gap-5">
                <li>
                    <Link
                    className={`${pathName === "/" ? "text-green-500" : " hover:text-green-500"}`}
                    href={"/"}
                    >
                    Home
                    </Link>
                </li>
                <li>
                    <Link
                    className={`${pathName === "/shop" ? "text-green-500" : " hover:text-green-500"}`}
                    href={"shop"}
                    >
                    Shop
                    </Link>
                </li>
                <li>
                    <Link
                    className={`${pathName === "brands" ? "text-green-500" : " hover:text-green-500"}`}
                    href={"brands"}
                    >
                    Brands
                    </Link>
                </li>
                </ul>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-1">
                <FontAwesomeIcon
                    icon={faTruck}
                    className="text-green-500 text-lg"
                />
                <p className="text-gray-700 text-sm ">
                    Free Shipping On Orders Over 500 EGP
                </p>
                </div>
                <div className="flex items-center gap-1">
                <FontAwesomeIcon
                    icon={faGift}
                    className="text-green-500 text-lg"
                />
                <p className="text-gray-700 text-sm ">New Arrivals Daily</p>
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
            <Image src={freshCartLogo} alt="Fresh cart logo" className="w-32" />
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
