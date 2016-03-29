angular.module('myApp')
.controller('chatCtrl', function($scope, chatSvc, loginSvc) {

  //s3 stuff

  $scope.images = [];


  $scope.getMessages = function(){
    return chatSvc.getMessages().then(function(data){
        if(!data){
          return [];
        }else{
          return data;
        }
      });
  };



  $scope.deleteMessage = function(id, index) {
    chatSvc.deleteMessage(id);
    // $scope.$apply(function() {
      $scope.messages.splice(index, 1);
      $scope.$emit('delete message', index);

    // });
  };

  $scope.deleteAll = function() {
    chatSvc.deleteAll();
    $scope.messages = [];
  };


  $scope.messages= $scope.getMessages().then(function(data) {
    $scope.messages = data;
  });

    $scope.sendMessage = function(messageText) {
      if (messageText) {
      messageText.user = loginSvc.getCurrentUser();
      chatSvc.postMessage(messageText);
      $scope.$emit('client message', messageText);
    }
    $scope.getMessages();

    };


    $scope.$on('new message', function(event, msg){
      $scope.messages = $scope.getMessages().then(function(data) {
        $scope.messages = data;

      });
      // $scope.$apply(function() {
      //
      // });
      // getMessages();

    });


    // if ($scope.attachedFile) {
    //
    //   chatSvc.postFile($scope.attachedFile);
    //
    // } else if ($scope.threadText) {
    //
    //   chatSvc.postThread($scope.thread);
    //
    // } else {
    //
    //   alert('Please insert text or attach a file');
    //
    // }





});