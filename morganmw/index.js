const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const server = express();
const port = 3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


morgan.format('custom', ':method :url HTTP/:http-version [:date[clf]] :status :res[content-length] - :response-time ms')

server.use(morgan('custom', { stream: accessLogStream }))

// server.use(morgan('tiny'));

server.get('/',(req,res) => {
    res.status(200).send('Welcome to the api');
})
server.get('/get-users',(req,res) => {
    res.status(200).json([{id:1, name:'meena'},{id:2, name:'saurabh'}])
})
server.post('/add-user',(req,res) => {
    res.status(201).send('User added successfully');
    
})
server.put('/user/:id',(req,res) => {
    res.status(201).send(`User with id ${req.params.id} updated successfully`);
    
})
server.delete('/user/:id',(req,res) => {
    res.send(`User with id ${req.params.id} deleted successfully`);
    
})



server.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
})
