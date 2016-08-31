import React, { Component } from 'react';
import  { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Repo extends Component {
  render() {
    const repo = this.props.data;
    console.log(typeof this.props.history);
    console.log(this.props.history[0].stars);

    const chartData = (() => {
      const data = [];
      for (let i = 0; i < this.props.history.length; i++) {
        data.push({
          date: this.props.history[0].date,
          stars: this.props.history[0].stars,
          watchers: this.props.history[0].watchers,
          forks: this.props.history[0].forks,
        });
      };
      return data;
    })();

    return (
      <div className="Repo component">
        <div className="names">
          <p>{this.props.owner}</p>
          <p>{this.props.reponame}</p>
        </div>
        <div className="watch-date">
          <p>watching since {this.props.dateAdded}</p>
        </div>
        <p className="scroll-advice">Scroll right to travel back in time!</p>
        <div className="chart">
          <LineChart data={chartData} width={745} height={275}
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
      </div>
    )
  }
}
