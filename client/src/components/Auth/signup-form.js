import AuthForm from "./auth-form";
import { signup } from "../../actions/auth";
import { useDispatch } from "react-redux";

const SignupForm = () => {
    const dispatch = useDispatch();

  const handleSubmit = (formData) => dispatch(signup(formData))

  return <AuthForm isSignup onSubmit={handleSubmit} />;
};

export default SignupForm;
