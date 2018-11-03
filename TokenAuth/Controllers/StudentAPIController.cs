using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TokenAuth.DBContext;

namespace TokenAuth.Controllers
{
    [Authorize]
    public class StudentAPIController : ApiController
    {
        private readonly SchoolDBEntities context;
        public StudentAPIController()
        {
            context = new SchoolDBEntities();
        }
        [HttpPost]
        [Route("api/StudentAPI/Add")]
        public HttpResponseMessage Add(Student student)
        {
            try
            {
                context.Sp_InsertStudent(student.FirstName,student.LastName,student.BirthDate,student.City,student.Email,student.Phone,student.Password);
                context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { ResponseStatus = "success", ResponseMessage = "Student Create Successfully !",Error="" });
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { ResponseStatus = "error", ResponseMessage = "Something went wrong !", Error = ex.Message });
            }
        }
        [HttpPost]
        [Route("api/StudentAPI/Update")]
        public HttpResponseMessage Update(Student student)
        {
            try
            {
                context.Sp_UpdateStudent(student.StudentId,student.FirstName, student.LastName, student.BirthDate, student.City, student.Email, student.Phone);
                context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Accepted, new { ResponseStatus = "success", ResponseMessage = "Student Update Successfully !", Error = "" });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { ResponseStatus = "error", ResponseMessage = "Something went wrong !", Error = ex.Message });
            }
        }

        [HttpGet]
        [Route("api/StudentAPI/Delete")]
        public HttpResponseMessage Delete(int? StudentId)
        {
            try
            {
                context.Sp_DeleteStudent(StudentId);
                context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Accepted, new { ResponseStatus = "success", ResponseMessage = "Student Delete Successfully !", Error = "" });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { ResponseStatus = "error", ResponseMessage = "Something went wrong !", Error = ex.Message });
            }
        }


        [HttpGet]
        [Route("api/StudentAPI/GetStudentDetail")]
        public HttpResponseMessage GetStudentDetail(int? StudentId)
        {
            try
            {
                var data = context.Sp_GetStudentDetailsById(StudentId).FirstOrDefault();
                
                return Request.CreateResponse(HttpStatusCode.OK, new { ResponseStatus = "success", ResponseData= data, ResponseMessage = "Student Get Successfully !", Error = "" });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { ResponseStatus = "error", ResponseMessage = "Something went wrong !", Error = ex.Message });
            }
        }
      
        [HttpGet]
        [Route("api/StudentAPI/GetAllStudents")]
        public HttpResponseMessage GetAllStudent()
        {
            try
            {
                var data = context.Sp_GetAllStudents();
                
                return Request.CreateResponse(HttpStatusCode.OK, new { ResponseStatus = "success", ResponseData = data.ToList(), ResponseMessage = "All Student Get Successfully !", Error = "" });
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { ResponseStatus = "error", ResponseMessage = "Something went wrong !", Error = ex.Message });
            }
        }
    }
}
