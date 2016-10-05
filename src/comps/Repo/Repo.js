import React, { Component } from 'react'
import  { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import './Repo.styl'

@observer export default class Repo extends Component {
  @observable relativeChart = true
  @observable status = `Searching.`
  @observable repoHistory = this.props.history

  // switch chart from absolute view to relative view.
  switchChart = () => { this.relativeChart = !this.relativeChart }

  render() {
    // if no valid repo was passed into the component,
    // inform the user that his query returned no results.
    if (typeof this.props.history === 'undefined') {
      return (
        <div className="Repo component">
          <p id="no-results">No results.</p>
        </div>
      )
    } else if (this.props.history.length < 2) {
      return (
        <div className="Repo component">
          <p id="no-results">'Not enough data. Check back tomorrow.'</p>
        </div>
      )
    }

    const historyLen = this.repoHistory.length;
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

      if (!this.relativeChart) {
        chart.push({
          date: this.props.history[i].date,
          stars: this.props.history[i].stars,
          watchers: this.props.history[i].watchers,
          forks: this.props.history[i].forks,
        })
      } else {
        if (i !== historyLen - 1) {
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

    const starsTotal = stars.reduce((total, num) => {
      return total + num;
    })

    const starsAverage = Math.floor(starsTotal / stars.length)
    const otherView = (this.relativeChart) ? 'absolute' : 'relative'
    return (
      <div className="Repo component">
        <div className="names">
          <p>{this.props.owner}</p>
          <p>{this.props.repoName}</p>
        </div>
        <div className="watch-date">
          <p>watching since {this.props.dateAdded}</p>
          <p className="clickable" onClick={this.switchChart}>Switch to {otherView} view</p>
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
          <p id="average">Average daily growth since {this.props.dateAdded}: {starsAverage} stars per day.</p>
        </div>
      </div>
    )
  }
}


// if (historyLen < 2) browserHistory.push('/add')
//
// if (this.relativeChart) {
// // If the absolute chart is active.
//   chart.push({
//     date: day.date,
//     stars: day.stars,
//     watchers: day.watchers,
//     forks: day.forks,
//   })
//
// } else {
//   if (i !== 0) {
//     stars.push(
//       day.stars -
//       this.props.history[i - 1].stars
//     )
//     watchers.push(
//       day.watchers -
//       this.props.history[i - 1].watchers
//     )
//     forks.push(
//       day.forks -
//       this.props.history[i - 1].forks
//     )
//   }
//
//   chart.push({
//     date: day.date,
//     stars: stars[i - 1],
//     watchers: watchers[i - 1],
//     forks: forks[i - 1]
//   })
// }
//
// //   chart.push({
// //     date: this.props.history[i].date,
// //     stars: stars[i - 1],
// //     watchers: watchers[i - 1],
// //     forks: forks[i - 1]
// //   })
// //
// // } else {
// //   chart.push({
// //     date: this.props.history[i].date,
// //     stars: this.props.history[i].stars,
// //     watchers: this.props.history[i].watchers,
// //     forks: this.props.history[i].forks
// //   })
// // }
// })
//
// // const starsTotal = stars.reduce((total, num) => total + num)
// // const starsAverage = Math.floor(starsTotal / stars.length)
// const alternativeView = (!this.relativeChart) ? 'main' : 'relative';
