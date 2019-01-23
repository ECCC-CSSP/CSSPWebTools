using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
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
    public class HydrometricSiteController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public MWQMSubsectorService _MWQMSubsectorService { get; private set; }
        public MWQMRunService _MWQMRunService { get; private set; }
        public UseOfSiteService _UseOfSiteService { get; private set; }
        public MapInfoService _MapInfoService { get; private set; }
        #endregion Properties

        #region Constructors
        public HydrometricSiteController()
        {

        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _MWQMSubsectorService = new MWQMSubsectorService(LanguageRequest, User);
            _MWQMRunService = new MWQMRunService(LanguageRequest, User);
            _UseOfSiteService = new UseOfSiteService(LanguageRequest, User);
            _MapInfoService = new MapInfoService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions (public)
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _subsectorHydrometricSites(int SubsectorTVItemID, float Radius_km)
        {
            ViewBag.MWQMSubsectorHydrometricSites = null;
            ViewBag.Radius_km = Radius_km;
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.TVItemModelList = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            MWQMSubsectorHydrometricSites mwqmSubsectorHydrometricSites = _MWQMSubsectorService.GetMWQMSubsectorHydrometricSitesDB(SubsectorTVItemID, Radius_km * 1000);
            ViewBag.MWQMSubsectorHydrometricSites = mwqmSubsectorHydrometricSites;

            List<TVItemModel> tvItemModelList = _MWQMSubsectorService.GetAdjacentSubsectors(SubsectorTVItemID, 2);
            ViewBag.TVItemModelList = tvItemModelList;
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _dialogToShowExOfYearsToEnter()
        {
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _HydrometricSiteTopPage(int SubsectorTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult HydrometricSitesToUseForSubsectorVerifyAndSaveJSON(FormCollection fc)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.HydrometricSitesToUseForSubsectorVerifyAndSaveDB(fc);

            return Json(mwqmSubsectorModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult HydrometricSiteGetDataForRunsOfYearJSON(int SubsectorTVItemID, int Year)
        {
            AppTaskModel appTaskModel = _MWQMSubsectorService.HydrometricSiteGetDataForRunsOfYearDB(SubsectorTVItemID, Year);

            return Json(appTaskModel, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckPercentCompletedJSON(int AppTaskID)
        {
            int PercentCompleted = _MWQMSubsectorService.CheckPercentCompletedDB(AppTaskID);

            return Json(PercentCompleted, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions (public)
    }

}