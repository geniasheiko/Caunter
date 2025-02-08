import { useEffect, useState } from 'react';
import { Button } from './Components/Button';
import './Counter.css'
import { CounterDisplay } from './Components/CounterDisplay';

export const Counter = () => {
    const [count, setCount] = useState<number>(0); 
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const [error, setError] = useState<boolean>(false)
    const [isSet, setIsSet] = useState<boolean>(false);

useEffect(() => {
    const saveMin = localStorage.getItem('min');
    const saveMax = localStorage.getItem('max');
    if (saveMin && saveMax) {
        setMin(Number(saveMin));
        setMax(Number(saveMax));
        setCount(Number(saveMin));
    }
}, []);

const saveValues = () => {
    if(!error){
    localStorage.setItem('min', min.toString());
    localStorage.setItem('max', max.toString());
    setCount(min);
    setIsSet(true);
}
}

    const handleMinChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMin(value);
        validateValues(value,max);
        setIsSet(false);
    }
    const handleMaxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
       const value = Number(e.target.value);
       setMax(value);
       validateValues(min, value);
       setIsSet(false);
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
                    onChange={handleMaxChange}
                    className={error ? "error-input" : ""} />
                </label>
                <label>Min value:
                    <input type="number"
                    value={min}
                    onChange={handleMinChange}
                    className={error ? "error-input" : ""} />
                </label>
                <Button title={"set"} onClick={saveValues} />
            </div>
            <CounterDisplay count={count}
            max={max} error={error}
            isSet={isSet} />
            <Button title={"inc"}
             onClick={inc} 
             disable={count === max || error}/>
            <Button title={"reset"}
             onClick={reset} 
             disable={count === min|| error}/>
        </div>
    )
}
