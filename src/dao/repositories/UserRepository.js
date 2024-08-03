import { isValidPassword } from '../../utils/functionsUtils.js';
import UserDao from "../userDAO.js";

class UserRepository{
    constructor(){
        this.userDao = new UserDao();
    }

    async getUser(uid){
        try {
            return await this.userDao.getUser(uid);
        } catch (error) {
            console.error('Error trying to get users from UserRepository.');
            throw new Error('Error finding users.');
        }
    }

    async createUser(user){
        try {
            const newUser = await this.userDao.createUser(user);
            console.log('New user created: ', newUser);
        } catch (error) {
            console.error('Error creating user in UserRepository.');
            throw new Error('Error creating user.');
        }
    }

    async createUserCart(uid, cid){
        try {
            const result = await this.userDao.findUserByIdAndUpdate(uid, cid);
            console.log("User desde service: ", result);
            return result;
        } catch (error) {
            console.error(error.message);
        }
    }

    async registerUser(user){
        try {
            console.log('Cart: ', user.cart);
            const result = await this.userDao.createUser(user);
            console.log("Usuario en repository: ", result);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Registration error.`);
        }
    }


    async findUserByEmail(email) {
        try {
          const result = await this.userDao.findUserByEmail(email);
          return result;
        } catch (error) {
          console.error(error);
        }
      }
}

export default UserRepository;