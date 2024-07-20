const datas = require("../datas.json");

let tempdata = [...datas];
let cart = [];
let wishlist = [];
let order = [];
// let combinedArray = comarr.flat()

let bought = [];

const products = (req, res) => {
    res.json({ datas, cart, wishlist, order });
};

const addcart = (req, res) => {
    const isexist = cart.find((user) => user.id == req.body.id);
    if (isexist == undefined) {
        const Result = datas.filter((data) => data.id == req.body.id); 
        cart.push(Result[0]);
        res.json(cart);
    } else {
        res.json({ message: "Exist" });
    }
};
const removecart = (req, res) => {
    const removeFromCart = (id) => {
        const index = cart.findIndex((item) => item.id === id);
        if (index > -1) {
            cart.splice(index, 1);
        }
        return cart;
    };

    removeFromCart(req.body.id);

    res.json(cart);
};

const count = (req, res) => {
    const Result = tempdata.filter((data) => data.id == req.body.id);
    if (req.body.value == 1) {
        Result[0].qty = Result[0].qty + 1;
    } else {
        if (Result[0].qty > 1) {
            Result[0].qty = Result[0].qty - 1;
        }
    }
    let Price = Result[0].singleprice;
    let Qty = Result[0].qty;
    let NewPrice = Price * Qty;
    Result[0].price = NewPrice;
    res.json(cart);
};

let checkout = (req, res) => {
    let formattedNumber = cart.reduce((total, item) => total + item.price, 0);
    const total = formattedNumber.toFixed(2);
    res.json(total);
};

let notifications = (req, res) => {
    let total = cart.reduce((total, item) => total + item.price, 0);
    res.json(total);
};

let addwishlist = (req, res) => {
    const isexist = wishlist.find((user) => user.id == req.body.id);
    if (isexist == undefined) {
        const Result = datas.filter((data) => data.id == req.body.id);
        wishlist.push(Result[0]);
        res.json(wishlist);
    } else {
        res.json({ message: "Exist" });
    }
};

let cuponapplay = (req, res) => {
    let formattedNumber = cart.reduce((total, item) => total + item.price, 0);
    const total = formattedNumber.toFixed(2);
    const discount = (total * req.body.amount) / 100;
    let ogtotal = (total - discount).toFixed(2);

    res.json(ogtotal);
};

let placeorder = (req, res) => {
    let temp1 = [...order];
    let temp2 = [...cart];
    let temp3 = [temp1, temp2];
    order = temp3.flat();
    res.json({ order, message: "success" });
};

module.exports = {
    products,
    addcart,
    count,
    removecart,
    checkout,
    notifications,
    addwishlist,
    cuponapplay,
    placeorder,
};
