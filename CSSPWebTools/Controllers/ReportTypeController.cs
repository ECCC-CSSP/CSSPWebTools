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
using System.Web.Helpers;

namespace CSSPWebTools.Controllers
{
    public class ReportTypeController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public ReportTypeService _ReportTypeService { get; private set; }
        public ReportTypeLanguageService _ReportTypeLanguageService { get; private set; }
        public ReportTypeController _ReportTypeController { get; private set; }
        #endregion Properties

        #region Constructors
        public ReportTypeController()
        {
            _ReportTypeController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _ReportTypeService = new ReportTypeService(LanguageRequest, User);
            _ReportTypeLanguageService = new ReportTypeLanguageService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _reportTypeEdit()
        {
            ViewBag.ReportTypeController = _ReportTypeController;
            ViewBag.ReportTypeModelList = null;

            List<ReportTypeModel> reportTypeModelList = _ReportTypeService.GetReportTypeModelListAllDB();

            ViewBag.ReportTypeModelList = reportTypeModelList;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportTypeAddOrModifyJSON(FormCollection fc)
        {
            ReportTypeModel reportTypeModel = _ReportTypeService.PostAddOrModifyReportTypeDB(fc);

            return Json(reportTypeModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportTypeDeleteJSON(int ReportTypeID)
        {
            ReportTypeModel reportTypeModel = _ReportTypeService.PostDeleteReportTypeWithReportTypeIDDB(ReportTypeID);

            return Json(reportTypeModel, JsonRequestBehavior.AllowGet);
        }


        #endregion Functions public
    }
}
