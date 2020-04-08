// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey            : 'AIzaSyB5oNsQ7FmhG_23Qw27Z4WSJdjh-7BbUFY',
	authDomain        : 'kell-b.firebaseapp.com',
	databaseURL       : 'https://kell-b.firebaseio.com',
	projectId         : 'kell-b',
	storageBucket     : 'kell-b.appspot.com',
	messagingSenderId : '240187413865',
	appId             : '1:240187413865:web:a0cd8bd2ba1420c60c19f8',
	measurementId     : 'G-RCE79R6NCD'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var dataBase = firebase.dataBase();

var trainName = '';
var destination = '';
var startTime = '';
var frequency = 0;

function currentTime() {
	var current = moment().format('LT');
	$('#currentTime').html(current);
	setTimeout(currentTime, 1000);
}

$('.form-field').on('click', function() {
	var trainTemp = $('#train-name').val().trim();
	var cityTemp = $('#destination').val().trim();
	var timeTemp = $('#first-train').val().trim();
	var freqTemp = $('#frequency').val().trim();

	sessionStorage.setItem('train', trainTemp);
	sessionStorage.setItem('city', cityTemp);
	sessionStorage.setItem('time', timeTemp);
	sessionStorage.setItem('freq', freqTemp);
});
