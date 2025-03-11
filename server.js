const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const socketServer = require('./socketServer')
const authRoutes = require('./routes/authRoutes');
const friednInvitationRoutes = require('./routes/friednInvitationRoutes');

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/auth',authRoutes);
app.use('/api/friend-invitation',friednInvitationRoutes);


const server = http.createServer(app);
socketServer.registerSocketServer(server)

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    server.listen(PORT,()=>{
        console.log(`Server Start at port number ${PORT}`);
    })
}).catch(err =>{
    console.log('cannot connect to database',err);
})