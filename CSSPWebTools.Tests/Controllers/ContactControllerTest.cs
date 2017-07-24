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
using System;
using System.Globalization;
using CSSPWebTools.Models;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest2
    /// </summary>
    [TestClass]
    public class ContactControllerTest : SetupData
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
        private ContactController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimContactController shimContactController { get; set; }
        private ResetPasswordService resetPasswordService { get; set; }
        private TVItemService tvItemService { get; set; }
        private TVItemLinkService tvItemLinkService { get; set; }
        private TelService telService { get; set; }
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
        public ContactControllerTest()
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
        public void ContactController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void ContactController_CheckFullNameUniquenessJSON_Unique_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckFullNameUniquenessJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string FullName = "unique,G,Allain";
                    JsonResult jsonResult = controller.CheckFullNameUniquenessJSON(FullName) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckFullNameUniquenessJSON_Not_Unique_not_loggedIn_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckFullNameUniquenessJSON";
                contactModel = null; // contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string FullName = contactModelListGood[0].FirstName + "," + contactModelListGood[0].Initial + "," + contactModelListGood[0].LastName;
                    JsonResult jsonResult = controller.CheckFullNameUniquenessJSON(FullName) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsAlreadyTaken, contactModelListGood[0].FirstName + (string.IsNullOrEmpty(contactModelListGood[0].Initial) ? " " : " " + contactModelListGood[0].Initial + ", ") + contactModelListGood[0].LastName), Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckFullNameUniquenessJSON_Not_Unique_LoggedIn_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckFullNameUniquenessJSON";
                contactModel = contactModelListGood[0];
                ContactModel contactModel2 = contactModelListGood[1];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string FullName = contactModelListGood[1].FirstName + "," + contactModelListGood[1].Initial + "," + contactModelListGood[1].LastName;
                    JsonResult jsonResult = controller.CheckFullNameUniquenessJSON(FullName) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckEmailExistJSON_Exist_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckEmailExistJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string Email = contactModel.LoginEmail;
                    JsonResult jsonResult = controller.CheckEmailExistJSON(Email) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckEmailExistJSON_NotExist_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckEmailExistJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string Email = "Unique" + contactModel.LoginEmail;
                    JsonResult jsonResult = controller.CheckEmailExistJSON(Email) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._DoesNotExist, Email), Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckEmailUniquenessJSON_Unique_LoggedIn_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckEmailUniquenessJSON";
                contactModel = contactModelListGood[0];
                ContactModel contactModelRet = contactModelListGood[1];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string Email = "Unique" + contactModelRet.LoginEmail;
                    JsonResult jsonResult = controller.CheckEmailUniquenessJSON(Email) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckEmailUniquenessJSON_NotUnique_LoggedIn_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckEmailUniquenessJSON";
                contactModel = contactModelListGood[0];
                ContactModel contactModelRet = contactModelListGood[1];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string Email = contactModelRet.LoginEmail;
                    JsonResult jsonResult = controller.CheckEmailUniquenessJSON(Email) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsAlreadyTaken, Email), Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckEmailUniquenessJSON_Unique_NotLoggedIn_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckEmailUniquenessJSON";
                contactModel = null; // contactModelListGood[0];
                ContactModel contactModelRet = contactModelListGood[1];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string Email = "Unique" + contactModelRet.LoginEmail;
                    JsonResult jsonResult = controller.CheckEmailUniquenessJSON(Email) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckEmailUniquenessJSON_NotUnique_NotLoggedIn_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckEmailUniquenessJSON";
                contactModel = null; // contactModelListGood[0];
                ContactModel contactModelRet = contactModelListGood[1];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    string Email = contactModelRet.LoginEmail;
                    JsonResult jsonResult = controller.CheckEmailUniquenessJSON(Email) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsAlreadyTaken, Email), Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckCodeEmailExistJSON_Exist_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckCodeExistJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    string Email = contactModel.LoginEmail;

                    ResetPasswordModel resetPasswordModel = new ResetPasswordModel()
                    {
                        Email = contactModel.LoginEmail,
                        Code = "12345678",
                        Password = "abcdef2!",
                        ConfirmPassword = "abcdef2!",
                        ExpireDate_Local = DateTime.Now.AddDays(1),
                    };

                    ResetPasswordModel resetPasswordModelRet = resetPasswordService.PostAddResetPasswordDB(resetPasswordModel);

                    Assert.IsNotNull(resetPasswordModelRet);
                    Assert.AreEqual(resetPasswordModel.Email, resetPasswordModelRet.Email);
                    Assert.IsTrue(resetPasswordModelRet.Code.Length == 8);

                    string UniqueCodeLoginEmail = resetPasswordModelRet.Code + "," + resetPasswordModelRet.Email;
                    JsonResult jsonResult = controller.CheckCodeEmailExistJSON(UniqueCodeLoginEmail) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckCodeEmailExistJSON_NotExist_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckCodeExistJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    string Email = contactModel.LoginEmail;

                    ResetPasswordModel resetPasswordModel = new ResetPasswordModel()
                    {
                        Email = contactModel.LoginEmail,
                        Code = "12345678",
                        Password = "abcdef2!",
                        ConfirmPassword = "abcdef2!",
                        ExpireDate_Local = DateTime.Now.AddDays(1),
                    };

                    ResetPasswordModel resetPasswordModelRet = resetPasswordService.PostAddResetPasswordDB(resetPasswordModel);

                    Assert.IsNotNull(resetPasswordModelRet);
                    Assert.AreEqual(resetPasswordModel.Email, resetPasswordModelRet.Email);
                    Assert.IsTrue(resetPasswordModelRet.Code.Length == 8);

                    string UniqueCodeLoginEmail = resetPasswordModelRet.Code + ",NotExist" + resetPasswordModelRet.Email;
                    JsonResult jsonResult = controller.CheckCodeEmailExistJSON(UniqueCodeLoginEmail) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes.Code_ForEmail_DoesNotExist, resetPasswordModelRet.Code, "NotExist" + resetPasswordModelRet.Email), Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckWebNameUniquenessJSON_Unique_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckWebNameUniquenessJSON";

                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    string WebName = "Unique" + contactModelListGood[1].WebName;

                    JsonResult jsonResult = controller.CheckWebNameUniquenessJSON(WebName) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckWebNameUniquenessJSON_NotUnique_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckWebNameUniquenessJSON";

                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    string WebName = contactModelListGood[1].WebName;

                    JsonResult jsonResult = controller.CheckWebNameUniquenessJSON(WebName) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController_CheckWebNameUniquenessJSON_ChangingWebNameUniqueness_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CheckWebNameUniquenessJSON";

                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    string WebName = contactModelListGood[0].WebName;

                    JsonResult jsonResult = controller.CheckWebNameUniquenessJSON(WebName) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    string Status = (string)jsonResult.Data;
                    Assert.AreEqual("true", Status);
                }
            }
        }
        [TestMethod]
        public void ContactController__contactList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_contactList";

                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act 
                    TVItemModel tvItemModelSubsector = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    Assert.AreEqual("", tvItemModelSubsector.Error);

                    TVItemModel tvItemModelMunicipality = tvItemService.PostAddChildTVItemDB(tvItemModelSubsector.TVItemID, "Unique Municipality Name", TVTypeEnum.Municipality);

                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    int ContactTVItemID = 3;

                    TVItemLinkModel tvItemLinkModelNew = new TVItemLinkModel()
                    {
                        FromTVItemID = tvItemModelMunicipality.TVItemID,
                        ToTVItemID = ContactTVItemID,
                        FromTVType = TVTypeEnum.Municipality,
                        ToTVType = TVTypeEnum.Contact,
                        Ordinal = 0,
                        TVLevel = 0,
                        TVPath = "p" + tvItemModelMunicipality.TVItemID + "p" + ContactTVItemID,
                    };

                    TVItemLinkModel tvItemLinkModel = tvItemLinkService.PostAddTVItemLinkDB(tvItemLinkModelNew);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    string Q = "!Login/aaa/bbb|||" + tvItemModelMunicipality.TVItemID + "/1|||";

                    PartialViewResult partialViewResult = controller._contactList(Q) as PartialViewResult;

                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModel = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(urlModel);
                    Assert.AreEqual(tvItemModelMunicipality.TVItemID, urlModel.TVItemIDList[0]);

                    List<ContactModel> contactModelList = (List<ContactModel>)partialViewResult.ViewBag.ContactModelList;
                    Assert.IsNotNull(contactModelList);
                    Assert.AreEqual(1, contactModelList.Count);
                    Assert.AreEqual(ContactTVItemID, contactModelList[0].ContactTVItemID);
                }
            }
        }
        [TestMethod]
        public void ContactController_ContactSearchJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "ContactSearchJSON";

                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    string SearchTerm = contactModelListGood[0].FirstName.Substring(0, 4);

                    JsonResult jsonResult = controller.ContactSearchJSON(SearchTerm) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    List<ContactSearchModel> contactSearchModelList = (List<ContactSearchModel>)jsonResult.Data;
                    Assert.IsTrue(contactSearchModelList.Where(c => c.ContactID == contactModelListGood[0].ContactID).Any());

                    SetupTest(contactModelListGood[1], culture, controllerAction);

                    SearchTerm = contactModelListGood[0].FirstName.Substring(0, 4);

                    jsonResult = controller.ContactSearchJSON(SearchTerm) as JsonResult;

                    Assert.IsNotNull(jsonResult);
                    contactSearchModelList = (List<ContactSearchModel>)jsonResult.Data;
                    Assert.AreEqual(3, contactSearchModelList.Count);
                }
            }
        }
        [TestMethod]
        public void ContactController_ContactDeleteJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "ContactDeleteJSON";

                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act 
                    TVItemModel tvItemModelSubsector = randomService.RandomTVItem(TVTypeEnum.Subsector);

                    Assert.AreEqual("", tvItemModelSubsector.Error);

                    TVItemModel tvItemModelMunicipality = tvItemService.PostAddChildTVItemDB(tvItemModelSubsector.TVItemID, "Unique Municipality Name", TVTypeEnum.Municipality);

                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    TVItemLinkModel tvItemLinkModelNew = new TVItemLinkModel()
                    {
                        FromTVItemID = tvItemModelMunicipality.TVItemID,
                        ToTVItemID = contactModelListGood[0].ContactTVItemID,
                        FromTVType = TVTypeEnum.Municipality,
                        ToTVType = TVTypeEnum.Contact,
                        Ordinal = 0,
                        TVLevel = 0,
                        TVPath = "p" + tvItemModelMunicipality.TVItemID + "p" + contactModelListGood[0].ContactTVItemID,
                    };

                    TVItemLinkModel tvItemLinkModel = tvItemLinkService.PostAddTVItemLinkDB(tvItemLinkModelNew);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    string TelNumber = "3873847847";
                    TVItemModel tvItemModelTel = tvItemService.PostAddChildTVItemDB(1, TelNumber, TVTypeEnum.Tel);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    TelModel telModelNew = new TelModel()
                    {
                        TelNumber = TelNumber,
                        TelType = TelTypeEnum.Mobile,
                        TelTVItemID = tvItemModelTel.TVItemID,
                    };

                    TelModel telModel = telService.PostAddTelDB(telModelNew);

                    Assert.AreEqual("", telModel.Error);

                    tvItemLinkModelNew = new TVItemLinkModel()
                    {
                        FromTVItemID = contactModelListGood[0].ContactTVItemID,
                        ToTVItemID = tvItemModelTel.TVItemID,
                        FromTVType = TVTypeEnum.Contact,
                        ToTVType = TVTypeEnum.Tel,
                        Ordinal = 0,
                        TVLevel = 0,
                        TVPath = "p" + contactModelListGood[0].ContactTVItemID + "p" + tvItemModelTel.TVItemID,
                    };

                    tvItemLinkModel = tvItemLinkService.PostAddTVItemLinkDB(tvItemLinkModelNew);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    System.Web.Mvc.FormCollection fc = new System.Web.Mvc.FormCollection();
                    fc.Add("ParentTVItemID", tvItemModelMunicipality.TVItemID.ToString());
                    fc.Add("ContactTVItemID", contactModelListGood[0].ContactTVItemID.ToString());

                    JsonResult jsonResult = controller.ContactDeleteJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
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
            routeData.Values.Add("controller", "Contact");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new ContactController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;
            randomService = new RandomService(languageEnum, user);
            resetPasswordService = new ResetPasswordService(languageEnum, user);
            tvItemService = new TVItemService(languageEnum, user);
            tvItemLinkService = new TVItemLinkService(languageEnum, user);
            telService = new TelService(languageEnum, user);

            controller.SetRequestContext(requestContext);

            Assert.IsNotNull(controller);
            Assert.AreEqual(2, controller.CultureListAllowable.Count);
            Assert.AreEqual("en-CA", controller.CultureListAllowable[0]);
            Assert.AreEqual("fr-CA", controller.CultureListAllowable[1]);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(controller.urlModel);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("Contact", controller._RequestContext.RouteData.Values["controller"].ToString());
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
            shimContactController = new ShimContactController(controller);
        }
        #endregion Functions private

    }
}
