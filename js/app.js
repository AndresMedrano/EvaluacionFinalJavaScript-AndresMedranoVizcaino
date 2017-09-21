//Variable Global de Programa
var calculadora = {
	//Creamos las variables del programa
  pantalla:document.getElementById("display"),
  guardar:"0", 	//Esta variable guarda el número digitado
  num1:"",     //Operacion1
  num2:"",     //Operacion2
  iniciar: 1,  //inicia un nuevo operador
  decimal: 0,  //variable para decimales
  teclaOp: "", //Variable al oprimir una tecla
  operador:"", //Variable operacion matemática
  continuaOp:0, //Variable para continuar la operación
  resultado:0, //Variable que muestra resultado
  sigueIgual:0, //Al presionar igual, nos permitira seguir realizando operaciones

	//Función iniciar aplicación
	init: function(){
    //Recorrer las teclas que estamos oprimiendo en la calculadora
		for (var i = 0; i<document.getElementsByClassName("tecla").length; i++){
      //Al hacer clic tecla se presionara hacia abajo
			document.getElementsByClassName("tecla")[i].onmousedown = this.tclabajo;
       //Al hacer clic tecla se levantará
			document.getElementsByClassName("tecla")[i].onmouseup = this.tclarriba;
       //Clic para grabar la tecla presionada
			document.getElementsByClassName("tecla")[i].onclick =this.tclpres;
		}
  },
  //Función para efecto de tecla presionada
	tclabajo: function(event){
    //Capturamos la tecla presionada
		this.teclaOp = event.target.id;
    //Efecto de tecla hacia abajo cambiando la escala
		document.getElementById(this.teclaOp).style= "transform:scale(0.98);"
	},

  //Funcion vuelve la tecla a su estado original
	tclarriba: function(){ // evento tecla arriba
    //Transforma escala a original
		document.getElementById(this.teclaOp).style= "transform:scale(1);"
	},

  //Funcion para capturar tecla presionada
	tclpres: function(){
    //Condicional para verificar que la tecla es un número
		if (this.teclaOp <=9){
			calculadora.ingresaNumero(this.teclaOp);
    //Condicional para verificar si es un punto
		}else if (this.teclaOp == "punto"){
      //Llamar a función para verificar números decimales
			calculadora.numeroDecimal(this.teclaOp);
      //Verificar si lo que presiono el usuario es una operación
		}else if (this.teclaOp == "dividido" || this.teclaOp == "mas" || this.teclaOp == "por" || this.teclaOp == "menos"){

      //Siwtch para seleccionar la operación segun la tecla presionada
      switch(this.teclaOp){
				case "mas":
					this.operador = "+";
				break;
				case "menos":
					this.operador = "-";
				break;
				case "por":// Oprime tecla *
					this.operador = "*";
				break;
				case "dividido": // Oprime tecla /
					this.operador = "/";
				break;
			}
			calculadora.captuOperacion(this.operador);

      //Cuando el usuario presiona ON/C para borrar display
		}else if (this.teclaOp == "on"){
			calculadora.teclaOn();
      //Para cambiar de signo a número
		}else if (this.teclaOp == "sign"){
			calculadora.cambioSigno();
      //Evento resolver y mostrar resultado
		}else if (this.teclaOp == "igual"){
			calculadora.resolver();
      //Cuando el usuario presiona raiz cuadrada llama evento del mismo nombre
		}else if (this.teclaOp == "raiz"){
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
		this.continuaOp=0; // cambia el estado de continuaOp operacion
		this.sigueIgual=0; // cambia el estado de sigueIgual el igual
	},

  //Funcion de números decimales
	numeroDecimal: function(){
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
			this.iniciar=0; // Cambiar para continuar con el numero
			this.decimal=1; // Desactiva la funcion de incorporar otra coma
		}
	},

  //Funcion para verificar que operador se presiona
	captuOperacion: function(tipooperador){
		this.operador= tipooperador;
		this.decimal=0;
      // Si la variable esta en 0 almacena en operación1 el numero que presionamos
			if (this.continuaOp==0){
			this.num1=this.guardar;
			}else{ // Si continuaOp es distinto a 0 , toma el numero de la pantalla, que es el resultado de la operacion anterior.
			this.num1=this.pantalla.innerHTML;
			}
      // Permite incorporar nuevo número
		  this.iniciar=1;
	    this.pantalla.innerHTML=""; // Pantalla vacia a la espera de nuevo numero
	    this.continuaOp=0; // continuaOp lo devuelve a 0
	    this.sigueIgual=0; // cambia el estado de sigueIgual 1 igual
	},

  // Función para sacar la raiz cuadrada
	raizCuadrada: function(){
		if (this.continuaOp == 0){
			this.num1=this.guardar;
		} else {
			this.num1=this.pantalla.innerHTML;
		};
    // Realiza la operacion de la raiz cuadrada
		this.num1 = Math.sqrt(this.num1);

		if (this.num1.toString().length <= 8){
      // Convierte a número
			this.resultado=Number(this.num1);
      // Imprime en pantalla el resultado
			this.pantalla.innerHTML=this.resultado;
		} else {
      // El resultado es mayor a 8 caracteres
			if (this.num1 % 1 != 0) {
        // Busca la coma
				var posicion = this.num1.toString().lastIndexOf('.');
				this.num1 = Number(this.num1);
        // Acorta las decimales hasta completar 8 caracteres
				this.num1 = this.num1.toFixed(7-posicion);
        // Convierte a numero
				this.resultado = Number(this.num1);
        // Imprime en pantalla el resultado
				this.pantalla.innerHTML=this.resultado;
			}else{
        //Si el resultado es mayor a 8 caracteres pero es entero
				this.pantalla.innerHTML="Err"; // Imprimer Error
	    	}
		};
		this.continuaOp=1; // Activa la funcion de poder continuaOp
	},
  //Función Tecla On
	teclaOn: function(){
		this.guardar="0";
    //Muestra en pantalla nuevamente el 0
		this.pantalla.innerHTML=this.guardar;

	},

  // Funcion que cambia de signo
	cambioSigno: function(){
        // Toma de la pantalla el valor y lo convierte en numero
		    signo=Number(this.pantalla.innerHTML);
        // Cambia el signo del numero tomado
        signo=-signo;
        // Almacena en guardar el numero
        this.guardar=Number(signo);
        // Imprime en pantalla el resultado
        this.pantalla.innerHTML=this.guardar;
    },
  //Funcion para calcular el resultado
	resolver: function(){
    // No hay resultados previos
		if (this.sigueIgual ==0 ){
      // Almacena el número 2
			this.num2=this.guardar;
			this.sigueIgual=1;
      // Con resultado previo almacena el resultado en num1
		} else {
			this.num1=this.resultado;
		}
      // Ejecuta la operación completa concatenada
			solution=this.num1+this.operador+this.num2;
      // Realiza la operación
			this.resultado=eval(solution);

			if (this.resultado.toString().length <= 8){
        // Si es menor a 8 imprime resultado
				this.pantalla.innerHTML=Number(this.resultado);

			} else {
				if (this.resultado % 1 != 0) {
						var posicion = this.resultado.toString().lastIndexOf('.');
						this.resultado = Number(this.resultado);
						this.resultado = this.resultado.toFixed(7-posicion);
						this.resultado = Number(this.resultado);
						this.pantalla.innerHTML=this.resultado;
					} else {
						this.pantalla.innerHTML="Err";
	    			}
			 	}

			this.continuaOp=1; //Permite continuaOp si no presiona un número
	        this.iniciar=1; // Permite iniciar otro número
	        this.decimal=0; // Permite incorporar la coma

	    }
};

calculadora.init();	// Inicia el programa
