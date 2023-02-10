
function getRandomNumber(min, max) {
    if (_TESTING) {
      _mockRandomNumberCalls.push({min: min, max: max});
    }
  
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function getQuestionText() {
    if (_TESTING) {
      return _mockQuestionText;
    }
  
    let questionText = 
      document.getElementById("question").value;
    return questionText;
  }
  
  function supplyAnswer(answerText) {
    if (_TESTING) {
      _mockSupplyAnswerCalls.push({answerText: answerText});
      return;
    }
  
    // Add classes to the ball element.
    let ballElement = document.getElementById("ball");
    ballElement.classList.add("initialized", "shake");
    
    // Remove the answer element.
    let answerElement = document.getElementById("answer");
    answerElement.classList.remove("shown");
  
    // After 3/4 seconds show the new answer.
    setTimeout(() => {
      answerElement.innerText = answerText;
      answerElement.classList.add("shown");
    }, 750);
  
    // After 1 second remove the shake class and read the answer.
    setTimeout(() => {
      ballElement.classList.remove("shake");
      _renderTTS(answerText);
    }, 1000);
  }
  
  window.addEventListener('load', (event) => {
    window.speechSynthesis.getVoices();
  });
  
  function _renderTTS(text) {
    let synthesis = window.speechSynthesis;
    let voice = synthesis.getVoices().filter(function (voice) {
      return voice.name === "Google UK English Female";  
    })[0];
  
    var utterance = new SpeechSynthesisUtterance(text);
  
    // Set utterance properties
    utterance.voice = voice;
    utterance.pitch = .7;
    utterance.rate = .85;
    utterance.volume = .4;
    synthesis.speak(utterance);
  }
  
  // Tests
  
  // Variables for testing.
  let _TESTING = false;
  let _mockRandomNumberCalls = [];
  let _mockQuestionText = "";
  let _mockSupplyAnswerCalls = [];
  
  function _clearTestMocks() {
    _mockRandomNumberCalls = [];
    _mockQuestionText = "";
    _mockSupplyAnswerCalls = [];
  }
  
  function _runUserCode(fn) {
    let hadException = false;
  
    _TESTING = true;
    try {
        fn();
    } catch (err) {
      console.log("*****START YOUR CODE OUTPUT*****");
      hadException = true;
      console.log(COLOR_CODE.red, err, COLOR_CODE.reset);
      console.log("******END YOUR CODE OUTPUT*****\n");
    }
     _TESTING = false;
  
     return hadException;
  }
        
  banner()
  function chooseRandomAnswerTest() {
    _clearTestMocks();
    let positiveAnswer;
    let negativeAnswer;
    let maybeAnswer;
    let TEST_NAME = "chooseRandomAnswerTest"
  
    let hadException = _runUserCode(() => {
      positiveAnswer = chooseRandomAnswer("positive");
      negativeAnswer = chooseRandomAnswer("negative");
      maybeAnswer = chooseRandomAnswer("maybe");
    });
  
    if (_mockRandomNumberCalls.length < 3) {
      console.log(constructErrorMessage(TEST_NAME, "?", "We ran into an error when calling chooseRandomAnswer." ));
      console.log(constructHintMessage(`Invoke chooseRandomAnswer`, `  Start by calling chooseRandomAnswer and assign the result to variable.  Make sure it's min and max value will return a number in the correct range you need. If you need help with calling (also known as invoking) a function, please refer to the Resource Guide at the bottom of this hint.`, RESOURCES.callingFunctions))
      return false;
    }
  
  
    if (positiveAnswer == undefined || negativeAnswer == undefined || maybeAnswer == undefined) {
      console.log(constructErrorMessage(TEST_NAME, `Return correct array with with random string index`, "" ));
      console.log(constructHintMessage(`Return correct array`, ` No value was returned from the 'chooseRandomAnswer'. Use an${COLOR_CODE.bright} if, if else, else statement ${COLOR_CODE.reset}${COLOR_CODE.cyan}to compare the value of "answerType" parameter. Remember to use your random number variable to index an answer from the corresponding answer array and return it.`, RESOURCES.conditionals))
      return false;
    }
      
  
    let positiveMatches = 
      positiveAnswers.filter((answer) => { return answer ==  positiveAnswer});
    if (positiveMatches < 1) {
      console.log(constructErrorMessage(TEST_NAME, 
      `When we called chooseRandomAnswer("positive") we got an answer that wasn't found in the positiveAnswers array:\n"${positiveAnswer}"`, ""
      ));
      console.log(constructHintMessage(`Return correct array`, `  Remember to use your random number variable to index an answer from the corresponding answer array and return it.`, RESOURCES.returnInfo))
      return false;
    }
  
    let negativeMatches = 
      negativeAnswers.filter((answer) => { return answer ==  negativeAnswer});
    if (negativeMatches < 1) {
      console.log(constructErrorMessage(TEST_NAME, `When we called chooseRandomAnswer("negative") we got an answer that wasn't found in the negativeAnswers array:\n"${negativeAnswer}"`, ""));
      console.log(constructHintMessage(`Return correct array`, `  Remember to use your random number variable to index an answer from the corresponding answer array and return it `, RESOURCES.returnInfo))
      return false;
      return false;
    }
  
    let maybeMatches = 
      maybeAnswers.filter((answer) => { return answer ==  maybeAnswer});
    if (maybeMatches < 1) {
      console.log(constructErrorMessage(TEST_NAME, `When we called chooseRandomAnswer("maybe") we got an answer that wasn't found in the maybeAnswers array:\n"${maybeAnswer}"`, ""));
      console.log(constructHintMessage(`Return correct array`, `Remember to use your random number variable to index an answer from the corresponding answer array and return it `, RESOURCES.returnInfo))
      return false;
    }
  
    if (hadException) {
      console.log(constructErrorMessage(TEST_NAME, `FAILED:: Your code had an error, check the log.`));
      return false;
    }
  
     console.log(`PASSED:: chooseRandomAnswer looks good! ${COLOR_CODE.underscore}${COLOR_CODE.green}Great job!${COLOR_CODE.reset}`);
     return true;
  }
  
  function chooseRandomAnswerTypeTest() {
    TEST_NAME = `chooseRandomAnswerTypeTest`
    _clearTestMocks();
    let answerTypeSet = {};
  
    let hadException = _runUserCode(() => {
      for (let i = 0; i < 50; i++) {
        let answerType = chooseRandomAnswerType();
        answerTypeSet[answerType] = true;
      }
    });
  
    if (_mockRandomNumberCalls.length < 1) {
    
      console.log(constructErrorMessage(TEST_NAME, `Make sure to call 'chooseRandomAnswer' to generate a random number -- this is a requirement.`, ""))
      console.log(constructHintMessage(`Invoke chooseRandomAnswer`, `  Call chooseRandomAnswer and assign it to variable. Make sure it's min and max value will return a number in the correct range you need. If you need help with calling (also known as invoking) a function, please refer to the Resource Guide at the bottom of this hint.`, RESOURCES.callingFunctions))
  
      return false;
    }
  
    if (answerTypeSet.hasOwnProperty(undefined)) {
     
      console.log(constructErrorMessage(TEST_NAME, `No value was returned from the 'chooseRandomAnswerType'.`, ""))
      console.log(constructHintMessage(`No value was returned from the 'chooseRandomAnswerType'.`, `  Remember to return an answer type string that is either "positive", "negative" or "maybe". You can use your random number to decide the string you want to return. Example: ${COLOR_CODE.bright}if${COLOR_CODE.reset}${COLOR_CODE.cyan} random number is 0, return "positive. ${COLOR_CODE.bright}else if${COLOR_CODE.reset}${COLOR_CODE.cyan} random number is 1, return "negative". ${COLOR_CODE.bright}Else${COLOR_CODE.reset}${COLOR_CODE.cyan} the random number should be 2, and return maybe`, RESOURCES.conditionals));
      return false;
    }
  
    for (const answerType in answerTypeSet) {
      if (answerType != "positive" && answerType != "negative" && answerType != "maybe") {
      console.log(constructErrorMessage(TEST_NAME, `Only "positive", "negative", or "maybe" should be returned by 'chooseRandomAnswerType' but it returned "${answerType}"`, ""));
      console.log(constructHintMessage(`Only "positive", "negative", or "maybe" should be returned by 'chooseRandomAnswerType'`, `Your function needs to return one of these strings: "positive", "negative", or "maybe" based on the random number you generate.`, RESOURCES.returnInfo))
      return false;
      }
    }
  
    if (!answerTypeSet.hasOwnProperty("positive")) {
  
      console.log(constructErrorMessage(TEST_NAME, `Did not return "positive".`, ""));
      console.log(constructHintMessage(`We called 'chooseRandomAnswerType' 50 times and never got "positive"`, `  Maybe check your code calling 'chooseRandomAnswer'? Make sure your ${COLOR_CODE.bright} if/if else/else ${COLOR_CODE.reset} ${COLOR_CODE.cyan}is returning a string "positive".`, RESOURCES.conditionals))
      return false;
    }
  
    if (!answerTypeSet.hasOwnProperty("negative")) {
      console.log(constructErrorMessage(TEST_NAME,`Did not return "negative".`, ""));
      console.log(constructHintMessage(`We called 'chooseRandomAnswerType' 50 times and never got "negative".`,`  Maybe check your code calling 'chooseRandomAnswer'? Make sure your ${COLOR_CODE.bright}if/if else/else ${COLOR_CODE.reset} ${COLOR_CODE.cyan}is returning a string "negative".`, RESOURCES.conditionals))
      return false;
      return false;
    }
  
    if (!answerTypeSet.hasOwnProperty("maybe")) {
      console.log(constructErrorMessage(TEST_NAME,`Did not return "maybe".`, ""));
      console.log(constructHintMessage(`We called 'chooseRandomAnswerType' 50 times and never got "maybe".`,`  Maybe check your code calling 'chooseRandomAnswer'? Make sure your ${COLOR_CODE.bright}if/if else/else ${COLOR_CODE.reset} ${COLOR_CODE.cyan}is returning a string "maybe".`, RESOURCES.conditionals))
      return false;   
      return false;
    }
  
    if (hadException) {
      console.log(constructErrorMessage(`FAILED:: Your code had an error, check the log.`));
      return false;
    }
  
    console.log(`PASSED:: chooseRandomAnswerType looks good! ${COLOR_CODE.underscore}${COLOR_CODE.green}Great job!${COLOR_CODE.reset}`);
    return true;
  }
  
  function onAnswerRequestedTest() {
    TEST_NAME = `onAnswerRequestedTest`
  
    if (!_onAnswerRequestedTest_BlankQuestion()) {
      return false;
    }
    if (!_onAnswerRequestedTest_ValidQuestion()) {
      return false;
    }
  
    console.log(`PASSED:: onAnswerRequested looks good! ${COLOR_CODE.underscore}${COLOR_CODE.green}Great job!${COLOR_CODE.reset}`);
    return true;
  }
  
  function _onAnswerRequestedTest_BlankQuestion() {
    _clearTestMocks();
    let answerTypeSet = {};
    let answerWithoutQuestion;
  
    let hadException = _runUserCode(() => {
      _mockQuestionText = "";
      onAnswerRequested();
    });
  
  
    if (_mockSupplyAnswerCalls.length == 0) {
      console.log(constructErrorMessage(TEST_NAME, `Provide answer for no user question. When there was no question supplied 'onAnswerRequested' never calls 'supplyAnswer'. You need to call this to output the answer.`,""));
      console.log(constructHintMessage(`Provide answer for no user question`, `Make sure you are checking if the user input is equal to an empty string (it looks like ""). Also make sure your function always calls 'supplyAnswer' with your answer variable as the argument.`, RESOURCES.conditionals))
      return false;
    } else if (_mockSupplyAnswerCalls.length > 1) {
      console.log(constructErrorMessage(TEST_NAME, `Provide answer for no user question. When there was no question supplied 'onAnswerRequested' calls 'supplyAnswer' more than once. It should only ever be called once per click.`,""));
      console.log(constructHintMessage(`Provide answer for no user question`, `Make sure you are checking if the user input is equal to an empty string (it looks like ""). Also make sure your function always calls 'supplyAnswer' with your answer variable as the argument.`, RESOURCES.conditionals))
    }
  
    const NO_QUESTION_WARNING = "You need to ask a question!";
    let answerText = _mockSupplyAnswerCalls[0].answerText;
    if (answerText != NO_QUESTION_WARNING) {
      console.log(constructErrorMessage(TEST_NAME, `Logic for no user question. When no question is supplied, 'onAnswerRequested' should call the provided function 'supplyAnswer' with the argument "${NO_QUESTION_WARNING}" (NO_QUESTION_WARNING) but it returned "${answerText}" instead -- check your logic!`, ""));
      console.log(constructHintMessage(`Logic for no user question`, `Make sure that ${COLOR_CODE.bright}if ${COLOR_CODE.reset}${COLOR_CODE.cyan}the user does not supply an question, the answer variable is assigned the "NO_QUESTION_WARNING".${COLOR_CODE.bright}If${COLOR_CODE.reset}${COLOR_CODE.cyan} the user does not supply an answer, the value of getQuestionText() will be an empty string, or "". `, RESOURCES.conditionals))
      return false;
    }
  
    return true;
  }
  
  function _onAnswerRequestedTest_ValidQuestion() {
    _clearTestMocks();
    let answerTypeSet = {};
    let answerWithoutQuestion;
  
    let hadException = _runUserCode(() => {
      _mockQuestionText = "What is the meaning of life?";
      onAnswerRequested();
    });
  
    if (_mockSupplyAnswerCalls.length == 0) {
      console.log(constructErrorMessage(TEST_NAME, `The 'onAnswerRequested' function never calls 'supplyAnswer'. You need to call this to output the answer.`, ""));
      console.log(constructHintMessage(`The 'onAnswerRequested' function never calls 'supplyAnswer'.`, `Try and make sure your function has supplyAnswer called everytime the function is ran. Use your 'answer' variable as the argument. The function should look like this when you call it: example(argument)`, RESOURCES.callingFunctions))
      return false;
    }
  
    const NO_QUESTION_WARNING = "You need to ask a question!";
    let answerText = _mockSupplyAnswerCalls[0].answerText;
    if (answerText == NO_QUESTION_WARNING) {
      console.log(constructErrorMessage(TEST_NAME, `User Input Logic. When a question was provided, the 'onAnswerRequested' function returned "${NO_QUESTION_WARNING}". This is only supposed to happen when there is no question.  Check your logic!`, ""));
      console.log(constructHintMessage('User Input Logic', `Try and find the provided function that will return the user's input as a value. Assign that function to a variable. Then you can use the user's input as a variable!`))
      return false;
    }
  
    let found = false;
  
    found |= positiveAnswers.includes(answerText);
    found |= negativeAnswers.includes(answerText);
    found |= maybeAnswers.includes(answerText);
  
    if (!found) {
      console.log(constructErrorMessage(TEST_NAME, ` The 'onAnswerRequested' returned an answer that was not in any of the answer arrays: "${answerText}"`, ""));
      
      return false;
    }
  
    return true;
  }