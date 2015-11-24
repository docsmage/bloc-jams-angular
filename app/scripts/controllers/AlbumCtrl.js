blocJams.controller('AlbumCtrl', function ($scope, SongPlayer) {
	
	// a new songPlayer object
	$scope.songPlayer = SongPlayer;	
	
	// album object
	$scope.album = angular.copy(albumPicasso);
	
	// songs object
	$scope.songs = $scope.album.songs;
	
	// hover object
	var hover = null;
	
	// function to play and pause songs
	$scope.playPauseSong = function (song) {
		
		SongPlayer.playOrPause(song);
		
	};

	$scope.onMouseOver = function (song) {
		if (SongPlayer.playing) {
			// set the class of the button to be a pause button
			hover = song;
		} else {
			// set the class of the button to a play button
			hover = null;
			SongPlayer.play();

		}
	};
	
	$scope.next = function () {
		SongPlayer.next();
	};

	$scope.previous = function () {
		SongPlayer.previous();
	};	
	
	$scope.playPauseCurrentSong = function () {
		SongPlayer.playPauseCurrentSong();
	};
	
	// ctrl element to set volume - not yet applied!
	$scope.setVolume = function (volume) {
		SongPlayer.setVolume(volume);
	}
	
	$scope.$on('timeupdate', function(event, time) {
		$scope.$apply(function() {
			$scope.currentSongTime = time;
		});
	});
	
	// ctrl element to set correct time - not yet applied
	$scope.setTimeInPlayerBar = function (time) {
		filterTimeCode(time);
	};
	
});