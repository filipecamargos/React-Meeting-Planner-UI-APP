import React from 'react';
import swal from 'sweetalert';

//Import CSS 
import './MeetingDetails.css'

//Create Person Component that takes issues from App and map to display all the data
const MeetingDetails = (props) => { 
    
    //Handle to delete the meeting
    const deleteMeeting = () => {

        //Display an alert message
        swal({
            title: "Are you sure you want to delete " + props.date + " meeting?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            delete: false
        })
        .then((willDelete) => {
            if (willDelete) {
            //API call to delete meeting
            fetch("/api/programs/" + props.id, {method: 'DELETE'});

            //Display a confirmation message
            swal(props.date + " Meeting", "Sucessfully Deleted!", "success", {
                button: "Back to Meetings!",

            }).then((backToMeeting) => {
                
                if (backToMeeting) {
                    //Call the state reset
                    props.refToResetState();
                }
            })} else {
                swal("Canceled Sucessfully!");
            }
        });
    }

    //Handle the edit meeting
    const editMeeting = () => {
        
    }

    //Meeting Details
    const meetingDetails = (
            <div className="card details" id="card-details">
                <div className="card-body">
                    <h5 className="card-title">Meeting Date: {props.date}</h5>
                    <hr />
                    <p  className="card-text">Conductor: {props.conductor}</p>
                    <p className="card-text">Opening Song: {props.openingSong}</p>
                    <p className="card-text">Opening Prayer: {props.openingPrayer}</p>
                    <p className="card-text">Sacrament Song: {props.sacramentHymn}</p>
                    <hr />                    
                    <p className="card-text">Speakers:</p>
                    {props.speakers.map((person, index) => (
                        <div key={person.name + person.topic}>
                            <span>Name: {person.name}</span><br />   
                            <span>Topic: {person.topic}</span>
                            <br />
                            <br />
                        </div>
                    ))}
                    <hr />
                    <p className="card-text">Special Song: {props.specialSong}</p>
                    <hr />
                    <p className="card-text">Closing Song: {props.closingSong}</p>
                    <p className="card-text">Closing Prayer: {props.closingPrayer}</p>
                    <hr />
                </div>
                <div className="btnsIterators">
                    <button className="btn btn-info">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </button> 
                    <button onClick={e => deleteMeeting()} className="btn btn-danger">
                        <i className="glyphicon glyphicon-trash"></i>
                    </button> 
                    <button onClick={e => printMeeting()} className="btn btn-secondary">
                        <i className="glyphicon glyphicon-print"></i>
                    </button> 
                </div>
        </div>
    )

    //Print Meeting
    const printMeeting = () => {
        
        let meetingProgram = document.getElementById("card-details");
        let a = window.open();
        a.document.write('<html><body >');
        a.document.write(meetingProgram.innerHTML);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }

    //Return the page to be displayed
    return (
        <div className="displayContainer">
            {meetingDetails}
            <button onClick={props.backToMeetingsList} className="btn btn-dark">
                        <i className="glyphicon glyphicon-arrow-left"></i>
            </button>
        </div>
    );
}

export default MeetingDetails;