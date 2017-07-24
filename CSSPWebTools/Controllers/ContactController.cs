using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Models;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class ContactController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public ContactController _ContactController { get; set; }
        #endregion Properties

        #region Constructors
        public ContactController()
        {
            _ContactController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
        }
        #endregion Overrides

        #region Helper Checks
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckFullNameUniquenessJSON(string FullName)
        {
            string Status = _ContactService.CheckFullNameUniquenessDB(FullName);

            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckEmailExistJSON(string Email = "")
        {
            string Status = _ContactService.CheckEmailExistDB(Email);

            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckEmailUniquenessJSON(string Email = "")
        {
            string Status = _ContactService.CheckEmailUniquenessDB(Email);

            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckCodeEmailExistJSON(string CodeEmail = "")
        {
            string Status = _ContactService.CheckCodeEmailExistDB(CodeEmail);

            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckWebNameUniquenessJSON(string WebName = "")
        {
            string Status = _ContactService.CheckWebNameUniquenessDB(WebName);

            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        #endregion Helpers Checks

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _contactList(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            List<TVItemLinkModel> tvItemLinkModelListContact = _ContactService._TVItemLinkService.GetTVItemLinkModelListWithFromTVItemIDDB(urlModel.TVItemIDList[0]).Where(c => c.ToTVType == TVTypeEnum.Contact).ToList();

            List<ContactModel> contactModelList = new List<ContactModel>();

            foreach (TVItemLinkModel tvItemLinkModelContact in tvItemLinkModelListContact)
            {
                contactModelList.Add(_ContactService.GetContactModelWithContactTVItemIDDB(tvItemLinkModelContact.ToTVItemID));

                List<TVItemLinkModel> tvITemLinkModelListTel = _ContactService._TVItemLinkService.GetTVItemLinkModelListWithFromTVItemIDDB(tvItemLinkModelContact.ToTVItemID).Where(c => c.ToTVType == TVTypeEnum.Tel).ToList();

                List<TelModel> telModelList = new List<TelModel>();
                foreach (TVItemLinkModel tvItemLinkModelTel in tvITemLinkModelListTel)
                {
                    telModelList.Add(_ContactService._TelService.GetTelModelWithTelTVItemIDDB(tvItemLinkModelTel.ToTVItemID));
                }

                contactModelList[contactModelList.Count - 1].TelList = telModelList;
            }

            ViewBag.ContactModelList = contactModelList;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;
          
            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
         
            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _contactAddOrModify(int ParentTVItemID, int ContactTVItemID)
        {
            ViewBag.TVItemModel = null;
            ViewBag.ContactModel = null;
            ViewBag.ParentTVItemID = ParentTVItemID;
            ViewBag.ContactTVItemID = ContactTVItemID;
            ViewBag.ContactController = _ContactController;

            if (ContactTVItemID > 0)
            {
                ViewBag.IsModify = true;

                ContactModel contactModel = _ContactService.GetContactModelWithContactTVItemIDDB(ContactTVItemID);

                ViewBag.ContactModel = contactModel;
            }

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ContactEditJSON(FormCollection fc)
        {
            ContactModel contactModel = _ContactService.PostAddOrModifyContactUnderParentTVItemIDDB(fc);

            return Json(contactModel, JsonRequestBehavior.AllowGet);
        }
         
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ContactDeleteJSON(FormCollection fc)
        {
            ContactModel contactModel = _ContactService.PostDeleteContactUnderParentTVItemIDDB(fc);

            return Json(contactModel.Error, JsonRequestBehavior.AllowGet);
        }
         
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ContactSearchJSON(string SearchTerm)
        {
            List<ContactSearchModel> contactSearchModelList = _ContactService.ContactSearchDB(SearchTerm);
            return Json(contactSearchModelList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult LinkParentTVItemIDAndContactTVItemIDJSON(int ParentTVItemID, int ContactTVItemID)
        {
            ContactModel contactModel = _ContactService.PostLinkParentTVItemIDAndContactTVItemIDDB(ParentTVItemID, ContactTVItemID);
            return Json(contactModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _contactMoreInfo(int ContactTVItemID)
        {

            ContactModel contactModel = _ContactService.GetContactModelAndTelEmailAddressListWithContactTVItemIDDB(ContactTVItemID);

            ViewBag.ContactModel = contactModel;

            ViewBag.ContactController = _ContactController;
          
            return PartialView();
        }
        #endregion Functions public
    }
}