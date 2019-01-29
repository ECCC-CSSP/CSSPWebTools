using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSSPWebTools.Controllers.Resources;
using CSSPDBDLL.Services;
using CSSPDBDLL.Models;
using System.Web.UI;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Controllers
{
    public class HelpDocController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public HelpDocService _HelpDocService { get; private set; }
        public HelpDocController _HelpDocController { get; private set; }
        #endregion Properties

        #region Constructors
        public HelpDocController()
        {
            _HelpDocController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _HelpDocService = new HelpDocService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _HelpDocViewAndEdit(string DocKey, string Title)
        {
            ViewBag.HelpDocModelEN = null;
            ViewBag.HelpDocModelFR = null;
            ViewBag.Title = Title;
            ViewBag.DocKey = DocKey;

            HelpDocModel helpDocModelEN = _HelpDocService.GetHelpDocModelWithDocKeyAndLanguageDB(DocKey, LanguageEnum.en);
            ViewBag.HelpDocModelEN = helpDocModelEN;

            HelpDocModel helpDocModelFR = _HelpDocService.GetHelpDocModelWithDocKeyAndLanguageDB(DocKey, LanguageEnum.fr);
            ViewBag.HelpDocModelFR = helpDocModelFR;

            return PartialView();
        }
        [HttpPost]
        [ValidateInput(false)]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult HelpDocSaveJSON(string DocKey, string Language, string DocHTMLText)
        {
            HelpDocModel HelpDocModel = _HelpDocService.PostAddOrModifyHelpDocDB(DocKey, Language, DocHTMLText);

            return Json(HelpDocModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public
    }
}