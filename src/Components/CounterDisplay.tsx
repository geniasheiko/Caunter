import '../Counter.css'
 
export type CounterDisplayPropsType = {
    count: number
    max: number
    error: boolean
    isSet: boolean
    }

    export const CounterDisplay = ({ count, max, error, isSet }: CounterDisplayPropsType) => {
        return (
            <div className="counter-display">
                {error ? (
                    <p className="error-text">Incorrect value</p>
                ) : !isSet ? (
                    <p className="info-text">Enter values and 'set' press</p>
                ) : (
                    <h1 className={count === max ? 'tablo max-value' : 'tablo'}>
                        {count}
                    </h1>
                )}
            </div>
        );
    };