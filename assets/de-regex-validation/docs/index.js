'use strict';

(function ($, window, document, undefined) {

  $(function () {

    function initForm1() {
      var form = $('.form-1').deRegexValidation({
        preventSubmitOnInvalid: true,
        disableFormOnInvalid: true,
        validateRequiredFields: true,
        on: {
          init: function (form) {

          }
        }
      });
    }

    function initForm2() {
      var form = $('.form-2').deRegexValidation();
    }

    function initForm3() {
      var form = $('.form-3').deRegexValidation();
    }

    function initForm4() {
      var form = $('.form-4').deRegexValidation();
    }

    function init() {
      initForm1();
      initForm2();
      initForm3();
      initForm4();
    }

    init();

  });

})(jQuery, window, document);