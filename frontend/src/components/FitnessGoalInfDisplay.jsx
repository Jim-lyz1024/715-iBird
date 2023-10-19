
export default function FitnessGoalInfDisplay({ goal, currentValue, target, title, endGrade }) {
    if (goal.status === "failed") {
        return <>
            <p>
                <span className='cloumn_name'>{title}</span>
                <span className='cloumn_content'>{target.toFixed(1)} meters in {goal.duration} minutes failed! </span>
            </p>
            <p>
                <span className='cloumn_name'>Your grade </span>
                <span className='cloumn_content'>{endGrade ? endGrade.toFixed(1) : "0"} meters</span>
            </p>
        </>;
    }
    if (goal.status === "inProgress") {
        return <p>
            <span className='cloumn_name'>{title}</span>
            <span className='cloumn_content'>{currentValue.toFixed(1)} / {target.toFixed(1)} meters ({(currentValue / target * 100).toFixed(1)}%)</span>
        </p>;
    }
    if (goal.status === "success") {
        return <>
            <p>
                <span className='cloumn_name'>{title}</span>
                <span className='cloumn_content'>{target.toFixed(1)} meters in {goal.duration} minutes success!</span>
            </p>
            <p>
                <span className='cloumn_name'>Time to complete</span>
                <span className='cloumn_content'>{((new Date(goal.endDate).getTime() - new Date(goal.startDate).getTime()) / 1000 / 60).toFixed(1)} minutes</span>
            </p>
        </>;
    }
    return null;
}



