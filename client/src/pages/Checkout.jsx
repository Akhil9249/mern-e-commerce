import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
const URL = "http://localhost:5000/checkout";
const Checkout = () => {
    let [total, setTotal] = useState(0);
    let [textvalue, setTextvalue] = useState(0);

    const { placeOrder } = useContext(ProductContext);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const result = await axios(URL);
        setTotal(result.data);
    };

    const cuponapplayHandleChange = async (event) => {
        setTextvalue(event.target.value);
    };

    const cuponapplay = async (event) => {
       try {
        event.preventDefault();
        let amount;
        if (textvalue == "DISCOUNT10") {
            amount = 10;
        } else {
            amount = 20;
        }

        const response = await axios("http://localhost:5000/cuponapplay", {
            method: "POST",
            data: { amount },
        });
        setTotal(response.data);
       } catch (error) {
        
       }
    };

    return (
        <div className="max-w-[1640px] mx-auto bg-[#bebbbb] min-h-screen flex justify-center items-center ">
            <div className="w-[500px] h-[600px] bg-[white] p-5 rounded-xl">
                <div className="w-full h-[200px] bg-[#2942b1] rounded-xl flex justify-center items-center ">
                    <p className="text-3xl mr-4 text-white">TOTAL AMOUNT :</p>
                    <p className="text-3xl text-white"> Rs {total} /-</p>
                </div>

                <form onSubmit={cuponapplay} className="w-full h-[40px] bg-[#cf31ba] rounded-sm mt-5 flex">
                    <div className="w-[350px] h-full bg-[#3c31cf] border-[1px] border-[grey]">
                        <input
                            type="text"
                            name="amountvalue"
                            className="w-full h-full  outline-none px-2"
                            onChange={cuponapplayHandleChange}
                        />
                    </div>
                    <button
                        className="w-[110px] h-full bg-[#4242c9] cursor-pointer flex justify-center items-center text-white"
                        type="submit"
                    >
                        apply coupon
                    </button>
                </form>

                <div className="w-full h-[30px]  rounded-sm mt-5 flex">
                    <div className="w-[110px] h-full bg-[#177272] cursor-pointer flex justify-center items-center text-white">
                        coupon code :{" "}
                    </div>
                    <div className="w-[200px] h-full  border-[1px] border-[grey]">
                        <p className="px-2">DISCOUNT10</p>
                    </div>
                </div>

                <div className="w-full h-[30px]  rounded-sm mt-5 flex">
                    <div className="w-[110px] h-full bg-[#177272] cursor-pointer flex justify-center items-center text-white">
                        coupon code :{" "}
                    </div>
                    <div className="w-[200px] h-full  border-[1px] border-[grey]">
                        <p className="px-2">DISCOUNT20</p>
                    </div>
                </div>

                <div
                    className="w-full h-[40px] bg-[#db51c9] mt-5 flex justify-center items-center cursor-pointer text-white rounded-md "
                    onClick={placeOrder}
                >
                    Order Place
                </div>
            </div>
        </div>
    );
};

export default Checkout;
