var allQuestions = [{
  question: "Arvydo Sabonio marškinėlių numeris:",
  choices: ["11", "32", "5", "2"],
  correctAnswer: 0
}, {
  question: "Filmo Interstellar garso takelio kūrėjas:",
  choices: ["Paris Hilton", "Smashmouth", "Linkin Park", "Hans Zimmer"],
  correctAnswer: 3
}, {
  question: "Žymiausias 21 amžiaus astrofizikas",
  choices: ["Neil deGrasse Tyson", "Stephen Hawking", "Mike Brown", "Paul F. Goldsmith"],
  correctAnswer: 1
}, {
  question: "Kelintais metais buvo išleistas filmas Šrekas?",
  choices: ["2001 m.", "1999m.", "2010m.","2003m."],
  correctAnswer: 0
},{
  question: "Kiek planetų yra saulės sistemoje?",
  choices: ["8", "9", "5","12"],
  correctAnswer: 0
}];

function Quiz(options) {
  var elem = options.elem;
  var allQuestions = options.questions;
  var q_number = allQuestions.length;
  var answers = [];
  var questions = [];
  var correct_answers = 0;
  var current_number;

  generateQuestions(allQuestions);
  initQuiz();

  function generateQuestions(q) {
    for (var i = 0; i < q_number; i++) {
      var question = document.createElement('div');
      question.classList.add('question');
      question.id = 'question';

      var title = document.createElement('h1');
      title.textContent = q[i].question;

      question.appendChild(title);

      var list = document.createElement('ul');
      for (var j = 0, len = q[i].choices.length; j < len; j++) {
        var choice = document.createElement('li');
        var check = document.createElement('input');
        check.setAttribute('type', 'radio');
        check.setAttribute('name', 'question');
        var choice_text = document.createElement('label');
        choice_text.setAttribute('for', check.name);
        choice_text.textContent = q[i].choices[j];

        choice.appendChild(check);
        choice.appendChild(choice_text);
        list.appendChild(choice);
      }
      var prev_button = document.createElement('button');
      prev_button.textContent = 'Atgal';
      prev_button.addEventListener('click', prevQuestion);
      var next_button = document.createElement('button');
      if (i === q_number - 1) {
        next_button.textContent = 'Rezultatai';
        next_button.addEventListener('click', finishQuiz);
      } else {
        next_button.textContent = 'Sekantis klausimas';
        next_button.addEventListener('click', nextQuestion);
      }
      question.appendChild(list);

      if (i > 0) question.appendChild(prev_button);
      question.appendChild(next_button);
      questions.push(question);
    }
  }

  function render_question(number) {
    var warning = elem.getElementsByClassName('warning')[0];
    if (warning) {
      elem.removeChild(warning);
    }
    elem.appendChild(questions[number]);
    $('#question').hide().fadeIn(500);
  }
  function initQuiz() {
    current_number = 0;
    render_question(current_number);
  }
  function checkAnswers() {
    for (var i = 0; i < q_number; i++) {
      if (answers[i] === allQuestions[i].correctAnswer) {
        correct_answers++;
      }
    }
  }
  function validateAnswer() {
    var list_items = elem.getElementsByTagName('input');
    var answered = false;
    for (var i = 0, len = list_items.length; i < len; i++) {
      if (list_items[i].checked) {
        answers.push(i);
        answered = true;
        break;
      }
    }
    return answered;
  }
  function nextQuestion() {
    if (validateAnswer()) {
      elem.removeChild(questions[current_number]);
      current_number++;
      render_question(current_number);
    }
  }
  function prevQuestion() {
    elem.removeChild(questions[current_number]);
    answers.pop();
    current_number--;
    render_question(current_number);
  }
  function finishQuiz() {
    if (validateAnswer()) {
      checkAnswers();
      elem.removeChild(questions[current_number]);
      var result = document.createElement('p');
      if (correct_answers === 0) {
        result.textContent = "Deja neatsakėte nei vieno klausimo teisingai";
      } else {
        result.textContent = "Jūsų teisingų atsakymų skaičius: " + correct_answers + "iš" + questions.length;
      }
      elem.appendChild(result);
    }
  }
}
var quiz = new Quiz({
  elem: document.getElementById('quiz'),
  questions: allQuestions
});