const selectRandomQuestions = (bird) => {
    const selectedQuestions = [];
    const questionIndices = Array.from({ length: bird.questions.length }, (_, i) => i);

    for (let i = 0; i < bird.rarity; i++) {
        const randomIndex = Math.floor(Math.random() * questionIndices.length);
        selectedQuestions.push(bird.questions[questionIndices[randomIndex]]);
        questionIndices.splice(randomIndex, 1); // Remove the selected index
    }

    return selectedQuestions;
};

module.exports = {
    selectRandomQuestions
};