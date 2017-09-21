//Variable Global de Programa
var calculadora = {
	//Creamos las variables del programa
	pantalla:document.getElementById('display'),
	guardar:		"0",		//Esta variable guarda el número digitado
	num1:				" ",		//Operación1
	num2: 			" ",		//Operación2
	iniciar:			1,		//inicia un nuevo operador
	decimal:			0,		//variable para decimales
	teclaOp:		" ",		//Variable al oprimir una tecla
	operador:		" ",		//Variable operacion matemática
	continuaOp:	" ",		//Variable para continuar la operación
	resultado:	" ",		//Variable que muestra resultado
	sigueIgual:	" ",		//Al presionar igual, nos permitira seguir realizando operaciones

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
		},
		//Función para capturar numero al presiona tecla
		ingresaNumero: function(digito){
			 // Limita a 8 números mostrados en pantalla
			if (this.pantalla.innerHTML.length < 8){
							// Condicional para verificar si no hay número en pantalla y si  la variable (iniciar) esta en true
	           	if (this.guardar=="0" || this.iniciar==1){
								// Captura el primer digito presionado
	            	this.pantalla.innerHTML=digito;
								// almacena en una variable para guardar primer digito
	            	this.guardar=digito;
								// Guardar si ya tiene almacenado algo o iniciar esta en falso
	            } else {
								// Muestra en pantalla el dígito presionado
	            	this.pantalla.innerHTML+=digito;
	        	    this.guardar+=digito
							}
	  		}
			this.iniciar=0; // Cambia estado de iniciar
			this.continuaOp=0; // cambia el estado de continuar operacion
			this.sigueIgual=0; // cambia el estado de continuar el igual
		},

		//Funcion de números decimales
		numeroDecimal: function() {
				// Limita a 8 números mostrados en pantalla
				if (this.pantalla.innerHTML.length < 8){

				// Si variable decimal esta en 0 y el numero es nuevo
				if (this.decimal==0 && this.iniciar==1){
					// Muestra en pantallael cero con el punto
					this.pantalla.innerHTML="0.";
					this.guardar="0.";
					// Verifica si el número decimal esta para incorporar y el numero esta iniciado
				} else if (this.decimal==0 && this.iniciar==0){
					//Concatena lo almacenado con la coma
					this.pantalla.innerHTML+=".";
					this.guardar+="."; 
				}
				this.iniciar=0; // Cambia para continuarOp el numero
				this.decimal=1; // Desactiva la funcion de incorporar otra coma
			}
		}
};
calculadora.init();	// Inicia el programa
