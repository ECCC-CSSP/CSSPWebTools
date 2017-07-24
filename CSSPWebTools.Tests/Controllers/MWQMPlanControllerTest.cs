using CSSPWebTools.Controllers;
using CSSPWebTools.Controllers.Fakes;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Fakes;
using CSSPWebTools.Tests.SetupInfo;
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
using System;
using System.IO;
using CSSPModelsDLL.Models;
using CSSPWebToolsDBDLL.Services;
using CSSPEnumsDLL.Enums;
using CSSPWebToolsDBDLL;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for MikeScenarioControllerTest2
    /// </summary>
    [TestClass]
    public class MWQMPlanControllerTest : SetupData
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
        private MWQMPlanController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimMWQMPlanController shimMWQMPlanController { get; set; }
        private MWQMPlanService mwqmPlanService { get; set; }
        private TVItemService tvItemService { get; set; }
        private MWQMPlanSubsectorService mwqmPlanSubsectorService { get; set; }
        private MWQMPlanSubsectorSiteService mwqmPlanSubsectorSiteService { get; set; }
        private LabSheetService labSheetService { get; set; }
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
        public MWQMPlanControllerTest()
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
        public void MWQMPlanController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void MWQMPlanController__MWQMPlanAddOrModify_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    RetAddMWQMPlan retAddMWQMPlan = AddMWQMPlanAndSubElements((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en));

                    PartialViewResult partialViewResult = controller._MWQMPlanAddOrModify(retAddMWQMPlan.TVItemModelNB.TVItemID, retAddMWQMPlan.MWQMPlanModel.MWQMPlanID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    MWQMPlanController mwqmPlanController = (MWQMPlanController)partialViewResult.ViewBag.MWQMPlanController;
                    Assert.IsNotNull(mwqmPlanController);

                    int ProvinceTVItemIDRet = (int)partialViewResult.ViewBag.ProvinceTVItemID;
                    Assert.AreEqual(retAddMWQMPlan.TVItemModelNB.TVItemID, ProvinceTVItemIDRet);

                    int MWQMPlanIDRet = (int)partialViewResult.ViewBag.MWQMPlanID;
                    Assert.AreEqual(retAddMWQMPlan.MWQMPlanModel.MWQMPlanID, MWQMPlanIDRet);

                    MWQMPlanModel MWQMPlanModelRet = (MWQMPlanModel)partialViewResult.ViewBag.MWQMPlanModel;
                    Assert.IsNotNull(MWQMPlanModelRet);
                    Assert.AreEqual(retAddMWQMPlan.MWQMPlanModel.MWQMPlanID, MWQMPlanModelRet.MWQMPlanID);

                    List<MWQMPlanSubsectorModel> MWQMPlanSubsectorModelListRet = (List<MWQMPlanSubsectorModel>)partialViewResult.ViewBag.MWQMPlanSubsectorModelList;
                    Assert.IsTrue(MWQMPlanSubsectorModelListRet.Count == 1);

                    List<ContactModel> AdminContactModelListRet = (List<ContactModel>)partialViewResult.ViewBag.AdminContactModelList;
                    Assert.IsNull(AdminContactModelListRet); // because IsMWQMPlanner == true

                    ContactModel ContactModelRet = (ContactModel)partialViewResult.ViewBag.ContactModel;
                    Assert.IsNotNull(ContactModelRet);
                    Assert.AreEqual(contactModelListGood[0].ContactTVItemID, ContactModelRet.ContactTVItemID);

                    List<TVItemModel> TVItemModelSubsectorListRet = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelSubsectorList;
                    Assert.IsTrue(TVItemModelSubsectorListRet.Count > 0);

                    List<SampleTypeEnumTextOrdered> SampleTypeEnumTextOrderedListRet = (List<SampleTypeEnumTextOrdered>)partialViewResult.ViewBag.SampleTypeEnumTextOrderedList;
                    Assert.IsTrue(SampleTypeEnumTextOrderedListRet.Count > 0);

                    SampleTypeEnumTextOrdered SampleTypeEnumTextOrderedFirstRet = (SampleTypeEnumTextOrdered)partialViewResult.ViewBag.SampleTypeEnumTextOrderedFirst;
                    Assert.IsNotNull(SampleTypeEnumTextOrderedFirstRet);
                    Assert.AreEqual(SampleTypeEnum.Routine, SampleTypeEnumTextOrderedFirstRet.SampleType);

                    bool IsMWQMPlannerRet = (bool)partialViewResult.ViewBag.IsMWQMPlanner;
                    Assert.IsTrue(IsMWQMPlannerRet);
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController__MWQMPlanMWQMSites_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    RetAddMWQMPlan retAddMWQMPlan = AddMWQMPlanAndSubElements((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en));

                    PartialViewResult partialViewResult = controller._MWQMPlanMWQMSites(retAddMWQMPlan.MWQMPlanModel.MWQMPlanID, retAddMWQMPlan.TVItemModelNB.TVItemID, retAddMWQMPlan.TVItemModelSS.TVItemID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    int MWQMPlanIDRet = (int)partialViewResult.ViewBag.MWQMPlanID;
                    Assert.AreEqual(retAddMWQMPlan.MWQMPlanModel.MWQMPlanID, MWQMPlanIDRet);

                    int ProvinceTVItemIDRet = (int)partialViewResult.ViewBag.ProvinceTVItemID;
                    Assert.AreEqual(retAddMWQMPlan.TVItemModelNB.TVItemID, ProvinceTVItemIDRet);

                    int SubsectorTVItemIDRet = (int)partialViewResult.ViewBag.SubsectorTVItemID;
                    Assert.AreEqual(retAddMWQMPlan.TVItemModelSS.TVItemID, SubsectorTVItemIDRet);

                    List<MWQMPlanSubsectorSiteModel> MWQMPlanSubsectorSiteModelListRet = (List<MWQMPlanSubsectorSiteModel>)partialViewResult.ViewBag.MWQMPlanSubsectorSiteModelList;
                    Assert.IsTrue(MWQMPlanSubsectorSiteModelListRet.Count == 1);

                    List<TVItemModel> TVItemModelMWQMSiteListRet = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelMWQMSiteList;
                    Assert.IsTrue(TVItemModelMWQMSiteListRet.Count > 0);

                    List<ContactModel> AdminContactModelListRet = (List<ContactModel>)partialViewResult.ViewBag.AdminContactModelList;
                    Assert.IsNull(AdminContactModelListRet); // because IsMWQMPlanner == true

                    bool IsMWQMPlannerRet = (bool)partialViewResult.ViewBag.IsMWQMPlanner;
                    Assert.IsTrue(IsMWQMPlannerRet);

                    ContactModel ContactModelRet = (ContactModel)partialViewResult.ViewBag.ContactModel;
                    Assert.IsNotNull(ContactModelRet);
                    Assert.AreEqual(contactModelListGood[0].ContactTVItemID, ContactModelRet.ContactTVItemID);

                }
            }
        }
        [TestMethod]
        public void MWQMPlanController__MWQMPlanByProvince_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    RetAddMWQMPlan retAddMWQMPlan = AddMWQMPlanAndSubElements((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en));

                    string Q = "!View/" + retAddMWQMPlan.TVItemModelNB.TVText + "|||" + retAddMWQMPlan.TVItemModelNB.TVItemID;

                    PartialViewResult partialViewResult = controller._MWQMPlanByProvince(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel URLModelRet = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.AreEqual(retAddMWQMPlan.TVItemModelNB.TVItemID, URLModelRet.TVItemIDList[0]);

                    List<ContactModel> AdminContactModelListRet = (List<ContactModel>)partialViewResult.ViewBag.AdminContactModelList;
                    Assert.IsNull(AdminContactModelListRet); // because IsMWQMPlanner == true

                    bool IsShowMap = (bool)partialViewResult.ViewBag.IsShowMap;
                    Assert.IsFalse(IsShowMap);

                    bool IsMWQMPlannerRet = (bool)partialViewResult.ViewBag.IsMWQMPlanner;
                    Assert.IsTrue(IsMWQMPlannerRet);

                    List<MWQMPlanAndFilesLabSheetCountModel> MWQMPlanAndFilesLabSheetCountModelListRet = (List<MWQMPlanAndFilesLabSheetCountModel>)partialViewResult.ViewBag.MWQMPlanAndFilesLabSheetCountModelList;
                    Assert.IsTrue(MWQMPlanAndFilesLabSheetCountModelListRet.Count > 1);

                    List<AppTaskModel> AppTaskModelListRet = (List<AppTaskModel>)partialViewResult.ViewBag.AppTaskModelList;
                    Assert.IsTrue(AppTaskModelListRet.Count == 0);
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController__LabSheetsTranferred_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    LabSheet labSheet = (from c in labSheetService.db.LabSheets
                                         select c).FirstOrDefault();

                    if (labSheet != null)
                    {
                        labSheet.LabSheetStatus = (int)LabSheetStatusEnum.Transferred;
                        try
                        {
                            labSheetService.db.SaveChanges();
                        }
                        catch (Exception)
                        {
                            Assert.IsTrue(false);
                        }
                    }

                    PartialViewResult partialViewResult = controller._LabSheetsTranferred(labSheet.MWQMPlanID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    MWQMPlanController MWQMPlanControllerRet = (MWQMPlanController)partialViewResult.ViewBag.MWQMPlanController;
                    Assert.IsNotNull(MWQMPlanControllerRet);

                    List<ContactModel> AdminContactModelListRet = (List<ContactModel>)partialViewResult.ViewBag.AdminContactModelList;
                    Assert.IsNull(AdminContactModelListRet); // because IsMWQMPlanner == true

                    bool IsMWQMPlannerRet = (bool)partialViewResult.ViewBag.IsMWQMPlanner;
                    Assert.IsTrue(IsMWQMPlannerRet);

                    List<LabSheetModelAndA1Sheet> LabSheetModelAndA1SheetListRet = (List<LabSheetModelAndA1Sheet>)partialViewResult.ViewBag.LabSheetModelAndA1SheetList;
                    Assert.IsTrue(LabSheetModelAndA1SheetListRet.Count > 0);

                    AnalyzeMethodEnum LastAnalyzeMethodRet = (AnalyzeMethodEnum)partialViewResult.ViewBag.LastAnalyzeMethod;
                    Assert.AreEqual(AnalyzeMethodEnum.Error, LastAnalyzeMethodRet);

                    SampleMatrixEnum LastSampleMatrixRet = (SampleMatrixEnum)partialViewResult.ViewBag.LastSampleMatrix;
                    Assert.AreEqual(SampleMatrixEnum.Error, LastSampleMatrixRet);

                    LaboratoryEnum LastLaboratoryRet = (LaboratoryEnum)partialViewResult.ViewBag.LastLaboratory;
                    Assert.AreEqual(LaboratoryEnum.Error, LastLaboratoryRet);
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController_LabSheetApprovedJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // LabSheetApprovedJSON is very simple 
                    // Test are done on LabSheetApprovedDB
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController_LabSheetNotApprovedJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // LabSheetNotApprovedJSON is very simple 
                    // Test are done on LabSheetNotApprovedDB
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController_MWQMPlanSaveTopJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // MWQMPlanSaveTopJSON is very simple 
                    // Test are done on MWQMPlanSaveTopDB
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController_MWQMPlanSubsectorSaveJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // MWQMPlanSubsectorSaveJSON is very simple 
                    // Test are done on MWQMPlanSubsectorSaveDB
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController_MWQMPlanCopyJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // MWQMPlanCopyJSON is very simple 
                    // Test are done on MWQMPlanCopyDB
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController_MWQMPlanDeleteJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // MWQMPlanDeleteJSON is very simple 
                    // Test are done on MWQMPlanDeleteDB
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController_MWQMPlanDeleteConfigFileJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // MWQMPlanDeleteConfigFileJSON is very simple 
                    // Test are done on MWQMPlanDeleteConfigFileDB
                }
            }
        }
        [TestMethod]
        public void MWQMPlanController_MWQMPlanGenerateConfigFileJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // MWQMPlanGenerateConfigFileJSON is very simple 
                    // Test are done on MWQMPlanGenerateConfigFileDB
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
            routeData.Values.Add("controller", "MWQMPlan");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new MWQMPlanController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;
            randomService = new RandomService(languageEnum, user);
            mwqmPlanService = new MWQMPlanService(languageEnum, user);
            tvItemService = new TVItemService(languageEnum, user);
            mwqmPlanSubsectorService = new MWQMPlanSubsectorService(languageEnum, user);
            mwqmPlanSubsectorSiteService = new MWQMPlanSubsectorSiteService(languageEnum, user);
            labSheetService = new LabSheetService(languageEnum, user);

            controller.SetRequestContext(requestContext);

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(2, controller.CultureListAllowable.Count);
            Assert.AreEqual("en-CA", controller.CultureListAllowable[0]);
            Assert.AreEqual("fr-CA", controller.CultureListAllowable[1]);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._MWQMPlanController);
            Assert.IsNotNull(controller._AppTaskService);
            Assert.IsNotNull(controller._MWQMPlanService);
            Assert.IsNotNull(controller._MWQMPlanSubsectorService);
            Assert.IsNotNull(controller._MWQMPlanSubsectorSiteService);
            Assert.IsNotNull(controller._TVFileService);
            Assert.IsNotNull(controller._LabSheetService);
            Assert.IsNotNull(controller._BaseEnumService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("MWQMPlan", controller._RequestContext.RouteData.Values["controller"].ToString());
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
            shimMWQMPlanController = new ShimMWQMPlanController(controller);
        }
        private RetAddMWQMPlan AddMWQMPlanAndSubElements(LanguageEnum LanguageRequest)
        {
            TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
            Assert.AreEqual("", tvItemModelRoot.Error);

            TVItemModel tvItemModelCanada = tvItemService.GetChildTVItemModelWithParentIDAndTVTextAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);
            Assert.AreEqual("", tvItemModelCanada.Error);

            TVItemModel tvItemModelNB = tvItemService.GetChildTVItemModelWithParentIDAndTVTextAndTVTypeDB(tvItemModelCanada.TVItemID, (LanguageRequest == LanguageEnum.fr ? "Nouveau-Brunswick" : "New Brunswick"), TVTypeEnum.Province);
            Assert.AreEqual("", tvItemModelNB.Error);

            List<TVItemModel> tvItemModelSSList = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelNB.TVItemID, TVTypeEnum.Subsector);
            Assert.IsTrue(tvItemModelSSList.Where(c => c.TVText.StartsWith("NB-06-020-002")).Any());

            TVItemModel tvItemModelSS = tvItemModelSSList.Where(c => c.TVText.StartsWith("NB-06-020-002")).FirstOrDefault();
            Assert.IsTrue(tvItemModelSS.TVText.StartsWith("NB-06-020-002"));

            MWQMPlanModel mwqmPlanModelNew = new MWQMPlanModel()
            {
                ConfigFileName = "UniqueConfigFileName",
                ForGroupName = "UniqueGroupName",
                SampleType = SampleTypeEnum.Routine,
                ProvinceTVItemID = tvItemModelNB.TVItemID,
                CreatorTVItemID = contactModelListGood[0].ContactTVItemID,
                Year = 2015,
                SecretCode = "abcdef",
                DailyDuplicatePrecisionCriteria = 0.6872f,
                IntertechDuplicatePrecisionCriteria = 0.093f,
                ConfigFileTxtTVItemID = null,
            };

            MWQMPlanModel mwqmPlanModelRet = mwqmPlanService.PostAddMWQMPlanDB(mwqmPlanModelNew);
            Assert.AreEqual("", mwqmPlanModelRet.Error);

            MWQMPlanSubsectorModel mwqmPlanSubsectorModelNew = new MWQMPlanSubsectorModel()
            {
                MWQMPlanID = mwqmPlanModelRet.MWQMPlanID,
                SubsectorTVItemID = tvItemModelSS.TVItemID,
            };

            MWQMPlanSubsectorModel mwqmPlanSubsectorModelRet = mwqmPlanSubsectorService.PostAddMWQMPlanSubsectorDB(mwqmPlanSubsectorModelNew);
            Assert.AreEqual("", mwqmPlanSubsectorModelRet.Error);

            TVItemModel tvItemModelMWQMSite = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelSS.TVItemID, TVTypeEnum.MWQMSite).FirstOrDefault();
            Assert.AreEqual(7460, tvItemModelMWQMSite.TVItemID);

            MWQMPlanSubsectorSiteModel mwqmPlanSubsectorSiteModel = new MWQMPlanSubsectorSiteModel()
            {
                MWQMPlanSubsectorID = mwqmPlanSubsectorModelRet.MWQMPlanSubsectorID,
                MWQMSiteTVItemID = tvItemModelMWQMSite.TVItemID,
                IsDuplicate = false
            };

            MWQMPlanSubsectorSiteModel mwqmPlanSubsectorSiteModelRet = mwqmPlanSubsectorSiteService.PostAddMWQMPlanSubsectorSiteDB(mwqmPlanSubsectorSiteModel);
            Assert.AreEqual("", mwqmPlanSubsectorSiteModelRet.Error);

            RetAddMWQMPlan retAddMWQMPlan = new RetAddMWQMPlan()
            {
                MWQMPlanModel = mwqmPlanModelRet,
                TVItemModelNB = tvItemModelNB,
                TVItemModelSS = tvItemModelSS
            };

            return retAddMWQMPlan;
        }
        #endregion Functions private
    }

    class RetAddMWQMPlan
    {
        public MWQMPlanModel MWQMPlanModel { get; set; }
        public TVItemModel TVItemModelNB { get; set; }
        public TVItemModel TVItemModelSS { get; set; }
    }
}
