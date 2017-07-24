using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSSPWebTools.Controllers.Resources;
using CSSPWebToolsDBDLL.Services;
using CSSPWebToolsDBDLL.Models;
using System.Web.UI;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Controllers
{
    public class EmailController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public EmailService _EmailService { get; private set; }
        public EmailController _EmailController { get; private set; }
        public TVItemLinkService _TVItemLinkService { get; set; }
        #endregion Properties

        #region Constructors
        public EmailController()
        {
            _EmailController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _EmailService = new EmailService(LanguageRequest, User);
            _TVItemLinkService = new TVItemLinkService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _emailEditList(int ContactTVItemID)
        {
            ContactModel contactModel = _ContactService.GetContactModelWithContactTVItemIDDB(ContactTVItemID);

            ViewBag.ContactModel = contactModel;

            List<TVItemLinkModel> tvItemLinkModelList = _TVItemLinkService.GetTVItemLinkModelListWithFromTVItemIDDB(ContactTVItemID).Where(c => c.ToTVType == TVTypeEnum.Email).ToList();

            List<EmailModel> emailModelList = new List<EmailModel>();

            foreach (TVItemLinkModel tvItemLinkModel in tvItemLinkModelList)
            {
                emailModelList.Add(_EmailService.GetEmailModelWithEmailTVItemIDDB(tvItemLinkModel.ToTVItemID));
            }

            ViewBag.EmailModelList = emailModelList;

            ViewBag.EmailController = _EmailController;
            ViewBag.EmailService = _EmailService;
             
            return PartialView();
        }
         [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailSaveJSON(FormCollection fc)
        {
            EmailModel emailModel = _EmailService.PostAddOrModifyDB(fc);

            return Json(emailModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult EmailDeleteJSON(FormCollection fc)
        {
            EmailModel emailModel = _EmailService.PostDeleteEmailUnderContactTVItemIDDB(fc);

            return Json(emailModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public
    }
}