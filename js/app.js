document.addEventListener("DOMContentLoaded", function () {
  

	var myApp = {

		myCoins: [2, 1, 0.50, 0.20, 0.02, 0.01],

		myAmount: 0,

		myChange: {},

		myForm: false,

		normalise: function(usrVal){

			return usrVal === parseInt(usrVal) ? usrVal : usrVal * 100;

		},

		setAmount: function(x){

			this.myAmount = document.userForm.amount.value;;

			this.myAmount = this.normalise(this.myAmount);

		},

		run: function(ev){

			ev.preventDefault();

			var x, 
				integer, 
				decimal;

			this.setAmount();

			this.myAmount = this.myAmount / 100;
			integer = Math.floor(this.myAmount);
			decimal = this.myAmount - integer;

			console.log("this.myAmount");
			console.log(this.myAmount);

			console.log("integer:");
			console.log(integer);

			console.log("decimal");
			console.log(decimal);

		},

		init: function(){

			this.myForm = document.userForm;

			this.myForm.addEventListener("submit", this.run.bind(this), false);

		}

	};

	myApp.init();


}, false);