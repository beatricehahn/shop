import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input 
                    type='text' 
                    required
                    name='displayName'
                    onChange={handleChange} 
                    value={displayName}
                />

                <label>Email</label>
                <input 
                    type='email' 
                    required 
                    name='email'
                    onChange={handleChange}  
                    value={email}
                />

                <label>Password</label>
                <input 
                    type='password' 
                    required 
                    name='password'
                    onChange={handleChange}  
                    value={password}
                />

                <label>Confirm Password</label>
                <input 
                    type='password' 
                    required 
                    name='confirmPassword'
                    onChange={handleChange} 
                    value={confirmPassword}    
                />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;