(function() {
    'use strict';
    var app = angular.module('contacts', []);

    /**
    * TestController
    * @description Check if localStorage is available
    **/
    app.controller('TestController', function() {
        this.supportStorage = function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        };
    });

    app.controller('ContactsController', ['$http', '$scope', '$window', function($http, $scope, $window) {
        // Our contacts will be stored here, Init with default value :D
        $scope.contacts = [];
        // Init new contact
        $scope.contact = {};
        if($window.localStorage['contacts']) {
            // Resuming your tasks regitered on $window.localstorage
            var cs = JSON.parse($window.localStorage['contacts']);
            // Updating global tasks variable
            $scope.contacts.push(cs);
            console.log($scope.contacts);
            $scope.contacts = $scope.contacts[0];
        } else {
            // Init new $window.localstorage Object and tasks global var
            $window.localStorage['contacts'] = [];
        }
        // Determine how many contacts the users have
        $scope.count = $scope.contacts.length;
        // Determine the user's action
        $scope.toggleAction = function(action) {
            $scope.action = action;
            if($scope.action == 'cancel') {
                $scope.contact  = {};
            }
            if($scope.action == 'delete') {
                $window.localStorage.removeItem('contacts')
                $scope.contacts = [];
            }
            $scope.count = $scope.contacts.length;
        };
        // Return the user's action
        $scope.getAction = function(action) {
            return $scope.action === action;
        };
        // Upload the file image
        $scope.uploadFile = function(files) {
            var file = new FormData();
            // Take the first selected file
            file.append('image', files[0]);
            // Save it
            var request = $http.post('uploader.php', file, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            });
            // Handle request status
            request.success(function(response) {
                if(response.code != 200) {
                    $window.alert(response.message);
                } else {
                    $scope.contact.src = response.message;
                }
            });
        };
        // Add new contact
        $scope.saveContact = function(contact) {
            $scope.contacts.push(contact);
            $window.localStorage.setItem('contacts', JSON.stringify($scope.contacts));
            $scope.count = $scope.contacts.length;
            $scope.contact = {};
        };
    }]);
})();
