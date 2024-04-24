const express = require("express");
const app = express();
const cors = require("cors");
require("./database/Config.js");
const User = require("./database/User.js");
const Products = require("./database/Product.js");
const Jwt = require('jsonwebtoken')
const jwtkey = 'e-comm'


app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let newUser = new User(req.body);
  let result = await newUser.save();
  result = result.toObject();
  delete result.password;
  if (result) {
    Jwt.sign({result}, jwtkey,{expiresIn:"1y"},(err, token) => {
      if (err){
        resp.send({result: "something went wrong"})
      }
      resp.send({result, auth: token});
    })
}});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body);
    if (user) {
      Jwt.sign({user}, jwtkey,{expiresIn:"2h"},(err, token) => {
        if (err){
          resp.send({result: "something went wrong"})
        }  
        resp.send({user, auth: token});
      })
      
    } else {
      resp.send({ result: "not valid entry" });
    }
  } else {
    resp.send({ result: "not valid entry" });
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Products(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get('/products', async (req, resp)=>{
  let products = await Products.find()
  if (products.length>0){
    resp.send(products)
  }
  else{
    resp.send([])
  }
})

app.delete('/products/:_id', async (req, resp)=>{
  const result = await Products.deleteOne(req.params)
  resp.send(result)
})

app.get('/product/:_id', async (req, res)=>{
  let result = await Products.findOne({_id:req.params._id})
  if (result){
    res.send(result)
  }
  else{
    res.send({result: "no result found"})
  }

})

app.put("/product/:_id", async(req, resp) => {
  console.log(req)
  let result = await Products.updateOne(
    {_id : req.params._id},
    {$set : req.body})  
    resp.send(result)
})

app.get('/search/:key', async(req, resp)=>{
  console.log(req.params.body)
  let result = await Products.find({
    "$or": [
      {name: {$regex :req.params.key}},
      { company: {$regex: req.params.key}},
      { price: {$regex: req.params.key}},
      { category: {$regex: req.params.key}},
    ]}
  )
  resp.send(result)
})

app.listen(5000);
