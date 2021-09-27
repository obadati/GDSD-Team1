const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

//define online user array that store open sessions as object {userID,SocketID} 
let users = [];

//Add user that open a socket to the user array
const addUser = (userId, socketId) => { users.push({ userId, socketId }); };
//remove user that closed a socket from array
const removeUser = (socketId) => { users = users.filter((user) => user.socketId !== socketId); }
//find if the user who shoul receiver the massage have an open socket to return it
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

