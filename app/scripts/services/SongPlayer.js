blocJams.factory("SongPlayer", function ($rootScope) {

	var currentSoundFile = null;
	var currentSong = null;
	var currentAlbum = albumPicasso;
	var defaultVolume = 60;
	
	var songIndex = function (songUrl) {
	for (var i = 0; i < currentAlbum.songs.length; i++) {
		if (currentAlbum.songs[i].audioUrl === songUrl) {
			return i;
		}
	}
};
	
	return {
		
		// sets default for starting
		playing: false,
		currentAlbum: albumPicasso,
		currentVolume: 80,

	// method to load the song
		loadSong: function (song) {
			
			this.currentSong = song;
			
			currentSoundFile = new buzz.sound(song.audioUrl, {
         formats: [ 'mp3' ],
         preload: true		
	});
			currentSoundFile.setVolume(defaultVolume);
			
			currentSoundFile.bind('timeupdate', function() {
			$rootScope.$broadcast('timeupdate', buzz.toTimer(this.getTime()));
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
		
		// method to decide when to play or pause the song based on the current state
		playOrPause: function (song) {
			// A song is loaded
			if (currentSong !== null) {
				// if the song is playing
				if (this.playing) {
					this.pause();
					
					if (currentSong === song.audioUrl) {
						return;
					}
				}
			}
			
			this.loadSong(song);
			this.play();
			currentSong = song.audioUrl;
		},

		playPauseCurrentSong: function () {
			if (this.playing) {
				this.pause();
			} else {
				this.play();
			}
		},
		
		// method to check whether or not the method is already playing the song clicked
		isPlayingSong: function (song) {
			return this.playing && currentSong === song.audioUrl;
		},
		
		// method to load the next song
		next: function () {
			var currentSongIndex = songIndex(currentSong, currentAlbum);
			currentSongIndex++;
			// when you reach the last song
			currentSongIndex = currentSongIndex % currentAlbum.songs.length;
			// sets song
			this.playOrPause(currentAlbum.songs[currentSongIndex]);
		},
		
		// method to load the previous song
		previous: function () {
			var currentSongIndex = songIndex(currentSong, currentAlbum);
			currentSongIndex--;
			// when you reach the first song
			if (currentSongIndex < 0) {
				currentSongIndex = currentAlbum.songs.length - 1;
			}
			// sets song
			this.playOrPause(currentAlbum.songs[currentSongIndex]);
		},

		// method to set correct time - not yet applied
//		filterTimeCode: function (timeInSeconds) {
//			
//			timeInSeconds = Math.floor(Number.parseFloat(timeInSeconds));
//
//			var minutes = Math.floor(timeInSeconds / 60);
//			var seconds = (timeInSeconds % 60);
//			return minutes + ":" + seconds;			
//		},
		
		getCurrentSoundFile: function () {
			return currentSoundFile;
	}
		
	};

});