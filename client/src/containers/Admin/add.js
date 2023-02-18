import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addCar, clearCar } from "../../actions";

function AddCar(props) {
  const [formdata, setFormdata] = useState({});

  const submitForm = (e) => {
    e.preventDefault();
    props.dispatch(
      addCar({
        ...formdata,
      })
    );
  };

  const handleInput = (event, name) => {
    let newFormdata = {};

    newFormdata = {
      ...formdata,
    };
    if (name === "make") newFormdata = { make: event.target.value };
    if (name === "model") newFormdata = { model: event.target.value };
    if (name === "year") newFormdata = { year: event.target.value };

    setFormdata((formdata) => ({
      ...formdata,
      ...newFormdata,
    }));
  };
  const showNewCar = (car) =>
    car.post ? (
      <div className="conf_link">Success!</div>
    ) : (
      <div className="fail_link">{car.message}</div>
    );

  useEffect(() => {
    return () => {
      props.dispatch(clearCar());
    };
  }, []);

  return (
    <div className="rl_container article">
      <form onSubmit={submitForm}>
        <h2>Add car</h2>
        <div className="form_element">
          <input
            type="text"
            placeholder="Enter car make"
            value={formdata.make}
            onChange={(event) => handleInput(event, "make")}
          />
        </div>
        <div className="form_element">
          <input
            type="text"
            placeholder="Enter car model"
            value={formdata.model}
            onChange={(event) => handleInput(event, "model")}
          />
        </div>
        <div className="form_element">
          <input
            type="number"
            placeholder="Production year"
            value={formdata.year}
            onChange={(event) => handleInput(event, "year")}
          />
        </div>
        <button type="submit">Add car</button>

        {props.cars.newcar ? showNewCar(props.cars.newcar) : null}
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cars: state.cars,
  };
}

export default connect(mapStateToProps)(AddCar);
