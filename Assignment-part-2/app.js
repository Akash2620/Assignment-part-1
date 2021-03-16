const fs = require('fs');
        // require express
        const express = require('express');
        // create object and add port
        const app = express();
        const port = 2620;
        
        // Define default route with express
        app.get('/',(req,res) => {
            res.send('<h1> Welcome to express server</h1>')
        })
        
        // Read file using express server
        app.get('/demo', (req,res) => {
            fs.readFile('./db.json',(err,result) => {
                if(err){
                    throw err;
                }else {
                    res.send(JSON.parse(result))
                }
            })
        })
        
        // Create server to listen on port
        app.listen(port,(err) => {
            console.log('server is running on port '+port);
        })