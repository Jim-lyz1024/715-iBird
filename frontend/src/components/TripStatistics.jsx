import React from 'react'

// set realSpeed==-1 when use in trip history
export default function TripStatistics({ trip, realSpeed }) {

    
    const createTime=(startDate,endDate)=>{
        var startTime=new Date(startDate);
        var endTime=new Date(endDate);
        let start_hour = startTime.getHours();
        let start_min = startTime.getMinutes();
        let end_hour = endTime.getHours();
        let end_min = endTime.getMinutes();
        let start_bp="a.m.";
        let end_bp="a.m.";
        if(start_hour>=12){
            start_bp="p.m.";
        }
        if(end_hour>=12){
            end_bp="p.m.";
        }
        return start_hour+":"+start_min+" "+start_bp+" - "+end_hour+":"+end_min+" "+end_bp;
    }

    return (
        <div className='Text_column_box'>
            {realSpeed !== -1 && <p><span className='cloumn_name'>Speed: </span><span className='cloumn_content'>{realSpeed ? `${realSpeed.toFixed(2)} m/s` : "N/A"}</span></p>}
            {trip &&
                <>
                    <p>
                        <span className='cloumn_name'>Time:</span> 
                        <span className='cloumn_content'>{createTime(trip.startDate,trip.endDate)}</span>
                    </p>
                    <p>
                        <span className='cloumn_name'>Total distance:</span> 
                        <span className='cloumn_content'>{trip.distance} m</span>
                    </p>
                    <p>
                        <span className='cloumn_name'>Total elevation gain:</span>
                        <span className='cloumn_content'>{trip.elevationGain.toFixed(1)}</span>
                    </p>
                    <p>
                        <span className='cloumn_name'>Total scores:</span>
                        <span className='cloumn_content'>{trip.scores.toFixed(1)}</span>
                    </p>
                </>
            }
        </div>
    )
}
