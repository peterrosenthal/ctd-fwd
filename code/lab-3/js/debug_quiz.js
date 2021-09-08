function quiz(){
  var score = 0;
  var num;
  var question;
  var answer;
  var quiz_questions = [
    'How many moons does Earth have?',
    'How many moons does Saturn have?',
    'How many moons does Venus have?'
  ;
  var quiz_answers = [1, 82, 0];
  
  //get total number of questions
  var totalQuestion = quiz_questions.count;
  
  //generate random number for question
  num = Math.floor(Math.random() * 3);
  	
  for (count = 0; count <= totalQuestion; count++) {
    question = quiz_questions[num];
    answer = prompt(question);
    if (answer = quiz_answers[num]){
      score++;
      alert("Correct!");
    }
    else {
      alert("Wrong");
    }
    num++;
    if (num == totalQuestion){
      num=0;
    }
  }

document.write('<p>You got ' + score + ' out of ' + totalQuestion + ' questions correct.</p>');
}
