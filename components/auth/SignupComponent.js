import { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "Kack",
    email: "jackie@red.com",
    password: "test123",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;
  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const showLoading = () =>
    loading ? <div className='alert alert-info'>Loading...</div> : "";
  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : "";
  const showMessage = () =>
    message ? <div className='alert alert-info'>{message}</div> : "";

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='text-muted'>Name</label>

          <input
            value={name}
            onChange={handleChange("name")}
            type='text'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Email</label>

          <input
            value={email}
            onChange={handleChange("email")}
            type='email'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Password</label>

          <input
            value={password}
            onChange={handleChange("password")}
            type='password'
            className='form-control'
          />
        </div>
        <div>
          <button className='btn btn-raised btn-primary'>Sign Up</button>
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};
export default SignupComponent;
