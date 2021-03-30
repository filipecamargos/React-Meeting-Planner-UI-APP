import React from 'react';
import swal from 'sweetalert';

//Import CSS 
import './MeetingDetails.css'

//Create Person Component that takes issues from App and map to display all the data
const MeetingDetails = (props) => { 
    
    //Handle to delete the meeting
    const deleteMeeting = id => {

        //Display an alert message
        swal({
            title: "Are you sure on deleting this meeting?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
            swal("Meeting has been deleted!", {
                icon: "success",
            });
            } else {
            swal("Canceled Sucessfully!");
            return;
            }
        });

        //API call to delete meeting
        fetch("/api/programs/" + id, {method: 'DELETE'});
    }

    return (
        <div className="displayContainer">
            <div className="card details">
                <div className="card-body">
                    <h5 className="card-title">Meeting Date: {props.date}</h5>
                    <hr />
                    <p className="card-text">Conductor: {props.conductor}</p>
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
                    <button onClick={props.backToMeetingsList} className="btn btn-secondary">
                        <i className="glyphicon glyphicon-arrow-left"></i>
                    </button>
                    <button className="btn btn-info">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </button> 
                    <button onClick={e => deleteMeeting(props.id)} className="btn btn-danger">
                        <i className="glyphicon glyphicon-trash"></i>
                    </button> 
                </div>
            </div>
        </div>
    );
}

export default MeetingDetails;