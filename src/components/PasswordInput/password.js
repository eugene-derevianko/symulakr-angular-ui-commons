'use strict';

angular.module('symulakr-angular-ui-commons')
  .directive('sPasswordInput', [function () {
    return {
      templateUrl: 'components/PasswordInput/password.html',
      bindToController: true,
      replace: true,
      restrict: 'E',
      scope: {
        value: '='
      },
      controllerAs: 'ctrl',
      controller: ['$scope', function ($scope) {
        var self = this;
        self.showPassword = false;
        self.inputType = 'password';

        self.triggerShowPassword = function () {
          self.showPassword = !self.showPassword;
          setInputType();
        };

        self.isEmpty = function () {
          return !self.value;
        };

        $scope.$watch('ctrl.value', function (newValue, oldValue) {
          if (oldValue && !newValue) {
            self.showPassword = false;
            setInputType();
          }
        });

        function setInputType() {
          self.inputType = self.showPassword ? 'text' : 'password';
        }

      }]
    };
  }]);