import { useState } from 'react';
import { Button } from './Components/Button';
import './Counter.css'
import { CounterDisplay } from './Components/CounterDisplay';

export const Counter = () => {
    const [count, setCount] = useState<number>(0); 
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const [error, setError] = useState<boolean>(false)

    const handleMinChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMin(value);
        setCount(value);
        validateValues(value,max);
    }
    const handleMaxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
       const value = Number(e.target.value);
       setMax(value);
       validateValues(min, value);
    }
    const validateValues = (minVal:number, maxVal:number)=> {
        if (minVal < 0 || maxVal <= minVal){
            setError(true);
        } else {
            setError(false);
        }
    }

    const inc = () => {
        if(count < max)
            setCount(count+1)
    }
    const reset = () => {
            setCount(min)
    }

    return (
        <div>
            <div className="inputs">
                <label>Max value:
                    <input type="number"
                    value={max}
                    onChange={handleMaxChange} />
                </label>
                <label>Min value:
                    <input type="number"
                    value={min}
                    onChange={handleMinChange} />
                </label>
            </div>
            {error && <p className="error-text">Incorrect value</p>}
            <CounterDisplay count={count}
            max={max} />
            <Button title={"inc"}
             onClick={inc} 
             disable={count === max || error}/>
            <Button title={"reset"}
             onClick={reset} 
             disable={count === min|| error}/>
        </div>
    )
}