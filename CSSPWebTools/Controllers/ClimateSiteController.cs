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
    public class ClimateSiteController : BaseController
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
        public ClimateSiteController()
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
        public PartialViewResult _climateSitePriorities(int SubsectorTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.SmallestYearOfSampling = null;
            ViewBag.ClimateSiteYearsOrderList = null;
            ViewBag.SmallestYearOfSampling = null;
            ViewBag.ClimateSiteUseOfSiteModelList = null;
            ViewBag.RunYears = null;
            ViewBag.MWQMSubsectorClimateSites = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            int SmallestYearOfSampling = DateTime.Now.Year;
            ViewBag.SmallestYearOfSampling = SmallestYearOfSampling;
            List<MWQMRunModel> mwqmRunModelList = _MWQMRunService.GetMWQMRunModelListWithSubsectorTVItemIDDB(SubsectorTVItemID);
            if (mwqmRunModelList.Count > 0)
            {
                SmallestYearOfSampling = mwqmRunModelList.OrderBy(c => c.DateTime_Local).FirstOrDefault().DateTime_Local.Year;
                ViewBag.SmallestYearOfSampling = SmallestYearOfSampling;
                int CurrentYear = DateTime.Now.Year;
            }

            List<ClimateSiteUseOfSiteModel> climateSiteUseOfSiteModelList = _MWQMSubsectorService.GetClimateSiteUseOfSiteModelList(SubsectorTVItemID, SmallestYearOfSampling);
            ViewBag.ClimateSiteUseOfSiteModelList = climateSiteUseOfSiteModelList;

            List<int> runYears = _MWQMSubsectorService.GetMWQMSubsectorRunsYears(SubsectorTVItemID);
            ViewBag.RunYears = runYears;

            MWQMSubsectorClimateSites mwqmSubsectorClimateSites = _MWQMSubsectorService.GetMWQMSubsectorClimateSitesDB(SubsectorTVItemID, 1);
            ViewBag.MWQMSubsectorClimateSites = mwqmSubsectorClimateSites;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _runsAndClimateSitePrecipitation(int SubsectorTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.MWQMMRunModelList = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            List<MWQMRunModel> mwqmRunModelList = _MWQMRunService.GetMWQMRunModelListWithSubsectorTVItemIDDB(SubsectorTVItemID).OrderByDescending(c => c.DateTime_Local).ToList();
            ViewBag.MWQMRunModelList = mwqmRunModelList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _subsectorClimateSites(int SubsectorTVItemID, float Radius_km)
        {
            ViewBag.MWQMSubsectorClimateSites = null;
            ViewBag.Radius_km = Radius_km;
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.TVItemModelList = null;
            ViewBag.HasSiteAlreadySelected = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            MWQMSubsectorClimateSites mwqmSubsectorClimateSites = _MWQMSubsectorService.GetMWQMSubsectorClimateSitesDB(SubsectorTVItemID, Radius_km*1000);
            ViewBag.MWQMSubsectorClimateSites = mwqmSubsectorClimateSites;

            bool hasSiteAlreadySelected = mwqmSubsectorClimateSites.ClimateSiteModelUsedAndWithinDistanceModelList.Where(c => c.YearsOfUseText != "").Any();
            ViewBag.HasSiteAlreadySelected = hasSiteAlreadySelected;

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
        public PartialViewResult _climateSiteTopPage(int SubsectorTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _selectedRunPrecipitation(int SubsectorTVItemID, int MWQMRunTVItemID)
        {
            ViewBag.ClimateSitesAndRainsList = null;
            ViewBag.MWQMRunModel = null;
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.MWQMRunTVItemID = MWQMRunTVItemID;
            ViewBag.UseOfSiteModelList = null;
            ViewBag.ATL_PYR = "";
            ViewBag.MWQMSubsectorClimateSites = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            MWQMRunModel mwqmRunModel = _MWQMSubsectorService._MWQMRunService.GetMWQMRunModelWithMWQMRunTVItemIDDB(MWQMRunTVItemID);
            ViewBag.MWQMRunModel = mwqmRunModel;

            List<ClimateSitesAndRains> climateSiteAndRainsList = _MWQMSubsectorService.GetMWQMSubsectorClimateSitesAndValuesForAParicularRunsDB(SubsectorTVItemID, MWQMRunTVItemID);
            ViewBag.ClimateSitesAndRainsList = climateSiteAndRainsList;

            List<UseOfSiteModel> useOfSiteModelList = _UseOfSiteService.GetUseOfSiteModelListWithTVTypeAndSubsectorTVItemIDDB(TVTypeEnum.ClimateSite, SubsectorTVItemID);
            ViewBag.UseOfSiteModelList = useOfSiteModelList;

            if (useOfSiteModelList.Count > 0)
            {
                List<MapInfoPointModel> mapInfoPointModelList = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(useOfSiteModelList[0].SiteTVItemID, TVTypeEnum.ClimateSite, MapInfoDrawTypeEnum.Point);
                if (mapInfoPointModelList.Count > 0)
                {
                    if (mapInfoPointModelList[0].Lng < -100)
                    {
                        ViewBag.ATL_PYR = "PYR";
                    }
                    else
                    {
                        ViewBag.ATL_PYR = "ATL";
                    }
                }
            }

            MWQMSubsectorClimateSites mwqmSubsectorClimateSites = _MWQMSubsectorService.GetMWQMSubsectorClimateSitesDB(SubsectorTVItemID, 1);
            ViewBag.MWQMSubsectorClimateSites = mwqmSubsectorClimateSites;

            return PartialView();
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ClimateSitesToUseForSubsectorVerifyAndSaveJSON(FormCollection fc)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.ClimateSitesToUseForSubsectorVerifyAndSaveDB(fc);

            return Json(mwqmSubsectorModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ClimateSitePrioritiesSaveJSON(FormCollection fc)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.ClimateSitePrioritiesSaveDB(fc);

            return Json(mwqmSubsectorModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ClimateSiteGetDataForRunsOfYearJSON(int SubsectorTVItemID, int Year)
        {
            AppTaskModel appTaskModel = _MWQMSubsectorService.ClimateSiteGetDataForRunsOfYearDB(SubsectorTVItemID, Year);

            return Json(appTaskModel, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ClimateSiteLoadCoCoRaHSDataJSON()
        {
            AppTaskModel appTaskModel = _MWQMSubsectorService.ClimateSiteLoadCoCoRaHSDataDB();

            return Json(appTaskModel, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ClimateSiteSetDataToUseByAverageOrPriorityJSON(int SubsectorTVItemID, int Year, string AverageOrPriority)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.ClimateSiteSetDataToUseByAverageOrPriorityDB(SubsectorTVItemID, Year, AverageOrPriority);

            return Json(mwqmSubsectorModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckPercentCompletedJSON(int AppTaskID)
        {
            int PercentCompleted = _MWQMSubsectorService.CheckPercentCompletedDB(AppTaskID);

            return Json(PercentCompleted, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ClimateSitePrecipitationEnteredSaveJSON(FormCollection fc)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.ClimateSitePrecipitationEnteredSaveDB(fc);

            return Json(mwqmSubsectorModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ClimateSitesUseSameAsSelectedSubsectorJSON(int SubsectorTVItemID, int UseSubsectorTVItemID)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.ClimateSitesUseSameAsSelectedSubsectorDB(SubsectorTVItemID, UseSubsectorTVItemID);

            return Json(mwqmSubsectorModel.Error, JsonRequestBehavior.AllowGet);
        }
        
        #endregion Functions (public)
    }

}