var questions = [];
var last_question = -1;

function load_questions() {
	$.get('/q', {'n':last_question}, function(data) {
		render_questions(data);
	}, 'json');
}

function render_questions(data) {
	data.forEach(function(element, idx, array) {
		render_question(element);
		if (element.id > last_question)
			last_question = element.id;
	});
}

function render_question(obj) {
	var id = obj.id;
	var question = obj.question;
	var qli = document.createElement('li');

	$(qli).html(question.replace("\n", '<br />'));

	$('#questions').prepend(qli);
}

function post_question(question) {
	$.post('/p', {'question': question}, function(data) {});
}

function setup_form() {
	$('form#ask').submit(function() {
		post_question(document.getElementById('ask-question').value);
		document.getElementById('ask-question').value = '';
		return false;
	});
}

$(function() {
	load_questions();
	setInterval(load_questions, 5000);
	setup_form();
});
