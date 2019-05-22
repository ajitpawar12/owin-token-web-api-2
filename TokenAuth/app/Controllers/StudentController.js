
var app = angular.module('moduleApp', ["ngTable"]);
app.controller('studentController', ['$scope', '$log', '$http', 'NgTableParams', '$timeout','$interval', function ($scope, $log, $http, NgTableParams, $timeout,$interval) {
    $scope.Message = "Your are in Student controller";   
    $scope.AccessToken = sessionStorage.getItem("accessToken");    
    $scope.OpName = "Add";

    
    //====Check access token is present or not
    $scope.CheckAccessToken = function ()
    {

        var ac_token = sessionStorage.getItem('accessToken');        
        if (ac_token === null || ac_token === "" || ac_token === undefined) {
            alert("You are not authorize please get authorize.");
            window.location.href = '/Account/Login';
            return false;
        }
        return true;
    }    
    //=============Load All Students Function============//
    $scope.LoadAllStudentData = function ()
    {
        //----------Get All Student data call Start----------//        
     
        var acc_statsus = $scope.CheckAccessToken();
        if (acc_statsus) {
            var GetAllStudentSuccessCallback = function (response, status, headers, config) {
                if (response.data.ResponseStatus === "success" && response.status == "200") {
                    $scope.tableParams = new NgTableParams({}, { dataset: response.data.ResponseData });
                }
                else {
                    $log.warn("Error while retrieving All Students data !" + response.status);
                    alert(response.data.Message);
                    window.location.href = '/Account/Login';

                }
            };
            var GetAllStudentErrorCallback = function (response, status, headers, config) {
                alert(response.data.Message);
                $scope.tableParams = new NgTableParams({}, { dataset: response.data.ResponseData });
                window.location.href = '/Account/Login';
            }

            var resp = $http({
                url: "/api/StudentAPI/GetAllStudents",
                method: "GET",
                headers: $scope.GetAuthHeader(),
            }).then(GetAllStudentSuccessCallback, GetAllStudentErrorCallback);
        }
    //---------Get All Student data call End-----------//

    };
    
    //==========Add new Student Pop pup Function=========//
    $scope.clkaddstudent = function () {
        var acc_statsus = $scope.CheckAccessToken();
        if (acc_statsus) {
        
        $scope.OpName = "Add";
        $("#txtFirstName").val('');
        $("#txtLastName").val('');
        $("#txtBirthDate").val('');
        $("#txtCity").val('');
        $("#txtEmail").val('');
        $("#txtPhone").val('');
        $("#hdnStudentId").val('');
        $('#myModal').modal();
        }
    };

    //=============Student Edit Model Pop pup Function==============//
    $scope.clkstudentedit = function (studentId)
    {        
        //-------Get Single Student Details call start-------//
        var acc_statsus = $scope.CheckAccessToken();
        if (acc_statsus) {
            var GetStudentDetailsSuccessCallback = function (response, status, headers, config) {

                $scope.OpName = "Update";
                $("#txtFirstName").val(response.data.ResponseData.FirstName);
                $("#txtLastName").val(response.data.ResponseData.LastName);
                $("#txtBirthDate").val(response.data.ResponseData.BirthDate);
                $("#txtCity").val(response.data.ResponseData.City);
                $("#txtEmail").val(response.data.ResponseData.Email);
                $("#txtPhone").val(response.data.ResponseData.Phone);
                $("#hdnStudentId").val(response.data.ResponseData.StudentId);
                $('#myModal').modal();
            };
            var GetStudentDetailsErrorCallback = function (response, status, headers, config) {
                $log.log(response);
                window.location.href = '/Account/Login';

            };
            $http({
                url: "/api/StudentAPI/GetStudentDetail?StudentId=" + studentId,
                method: "GET",
                headers: $scope.GetAuthHeader(),
            }).then(GetStudentDetailsSuccessCallback, GetStudentDetailsErrorCallback);

        }
        //-------Get Single Student Details call End-------//
    };

    //=============Student Add and Edit Function==============//
    $scope.AddUpdateStudent = function () {
        var acc_statsus = $scope.CheckAccessToken();
        if (acc_statsus) {
            var sId = $("#hdnStudentId").val()
            var studentData = {
                StudentId: sId,
                FirstName: $("#txtFirstName").val(),
                LastName: $("#txtLastName").val(),
                BirthDate: $("#txtBirthDate").val(),
                City: $("#txtCity").val(),
                Email: $("#txtEmail").val(),
                Phone: parseInt($("#txtPhone").val()),
                Password: $("#txtPassword").val()
            };

            if (sId == "" || sId == undefined) {
                //-------------Add New Student call Start----------//
                var AddStudentsuccessCallback = function (response) {

                    alert("add Successfully !");
                    $scope.LoadAllStudentData();
                };
                var AddStudenterrorCallback = function (response) {
                    $log.log(response)
                };

                $http({
                    url: '/api/StudentAPI/Add',
                    method: "POST",
                    headers: $scope.GetAuthHeader(),
                    data: studentData
                }).then(AddStudentsuccessCallback, AddStudenterrorCallback);

                //-------------Add New Student call End----------//
            }
            else {
                //-------------Update Student call Start----------//
                var UpdateStudentsuccessCallback = function (response) {

                    alert("update Successfully !");
                    $scope.LoadAllStudentData();
                };
                var UpdateStudenterrorCallback = function (response) {
                    $log.log(response.data.ResponseStatus)
                    window.location.href = '/Account/Login';
                };
                $http({
                    url: '/api/StudentAPI/Update',
                    method: "POST",
                    headers: $scope.GetAuthHeader(),
                    data: studentData
                }).then(UpdateStudentsuccessCallback, UpdateStudenterrorCallback);


                //-------------Update Student call End----------//
            }
        }
    }

    //==============Delete Student Function============//
    $scope.clkstudentdelete = function (studentId) {
        var acc_statsus = $scope.CheckAccessToken();
        if (acc_statsus) {

            var DeleteStudentsuccessCallback = function (response) {

                alert("Delete Successfully !");
                $scope.LoadAllStudentData();
            };
            var DeleteStudenterrorCallback = function (response) {
                $log.log(response.data.ResponseStatus)
                window.location.href = '/Account/Login';
            };

            $http({
                url: '/api/StudentAPI/Delete?StudentId=' + studentId,
                method: "GET",
                headers: $scope.GetAuthHeader(),
            }).then(DeleteStudentsuccessCallback, DeleteStudenterrorCallback);

        }
    };    
    
    //Generate AuthHeader
    $scope.GetAuthHeader= function()
    {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};
        if (accesstoken)
        {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        return authHeaders;
    }
    //50000 seconds $interval
    $interval(function ()
    {        
        sessionStorage.setItem('accessToken','');
        sessionStorage.setItem('userName', '');
  }, 50000);
}]);


