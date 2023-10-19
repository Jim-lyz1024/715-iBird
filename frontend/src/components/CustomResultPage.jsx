import React from 'react'
import { QUIZ_FULL_MARKS_REWARD_COEFFICIENT } from '../gameConstants'
import { QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT } from '../gameConstants'
import {Button} from 'antd-mobile'
import './CustomResultPage.css';

export default function CustomResultPage({ totalQuestions, correctQuestions, onSubmitAndClose, birdRarity }) {
    return (
        <div className="result-container">
            <h1 className="result-title">Quiz Results</h1>
            <p className="result-text">Total Questions: {totalQuestions}</p>
            <p className="result-text">Correct Answers: {correctQuestions}</p>
            <p className="result-text">Correct Answers Reward: {QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT} × {correctQuestions} = {QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT * correctQuestions}</p>

            {totalQuestions === correctQuestions && <p className="result-text">Full Marks Reward: {QUIZ_FULL_MARKS_REWARD_COEFFICIENT} × {birdRarity} = {QUIZ_FULL_MARKS_REWARD_COEFFICIENT * birdRarity}</p>}

            {totalQuestions === correctQuestions ?
                <p className="result-text result-total">Total: {QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT * correctQuestions + QUIZ_FULL_MARKS_REWARD_COEFFICIENT * birdRarity}</p> :
                <p className="result-text result-total">Total: {QUIZ_CORRECT_QUESTION_REWARD_COEFFICIENT * correctQuestions}</p>
            }
            <Button className="result-button" color='primary' onClick={onSubmitAndClose}>Close</Button>
        </div>
    )
}
