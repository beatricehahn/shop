import { useState } from 'react';

import { 
    signInAuthUserWithEmailAndPassword, 
    createUserDocFromAuth,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES} from '../button/button.component';

import {SignUpContainer, ButtonsContainer} from './signInForm.styles.jsx';


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    // generating a user document in firebase
    const handleSubmit = async (event) => {
        event.preventDefault(); // everything in the form will be handled

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (inputEvent) => {
        const { name, value } = inputEvent.target;

        setFormFields({...formFields, [name]: value})
    };
    
    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email' 
                    type='email' 
                    required 
                    onChange={handleChange}  
                    name='email'
                    value={email}
                />

                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange}  
                    name='password'
                    value={password}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Sign In with Google
                    </Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    );
};

export default SignInForm;