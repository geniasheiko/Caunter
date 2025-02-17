import { useEffect, useState } from 'react';
import { Button } from './Components/Button';
import './Counter.css'
import { CounterDisplay } from './Components/CounterDisplay';

export const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const [error, setError] = useState<boolean>(false)  //значение, укащывает есть ли ошибка
    const [isSet, setIsSet] = useState<boolean>(false); //определяет был ли нажат set. Помогает показать сообщение об ошибке

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
        if (!error) {
            localStorage.setItem('min', min.toString());
            localStorage.setItem('max', max.toString());
            setCount(min);                    //сетаем мин значение, как бы обнуляем каунт
            setIsSet(true);                    //показ, что знач сохр
        }
    }

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMin(value);
        validateValues(value, max);         //проверка правильно ли число введено
        setIsSet(false);                   //нажать сэт после изм
    }
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMax(value);
        validateValues(min, value);
        setIsSet(false);
    }
    const validateValues = (minVal: number, maxVal: number) => {
        if (minVal < 0 || maxVal <= minVal) {
            setError(true);
        } else {
            setError(false);
        }
    }

    const inc = () => {
        if (count < max)
            setCount(count + 1)
    }
    const reset = () => {
        setCount(min)
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
