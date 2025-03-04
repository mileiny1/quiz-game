// Variables
let TimeLeft = 10;
let TimerInterval;
let CurrentQuestionIndex = 0;
let score = 0; 

// Constants 
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the capital of the Dominican Republic?",
        options: ["Santo Domingo", "London", "Berlin", "Madrid"],
        correctAnswer: "Santo Domingo"
    },
    {
        question: "What is an API?",
        options: ["Application Programming Interface", "Method", "Request", "Mac OS"],
        correctAnswer: "Application Programming Interface"
    },
    {
        question: "What is OOP in JavaScript?",
        options: ["Classes and Objects", "Microsoft Teams", "Request", "Mac OS"],
        correctAnswer: "Classes and Objects"
    },
    {
        question: "What is control flow?",
        options: ["Concept in programming", "Microsoft Teams", "Request", "Mac OS"],
        correctAnswer: "Concept in programming"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Jupiter"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        correctAnswer: "Shakespeare"
    },
    {
        question: "What is a critical component of CSS?",
        options: ["Inheritance", "JavaScript", "Java", "Python"],
        correctAnswer: "Inheritance"
    },
    {
        question: "Which is a method of the document object?",
        options: ["Python", "PowerPoint", "querySelector", "SQL"],
        correctAnswer: "querySelector"
    },
    {
        question: "What kind of movie is 'Scream'?",
        options: ["Horror", "Action", "Comedy", "Drama"],
        correctAnswer: "Horror"
    },
    {
        question: "A crucial tool for front-end developers?",
        options: ["Flexbox", "Access", "PowerPoint","Word Document"],
        correctAnswer: "Flexbox"
    },
    {
        question: "What is the capital of the United States?",
        options: ["Washington, DC", "New York", "California", "Florida"],
        correctAnswer: "Washington, DC"
    },
    {
        question: "What is the capital of Mexico?",
        options: ["Santo Domingo", "Panama", "Mexico City", "Quito"],
        correctAnswer: "Mexico City"
    },
    {
        question: "Which is a city in Canada?",
        options: ["Ontario", "Ecuador", "Chile", "Santiago"],
        correctAnswer: "Ontario"
    },
    {
        question: "What is the capital of New York State?",
        options: ["Albany", "Bronx", "Brooklyn", "Queen"],
        correctAnswer: "Albany"
    },

    {
        question: "What is Javascript?",
        options: ["interactive website", "edit and write documents","calculus", "presentation"],
        correctAnswer: "interactive website"
    },

    {
        question: "What is Python?",
        options: ["Can be used on a server to create web applications", "Can be used on a Dektop", "can be uses for DataBase", "Can be used for design", "Can be used for game"],
        correctAnswer: "Can be used on a server to create web applications"
    },

    {
        question: "What is the city of the Germany?",
        options: ["Berlin", "Munich", "Hamburg", "Cologne"],
        correctAnswer: "Berlin"
    },
    {
        question: "What is the capital of the China?",
        options: ["Beijing", "Yunfu", "Chongqing", "Shanwei"],
        correctAnswer: "Beijing"
    },
{


    question: "What is the capital of Brazil?",
    options: ["Rio of Janeiro", "Yunfu", "Cuenca", "Queen"],
    correctAnswer: "Rio of Janeiro"

},


];

// Background Music Setup
const bgMusic = new Audio('Sounds/Backgroundmusic.mp3'); 
bgMusic.loop = true; 
bgMusic.volume = 0.5; 

// Function to start the timer
function startTimer() {
    TimerInterval = setInterval(function() {
        TimeLeft--;
        document.getElementById('time-left').textContent = TimeLeft;

        if (TimeLeft <= 0) {
            clearInterval(TimerInterval);
            disableButtons();
            document.getElementById('result').textContent = "Time's up!";
            document.getElementById('next-button').style.display = 'inline-block';
        }
    }, 1000);
}

// Function to check the selected answer
function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[CurrentQuestionIndex].correctAnswer;
    const resultDiv = document.getElementById('result');

    if (selectedAnswer === correctAnswer) {
        resultDiv.textContent = "Correct!";
        score++; 
    } else {
        resultDiv.textContent = "Incorrect!";
    }

    disableButtons();
    clearInterval(TimerInterval); 
    document.getElementById('next-button').style.display = 'inline-block'; 
}

// Disable the answer buttons
function disableButtons() {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Enable the answer buttons (called when moving to the next question)
function enableButtons() {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Go to the next question
function nextQuestion() {
    CurrentQuestionIndex++;

    if (CurrentQuestionIndex < questions.length) {
        loadQuestion(); 
    } else {
        gameOver(); 
    }
}

// Function to show the game over and display score
function gameOver() {
    document.getElementById('quiz-container').innerHTML = `
        <h2>Game Over! You've completed the quiz!</h2>
        <p>Your final score: ${score} / ${questions.length}</p>
    `;

    // Restart game automatically after 3 seconds
    setTimeout(restartGame, 3000);
}

// Function to restart the game
function restartGame() {
    score = 0; 
    CurrentQuestionIndex = 0; 
    TimeLeft = 10; 
    document.getElementById('result').textContent = ''; 
    document.getElementById('next-button').style.display = 'none'; 

    // Restore the quiz container
    document.getElementById('quiz-container').innerHTML = `
        <div id="time-left">10</div>
        <div id="question">Question text will appear here</div>
        <button class="answer-btn" onclick="checkAnswer(this.textContent)">Option 1</button>
        <button class="answer-btn" onclick="checkAnswer(this.textContent)">Option 2</button>
        <button class="answer-btn" onclick="checkAnswer(this.textContent)">Option 3</button>
        <button class="answer-btn" onclick="checkAnswer(this.textContent)">Option 4</button>
        <div id="result"></div>
        <button id="next-button" onclick="nextQuestion()" style="display: none;">Next Question</button>
    `;

    loadQuestion(); 
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('start-container').style.display = 'none';
}

// Load the current question
function loadQuestion() {
    TimeLeft = 10; 
    document.getElementById('time-left').textContent = TimeLeft;
    document.getElementById('result').textContent = ''; 
    document.getElementById('next-button').style.display = 'none'; 

    const questionObj = questions[CurrentQuestionIndex];
    document.getElementById('question').textContent = questionObj.question;

    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((button, index) => {
        button.textContent = questionObj.options[index] || "";
        button.disabled = false;
    });

    enableButtons();
    startTimer(); 
}

// Function to start the game
function startGame() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    bgMusic.play().catch(error => console.log("Playback error: " + error));
    loadQuestion();
}
