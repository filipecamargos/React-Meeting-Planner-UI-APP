import React, { Component } from 'react';

//Impor the CSS file
import "./App.css"

//import components
import Issue from './Issue/Issue';
import IssueDetails from './Issue/IssueDetails';
import DisplayIterator from './Issue/DisplayIterator';

//App Component
class App extends Component {

  //State object to handle the data
  state = {
    issues : [],
    issueDetail : false,
    detailedIssue : null,
    displayManager: {
      startPoint: 0,
      endPoint: 10
    }
  }

  //Initiate the request immediately
  componentDidMount() {
    fetch('https://api.github.com/repos/walmartlabs/thorax/issues')
    .then(res => res.json())
    .then((data) => {
      this.setState({ issues: data })
    })
    .catch(console.log)
  }


  //Handle the issue details
  seeIssueDetails = (index) => {
    //Create a temp state to modify it
    var tempState = {...this.state};
    tempState.issueDetail = true;
    tempState.detailedIssue = this.state.issues[index]

    //Set the state 
    this.setState({issueDetail: tempState.issueDetail})
    this.setState({detailedIssue: tempState.detailedIssue})
  }

  //Handle back to the list of issue
  backToIssueList = () => {
        //Create a temp state to modify it
        var tempState = {...this.state};
        tempState.issueDetail = false;
        tempState.detailedIssue = null;

        //Set the state 
        this.setState({issueDetail: tempState.issueDetail})
        this.setState({detailedIssue: tempState.detailedIssue})
  }

  //Handle next btn
  nextSetIssues = () => {
    if(this.state.displayManager.endPoint === this.state.issues.length) {
      return;
    }
        //Create a temp state to modify it
        var tempState = {...this.state};
        tempState.displayManager.startPoint += 10;
        tempState.displayManager.endPoint += 10;

        //Set the state 
        this.setState({displayManager : tempState.displayManager})
  }

  //Handle Previous btn
  previousSetIssues = () => {

    if(this.state.displayManager.startPoint === 0) {
      return;
    }
      //Create a temp state to modify it
      var tempState = {...this.state};
      tempState.displayManager.startPoint -= 10;
      tempState.displayManager.endPoint -= 10;

      //Set the state 
      this.setState({displayManager : tempState.displayManager})
  }
  

  render() {
    // Determine the view
    let view = [  
      <DisplayIterator key={"tempKey"}
        keys = {[0, 1, 3]}
        displayManager = {this.state.displayManager}
        totalPages = {this.state.issues.length}
        refnextSetIssues = {() => this.nextSetIssues()}
        refPreviousSetIssues = {() => this.previousSetIssues()}
      />
    ];

    //Set the view based on the state
    if(this.state.issueDetail){
      view = (
        <div key={123}>
            <IssueDetails 
              title = {this.state.detailedIssue.title}
              body = {this.state.detailedIssue.body}
              state = {this.state.detailedIssue.state}
              url = {this.state.detailedIssue.url}
              author = {this.state.detailedIssue.author}
              created_at = {this.state.detailedIssue.created_at}
              updated_at = {this.state.detailedIssue.updated_at}
              user = {this.state.detailedIssue.user.login}
              backToIssueList = {() => this.backToIssueList()}
            />
        </div>
      )
    } else {

      //Add the issues bases on the displayManager
      for(let i = this.state.displayManager.startPoint; i < this.state.issues.length; i++)
      {
        view.push(
          <div key={this.state.issues[i].id}>
                      <Issue
                        clickRefIssueDetail = {() => this.seeIssueDetails(i)}
                        title = {this.state.issues[i].title}
                        body = {this.state.issues[i].body}
                        state = {this.state.issues[i].state}
                        issuNumber = {i + 1}
                      />
          </div>
        )

        //Break out of the loop when the last element to be display is reached
        if (i === this.state.displayManager.endPoint - 1) { break; }
      }
    }
    return (
      <div className="AppContainer">
        <h1>Innovate with Heart</h1>
        <h2>Walmartlabs Repo: Thorax</h2>
        {view}
      </div> 
    );
  }
}

export default App;
