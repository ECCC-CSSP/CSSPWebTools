﻿using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class TideSiteController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        #endregion Properties

        #region Constructors
        public TideSiteController()
        {

        }
        #endregion Constructors

        #region Functions (public)
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _tideSiteList(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            UseOfSiteService useOfSiteService = new UseOfSiteService(LanguageRequest, User);


            TVItemModel tvItemModelSubsector = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelSubsector = tvItemModelSubsector;

            List<UseOfSiteModel> useOfSiteModelList = useOfSiteService.GetUseOfSiteModelListWithSiteTypeAndSubsectorTVItemIDDB(SiteTypeEnum.Tide, urlModel.TVItemIDList[0]);

            ViewBag.UseOfSiteModelList = useOfSiteModelList;

            return PartialView();
        }
        #endregion Functions (public)
    }

}