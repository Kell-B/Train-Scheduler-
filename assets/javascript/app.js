// Your web app's Firebase configuration

var database = firebase.database();

var trainName = '';
var destination = '';
var startTime = '';
var frequency = 0;

console.log(currentTime);
console.log(moment().format('LTS'));

$(document).ready(function() {
	// Here I am creating a function that will call the current time using
	// moment.js, and display it
	function currentTime() {
		var current = moment().format('LTS');
		$('#currentTime').html(current);
		setTimeout(currentTime, 1000);
	}

	console.log(currentTime);
	console.log(moment().format('LTS'));

	// $(document).on('click', '.arrival', function() {
	// 	keyref = $(this).attr('data-key');
	// 	database.ref().child(keyref).remove();
	// 	window.location.reload();
	// });

	$('.form-field').on('keyup', function() {
		var trainTemp = $('#train-name').val().trim();
		var cityTemp = $('#destination').val().trim();
		var timeTemp = $('#first-train').val().trim();
		var freqTemp = $('#frequency').val().trim();

		sessionStorage.setItem('train', trainTemp);
		sessionStorage.setItem('city', cityTemp);
		sessionStorage.setItem('time', timeTemp);
		sessionStorage.setItem('freq', freqTemp);
	});

	$('#train-name').val(sessionStorage.getItem('train'));
	$('#destination').val(sessionStorage.getItem('city'));
	$('#first-train').val(sessionStorage.getItem('time'));
	$('#frequency').val(sessionStorage.getItem('freq'));

	$('#submit').on('click', function(event) {
		event.preventDefault();

		if (
			$('#train-name').val().trim() === '' ||
			$('#destination').val().trim() === '' ||
			$('#first-train').val().trim() === '' ||
			$('#frequency').val().trim() === ''
		) {
			alert('Please fill in all details to add new train');
		} else {
			trainName = $('#train-name').val().trim();
			destination = $('#destination').val().trim();
			startTime = $('#first-train').val().trim();
			frequency = $('#frequency').val().trim();

			$('.form-field').val('');

			database.ref().push({
				trainName   : trainName,
				destination : destination,
				frequency   : frequency,
				startTime   : startTime,
				dateAdded   : firebase.database.ServerValue.TIMESTAMP
			});

			sessionStorage.clear();
		}
	});

	database.ref().on('child_added', function(childSnapshot) {
		var startTimeConverted = moment(childSnapshot.val().startTime, 'hh:mm').subtract(1, 'years');
		var timeDiff = moment().diff(moment(startTimeConverted), 'minutes');
		var timeRemain = timeDiff % childSnapshot.val().frequency;
		var minToArrival = childSnapshot.val().frequency - timeRemain;
		var nextTrain = moment().add(minToArrival, 'minutes');
		var key = childSnapshot.key;

		var newrow = $('<tr>');
		newrow.append($('<td>' + childSnapshot.val().trainName + '</td>'));
		newrow.append($('<td>' + childSnapshot.val().destination + '</td>'));
		newrow.append($("<td class='text-center'>" + childSnapshot.val().frequency + '</td>'));
		newrow.append($("<td class='text-center'>" + moment(nextTrain).format('LT') + '</td>'));
		newrow.append($("<td class='text-center'>" + minToArrival + '</td>'));

		if (minToArrival < 6) {
			newrow.addClass('info');
		}

		$('#train-table-rows').append(newrow);
	});

	currentTime();

	setInterval(function() {
		window.location.reload();
	}, 60000);
});
