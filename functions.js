
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function getQuestionText() {
    let questionText = 
      document.getElementById("question").value;
    return questionText;
  }
  
  function supplyAnswer(answerText) {
  
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
  
  //usinh a TextToSpeech render for the 8Ball read out.
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
  
 
  
  
  
  