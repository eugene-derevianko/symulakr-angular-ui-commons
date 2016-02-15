'use strict';

angular.module('symulakr-angular-ui-commons', []);

angular.module('symulakr-angular-ui-commons').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('components/PasswordInput/password.html',
    "<div class=\"password-input\"><input type=\"{{ctrl.inputType}}\" ng-model=\"ctrl.value\"> <span class=\"show-password-link\" ng-class=\"ctrl.isEmpty() ? 'hidden':'active'\" ng-click=\"ctrl.triggerShowPassword()\" ng-bind=\"ctrl.showPassword ? 'Hide': 'Show'\"></span></div>"
  );

}]);

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