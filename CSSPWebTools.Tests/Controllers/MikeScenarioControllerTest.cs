using CSSPWebTools.Controllers;
using CSSPWebTools.Controllers.Fakes;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Fakes;
using CSSPWebTools.Tests.SetupInfo;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using CSSPWebToolsDBDLL.Services.Fakes;
using CSSPWebToolsDBDLL.Services.Resources;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.QualityTools.Testing.Fakes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Security.Principal;
using System.Transactions;
using System.Web.Fakes;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security.Fakes;
using System.Linq;
using CSSPWebTools.Models;
using System.Globalization;
using System;
using System.IO;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for MikeScenarioControllerTest2
    /// </summary>
    [TestClass]
    public class MikeScenarioControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerAction = "";
        //private string StartVarShow = "000000000000000000000000000000000";
        //private string StartVarYear = "20101970";
        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private MikeScenarioController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimMikeScenarioController shimMikeScenarioController { get; set; }
        private TVItemService tvItemService { get; set; }
        private MikeScenarioService mikeScenarioService { get; set; }
        private MapInfoService mapInfoService { get; set; }
        private MikeBoundaryConditionService mikeBoundaryConditionService { get; set; }
        private AppTaskService appTaskService { get; set; }
        private TVFileService tvFileService { get; set; }
        private MikeSourceService mikeSourceService { get; set; }
        private MikeSourceStartEndService mikeSourceStartEndService { get; set; }
        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }
        #endregion Properties

        #region Constructors
        public MikeScenarioControllerTest()
        {
            setupData = new SetupData();
        }
        #endregion Constructors

        #region Initialize and Cleanup
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion Initialize and Cleanup

        #region Testing Methods
        [TestMethod]
        public void MikeScenarioController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void MikeScenarioController_AcceptWebTideJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {

                controllerAction = "AcceptWebTideJSON";
                contactModel = contactModelListGood[0];


                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    JsonResult jsonResult = controller.AcceptWebTideJSON(tvItemModelMikeScenario.TVItemID) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_CheckIfScenarioNameAlreadyExistJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {

                controllerAction = "CheckIfScenarioNameAlreadyExistJSON";
                contactModel = contactModelListGood[0];


                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    TVItemModel tvItemModelMunicipality = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelMikeScenario.TVItemID);
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    JsonResult jsonResult = controller.CheckIfScenarioNameAlreadyExistJSON(tvItemModelMunicipality.TVItemID, tvItemModelMikeScenario.TVText) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._HasToBeUnique, ServiceRes.MikeScenarioName), retStr);

                    jsonResult = controller.CheckIfScenarioNameAlreadyExistJSON(tvItemModelMunicipality.TVItemID, tvItemModelMikeScenario.TVText + "unique") as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    retStr = (string)jsonResult.Data;
                    Assert.AreEqual("true", retStr);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_CheckIfSourceNameAlreadyExistJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckIfSourceNameAlreadyExistJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeSource = randomService.RandomTVItem(TVTypeEnum.MikeSource);
                    Assert.AreEqual("", tvItemModelMikeSource.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelMikeSource.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    JsonResult jsonResult = controller.CheckIfSourceNameAlreadyExistJSON(tvItemModelMikeScenario.TVItemID, tvItemModelMikeSource.TVText) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._HasToBeUnique, ServiceRes.SourceName), retStr);

                    jsonResult = controller.CheckIfSourceNameAlreadyExistJSON(tvItemModelMikeScenario.TVItemID, tvItemModelMikeSource.TVText + "unique") as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    retStr = (string)jsonResult.Data;
                    Assert.AreEqual("true", retStr);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_DeleteMeshNodeJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {

                controllerAction = "DeleteMeshNodeJSON";
                contactModel = contactModelListGood[0];


                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeBoundaryCondition = randomService.RandomTVItem(TVTypeEnum.MikeBoundaryConditionMesh);
                    Assert.AreEqual("", tvItemModelMikeBoundaryCondition.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelMikeBoundaryCondition.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelList = mikeBoundaryConditionService.GetMikeBoundaryConditionModelListWithMikeScenarioTVItemIDAndTVTypeDB(tvItemModelMikeScenario.TVItemID, TVTypeEnum.MikeBoundaryConditionMesh);
                    Assert.IsTrue(mikeBoundaryConditionModelList.Count > 0);

                    List<MapInfoPointModel> mapInfoPointModelList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(mikeBoundaryConditionModelList[0].MikeBoundaryConditionTVItemID, TVTypeEnum.MikeBoundaryConditionMesh, MapInfoDrawTypeEnum.Polyline);
                    Assert.IsTrue(mapInfoPointModelList.Count > 0);

                    JsonResult jsonResult = controller.DeleteMeshNodeJSON(mapInfoPointModelList[0].MapInfoPointID) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);

                    List<MapInfoPointModel> mapInfoPointModelList2 = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(mikeBoundaryConditionModelList[0].MikeBoundaryConditionTVItemID, TVTypeEnum.MikeBoundaryConditionMesh, MapInfoDrawTypeEnum.Polyline);
                    Assert.AreEqual(mapInfoPointModelList2.Count + 1, mapInfoPointModelList.Count);

                    int MapInfoPointID = 0;
                    jsonResult = controller.DeleteMeshNodeJSON(MapInfoPointID) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_ToDelete, ServiceRes.MapInfoPoint), retStr);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_GenerateWebTideJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "GenerateWebTideJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeBoundaryCondition = randomService.RandomTVItem(TVTypeEnum.MikeBoundaryConditionWebTide);
                    Assert.AreEqual("", tvItemModelMikeBoundaryCondition.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelMikeBoundaryCondition.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelList = mikeBoundaryConditionService.GetMikeBoundaryConditionModelListWithMikeScenarioTVItemIDAndTVTypeDB(tvItemModelMikeScenario.TVItemID, TVTypeEnum.MikeBoundaryConditionMesh);

                    Assert.IsTrue(mikeBoundaryConditionModelList.Count > 0);

                    int WTNodeNumb = 5;
                    JsonResult jsonResult = controller.GenerateWebTideJSON(tvItemModelMikeScenario.TVItemID, mikeBoundaryConditionModelList[0].MikeBoundaryConditionTVItemID, WTNodeNumb) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenario_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_mikeScenario";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenario(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelLocationCurrent.TVItemID);

                    TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                    Assert.AreEqual(TVAuthEnum.Admin, tvAuth);

                    List<TabInfo> tab1ViewTVItemInfoList = (List<TabInfo>)partialViewResult.ViewBag.Tab1ViewTVItemInfoList;
                    Assert.IsNotNull(tab1ViewTVItemInfoList);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModel.Error);
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, mikeScenarioModel.MikeScenarioTVItemID);

                    AppTaskModel appTaskModelMikeScenario = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelMikeScenario;
                    Assert.IsNull(appTaskModelMikeScenario);

                    List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileNotLoadedList;
                    Assert.IsNull(tvFileModelList);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                    Assert.IsNull(mikeBoundaryConditionModelListMesh);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWebTide = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWebTide;
                    Assert.IsNull(mikeBoundaryConditionModelListWebTide);

                    List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                    Assert.IsNull(dataPathOfTideList);

                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenario_MikeScenarioID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_mikeScenario";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    int MikeScenarioTVItemID = 0;
                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + MikeScenarioTVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenario(Q) as PartialViewResult;

                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], MikeScenarioTVItemID);

                    TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.TVItem, ServiceRes.TVItemID, MikeScenarioTVItemID), tvItemModelLocationCurrent.Error);

                    TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                    Assert.AreEqual(TVAuthEnum.Error, tvAuth);

                    List<TabInfo> tab1ViewTVItemInfoList = (List<TabInfo>)partialViewResult.ViewBag.Tab1ViewTVItemInfoList;
                    Assert.IsNotNull(tab1ViewTVItemInfoList);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.MikeScenario, ServiceRes.MikeScenarioTVItemID, MikeScenarioTVItemID), mikeScenarioModel.Error);

                    AppTaskModel appTaskModelMikeScenario = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelMikeScenario;
                    Assert.IsNull(appTaskModelMikeScenario);

                    List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileNotLoadedList;
                    Assert.IsNull(tvFileModelList);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                    Assert.IsNull(mikeBoundaryConditionModelListMesh);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWT = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWT;
                    Assert.IsNull(mikeBoundaryConditionModelListWT);

                    List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                    Assert.IsNull(dataPathOfTideList);

                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenario_With_MikeScenarioStatus_Equal_Copying_And_AppTaskCommand_Exist_MikeScenarioImport_SetupWebTide_MikeScenarioOtherFileImport_GenerateWebTide_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenario";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelMikeScenario.TVItemID);
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    List<AppTaskCommandEnum> AppTaskNameList = new List<AppTaskCommandEnum>()
                    {
                        AppTaskCommandEnum.MikeScenarioImport,
                        AppTaskCommandEnum.SetupWebTide,
                        AppTaskCommandEnum.MikeScenarioOtherFileImport,
                        AppTaskCommandEnum.GenerateWebTide,
                    };

                    foreach (AppTaskCommandEnum appTaskCommand in AppTaskNameList)
                    {
                        mikeScenarioModel.MikeScenarioStatus = ScenarioStatusEnum.Copying;

                        MikeScenarioModel mikeScenarioModelRet = mikeScenarioService.PostUpdateMikeScenarioDB(mikeScenarioModel);
                        Assert.AreEqual("", mikeScenarioModelRet.Error);

                        AppTaskModel appTaskModelNew = new AppTaskModel()
                        {
                            Command = appTaskCommand,
                            TVItemID = mikeScenarioModel.MikeScenarioTVItemID,
                            TVItemID2 = mikeScenarioModel.MikeScenarioTVItemID,
                            Language = languageEnum,
                            Parameters = "TVItemID," + mikeScenarioModel.MikeScenarioTVItemID + "|||",
                            StartDateTime_UTC = DateTime.Now,
                            Status = AppTaskStatusEnum.Created,
                            PercentCompleted = 1,
                            ErrorText = "empty",
                            StatusText = "empty",
                        };

                        AppTaskModel appTaskModel = appTaskService.PostAddAppTask(appTaskModelNew);
                        Assert.AreEqual("", appTaskModel.Error);

                        string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                        PartialViewResult partialViewResult = controller._mikeScenario(Q) as PartialViewResult;
                        Assert.IsNotNull(partialViewResult);

                        URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                        Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                        TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                        Assert.AreEqual(tvItemModelMikeScenario.TVItemID, tvItemModelLocationCurrent.TVItemID);

                        TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                        Assert.AreEqual(TVAuthEnum.Admin, tvAuth);

                        List<TabInfo> tab1ViewTVItemInfoList = (List<TabInfo>)partialViewResult.ViewBag.Tab1ViewTVItemInfoList;
                        Assert.IsNotNull(tab1ViewTVItemInfoList);

                        MikeScenarioModel mikeScenarioModelRet2 = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                        Assert.AreEqual("", mikeScenarioModelRet2.Error);
                        Assert.AreEqual(mikeScenarioModel.MikeScenarioTVItemID, mikeScenarioModelRet2.MikeScenarioTVItemID);

                        AppTaskModel appTaskModelMikeScenario = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelMikeScenario;
                        Assert.AreEqual("", appTaskModelMikeScenario.Error);

                        List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileNotLoadedList;
                        Assert.IsNull(tvFileModelList);

                        List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                        Assert.IsNull(mikeBoundaryConditionModelListMesh);

                        List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWT = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWT;
                        Assert.IsNull(mikeBoundaryConditionModelListWT);

                        List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                        Assert.IsNull(dataPathOfTideList);
                    }
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenario_With_MikeScenarioStatus_Equal_Copying_And_AppTaskCommand_NotExist_SomeFileNotLoaded_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_mikeScenario";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int MikeScenarioTVItemID = 15504; // Blacks Harbour HT LS 2 LS 3 wind 20 kmh east

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetTVItemModelWithTVItemIDDB(MikeScenarioTVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    List<TVFileModel> tvFileModelListTest = tvFileService.GetTVFileModelListWithParentTVItemIDDB(MikeScenarioTVItemID);
                    Assert.AreEqual(14, tvFileModelListTest.Count);

                    foreach (TVFileModel tvFileModel in tvFileModelListTest)
                    {
                        FileInfo fi = new FileInfo(tvFileService.ChoseEDriveOrCDrive(tvFileModel.ServerFilePath + tvFileModel.ServerFileName));
                        Assert.IsTrue(fi.Exists);
                    }

                    MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(MikeScenarioTVItemID);
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    mikeScenarioModel.MikeScenarioStatus = ScenarioStatusEnum.Copying;
                    MikeScenarioModel mikeScenarioModelRet = mikeScenarioService.PostUpdateMikeScenarioDB(mikeScenarioModel);
                    Assert.AreEqual("", mikeScenarioModelRet.Error);

                    List<TVFileModel> tvFileModelListRet = mikeScenarioService._TVFileService.GetTVFileModelListWithParentTVItemIDDB(MikeScenarioTVItemID);
                    Assert.IsTrue(tvFileModelListRet.Count > 0);

                    foreach (TVFileModel tvFileModel in tvFileModelListRet)
                    {
                        tvFileModel.FileSize_kb = 0;
                        TVFileModel tvFileModelRet = tvFileService.PostUpdateTVFileDB(tvFileModel);
                        Assert.AreEqual("", tvFileModelRet.Error);
                    }

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenario(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModelLocationCurrent);
                    Assert.AreEqual(MikeScenarioTVItemID, tvItemModelLocationCurrent.TVItemID);

                    TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                    Assert.AreEqual(TVAuthEnum.Admin, tvAuth);

                    List<TabInfo> tab1ViewTVItemInfoList = (List<TabInfo>)partialViewResult.ViewBag.Tab1ViewTVItemInfoList;
                    Assert.IsNotNull(tab1ViewTVItemInfoList);
                    Assert.AreEqual(1, tab1ViewTVItemInfoList.Count);

                    MikeScenarioModel mikeScenarioModelRet2 = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModelRet2.Error);
                    Assert.AreEqual(mikeScenarioModel.MikeScenarioTVItemID, mikeScenarioModelRet2.MikeScenarioTVItemID);

                    AppTaskModel appTaskModelMikeScenario = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelMikeScenario;
                    Assert.IsTrue(appTaskModelMikeScenario.Error.Length > 0);

                    List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileNotLoadedList;
                    Assert.AreEqual(tvFileModelListRet.Count, tvFileModelList.Count);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                    Assert.IsTrue(mikeBoundaryConditionModelListMesh.Count > 0);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWebTide = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWebTide;
                    Assert.IsTrue(mikeBoundaryConditionModelListWebTide.Count > 0);

                    List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                    Assert.IsTrue(dataPathOfTideList.Count > 0);

                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenario_With_MikeScenarioStatus_Equal_AskToRun_And_AppTaskCommand_Exist_MikeScenarioAskToRun_MikeScenarioWaitingToRun_MikeScenarioRunning_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenario";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelMikeScenario.TVItemID);

                    Assert.AreEqual("", mikeScenarioModel.Error);

                    List<AppTaskCommandEnum> AppTaskNameList = new List<AppTaskCommandEnum>()
                    {
                        AppTaskCommandEnum.MikeScenarioAskToRun,
                        AppTaskCommandEnum.MikeScenarioWaitingToRun,
                        AppTaskCommandEnum.MikeScenarioRunning,
                    };

                    foreach (AppTaskCommandEnum appTaskCommand in AppTaskNameList)
                    {
                        mikeScenarioModel.MikeScenarioStatus = ScenarioStatusEnum.AskToRun;

                        MikeScenarioModel mikeScenarioModelRet = mikeScenarioService.PostUpdateMikeScenarioDB(mikeScenarioModel);

                        Assert.AreEqual("", mikeScenarioModelRet.Error);

                        AppTaskModel appTaskModelNew = new AppTaskModel()
                        {
                            Command = appTaskCommand,
                            TVItemID = mikeScenarioModel.MikeScenarioTVItemID,
                            TVItemID2 = mikeScenarioModel.MikeScenarioTVItemID,
                            Language = languageEnum,
                            Parameters = "TVItemID," + mikeScenarioModel.MikeScenarioTVItemID + "|||",
                            StartDateTime_UTC = DateTime.Now,
                            Status = AppTaskStatusEnum.Created,
                            PercentCompleted = 1,
                            ErrorText = "empty",
                            StatusText = "empty",
                        };

                        AppTaskModel appTaskModel = appTaskService.PostAddAppTask(appTaskModelNew);
                        Assert.AreEqual("", appTaskModel.Error);

                        string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                        PartialViewResult partialViewResult = controller._mikeScenario(Q) as PartialViewResult;
                        Assert.IsNotNull(partialViewResult);

                        URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                        Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                        TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                        Assert.IsNotNull(tvItemModelLocationCurrent);
                        Assert.AreEqual(tvItemModelMikeScenario.TVItemID, tvItemModelLocationCurrent.TVItemID);

                        TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                        Assert.AreEqual(TVAuthEnum.Admin, tvAuth);

                        List<TabInfo> tab1ViewTVItemInfoList = (List<TabInfo>)partialViewResult.ViewBag.Tab1ViewTVItemInfoList;
                        Assert.IsNotNull(tab1ViewTVItemInfoList);
                        Assert.AreEqual(5, tab1ViewTVItemInfoList.Count);

                        MikeScenarioModel mikeScenarioModelRet2 = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                        Assert.AreEqual("", mikeScenarioModelRet2.Error);
                        Assert.AreEqual(mikeScenarioModel.MikeScenarioTVItemID, mikeScenarioModelRet2.MikeScenarioTVItemID);

                        AppTaskModel appTaskModelMikeScenario = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelMikeScenario;
                        Assert.AreEqual("", appTaskModelMikeScenario.Error);

                        List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileNotLoadedList;
                        Assert.IsNull(tvFileModelList);

                        List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                        Assert.IsNull(mikeBoundaryConditionModelListMesh);

                        List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWT = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWT;
                        Assert.IsNull(mikeBoundaryConditionModelListWT);

                        List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                        Assert.IsNull(dataPathOfTideList);

                    }
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenario_With_MikeScenarioStatus_Equal_Running_And_AppTaskCommand_Exist_MikeScenarioRunning_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenario";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelMikeScenario.TVItemID);
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    List<AppTaskCommandEnum> AppTaskNameList = new List<AppTaskCommandEnum>()
                    {
                        AppTaskCommandEnum.MikeScenarioRunning,
                    };

                    foreach (AppTaskCommandEnum appTaskCommand in AppTaskNameList)
                    {
                        mikeScenarioModel.MikeScenarioStatus = ScenarioStatusEnum.Running;

                        MikeScenarioModel mikeScenarioModelRet = mikeScenarioService.PostUpdateMikeScenarioDB(mikeScenarioModel);
                        Assert.AreEqual("", mikeScenarioModelRet.Error);

                        AppTaskModel appTaskModelNew = new AppTaskModel()
                        {
                            Command = appTaskCommand,
                            TVItemID = mikeScenarioModel.MikeScenarioTVItemID,
                            TVItemID2 = mikeScenarioModel.MikeScenarioTVItemID,
                            Language = languageEnum,
                            Parameters = "TVItemID," + mikeScenarioModel.MikeScenarioTVItemID + "|||",
                            StartDateTime_UTC = DateTime.Now,
                            Status = AppTaskStatusEnum.Created,
                            PercentCompleted = 1,
                            ErrorText = "empty",
                            StatusText = "empty",
                        };

                        AppTaskModel appTaskModel = appTaskService.PostAddAppTask(appTaskModelNew);
                        Assert.AreEqual("", appTaskModel.Error);

                        string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                        PartialViewResult partialViewResult = controller._mikeScenario(Q) as PartialViewResult;
                        Assert.IsNotNull(partialViewResult);

                        URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                        Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                        TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                        Assert.IsNotNull(tvItemModelLocationCurrent);
                        Assert.AreEqual(tvItemModelMikeScenario.TVItemID, tvItemModelLocationCurrent.TVItemID);

                        TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                        Assert.AreEqual(TVAuthEnum.Admin, tvAuth);

                        List<TabInfo> tab1ViewTVItemInfoList = (List<TabInfo>)partialViewResult.ViewBag.Tab1ViewTVItemInfoList;
                        Assert.IsNotNull(tab1ViewTVItemInfoList);
                        Assert.AreEqual(5, tab1ViewTVItemInfoList.Count);

                        MikeScenarioModel mikeScenarioModelRet2 = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                        Assert.AreEqual("", mikeScenarioModelRet2.Error);
                        Assert.AreEqual(mikeScenarioModel.MikeScenarioTVItemID, mikeScenarioModelRet2.MikeScenarioTVItemID);

                        AppTaskModel appTaskModelMikeScenario = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelMikeScenario;
                        Assert.AreEqual("", appTaskModelMikeScenario.Error);

                        List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileNotLoadedList;
                        Assert.IsNull(tvFileModelList);

                        List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                        Assert.IsNull(mikeBoundaryConditionModelListMesh);

                        List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWT = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWT;
                        Assert.IsNull(mikeBoundaryConditionModelListWT);

                        List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                        Assert.IsNull(dataPathOfTideList);

                    }
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenario_With_MikeScenarioStatus_Equal_Completed_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenario";
                contactModel = contactModelListGood[0];


                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelMikeScenario.TVItemID);
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    mikeScenarioModel.MikeScenarioStatus = ScenarioStatusEnum.Completed;

                    MikeScenarioModel mikeScenarioModelRet = mikeScenarioService.PostUpdateMikeScenarioDB(mikeScenarioModel);
                    Assert.AreEqual("", mikeScenarioModelRet.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenario(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModelLocationCurrent);
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, tvItemModelLocationCurrent.TVItemID);

                    TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                    Assert.AreEqual(TVAuthEnum.Admin, tvAuth);

                    MikeScenarioModel mikeScenarioModelRet2 = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModelRet2.Error);
                    Assert.AreEqual(mikeScenarioModel.MikeScenarioTVItemID, mikeScenarioModelRet2.MikeScenarioTVItemID);

                    AppTaskModel appTaskModelMikeScenario = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelMikeScenario;
                    Assert.IsNull(appTaskModelMikeScenario);

                    List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileNotLoadedList;
                    Assert.IsNull(tvFileModelList);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                    Assert.IsNull(mikeBoundaryConditionModelListMesh);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWT = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWT;
                    Assert.IsNull(mikeBoundaryConditionModelListWT);

                    List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                    Assert.IsNull(dataPathOfTideList);

                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioAdd_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioAdd";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelMikeScenario.TVItemID);
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    mikeScenarioModel.MikeScenarioStatus = ScenarioStatusEnum.Completed;
                    MikeScenarioModel mikeScenarioModelRet = mikeScenarioService.PostUpdateMikeScenarioDB(mikeScenarioModel);
                    Assert.AreEqual("", mikeScenarioModelRet.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenario(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModelLocationCurrent);
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, tvItemModelLocationCurrent.TVItemID);

                    TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                    Assert.AreEqual(TVAuthEnum.Admin, tvAuth);

                    MikeScenarioModel mikeScenarioModelRet2 = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModelRet2.Error);
                    Assert.AreEqual(mikeScenarioModel.MikeScenarioTVItemID, mikeScenarioModelRet2.MikeScenarioTVItemID);

                    AppTaskModel appTaskModelMikeScenario = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelMikeScenario;
                    Assert.IsNull(appTaskModelMikeScenario);

                    List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileNotLoadedList;
                    Assert.IsNull(tvFileModelList);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                    Assert.IsNull(mikeBoundaryConditionModelListMesh);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWT = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWT;
                    Assert.IsNull(mikeBoundaryConditionModelListWT);

                    List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                    Assert.IsNull(dataPathOfTideList);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioAskToRunJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioAskToRunJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    JsonResult jsonResult = controller.MikeScenarioAskToRunJSON(tvItemModelMikeScenario.TVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;

                    Assert.AreEqual("", status);
                    Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), mikeScenarioService.LanguageRequest);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioCancelAndResetJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioCancelAndResetJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelMikeScenario.TVItemID);
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    mikeScenarioModel.MikeScenarioStatus = ScenarioStatusEnum.Running;

                    MikeScenarioModel mikeScenarioModelRet = mikeScenarioService.PostUpdateMikeScenarioDB(mikeScenarioModel);
                    Assert.AreEqual("", mikeScenarioModelRet.Error);

                    AppTaskModel appTaskModelNew = new AppTaskModel()
                    {
                        Command = AppTaskCommandEnum.MikeScenarioRunning,
                        TVItemID = mikeScenarioModel.MikeScenarioTVItemID,
                        TVItemID2 = mikeScenarioModel.MikeScenarioTVItemID,
                        Language = languageEnum,
                        Parameters = "TVItemID," + mikeScenarioModel.MikeScenarioTVItemID + "|||",
                        StartDateTime_UTC = DateTime.Now,
                        Status = AppTaskStatusEnum.Created,
                        PercentCompleted = 1,
                        ErrorText = "empty",
                        StatusText = "empty",
                    };

                    AppTaskModel appTaskModel = appTaskService.PostAddAppTask(appTaskModelNew);
                    Assert.AreEqual("", appTaskModel.Error);

                    JsonResult jsonResult = controller.MikeScenarioCancelAndResetJSON(mikeScenarioModelRet.MikeScenarioTVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioCopyJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioCopyJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int MikeScenarioTVItemID = 15504; // Blacks Harbour HT LS 2 LS 3 wind 20 kmh east
                    TVItemModel tvItemModelMikeScenario = tvItemService.GetTVItemModelWithTVItemIDDB(MikeScenarioTVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    List<TVFileModel> tvFileModelList = tvFileService.GetTVFileModelListWithParentTVItemIDDB(MikeScenarioTVItemID);
                    Assert.AreEqual(14, tvFileModelList.Count);

                    foreach (TVFileModel tvFileModel in tvFileModelList)
                    {
                        FileInfo fi = new FileInfo(tvFileService.ChoseEDriveOrCDrive(tvFileModel.ServerFilePath + tvFileModel.ServerFileName));
                        Assert.IsTrue(fi.Exists);
                    }

                    JsonResult jsonResult = controller.MikeScenarioCopyJSON(MikeScenarioTVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioDeleteJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioDeleteJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int MikeScenarioTVItemID = 15504; // Blacks Harbour HT LS 2 LS 3 wind 20 kmh east
                    TVItemModel tvItemModelMikeScenario = tvItemService.GetTVItemModelWithTVItemIDDB(MikeScenarioTVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    List<TVFileModel> tvFileModelList = tvFileService.GetTVFileModelListWithParentTVItemIDDB(MikeScenarioTVItemID);
                    Assert.AreEqual(14, tvFileModelList.Count);

                    foreach (TVFileModel tvFileModel in tvFileModelList)
                    {
                        FileInfo fi = new FileInfo(tvFileService.ChoseEDriveOrCDrive(tvFileModel.ServerFilePath + tvFileModel.ServerFileName));
                        Assert.IsTrue(fi.Exists);
                    }

                    JsonResult jsonResult = controller.MikeScenarioCopyJSON(MikeScenarioTVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);

                    TVItemModel tvItemModelCopyMikeScenario = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelMikeScenario.ParentID, "_1" + ServiceRes.CopyOf + " " + tvItemModelMikeScenario.TVText, TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelCopyMikeScenario.Error);

                    jsonResult = controller.MikeScenarioDeleteJSON(tvItemModelCopyMikeScenario.TVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioGeneralParameterSaveJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {

                controllerAction = "MikeScenarioGeneralParameterSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    int StartYear = randomService.RandomInt(2014, 2025);
                    int StartMonth = randomService.RandomInt(1, 12);
                    int StartDay = randomService.RandomInt(1, 20);
                    int EndYear = StartYear;
                    int EndMonth = StartMonth;
                    int EndDay = StartDay + 3;
                    string StartTime = "04:30";
                    string EndTime = "10:00";
                    double DecayFactor_per_day = randomService.RandomDouble(0.05, 20);
                    double DecayFactorAmplitude = DecayFactor_per_day - 0.01;

                    FormCollection fc = new FormCollection();
                    fc.Add("MikeScenarioTVItemID", tvItemModelMikeScenario.TVItemID.ToString());
                    fc.Add("MikeScenarioName", randomService.RandomString("New MikeScenario Name", 30));
                    fc.Add("MikeScenarioStartYear", StartYear.ToString());
                    fc.Add("MikeScenarioStartMonth", StartMonth.ToString());
                    fc.Add("MikeScenarioStartDay", StartDay.ToString());
                    fc.Add("MikeScenarioStartTime", StartTime);
                    fc.Add("MikeScenarioEndYear", EndYear.ToString());
                    fc.Add("MikeScenarioEndMonth", EndMonth.ToString());
                    fc.Add("MikeScenarioEndDay", EndDay.ToString());
                    fc.Add("MikeScenarioEndTime", EndTime);
                    fc.Add("DecayFactor_per_day", DecayFactor_per_day.ToString());
                    fc.Add("DecayIsConstant", "on");
                    fc.Add("DecayFactorAmplitude", DecayFactorAmplitude.ToString());
                    fc.Add("AmbientTemperature_C", randomService.RandomDouble(2.0, 20.0).ToString());
                    fc.Add("AmbientSalinity_PSU", randomService.RandomDouble(2.0, 20.0).ToString());
                    fc.Add("ResultFrequency_min", "15");
                    fc.Add("ManningNumber", "25");
                    fc.Add("WindSpeed_m_s", "20");
                    fc.Add("WindDirection_deg", "90");

                    JsonResult jsonResult = controller.MikeScenarioGeneralParameterSaveJSON(fc) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        //[TestMethod]
        //public void MikeScenarioController_MikeScenarioImportDB_Test()
        //{
        //    foreach (CultureInfo culture in setupData.cultureListGood)
        //    {
        //        
        //        controllerAction = "MikeScenarioImportDB";
        //        contactModel = contactModelListGood[0];

        //        
        //        SetupTest(contactModel, culture, controllerAction);

        //        using (TransactionScope ts = new TransactionScope())
        //        {
        //            
        //            TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

        //            
        //            Assert.AreEqual("", tvItemModelMunicipality.Error);

        //            
        //            string UploadClientPath = @"C:\CSSPWebTools\CSSPWebTools.Tests\Blacks Harbour\Model\Model Inputs\Blacks Harbour.m21fm";

        //            
        //            AppTaskModel appTaskModel = controller.MikeScenarioImportDB(tvItemModelMunicipality.TVItemID, UploadClientPath, controller._RequestContext.HttpContext.Request) as AppTaskModel;

        //            
        //            Assert.IsNotNull(appTaskModel);
        //            Assert.AreEqual("", appTaskModel.Error);
        //        }
        //    }
        //}
        [TestMethod]
        public void MikeScenarioController__mikeScenarioImport_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioImport";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    string UploadClientPath = @"C:\CSSPWebTools\CSSPWebTools.Tests\Blacks Harbour\Model\Model Inputs\Blacks Harbour.m21fm";

                    using (ShimsContext.Create())
                    {
                        string ErrorText = "ErrorText";
                        SetupShim();
                        shimMikeScenarioController.MikeScenarioImportDBInt32StringHttpRequestBase = (a, b, c) =>
                        {
                            return new AppTaskModel() { Error = ErrorText };
                        };

                        controller._mikeScenarioImport(tvItemModelMunicipality.TVItemID, UploadClientPath);
                        //Assert.AreEqual(ErrorText, appTaskModel.Error);
                    }

                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioInputsSummary_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioInputs";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenarioInputSummary(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    int MikeScenarioTVItemID = 0;
                    Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + MikeScenarioTVItemID + "/1/30";

                    partialViewResult = controller._mikeScenarioInputSummary(Q) as PartialViewResult;

                    Assert.IsNotNull(partialViewResult);

                    urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], MikeScenarioTVItemID);

                    mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.MikeScenario, ServiceRes.MikeScenarioTVItemID, MikeScenarioTVItemID), mikeScenarioModel.Error);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioInputsBoundaryConditions_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioInputsBoundaryConditions";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    PartialViewResult partialViewResult = controller._mikeScenarioBoundaryConditions(tvItemModelMikeScenario.TVItemID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    List<DataPathOfTide> dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                    Assert.AreEqual(11, dataPathOfTideList.Count);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                    Assert.IsTrue(mikeBoundaryConditionModelListMesh.Count > 0);

                    List<MikeBoundaryConditionModel> mikeBoundaryConditionModelListWebTide = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWebTide;
                    Assert.IsTrue(mikeBoundaryConditionModelListWebTide.Count > 0);

                    AppTaskModel appTaskModelSetupWebTide = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelSetupWebTide;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.AppTask, ServiceRes.TVItemID + "," + ServiceRes.TVItemID2 + "," + ServiceRes.AppTaskCommand, tvItemModelMikeScenario.TVItemID + "," + tvItemModelMikeScenario.TVItemID + "," + AppTaskCommandEnum.SetupWebTide.ToString()), appTaskModelSetupWebTide.Error);


                    int MikeScenarioTVItemID = 0;
                    partialViewResult = controller._mikeScenarioBoundaryConditions(MikeScenarioTVItemID) as PartialViewResult;

                    Assert.IsNotNull(partialViewResult);

                    mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.MikeScenario, ServiceRes.MikeScenarioTVItemID, MikeScenarioTVItemID), mikeScenarioModel.Error);

                    dataPathOfTideList = (List<DataPathOfTide>)partialViewResult.ViewBag.DataPathOfTideList;
                    Assert.AreEqual(11, dataPathOfTideList.Count);

                    mikeBoundaryConditionModelListMesh = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListMesh;
                    Assert.AreEqual(0, mikeBoundaryConditionModelListMesh.Count);

                    mikeBoundaryConditionModelListWebTide = (List<MikeBoundaryConditionModel>)partialViewResult.ViewBag.MikeBoundaryConditionModelListWebTide;
                    Assert.AreEqual(0, mikeBoundaryConditionModelListWebTide.Count);

                    appTaskModelSetupWebTide = (AppTaskModel)partialViewResult.ViewBag.AppTaskModelSetupWebTide;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.AppTask, ServiceRes.TVItemID + "," + ServiceRes.TVItemID2 + "," + ServiceRes.AppTaskCommand, MikeScenarioTVItemID + "," + MikeScenarioTVItemID + "," + AppTaskCommandEnum.SetupWebTide.ToString()), appTaskModelSetupWebTide.Error);

                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioInputsGeneralParameters_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioInputsGeneralParameters";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenarioGeneralParameters(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    int MikeScenarioTVItemID = 0;
                    Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + MikeScenarioTVItemID + "/1/30";

                    partialViewResult = controller._mikeScenarioGeneralParameters(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], MikeScenarioTVItemID);

                    mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.MikeScenario, ServiceRes.MikeScenarioTVItemID, MikeScenarioTVItemID), mikeScenarioModel.Error);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioInputsInputSummary_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioInputsInputSummary";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenarioInputSummary(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    InputSummary inputSummary = (InputSummary)partialViewResult.ViewBag.InputSummary;
                    Assert.AreEqual("", inputSummary.Error);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    List<MikeSourceModel> mikeSourceModelList = (List<MikeSourceModel>)partialViewResult.ViewBag.MikeSourceModelList;
                    Assert.IsTrue(mikeSourceModelList.Count > 0);

                    int MikeScenarioTVItemID = 0;
                    Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + MikeScenarioTVItemID + "/1/30";

                    partialViewResult = controller._mikeScenarioInputSummary(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], MikeScenarioTVItemID);

                    inputSummary = (InputSummary)partialViewResult.ViewBag.InputSummary;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.MikeScenario, ServiceRes.MikeScenarioTVItemID, MikeScenarioTVItemID), inputSummary.Error);

                    mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.MikeScenario, ServiceRes.MikeScenarioTVItemID, MikeScenarioTVItemID), mikeScenarioModel.Error);

                    mikeSourceModelList = (List<MikeSourceModel>)partialViewResult.ViewBag.MikeSourceModelList;
                    Assert.IsTrue(mikeSourceModelList.Count == 0);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioInputsSources_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioInputsSources";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenarioSources(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual("", mikeScenarioModel.Error);

                    List<MikeSourceModel> mikeSourceModelList = (List<MikeSourceModel>)partialViewResult.ViewBag.MikeSourceModelList;
                    Assert.IsTrue(mikeSourceModelList.Count > 0);

                    int MikeScenarioTVItemID = 0;
                    Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + MikeScenarioTVItemID + "/1/30";

                    partialViewResult = controller._mikeScenarioSources(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], MikeScenarioTVItemID);

                    mikeSourceModelList = (List<MikeSourceModel>)partialViewResult.ViewBag.MikeSourceModelList;
                    Assert.IsTrue(mikeSourceModelList.Count == 0);
                }
            }
        }
        //[TestMethod]
        //public void MikeScenarioController_MikeScenarioOtherFileImportDB_Test()
        //{
        //    foreach (CultureInfo culture in setupData.cultureListGood)
        //    {
        //        
        //        controllerAction = "MikeScenarioOtherFileImportDB";
        //        contactModel = contactModelListGood[0];

        //        
        //        SetupTest(contactModel, culture, controllerAction);

        //        using (TransactionScope ts = new TransactionScope())
        //        {
        //            
        //            TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB("Black Harbour m21fm").FirstOrDefault();

        //            
        //            Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

        //            
        //            TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);

        //            
        //            Assert.AreEqual("", tvItemModelMikeScenario.Error);

        //            TVFileModel tvFileModel = new TVFileModel();

        //            
        //            List<TVFileModel> tvFileModelList = tvFileService.GetTVFileModelListWithParentTVItemIDDB(tvItemModelMikeScenario.TVItemID);

        //            
        //            Assert.IsTrue(tvFileModelList.Count > 0);

        //            foreach (TVFileModel tvFileModelTemp in tvFileModelList)
        //            {
        //                if (tvFileModelTemp.ServerFileName == @"Blacks Harbour Currents South West.dfs1")
        //                {
        //                    tvFileModel = tvFileModelTemp;
        //                    break;
        //                }
        //            }
        //            string ClientFullPath = @"C:\CSSPWebTools\CSSPWebTools.Tests\Blacks Harbour\External Data\Blacks Harbour Currents South West.dfs1";

        //            
        //            AppTaskModel appTaskModel = controller.MikeScenarioOtherFileImportDB(tvItemModelMikeScenario.TVItemID, tvFileModel.TVFileTVItemID, ClientFullPath, tvFileModel.ServerFilePath, controller.Request) as AppTaskModel;

        //            
        //            Assert.IsNotNull(appTaskModel);
        //            Assert.AreEqual(AppTaskCommandEnum.MikeScenarioOtherFileImport, appTaskModel.Command);
        //            Assert.AreEqual(tvItemModelMikeScenario.TVItemID, appTaskModel.TVItemID);
        //            Assert.AreEqual(tvItemModelMikeScenario.TVItemID, appTaskModel.TVItemID2);
        //            Assert.AreEqual(tvFileModel.TVFileTVItemID, int.Parse(appTaskService.GetAppTaskParamStr(appTaskModel.Parameters, "TVFileID")));
        //        }
        //    }
        //}
        [TestMethod]
        public void MikeScenarioController__mikeScenarioOtherFileNotImport_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioOtherFileNotImport";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    List<TVFileModel> tvFileModelList = tvFileService.GetTVFileModelListWithParentTVItemIDDB(tvItemModelMikeScenario.TVItemID);
                    Assert.IsTrue(tvFileModelList.Count > 0);

                    controller._mikeScenarioOtherFileNotImport(tvFileModelList[0].TVFileTVItemID);

                    TVFileModel tvFileModel = tvFileService.GetTVFileModelWithTVFileTVItemIDDB(tvFileModelList[0].TVFileTVItemID);

                    Assert.AreEqual("", tvFileModel.Error);
                    Assert.AreEqual(-1, tvFileModel.FileSize_kb);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioSourceAddJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioSourceAddJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    List<TVItemModel> tvItemModelList = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMikeScenario.TVItemID, TVTypeEnum.MikeSource);
                    Assert.IsTrue(tvItemModelList.Count > 0);

                    string SourceName = randomService.RandomString("New Source Name ", 30);

                    FormCollection fc = new FormCollection();
                    fc.Add("MikeScenarioTVItemID", tvItemModelMikeScenario.TVItemID.ToString());
                    fc.Add("SourceName", SourceName);
                    fc.Add("Include", "on");
                    fc.Add("IsRiver", "on");
                    fc.Add("IsContinuous", "on");
                    fc.Add("Lat", "45");
                    fc.Add("Lng", "-66");

                    JsonResult jsonResult = controller.MikeScenarioSourceAddOrModifyJSON(fc) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioSourceDeleteJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioSourceDeleteJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    List<TVItemModel> tvItemModelList = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMikeScenario.TVItemID, TVTypeEnum.MikeSource);
                    Assert.IsTrue(tvItemModelList.Count > 0);

                    int FirstCounted = tvItemModelList.Count;

                    JsonResult jsonResult = controller.MikeScenarioSourceDeleteJSON(tvItemModelList[0].TVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioSourceAddOrModifyJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioSourceSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    TVItemModel tvItemModelMikeSource = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMikeScenario.TVItemID, TVTypeEnum.MikeSource).FirstOrDefault();
                    Assert.IsNotNull(tvItemModelMikeSource);

                    string SourceName = randomService.RandomString("Source Name ", 30);
                    FormCollection fc = new FormCollection();
                    fc.Add("SourceName", SourceName);
                    fc.Add("MikeSourceTVItemID", tvItemModelMikeSource.TVItemID.ToString());
                    fc.Add("MikeScenarioTVItemID", tvItemModelMikeScenario.TVItemID.ToString());
                    fc.Add("Include", null);
                    fc.Add("IsRiver", "on");
                    fc.Add("IsContinuous", "on");
                    fc.Add("Lat", "45");
                    fc.Add("Lng", "-66");

                    JsonResult jsonResult = controller.MikeScenarioSourceAddOrModifyJSON(fc) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioSourceStartEndAddJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioSourceEffluentAddJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    TVItemModel tvItemModelMikeSource = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMikeScenario.TVItemID, TVTypeEnum.MikeSource).FirstOrDefault();
                    Assert.IsNotNull(tvItemModelMikeSource);

                    List<MikeSourceStartEndModel> mikeSourceStartEndModelList = mikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(tvItemModelMikeSource.TVItemID);
                    Assert.IsTrue(mikeSourceStartEndModelList.Count > 0);

                    int CountMikeSourceStartEndModel = mikeSourceStartEndModelList.Count;

                    JsonResult jsonResult = controller.MikeScenarioSourceStartEndAddJSON(tvItemModelMikeSource.TVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioSourceStartEndDeleteJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioSourceEffluentDeleteJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    TVItemModel tvItemModelMikeSource = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMikeScenario.TVItemID, TVTypeEnum.MikeSource).FirstOrDefault();
                    Assert.IsNotNull(tvItemModelMikeSource);

                    List<MikeSourceStartEndModel> mikeSourceStartEndModelList = mikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(tvItemModelMikeSource.TVItemID);
                    Assert.IsTrue(mikeSourceStartEndModelList.Count > 0);

                    int CountMikeSourceStartEndModel = mikeSourceStartEndModelList.Count;

                    JsonResult jsonResult = controller.MikeScenarioSourceStartEndDeleteJSON(mikeSourceStartEndModelList[0].MikeSourceStartEndID, tvItemModelMikeSource.TVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_MikeScenarioSourceStartEndSaveJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "MikeScenarioSourceEffluentSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMikeScenario = randomService.RandomTVItem(TVTypeEnum.MikeScenario);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    TVItemModel tvItemModelMikeSource = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMikeScenario.TVItemID, TVTypeEnum.MikeSource).FirstOrDefault();
                    Assert.AreEqual("", tvItemModelMikeSource.Error);

                    MikeSourceModel mikeSourceModelRet = mikeSourceService.GetMikeSourceModelWithMikeSourceTVItemIDDB(tvItemModelMikeSource.TVItemID);
                    Assert.AreEqual("", mikeSourceModelRet.Error);

                    mikeSourceModelRet.IsContinuous = false;

                    MikeSourceModel mikeSourceModel = mikeSourceService.PostUpdateMikeSourceDB(mikeSourceModelRet);
                    Assert.AreEqual("", mikeSourceModel.Error);

                    List<MikeSourceStartEndModel> mikeSourceStartEndModelList = mikeSourceStartEndService.GetMikeSourceStartEndModelListWithMikeSourceTVItemIDDB(tvItemModelMikeSource.TVItemID);
                    Assert.IsTrue(mikeSourceStartEndModelList.Count > 0);

                    int StartYear = randomService.RandomInt(2014, 2025);
                    int StartMonth = randomService.RandomInt(1, 12);
                    int StartDay = randomService.RandomInt(1, 20);
                    int EndYear = StartYear;
                    int EndMonth = StartMonth;
                    int EndDay = StartDay + 3;
                    string StartTime = "04:30";
                    string EndTime = "10:00";

                    FormCollection fc = new FormCollection();
                    fc.Add("MikeSourceID", mikeSourceModel.MikeSourceID.ToString());
                    fc.Add("MikeSourceStartEndID", mikeSourceStartEndModelList[0].MikeSourceStartEndID.ToString());
                    fc.Add("MikeSourceStartYear", StartYear.ToString());
                    fc.Add("MikeSourceStartMonth", StartMonth.ToString());
                    fc.Add("MikeSourceStartDay", StartDay.ToString());
                    fc.Add("MikeSourceStartTime", StartTime);
                    fc.Add("MikeSourceEndYear", EndYear.ToString());
                    fc.Add("MikeSourceEndMonth", EndMonth.ToString());
                    fc.Add("MikeSourceEndDay", EndDay.ToString());
                    fc.Add("MikeSourceEndTime", EndTime);
                    fc.Add("SourceFlowStart_m3_day", randomService.RandomDouble(0.1, 10000000).ToString());
                    fc.Add("SourcePollutionStart_MPN_100ml", randomService.RandomInt(1, 10000000).ToString());
                    fc.Add("SourceTemperatureStart_C", randomService.RandomDouble(1.0, 35.0).ToString());
                    fc.Add("SourceSalinityStart_PSU", randomService.RandomDouble(1.0, 35.0).ToString());
                    fc.Add("SourceFlowEnd_m3_day", randomService.RandomDouble(0.1, 10000000).ToString());
                    fc.Add("SourcePollutionEnd_MPN_100ml", randomService.RandomInt(1, 10000000).ToString());
                    fc.Add("SourceTemperatureEnd_C", randomService.RandomDouble(1.0, 35.0).ToString());
                    fc.Add("SourceSalinityEnd_PSU", randomService.RandomDouble(1.0, 35.0).ToString());

                    JsonResult jsonResult = controller.MikeScenarioSourceStartEndSaveJSON(fc) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                    Assert.AreEqual("", status);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioTools_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioTools";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenarioTools(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, mikeScenarioModel.MikeScenarioTVItemID);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioToolsHydrometric_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioToolsHydrometric";
                contactModel = contactModelListGood[0];


                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenarioToolsHydrometric(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, mikeScenarioModel.MikeScenarioTVItemID);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioToolsPrecipitation_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioToolsPrecipitation";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenarioToolsPrecipitation(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, mikeScenarioModel.MikeScenarioTVItemID);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__mikeScenarioToolsTides_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_mikeScenarioToolsTides";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._mikeScenarioToolsTides(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(urlModel.TVItemIDList[0], tvItemModelMikeScenario.TVItemID);

                    MikeScenarioModel mikeScenarioModel = (MikeScenarioModel)partialViewResult.ViewBag.MikeScenarioModel;
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, mikeScenarioModel.MikeScenarioTVItemID);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_ResetWebTideJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "ResetWebTideJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    JsonResult jsonResult = controller.ResetWebTideJSON(tvItemModelMikeScenario.TVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_ReturnAppTaskError_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "ResetWebReturnAppTaskErrorTideJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    string ErrorText = "ErrorText";

                    AppTaskModel appTaskModel = controller.ReturnAppTaskError(ErrorText);
                    Assert.AreEqual(ErrorText, appTaskModel.Error);
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController_SetupWebTideJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "SetupWebTideJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    JsonResult jsonResult = controller.SetupWebTideJSON(tvItemModelMikeScenario.TVItemID, (int)WebTideDataSetEnum.nwatl) as JsonResult;
                    Assert.IsNotNull(jsonResult);

                    string status = (string)jsonResult.Data;
                }
            }
        }
        [TestMethod]
        public void MikeScenarioController__SetupWebTideWorking_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                controllerAction = "_SetupWebTideWorking";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelTVFileM21FM = tvItemService.GetTVItemModelListContainingTVTextDB(tvItemModelRoot.TVItemID, "Black Harbour m21fm").FirstOrDefault();
                    Assert.AreEqual("", tvItemModelTVFileM21FM.Error);

                    TVItemModel tvItemModelMikeScenario = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelTVFileM21FM.TVItemID);
                    Assert.AreEqual("", tvItemModelMikeScenario.Error);

                    AppTaskModel appTaskModelNew = new AppTaskModel()
                    {
                        TVItemID = tvItemModelMikeScenario.TVItemID,
                        TVItemID2 = tvItemModelMikeScenario.TVItemID,
                        Command = AppTaskCommandEnum.SetupWebTide,
                        Language = languageEnum,
                        Parameters = "MikeScenarioTVItemID," + tvItemModelMikeScenario.TVItemID + "|||",
                        StartDateTime_UTC = DateTime.Now,
                        Status = AppTaskStatusEnum.Created,
                        PercentCompleted = 1,
                        ErrorText = "empty",
                        StatusText = "empty",
                    };

                    AppTaskModel appTaskModel = appTaskService.PostAddAppTask(appTaskModelNew);
                    Assert.AreEqual("", appTaskModel.Error);

                    string Q = "!View/" + tvItemModelMikeScenario.TVText + "/A/B|||" + tvItemModelMikeScenario.TVItemID + "/1/30";

                    PartialViewResult partialViewResult = controller._SetupWebTideWorking(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    AppTaskModel appTaskModelRet = (AppTaskModel)partialViewResult.ViewBag.AppTaskModel;
                    Assert.AreEqual("", appTaskModelRet.Error);
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, appTaskModelRet.TVItemID);
                    Assert.AreEqual(tvItemModelMikeScenario.TVItemID, appTaskModelRet.TVItemID);
                    Assert.AreEqual(AppTaskCommandEnum.SetupWebTide, appTaskModelRet.Command);
                }
            }
        }
        #endregion Testing Methods

        #region Functions private
        private void SetupTest(ContactModel contactModelToDo, CultureInfo culture, string actionStr)
        {
            LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

            if (contactModelToDo == null)
            {
                user = null;
            }
            else
            {
                user = new GenericPrincipal(new GenericIdentity(contactModelToDo.LoginEmail, "Forms"), null);
            }
            routeData = new RouteData();
            routeData.Values.Add("culture", culture);
            routeData.Values.Add("controller", "MikeScenario");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new MikeScenarioController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;
            randomService = new RandomService(languageEnum, user);
            mapInfoService = new MapInfoService(languageEnum, user);
            tvItemService = new TVItemService(languageEnum, user);
            mikeBoundaryConditionService = new MikeBoundaryConditionService(languageEnum, user);
            appTaskService = new AppTaskService(languageEnum, user);
            mikeScenarioService = new MikeScenarioService(languageEnum, user);
            tvFileService = new TVFileService(languageEnum, user);
            mikeSourceService = new MikeSourceService(languageEnum, user);
            mikeSourceStartEndService = new MikeSourceStartEndService(languageEnum, user);

            controller.SetRequestContext(requestContext);


            Assert.IsNotNull(controller);
            Assert.AreEqual(2, controller.CultureListAllowable.Count);
            Assert.AreEqual("en-CA", controller.CultureListAllowable[0]);
            Assert.AreEqual("fr-CA", controller.CultureListAllowable[1]);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(controller._MikeScenarioService);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("MikeScenario", controller._RequestContext.RouteData.Values["controller"].ToString());
            Assert.IsNotNull(actionStr, controller._RequestContext.RouteData.Values["action"].ToString());
            Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.LanguageRequest);
            Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.ViewBag.Language);
            Assert.AreEqual(culture.Name, controller.CultureRequest);
            Assert.AreEqual(culture.Name, controller.ViewBag.Culture);
            if (contactModelToDo != null)
            {
                Assert.AreEqual(contactModelToDo.IsAdmin, controller.IsAdmin);
                Assert.AreEqual(contactModelToDo.IsAdmin, controller.ViewBag.IsAdmin);
            }
            Assert.AreEqual(true, controller.Debug);
            Assert.AreEqual(true, controller.ViewBag.Debug);

        }
        private void SetupShim()
        {
            shimMikeScenarioController = new ShimMikeScenarioController(controller);
        }
        #endregion Functions private
    }
}
