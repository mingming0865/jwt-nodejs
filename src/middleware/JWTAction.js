
require("dotenv").config();

import jwt from "jsonwebtoken";

const createJWT = () => {
    let payload = { name: 'Ming', address: 'ha noi' };
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log(token)
    } catch (err) {
        console.log(token)
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (e) {
        console.log(err);
    }
    return data;
}

module.exports = {
    createJWT, verifyToken
}