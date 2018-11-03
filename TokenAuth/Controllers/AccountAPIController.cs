using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TokenAuth.DBContext;

namespace TokenAuth.Controllers
{
    public class AccountAPIController : ApiController
    {
        private readonly SchoolDBEntities context;
        public AccountAPIController()
        {
            context = new SchoolDBEntities();
        }
        public HttpResponseMessage Login(string username,string password)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(username) && !string.IsNullOrWhiteSpace(password))
                {
                    var user = context.Students.FirstOrDefault(x => x.Email == username && x.Password == password);
                    if (user != null)
                        return Request.CreateResponse(HttpStatusCode.OK, new { ResponseStatus = "success", ResponseMessage = "Student Create Successfully !", Error = "", ResultObject = "" });
                    else
                        return Request.CreateResponse(HttpStatusCode.OK, new { ResponseStatus = "error", ResponseMessage = "User not found !", Error = "", ResultObject = "" });

                }

                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { ResponseStatus = "error", ResponseMessage = "Internal server error !", Error = "", ResultObject = "" });
            }
           
        }
    }
}
