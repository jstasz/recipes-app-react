import { Form, Link, useSearchParams} from 'react-router-dom';
import styles from './AuthForm.module.css';
import Button from './Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useContext, useState } from 'react';
import { AuthContext } from './store/auth-context';


const AuthForm = () => {
    const [searchParams] = useSearchParams();
    const isLoginMode = searchParams.get('authMode') === 'login';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { loggedUser, setLoggedUser } = useContext(AuthContext);

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
                setLoggedUser(email);
        }).catch((error) => {
            if(error.message === 'Firebase: Error (auth/wrong-password).') {}
            setErrorMessage('Wrong password! Try again!')
        });
    };

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            setLoggedUser(email);
        }).catch((error) => {
            if(error.message === 'Firebase: Error (auth/email-already-in-use).')
            setErrorMessage('User with this email already exists!')
        });
    };

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        isLoginMode ? signIn() : signUp();
        setEmail('');
        setPassword('');
    };

    const form = <> 
        {errorMessage && <p>{errorMessage}</p>}
        <Form className={styles.form} onSubmit={formSubmitHandler} >
            <h1>{isLoginMode ? 'Log in' : 'Create new user'}</h1>
            <p>
                <label htmlFor="email">email</label>
                <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </p>
            <p>
                <label htmlFor="password">password</label>
                <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </p>
            <div className={styles.actions}>
              <Link to={`?authMode=${isLoginMode ? 'signup' : 'login'}`}>
                {isLoginMode ? 'Create new user': 'Login'}
              </Link>
              <Button type="submit">Save</Button>
            </div>
        </Form>
        </>

  return (
        <>
        {loggedUser !== '' ? 
            <>
                <p>{`You are logged in as ${loggedUser}`}</p>
                <p>If you want to use a different address, please 
                    <span className={styles.logout} onClick={() => setLoggedUser('')}> log out.</span>
                </p>
                </> 
            : form}
        </>
    );
}

export default AuthForm;