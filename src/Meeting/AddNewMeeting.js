import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';

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

    //Track the number of speaker the user want to use to later update the DOM
    const [numberOfSpeakers, setNumberOfSpeakers] = useState();

    //Create a empty speakerField
    let speakerFields = [];

    //Instatiate the speakers based on the number of speaker
    const instatiateSpeakers = (size) => {

        setNumberOfSpeakers(size)
        let tempSpeakerHold = [];

        //Make sure old data in the state is saved
        for (let i = 0; i < size; i++){
            
            if(speakers[i]){

                tempSpeakerHold.push({
                    name: speakers[i].name,
                    topic: speakers[i].topic
                })

            } else {

                tempSpeakerHold.push({
                    name: "",
                    topic: ""
                })
            }
        }

        setSpeakers(tempSpeakerHold);
    }

    //Change hased on the speaker input
    const populateSpeakers = (index, speaker) => {

        //Set the Speakers in the state
        let speakerCopy = [...speakers];
        speakerCopy[index].name = speaker;

        setSpeakers(speakerCopy)
    }

    //Change hased on the topic input
    const populateSpeakersTopic = (index, topic) => {
        
        //Set the Speakers in the state
        let speakerCopy = [...speakers];
        speakerCopy[index].topic = topic;

        setSpeakers(speakerCopy)
    }

    //Adjust the DOM with the proper number of speakers
    if (numberOfSpeakers) {
        for (let i = 0; i < numberOfSpeakers; i++) {

           speakerFields.push(        
                <div className="speaker" key={i} id={i}>
                    <label>Speaker</label>
                    <input type="text" className="form-control" placeholder="Speaker" name="speaker"
                        onChange={e => populateSpeakers(i, e.target.value)} value={speakers[i].name}></input>
                    <br />
                    <label>Topic</label>
                    <input type="text" className="form-control" placeholder="Topic" name="topic"
                        onChange={e => populateSpeakersTopic(i, e.target.value)} value={speakers[i].topic}></input>
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
                speakers: speakers
            })
        }

        fetch('/api/Programs', request)
        .then(response => response.json());

        //Display a confirmation message
        swal("Added!", "Your Meeting Has Been Added!", "success", {
            button: "Back to Meetings!",
        });

        //Call the state reset
        props.refToResetState();

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
                    <select name="openingSong" id="openingSong" className="form-control" 
                        onChange={e => setOpeningSong(e.target.value)} value={openingSong}>
                        <option value="" disabled selected>Select Song</option>
                        {
                            props.hymns.map((hymn, index) => (
                                <option>{hymn}</option>
                            ))
                        }
                    </select>
                    <br />
                    <label htmlFor="sacramentHymn">Sacrament Song</label>
                    <select name="sacramentHymn" id="sacramentHymn" className="form-control" 
                        onChange={e => setSacramentHymn(e.target.value)}>
                        <option value="" disabled selected>Select Song</option>
                        {
                            props.hymns.map((hymn, index) => (
                                <option>{hymn}</option>
                            ))
                        }
                    </select>
                    <br />
                    <label htmlFor="specialSong">Special Song</label>
                    <select name="specialSong" id="specialSong" className="form-control" 
                        onChange={e => setSpecialSong(e.target.value)} value={specialSong}>
                        <option value="" disabled selected>Select Song</option>
                        {
                            props.hymns.map((hymn, index) => (
                                <option>{hymn}</option>
                            ))
                        }
                    </select>
                    <br />
                    <label htmlFor="closingSong">Closing Song</label>
                    <select name="closingSong" id="closingSong" className="form-control" 
                        onChange={e => setClosingSong(e.target.value)} value={closingSong}>
                        <option value="" disabled selected>Select Song</option>
                        {
                            props.hymns.map((hymn, index) => (
                                <option>{hymn}</option>
                            ))
                        }
                    </select>
                    <br />
                    <label htmlFor="openingPrayer">Opening Prayer</label>
                    <input type="text" className="form-control" placeholder="Opening Prayer" id="openingPrayer" name="openingPrayer"
                        onChange={e => setOpeningPrayer(e.target.value)} value={openingPrayer}></input>
                    <br />
                    <label htmlFor="closingPrayer">Closing Prayer</label>
                    <input type="text" className="form-control" placeholder="Closing Prayer" id="closingPrayer" name="closingPrayer"
                        onChange={e => setClosingPrayer(e.target.value)} value={closingPrayer}></input>
                    <br />
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date" name="date"
                        onChange={e => setDate(e.target.value)} value={date}></input>
                    <hr />
                    <label htmlFor="numberOfSpeakers">Select Number of Speakers</label>
                    <select name="numberOfSpeakers" id="numberOfSpeakers" className="form-control" 
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
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>          
        </div>
    );
}

//Make sure to export the person
export default AddNewMeeting;