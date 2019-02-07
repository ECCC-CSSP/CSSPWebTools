using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
using CSSPWebTools.Controllers;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Models;
using CSSPDBDLL.Models;
using CSSPDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class InfrastructureController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public InfrastructureService _InfrastructureService { get; private set; }
        public TVItemLinkService _TVItemLinkService { get; private set; }
        public InfrastructureController _InfrastructureController { get; private set; }
        public MapInfoPointService _MapInfoPointService { get; private set; }
        public AddressService _AddressService { get; private set; }
        #endregion Properties

        #region Constructors
        public InfrastructureController()
        {
            _InfrastructureController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _InfrastructureService = new InfrastructureService(LanguageRequest, User);
            _TVItemLinkService = new TVItemLinkService(LanguageRequest, User);
            _MapInfoPointService = new MapInfoPointService(LanguageRequest, User);
            _AddressService = new AddressService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _infrastructureList(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            List<TVItemModelInfrastructureTypeTVItemLinkModel> tvItemModelInfrastructureTypeTVItemLinkList = _InfrastructureService.GetInfrastructureTVItemAndTVItemLinkAndInfrastructureTypeListWithMunicipalityTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelInfrastructureTypeTVItemLinkModelList = tvItemModelInfrastructureTypeTVItemLinkList;

            ViewBag.InfrastructureController = _InfrastructureController;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _infrastructureInfo(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.AddressModel = null;

            InfrastructureModel infrastructureModel = _InfrastructureService.GetInfrastructureModelWithInfrastructureTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.InfrastructureModel = infrastructureModel;

            if (infrastructureModel.CivicAddressTVItemID != null)
            {
                AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)infrastructureModel.CivicAddressTVItemID);

                ViewBag.AddressModel = addressModel;
            }

            MapInfoPointModel mapInfoPointModelInfrastructure = new MapInfoPointModel();
            MapInfoPointModel mapInfoPointModelOutfall = new MapInfoPointModel();

            if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.WWTP)
            {
                mapInfoPointModelInfrastructure = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.WasteWaterTreatmentPlant, MapInfoDrawTypeEnum.Point).FirstOrDefault();
                mapInfoPointModelOutfall = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point).FirstOrDefault();
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.LiftStation)
            {
                mapInfoPointModelInfrastructure = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.LiftStation, MapInfoDrawTypeEnum.Point).FirstOrDefault();
                mapInfoPointModelOutfall = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point).FirstOrDefault();
            }

            ViewBag.MapInfoPointModelInfrastructure = mapInfoPointModelInfrastructure;
            ViewBag.MapInfoPointModelOutfall = mapInfoPointModelOutfall;

            ViewBag.InfrastructureController = _InfrastructureController;

            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _infrastructureItem(string Q, int TVItemID, List<TVItemModelInfrastructureTypeTVItemLinkModel> TVItemModelInfrastructureTypeTVItemLinkModelList)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            ViewBag.TVItemID = TVItemID;
            ViewBag.TVItemModelInfrastructureTypeTVItemLinkModelList = TVItemModelInfrastructureTypeTVItemLinkModelList;

            ViewBag.InfrastructureController = _InfrastructureController;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(TVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _infrastructureEditAll(int InfrastructureTVItemID)
        {
            ViewBag.AddressModel = null;

            InfrastructureModel infrastructureModel = _InfrastructureService.GetInfrastructureModelWithInfrastructureTVItemIDDB(InfrastructureTVItemID);

            ViewBag.InfrastructureModel = infrastructureModel;


            if (infrastructureModel.CivicAddressTVItemID != null)
            {
                AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)infrastructureModel.CivicAddressTVItemID);

                ViewBag.AddressModel = addressModel;
            }

            MapInfoPointModel mapInfoPointModelInfrastructure = new MapInfoPointModel();
            MapInfoPointModel mapInfoPointModelOutfall = new MapInfoPointModel();

            if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.WWTP)
            {
                mapInfoPointModelInfrastructure = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.WasteWaterTreatmentPlant, MapInfoDrawTypeEnum.Point).FirstOrDefault();
                mapInfoPointModelOutfall = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point).FirstOrDefault();
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.LiftStation)
            {
                mapInfoPointModelInfrastructure = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.LiftStation, MapInfoDrawTypeEnum.Point).FirstOrDefault();
                mapInfoPointModelOutfall = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point).FirstOrDefault();
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.LineOverflow)
            {
                mapInfoPointModelInfrastructure = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.LineOverflow, MapInfoDrawTypeEnum.Point).FirstOrDefault();
                mapInfoPointModelOutfall = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point).FirstOrDefault();
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.Other)
            {
                mapInfoPointModelInfrastructure = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.OtherInfrastructure, MapInfoDrawTypeEnum.Point).FirstOrDefault();
                mapInfoPointModelOutfall = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point).FirstOrDefault();
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.SeeOtherMunicipality)
            {
                mapInfoPointModelInfrastructure = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.SeeOtherMunicipality, MapInfoDrawTypeEnum.Point).FirstOrDefault();
                mapInfoPointModelOutfall = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point).FirstOrDefault();
            }

            ViewBag.MapInfoPointModelInfrastructure = mapInfoPointModelInfrastructure;
            ViewBag.MapInfoPointModelOutfall = mapInfoPointModelOutfall;

            ViewBag.InfrastructureController = _InfrastructureController;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _infrastructureAddOrModify(int TVItemIDMunicipality, int InfrastructureTVItemID, string TVText, bool IsAdd)
        {
            ViewBag.TVItemIDMunicipality = TVItemIDMunicipality;
            ViewBag.InfrastructureTVItemID = InfrastructureTVItemID;
            ViewBag.TVItemModelMunicipalityList = new TVItemModel();
            ViewBag.MapInfoPointModelInfrastructure = null;
            ViewBag.MapInfoPointModelInfrastructureOutfall = null;

            InfrastructureModel infrastructureModel = _InfrastructureService.GetInfrastructureModelWithInfrastructureTVItemIDDB(InfrastructureTVItemID);

            ViewBag.InfrastructureModel = infrastructureModel;

            TVTypeEnum TVType = TVTypeEnum.Error;
            MapInfoPointModel mapInfoPointModelInfrastructure = new MapInfoPointModel();

            if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.WWTP)
            {
                TVType = TVTypeEnum.WasteWaterTreatmentPlant;
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.LiftStation)
            {
                TVType = TVTypeEnum.LiftStation;
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.LineOverflow)
            {
                TVType = TVTypeEnum.LineOverflow;
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.Other)
            {
                TVType = TVTypeEnum.OtherInfrastructure;
            }
            else if (infrastructureModel.InfrastructureType == InfrastructureTypeEnum.SeeOtherMunicipality)
            {
                TVType = TVTypeEnum.SeeOtherMunicipality;
            }

            mapInfoPointModelInfrastructure = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVType, MapInfoDrawTypeEnum.Point).FirstOrDefault();

            ViewBag.MapInfoPointModelInfrastructure = mapInfoPointModelInfrastructure;

            MapInfoPointModel mapInfoPointModelInfrastructureOutfall = new MapInfoPointModel();

            mapInfoPointModelInfrastructureOutfall = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point).FirstOrDefault();

            ViewBag.MapInfoPointModelInfrastructureOutfall = mapInfoPointModelInfrastructureOutfall;

            ViewBag.TVText = TVText;

            ViewBag.InfrastructureController = _InfrastructureController;

            TVItemModel tvItemModelMunicipality = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemIDMunicipality);
            if (string.IsNullOrWhiteSpace(tvItemModelMunicipality.Error))
            {
                List<TVItemModel> tvItemModelParentsList = _TVItemService.GetParentsTVItemModelList(tvItemModelMunicipality.TVPath);
                foreach (TVItemModel tvItemModel in tvItemModelParentsList)
                {
                    if (tvItemModel.TVType == TVTypeEnum.Province)
                    {
                        List<TVItemModel> tvItemModelMunicipalityList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModel.TVItemID, TVTypeEnum.Municipality);
                        ViewBag.TVItemModelMunicipalityList = tvItemModelMunicipalityList;
                        break;
                    }
                }
            }

            return PartialView();
        }
         
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult InfrastructureSaveAllJSON(FormCollection fc)
        {
            InfrastructureModel infrastructureModel = _InfrastructureService.InfrastructureSaveAllDB(fc);

            return Json(infrastructureModel.Error, JsonRequestBehavior.AllowGet);
        }  
         
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult InfrastructureAddOrModifyJSON(FormCollection fc)
        {
            InfrastructureModel infrastructureModel = _InfrastructureService.InfrastructureAddOrModifyDB(fc);

            return Json(infrastructureModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SetInfrastructureChildParentJSON(int ChildTVItemID, int ParentTVItemID)
        {
            string retStr = _InfrastructureService.SetInfrastructureChildParentDB(ChildTVItemID, ParentTVItemID);

            return Json(retStr, JsonRequestBehavior.AllowGet); 
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult InfrastructureDeleteJSON(int InfrastructureTVItemID)
        {
            InfrastructureModel infrastructureModel = _InfrastructureService.PostDeleteInfrastructureWithInfrastructureTVItemIDDB(InfrastructureTVItemID);

            return Json(infrastructureModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetMunicipalityLatLngJSON(int MunicipalityTVItemID)
        {
            List<MapInfoPointModel> mapInfoPointModelList = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(MunicipalityTVItemID, TVTypeEnum.Municipality, MapInfoDrawTypeEnum.Point);

            CoordModel coordModel = new CoordModel() { Lat = 0.0f, Lng = 0.0f };
            if (mapInfoPointModelList.Count > 0)
            {
                coordModel.Lat = (float)mapInfoPointModelList[0].Lat;
                coordModel.Lng = (float)mapInfoPointModelList[0].Lng;
            }

            return Json(coordModel, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public
    }
}
