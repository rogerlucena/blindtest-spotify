// Remote site to access: https://rogerlucena.github.io/blindtest-spotify/
// Get Spotify API token: https://developer.spotify.com/web-api/console/get-current-user-saved-tracks/#complete
// Useful comands on the terminal:
// npm install -> install the dependencies after cloning from git
// npm start -> start localhost using Node Project Manager
// npm run deploy -> para jogar no site remoto também
// P.S.: by the end the best was to install NodeJS using the Node Version Manager (NVM)
// Trello link with instructions for this project: https://trello.com/b/RqyIhJIl/web-dojo-13-11
// Theodo's link for the table at Trello: https://trello.com/b/UGoQPLbv/web-dojo-x-13-11

/*global swal*/

// token=    BQDGTe2XfR7teWizu1ZwpFv4JAjZ5bYYoV-XXKQZYN6zgW3o5FzL_Ah0UtgXBl_mMTOyngNvUhyeaGhiP64uaws3_yHN1UfSWiHUOM-q0t2EBpxDzLdnBK4bPe3WNAARrfbAlbmY1CIDYCf4MvtCXBEBaPruQqaqZcx_yq92Kc0

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';


// You have to get a new token every 1 hour !!!
const apiToken = 'BQC2pbQWi7ESzbPPrV6Gxc6Hwr_DDbjiPGXmK1lJmrKmLDDfQ87HN0rplb7TWKKKFz6e3lVivJTPwv4smIB3Q0oqZFd-AZ51SRQE_tkUpQ31nP_Jg3D2aJN_CgOFQIyehT8gRUuwIqGtRL_PBTP2yfsa2tKsGg-c9-IN0zhqiJ8';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class AlbumCover extends Component {
  render() {
  	//console.log(this.props.track);
    //const src = "https://example.com/image.png"; // A changer ;)
    const src = this.props.track.album.images[0].url;
	return (
    	<img src={src} style={{ width: 400, height: 400 }} />
    );
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
    	text: "" ,
    	songsLoaded: false,
    	tracks: {},
    	currentTrack: null,
    }
  }

  render() {
  	if(this.state.songsLoaded){
  		console.log(this.state.tracks);

  	  	var randomIndex1 = getRandomNumber(this.state.tracks.length);
      	var randomIndex2 = getRandomNumber(this.state.tracks.length);

      	// Fix later the problem of randomIndex0 being equal to one of the other two randomIndexes as well
      	while(randomIndex1 === randomIndex2) randomIndex2 = getRandomNumber(this.state.tracks.length);

	    const track0 = this.state.currentTrack;
	    const track1 = this.state.tracks[randomIndex1];
	    const track2 = this.state.tracks[randomIndex2];

	    const tracks = [track0, track1, track2];
	    const shuffledTracks = shuffleArray(tracks);

		// <!--To be printing the javascript variable1 you use {}-->
		
		// Lines that were below "Sound"
		// <div>{this.state.text} </div>
		// <div>{this.state.tracks[0].track.name}</div>
	    return (
	      <div className="App">
	        <header className="App-header">
	          <img src={logo} className="App-logo" alt="logo"/>
	          <h1 className="App-title">Welcome to the Blindtest</h1>
	        </header>
	        <div className="App-images">
	        	<AlbumCover track = {this.state.currentTrack.track}/>
	        	<Sound url={this.state.currentTrack.track.preview_url} playStatus={Sound.status.PLAYING}/>
		        
		        <p>Lets's play!</p>
		        <p>Choose the song that you hear and that belongs to the album above: </p>
		        
		    </div>
		    <div className="App-buttons">
	            {
	              shuffledTracks.map(track => (
	                <Button onClick={() => this.checkAnswer(track)}>{track.track.name}</Button>
	              ))
	            }
          	</div>
	      	</div>
	    );
  	} // problems with Sublime
  	else{
  		return (
	      <div className="App">
	        <header className="App-header">
	          <img src={loading} className="Loading" alt="loading"/>
	          <h1 className="App-title">Welcome to the Blindtest</h1>
	        </header>
	        <div className="App-images">

	        {this.state.text} 
	          <p>Loading!</p>
	          <p>(If it is taking too long then you have to update the 1-hour valable Spotify API token)</p>

	        </div>
	        <div className="App-buttons">
	        </div>
	      </div>
	    );
  	}
  	
  }

  checkAnswer(track) {
    if (track.track.id === this.state.currentTrack.track.id) {
      	swal('Bravo !', 'Your win', 'success').then(
      		function takeNewTrack() {
      			window.location.reload(); // The next line should work too!
      			//this.state.currentTrack = this.state.tracks[getRandomNumber(this.state.tracks.length)];
 			}
      	);
    } else {
      	swal('Try again', 'Ths is not the right answer', 'error');
    }
  }

  componentDidMount() {
  	this.setState({text: "Bonjour!"});

  	fetch('https://api.spotify.com/v1/me/tracks', {
	  method: 'GET',
	  headers: {
	   Authorization: 'Bearer ' + apiToken,
	  },
	})
	  .then(response => response.json())
	  .then((data) => {
	    console.log("Reponse reçue ! Voilà ce que j'ai reçu : ", data); // F12 no browser para ver o console!
	  	this.setState({
	  		songsLoaded: true,
	  		tracks: data.items,
	  		currentTrack: data.items[getRandomNumber(data.items.length)], 
	  		text: "On a bien reçu tout de Spotify ! =D -- Length: " + this.state.tracks.length
	  	});
	  })



  
  }
}

export default App;
