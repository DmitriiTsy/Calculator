import "./Button.css";

const Button = (props) => {
    const {className, value, onClick} = props
    
    return (
        <button className={className} onClick={onClick} >
            {value}
        </button>
    );
    };

export default Button;