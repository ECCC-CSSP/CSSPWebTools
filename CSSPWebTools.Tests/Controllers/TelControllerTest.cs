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
    /// Summary description for TelControllerTest2
    /// </summary>
    [TestClass]
    public class TelControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerAction = "";
        private string controllerName = "Tel";
        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private TelController controller { get; set; }

        // Testing variables
        private RandomService randomService { get; set; }
        private ShimTelController shimTelController { get; set; }
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
        public TelControllerTest()
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
        public void TelController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void TelController__telEditList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_telEditList";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);
                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);
                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);
                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    PartialViewResult partialViewResult = controller._telEditList(ContactTVItemID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    ContactModel contactModelRet = (ContactModel)partialViewResult.ViewBag.ContactModel;
                    Assert.AreEqual(contactModel.FirstName, contactModelRet.FirstName);
                    Assert.AreEqual(contactModel.Initial, contactModelRet.Initial);
                    Assert.AreEqual(contactModel.LastName, contactModelRet.LastName);

                    List<TelModel> telModelList = (List<TelModel>)partialViewResult.ViewBag.TelModelList;
                    Assert.AreEqual(1, telModelList.Count);
                    Assert.AreEqual(telModel.TelNumber, telModelList[0].TelNumber);
                    Assert.AreEqual(telModel.TelType, telModelList[0].TelType);

                    TelController telControllerRet = (TelController)partialViewResult.ViewBag.TelController;
                    Assert.IsNotNull(telControllerRet);
                }
            }
        }
        #endregion Testing Methods Views

        #region Testing Methods JSON
        [TestMethod]
        public void TelController_TelSaveJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "TelSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);

                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("TelNumber", "374829349");
                    fc.Add("TelTVItemID", tvItemModelTel.TVItemID.ToString());
                    fc.Add("TelType", ((int)TelTypeEnum.Personal).ToString());

                    JsonResult jsonResult = controller.TelSaveJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void TelController_TelSaveJSON_ContactTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "TelSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);

                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", "0"); // ContactTVItemID.ToString());
                    fc.Add("TelNumber", "374829349");
                    fc.Add("TelTVItemID", tvItemModelTel.TVItemID.ToString());
                    fc.Add("TelType", ((int)TelTypeEnum.Personal).ToString());

                    JsonResult jsonResult = controller.TelSaveJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.ContactTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void TelController_TelSaveJSON_TelNumber_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "TelSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);

                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("TelNumber", ""); //"374829349");
                    fc.Add("TelTVItemID", tvItemModelTel.TVItemID.ToString());
                    fc.Add("TelType", ((int)TelTypeEnum.Personal).ToString());

                    JsonResult jsonResult = controller.TelSaveJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.TelNumber), retStr);
                }
            }
        }
        [TestMethod]
        public void TelController_TelSaveJSON_TelType_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "TelSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);

                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("TelNumber", "374829349");
                    fc.Add("TelTVItemID", tvItemModelTel.TVItemID.ToString());
                    fc.Add("TelType", "0"); // ((int)TelTypeEnum.Personal).ToString());

                    JsonResult jsonResult = controller.TelSaveJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.TelType), retStr);
                }
            }
        }
        [TestMethod]
        public void TelController_TelSaveJSON_Add_Good_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "TelSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);

                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("TelNumber", "374829349");
                    fc.Add("TelTVItemID", "0"); // tvItemModelTel.TVItemID.ToString());
                    fc.Add("TelType", ((int)TelTypeEnum.Personal).ToString());

                    JsonResult jsonResult = controller.TelSaveJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void TelController_TelDeleteJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "TelDeleteJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);

                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("TelTVItemID", tvItemModelTel.TVItemID.ToString());

                    JsonResult jsonResult = controller.TelDeleteJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void TelController_TelDeleteJSON_ContactTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "TelDeleteJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);

                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", "0"); // ContactTVItemID.ToString());
                    fc.Add("TelTVItemID", tvItemModelTel.TVItemID.ToString());

                    JsonResult jsonResult = controller.TelDeleteJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.ContactTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void TelController_TelDeleteJSON_TelTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "TelDeleteJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    TVItemLinkModel tvItemLinkModel = telService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    TVItemModel tvItemModelContact = telService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    Assert.AreEqual("", tvItemModelContact.Error);

                    TelModel telModel = randomService.RandomTelModel(true);

                    Assert.AreEqual("", telModel.Error);

                    TVItemModel tvItemModelTel = telService._TVItemService.GetTVItemModelWithTVItemIDDB(telModel.TelTVItemID);

                    Assert.AreEqual("", tvItemModelTel.Error);

                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelTel, true);

                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("TelTVItemID", "0"); //tvItemModelTel.TVItemID.ToString());

                    JsonResult jsonResult = controller.TelDeleteJSON(fc) as JsonResult;

                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.TelTVItemID), retStr);
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
            controller = new TelController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;

            controller.SetRequestContext(requestContext);


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

            // TelController Asserts
            Assert.IsNotNull(controller._TelController);
            Assert.IsNotNull(controller._TelService);
            Assert.IsNotNull(controller._TVItemLinkService);

            // variables for testing
            randomService = new RandomService(languageEnum, user);
            telService = new TelService(languageEnum, user);
        }
        private void SetupShim()
        {
            shimTelController = new ShimTelController(controller);
        }
        #endregion Functions private
    }
}
