import './button.styles.scss';

// default button

// inverted button

// google sing in button

const BUTTON_TYPE_CLASSES = {
    inverted: 'inverted',
    google: 'google-sign-in'
}

const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        { ...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;
