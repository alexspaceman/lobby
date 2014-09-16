app.config(function($routeProvider){
	$routeProvider.
		when ('/',{
			templateUrl: 'views/home.html',
			controller: 'home'
		}).
		when ('/:id',{
			templateUrl: 'views/room.html',
			controller: 'room'
		}).
		otherwise ({redirectTo: '/'});
});