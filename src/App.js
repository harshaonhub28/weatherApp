import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ConsolidatedForecast from "./components/consolidatedForecast";
import Hourly from "./components/hourly";

import spinner from "./loadingspinner.gif";

const API_KEY = "317cd121b59b291090c13b017043d952";
const apiUrl = "http://api.openweathermap.org/data/2.5/forecast";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      weatherData: {},
      hourly: false
    };
  }

  componentDidMount() {
    //api call to the weather map api
    axios
      .get(apiUrl, {
        params: {
          APPID: API_KEY,
          id: "1283240"
        }
      })
      .then(response => {
        //console.log(response.data.list);

        let sortedData = {};
        let data = response.data.list;
        data.forEach(dataPoint => {
          let date = dataPoint["dt_txt"].split(" ")[0];
          let time = dataPoint["dt_txt"].split(" ")[1];
          //console.log(date, time);
          if (sortedData.hasOwnProperty(date)) {
            sortedData[date].hourlyWeather.push({
              time: time,
              weather: dataPoint.weather[0].main,
              tempMax: dataPoint.main.temp_max,
              tempMin: dataPoint.main.temp_min
            });
          } else {
            sortedData[date] = {
              dayWeather: {
                weather: dataPoint.weather[0].main,
                tempMax: dataPoint.main.temp_max,
                tempMin: dataPoint.main.temp_min
              },
              hourlyWeather: [
                {
                  time: time,
                  weather: dataPoint.weather[0].main,
                  tempMax: dataPoint.main.temp_max,
                  tempMin: dataPoint.main.temp_min
                }
              ]
            };
          }
        });

        console.log(sortedData);
        this.setState({
          loading: false,
          weatherData: sortedData
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          margin: "5%",
          overflow: "visible"
        }}
      >
        Weather forecast
        {this.state.loading ? (
          <img
            src={spinner}
            style={{
              marginLeft: "40%",
              width: "20%"
            }}
          />
        ) : (
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <ConsolidatedForecast
                  weatherData={this.state.weatherData}
                  {...props}
                />
              )}
            />
            <Route exact path="/hourly" component={Hourly} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
