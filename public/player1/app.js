let socket = io("/player1Space");

let dotx = 550,
  redy = 50,
  greeny = 100,
  bluey = 150,
  yellowy = 200,
  blacky = 250,
  greyy = 300,
  r = 40,
  rearser = 300,
  rdraw = 10,
  cstroke = 10,
  textsize = 24,
  etextsize = 20,
  swidth = 1200,
  sheight = 600,
  twidth = 20,
  theight = 60,
  cred = [255, 108, 131],
  cgreen = [118, 255, 161],
  cblue = [100, 189, 255],
  cyellow = [255, 227, 14],
  cblack = [0,0,0],
  cbg = [238,238,238];

//adding confirmation that the connection was created
socket.on("connect", ()=> {
  console.log("connected to the server via sockets")
})

let userColour = [];
//add the p5 drawing app
function setup() {
  let canvas = createCanvas(swidth, sheight);
  canvas.parent('sketch-holder');
  background(cbg);
    noStroke();
    fill(cred);
    circle(redy, dotx, r);
    fill(cgreen);
    circle(greeny, dotx, r);
    fill(cblue);
    circle(bluey, dotx, r);
    fill(cyellow);
    circle(yellowy, dotx, r);
    fill(cblack);
    circle(blacky, dotx, r);

    noStroke();
    textSize(textsize);
    fill(cblack);
    text("press the dots to change color", twidth, theight);
    text("Player1", twidth, theight+40);
    text("Player2", twidth+400, theight+40);
    text("Player3", twidth+800, theight+40);
  line(400, 0, 400, 1200);
  line(800, 0, 800, 1200);

    //get random RGB colours;
    userColour[0] = 0;
    userColour[1] = 0;
    userColour[2] = 0;
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
