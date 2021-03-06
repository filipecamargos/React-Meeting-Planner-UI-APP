import React, { Component } from 'react';

//Import the CSS file
import "./App.css"

//import components
import Meeting from '../components/Meeting/Meeting';
import MeetingDetails from '../components/MeetingDetails/MeetingDetails';
import DisplayIterator from '../components/DisplayIterator/DisplayIterator';
import AddNewMeeting from '../components/AddNewMeeting/AddNewMeeting';
import MeetingEdit from '../components/MeetingEdit/MeetingEdit'

//App Component
class App extends Component {

  //State object to handle the data
  state = {
    meetings: [],
    hymns: [],
    meetingDetail: false,
    addMeeting: false,
    editMeeting:false,
    detailedMeeting : null,
    displayManager: {
      startPoint: 0,
      endPoint: 3 
    }
  }

  //Initiate the request immediately
  componentDidMount() {
    
    //Get the programs
    fetch("/api/Programs")
    .then(res => res.json())
    .then((data) => {
      this.setState({ meetings: data })

      //Find the meeting details and set the new view data as updated
      if(this.state.meetingDetail) {
       this.state.detailedMeeting = data.find(i => i.id === this.state.detailedMeeting.id);
      }

    })
    .catch()

    //Get the Hymns
    fetch("/api/Hymns")
    .then(res => res.json())
    .then((data) => {
      this.setState({hymns: data })
    })
    .catch()

  }

  //Handle the issue details
  seeMeetingDetails = (index) => {

    //Create a temp state to modify it
    let tempState = {...this.state};
    tempState.meetingDetail = true;

    //Set a condition if the state is coming from editMeeting
    if(tempState.editMeeting) {

      this.componentDidMount()
      tempState.editMeeting = false;
      
    } else {

      tempState.detailedMeeting = this.state.meetings[index]
      
    }   

    //Set the state 
    this.setState({meetingDetail: tempState.meetingDetail})
    this.setState({detailedMeeting: tempState.detailedMeeting})
    this.setState({editMeeting: tempState.editMeeting})
  }

  //Handle the add meeting
  addNewMeeting = () => {
    //Create a temp state to modify it
    let tempState = {...this.state};
    tempState.meetingDetail = false;
    tempState.detailedMeeting = null;
    tempState.addMeeting = true;

    //Set the state 
    this.setState({meetingDetail: tempState.meetingDetail});
    this.setState({detailedMeeting: tempState.detailedMeeting});
    this.setState({addMeeting: tempState.addMeeting});
  }

  //Handle the editMeeting
  editMeeting = () => {
    //Create a temp state to modify it
    let tempState = {...this.state};
    tempState.meetingDetail = false;
    tempState.addMeeting = false;
    tempState.editMeeting = true;

    //Set the state 
    this.setState({meetingDetail: tempState.meetingDetail});
    this.setState({addMeeting: tempState.addMeeting});
    this.setState({editMeeting: tempState.editMeeting});
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

  //Reset the state component
  resetComponent = () => {

    //Original State
    const temp_state = {
      meetings: [],
      hymns: [],
      meetingDetail: false,
      addMeeting: false,
      meetingDetail :false,
      detailedMeeting : null,
      displayManager: {
        startPoint: 0,
        endPoint: 3 
      }
    }
  
    //Clear the state
    this.setState(temp_state);

    //Update with the latest data
    this.componentDidMount();
  }

  render() {
    //Determine the view
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
              backToMeetingsList = {this.backToMeetingsList}
              refToResetState = {this.resetComponent}
              refToEditMeeting = {this.editMeeting}
            />
        </div>
      )
    } else if (this.state.addMeeting) {

      view = (
        <div key="add">
          <AddNewMeeting
            hymns = {this.state.hymns} 
            refToResetState = {() => this.resetComponent()}
          />
        </div>
      )
    
    } else if (this.state.editMeeting) {

      view = (
        <div key="edit">
          <MeetingEdit 
            hymns = {this.state.hymns} 
            meetingToUpdate = {this.state.detailedMeeting}
            backToMeetingDetails = {this.seeMeetingDetails}
            refToResetState = {this.resetComponent}
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
                openingPrayer = {this.state.meetings[i].openingPrayer}
                closingPrayer = {this.state.meetings[i].closingPrayer}
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
        <div>
          {view}
        </div>
      </div> 
    );
  }
}

export default App;
