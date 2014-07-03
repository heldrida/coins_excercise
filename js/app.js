document.addEventListener("DOMContentLoaded", function () {
  

	var myApp = {

		myCoins: [2, 1, 0.50, 0.20, 0.02, 0.01],

		myAmount: 0,

		myChange: {},

		myForm: false,

		validateUserInput: function(){

			var self = this;

			usrInp = document.userForm.amount.value;

			return /^[0-9]+p|£[0-9]+\.?([0-9])+$/.test(usrInp) ? usrInp : false;
		  
		},

		calc: function(n){

			var self = this;

			if ( parseFloat(n) === 0.00 ){
				
				return false;

			}

			var self = this;
			var num = n < 1 ? n * 100 : n;

			self.myChange[n] = [];

			self.myCoins.forEach(function(v){

				v = n < 1 ? v * 100 : v;

				var x = Math.floor( num / v );
				num = num % v;

				if ( x !== 0 ) {

				  self.myChange[n].push([x, v]);

				}

			});

		},

		normalise: function(usrVal){

			var self = this;

			return parseFloat(usrVal) === parseInt(usrVal) ? usrVal/100 : usrVal;

		},

		clearUsrInput: function(data){

			["£", "p"].forEach(function(v){

				data = data.replace(v, "");

			});


			return data;

		},

		setAmount: function(x){

			var self = this;

			if ( !self.validateUserInput() ){

				alert("Sorry! Please try again, using the format as it's demonstrated in the following example: 150p or £1.50");

				return false;

			}

			self.myAmount = self.clearUsrInput( document.userForm.amount.value );

			self.myAmount = self.normalise(self.myAmount);

		},

		reset: function() {

			var self = this;

			self.myAmount = 0;
			self.myChange = {};

			document.userForm.amount.value = self.myAmount;

		},

		showResults: function(){

			var self = this;
			
			var output = '';

			console.log( "self.myChange" );
			console.log( self.myChange );

		},

		run: function(ev){

			ev.preventDefault();

			var self,
				integer, 
				decimal;

			self = this;

			self.setAmount();

			integer = Math.floor(self.myAmount);
			decimal = self.myAmount - integer;
			decimal = decimal.toFixed(2);

			[integer, decimal].forEach(function(v){
				
				v !== 0 ? self.calc(v) : null;

			});


			self.showResults();

			self.reset();

		},

		init: function(){

			this.myForm = document.userForm;

			this.myForm.addEventListener("submit", this.run.bind(this), false);

		}

	};

	myApp.init();


}, false);