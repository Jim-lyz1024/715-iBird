import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function TripOption() {
    const [isEdugaming, setIsEdugaming] = useState(true);
    const [fitnessLevel, setFitnessLevel] = useState('mid');

    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/start/trip', { state: { isEdugaming, fitnessLevel } });
    };

    return (
        <div>
            <NavigationButton path={'/start'} text={'Trip Options'} />

            <main  className='Trip_option_box'>
                <div className='cloumn'>
                    <label for="checkbox">
                        Include edugaming concept:      </label>
                        <p>
                            <input
                                id="checkbox"
                                type="checkbox"
                                checked={isEdugaming}
                                onChange={() => setIsEdugaming(!isEdugaming)}
                            />
                        </p>
                        
              
                </div>

                <div className='cloumn'>
                    <label for="level">Fitness Level:</label>
                    <p>
                        <select id="level" value={fitnessLevel} onChange={e => setFitnessLevel(e.target.value)}>
                            <option value="low">Low</option>
                            <option value="mid">Mid</option>
                            <option value="high">High</option>
                        </select>
                    </p>
              
                </div>

                <div className='Round_button'>
                    <button  onClick={(handleStart)}>Start</button>
                </div>
            </main>
          
        </div>
    );
}
