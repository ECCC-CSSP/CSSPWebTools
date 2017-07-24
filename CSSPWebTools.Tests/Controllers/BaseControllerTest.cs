using CSSPWebTools.Controllers;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Models;
using CSSPWebTools.Tests.SetupInfo;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using CSSPWebToolsDBDLL.Services.Fakes;
using CSSPWebToolsDBDLL.Services.Resources;
using Microsoft.QualityTools.Testing.Fakes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Security.Principal;
using System.Transactions;
using System.Web.Fakes;
using System.Web.Mvc;
using System.Web.Routing;
using System.Linq;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest2
    /// </summary>
    [TestClass]
    public class BaseControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerName = "Base";
        private string controllerAction = "NotUsed";
        private string StartVarShow = "30" + new string("0".ToCharArray()[0], 30);
        private int VarShowStrLength = 0;

        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private BaseController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimTVItemService shimTVItemService { get; set; }
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
        public BaseControllerTest()
        {
            setupData = new SetupData();
            this.VarShowStrLength = StartVarShow.Length;
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

        #region Testing Methods View
        [TestMethod]
        public void BaseController_Constructor_User_Good_Admin_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                // Assert
                Assert.AreEqual(culture.Name, controller.CultureRequest);
                Assert.AreEqual(culture.Name, controller.ViewBag.Culture);
                Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.LanguageRequest);
                Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.ViewBag.Language);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_User_Good_NotAdmin_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[2], culture, controllerAction);

                // Assert
                Assert.AreEqual(culture.Name, controller.CultureRequest);
                Assert.AreEqual(culture.Name, controller.ViewBag.Culture);
                Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.LanguageRequest);
                Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.ViewBag.Language);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_User_Bad_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListBad[0], culture, controllerAction);

                // Assert
                Assert.AreEqual(culture.Name, controller.CultureRequest);
                Assert.AreEqual(culture.Name, controller.ViewBag.Culture);
                Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.LanguageRequest);
                Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.ViewBag.Language);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_User_Good_Admin_BadCultureTest()
        {
            foreach (CultureInfo culture in setupData.cultureListBad)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                // Assert
                Assert.AreEqual("en-CA", controller.CultureRequest);
                Assert.AreEqual("en-CA", controller.ViewBag.Culture);
                Assert.AreEqual(LanguageEnum.en, controller.LanguageRequest);
                Assert.AreEqual(LanguageEnum.en, (LanguageEnum)controller.ViewBag.Language);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_Empty_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                string Q = "";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!Home", controller.urlModel.TVTextList[0]);
                Assert.AreEqual(ServiceRes.AllLocations, controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_1_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual(ServiceRes.AllLocations, controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_2_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? "Tous les endroits" : "All locations"), controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_3_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_4_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa/bbb";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_6_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa|||";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_7_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa|||123";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(123, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_8_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/|||123";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? "Tous les endroits" : "All locations"), controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(123, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_9_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa/bbb/ccc|||123/234";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(123, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void UBaseController_Constructor_Q_10_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa/bbb/ccc|||123/234/345";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(123, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_11_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa/bbb|||aaa";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(0, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_12_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa/bbb|||aaa/bbb";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(0, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_14_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa|||1|||";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_15_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa|||11|||1";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(11, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(GetVariableShow(StartVarShow, new List<URLVarShowEnum>() { (URLVarShowEnum)0 }, new List<string> { "1" }), controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_17_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa|||1|||a";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(GetVariableShow(StartVarShow, new List<URLVarShowEnum>() { (URLVarShowEnum)0 }, new List<string> { "0" }), controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_17a_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa|||1|||00a";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(GetVariableShow(StartVarShow, new List<URLVarShowEnum>() { (URLVarShowEnum)0 }, new List<string> { "0" }), controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_Constructor_Q_18_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/aaa|||1|||11111";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual("aaa", controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(GetVariableShow(StartVarShow, new List<URLVarShowEnum>() { (URLVarShowEnum)0, (URLVarShowEnum)1, (URLVarShowEnum)2, (URLVarShowEnum)3, (URLVarShowEnum)4 }, new List<string> { "1", "1", "1", "1", "1" }), controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController__GetLastUpdateAndTVText_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                // Act
                TVItemModel tvItemModelMuni = randomService.RandomTVItem(TVTypeEnum.Municipality);

                // Assert
                Assert.AreEqual("", tvItemModelMuni.Error);

                // Act
                TimeZone localZone = TimeZone.CurrentTimeZone;
                int Offset_min = (int)localZone.GetUtcOffset(DateTime.Now).TotalMinutes;
                PartialViewResult partialViewResult = controller._GetLastUpdateAndTVText("TVItemLanguage", tvItemModelMuni.TVItemID, Offset_min);

                // Assert
                Assert.IsNotNull(partialViewResult);
                LastUpdateAndTVText lastUpdateAndText = partialViewResult.ViewBag.LastUpdateAndTVText;
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Year, lastUpdateAndText.LastUpdateDate_UTC.Year);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Month, lastUpdateAndText.LastUpdateDate_UTC.Month);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Day, lastUpdateAndText.LastUpdateDate_UTC.Day);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Hour, lastUpdateAndText.LastUpdateDate_UTC.Hour);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Minute, lastUpdateAndText.LastUpdateDate_UTC.Minute);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Second, lastUpdateAndText.LastUpdateDate_UTC.Second);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Year, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Year);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Month, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Month);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Day, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Day);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Hour, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Hour);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Minute, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Minute);
                Assert.AreEqual(tvItemModelMuni.LastUpdateDate_UTC.Second, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Second);

                TVItemModel tvItemModelContact = controller._TVItemService.GetTVItemModelWithTVItemIDDB(tvItemModelMuni.LastUpdateContactTVItemID);
                Assert.AreEqual(tvItemModelContact.TVText, lastUpdateAndText.TVText);

                // Act
                TVItemModel tvItemModelInf = randomService.RandomTVItem(TVTypeEnum.Infrastructure);

                // Assert
                Assert.AreEqual("", tvItemModelInf.Error);

                // Act
                InfrastructureService infrastructureService = new InfrastructureService(languageEnum, user);
                InfrastructureModel infrastructureModel = infrastructureService.GetInfrastructureModelWithInfrastructureTVItemIDDB(tvItemModelInf.TVItemID);

                // Assert
                Assert.AreEqual("", infrastructureModel.Error);

                // Act
                partialViewResult = controller._GetLastUpdateAndTVText("Infrastructure", infrastructureModel.InfrastructureID, Offset_min);

                // Assert
                Assert.IsNotNull(partialViewResult);
                lastUpdateAndText = partialViewResult.ViewBag.LastUpdateAndTVText;
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Year, lastUpdateAndText.LastUpdateDate_UTC.Year);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Month, lastUpdateAndText.LastUpdateDate_UTC.Month);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Day, lastUpdateAndText.LastUpdateDate_UTC.Day);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Hour, lastUpdateAndText.LastUpdateDate_UTC.Hour);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Minute, lastUpdateAndText.LastUpdateDate_UTC.Minute);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Second, lastUpdateAndText.LastUpdateDate_UTC.Second);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Year, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Year);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Month, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Month);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Day, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Day);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Hour, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Hour);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Minute, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Minute);
                Assert.AreEqual(infrastructureModel.LastUpdateDate_UTC.Second, lastUpdateAndText.LastUpdateDate_Local.AddMinutes(Offset_min).Second);

                tvItemModelContact = controller._TVItemService.GetTVItemModelWithTVItemIDDB(infrastructureModel.LastUpdateContactTVItemID);
                Assert.AreEqual(tvItemModelContact.TVText, lastUpdateAndText.TVText);
            }
        }
        #endregion Testing Methods View

        #region Testing Methode Helper
        [TestMethod]
        public void BaseController_ConvertToInt_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<string> testIntStringList = new List<string>() { "23", "34", "3434" };

                    // Act
                    List<int> intList = controller.ConvertToInt(testIntStringList);

                    // Assert
                    Assert.AreEqual(23, intList[0]);
                    Assert.AreEqual(34, intList[1]);
                    Assert.AreEqual(3434, intList[2]);

                    testIntStringList = new List<string>() { };
                    intList = controller.ConvertToInt(testIntStringList);

                    // Act
                    Assert.AreEqual(0, intList.Count);

                    testIntStringList = new List<string>() { "" };
                    intList = controller.ConvertToInt(testIntStringList);

                    // Act
                    Assert.AreEqual(1, intList.Count);
                    Assert.AreEqual(0, intList[0]);

                    testIntStringList = new List<string>() { "1", "0" };
                    intList = controller.ConvertToInt(testIntStringList);

                    // Act
                    Assert.AreEqual(2, intList.Count);
                    Assert.AreEqual(1, intList[0]);
                    Assert.AreEqual(0, intList[1]);

                    testIntStringList = new List<string>() { "1", "0", "" };
                    intList = controller.ConvertToInt(testIntStringList);

                    // Act
                    Assert.AreEqual(3, intList.Count);
                    Assert.AreEqual(1, intList[0]);
                    Assert.AreEqual(0, intList[1]);
                    Assert.AreEqual(0, intList[2]);

                }
            }
        }
        [TestMethod]
        public void BaseController_CreateHashURL_1_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View/test|||1|||11";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Act
                TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();

                // Assert
                Assert.AreEqual("", tvItemModelRoot.Error);

                // Act
                TVItemModel tvItemModelProvince = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "fr" ? "Nouveau-Brunswick" : "New Brunswick"), TVTypeEnum.Province);

                // Assert
                Assert.AreEqual("", tvItemModelProvince.Error);

                // Act
                TVItemModel tvItemModelArea = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelProvince.TVItemID, "NB-06", TVTypeEnum.Area);

                // Assert
                Assert.AreEqual("", tvItemModelArea.Error);

                // Act
                string hashURL = controller.CreateHashURL(tvItemModelArea.TVItemID);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual("#!View/" +
                    (culture.TwoLetterISOLanguageName == "fr" ? "Nouveau-Brunswick" : "New Brunswick") + " - " +
                    tvItemModelArea.TVText + "|||" + tvItemModelArea.TVItemID + "|||" +
                    controller.urlModel.VariableShow, hashURL);
            }

        }
        [TestMethod]
        public void BaseController_CreateTempVariableShowHashURL_LoopURLVarShowEnum_1To9_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                int CountURLVarShowEnum = Enum.GetNames(typeof(URLVarShowEnum)).Length;
                for (int j = 0; j < CountURLVarShowEnum; j++)
                {
                    for (var i = 0; i < 10; i++)
                    {
                        string Q = "!View";
                        SetupTest(contactModelListGood[0], culture, Q);

                        controller.SetArgs(Q);

                        // Act
                        int TVItemID = 1;
                        string hashURL = controller.CreateTempVariableShowHashURL((URLVarShowEnum)j, i.ToString(), "0");

                        // Act
                        Assert.AreEqual("", controller.urlModel.Error);
                        string VarStr = StartVarShow;
                        string Res = VarStr.Remove(j, 1);
                        Res = Res.Insert(j, i.ToString());
                        Assert.AreEqual("#!View/" + ServiceRes.AllLocations + "|||" + TVItemID + "|||" + Res, hashURL);
                        if (j == 0)
                        {
                            Assert.AreEqual(GetVariableShow(StartVarShow, new List<URLVarShowEnum>() { (URLVarShowEnum)0 }, new List<string> { "0" }), controller.urlModel.VariableShow);
                        }
                        else
                        {
                            Assert.AreEqual(GetVariableShow(StartVarShow, new List<URLVarShowEnum>() { (URLVarShowEnum)0 }, new List<string> { "3" }), controller.urlModel.VariableShow);
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_CreateVariableShowHashURL_LoopURLVarShowEnum_1To9_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                int CountURLVarShowEnum = Enum.GetNames(typeof(URLVarShowEnum)).Length;
                for (int j = 0; j < CountURLVarShowEnum; j++)
                {
                    for (var i = 0; i < 10; i++)
                    {
                        string Q = "!View";
                        SetupTest(contactModelListGood[0], culture, Q);

                        controller.SetArgs(Q);

                        // Act
                        int TVItemID = 1;
                        string hashURL = controller.CreateVariableShowHashURL((URLVarShowEnum)j, i.ToString());

                        // Act
                        Assert.AreEqual("", controller.urlModel.Error);
                        string VarStr = StartVarShow;
                        string Res = VarStr.Remove(j, 1);
                        Res = Res.Insert(j, i.ToString());
                        Assert.AreEqual("#!View/" + ServiceRes.AllLocations + "|||" + TVItemID + "|||" + Res, hashURL);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillClimateSiteEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillClimateSiteEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbClimateSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbClimateSiteShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbClimateSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillClimateSiteIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                    controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillClimateSiteIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                // Act
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(2, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbClimateSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoListList[j][1], "", false, "jbClimateSiteShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }
                            }
                            else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                // Act
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbClimateSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                            }

                            bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                            if (ShowMoreInfo)
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-success", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }
                            else
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }

                }
            }
        }
        [TestMethod]
        public void BaseController_FillFileEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillFileEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbFileShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbFileImportShowHide btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbFileShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillFileGenerateIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillFileGenerateIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbCreateDocumentShowHide btn btn-default", "glyphicon glyphicon-cog", ControllerRes.ShowGenerateReport);
                    }
                    else
                    {
                        // Act
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillHydrometricSiteEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillHydrometricSiteEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbHydrometricSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbHydrometricSiteShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbHydrometricSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillHydrometricSiteIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                    controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillHydrometricSiteIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                // Act
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(2, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbHydrometricSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoListList[j][1], "", false, "jbHydrometricSiteShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }
                            }
                            else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                // Act
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbHydrometricSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                            }

                            bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                            if (ShowMoreInfo)
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-success", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }
                            else
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }

                }
            }
        }
        [TestMethod]
        public void BaseController_FillInfrastructureBoxModelAddIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillInfrastructureBoxModelAddIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbBoxModelScenarioCreate btn btn-default", "glyphicon glyphicon-plus", ControllerRes.AddNewBoxModelScenario);
                    }
                    else
                    {
                        // Act
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillInfrastructureBoxModelIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillInfrastructureBoxModelIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                                if (j == 0)
                                {
                                    Assert.AreEqual(1, iconInfoListList[0].Count);
                                    AssertIconList(iconInfoListList[0][0], "", true, "jbBoxModelScenarioCreate btn btn-default", "glyphicon glyphicon-plus", ControllerRes.AddNewBoxModelScenario);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(1, iconInfoListList.Count);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillInfrastructureEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillInfrastructureEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbInfrastructureEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else
                    {
                        // Act
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillInfrastructureInformationIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillInfrastructureInformationIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                                if (j == 0)
                                {
                                    Assert.AreEqual(1, iconInfoListList[0].Count);
                                    AssertIconList(iconInfoListList[0][0], "", true, "jbInfrastructureEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(1, iconInfoListList.Count);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }

                }
            }
        }
        [TestMethod]
        public void BaseController_FillInfrastructureVisualPlumeAddIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillInfrastructureVisualPlumeAddIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbVPScenarioCreate btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else
                    {
                        // Act
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillInfrastructureVisualPlumeIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillInfrastructureVisualPlumeIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                                if (j == 0)
                                {
                                    Assert.AreEqual(1, iconInfoListList[0].Count);
                                    AssertIconList(iconInfoListList[0][0], "", true, "jbVPScenarioCreate btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(1, iconInfoListList.Count);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillMikeScenarioEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else
                    {
                        // Assert
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioImportEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillMikeScenarioImportEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete);
                    }
                    else
                    {
                        // Assert
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioImportIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillMikeScenarioImportIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                                if (j == 0)
                                {
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMikeScenarioDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(1, iconInfoListList.Count);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }

                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioGeneralParametersEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    for (int k = 0, countStatus = Enum.GetNames(typeof(ScenarioStatusEnum)).Length; k < count; k++)
                    {
                        MikeScenarioModel mikeScenarioModel = new MikeScenarioModel() { MikeScenarioStatus = (ScenarioStatusEnum)k };
                        List<IconInfo> iconInfoList = controller.FillMikeScenarioGeneralParametersEditIcons((TVAuthEnum)i, mikeScenarioModel);

                        if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                        {
                            if (mikeScenarioModel.MikeScenarioStatus != ScenarioStatusEnum.Running)
                            {
                                if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Completed)
                                {
                                    // Assert
                                    Assert.AreEqual(2, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioCopy btn btn-default", "glyphicon glyphicon-duplicate", ControllerRes.Copy);
                                    AssertIconList(iconInfoList[1], "", true, "jbMikeScenarioDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete + " " + ControllerRes.MikeScenario);
                                }
                                else if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Changed)
                                {
                                    // Assert
                                    Assert.AreEqual(3, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioGeneralParametersEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoList[1], "", true, "jbMikeScenarioAskToRun btn btn-default", "glyphicon glyphicon-play", ControllerRes.AskToRun);
                                    AssertIconList(iconInfoList[2], "", true, "jbMikeScenarioDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete + " " + ControllerRes.MikeScenario);
                                }
                                else
                                {
                                    // Assert
                                    Assert.AreEqual(1, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete + " " + ControllerRes.MikeScenario);
                                }
                            }
                            else
                            {
                                Assert.AreEqual(0, iconInfoList.Count);
                            }
                        }
                        else if ((TVAuthEnum)i >= TVAuthEnum.Create)
                        {
                            if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Completed)
                            {
                                // Assert
                                Assert.AreEqual(1, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioCopy btn btn-default", "glyphicon glyphicon-duplicate", ControllerRes.Copy);
                            }
                            else if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Changed)
                            {
                                // Assert
                                Assert.AreEqual(2, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioGeneralParametersEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                AssertIconList(iconInfoList[1], "", true, "jbMikeScenarioAskToRun btn btn-default", "glyphicon glyphicon-play", ControllerRes.AskToRun);
                            }
                            else
                            {
                                Assert.AreEqual(0, iconInfoList.Count);
                            }
                        }
                        else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                        {
                            if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Changed)
                            {
                                // Assert
                                Assert.AreEqual(1, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioGeneralParametersEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                            }
                            else
                            {
                                Assert.AreEqual(0, iconInfoList.Count);
                            }
                        }
                        else
                        {
                            // Assert
                            Assert.AreEqual(0, iconInfoList.Count);
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioGeneralParametersIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        for (int l = 0, countStatus = Enum.GetNames(typeof(ScenarioStatusEnum)).Length; l < count; l++)
                        {
                            MikeScenarioModel mikeScenarioModel = new MikeScenarioModel() { MikeScenarioStatus = (ScenarioStatusEnum)l };
                            List<List<IconInfo>> iconInfoListList = controller.FillMikeScenarioGeneralParametersIcons((TVAuthEnum)i, mikeScenarioModel);

                            for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                    if (j == 0)
                                    {
                                        if (mikeScenarioModel.MikeScenarioStatus != ScenarioStatusEnum.Running)
                                        {
                                            if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Completed)
                                            {
                                                // Assert
                                                Assert.AreEqual(2, iconInfoListList[0].Count);
                                                AssertIconList(iconInfoListList[0][0], "", true, "jbMikeScenarioCopy btn btn-default", "glyphicon glyphicon-duplicate", ControllerRes.Copy);
                                                AssertIconList(iconInfoListList[0][1], "", true, "jbMikeScenarioDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete + " " + ControllerRes.MikeScenario);
                                            }
                                            else if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Changed)
                                            {
                                                // Assert
                                                Assert.AreEqual(3, iconInfoListList[0].Count);
                                                AssertIconList(iconInfoListList[0][0], "", true, "jbMikeScenarioGeneralParametersEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                                AssertIconList(iconInfoListList[0][1], "", true, "jbMikeScenarioAskToRun btn btn-default", "glyphicon glyphicon-play", ControllerRes.AskToRun);
                                                AssertIconList(iconInfoListList[0][2], "", true, "jbMikeScenarioDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete + " " + ControllerRes.MikeScenario);
                                            }
                                            else
                                            {
                                                // Assert
                                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                                AssertIconList(iconInfoListList[0][0], "", true, "jbMikeScenarioDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete + " " + ControllerRes.MikeScenario);
                                            }
                                        }
                                        else
                                        {
                                            Assert.AreEqual(0, iconInfoListList[0].Count);
                                        }
                                    }
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                    if (j == 0)
                                    {
                                        if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Completed)
                                        {
                                            // Assert
                                            Assert.AreEqual(1, iconInfoListList[0].Count);
                                            AssertIconList(iconInfoListList[0][0], "", true, "jbMikeScenarioCopy btn btn-default", "glyphicon glyphicon-duplicate", ControllerRes.Copy);
                                        }
                                        else if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Changed)
                                        {
                                            // Assert
                                            Assert.AreEqual(2, iconInfoListList[0].Count);
                                            AssertIconList(iconInfoListList[0][0], "", true, "jbMikeScenarioGeneralParametersEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                            AssertIconList(iconInfoListList[0][1], "", true, "jbMikeScenarioAskToRun btn btn-default", "glyphicon glyphicon-play", ControllerRes.AskToRun);
                                        }
                                        else
                                        {
                                            Assert.AreEqual(0, iconInfoListList[0].Count);
                                        }
                                    }
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                    if (j == 0)
                                    {
                                        if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Changed)
                                        {
                                            // Assert
                                            Assert.AreEqual(1, iconInfoListList[0].Count);
                                            AssertIconList(iconInfoListList[0][0], "", true, "jbMikeScenarioGeneralParametersEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        }
                                        else
                                        {
                                            Assert.AreEqual(0, iconInfoListList[0].Count);
                                        }
                                    }
                                }
                                else
                                {
                                    // Assert
                                    Assert.AreEqual(1, iconInfoListList[0].Count);
                                }

                                bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                if (ShowMap)
                                {
                                    Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioInputSummaryIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillMikeScenarioInputSummaryIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            Assert.AreEqual(1, iconInfoListList[0].Count);

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioSourcesEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    for (int k = 0, countStatus = Enum.GetNames(typeof(ScenarioStatusEnum)).Length; k < count; k++)
                    {
                        MikeScenarioModel mikeScenarioModel = new MikeScenarioModel() { MikeScenarioStatus = (ScenarioStatusEnum)k };
                        List<IconInfo> iconInfoList = controller.FillMikeScenarioSourcesEditIcons((TVAuthEnum)i, mikeScenarioModel);

                        if ((TVAuthEnum)i >= TVAuthEnum.Create)
                        {
                            if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Changed)
                            {
                                // Assert
                                Assert.AreEqual(1, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioSourceShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add + " " + ControllerRes.MikeSource);
                            }
                            else
                            {
                                // Assert
                                Assert.AreEqual(0, iconInfoList.Count);
                            }
                        }
                        else
                        {
                            // Assert
                            Assert.AreEqual(0, iconInfoList.Count);
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioSourcesIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        for (int l = 0, countStatus = Enum.GetNames(typeof(ScenarioStatusEnum)).Length; l < count; l++)
                        {
                            MikeScenarioModel mikeScenarioModel = new MikeScenarioModel() { MikeScenarioStatus = (ScenarioStatusEnum)l };
                            List<List<IconInfo>> iconInfoListList = controller.FillMikeScenarioSourcesIcons((TVAuthEnum)i, mikeScenarioModel);

                            for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                    if (j == 0)
                                    {
                                        if (mikeScenarioModel.MikeScenarioStatus == ScenarioStatusEnum.Changed)
                                        {
                                            // Assert
                                            Assert.AreEqual(1, iconInfoListList[0].Count);
                                            AssertIconList(iconInfoListList[0][0], "", true, "jbMikeScenarioSourceShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add + " " + ControllerRes.MikeSource);
                                        }
                                        else
                                        {
                                            // Assert
                                            Assert.AreEqual(0, iconInfoListList[0].Count);
                                        }
                                    }
                                }
                                else
                                {
                                    // Assert
                                    Assert.AreEqual(1, iconInfoListList[0].Count);
                                }

                                bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                if (ShowMap)
                                {
                                    Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioToolsIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                    controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillMikeScenarioToolsIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if (j == 1)
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    // Assert
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    Assert.AreEqual(2, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMikeScenarioShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoListList[j][1], "", false, "jbMikeScenarioSourceEditAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                {
                                    // Assert
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMikeScenarioShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                                else
                                {
                                    // Assert
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                }
                            }

                            bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                            if (ShowMoreInfo)
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-success", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }
                            else
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMikeScenarioToolsEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillMikeScenarioToolsEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbMikeScenarioSourceEditAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMikeScenarioShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else
                    {
                        // Assert
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMunicipalityContactIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                    controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillMunicipalityContactIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(2, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbContactShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoListList[j][1], "", false, "jbContactShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }
                            }
                            else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                // Act
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbContactShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                            }

                            bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                            if (ShowMoreInfo)
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-success", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }
                            else
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }
                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMunicipalityContactEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillMunicipalityContactEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbContactShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbContactShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbContactShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else
                    {
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMunicipalityEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                List<TVTypeEnum> tvTypeList = new List<TVTypeEnum>() { TVTypeEnum.Root, TVTypeEnum.Country, TVTypeEnum.Province, TVTypeEnum.Area, TVTypeEnum.Sector, TVTypeEnum.Subsector, TVTypeEnum.Municipality };

                foreach (TVTypeEnum tvType in tvTypeList)
                {
                    TVItemModel tvItemModel = randomService.RandomTVItem(tvType);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        for (int l = 0, countStatus = Enum.GetNames(typeof(ScenarioStatusEnum)).Length; l < count; l++)
                        {
                            List<IconInfo> iconInfoList = controller.FillMunicipalityEditIcons((TVAuthEnum)i, tvItemModel);

                            if (tvType == TVTypeEnum.Subsector)
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    Assert.AreEqual(2, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoList[1], "", false, "jbTVItemShowAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                {
                                    Assert.AreEqual(1, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                                else
                                {
                                    Assert.AreEqual(0, iconInfoList.Count);
                                }
                            }
                            else
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    Assert.AreEqual(1, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                {
                                    Assert.AreEqual(1, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                                else
                                {
                                    Assert.AreEqual(0, iconInfoList.Count);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMWQMPlanEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillMWQMPlanEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMWQMPlanEditShowHide btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbMWQMPlanAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMWQMPlanEditShowHide btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else
                    {
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMWQMRunEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillMWQMRunEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMWQMRunShowHideEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbMWQMRunDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMWQMRunShowHideEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMWQMRunShowHideEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else
                    {
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMWQMRunIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                    controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillMWQMRunIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                            {
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(2, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMWQMRunShowHideEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoListList[j][1], "", false, "jbMWQMRunDelete btn btn-default", "glyphicon glyphicon-trash", ControllerRes.Delete);
                                }
                            }
                            else if((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMWQMRunShowHideEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                            }
                            else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMWQMRunShowHideEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                            }

                            bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                            if (ShowMoreInfo)
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-success", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }
                            else
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }
                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillMWQMSiteMapIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                List<TVTypeEnum> tvTypeList = new List<TVTypeEnum>() { TVTypeEnum.Area, TVTypeEnum.Subsector, TVTypeEnum.MWQMSite };

                foreach (TVTypeEnum tvType in tvTypeList)
                {
                    TVItemModel tvItemModel = randomService.RandomTVItem(tvType);


                    for (int k = 0; k < 2; k++)
                    {
                        controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                        bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

                        for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                        {
                            List<IconInfo> iconInfoList = controller.FillMWQMSiteMapIcons((TVAuthEnum)i, tvItemModel);

                            if (ShowMap)
                            {
                                if (tvType == TVTypeEnum.MWQMSite)
                                {
                                    // Act
                                    Assert.AreEqual(4, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                    AssertIconList(iconInfoList[1], "", true, "jbMWQMSiteShowHideOnMap btn btn-default", "glyphicon glyphicon-map-marker", ControllerRes.MWQMSiteShowOnMap);
                                    AssertIconList(iconInfoList[2], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoList[3], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    // Act
                                    Assert.AreEqual(3, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                    AssertIconList(iconInfoList[1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoList[2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(1, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillPolSourceSiteMapIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                List<TVTypeEnum> tvTypeList = new List<TVTypeEnum>() { TVTypeEnum.Area, TVTypeEnum.Subsector, TVTypeEnum.PolSourceSite };

                foreach (TVTypeEnum tvType in tvTypeList)
                {
                    TVItemModel tvItemModel = randomService.RandomTVItem(tvType);


                    for (int k = 0; k < 2; k++)
                    {
                        controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                        bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

                        for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                        {
                            List<IconInfo> iconInfoList = controller.FillPolSourceSiteMapIcons((TVAuthEnum)i, tvItemModel);

                            if (ShowMap)
                            {
                                if (tvType == TVTypeEnum.PolSourceSite)
                                {
                                    // Act
                                    Assert.AreEqual(4, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                    AssertIconList(iconInfoList[1], "", true, "jbPolSourceSiteShowHideOnMap btn btn-default", "glyphicon glyphicon-map-marker", ControllerRes.PolSourceSiteShowOnMap);
                                    AssertIconList(iconInfoList[2], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoList[3], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    // Act
                                    Assert.AreEqual(3, iconInfoList.Count);
                                    AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                    AssertIconList(iconInfoList[1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoList[2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(1, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTideSiteEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillTideSiteEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbTideSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbTideSiteShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbTideSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTideSiteIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                    controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());

                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillTideSiteIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                // Act
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(2, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbTideSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoListList[j][1], "", false, "jbTideSiteShowHideAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }
                            }
                            else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                // Act
                                Assert.AreEqual(3, iconInfoListList.Count);
                                if (j == 1)
                                {
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbTideSiteShowEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(2, iconInfoListList.Count);
                            }

                            bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                            if (ShowMoreInfo)
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-success", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }
                            else
                            {
                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                            }
                            else
                            {
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                            }
                        }
                    }

                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillTVItemEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbTVItemShowAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else
                    {
                        // Act
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemFileIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    for (int l = 0; l < 1; l++)
                    {
                        controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                        controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, l.ToString());

                        TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                        for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                        {
                            List<List<IconInfo>> iconInfoListList = controller.FillTVItemFileIcons((TVAuthEnum)i);

                            for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                                {
                                    Assert.AreEqual(4, iconInfoListList.Count);
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(2, iconInfoListList[1].Count);
                                        AssertIconList(iconInfoListList[1][0], "", true, "jbFileShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        AssertIconList(iconInfoListList[1][1], "", false, "jbFileImportShowHide btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                    }
                                    if (j == 2)
                                    {
                                        Assert.AreEqual(1, iconInfoListList[2].Count);
                                        AssertIconList(iconInfoListList[2][0], "", true, "jbCreateDocumentShowHide btn btn-default", "glyphicon glyphicon-cog", ControllerRes.ShowGenerateReport);
                                    }
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    Assert.AreEqual(4, iconInfoListList.Count);
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(2, iconInfoListList[1].Count);
                                        AssertIconList(iconInfoListList[1][0], "", true, "jbFileShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        AssertIconList(iconInfoListList[1][1], "", false, "jbFileImportShowHide btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                    }
                                    if (j == 2)
                                    {
                                        Assert.AreEqual(1, iconInfoListList[2].Count);
                                        AssertIconList(iconInfoListList[2][0], "", true, "jbCreateDocumentShowHide btn btn-default", "glyphicon glyphicon-cog", ControllerRes.ShowGenerateReport);
                                    }
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                {
                                    Assert.AreEqual(4, iconInfoListList.Count);
                                    if (j == 0)
                                    {
                                        // done below
                                    }
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(1, iconInfoListList[1].Count);
                                        AssertIconList(iconInfoListList[1][0], "", true, "jbFileShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    }
                                    if (j == 2)
                                    {
                                        Assert.AreEqual(0, iconInfoListList[2].Count);
                                    }
                                    if (j == 3)
                                    {
                                        // done below
                                    }
                                }
                                else
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                }

                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                                if (ShowMoreInfo)
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-default", "glyphicon glyphicon-tasks", ControllerRes.ShowMoreInformation);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                                }

                                bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                if (ShowMap)
                                {
                                    Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    for (int l = 0; l < 1; l++)
                    {
                        controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                        controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, l.ToString());

                        TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                        for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                        {
                            List<List<IconInfo>> iconInfoListList = controller.FillTVItemIcons((TVAuthEnum)i);

                            for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    if (j == 0)
                                    {
                                        // done below
                                    }
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(2, iconInfoListList[1].Count);
                                        AssertIconList(iconInfoListList[1][0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        AssertIconList(iconInfoListList[1][1], "", false, "jbTVItemShowAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                    }
                                    if (j == 2)
                                    {
                                        // done below
                                    }
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                {
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    if (j == 0)
                                    {
                                        // done below
                                    }
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(1, iconInfoListList[1].Count);
                                        AssertIconList(iconInfoListList[1][0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    }
                                    if (j == 2)
                                    {
                                        // done below
                                    }
                                }
                                else
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                }

                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                                if (ShowMoreInfo)
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-default", "glyphicon glyphicon-tasks", ControllerRes.ShowMoreInformation);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                                }

                                bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                if (ShowMap)
                                {
                                    Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemInfrastructureEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillTVItemInfrastructureEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbInfrastructureShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbInfrastructureCreateShowHide btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbInfrastructureShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else
                    {
                        // Act
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemInfrastructuresIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    for (int l = 0; l < 1; l++)
                    {
                        controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                        controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, l.ToString());

                        TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                        for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                        {
                            List<List<IconInfo>> iconInfoListList = controller.FillTVItemInfrastructuresIcons((TVAuthEnum)i);

                            for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(2, iconInfoListList[j].Count);
                                        AssertIconList(iconInfoListList[j][0], "", true, "jbInfrastructureShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        AssertIconList(iconInfoListList[j][1], "", false, "jbInfrastructureCreateShowHide btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                    }
                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                {
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(1, iconInfoListList[j].Count);
                                        AssertIconList(iconInfoListList[j][0], "", true, "jbInfrastructureShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    }
                                }
                                else
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                }

                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                                if (ShowMoreInfo)
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "", "glyphicon glyphicon-tasks", ControllerRes.ShowMoreInformation);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                                }

                                bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                if (ShowMap)
                                {
                                    Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemMapIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int k = 0; k < 2; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                    bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<IconInfo> iconInfoList = controller.FillTVItemMapIcons((TVAuthEnum)i);

                        if (ShowMap)
                        {
                            // Act
                            Assert.AreEqual(3, iconInfoList.Count);
                            AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                            AssertIconList(iconInfoList[1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                            AssertIconList(iconInfoList[2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                        }
                        else
                        {
                            // Act
                            Assert.AreEqual(1, iconInfoList.Count);
                            AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                        }

                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemMikeScenarioIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                for (int k = 0; k < 1; k++)
                {
                    for (int l = 0; l < 1; l++)
                    {
                        controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                        controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, l.ToString());

                        TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                        for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                        {
                            List<List<IconInfo>> iconInfoListList = controller.FillTVItemMikeScenarioIcons((TVAuthEnum)i);

                            for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                            {
                                if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(1, iconInfoListList[j].Count);
                                        AssertIconList(iconInfoListList[j][0], "", true, "jbMikeScenarioAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                    }
                                }
                                else
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                }

                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                                if (ShowMoreInfo)
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "", "glyphicon glyphicon-tasks", ControllerRes.ShowMoreInformation);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                                }

                                bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                if (ShowMap)
                                {
                                    Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemMoreInfoIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int k = 0; k < 2; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());
                    bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<IconInfo> iconInfoList = controller.FillTVItemMoreInfoIcons((TVAuthEnum)i);

                        if (ShowMoreInfo)
                        {
                            // Act
                            Assert.AreEqual(1, iconInfoList.Count);
                            AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-success", "glyphicon glyphicon-info-sign", ControllerRes.ShowMoreInformation);
                        }
                        else
                        {
                            // Act
                            Assert.AreEqual(1, iconInfoList.Count);
                            AssertIconList(iconInfoList[0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                        }

                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemMunicipalityIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                List<TVTypeEnum> tvTypeList = new List<TVTypeEnum>() { TVTypeEnum.Root, TVTypeEnum.Country, TVTypeEnum.Province, TVTypeEnum.Area, TVTypeEnum.Sector, TVTypeEnum.Subsector, TVTypeEnum.Municipality };

                foreach (TVTypeEnum tvType in tvTypeList)
                {
                    TVItemModel tvItemModel = randomService.RandomTVItem(tvType);

                    for (int k = 0; k < 1; k++)
                    {
                        controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                        controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());

                        for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                        {
                            List<List<IconInfo>> iconInfoListList = controller.FillTVItemMunicipalityIcons((TVAuthEnum)i, tvItemModel);

                            for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                            {
                                if (tvType == TVTypeEnum.Subsector)
                                {
                                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                    {
                                        Assert.AreEqual(3, iconInfoListList.Count);
                                        if (j == 1)
                                        {
                                            Assert.AreEqual(2, iconInfoListList[1].Count);
                                            AssertIconList(iconInfoListList[1][0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                            AssertIconList(iconInfoListList[1][1], "", false, "jbTVItemShowAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                        }

                                    }
                                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                    {
                                        Assert.AreEqual(3, iconInfoListList.Count);
                                        if (j == 1)
                                        {
                                            Assert.AreEqual(1, iconInfoListList[1].Count);
                                            AssertIconList(iconInfoListList[1][0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        }
                                    }
                                    else
                                    {
                                        // Act
                                        Assert.AreEqual(2, iconInfoListList.Count);
                                    }
                                }
                                else
                                {
                                    if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                    {
                                        Assert.AreEqual(3, iconInfoListList.Count);
                                        if (j == 1)
                                        {
                                            Assert.AreEqual(1, iconInfoListList[1].Count);
                                            AssertIconList(iconInfoListList[1][0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        }

                                    }
                                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                    {
                                        Assert.AreEqual(3, iconInfoListList.Count);
                                        if (j == 1)
                                        {
                                            Assert.AreEqual(1, iconInfoListList[1].Count);
                                            AssertIconList(iconInfoListList[1][0], "", true, "jbTVItemShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        }
                                    }
                                    else
                                    {
                                        // Act
                                        Assert.AreEqual(2, iconInfoListList.Count);
                                    }
                                }

                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                                if (ShowMoreInfo)
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "", "glyphicon glyphicon-tasks", ControllerRes.ShowMoreInformation);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                                }

                                bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                if (ShowMap)
                                {
                                    Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemMWQMPlanIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int k = 0; k < 1; k++)
                {
                    controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<List<IconInfo>> iconInfoListList = controller.FillTVItemMWQMPlanIcons((TVAuthEnum)i);

                        for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                            {
                                Assert.AreEqual(2, iconInfoListList.Count);
                                if (j == 0)
                                {
                                    Assert.AreEqual(2, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMWQMPlanEditShowHide btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoListList[j][1], "", false, "jbMWQMPlanAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }

                            }
                            else if ((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                Assert.AreEqual(2, iconInfoListList.Count);
                                if (j == 0)
                                {
                                    Assert.AreEqual(2, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMWQMPlanEditShowHide btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    AssertIconList(iconInfoListList[j][1], "", false, "jbMWQMPlanAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                }

                            }
                            else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                Assert.AreEqual(2, iconInfoListList.Count);
                                if (j == 0)
                                {
                                    Assert.AreEqual(1, iconInfoListList[j].Count);
                                    AssertIconList(iconInfoListList[j][0], "", true, "jbMWQMPlanEditShowHide btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                }
                            }
                            else
                            {
                                // Act
                                Assert.AreEqual(1, iconInfoListList.Count);
                            }

                            bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                            if (ShowMap)
                            {
                                Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemMWQMSiteEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                {
                    List<IconInfo> iconInfoList = controller.FillTVItemMWQMSiteEditIcons((TVAuthEnum)i);

                    if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMWQMSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbMWQMSiteAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Create)
                    {
                        // Act
                        Assert.AreEqual(2, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMWQMSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                        AssertIconList(iconInfoList[1], "", false, "jbMWQMSiteAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                    }
                    else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                    {
                        // Act
                        Assert.AreEqual(1, iconInfoList.Count);
                        AssertIconList(iconInfoList[0], "", true, "jbMWQMSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                    }
                    else
                    {
                        // Act
                        Assert.AreEqual(0, iconInfoList.Count);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemMWQMSiteIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                List<TVTypeEnum> tvTypeList = new List<TVTypeEnum>() { TVTypeEnum.Root, TVTypeEnum.Country, TVTypeEnum.Province, TVTypeEnum.Area, TVTypeEnum.Sector, TVTypeEnum.Subsector, TVTypeEnum.Municipality };

                foreach (TVTypeEnum tvType in tvTypeList)
                {
                    TVItemModel tvItemModel = randomService.RandomTVItem(tvType);

                    for (int k = 0; k < 1; k++)
                    {
                        controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                        controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, k.ToString());

                        for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                        {
                            List<List<IconInfo>> iconInfoListList = controller.FillTVItemMWQMSiteIcons((TVAuthEnum)i, tvItemModel);

                            for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                            {

                                if ((TVAuthEnum)i >= TVAuthEnum.Delete)
                                {
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(2, iconInfoListList[1].Count);
                                        AssertIconList(iconInfoListList[1][0], "", true, "jbMWQMSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        AssertIconList(iconInfoListList[1][1], "", false, "jbMWQMSiteAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                    }

                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                {
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(2, iconInfoListList[1].Count);
                                        AssertIconList(iconInfoListList[1][0], "", true, "jbMWQMSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                        AssertIconList(iconInfoListList[1][1], "", false, "jbMWQMSiteAdd btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                    }

                                }
                                else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                {
                                    Assert.AreEqual(3, iconInfoListList.Count);
                                    if (j == 1)
                                    {
                                        Assert.AreEqual(1, iconInfoListList[1].Count);
                                        AssertIconList(iconInfoListList[1][0], "", true, "jbMWQMSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                    }
                                }
                                else
                                {
                                    // Act
                                    Assert.AreEqual(2, iconInfoListList.Count);
                                }

                                Assert.AreEqual(1, iconInfoListList[0].Count);
                                bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                                if (ShowMoreInfo)
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "", "glyphicon glyphicon-tasks", ControllerRes.ShowMoreInformation);
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                                }

                                bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                if (ShowMap)
                                {
                                    if (tvType == TVTypeEnum.MWQMSite)
                                    {
                                        // Act
                                        Assert.AreEqual(4, iconInfoListList[iconInfoListList.Count - 1].Count);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMWQMSiteShowHideOnMap btn btn-default", "glyphicon glyphicon-map-marker", ControllerRes.MWQMSiteShowOnMap);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][3], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                                    }
                                    else
                                    {
                                        // Act
                                        Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "GlobeIcon btn btn-success", "glyphicon glyphicon-globe", ControllerRes.HideMap);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger btn btn-default", "glyphicon glyphicon-circle-arrow-left", ControllerRes.ShowBiggerMap);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller btn btn-default", "glyphicon glyphicon-circle-arrow-right", ControllerRes.ShowSmallerMap);
                                    }
                                }
                                else
                                {
                                    AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemPolSourceSiteEditIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                List<TVTypeEnum> tvTypeList = new List<TVTypeEnum>() { TVTypeEnum.Subsector, TVTypeEnum.PolSourceSite, TVTypeEnum.Area };

                foreach (TVTypeEnum tvType in tvTypeList)
                {
                    TVItemModel tvItemModel = randomService.RandomTVItem(tvType);

                    for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                    {
                        List<IconInfo> iconInfoList = controller.FillTVItemPolSourceSiteEditIcons((TVAuthEnum)i, tvItemModel);

                        if (tvType == TVTypeEnum.Subsector)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Create)
                            {
                                Assert.AreEqual(2, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], "", true, "jbPolSourceSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                AssertIconList(iconInfoList[1], "", false, "jbPolSourceSiteAddShowHide btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                            }
                            else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                Assert.AreEqual(1, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], "", true, "jbPolSourceSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                            }
                            else
                            {
                                Assert.AreEqual(0, iconInfoList.Count);
                            }
                        }
                        else if (tvType == TVTypeEnum.PolSourceSite)
                        {
                            if ((TVAuthEnum)i >= TVAuthEnum.Write)
                            {
                                Assert.AreEqual(1, iconInfoList.Count);
                                AssertIconList(iconInfoList[0], "", true, "jbPolSourceSiteEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                            }
                            else
                            {
                                Assert.AreEqual(0, iconInfoList.Count);
                            }
                        }
                        else
                        {
                            Assert.AreEqual(0, iconInfoList.Count);
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_FillTVItemPolSourceSiteIcons_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                List<TVTypeEnum> tvTypeList = new List<TVTypeEnum>() { TVTypeEnum.Subsector, TVTypeEnum.PolSourceSite };

                foreach (TVTypeEnum tvType in tvTypeList)
                {
                    TVItemModel tvItemModel = randomService.RandomTVItem(tvType);

                    for (int k = 0; k < 1; k++)
                    {
                        for (int l = 0; l < 1; l++)
                        {
                            controller.SetVariableShow(URLVarShowEnum.ShowMap, k.ToString());
                            controller.SetVariableShow(URLVarShowEnum.ShowMoreInfo, l.ToString());

                            for (int i = 0, count = Enum.GetNames(typeof(TVAuthEnum)).Length; i < count; i++)
                            {
                                List<List<IconInfo>> iconInfoListList = controller.FillTVItemPolSourceSiteIcons((TVAuthEnum)i, tvItemModel);

                                for (int j = 0, countList = iconInfoListList.Count; j < countList; j++)
                                {
                                    if (tvType == TVTypeEnum.Subsector)
                                    {
                                        if ((TVAuthEnum)i >= TVAuthEnum.Create)
                                        {
                                            Assert.AreEqual(3, iconInfoListList.Count);
                                            if (j == 1)
                                            {
                                                Assert.AreEqual(2, iconInfoListList[j].Count);
                                                AssertIconList(iconInfoListList[j][0], "", true, "jbPolSourceSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                                AssertIconList(iconInfoListList[j][1], "", false, "jbPolSourceSiteAddShowHide btn btn-default", "glyphicon glyphicon-plus", ControllerRes.Add);
                                            }
                                        }
                                        else if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                        {
                                            Assert.AreEqual(3, iconInfoListList.Count);
                                            if (j == 1)
                                            {
                                                Assert.AreEqual(1, iconInfoListList[j].Count);
                                                AssertIconList(iconInfoListList[j][0], "", true, "jbPolSourceSiteShowHideEditButtons btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                            }
                                        }
                                        else
                                        {
                                            Assert.AreEqual(2, iconInfoListList.Count);
                                        }
                                    }
                                    else if (tvType == TVTypeEnum.PolSourceSite)
                                    {
                                        if ((TVAuthEnum)i >= TVAuthEnum.Write)
                                        {
                                            Assert.AreEqual(3, iconInfoListList.Count);
                                            if (j == 1)
                                            {
                                                Assert.AreEqual(1, iconInfoListList[j].Count);
                                                AssertIconList(iconInfoListList[j][0], "", true, "jbPolSourceSiteEdit btn btn-default", "glyphicon glyphicon-edit", ControllerRes.Edit);
                                            }
                                        }
                                        else
                                        {
                                            Assert.AreEqual(2, iconInfoListList.Count);
                                        }
                                    }
                                    else
                                    {
                                        Assert.AreEqual(2, iconInfoListList.Count);
                                    }

                                    Assert.AreEqual(1, iconInfoListList[0].Count);
                                    bool ShowMoreInfo = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
                                    if (ShowMoreInfo)
                                    {
                                        AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"), true, "btn btn-default", "glyphicon glyphicon-tasks", ControllerRes.ShowMoreInformation);
                                    }
                                    else
                                    {
                                        AssertIconList(iconInfoListList[0][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"), true, "btn btn-default", "glyphicon glyphicon-info-sign", ControllerRes.ShowBasicInformation);
                                    }

                                    bool ShowMap = (controller.GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
                                    if (ShowMap)
                                    {
                                        Assert.AreEqual(3, iconInfoListList[iconInfoListList.Count - 1].Count);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"), true, "", "glyphicon glyphicon-globe text-danger", ControllerRes.HideMap);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][1], "", true, "jbMapSizeBigger", "glyphicon glyphicon-circle-arrow-right text-success", ControllerRes.ShowBiggerMap);
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][2], "", true, "jbMapSizeSmaller", "glyphicon glyphicon-circle-arrow-left text-success", ControllerRes.ShowSmallerMap);
                                    }
                                    else
                                    {
                                        AssertIconList(iconInfoListList[iconInfoListList.Count - 1][0], controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"), true, "GlobeIcon btn btn-default", "glyphicon glyphicon-globe", ControllerRes.ShowMap);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetURLVarShowEnumStr_LoopURLVarShowEnum_1To9_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                int CountURLVarShowEnum = Enum.GetNames(typeof(URLVarShowEnum)).Length;
                for (int j = 0; j < CountURLVarShowEnum; j++)
                {
                    for (var i = 0; i < 10; i++)
                    {
                        string Q = "!View";
                        SetupTest(contactModelListGood[0], culture, Q);

                        controller.SetArgs(Q);

                        // Act
                        controller.SetVariableShow((URLVarShowEnum)j, i.ToString());
                        string retStr = controller.GetURLVarShowEnumStr((URLVarShowEnum)j);

                        // Act
                        Assert.AreEqual("", controller.urlModel.Error);
                        Assert.AreEqual(i.ToString(), retStr);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_Area_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelArea = randomService.RandomTVItem(TVTypeEnum.Area);

                // Assert
                Assert.AreEqual("", tvItemModelArea.Error);

                // Act
                TVItemModel tvItemModelParent = controller._TVItemService.GetTVItemModelWithTVItemIDDB((int)tvItemModelArea.ParentID);

                // Assert
                Assert.AreEqual("", tvItemModelParent.Error);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelArea.TVItemID);
                Assert.AreEqual(tvItemModelParent.TVText + " - " + tvItemModelArea.TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_Country_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelCountry = randomService.RandomTVItem(TVTypeEnum.Country);

                // Assert
                Assert.AreEqual("", tvItemModelCountry.Error);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelCountry.TVItemID);
                Assert.AreEqual(tvItemModelCountry.TVText, baseTVText);
            }

        }
        [TestMethod]
        public void BaseController_GetBaseTVText_Infrastructure_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelRoot = controller._TVItemService.GetRootTVItemModelDB();

                // Assert
                Assert.AreEqual("", tvItemModelRoot.Error);

                // Act
                TVItemModel tvItemModelMunicipality = controller._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                // Assert
                Assert.AreEqual("", tvItemModelMunicipality.Error);

                // Act
                List<TVItemModel> tvItemModelInfrastructureList = controller._TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMunicipality.TVItemID, TVTypeEnum.Infrastructure);

                // Assert
                Assert.IsTrue(tvItemModelInfrastructureList.Count > 0);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelInfrastructureList[0].TVItemID);
                Assert.AreEqual(tvItemModelMunicipality.TVText + " - " + tvItemModelInfrastructureList[0].TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_MWQMSite_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelRoot = controller._TVItemService.GetRootTVItemModelDB();

                // Assert
                Assert.AreEqual("", tvItemModelRoot.Error);

                // Act
                TVItemModel tvItemModelSubsector = controller._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "NB-06-020-002", TVTypeEnum.Subsector);

                // Assert
                Assert.AreEqual("", tvItemModelSubsector.Error);

                // Act
                List<TVItemModel> tvItemModelMWQMSiteList = controller._TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelSubsector.TVItemID, TVTypeEnum.MWQMSite);

                // Assert
                Assert.IsTrue(tvItemModelMWQMSiteList.Count > 0);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelMWQMSiteList[0].TVItemID);
                Assert.AreEqual(tvItemModelSubsector.TVText + " - " + tvItemModelMWQMSiteList[0].TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_MikeScenario_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelRoot = controller._TVItemService.GetRootTVItemModelDB();

                // Assert
                Assert.AreEqual("", tvItemModelRoot.Error);

                // Act
                TVItemModel tvItemModelMunicipality = controller._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                // Assert
                Assert.AreEqual("", tvItemModelMunicipality.Error);

                // Act
                List<TVItemModel> tvItemModelMikeScenarioList = controller._TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMunicipality.TVItemID, TVTypeEnum.MikeScenario);

                // Assert
                Assert.IsTrue(tvItemModelMikeScenarioList.Count > 0);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelMikeScenarioList[0].TVItemID);
                Assert.AreEqual(tvItemModelMunicipality.TVText + " - " + tvItemModelMikeScenarioList[0].TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_Municipality_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);

                // Assert
                Assert.AreEqual("", tvItemModelMunicipality.Error);

                // Act
                List<TVItemModel> tvItemModelParentList = controller._TVItemService.GetParentTVItemModelListWithTVItemIDForLocationDB(tvItemModelMunicipality.TVItemID);

                // Assert
                Assert.IsTrue(tvItemModelParentList.Count > 0);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelMunicipality.TVItemID);
                Assert.AreEqual(tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Province).FirstOrDefault().TVText + " - " + tvItemModelMunicipality.TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_PolSourceSite_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelRoot = controller._TVItemService.GetRootTVItemModelDB();

                // Assert
                Assert.AreEqual("", tvItemModelRoot.Error);

                // Act
                TVItemModel tvItemModelSubsector = controller._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "NB-06-020-002", TVTypeEnum.Subsector);

                // Assert
                Assert.AreEqual("", tvItemModelSubsector.Error);

                // Act
                List<TVItemModel> tvItemModelPolSourceSiteList = controller._TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelSubsector.TVItemID, TVTypeEnum.PolSourceSite);

                // Assert
                Assert.IsTrue(tvItemModelPolSourceSiteList.Count > 0);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelPolSourceSiteList[0].TVItemID);
                Assert.AreEqual(tvItemModelSubsector.TVText + " - " + tvItemModelPolSourceSiteList[0].TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_Province_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelProvince = randomService.RandomTVItem(TVTypeEnum.Province);

                // Assert
                Assert.AreEqual("", tvItemModelProvince.Error);

                // Act
                TVItemModel tvItemModelParent = controller._TVItemService.GetTVItemModelWithTVItemIDDB((int)tvItemModelProvince.ParentID);

                // Assert
                Assert.AreEqual("", tvItemModelParent.Error);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelProvince.TVItemID);
                Assert.AreEqual(tvItemModelParent.TVText + " - " + tvItemModelProvince.TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_Root_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                TVItemModel tvItemModel = controller._TVItemService.GetRootTVItemModelDB();

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModel.TVItemID);
                Assert.AreEqual(ServiceRes.AllLocations, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_Sector_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                // Act
                TVItemModel tvItemModelSector = randomService.RandomTVItem(TVTypeEnum.Sector);

                // Assert
                Assert.AreEqual("", tvItemModelSector.Error);

                // Act
                TVItemModel tvItemModelParent = controller._TVItemService.GetTVItemModelWithTVItemIDDB((int)tvItemModelSector.ParentID);

                // Assert
                Assert.AreEqual("", tvItemModelParent.Error);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelSector.TVItemID);
                Assert.AreEqual(tvItemModelParent.TVText + " - " + tvItemModelSector.TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_Subsector_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");


                // Act
                TVItemModel tvItemModelSubsector = randomService.RandomTVItem(TVTypeEnum.Subsector);

                // Assert
                Assert.AreEqual("", tvItemModelSubsector.Error);

                // Act
                TVItemModel tvItemModelParent = controller._TVItemService.GetTVItemModelWithTVItemIDDB((int)tvItemModelSubsector.ParentID);

                // Assert
                Assert.AreEqual("", tvItemModelParent.Error);

                // Act
                string baseTVText = controller.GetBaseTVText(tvItemModelSubsector.TVItemID);
                Assert.AreEqual(tvItemModelParent.TVText + " - " + tvItemModelSubsector.TVText, baseTVText);
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_GetTVItemModelWithTVItemIDDB_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                TVItemModel tvItemModel = controller._TVItemService.GetRootTVItemModelDB();

                using (ShimsContext.Create())
                {
                    string ErrorText = "ErrorText";
                    SetupShim();
                    shimTVItemService.GetTVItemModelWithTVItemIDDBInt32 = (a) =>
                    {
                        return new TVItemModel() { Error = ErrorText };
                    };

                    // Act
                    string baseTVText = controller.GetBaseTVText(tvItemModel.TVItemID);

                    // Assert
                    Assert.AreEqual(ErrorText, baseTVText);
                }
            }
        }
        [TestMethod]
        public void BaseController_GetBaseTVText_GetParentTVItemModelListWithTVItemIDForLocationDB_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, "");

                TVItemModel tvItemModel = controller._TVItemService.GetRootTVItemModelDB();

                using (ShimsContext.Create())
                {
                    //string ErrorText = "ErrorText";
                    SetupShim();
                    shimTVItemService.GetParentTVItemModelListWithTVItemIDForLocationDBInt32 = (a) =>
                    {
                        return new List<TVItemModel>() { new TVItemModel() };
                    };

                    // Act
                    string baseTVText = controller.GetBaseTVText(tvItemModel.TVItemID);

                    // Assert
                    Assert.AreEqual(string.Format(ServiceRes.TVItemModelParentListCountShoulBe_, tvItemModel.TVLevel), baseTVText);
                }
            }
        }
        [TestMethod]
        public void BaseController_GetChildLocation_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVTypeEnum tvType = controller.GetChildLocation(TVTypeEnum.Root);

                    // Assert
                    Assert.AreEqual(TVTypeEnum.Country, tvType);

                    // Act
                    tvType = controller.GetChildLocation(TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual(TVTypeEnum.Province, tvType);

                    // Act
                    tvType = controller.GetChildLocation(TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual(TVTypeEnum.Area, tvType);

                    // Act
                    tvType = controller.GetChildLocation(TVTypeEnum.Area);

                    // Assert
                    Assert.AreEqual(TVTypeEnum.Sector, tvType);

                    // Act
                    tvType = controller.GetChildLocation(TVTypeEnum.Sector);

                    // Assert
                    Assert.AreEqual(TVTypeEnum.Subsector, tvType);

                    // Act
                    tvType = controller.GetChildLocation(TVTypeEnum.Subsector);

                    // Assert
                    Assert.AreEqual(TVTypeEnum.MWQMSite, tvType);

                    // Act
                    tvType = controller.GetChildLocation(TVTypeEnum.Email);

                    // Assert
                    Assert.AreEqual(TVTypeEnum.Root, tvType);
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Area_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Area);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2", "3" };
                    List<string> ActionList = new List<string>() { "_content", "_content", "_fileList", "_content" };
                    List<string> ControllerList = new List<string>() { "TVItem", "TVItem", "File", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Country_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2" };
                    List<string> ActionList = new List<string>() { "_content", "_fileList", "_content" };
                    List<string> ControllerList = new List<string>() { "TVItem", "File", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Infrastructure_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Infrastructure);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2", "3", "4" };
                    List<string> ActionList = new List<string>() { "_infrastructureInfo", "_boxModelList", "_visualPlumesList", "_fileList", "_content" };
                    List<string> ControllerList = new List<string>() { "Infrastructure", "BoxModel", "VisualPlumes", "File", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_MWQMSite_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.MWQMSite);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2" };
                    List<string> ActionList = new List<string>() { "_mwqmSite", "_fileList", "_content" };
                    List<string> ControllerList = new List<string>() { "MWQM", "File", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_MikeScenario_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.MikeScenario);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2", "3", "4", "5" };
                    List<string> ActionList = new List<string>() { "_mikeScenarioGeneralParameters", "_mikeScenarioSources", "_mikeScenarioInputSummary", "_fileList", "_mikeScenarioTools", "_content" };
                    List<string> ControllerList = new List<string>() { "MikeScenario", "MikeScenario", "MikeScenario", "File", "MikeScenario", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Municipality_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2", "3", "4" };
                    List<string> ActionList = new List<string>() { "_infrastructureList", "_content", "_contactList", "_fileList", "_content" };
                    List<string> ControllerList = new List<string>() { "Infrastructure", "TVItem", "Contact", "File", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_PolSourceSite_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.PolSourceSite);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2" };
                    List<string> ActionList = new List<string>() { "_polSourceSite", "_fileList", "_content" };
                    List<string> ControllerList = new List<string>() { "PolSource", "File", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Province_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2", "3", "4" };
                    List<string> ActionList = new List<string>() { "_content", "_content", "_fileList", "_MWQMPlanByProvince", "_content" };
                    List<string> ControllerList = new List<string>() { "TVItem", "TVItem", "File", "MWQMPlan", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Root_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Root);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2" };
                    List<string> ActionList = new List<string>() { "_content", "_fileList", "_content" };
                    List<string> ControllerList = new List<string>() { "TVItem", "File", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Sector_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Sector);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2", "3" };
                    List<string> ActionList = new List<string>() { "_content", "_content", "_fileList", "_content" };
                    List<string> ControllerList = new List<string>() { "TVItem", "TVItem", "File", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Subsector_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0", "1", "2", "3", "4", "5", "6", "7", "8" };
                    List<string> ActionList = new List<string>() { "_content", "_content", "_content", "_content", "_fileList", "_climateSiteList", "_hydrometricSiteList", "_tideSiteList", "_content" };
                    List<string> ControllerList = new List<string>() { "TVItem", "TVItem", "TVItem", "TVItem", "File", "ClimateSite", "HydrometricSite", "TideSite", "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetContentActionAndController_Others_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    List<TabInfo> tabInfoList = new List<TabInfo>();

                    // Act
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.HydrometricSite);

                    // Assert
                    Assert.AreEqual("", tvItemModel.Error);

                    List<string> ActiveList = new List<string>() { "0" };
                    List<string> ActionList = new List<string>() { "_content" };
                    List<string> ControllerList = new List<string>() { "TVItem" };

                    for (int i = 0, count = ActiveList.Count; i < count; i++)
                    {
                        // Act
                        tabInfoList = new List<TabInfo>() { new TabInfo() { Active = i.ToString() } };
                        ContentActionAndController contentActionAndController = controller.GetContentActionAndController(tvItemModel, tabInfoList);

                        // Assert
                        Assert.AreEqual(ActionList[i], contentActionAndController.Action);
                        Assert.AreEqual(ControllerList[i], contentActionAndController.Controller);
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_Area_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowAreaTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Area);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1", "2" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowAreaTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowAreaTab, "1", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowAreaTab, "2", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Sectors, ControllerRes.Municipalities, ControllerRes.Files };
                    List<string> iconList = new List<string>() { "", "", "" };
                    List<string> toolTipList = new List<string>() { "", "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.Sector, TVTypeEnum.Municipality, TVTypeEnum.File };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_Country_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowCountryTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Country);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowCountryTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowCountryTab, "1", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Provinces, ControllerRes.Files };
                    List<string> iconList = new List<string>() { "", "" };
                    List<string> toolTipList = new List<string>() { "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.Province, TVTypeEnum.File };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_Infrastructure_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowInfrastructureTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Infrastructure);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1", "2", "3" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowInfrastructureTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowInfrastructureTab, "1", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowInfrastructureTab, "2", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowInfrastructureTab, "3", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Information, ControllerRes.BoxModels, ControllerRes.VisualPlumes, ControllerRes.Files };
                    List<string> iconList = new List<string>() { "", "", "", "" };
                    List<string> toolTipList = new List<string>() { "", "", "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content", "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem", "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.Infrastructure, TVTypeEnum.BoxModel, TVTypeEnum.VisualPlumesScenario, TVTypeEnum.File };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_MWQMSite_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowMWQMSitesTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.MWQMSite);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMWQMSitesTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMWQMSitesTab, "1", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Information, ControllerRes.Files };
                    List<string> iconList = new List<string>() { "", "" };
                    List<string> toolTipList = new List<string>() { "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.MWQMSite, TVTypeEnum.File };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_MikeScenario_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowMikeScenarioTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.MikeScenario);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1", "2", "3", "4" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "1", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "2", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "3", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "4", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.GeneralParameters, ControllerRes.Sources, ControllerRes.InputSummary, ControllerRes.Files, ControllerRes.Tools };
                    List<string> iconList = new List<string>() { "", "", "", "", "" };
                    List<string> toolTipList = new List<string>() { "", "", "", "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content", "_content", "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem", "TVItem", "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.MikeScenario, TVTypeEnum.MikeScenario, TVTypeEnum.MikeScenario, TVTypeEnum.File, TVTypeEnum.MikeScenario };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_Municipality_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowMunicipalityTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Municipality);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1", "2", "3" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMunicipalityTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMunicipalityTab, "1", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMunicipalityTab, "2", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowMunicipalityTab, "3", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Infrastructures, ControllerRes.MikeScenarios, ControllerRes.Contacts, ControllerRes.Files };
                    List<string> iconList = new List<string>() { "", "", "", "" };
                    List<string> toolTipList = new List<string>() { "", "", "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content", "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem", "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.Infrastructure, TVTypeEnum.MikeScenario, TVTypeEnum.Contact, TVTypeEnum.File };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_PolSourceSite_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowPolSourceSiteTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.PolSourceSite);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowPolSourceSiteTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowPolSourceSiteTab, "1", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Information, ControllerRes.Files };
                    List<string> iconList = new List<string>() { "", "" };
                    List<string> toolTipList = new List<string>() { "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.PolSourceSite, TVTypeEnum.File };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_Province_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowProvinceTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Province);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1", "2", "3" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "1", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "2", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "3", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Areas, ControllerRes.Municipalities, ControllerRes.Files, ControllerRes.MWQMPlans };
                    List<string> iconList = new List<string>() { "", "", "", "" };
                    List<string> toolTipList = new List<string>() { "", "", "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content", "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem", "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.Area, TVTypeEnum.Municipality, TVTypeEnum.File, TVTypeEnum.MWQMPlan };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_Root_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowRootTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Root);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowRootTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowRootTab, "1", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Countries, ControllerRes.Files };
                    List<string> iconList = new List<string>() { "", "" };
                    List<string> toolTipList = new List<string>() { "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.Country, TVTypeEnum.File };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_Sector_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowSectorTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Sector);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1", "2" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSectorTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSectorTab, "1", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSectorTab, "2", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.Subsectors, ControllerRes.Municipalities, ControllerRes.Files };
                    List<string> iconList = new List<string>() { "", "", "" };
                    List<string> toolTipList = new List<string>() { "", "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.Subsector, TVTypeEnum.Municipality, TVTypeEnum.File };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_GetTab1ViewTVItemInfoDB_Subsector_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    URLVarShowEnum urlVarShow = URLVarShowEnum.ShowSubsectorTab;
                    TVItemModel tvItemModel = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    string Q = "!View/All Location/A|||" + tvItemModel.TVItemID + "/1";
                    controller.SetArgs(Q);

                    List<string> activeList = new List<string>() { "0", "1", "2", "3", "4", "5", "6", "7" };
                    List<string> urlList = new List<string>() 
                    { 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "0", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "1", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "2", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "3", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "4", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "5", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "6", "0"), 
                        controller.CreateTempVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "7", "0"), 
                    };
                    List<string> textList = new List<string>() { ControllerRes.MWQMSites, ControllerRes.MWQMRuns, ControllerRes.PolSourceSites, ControllerRes.Municipalities, ControllerRes.Files, ControllerRes.ClimateSites, ControllerRes.HydrometricSites, ControllerRes.TideSites };
                    List<string> iconList = new List<string>() { "", "", "", "", "", "", "", "" };
                    List<string> toolTipList = new List<string>() { "", "", "", "", "", "", "", "" };
                    List<string> actionList = new List<string>() { "_content", "_content", "_content", "_content", "_content", "_content", "_content", "_content" };
                    List<string> controllerList = new List<string>() { "TVItem", "TVItem", "TVItem", "TVItem", "TVItem", "TVItem", "TVItem", "TVItem" };
                    List<TVTypeEnum> showTVTypeList = new List<TVTypeEnum>() { TVTypeEnum.MWQMSite, TVTypeEnum.MWQMRun, TVTypeEnum.PolSourceSite, TVTypeEnum.Municipality, TVTypeEnum.File, TVTypeEnum.ClimateSite, TVTypeEnum.HydrometricSite, TVTypeEnum.TideSite };

                    foreach (string active in activeList)
                    {
                        controller.SetVariableShow(urlVarShow, active);

                        for (int j = 0, countAuth = Enum.GetNames(typeof(TVAuthEnum)).Length; j < countAuth; j++)
                        {
                            // Act
                            List<TabInfo> viewTVItemInfoTab1List = controller.GetTab1ViewTVItemInfoDB(tvItemModel, (TVAuthEnum)j);

                            // Assert
                            Assert.IsNotNull(viewTVItemInfoTab1List);
                            Assert.AreEqual(activeList.Count, viewTVItemInfoTab1List.Count);
                            for (int i = 0, count = viewTVItemInfoTab1List.Count; i < count; i++)
                            {
                                Assert.AreEqual(urlList[i], viewTVItemInfoTab1List[i].URL);
                                Assert.AreEqual(active, viewTVItemInfoTab1List[i].Active);
                                Assert.AreEqual(textList[i], viewTVItemInfoTab1List[i].Text);
                                Assert.AreEqual(iconList[i], viewTVItemInfoTab1List[i].Icon);
                                Assert.AreEqual(toolTipList[i], viewTVItemInfoTab1List[i].ToolTip);
                                Assert.AreEqual(actionList[i], viewTVItemInfoTab1List[i].Action);
                                Assert.AreEqual(controllerList[i], viewTVItemInfoTab1List[i].Controller);
                                Assert.AreEqual(showTVTypeList[i], viewTVItemInfoTab1List[i].ShowTVType);
                            }
                        }
                    }
                }
            }
        }
        [TestMethod]
        public void BaseController_ReplaceNonDigitsAndSpaceBy0_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                // Act
                string retStr = controller.ReplaceNonDigitsAndSpaceBy0("");

                // Assert
                Assert.AreEqual("", retStr);

                // Act
                retStr = controller.ReplaceNonDigitsAndSpaceBy0("1h1");

                // Assert
                Assert.AreEqual("101", retStr);

                // Act
                retStr = controller.ReplaceNonDigitsAndSpaceBy0("11  11");

                // Assert
                Assert.AreEqual("110011", retStr);

                // Act
                retStr = controller.ReplaceNonDigitsAndSpaceBy0("abcde");

                // Assert
                Assert.AreEqual("00000", retStr);

                // Act
                retStr = controller.ReplaceNonDigitsAndSpaceBy0("12345a7");

                // Assert
                Assert.AreEqual("1234507", retStr);

                // Act
                retStr = controller.ReplaceNonDigitsAndSpaceBy0(" jf01");

                // Assert
                Assert.AreEqual("00001", retStr);

                // Act
                retStr = controller.ReplaceNonDigitsAndSpaceBy0("0934");

                // Assert
                Assert.AreEqual("0934", retStr);

                // Act
                retStr = controller.ReplaceNonDigitsAndSpaceBy0("     1");

                // Assert
                Assert.AreEqual("000001", retStr);

                // Act
                retStr = controller.ReplaceNonDigitsAndSpaceBy0("11    ");

                // Assert
                Assert.AreEqual("110000", retStr);
            }
        }
        [TestMethod]
        public void BaseController_SetArgs_1_Test()
        {
            // Already tested from the constructors tests
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                string Q = "!View";
                SetupTest(contactModelListGood[0], culture, Q);

                controller.SetArgs(Q);

                // Assert
                Assert.AreEqual("", controller.urlModel.Error);
                Assert.AreEqual(Q, controller.urlModel.Q);
                Assert.AreEqual(2, controller.urlModel.TVTextList.Count);
                Assert.AreEqual("!View", controller.urlModel.TVTextList[0]);
                Assert.AreEqual(ServiceRes.AllLocations, controller.urlModel.TVTextList[1]);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList.Count);
                Assert.AreEqual(1, controller.urlModel.TVItemIDList[0]);
                Assert.AreEqual(VarShowStrLength, controller.urlModel.VariableShow.Length);
                Assert.AreEqual(StartVarShow, controller.urlModel.VariableShow);
            }
        }
        [TestMethod]
        public void BaseController_SetVariableShow_LoopURLVarShowEnum_1To9_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                int CountURLVarShowEnum = Enum.GetNames(typeof(URLVarShowEnum)).Length;
                for (int j = 0; j < CountURLVarShowEnum; j++)
                {
                    for (var i = 0; i < 10; i++)
                    {
                        string Q = "!View";
                        SetupTest(contactModelListGood[0], culture, Q);

                        // Act
                        controller.SetVariableShow((URLVarShowEnum)j, i.ToString());
                        string Visibility = controller.GetURLVarShowEnumStr((URLVarShowEnum)j);
                        Assert.AreEqual(i.ToString(), Visibility);
                    }
                }

            }
        }
        #endregion Testing Methods

        #region Functions private
        private void AssertIconList(IconInfo iconInfo, string URL, bool IsVisible, string jbClassName, string Icon, string ToolTip)
        {
            Assert.AreEqual(URL, iconInfo.URL);
            if (iconInfo.URL == "")
            {
                Assert.IsTrue(iconInfo.jbClassName.Length > 0);
            }
            Assert.AreEqual(IsVisible, iconInfo.IsVisible);
            Assert.AreEqual(jbClassName, iconInfo.jbClassName);
            Assert.AreEqual(Icon, iconInfo.Icon);
            Assert.AreEqual(ToolTip, iconInfo.ToolTip);
        }
        private string GetVariableShow(string CurrentVarShow, List<URLVarShowEnum> urlShowVarList, List<string> valueList)
        {
            string tempURLShowVar = CurrentVarShow;
            for (int i = 0, count = urlShowVarList.Count; i < count; i++)
            {
                tempURLShowVar = tempURLShowVar.Remove((int)urlShowVarList[i], 1);
                tempURLShowVar = tempURLShowVar.Insert((int)urlShowVarList[i], valueList[i]);
                tempURLShowVar = tempURLShowVar.Replace(" ", "0");
            }
            return tempURLShowVar;
        }
        private void SetupTest(ContactModel contactModelToDo, CultureInfo culture, string actionStr)
        {
            LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

            user = new GenericPrincipal(new GenericIdentity(contactModelToDo.LoginEmail, "Forms"), null);
            routeData = new RouteData();
            routeData.Values.Add("culture", culture);
            routeData.Values.Add("controller", controllerName);
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            stubHttpContext.UserGet = () => user;
            controller = new BaseController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);

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
            Assert.IsNotNull(controller._TVItemService);
            Assert.IsNotNull(controller._TVItemStatService);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull(controllerName, controller._RequestContext.RouteData.Values["controller"].ToString());
            Assert.IsNotNull(actionStr, controller._RequestContext.RouteData.Values["action"].ToString());
            if (contactModelToDo != null)
            {
                Assert.AreEqual(contactModelToDo.IsAdmin, controller.IsAdmin);
                Assert.AreEqual(contactModelToDo.IsAdmin, controller.ViewBag.IsAdmin);
            }
            Assert.AreEqual(true, controller.Debug);
            Assert.AreEqual(true, controller.ViewBag.Debug);
            Assert.IsNotNull(controller.urlModel);
            Assert.AreEqual("30" + new string("0".ToCharArray()[0], 30), controller.urlModel.VariableShow);
        }
        private void SetupShim()
        {
            shimTVItemService = new ShimTVItemService(controller._TVItemService);
        }
        #endregion Functions private
    }
}
