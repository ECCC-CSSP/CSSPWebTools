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
using Microsoft.Owin;
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
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest2
    /// </summary>
    [TestClass]
    public class TVItemControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerAction = "";
        private string StartVarShow = "30" + new string("0".ToCharArray()[0], 30);
        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private TVItemController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimTVItemController shimHomeController { get; set; }
        private ShimBaseService shimBaseService { get; set; }
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
        public TVItemControllerTest()
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
        public void TVItemController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void TVItemController__breadCrumb_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_breadCrumb";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Arrange
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    string Q = "!View/" + tvItemModelRoot.TVText + "|||" + tvItemModelRoot.TVItemID + "|||";

                    // Act
                    PartialViewResult partialViewResult = controller._breadCrumb(Q) as PartialViewResult;

                    // Assert
                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelRoot.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelRoot.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    List<TVItemModel> tvItemModelList = (List<TVItemModel>)partialViewResult.ViewBag.tvItemModelLocationParentList;
                    Assert.IsNotNull(tvItemModelList);
                    Assert.AreEqual(0, tvItemModelList.Count);
                }
            }
        }
        [TestMethod]
        public void TVItemController__tabContent_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_tabContent";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Arrange
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    string Q = "!View/" + tvItemModelRoot.TVText + "|||" + tvItemModelRoot.TVItemID;

                    // Act
                    PartialViewResult partialViewResult = controller._tabContent(Q) as PartialViewResult;

                    // Assert
                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelRoot.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelRoot.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModelLocationCurrent);
                    Assert.AreEqual(1, tvItemModelLocationCurrent.TVItemID);

                    List<TabInfo> tabInfoList = (List<TabInfo>)partialViewResult.ViewBag.TabInfoList;
                    Assert.IsNotNull(tabInfoList);
                    Assert.AreEqual(2, tabInfoList.Count);
                }
            }
        }
        [TestMethod]
        public void TVItemController__content_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_content";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Arrange
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    string Q = "!View/" + tvItemModelRoot.TVText + "|||" + tvItemModelRoot.TVItemID;

                    // Act
                    PartialViewResult partialViewResult = controller._content(Q) as PartialViewResult;

                    // Assert
                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelRoot.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelRoot.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModelLocationCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModelLocationCurrent);
                    Assert.AreEqual(1, tvItemModelLocationCurrent.TVItemID);

                    List<TabInfo> tabInfoList = (List<TabInfo>)partialViewResult.ViewBag.TabInfoList;
                    Assert.IsNotNull(tabInfoList);
                    Assert.AreEqual(2, tabInfoList.Count);
                }
            }
        }
        [TestMethod]
        public void TVItemController__MovingTVItem_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_MovingTVItem";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = controller._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = controller._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    PartialViewResult partialViewResult = controller._MovingTVItem(tvItemModelBouctouche.TVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                    Assert.AreEqual(TVAuthEnum.Admin, tvAuth);

                    TVItemModel tvItemModelCurrent = (TVItemModel)partialViewResult.ViewBag.TVItemModelCurrent;
                    Assert.IsNotNull(tvItemModelCurrent);
                    Assert.AreEqual(tvItemModelBouctouche.TVItemID, tvItemModelCurrent.TVItemID);

                    TVItemController tvItemController = (TVItemController)partialViewResult.ViewBag.TVItemController;
                    Assert.IsNotNull(tvItemController);

                    List<TVItemModel> parentTVItemModelList = (List<TVItemModel>)partialViewResult.ViewBag.ParentTVItemModelList;
                    Assert.IsNotNull(parentTVItemModelList);
                    Assert.AreEqual(6, parentTVItemModelList.Count);
                    Assert.AreEqual(tvItemModelRoot.TVItemID, parentTVItemModelList[0].TVItemID);

                    List<TVTypeNamesAndPath> tvTypeNamesAndPathList = (List<TVTypeNamesAndPath>)partialViewResult.ViewBag.TVTypeNamesAndPathList;
                    Assert.IsNotNull(tvTypeNamesAndPathList);
                    Assert.AreEqual(6, tvTypeNamesAndPathList.Count);
                    Assert.AreEqual(TVTypeEnum.Root.ToString(), tvTypeNamesAndPathList[0].TVTypeName);
                    Assert.AreEqual(TVTypeEnum.Country.ToString(), tvTypeNamesAndPathList[1].TVTypeName);
                    Assert.AreEqual(TVTypeEnum.Province.ToString(), tvTypeNamesAndPathList[2].TVTypeName);
                    Assert.AreEqual(TVTypeEnum.Area.ToString(), tvTypeNamesAndPathList[3].TVTypeName);
                    Assert.AreEqual(TVTypeEnum.Sector.ToString(), tvTypeNamesAndPathList[4].TVTypeName);
                    Assert.AreEqual(TVTypeEnum.Subsector.ToString(), tvTypeNamesAndPathList[5].TVTypeName);

                    Dictionary<string, List<TVItemModel>> tvItemModelDictList = (Dictionary<string, List<TVItemModel>>)partialViewResult.ViewBag.TVItemModelDictList;
                    Assert.IsNotNull(tvItemModelDictList);
                    Assert.IsTrue(tvItemModelDictList[TVTypeEnum.Country.ToString()].Count > 0);
                    Assert.IsTrue(tvItemModelDictList[TVTypeEnum.Province.ToString()].Count > 0);
                    Assert.IsTrue(tvItemModelDictList[TVTypeEnum.Area.ToString()].Count > 0);
                    Assert.IsTrue(tvItemModelDictList[TVTypeEnum.Sector.ToString()].Count > 0);
                    Assert.IsTrue(tvItemModelDictList[TVTypeEnum.Subsector.ToString()].Count > 0);
                }
            }
        }
        [TestMethod]
        public void TVItemController__MovingTVItemSelect_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_MovingTVItemSelect";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = controller._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    List<TVItemModel> tvItemModelCountryList = controller._TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelRoot.TVItemID, TVTypeEnum.Country);

                    // Assert
                    Assert.IsTrue(tvItemModelCountryList.Count > 0);

                    // Act
                    PartialViewResult partialViewResult = controller._MovingTVItemSelect(tvItemModelRoot.TVItemID, TVTypeEnum.Country) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    List<TVItemModel> tvItemModelList = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelList;
                    Assert.IsNotNull(tvItemModelList);
                    Assert.IsTrue(tvItemModelList.Count > 0);
                    Assert.IsTrue(tvItemModelList.Where(c => c.TVText == "Canada").Any());
                }
            }
        }
        [TestMethod]
        public void TVItemController_MoveTVItemJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "MoveTVItemJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    // Bouctouche is under NB-06-020-002
                    TVItemModel tvItemModelBouct = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouct.Error);

                    string OldTVPathBouct = tvItemModelBouct.TVPath;

                    // Act
                    // Moving under St-Thomas-de-Kent NB-06-020-003
                    TVItemModel tvItemModelUnder = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "NB-06-020-003", TVTypeEnum.Subsector);

                    // Assert
                    Assert.AreEqual("", tvItemModelUnder.Error);

                    string OldTVPathUnder = tvItemModelUnder.TVPath;

                    // Act
                    JsonResult jsonResult = controller.MoveTVItemJSON(tvItemModelBouct.TVItemID, tvItemModelUnder.TVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void TVItemController__TVItemMoreInfo_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_TVItemMoreInfo";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);
                    string Q = "";

                    PartialViewResult partialViewResult = controller._TVItemMoreInfo(Q, tvItemModelRoot.TVItemID, 0) as PartialViewResult;

                    List<TVItemStatModel> tvItemStatModelList = (List<TVItemStatModel>)partialViewResult.ViewBag.TVItemStatModelList;
                    Assert.IsNotNull(tvItemStatModelList);
                    Assert.AreEqual(tvItemModelRoot.TVItemID, tvItemStatModelList[0].TVItemID);

                    TVItemMoreInfoInfrastructureModel tvItemMoreInfoInfrastructureModel = (TVItemMoreInfoInfrastructureModel)partialViewResult.ViewBag.TVItemMoreInfoInfrastructureModel;
                    Assert.IsNull(tvItemMoreInfoInfrastructureModel);

                    TVItemMoreInfoMikeScenarioModel tvItemMoreInfoMikeScenarioModel = (TVItemMoreInfoMikeScenarioModel)partialViewResult.ViewBag.TVItemMoreInfoMikeScenarioModel;
                    Assert.IsNull(tvItemMoreInfoMikeScenarioModel);

                    TVItemMoreInfoPolSourceSiteModel tvItemMoreInfoPolSourceSiteModel = (TVItemMoreInfoPolSourceSiteModel)partialViewResult.ViewBag.TVItemMoreInfoPolSourceSiteModel;
                    Assert.IsNull(tvItemMoreInfoPolSourceSiteModel);

                    TVItemMoreInfoMWQMSiteModel tvItemMoreInfoMWQMSiteModel = (TVItemMoreInfoMWQMSiteModel)partialViewResult.ViewBag.TVItemMoreInfoMWQMSiteModel;
                    Assert.IsNull(tvItemMoreInfoMWQMSiteModel);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModel;
                    Assert.IsNull(tvItemMoreInfoMWQMSiteModel);
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
            routeData.Values.Add("controller", "TVItem");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new TVItemController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;
            randomService = new RandomService(languageEnum, user);

            controller.SetRequestContext(requestContext);

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(2, controller.CultureListAllowable.Count);
            Assert.AreEqual("en-CA", controller.CultureListAllowable[0]);
            Assert.AreEqual("fr-CA", controller.CultureListAllowable[1]);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("TVItem", controller._RequestContext.RouteData.Values["controller"].ToString());
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

            tvItemService = new TVItemService(languageEnum, user);

        }
        private void SetupShim()
        {
            shimHomeController = new ShimTVItemController(controller);
        }
        #endregion Functions private
    }
}
