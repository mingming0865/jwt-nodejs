import db from '../models/index';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"], },
        });
        if (users) {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users
            };
        } else {
            return {
                EM: 'No users found',
                EC: 0,
                DT: []
            };
        }
    } catch (e) {
        console.error('Error in getAllUser:', e);
        return {
            EM: 'Something went wrong with the service',
            EC: 1,
            DT: []
        };
    }
};

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        };

    } catch (e) {
        console.log(e);
        return {
            EM: 'Something went wrong with the services',
            EC: 1,
            DT: []
        };
    }
}

const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    } catch (e) {
        console.log(e);
    }
};

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update
            user.save({

            })
        } else {
            //not found
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: { id: id }
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUserWithPagination
};