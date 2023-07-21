import { Form} from 'react-router-dom';
import classes from './AuthForm.module.css';
import Button from './Button';

const AuthForm = () => {

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>Login</h1>
        <p>
          <label htmlFor="email">email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <a href={'/login'}>
            Login
          </a>
          <Button>Save</Button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;