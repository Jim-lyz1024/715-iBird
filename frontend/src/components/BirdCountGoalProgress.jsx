import React from 'react'
import BirdCountGoalDisplay from './BirdCountGoalDisplay'

export default function BirdCountGoalProgress({ goals }) {
    return (
        <div className='Text_column_box'>
            {goals && goals.map(goal => (
                <BirdCountGoalDisplay key={goal._id} goal={goal} />
            ))}
        </div>
    )
}
