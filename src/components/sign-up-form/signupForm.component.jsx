import { useState } from 'react';
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocFromAuth 
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.style.scss';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // generating a user document in firebase
    const handleSubmit = async (event) => {
        event.preventDefault(); // everything in the form will be handled

        // confirm passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocFromAuth(user, { displayName });
            resetFormFields();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            console.log('user creation encountered an error', error);
        }
    };

    const handleChange = (inputEvent) => {
        const { name, value } = inputEvent.target;

        setFormFields({...formFields, [name]: value})
    };
    
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name' 
                    type='text' 
                    required 
                    name='displayName'
                    onChange={handleChange}  
                    value={displayName}
                />

                <FormInput
                    label='Email' 
                    type='email' 
                    required 
                    name='email'
                    onChange={handleChange}  
                    value={email}
                />

                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    name='password'
                    onChange={handleChange}  
                    value={password}
                />

                <FormInput 
                    label='Confirm Password'
                    type='password' 
                    required 
                    name='confirmPassword'
                    onChange={handleChange} 
                    value={confirmPassword}    
                />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;