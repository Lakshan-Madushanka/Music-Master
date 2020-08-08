import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Tracks';
import Search from './Search';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
  state = {
    artist: null,
    tracks: [],
    fetchingFinish: false,
    fetchingError: false,
  };

  componentDidMount() {
    this.searchArtist('bruno');
  }

  searchArtist = (artistQuery) => {
    // console.log(this.state.artistQuery);
    //let artist = this.state.artistQuery;
    if (!window.navigator.onLine) {
      alert('Ooops Your not connect to Interner !');
      return;
    }
    this.setState({ fetchingFinish: false, fetchingError: false });

    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(1, json);
        console.log(1, json.artists.items.length);
        if (json.artists.items.length === 0) {
          this.setState({ fetchingError: true });
        }
        if (json.artists.total > 0) {
          const artist = json.artists.items[0];
          console.log(2, artist);
          this.setState({ artist });

          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              this.setState({ tracks: json.tracks, fetchingFinish: true });
            });
        }
      })
      .catch((err) => {
        this.setState({ fetchingError: true });
        // alert('No results found !');
      });
  };
  searchElement = () => {
    return (
      <div>
        <Search searchArtist={this.searchArtist} />
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  };

  render() {
    let elm;
    if (this.state.fetchingError) {
      elm = (
        <div style={{ width: '100%' }}>
          <p
            style={{
              color: 'red',
              marginBottom: '1px',
              marginTop: '-12px',
            }}
          >
            <strong>No Results Found </strong>
          </p>
          {this.searchElement()}
        </div>
      );
      // document.getElementById('root').style.height = '62vh';
      document.getElementById('root').style.marginBottom = '15px';
      console.log('i am 1');
    } else if (!this.state.fetchingFinish && !this.state.fetchingError) {
      console.log('i am 2');
      elm = (
        <div>
          <Search searchArtist={this.searchArtist} />
          <div className='lds-hourglass'> </div>
        </div>
      );

      //document.getElementById('root').style.height = '55vh';
      document.getElementById('root').style.marginBottom = '0px';
    } else {
      console.log('i am 3');

      elm = <div>{this.searchElement()}</div>;
      // document.getElementById('root').style.height = '55vh';
      document.getElementById('root').style.marginBottom = '0px';
    }
    return (
      <div style={{ width: '100%' }}>
        <h1>Music Master</h1>
        {elm}
      </div>
    );
  }
}
export default App;
//  {this.state.fetchingError ? (
//   <div>
//     <p>No Results Found</p>
//   </div>
// ) : null}
// {!this.state.fetchingFinish && !this.state.fetchingError ? (
//   <div>
//     <Search searchArtist={this.searchArtist} />
//     <div className='lds-hourglass'> </div>
//   </div>
// ) : (
//   <div>
//     <Search searchArtist={this.searchArtist} />
//     <Artist artist={this.state.artist} />
//     <Tracks tracks={this.state.tracks} />
//   </div>
//   )} */</div>
