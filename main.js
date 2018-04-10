(function(document) {
    
    var questions = null;
    var questionsIterator = null;
    var question = null;

    // Check answers
    function score() {
        
        var scoreText = document.querySelector('.score');
        var score = 0;
        
        for(var i in questions) {
            if(questions[i].userAnswer.toLowerCase() === questions[i].answer.toLowerCase()) {
                score = score + 1;
            }
        }

        scoreText.innerText = `You got a score of ${ score }.`;

    }

    // Next question
    function nextQuestion() {

        var currentQuestion = questionsIterator.next();

        if(!currentQuestion.done) {
            question = currentQuestion.value;
            document.querySelector('.question').innerText = question.question;
        } else {
            score();
        }

    }

    // Promise
    fetch('data/quiz1.json')
    .then(response => response.json())
    .then(response => {
        
        questions = response.questionnaire;
        questionsIterator = questions[Symbol.iterator]();
        nextQuestion();
        
    });

    // Clicked 'next'
    document.getElementById('next').addEventListener('click', () => {
        var userAnswer = document.querySelector('input[name="user-answer"]');
        question.userAnswer = userAnswer.value;
        userAnswer.value = "";
        nextQuestion();
    });

})(document);