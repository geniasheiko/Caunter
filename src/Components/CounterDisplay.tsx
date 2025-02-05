import '../Counter.css'
 
export type CounterDisplayPropsType = {
    count: number
    max: number
 }

 export const CounterDisplay = (props:CounterDisplayPropsType) => {
    return (
    <div>
        <h1 className={props.count === props.max ? 'tablo max-value' : 'tablo'}>
                {props.count}
        </h1>
    </div>
    )
    }