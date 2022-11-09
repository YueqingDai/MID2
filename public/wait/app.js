
  //Open and connect socket
  let socket = io("/waitSpace");
    //Listen for confirmation of connection
    socket.on('connect', function () {
      console.log("Connected");
  });

window.addEventListener('load', function () {


  /* --- Code to RECEIVE a socket message from the server --- */
  let chatBox = document.getElementById('chat-box-msgs');

  //Listen for messages named 'msg' from the server
  socket.on('msg', function (data) {
      console.log("Message arrived!");
      console.log(data);

      //Create a message string and page element
      let receivedMsg = data.name + ": " + data.msg;
      let msgEl = document.createElement('p');
      msgEl.innerHTML = receivedMsg;

      //Add the element with the message to the page
      chatBox.appendChild(msgEl);
      //Add a bit of auto scroll for the chat box
      chatBox.scrollTop = chatBox.scrollHeight;
  });

  /* --- Code to SEND a socket message to the Server --- */
  let nameInput = document.getElementById('name-input')
  let msgInput = document.getElementById('msg-input');
  let sendButton = document.getElementById('send-button');

  sendButton.addEventListener("click", function () {
      let curName = nameInput.value;
      let curMsg = msgInput.value;
      let msgObj = { "name": curName, "msg": curMsg };

      //Send the message object to the server
      socket.emit('msg', msgObj);
  });

});

//add the p5 canvas to display the drawing
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(20, 123, 243);
  noStroke();
}

//on getting data from server, draw the painting
socket.on("dataFromServer", (dataObjs) => {
  drawPainting(dataObjs);
})

//function for drawing
function drawPainting(dataObjs) {
  fill(dataObjs.colour[0], dataObjs.colour[1], dataObjs.colour[2]);
  circle(dataObjs.x, dataObjs.y, 20);
}
