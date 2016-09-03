import React, { Component } from 'react';
import  { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Repo extends Component {
  constructor(props) {
    super(props);
  };

  afn = () => {
    alert('worked?');
  };

  render() {
    const repo = this.props.data;

    const chartData = (() => {
      const data = [];
      const historyLen = this.props.history.length;
      for (let i = historyLen - 1; i >= 0; i--) {
        data.push({
          date: this.props.history[i].date,
          stars: this.props.history[i].stars,
          watchers: this.props.history[i].watchers,
          forks: this.props.history[i].forks,
        });
      };
      return data;
    })();
    
    return (
      <div className="Repo component">
        <div className="names">
          <p onClick={this.afn}>{this.props.owner}</p>
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
