const mariadb = require("mariadb");
const express = require("express");
const cors = require("cors");
const app = express();


const pool = mariadb.createPool({
    
    host: "192.168.0.191",
    user: "2team",
    password: "2team",
    database: "2team",
    //port: "3306"
})

app.use(cors());
app.use(express.json());

app.get('/id',async (req,res)=>{

    const input_ID = req.query.ID;
    const conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM user WHERE ID = (?)",[input_ID]);
    
    conn.release();
    
    if(result.length == 0) {
       return res.json({ID_check :true});
    }

    res.json({ID_check :false});

})


app.post('/',async (req,res) => {

    const input_ID = req.body.ID;
    const input_PW = req.body.PW;

    const conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM user WHERE ID = (?)",[input_ID]);
    
    const result_Null = JSON.stringify({ID:'Non_ID',PW:'Non_PW'});

    conn.release();


    if(result.length == 0) {
        return res.send(result_Null);
    }

    
    if(input_ID != result[0].ID)  {
        console.log("아이디 불일치");
        result[0].ID = 'Non_ID';
    }
    else if(input_PW != result[0].PW){
        console.log("비밀번호 불일치");
        result[0].PW = 'Non_PW';
    }
    else {
        console.log("성공");
    }
    res.send(result[0]);
    
}) 

app.post('/register', async (req,res) => {
    const newID = req.body.ID;
    const newPW = req.body.PW;
    const newNick = req.body.Nickname;

    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO user(ID, PW, Nickname) VALUES (?,?,?)",[newID, newPW, newNick]);
    conn.release(); 
})





app.listen(8080,()=>{
    console.log("서버실행중");
})

