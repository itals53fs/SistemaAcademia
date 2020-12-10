const express = require('express');
const nunjucks = require('nunjucks');
const routes = require("./routes");

const porta = 3000;
const sever = express();
sever.use(express.urlencoded({extended:true}))
sever.use(express.static('public'))
sever.set("view engine", "html");
sever.use(routes)

nunjucks.configure("views", {
  express: sever,
  autoescape: false,
  noCache: true,
})
sever.listen(porta, function(){
  console.log(`server is running, porte ${porta}`)
});
