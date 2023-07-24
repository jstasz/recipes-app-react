import { Form, Link, useSearchParams} from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './store/auth-context';
import Button from './Button';
import useInput from '../hooks/use-input';
import styles from './AuthForm.module.css';

const AuthForm = () => {
    const [searchParams] = useSearchParams();
    const isLoginMode = searchParams.get('authMode') === 'login';
    const { loggedUser, setLoggedUser } = useContext(AuthContext);

    const [formIsValid, setFormIsValid] = useState(false);
    const [authError, setAuthError] = useState('');

    let errorMessage = 'Something went wrong!'

    const { 
        value: enteredEmail, 
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError, 
        valueBlurHandler: emailBlurHandler, 
        valueChangeHandler: emailChangeHandler,
        resetValue: resetEnteredEmail
      } = useInput(value => value.trim() !== '' && value.includes('@'));

    const { 
        value: enteredPassword, 
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError, 
        valueBlurHandler: passwordBlurHandler, 
        valueChangeHandler: passwordChangeHandler,
        resetValue: resetEnteredPassword
      } = useInput(value => value.trim().length > 6);

    const signIn = () => {
        signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then(() => {
                setLoggedUser(enteredEmail);
        }).catch((error) => {
            if(error) {
                switch (error.message) {
                    case 'Firebase: Error (auth/wrong-password).':
                        setAuthError('Wrong pasword! Try again!');
                        break;
                    case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).' :
                        setAuthError('Too many failed login attempts. Try again later!');
                        break;
                    default:
                        setAuthError(errorMessage);
                }
            }
        });
    };

    const signUp = () => {
        createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then(() => {
            setLoggedUser(enteredEmail);
        }).catch((error) => {
            if(error) {
                switch(error.message) {
                    case 'Firebase: Error (auth/email-already-in-use).':
                        setAuthError('User with this email already exists!');
                        break;
                    case 'Firebase: Error (auth/user-not-found).':
                        setAuthError('User not found!');
                        break;
                    default:
                        setAuthError(errorMessage);
                }
            }
        });
    };

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!formIsValid) {
            return
        }

        isLoginMode ? signIn() : signUp();
        resetEnteredEmail();
        resetEnteredPassword();
    };

    useEffect(() => {
        if(enteredEmailIsValid && enteredPasswordIsValid) {
          setFormIsValid(true)
        } else {
          setFormIsValid(false)
        }
      }, [enteredEmailIsValid, enteredPasswordIsValid])

    const form = <> 
        {authError && <p className={styles['error-text']}>{authError}</p>}
        <Form className={styles.form} onSubmit={formSubmitHandler} >
            <h1>{isLoginMode ? 'Log in' : 'Create new user'}</h1>
            <p>
                <label htmlFor="email">email</label>
                <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    value={enteredEmail} 
                    onChange={emailChangeHandler} 
                    onBlur={emailBlurHandler}
                    required 
                />
                 {emailInputHasError && <p className={styles['invalid-text']}>Please enter valid email!</p>}
            </p>
            <p>
                <label htmlFor="password">password</label>
                <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    value={enteredPassword} 
                    onChange={passwordChangeHandler} 
                    onBlur={passwordBlurHandler}
                    required 
                />
                 {passwordInputHasError && <p className={styles['invalid-text']}>Please enter valid password! Min 6!</p>}
            </p>
            <div className={styles.actions}>
              <Link to={`?authMode=${isLoginMode ? 'signup' : 'login'}`}>
                {isLoginMode ? 'Create new user': 'Login'}
              </Link>
              <Button type="submit" disabled={!formIsValid}>Save</Button>
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