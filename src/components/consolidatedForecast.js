import React, { Component } from "react";
import DayCard from "./dayCard";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Hourly from "./hourly";

class ConsolidatedForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "2%"
        }}
      >
        {Object.keys(this.props.weatherData).map(key => {
          let tempData = this.props.weatherData[key].dayWeather;
          //console.log(key, tempData);
          return (
            <Link to={"/hourly/" + key}>
              <DayCard
                key={key}
                day={key}
                condition={tempData.weather}
                low={tempData.tempMin}
                high={tempData.tempMax}
              />
            </Link>
          );
        })}

        <Route path="/hourly" Component={Hourly} />
      </div>
    );
  }
}

export default ConsolidatedForecast;
