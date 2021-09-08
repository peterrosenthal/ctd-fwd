function quiz() {
  let score = 0;
  let quiz_questions = [
    'How many moons does Earth have?',
    'How many moons does Saturn have?',
    'How many moons does Venus have?'
  ];
  let quiz_answers = [1, 82, 0];
  
  //get total number of questions
  let totalQuestion = quiz_questions.length;
  
  //generate random number for question
  let num = Math.floor(Math.random() * totalQuestion);
  	
  for (count = 0; count < totalQuestion; count++) {
    let question = quiz_questions[num];
    let answer = prompt(question);
    if (answer == quiz_answers[num] && answer.length > 0) {
      score++;
      alert("Correct!");
    } else {
      alert("Wrong");
    }
    num++;
    if (num == totalQuestion) {
      num = 0;
    }
  }

  document.write('<p>You got ' + score + ' out of ' +
    totalQuestion + ' questions correct.</p>');
}
