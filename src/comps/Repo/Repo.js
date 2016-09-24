import React, { Component } from 'react'
import  { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './Repo.styl'

export default class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainChartActive: false
    }
  }

  switchChart = () => {
    this.setState({
      mainChartActive: !this.state.mainChartActive
    })
  }

  render() {
    const historyLen = this.props.history.length;

    const chart = []
    const stars = []
    const forks = []
    const watchers = []

    for (let i = historyLen - 1, x = 0; i >= 0; i--) {
      if (i !== historyLen - 1) {
        stars.push(
          this.props.history[i + 1].stars -
          this.props.history[i].stars
        )

        watchers.push(
          this.props.history[i + 1].watchers -
          this.props.history[i].watchers
        )

        forks.push(
          this.props.history[i + 1].forks -
          this.props.history[i].forks
        )
      }

      if (this.state.mainChartActive) {
        chart.push({
          date: this.props.history[i].date,
          stars: this.props.history[i].stars,
          watchers: this.props.history[i].watchers,
          forks: this.props.history[i].forks,
        })
      } else {
        if (i !== historyLen - 1) {
          console.log('adding ' + this.props.history[i].date);
          console.log(stars);
          console.log(x);
          chart.push({
            date: this.props.history[i].date,
            stars: stars[x - 1],
            watchers: watchers[x - 1],
            forks: forks[x - 1],
          })
        }
      }

      x += 1
    }

    console.log(chart);

    const starsTotal = stars.reduce((total, num) => {
      return total + num;
    })

    const starsAverage = Math.floor(starsTotal / stars.length)

    const alternativeView = (!this.state.mainChartActive) ? 'main' : 'relative';

    return (
      <div className="Repo component">
        <div className="names">
          <p>{this.props.owner}</p>
          <p>{this.props.reponame}</p>
        </div>
        <div className="watch-date">
          <p>watching since {this.props.dateAdded}</p>
          <p onClick={this.switchChart}>Switch to {alternativeView} view</p>
        </div>
        <div className="description">
          <p>{this.props.description}</p>
        </div>
        <p className="scroll-advice">Scroll right to travel back in time!</p>
        <div className="chart">
          <LineChart data={chart} width={745} height={275}
             margin={{top: 30, right: 70, left: 30, bottom: 20}}>
            <XAxis dataKey="date"/>
            <YAxis />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="stars" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="watchers" stroke="#82ca9d" />
            <Line type="monotone" dataKey="forks" stroke="#ee6059" />
          </LineChart>
        </div>
        <div className="details">
          <p>Average daily growth since {this.props.dateAdded}: {starsAverage} stars per day.</p>
        </div>
      </div>
    )
  }
}
