/*global swal*/

// token=    BQDGTe2XfR7teWizu1ZwpFv4JAjZ5bYYoV-XXKQZYN6zgW3o5FzL_Ah0UtgXBl_mMTOyngNvUhyeaGhiP64uaws3_yHN1UfSWiHUOM-q0t2EBpxDzLdnBK4bPe3WNAARrfbAlbmY1CIDYCf4MvtCXBEBaPruQqaqZcx_yq92Kc0

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDGTe2XfR7teWizu1ZwpFv4JAjZ5bYYoV-XXKQZYN6zgW3o5FzL_Ah0UtgXBl_mMTOyngNvUhyeaGhiP64uaws3_yHN1UfSWiHUOM-q0t2EBpxDzLdnBK4bPe3WNAARrfbAlbmY1CIDYCf4MvtCXBEBaPruQqaqZcx_yq92Kc0';

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
    const src = "https://example.com/image.png"; // A changer ;)
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
    	firstTrackName: "",
    	tracks: {}
    }
  }

  render() {
  	if(this.state.songsLoaded){
		// <!--To be printing the javascript variable1 you use {}-->
	    return (
	      <div className="App">
	        <header className="App-header">
	          <img src={logo} className="App-logo" alt="logo"/>
	          <h1 className="App-title">Welcome to the Blindtest</h1>
	        </header>
	        <div className="App-images">
	        	<AlbumCover/>
		        <div>{this.state.text} </div>
		        <div>{this.state.firstTrackName}</div>
		        <p>Here we go with the Web Dojo !</p>

		        </div>
		        <div className="App-buttons">
		        </div>
	      	</div>
	    );
  	} 
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

	        </div>
	        <div className="App-buttons">
	        </div>
	      </div>
	    );
  	}
  	
  }

  componentDidMount() {
  	this.setState({text: "Bonjour"});

  	fetch('https://api.spotify.com/v1/me/tracks', {
	  method: 'GET',
	  headers: {
	   Authorization: 'Bearer ' + apiToken,
	  },
	})
	  .then(response => response.json())
	  .then((data) => {
	    console.log("Reponse reçue ! Voilà ce que j'ai reçu : ", data); // F12 no browser para ver o console!
	  	this.setState({songsLoaded: true});
	  	this.setState({tracks: data.items});
	  	this.setState({text: "On a bien reçu tout de Spotify ! =D -- Length: " + this.state.tracks.length});
	  	this.setState({firstTrackName: "First song: " + data.items[0].track.name});

	  })
  
  }
}

export default App;
