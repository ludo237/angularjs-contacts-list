(function() {
    var app = angular.module('contacts', []);

    app.controller('ContactsController', ['$http', '$scope', '$window', function($http, $scope, $window) {
        // Our contacts will be stored here, Init with default value :D
        $scope.contacts = [];
        // Init new contact
        $scope.contact = {};
        // Determine how many contacts the users have
        $scope.count = $scope.contacts.length;
        // Determine the user's action
        $scope.toggleAction = function(action) {
            $scope.action = action;
            if($scope.action == 'cancel') {
                $scope.contact  = {};
            }
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
            $scope.contac = {};
        };
    }]);
})();
