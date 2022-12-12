const express = require("express")
const cors = require("cors")

const app = express()
const http = require("http").Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});


app.use(cors(
    {
        origin: "http://localhost:3000/",
        credentials: true
    }
))

app.get('/', function(req, res) {
    res.send('hello');
 });

 let clients = [];
 
 //Whenever someone connects this gets executed
 io.on('connection', function(socket) {
    console.log('A user connected'+ socket.id);
 
    socket.on("send-id", (data) => {
        const newclient = clients.filter((item) => item.customId != data.id);
        clients = [...newclient];
        clients.push({sid: socket.id, customId: data.id})
        console.log(clients);
    })

    socket.on("send-message", (data) => {

        console.log(data);
        const finduser = clients.filter((item) => item.customId == data.to)[0];
        console.log(finduser);
        socket.to(finduser.sid).emit("receive-message", data)
    })

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected'+ socket.id);
    });
 });


 io.on("recievemessage", ({foruser, from, message}) => {
    console.log("recieved message", foruser, from);
    io.to("1").emit(message);
})

http.listen(3000, function() {
    console.log('listening on *:3000');
});