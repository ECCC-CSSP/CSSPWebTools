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
    public class SubsectorToolsController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public SubsectorToolsController _SubsectorToolsController { get; private set; }
        public MWQMSubsectorService _MWQMSubsectorService { get; private set; }
        #endregion Properties

        #region Constructors
        public SubsectorToolsController()
        {
            _SubsectorToolsController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _MWQMSubsectorService = new MWQMSubsectorService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Views/PartialViews
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _SubsectorToolsTopPage(string Q)
        {
            SetArgs(Q);

            ViewBag.SubsectorTVItemID = urlModel.TVItemIDList[0];

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _municipalityTopPage(int SubsectorTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _subsectorMunicipalities(int SubsectorTVItemID, float Radius_km)
        {
            ViewBag.MWQMSubsectorMunicipalities = null;
            ViewBag.Radius_km = Radius_km;
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.TVItemModelList = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            MWQMSubsectorMunicipalities mwqmSubsectorMunicipalities = _MWQMSubsectorService.GetMWQMSubsectorMunicipalitiesDB(SubsectorTVItemID, Radius_km * 1000);
            ViewBag.MWQMSubsectorMunicipalities = mwqmSubsectorMunicipalities;

            List<TVItemModel> tvItemModelList = _MWQMSubsectorService.GetAdjacentSubsectors(SubsectorTVItemID, 2);
            ViewBag.TVItemModelList = tvItemModelList;
            return PartialView();
        }
        #endregion Functions View/PartialViews 

        #region Functions JSON
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MunicipalitiesToUseForSubsectorVerifyAndSaveJSON(FormCollection fc)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.MunicipalitiesToUseForSubsectorVerifyAndSaveDB(fc);

            return Json(mwqmSubsectorModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions JSON

        #region Functions public Non Action
        #endregion Functions public Non Action
    }

}