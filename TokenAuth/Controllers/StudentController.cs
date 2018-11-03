using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularWebsite.Controllers
{
    public class StudentController : Controller
    {
        // GET: Student
        public ActionResult Index()
        {
            var accessToken = Session["accessToken"];
            if (accessToken!=null)
                return View();
            else
                return RedirectToAction("Login", "Account");
        }
    }
}