using CSSPWebTools.Models;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using Newtonsoft.Json;
using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;

namespace CSSPWebTools.Controllers
{
    public class MapController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public MapController _MapController { get; private set; }
        public MapInfoService _MapInfoService { get; private set; }
        #endregion Properties

        #region Constructors
        public MapController()
        {
            _MapController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _MapInfoService = new MapInfoService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mapMarkerClickInfo(string Q, int TVItemID)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemID);

            ViewBag.TVItemModel = tvItemModel;
            ViewBag.MapController = _MapController;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _topCenter()
        {
            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetParentLatLng(int TVItemID)
        {
            CoordModel coordModel = _MapInfoService.GetParentLatLngDB(TVItemID);

            return Json(coordModel, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetMapInfoJSON(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            bool AllSites = (GetURLVarShowEnumStr(URLVarShowEnum.ShowAll) == "1" ? false : true);

            TVItemModel tvItemModelLocationCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            List<TabInfo> Tab1ViewTVItemInfoList = GetTab1ViewTVItemInfoDB(tvItemModelLocationCurrent, tvAuth);

            TVTypeEnum ShowTVType = Tab1ViewTVItemInfoList[int.Parse(Tab1ViewTVItemInfoList[0].Active)].ShowTVType;

            // Year, Month, Day not used
            int NumberOfSamples = int.Parse(GetURLVarShowEnumStr(URLVarShowEnum.NumberOfSampleDecade) + GetURLVarShowEnumStr(URLVarShowEnum.NumberOfSampleUnit));
            List<TVLocation> tvLocationList = _MapInfoService.GetMapInfoDB(urlModel.TVItemIDList[0], ShowTVType, 2000, 1, 1, NumberOfSamples, AllSites);
            return Json(tvLocationList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetMapInfoForSamplingPlanJSON(int SubsectorTVItemID)
        {
            TVTypeEnum ShowTVType = TVTypeEnum.SamplingPlan;

            // Year, Month, Day not used
            List<TVLocation> tvLocationList = _MapInfoService.GetMapInfoDB(SubsectorTVItemID, ShowTVType, 2000, 1, 1, 30, false);
            return Json(tvLocationList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetMapInfoForMWQMRunJSON(int MWQMRunTVItemID)
        {
            TVTypeEnum ShowTVType = TVTypeEnum.MWQMRun;

            // Year, Month, Day not used
            List<TVLocation> tvLocationList = _MapInfoService.GetMapInfoDB(MWQMRunTVItemID, ShowTVType, 2000, 1, 1, 30, false);
            return Json(tvLocationList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult SavePointJSON(int MapInfoID, float Lat, float Lng)
        {
            MapInfoPointModel mapInfoPointModel = _MapInfoService.PostSavePointDB(MapInfoID, Lat, Lng);
            return Json(mapInfoPointModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult SaveMoveLabelPointJSON(int MapInfoID, float Lat, float Lng)
        {
            MapInfoPointModel mapInfoPointModel = _MapInfoService.PostSaveMoveLabelPointDB(MapInfoID, Lat, Lng);
            return Json(mapInfoPointModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult MapDeleteLabelJSON(int MapInfoID, float Lat, float Lng)
        {
            MapInfoPointModel mapInfoPointModel = _MapInfoService.PostMapDeleteLabelDB(MapInfoID, Lat, Lng);
            return Json(mapInfoPointModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult MapMoveLabelAutoJSON(int SubsectorTVItemID, int TVType, bool OnlyActive)
        {
            MapInfoPointModel mapInfoPointModel = _MapInfoService.PostMapMoveLabelAutoDB(SubsectorTVItemID, TVType, OnlyActive);
            return Json(mapInfoPointModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult MapMoveLabelClearJSON(int SubsectorTVItemID, int TVType, bool OnlyActive)
        {
            MapInfoPointModel mapInfoPointModel = _MapInfoService.PostMapMoveLabelClearDB(SubsectorTVItemID, TVType, OnlyActive);
            return Json(mapInfoPointModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult SavePolyJSON(string LatLngListText, int MapInfoID = 0, bool IsPolygon = true)
        {
            MapInfoModel mapInfoModel = _MapInfoService.PostSavePolyDB(LatLngListText, MapInfoID);
            return Json(mapInfoModel, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public

    }
}