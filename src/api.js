const express = require('express');
const serverless = require('serverless-http')

const app = express();

const router = express.Router();

router.get('/', (req, res)=>{
 res.json({'content': "testing..."})
})

router.get('/greet', (req, res)=>{
    res.json({content: "Greetings"})
})

app.use(  '/.netlify/functions/api', router)

module.exports.handler = serverless(app);