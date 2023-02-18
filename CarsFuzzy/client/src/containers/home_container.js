import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCars } from "../actions";
import CarItem from "../widgetsUI/car_item";

function HomeContainer(props) {
  let [search, setSearch] = useState("");

  let handleInput = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    props.dispatch(getCars(20, 0, "asc"));
  }, []);

  let renderItems = (cars, user) =>
    cars.list
      ? cars.list.map((item) =>
          item.document ? (
            <CarItem
              {...item.document}
              key={item.document._id}
              user={user.login.isAuth}
              {...props.navProps}
            />
          ) : (
            <CarItem
              {...item}
              key={item._id}
              user={user.login.isAuth}
              {...props.navProps}
            />
          )
        )
      : null;

  let loadmore = () => {
    let count = props.cars.list.length;
    props.dispatch(getCars(20, count, "asc", search, props.cars.list));
  };

  let submitForm = (e) => {
    e.preventDefault();
    props.dispatch(getCars(20, 0, "asc", search));
  };

  return (
    <div>
      <div className="rl_container">
        <div className="form_element2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => handleInput(event)}
          />
          <button onClick={submitForm}> Search</button>
        </div>
      </div>
      {renderItems(props.cars, props.user)}
      <div className="loadmore" onClick={loadmore}>
        Load More
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { cars: state.cars, user: state.user };
}

export default connect(mapStateToProps)(HomeContainer);
