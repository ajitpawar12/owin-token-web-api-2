
var app = angular.module('moduleApp', ["ngTable"]);
app.controller('studentController', ['$scope', '$log', '$http','NgTableParams', function ($scope, $log, $http, NgTableParams) {
    $scope.Message = "Your are in Student controller";   
    $scope.AccessToken = sessionStorage.getItem("accessToken");
    $scope.UserName = "";
    $scope.Password = "";
    $scope.OpName = "Add";

    $scope.CheckAccessToken = function () {
        var ac_token = sessionStorage.getItem('accessToken');
        if (ac_token === null || ac_token === "" || ac_token === undefined)
            alert("You are not authorise please get authorise.");
            window.location.href = '/Account/Login';
        return false;
    }
    //=============Load All Students Function============//
    $scope.LoadAllStudentData = function () {
        //----------Get All Student data call Start----------//
        $scope.CheckAccessToken();
        
            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};

            if (accesstoken)
            {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }
            var GetAllStudentSuccessCallback = function (response, status, headers, config) {
                if (response.data.ResponseStatus === "success" && response.status == "200")
                {                   
                    $scope.tableParams = new NgTableParams({}, { dataset: response.data.ResponseData });
                }
                else
                {                    
                    $log.warn("Error while retriving All Students data !" + response.status);
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
                headers: authHeaders,
            }).then(GetAllStudentSuccessCallback, GetAllStudentErrorCallback);   
    //---------Get All Student data call End-----------//

    };
    
    //==========Add new Student Poppup Function=========//
    $scope.clkaddstudent = function () {
        $scope.CheckAccessToken();
        $scope.OpName = "Add";
        $("#txtFirstName").val('');
        $("#txtLastName").val('');
        $("#txtBirthDate").val('');
        $("#txtCity").val('');
        $("#txtEmail").val('');
        $("#txtPhone").val('');
        $("#hdnStudentId").val('');
        $('#myModal').modal();  
    };

    //=============Student Edit Model Poppup Function==============//
    $scope.clkstudentedit = function (studentId) {
        $scope.CheckAccessToken();
        //-------Get Single Student Details call start-------//
        var GetStudentDetailsSuccessCallback = function (response, status, headers, config) {
            $log.log(response.data);
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
        };
        $http.get("/api/StudentAPI/GetStudentDetail?StudentId=" + studentId).then(GetStudentDetailsSuccessCallback, GetStudentDetailsErrorCallback);
        
        //-------Get Single Student Details call End-------//
    };

    //=============Student Add and Edit Function==============//
    $scope.AddUpdateStudent = function () {
        $scope.CheckAccessToken();
        var sId = $("#hdnStudentId").val()
        var studentData ={
            StudentId: sId,
            FirstName: $("#txtFirstName").val(),
            LastName: $("#txtLastName").val(),
            BirthDate: $("#txtBirthDate").val(),
            City: $("#txtCity").val(),
            Email: $("#txtEmail").val(),
            Phone: parseInt($("#txtPhone").val()),
            Password: $("#txtPassword").val()
        };

        $log.log(studentData);
        if (sId == "" || sId == undefined)
        {
            //-------------Add New Student call Start----------//
            var AddStudentsuccessCallback = function (response) {
               $log.log(response)
                alert("add Successfully !");         
                $scope.LoadAllStudentData();
            };
            var AddStudenterrorCallback = function (response) {
                $log.log(response)
            };
            $http.post('/api/StudentAPI/Add', studentData).then(AddStudentsuccessCallback, AddStudenterrorCallback);

            //-------------Add New Student call End----------//
        }
        else {
           //-------------Update Student call Start----------//
            var UpdateStudentsuccessCallback = function (response) {
                $log.log(response.data.ResponseStatus)
                alert("update Successfully !");
                $scope.LoadAllStudentData();
            };
            var UpdateStudenterrorCallback = function (response) {
                $log.log(response.data.ResponseStatus)
            };
            $http.post('/api/StudentAPI/Update', studentData).then(UpdateStudentsuccessCallback, UpdateStudenterrorCallback);

            //-------------Update Student call End----------//
        }        
    }

    //==============Delete Student Function============//
    $scope.clkstudentdelete = function (studentId) {
        $scope.CheckAccessToken();
        var DeleteStudentsuccessCallback = function (response) {
            $log.log(response.data.ResponseStatus)
            alert("Delete Successfully !");   
            $scope.LoadAllStudentData();
        };
        var DeleteStudenterrorCallback = function (response) {
            $log.log(response.data.ResponseStatus)
        };
        $http.get('/api/StudentAPI/Delete?StudentId=' + studentId).then(DeleteStudentsuccessCallback, DeleteStudenterrorCallback);
    };

    //===========Check Validation for Token=============//
    $scope.GetToken = function () {

        $scope.UserName = "ajpawar2012@gmail.com";
        $scope.Password = "Ajit@123";        
         var resp=$http({
            url: "/Token",
            method: "POST",
            data: $.param({ grant_type: 'password', username: $scope.UserName, password: $scope.Password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         });
         return resp;
         
    }

    //===========get Authentication ===========//

    $scope.GetAuthentication = function () {

        $scope.CheckAccessToken();
        var response = $scope.GetToken();

        response.then(function (resp)
        {            
            $scope.userName = resp.data.userName;            
            sessionStorage.setItem('userName', resp.data.userName);
            sessionStorage.setItem('accessToken', resp.data.access_token);
            $scope.AccessToken = resp.data.access_token;           
            alert("You are Now Authorise");
        }, function (err) {
            $scope.responseData = "Error " + err.status;
            window.location.href = '/Account/Login';
        });
    }    
}]);


