const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
const mysql = require("mysql2");
const query = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "assinment3",
});
//1
//condition
app.post("/Addusers", (req, res) => {
    const { name, email, password,age } = req.body;
        query.execute(
            `INSERT INTO users (name,email,password,age) Values ('${name}','${email}','${password}',${age})`
          );
          res.json({ message: "success" });
    });
  app.delete('/deleteuser',(req,res)=>{
      const {id} = req.body
        query.execute(`Delete from users where id =${id}`)
        res.json({message:"success"})
  });
  app.put("/updateuser",(req,res)=>{
      const {id,name,email,password,age}=req.body
        query.execute(`Update users set name = '${name}', email = '${email}', password='${password}',age='${age}' where id =${id}`)
        res.json({message:'success'})
  });

//5 
app.get("/SelectlUserscondition", (req, res) => {
    query.execute("SELECT * FROM users WHERE name LIKE 'A%' && age < 30", (err, data) => {
      res.json({ message: "success", data });
    });
  });
//6
app.get("/Selectids", (req, res) => {
    query.execute("Select * from users Where id in (2,3,4)", (err, data) => {
      res.json({ message: "success", data });
    });
  });
  //7
app.get("/SelectAllUsers", (req, res) => {
    query.execute("Select * from users", (err, data) => {
      res.json({ message: "success", data });
    });
  });
  //8 
  app.get("/SelectAllUsersProducts", (req, res) => {
query.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT users.id,users.name AS user, products.ProductName AS product FROM users LEFT JOIN products ON products.id = users.product_id ";
    query.query(sql, function (err, result) {
      if (err) throw err;
      res.json({"message":"Success",result})
    });
  });
  });
  /////////////////////////////////////////////////////
  //1
  //condition
app.post("/AddProducts", (req, res) => {
    const { ProductName,ProductDescription,Price ,createdby } = req.body;
    query.execute(
      `INSERT INTO products (ProductName,ProductDescription,Price,createdby) Values ('${ProductName}','${ProductDescription}','${Price}','${createdby}')`
    );
    res.json({ message: "success" });
  });
  //2
  //condition
  app.delete('/DeleteProducts',(req,res)=>{
    const {id} =req.body
    query.execute(`Delete from products where id = ${1} && createdby = "Mohammed"`)
    res.json({message:"success"})
})
  //3
  //condition
  app.put("/UpdateProducts",(req,res)=>{
    const {id,ProductName,ProductDescription,Price,createdby}=req.body
    query.execute(`Update products set ProductName = '${ProductName}', ProductDescription = '${ProductDescription}', Price ='${Price}' where id =${3} && createdby = "Ali"`)
    res.json({message:'success'})
})
  //4
  app.get("/SelectAllProducts", (req, res) => {
    query.execute("Select * from products", (err, data) => {
      res.json({ message: "success", data });
    });
  });
  //5
  app.get("/SelectByPrice", (req, res) => {
    query.execute("Select * from products where price > 3000", (err, data) => {
      res.json({ message: "success", data });
    });
  });

app.get('/', (req, res) => res.send(''))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))