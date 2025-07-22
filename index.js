const express = require ('express') ;
const cors = require('cors');
require('dotenv').config();

const userController = require('./controllers/userController');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Otel Rezervasyonu Yazılımı Backendi çalışıyor.!');
});

app.post('/register',userController.register);
app.post('/login',userController.login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server ${PORT} portunda çalışıyor ... `)
});