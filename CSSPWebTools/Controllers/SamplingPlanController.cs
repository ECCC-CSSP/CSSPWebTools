using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Models;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class SamplingPlanController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public SamplingPlanController _SamplingPlanController { get; private set; }
        public AppTaskService _AppTaskService { get; private set; }
        public SamplingPlanService _SamplingPlanService { get; private set; }
        public SamplingPlanSubsectorService _SamplingPlanSubsectorService { get; private set; }
        public SamplingPlanSubsectorSiteService _SamplingPlanSubsectorSiteService { get; private set; }
        public TVFileService _TVFileService { get; private set; }
        public LabSheetService _LabSheetService { get; private set; }
        public BaseEnumService _BaseEnumService { get; private set; }
        #endregion Properties

        #region Constructors
        public SamplingPlanController()
        {
            _SamplingPlanController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _AppTaskService = new AppTaskService(LanguageRequest, User);
            _SamplingPlanService = new SamplingPlanService(LanguageRequest, User);
            _SamplingPlanSubsectorService = new SamplingPlanSubsectorService(LanguageRequest, User);
            _SamplingPlanSubsectorSiteService = new SamplingPlanSubsectorSiteService(LanguageRequest, User);
            _TVFileService = new TVFileService(LanguageRequest, User);
            _LabSheetService = new LabSheetService(LanguageRequest, User);
            _BaseEnumService = new BaseEnumService(LanguageRequest);
        }
        #endregion Overrides

        #region Views/PartialViews
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _SamplingPlanAddOrModify(int ProvinceTVItemID, int SamplingPlanID)
        {
            ViewBag.SamplingPlanController = _SamplingPlanController;
            ViewBag.ProvinceTVItemID = ProvinceTVItemID;
            ViewBag.SamplingPlanID = SamplingPlanID;
            ViewBag.SamplingPlanModel = null;
            ViewBag.SamplingPlanSubsectorModelList = null;
            ViewBag.AdminContactModelList = null;
            ViewBag.ContactModel = null;
            ViewBag.TVItemModelSubsectorList = null;
            ViewBag.SampleTypeEnumTextOrderedList = null;
            ViewBag.SamplingPlanTypeEnumTextOrderedList = null;
            ViewBag.LabSheetTypeEnumTextOrderedList = null;
            ViewBag.SampleTypeEnumTextOrderedFirst = null;
            ViewBag.IsSamplingPlanner = null;

            List<SampleTypeEnumTextOrdered> sampleTypeEnumTextOrderedList = _BaseEnumService.GetSampleTypeEnumTextOrderedList();

            ViewBag.SampleTypeEnumTextOrderedList = sampleTypeEnumTextOrderedList;

            SampleTypeEnumTextOrdered sampleTypeEnumTextOrderedFirst = sampleTypeEnumTextOrderedList.Where(c => c.SampleType == SampleTypeEnum.Routine).FirstOrDefault();

            ViewBag.SampleTypeEnumTextOrderedFirst = sampleTypeEnumTextOrderedFirst;

            List<SamplingPlanTypeEnumTextOrdered> samplingPlanTypeEnumTextOrderedList = _BaseEnumService.GetSamplingPlanTypeEnumTextOrderedList();

            ViewBag.SamplingPlanTypeEnumTextOrderedList = samplingPlanTypeEnumTextOrderedList;

            List<LabSheetTypeEnumTextOrdered> labSheetTypeEnumTextOrderedList = _BaseEnumService.GetLabSheetTypeEnumTextOrderedList();

            ViewBag.LabSheetTypeEnumTextOrderedList = labSheetTypeEnumTextOrderedList;

            ContactModel contactModel = _ContactService.GetContactLoggedInDB();

            ViewBag.ContactModel = contactModel;

            bool IsSamplingPlanner = false;
            if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(ProvinceTVItemID.ToString()))
            {
                IsSamplingPlanner = true;
            }
            else
            {
                List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();

                ViewBag.AdminContactModelList = adminContactModelList;
            }
            ViewBag.IsSamplingPlanner = IsSamplingPlanner;

            if (IsSamplingPlanner)
            {
                ViewBag.ContactModel = contactModel;
                if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(ProvinceTVItemID.ToString()))
                {
                    List<SamplingPlanSubsectorModel> SamplingPlanSubsectorModelList = _SamplingPlanSubsectorService.GetSamplingPlanSubsectorModelListWithSamplingPlanIDDB(SamplingPlanID);
                    ViewBag.SamplingPlanSubsectorModelList = SamplingPlanSubsectorModelList;

                    List<TVItemModel> tvItemModelSubsectorList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(ProvinceTVItemID, TVTypeEnum.Subsector);
                    ViewBag.TVItemModelSubsectorList = tvItemModelSubsectorList;
                }

                if (SamplingPlanID != 0)
                {
                    SamplingPlanModel SamplingPlanModel = _SamplingPlanService.GetSamplingPlanModelWithSamplingPlanIDDB(SamplingPlanID);
                    ViewBag.SamplingPlanModel = SamplingPlanModel;
                }
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _SamplingPlanMWQMSites(int SamplingPlanID, int ProvinceTVItemID, int SubsectorTVItemID)
        {
            ViewBag.SamplingPlanID = SamplingPlanID;
            ViewBag.ProvinceTVItemID = ProvinceTVItemID;
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.SamplingPlanSubsectorSiteModelList = null;
            ViewBag.TVItemModelMWQMSiteList = null;
            ViewBag.AdminContactModelList = null;
            ViewBag.IsSamplingPlanner = null;
            ViewBag.ContactModel = null;

            ContactModel contactModel = _ContactService.GetContactLoggedInDB();

            ViewBag.ContactModel = contactModel;

            bool IsSamplingPlanner = false;
            if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(ProvinceTVItemID.ToString()))
            {
                IsSamplingPlanner = true;
            }
            else
            {
                List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();
                ViewBag.AdminContactModelList = adminContactModelList;
            }
            ViewBag.IsSamplingPlanner = IsSamplingPlanner;

            if (IsSamplingPlanner)
            {
                ViewBag.ContactModel = contactModel;
                if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(ProvinceTVItemID.ToString()))
                {
                    SamplingPlanSubsectorModel SamplingPlanSubsectorModel = _SamplingPlanSubsectorService.GetSamplingPlanSubsectorModelWithSamplingPlanIDAndSubsectorTVItemIDDB(SamplingPlanID, SubsectorTVItemID);
                    if (string.IsNullOrWhiteSpace(SamplingPlanSubsectorModel.Error))
                    {
                        List<SamplingPlanSubsectorSiteModel> SamplingPlanSubsectorSiteModelList = _SamplingPlanSubsectorSiteService.GetSamplingPlanSubsectorSiteModelListWithSamplingPlanSubsectorIDDB(SamplingPlanSubsectorModel.SamplingPlanSubsectorID);
                        ViewBag.SamplingPlanSubsectorSiteModelList = SamplingPlanSubsectorSiteModelList;
                    }

                    List<TVItemModel> tvItemModelMWQMSiteList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(SubsectorTVItemID, TVTypeEnum.MWQMSite);
                    ViewBag.TVItemModelMWQMSiteList = tvItemModelMWQMSiteList;
                }
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _SamplingPlanByProvince(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.AdminContactModelList = null;
            ViewBag.IsShowMap = null;
            ViewBag.IsSamplingPlanner = null;
            ViewBag.SamplingPlanAndFilesLabSheetCountModelList = null;
            ViewBag.AppTaskModelList = null;

            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            SamplingPlanService SamplingPlanService = new SamplingPlanService(_TVItemService.LanguageRequest, _TVItemService.User);
            LabSheetService labSheetService = new LabSheetService(_TVItemService.LanguageRequest, _TVItemService.User);

            ContactModel contactModel = _ContactService.GetContactLoggedInDB();

            bool IsSamplingPlanner = false;
            if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(urlModel.TVItemIDList[0].ToString()))
            {
                IsSamplingPlanner = true;
            }
            else
            {
                List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();

                ViewBag.AdminContactModelList = adminContactModelList;

            }
            ViewBag.IsSamplingPlanner = IsSamplingPlanner;

            List<SamplingPlanAndFilesLabSheetCountModel> SamplingPlanAndFilesLabSheetCountModelList = new List<SamplingPlanAndFilesLabSheetCountModel>();

            if (IsSamplingPlanner)
            {
                if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(urlModel.TVItemIDList[0].ToString()))
                {
                    List<SamplingPlanModel> SamplingPlanModelList = SamplingPlanService.GetSamplingPlanModelListWithProvinceTVItemIDDB(urlModel.TVItemIDList[0]);

                    foreach (SamplingPlanModel SamplingPlanModel in SamplingPlanModelList)
                    {
                        SamplingPlanAndFilesLabSheetCountModel SamplingPlanAndFilesLabSheetCountModel = new SamplingPlanAndFilesLabSheetCountModel()
                        {
                            SamplingPlanModel = SamplingPlanModel,
                        };

                        if (SamplingPlanModel.SamplingPlanFileTVItemID != null)
                        {
                            SamplingPlanAndFilesLabSheetCountModel.TVFileModelSamplingPlanFileTXT = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB((int)SamplingPlanModel.SamplingPlanFileTVItemID);
                        }

                        SamplingPlanAndFilesLabSheetCountModel.LabSheetTransferredCount = labSheetService.GetLabSheetCountWithSamplingPlanIDAndLabSheetStatusDB(SamplingPlanModel.SamplingPlanID, LabSheetStatusEnum.Transferred);
                        SamplingPlanAndFilesLabSheetCountModel.LabSheetHistoryCount = labSheetService.GetLabSheetCountWithSamplingPlanIDDB(SamplingPlanModel.SamplingPlanID);

                        SamplingPlanAndFilesLabSheetCountModelList.Add(SamplingPlanAndFilesLabSheetCountModel);
                    }

                    ViewBag.SamplingPlanAndFilesLabSheetCountModelList = SamplingPlanAndFilesLabSheetCountModelList;
                }

                List<AppTaskModel> appTaskModelList = _AppTaskService.GetAppTaskModelListWithTVItemIDDB(urlModel.TVItemIDList[0]);

                ViewBag.AppTaskModelList = appTaskModelList;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _LabSheetsHistory(int SamplingPlanID)
        {
            ViewBag.SamplingPlanController = _SamplingPlanController;
            ViewBag.AdminContactModelList = null;
            ViewBag.IsSamplingPlanner = false;
            ViewBag.LabSheetModelList = null;
            ViewBag.SamplingPlanID = SamplingPlanID;

            List<LabSheetModel> labSheetModelList = new List<LabSheetModel>();

            SamplingPlanService SamplingPlanService = new SamplingPlanService(_TVItemService.LanguageRequest, _TVItemService.User);
            LabSheetService labSheetService = new LabSheetService(_TVItemService.LanguageRequest, _TVItemService.User);
            MWQMRunService mwqmRunService = new MWQMRunService(_TVItemService.LanguageRequest, _TVItemService.User);

            ContactModel contactModel = _ContactService.GetContactLoggedInDB();

            SamplingPlanModel SamplingPlanModel = SamplingPlanService.GetSamplingPlanModelWithSamplingPlanIDDB(SamplingPlanID);
            if (string.IsNullOrWhiteSpace(SamplingPlanModel.Error))
            {
                ViewBag.IsSamplingPlanner = false;
                if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(SamplingPlanModel.ProvinceTVItemID.ToString()))
                {
                    ViewBag.IsSamplingPlanner = true;
                }
                else
                {
                    List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();
                    ViewBag.AdminContactModelList = adminContactModelList;
                }

                labSheetModelList = labSheetService.GetLabSheetModelListWithSamplingPlanIDDB(SamplingPlanID);
                ViewBag.LabSheetModelList = labSheetModelList;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _LabSheetsHistoryDetail(int SamplingPlanID, int LabSheetID)
        {
            ViewBag.SamplingPlanController = _SamplingPlanController;
            ViewBag.AdminContactModelList = null;
            ViewBag.IsSamplingPlanner = false;
            ViewBag.LabSheetModelAndA1Sheet = null;
            ViewBag.AnalyzeMethod = AnalyzeMethodEnum.Error;
            ViewBag.SampleMatrix = SampleMatrixEnum.Error;
            ViewBag.Laboratory = LaboratoryEnum.Error;

            SamplingPlanService SamplingPlanService = new SamplingPlanService(_TVItemService.LanguageRequest, _TVItemService.User);
            LabSheetService labSheetService = new LabSheetService(_TVItemService.LanguageRequest, _TVItemService.User);
            MWQMRunService mwqmRunService = new MWQMRunService(_TVItemService.LanguageRequest, _TVItemService.User);

            ContactModel contactModel = _ContactService.GetContactLoggedInDB();


            SamplingPlanModel SamplingPlanModel = SamplingPlanService.GetSamplingPlanModelWithSamplingPlanIDDB(SamplingPlanID);
            if (string.IsNullOrWhiteSpace(SamplingPlanModel.Error))
            {
                ViewBag.IsSamplingPlanner = false;
                if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(SamplingPlanModel.ProvinceTVItemID.ToString()))
                {
                    ViewBag.IsSamplingPlanner = true;
                }
                else
                {
                    List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();
                    ViewBag.AdminContactModelList = adminContactModelList;
                }

                LabSheetModel labSheetModel = labSheetService.GetLabSheetModelWithLabSheetIDDB(LabSheetID);
                LabSheetModelAndA1Sheet labSheetModelAndA1Sheet = new LabSheetModelAndA1Sheet();
                labSheetModelAndA1Sheet.LabSheetModel = labSheetModel;
                labSheetModelAndA1Sheet.LabSheetA1Sheet = labSheetService.ParseLabSheetA1WithLabSheetID(labSheetModel.LabSheetID);
                ViewBag.LabSheetModelAndA1Sheet = labSheetModelAndA1Sheet;

                if (labSheetModel.MWQMRunTVItemID != null)
                {
                    MWQMRunModel mwqmRunModel = mwqmRunService.GetMWQMRunModelWithMWQMRunTVItemIDDB((int)labSheetModel.MWQMRunTVItemID);
                    if (string.IsNullOrWhiteSpace(mwqmRunModel.Error))
                    {
                        if (mwqmRunModel.AnalyzeMethod != null)
                        {
                            ViewBag.AnalyzeMethod = (AnalyzeMethodEnum)mwqmRunModel.AnalyzeMethod;
                        }
                        if (mwqmRunModel.SampleMatrix != null)
                        {
                            ViewBag.SampleMatrix = (SampleMatrixEnum)mwqmRunModel.SampleMatrix;
                        }
                        if (mwqmRunModel.Laboratory != null)
                        {
                            ViewBag.Laboratory = (LaboratoryEnum)mwqmRunModel.Laboratory;
                        }
                    }
                }

            }

            return PartialView();
        }


        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _LabSheetsTranferred(int SamplingPlanID)
        {
            ViewBag.SamplingPlanController = _SamplingPlanController;
            ViewBag.AdminContactModelList = null;
            ViewBag.IsSamplingPlanner = false;
            ViewBag.LabSheetModelAndA1SheetList = null;
            ViewBag.LastAnalyzeMethod = AnalyzeMethodEnum.Error;
            ViewBag.LastSampleMatrix = SampleMatrixEnum.Error;
            ViewBag.LastLaboratory = LaboratoryEnum.Error;
            ViewBag.MWQMSampleModelList = new List<MWQMSampleModel>();

            List<LabSheetModelAndA1Sheet> labSheetModelAndA1SheetList = new List<LabSheetModelAndA1Sheet>();

            SamplingPlanService SamplingPlanService = new SamplingPlanService(_TVItemService.LanguageRequest, _TVItemService.User);
            LabSheetService labSheetService = new LabSheetService(_TVItemService.LanguageRequest, _TVItemService.User);
            MWQMRunService mwqmRunService = new MWQMRunService(_TVItemService.LanguageRequest, _TVItemService.User);
            MWQMSampleService mwqmSampleService = new MWQMSampleService(_TVItemService.LanguageRequest, _TVItemService.User);

            ContactModel contactModel = _ContactService.GetContactLoggedInDB();

            SamplingPlanModel SamplingPlanModel = SamplingPlanService.GetSamplingPlanModelWithSamplingPlanIDDB(SamplingPlanID);
            if (string.IsNullOrWhiteSpace(SamplingPlanModel.Error))
            {
                ViewBag.IsSamplingPlanner = false;
                if (contactModel.SamplingPlanner_ProvincesTVItemID.Contains(SamplingPlanModel.ProvinceTVItemID.ToString()))
                {
                    ViewBag.IsSamplingPlanner = true;
                }
                else
                {
                    List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();
                    ViewBag.AdminContactModelList = adminContactModelList;
                }

                List<LabSheetModel> labSheetModelList = labSheetService.GetLabSheetModelListWithSamplingPlanIDAndLabSheetStatusDB(SamplingPlanID, LabSheetStatusEnum.Transferred);
                foreach (LabSheetModel labSheetModel in labSheetModelList)
                {
                    LabSheetModelAndA1Sheet labSheetModelAndA1Sheet = new LabSheetModelAndA1Sheet();
                    labSheetModelAndA1Sheet.LabSheetModel = labSheetModel;
                    labSheetModelAndA1Sheet.LabSheetA1Sheet = labSheetService.ParseLabSheetA1WithLabSheetID(labSheetModel.LabSheetID);
                    labSheetModelAndA1SheetList.Add(labSheetModelAndA1Sheet);
                }
                ViewBag.LabSheetModelAndA1SheetList = labSheetModelAndA1SheetList;

                if (labSheetModelAndA1SheetList.Count > 0)
                {
                    MWQMRunModel mwqmRunModelLast = mwqmRunService.GetMWQMRunModelLastWithSubsectorTVItemIDDB(labSheetModelAndA1SheetList[0].LabSheetModel.SubsectorTVItemID);
                    if (string.IsNullOrWhiteSpace(mwqmRunModelLast.Error))
                    {
                        if (mwqmRunModelLast.AnalyzeMethod != null)
                        {
                            ViewBag.LastAnalyzeMethod = (AnalyzeMethodEnum)mwqmRunModelLast.AnalyzeMethod;
                        }
                        if (mwqmRunModelLast.SampleMatrix != null)
                        {
                            ViewBag.LastSampleMatrix = (SampleMatrixEnum)mwqmRunModelLast.SampleMatrix;
                        }
                        if (mwqmRunModelLast.Laboratory != null)
                        {
                            ViewBag.LastLaboratory = (LaboratoryEnum)mwqmRunModelLast.Laboratory;
                        }
                    }
                }

                int Year = 0;
                int Month = 0;
                int Day = 0;
                if (int.TryParse(labSheetModelAndA1SheetList[0].LabSheetA1Sheet.RunYear, out Year))
                {
                    if (int.TryParse(labSheetModelAndA1SheetList[0].LabSheetA1Sheet.RunMonth, out Month))
                    {
                        if (int.TryParse(labSheetModelAndA1SheetList[0].LabSheetA1Sheet.RunDay, out Day))
                        {
                            MWQMRunModel mwqmRunModelNew = new MWQMRunModel()
                            {
                                SubsectorTVItemID = labSheetModelAndA1SheetList[0].LabSheetA1Sheet.SubsectorTVItemID,
                                DateTime_Local = new DateTime(Year, Month, Day),
                                RunSampleType = labSheetModelAndA1SheetList[0].LabSheetA1Sheet.SampleType,
                                RunNumber = labSheetModelList[0].RunNumber,
                            };

                            MWQMRunModel mwqmRunModel = mwqmRunService.GetMWQMRunModelExistDB(mwqmRunModelNew);
                            if (string.IsNullOrWhiteSpace(mwqmRunModel.Error))
                            {
                                List<MWQMSampleModel> mwqmSampleModelList = mwqmSampleService.GetMWQMSampleModelListWithMWQMRunTVItemIDDB(mwqmRunModel.MWQMRunTVItemID);
                                ViewBag.MWQMSampleModelList = mwqmSampleModelList;
                            }
                        }
                    }
                }

            }

            return PartialView();
        }

        #endregion Functions View/PartialViews 

        #region Functions JSON
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult LabSheetAcceptedJSON(int LabSheetID, int TimeOffsetMinutes, int AnalyzeMethod, int SampleMatrix, int Laboratory)
        {
            LabSheetModel labSheetModel = _LabSheetService.LabSheetAcceptedDB(LabSheetID, TimeOffsetMinutes, AnalyzeMethod, SampleMatrix, Laboratory);

            return Json(labSheetModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult LabSheetRejectJSON(int LabSheetID)
        {
            LabSheetModel labSheetModel = _LabSheetService.LabSheetRejectedDB(LabSheetID);

            return Json(labSheetModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SamplingPlanSaveTopJSON(FormCollection fc)
        {
            SamplingPlanModel SamplingPlanModel = _SamplingPlanService.SamplingPlanSaveTopDB(fc);

            return Json(SamplingPlanModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SamplingPlanSubsectorSaveJSON(FormCollection fc)
        {
            SamplingPlanModel SamplingPlanModel = _SamplingPlanService.SamplingPlanSubsectorSaveDB(fc);

            return Json(SamplingPlanModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SamplingPlanCopyJSON(int SamplingPlanID)
        {
            SamplingPlanModel SamplingPlanModel = _SamplingPlanService.SamplingPlanCopyDB(SamplingPlanID);

            return Json(SamplingPlanModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SamplingPlanDeleteJSON(int SamplingPlanID)
        {
            SamplingPlanModel SamplingPlanModel = _SamplingPlanService.PostDeleteSamplingPlanDB(SamplingPlanID);

            return Json(SamplingPlanModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SamplingPlanDeleteFileJSON(int SamplingPlanID)
        {
            SamplingPlanModel SamplingPlanModel = _SamplingPlanService.SamplingPlanDeleteFileDB(SamplingPlanID);

            return Json(SamplingPlanModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SamplingPlanGenerateSamplingPlanJSON(int SamplingPlanID)
        {
            string ret = _SamplingPlanService.SamplingPlanGenerateSamplingPlanDB(SamplingPlanID);

            return Json(ret, JsonRequestBehavior.AllowGet);
        }


        #endregion Functions JSON

        #region Functions public Non Action
        #endregion Functions public Non Action
    }

}