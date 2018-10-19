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
    public class ProvinceToolsController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public ProvinceToolsController _ProvinceToolsController { get; private set; }
        public ProvinceToolsService _ProvinceToolsService { get; private set; }
        #endregion Properties

        #region Constructors
        public ProvinceToolsController()
        {
            _ProvinceToolsController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _ProvinceToolsService = new ProvinceToolsService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Views/PartialViews
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _ProvinceToolsTopPage(string Q)
        {
            SetArgs(Q);
            ViewBag.ProvinceTVItemID = urlModel.TVItemIDList[0];

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _ClassificationTool(int ProvinceTVItemID)
        {
            ViewBag.ProvinceTVItemID = ProvinceTVItemID;
            ViewBag.TVFileModelClassificationPolygons = null;
            ViewBag.TVFileModelClassificationInputs = null;
            ViewBag.ClassificationPolygonsFileName = null;
            ViewBag.ClassificationInputsFileName = null;

            TVFileModel tvFileModelClassificationPolygons = _ProvinceToolsService.GetTVFileModelClassificationPolygons(ProvinceTVItemID);
            ViewBag.TVFileModelClassificationPolygons = tvFileModelClassificationPolygons;

            TVFileModel TVFileModelClassificationInputs = _ProvinceToolsService.GetTVFileModelClassificationInputs(ProvinceTVItemID);
            ViewBag.TVFileModelClassificationInputs = TVFileModelClassificationInputs;

            string classificationPolygonsFileName = $"ClassificationPolygons_{_ProvinceToolsService.GetInit(ProvinceTVItemID)}.kml"; ;
            ViewBag.ClassificationPolygonsFileName = classificationPolygonsFileName;

            string classificationInputsFileName = $"ClassificationInputs_{_ProvinceToolsService.GetInit(ProvinceTVItemID)}.kml"; ;
            ViewBag.ClassificationInputsFileName = classificationInputsFileName;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _MWQMSitePolSourceSiteGroupingTool(int ProvinceTVItemID)
        {
            ViewBag.ProvinceTVItemID = ProvinceTVItemID;
            ViewBag.TVFileModelMWQMSitesAndPolSourceSites = null;
            ViewBag.TVFileModelGroupingInputs = null;
            ViewBag.MWQMSitesAndPolSourceSitesFileName = null;
            ViewBag.GroupingInputsFileName = null;

            TVFileModel tvFileModelMWQMSitesAndPolSourceSites = _ProvinceToolsService.GetTVFileModelMWQMSitesAndPolSourceSites(ProvinceTVItemID);
            ViewBag.TVFileModelMWQMSitesAndPolSourceSites = tvFileModelMWQMSitesAndPolSourceSites;

            TVFileModel tvFileModelGroupingInputs = _ProvinceToolsService.GetTVFileModelGroupingInputs(ProvinceTVItemID);
            ViewBag.TVFileModelGroupingInputs = tvFileModelGroupingInputs;

            string mwqmSitesAndPolSourceSitesFileName = $"MWQMSitesAndPolSourceSites_{_ProvinceToolsService.GetInit(ProvinceTVItemID)}.kml"; ;
            ViewBag.MWQMSitesAndPolSourceSitesFileName = mwqmSitesAndPolSourceSitesFileName;

            string groupingInputsFileName = $"GroupingInputs_{_ProvinceToolsService.GetInit(ProvinceTVItemID)}.kml"; ;
            ViewBag.GroupingInputsFileName = groupingInputsFileName;

            return PartialView();
        }
        #endregion Functions View/PartialViews 

        #region Functions JSON
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult FillRunPrecipByClimateSitePriorityForYearJSON(int ProvinceTVItemID, int Year)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.FillRunPrecipByClimateSitePriorityForYearDB(ProvinceTVItemID, Year);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult FindMissingPrecipForProvinceJSON(int ProvinceTVItemID)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.FindMissingPrecipForProvinceDB(ProvinceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetAllPrecipitationForYearJSON(int ProvinceTVItemID, int Year)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.GetAllPrecipitationForYearDB(ProvinceTVItemID, Year);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateClassificationForCSSPWebToolsVisualizationJSON(int ProvinceTVItemID)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.GenerateClassificationForCSSPWebToolsVisualizationDB(ProvinceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateKMLFileClassificationForCSSPWebToolsVisualizationJSON(int ProvinceTVItemID)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.GenerateKMLFileClassificationForCSSPWebToolsVisualizationDB(ProvinceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateLinksBetweenMWQMSitesAndPolSourceSitesForCSSPWebToolsVisualizationJSON(int ProvinceTVItemID)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.GenerateLinksBetweenMWQMSitesAndPolSourceSitesForCSSPWebToolsVisualizationDB(ProvinceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ProvinceToolsCreateClassificationInputsKMLJSON(int ProvinceTVItemID)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.ProvinceToolsCreateClassificationInputsKMLDB(ProvinceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ProvinceToolsCreateGroupingInputsKMLJSON(int ProvinceTVItemID)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.ProvinceToolsCreateGroupingInputsKMLDB(ProvinceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ProvinceToolsCreateMWQMSitesAndPolSourceSitesKMLJSON(int ProvinceTVItemID)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.ProvinceToolsCreateMWQMSitesAndPolSourceSitesKMLDB(ProvinceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions JSON

        #region Functions public Non Action
        #endregion Functions public Non Action
    }

}