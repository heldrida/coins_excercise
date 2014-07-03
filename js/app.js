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
			var myType = n < 1 ? "decimal" : "integer";

			self.myChange[myType] = [];

			self.myCoins.forEach(function(v){

				v = myType === "decimal" ? v * 100 : v;

				var x = Math.floor( num / v );
				num = num % v;

				if ( x !== 0 ) {

				  self.myChange[myType].push([x, v]);

				}

			});

			console.log( self.myChange );

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

			/*
			[ self.myChange["integer"], self.myChange["decimal"]  ].forEach(function(v, k){

				console.log(v);

				output += v[0] + "x " + v[1] + " pound" + ( v[1] > 1 ? "s" : "" );

			});
			*/

			for (p in self.myChange){

				self.myChange[p].forEach(function(v){

					if (p === "integer" ){
						output += v[0] + "x £" + v[1] + ", ";
					} else {
						output += v[0] + "x " + v[1] + "p, ";
					}

				});

			}

			output = output.substr(0, output.length -2);

			var div = document.createElement("div"); 
			var p = document.createElement("p"); 
			var h = document.createElement("h6");

			p.appendChild(document.createTextNode(output));
			h.appendChild(document.createTextNode("Result for £" + self.myAmount ));
			
			div.appendChild(h); 
			div.appendChild(p);

			if (document.getElementById("result").hasChildNodes()){
	
				document.getElementById("result").insertBefore(div, document.getElementById("result").firstChild);

			} else {

				document.getElementById("result").appendChild(div);

			}


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