import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT, //data
            })
            console.log(">>> check data: ", 'page = ', page, 'limit = ', limit)
        } else {
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT, //data
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        })
    }
}

const createFunc = async (req, res) => {
    try {
        //validate
        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        //validate
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //date
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}