const fs = require('fs');
const httpsServer = require("https").createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/homeforme-aws.de/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/homeforme-aws.de/fullchain.pem")
});

const options = {
    cors: {
        origin: "https://www.homeforme-aws.de",
    },
};

const io = require("socket.io")(httpsServer, options);
console.log("server is up ");
//define online user array
let users = [];
//add user to array
const addUser = (userId, socketId) => { users.push({ userId, socketId }); };
//remove user from array
const removeUser = (socketId) => { users = users.filter((user) => user.socketId !== socketId); }
//get users that are online and revivers of the massage
const getUser = (userId) => { return users.filter(user => user.userId === userId); }

// when the user connect
io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        console.log("there is new connection. Online sessions:" + users.length)
    });

    //Receive a massage and send it to receive sockets
    socket.on("sendMessage", ({ sndId, rcvId, messageTxt }) => {
        //get array of sockets
        const user = getUser(rcvId);
        if (user) {
            user.forEach(element =>
                io.to(element.socketId).emit("getMessage", {
                    sndId,
                    rcvId,
                    messageTxt,
                }));
        }
    });

    //on Discconect remove the user
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
        console.log("a user Disconnected!. Online sessions:" + users.length);
    });
});

httpsServer.listen(8900);
