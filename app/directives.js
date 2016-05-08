var directivesModule = angular.module('customDirectives',[]);

directivesModule.directive('appUser',appUserFactory);

function appUserFactory() {
  return {
    restrict: 'E',
    scope: {
      userData: '='
    },
    transclude:true,
    template: 'Name: {{userData.name}} <br>Location: {{userData.location}} - <ng-transclude></ng-transclude>'
  };
}


directivesModule.directive('domDirective', function () {
      return {
          restrict: 'A',
          scope: {
            hoverColor:'@'
          },
          link: function ($scope,element,attrs) {
       
              element.on('click', function () {
                  element.html('You clicked me!');
              });
              element.on('mouseenter', function () {
                  element.css('background-color', $scope.hoverColor);
              });
              element.on('mouseleave', function () {
                  element.css('background-color', 'white');
              });
          }
      };
  });