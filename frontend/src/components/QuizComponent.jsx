import Quiz from 'react-quiz-component';
import CustomResultPage from './CustomResultPage';
import { useState } from 'react';
import { submitQuizResults } from '../api/api';
import QuizWelcome from './QuizWelcome';

export default function QuizComponent({ quizData, afterSubmit }) {
    const [quizStarted, setQuizStarted] = useState(false);
    const [correctQuestions, setCorrectQuestions] = useState(0);

    const handleSubmitAndClose = async (quizSummary) => {
        try {
            await submitQuizResults(localStorage.getItem('token'), quizSummary);
            await afterSubmit();
        } catch (error) {
            console.error("Error submitting quiz results:", error);
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
    height: '80%',
    backgroundColor: 'white',
    overflowY: 'auto',
    padding: '20px',
    borderRadius: '20px'
};
