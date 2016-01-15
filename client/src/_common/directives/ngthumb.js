/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .directive('ngThumb', ngThumb)

  /* @ngInject */
  function ngThumb($window) {
    var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function(item) {
        return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function(file) {
        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    };

    return {
      restrict: 'A',
      template: '<canvas/>',
      link: function(scope, element, attributes) {
        if (!helper.support) {
          console.log("ngThumb: FileReader not supported");
          return;
        }


        var params = scope.$eval(attributes.ngThumb);

        console.log("ngThumb: params", params);
        if (!helper.isFile(params.file)) {
          console.log("ngThumb: params.file is not a file");
          return;
        }

        if (!helper.isImage(params.file)) {
          console.log("ngThumb: params.file is not an image");
          return;
        }

        var canvas = element.find('canvas');
        var reader = new FileReader();

        reader.onload = onLoadFile;
        reader.readAsDataURL(params.file);

        function onLoadFile(event) {
          var img = new Image();
          img.onload = onLoadImage;
          img.src = event.target.result;
        }

        function onLoadImage() {
          var width = params.width || this.width / this.height * params.height;
          var height = params.height || this.height / this.width * params.width;
          canvas.attr({
            width: width,
            height: height
          });
          canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
        }
      }
    };
  }
})();