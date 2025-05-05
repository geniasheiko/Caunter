import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from './Components/Button';
import './Counter.css';
import { CounterDisplay } from './Components/CounterDisplay';
import { incrementAC, resetAC, saveValuesAC, setMaxAC, setMinAC } from './model/counterReducer';
import { RootState } from './app/store';
import { useCounterDispatch } from './common/hooks/useCounterDispatch';

export const Counter = () => {
    const dispatch = useCounterDispatch();
    const { count, min, max, error, isSet } = useSelector((state: RootState) => state.counter);

    const saveValuesHandler = () => {
        dispatch(saveValuesAC());
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        dispatch(setMinAC({ min: value }));
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        dispatch(setMaxAC({ max: value }));
    };

    const incrementHandler = () => {
        dispatch(incrementAC());
    };

    const resetHandler = () => {
        dispatch(resetAC());
    };

    return (
        <div className="Counter">
            <div className="Wrapper-card">
                <div className="inputs-block">
                    <label>
                        <h2>Max value:</h2>
                        <input
                            type="number"
                            value={max}
                            onChange={handleMaxChange}
                            className={error ? "error-input" : ""}
                        />
                    </label>
                    <label>
                        <h2>Min value:</h2>
                        <input
                            type="number"
                            value={min}
                            onChange={handleMinChange}
                            className={error ? "error-input" : ""}
                        />
                    </label>
                </div>
                <div className="Button-block">
                    <Button title={"set"} onClick={saveValuesHandler} disable={error || isSet} />
                </div>
            </div>
            <div className="Wrapper-card">
                <CounterDisplay count={count} max={max} error={error} isSet={isSet} />
                <div className="Button-block">
                    <Button title={"inc"} onClick={incrementHandler} disable={count === max || error} />
                    <Button title={"reset"} onClick={resetHandler} disable={count === min || error} />
                </div>
            </div>
        </div>
    );
};