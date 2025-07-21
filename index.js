require('dotenv').config();
const express = require ('express') ;
const mysql = require ('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect ((err) =>{
if(err) {
    console.error('MySQL bağlantı hatası:',err);
    process.exit(1);
}
console.log('MySQL bağlantısı başarılı!');
});

app.get('/',(req,res)=>{
    res.send('Otel Rezervasyonu Yazılımı Backendi çalışıyor.!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server ${PORT} portunda çalışıyor ... `)
});