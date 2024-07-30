import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUser, GoogleLogin } from '../redux/slices/UserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin as GoogleLoginButton } from 'react-google-login';
import './Login.css';

// Main Login component
const Login = () => {
  // Redux state and hooks
  const { isAuth, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // React Hook Form setup
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Local state
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  // Load remembered email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmailValue(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Form submission handler
  const onSubmit = (data) => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', data.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    dispatch(LoginUser(data));
  };

  // Google login handlers
  const handleGoogleSuccess = (response) => {
    dispatch(GoogleLogin(response.tokenId));
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In Error:', error);
  };

  return (
    <section className="vh-100 gradient-custom ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email input */}
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg custom-input"
                        {...register('email', { required: true })}
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        placeholder="Email"
                      />
                      {errors.email && <span className="text-danger">Please enter a valid email address.</span>}
                    </div>
                    {/* Password input */}
                    <div className="form-outline form-white mb-4 password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="typePasswordX"
                        className="form-control form-control-lg custom-input"
                        {...register('password', {
                          required: true,
                          minLength: 5,
                          maxLength: 12,
                          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
                        })}
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        placeholder="Password"
                      />
                      {/* Toggle password visibility */}
                      <span 
                        className="password-toggle-icon"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </span>
                      {errors.password && (
                        <span className="text-danger">
                          Password must be between 5 and 12 characters, contain at least one uppercase letter, one
                          lowercase letter, and one number.
                        </span>
                      )}
                    </div>
                    {/* Remember Me checkbox */}
                    <div className="form-check mb-4 text-start">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember Me
                      </label>
                    </div>
                    {/* Forgot password link */}
                    <p className="small mb-5 pb-lg-2">
                      <a href="#!" className="text-white-50">
                        Forgot password?
                      </a>
                    </p>
                    {/* Login button */}
                    <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="spinner-container">
                          <div className="spinner-wheel"></div>
                        </div>
                      ) : (
                        'Login'
                      )}
                    </button>
                    {/* Google Login button */}
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <GoogleLoginButton
                        clientId="YOUR_GOOGLE_CLIENT_ID"
                        buttonText="Login with Google"
                        onSuccess={handleGoogleSuccess}
                        onFailure={handleGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                        className="google-login-button"
                      />
                    </div>
                  </form>
                </div>
                {/* Sign Up link */}
                <div>
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
