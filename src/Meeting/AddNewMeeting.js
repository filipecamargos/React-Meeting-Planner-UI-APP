import React, {useState} from 'react';

//Import CSS 
import './AddNewMeeting.css'

//Create Person Component that takes issues from App and map to display all the data
const AddNewMeeting = (props) => {

    
    //Do the API call to add the meeting
    const createNewMeeting = (e) => {
        e.preventDefault();


    }


    return (
        <div>
            <form onSubmit={e => {createNewMeeting(e)}}>
                <h3>New Meeting</h3>
                <div className="form-group">
                    <label htmlFor="conductor">Conductor</label>
                    <input type="text" className="form-control" placeholder="Conductor" id="conductor" name="conductor"></input>
                    <br />
                    <label htmlFor="openingSong">Opening Song</label>
                    <input type="text" className="form-control" placeholder="Opening Song" id="openingSong" name="openingSong"></input>
                    <br />
                    <label htmlFor="sacramentHymn">Sacrament Hymn</label>
                    <input type="text" className="form-control" placeholder="Sacrament Hymn" id="sacramentHymn" name="sacramentHymn"></input>
                    <br />
                    <label htmlFor="specialSong">Special Song</label>
                    <input type="text" className="form-control" placeholder="Special Song" id="specialSong" name="specialSong"></input>
                    <br />
                    <label htmlFor="closingSong">Closing Song</label>
                    <input type="text" className="form-control" placeholder="Closing Song" id="closingSong" name="closingSong"></input>
                    <br />
                    <label htmlFor="openingPrayer">Opening Prayer</label>
                    <input type="text" className="form-control" placeholder="Opening Prayer" id="openingPrayer" name="openingPrayer"></input>
                    <br />
                    <label htmlFor="closingPrayer">Closing Prayer</label>
                    <input type="text" className="form-control" placeholder="Closing Prayer" id="closingPrayer" name="closingPrayer"></input>
                    <br />
                    <div className="speaker">
                        <hr />
                        <label>Speaker</label>
                        <input type="text" className="form-control" placeholder="Speaker" name="speaker"></input>
                        <br />
                        <label>Topic</label>
                        <input type="text" className="form-control" placeholder="Topic" name="topic"></input>
                        <hr />
                    </div>
                    <br />
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date" name="date"></input>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>          
        </div>
    );
}

//Make sure to export the person
export default AddNewMeeting;

/*
{
  "date": "string",
  "conductor": "string",
  "openingSong": "string",
  "sacramentHymn": "string",
  "specialSong": "string",
  "closingSong": "string",
  "openingPrayer": "string",
  "closingPrayer": "string",
  "speakers": [
    {
      "name": "string",
      "topic": "string"
    }
  ]
}

*/