app.controller('home', function($scope, $http){
	$http.get('data/log').success(function(data){
		$scope.rooms = data === '' ? [] : data.rooms;
	});
	$scope.createRoom = function(){
		$scope.rooms.push({
			id: $scope.rooms.length+1,
			players: 0
		});
		socket.emit('save', {
			rooms: $scope.rooms
		});
		$scope.joinRoom($scope.rooms.length);
	};
	$scope.joinRoom = function(id){
		window.location.href = '#/' + id;
	};

	$scope.logged = false;
	$scope.login = function() {
		socket.emit('login', {
			name: $scope.name
		});

		$scope.logged = true;
	};

	$scope.players = [];
	socket.on('newPlayer', function(name) {
		$scope.$apply(function() {
			$scope.players.push({
				name: name
			});
		});
	});
});

app.controller('room', function($scope, $routeParams){
	$scope.id = $routeParams.id;
});