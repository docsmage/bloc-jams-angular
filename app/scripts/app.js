var blocJamsModule = angular.module('blocJams', ['ui.router']);
//blocJamsModule is the name of the identifier assigned to the module
//blocJams is the name of the module and is the link between the apps HTML and the module

blocJamsModule.config(function($stateProvider, $locationProvider) {
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	
	
	$stateProvider
	
		.state('landing', {
		url: '/', // where the user initially lands
		controller: 'LandingCtrl.controller',
		templateURL: '/templates/landing.html'
	})
	
		.state('collection', {
		url: '/collection',
		controller: 'CollectionCtrl.controller',
		templateURL: '/templates/collection.html'
	})	
	
		.state('album', {
		url: '/album',
		controller: 'AlbumCtrl.controller',
		templateUrl: '/templates/album.html'
	})
	
});
// $locationProvider configures an applications paths
// $stateProvider will configure aspects of a state including name, URL route, controller and template