import userService from '../services/userService.js';

const register = async (req, res) =>{
    try {
        const user = req.body;
        const result = await userService.registerUser(user);
        res.redirect('/login');
    } catch (error) {
        res.redirect('/register');
    }
}

const failRegister = (req, res) =>{
    res.status(400).send({
        status: "error",
        message: "Filed register"
    });
}

const login = async (req, res) =>{
    const { email, password } = req.body; 
    try {
         req.session.failLogin = false;
        const accessToken = await userService.loginUser(email, password);

        res.cookie('accessToken', accessToken , { maxAge: 60*60*1000, httpOnly: true });
        console.log('Login exitoso!');
        return res.redirect("/products");
     } catch (error) {
         console.log('Error durante el login. Error: ', error.message);
         req.session.failLogin = true;
         return res.redirect("/login");
     }
     
 }

const failLogin = (req, res) =>{
    res.status(400).send({
        status: "error",
        message: "Filed login"
    });
}

const logout = async (req, res) =>{
    req.session.destroy( error =>{
        res.clearCookie("accessToken");
        res.redirect("/login");
    });
}

const github = (req, res) =>{
    res.send({
        status: 'success',
        message: 'Success'
    });
}

const githubcallback = (req, res) =>{
    req.session.user = req.user;
    res.redirect('/products');
}

const current = (req, res) =>{
    res.send({
        status: 'success',
        user: req.user
    });
}

export default {
    register,
    failRegister,
    login,
    failLogin,
    logout,
    github,
    githubcallback,
    current
};