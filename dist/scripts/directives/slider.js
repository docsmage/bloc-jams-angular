blocJams.directive('slider', function (SongPlayer) {
	
	// directive logic that doesn't need to be returned
	
	return {
		templateUrl: 'templates/slider.html',
		restrict: 'E',
		replace: true,
		
		link: function (scope, element) {

			
			
			var seek = function (time) {
	// allows user to scroll to a different part of the song
				var currentSoundFile = SongPlayer.getCurrentSoundFile();
				
	if (currentSoundFile) {
		currentSoundFile.setTime(time);
	}

};

 var setVolume = function (volume) {
	 
	 var currentSoundFile = SongPlayer.getCurrentSoundFile();

     if (currentSoundFile) {
         currentSoundFile.setVolume(volume * 100);
     }

 }; // ends setVolume
			
	var updateSeekPercentage = function(seekBar, seekBarFillRatio) {

	var offsetXPercent = seekBarFillRatio * 100;
	offsetXPercent = Math.max(0, offsetXPercent);
	offsetXPercent = Math.min(100, offsetXPercent);

	var percentageString = offsetXPercent + '%';
				
	var fill = seekBar.querySelector(".fill");
	var thumb = seekBar.querySelector(".thumb");
	angular.element(fill).css({width: percentageString});
	angular.element(thumb).css({left: percentageString});

 }; // ends updateSeekPercentage
			
			var updateSeekBarWhileSongPlays = function () {
						var seekBarFillRatio = this.getTime() / this.getDuration();
						
						updateSeekPercentage(seekBar, seekBarFillRatio);
				
			}; // ends updateSeekBarWhileSongPlays

			var seekBar = element[0];
			var thumb = seekBar.querySelector(".thumb");
			var $thumb = angular.element(thumb);
			var $document = angular.element(document);			
			
			if (element.parent().attr('class') == 'seek-control') {
				updateSeekPercentage(seekBar, 0);
				SongPlayer.setOnSongPlay(updateSeekBarWhileSongPlays);
				
			} else {
				updateSeekPercentage(seekBar, 0.80);
			}

			
			$thumb.on("mousedown", function(event) {

		$document.bind('mousemove', function(event){
			var rect = seekBar.getBoundingClientRect();
			var offsetX = event.pageX - rect.left;
			var barWidth = rect.width;
			var seekBarFillRatio = offsetX / barWidth;
			var currentSoundFile = SongPlayer.getCurrentSoundFile();

			if (element.parent().attr('class') == 'seek-control') {
				seek(seekBarFillRatio * currentSoundFile.getDuration());
			} else {
				setVolume(seekBarFillRatio);
			}

			updateSeekPercentage(seekBar, seekBarFillRatio);
		});

		$document.bind('mouseup', function() {
			$document.unbind('mousemove');
			$document.unbind('mouseup');
		});
	});			
		}
	}
});