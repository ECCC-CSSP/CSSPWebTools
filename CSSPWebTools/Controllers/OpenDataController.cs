using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
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
    public class OpenDataController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public OpenDataController _OpenDataController { get; private set; }
        public OpenDataService _OpenDataService { get; private set; }
        public MWQMSampleService _MWQMSampleService { get; private set; }
        #endregion Properties

        #region Constructors
        public OpenDataController()
        {
            _OpenDataController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _OpenDataService = new OpenDataService(LanguageRequest, User);
            _MWQMSampleService = new MWQMSampleService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Views/PartialViews
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _OpenDataDocuments(int ProvinceTVItemID)
        {
            ViewBag.ProvinceTVItemID = ProvinceTVItemID;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _OpenDataDocumentsNational(string Q)
        {
            SetArgs(Q);
            ViewBag.CountryTVItemID = urlModel.TVItemIDList[0];

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _OpenDataTopPage(string Q)
        {
            SetArgs(Q);
            ViewBag.ProvinceTVItemID = urlModel.TVItemIDList[0];

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _OpenDataProvince(int ProvinceTVItemID)
        {
            ViewBag.ProvinceTVItemID = ProvinceTVItemID;
            ViewBag.TVItemModelSubsectorList = null;

            List<TVItemModel> tvItemModelSubsectorList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(ProvinceTVItemID, TVTypeEnum.Subsector);

            ViewBag.TVItemModelSubsectorList = tvItemModelSubsectorList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _OpenDataSubsector(int SubsectorTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.TVItemModelMWQMSiteList = null;

            List<TVItemModel> tvItemModelMWQMSiteList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(SubsectorTVItemID, TVTypeEnum.MWQMSite);

            ViewBag.TVItemModelMWQMSiteList = tvItemModelMWQMSiteList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _OpenDataMWQMSite(int TVItemID)
        {
            ViewBag.MWQMSiteTVItemID = TVItemID;
            ViewBag.MWQMSampleModelList = null;

            List<MWQMSampleModel> mwqmSampleModelList = _MWQMSampleService.GetMWQMSampleModelListWithMWQMSiteTVItemIDDB(TVItemID);

            ViewBag.MWQMSampleModelList = mwqmSampleModelList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _OpenDataStat(int TVItemID)
        {
            ViewBag.OpenDataStat = null;

            OpenDataStat openDataStat = _OpenDataService.GetOpenDataStatDB(TVItemID);

            ViewBag.OpenDataStat = openDataStat;

            return PartialView();
        }
        #endregion Functions View/PartialViews 

        #region Functions JSON
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateCSVDocumentOfMWQMSitesJSON(int ProvinceTVItemID)
        {
            TVItemModel tvItemModel = _OpenDataService.GenerateCSVDocumentOfMWQMSitesDB(ProvinceTVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateCSVDocumentNationalOfMWQMSitesJSON(int CountryTVItemID)
        {
            TVItemModel tvItemModel = _OpenDataService.GenerateCSVDocumentNationalOfMWQMSitesDB(CountryTVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateKMZDocumentOfMWQMSitesJSON(int ProvinceTVItemID)
        {
            TVItemModel tvItemModel = _OpenDataService.GenerateKMZDocumentOfMWQMSitesDB(ProvinceTVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateCSVDocumentOfMWQMSamplesJSON(int ProvinceTVItemID)
        {
            TVItemModel tvItemModel = _OpenDataService.GenerateCSVDocumentOfMWQMSamplesDB(ProvinceTVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateCSVDocumentNationalOfMWQMSamplesJSON(int CountryTVItemID)
        {
            TVItemModel tvItemModel = _OpenDataService.GenerateCSVDocumentNationalOfMWQMSamplesDB(CountryTVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GenerateXlsxDocumentOfMWQMSitesAndSamplesJSON(int ProvinceTVItemID)
        {
            TVItemModel tvItemModel = _OpenDataService.GenerateXlsxDocumentOfMWQMSitesAndSamplesDB(ProvinceTVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MarkAllRoutineSamplesForOpenDataJSON(FormCollection fc)
        {
            TVItemModel tvItemModel = _OpenDataService.MarkAllRoutineSamplesForOpenDataDB(fc);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MarkSamplesWithMWQMSampleIDForOpenDataJSON(int MWQMSampleID, bool UseForOpenData)
        {
               TVItemModel tvItemModel = _OpenDataService.MarkSamplesWithMWQMSampleIDForOpenDataDB(MWQMSampleID, UseForOpenData);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions JSON

        #region Functions public Non Action
        #endregion Functions public Non Action
    }

}