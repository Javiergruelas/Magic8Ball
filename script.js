
let positiveAnswers = [
  "As I see it, yes",
  "It is certain",
  "It is decidedly so",
  "Yes",
  "Yes, definitely"
];

let negativeAnswers = [
  "My reply is no",
  "My sources say no",
  "There is no way",
  "No",
  "Absolutely not!"
];

let maybeAnswers = [
  "Ask again later",
  "Better to not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Reply hazy try again"
];

const NO_QUESTION_WARNING = "You need to ask a question!";

function chooseRandomAnswerType() {
	// Part 1: Your code here 👇
  let i = getRandomNumber(1,3);
  if (i == 3) {
    return "positive";
  } else if (i == 2) {
    return "negative";
  }else {
    return "maybe";
  }
  
}

chooseRandomAnswerTypeTest();

function chooseRandomAnswer(answerType) {
	// Part 2: Your code here 👇
  if (answerType == "positive"){
    let i = getRandomNumber(1,3);
    return positiveAnswers[i];
  }else if(answerType == "negative"){
    let i = getRandomNumber(1,3);
    return negativeAnswers[i];
  }else {
    let i = getRandomNumber(1,3);
    return maybeAnswers[i];
  }
}

chooseRandomAnswerTest();


function onAnswerRequested() {
  // Part 3: Your code here 👇
  if (getQuestionText() == ""){
    supplyAnswer(NO_QUESTION_WARNING);
  }
  else{
    supplyAnswer(chooseRandomAnswer(chooseRandomAnswerType()));
  }
	
}

onAnswerRequestedTest();