import SignUpForm from '../../components/sign-up-form/signUpForm.component';
import SignInForm from '../../components/sign-in-form/signInForm.component';

import { AuthenticationContainer } from './authentication.styles.jsx';

const Authentication = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default Authentication;
