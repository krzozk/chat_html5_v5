var express = require("express");
var dust = require("dustjs-linkedin");
var cons = require("consolidate");
var http = require("http"); // libreria interna
var socketio = require("socket.io");

var app = express();
var servidor = http.createServer(app);
servidor.listen(8080);

//---- configuracion de carpetas estaticas ----
app.use("/css", express.static(__dirname + "/css"));
app.use("/javascript", express.static(__dirname + "/javascript"));

// ----- CONFIGURACION DEL SISTEMA DE TEMPLATES -----
app.engine("dust", cons.dust);
app.set("views", __dirname + "/vistas");
app.set("view engine", "dust");

console.log("servidor web listo");


app.get("/", function(req, res){
	res.render("cliente");
});

//habilitamos el websocket en el servidor
var io = socketio.listen(servidor);

//la variable socket representa al usuario q se conecto
io.sockets.on("connection", function(socket){
	//el on significa cuando ocurra un evento
	//el primer  argumento es el mnombre del evento
	//el segundo argumento es la función q ejecutamos en consecuencia
	socket.on("mensaje_al_servidor",function(datosCliente){
		//representa a todos los usuarios conectados
		//emit = produce un evento que puede escuchar el cliente o el servidor
		io.sockets.emit("mensaje_al_cliente", datosCliente);
	});
});

