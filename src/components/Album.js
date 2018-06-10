import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
     super(props);

     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       //current song set first song
       album: album,
      currentSong: album.songs[0],
      isPlaying: false
     };

     // element assigned to thisthis
     this.audioElement = document.createElement('audio');
     //access songs on album as array
     this.audioElement.src = album.songs[0].audioSrc;
   }
   // play()calls song and updates playback state
   play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }

   //rec song obj param and updates
   setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
   }

   //determines what to call bases on 2 conditions
   handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       //sets current song
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
   }

   handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
  }

   render() {
     return (
       <section className="album">
        <section id="album-info" className="row">
        <div className="col">
           <img id="album-cover-art"
            src={this.state.album.albumCover}
            alt={this.state.album.title}
            />
            </div>

           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>

         <table id="song-list" className="table table-hover table-bordered table-striped">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>

           <tbody>
            {this.state.album.songs.map( (song, index) =>
            <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
            </tr>
            )}
           </tbody>
         </table>

         <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
         />
       </section>
     );
   }
 }

export default Album;
