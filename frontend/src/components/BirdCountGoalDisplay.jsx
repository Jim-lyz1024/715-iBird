import React from 'react'

export default function BirdCountGoalDisplay({ goal }) {
    if (!goal) return null;

    switch (goal.status) {
        case 'inProgress':
            return (
                <div>
                    <p>Find {goal.birdsFound} / {goal.count} birds</p>
                </div>
            );
        case 'success':
            return (
                <div>
                    <p>Find {goal.birdsFound} / {goal.count} birds - Success!</p>
                </div>
            );
        case 'failed':
            return (
                <div>
                    <p>Find {goal.birdsFound} / {goal.count} birds - Failed</p>
                </div>
            );
        default:
            return null;
    }
}