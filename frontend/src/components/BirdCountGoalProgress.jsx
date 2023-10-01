import React from 'react'
import BirdCountGoalDisplay from './BirdCountGoalDisplay'

export default function BirdSpecificGoalProgress({ goals }) {
    return (
        <div>
            {goals && goals.map(goal => (
                <BirdCountGoalDisplay key={goal._id} goal={goal} />
            ))}
        </div>
    )
}
