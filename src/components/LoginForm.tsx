import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import type {Credentials, LoginResponse} from '../types/LocalTypes';

const LoginForm = () => {
  const navigate = useNavigate();
  const {postLogin} = useAuthentication();
  const [error, setError] = useState<string>('');
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      setError('');
      // eslint-disable-next-line react-hooks/immutability
      const result: LoginResponse = await postLogin(inputs as Credentials);
      console.log('doLogin result', result);
      localStorage.setItem('token', result.token);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
      setError('Login failed. Please check your credentials.');
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <section className="mx-auto w-full max-w-md space-y-4 rounded-md bg-stone-700/40 p-6 text-stone-50 shadow">
      <h2 className="text-center text-2xl font-semibold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="loginusername">
            Username
          </label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 outline-none transition focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="loginpassword">
            Password
          </label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 outline-none transition focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button
          className="mt-2 w-full rounded-md bg-stone-500 px-4 py-2 font-semibold transition hover:bg-stone-700"
          type="submit"
        >
          Login
        </button>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </form>
    </section>
  );
};

export default LoginForm;