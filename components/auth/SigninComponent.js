import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "jackie@red.com",
    password: "test123",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;
  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //save user token to cookie
        // save user info in localStorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
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
  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
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
          <button className='btn btn-raised btn-primary'>Log in</button>
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  );
};
export default SigninComponent;
