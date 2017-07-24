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
    /// Summary description for AddressControllerTest2
    /// </summary>
    [TestClass]
    public class AddressControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerAction = "";
        private string controllerName = "Address";
        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private AddressController controller { get; set; }

        // Testing variables
        private RandomService randomService { get; set; }
        private ShimAddressController shimAddressController { get; set; }
        private AddressService addressService { get; set; }

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
        public AddressControllerTest()
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

        #region Testing Methods View
        [TestMethod]
        public void AddressController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Act
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void AddressController__addressEditList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_addressEditList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    PartialViewResult partialViewResult = controller._addressEditList(ContactTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    ContactModel contactModelRet = (ContactModel)partialViewResult.ViewBag.ContactModel;
                    Assert.AreEqual(contactModel.FirstName, contactModelRet.FirstName);
                    Assert.AreEqual(contactModel.Initial, contactModelRet.Initial);
                    Assert.AreEqual(contactModel.LastName, contactModelRet.LastName);

                    List<AddressModel> addressModelList = (List<AddressModel>)partialViewResult.ViewBag.AddressModelList;
                    Assert.AreEqual(1, addressModelList.Count);
                    Assert.AreEqual(addressModel.CountryTVItemID, addressModelList[0].CountryTVItemID);
                    Assert.AreEqual(addressModel.ProvinceTVItemID, addressModelList[0].ProvinceTVItemID);
                    Assert.AreEqual(addressModel.MunicipalityTVItemID, addressModelList[0].MunicipalityTVItemID);
                    Assert.AreEqual(addressModel.AddressType, addressModelList[0].AddressType);

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);

                }
            }
        }
        [TestMethod]
        public void AddressController__addressEditList_ContactTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_addressEditList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    int ContactTVItemID_0 = 0;
                    PartialViewResult partialViewResult = controller._addressEditList(ContactTVItemID_0) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    ContactModel contactModelRet = (ContactModel)partialViewResult.ViewBag.ContactModel;
                    Assert.AreEqual(string.Format(ServiceRes.CouldNotFind_With_Equal_, ServiceRes.Contact, ServiceRes.ContactTVItemID, ContactTVItemID_0), contactModelRet.Error);

                    List<AddressModel> addressModelList = (List<AddressModel>)partialViewResult.ViewBag.AddressModelList;
                    Assert.AreEqual(0, addressModelList.Count);

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);

                }
            }
        }
        [TestMethod]
        public void AddressController__CountryList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_CountryList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    int CountryTVItemID = tvItemModelCountry.TVItemID;
                    PartialViewResult partialViewResult = controller._CountryList(CountryTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    int CountryTVItemIDRet = (int)partialViewResult.ViewBag.CountryTVItemID;
                    Assert.AreEqual(tvItemModelCountry.TVItemID, CountryTVItemIDRet);

                    List<TVItemModel> tvItemModelListCountry = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelListCountry;
                    Assert.AreEqual(2, tvItemModelListCountry.Count);
                    Assert.IsTrue(tvItemModelListCountry.Where(c => c.TVItemID == CountryTVItemID).Any());

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);
                }
            }
        }
        [TestMethod]
        public void AddressController__CountryList_CountryTVItemID_0_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_CountryList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    int CountryTVItemID = 0; // tvItemModelCountry.TVItemID;
                    PartialViewResult partialViewResult = controller._CountryList(CountryTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    int CountryTVItemIDRet = (int)partialViewResult.ViewBag.CountryTVItemID;
                    Assert.AreEqual(CountryTVItemID, CountryTVItemIDRet);

                    List<TVItemModel> tvItemModelListCountry = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelListCountry;
                    Assert.AreEqual(2, tvItemModelListCountry.Count);

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);
                }
            }
        }
        [TestMethod]
        public void AddressController__ProvinceList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_CountryList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    TVItemModel tvItemModelProvince = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    // Act
                    int CountryTVItemID = tvItemModelCountry.TVItemID;
                    int ProvinceTVItemID = tvItemModelProvince.TVItemID;
                    PartialViewResult partialViewResult = controller._ProvinceList(CountryTVItemID, ProvinceTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    int ProvinceTVItemIDRet = (int)partialViewResult.ViewBag.ProvinceTVItemID;
                    Assert.AreEqual(tvItemModelProvince.TVItemID, ProvinceTVItemIDRet);

                    List<TVItemModel> tvItemModelListProvince = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelListProvince;
                    Assert.IsTrue(tvItemModelListProvince.Count > 5);
                    Assert.IsTrue(tvItemModelListProvince.Where(c => c.TVItemID == ProvinceTVItemID).Any());

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);
                }
            }
        }
        [TestMethod]
        public void AddressController__ProvinceList_CountryTVItemID_0_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_CountryList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    TVItemModel tvItemModelProvince = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    // Act
                    int CountryTVItemID_0 = 0; // tvItemModelCountry.TVItemID;
                    int ProvinceTVItemID = tvItemModelProvince.TVItemID;
                    PartialViewResult partialViewResult = controller._ProvinceList(CountryTVItemID_0, ProvinceTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    int ProvinceTVItemIDRet = (int)partialViewResult.ViewBag.ProvinceTVItemID;
                    Assert.AreEqual(tvItemModelProvince.TVItemID, ProvinceTVItemIDRet);

                    List<TVItemModel> tvItemModelListProvince = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelListProvince;
                    Assert.IsTrue(tvItemModelListProvince.Count == 0);

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);
                }
            }
        }
        [TestMethod]
        public void AddressController__ProvinceList_ProvinceTVItemID_0_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_CountryList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    TVItemModel tvItemModelProvince = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    // Act
                    int CountryTVItemID = tvItemModelCountry.TVItemID;
                    int ProvinceTVItemID_0 = 0; // tvItemModelProvince.TVItemID;
                    PartialViewResult partialViewResult = controller._ProvinceList(CountryTVItemID, ProvinceTVItemID_0) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    int ProvinceTVItemIDRet = (int)partialViewResult.ViewBag.ProvinceTVItemID;
                    Assert.AreEqual(ProvinceTVItemID_0, ProvinceTVItemIDRet);

                    List<TVItemModel> tvItemModelListProvince = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelListProvince;
                    Assert.IsTrue(tvItemModelListProvince.Count > 5);

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);
                }
            }
        }
        [TestMethod]
        public void AddressController__MunicipalityList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_MunicipalityList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    TVItemModel tvItemModelProvince = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelCountry.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    // Act
                    TVItemModel tvItemModelMuni = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelProvince.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMuni.Error);

                    // Act
                    int ProvinceTVItemID = tvItemModelProvince.TVItemID;
                    int MunicipalityTVItemID = tvItemModelMuni.TVItemID;
                    PartialViewResult partialViewResult = controller._MunicipalityList(ProvinceTVItemID, MunicipalityTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    int MunicipalityTVItemIDRet = (int)partialViewResult.ViewBag.MunicipalityTVItemID;
                    Assert.AreEqual(tvItemModelMuni.TVItemID, MunicipalityTVItemIDRet);

                    List<TVItemModel> tvItemModelListMunicipality = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelListMunicipality;
                    Assert.IsTrue(tvItemModelListMunicipality.Count > 20);
                    Assert.IsTrue(tvItemModelListMunicipality.Where(c => c.TVItemID == MunicipalityTVItemID).Any());

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);
                }
            }
        }
        [TestMethod]
        public void AddressController__MunicipalityList_ProvinceTVItemID_0_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_MunicipalityList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    TVItemModel tvItemModelProvince = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelCountry.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    // Act
                    TVItemModel tvItemModelMuni = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelProvince.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMuni.Error);

                    // Act
                    int ProvinceTVItemID_0 = 0; // tvItemModelProvince.TVItemID;
                    int MunicipalityTVItemID = tvItemModelMuni.TVItemID;
                    PartialViewResult partialViewResult = controller._MunicipalityList(ProvinceTVItemID_0, MunicipalityTVItemID) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    int MunicipalityTVItemIDRet = (int)partialViewResult.ViewBag.MunicipalityTVItemID;
                    Assert.AreEqual(tvItemModelMuni.TVItemID, MunicipalityTVItemIDRet);

                    List<TVItemModel> tvItemModelListMunicipality = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelListMunicipality;
                    Assert.IsTrue(tvItemModelListMunicipality.Count == 0);

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);
                }
            }
        }
        [TestMethod]
        public void AddressController__MunicipalityList_MunicipalityTVItemID_0_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "_MunicipalityList";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelCountry = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCountry.Error);

                    // Act
                    TVItemModel tvItemModelProvince = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelCountry.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelProvince.Error);

                    // Act
                    TVItemModel tvItemModelMuni = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelProvince.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelMuni.Error);

                    // Act
                    int ProvinceTVItemID = tvItemModelProvince.TVItemID;
                    int MunicipalityTVItemID_0 = 0; // tvItemModelMuni.TVItemID;
                    PartialViewResult partialViewResult = controller._MunicipalityList(ProvinceTVItemID, MunicipalityTVItemID_0) as PartialViewResult;

                    // Assert
                    Assert.IsNotNull(partialViewResult);

                    int MunicipalityTVItemIDRet = (int)partialViewResult.ViewBag.MunicipalityTVItemID;
                    Assert.AreEqual(MunicipalityTVItemID_0, MunicipalityTVItemIDRet);

                    List<TVItemModel> tvItemModelListMunicipality = (List<TVItemModel>)partialViewResult.ViewBag.TVItemModelListMunicipality;
                    Assert.IsTrue(tvItemModelListMunicipality.Count > 20);

                    AddressController addressControllerRet = (AddressController)partialViewResult.ViewBag.AddressController;
                    Assert.IsNotNull(addressControllerRet);

                    AddressService addressServiceRet = (AddressService)partialViewResult.ViewBag.AddressService;
                    Assert.IsNotNull(addressServiceRet);
                }
            }
        }
        #endregion Testing Methods View

        #region Testing Methods JSON
        [TestMethod]
        public void AddressController_AddressSaveJSON_Add_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", "0"); //addressModel.AddressTVItemID.ToString());
                    fc.Add("CountryTVItemID", addressModel.CountryTVItemID.ToString());
                    fc.Add("ProvinceTVItemID", addressModel.ProvinceTVItemID.ToString());
                    fc.Add("MunicipalityTVItemID", addressModel.MunicipalityTVItemID.ToString());
                    fc.Add("StreetName", addressModel.StreetName);
                    fc.Add("StreetNumber", addressModel.StreetNumber);
                    fc.Add("StreetType", ((int)addressModel.StreetType).ToString());
                    fc.Add("AddressType", ((int)AddressTypeEnum.Civic).ToString());

                    // Act
                    JsonResult jsonResult = controller.AddressSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void AddressController_AddressSaveJSON_Add_ContactTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", "0"); // ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", "0"); //addressModel.AddressTVItemID.ToString());
                    fc.Add("CountryTVItemID", addressModel.CountryTVItemID.ToString());
                    fc.Add("ProvinceTVItemID", addressModel.ProvinceTVItemID.ToString());
                    fc.Add("MunicipalityTVItemID", addressModel.MunicipalityTVItemID.ToString());
                    fc.Add("StreetName", addressModel.StreetName);
                    fc.Add("StreetNumber", addressModel.StreetNumber);
                    fc.Add("StreetType", ((int)addressModel.StreetType).ToString());
                    fc.Add("AddressType", ((int)AddressTypeEnum.Civic).ToString());


                    // Act
                    JsonResult jsonResult = controller.AddressSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.ContactTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void AddressController_AddressSaveJSON_Add_CountryTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", "0"); //addressModel.AddressTVItemID.ToString());
                    fc.Add("CountryTVItemID", "0"); // addressModel.CountryTVItemID.ToString());
                    fc.Add("ProvinceTVItemID", addressModel.ProvinceTVItemID.ToString());
                    fc.Add("MunicipalityTVItemID", addressModel.MunicipalityTVItemID.ToString());
                    fc.Add("StreetName", addressModel.StreetName);
                    fc.Add("StreetNumber", addressModel.StreetNumber);
                    fc.Add("StreetType", ((int)addressModel.StreetType).ToString());
                    fc.Add("AddressType", ((int)AddressTypeEnum.Civic).ToString());


                    // Act
                    JsonResult jsonResult = controller.AddressSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.CountryTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void AddressController_AddressSaveJSON_Add_ProvinceTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", "0"); //addressModel.AddressTVItemID.ToString());
                    fc.Add("CountryTVItemID", addressModel.CountryTVItemID.ToString());
                    fc.Add("ProvinceTVItemID", "0"); // addressModel.ProvinceTVItemID.ToString());
                    fc.Add("MunicipalityTVItemID", addressModel.MunicipalityTVItemID.ToString());
                    fc.Add("StreetName", addressModel.StreetName);
                    fc.Add("StreetNumber", addressModel.StreetNumber);
                    fc.Add("StreetType", ((int)addressModel.StreetType).ToString());
                    fc.Add("AddressType", ((int)AddressTypeEnum.Civic).ToString());


                    // Act
                    JsonResult jsonResult = controller.AddressSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.ProvinceTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void AddressController_AddressSaveJSON_Add_MunicipalityTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", "0"); //addressModel.AddressTVItemID.ToString());
                    fc.Add("CountryTVItemID", addressModel.CountryTVItemID.ToString());
                    fc.Add("ProvinceTVItemID", addressModel.ProvinceTVItemID.ToString());
                    fc.Add("MunicipalityTVItemID", "0"); //  addressModel.MunicipalityTVItemID.ToString());
                    fc.Add("StreetName", addressModel.StreetName);
                    fc.Add("StreetNumber", addressModel.StreetNumber);
                    fc.Add("StreetType", ((int)addressModel.StreetType).ToString());
                    fc.Add("AddressType", ((int)AddressTypeEnum.Civic).ToString());


                    // Act
                    JsonResult jsonResult = controller.AddressSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.MunicipalityTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void AddressController_AddressSaveJSON_Modify_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressSaveJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", addressModel.AddressTVItemID.ToString());
                    fc.Add("CountryTVItemID", addressModel.CountryTVItemID.ToString());
                    fc.Add("ProvinceTVItemID", addressModel.ProvinceTVItemID.ToString());
                    fc.Add("MunicipalityTVItemID", addressModel.MunicipalityTVItemID.ToString());
                    fc.Add("StreetName", addressModel.StreetName);
                    fc.Add("StreetNumber", addressModel.StreetNumber);
                    fc.Add("StreetType", ((int)addressModel.StreetType).ToString());
                    fc.Add("AddressType", ((int)AddressTypeEnum.Civic).ToString());


                    // Act
                    JsonResult jsonResult = controller.AddressSaveJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                }
            }
        }
        [TestMethod]
        public void AddressController_AddressDeleteJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressDeleteJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", addressModel.AddressTVItemID.ToString());

                    // Act
                    JsonResult jsonResult = controller.AddressDeleteJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void AddressController_AddressDeleteJSON_ContactTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressDeleteJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", "0"); // ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", addressModel.AddressTVItemID.ToString());

                    // Act
                    JsonResult jsonResult = controller.AddressDeleteJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.ContactTVItemID), retStr);
                }
            }
        }
        [TestMethod]
        public void AddressController_AddressDeleteJSON_AddressTVItemID_Error_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                // Arrange
                controllerAction = "AddressDeleteJSON";
                contactModel = contactModelListGood[0];

                // Act
                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    int ContactTVItemID = contactModelListGood[0].ContactTVItemID;

                    // Act
                    TVItemLinkModel tvItemLinkModel = addressService._TVItemLinkService.PostDeleteTVItemLinkWithFromTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    // Act
                    TVItemModel tvItemModelContact = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(ContactTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelContact.Error);

                    // Act
                    TVItemModel tvItemModelRoot = addressService._TVItemService.GetRootTVItemModelDB();

                    // Assert
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    // Act
                    TVItemModel tvItemModelBouctouche = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Bouctouche", TVTypeEnum.Municipality);

                    // Assert
                    Assert.AreEqual("", tvItemModelBouctouche.Error);

                    // Act
                    TVItemModel tvItemModelNB = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, (culture.TwoLetterISOLanguageName == "en" ? "New Brunswick" : "Nouveau-Brunswick"), TVTypeEnum.Province);

                    // Assert
                    Assert.AreEqual("", tvItemModelNB.Error);

                    // Act
                    TVItemModel tvItemModelCanada = addressService._TVItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);

                    // Assert
                    Assert.AreEqual("", tvItemModelCanada.Error);

                    // Act
                    AddressModel addressModel = randomService.RandomAddressModel(tvItemModelCanada, tvItemModelNB, tvItemModelBouctouche, true);

                    // Assert
                    Assert.AreEqual("", addressModel.Error);

                    // Act
                    TVItemModel tvItemModelAddress = addressService._TVItemService.GetTVItemModelWithTVItemIDDB(addressModel.AddressTVItemID);

                    // Assert
                    Assert.AreEqual("", tvItemModelAddress.Error);

                    // Act
                    tvItemLinkModel = randomService.RandomTVItemLinkModel(tvItemModelContact, tvItemModelAddress, true);

                    // Assert
                    Assert.AreEqual("", tvItemLinkModel.Error);

                    FormCollection fc = new FormCollection();
                    fc.Add("ContactTVItemID", ContactTVItemID.ToString());
                    fc.Add("AddressTVItemID", "0"); // addressModel.AddressTVItemID.ToString());

                    // Act
                    JsonResult jsonResult = controller.AddressDeleteJSON(fc) as JsonResult;

                    // Assert
                    Assert.IsNotNull(jsonResult);

                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual(string.Format(ServiceRes._IsRequired, ServiceRes.AddressTVItemID), retStr);
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
            controller = new AddressController();
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

            // AddressController Asserts
            Assert.IsNotNull(controller._AddressController);
            Assert.IsNotNull(controller._AddressService);
            Assert.IsNotNull(controller._TVItemLinkService);

            // variables for testing
            randomService = new RandomService(languageEnum, user);
            addressService = new AddressService(languageEnum, user);
        }
        private void SetupShim()
        {
            shimAddressController = new ShimAddressController(controller);
        }
        #endregion Functions private
    }
}
