import { useReducer} from 'react';
import { Button } from './Components/Button';
import './Counter.css'
import { CounterDisplay } from './Components/CounterDisplay';
import { counterReducer, incrementAC, resetAC, saveValuesAC, setMaxAC, setMinAC } from './model/counterReducer';

export const Counter = () => {
    const [state, dispatch] = useReducer(counterReducer, {
        count: 0,
        min: 0,
        max: 0,
        error: false,
        isSet: false,
      });
      const { count, min, max, error, isSet } = state;
    
      const saveValues = () => {
        dispatch(saveValuesAC());
    }

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        dispatch(setMinAC(value))
    }
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        dispatch(setMaxAC(value))

    }

    const inc = () => {
        dispatch(incrementAC())
    }
     const reset = () => {
        dispatch(resetAC())
    
    }

    return (
        <div className="Counter">
            <div className="Wrapper-card">
                <div className="inputs-block">
                    <label><h2>Max value:</h2> 
                        <input type="number" 
                            value={max}
                            onChange={handleMaxChange}
                            className={error ? "error-input" : ""} />
                    </label>
                    <label><h2>Min value: </h2>
                        <input type="number"
                            value={min}
                            onChange={handleMinChange}
                            className={error ? "error-input" : ""} />
                    </label>
                </div>
                <div className="Button-block">
                <Button title={"set"} onClick={saveValues}
                disable={error || isSet} />
            </div>
            </div>
            <div className="Wrapper-card">
                <CounterDisplay count={count}
                    max={max} error={error}
                    isSet={isSet} />
                <div className="Button-block">
                    <Button title={"inc"}
                        onClick={inc}
                        disable={count === max || error} />
                    <Button title={"reset"}
                        onClick={reset}
                        disable={count === min || error} />
                </div>
            </div>
        </div>
    )
}