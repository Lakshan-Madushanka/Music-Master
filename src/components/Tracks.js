import React, { Component } from 'react';

class Tracks extends Component {
  state = {
    playing: false,
    playingEnd: false,
    audio: null,
    playingPreviewUrl: '',
  };

  playAudio = (previewUrl) => () => {
    console.log(previewUrl);
    const audio = new Audio(previewUrl);
    this.setState({ playingEnd: false });

    if (!this.state.playing) {
      audio.play();
      console.log('playing');

      console.log('playing');
      this.setState({
        playing: true,
        audio,
        playingPreviewUrl: previewUrl,
      });
      console.log('lakhanan', this.state.playingPreviewUrl);
    } else {
      this.state.audio.pause();
      if (this.state.playingPreviewUrl == previewUrl) {
        this.setState({ playing: false });
      } else {
        audio.play();
        this.setState({ playing: true, audio, playingPreviewUrl: previewUrl });
      }
    }
    audio.onended = () => {
      this.setState({ playingEnd: true });
      console.log('lakhanan', this.state.playingEnd);
    };
  };
  trackIcon = (track) => {
    if (!track.preview_url) {
      return <span>N/A</span>;
    }
    if (
      this.state.playing &&
      this.state.playingPreviewUrl == track.preview_url
    ) {
      if (this.state.playingEnd) {
        //this.setState({ playingEnd: false });
        return <span>&#9654;</span>;
      }
      return <span>||</span>;
    }
    return <span>&#9654;</span>;
  };
  render() {
    const { tracks } = this.props;

    return (
      <div className='track-container'>
        {tracks.map((track) => {
          const { id, name, album, preview_url } = track;
          return (
            <div
              key={id}
              onClick={this.playAudio(preview_url)}
              className='track'
            >
              <img
                src={album.images[0].url}
                alt='track'
                className='track-image'
              />
              <p className='track-text'>{name}</p>
              <p className='track-icon'>{this.trackIcon(track)}</p>
              {this.state.playing &&
              preview_url &&
              !this.state.playingEnd &&
              this.state.playingPreviewUrl == preview_url ? (
                <div className='now playing' id='music'>
                  <div className='playing-center'>
                    <span className='bar n1'>A</span>
                    <span className='bar n2'>B</span>
                    <span className='bar n3'>c</span>
                    <span className='bar n4'>D</span>
                    <span className='bar n5'>E</span>
                    <span className='bar n6'>F</span>
                    <span className='bar n7'>G</span>
                    <span className='bar n8'>H</span>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Tracks;
