import React from 'react'

export default function BirdCountGoalDisplay({ goal }) {
    if (!goal) return null;

    switch (goal.status) {
        case 'inProgress':
            return (
                <div>
                    <p>
                        <span className='cloumn_name'>Find {goal.birdsFound} / {goal.count} birds</span>
                        <span className='cloumn_content'>In progress...</span>
                    </p>
                </div>
            );
        case 'success':
            return (
                <div>
                    <p>
                        <span className='cloumn_name'>Find {goal.birdsFound} / {goal.count} birds</span>
                        <span className='cloumn_content'>Success!</span>
                    </p>
                </div>
            );
        case 'failed':
            return (
                <div>
                    <p>
                        <span className='cloumn_name'>Find {goal.birdsFound} / {goal.count} birds</span>
                        <span className='cloumn_content'>Failed</span>
                    </p>
                </div>
            );
        default:
            return null;
    }
}