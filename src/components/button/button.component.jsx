import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles.jsx';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    inverted: 'inverted',
    google: 'google-sign-in'
}

// return one of the three button types
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]
) 

const Button = ({ children, buttonType, ...otherProps }) => {
    const CurrentButton = getButton(buttonType);

    return (
        <CurrentButton { ...otherProps}>{children}</CurrentButton>
    );
};

export default Button;
