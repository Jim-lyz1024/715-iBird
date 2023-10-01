
export default function FitnessGoalInfDisplay({ goal, currentValue, target, title, endGrade }) {
    if (goal.status === "failed") {
        return <>
            <p>
                <span  className='cloumn_name'>{title}:</span> 
                <span className='cloumn_content'>{target} meters in {goal.duration} minutes failed! </span>
            </p>
            <p>
                <span  className='cloumn_name'>Your grade: </span>
                <span className='cloumn_content'>{endGrade} meters</span>
            </p>
        </>;
    }
    if (goal.status === "inProgress") {
        return <p>
            <span  className='cloumn_name'>{title}:</span> 
            <span className='cloumn_content'>{currentValue} / {target} meters ({(currentValue / target).toFixed(2) * 100}%)</span>
            </p>;
    }
    if (goal.status === "success") {
        return <>
            <p><span  className='cloumn_name'>{title}:</span>   <span className='cloumn_content'>{target} meters in {goal.duration} minutes success!</span></p>
            <p><span  className='cloumn_name'>Time to complete:</span> <span className='cloumn_content'>{(new Date(goal.endDate).getTime() - new Date(goal.startDate).getTime()) / 1000 / 60} minutes</span></p>
        </>;
    }
    return null;
}



