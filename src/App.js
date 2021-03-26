import React, { Component } from 'react';

//Import the CSS file
import "./App.css"

//import components
import Meeting from './Meeting/Meeting';
import MeetingDetails from './Meeting/MeetingDetails';
import DisplayIterator from './Meeting/DisplayIterator';
import AddNewMeeting from './Meeting/AddNewMeeting';

//App Component
class App extends Component {

  //State object to handle the data
  state = {
    meetings: [],
    meetingDetail: false,
    addMeeting: false,
    detailedMeeting : null,
    displayManager: {
      startPoint: 0,
      endPoint: 3 
    }
  }

  //Initiate the request immediately
  componentDidMount() {
    fetch("/api/Programs")
    .then(res => res.json())
    .then((data) => {
      this.setState({ meetings: data })
    })
    .catch()
  }


  //Handle the issue details
  seeMeetingDetails = (index) => {
    //Create a temp state to modify it
    let tempState = {...this.state};
    tempState.meetingDetail = true;
    tempState.detailedMeeting = this.state.meetings[index]

    //Set the state 
    this.setState({meetingDetail: tempState.meetingDetail})
    this.setState({detailedMeeting: tempState.detailedMeeting})
  }

  //Handle back to the list of meetings
  backToMeetingsList = () => {
        //Create a temp state to modify it
        let tempState = {...this.state};
        tempState.meetingDetail = false;
        tempState.detailedMeeting = null;
        tempState.addMeeting = false;

        //Set the state 
        this.setState({meetingDetail: tempState.meetingDetail})
        this.setState({detailedMeeting: tempState.detailedMeeting})
  }

  //Handle to delete the meeting
  deleteMeeting = id => {
    //API call to delete meeting
    fetch("/api/programs/" + id, {method: 'DELETE'});
    
    //Go back to MeetingsList
    this.backToMeetingsList();
  }

  //Handle the add meeting
  addNewMeeting = () => {
    //Create a temp state to modify it
    let tempState = {...this.state};
    tempState.meetingDetail = false;
    tempState.detailedMeeting = null;
    tempState.addMeeting = true;

    //Set the state 
    this.setState({meetingDetail: tempState.meetingDetail})
    this.setState({detailedMeeting: tempState.detailedMeeting})
    this.setState({addMeeting: tempState.addMeeting})
  }

  //Handle next btn
  nextSetMeetings = () => {
    if (this.state.displayManager.endPoint > this.state.meetings.length ||
      this.state.displayManager.endPoint === this.state.meetings.length) {
      return;
    }
        //Create a temp state to modify it
        let tempState = {...this.state};
        tempState.displayManager.startPoint += 3;
        tempState.displayManager.endPoint += 3;

        //Set the state 
        this.setState({displayManager : tempState.displayManager})
  }

  //Handle Previous btn
  previousSetMeetings = () => {

    if (this.state.displayManager.startPoint === 0) {
      return;
    }
      //Create a temp state to modify it
      let tempState = {...this.state};
      tempState.displayManager.startPoint -= 3;
      tempState.displayManager.endPoint -= 3;

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
        clickRefAddNewMeeting = {() => this.addNewMeeting()}
        refnextSetMeetings = {() => this.nextSetMeetings()}
        refPreviousSetMeetings = {() => this.previousSetMeetings()}
      />
    ];

    //Set the view based on the state
    if (this.state.meetingDetail){
      view = (
        <div key={123}>
            <MeetingDetails 
              id = {this.state.detailedMeeting.id}
              date = {this.state.detailedMeeting.date}
              conductor = {this.state.detailedMeeting.conductor}
              openingSong = {this.state.detailedMeeting.openingSong}
              sacramentHymn = {this.state.detailedMeeting.sacramentHymn}
              specialSong = {this.state.detailedMeeting.specialSong}
              closingSong = {this.state.detailedMeeting.closingSong}
              openingPrayer = {this.state.detailedMeeting.openingPrayer}
              closingPrayer = {this.state.detailedMeeting.closingPrayer}
              speakers = {this.state.detailedMeeting.speakers}
              backToMeetingsList = {() => this.backToMeetingsList()}
              deleteMeeting = {this.deleteMeeting}
            />
        </div>
      )
    } else if (this.state.addMeeting) {
      view = (
        <div key={124}>
          <AddNewMeeting 
          />
        </div>
      )
    
    } else {

        //Add the meetings bases on the displayManager
        for (let i = this.state.displayManager.startPoint; i < this.state.meetings.length; i++)
        {
          view.push(
            <div key={this.state.meetings[i].id}>
                        <Meeting
                          clickRefMeetingDetail = {() => this.seeMeetingDetails(i)}
                          date = {this.state.meetings[i].date}
                          conductor = {this.state.meetings[i].conductor}
                          openingSong = {this.state.meetings[i].openingSong}
                          sacramentHymn = {this.state.meetings[i].sacramentHymn}
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
        <hr />
        <h1>Sacrament Meeting Planner</h1>
        <h2>Easy to Plan!</h2>
        <hr />
        {view}
      </div> 
    );
  }
}

export default App;
