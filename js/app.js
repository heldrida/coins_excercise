document.addEventListener("DOMContentLoaded", function () {
  

	var myApp = {

		myCoins: [2, 1, 0.50, 0.20, 0.02, 0.01],

		myAmount: 0,

		myChange: {},

		myForm: false,

		calc: function(n){

		  if (n === 0){
		  	
		  	return false;

		  }
		  
		  var self = this;
		  var num = n < 1 ? n * 100 : n;
		  this.myChange[n] = [];

		  self.myCoins.forEach(function(v){
		    
		    v = n < 1 ? v * 100 : v;
		    
		    var x = Math.floor( num / v );
		    num = num % v;

		    if ( x !== 0 ) {
		    
		      self.myChange[n].push([x, v]);
		    
		    }
		    
		  });

		  console.log(self.myChange);

		},

		normalise: function(usrVal){

			return usrVal === parseInt(usrVal) ? usrVal : usrVal * 100;

		},

		setAmount: function(x){

			this.myAmount = document.userForm.amount.value;;

			this.myAmount = this.normalise(this.myAmount);

		},

		run: function(ev){

			ev.preventDefault();

			var self,
				integer, 
				decimal;

			self = this;

			this.setAmount();

			this.myAmount = this.myAmount / 100;
			
			integer = Math.floor(this.myAmount);
			decimal = this.myAmount - integer;
			decimal = decimal.toFixed(2);

			[integer, decimal].forEach(function(v){
				
				v !== 0 ? self.calc(v) : null;

			});

		},

		init: function(){

			this.myForm = document.userForm;

			this.myForm.addEventListener("submit", this.run.bind(this), false);

		}

	};

	myApp.init();


}, false);