const homeJSON = require("../data/home");
const homeModel = require("../model/homeModel");
const bcrypt = require("bcrypt");
const Axios = require("axios");

async function rukshan(req, res) {
  const tests = await homeModel.find();
  res.json(tests);
}

async function searchForID(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ Alert: "No ID Found " });

  const foundID = homeJSON.find((x) => x.id === id);

  if (!foundID) {
    return res.status(404).json({ Alert: "ID not found or out of boundary" });
  } else {
    return res.status(200).json(foundID);
  }
}

async function createUsers(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ Alert: "Either username, password, or both are missing!" });
  }

  const checkUsername = await homeModel.findOne({ username: username });
  const hashPWD = bcrypt.hashSync(password, 10);

  if (!checkUsername) {
    const userFinal = new homeModel({ username, password: hashPWD }); // Instantiate the model with an object

    await userFinal.save();
    return res.status(201).json({ Alert: `${username} Created!` });
  } else {
    return res.status(409).json({
      Alert: `${username} already exists, please use another username!`,
    });
  }
}

async function LoginAccount(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ Alert: "Either username, password, or both are missing!" });
  }

  const findusername = await homeModel.findOne({ username: username });
  if (!findusername)
    return res.status(404).json({ Alert: `${username} doesn't exist` });
  const passwordverify = await /*bcrypt.compareSync*/ homeModel.findOne({password:password});
  if (!passwordverify) {
    return res.status(403).json({ Alert: `${password} is the wrong password` });
  } else {
    return res.status(200).json({ Alert: `${username} Logged in!` });
  }
}

async function DeleteAccount(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ Alert: "Either username, password, or both are missing!" });
    }
  
    const findusername = await homeModel.findOne({ username: username });
    if (!findusername)
      return res.status(404).json({ Alert: `${username} doesn't exist` });
    const passwordverify = bcrypt.compareSync(password, findusername.password);
    if (!passwordverify) {
      return res.status(403).json({ Alert: `${password} is the wrong password` });
    } else {
        const findusername = await homeModel.findOneAndDelete({ username: username });  
      return res.status(200).json({ Alert: `${username} Deleted!` });
    }
  }


  async function apiCall(req,res){

    const {search} = req.query;

    try{
        const r = await Axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${search}`).then((r)=>{
            res.json(r.data.data.movies);
        });
       
    }catch(error){
        console.error(error);
    }
  };


module.exports = { rukshan, searchForID, createUsers , LoginAccount , DeleteAccount,apiCall};
