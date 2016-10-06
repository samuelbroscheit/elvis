function getDocuments($scope){
  var result = [];
  $.ajax({
    url: 'get_documents',
    async: false,
    dataType: 'json',
    success: function (json) {
      result = json;
    }
  });
  console.log(result)
  $scope.documents = result;
};

function getDocument($scope){
  var result = [];
  $.ajax({
    url: 'get_document',
    async: false,
    data : { document : $scope.selectedDocument, systemOutput : $scope.selectedSystemOutput},
    dataType: 'json',
    success: function (json) {
      result = json;
    }
  });
  $scope.documentHtml = result;
};

function getSystemOutput($scope){
  var result = [];
  $.ajax({
    url: 'get_system_output',
    async: false,
    dataType: 'json',
    success: function (json) {
      result = json;
    }
  });
  $scope.systemOutputs = result;
};


// init angular app and ctrls
var app = angular.module('myApp',[]);

app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
}]);

app.controller('getSystemOutput', ['$scope', getSystemOutput]);
app.controller('getDocuments', ['$scope', getDocuments]);

function getAndShowDocument(selectedSystemOutput, selectedDocument) {

    var my = Object.create( this );
    my.selectedSystemOutput = selectedSystemOutput;
    my.selectedDocument = selectedDocument;

    getDocument(my);

    $('.is_mention').popover('hide')
    $('.document-container .panel-body').html(my.documentHtml)

    console.log(my.documentHtml)

    $('.is_mention').popover({'html': true, 'trigger': 'click'});

    $('.document-container .panel-heading').text(selectedDocument)

    $('.is_mention').addClass('label');
    $('.is_tp').addClass('label-success');
    $('.is_fp_ner').removeClass('label-success');
    $('.is_fn_ner').removeClass('label-success');

    $('.is_fp_ner').addClass('label-warning');

    if ($('#falsePositiveNERC.errorclass-is-disabled').length==0) {
        $('.is_fp_nerc').addClass('label-success');
        $('.is_fp_nerc').addClass('label-danger');
    }

    if ($('#falsePositiveNERL.errorclass-is-disabled').length==0) {
        $('.is_fp_nerl').addClass('label-danger');
    }
    $('.is_fp_nerc.is_fp_nerl').addClass('is_fp_nercl');
    $('.is_fp_nercl').removeClass('is_fp_nerc is_fp_nerl');


    $('.is_fn_ner').addClass('label-default');

    $('.document-container').show()

    window.scrollTo(0, 0);
}

// init jquery functions and plugins
$(document).ready(function(){

    $('#select-document').select2();

    $('#select-system-output').select2();


    $('#select-system-output').on("select2:select", function(e) {
        if(e.params.data.id) {
            $('#select-document').prop("disabled", false);
            if($('#select-document').val()) {
                getAndShowDocument(e.params.data.id, $('#select-document').val());
            }
        } else {
            $('#select-document').prop("disabled", true);
            $('.jumbotron').show()
        }
    });

    $('#select-document').on("select2:select", function(e) {
        $('.jumbotron').hide()
        getAndShowDocument($('#select-system-output').val(), e.params.data.id);
    });

    $('#falsePositiveNERC').click(function() {
        $('.is_fp_nerc').toggleClass('label-danger');
        $(this).toggleClass('errorclass-is-disabled');
        if ($('#falsePositiveNERC.errorclass-is-disabled').length>0 && $('#falsePositiveNERL.errorclass-is-disabled').length>0) {
            $('.is_fp_nercl').removeClass('label-danger')
        } else {
            $('.is_fp_nercl').addClass('label-danger')
        }
    });

    $('#falsePositiveNERL').click(function() {
        $('.is_fp_nerl').toggleClass('label-danger');
        $(this).toggleClass('errorclass-is-disabled');
        if ($('#falsePositiveNERC.errorclass-is-disabled').length>0 && $('#falsePositiveNERL.errorclass-is-disabled').length>0) {
            $('.is_fp_nercl').removeClass('label-danger')
        } else {
            $('.is_fp_nercl').addClass('label-danger')
        }
    });

    $('#nextDocument').click(function() {
        $("#select-document").val($('#select-document').select2().find(":selected").next().val()).trigger("change");
        getAndShowDocument($('#select-system-output').val(), $('#select-document').val());
    });

});
