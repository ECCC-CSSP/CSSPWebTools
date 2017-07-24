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
using System.Globalization;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest2
    /// </summary>
    [TestClass]
    public class BoxModelControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerAction = "";
        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private BoxModelController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimBoxModelController shimBoxModelController { get; set; }
        private TVItemService tvItemService { get; set; }

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
        public BoxModelControllerTest()
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
        public void BoxModelController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void BoxModelController__boxModelEdit_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_boxModelEdit";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, "Infras ", TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    // Act
                    BoxModelModel boxModelModelRet = randomService.RandomBoxModelModel(tvItemModelInfrastructure, true);

                    // Act
                    PartialViewResult partialViewResult = controller._boxModelEdit(boxModelModelRet.BoxModelID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    BoxModelModel boxModelModelRet2 = (BoxModelModel)partialViewResult.ViewBag.BoxModelModel;
                    Assert.IsNotNull(boxModelModelRet2);
                    Assert.AreEqual(boxModelModelRet.BoxModelID, boxModelModelRet2.BoxModelID);
                }
            }
        }
        [TestMethod]
        public void BoxModelController__boxModelList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_boxModelList";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, "Infras ", TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    // Act
                    BoxModelModel boxModelModelRet = randomService.RandomBoxModelModel(tvItemModelInfrastructure, true);

                    // Assert
                    Assert.AreEqual("", boxModelModelRet.Error);

                    string Q = "!Login/aaa/bbb|||" + tvItemModelInfrastructure.TVItemID + "/1|||";             

                    // Act
                    PartialViewResult partialViewResult = controller._boxModelList(Q) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    List<BoxModelModel> boxModelModelList = (List<BoxModelModel>)partialViewResult.ViewBag.BoxModelModelList;
                    Assert.IsNotNull(boxModelModelList);
                    Assert.AreEqual(1, boxModelModelList.Count);
                }
            }
        }
        [TestMethod]
        public void BoxModelController__boxModelResults_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_boxModelResults";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, "Infras ", TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    // Act
                    BoxModelModel boxModelModelRet = randomService.RandomBoxModelModel(tvItemModelInfrastructure, true);

                    // Act
                    PartialViewResult partialViewResult = controller._boxModelResults(boxModelModelRet.BoxModelID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    List<BoxModelResultModel> boxModelResultModelList = (List<BoxModelResultModel>)partialViewResult.ViewBag.BoxModelResultModelList;
                    Assert.IsNotNull(boxModelResultModelList);
                    Assert.AreEqual(5, boxModelResultModelList.Count);
                    Assert.AreEqual(boxModelModelRet.BoxModelID, boxModelResultModelList[0].BoxModelID);
                    Assert.AreEqual(BoxModelResultTypeEnum.Dilution, boxModelResultModelList[0].BoxModelResultType);
                }
            }
        }
        [TestMethod]
        public void BoxModelController_CopyBoxModelScenarioJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "CopyBoxModelScenarioJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, "Infras ", TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    // Act
                    BoxModelModel boxModelModelRet = randomService.RandomBoxModelModel(tvItemModelInfrastructure, true);

                    // Act
                    JsonResult jsonResult = controller.CopyBoxModelScenarioJSON(boxModelModelRet.BoxModelID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void BoxModelController_CalculateDecayJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "CalculateDecayJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, "Infras ", TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    // Act
                    BoxModelModel boxModelModelRet = randomService.RandomBoxModelModel(tvItemModelInfrastructure, true);

                    // Act
                    JsonResult jsonResult = controller.CalculateDecayJSON(6, 10) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    CalDecay calDecay = (CalDecay)jsonResult.Data;
                    Assert.AreEqual("", calDecay.Error);
                    Assert.AreEqual(4.6821, calDecay.Decay, 0.0001);

                    // Act
                    jsonResult = controller.CalculateDecayJSON(500, 10) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    calDecay = (CalDecay)jsonResult.Data;
                    Assert.AreEqual("", calDecay.Error);
                    Assert.AreEqual(0.0562, calDecay.Decay, 0.0001);
                }
            }
        }
        [TestMethod]
        public void BoxModelController_CreateNewBoxModelScenarioJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "CreateNewBoxModelScenarioJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, "Infras ", TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    string Q = "!Login/aaa/bbb|||" + tvItemModelInfrastructure.TVItemID + "/1|||";
               
                    // Act
                    PartialViewResult partialViewResult = controller._boxModelList(Q) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    List<BoxModelModel> boxModelModelList = (List<BoxModelModel>)partialViewResult.ViewBag.BoxModelModelList;
                    Assert.IsNotNull(boxModelModelList);
                    Assert.AreEqual(0, boxModelModelList.Count);


                    // Act
                    JsonResult jsonResult = controller.CreateNewBoxModelScenarioJSON(tvItemModelInfrastructure.TVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);

                    // Act
                    partialViewResult = controller._boxModelList(Q) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    boxModelModelList = (List<BoxModelModel>)partialViewResult.ViewBag.BoxModelModelList;
                    Assert.IsNotNull(boxModelModelList);
                    Assert.AreEqual(1, boxModelModelList.Count);

                }
            }
        }
        [TestMethod]
        public void BoxModelController_DeleteBoxModelScenarioJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_boxModelList";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, "Infras ", TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    // Act
                    BoxModelModel boxModelModelRet = randomService.RandomBoxModelModel(tvItemModelInfrastructure, true);

                    // Assert
                    Assert.AreEqual("", boxModelModelRet.Error);

                    string Q = "!Login/aaa/bbb|||" + tvItemModelInfrastructure.TVItemID + "/1|||";


                    // Act
                    PartialViewResult partialViewResult = controller._boxModelList(Q) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    List<BoxModelModel> boxModelModelList = (List<BoxModelModel>)partialViewResult.ViewBag.BoxModelModelList;
                    Assert.IsNotNull(boxModelModelList);
                    Assert.AreEqual(1, boxModelModelList.Count);

                    int BoxModelID = boxModelModelList[0].BoxModelID;

                    // Act
                    JsonResult jsonResult = controller.DeleteBoxModelScenarioJSON(boxModelModelRet.BoxModelID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void BoxModelController_SaveBoxModelScenarioJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_boxModelList";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelInfrastructure = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, "Infras ", TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    // Act
                    BoxModelModel boxModelModelRet = randomService.RandomBoxModelModel(tvItemModelInfrastructure, true);

                    // Assert
                    Assert.AreEqual("", boxModelModelRet.Error);

                    string Q = "!Login/aaa/bbb|||" + tvItemModelInfrastructure.TVItemID + "/1|||";


                    // Act
                    PartialViewResult partialViewResult = controller._boxModelList(Q) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    List<BoxModelModel> boxModelModelList = (List<BoxModelModel>)partialViewResult.ViewBag.BoxModelModelList;
                    Assert.IsNotNull(boxModelModelList);
                    Assert.AreEqual(1, boxModelModelList.Count);

                    int BoxModelID = boxModelModelList[0].BoxModelID;

                    FormCollection fc = FillFormCollection(boxModelModelList[0]);

                    // Act
                    JsonResult jsonResult = controller.SaveBoxModelScenarioJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }

        #endregion Testing Methods

        #region Functions private
        private FormCollection FillFormCollection(BoxModelModel boxModelModel)
        {
            FormCollection fc = new FormCollection();

            fc.Add("BoxModelID", boxModelModel.BoxModelID.ToString());
            fc.Add("ScenarioName", randomService.RandomString("ScenarioName ", 30));
            fc.Add("Flow_m3_day", randomService.RandomDouble(10, 1000).ToString());
            fc.Add("FlowDuration_hour", randomService.RandomDouble(10, 23).ToString());
            fc.Add("Dilution", randomService.RandomDouble(10, 1000).ToString());
            fc.Add("T90_hour", randomService.RandomDouble(10, 1000).ToString());
            fc.Add("Temperature_C", randomService.RandomDouble(10, 15).ToString());
            fc.Add("DecayRate_per_day", randomService.RandomDouble(4.0, 4.68).ToString());
            fc.Add("Depth_m", randomService.RandomDouble(10, 20).ToString());
            fc.Add("FCUntreated_MPN_100ml", randomService.RandomInt(10000, 1000000).ToString());
            fc.Add("FCPreDisinfection_MPN_100ml", randomService.RandomInt(10000, 10000).ToString());
            fc.Add("Concentration_MPN_100ml", randomService.RandomInt(100, 10000).ToString());
            fc.Add("FixLength", null);
            fc.Add("FixWidth", null);
            fc.Add("Length_m", randomService.RandomDouble(10, 1000).ToString());
            fc.Add("Width_m", randomService.RandomDouble(10, 1000).ToString());

            return fc;
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
            routeData.Values.Add("controller", "Admin");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new BoxModelController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;
            randomService = new RandomService(languageEnum, user);
            tvItemService = new TVItemService(languageEnum, user);

            controller.SetRequestContext(requestContext);

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(2, controller.CultureListAllowable.Count);
            Assert.AreEqual("en-CA", controller.CultureListAllowable[0]);
            Assert.AreEqual("fr-CA", controller.CultureListAllowable[1]);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(controller._BoxModelService);
            Assert.IsNotNull(controller._BoxModelResultService);
            Assert.IsNotNull(controller.urlModel);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("Admin", controller._RequestContext.RouteData.Values["controller"].ToString());
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
            shimBoxModelController = new ShimBoxModelController(controller);
        }
        #endregion Functions private
    }
}
