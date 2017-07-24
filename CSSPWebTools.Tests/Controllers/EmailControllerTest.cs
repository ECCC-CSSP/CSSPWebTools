using CSSPWebTools.Controllers;
using CSSPWebTools.Controllers.Fakes;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Fakes;
using CSSPWebTools.Tests.SetupInfo;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using CSSPWebToolsDBDLL.Services.Fakes;
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
using System.Threading;
using System.Diagnostics;
using CSSPWebToolsDBDLL.Services.Resources;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for EmailControllerTest2
    /// </summary>
    [TestClass]
    public class EmailControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerAction = "";
        private string controllerName = "Email";
        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private EmailController controller { get; set; }

        // Testing variables
        private RandomService randomService { get; set; }
        private ShimEmailController shimEmailController { get; set; }
        private EmailService emailService { get; set; }

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
        public EmailControllerTest()
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

        #region Testing Methods Views
        [TestMethod]
        public void EmailController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void EmailController__emailEditList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_emailEditList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    PartialViewResult partialViewResult = controller._emailEditList(ContactTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    ContactModel contactModelRet = (ContactModel)partialViewResult.ViewBag.ContactModel;
                    Assert.AreEqual(contactModel.FirstName, contactModelRet.FirstName);
                    Assert.AreEqual(contactModel.Initial, contactModelRet.Initial);
                    Assert.AreEqual(contactModel.LastName, contactModelRet.LastName);

                    List<EmailModel> emailModelList = (List<EmailModel>)partialViewResult.ViewBag.EmailModelList;
                    Assert.AreEqual(1, emailModelList.Count);
                    Assert.AreEqual(emailModel.EmailType, emailModelList[0].EmailType);
                    Assert.AreEqual(emailModel.EmailAddress, emailModelList[0].EmailAddress);

                    EmailController emailControllerRet = (EmailController)partialViewResult.ViewBag.EmailController;
                    Assert.IsNotNull(emailControllerRet);

                    EmailService emailServiceRet = (EmailService)partialViewResult.ViewBag.EmailService;
                    Assert.IsNotNull(emailServiceRet);

                }
            }
        }
        #endregion Testing Methods Views

        #region Testing Methods JSON
        [TestMethod]
        public void EmailController_EmailSaveJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "EmailSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("EmailAddress", randomService.RandomEmail());
                    fc.Add("EmailTVItemID", tvItemModelEmail.TVItemID.ToString());
                    fc.Add("EmailType", ((int)EmailTypeEnum.Personal).ToString());


                    // Act
                    JsonResult jsonResult = controller.EmailSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void EmailController_EmailSaveJSON_ContactTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "EmailSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", "0"); // ContactTVItemID.ToString());
                    fc.Add("EmailAddress", randomService.RandomEmail());
                    fc.Add("EmailTVItemID", tvItemModelEmail.TVItemID.ToString());
                    fc.Add("EmailType", ((int)EmailTypeEnum.Personal).ToString());


                    // Act
                    JsonResult jsonResult = controller.EmailSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.ContactTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void EmailController_EmailSaveJSON_EmailAddress_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "EmailSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("EmailAddress", ""); //randomService.RandomEmail());
                    fc.Add("EmailTVItemID", tvItemModelEmail.TVItemID.ToString());
                    fc.Add("EmailType", ((int)EmailTypeEnum.Personal).ToString());


                    // Act
                    JsonResult jsonResult = controller.EmailSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.EmailAddress), retStr);
                }
            }
        }
        [TestMethod]
        public void EmailController_EmailSaveJSON_EmailType_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "EmailSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("EmailAddress", randomService.RandomEmail());
                    fc.Add("EmailTVItemID", tvItemModelEmail.TVItemID.ToString());
                    fc.Add("EmailType", "0"); // ((int)EmailTypeEnum.Personal).ToString());


                    // Act
                    JsonResult jsonResult = controller.EmailSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.EmailType), retStr);
                }
            }
        }
        [TestMethod]
        public void EmailController_EmailSaveJSON_Add_Good_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "EmailSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("EmailAddress", randomService.RandomEmail());
                    fc.Add("EmailTVItemID", "0"); // tvItemModelEmail.TVItemID.ToString());
                    fc.Add("EmailType", ((int)EmailTypeEnum.Personal).ToString());


                    // Act
                    JsonResult jsonResult = controller.EmailSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void EmailController_EmailDeleteJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "EmailDeleteJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("EmailTVItemID", tvItemModelEmail.TVItemID.ToString());


                    // Act
                    JsonResult jsonResult = controller.EmailDeleteJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void EmailController_EmailDeleteJSON_ContactTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "EmailDeleteJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", "0"); // ContactTVItemID.ToString());
                    fc.Add("EmailTVItemID", tvItemModelEmail.TVItemID.ToString());


                    // Act
                    JsonResult jsonResult = controller.EmailDeleteJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.ContactTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void EmailController_EmailDeleteJSON_EmailTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "EmailDeleteJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = emailService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    EmailModel emailModel = randomService.RandomEmailModel(true);

                    // Assert
                    Assert.AreEqual("", emailModel.Error);

                    // Act
                    TVItemModel tvItemModelEmail = emailService._TVItemService.GetTVItemModelWithTVItemIDDB(emailModel.EmailTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelEmail.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelEmail, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("EmailTVItemID", "0"); // tvItemModelEmail.TVItemID.ToString());


                    // Act
                    JsonResult jsonResult = controller.EmailDeleteJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.EmailTVItemID), retStr);
                }
            }
        }
        #endregion Testing Methods JSON

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
            routeData.Values.Add("controller", controllerName);
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new EmailController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;

            controller.SetRequestContext(requestContext);

            // Assert

            // BaseController Asserts 
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
            Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.LanguageRequest);
            Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.ViewBag.Language);
            Assert.AreEqual(culture.Name, controller.CultureRequest);
            Assert.AreEqual(culture.Name, controller.ViewBag.Culture);
            Assert.AreEqual(Thread.CurrentThread.CurrentCulture, culture);
            Assert.AreEqual(Thread.CurrentThread.CurrentUICulture, culture);
            if (contactModelToDo != null)
            {
                Assert.AreEqual(contactModelToDo.IsAdmin, controller.IsAdmin);
                Assert.AreEqual(contactModelToDo.IsAdmin, controller.ViewBag.IsAdmin);
            }
            Assert.AreEqual(true, controller.Debug);
            Assert.AreEqual(true, controller.ViewBag.Debug);

            // EmailController Asserts
            Assert.IsNotNull(controller._EmailController);
            Assert.IsNotNull(controller._EmailService);
            Assert.IsNotNull(controller._TVItemLinkService);

            // variables for testing
            randomService = new RandomService(languageEnum, user);
            emailService = new EmailService(languageEnum, user);
        }
        private void SetupShim()
        {
            shimEmailController = new ShimEmailController(controller);
        }
        #endregion Functions private
    }
}
