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
//remove user that closed a socket from array
const removeUser = (socketId) => { users = users.filter((user) => user.socketId !== socketId); }
//get users that are online and revivers of the massage
const getUser = (userId) => { return users.filter(user => user.userId === userId); }

// when the user connect the application will add the user to array and send bordcast to all users to notifiy it's online
io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        console.log("there is new connection. Online sessions:" + users.length)
    });

    //Receive a massage and find the recevier socket id to send it to him in real time.
    socket.on("sendMessage", ({ sndId, rcvId, messageTxt }) => {
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

    //on Discconect remove the user from the online users array
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
        console.log("a user Disconnected!. Online sessions:" + users.length);
    });
});

httpsServer.listen(8900);
