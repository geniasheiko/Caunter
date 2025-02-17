import './../Counter.css'
type ButtonPropsType = {
    title: string
    onClick: () => void
    disable: boolean
}

export const Button = (props:ButtonPropsType) => {
    return (
        <button className={props.disable ? 'button disabled' : 'button'}
        onClick={props.onClick}
       disabled={props.disable}
       style={{
       margin: '5px',
       padding: '10px 20px',
       fontSize: '16px',
       borderRadius: '5px',
        }}
  >{props.title}</button>
    )
}