const userService = require('../services/userService');
const userValidation=require('../validations/userValidation');

const register = (req,res) => {
    const error = userValidation.validatRegister(req.body);
    if (error) return res.status(400).json ({error});
    userService.register(req.body, (err,result,msg) => {
        if (err) return res.status(500).json({error:"Veritabanı hatası."});
        if (msg) return res.status(400).json({error:msg});
        res.json ({message: "Kayıt başarılı!"});
    });
};

const login = (req,res) => {
    const error= userValidation.validateLogin(req.body);
    if (error) return res.status(400).json ({error})
    userService.login(req.body.email,req.body.password,:(err,user,msg) => {
        if (err) return res.status(500).json ({error:"Veritabanı hatası."});
        if (msg) return res.status(400).json ({error:msg});
        res.json ({message:"Giriş başarılı.",user});
});
};

module.exports={register,login} ;