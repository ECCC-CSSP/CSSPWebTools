using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSSPWebTools.Controllers
{
    public class HelpController : BaseController
    {
        // GET: Help
        public PartialViewResult TopSearch()
        {
            return PartialView();
        }
    }
}