import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Notifications = () => {
    const { order } = useContext(ProductContext);

    return (
        <div className="max-w-[1640px] mx-auto bg-[#bebbbb] min-h-screen flex justify-center items-center px-[30px] pt-3">
            <div className="w-full mx-auto  min-h-screen ">
                <div className="w-full h-10 flex justify-end mb-5">
                    <Link to="/">
                        <div className="w-36 h-10 bg-[#3380c9] flex justify-center items-center cursor-pointer rounded-md ">
                            <p className="text-white">To home</p>
                        </div>
                    </Link>
                </div>
                <table className="w-full ">
                    <tr className="text-center pb-10 h-[50px] border-[1px] border-[blue]">
                        <th>Name</th>

                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    {order.map((data) => (
                        <tr className="text-center w-full h-[150px] border-[1px] border-[blue]">
                            <td cl>{data.title.split(" ")[0]}</td>
                            <td className="h-full  flex justify-center pt-5">
                                <img
                                    src={data.image}
                                    alt=""
                                    className="product-table-image"
                                    style={{ objectFit: "contain" }}
                                />
                            </td>
                            <td>RS {data.singleprice}/-</td>
                            <td> {data.qty}</td>
                            <td>RS {data.price}/-</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default Notifications;
