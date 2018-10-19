using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Models;
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
    public class EmailDistributionListController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public EmailDistributionListController _EmailDistributionListController { get; private set; }
        public EmailDistributionListService _EmailDistributionListService { get; private set; }
        public EmailDistributionListContactService _EmailDistributionListContactService { get; private set; }
        #endregion Properties

        #region Constructors
        public EmailDistributionListController()
        {
            _EmailDistributionListController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _EmailDistributionListService = new EmailDistributionListService(LanguageRequest, User);
            _EmailDistributionListContactService = new EmailDistributionListContactService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Views/PartialViews
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _emailDistributionList(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.CountryTVItemID = urlModel.TVItemIDList[0];
            ViewBag.EmailDistributionListController = _EmailDistributionListController;
            ViewBag.EmailDistributionListModelList = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);


            List<EmailDistributionListModel> emailDistributionListModelList = _EmailDistributionListService.GetEmailDistributionListModelWithCountryTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.EmailDistributionListModelList = emailDistributionListModelList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _emailDistributionListContact(int EmailDistributionListID)
        {
            ViewBag.EmailDistributionListID = EmailDistributionListID;
            ViewBag.EmailDistributionListContactModelList = null;

            List<EmailDistributionListContactModel> emailDistributionListContactModelList = _EmailDistributionListContactService.GetEmailDistributionListContactModelListWithEmailDistributionListIDDB(EmailDistributionListID);

            ViewBag.EmailDistributionListContactModelList = emailDistributionListContactModelList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _emailDistributionListAddOrModify(int CountryTVItemID, int EmailDistributionListID)
        {
            ViewBag.CountryTVItemID = CountryTVItemID;
            ViewBag.EmailDistributionListModel = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            EmailDistributionListModel emailDistributionListModel = _EmailDistributionListService.GetEmailDistributionListModelWithEmailDistributionListIDDB(EmailDistributionListID);

            ViewBag.EmailDistributionListModel = emailDistributionListModel;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _emailDistributionListContactAddOrModify(int EmailDistributionListID, int EmailDistributionListContactID)
        {
            ViewBag.EmailDistributionListID = EmailDistributionListID;
            ViewBag.EmailDistributionListContactModel = null;

            EmailDistributionListContactModel emailDistributionListContactModel = _EmailDistributionListContactService.GetEmailDistributionListContactModelWithEmailDistributionListContactIDDB(EmailDistributionListContactID);

            ViewBag.EmailDistributionListContactModel = emailDistributionListContactModel;

            return PartialView();
        }

        #endregion Functions View/PartialViews 

        #region Functions JSON
        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailDistributionListContactSaveJSON(FormCollection fc)
        {
            EmailDistributionListContactModel emailDistributionListContactModel = _EmailDistributionListContactService.PostEmailDistributionListContactSaveDB(fc);

            return Json(emailDistributionListContactModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailDistributionListSaveJSON(FormCollection fc)
        {
            EmailDistributionListModel emailDistributionListModel = _EmailDistributionListService.PostEmailDistributionListSaveDB(fc);

            return Json(emailDistributionListModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailDistributionListDeleteJSON(int EmailDistributionListID)
        {
            EmailDistributionListModel emailDistributionListModel = _EmailDistributionListService.PostDeleteEmailDistributionListDB(EmailDistributionListID);

            return Json(emailDistributionListModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailDistributionListContactDeleteJSON(int EmailDistributionListContactID)
        {
            EmailDistributionListContactModel emailDistributionListContactModel = _EmailDistributionListContactService.PostDeleteEmailDistributionListContactDB(EmailDistributionListContactID);

            return Json(emailDistributionListContactModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailDistributionListGenerateExcelFileJSON(int CountryTVItemID)
        {
            AppTaskModel appTaskModel = _EmailDistributionListService.EmailDistributionListGenerateExcelFileDB(CountryTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailDistributionListMoveDownJSON(int CountryTVItemID, int EmailDistributionListID)
        {
            EmailDistributionListModel emailDistributionListModel = _EmailDistributionListService.PostEmailDistributionListMoveDownDB(CountryTVItemID, EmailDistributionListID);

            return Json(emailDistributionListModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailDistributionListMoveUpJSON(int CountryTVItemID, int EmailDistributionListID)
        {
            EmailDistributionListModel emailDistributionListModel = _EmailDistributionListService.PostEmailDistributionListMoveUpDB(CountryTVItemID, EmailDistributionListID);

            return Json(emailDistributionListModel.Error, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions JSON

        #region Functions public Non Action
        #endregion Functions public Non Action
    }
}