import React from "react";
import axios from "axios";

const deleteCar = (props) => {
  axios.delete(`/api/delete_car?id=${props._id}`);
  setTimeout(() => {
    props.history.push("/");
  }, 0);
};

function CarItem(props) {
  return (
    <div className="car_item">
      <div className="car_header">
        <h2>{props.make}</h2>
      </div>
      <div className="car_items">
        <div className="car_items">
          <div className="car_model">{props.model}</div>
          <div className="car_bubble">Year {props.year}</div>
        </div>
        {props.user.login.isAuth && (
          <div
            onClick={() => deleteCar(props)}
            className="car_bubble"
            style={{
              backgroundColor: "red",
              display: "inline-block",
              padding: "10px",
              fontSize: "14px",
              marginRight: "5px",
              color: " #fff",
            }}
          >
            DELETE
          </div>
        )}
      </div>
    </div>
  );
}

export default CarItem;
