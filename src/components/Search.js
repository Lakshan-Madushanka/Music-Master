import React, { Component } from 'react';

class Search extends Component {
  state = { artistQuery: '', artistQueryEmpty: false };

  updateArtistQuery = (event) => {
    console.log('event', event.target.value);
    this.setState({ artistQuery: event.target.value });
  };

  handleKeyPress = (event) => {
    event.key === 'Enter' ? this.searchArtist() : null;
  };

  searchArtist = () => {
    if (this.state.artistQuery === '') {
      return;
    }
    this.setState({ artistQueryEmpty: false });

    this.props.searchArtist(this.state.artistQuery);
  };

  render() {
    return (
      <div>
        <input
          onChange={this.updateArtistQuery}
          onKeyPress={this.handleKeyPress}
          placeholder='Search for a music'
          className='input-bar'
        />
        <button onClick={this.searchArtist} className='search'>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
