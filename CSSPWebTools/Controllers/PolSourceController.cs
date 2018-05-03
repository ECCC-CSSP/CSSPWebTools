using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
using CSSPWebTools.Models;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using CSSPWebTools.Controllers.Resources;

namespace CSSPWebTools.Controllers
{
    public class PolSourceController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public PolSourceSiteService _PolSourceSiteService { get; private set; }
        public PolSourceController _PolSourceController { get; private set; }
        public MapInfoService _MapInfoService { get; private set; }
        public MapInfoPointService _MapInfoPointService { get; private set; }
        public AddressService _AddressService { get; private set; }
        public BaseEnumService _BaseEnumService { get; private set; }
        public TVFileService _TVFileService { get; private set; }
        #endregion Properties

        #region Constructors
        public PolSourceController()
        {
            _PolSourceController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _PolSourceSiteService = new PolSourceSiteService(LanguageRequest, User);
            _MapInfoService = new MapInfoService(LanguageRequest, User);
            _MapInfoPointService = new MapInfoPointService(LanguageRequest, User);
            _AddressService = new AddressService(LanguageRequest, User);
            _BaseEnumService = new BaseEnumService(LanguageRequest);
            _TVFileService = new TVFileService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
     
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceIssueList(int PolSourceObservationID, int IssueOrdinal)
        {
            ViewBag.PolSourceObservationID = PolSourceObservationID;
            ViewBag.IssueOrdinal = IssueOrdinal;
            ViewBag.PolSourceObservationIssueModelList = null;
            ViewBag.NextIssueOrdinal = IssueOrdinal + 1;

            if (PolSourceObservationID == 0)
            {
                return PartialView();
            }

            PolSourceObservationModel polSourceObservationModel = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelWithPolSourceObservationIDDB(PolSourceObservationID);
            if (!string.IsNullOrWhiteSpace(polSourceObservationModel.Error))
                return PartialView();

            List<PolSourceObservationIssueModel> polSourceObservationIssueModelList = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(PolSourceObservationID);
            if (polSourceObservationIssueModelList.Count == 0)
                return PartialView();

            ViewBag.PolSourceObservationIssueModelList = polSourceObservationIssueModelList;

            bool hasOrdinal = (from c in polSourceObservationIssueModelList
                               where c.Ordinal == IssueOrdinal
                               select c).Any();

            if (!hasOrdinal)
            {
                if (polSourceObservationIssueModelList.Count > 0)
                {
                    ViewBag.IssueOrdinal = polSourceObservationIssueModelList.Min(c => c.Ordinal);
                }
            }

            if (polSourceObservationIssueModelList.Count > 0)
            {
                ViewBag.NextIssueOrdinal = polSourceObservationIssueModelList.Max(c => c.Ordinal) + 1;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceIssueModify(int PolSourceObservationIssueID)
        {
            ViewBag.PolSourceObservationIssueID = PolSourceObservationIssueID;
            ViewBag.PolSourceController = _PolSourceController;
            ViewBag.PolSourceObservationIssueModel = null;
            ViewBag.PolSourceObsInfoEnumTextAndIDList = null;
            ViewBag.PolSourceObsInfoEnumHideAndIDList = null;
            ViewBag.PolSourceObsInfoEnumDescTextAndIDList = null;

            if (PolSourceObservationIssueID == 0)
            {
                return PartialView();
            }

            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelWithPolSourceObservationIssueIDDB(PolSourceObservationIssueID);
            ViewBag.PolSourceObservationIssueModel = polSourceObservationIssueModel;

            List<PolSourceObsInfoEnumTextAndID> polSourceObsInfoEnumTextAndIDList = new List<PolSourceObsInfoEnumTextAndID>();
            List<PolSourceObsInfoEnumHideAndID> polSourceObsInfoEnumHideAndIDList = new List<PolSourceObsInfoEnumHideAndID>();
            List<PolSourceObsInfoEnumTextAndID> polSourceObsInfoEnumDescTextAndIDList = new List<PolSourceObsInfoEnumTextAndID>();
            foreach (int id in Enum.GetValues(typeof(PolSourceObsInfoEnum)))
            {
                if (id == 0)
                    continue;

                string tempText = _BaseEnumService.GetEnumText_PolSourceObsInfoEnum((PolSourceObsInfoEnum)id);
                if (tempText.IndexOf("|") > 0)
                {
                    tempText = tempText.Substring(0, tempText.IndexOf("|"));
                }
                polSourceObsInfoEnumTextAndIDList.Add(new PolSourceObsInfoEnumTextAndID() { Text = tempText, ID = id });
                polSourceObsInfoEnumHideAndIDList.Add(new PolSourceObsInfoEnumHideAndID() { Hide = _BaseEnumService.GetEnumText_PolSourceObsInfoHideEnum((PolSourceObsInfoEnum)id), ID = id });
                polSourceObsInfoEnumDescTextAndIDList.Add(new PolSourceObsInfoEnumTextAndID() { Text = _BaseEnumService.GetEnumText_PolSourceObsInfoDescEnum((PolSourceObsInfoEnum)id), ID = id });
            }
            ViewBag.PolSourceObsInfoEnumTextAndIDList = polSourceObsInfoEnumTextAndIDList;
            ViewBag.PolSourceObsInfoEnumHideAndIDList = polSourceObsInfoEnumHideAndIDList;
            ViewBag.PolSourceObsInfoEnumDescTextAndIDList = polSourceObsInfoEnumDescTextAndIDList;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceIssueAddJSON(FormCollection fc) //int PolSourceObservationID, int NextIssueOrdinal)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostAddEmptyPolSourceObservationIssueDB(fc);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationIssueDeleteJSON(int PolSourceObservationIssueID)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostDeletePolSourceObservationIssueDB(PolSourceObservationIssueID);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationIssueMoveDownJSON(int PolSourceObservationIssueID)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostPolSourceObservationIssueMoveDownDB(PolSourceObservationIssueID);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationIssueMoveUpJSON(int PolSourceObservationIssueID)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostPolSourceObservationIssueMoveUpDB(PolSourceObservationIssueID);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceIssueSaveJSON(FormCollection fc)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostModifyPolSourceObservationIssueDB(fc);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationCopyJSON(int PolSourceObservationID)
        {
            PolSourceObservationModel polSourceObservationModel = _PolSourceSiteService._PolSourceObservationService.PolSourceObservationCopyDB(PolSourceObservationID);

            return Json(polSourceObservationModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationDeleteJSON(int PolSourceObservationID)
        {
            PolSourceObservationModel polSourceObservationModel = _PolSourceSiteService._PolSourceObservationService.PostDeletePolSourceObservationDB(PolSourceObservationID);

            return Json(polSourceObservationModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceObservationList(int PolSourceSiteTVItemID)
        {
            ViewBag.PolSourceSiteTVItemID = PolSourceSiteTVItemID;
            ViewBag.PolSourceController = _PolSourceController;
            ViewBag.PolSourceObservationModelList = null;

            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.GetPolSourceSiteModelWithPolSourceSiteTVItemIDDB(PolSourceSiteTVItemID);

            if (string.IsNullOrWhiteSpace(polSourceSiteModel.Error))
            {
                List<PolSourceObservationModel> polSourceObservationModelList = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelListWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID).OrderByDescending(c => c.ObservationDate_Local).OrderByDescending(c => c.LastUpdateDate_UTC).ToList();

                foreach (PolSourceObservationModel polSourceObservationModel in polSourceObservationModelList)
                {
                    polSourceObservationModel.PolSourceObservationIssueModelList = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(polSourceObservationModel.PolSourceObservationID);
                }

                ViewBag.PolSourceObservationModelList = polSourceObservationModelList;
            }

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationAddOrModifyJSON(FormCollection fc)
        {
            PolSourceObservationModel PolSourceObservationModelRet = _PolSourceSiteService._PolSourceObservationService.PolSourceObservationAddOrModifyDB(fc);

            return Json(PolSourceObservationModelRet.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceSite(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.AddressModel = null;

            TVItemModel tvItemModelLocationCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelLocationCurrent = tvItemModelLocationCurrent;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            List<TabInfo> tabInfoList = GetTab1ViewTVItemInfoDB(tvItemModelLocationCurrent, tvAuth);

            ViewBag.TabInfoList = tabInfoList;

            ViewBag.PolSourceController = _PolSourceController;

            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.GetPolSourceSiteModelWithPolSourceSiteTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.PolSourceSiteModel = polSourceSiteModel;

            List<PolSourceObservationModel> polSourceObservationModelList = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelListWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID).OrderByDescending(c => c.ObservationDate_Local).OrderByDescending(c => c.LastUpdateDate_UTC).ToList();

            foreach (PolSourceObservationModel polSourceObservationModel in polSourceObservationModelList)
            {
                polSourceObservationModel.PolSourceObservationIssueModelList = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(polSourceObservationModel.PolSourceObservationID);
            }

            ViewBag.PolSourceObservationModelList = polSourceObservationModelList;

            List<MapInfoPointModel> mapInfoPointModelList = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.PolSourceSite, MapInfoDrawTypeEnum.Point);

            ViewBag.MapInfoPointModel = mapInfoPointModelList[0];

            if (polSourceSiteModel.CivicAddressTVItemID != null)
            {
                AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)polSourceSiteModel.CivicAddressTVItemID);

                ViewBag.AddressModel = addressModel;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceSiteAddOrModify(int ParentTVItemID, int PolSourceSiteTVItemID)
        {
            ViewBag.PolSourceSiteModel = null;
            ViewBag.MapInfoPointModel = null;
            ViewBag.ParentTVItemID = ParentTVItemID;
            ViewBag.PolSourceSiteTVItemID = PolSourceSiteTVItemID;
            ViewBag.PolSourceController = _PolSourceController;
            ViewBag.PolSourceObservationModelList = null;
            ViewBag.TVItemModel = null;
            ViewBag.AddressModel = null;

            if (ParentTVItemID == 0 && PolSourceSiteTVItemID == 0)
            {
                return PartialView();
            }

            PolSourceSiteModel polSourceSiteModel = null;
            if (PolSourceSiteTVItemID > 0)
            {
                ViewBag.IsModify = true;

                polSourceSiteModel = _PolSourceSiteService.GetPolSourceSiteModelWithPolSourceSiteTVItemIDDB(PolSourceSiteTVItemID);

                if (ParentTVItemID == 0)
                {
                    ViewBag.ParentTVItemID = _TVItemService.GetTVItemModelWithTVItemIDDB(polSourceSiteModel.PolSourceSiteTVItemID).ParentID;
                }

                ViewBag.PolSourceSiteModel = polSourceSiteModel;

                List<PolSourceObservationModel> polSourceObservationModelList = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelListWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID).OrderByDescending(c => c.ObservationDate_Local).OrderByDescending(c => c.LastUpdateDate_UTC).ToList();

                foreach (PolSourceObservationModel polSourceObservationModel in polSourceObservationModelList)
                {
                    polSourceObservationModel.PolSourceObservationIssueModelList = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(polSourceObservationModel.PolSourceObservationID);
                }

                ViewBag.PolSourceObservationModelList = polSourceObservationModelList;

                List<MapInfoPointModel> mapInfoPointModelList = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(PolSourceSiteTVItemID, TVTypeEnum.PolSourceSite, MapInfoDrawTypeEnum.Point);

                ViewBag.MapInfoPointModel = mapInfoPointModelList[0];

                TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(polSourceSiteModel.PolSourceSiteTVItemID);

                ViewBag.TVItemModel = tvItemModel;

                if (polSourceSiteModel.CivicAddressTVItemID != null)
                {
                    AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)polSourceSiteModel.CivicAddressTVItemID);

                    ViewBag.AddressModel = addressModel;
                }
            }

            List<PolSourceObsInfoEnumTextAndID> polSourceObsInfoEnumTextAndIDList = new List<PolSourceObsInfoEnumTextAndID>();
            foreach (int id in Enum.GetValues(typeof(PolSourceObsInfoEnum)))
            {
                if (id == 0)
                    continue;

                string tempText = _BaseEnumService.GetEnumText_PolSourceObsInfoEnum((PolSourceObsInfoEnum)id);
                if (tempText.IndexOf("|") > 0)
                {
                    tempText = tempText.Substring(0, tempText.IndexOf("|"));
                }
                polSourceObsInfoEnumTextAndIDList.Add(new PolSourceObsInfoEnumTextAndID() { Text = tempText, ID = id });
            }
            ViewBag.PolSourceObsInfoEnumTextAndIDList = polSourceObsInfoEnumTextAndIDList;

            List<PolSourceInactiveReasonEnumTextAndID> polSourceInactiveReasonEnumTextAndIDList = new List<PolSourceInactiveReasonEnumTextAndID>();
            foreach (int id in Enum.GetValues(typeof(PolSourceInactiveReasonEnum)))
            {
                if (id != 0)
                {
                    polSourceInactiveReasonEnumTextAndIDList.Add(new PolSourceInactiveReasonEnumTextAndID() { Text = _BaseEnumService.GetEnumText_PolSourceInactiveReasonEnum((PolSourceInactiveReasonEnum)id), ID = id });
                }
            }
            ViewBag.PolSourceInactiveReasonEnumTextAndIDList = polSourceInactiveReasonEnumTextAndIDList;


            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteAddOrModifyJSON(FormCollection fc)
        {
            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.PolSourceSiteAddOrModifyDB(fc);

            return Json(polSourceSiteModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteSetActiveJSON(int TVItemID, bool SetActive)
        {
            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.PolSourceSiteSetActiveDB(TVItemID, SetActive);

            return Json(polSourceSiteModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public FileResult GetPollutionSourceSitesForInputToolJSON(int SubsectorTVItemID)
        {
            FileInfo fi = _TVFileService.GeneratePollutionSourceSitesForInputToolDB(SubsectorTVItemID);

            string ContentType = _TVFileService.GetMimeType(fi.FullName);
            return File(fi.FullName, ContentType, fi.Name);
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetTVItemModelProvinceListJSON()
        {
            TVItemModel tvItemModelRoot = _TVItemService.GetRootTVItemModelDB();
            if (!string.IsNullOrWhiteSpace(tvItemModelRoot.Error))
            {
                return Json(new List<TVItemModel>(), JsonRequestBehavior.AllowGet);
            }

            List<TVItemModel> tvItemModelProvinceList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelRoot.TVItemID, TVTypeEnum.Province);

            return Json(tvItemModelProvinceList.OrderBy(c => c.TVText), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetTVItemModelSubsectorListJSON(int ProvinceTVItemID)
        {
            List<TVItemModel> tvItemModelSubsectorList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(ProvinceTVItemID, TVTypeEnum.Subsector);

            return Json(tvItemModelSubsectorList.OrderBy(c => c.TVText), JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public
    }
}