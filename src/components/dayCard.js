import React, { Component } from "react";
import Cloudy from "../weather_icons/Cloudy.png";
import Rainy from "../weather_icons/rainy.png";
import Sunny from "../weather_icons/sunny.png";
//import Thunderstorm from "../weather_icons/Thunderstorm.png";

const conditions = {
  Clouds: Cloudy,
  Rain: Rainy,
  Clear: Sunny
};

class DayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "1%"
        }}
      >
        <div>{this.props.day}</div>
        <img src={conditions[this.props.condition]} />
        <div>Low: {this.props.low}</div>
        <div>High: {this.props.high}</div>
      </div>
    );
  }
}

export default DayCard;
