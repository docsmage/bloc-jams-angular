blocJams.controller('CollectionCtrl', function ($scope) {
	
	$scope.albums = [];
	for (var i = 0; i < 12; i++) {
		$scope.albums.push(angular.copy(albumPicasso));
	}
});