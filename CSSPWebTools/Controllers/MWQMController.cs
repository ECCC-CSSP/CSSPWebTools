using CSSPWebTools.Controllers.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using CSSPDBDLL.Services;
using CSSPDBDLL.Models;
using CSSPWebTools.Models;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Controllers
{
    public class MWQMController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public AppTaskService _AppTaskService { get; private set; }
        public MWQMSiteService _MWQMSiteService { get; private set; }
        public MWQMRunService _MWQMRunService { get; private set; }
        public MWQMSampleService _MWQMSampleService { get; private set; }
        public MWQMController _MWQMController { get; private set; }
        public MapInfoPointService _MapInfoPointService { get; private set; }
        public MWQMSubsectorService _MWQMSubsectorService { get; private set; }
        public MWQMAnalysisReportParameterService _MWQMAnalysisReportParameterService { get; private set; }
        #endregion Properties

        #region Constructors
        public MWQMController()
        {
            _MWQMController = this;
        }
        #endregion Constructors


        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _AppTaskService = new AppTaskService(LanguageRequest, User);
            _MWQMSiteService = new MWQMSiteService(LanguageRequest, User);
            _MWQMRunService = new MWQMRunService(LanguageRequest, User);
            _MWQMSampleService = new MWQMSampleService(LanguageRequest, User);
            _MapInfoPointService = new MapInfoPointService(LanguageRequest, User);
            _MWQMSubsectorService = new MWQMSubsectorService(LanguageRequest, User);
            _MWQMAnalysisReportParameterService = new MWQMAnalysisReportParameterService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mwqmAnalysisReportParameter(int SubsectorTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.MWQMAnalysisReportParameterModelList = null;
            ViewBag.AppTaskModelList = new List<AppTaskModel>();

            List<MWQMAnalysisReportParameterModel> mwqmAnalysisReportParameterModelList = _MWQMAnalysisReportParameterService.GetMWQMAnalysisReportParameterModelListWithSubsectorTVItemIDDB(SubsectorTVItemID);
            ViewBag.MWQMAnalysisReportParameterModelList = mwqmAnalysisReportParameterModelList;

            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            List<AppTaskModel> appTaskModelList = _AppTaskService.GetAppTaskModelListWithTVItemIDDB(SubsectorTVItemID);
            ViewBag.AppTaskModelList = appTaskModelList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mwqmAnalysisReportParameterListForYear(int TVItemID, int Year)
        {
            ViewBag.TVItemID = TVItemID;
            ViewBag.Year = Year;
            ViewBag.MWQMAnalysisReportParameterModelList = null;

            List<MWQMAnalysisReportParameterModel> mwqmAnalysisReportParameterModelList = _MWQMAnalysisReportParameterService.GetMWQMAnalysisReportParameterModelListWithSubsectorTVItemIDDB(TVItemID).Where(c => c.AnalysisReportYear == Year).ToList();
            ViewBag.MWQMAnalysisReportParameterModelList = mwqmAnalysisReportParameterModelList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mwqmSubsector(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.MWQMController = _MWQMController;
            ViewBag.MWQMSubsectorModel = null;
            ViewBag.MWQMSubsectorLanguageModel = null;

            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.GetMWQMSubsectorModelWithMWQMSubsectorTVItemIDDB(urlModel.TVItemIDList[0]);
            if (string.IsNullOrWhiteSpace(mwqmSubsectorModel.Error))
            {
                ViewBag.MWQMSubsectorModel = mwqmSubsectorModel;

                MWQMSubsectorLanguageModel mwqmSubsectorLanguageModel = _MWQMSubsectorService._MWQMSubsectorLanguageService.GetMWQMSubsectorLanguageModelWithMWQMSubsectorIDAndLanguageDB(mwqmSubsectorModel.MWQMSubsectorID, LanguageRequest);
                if (string.IsNullOrWhiteSpace(mwqmSubsectorLanguageModel.Error))
                {
                    ViewBag.MWQMSubsectorLanguageModel = mwqmSubsectorLanguageModel;
                }
            }

            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }


        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mwqmRunAddOrModify(int MWQMRunTVItemID, int SubsectorTVItemID)
        {
            ViewBag.MWQMController = _MWQMController;
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.SamplingContactTVText = null;
            ViewBag.ValidatorContactTVText = null;
            ViewBag.TVItemModelContactLabValidatorOptionList = null;

            MWQMRunModel mwqmRunModel = _MWQMRunService.GetMWQMRunModelWithMWQMRunTVItemIDDB(MWQMRunTVItemID);
            ViewBag.MWQMRunModel = mwqmRunModel;

            TVItemModel tvItemModelMWQMrun = _TVItemService.GetTVItemModelWithTVItemIDDB(MWQMRunTVItemID);

            if (mwqmRunModel.LabSampleApprovalContactTVItemID > 0)
            {
                TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB((int)mwqmRunModel.LabSampleApprovalContactTVItemID);
                ViewBag.ValidatorContactTVText = tvItemModel.TVText;
            }

            List<MWQMSampleModel> mwqmSampleModelList = _MWQMSampleService.GetMWQMSampleModelListWithMWQMRunTVItemIDDB(MWQMRunTVItemID);
            ViewBag.MWQMSampleModelList = mwqmSampleModelList;

            TVItemModel tvItemModelRoot = _TVItemService.GetRootTVItemModelDB();

            if (string.IsNullOrWhiteSpace(tvItemModelRoot.Error))
            {
                List<TVItemModel> tvItemModelContactLabValidatorOptionList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelRoot.TVItemID, TVTypeEnum.Contact);
                ViewBag.TVItemModelContactLabValidatorOptionList = tvItemModelContactLabValidatorOptionList;
            }

            List<TVItemModel> tvItemModelMWQMSiteList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMWQMrun.ParentID, TVTypeEnum.MWQMSite);

            ViewBag.TVItemModelMWQMSiteList = tvItemModelMWQMSiteList;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MWQMRunDeleteJSON(int MWQMRunTVItemID)
        {
            int count = _MWQMSampleService.GetMWQMSampleModelListWithMWQMRunTVItemIDDB(MWQMRunTVItemID).Count();

            string retStr = "";
            if (count > 0)
            {
                retStr = ControllerRes.AllMWQMSamplesNeedsToBeDeletedBeforeDeletingTheRun;
            }
            else
            {
                MWQMRunModel mwqmRunModel = _MWQMRunService.PostDeleteMWQMRunTVItemIDDB(MWQMRunTVItemID);
                retStr = mwqmRunModel.Error;
            }

            return Json(retStr, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MWQMRunSampleDeleteJSON(int MWQMSampleID)
        {
            MWQMSampleModel mwqmSampleModel = _MWQMSampleService.PostDeleteMWQMSampleDB(MWQMSampleID);

            return Json(mwqmSampleModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MWQMRunAddOrModifyJSON(FormCollection fc)
        {
            MWQMRunModel mwqmRunModel = _MWQMRunService.MWQMRunAddOrModifyDB(fc);

            return Json(mwqmRunModel, JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        //[OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        //public JsonResult MarkAllRoutineSamplesAsUseForOpenDataJSON(int MWQMRunTVItemID)
        //{
        //    MWQMRunModel mwqmRunModel = _MWQMRunService.MarkAllRoutineSamplesAsUseForOpenDataDB(MWQMRunTVItemID);

        //    return Json(mwqmRunModel.Error, JsonRequestBehavior.AllowGet);
        //}

        //[HttpPost]
        //[OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        //public JsonResult MarkAllRoutineSamplesAsNotUseForOpenDataJSON(int MWQMRunTVItemID)
        //{
        //    MWQMRunModel mwqmRunModel = _MWQMRunService.MarkAllRoutineSamplesAsNotUseForOpenDataDB(MWQMRunTVItemID);

        //    return Json(mwqmRunModel.Error, JsonRequestBehavior.AllowGet);
        //}

        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MWQMSubsectorAddOrModifyJSON(FormCollection fc)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.MWQMSubsectorAddOrModifyDB(fc);

            return Json(mwqmSubsectorModel, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MWQMRunSampleAddOrModifyJSON(FormCollection fc)
        {
            MWQMSampleModel mwqmSampleModel = _MWQMSampleService.MWQMSampleAddOrModifyDB(fc);

            return Json(mwqmSampleModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mwqmRun(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.MWQMController = _MWQMController;
            ViewBag.SamplingContactTVText = null;
            ViewBag.ValidatorContactTVText = null;

            MWQMRunModel mwqmRunModel = _MWQMRunService.GetMWQMRunModelWithMWQMRunTVItemIDDB(urlModel.TVItemIDList[0]);
            ViewBag.MWQMRunModel = mwqmRunModel;

            if (mwqmRunModel.LabSampleApprovalContactTVItemID > 0)
            {
                TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB((int)mwqmRunModel.LabSampleApprovalContactTVItemID);
                ViewBag.ValidatorContactTVText = tvItemModel.TVText;
            }

            List<MWQMSampleModel> mwqmSampleModelList = _MWQMSampleService.GetMWQMSampleModelListWithMWQMRunTVItemIDDB(urlModel.TVItemIDList[0]);
            ViewBag.MWQMSampleModelList = mwqmSampleModelList;

            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetMWQMRunTVItemIDWithMWQMSiteTVItemIDAndRunDateJSON(int MWQMSiteTVItemID, int Year, int Month, int Day)
        {
            DateTime RunDate = new DateTime(Year, Month, Day);
            int MWQMRunTVItemID = 0;
            TVItemModel tvItemModelMWQMSite = _TVItemService.GetTVItemModelWithTVItemIDDB(MWQMSiteTVItemID);
            if (string.IsNullOrWhiteSpace(tvItemModelMWQMSite.Error))
            {
                MWQMRunModel mwqmRunModel = _MWQMRunService.GetMWQMRunModelWithSubsectorTVItemIDAndRunDateDB(tvItemModelMWQMSite.ParentID, RunDate).FirstOrDefault();
                if (string.IsNullOrWhiteSpace(tvItemModelMWQMSite.Error))
                {
                    MWQMRunTVItemID = mwqmRunModel.MWQMRunTVItemID;
                }
            }

            return Json(MWQMRunTVItemID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MWQMSiteSaveAllJSON(FormCollection fc)
        {
            MWQMSiteModel mwqmSiteModel = _MWQMSiteService.MWQMSiteSaveAllDB(fc);

            return Json(mwqmSiteModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _mwqmSite(string Q)
        {
            List<string> OptionListTxt = new List<string>() { "10", "15", "20", "25", "30", "35", "40" };

            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            if (!OptionListTxt.Contains(urlModel.VariableShow.Substring(0, 2)))
            {
                urlModel.VariableShow = "30" + urlModel.VariableShow.Substring(2);
            }

            ViewBag.MWQMController = _MWQMController;

            MWQMSiteModel mwqmSiteModel = _MWQMSiteService.GetMWQMSiteModelWithMWQMSiteTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.MWQMSiteModelCurrent = mwqmSiteModel;

            TVItemModel tvItemModelCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelCurrent = tvItemModelCurrent;

            ViewBag.NumberOfSample = int.Parse(GetURLVarShowEnumStr(URLVarShowEnum.NumberOfSampleDecade) + GetURLVarShowEnumStr(URLVarShowEnum.NumberOfSampleUnit));

            ViewBag.IsMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);

            List<MapInfoPointModel> mapInfoPointModelList = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(tvItemModelCurrent.TVItemID, TVTypeEnum.MWQMSite, MapInfoDrawTypeEnum.Point);
            MapInfoPointModel mapInfoPointModel = new MapInfoPointModel();
            if (mapInfoPointModelList.Count > 0)
            {
                mapInfoPointModel = mapInfoPointModelList[0];
            }

            ViewBag.MapInfoPointModel = mapInfoPointModel;
            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _otherMWQMSites(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.MWQMController = _MWQMController;
            ViewBag.TVItemModelOtherList = null;

            TVItemModel tvItemModelCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);
            if (string.IsNullOrWhiteSpace(tvItemModelCurrent.Error))
            {
                ViewBag.TVItemModelCurrent = tvItemModelCurrent;

                List<TVItemModel> tvItemModelOtherList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelCurrent.ParentID, TVTypeEnum.MWQMSite);

                ViewBag.TVItemModelOtherList = tvItemModelOtherList.Where(c => c.TVItemID != tvItemModelCurrent.TVItemID).ToList();
            }

            return PartialView();
        }


        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _mwqmSiteCharts(int MWQMSiteTVItemID)
        {
            return PartialView();
        }

        //[HttpGet]
        //[OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        //public ActionResult _mwqmSubsectorAnalysis(int SubsectorTVItemID)
        //{
        //    ViewBag.SubsectorTVItemID = SubsectorTVItemID;
        //    ViewBag.MWQMSubsectorAnalysisModel = null;

        //    MWQMSubsectorAnalysisModel mwqmSubsectorAnalysisModel = _MWQMSubsectorService.GetMWQMSubsectorAnalysisModel(SubsectorTVItemID);

        //    ViewBag.MWQMSubsectorAnalysisModel = mwqmSubsectorAnalysisModel;

        //    return PartialView();
        //}

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _mwqmSubsectorAnalysis(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.MWQMController = _MWQMController;
            ViewBag.SubsectorTVItemID = urlModel.TVItemIDList[0];
            ViewBag.MWQMSubsectorAnalysisModel = null;

            MWQMSubsectorAnalysisModel mwqmSubsectorAnalysisModel = _MWQMSubsectorService.GetMWQMSubsectorAnalysisModel(urlModel.TVItemIDList[0], false);

            ViewBag.MWQMSubsectorAnalysisModel = mwqmSubsectorAnalysisModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _mwqmSiteTable(int MWQMSiteTVItemID)
        {
            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mwqmSiteAddOrModify(int SubsectorTVItemID, int MWQMSiteTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.MWQMSiteTVItemID = MWQMSiteTVItemID;
            ViewBag.MapInfoPointModel = null;
            ViewBag.TVItemModel = null;

            ViewBag.MWQMController = _MWQMController;

            MWQMSiteModel mwqmSiteModel = _MWQMSiteService.GetMWQMSiteModelWithMWQMSiteTVItemIDDB(MWQMSiteTVItemID);

            ViewBag.MWQMSiteModel = mwqmSiteModel;

            MapInfoPointModel mapInfoPointModel = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(MWQMSiteTVItemID, TVTypeEnum.MWQMSite, MapInfoDrawTypeEnum.Point).FirstOrDefault();

            ViewBag.MapInfoPointModel = mapInfoPointModel;

            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(MWQMSiteTVItemID);

            ViewBag.TVItemModel = tvItemModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MWQMSiteSampleMovingAverageStatJSON(int MWQMSiteTVItemID, int MovingAverage)
        {
            ViewBag.MWQMController = _MWQMController;

            List<MWQMSiteSampleFCModel> mwqmSiteSampleStatModelList = _MWQMSiteService.GetMWQMSiteSamplesWithMovingAverageDB(MWQMSiteTVItemID, MovingAverage, 10);

            return Json(mwqmSiteSampleStatModelList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mwqmSiteSampleMovingAverageStat(int MWQMSiteTVItemID)
        {
            ViewBag.MWQMSiteSampleStatModelList = null;

            List<MWQMSiteSampleFCModel> mwqmSiteSampleStatModelList = _MWQMSiteService.GetMWQMSiteSamplesWithMovingAverageDB(MWQMSiteTVItemID, 30, 5);

            ViewBag.MWQMSiteSampleStatModelList = mwqmSiteSampleStatModelList;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PostAddFormMWQMAnalysisReportParameterJSON(FormCollection fc)
        {
            MWQMAnalysisReportParameterModel mwqmAnalysisReportParameterModel = _MWQMAnalysisReportParameterService.PostAddFormMWQMAnalysisReportParameterDB(fc);

            return Json(mwqmAnalysisReportParameterModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PostDeleteMWQMAnalysisReportParameterJSON(int MWQMAnalysisReportParameterID)
        {
            MWQMAnalysisReportParameterModel mwqmAnalysisReportParameterModel = _MWQMAnalysisReportParameterService.PostDeleteMWQMAnalysisReportParameterDB(MWQMAnalysisReportParameterID);

            return Json(mwqmAnalysisReportParameterModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public

        
    }
}