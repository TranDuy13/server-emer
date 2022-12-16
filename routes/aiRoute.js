const express = require("express");
const router = express.Router();
const {spawn} = require('child_process')
router.get('/question',(req,res)=>{

    const AI =spawn('python3',['chat.py',req.body.text])
    AI.stdout.on('data',function(data){
        res.json(data.toString())
    })
    // AI.on('close',(code)=>{
    //     res.json(data1)
    // })
   
    // var process = spawn('python', [
    //   './process.py',
    //   req.query.firstname,
    //   req.query.lastname
    // ]);
    // process.stdout.on('data', function(data) {
    //   console.log(data.toString());
  
    // });
})
module.exports= router