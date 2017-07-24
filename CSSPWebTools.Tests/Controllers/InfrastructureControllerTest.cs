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
using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for InfrastructureControllerTest
    /// </summary>
    [TestClass]
    public class InfrastructureControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerAction = "";
        private string StartVarShow = "30000000000000000000000000000000";
        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private InfrastructureController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimInfrastructureController shimInfrastructureController { get; set; }
        private TVItemService tvItemService { get; set; }
        private InfrastructureService infrastructureService { get; set; }
        private TVItemLinkService tvItemLinkService { get; set; }
        private MapInfoPointService mapInfoPointService { get; set; }
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
        public InfrastructureControllerTest()
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
        public void InfrastructureController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void InfrastructureController__infrastructureList_Test()
        {
            controllerAction = "_infrastructureList";

            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelSubsector = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    Assert.AreEqual("", tvItemModelSubsector.Error);

                    TVItemModel tvItemModelMunicipality = tvItemService.PostAddChildTVItemDB(tvItemModelSubsector.TVItemID, "Unique Municipality Name", TVTypeEnum.Municipality);

                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, randomService.RandomString("Infra ", 20), TVTypeEnum.Infrastructure);

                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    InfrastructureModel infrastructureModelNew = new InfrastructureModel();
                    infrastructureModelNew.InfrastructureTVItemID = tvItemModelInfrastructure.TVItemID;
                    infrastructureModelNew.InfrastructureTVText = tvItemModelInfrastructure.TVText;
                    FillInfrastructureModel(infrastructureModelNew);

                    InfrastructureModel infrastructureModelRet = infrastructureService.PostAddInfrastructureDB(infrastructureModelNew);

                    Assert.AreEqual("", infrastructureModelRet.Error);

                    string Q = "!View/" + tvItemModelMunicipality.TVText + "|||" + tvItemModelMunicipality.TVItemID;
                    PartialViewResult partialViewResult = controller._infrastructureList(Q) as PartialViewResult;

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelMunicipality.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelMunicipality.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    List<TVItemModelInfrastructureTypeTVItemLinkModel> tvItemModelInfrastructureTypeTVItemLinkModelList = (List<TVItemModelInfrastructureTypeTVItemLinkModel>)partialViewResult.ViewBag.TVItemModelInfrastructureTypeTVItemLinkModelList;
                    Assert.IsNotNull(tvItemModelInfrastructureTypeTVItemLinkModelList);
                    Assert.AreEqual(1, tvItemModelInfrastructureTypeTVItemLinkModelList.Count);
                    Assert.AreEqual(tvItemModelInfrastructure.TVPath, tvItemModelInfrastructureTypeTVItemLinkModelList[0].TVItemModel.TVPath);
                    Assert.AreEqual(tvItemModelInfrastructure.TVText, tvItemModelInfrastructureTypeTVItemLinkModelList[0].TVItemModel.TVText);
                }

            }
        }
        [TestMethod]
        public void InfrastructureController__infrastructureInfo_Test()
        {
            controllerAction = "_infrastructureInfo";

            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelSubsector = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    Assert.AreEqual("", tvItemModelSubsector.Error);

                    TVItemModel tvItemModelMunicipality = tvItemService.PostAddChildTVItemDB(tvItemModelSubsector.TVItemID, "Unique Municipality Name", TVTypeEnum.Municipality);

                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, randomService.RandomString("Infra ", 20), TVTypeEnum.Infrastructure);

                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    InfrastructureModel infrastructureModelNew = new InfrastructureModel();
                    infrastructureModelNew.InfrastructureTVItemID = tvItemModelInfrastructure.TVItemID;
                    infrastructureModelNew.InfrastructureTVText = tvItemModelInfrastructure.TVText;
                    FillInfrastructureModel(infrastructureModelNew);

                    InfrastructureModel infrastructureModelRet = infrastructureService.PostAddInfrastructureDB(infrastructureModelNew);

                    Assert.AreEqual("", infrastructureModelRet.Error);

                    string Q = "!View/" + tvItemModelInfrastructure.TVText + "|||" + tvItemModelInfrastructure.TVItemID;
                    PartialViewResult partialViewResult = controller._infrastructureInfo(Q) as PartialViewResult;

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelInfrastructure.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelInfrastructure.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    InfrastructureModel infrastructureModel = (InfrastructureModel)partialViewResult.ViewBag.infrastructureModel;
                    Assert.IsNotNull(infrastructureModel);
                    Assert.AreEqual(tvItemModelInfrastructure.TVItemID, infrastructureModel.InfrastructureTVItemID);
                    Assert.AreEqual(infrastructureModelRet.DesignFlow_m3_day, infrastructureModel.DesignFlow_m3_day);
                }
            }
        }
        [TestMethod]
        public void InfrastructureController__infrastructureEditAll_Test()
        {
            controllerAction = "_infrastructureInfo";

            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelBouctouche = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    List<TVItemModel> tvItemModelInfrastructureList = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelBouctouche.TVItemID, TVTypeEnum.Infrastructure);
                    Assert.IsTrue(tvItemModelInfrastructureList.Count > 0);

                    TVItemModel tvItemModelInfWWTP = new TVItemModel();
                    InfrastructureModel infrastructureModel = new InfrastructureModel();

                    foreach (TVItemModel tvItemModel in tvItemModelInfrastructureList)
                    {
                        infrastructureModel = infrastructureService.GetInfrastructureModelWithInfrastructureTVItemIDDB(tvItemModel.TVItemID);
                        Assert.IsTrue(tvItemModelInfrastructureList.Count > 0);

                        if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.WWTP)
                            break;
                    }

                    Assert.AreEqual(InfrastructureTypeEnum.WWTP, infrastructureModel.InfrastructureType);

                    List<MapInfoPointModel> mapInfoPointModelWWTPList = mapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(infrastructureModel.InfrastructureTVItemID, TVTypeEnum.WasteWaterTreatmentPlant, MapInfoDrawTypeEnum.Point);
                    Assert.IsTrue(mapInfoPointModelWWTPList.Count > 0);

                    List<MapInfoPointModel> mapInfoPointModelOutfallList = mapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(infrastructureModel.InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point);
                    Assert.IsTrue(mapInfoPointModelOutfallList.Count > 0);

                    string Q = "!View/" + tvItemModelInfrastructureList[0].TVText + "|||" + infrastructureModel.InfrastructureTVItemID;
                    PartialViewResult partialViewResult = controller._infrastructureEditAll(infrastructureModel.InfrastructureTVItemID) as PartialViewResult;

                    Assert.IsNotNull(partialViewResult);

                    InfrastructureModel infrastructureModelRet = (InfrastructureModel)partialViewResult.ViewBag.infrastructureModel;
                    Assert.IsNotNull(infrastructureModelRet);
                    Assert.AreEqual(infrastructureModel.InfrastructureTVItemID, infrastructureModel.InfrastructureTVItemID);
                    Assert.AreEqual(infrastructureModel.DesignFlow_m3_day, infrastructureModel.DesignFlow_m3_day);

                    MapInfoPointModel mapInfoPointModelInfrastructure = (MapInfoPointModel)partialViewResult.ViewBag.MapInfoPointModelInfrastructure;
                    Assert.IsNotNull(mapInfoPointModelInfrastructure);
                    Assert.AreEqual(mapInfoPointModelWWTPList[0].Lat, mapInfoPointModelInfrastructure.Lat);
                    Assert.AreEqual(mapInfoPointModelWWTPList[0].Lng, mapInfoPointModelInfrastructure.Lng);

                    MapInfoPointModel mapInfoPointModelOutfall = (MapInfoPointModel)partialViewResult.ViewBag.MapInfoPointModelOutfall;
                    Assert.IsNotNull(mapInfoPointModelOutfall);
                    Assert.AreEqual(mapInfoPointModelOutfallList[0].Lat, mapInfoPointModelOutfall.Lat);
                    Assert.AreEqual(mapInfoPointModelOutfallList[0].Lng, mapInfoPointModelOutfall.Lng);
                }
            }
        }
        [TestMethod]
        public void InfrastructureController_SaveInfrastructureJSON_Test()
        {
            controllerAction = "SaveInfrastructureJSON";

            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelSubsector = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    Assert.AreEqual("", tvItemModelSubsector.Error);

                    TVItemModel tvItemModelMunicipality = tvItemService.PostAddChildTVItemDB(tvItemModelSubsector.TVItemID, "Unique Municipality Name", TVTypeEnum.Municipality);

                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, randomService.RandomString("Infra ", 20), TVTypeEnum.Infrastructure);

                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    InfrastructureModel infrastructureModelNew = new InfrastructureModel();
                    infrastructureModelNew.InfrastructureTVItemID = tvItemModelInfrastructure.TVItemID;
                    infrastructureModelNew.InfrastructureTVText = tvItemModelInfrastructure.TVText;
                    FillInfrastructureModel(infrastructureModelNew);

                    InfrastructureModel infrastructureModelRet = infrastructureService.PostAddInfrastructureDB(infrastructureModelNew);

                    Assert.AreEqual("", infrastructureModelRet.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("InfrastructureTVItemID", tvItemModelInfrastructure.TVItemID.ToString());
                    fc.Add("infrastructurecategory", "F");
                    fc.Add("infrastructuretype", InfrastructureTypeEnum.LiftStation.ToString());
                    fc.Add("treatmenttype", TreatmentTypeEnum.ActivatedSludge.ToString());
                    fc.Add("disinfectiontype", DisinfectionTypeEnum.ChlorinationNoDechlorinationSeasonal.ToString());
                    fc.Add("collectionsystemtype", CollectionSystemTypeEnum.Combined10Separated90.ToString());
                    fc.Add("alarmsystemtype", AlarmSystemTypeEnum.OnlyVisualLight.ToString());
                    fc.Add("DesignFlow_m3_s", randomService.RandomDouble(0.3, 10000.0).ToString());
                    fc.Add("AverageFlow_m3_s", randomService.RandomDouble(0.3, 10000.0).ToString());
                    fc.Add("PeakFlow_m3_s", randomService.RandomDouble(0.3, 10000.0).ToString());
                    fc.Add("PopServed", randomService.RandomDouble(10, 10000).ToString());
                    fc.Add("CanOverflow", "on");
                    fc.Add("PercFlowOfTotal", randomService.RandomDouble(0.1, 100.0).ToString());
                    fc.Add("InputDataComments", randomService.RandomString("Input Data Comments", 30));
                    fc.Add("Comments", randomService.RandomString("Comments", 30));
                    fc.Add("TimeOffset_hour", randomService.RandomInt(-7, -3).ToString());
                    fc.Add("TempCatchAllRemoveLater", randomService.RandomString("Temp catch all remove later", 100));
                    fc.Add("AverageDepth_m", randomService.RandomDouble(0.1, 100.0).ToString());
                    fc.Add("NumberOfPorts", randomService.RandomInt(1, 100).ToString());
                    fc.Add("PortDiameter_m", randomService.RandomDouble(0.1, 10.0).ToString());
                    fc.Add("PortSpacing_m", randomService.RandomDouble(0.1, 1000.0).ToString());
                    fc.Add("PortElevation_m", randomService.RandomDouble(0.1, 100.0).ToString());
                    fc.Add("VerticalAngle_deg", randomService.RandomDouble(0.1, 100.0).ToString());
                    fc.Add("HorizontalAngle_deg", randomService.RandomDouble(0.1, 100.0).ToString());
                    fc.Add("DecayRate_per_day", randomService.RandomDouble(0.1, 4.6821).ToString());
                    fc.Add("NearFieldVelocity_m_s", randomService.RandomDouble(0.1, 10.0).ToString());
                    fc.Add("FarFieldVelocity_m_s", randomService.RandomDouble(0.1, 10.0).ToString());
                    fc.Add("ReceivingWaterSalinity_PSU", randomService.RandomDouble(0.0, 35.0).ToString());
                    fc.Add("ReceivingWaterTemperature_C", randomService.RandomDouble(0.1, 35.0).ToString());
                    fc.Add("ReceivingWater_MPN_per_100ml", randomService.RandomInt(0, 3500000).ToString());
                    fc.Add("DistanceFromShore_m", randomService.RandomDouble(1.0, 35000.0).ToString());
                    fc.Add("Lat", "45");
                    fc.Add("Lng", "-66");

                    JsonResult jsonResult = controller.InfrastructureAddOrModifyJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                }
            }
        }
        [TestMethod]
        public void InfrastructureController_SetInfrastructureChildParentJSON_Test()
        {
            controllerAction = "_infrastructureInfo";

            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelSubsector = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    Assert.AreEqual("", tvItemModelSubsector.Error);

                    TVItemModel tvItemModelMunicipality = tvItemService.PostAddChildTVItemDB(tvItemModelSubsector.TVItemID, "Unique Municipality Name", TVTypeEnum.Municipality);

                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, randomService.RandomString("Infra ", 20), TVTypeEnum.Infrastructure);

                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    InfrastructureModel infrastructureModelNew = new InfrastructureModel();
                    infrastructureModelNew.InfrastructureTVItemID = tvItemModelInfrastructure.TVItemID;
                    infrastructureModelNew.InfrastructureTVText = tvItemModelInfrastructure.TVText;
                    FillInfrastructureModel(infrastructureModelNew);

                    InfrastructureModel infrastructureModelRet = infrastructureService.PostAddInfrastructureDB(infrastructureModelNew);

                    Assert.AreEqual("", infrastructureModelRet.Error);

                    TVItemModel tvItemModelInfrastructure2 = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, randomService.RandomString("Infra ", 20), TVTypeEnum.Infrastructure);

                    Assert.AreEqual("", tvItemModelInfrastructure2.Error);

                    InfrastructureModel infrastructureModelNew2 = new InfrastructureModel();
                    infrastructureModelNew2.InfrastructureTVItemID = tvItemModelInfrastructure2.TVItemID;
                    infrastructureModelNew2.InfrastructureTVText = tvItemModelInfrastructure2.TVText;
                    FillInfrastructureModel(infrastructureModelNew2);

                    InfrastructureModel infrastructureModelRet2 = infrastructureService.PostAddInfrastructureDB(infrastructureModelNew2);

                    // Assert 
                    Assert.AreEqual("", infrastructureModelRet2.Error);

                    JsonResult jsonResult = controller.SetInfrastructureChildParentJSON(infrastructureModelRet.InfrastructureTVItemID, infrastructureModelRet2.InfrastructureTVItemID) as JsonResult;

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);

                    TVItemLinkModel tvItemLinkModelRet = tvItemLinkService.GetTVItemLinkModelWithFromTVItemIDAndToTVItemIDDB(infrastructureModelRet.InfrastructureTVItemID, infrastructureModelRet2.InfrastructureTVItemID);

                    // Assert 
                    Assert.AreEqual("", tvItemLinkModelRet.Error);
                    Assert.AreEqual(infrastructureModelRet.InfrastructureTVItemID, tvItemLinkModelRet.FromTVItemID);
                    Assert.AreEqual(infrastructureModelRet2.InfrastructureTVItemID, tvItemLinkModelRet.ToTVItemID);
                }
            }
        }
        #endregion Testing Methods

        #region Functions private
        private void FillInfrastructureModel(InfrastructureModel infrastructureModel)
        {
            infrastructureModel.InfrastructureTVItemID = infrastructureModel.InfrastructureTVItemID;
            infrastructureModel.InfrastructureTVText = infrastructureModel.InfrastructureTVText;
            infrastructureModel.Comment = randomService.RandomString("Comment", 100);
            infrastructureModel.PrismID = randomService.RandomInt(1, 100);
            infrastructureModel.TPID = randomService.RandomInt(1, 100);
            infrastructureModel.LSID = randomService.RandomInt(1, 100);
            infrastructureModel.SiteID = randomService.RandomInt(1, 100);
            infrastructureModel.Site = randomService.RandomInt(1, 100);
            infrastructureModel.InfrastructureCategory = "F";
            infrastructureModel.InfrastructureType = InfrastructureTypeEnum.LiftStation;
            infrastructureModel.TreatmentType = TreatmentTypeEnum.ActivatedSludge;
            infrastructureModel.DisinfectionType = DisinfectionTypeEnum.ChlorinationNoDechlorinationSeasonal;
            infrastructureModel.CollectionSystemType = CollectionSystemTypeEnum.Combined10Separated90;
            infrastructureModel.AlarmSystemType = AlarmSystemTypeEnum.OnlyVisualLight;
            infrastructureModel.DesignFlow_m3_day = randomService.RandomDouble(1, 100000);
            infrastructureModel.AverageFlow_m3_day = randomService.RandomDouble(1, 100000);
            infrastructureModel.PeakFlow_m3_day = randomService.RandomDouble(1, 100000);
            infrastructureModel.PopServed = randomService.RandomInt(50, 100000);
            infrastructureModel.CanOverflow = true;
            infrastructureModel.PercFlowOfTotal = randomService.RandomDouble(0, 100);
            infrastructureModel.TimeOffset_hour = randomService.RandomDouble(-8, -4);
            infrastructureModel.TempCatchAllRemoveLater = randomService.RandomString("TempCatchAllRemoveLater", 200);
            infrastructureModel.AverageDepth_m = randomService.RandomDouble(0.1, 1000);
            infrastructureModel.NumberOfPorts = randomService.RandomInt(1, 100);
            infrastructureModel.PortDiameter_m = randomService.RandomDouble(0.1, 10);
            infrastructureModel.PortSpacing_m = randomService.RandomDouble(0.1, 10000);
            infrastructureModel.PortElevation_m = randomService.RandomDouble(0.1, 10000);
            infrastructureModel.VerticalAngle_deg = randomService.RandomDouble(-90, 90);
            infrastructureModel.HorizontalAngle_deg = randomService.RandomDouble(-180, 180);
            infrastructureModel.DecayRate_per_day = randomService.RandomDouble(0, 1000);
            infrastructureModel.NearFieldVelocity_m_s = randomService.RandomDouble(0, 10);
            infrastructureModel.FarFieldVelocity_m_s = randomService.RandomDouble(0, 10);
            infrastructureModel.ReceivingWaterSalinity_PSU = randomService.RandomDouble(0, 35);
            infrastructureModel.ReceivingWaterTemperature_C = randomService.RandomDouble(0, 35);
            infrastructureModel.ReceivingWater_MPN_per_100ml = randomService.RandomInt(0, 1000000);
            infrastructureModel.DistanceFromShore_m = randomService.RandomDouble(0, 10000);

            Assert.IsTrue(infrastructureModel.InfrastructureTVItemID > 0);
            Assert.IsTrue(infrastructureModel.InfrastructureTVText.Length > 0);
            Assert.IsTrue(infrastructureModel.Comment.Length == 100);
            Assert.IsTrue(infrastructureModel.PrismID >= 1 && infrastructureModel.PrismID <= 100);
            Assert.IsTrue(infrastructureModel.TPID >= 1 && infrastructureModel.TPID <= 100);
            Assert.IsTrue(infrastructureModel.LSID >= 1 && infrastructureModel.LSID <= 100);
            Assert.IsTrue(infrastructureModel.SiteID >= 1 && infrastructureModel.SiteID <= 100);
            Assert.IsTrue(infrastructureModel.Site >= 1 && infrastructureModel.Site <= 100);
            Assert.IsTrue(infrastructureModel.InfrastructureCategory == "F");
            Assert.IsTrue(infrastructureModel.InfrastructureType == InfrastructureTypeEnum.LiftStation);
            Assert.IsTrue(infrastructureModel.TreatmentType == TreatmentTypeEnum.ActivatedSludge);
            Assert.IsTrue(infrastructureModel.DisinfectionType == DisinfectionTypeEnum.ChlorinationNoDechlorinationSeasonal);
            Assert.IsTrue(infrastructureModel.CollectionSystemType == CollectionSystemTypeEnum.Combined10Separated90);
            Assert.IsTrue(infrastructureModel.AlarmSystemType == AlarmSystemTypeEnum.OnlyVisualLight);
            Assert.IsTrue(infrastructureModel.DesignFlow_m3_day >= 1 && infrastructureModel.DesignFlow_m3_day <= 100000);
            Assert.IsTrue(infrastructureModel.AverageFlow_m3_day >= 1 && infrastructureModel.AverageFlow_m3_day <= 100000);
            Assert.IsTrue(infrastructureModel.PeakFlow_m3_day >= 1 && infrastructureModel.PeakFlow_m3_day <= 100000);
            Assert.IsTrue(infrastructureModel.PopServed >= 50 && infrastructureModel.PopServed <= 100000);
            Assert.IsTrue(infrastructureModel.CanOverflow == true);
            Assert.IsTrue(infrastructureModel.PercFlowOfTotal >= 0 && infrastructureModel.PercFlowOfTotal <= 100);
            Assert.IsTrue(infrastructureModel.TimeOffset_hour >= -8 && infrastructureModel.TimeOffset_hour <= -4);
            Assert.IsTrue(infrastructureModel.TempCatchAllRemoveLater.Length == 200);
            Assert.IsTrue(infrastructureModel.AverageDepth_m >= 0.1 && infrastructureModel.AverageDepth_m <= 1000);
            Assert.IsTrue(infrastructureModel.NumberOfPorts >= 1 && infrastructureModel.NumberOfPorts <= 100);
            Assert.IsTrue(infrastructureModel.PortDiameter_m >= 0.1 && infrastructureModel.PortDiameter_m <= 10);
            Assert.IsTrue(infrastructureModel.PortSpacing_m >= 0.1 && infrastructureModel.PortSpacing_m <= 10000);
            Assert.IsTrue(infrastructureModel.PortElevation_m >= 0.1 && infrastructureModel.PortElevation_m <= 10000);
            Assert.IsTrue(infrastructureModel.VerticalAngle_deg >= -90 && infrastructureModel.VerticalAngle_deg <= 90);
            Assert.IsTrue(infrastructureModel.HorizontalAngle_deg >= -180 && infrastructureModel.HorizontalAngle_deg <= 180);
            Assert.IsTrue(infrastructureModel.DecayRate_per_day >= 0 && infrastructureModel.DecayRate_per_day <= 1000);
            Assert.IsTrue(infrastructureModel.NearFieldVelocity_m_s >= 0 && infrastructureModel.NearFieldVelocity_m_s <= 10);
            Assert.IsTrue(infrastructureModel.FarFieldVelocity_m_s >= 0 && infrastructureModel.FarFieldVelocity_m_s <= 10);
            Assert.IsTrue(infrastructureModel.ReceivingWaterSalinity_PSU >= 0 && infrastructureModel.ReceivingWaterSalinity_PSU <= 35);
            Assert.IsTrue(infrastructureModel.ReceivingWaterTemperature_C >= 0 && infrastructureModel.ReceivingWaterTemperature_C <= 35);
            Assert.IsTrue(infrastructureModel.ReceivingWater_MPN_per_100ml >= 0 && infrastructureModel.ReceivingWater_MPN_per_100ml <= 1000000);
            Assert.IsTrue(infrastructureModel.ReceivingWaterSalinity_PSU >= 0 && infrastructureModel.ReceivingWaterSalinity_PSU <= 35);
            Assert.IsTrue(infrastructureModel.DistanceFromShore_m >= 0 && infrastructureModel.DistanceFromShore_m <= 10000);
        }
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
            routeData.Values.Add("controller", "Infrastructure");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new InfrastructureController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;
            randomService = new RandomService(languageEnum, user);
            tvItemService = new TVItemService(languageEnum, user);
            infrastructureService = new InfrastructureService(languageEnum, user);
            tvItemLinkService = new TVItemLinkService(languageEnum, user);
            mapInfoPointService = new MapInfoPointService(languageEnum, user);

            controller.SetRequestContext(requestContext);

            Assert.IsNotNull(controller);
            Assert.AreEqual(2, controller.CultureListAllowable.Count);
            Assert.AreEqual("en-CA", controller.CultureListAllowable[0]);
            Assert.AreEqual("fr-CA", controller.CultureListAllowable[1]);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(controller._InfrastructureService);
            Assert.IsNotNull(controller._TVItemService);
            Assert.IsNotNull(controller.urlModel);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("Infrastructure", controller._RequestContext.RouteData.Values["controller"].ToString());
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
            shimInfrastructureController = new ShimInfrastructureController(controller);
        }
        #endregion Functions private
    }
}
