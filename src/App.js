import React, { Component } from 'react';

//Import DumyData Delet After
import {dummyData} from './dummyData'

//Impor the CSS file
import "./App.css"

//import components
import Meeting from './Meeting/Meeting';
import IssueDetails from './Meeting/IssueDetails';
import DisplayIterator from './Meeting/DisplayIterator';

//App Component
class App extends Component {

  //State object to handle the data
  state = {
    meetings : dummyData,
    issueDetail : false,
    detailedIssue : null,
    displayManager: {
      startPoint: 0,
      endPoint: 10
    }
  }

  // //Initiate the request immediately
  // componentDidMount() {
  //   fetch('')
  //   .then(res => res.json())
  //   .then((data) => {
  //     this.setState({ meetings: data })
  //   })
  //   .catch(console.log)
  // }


  //Handle the issue details
  seeIssueDetails = (index) => {
    //Create a temp state to modify it
    var tempState = {...this.state};
    tempState.issueDetail = true;
    tempState.detailedIssue = this.state.meetings[index]

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
  nextSetMeetings = () => {
    if(this.state.displayManager.endPoint === this.state.meetings.length) {
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
  previousSetMeetings = () => {

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
        totalPages = {this.state.meetings.length}
        refnextSetMeetings = {() => this.nextSetMeetings()}
        refPreviousSetMeetings = {() => this.previousSetMeetings()}
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

      //Add the meetings bases on the displayManager
      for(let i = this.state.displayManager.startPoint; i < this.state.meetings.length; i++)
      {
        view.push(
          <div key={this.state.meetings[i].id}>
                      <Meeting
                        clickRefIssueDetail = {() => this.seeIssueDetails(i)}
                        title = {this.state.meetings[i].title}
                        body = {this.state.meetings[i].body}
                        state = {this.state.meetings[i].state}
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
        <h1>Sacrament Meeting Planner</h1>
        <h2>Easy to Plan!</h2>
        {view}
      </div> 
    );
  }
}

export default App;
