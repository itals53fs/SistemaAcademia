const fs = require('fs');
const data = require('./data.json');                                                  
//post
const post = function(req, res){
  const keys = Object.keys(req.body);
  let key;
  for(key of keys){

    if(req.body[key] == ""){}
      //return res.send('Please, fill all fields');
  }
  let {avatar, birth, name, services, gender} = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = data.instructors.length+1;
  data.instructors.push({
    avatar,
    birth,
    created_at,
    id,
    gender,
    services,
    name,
  });

  fs.writeFile("data.json",JSON.stringify(data,null,2), function(err){
    if(err){
      return res.send("weite file err");
    }
  });
  return res.redirect("/instructors/create");
}

const getUser = function(req, res){
  let {id} = req.params;
  id.replace("=", "")
  const dados = data.instructors.find((item)=>{
  return item.id == id;
  });
  if(!dados) return res.json("erro");

  return res.json(dados);
}
// update

// delete
module.exports = {
  post,
  getUser,
}