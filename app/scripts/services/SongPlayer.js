blocJams.factory("SongPlayer", function () {

	// access to current album
	var currentAlbum = albumPicasso;
	// access to currentSoundFile (buzz)
	var currentSoundFile;
	var currentSong = null;
	
	return {
	// variable that states whether or not the file is playing		
		playing: false,

	// method to load the song
		loadSong: function (song) {
			currentSoundFile = new buzz.sound(song.audioUrl, {
         formats: [ 'mp3' ],
         preload: true
	});			
		},
		
	// method to play the song
		play: function () {
			if (!this.playing) {
				this.playing = true;
				currentSoundFile.play();
			}
		},
		
	// method to pause the song		
		pause: function () {
			if (this.playing) {
				this.playing = false;
				currentSoundFile.pause();
			}
		},
		playOrPause: function (song) {
			
			// A song is playing
			if (currentSong !== null) {
				// Not the currently playing song
				if (currentSong !== song.audioUrl) {
					this.pause();
					this.loadSong(song);
					this.play();
				// Is the currently playing song
				} else {
					this.pause();
				}
			// No song is playing
			} else {
				this.loadSong(song);
				this.play();
			}
			
			currentSong = song.audioUrl;
		},
		isPlayingSong: function (song) {
			return this.playing && currentSong === song.audioUrl;
		}
		
		// this file is finished - the rest of the data should go in AlbumCtrl
	};
});