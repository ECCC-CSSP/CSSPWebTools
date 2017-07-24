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
    public class HomeControllerTest : SetupData
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
        private HomeController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimHomeController shimHomeController { get; set; }
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
        public HomeControllerTest()
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
        public void HomeController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void HomeController__Home_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_Home";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act 
                    TVItemModel tvItemModelRoot = randomService.RandomTVItem(TVTypeEnum.Root);

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    //string Q = "!Home";
                    PartialViewResult partialViewResult = controller._Home() as PartialViewResult;

                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!Home", urlModel.TVTextList[0]);
                    Assert.AreEqual(ServiceRes.AllLocations, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelRoot.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModelRootRet = (TVItemModel)partialViewResult.ViewBag.TVItemModelRoot;
                    Assert.IsNotNull(tvItemModelRootRet);
                    Assert.AreEqual(tvItemModelRoot.TVItemID, tvItemModelRootRet.TVItemID);
                    Assert.AreEqual(tvItemModelRoot.TVPath, tvItemModelRootRet.TVPath);
                    Assert.AreEqual(ServiceRes.AllLocations, tvItemModelRootRet.TVText);

                    string BaseURL = (string)partialViewResult.ViewBag.BaseURL;

                    Assert.IsNotNull(partialViewResult);
                    List<ContactModel> adminContactModelList = (List<ContactModel>)partialViewResult.ViewBag.AdminContactModelList;
                    Assert.AreEqual(1, adminContactModelList.Count);
                }
            }
        }
        [TestMethod]
        public void HomeController_Index_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "Index";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    ViewResult viewResult = controller.Index() as ViewResult;

                    // Assert
                    Assert.IsNotNull(viewResult);
                }
            }
        }
        [TestMethod]
        public void HomeController__View_Empty_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_View";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = randomService.RandomTVItem(TVTypeEnum.Root);

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    string Q = "!View";
                    PartialViewResult partialViewResult = controller._View(Q) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(ServiceRes.AllLocations, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(1, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModel);
                    Assert.AreEqual(tvItemModelRoot.TVItemID, tvItemModel.TVItemID);
                    Assert.AreEqual(tvItemModelRoot.TVPath, tvItemModel.TVPath);
                    Assert.AreEqual(ServiceRes.AllLocations, tvItemModel.TVText);
                }
            }
        }
        [TestMethod]
        public void HomeController__View_Country_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_View";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelCountry = randomService.RandomTVItem(TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    string Q = "!View/" + tvItemModelCountry.TVText + "|||" + tvItemModelCountry.TVItemID;
                    PartialViewResult partialViewResult = controller._View(Q) as PartialViewResult;

                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelCountry.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelCountry.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModel);
                    Assert.AreEqual(tvItemModelCountry.TVItemID, tvItemModel.TVItemID);
                    Assert.AreEqual(tvItemModelCountry.TVPath, tvItemModel.TVPath);
                    Assert.AreEqual(tvItemModelCountry.TVText, tvItemModel.TVText);
                }
            }
        }
        [TestMethod]
        public void HomeController__View_Province_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_View";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelProvince = randomService.RandomTVItem(TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    // Act
                    TVItemModel tvItemModelCountry = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelProvince.TVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    string Q = "!View/" + tvItemModelProvince.TVText + "|||" + tvItemModelProvince.TVItemID;
                    PartialViewResult partialViewResult = controller._View(Q) as PartialViewResult;

                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelProvince.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelProvince.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModel);
                    Assert.AreEqual(tvItemModelProvince.TVItemID, tvItemModel.TVItemID);
                    Assert.AreEqual(tvItemModelProvince.TVPath, tvItemModel.TVPath);
                    Assert.AreEqual(tvItemModelProvince.TVText, tvItemModel.TVText);
                }
            }
        }
        [TestMethod]
        public void HomeController__View_Area_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_View";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelArea = randomService.RandomTVItem(TVTypeEnum.Area);

                    // Assert
                    Assert.AreEqual("", tvItemModelArea.Error);

                    // Act
                    TVItemModel tvItemModelProvince = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelArea.TVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    // Act
                    string Q = "!View/" + tvItemModelArea.TVText + "|||" + tvItemModelArea.TVItemID;
                    PartialViewResult partialViewResult = controller._View(Q) as PartialViewResult;

                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelArea.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelArea.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModel);
                    Assert.AreEqual(tvItemModelArea.TVItemID, tvItemModel.TVItemID);
                    Assert.AreEqual(tvItemModelArea.TVPath, tvItemModel.TVPath);
                    Assert.AreEqual(tvItemModelArea.TVText, tvItemModel.TVText);
                }
            }
        }
        [TestMethod]
        public void HomeController__View_Sector_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_View";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelSector = randomService.RandomTVItem(TVTypeEnum.Sector);

                    // Assert
                    Assert.AreEqual("", tvItemModelSector.Error);

                    // Act
                    TVItemModel tvItemModelArea = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelSector.TVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelArea.Error);

                    // Act
                    string Q = "!View/" + tvItemModelSector.TVText + "|||" + tvItemModelSector.TVItemID;
                    PartialViewResult partialViewResult = controller._View(Q) as PartialViewResult;

                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelSector.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelSector.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModel);
                    Assert.AreEqual(tvItemModelSector.TVItemID, tvItemModel.TVItemID);
                    Assert.AreEqual(tvItemModelSector.TVPath, tvItemModel.TVPath);
                    Assert.AreEqual(tvItemModelSector.TVText, tvItemModel.TVText);
                }
            }
        }
        [TestMethod]
        public void HomeController__View_Subsector_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_View";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelSubsector = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    // Assert
                    Assert.AreEqual("", tvItemModelSubsector.Error);

                    // Act
                    TVItemModel tvItemModelSector = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelSubsector.TVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelSector.Error);

                    // Act
                    string Q = "!View/" + tvItemModelSubsector.TVText + "|||" + tvItemModelSubsector.TVItemID;
                    PartialViewResult partialViewResult = controller._View(Q) as PartialViewResult;

                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelSubsector.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelSubsector.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModel);
                    Assert.AreEqual(tvItemModelSubsector.TVItemID, tvItemModel.TVItemID);
                    Assert.AreEqual(tvItemModelSubsector.TVPath, tvItemModel.TVPath);
                    Assert.AreEqual(tvItemModelSubsector.TVText, tvItemModel.TVText);
                }
            }
        }
        [TestMethod]
        public void HomeController__View_Municipality_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_View";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    TVItemModel tvItemModelSubsector = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelMunicipality.TVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelSubsector.Error);

                    // Act
                    string Q = "!View/" + tvItemModelMunicipality.TVText + "|||" + tvItemModelMunicipality.TVItemID;
                    PartialViewResult partialViewResult = controller._View(Q) as PartialViewResult;

                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelMunicipality.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelMunicipality.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModel);
                    Assert.AreEqual(tvItemModelMunicipality.TVItemID, tvItemModel.TVItemID);
                    Assert.AreEqual(tvItemModelMunicipality.TVPath, tvItemModel.TVPath);
                    Assert.AreEqual(tvItemModelMunicipality.TVText, tvItemModel.TVText);
                }
            }
        }
        [TestMethod]
        public void HomeController__View_Infrastructure_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_View";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelInfrastructure = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelInfrastructure.Error);

                    // Act
                    TVItemModel tvItemModelMunicipality = tvItemService.GetParentTVItemModelWithTVItemIDForLocationDB(tvItemModelInfrastructure.TVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    // Act
                    string Q = "!View/" + tvItemModelInfrastructure.TVText + "|||" + tvItemModelInfrastructure.TVItemID;
                    PartialViewResult partialViewResult = controller._View(Q) as PartialViewResult;

                    // Assert
                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(2, urlModel.TVTextList.Count);
                    Assert.AreEqual("!View", urlModel.TVTextList[0]);
                    Assert.AreEqual(tvItemModelInfrastructure.TVText, urlModel.TVTextList[1]);
                    Assert.AreEqual(1, urlModel.TVItemIDList.Count);
                    Assert.AreEqual(tvItemModelInfrastructure.TVItemID, urlModel.TVItemIDList[0]);
                    Assert.AreEqual(StartVarShow, urlModel.VariableShow);

                    TVItemModel tvItemModel = (TVItemModel)partialViewResult.ViewBag.TVItemModelLocationCurrent;
                    Assert.IsNotNull(tvItemModel);
                    Assert.AreEqual(tvItemModelInfrastructure.TVItemID, tvItemModel.TVItemID);
                    Assert.AreEqual(tvItemModelInfrastructure.TVPath, tvItemModel.TVPath);
                    Assert.AreEqual(tvItemModelInfrastructure.TVText, tvItemModel.TVText);
                }
            }
        }
        [TestMethod]
        public void HomeController_SearchJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "SearchJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelProvince = randomService.RandomTVItem(TVTypeEnum.Province);
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    JsonResult jsonResult = new JsonResult();
                    string SearchTerm = "";

                    SearchTerm = tvItemModelProvince.TVText;
                    jsonResult = controller.SearchJSON(tvItemModelProvince.TVItemID, SearchTerm) as JsonResult;

                    List<TVItemModel> tvItemModelList = (List<TVItemModel>)jsonResult.Data;
                    Assert.IsNotNull(jsonResult);
                    Assert.IsTrue(tvItemModelList.Count > 0);
                    Assert.IsTrue(tvItemModelList.Where(c => c.TVText.Contains(SearchTerm)).Any());
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
            routeData.Values.Add("controller", "Home");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new HomeController();
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
            Assert.IsNotNull(controller._TVItemService);
            Assert.IsNotNull(controller.urlModel);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("Home", controller._RequestContext.RouteData.Values["controller"].ToString());
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
            shimHomeController = new ShimHomeController(controller);
        }
        #endregion Functions private
    }
}
