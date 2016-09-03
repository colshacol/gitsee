import React, { Component } from 'react';

export default class Add extends Component {
  render() {
    return (
      <div className="Add view">
        <div>
          <input placeholder="owner/repo"/>
          <div>
            <button>SUBMIT</button>
          </div>
        </div>
        <div className="alerts">
          <p>Added to database!</p>
          <p>Already in database.</p>
          <p>Invalid user entry.</p>
          <p>Repo does not exist!</p>
        </div>
      </div>
    )
  }
}
