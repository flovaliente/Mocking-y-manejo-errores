import UserRepository from "../dao/repositories/UserRepository.js";
import CartRepository from "../dao/repositories/CartRepository.js";
import { isValidPassword } from "../utils/functionsUtils.js";
import { generateToken } from "../utils/utils.js";

const userManager = new UserRepository();
const cartManager = new CartRepository();

const registerUser = async (user) =>{
    try {
            if(user.email == 'adminCoder@coder.com' && user.password && isValidPassword(user, 'adminCod3r123')){
                
                const result = await userManager.createUser(user);
                result.role = 'admin';
                result.save();
                return result;
            }
            // Creo nuevo cart para el user
            const cart = await cartManager.createCart();
            console.log("User en service: ", user);
            console.log("Cart en service: ", cart);
            const result = await userManager.registerUser({
                ...user,
                cart: cart._id
            });
            
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Registration error.`);
        }
}

const loginUser = async (email, password) =>{
    try {
        const user = await userManager.findUserByEmail(email);
        //console.log("Password en Service: ", password);
        //console.log("Password de user en Service", user.password);
        if(!user || !isValidPassword(user, password)){
            throw new Error('Invalid credentials');
        }

        const accessToken = generateToken(user);
        //user.token = accessToken;
        return accessToken;
    } catch (error) {
        console.error("Login error: ", error.message);
        throw new Error('Login error');
    }
    
}

const getUser = async (uid) =>{
    try {
        return await userManager.getUser(uid);
    } catch (error) {
        console.error(error.message);
        throw new Error('Error trying to get users.');
    }
    
}

export default {
    registerUser,
    loginUser,
    getUser
};