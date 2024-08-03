import userModel from "./models/userModel.js";

export default class UserDao{
    createUser = async (user) =>{
        try {
            return await userModel.create(user);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    getUser = async (uid) =>{
        try {
            return await userModel.findById(uid);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    findUserByIdAndUpdate = async (uid, cid) =>{
        try {
            return await userModel.findByIdAndUpdate(uid, { cart: cid });
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    findUserByEmail = async (email) =>{
        try {
            return await userModel.findOne({ email }).lean();
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}