blocJams.filter("timeCodeFilter", function () {
	
    return function (timeInSeconds) {
			
			if (timeInSeconds) {
				timeInSeconds = parseFloat(timeInSeconds);
				var minutes = Math.floor(timeInSeconds / 60);
				var seconds = Math.floor(timeInSeconds - minutes * 60);
				var formattedTime = minutes + ':' + seconds;
				return formattedTime;
			};
		};
});