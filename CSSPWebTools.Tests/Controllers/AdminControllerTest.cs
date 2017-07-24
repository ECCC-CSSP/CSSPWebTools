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
using System.Globalization;
using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest2
    /// </summary>
    [TestClass]
    public class AdminControllerTest : SetupData
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
        private AdminController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimAdminController shimAdminController { get; set; }
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
        public AdminControllerTest()
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

        #region Testing Methods Contstructors/Views/PartialViews
        [TestMethod]
        public void AdminController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void AdminController_Constructor_User_null_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(null, culture, controllerAction);
            }
        }
        [TestMethod]
        public void AdminController__Admin_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_Admin";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    PartialViewResult partialViewResult = controller._Admin() as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(true, partialViewResult.ViewBag.IsAdmin);

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    partialViewResult = controller._Admin() as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(false, partialViewResult.ViewBag.IsAdmin);

                    // Act
                    SetupTest(contactModelListBad[0], culture, controllerAction);

                    // Act
                    partialViewResult = controller._Admin() as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(false, partialViewResult.ViewBag.IsAdmin);
                }
            }
        }
        [TestMethod]
        public void AdminController__TVItemTVAuth_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_TVItemTVAuth";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    string TVTypeName = "Area";
                    string TVPath = randomService.tvTypeNamesAndPathList.Where(c => c.TVTypeName == TVTypeName).FirstOrDefault().TVPath;
                    PartialViewResult partialViewResult = controller._TVItemTVAuth(TVPath) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    bool isAdmin = (bool)partialViewResult.ViewBag.IsAdmin;
                    Assert.AreEqual(true, isAdmin);

                    List<TVTypeNamesAndPath> tvTypeNamesAndPathList = (List<TVTypeNamesAndPath>)partialViewResult.ViewBag.TVTypeNamesAndPathList;
                    Assert.AreEqual(4, tvTypeNamesAndPathList.Count);
                    Assert.AreEqual(TVTypeName, tvTypeNamesAndPathList[3].TVTypeName);

                    List<TVItemModel> tvItemModelList = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelCountryList;
                    Assert.AreEqual(2, tvItemModelList.Count);
                    Assert.IsTrue(tvItemModelList.Where(c => c.TVText == "Canada").Any());
                }
            }
        }
        [TestMethod]
        public void AdminController__TVItemTVAuthSelect_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_TVItemTVAuthSelect";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    string TVText = "Canada";
                    TVItemModel tvItemModelCanada = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(1, TVText, TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    List<TVItemModel> tvItemModelListProv = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelCanada.TVItemID, TVTypeEnum.Province);

                    // Assert
                    Assert.IsTrue(tvItemModelListProv.Count > 0);

                    string TVTextProv = tvItemModelListProv[0].TVText;

                    // Act
                    string TVTypeName = "Province";
                    string TVPath = randomService.tvTypeNamesAndPathList.Where(c => c.TVTypeName == TVTypeName).FirstOrDefault().TVPath;
                    PartialViewResult partialViewResult = controller._TVItemTVAuthSelect(tvItemModelCanada.TVItemID, TVPath) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    bool isAdmin = (bool)partialViewResult.ViewBag.IsAdmin;
                    Assert.AreEqual(true, isAdmin);

                    string TVPathNext = (string)partialViewResult.ViewBag.TVPathNext;
                    Assert.AreEqual(TVPath, TVPathNext);

                    List<TVItemModel> tvItemModelList = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelList;
                    Assert.IsTrue(tvItemModelList.Where(c => c.TVText.StartsWith(TVTextProv)).Any());
                }
            }
        }
        [TestMethod]
        public void AdminController__User_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_User";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    PartialViewResult partialViewResult = controller._User(contactModelListGood[0].ContactTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(true, partialViewResult.ViewBag.IsAdmin);
                    Assert.AreEqual(contactModelListGood[0].ContactID, ((ContactModel)partialViewResult.ViewBag.contactModel).ContactID);
                    Assert.AreEqual(contactModelListGood[0].ContactTVItemID, ((ContactModel)partialViewResult.ViewBag.contactModel).ContactTVItemID);

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    partialViewResult = controller._Admin() as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                    Assert.AreEqual(false, partialViewResult.ViewBag.IsAdmin);
                    Assert.AreEqual(null, ((ContactModel)partialViewResult.ViewBag.contactModel));
                }
            }
        }
        #endregion Testing Methods Contstructors/Views/PartialViews

        #region Testing Methods JSON
        [TestMethod]
        public void AdminController_ContactDisabledToggleJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "ContactDisabledToggleJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    JsonResult jsonResult = controller.ContactDisabledToggleJSON(contactModelListGood[0].ContactTVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    ContactModel contactModel = (ContactModel)jsonResult.Data;
                    Assert.AreEqual(ServiceRes.CantDisableOrEnableOneSelf, contactModel.Error);

                    // Act
                    jsonResult = controller.ContactDisabledToggleJSON(contactModelListGood[2].ContactTVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    contactModel = (ContactModel)jsonResult.Data;
                    Assert.AreEqual("", contactModel.Error);
                    Assert.AreEqual(contactModelListGood[2].ContactTVItemID, contactModel.ContactTVItemID);
                    Assert.AreEqual(contactModelListGood[2].ContactID, contactModel.ContactID);

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    jsonResult = controller.ContactDisabledToggleJSON(contactModelListGood[2].ContactTVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    contactModel = (ContactModel)jsonResult.Data;
                    Assert.AreEqual(ControllerRes.NeedToBeAnAdministrator, contactModel.Error);
                }
            }
        }
        [TestMethod]
        public void AdminController_GetTVTypeNameAndPathListJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "GetTVTypeNameAndPathListJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    JsonResult jsonResult = controller.GetTVTypeNameAndPathListJSON() as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    List<TVTypeNamesAndPath> tvTypeNamesAndPathList = (List<TVTypeNamesAndPath>)jsonResult.Data;
                    Assert.AreEqual("p1", tvTypeNamesAndPathList.Where(c => c.TVTypeName == "Root").FirstOrDefault().TVPath);
                    Assert.AreEqual("p1p6", tvTypeNamesAndPathList.Where(c => c.TVTypeName == "Country").FirstOrDefault().TVPath);


                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    jsonResult = controller.GetTVTypeNameAndPathListJSON() as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    tvTypeNamesAndPathList = (List<TVTypeNamesAndPath>)jsonResult.Data;
                    Assert.AreEqual(0, tvTypeNamesAndPathList.Count);
                }
            }
        }
        [TestMethod]
        public void AdminController_GetUserTVItemAuthJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                // Arrange
                controllerAction = "GetUserTVItemAuthJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemUserAuthorizationService tvItemUserAuthorizationService = new TVItemUserAuthorizationService(languageEnum, user);

                    // Arrange
                    TVItemUserAuthorizationModel tvItemUserAuthorizationModelNew = new TVItemUserAuthorizationModel();
                    tvItemUserAuthorizationModelNew.ContactTVItemID = contactModelListGood[2].ContactTVItemID;
                    tvItemUserAuthorizationModelNew.TVItemID1 = randomService.RandomTVItem(TVTypeEnum.PolSourceSite).TVItemID;
                    tvItemUserAuthorizationModelNew.TVItemID2 = randomService.RandomTVItem(TVTypeEnum.Country).TVItemID;
                    tvItemUserAuthorizationModelNew.TVItemID3 = randomService.RandomTVItem(TVTypeEnum.Country).TVItemID;
                    tvItemUserAuthorizationModelNew.TVItemID4 = randomService.RandomTVItem(TVTypeEnum.Country).TVItemID;
                    tvItemUserAuthorizationModelNew.TVAuth = TVAuthEnum.Delete;

                    // Act
                    TVItemUserAuthorizationModel tvItemUserAuthorizationModelRet = tvItemUserAuthorizationService.PostAddTVItemUserAuthorizationDB(tvItemUserAuthorizationModelNew);

                    // Assert
                    Assert.IsNotNull(tvItemUserAuthorizationModelRet);
                    Assert.AreEqual(contactModelListGood[2].ContactTVItemID, tvItemUserAuthorizationModelRet.ContactTVItemID);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.ContactTVItemID, tvItemUserAuthorizationModelRet.ContactTVItemID);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVItemID1, tvItemUserAuthorizationModelRet.TVItemID1);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVAuth, tvItemUserAuthorizationModelRet.TVAuth);

                    // Act
                    JsonResult jsonResult = controller.GetUserTVItemAuthJSON(contactModelListGood[2].ContactTVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    List<TVItemTVAuth> tvItemTVAuthList = (List<TVItemTVAuth>)jsonResult.Data;
                    Assert.IsTrue(tvItemTVAuthList.Where(c => c.TVTypeStr == TVTypeEnum.PolSourceSite.ToString()).Any());

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    jsonResult = controller.GetUserTVItemAuthJSON(contactModelListGood[0].ContactTVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    tvItemTVAuthList = (List<TVItemTVAuth>)jsonResult.Data;
                    Assert.AreEqual(0, tvItemTVAuthList.Count);
                }
            }
        }
        [TestMethod]
        public void AdminController_GetUserTVTypeAuthJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                // Arrange
                controllerAction = "GetUserTVTypeAuthJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVTypeUserAuthorizationService tvTypeUserAuthorizationService = new TVTypeUserAuthorizationService(languageEnum, user);

                    // Arrange
                    TVTypeUserAuthorizationModel tvTypeUserAuthorizationModelNew = new TVTypeUserAuthorizationModel();
                    tvTypeUserAuthorizationModelNew.ContactTVItemID = contactModelListGood[2].ContactTVItemID;
                    tvTypeUserAuthorizationModelNew.TVType = TVTypeEnum.Country;
                    tvTypeUserAuthorizationModelNew.TVAuth = TVAuthEnum.Delete;

                    // Act
                    TVTypeUserAuthorizationModel tvTypeUserAuthorizationModelRet = tvTypeUserAuthorizationService.PostAddTVTypeUserAuthorizationDB(tvTypeUserAuthorizationModelNew);

                    // Assert
                    Assert.IsNotNull(tvTypeUserAuthorizationModelRet);
                    Assert.AreEqual(contactModelListGood[2].ContactTVItemID, tvTypeUserAuthorizationModelRet.ContactTVItemID);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.ContactTVItemID, tvTypeUserAuthorizationModelRet.ContactTVItemID);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.TVType, tvTypeUserAuthorizationModelRet.TVType);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.TVAuth, tvTypeUserAuthorizationModelRet.TVAuth);

                    // Act
                    JsonResult jsonResult = controller.GetUserTVTypeAuthJSON(contactModelListGood[2].ContactTVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    List<TVTypeUserAuthorizationModel> tvTypeUserAuthorizationModelList = (List<TVTypeUserAuthorizationModel>)jsonResult.Data;
                    Assert.IsTrue(tvTypeUserAuthorizationModelList.Where(c => c.ContactTVItemID == contactModelListGood[2].ContactTVItemID).Any());

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    jsonResult = controller.GetUserTVTypeAuthJSON(contactModelListGood[2].ContactTVItemID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    tvTypeUserAuthorizationModelList = (List<TVTypeUserAuthorizationModel>)jsonResult.Data;
                    Assert.AreEqual(0, tvTypeUserAuthorizationModelList.Count);
                }
            }
        }
        [TestMethod]
        public void AdminController_RemoveUserJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "RemoveUserJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    JsonResult jsonResult = controller.RemoveUserJSON(contactModelListGood[0].LoginEmail) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(ServiceRes.CantDeleteOneSelf, retStr);

                    // Act
                    jsonResult = controller.RemoveUserJSON(contactModelListGood[2].LoginEmail) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    jsonResult = controller.RemoveUserJSON(contactModelListGood[1].LoginEmail) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    retStr = (string)jsonResult.Data;
                    Assert.AreEqual(ControllerRes.NeedToBeAnAdministrator, retStr);
                }
            }
        }
        [TestMethod]
        public void AdminController_RemoveUserTVItemAuthJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                // Arrange
                controllerAction = "RemoveUserTVItemAuthJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = tvItemService.PostAddChildTVItemDB(tvItemModelRoot.TVItemID, "Unique Country", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    TVItemUserAuthorizationService tvItemUserAuthorizationService = new TVItemUserAuthorizationService(languageEnum, user);

                    // Arrange
                    TVItemUserAuthorizationModel tvItemUserAuthorizationModelNew = new TVItemUserAuthorizationModel();
                    tvItemUserAuthorizationModelNew.ContactTVItemID = contactModelListGood[2].ContactTVItemID;
                    tvItemUserAuthorizationModelNew.TVItemID1 = tvItemModelCountry.TVItemID;
                    tvItemUserAuthorizationModelNew.TVAuth = TVAuthEnum.Delete;

                    // Act
                    TVItemUserAuthorizationModel tvItemUserAuthorizationModelRet = tvItemUserAuthorizationService.PostAddTVItemUserAuthorizationDB(tvItemUserAuthorizationModelNew);

                    // Assert
                    Assert.AreEqual("", tvItemUserAuthorizationModelRet.Error);
                    Assert.AreEqual(contactModelListGood[2].ContactTVItemID, tvItemUserAuthorizationModelRet.ContactTVItemID);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.ContactTVItemID, tvItemUserAuthorizationModelRet.ContactTVItemID);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVItemID1, tvItemUserAuthorizationModelRet.TVItemID1);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVAuth, tvItemUserAuthorizationModelRet.TVAuth);

                    // Act
                    JsonResult jsonResult = controller.RemoveUserTVItemAuthJSON(tvItemUserAuthorizationModelRet.TVItemUserAuthorizationID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);

                    // Act
                    SetupTest(contactModelListGood[2], culture, controllerAction);

                    // Act
                    jsonResult = controller.RemoveUserTVItemAuthJSON(tvItemUserAuthorizationModelRet.TVItemUserAuthorizationID) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    retStr = (string)jsonResult.Data;
                    Assert.AreEqual(ControllerRes.NeedToBeAnAdministrator, retStr);
                }
            }
        }
        [TestMethod]
        public void AdminController_RemoveUserTVTypeAuthJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                // Arrange
                controllerAction = "RemoveUserTVTypeAuthJSON";


                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVTypeUserAuthorizationService tvTypeUserAuthorizationService = new TVTypeUserAuthorizationService(languageEnum, user);

                    // Arrange
                    TVTypeUserAuthorizationModel tvTypeUserAuthorizationModelNew = new TVTypeUserAuthorizationModel();
                    tvTypeUserAuthorizationModelNew.ContactTVItemID = contactModelListGood[2].ContactTVItemID;
                    tvTypeUserAuthorizationModelNew.TVType = TVTypeEnum.Country;
                    tvTypeUserAuthorizationModelNew.TVAuth = TVAuthEnum.Delete;

                    // Act
                    TVTypeUserAuthorizationModel tvTypeUserAuthorizationModelRet = tvTypeUserAuthorizationService.PostAddTVTypeUserAuthorizationDB(tvTypeUserAuthorizationModelNew);

                    // Assert
                    Assert.IsNotNull(tvTypeUserAuthorizationModelRet);
                    Assert.AreEqual(contactModelListGood[2].ContactTVItemID, tvTypeUserAuthorizationModelRet.ContactTVItemID);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.ContactTVItemID, tvTypeUserAuthorizationModelRet.ContactTVItemID);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.TVType, tvTypeUserAuthorizationModelRet.TVType);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.TVAuth, tvTypeUserAuthorizationModelRet.TVAuth);


                    // Act
                    JsonResult jsonResult = controller.RemoveUserTVTypeAuthJSON(tvTypeUserAuthorizationModelRet.ContactTVItemID, tvTypeUserAuthorizationModelRet.TVType) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    jsonResult = controller.RemoveUserTVTypeAuthJSON(tvTypeUserAuthorizationModelRet.ContactTVItemID, tvTypeUserAuthorizationModelRet.TVType) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    retStr = (string)jsonResult.Data;
                    Assert.AreEqual(ControllerRes.NeedToBeAnAdministrator, retStr);

                }
            }
        }
        [TestMethod]
        public void AdminController_SetUserTVItemAuthJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                // Arrange
                controllerAction = "SetUserTVItemAuthJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemUserAuthorizationService tvItemUserAuthorizationService = new TVItemUserAuthorizationService(languageEnum, user);

                    // Arrange
                    TVItemUserAuthorizationModel tvItemUserAuthorizationModelNew = new TVItemUserAuthorizationModel();
                    tvItemUserAuthorizationModelNew.ContactTVItemID = contactModelListGood[2].ContactTVItemID;
                    tvItemUserAuthorizationModelNew.TVItemID1 = randomService.RandomTVItem(TVTypeEnum.Country).TVItemID;
                    tvItemUserAuthorizationModelNew.TVItemID2 = null;
                    tvItemUserAuthorizationModelNew.TVItemID3 = null;
                    tvItemUserAuthorizationModelNew.TVItemID4 = null;
                    tvItemUserAuthorizationModelNew.TVAuth = TVAuthEnum.Delete;

                    // Act
                    TVItemUserAuthorizationModel tvItemUserAuthorizationModelRet = tvItemUserAuthorizationService.GetTVItemUserAuthorizationModelWithContactTVItemIDTVItemID1TVItemID2TVItemID3TVItemID4DB(tvItemUserAuthorizationModelNew.ContactTVItemID, tvItemUserAuthorizationModelNew.TVItemID1, tvItemUserAuthorizationModelNew.TVItemID2, tvItemUserAuthorizationModelNew.TVItemID3, tvItemUserAuthorizationModelNew.TVItemID4);

                    if (tvItemUserAuthorizationModelRet.ContactTVItemID > 0)
                    {
                        // Act
                        tvItemUserAuthorizationModelRet = tvItemUserAuthorizationService.PostDeleteTVItemUserAuthorizationDB(tvItemUserAuthorizationModelRet.TVItemUserAuthorizationID);

                        // Assert
                        Assert.AreEqual("", tvItemUserAuthorizationModelRet.Error);
                    }

                    // Act
                    JsonResult jsonResult = controller.SetUserTVItemAuthJSON(tvItemUserAuthorizationModelNew) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    TVItemUserAuthorizationModel tvItemUserAuthorizationModel = (TVItemUserAuthorizationModel)jsonResult.Data;
                    Assert.AreEqual("", tvItemUserAuthorizationModel.Error);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.ContactTVItemID, tvItemUserAuthorizationModel.ContactTVItemID);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVItemID1, tvItemUserAuthorizationModel.TVItemID1);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVItemID2, tvItemUserAuthorizationModel.TVItemID2);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVItemID3, tvItemUserAuthorizationModel.TVItemID3);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVItemID4, tvItemUserAuthorizationModel.TVItemID4);
                    Assert.AreEqual(tvItemUserAuthorizationModelNew.TVAuth, tvItemUserAuthorizationModel.TVAuth);

                    tvItemUserAuthorizationModel.TVAuth = TVAuthEnum.Create;

                    // Act
                    jsonResult = controller.SetUserTVItemAuthJSON(tvItemUserAuthorizationModel) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    TVItemUserAuthorizationModel tvItemUserAuthorizationModel2 = (TVItemUserAuthorizationModel)jsonResult.Data;
                    Assert.AreEqual("", tvItemUserAuthorizationModel2.Error);
                    Assert.AreEqual(tvItemUserAuthorizationModel.ContactTVItemID, tvItemUserAuthorizationModel2.ContactTVItemID);
                    Assert.AreEqual(tvItemUserAuthorizationModel.TVItemID1, tvItemUserAuthorizationModel2.TVItemID1);
                    Assert.AreEqual(tvItemUserAuthorizationModel.TVItemID2, tvItemUserAuthorizationModel2.TVItemID2);
                    Assert.AreEqual(tvItemUserAuthorizationModel.TVItemID3, tvItemUserAuthorizationModel2.TVItemID3);
                    Assert.AreEqual(tvItemUserAuthorizationModel.TVItemID4, tvItemUserAuthorizationModel2.TVItemID4);
                    Assert.AreEqual(tvItemUserAuthorizationModel.TVAuth, tvItemUserAuthorizationModel2.TVAuth);

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    jsonResult = controller.SetUserTVItemAuthJSON(tvItemUserAuthorizationModel) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    tvItemUserAuthorizationModel2 = (TVItemUserAuthorizationModel)jsonResult.Data;
                    Assert.AreEqual(ControllerRes.NeedToBeAnAdministrator, tvItemUserAuthorizationModel2.Error);
                  
                }
            }
        }
        [TestMethod]
        public void AdminController_SetUserTVTypeAuthJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

                // Arrange
                controllerAction = "SetUserTVTypeAuthJSON";

                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVTypeUserAuthorizationService tvTypeUserAuthorizationService = new TVTypeUserAuthorizationService(languageEnum, user);

                    // Arrange
                    TVTypeUserAuthorizationModel tvTypeUserAuthorizationModelNew = new TVTypeUserAuthorizationModel();
                    tvTypeUserAuthorizationModelNew.ContactTVItemID = contactModelListGood[2].ContactTVItemID;
                    tvTypeUserAuthorizationModelNew.TVType = TVTypeEnum.Country;
                    tvTypeUserAuthorizationModelNew.TVAuth = TVAuthEnum.Delete;

                    // Act
                    TVTypeUserAuthorizationModel tvTypeUserAuthorizationModelRet = tvTypeUserAuthorizationService.GetTVTypeUserAuthorizationModelWithContactTVItemIDAndTVTypeDB(tvTypeUserAuthorizationModelNew.ContactTVItemID, tvTypeUserAuthorizationModelNew.TVType);

                    if (tvTypeUserAuthorizationModelRet.TVTypeUserAuthorizationID > 0)
                    {
                        // Act
                        tvTypeUserAuthorizationModelRet = tvTypeUserAuthorizationService.PostDeleteTVTypeUserAuthorizationDB(tvTypeUserAuthorizationModelRet.TVTypeUserAuthorizationID);

                        // Assert
                        Assert.AreEqual("", tvTypeUserAuthorizationModelRet.Error);
                    }

                    // Act
                    JsonResult jsonResult = controller.SetUserTVTypeAuthJSON(tvTypeUserAuthorizationModelNew) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    TVTypeUserAuthorizationModel tvTypeUserAuthorizationModel = (TVTypeUserAuthorizationModel)jsonResult.Data;
                    Assert.AreEqual("", tvTypeUserAuthorizationModel.Error);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.ContactTVItemID, tvTypeUserAuthorizationModel.ContactTVItemID);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.TVType, tvTypeUserAuthorizationModel.TVType);
                    Assert.AreEqual(tvTypeUserAuthorizationModelNew.TVAuth, tvTypeUserAuthorizationModel.TVAuth);


                    tvTypeUserAuthorizationModel.TVAuth = TVAuthEnum.Create;

                    // Act
                    jsonResult = controller.SetUserTVTypeAuthJSON(tvTypeUserAuthorizationModel) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    TVTypeUserAuthorizationModel tvTypeUserAuthorizationModel2 = (TVTypeUserAuthorizationModel)jsonResult.Data;
                    Assert.AreEqual("", tvTypeUserAuthorizationModel2.Error);
                    Assert.AreEqual(tvTypeUserAuthorizationModel.ContactTVItemID, tvTypeUserAuthorizationModel2.ContactTVItemID);
                    Assert.AreEqual(tvTypeUserAuthorizationModel.TVType, tvTypeUserAuthorizationModel2.TVType);
                    Assert.AreEqual(tvTypeUserAuthorizationModel.TVAuth, tvTypeUserAuthorizationModel2.TVAuth);

                    // Act
                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    // Act
                    jsonResult = controller.SetUserTVTypeAuthJSON(tvTypeUserAuthorizationModel) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    tvTypeUserAuthorizationModel2 = (TVTypeUserAuthorizationModel)jsonResult.Data;
                    Assert.AreEqual(ControllerRes.NeedToBeAnAdministrator, tvTypeUserAuthorizationModel2.Error);
                   
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
            routeData.Values.Add("controller", "Admin");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new AdminController();
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
            Assert.IsNotNull(controller._TVItemUserAuthorizationService);
            Assert.IsNotNull(controller._TVTypeUserAuthorizationService);
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
            shimAdminController = new ShimAdminController(controller);
            //shimBaseService = new ShimBaseService(controller._BaseService);
        }
        #endregion Functions private
    }
}
