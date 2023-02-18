import React from "react";
import HomeContainer from "./../../containers/home_container";

function Home(props) {
  return (
    <div>
      <HomeContainer navProps={props} />
    </div>
  );
}

export default Home;
