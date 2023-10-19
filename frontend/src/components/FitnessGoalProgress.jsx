import { useState, useEffect } from "react";
import FitnessGoalInfDisplay from "./FitnessGoalInfDisplay";

export default function FitnessGoalProgress({ trip }) {
    const [remainingTimeDistance, setRemainingTimeDistance] = useState(null);

    useEffect(() => {
        if (trip && trip.distanceGoal) {
            const startTime = new Date(trip.distanceGoal.startDate).getTime();
            const durationMillis = trip.distanceGoal.duration * 60 * 1000;
            const endTime = startTime + durationMillis;
            const currentMillis = new Date().getTime();
            const remainingMillis = endTime - currentMillis;
            const remainingSeconds = Math.floor(remainingMillis / 1000);
            setRemainingTimeDistance(remainingSeconds)
        }
    }, [trip]);

    // Timer logic, decrease the remaining time every second
    useEffect(() => {
        const interval = setInterval(() => {
            if (remainingTimeDistance > 0) {
                setRemainingTimeDistance(remainingTimeDistance - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTimeDistance]);

    return (
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
            {trip &&
                <div className='Text_column_box'>
                    <FitnessGoalInfDisplay
                        goal={trip.distanceGoal}
                        currentValue={trip.distance}
                        target={trip.distanceGoal.distance}
                        title="Distance Goal"
                        endGrade={trip.distanceGoal.endDistance}
                    />
                    {trip.distanceGoal.status === "inProgress" &&
                        <p>
                            <span className='cloumn_name'>Remaining Time</span>
                            <span className='cloumn_content'>{Math.floor(remainingTimeDistance / 60)}:{(remainingTimeDistance % 60).toString().padStart(2, '0')}</span>
                        </p>}
                </div>}
        </div>
    );
}
