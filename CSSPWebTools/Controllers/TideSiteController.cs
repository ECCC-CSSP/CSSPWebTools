﻿using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
using CSSPDBDLL.Models;
using CSSPDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using CSSPWebTools.Models;

namespace CSSPWebTools.Controllers
{
    public class TideSiteController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public MWQMSubsectorService _MWQMSubsectorService { get; private set; }
        #endregion Properties

        #region Constructors
        public TideSiteController()
        {

        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _MWQMSubsectorService = new MWQMSubsectorService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions (public)
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _tideSiteTopPage(int SubsectorTVItemID)
        {
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _subsectorTideSites(int SubsectorTVItemID, float Radius_km)
        {
            ViewBag.MWQMSubsectorTideSites = null;
            ViewBag.Radius_km = Radius_km;
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;
            ViewBag.TVItemModelList = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(SubsectorTVItemID, null, null, null);

            ViewBag.TVAuth = tvAuth;

            MWQMSubsectorTideSites mwqmSubsectorTideSites = _MWQMSubsectorService.GetMWQMSubsectorTideSitesDB(SubsectorTVItemID, Radius_km * 1000);
            ViewBag.MWQMSubsectorTideSites = mwqmSubsectorTideSites;

            List<TVItemModel> tvItemModelList = _MWQMSubsectorService.GetAdjacentSubsectors(SubsectorTVItemID, 2);
            ViewBag.TVItemModelList = tvItemModelList;

            return PartialView();
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult TideSitesToUseForSubsectorVerifyAndSaveJSON(FormCollection fc)
        {
            MWQMSubsectorModel mwqmSubsectorModel = _MWQMSubsectorService.TideSitesToUseForSubsectorVerifyAndSaveDB(fc);

            return Json(mwqmSubsectorModel.Error, JsonRequestBehavior.AllowGet);
        }


        #endregion Functions (public)
    }

}