import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <LoginForm />
      <RegisterForm />
    </section>
  );
};

export default Login;