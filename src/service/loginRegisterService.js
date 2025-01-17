import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: { email: email }
    });

    return user ? true : false;
};

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    });

    return user ? true : false;
};

const registerNewUser = async (rawUserData) => {
    try {
        // Check if email or phone exists
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            };
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already exist',
                EC: 1
            };
        }

        // Hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        // Create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username, // Sửa lại trường này
            password: hashPassword,
            phone: rawUserData.phone // Đảm bảo sử dụng đúng trường phone
        });

        return {
            EM: 'A user is created successfully!',
            EC: 0
        };

    } catch (e) {
        console.log(e);
        return {
            EM: 'Something went wrong in service...',
            EC: -2
        };
    }
};

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword) // true or false
}

const handleUserLogin = async (rawData) => {
    try {
        // Check if email or phone exists
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })

        if (user) {
            console.log(">>> found user with email/phone")
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword == true) {
                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: ''
                }
            }
        }
        return {
            EM: 'Your email/phone or password is incorrect!',
            EC: 1,
            DT: ''
        }


    } catch (error) {
        console.log(error);
        return {
            EM: 'Something went wrong in service...',
            EC: -2
        };
    }
}

module.exports = {
    registerNewUser, handleUserLogin
};
