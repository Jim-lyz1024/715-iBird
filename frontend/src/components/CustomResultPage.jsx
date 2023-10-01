import React from 'react'
import { QUIZ_FULL_MARKS_REWARD_COEFFICIENT } from '../gameConstants'
import { QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT } from '../gameConstants'

export default function CustomResultPage({ totalQuestions, correctQuestions, onSubmitAndClose, birdRarity }) {
    return (
        <div>
            <p>Total Questions: {totalQuestions}</p>
            <p>Correct Answers: {correctQuestions}</p>
            <p>Correct Answers Reward: {QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT} * {correctQuestions} = {QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT * correctQuestions}</p>

            {totalQuestions === correctQuestions && <p>Full Marks Reward: {QUIZ_FULL_MARKS_REWARD_COEFFICIENT} * {birdRarity} = {QUIZ_FULL_MARKS_REWARD_COEFFICIENT * birdRarity}</p>}

            {totalQuestions === correctQuestions ?
                <p>Total: {QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT * correctQuestions + QUIZ_FULL_MARKS_REWARD_COEFFICIENT * birdRarity}</p> :
                <p>Total: {QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT * correctQuestions}</p>
            }
            <button onClick={onSubmitAndClose}>Close</button>
        </div>
    )
}
