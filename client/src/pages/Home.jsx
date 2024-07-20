import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
    const [cartShow, setCartShow] = useState(false);
    const [wishlistShow, setWishlistShow] = useState(false);

    const changeCart = () => {
        setCartShow((prev) => !prev);
    };

    const changeWishlist = () => {
        setWishlistShow((prev) => !prev);
    };

    const {
        tempProductResult,
        productFilter,
        category,
        handleChange,
        searchValue,
        clearData,
        searchBar,
        showSearchBar,
        addToCart,
        cart,
        wishlist,
        addToWishlist,
        productCount,
        removeFromCart,
    } = useContext(ProductContext);

    return (
        <div className="max-w-[1640px] mx-auto borer-[5px] border-[green] min-h-screen mb-10">
            <div className="w-full h-[100px] flex justify-between items-center px-10">
                <div className="w-[100px] h-full  flex justify-center items-center">
                    <p className="text-3xl font-bold text-[#b34141]">Shop</p>
                </div>

                {searchBar && (
                    <div className="w-[500px] h-8 border-[1px] border-[grey] rounded-md px-2 py-1 relative ">
                        <input
                            type="text"
                            placeholder="search by name"
                            className="w-full h-full outline-none bg-transparent "
                            value={searchValue}
                            onChange={handleChange}
                        />
                        {searchValue && (
                            <img
                                src="https://logowik.com/content/uploads/images/close1437.jpg"
                                alt=""
                                style={{ width: 22, height: 22 }}
                                className="absolute top-1 right-2 cursor-pointer"
                                onClick={clearData}
                            />
                        )}
                    </div>
                )}
                <div className="w-[200px] h-full  flex justify-between items-center ">
                    <IoMdSearch size={25} className="cursor-pointer" onClick={showSearchBar} />
                    <AiOutlineShopping size={25} className="cursor-pointer" onClick={changeCart} />
                    <Link to="/notifications">
                        <FaRegBell size={25} className="cursor-pointer" />
                    </Link>
                    <MdOutlineFavoriteBorder size={25} className="cursor-pointer" onClick={changeWishlist} />
                </div>
            </div>

            <div className="w-full h-[50px]  px-10 mb-5">
                <div className="w-full h-full border-y-[1px] border-[#a7a0a0] flex justify-center">
                    <div className="w-[700px] h-full  flex justify-between items-center">
                        <p className="cursor-pointer  " onClick={() => productFilter("All Category")}>
                            ALL CATEGORY
                        </p>
                        <p className="cursor-pointer  " onClick={() => productFilter("men's clothing")}>
                            MEN'S CLOTHING
                        </p>
                        <p className="cursor-pointer  " onClick={() => productFilter("jewelery")}>
                            JEWELERY
                        </p>
                        <p className="cursor-pointer  " onClick={() => productFilter("electronics")}>
                            ELECTRONICS
                        </p>
                        <p className="cursor-pointer " onClick={() => productFilter("women's clothing")}>
                            WONEN'S CLOTHING
                        </p>
                    </div>
                </div>
            </div>

            {/* ==== cart ====   */}
            <div
                className={
                    cartShow
                        ? "fixed top-0 right-0 w-[520px] h-[600px] overflow-auto bg-[#d6d2d2] z-10 duration-300 p-3 rounded-lg "
                        : "fixed top-0 right-[-100%] w-[300px] h-screen bg-[red] z-10 duration-300"
                }
            >
                <div className="w-full h-10 mb-5 flex justify-between ">
                    <p className="text-[25px] font-bold">Cart</p>
                    <RxCross2 size={25} className="cursor-pointer " onClick={changeCart} />
                </div>

                {cart.map((data) => (
                    <div className="w-full h-32 bg-white rounded-lg flex justify-between p-2 mb-4 relative" key={data.id}>
                        <div className="h-full w-[100px] bg-[#a88f8f] rounded-2xl flex justify-center items-center">
                            <img src={data.image} alt="" className="product-small-image" />
                        </div>

                        <div className="h-full w-[350px]  relative">
                            <RxCross2
                                size={20}
                                className="cursor-pointer absolute right-2"
                                onClick={() => removeFromCart(data.id)}
                            />
                            <p className="text-[20px] font-bold mb-1">{data.title.split(" ")[0]}</p>
                            <p className="text-sm">{data.title}</p>
                            <div className="w-full h-8   flex justify-between absolute bottom-0 ">
                                <p className=" h-full">RS {data.price}/-</p>
                                <div className="w-[200px] h-full flex justify-between">
                                    <div
                                        className="w-[50px] h-full flex justify-center items-center rounded-md  bg-[#c42e42] cursor-pointer text-white "
                                        onClick={() => productCount(-1, data.id)}
                                    >
                                        -
                                    </div>
                                    <div className="w-[90px] h-full flex justify-center items-center rounded-md bg-[grey] text-white ">
                                        {data.qty}
                                    </div>
                                    <div
                                        className="w-[50px] h-full flex justify-center items-center rounded-md bg-[#c42e42] cursor-pointer text-white"
                                        onClick={() => productCount(1, data.id)}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="w-full h-10 flex justify-center items-center">
                    {cart.length !== 0 && (
                        <Link to="/checkout">
                            {" "}
                            <div className="w-[200px] h-10 bg-[#c72525] flex justify-center items-center rounded-md text-white cursor-pointer">
                                checkout
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            {/* ==== wishlist ====   */}
            <div
                className={
                    wishlistShow
                        ? "fixed top-0 right-0 w-[500px] min-h-[600px] bg-[#d6d2d2] z-10 duration-300 p-3 rounded-lg"
                        : "fixed top-0 right-[-100%] w-[300px] h-screen bg-[red] z-10 duration-300"
                }
            >
                <div className="w-full h-10 mb-5 flex justify-between ">
                    <p className="text-[25px] font-bold">Wishlist</p>
                    <RxCross2 size={25} className="cursor-pointer " onClick={changeWishlist} />
                </div>

                {wishlist.map((data) => (
                    <div className="w-full h-32 bg-white rounded-lg flex justify-between p-2 mb-4">
                        <div className="h-full w-[100px] rounded-2xl flex justify-center items-center">
                            <img src={data.image} alt="" className="product-small-image-wish" />
                        </div>
                        <div className="h-full w-[350px]  relative">
                            <p>{data.title.split(" ")[0]}</p>
                            <p className="text-sm">{data.title}</p>
                            <div className="w-full h-8   flex justify-between absolute bottom-0 ">
                                <p className=" h-full">RS {data.singleprice}/-</p>
                                <div
                                    className="w-[200px] h-full flex justify-center items-center text-white bg-[#c42e42] cursor-pointer rounded-md"
                                    onClick={() => addToCart(data.id)}
                                >
                                    <p>Add to Cart</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full h-[300px] ">
                <img
                    src="https://www.insightssuccess.in/wp-content/uploads/2020/12/785054-ecommerce-istock-020119.jpg"
                    alt=""
                    className="w-full h-[300px]"
                    style={{ objectFit: "fill" }}
                />
            </div>
            <div className="w-full h-[80px] flex items-center px-10">
                <p className="mr-20 text-5xl text-[#857f7f]">Our Top Categories</p>
                <div className="flex items-center ">
                    <p className="mr-5 font-bold text-[#353333]">Sorted By: </p>
                    <div className="border-[1px] border-[#6b2727] w-36 h-8 flex justify-center items-center rounded-md ">
                        <p>{category}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 px-10 ">
                {tempProductResult.map((data) => (
                    <div
                        className="w-[240px] h-[410px]  border-[1px] border-[black] rounded-md p-2 relative "
                        key={data.id}
                    >
                        <div className="w-full h-[250px] bg-[#e7e4e4] rounded-2xl flex justify-center items-center">
                            <img src={data.image} alt="" className="Product-image-in" />
                            <MdOutlineFavoriteBorder
                                size={25}
                                className="cursor-pointer absolute top-2 right-3"
                                onClick={() => addToWishlist(data.id)}
                            />
                        </div>

                        <p className="text-[25px] mb-1">{data.title.split(" ")[0]}</p>
                        <p className="text-lg text-[#807c7c] absolute top-[265px] right-2">RS {data.singleprice}/-</p>
                        <p className="text-sm">{data.title}</p>
                        <div
                            className="w-[220px] h-9 bg-[#ce4848] text-white flex justify-center items-center absolute bottom-2 rounded-md cursor-pointer"
                            onClick={() => addToCart(data.id)}
                        >
                            Add To Cart
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <Toaster />
            </div>
        </div>
    );
};

export default Home;
