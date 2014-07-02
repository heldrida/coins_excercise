document.addEventListener("DOMContentLoaded", function () {
  

	var myApp = {

		myCoins: [2, 1, 0.50, 0.20, 0.02, 0.01],

		myAmount: 0,

		myChange: {},

		myForm: false,

		setAmount: function(x){

			console.log("fn setAmount!");

			this.myAmount = document.userForm.amount.value;;

			console.log(this.myAmount);

		},

		run: function(event){
			
			console.log("fn run!");

			event.preventDefault();

			this.setAmount();

		},

		init: function(){

			console.log("fn init!");

			this.myForm = document.userForm;

			this.myForm.addEventListener("submit", this.run.bind(this), false);

		}

	};

	myApp.init();


}, false);