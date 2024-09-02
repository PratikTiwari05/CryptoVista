// Define the correct answers for each question
const correctAnswers = {
    q1: "A type of cryptocurrency",
    q2: "Satoshi Nakamoto",
    q3: "2009",
    q4: "21 million",
    q5: "Blockchain",
    q6: "Satoshi",
    q7: "In a wallet (digital or hardware)",
    q8: "A machine or software that solves complex problems to validate transactions",
    q9: "Decentralization",
    q10: "To serve as a digital gold"
};

// Function to check the quiz answers and calculate the score
function checkQuiz() {
    let score = 0;
    const totalQuestions = 10;

    // Iterate over each question
    for (let i = 1; i <= totalQuestions; i++) {
        // Get the selected answer for the current question
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);

        // Check if an option was selected
        if (selectedOption) {
            const answer = selectedOption.value;
            
            // Check if the selected answer is correct
            if (answer === correctAnswers[`q${i}`]) {
                score++;
            }
        }
    }

    // Display the result
    document.getElementById('quiz-result').innerHTML = `
        <h3>Your Score: ${score} / ${totalQuestions}</h3>
        <p>${score === totalQuestions ? "Perfect score! Well done!" : score >= totalQuestions / 2 ? "Good job!" : "Keep practicing!"}</p>
    `;
}

// Function to reset
