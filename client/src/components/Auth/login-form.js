import AuthForm from "./auth-form";
import { useDispatch } from "react-redux";
import { signin } from "../../actions/auth";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (formData) => dispatch(signin(formData));


  return <AuthForm onSubmit={handleSubmit} />;
};

export default LoginForm;
