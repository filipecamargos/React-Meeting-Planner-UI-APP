import React, { Component } from 'react';

//Import DumyData Delete After
import {dummyData} from './dummyData'

//Impor the CSS file
import "./App.css"

//import components
import Meeting from './Meeting/Meeting';
import MeetingDetails from './Meeting/MeetingDetails';
import DisplayIterator from './Meeting/DisplayIterator';

//App Component
class App extends Component {

  //State object to handle the data
  state = {
    meetings : dummyData,
    meetingDetail : false,
    detailedMeeting : null,
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
  seeMeetingDetails = (index) => {
    //Create a temp state to modify it
    var tempState = {...this.state};
    tempState.meetingDetail = true;
    tempState.detailedMeeting = this.state.meetings[index]

    //Set the state 
    this.setState({meetingDetail: tempState.meetingDetail})
    this.setState({detailedIssue: tempState.detailedIssue})
  }

  //Handle back to the list of issue
  backToMeetingsList = () => {
        //Create a temp state to modify it
        var tempState = {...this.state};
        tempState.meetingDetail = false;
        tempState.detailedMeeting = null;

        //Set the state 
        this.setState({meetingDetail: tempState.meetingDetail})
        this.setState({detailedIssue: tempState.detailedIssue})
  }

  //Handle next btn
  nextSetMeetings = () => {
    if(this.state.displayManager.endPoint > this.state.meetings.length) {
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
    if(this.state.meetingDetail){
      view = (
        <div key={123}>
            <MeetingDetails 
              backToMeetingsList = {() => this.backToMeetingsList()}
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
                        clickRefMeetingDetail = {() => this.seeMeetingDetails(i)}
                        date = {this.state.meetings[i].date}
                        conducter = {this.state.meetings[i].conducter}
                        openSong = {this.state.meetings[i].openSong}
                        sacramentHym = {this.state.meetings[i].sacramentHym}
                        specialSong = {this.state.meetings[i].specialSong}
                        closingSong = {this.state.meetings[i].closingSong}
                        openingPrayer = {this.state.meetings[i].openingPrayer}
                        closingPrayer = {this.state.meetings[i].closingPrayer}
                        speakers = {this.state.meetings[i].speakers}
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
