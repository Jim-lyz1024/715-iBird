import React from 'react'
import { useNavigator } from '../hooks/useNavigator'

export default function QuizWelcome({ quizData, onAccept, onReject }) {
    const navigateWithState = useNavigator();

    return (
        <div>
            {quizData.isFlowHelper ?
                <p>Looks like you haven't find any bird for a while, answering this quiz correctly will reward you <span onClick={() => navigateWithState(`/bird/${quizData.birdName}`, { replace: true })}
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    {quizData.birdName}</span> (rarity={quizData.birdRarity})!</p>
                :
                <p>Conguradulation! You just found <span onClick={() => navigateWithState(`/bird/${quizData.birdName}`, { replace: true })}
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    {quizData.birdName}</span> (rarity={quizData.birdRarity})! You have got the reward for that, but answering this quiz will give you extra scores!</p>
            }
            <button onClick={onAccept}>Start the Quiz</button>
            <button onClick={onReject}>Not Interesting</button>
        </div>
    )
}
