export function getExamResults(questions) {
  let correctAnswers = 0;
  let wrongAnswers = 0;
  questions &&
    questions.length > 0 &&
    questions.forEach((question) => {
      if (String(question.selectedAnswer) && question.selectedAnswer == question.correct_answer)
        correctAnswers++;
      else wrongAnswers++;
    });

  return {
    correctAnswers,
    wrongAnswers,
  };
}
