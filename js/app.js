//Variable Global de Programa
var calculadora = {
	//Creamos las variables del programa
	pantalla:document.getElementById('display'),
<<<<<<< HEAD
	guardar:		"0",		//Esta variable guarda el número digitado
	num1:				" ",		//Operación1
	num2: 			" ",		//Operación2
	iniciar:			1,		//inicia un nuevo operador
	decimal:			0,		//variable para decimales
	teclaOp:		" ",		//Variable al oprimir una tecla
	operador:		" ",		//Variable operacion matemática
	continuaop:	" ",		//Variable para continuar la operación
	resultado:	" ",		//Variable que muestra resultado
	igual:			" ",		//Al presionar igual, nos permitira seguir realizando operaciones

		//Función iniciar aplicación
		init: function() {
			//Recorrer las teclas que estamos oprimiendo en la calculadora
			for (var i = 0; i < document.getElementById('tecla').length; i++) {
					 //Al hacer clic tecla se presionara hacia abajo
					 document.getElementsByClassName('tecla')[i].onmousedown = this.tclabajo;
					 //Al hacer clic tecla se levantará
					 document.getElementsByClassName('tecla')[i].onmouseup = this.tclarriba;
					 //Clic para grabar la tecla presionada
					 document.getElementsByClassName('tecla')[i].onmouseup = this.tclpres;
			}
		},
		//Función para efecto de tecla presionada
		tclabajo:function(event) {
			//Capturamos la tecla presionada
			this.teclaOp = event.target.id;
			//Efecto de tecla hacia abajo cambiando la escala
			document.getElementById(this.teclaOp).style = "transform:scale(0.95);"
		},
		//Funcion vuelve la tecla a su estado original
		tclarriba: function() {
			//Transforma escala a original
			document.getElementById(this.teclaOp).style= "transform:scale(1);"
		},
		//Funcion para capturar tecla presionada
		tclpres: function() {

			//Condicional para verificar que la tecla es un número
			if (this.teclaOp <=9) {
				calculadora.ingresaNumero(this.teclaOp)

			 //Condicional para verificar si es un punto
			}else if (this.teclaOp == "punto") {

				//Llamar a función para verificar números decimales
				calculadora.numeroDecimal(this.teclaOp)

			 //Verificar si lo que presiono el usuario es una operación
			}else if (this.teclaOp == "dividido" || this.teclaOp == "mas" || this.teclaOp == "por" || this.teclaOp == "menos") {

				//Siwtch para seleccionar la operación segun la tecla presionada
				switch (this.teclaOp) {
					case "mas":
						this.operacion = "+";
					break;

					case "menos":
						this.operacion = "-";
					break;

					case "por":
						this.operacion = "*";
					break;

					case "dividido":
						this.operacion = "/";
					break;
				}
				calculadora.captOperacion(this.operacion)
				//Cuando el usuario presiona ON/C para borrar display
			}else if (this.teclaOp == "on") {
				calculadora.teclaOn();

				//Para cambiar de signo a número
			}else if (this.teclaOp == "signo") {
				calculadora.cambiaSigno();
				//Evento resolver y mostrar resultado
			}else if (this.teclaOp == "igual") {
				calculadora.resolver();
				//Cuando el usuario presiona raiz cuadrada llama evento del mismo nombre
			}else if (this.teclaOp == "raiz") {
				calculadora.raizCuadrada();
			}
		}

=======
	guardar:	"0",		//Esta variable guarda el número digitado
	num1:		" ",		//Operación1
	num2: 		" ",		//Operación2
	iniciar:	  1,		//inicia un nuevo operador
	decimal:	  0,		//variable para decimales
	teclaop:	" ",		//Variable al oprimir una tecla
	operador:	" ",		//Variable operacion matemática
	continuaop:	" ",		//Variable para continuar la operación
	resultado:	" ",		//Variable que muestra resultado
	igual:		" ",		//Al presionar igual, nos permitira seguir realizando operaciones 
>>>>>>> origin/master
}
calculadora.init();	// Inicia el programa
