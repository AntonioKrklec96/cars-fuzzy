import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register, clearUser } from "../actions";

function Register(props) {
  let [formdata, setFormdata] = useState({});

  let submitForm = (e) => {
    e.preventDefault();
    props.dispatch(
      register({
        ...formdata,
      })
    );
    props.history.push("/login");
  };

  let handleInput = (event, name) => {
    let newFormdata = {
      ...formdata,
    };
    if (name === "email") newFormdata = { email: event.target.value };
    if (name === "password") newFormdata = { password: event.target.value };
    setFormdata((formdata) => ({
      ...formdata,
      ...newFormdata,
    }));
    console.log("reg ", formdata);
  };

  useEffect(() => {
    return () => {
      props.dispatch(clearUser());
    };
  }, []);

  return (
    <div className="rl_container">
      <form onSubmit={submitForm}>
        <h2>Register</h2>
        <div className="form_element">
          <input
            type="email"
            placeholder="Email"
            required
            value={formdata.email}
            onChange={(event) => handleInput(event, "email")}
          />
        </div>
        <div className="form_element">
          <input
            type="password"
            placeholder="Password"
            required
            minLength={4}
            value={formdata.password}
            onChange={(event) => handleInput(event, "password")}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Register);
