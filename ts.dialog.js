(function (window, angular, undefined) {

    'use strict';

    angular.module('ts.dialog', ['ts.pointerEventsNone']).directive('tsDialog', [function () {
        return {
            restrict: 'E',
            templateUrl: 'template/ts.dialog.html',
            scope: {
                'dialog': '=fn'
            },
            controller: ['$scope', '$q', function ($scope, $q) {
                $scope.show = false;
                $scope.showPrompt = false;
                $scope.showCancel = false;
                $scope.data = {
                    title: 'Message',
                    message: '',
                    prompt: null
                };

                var deferred = null;
                $scope.dialog = function (title) {
                    $scope.data.title = title || $scope.data.title;
                    deferred = $q.defer();
                    $scope.showPrompt = false;
                    $scope.showCancel = false;
                    return {
                        'alert': function (message) {
                            $scope.data.message = message;
                            $scope.show = true;
                            return deferred.promise;
                        },
                        'confirm': function (message) {
                            $scope.data.message = message;
                            $scope.show = true;
                            $scope.showCancel = true;
                            return deferred.promise;
                        },
                        'prompt': function (message, prompt) {
                            $scope.data.message = message;
                            $scope.data.prompt = prompt || '';
                            $scope.show = true;
                            $scope.showPrompt = true;
                            $scope.showCancel = true;
                            return deferred.promise;
                        }
                    };
                };
                $scope.onOkClick = function () {
                    $scope.show = false;
                    deferred.resolve($scope.data.prompt);
                };
                $scope.onCancelClick = function () {
                    $scope.show = false;
                    deferred.reject();
                };
            }]
        };
    }]);
})(window, window.angular);