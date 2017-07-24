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
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest2
    /// </summary>
    [TestClass]
    public class DialogControllerTest : SetupData
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
        private DialogController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimDialogController shimDialogController { get; set; }

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
        public DialogControllerTest()
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
        public void DialogController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void DialogController__dialogBasic_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_dialogBasic";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    PartialViewResult partialViewResult = controller._dialogBasic() as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);
                }
            }
        }
        [TestMethod]
        public void DialogController__dialogPermissions_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_dialogBasic";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {

                    // Act
                    PartialViewResult partialViewResult = controller._dialogPermissions(TVAuthEnum.Write) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    TVAuthEnum tvAuth = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                    Assert.AreEqual(TVAuthEnum.Write, tvAuth);

                    List<ContactModel> contactModelListAdmin = (List<ContactModel>)partialViewResult.ViewBag.AdminContactModelList;
                    Assert.IsTrue(contactModelListAdmin.Count > 0);
                    Assert.IsTrue(contactModelListAdmin.Where(c => c.LastName == "LeBlanc").Any());

                    DialogController dialogController = (DialogController)partialViewResult.ViewBag.DialogController;
                    Assert.IsNotNull(dialogController);
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
            routeData.Values.Add("controller", "Dialog");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new DialogController();
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
            Assert.IsNotNull(controller._DialogController);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("Dialog", controller._RequestContext.RouteData.Values["controller"].ToString());
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
            shimDialogController = new ShimDialogController(controller);
        }
        #endregion Functions private
    }
}
