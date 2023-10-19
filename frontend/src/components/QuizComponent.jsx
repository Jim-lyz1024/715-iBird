import Quiz from 'react-quiz-component';
import CustomResultPage from './CustomResultPage';
import { useState } from 'react';
import { submitQuizResults } from '../api/api';
import QuizWelcome from './QuizWelcome';
import Spinner from './Spinner';
import './QuizComponent.css';

export default function QuizComponent({ quizData, afterSubmit }) {
    const [quizStarted, setQuizStarted] = useState(false);
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitAndClose = async (quizSummary) => {
        setIsLoading(true);
        try {
            await submitQuizResults(localStorage.getItem('token'), quizSummary);
            await afterSubmit();
        } catch (error) {
            await afterSubmit();
            console.error("Error submitting quiz results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOnQuestionSubmit = async (questionStatus) => {
        if (questionStatus.isCorrect) {
            setCorrectQuestions(correctQuestions + 1);
        }
    }

    return (
        <div style={overlayStyles}>
            <div style={quizStyles}>
                {isLoading && <Spinner />}
                {!quizStarted ? (
                    <QuizWelcome
                        quizData={quizData}
                        onAccept={() => setQuizStarted(true)}
                        onReject={() => handleSubmitAndClose(null)}
                    />
                ) :
                    <Quiz
                        quiz={quizData}
                        disableSynopsis={true}
                        customResultPage={
                            () => {
                                const totalQuestions = quizData.questions.length;
                                return <CustomResultPage
                                    totalQuestions={totalQuestions}
                                    correctQuestions={correctQuestions}
                                    onSubmitAndClose={() => handleSubmitAndClose({ totalQuestions, correctQuestions })}
                                    birdRarity={quizData.birdRarity}
                                />
                            }
                        }
                        showDefaultResult={false}
                        onQuestionSubmit={handleOnQuestionSubmit}
                    />
                }
            </div>
        </div>
    );
}

const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const quizStyles = {
    width: '80%',
    height: '70%',
    backgroundColor: 'white',
    overflowY: 'auto',
    padding: '10px',
    borderRadius: '20px'
};
