using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
using CSSPWebTools.Controllers;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Models;
using CSSPDBDLL.Models;
using CSSPDBDLL.Services;
using CSSPDBDLL.Services.Resources;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class MikeScenarioController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public MikeScenarioService _MikeScenarioService { get; private set; }
        public MikeScenarioResultService _MikeScenarioResultService { get; private set; }
        public MikeScenarioController _MikeScenarioController { get; private set; }
        public TVFileService _TVFileService { get; private set; }
        public HydrometricSiteService _HydrometricSiteService { get; private set; }
        public HydrometricDataValueService _HydrometricDataValueService { get; private set; }
        public MapInfoService _MapInfoService { get; private set; }
        public MWQMRunService _MWQMRunService { get; private set; }
        public AppTaskService _AppTaskService { get; private set; }

        #endregion Properties

        #region Constructors
        public MikeScenarioController()
        {
            _MikeScenarioController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _MikeScenarioService = new MikeScenarioService(LanguageRequest, User);
            _MikeScenarioResultService = new MikeScenarioResultService(LanguageRequest, User);
            _TVFileService = new TVFileService(LanguageRequest, User);
            _HydrometricSiteService = new HydrometricSiteService(LanguageRequest, User);
            _HydrometricDataValueService = new HydrometricDataValueService(LanguageRequest, User);
            _MapInfoService = new MapInfoService(LanguageRequest, User);
            _MWQMRunService = new MWQMRunService(LanguageRequest, User);
            _AppTaskService = new AppTaskService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult AcceptWebTideJSON(int MikeScenarioTVItemID)
        {
            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.PostAcceptWebTideDB(MikeScenarioTVItemID);
            return Json(mikeScenarioModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckIfScenarioNameAlreadyExistJSON(int MunicipalityTVItemID, string MikeScenarioName)
        {
            string Status = _MikeScenarioService.CheckIfMikeScenarioNameIsUniqueDB(MunicipalityTVItemID, MikeScenarioName.Trim());

            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CheckIfSourceNameAlreadyExistJSON(int MikeScenarioTVItemID, string SourceName)
        {
            string Status = _MikeScenarioService._MikeSourceService.CheckIfSourceNameIsUniqueDB(MikeScenarioTVItemID, SourceName.Trim());

            return Json(Status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult DeleteMeshNodeJSON(int MapInfoPointID)
        {
            MapInfoPointModel mapInfoPointModel = _MikeScenarioService._MapInfoService._MapInfoPointService.PostDeleteMapInfoPointDB(MapInfoPointID);

            return Json(mapInfoPointModel.Error, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateWebTideJSON(int MikeScenarioTVItemID, int BCMeshTVItemID, int WebTideNodeNumb)
        {
            AppTaskModel appTaskModel = _MikeScenarioService._TideSiteService.GenerateWebTideDB(MikeScenarioTVItemID, BCMeshTVItemID, WebTideNodeNumb);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenario(string Q)
        {
            ViewBag.URLModel = null;
            ViewBag.TVItemModelLocationCurrent = null;
            ViewBag.TVAuth = null;
            ViewBag.Tab1ViewTVItemInfoList = null;
            ViewBag.MikeScenarioModel = null;
            ViewBag.AppTaskModelMikeScenario = null;
            ViewBag.TVFileNotLoadedList = null;
            ViewBag.MikeBoundaryConditionModelListMesh = null;
            ViewBag.MikeBoundaryConditionModelListWebTide = null;
            ViewBag.DataPathOfTideList = null;

            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            // getting current
            TVItemModel tvItemModelLocationCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelLocationCurrent = tvItemModelLocationCurrent;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            List<TabInfo> tab1ViewTVItemInfoList = GetTab1ViewTVItemInfoDB(tvItemModelLocationCurrent, tvAuth);

            ViewBag.Tab1ViewTVItemInfoList = tab1ViewTVItemInfoList;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.MikeScenarioModel = mikeScenarioModel;

            if (!string.IsNullOrWhiteSpace(mikeScenarioModel.Error))
                return PartialView();

            if (mikeScenarioModel.ScenarioStatus == ScenarioStatusEnum.Copying)
            {
                List<AppTaskCommandEnum> AppTaskNameList = new List<AppTaskCommandEnum>()
                {
                    AppTaskCommandEnum.MikeScenarioImport,
                    AppTaskCommandEnum.SetupWebTide,
                    AppTaskCommandEnum.MikeScenarioOtherFileImport,
                    AppTaskCommandEnum.GenerateWebTide,
                };

                foreach (AppTaskCommandEnum appTaskCommand in AppTaskNameList)
                {
                    AppTaskModel appTaskModelMikeScenario = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(urlModel.TVItemIDList[0], urlModel.TVItemIDList[0], appTaskCommand);
                    ViewBag.AppTaskModelMikeScenario = appTaskModelMikeScenario;

                    if (string.IsNullOrWhiteSpace(appTaskModelMikeScenario.Error))
                        return PartialView();
                }

                List<TVFileModel> tvFileNotLoadedList = _MikeScenarioService._TVFileService.GetTVFileNotLoaded(urlModel.TVItemIDList[0]);
                ViewBag.TVFileNotLoadedList = tvFileNotLoadedList;

                if (tvFileNotLoadedList.Count == 1)
                {
                    if (!string.IsNullOrEmpty(tvFileNotLoadedList[0].Error))
                        return PartialView();
                }

                List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = _MikeScenarioService._MikeBoundaryConditionService.GetMikeBoundaryConditionModelListWithMikeScenarioTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.MikeBoundaryConditionMesh);

                foreach (MikeBoundaryConditionModel mikeBoundaryConditionModel in mikeBoundaryConditionModelListMesh)
                {
                    List<MapInfoPointModel> mapInfoPointModelList = _MikeScenarioService._MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(mikeBoundaryConditionModel.MikeBoundaryConditionTVItemID, TVTypeEnum.MikeBoundaryConditionMesh, MapInfoDrawTypeEnum.Polyline);

                    foreach (MapInfoPointModel mapInfoPointModel in mapInfoPointModelList)
                    {
                        mikeBoundaryConditionModel.MapInfoPointModelList.Add(mapInfoPointModel);
                    }
                }

                ViewBag.MikeBoundaryConditionModelListMesh = mikeBoundaryConditionModelListMesh;


                List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWebTide = _MikeScenarioService._MikeBoundaryConditionService.GetMikeBoundaryConditionModelListWithMikeScenarioTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.MikeBoundaryConditionWebTide);

                foreach (MikeBoundaryConditionModel mikeBoundaryConditionModel in mikeBoundaryConditionModelListWebTide)
                {
                    List<MapInfoPointModel> mapInfoPointModelList = _MikeScenarioService._MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(mikeBoundaryConditionModel.MikeBoundaryConditionTVItemID, TVTypeEnum.MikeBoundaryConditionWebTide, MapInfoDrawTypeEnum.Polyline);

                    foreach (MapInfoPointModel mapInfoPointModel in mapInfoPointModelList)
                    {
                        mikeBoundaryConditionModel.MapInfoPointModelList.Add(mapInfoPointModel);
                    }
                }
                ViewBag.MikeBoundaryConditionModelListWebTide = mikeBoundaryConditionModelListWebTide;

                List<DataPathOfTide> dataPathOfTideList = _MikeScenarioService._TideSiteService.GetTideDataPathsDB();

                ViewBag.DataPathOfTideList = dataPathOfTideList;

            }
            else if (mikeScenarioModel.ScenarioStatus == ScenarioStatusEnum.AskToRun)
            {
                List<AppTaskCommandEnum> AppTaskNameList = new List<AppTaskCommandEnum>()
                {
                    AppTaskCommandEnum.MikeScenarioAskToRun,
                    AppTaskCommandEnum.MikeScenarioWaitingToRun,
                    AppTaskCommandEnum.MikeScenarioRunning,
                };

                foreach (AppTaskCommandEnum appTaskCommand in AppTaskNameList)
                {
                    AppTaskModel appTaskModelMikeScenario = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(urlModel.TVItemIDList[0], urlModel.TVItemIDList[0], appTaskCommand);
                    ViewBag.AppTaskModelMikeScenario = appTaskModelMikeScenario;

                    if (string.IsNullOrEmpty(appTaskModelMikeScenario.Error))
                        return PartialView();
                }
            }
            else if (mikeScenarioModel.ScenarioStatus == ScenarioStatusEnum.Running)
            {
                List<AppTaskCommandEnum> AppTaskNameList = new List<AppTaskCommandEnum>()
                {
                    AppTaskCommandEnum.MikeScenarioRunning
                };

                foreach (AppTaskCommandEnum appTaskCommand in AppTaskNameList)
                {
                    AppTaskModel appTaskModelMikeScenario = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(urlModel.TVItemIDList[0], urlModel.TVItemIDList[0], appTaskCommand);
                    ViewBag.AppTaskModelMikeScenario = appTaskModelMikeScenario;

                    if (string.IsNullOrEmpty(appTaskModelMikeScenario.Error))
                        return PartialView();
                }
            }
            else if (mikeScenarioModel.ScenarioStatus == ScenarioStatusEnum.Completed)
            {
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioAdd(int TVItemID)
        {
            ViewBag.TVItemID = TVItemID;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioCreateWebTideDataWLFromStartToEndDateJSON(int MikeScenarioTVItemID)
        {
            AppTaskModel appTaskModel = _MikeScenarioService.PostMikeScenarioCreateWebTideDataWLFromStartToEndDateDB(MikeScenarioTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioAskToRunJSON(int MikeScenarioTVItemID)
        {
            AppTaskModel appTaskModel = _MikeScenarioService.PostMikeScenarioAskToRunDB(MikeScenarioTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioCancelAndResetJSON(int MikeScenarioTVItemID)
        {
            TVItemModel tvItemModel = _MikeScenarioService.PostMikeScenarioCancelAndResetDB(MikeScenarioTVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioCopyJSON(int MikeScenarioTVItemID)
        {
            TVItemModel tvItemModel = _MikeScenarioService.PostMikeScenarioCopyDB(MikeScenarioTVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioDeleteJSON(int MikeScenarioTVItemID)
        {
            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.PostDeleteMikeScenarioAndAllAssociationsWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);
            if (!string.IsNullOrWhiteSpace(mikeScenarioModel.Error))
                return Json(mikeScenarioModel.Error, JsonRequestBehavior.AllowGet);

            return Json(mikeScenarioModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioGeneralParameterSaveJSON(FormCollection fc)
        {
            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.PostMikeScenarioGeneralParametersSaveDB(fc);

            return Json(mikeScenarioModel.Error, JsonRequestBehavior.AllowGet);
        }

        [NonAction]
        public AppTaskModel MikeScenarioImportDB(int TVItemID, string UploadClientPath, HttpRequestBase Request)
        {
            ContactOK contactOK = _MikeScenarioService.IsContactOK();
            if (!string.IsNullOrWhiteSpace(contactOK.Error))
                return ReturnAppTaskError(contactOK.Error);

            if (TVItemID == 0)
                return ReturnAppTaskError(string.Format(ControllerRes._IsRequired, ServiceRes.TVItemID));

            if (string.IsNullOrEmpty(UploadClientPath))
                return ReturnAppTaskError(string.Format(ControllerRes._IsRequired, ServiceRes.UploadClientPath));

            if (Request == null)
                return ReturnAppTaskError(string.Format(ControllerRes._IsRequired, ServiceRes.Request));

            //-------------------------------------------------------------------------------
            MikeScenarioModel mikeScenarioModelRet = new MikeScenarioModel();
            TVItemModel tvItemNewMikeScenario = new TVItemModel();

            using (TransactionScope ts = new TransactionScope())
            {
                string FileName = "";

                if (Request.Files.Count != 1)
                    return ReturnAppTaskError(string.Format(ServiceRes.CanOnlyLoadOneFileOfType_, ".m21fm , .m3fm"));

                HttpPostedFileBase hpf = null;
                foreach (string file in Request.Files)
                {
                    hpf = Request.Files[file];
                }

                if (hpf == null)
                    return ReturnAppTaskError(string.Format(ServiceRes.PleaseSelectFileOfType_ToUpload, ".m21fm , .m3fm"));

                if (hpf.FileName.Contains(@"\"))
                {
                    FileName = UploadClientPath + @"\" + hpf.FileName.Substring(hpf.FileName.LastIndexOf(@"\") + 1);
                }
                else
                {
                    FileName = UploadClientPath + @"\" + hpf.FileName;
                }

                bool HasDoubleBackSlash = FileName.Contains(@"\\");
                while (HasDoubleBackSlash)
                {
                    FileName = FileName.Replace(@"\\", @"\");

                    if (!FileName.Contains(@"\\"))
                    {
                        HasDoubleBackSlash = false;
                    }
                }

                List<string> FileNameList = new List<string>();

                string FilePath = FileName.Substring(0, FileName.LastIndexOf("\\") + 1);
                string ShortFileName = FileName.Substring(FileName.LastIndexOf("\\") + 1);
                FileInfo fi = new FileInfo(FileName);

                if (fi.Extension == ".m21fm" || fi.Extension == ".m3fm")
                {
                    // proper file extention
                }
                else
                {
                    return ReturnAppTaskError(string.Format(ServiceRes.PleaseSelectFileOfType_ToUpload, ".m21fm , .m3fm"));
                }

                string SubDir = "";

                string TVText = (ShortFileName.Substring(0, ShortFileName.LastIndexOf("."))).Trim();

                if (_MikeScenarioService._TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(TVItemID, TVTypeEnum.MikeScenario).Where(c => c.TVText == TVText).Any())
                    return ReturnAppTaskError(string.Format(ServiceRes._AlreadyExists, ServiceRes.AppTask));

                tvItemNewMikeScenario = _MikeScenarioService._TVItemService.PostAddChildTVItemDB(TVItemID, TVText, TVTypeEnum.MikeScenario);
                if (!string.IsNullOrWhiteSpace(tvItemNewMikeScenario.Error))
                    return ReturnAppTaskError(tvItemNewMikeScenario.Error);

                int pos = FilePath.LastIndexOf(@"\", FilePath.Length - 2);
                pos = FilePath.LastIndexOf(@"\", pos - 1);
                SubDir = FilePath.Substring(pos);

                string ServerFilePath = _MikeScenarioService._TVFileService.GetServerFilePath(tvItemNewMikeScenario.TVItemID);
                int FileLength = hpf.ContentLength;

                // _______________________________________
                // Creating a new MikeScenario
                // _______________________________________
                MikeScenarioModel mikeScenarioModelNew = new MikeScenarioModel();
                mikeScenarioModelNew.MikeScenarioTVItemID = tvItemNewMikeScenario.TVItemID;
                mikeScenarioModelNew.ScenarioStatus = ScenarioStatusEnum.Copying;
                mikeScenarioModelNew.MikeScenarioStartDateTime_Local = DateTime.Now;
                mikeScenarioModelNew.MikeScenarioEndDateTime_Local = DateTime.Now.AddHours(2);
                mikeScenarioModelNew.MikeScenarioTVText = TVText;
                mikeScenarioModelNew.WindSpeed_km_h = 0.0D;
                mikeScenarioModelNew.WindDirection_deg = 0.0D;
                mikeScenarioModelNew.DecayFactor_per_day = 4.6821D;
                mikeScenarioModelNew.DecayIsConstant = true;
                mikeScenarioModelNew.DecayFactorAmplitude = 4.68D;
                mikeScenarioModelNew.ResultFrequency_min = 60;
                mikeScenarioModelNew.AmbientTemperature_C = 10D;
                mikeScenarioModelNew.AmbientSalinity_PSU = 32D;
                mikeScenarioModelNew.ManningNumber = 25;

                mikeScenarioModelRet = _MikeScenarioService.PostAddMikeScenarioDB(mikeScenarioModelNew);
                if (!string.IsNullOrWhiteSpace(mikeScenarioModelRet.Error))
                    return ReturnAppTaskError(mikeScenarioModelRet.Error);

                string m21fmServerFileName = ServerFilePath + ShortFileName;

                AppTaskModel appTaskModel = new AppTaskModel();
                appTaskModel.TVItemID = mikeScenarioModelNew.MikeScenarioTVItemID;

                if (UploadClientPath.Last().ToString() != @"\")
                {
                    UploadClientPath += @"\";
                }

                TVItemModel tvItemModelTVFile = _MikeScenarioService._TVItemService.PostAddChildTVItemDB(tvItemNewMikeScenario.TVItemID, ShortFileName, TVTypeEnum.File);
                if (!string.IsNullOrWhiteSpace(tvItemModelTVFile.Error))
                {
                    return ReturnAppTaskError(tvItemModelTVFile.Error);
                }

                TVFileModel tvFileModelNew = new TVFileModel()
                {
                    TVFileTVItemID = tvItemModelTVFile.TVItemID,
                    FilePurpose = FilePurposeEnum.MikeInput,
                    Language = LanguageRequest,
                    Year = DateTime.Now.Year,
                    FileDescription = "m21fm file uploaded", // nothing for now
                    FileType = _MikeScenarioService._TVFileService.GetFileType(fi.Extension),
                    FileSize_kb = (int)(hpf.ContentLength / 1024),
                    FileInfo = ServiceRes.MikeScenarioFile,
                    FileCreatedDate_UTC = DateTime.Now,
                    ClientFilePath = UploadClientPath,
                    ServerFileName = ShortFileName,
                    ServerFilePath = ServerFilePath.Replace(@"C:\", @"E:\"),
                };

                TVFileModel tvFileModelRet = _MikeScenarioService._TVFileService.PostAddTVFileDB(tvFileModelNew);
                if (!string.IsNullOrWhiteSpace(tvFileModelRet.Error))
                    return ReturnAppTaskError(tvFileModelRet.Error);

                DirectoryInfo di = new DirectoryInfo(ServerFilePath);
                if (!di.Exists)
                {
                    di.Create();
                }

                hpf.SaveAs(ServerFilePath + ShortFileName);

                FileInfo fiServer = new FileInfo(ServerFilePath + ShortFileName);

                if (!fiServer.Exists)
                    return ReturnAppTaskError(string.Format(ServiceRes.CouldNotFind_, fiServer.FullName));

                AppTaskModel appTaskModelExist = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(mikeScenarioModelNew.MikeScenarioTVItemID, mikeScenarioModelNew.MikeScenarioTVItemID, AppTaskCommandEnum.MikeScenarioImport);
                if (string.IsNullOrWhiteSpace(appTaskModelExist.Error))
                    return ReturnAppTaskError(string.Format(ServiceRes.TaskOf_AlreadyRunning, ServiceRes.MikeScenarioImport));

                ts.Complete();
            }

            // ----------------------------------------------------------------------------
            List<AppTaskParameter> appTaskParameterList = new List<AppTaskParameter>();
            appTaskParameterList.Add(new AppTaskParameter() { Name = "TVItemID", Value = TVItemID.ToString() });
            appTaskParameterList.Add(new AppTaskParameter() { Name = "UploadClientPath", Value = UploadClientPath });

            StringBuilder sbParameters = new StringBuilder();
            int count = 0;
            foreach (AppTaskParameter atp in appTaskParameterList)
            {
                if (count == 0)
                {
                    sbParameters.Append("|||");
                }
                sbParameters.Append(atp.Name + "," + atp.Value + "|||");
                count += 1;
            }

            AppTaskModel appTaskModelNew = new AppTaskModel()
            {
                TVItemID = mikeScenarioModelRet.MikeScenarioTVItemID,
                TVItemID2 = mikeScenarioModelRet.MikeScenarioTVItemID,
                AppTaskCommand = AppTaskCommandEnum.MikeScenarioImport,
                ErrorText = "",
                StatusText = ServiceRes.ImportingNewMIKEScenario,
                AppTaskStatus = AppTaskStatusEnum.Created,
                PercentCompleted = 1,
                Parameters = sbParameters.ToString(),
                Language = LanguageRequest,
                StartDateTime_UTC = DateTime.UtcNow,
                EndDateTime_UTC = null,
                EstimatedLength_second = null,
                RemainingTime_second = null,
            };

            AppTaskModel appTaskModelExist2 = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(appTaskModelNew.TVItemID, appTaskModelNew.TVItemID, appTaskModelNew.AppTaskCommand);
            if (string.IsNullOrWhiteSpace(appTaskModelExist2.Error))
            {
                return new AppTaskModel() { Error = string.Format(ServiceRes._AlreadyExists, ServiceRes.AppTask) };
            }

            AppTaskModel appTaskModelRet = _MikeScenarioService._AppTaskService.PostAddAppTask(appTaskModelNew);
            if (!string.IsNullOrWhiteSpace(appTaskModelRet.Error))
            {
                return new AppTaskModel() { Error = appTaskModelRet.Error };
            }

            return appTaskModelRet;

        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public void _mikeScenarioImport(int TVItemID, string UploadClientPath)
        {
            AppTaskModel appTaskModel = MikeScenarioImportDB(TVItemID, UploadClientPath, Request);

            return;
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioBoundaryConditions(int MikeScenarioTVItemID)
        {
            ViewBag.MikeScenarioModel = null;
            ViewBag.DataPathOfTideList = null;
            ViewBag.MikeBoundaryConditionModelListMesh = null;
            ViewBag.MikeBoundaryConditionModelListWebTide = null;
            ViewBag.AppTaskModelSetupWebTide = null;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);

            ViewBag.MikeScenarioModel = mikeScenarioModel;

            List<DataPathOfTide> dataPathOfTideList = _MikeScenarioService._TideSiteService.GetTideDataPathsDB();

            ViewBag.DataPathOfTideList = dataPathOfTideList;

            List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = _MikeScenarioService._MikeBoundaryConditionService.GetMikeBoundaryConditionModelListWithMikeScenarioTVItemIDAndTVTypeDB(MikeScenarioTVItemID, TVTypeEnum.MikeBoundaryConditionMesh);

            ViewBag.MikeBoundaryConditionModelListMesh = mikeBoundaryConditionModelListMesh;

            List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWebTide = _MikeScenarioService._MikeBoundaryConditionService.GetMikeBoundaryConditionModelListWithMikeScenarioTVItemIDAndTVTypeDB(MikeScenarioTVItemID, TVTypeEnum.MikeBoundaryConditionWebTide);

            ViewBag.MikeBoundaryConditionModelListWebTide = mikeBoundaryConditionModelListWebTide;

            AppTaskModel appTaskModelSetupWebTide = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(MikeScenarioTVItemID, MikeScenarioTVItemID, AppTaskCommandEnum.SetupWebTide);

            ViewBag.AppTaskModelSetupWebTide = appTaskModelSetupWebTide;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioGeneralParameters(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.MikeScenarioModel = null;
            ViewBag.MikeBoundaryConditionModelWL = null;
            ViewBag.UseSalinityAndTemperatureInitialConditionFromFileName = "";
            ViewBag.MWQMRunTVText = "";
            ViewBag.IsSectorMikeScenario = false;
            ViewBag.HasDecouplingFiles = false;
            ViewBag.HasMikeScenarioResults = false;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);
            ViewBag.MikeScenarioModel = mikeScenarioModel;

            if (mikeScenarioModel != null)
            {
                MikeScenarioResultModel mikeScenarioResultModel = _MikeScenarioResultService.GetMikeScenarioResultModelWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);

                if (mikeScenarioResultModel != null)
                {
                    ViewBag.HasMikeScenarioResults = true;
                }

                TVItemModel tvItemModelMikeScenario = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);
                if (string.IsNullOrWhiteSpace(tvItemModelMikeScenario.Error))
                {
                    List<TVItemModel> tvItemModelParents = _TVItemService.GetParentsTVItemModelList(tvItemModelMikeScenario.TVPath);

                    if (tvItemModelParents.Count > 0)
                    {
                        if (tvItemModelParents[tvItemModelParents.Count - 2].TVType == TVTypeEnum.Sector)
                        {
                            ViewBag.IsSectorMikeScenario = true;

                            List<TVFileModel> tvFileModelList = _TVFileService.GetTVFileModelListWithParentTVItemIDDB(urlModel.TVItemIDList[0]);
                            ViewBag.HasDecouplingFiles = tvFileModelList.Where(c => c.ServerFileName.EndsWith("_Decoupled.m21fm") || c.ServerFileName.EndsWith("_Decoupled.m3fm")).Any();

                            if (mikeScenarioModel.UseSalinityAndTemperatureInitialConditionFromTVFileTVItemID != null && mikeScenarioModel.UseSalinityAndTemperatureInitialConditionFromTVFileTVItemID > 0)
                            {
                                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB((int)mikeScenarioModel.UseSalinityAndTemperatureInitialConditionFromTVFileTVItemID);
                                if (string.IsNullOrWhiteSpace(tvFileModel.Error))
                                {
                                    ViewBag.UseSalinityAndTemperatureInitialConditionFromFileName = tvFileModel.ServerFileName;
                                }
                            }

                            if (mikeScenarioModel.ForSimulatingMWQMRunTVItemID != null && mikeScenarioModel.ForSimulatingMWQMRunTVItemID > 0)
                            {
                                TVItemModel tvItemModelMWQMRun = _TVItemService.GetTVItemModelWithTVItemIDDB((int)mikeScenarioModel.ForSimulatingMWQMRunTVItemID);
                                if (string.IsNullOrWhiteSpace(tvItemModelMWQMRun.Error))
                                {
                                    TVItemModel tvItemModelSubsector = _TVItemService.GetTVItemModelWithTVItemIDDB((int)tvItemModelMWQMRun.ParentID);
                                    if (string.IsNullOrWhiteSpace(tvItemModelSubsector.Error))
                                    {
                                        string TVTextSS = tvItemModelSubsector.TVText;
                                        if (TVTextSS.Contains(" "))
                                        {
                                            TVTextSS = TVTextSS.Substring(0, TVTextSS.IndexOf(" "));
                                        }

                                        ViewBag.MWQMRunTVText = TVTextSS + " --- " + tvItemModelMWQMRun.TVText;
                                    }
                                }
                            }
                        }
                        else
                        {
                            ViewBag.IsSectorMikeScenario = false;
                        }
                    }

                }


            }

            List<MikeBoundaryConditionModel> mikeBoundaryConditionModelList = _MikeScenarioService._MikeBoundaryConditionService.GetMikeBoundaryConditionModelListWithMikeScenarioTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.MikeBoundaryConditionWebTide);

            if (mikeBoundaryConditionModelList.Count > 0)
            {
                MikeBoundaryConditionModel mikeBoundaryConditionModelWL = mikeBoundaryConditionModelList.Where(c => c.MikeBoundaryConditionLevelOrVelocity == MikeBoundaryConditionLevelOrVelocityEnum.Level).FirstOrDefault();
                ViewBag.MikeBoundaryConditionModelWL = mikeBoundaryConditionModelWL;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioGeneralParametersEdit(int MikeScenarioTVItemID)
        {
            ViewBag.MikeScenarioModel = null;
            ViewBag.TVFileModelList = new List<TVFileModel>();
            ViewBag.TVItemModelMWQMRunList = new List<TVItemModel>();
            ViewBag.IsSectorMikeScenario = false;
            ViewBag.HasDecouplingFiles = false;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);
            ViewBag.MikeScenarioModel = mikeScenarioModel;
            if (mikeScenarioModel != null)
            {
                TVItemModel tvItemModelMikeScenario = _TVItemService.GetTVItemModelWithTVItemIDDB(MikeScenarioTVItemID);
                if (string.IsNullOrWhiteSpace(tvItemModelMikeScenario.Error))
                {
                    List<TVItemModel> tvItemModelParents = _TVItemService.GetParentsTVItemModelList(tvItemModelMikeScenario.TVPath);

                    if (tvItemModelParents.Count > 0)
                    {
                        if (tvItemModelParents[tvItemModelParents.Count - 2].TVType == TVTypeEnum.Sector)
                        {
                            ViewBag.IsSectorMikeScenario = true;

                            List<TVFileModel> tvFileModelList = _TVFileService.GetTVFileModelListWithParentTVItemIDDB(MikeScenarioTVItemID);
                            ViewBag.TVFileModelList = tvFileModelList.Where(c => c.FileType == FileTypeEnum.DFSU && c.FilePurpose == FilePurposeEnum.MikeResultDFSU).OrderBy(c => c.ServerFileName).ToList();
                            ViewBag.HasDecouplingFiles = tvFileModelList.Where(c => c.ServerFileName.EndsWith("_Decoupled.m21fm") || c.ServerFileName.EndsWith("_Decoupled.m3fm")).Any();

                            List<TVItemModel> tvItemModelSubsectorList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelParents[tvItemModelParents.Count - 2].TVItemID, TVTypeEnum.Subsector);

                            List<TVItemModel> TVItemModelMWQMRunList = new List<TVItemModel>();
                            foreach (TVItemModel tvItemModelSubsector in tvItemModelSubsectorList)
                            {
                                List<TVItemModel> tvItemModelMWQMRunList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelSubsector.TVItemID, TVTypeEnum.MWQMRun);

                                foreach (TVItemModel tvItemModelMWQMRun in tvItemModelMWQMRunList)
                                {
                                    if (tvItemModelSubsector.TVText.Contains(" "))
                                    {
                                        tvItemModelMWQMRun.TVText = tvItemModelSubsector.TVText.Substring(0, tvItemModelSubsector.TVText.IndexOf(" ")) + " --- " + tvItemModelMWQMRun.TVText;
                                    }
                                    else
                                    {
                                        tvItemModelMWQMRun.TVText = tvItemModelSubsector.TVText + " --- " + tvItemModelMWQMRun.TVText;
                                    }
                                    TVItemModelMWQMRunList.Add(tvItemModelMWQMRun);
                                }
                            }
                            ViewBag.TVItemModelMWQMRunList = TVItemModelMWQMRunList.OrderByDescending(c => c.TVText).ToList();
                        }
                        else
                        {
                            ViewBag.IsSectorMikeScenario = false;
                        }
                    }

                }


            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioInputSummary(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.InputSummary = null;
            ViewBag.MikeScenarioModel = null;
            ViewBag.MikeSourceModelList = null;
            ViewBag.IsUnderSubsector = false;
            ViewBag.SubsectorTVItemID = 0;
            ViewBag.SectorTVItemID = 0;

            InputSummary inputSummary = _MikeScenarioService.GetMikeScenarioInputSummaryDB(urlModel.TVItemIDList[0]);

            ViewBag.InputSummary = inputSummary;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.MikeScenarioModel = mikeScenarioModel;

            List<MikeSourceModel> mikeSourceModelList = _MikeScenarioService._MikeSourceService.GetMikeSourceModelListWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);

            foreach (MikeSourceModel mikeSourceModel in mikeSourceModelList)
            {
                mikeSourceModel.MikeSourceStartEndModelList = _MikeScenarioService._MikeSourceService._MikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceIDDB(mikeSourceModel.MikeSourceID);
            }

            ViewBag.MikeSourceModelList = mikeSourceModelList;

            TVItemModel tvItemModelSource = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);
            if (string.IsNullOrWhiteSpace(tvItemModelSource.Error))
            {
                List<TVItemModel> tvItemModelParentList = _TVItemService.GetParentsTVItemModelList(tvItemModelSource.TVPath);

                foreach (TVItemModel tvItemModelParent in tvItemModelParentList)
                {
                    if (tvItemModelParent.TVType == TVTypeEnum.Subsector)
                    {
                        ViewBag.IsUnderSubsector = true;
                        ViewBag.SubsectorTVItemID = tvItemModelParent.TVItemID;
                    }

                    if (tvItemModelParent.TVType == TVTypeEnum.Sector)
                    {
                        ViewBag.SectorTVItemID = tvItemModelParent.TVItemID;
                    }
                }
            }

            return PartialView();
        }

        [NonAction]
        public AppTaskModel MikeScenarioOtherFileImportDB(int MikeScenarioTVItemID, int TVFileTVItemID, string ClientFullPath, string ServerFullPath, HttpRequestBase Request)
        {
            ContactOK contactOK = _MikeScenarioService.IsContactOK();
            if (!string.IsNullOrWhiteSpace(contactOK.Error))
                return ReturnAppTaskError(contactOK.Error);

            if (MikeScenarioTVItemID == 0)
                return ReturnAppTaskError(string.Format(ServiceRes._IsRequired, ServiceRes.MikeScenarioTVItemID));

            if (TVFileTVItemID == 0)
                return ReturnAppTaskError(string.Format(ServiceRes._IsRequired, ServiceRes.TVFileID));

            if (string.IsNullOrEmpty(ClientFullPath))
                return ReturnAppTaskError(string.Format(ServiceRes._IsRequired, ServiceRes.ClientFullPath));

            if (string.IsNullOrEmpty(ServerFullPath))
                return ReturnAppTaskError(string.Format(ServiceRes._IsRequired, ServiceRes.ServerFullPath));

            if (Request == null)
                return ReturnAppTaskError(string.Format(ServiceRes._IsRequired, ServiceRes.Request));

            AppTaskModel appTaskModelExist = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(MikeScenarioTVItemID, MikeScenarioTVItemID, AppTaskCommandEnum.MikeScenarioImport);
            if (string.IsNullOrWhiteSpace(appTaskModelExist.Error))
                return ReturnAppTaskError(string.Format(ServiceRes.TaskOf_AlreadyRunning, ServiceRes.MikeScenarioImport));

            FileInfo fiClient = new FileInfo(ClientFullPath);
            FileInfo fiServer = new FileInfo(ServerFullPath);

            using (TransactionScope ts = new TransactionScope())
            {
                if (Request.Files.Count != 1)
                    return ReturnAppTaskError(ServiceRes.CanOnlyLoadOneFile);

                HttpPostedFileBase hpf = null;
                foreach (string file in Request.Files)
                {
                    hpf = Request.Files[file];
                }

                if (hpf == null || string.IsNullOrEmpty(hpf.FileName))
                    return ReturnAppTaskError(ServiceRes.PleaseSelectFileToUpload);

                if (hpf.FileName != fiServer.Name)
                    return ReturnAppTaskError(string.Format(ServiceRes.PleaseLoadFile_, fiServer.Name) + string.Format(ServiceRes.TryingToLoad_, hpf.FileName));

                MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);
                if (!string.IsNullOrWhiteSpace(mikeScenarioModel.Error))
                    return ReturnAppTaskError(mikeScenarioModel.Error);

                TVFileModel tvFileModel = _MikeScenarioService._TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                if (!string.IsNullOrWhiteSpace(tvFileModel.Error))
                    return ReturnAppTaskError(tvFileModel.Error);

                if ((tvFileModel.ServerFilePath + tvFileModel.ServerFileName) != ServerFullPath)
                    return ReturnAppTaskError(string.Format(ServiceRes.ServerFullPath_NotEqualto_, ServerFullPath, tvFileModel.ServerFilePath + tvFileModel.ServerFileName));

                // ready to save the file uploaded
                string ServerFilePath = _MikeScenarioService._TVFileService.GetServerFilePath(mikeScenarioModel.MikeScenarioTVItemID);

                DirectoryInfo di = new DirectoryInfo(ServerFilePath);

                if (!di.Exists)
                {
                    di.Create();
                }

                hpf.SaveAs(ServerFilePath + tvFileModel.ServerFileName);

                FileInfo fi = new FileInfo(ServerFilePath + tvFileModel.ServerFileName);

                if (!fi.Exists)
                    return ReturnAppTaskError(string.Format(ServiceRes.CouldNotSaveFile_, ServerFilePath + tvFileModel.ServerFileName));

                tvFileModel.FileSize_kb = (int)(fi.Length / 1024);
                if (tvFileModel.FileSize_kb == 0)
                {
                    tvFileModel.FileSize_kb = 1;
                }

                TVFileModel tvFileModelRet = _MikeScenarioService._TVFileService.PostUpdateTVFileDB(tvFileModel);
                if (!string.IsNullOrWhiteSpace(tvFileModelRet.Error))
                    return ReturnAppTaskError(tvFileModelRet.Error);

                ts.Complete();
            }

            // ----------------------------------------------------------------------------
            List<AppTaskParameter> appTaskParameterList = new List<AppTaskParameter>();
            appTaskParameterList.Add(new AppTaskParameter() { Name = "MikeScenarioTVItemID", Value = MikeScenarioTVItemID.ToString() });
            appTaskParameterList.Add(new AppTaskParameter() { Name = "TVFileTVItemID", Value = TVFileTVItemID.ToString() });

            StringBuilder sbParameters = new StringBuilder();
            int count = 0;
            foreach (AppTaskParameter atp in appTaskParameterList)
            {
                if (count == 0)
                {
                    sbParameters.Append("|||");
                }
                sbParameters.Append(atp.Name + "," + atp.Value + "|||");
                count += 1;
            }

            AppTaskModel appTaskModelNew = new AppTaskModel()
            {
                TVItemID = MikeScenarioTVItemID,
                TVItemID2 = MikeScenarioTVItemID,
                AppTaskCommand = AppTaskCommandEnum.MikeScenarioOtherFileImport,
                ErrorText = "",
                StatusText = ServiceRes.ImportingOtherFiles,
                AppTaskStatus = AppTaskStatusEnum.Created,
                PercentCompleted = 1,
                Parameters = sbParameters.ToString(),
                Language = LanguageRequest,
                StartDateTime_UTC = DateTime.UtcNow,
                EndDateTime_UTC = null,
                EstimatedLength_second = null,
                RemainingTime_second = null,
            };

            AppTaskModel appTaskModelExist2 = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(appTaskModelNew.TVItemID, appTaskModelNew.TVItemID, appTaskModelNew.AppTaskCommand);
            if (string.IsNullOrWhiteSpace(appTaskModelExist2.Error))
                return ReturnAppTaskError(string.Format(ServiceRes._AlreadyExists, ServiceRes.AppTask));

            AppTaskModel appTaskModelRet = _MikeScenarioService._AppTaskService.PostAddAppTask(appTaskModelNew);
            if (!string.IsNullOrWhiteSpace(appTaskModelRet.Error))
                return ReturnAppTaskError(appTaskModelRet.Error);

            return appTaskModelRet;
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public void _mikeScenarioOtherFileImport(int MikeScenarioTVItemID, int TVFileTVItemID, string ClientFullPath, string ServerFullPath)
        {
            AppTaskModel appTaskModel = MikeScenarioOtherFileImportDB(MikeScenarioTVItemID, TVFileTVItemID, ClientFullPath, ServerFullPath, Request);

            return;
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public void _mikeScenarioOtherFileNotImport(int TVFileTVItemID)
        {
            TVFileModel tvFileModel = _MikeScenarioService.PostMikeScenarioOtherFileNotImportDB(TVFileTVItemID);

            return;
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioSources(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.MikeScenarioModel = null;
            ViewBag.MikeSourceModelList = null;
            ViewBag.IsUnderSubsector = false;
            ViewBag.SubsectorTVItemID = 0;
            ViewBag.SectorTVItemID = 0;
            ViewBag.HydrometricSiteModelList = null;

            int TVItemIDSector = 0;

            bool IsUnderSubsector = false;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);
            ViewBag.MikeScenarioModel = mikeScenarioModel;

            List<MikeSourceModel> mikeSourceModelList = _MikeScenarioService._MikeSourceService.GetMikeSourceModelAndMikeSourceStartEndModelListWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);
            ViewBag.MikeSourceModelList = mikeSourceModelList;

            TVItemModel tvItemModelSource = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);
            if (string.IsNullOrWhiteSpace(tvItemModelSource.Error))
            {
                List<TVItemModel> tvItemModelParentList = _TVItemService.GetParentsTVItemModelList(tvItemModelSource.TVPath);

                foreach (TVItemModel tvItemModelParent in tvItemModelParentList)
                {
                    if (tvItemModelParent.TVType == TVTypeEnum.Subsector)
                    {
                        ViewBag.IsUnderSubsector = true;
                        IsUnderSubsector = true;
                        ViewBag.SubsectorTVItemID = tvItemModelParent.TVItemID;
                    }

                    if (tvItemModelParent.TVType == TVTypeEnum.Sector)
                    {
                        ViewBag.SectorTVItemID = tvItemModelParent.TVItemID;
                        TVItemIDSector = tvItemModelParent.TVItemID;
                    }
                }
            }

            if (IsUnderSubsector)
            {
                ViewBag.TVItemHydrometricList = new List<TVItemModel>();
            }
            else
            {
                List<HydrometricSiteModel> hydrometriSiteModelList = _HydrometricSiteService.GetHydrometricSiteModelListWithSectorTVItemIDAndSiteType(TVItemIDSector, SiteTypeEnum.Hydrometric);
                ViewBag.HydrometricSiteModelList = hydrometriSiteModelList;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioSourceHydrometricData(int MikeScenarioTVItemID, int MikeSourceTVItemID)
        {
            ViewBag.HydrometricDataValueModelList = null;
            ViewBag.HydrometricDataValueModelSourceCalculatedList = null;
            ViewBag.HydrometricSiteModel = null;
            ViewBag.MWQMRunModel = null;
            ViewBag.MikeSourceModel = null;
            ViewBag.MikeScenarioModel = null;
            ViewBag.AppTaskModel = null;

            MikeSourceModel mikeSourceModel = _MikeScenarioService._MikeSourceService.GetMikeSourceModelWithMikeSourceTVItemIDDB(MikeSourceTVItemID);
            if (!string.IsNullOrWhiteSpace(mikeSourceModel.Error))
            {
                return PartialView();
            }

            ViewBag.MikeSourceModel = mikeSourceModel;

            if (!mikeSourceModel.UseHydrometric)
            {
                return PartialView();
            }

            if (mikeSourceModel.HydrometricTVItemID == null)
            {
                return PartialView();
            }

            if (mikeSourceModel.HydrometricTVItemID == 0)
            {
                return PartialView();
            }

            HydrometricSiteModel hydrometricSiteModel = _HydrometricSiteService.GetHydrometricSiteModelWithHydrometricSiteTVItemIDDB((int)mikeSourceModel.HydrometricTVItemID);
            if (!string.IsNullOrWhiteSpace(hydrometricSiteModel.Error))
            {
                return PartialView();
            }

            ViewBag.HydrometricSiteModel = hydrometricSiteModel;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);
            if (!string.IsNullOrWhiteSpace(mikeScenarioModel.Error))
            {
                return PartialView();
            }

            ViewBag.MikeScenarioModel = mikeScenarioModel;

            if (mikeScenarioModel.ForSimulatingMWQMRunTVItemID == null)
            {
                return PartialView();
            }

            if (mikeScenarioModel.ForSimulatingMWQMRunTVItemID == 0)
            {
                return PartialView();
            }

            MWQMRunModel mwqmRunModel = _MWQMRunService.GetMWQMRunModelWithMWQMRunTVItemIDDB((int)mikeScenarioModel.ForSimulatingMWQMRunTVItemID);
            if (!string.IsNullOrWhiteSpace(mwqmRunModel.Error))
            {
                return PartialView();
            }

            ViewBag.MWQMRunModel = mwqmRunModel;

            List<HydrometricDataValueModel> hydrometricDataValueModelList = _HydrometricDataValueService.GetHydrometricDataValueModelListWithHydrometricSiteIDAroundRunDateDB(hydrometricSiteModel.HydrometricSiteID, mwqmRunModel.DateTime_Local);

            ViewBag.HydrometricDataValueModelList = hydrometricDataValueModelList;

            List<HydrometricDataValueModel> hydrometricDataValueModelSourceCalculatedList = new List<HydrometricDataValueModel>();
            foreach (HydrometricDataValueModel hydrometricDataValueModel in hydrometricDataValueModelList)
            {
                HydrometricDataValueModel hydrometricDataValueModelAdd = new HydrometricDataValueModel()
                {
                    HydrometricDataValueID = hydrometricDataValueModel.HydrometricDataValueID,
                    DateTime_Local = hydrometricDataValueModel.DateTime_Local,
                    Discharge_m3_s = hydrometricDataValueModel.Discharge_m3_s * mikeSourceModel.Factor,
                };

                hydrometricDataValueModelSourceCalculatedList.Add(hydrometricDataValueModelAdd);
            }

            ViewBag.HydrometricDataValueModelSourceCalculatedList = hydrometricDataValueModelSourceCalculatedList;

            AppTaskModel appTaskModel = _AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(MikeSourceTVItemID, MikeSourceTVItemID, AppTaskCommandEnum.LoadHydrometricDataValue);

            if (string.IsNullOrWhiteSpace(appTaskModel.Error))
            {
                ViewBag.AppTaskModel = appTaskModel;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioSourceAdd(int MikeScenarioTVItemID)
        {
            ViewBag.MikeScenarioTVItemID = MikeScenarioTVItemID;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioSourceEdit(int MikeSourceTVItemID)
        {
            ViewBag.MikeScenarioModel = null;
            ViewBag.MikeSourceModel = null;
            ViewBag.IsUnderSubsector = false;
            ViewBag.SubsectorTVItemID = 0;
            ViewBag.SectorTVItemID = 0;
            ViewBag.HydrometricSiteModelList = null;

            MikeSourceModel mikeSourceModel = _MikeScenarioService._MikeSourceService.GetMikeSourceModelWithMikeSourceTVItemIDDB(MikeSourceTVItemID);
            ViewBag.MikeSourceModel = mikeSourceModel;

            if (string.IsNullOrWhiteSpace(mikeSourceModel.Error))
            {
                mikeSourceModel.MikeSourceStartEndModelList = _MikeScenarioService._MikeSourceService._MikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(MikeSourceTVItemID);

                TVItemModel tvItemModelMikeSource = _TVItemService.GetTVItemModelWithTVItemIDDB(mikeSourceModel.MikeSourceTVItemID);
                if (string.IsNullOrWhiteSpace(tvItemModelMikeSource.Error))
                {
                    MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelMikeSource.ParentID);
                    ViewBag.MikeScenarioModel = mikeScenarioModel;
                }
            }

            int TVItemIDSector = 0;

            bool IsUnderSubsector = false;

            TVItemModel tvItemModelSource = _TVItemService.GetTVItemModelWithTVItemIDDB(MikeSourceTVItemID);
            if (string.IsNullOrWhiteSpace(tvItemModelSource.Error))
            {
                List<TVItemModel> tvItemModelParentList = _TVItemService.GetParentsTVItemModelList(tvItemModelSource.TVPath);

                foreach (TVItemModel tvItemModelParent in tvItemModelParentList)
                {
                    if (tvItemModelParent.TVType == TVTypeEnum.Subsector)
                    {
                        ViewBag.IsUnderSubsector = true;
                        IsUnderSubsector = true;
                        ViewBag.SubsectorTVItemID = tvItemModelParent.TVItemID;
                    }

                    if (tvItemModelParent.TVType == TVTypeEnum.Sector)
                    {
                        ViewBag.SectorTVItemID = tvItemModelParent.TVItemID;
                        TVItemIDSector = tvItemModelParent.TVItemID;
                    }
                }
            }

            if (IsUnderSubsector)
            {
                ViewBag.TVItemHydrometricList = new List<TVItemModel>();
            }
            else
            {
                List<HydrometricSiteModel> hydrometriSiteModelList = _HydrometricSiteService.GetHydrometricSiteModelListWithSectorTVItemIDAndSiteType(TVItemIDSector, SiteTypeEnum.Hydrometric);
                ViewBag.HydrometricSiteModelList = hydrometriSiteModelList;
            }

            return PartialView();
        }

        //[HttpGet]
        //[OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        //public PartialViewResult _mikeScenarioSourceStartEndEditContinuous(int MikeSourceTVItemID)
        //{
        //    ViewBag.MikeSourceTVItemID = MikeSourceTVItemID;
        //    ViewBag.MikeSourceStartEndModelList = _MikeScenarioService._MikeSourceService._MikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(MikeSourceTVItemID);

        //    return PartialView();
        //}

        //[HttpGet]
        //[OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        //public PartialViewResult _mikeScenarioSourceStartEndEditNotContinuous(int MikeSourceTVItemID)
        //{
        //    ViewBag.MikeSourceTVItemID = MikeSourceTVItemID;
        //    ViewBag.MikeSourceStartEndModelList = _MikeScenarioService._MikeSourceService._MikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(MikeSourceTVItemID);

        //    return PartialView();
        //}

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioSourceInfo(int MikeSourceTVItemID)
        {
            ViewBag.MikeSourceModel = null;
            ViewBag.MikeSourceTVItemID = MikeSourceTVItemID;
            ViewBag.MikeSourceStartEndModelList = null;

            MikeSourceModel mikeSourceModel = _MikeScenarioService._MikeSourceService.GetMikeSourceModelWithMikeSourceTVItemIDDB(MikeSourceTVItemID);

            ViewBag.MikeSourceModel = mikeSourceModel;

            if (string.IsNullOrWhiteSpace(mikeSourceModel.Error))
            {
                mikeSourceModel.MikeSourceStartEndModelList = _MikeScenarioService._MikeSourceService._MikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(MikeSourceTVItemID);
            }

            List<MikeSourceStartEndModel> mikeSourceStartEndModelList = _MikeScenarioService._MikeSourceService._MikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(MikeSourceTVItemID);

            ViewBag.MikeSourceStartEndModelList = mikeSourceStartEndModelList;

            return PartialView();
        }

        //[HttpGet]
        //[OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        //public PartialViewResult _mikeScenarioSourceStartEndInfoContinuous(int MikeSourceTVItemID)
        //{
        //    ViewBag.MikeSourceTVItemID = MikeSourceTVItemID;
        //    ViewBag.MikeSourceStartEndModelList = _MikeScenarioService._MikeSourceService._MikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(MikeSourceTVItemID);

        //    return PartialView();
        //}

        //[HttpGet]
        //[OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        //public PartialViewResult _mikeScenarioSourceStartEndInfoNotContinuous(int MikeSourceTVItemID)
        //{
        //    ViewBag.MikeSourceTVItemID = MikeSourceTVItemID;
        //    ViewBag.MikeSourceStartEndModelList = _MikeScenarioService._MikeSourceService._MikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(MikeSourceTVItemID);

        //    return PartialView();
        //}

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioSourceAddOrModifyJSON(FormCollection fc)
        {
            MikeSourceModel mikeSourceModel = _MikeScenarioService.PostMikeSourceAddOrModifyDB(fc);

            return Json(mikeSourceModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioSourceDeleteJSON(int MikeSourceTVItemID)
        {
            MikeSourceModel mikeSourceModel = _MikeScenarioService.PostMikeSourceDeleteDB(MikeSourceTVItemID);

            return Json(mikeSourceModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioSourceStartEndAddJSON(int MikeSourceTVItemID)
        {
            MikeSourceStartEndModel mikeSourceStartEndModel = _MikeScenarioService.PostMikeSourceStartEndAddDB(MikeSourceTVItemID);

            return Json(mikeSourceStartEndModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioSourceStartEndDeleteJSON(int MikeSourceStartEndID, int MikeSourceTVItemID)
        {
            MikeSourceStartEndModel mikeSourceStartEndModel = _MikeScenarioService.PostMikeSourceStartEndDeleteDB(MikeSourceStartEndID, MikeSourceTVItemID);

            return Json(mikeSourceStartEndModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioSourceStartEndSaveJSON(FormCollection fc)
        {
            MikeSourceStartEndModel mikeSourceStartEndModel = _MikeScenarioService.PostMikeSourceStartEndSaveDB(fc);

            return Json(mikeSourceStartEndModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioGenerateResults(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.MikeScenarioModel = null;
            ViewBag.TVFileModelList = null;
            ViewBag.StudyAreaPolygonList = null;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.MikeScenarioModel = mikeScenarioModel;

            List<TVFileModel> tvFileModelList = _TVFileService.GetTVFileModelListWithParentTVItemIDDB(mikeScenarioModel.MikeScenarioTVItemID);

            ViewBag.TVFileModelList = tvFileModelList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioGenerateResultsGetFileDetail(int TVFileTVItemID)
        {
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.TVFileModel = null;
            ViewBag.FileParameterList = null;

            TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
            ViewBag.TVFileModel = tvFileModel;

            if (string.IsNullOrWhiteSpace(tvFileModel.Error))
            {

            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetBoundaryConditionPointListWithMikeScenarioTVItemIDJSON(int MikeScenarioTVItemID)
        {
            List<TVLocation> tvLocationList = new List<TVLocation>();
            List<ContourPolygon> contourPolygonList = _MikeScenarioService.GetStudyAreaContourPolygonListWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);

            foreach (ContourPolygon cp in contourPolygonList)
            {
                TVLocation tvLoc = new TVLocation()
                {
                    Error = "",
                    TVItemID = -1,
                    TVText = "",
                    TVType = TVTypeEnum.Subsector,
                    SubTVType = TVTypeEnum.Subsector,
                    MapObjList = new List<MapObj>()
                };

                MapObj mapObj = new MapObj();
                mapObj.MapInfoID = -1;
                mapObj.MapInfoDrawType = MapInfoDrawTypeEnum.Polyline;

                List<Coord> coordList = new List<Coord>();

                int count = 0;
                foreach (Node node in cp.ContourNodeList)
                {
                    count += 1;
                    coordList.Add(new Coord() { Lat = (float)node.Y, Lng = (float)node.X, Ordinal = count });
                }

                mapObj.CoordList = coordList;
                tvLoc.MapObjList.Add(mapObj);

                tvLocationList.Add(tvLoc);
            }

            return Json(tvLocationList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetStudyAreaContourPolygonListWithMikeScenarioTVItemIDJSON(int MikeScenarioTVItemID)
        {
            List<TVLocation> tvLocationList = new List<TVLocation>();
            List<ContourPolygon> contourPolygonList = _MikeScenarioService.GetStudyAreaContourPolygonListWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);

            foreach (ContourPolygon cp in contourPolygonList)
            {
                TVLocation tvLoc = new TVLocation()
                {
                    Error = "",
                    TVItemID = -1,
                    TVText = "",
                    TVType = TVTypeEnum.Subsector,
                    SubTVType = TVTypeEnum.Subsector,
                    MapObjList = new List<MapObj>()
                };

                MapObj mapObj = new MapObj();
                mapObj.MapInfoID = -1;
                mapObj.MapInfoDrawType = MapInfoDrawTypeEnum.Polyline;

                List<Coord> coordList = new List<Coord>();

                int count = 0;
                foreach (Node node in cp.ContourNodeList)
                {
                    count += 1;
                    coordList.Add(new Coord() { Lat = (float)node.Y, Lng = (float)node.X, Ordinal = count });
                }

                mapObj.CoordList = coordList;
                tvLoc.MapObjList.Add(mapObj);

                tvLocationList.Add(tvLoc);
            }

            return Json(tvLocationList, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _mikeScenarioGenerateResultsTides(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.MikeScenarioModel = null;

            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.MikeScenarioModel = mikeScenarioModel;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ResetWebTideJSON(int MikeScenarioTVItemID)
        {
            string retStr = _MikeScenarioService._TideSiteService.ResetWebTideDB(MikeScenarioTVItemID);

            return Json(retStr, JsonRequestBehavior.AllowGet);
        }

        [NonAction]
        public AppTaskModel ReturnAppTaskError(string Error)
        {
            return new AppTaskModel() { Error = Error };
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SetupWebTideJSON(int MikeScenarioTVItemID, int WebTideDataSet)
        {
            AppTaskModel appTaskModel = _MikeScenarioService._TideSiteService.SetupWebTideDB(MikeScenarioTVItemID, WebTideDataSet);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _SetupWebTideWorking(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            AppTaskModel appTaskModelSetupWebTide = _MikeScenarioService._AppTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(urlModel.TVItemIDList[0], urlModel.TVItemIDList[0], AppTaskCommandEnum.SetupWebTide);

            ViewBag.AppTaskModel = appTaskModelSetupWebTide;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetDrainageAreaWithTVItemIDJSON(int MikeSourceTVItemID)
        {
            float value = _MapInfoService.GetDrainageAreaWithTVItemIDWillCreatePolygonIfItDoesNotExistDB(MikeSourceTVItemID);

            return Json(value, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioGetResultsJSON(int MikeScenarioTVItemID)
        {
            MIKEResult mikeResult = _MikeScenarioResultService.GetMikeScenarioMIKEResultJSONWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);

            return Json(mikeResult, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ResetDrainageAreaWithTVItemIDJSON(FormCollection fc)
        {
            MapInfoModel mapInfoModel = _MapInfoService.ResetDrainageAreaWithTVItemIDWillCreatePolygonIfItDoesNotExistDB(fc);

            return Json(mapInfoModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult LoadHydrometricDataValueJSON(int MikeScenarioTVItemID, int MikeSourceTVItemID)
        {
            AppTaskModel appTaskModel = _MikeScenarioService.LoadHydrometricDataValueDB(MikeScenarioTVItemID, MikeSourceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MikeScenarioReestablishEditing(int MikeScenarioTVItemID)
        {
            MikeScenarioModel mikeScenarioModel = _MikeScenarioService.PostMikeScenarioReestablishEditingDB(MikeScenarioTVItemID);

            return Json(mikeScenarioModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PostMikeScenarioResultCreateAndSaveJSON(int MikeScenarioTVItemID)
        {
            AppTaskModel appTaskModel = _MikeScenarioResultService.PostMikeScenarioResultCreateAndSaveDB(MikeScenarioTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion public

    }

}