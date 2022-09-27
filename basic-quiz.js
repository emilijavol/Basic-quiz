var allQuestions = [{
  question: "What's Batmans full name?",
  choices: ["Bruce Wayne", "Bruce Lame", "Lil Wayne", "Dwayne Johnson"],
  correctAnswer: 0
}, {
  question: "What's Batmans form of transport?",
  choices: ["Bat-bicycle", "Bat-skates", "Bat-bus", "Bat-mobile"],
  correctAnswer: 3
}, {
  question: "What's Batmans side kick name?",
  choices: ["Steven", "Robin", "Mike", "Chad"],
  correctAnswer: 1
}, {
  question: "Which one is an enemy of Batman?",
  choices: ["Joker", "Donald Trump", "Count Dracula","Tinkerbell"],
  correctAnswer: 0
},{
  question: "Who played Batman in the DC universe movies? (Until the 2022 one...)",
  choices: ["Ben Affleck", "Keanu Reeves", "Kanye West","Joaquin Pheonix"],
  correctAnswer: 0
},{
  question: "Who created the Batman character?",
  choices: ["Tadas Vidmantas", "Peyton Manning", "Bob Kane","Bob Dyllan"],
  correctAnswer: 2
},{
  question: "What is the Bat-ape name?",
  choices: ["Mojo-jojo", "Mogo", "Monkey","King-kong"],
  correctAnswer: 1
},{
  question: "Who killed Batmans parents?",
  choices: ["Joe Rogan", "Michael Mayers", "Soulja Boy","Joe Chill"],
  correctAnswer: 3
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
      prev_button.textContent = 'Previous question';
      prev_button.id= 'prev_button';
      prev_button.addEventListener('click', prevQuestion);
      var next_button = document.createElement('button');
    
      if (i === q_number - 1) {
        next_button.textContent = 'Results';
        next_button.addEventListener('click', finishQuiz);
      } else {
        next_button.textContent = 'Next question';
        next_button.id='next_button';
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
        result.textContent = "0 out of 10....What a shame";
      } else if (correct_answers <5){
        result.textContent = "You have answered " + correct_answers + "out of" + questions.length + "questions. You should study more.";
      } else{
        result.textContent = "Look at you go! You got" + correct_answers + "out of" + questions.length +"correct! That's way better than I imagined";
      }
    elem.appendChild(result);
    }
  }
}
var quiz = new Quiz({
  elem: document.getElementById('quiz'),
  questions: allQuestions
});