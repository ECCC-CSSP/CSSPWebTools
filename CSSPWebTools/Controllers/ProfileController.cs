using CSSPModelsDLL.Models;
using CSSPDBDLL.Models;
using CSSPDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class ProfileController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        #endregion Properties

        #region Constructors
        public ProfileController()
        {

        }
        #endregion Constructors
        
        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _Profile()
        {
            ContactModel contactModel = _ContactService.GetContactLoggedInDB();

            if (contactModel.ContactTVItemID > 0)
            {
                contactModel = _ContactService.GetContactModelAndTelEmailAddressListWithContactTVItemIDDB(contactModel.ContactTVItemID);
            }

            ViewBag.ContactModel = contactModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _ProfileEdit()
        {
            ContactModel contactModel = _ContactService.GetContactLoggedInDB();

            ViewBag.ContactModel = contactModel; 

            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ProfileSaveJSON(FormCollection fc)
        {
            ContactModel contactModel = _ContactService.ProfileSaveDB(fc);

            ViewBag.ContactModel = contactModel;

            return Json(contactModel.Error, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions public
    }
}