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
using System;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest2
    /// </summary>
    [TestClass]
    public class AccountControllerTest : SetupData
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
        private AccountController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimAccountController shimAccountController { get; set; }
        private ShimBaseService shimBaseService { get; set; }
        private ShimContactService shimContactService { get; set; }
        private ResetPasswordService resetPasswordService { get; set; }
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
        public AccountControllerTest()
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
        public void AccountController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void AccountController__ForgotPassword_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_ForgotPassword";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    PartialViewResult partialViewResult = controller._ForgotPassword() as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                }
            }
        }
        [TestMethod]
        public void AccountController__ForgotPasswordEmailSent_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_ForgotPasswordEmailSent";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    PartialViewResult partialViewResult = controller._ForgotPasswordEmailSent() as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                }
            }
        }
        [TestMethod]
        public void AccountController_ForgotPasswordJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "ForgotPasswordJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    ResetPasswordModel resetPasswordModelNew = new ResetPasswordModel()
                    {
                        Code = "12345678",
                        Email = contactModel.LoginEmail,
                        ExpireDate_Local = DateTime.Now,
                        Password = "NewPassword",
                        ConfirmPassword = "NewPassword",
                    };

                    // Act
                    ResetPasswordModel resetPasswordModelRet = resetPasswordService.PostAddResetPasswordDB(resetPasswordModelNew);

                    // Assert
                    Assert.AreEqual("", resetPasswordModelRet.Error);

                    // Act
                    JsonResult jsonResult = controller.ForgotPasswordJSON(resetPasswordModelNew) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    ContactModel contactModelRet = (ContactModel)jsonResult.Data;
                    Assert.AreEqual("", contactModelRet.Error);
                    Assert.AreEqual(contactModel.FirstName, contactModelRet.FirstName);
                }
            }
        }
        [TestMethod]
        public void AccountController_IsAdminJSON_true_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "IsAdminJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    JsonResult jsonResult = controller.IsAdminJSON() as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    Assert.AreEqual("true", jsonResult.Data);
                }
            }
        }
        [TestMethod]
        public void AccountController_IsAdminJSON_false_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "IsAdminJSON";
                contactModel = contactModelListGood[1];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    JsonResult jsonResult = controller.IsAdminJSON() as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);
                    Assert.AreEqual("false", jsonResult.Data);
                }
            }
        }
        [TestMethod]
        public void AccountController_LoggedInUserCreateNewUserJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "LoggedInUserCreateNewUserJSON";
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);

                NewContactModel newContactModel = new NewContactModel
                {
                    LoginEmail = "Test.LoginEmail@hotmail.com",
                    FirstName = "FirstNameTest",
                    LastName = "LastNameTest",
                    Initial = "",
                };

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    JsonResult jsonResult = controller.LoggedInUserCreateNewUserJSON(newContactModel) as JsonResult;

                    // Assert
                    ContactModel contactModelResult = (ContactModel)jsonResult.Data;
                    Assert.IsNotNull(contactModelResult);
                    Assert.AreEqual("", contactModelResult.Error);
                    Assert.AreEqual(newContactModel.LoginEmail, contactModelResult.LoginEmail);
                }
            }
        }
        [TestMethod]
        public void AccountController__Login_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_Login";
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);


                using (TransactionScope ts = new TransactionScope())
                {
                    for (int i = 0; i < 10; i++)
                    {
                        // Act
                        string ReturnURL = randomService.RandomString("", 30);
                        PartialViewResult partialViewResult = controller._Login(ReturnURL) as PartialViewResult;

                        // Assert
                        Assert.IsNotNull(partialViewResult);
                        Assert.AreEqual(ReturnURL, partialViewResult.ViewBag.LoginModel.ReturnURL);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController_LoginJSON_Good_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "LoginJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    LoginModel loginModel = new LoginModel();
                    loginModel.Email = contactModel.LoginEmail;
                    loginModel.Password = "Charles2!";
                    loginModel.ReturnURL = "http://localhost:8080/en-CA/Home/_home";

                    // Act
                    using (ShimsContext.Create())
                    {
                        // Arrange
                        SetupShim();
                        shimAccountController.GetSignInManagerPasswordSignInLoginModel = (a) =>
                        {
                            return SignInStatus.Success;
                        };

                        // Act
                        JsonResult jsonResult = controller.LoginJSON(loginModel) as JsonResult;

                        // Assert
                        Assert.IsNotNull(jsonResult);
                        LoginModel loginModelRet = (LoginModel)jsonResult.Data;
                        Assert.AreEqual("", loginModelRet.Error);
                        Assert.AreEqual(loginModel.Email, loginModelRet.Email);
                        Assert.AreEqual(loginModel.RememberMe, loginModelRet.RememberMe);
                        Assert.AreEqual("", loginModelRet.Password);
                        Assert.AreEqual(loginModel.ReturnURL, loginModelRet.ReturnURL);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController_LoginJSON_NotGood_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "LoginJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    LoginModel loginModel = new LoginModel();
                    loginModel.Email = contactModel.LoginEmail;
                    loginModel.Password = "NotGoodCharles2!";
                    loginModel.ReturnURL = "http://localhost:8080/en-CA/Home/_home";

                    // Act
                    using (ShimsContext.Create())
                    {
                        // Arrange
                        SetupShim();
                        shimAccountController.GetSignInManagerPasswordSignInLoginModel = (a) =>
                        {
                            return SignInStatus.Failure;
                        };

                        // Act
                        JsonResult jsonResult = controller.LoginJSON(loginModel) as JsonResult;

                        // Assert
                        Assert.IsNotNull(jsonResult);
                        LoginModel loginModelRet = (LoginModel)jsonResult.Data;
                        Assert.AreEqual(ControllerRes.EmailOrPasswordIncorrect, loginModelRet.Error);
                        Assert.AreEqual(loginModel.Email, loginModelRet.Email);
                        Assert.AreEqual(loginModel.RememberMe, loginModelRet.RememberMe);
                        Assert.AreEqual("", loginModelRet.Password);
                        Assert.AreEqual(loginModel.ReturnURL, loginModelRet.ReturnURL);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController_LoginJSON_LoginModelOK_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "LoginJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    LoginModel loginModel = new LoginModel();
                    loginModel.Email = ""; // contactModel.LoginEmail;
                    loginModel.Password = "Charles2!";
                    loginModel.ReturnURL = "http://localhost:8080/en-CA/Home/_home";

                    // Act
                    using (ShimsContext.Create())
                    {
                        // Arrange
                        string ErrorText = "ErrorText";
                        SetupShim();
                        shimContactService.LoginModelOKLoginModel = (a) =>
                        {
                            return ErrorText;
                        };

                        // Act
                        JsonResult jsonResult = controller.LoginJSON(loginModel) as JsonResult;

                        // Assert
                        Assert.IsNotNull(jsonResult);
                        LoginModel loginModelRet = (LoginModel)jsonResult.Data;
                        Assert.AreEqual(ControllerRes.EmailOrPasswordIncorrect, loginModelRet.Error);
                        Assert.AreEqual(loginModel.Email, loginModelRet.Email);
                        Assert.AreEqual(loginModel.RememberMe, loginModelRet.RememberMe);
                        Assert.AreEqual("", loginModelRet.Password);
                        Assert.AreEqual(loginModel.ReturnURL, loginModelRet.ReturnURL);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController_LoginJSON_Return_Null_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "LoginJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    LoginModel loginModel = new LoginModel();
                    loginModel.Email = contactModel.LoginEmail;
                    loginModel.Password = "Charles2!";
                    loginModel.ReturnURL = null;

                    // Act
                    using (ShimsContext.Create())
                    {
                        // Arrange
                        SetupShim();
                        shimAccountController.GetSignInManagerPasswordSignInLoginModel = (a) =>
                        {
                            return SignInStatus.Success;
                        };

                        // Act
                        JsonResult jsonResult = controller.LoginJSON(loginModel) as JsonResult;

                        // Assert
                        Assert.IsNotNull(jsonResult);
                        LoginModel loginModelRet = (LoginModel)jsonResult.Data;
                        Assert.AreEqual("", loginModelRet.Error);
                        Assert.AreEqual(loginModel.Email, loginModelRet.Email);
                        Assert.AreEqual(loginModel.RememberMe, loginModelRet.RememberMe);
                        Assert.AreEqual("", loginModelRet.Password);
                        Assert.AreEqual(loginModel.ReturnURL, loginModelRet.ReturnURL);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController_LogOffJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "LogOffJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    using (ShimsContext.Create())
                    {
                        SetupShim();
                        shimAccountController.AuthenticationManagerSignOut = () => { };

                        // Act
                        JsonResult jsonResult = controller.LogOffJSON() as JsonResult;

                        // Assert
                        Assert.IsNotNull(jsonResult);
                        Assert.AreEqual("", jsonResult.Data);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController__Register_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_Register";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    PartialViewResult partialViewResult = controller._Register() as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                }
            }
        }
        [TestMethod]
        public void AccountController_RegisterJSON_Good_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "RegisterJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    RegisterModel registerModel = new RegisterModel()
                    {
                        LoginEmail = "New" + contactModel.LoginEmail,
                        Password = "Charles22!",
                        ConfirmPassword = "Charles22!",
                        FirstName = "FirstName",
                        Initial = "Initial",
                        LastName = "LastName",
                        WebName = "WebName",
                    };
                    // Act
                    using (ShimsContext.Create())
                    {
                        // Arrange
                        SetupShim();
                        shimAccountController.GetSignInManagerPasswordSignInLoginModel = (a) =>
                        {
                            return SignInStatus.Success;
                        };

                        // Act
                        JsonResult jsonResult = controller.RegisterJSON(registerModel) as JsonResult;

                        // Assert
                        Assert.IsNotNull(jsonResult);
                        ContactModel contactModelRet = (ContactModel)jsonResult.Data;
                        Assert.AreEqual("", contactModelRet.Error);
                        Assert.AreEqual(registerModel.LoginEmail, contactModelRet.LoginEmail);
                        Assert.AreEqual(registerModel.FirstName, contactModelRet.FirstName);
                        Assert.AreEqual(registerModel.Initial, contactModelRet.Initial);
                        Assert.AreEqual(registerModel.LastName, contactModelRet.LastName);
                        Assert.AreEqual(registerModel.WebName, contactModelRet.WebName);
                        Assert.AreEqual(false, contactModelRet.EmailValidated);
                        Assert.AreEqual(false, contactModelRet.Disabled);
                        Assert.AreEqual(false, contactModelRet.IsAdmin);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController_RegisterJSON_PostRegisterNewContactDB_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "RegisterJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    RegisterModel registerModel = new RegisterModel()
                    {
                        LoginEmail = "",
                        Password = "Charles22!",
                        ConfirmPassword = "Charles22!",
                        FirstName = "FirstName",
                        Initial = "Initial",
                        LastName = "LastName",
                        WebName = "WebName",
                    };
                    // Act
                    using (ShimsContext.Create())
                    {
                        // Arrange

                        // Act
                        JsonResult jsonResult = controller.RegisterJSON(registerModel) as JsonResult;

                        // Assert
                        Assert.IsNotNull(jsonResult);
                        ContactModel contactModelRet = (ContactModel)jsonResult.Data;
                        Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.Email), contactModelRet.Error);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController_RegisterJSON_GetSignInManagerPasswordSignIn_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "RegisterJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    RegisterModel registerModel = new RegisterModel()
                    {
                        LoginEmail = "New" + contactModel.LoginEmail,
                        Password = "Charles22!",
                        ConfirmPassword = "Charles22!",
                        FirstName = "FirstName",
                        Initial = "Initial",
                        LastName = "LastName",
                        WebName = "WebName",
                    };
                    // Act
                    using (ShimsContext.Create())
                    {
                        // Arrange
                        // Arrange
                        SetupShim();
                        shimAccountController.GetSignInManagerPasswordSignInLoginModel = (a) =>
                        {
                            return SignInStatus.Failure;
                        };

                        // Act
                        JsonResult jsonResult = controller.RegisterJSON(registerModel) as JsonResult;

                        // Assert
                        Assert.IsNotNull(jsonResult);
                        ContactModel contactModelRet = (ContactModel)jsonResult.Data;
                        Assert.AreEqual(ControllerRes.EmailOrPasswordIncorrect, contactModelRet.Error);
                    }
                }
            }
        }
        [TestMethod]
        public void AccountController_TryToSendEmailJSON_Good_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "TryToSendEmailJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    JsonResult JsonResult = controller.TryToSendEmailJSON(contactModel.LoginEmail) as JsonResult;

                    // Assert
                    Assert.IsNotNull(JsonResult);
                    Assert.AreEqual("", (string)JsonResult.Data);
                }
            }
        }
        [TestMethod]
        public void AccountController_TryToSendEmailJSON_NotGood_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "TryToSendEmailJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    JsonResult JsonResult = controller.TryToSendEmailJSON("Not" + contactModel.LoginEmail) as JsonResult;

                    // Assert
                    Assert.IsNotNull(JsonResult);
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.Contact, ServiceRes.Email, "Not" + contactModel.LoginEmail), (string)JsonResult.Data);
                }
            }
        }
        [TestMethod]
        public void AccountController_TryToSendEmailJSON_EmailNotWellFormed_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "TryToSendEmailJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    JsonResult JsonResult = controller.TryToSendEmailJSON("Not@" + contactModel.LoginEmail) as JsonResult;

                    // Assert
                    Assert.IsNotNull(JsonResult);
                    Assert.AreEqual(string.Format(ServiceRes._EmailNotWellFormed, "Not@" + contactModel.LoginEmail), (string)JsonResult.Data);
                }
            }
        }
        [TestMethod]
        public void AccountController_TryToSendEmailJSON_EmailRequired_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "TryToSendEmailJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    JsonResult JsonResult = controller.TryToSendEmailJSON("") as JsonResult;

                    // Assert
                    Assert.IsNotNull(JsonResult);
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.Email), (string)JsonResult.Data);
                }
            }
        }
        [TestMethod]
        public void AccountController_TryToSendEmailJSON_EmailTooLong_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "TryToSendEmailJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    JsonResult JsonResult = controller.TryToSendEmailJSON(randomService.RandomString("", 255) + randomService.RandomEmail()) as JsonResult;

                    // Assert
                    Assert.IsNotNull(JsonResult);
                    Assert.AreEqual(string.Format(ServiceRes._MaxLengthIs_, ServiceRes.Email, 255), (string)JsonResult.Data);
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
            routeData.Values.Add("controller", "Account");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new AccountController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;
            randomService = new RandomService(languageEnum, user);
            resetPasswordService = new ResetPasswordService(languageEnum, user);

            controller.SetRequestContext(requestContext);

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(2, controller.CultureListAllowable.Count);
            Assert.AreEqual("en-CA", controller.CultureListAllowable[0]);
            Assert.AreEqual("fr-CA", controller.CultureListAllowable[1]);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("Account", controller._RequestContext.RouteData.Values["controller"].ToString());
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
            shimAccountController = new ShimAccountController(controller);
            shimContactService = new ShimContactService(controller._ContactService);
        }
        #endregion Functions private
    }
}
