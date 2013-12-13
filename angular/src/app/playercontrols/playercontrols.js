angular.module('moped.playercontrols', [
  'moped.mopidy',
  'moped.util',
  'moped.widgets'
])

.controller('PlayerControlsCtrl', function PlayerControlsController($scope, mopidyservice) {

  $scope.volume = 0;
  $scope.isPlaying = false;

  $scope.$on('moped:slidervaluechanged', function(event, value) {
    mopidyservice.setVolume(value);
  });

  $scope.$on('mopidy:event:playbackStateChanged', function(event, data) {
    $scope.isPlaying = data.new_state === 'playing';
  });

  $scope.$on('mopidy:state:online', function() {
    mopidyservice.getVolume().then(function(volume) {
      $scope.volume = volume;
    });
    mopidyservice.getState().then(function(state) {
      $scope.isPlaying = state === 'playing';
    });
  });

  $scope.$on('mopidy:event:volumeChanged', function(event, data) {
    $scope.volume = data.volume;
    $scope.$apply();
  });

  $scope.play = function() {
    if ($scope.isPlaying) {
      // pause
      mopidyservice.pause();
    }
    else {
      // play
      mopidyservice.play();
    }
  };
  
  $scope.previous = function() {
    mopidyservice.previous();
  };

  $scope.next = function() {
    mopidyservice.next();
  };
});