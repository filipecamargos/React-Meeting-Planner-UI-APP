import React, {useState} from 'react';

//Import CSS 
import './AddNewMeeting.css'

//Create Person Component that takes issues from App and map to display all the data
const AddNewMeeting = (props) => {

    //Set the variable in this component state
    const [date, setDate] = useState();
    const [conductor, setConductor] = useState();
    const [openingSong, setOpeningSong] = useState();
    const [sacramentHymn, setSacramentHymn] = useState();
    const [specialSong, setSpecialSong] = useState();
    const [closingSong, setClosingSong] = useState();
    const [openingPrayer, setOpeningPrayer] = useState();
    const [closingPrayer, setClosingPrayer] = useState();
    const [speakers, setSpeakers] = useState([]);

    //Temp variables to handle the speaker logic adding
    
    //Track the number of speaker the user want to use to later update the DOM
    const [numberOfSpeakers, setNumberOfSpeakers] = useState();

    //Create a empty speakerField
    let speakerFields = [];

    //Instatiate the speakers based on the number of speaker
    const instatiateSpeakers = (size) => {

        let tempSpeakerHold = [];

        for (let i = 0; i < size; i++){
            tempSpeakerHold.push({
                name: null,
                topic: null
            })
        }

        setSpeakers(tempSpeakerHold);
    }


    //Change hased on the speaker
    const populateSpeakers = (index, speaker) => {
        console.log(index, speakers);
        let speakerCopy = [...speakers];
        speakerCopy[index].name = speaker;

        
    }

    //Handle the topic input
    const populateSpeakersTopic = (index, topic) => {
        console.log(index, topic);
    }

    //Adjust the DOM with the proper number of speakers
    if (numberOfSpeakers) {
        for (let i = 0; i < numberOfSpeakers; i++) {

           speakerFields.push(        
                <div className="speaker" key={i} id={i}>
                    <label>Speaker</label>
                    <input type="text" className="form-control" placeholder="Speaker" name="speaker"
                        onChange={e => populateSpeakers(i, e.target.value)}></input>
                    <br />
                    <label>Topic</label>
                    <input type="text" className="form-control" placeholder="Topic" name="topic"
                       onChange={e => populateSpeakersTopic(i, e.target.value)}></input>
                    <br />
                </div>
            )
        }
    }

    //
    //Do the API call to add the meeting
    const createNewMeeting = (e) => {
        e.preventDefault();

        //Set the request
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                date: date,
                conductor: conductor,
                openingSong: openingSong,
                sacramentHymn: sacramentHymn,
                specialSong: specialSong,
                closingSong: closingSong,
                openingPrayer: openingPrayer,
                closingPrayer: closingPrayer,
                speakers: [
                  {
                    name: "TO DO",
                    topic: "TODO"
                  }
                ]
            })
        }

        fetch('/api/Programs', request)
        .then(response => response.json());

    }

    return (
        <div>
            <form onSubmit={e => {createNewMeeting(e)}}>
                <h3>New Meeting</h3>
                <div className="form-group">
                    <label htmlFor="conductor">Conductor</label>
                    <input type="text" className="form-control" placeholder="Conductor" id="conductor" name="conductor"
                        onChange={e => setConductor(e.target.value)} value={conductor}></input>
                    <br />
                    <label htmlFor="openingSong">Opening Song</label>
                    <input type="text" className="form-control" placeholder="Opening Song" id="openingSong" name="openingSong"
                        onChange={e => setOpeningSong(e.target.value)} value={openingSong}></input>
                    <br />
                    <label htmlFor="sacramentHymn">Sacrament Hymn</label>
                    <input type="text" className="form-control" placeholder="Sacrament Hymn" id="sacramentHymn" name="sacramentHymn"
                        onChange={e => setSacramentHymn(e.target.value)} value={sacramentHymn}></input>
                    <br />
                    <label htmlFor="specialSong">Special Song</label>
                    <input type="text" className="form-control" placeholder="Special Song" id="specialSong" name="specialSong"
                        onChange={e => setSpecialSong(e.target.value)} value={specialSong}></input>
                    <br />
                    <label htmlFor="closingSong">Closing Song</label>
                    <input type="text" className="form-control" placeholder="Closing Song" id="closingSong" name="closingSong"
                        onChange={e => setClosingSong(e.target.value)} value={closingSong}></input>
                    <br />
                    <label htmlFor="openingPrayer">Opening Prayer</label>
                    <input type="text" className="form-control" placeholder="Opening Prayer" id="openingPrayer" name="openingPrayer"
                        onChange={e => setOpeningPrayer(e.target.value)} value={openingPrayer}></input>
                    <br />
                    <label htmlFor="closingPrayer">Closing Prayer</label>
                    <input type="text" className="form-control" placeholder="Closing Prayer" id="closingPrayer" name="closingPrayer"
                        onChange={e => setClosingPrayer(e.target.value)} value={closingPrayer}></input>
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date" name="date"
                        onChange={e => setDate(e.target.value)} value={date}></input>
                    <hr />
                    <label htmlFor="numberOfSpeakers">Select Number of Speakers</label>
                    <select name="numberOfSpeakers" id="numberOfSpeakers" className="form-control" 
                        onChange={e => setNumberOfSpeakers(e.target.value)}
                        onChange={e => instatiateSpeakers(e.target.value)}
                        >
                        <option value="" disabled selected>Number of Speakers</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br />
                    {speakerFields}
                    <hr />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>          
        </div>
    );
}

//Make sure to export the person
export default AddNewMeeting;