let socket = io("/player3Space");



//adding confirmation that the connection was created
socket.on("connect", ()=> {
  console.log("connected to the server via sockets")
})

let userColour = [];
//add the p5 drawing app
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  background(20,123,243); 
  noStroke();
  //get random RGB colours;
  userColour[0] = random(255);
  userColour[1] = random(255);
  userColour[2] = random(255);
}

function mouseDragged()
{
  let dataObjs = {
    x : mouseX,
    y : mouseY,
    colour :  userColour
  }
  socket.emit("data", dataObjs);
}


//on getting data from server, draw the painting
socket.on("dataFromServer", (dataObjs) => {
  // console.log(dataObjs);
  drawPainting(dataObjs);
})


function drawPainting(dataObjs) {
  fill(dataObjs.colour[0],dataObjs.colour[1] ,dataObjs.colour[2]);
  circle(dataObjs.x, dataObjs.y, 20);
}
