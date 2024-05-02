const express = require("express");
const app = express();
let mysql = require('mysql');
const port = 8000;

app.get('/',(req,res)=>{
    res.send("Welcome Home")
});

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.get("/getAllShops",(req,res)=>{
    let connection = mysql.createConnection({
            host: 'localhost',
            user: 'nc',
            password: '123456',
            database: 'mydatabase'
    });
    connection.connect(function(err) {
        if(err) throw err;
        console.log('Connected to the MySQL server.');
        var sql = "select * from tbl_shop";
        connection.query(sql,function(err,result){
            res.send(result)
            if(err) throw err;
            console.log("ok");
        });
    })
});
app.delete("/DELETEFunction",(req,res)=>{
    var id = req.body.id;
    console.log("Delete id ");
    let connection = mysql.createConnection({
            host: 'localhost',
            user: 'nc',
            password: '123456',
            database: 'mydatabase'
    });
    connection.connect(function(err) {
        if(err) throw err;
        console.log('Connected to the MySQL server.');
        var sql = "delete from tbl_shop where id = "+id;
        connection.query(sql,function(err,result){
            res.send(result)
            if(err) throw err;
            console.log("ok");
        });
    })
});
app.post("/insert",(req,res)=>{
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var bio = req.body.bio;
    var image = req.body.image;

    console.log("Data : "+
        name+" , "+
        address+" , "+
        phone+" , "+
        bio+" , "+
        image
    )
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'nc',
        password: '123456',
        database: 'mydatabase'
    });
    connection.connect(function(err) {
        if(err) throw err;
        console.log('Connected to the MySQL server.');
        var sql = "insert into tbl_shop(name,address,phone,bio,image) value('"+name+"','"+address+"',"+phone+",'"+bio+"','"+image+"')";
        console.log("query : "+sql);
        connection.query(sql,function(err,result){
            res.send("Inserted")
            if(err) throw err;
            console.log("1 record inserted");
        });
    })
});
app.get("/getShopByID/:id",(req,res)=>{
    var id = req.params.id;

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'nc',
        password: '123456',
        database: 'mydatabase'
    });
    connection.connect(function(err) {
        if(err) throw err;
        console.log('Connected to the MySQL server.');
        var sql = "select * from tbl_shop where id = "+id;
        console.log("query : "+sql);
        connection.query(sql,function(err,result){
            res.send(result)
            if(err) throw err;
            console.log("1 record inserted");
        });
    })
    
});
app.post("/login",(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'nc',
        password: '123456',
        database: 'mydatabase'
    });
    connection.connect(function(err) {
        if(err) throw err;
        console.log('Connected to the MySQL server.');
        var sql = "select * from tbl_user where username = '"+username+"'";
        console.log("query : "+sql);
        connection.query(sql,function(err,result){
            if(result.length > 0){
                console.log(JSON.stringify(result))
                let connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'nc',
                    password: '123456',
                    database: 'mydatabase'
                });
                connection.connect(function(err) {
                    if(err) throw err;
                    console.log('Connected to the MySQL server.');
                    var sql = "select user_id,username,email,phone,role from tbl_user where password = '"+password+"' and user_id = "+result[0].user_id;
                    console.log("query : "+sql);
                    connection.query(sql,function(err,result){
                        if(result.length>0){
                            console.log("login success");
                            // res.send(result);
                            res.status(200).json({
                                status: 200,
                                data: result
                            })
                        }else{
                            res.send("Password invalid")
                            console.log("Password invalid");
                        }
                        // res.send(result)
                        if(err) throw err;
                        // console.log("1 record inserted");
                    });
                })
                
            }else{
                console.log("User Not Found!")
                res.send("User Not Found!");  
            }
            
            if(err) throw err;
        });
    })
});
app.post("/update/:id",(req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var bio = req.body.bio;
    var image = req.body.image;
    console.log(
        "id = "+id+" , "+
        "name = "+name+" , "+
        "address = "+address+" , "+
        "phone = "+phone+" , "+
        "bio = "+bio+" , "+
        "image = "+image+" , "
    );
    
    
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'nc',
        password: '123456',
        database: 'mydatabase'
    });
    connection.connect(function(err) {
        if(err) throw err;
        console.log('Connected to the MySQL server.');
        var sql = "update tbl_shop set name = '"+name+"', address = '"+address+"',phone = "+phone+",bio = '"+bio+"',image = '"+image+"' where id = 18";
        console.log(sql);
        connection.query(sql,function(err,result){
            res.send("Successfully Updated!")
            if(err) throw err;
            // console.log("1 record inserted");
        });
    })
    
});
app.listen(port,function(){
    console.log("Server is running on http://localhost:"+port);
});
