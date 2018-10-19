using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSSPWebTools.Controllers.Resources;
using CSSPDBDLL.Services;
using CSSPDBDLL.Models;
using System.Web.UI;
using System.Net;
using Newtonsoft.Json;
using System.Text;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Controllers
{
    public class AddressController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public AddressService _AddressService { get; private set; }
        public AddressController _AddressController { get; private set; }
        public TVItemLinkService _TVItemLinkService { get; set; }
        public InfrastructureService _InfrastructureService { get; set; }
        public PolSourceSiteService _PolSourceSiteService { get; set; }
        public MapInfoService _MapInfoService { get; set; }
        #endregion Properties

        #region Constructors
        public AddressController()
        {
            _AddressController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _AddressService = new AddressService(LanguageRequest, User);
            _TVItemLinkService = new TVItemLinkService(LanguageRequest, User);
            _InfrastructureService = new InfrastructureService(LanguageRequest, User);
            _PolSourceSiteService = new PolSourceSiteService(LanguageRequest, User);
            _MapInfoService = new MapInfoService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public Views
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _addressEditList(int ContactTVItemID)
        {
            ContactModel contactModel = _ContactService.GetContactModelWithContactTVItemIDDB(ContactTVItemID);

            ViewBag.ContactModel = contactModel;

            List<TVItemLinkModel> tvItemLinkModelList = _TVItemLinkService.GetTVItemLinkModelListWithFromTVItemIDDB(ContactTVItemID).Where(c => c.ToTVType == TVTypeEnum.Address).ToList();

            List<AddressModel> addressModelList = new List<AddressModel>();

            foreach (TVItemLinkModel tvItemLinkModel in tvItemLinkModelList)
            {
                addressModelList.Add(_AddressService.GetAddressModelWithAddressTVItemIDDB(tvItemLinkModel.ToTVItemID));
            }

            ViewBag.AddressModelList = addressModelList;

            ViewBag.AddressController = _AddressController;
            ViewBag.AddressService = _AddressService;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _addressEditInfrastructure(int InfrastructureTVItemID)
        {
            ViewBag.AddressModel = null;
            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(InfrastructureTVItemID);

            ViewBag.TVItemModel = tvItemModel;

            InfrastructureModel infrastructureModel = _InfrastructureService.GetInfrastructureModelWithInfrastructureTVItemIDDB(InfrastructureTVItemID);

            ViewBag.InfrastructureModel = infrastructureModel;

            if (infrastructureModel.CivicAddressTVItemID != null)
            {
                AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)infrastructureModel.CivicAddressTVItemID);
                if (string.IsNullOrWhiteSpace(addressModel.Error))
                {
                    ViewBag.AddressModel = addressModel;
                }

            }

            ViewBag.AddressController = _AddressController;
            ViewBag.AddressService = _AddressService;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _addressEditPolSourceSite(int PolSourceSiteTVItemID)
        {
            ViewBag.AddressModel = null;
            ViewBag.Lat = null;
            ViewBag.Lng = null;

            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(PolSourceSiteTVItemID);

            ViewBag.TVItemModel = tvItemModel;

            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.GetPolSourceSiteModelWithPolSourceSiteTVItemIDDB(PolSourceSiteTVItemID);

            ViewBag.PolSourceSiteModel = polSourceSiteModel;

            if (polSourceSiteModel.CivicAddressTVItemID != null)
            {
                AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)polSourceSiteModel.CivicAddressTVItemID);
                if (string.IsNullOrWhiteSpace(addressModel.Error))
                {
                    ViewBag.AddressModel = addressModel;
                }
            }
            List<MapInfoPointModel> mapInfoPointModelList = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(PolSourceSiteTVItemID, TVTypeEnum.PolSourceSite, MapInfoDrawTypeEnum.Point);
            if (mapInfoPointModelList.Count > 0)
            {
                ViewBag.Lat = mapInfoPointModelList[0].Lat;
                ViewBag.Lng = mapInfoPointModelList[0].Lng;
            }

            ViewBag.AddressController = _AddressController;
            ViewBag.AddressService = _AddressService;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _CountryList(int CountryTVItemID)
        {
            ViewBag.CountryTVItemID = CountryTVItemID;

            List<TVItemModel> tvItemModelListCountry = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(1, TVTypeEnum.Country);

            ViewBag.TVItemModelListCountry = tvItemModelListCountry;

            ViewBag.AddressController = _AddressController;
            ViewBag.AddressService = _AddressService;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult GetGoogleCivicAddress(string LatLngText)
        {
            using (WebClient webClient = new WebClient())
            {
                string url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + LatLngText + "&Key=AIzaSyAwPGpdSM6z0A7DFdWPbS3vIDTk2mxINaA";
                string jsonStr = webClient.DownloadString(url);

                byte[] bytes = Encoding.Default.GetBytes(jsonStr);
                string myString = Encoding.UTF8.GetString(bytes);

                return Content(myString);
            }
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _ProvinceList(int CountryTVItemID, int ProvinceTVItemID)
        {
            ViewBag.ProvinceTVItemID = ProvinceTVItemID;

            List<TVItemModel> tvItemModelListProvince = new List<TVItemModel>();
            if (CountryTVItemID != 0)
            {
                tvItemModelListProvince = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(CountryTVItemID, TVTypeEnum.Province);
            }

            ViewBag.TVItemModelListProvince = tvItemModelListProvince;

            ViewBag.AddressController = _AddressController;
            ViewBag.AddressService = _AddressService;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _MunicipalityList(int ProvinceTVItemID, int MunicipalityTVItemID)
        {
            ViewBag.MunicipalityTVItemID = MunicipalityTVItemID;

            List<TVItemModel> tvItemModelListMunicipality = new List<TVItemModel>();
            if (ProvinceTVItemID != 0)
            {
                tvItemModelListMunicipality = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(ProvinceTVItemID, TVTypeEnum.Municipality);
            }

            ViewBag.TVItemModelListMunicipality = tvItemModelListMunicipality;

            ViewBag.AddressController = _AddressController;
            ViewBag.AddressService = _AddressService;

            return PartialView();
        }
        #endregion Functions public

        #region Functions public JSON
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult AddressSaveJSON(FormCollection fc)
        {
            AddressModel addressModel = _AddressService.PostAddOrModifyDB(fc);

            return Json(addressModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult AddressDeleteJSON(FormCollection fc)
        {
            AddressModel addressModel = _AddressService.PostDeleteAddressUnderContactTVItemIDDB(fc);

            return Json(addressModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult AddressSaveInfrastructureJSON(FormCollection fc)
        {
            AddressModel addressModel = _AddressService.PostAddOrModifyInfrastructureDB(fc);

            return Json(addressModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult AddressDeleteInfrastructureJSON(FormCollection fc)
        {
            AddressModel addressModel = _AddressService.PostDeleteAddressUnderInfrastructureTVItemIDDB(fc);

            return Json(addressModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult AddressSavePolSourceSiteJSON(FormCollection fc)
        {
            AddressModel addressModel = _AddressService.PostAddOrModifyPolSourceSiteDB(fc);

            return Json(addressModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult AddressDeletePolSourceSiteJSON(FormCollection fc)
        {
            AddressModel addressModel = _AddressService.PostDeleteAddressUnderPolSourceSiteTVItemIDDB(fc);

            return Json(addressModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public JSON
    }
}