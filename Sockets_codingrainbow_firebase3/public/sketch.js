var database;
var drawing = [];

function setup() {
	canvas = createCanvas(1300, 500);
	background(51);
	canvas.parent('canvascontainer');

	socket = io.connect('http://localhost:3000');
	socket.on('mouse', newDrawing);

	var saveButton = select('#saveButton');
	saveButton.mousePressed(saveDrawing);

	var config = {
    apiKey: "AIzaSyDVsbqBGgXtf7Leg-gt8mWl6eVzO9vntio",
    authDomain: "my-project-1491022596917.firebaseapp.com",
    databaseURL: "https://my-project-1491022596917.firebaseio.com",
    projectId: "my-project-1491022596917",
    storageBucket: "my-project-1491022596917.appspot.com",
    messagingSenderId: "481438727330"
  };
  firebase.initializeApp(config);
  console.log(firebase);

  database = firebase.database();

}

function newDrawing(data) {
	noStroke();
	fill(255, 0, 200);
	ellipse(data.x, data.y, 36, 36);
}

function mouseDragged() {
	console.log('Sending: ' + mouseX + ',' + mouseY);

	var data = {
		x:mouseX,
		y:mouseY
	}

	socket.emit('mouse', data);

	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, 36, 36);
  
}

function draw() {
	fill(255);
	ellipse(mouseX, mouseY, 36, 36);
  
}

function saveDrawing() {
	var ref = database.ref('drawings');
	var data = {
		name: "Estee",
		drawing: drawing
	}


	var result = ref.push(data, dataSent);
	console.log(result.key);

	function dataSent(err, status) {
		console.log(status);

	}
}