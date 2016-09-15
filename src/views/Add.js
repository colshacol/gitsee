import React, { Component } from 'react';
import axios from 'axios';

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertAdded: false,
      alertAlready: false,
      alertInvalid: false,
      alertNoExist: false
    }
  };

  componentDidMount() {
    document.getElementById('new-repo-input').focus();
  }

  submitNewRepo = () => {
    const repoID = document.getElementById('new-repo-input').value;
    const user = repoID.substr(0, repoID.indexOf('/'));
    const repo = repoID.substr(repoID.indexOf('/') + 1);

    console.log(user, repo);

    // TODO: Fire invalid input state.
    // if (!user.match(/^(\w|-)*/) || !repo.match(/^(\w|-)*/)) {
    //   this.setState({alertInvalid: true});
    //   setTimeout(() => {
    //     this.setState({alertInvalid: false});
    //   }, 3000)
    //   return;
    // }

    axios.get('https://agile-bayou-37755.herokuapp.com/add/' + repoID)
      .then(res => {
        // console.log(res.data);
        if (res.data == 'Added to DB.') {
          this.setState({alertAdded: true});
          setTimeout(() => {
            this.setState({alertAdded: false});
          }, 3000)
        } else if (res.data == 'Repo already in db.') {
          this.setState({alertAlready: true});
          setTimeout(() => {
            this.setState({alertAlready: false});
          }, 3000)
        } else if (res.data == 'Error: Invalid repo.') {
          this.setState({alertNoExist: true});
          setTimeout(() => {
            this.setState({alertNoExist: false});
          }, 3000)
        }
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    return (
      <div className="Add view">
        <div>
          <input id="new-repo-input" placeholder="owner/repo"/>
          <div>
            <button onClick={this.submitNewRepo}>SUBMIT</button>
          </div>
        </div>
        <div className="alerts">
          <p className={"added-" + this.state.alertAdded}>Added to database!</p>
          <p className={"already-" + this.state.alertAlready}>Already in database.</p>
          <p className={"invalid-" + this.state.alertInvalid}>Invalid user entry.</p>
          <p className={"noexist-" + this.state.alertNoExist}>Repo does not exist!</p>
        </div>
      </div>
    )
  }
}
