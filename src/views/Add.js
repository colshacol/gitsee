import React, { Component } from 'react'
import axios from 'axios'

// TODO: Auto match owner/repo onPaste of URL.

// TODO: Validate input before submitting add request.

// TODO: On add request, if repo exists, prompt user to view its chart.

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

  // When the view loads, focus on the #new-repo-input element.
  componentDidMount = ( ) => document.getElementById('new-repo-input').focus()

  // When enter is pressed inside the #new-repo-input, fire the submit event.
  submitNewRepoByKeyPress = (e) => { if (e.which === 13) this.submitNewRepo() }

  // Validate and pull owner and repo name from user's input.
  // Send owner/repo combo to server to be checked and added to watch list.
  // Depending on server response, alert the user with state driven styles.
  submitNewRepo = ( ) => {
    const repoID = document.getElementById('new-repo-input').value
      .toLowerCase().replace(/\s+/g, '')
    // user = repoID.substr(0, repoID.indexOf('/')),
    // repo = repoID.substr(repoID.indexOf('/') + 1)

    axios.get('/repos/add/' + repoID)
    .then(res => {
      if (res.data == 'Added to DB.') {
        this.setState({alertAdded: true})
        setTimeout(() => {
          this.setState({alertAdded: false})
        }, 3000)
      } else if (res.data == 'Repo already in db.') {
        this.setState({alertAlready: true})
        setTimeout(() => {
          this.setState({alertAlready: false})
        }, 3000)
      } else if (res.data == 'Error: Invalid repo.') {
        this.setState({alertNoExist: true})
        setTimeout(() => {
          this.setState({alertNoExist: false})
        }, 3000)
      }
    })
  }

  render( ) {
    return (
      <div className="Add view">
        <div>
          <input
            onKeyPress={this.submitNewRepoByKeyPress}
            id="new-repo-input"
            placeholder="owner/repo"
          />
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
