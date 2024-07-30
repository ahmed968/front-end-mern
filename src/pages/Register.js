import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterUser, GoogleLogin } from '../redux/slices/UserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin as GoogleLoginButton } from 'react-google-login';
import './Register.css';

const Register = () => {
  const { isAuth, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const onSubmit = (data) => {
    dispatch(RegisterUser(data));
  };

  const handleGoogleSuccess = (response) => {
    dispatch(GoogleLogin(response.tokenId));
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In Error:', error);
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">Please enter your details!</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="typeName"
                        className="form-control form-control-lg custom-input"
                        {...register('name', { required: true })}
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        placeholder="Name"
                      />
                      {errors.name && <span className="text-danger">Please enter your name.</span>}
                    </div>
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
                    <div className="form-outline form-white mb-4 password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="typePasswordX"
                        className="form-control form-control-lg custom-input"
                        {...register('password', {
                          required: true,
                          max: 12,
                          min: 5,
                          maxLength: 11,
                          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
                        })}
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        placeholder="Password"
                      />
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
                    <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={isLoading}>
                      {isLoading ? 'Registering...' : 'Register'}
                    </button>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <GoogleLoginButton
                        clientId="YOUR_GOOGLE_CLIENT_ID"
                        buttonText="Register with Google"
                        onSuccess={handleGoogleSuccess}
                        onFailure={handleGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                        className="google-login-button"
                      />
                    </div>
                  </form>
                </div>
                <div>
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white-50 fw-bold">
                      Login
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

export default Register;
