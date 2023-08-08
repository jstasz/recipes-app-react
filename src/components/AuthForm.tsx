import { Link, useSearchParams} from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Button from './UI/Button';
import MainForm from './UI/Form';
import useInput from '../hooks/use-input';
import styles from './AuthForm.module.css';
import { useSelector, useDispatch } from 'react-redux';

const AuthForm = () => {
    const [ searchParams ] = useSearchParams();
    const isLoginMode = searchParams.get('authMode') === 'login';
    const [formIsValid, setFormIsValid] = useState(false);

    const loggedUser = useSelector((state: any) => state.auth.loggedUser);
    const authError = useSelector((state: any) => state.auth.authError);
    const dispatch = useDispatch();
    
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
    } = useInput(value => value.trim().length > 5);

    const signIn = () => {
        signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then(() => {
            dispatch({type: 'LOGIN', user: enteredEmail})
        })
        .catch((error) => {
            if(error) {
                switch (error.message) {
                    case 'Firebase: Error (auth/wrong-password).':
                    dispatch({type: 'AUTH_FAILURE', errorMessage: 'Wrong pasword! Try again!'})
                        break;
                    case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).' :
                        dispatch({type: 'AUTH_FAILURE', errorMessage: 'Too many failed login attempts. Try again later!'})
                        break;
                    case 'Firebase: Error (auth/user-not-found).':
                        dispatch({type: 'AUTH_FAILURE', errorMessage: 'User not found!'})
                        break;
                    default:
                        dispatch({type: 'AUTH_FAILURE', errorMessage: errorMessage})
                }
            }
        });
    };

    const signUp = () => {
        createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then(() => {
            dispatch({type: 'LOGIN', user: enteredEmail})
        }).catch((error) => {
            if(error) {
                switch(error.message) {
                    case 'Firebase: Error (auth/email-already-in-use).':
                        dispatch({type: 'AUTH_FAILURE', errorMessage: 'User with this email already exists!'})
                        break;
                    default:
                        dispatch({type: 'AUTH_FAILURE', errorMessage: errorMessage})
                }
            }
        });
    };

    const logout = async () => {
        try {
            dispatch({type: 'LOGOUT'})
            dispatch({type: 'CLEAR_SHOPPING_LIST'})
            dispatch({type: 'CLEAR_USER_RECIPES'})
        } catch (error) {
            dispatch({type: 'AUTH_FAILURE', errorMessage: errorMessage})
        }
    }

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

    const authForm = <> 
        <MainForm className={styles.form} onSubmit={formSubmitHandler}>
            <h1>{isLoginMode ? 'Log In' : 'Create User'}</h1>
            {authError && <p className={styles['error-text']}>{authError}</p>}
            <div className={styles['form-control']}>
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
            </div>
            <div className={styles['form-control']}>
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
            </div>
            <div className={styles.actions}>
              <Link to={`?authMode=${isLoginMode ? 'signup' : 'login'}`} className={styles.link}>
                {isLoginMode ? 'Create new user': 'Login'}
              </Link>
              <Button type="submit" disabled={!formIsValid} icon="check">Save</Button>
            </div>
        </MainForm>
        </>

  return (
        <>
        {loggedUser ? 
            <>
                <p>{`You are logged in as ${loggedUser}`}</p>
                <p>If you want to use a different address, please 
                    <span className={styles.logout} onClick={logout}> log out.</span>
                </p>
                </> 
            : authForm}
        </> 
    );
}

export default AuthForm;