let noPublicClients = 0;
let noPlayer3Clients = 0;
let noPlayer2Clients = 0;
let noPlayer1Clients = 0;
let noWaitClients = 0;
//creating the express app
let express= require("express");
let app = express();
app.use("/", express.static("public"));

//creating the http server
let http = require("http");
let server = http.createServer(app);

// setup socket connections
let io = require("socket.io");
io = new io.Server(server);

//set up different variables for each namespace
let publicSockets = io.of("/publicSpace")
let player1Sockets = io.of("/player1Space")
let player2Sockets = io.of("/player2Space")
let player3Sockets = io.of("/player3Space")
let waitSockets = io.of("/waitSpace")


//listen for connections on the PUBLIC namespace
publicSockets.on("connection", (socket)=> {
  noPublicClients++;
  console.log("Client connected : ", socket.id, "  Total public : ", noPublicClients);
  

  //".on" getting "data", "emit" to all C
  socket.on("data", (data) => {
    console.log(data);
    //emit information from players
    publicSockets.emit("dataFromServer", data);
    player3Sockets.emit("dataFromServer", data);
    player2Sockets.emit("dataFromServer", data);
    player1Sockets.emit("dataFromServer", data);
  })

  //listen for when the socket disconnects
  socket.on("disconnect", () => {
    console.log("Client disconnected : ", socket.id)
    noPublicClients--;
  })
})

//listen for player1-3 space
waitSockets.on("connection", (socket)=> {

  noWaitClients++;
  console.log("Client connected : ", socket.id, "  Total Waiting : ", noWaitClients);

  //Listen for a message named 'msg' from this client
  socket.on('msg', function(data) {
      //Data can be numbers, strings, objects
      console.log("Received a 'msg' event");
      console.log(data);

      //Send a response to all clients, including this one
      waitSockets.emit('msg', data);

  });

  //listen for when the socket disconnects
  socket.on("disconnect", () => {
    console.log("Waiting disconnected : ", socket.id)
    noWaitClients--;
  })
})


//listen for player1-3 and lobby
player3Sockets.on("connection", (socket)=> {
  noPlayer3Clients++;
  console.log("Client connected : ", socket.id, "  Total player3 : ", noPlayer3Clients);

  //".on" getting "data", "emit" to all C
  socket.on("data", (data) => {
    console.log(data);
    //emit information ONLY to the player3-1
    waitSockets.emit("dataFromServer", data);
    player3Sockets.emit("dataFromServer", data);
  })

  //listen for when the socket disconnects
  socket.on("disconnect", () => {
    console.log("Player3 disconnected : ", socket.id)
    noPlayer3Clients--;
  })
})


//listen for player1-2 and lobby
player2Sockets.on("connection", (socket)=> {
  noPlayer2Clients++;
  console.log("Client connected : ", socket.id, "  Total player2 : ", noPlayer2Clients);

  //".on" getting "data", "emit" to all C
  socket.on("data", (data) => {
    console.log(data);
    //emit information ONLY to the player2 namespace and player1 space
    waitSockets.emit("dataFromServer", data);
    player2Sockets.emit("dataFromServer", data);
    player3Sockets.emit("dataFromServer", data);
  })

  //listen for when the socket disconnects
  socket.on("disconnect", () => {
    console.log("Player2 disconnected : ", socket.id)
    noPlayer2Clients--;
  })
})

//listen for player1 space
player1Sockets.on("connection", (socket)=> {
  noPlayer1Clients++;
  console.log("Client connected : ", socket.id, "  Total player1 : ", noPlayer1Clients);

  //".on" getting "data", "emit" to all C
  socket.on("data", (data) => {
    console.log(data);
    //emit information ONLY to the player1 namespace
    waitSockets.emit("dataFromServer", data);
    player1Sockets.emit("dataFromServer", data);
    player2Sockets.emit("dataFromServer", data);
    player3Sockets.emit("dataFromServer", data);
  })

  //listen for when the socket disconnects
  socket.on("disconnect", () => {
    console.log("Player1 disconnected : ", socket.id)
  })
})

//run the app on port 3000
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("server on port 3000");
})
