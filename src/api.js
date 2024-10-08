const express = require('express');
const serverless = require('serverless-http')
const app = express();
const cors = require('cors')
const Controller = require('./Controller')
app.use(cors());
const router = express.Router();
// get all agents
router.get("/", async (req, res) => {
    let response = await Controller.getAgents();
    res.end(JSON.stringify(response));
  });
  
  //get single agent
  router.get("/:email", async (req, res) => {
    try {
      let email = req.params.email;
      let data = await Controller.getAgent(email);
      res.write(JSON.stringify(data));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify(err));
    } finally {
      res.end();
    }
  });
  

  //delete agent
  router.delete("/:email", async (req, res) => {
    try {
      let email = req.params.email;
      let data = await Controller.DeleteAgent(email);
      res.write(JSON.stringify(data));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify(err));
    } finally {
      res.end();
    }
  });
  
  //post agent sign up
  router.post("/", async (req, res) => {
    const data = await Controller.addAgent(req.body);
    res.write(JSON.stringify(data));
    res.end();
  });
  
  router.patch("/update/:email", async(req, res)=>{
    let email = req.params.email 
    let {type, content} = req.body;
    try { 
     let results = await Controller.updateAgentAttribute(email, {type, content});
    res.write(JSON.stringify(results))
    } catch(err)
    {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify(err));
    } finally 
    {
      res.end();
    }
  })
  
  //update agent online status
  router.patch("/status", async (req, res) => {
    let objdata = req.body;
    try {
      let results = await Controller.updateAgentStatus(objdata);
      res.write(JSON.stringify(results));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify(err));
    } finally {
      res.end();
    }
  });
  
  //send Messages
  router.post("/sendMessage", (req, res) => {
    let objMessage = req.body;
    res.writeHead(200, { "Content-Type": "application/json" });
    Controller.sendMessage(objMessage);
    res.write(JSON.stringify(objMessage));
    res.end();
  });

app.use( '/.netlify/functions/api', router)

module.exports.handler = serverless(app);