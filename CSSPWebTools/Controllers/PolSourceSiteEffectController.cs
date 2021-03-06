﻿using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
using CSSPWebTools.Models;
using CSSPDBDLL.Models;
using CSSPDBDLL.Services;
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
using System.Security.Principal;
using CSSPDBDLL.Services.Resources;
using System.Transactions;
using CSSPDBDLL;

namespace CSSPWebTools.Controllers
{
    public class PolSourceSiteEffectController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public PolSourceSiteEffectService _PolSourceSiteEffectService { get; private set; }
        public PolSourceSiteEffectTermService _PolSourceSiteEffectTermService { get; private set; }
        public PolSourceSiteService _PolSourceSiteService { get; private set; }
        public MWQMSiteService _MWQMSiteService { get; private set; }
        public UseOfSiteService _UseOfSiteService { get; private set; }
        public PolSourceSiteEffectController _PolSourceSiteEffectController { get; private set; }
        public BaseEnumService _BaseEnumService { get; private set; }
        #endregion Properties

        #region Constructors
        public PolSourceSiteEffectController()
        {
            _PolSourceSiteEffectController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _PolSourceSiteEffectService = new PolSourceSiteEffectService(LanguageRequest, User);
            _PolSourceSiteEffectTermService = new PolSourceSiteEffectTermService(LanguageRequest, User);
            _PolSourceSiteService = new PolSourceSiteService(LanguageRequest, User);
            _MWQMSiteService = new MWQMSiteService(LanguageRequest, User);
            _UseOfSiteService = new UseOfSiteService(LanguageRequest, User);
            _PolSourceSiteEffectService = new PolSourceSiteEffectService(LanguageRequest, User);
            _BaseEnumService = new BaseEnumService(LanguageRequest);
        }
        #endregion Overrides

        #region Functions public

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceSiteOrInfrastructureEffect(int PolSourceSiteOrInfrastructureTVItemID)
        {
            ViewBag.PolSourceSiteOrInfrastructureTVItemID = PolSourceSiteOrInfrastructureTVItemID;
            ViewBag.PolSourceSiteEffectModelList = null;
            ViewBag.PolSourceSiteEffectTermModelAllList = null;
            ViewBag.PolSourceSiteModelList = null;
            ViewBag.MWQMSiteModelList = null;

            if (PolSourceSiteOrInfrastructureTVItemID == 0)
            {
                return PartialView();
            }

            TVItemModel tvItemModelPolSourceSiteOrInfrastructure = _TVItemService.GetTVItemModelWithTVItemIDDB(PolSourceSiteOrInfrastructureTVItemID);

            if (string.IsNullOrWhiteSpace(tvItemModelPolSourceSiteOrInfrastructure.Error))
            {
                if (tvItemModelPolSourceSiteOrInfrastructure.TVType == TVTypeEnum.PolSourceSite)
                {
                    TVItemModel tvItemModelSubsector = _TVItemService.GetTVItemModelWithTVItemIDDB(tvItemModelPolSourceSiteOrInfrastructure.ParentID);
                    if (string.IsNullOrWhiteSpace(tvItemModelSubsector.Error))
                    {

                        List<PolSourceSiteEffectTermModel> polSourceSiteEffectTermModelList = _PolSourceSiteEffectTermService.GetAllPolSourceSiteEffectTerm();

                        ViewBag.PolSourceSiteEffectTermModelAllList = polSourceSiteEffectTermModelList;

                        List<PolSourceSiteEffectModel> polSourceSiteEffectModelList = _PolSourceSiteEffectService.GetPolSourceSiteEffectModelListWithPolSourceSiteOrInfrastructureTVItemIDDB(PolSourceSiteOrInfrastructureTVItemID);

                        if (polSourceSiteEffectModelList.Count > 0)
                        {
                            foreach (PolSourceSiteEffectModel polSourceSiteEffectModel in polSourceSiteEffectModelList)
                            {
                                if (!string.IsNullOrWhiteSpace(polSourceSiteEffectModel.PolSourceSiteEffectTermIDs))
                                {
                                    List<string> TermList = polSourceSiteEffectModel.PolSourceSiteEffectTermIDs.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                                    if (TermList.Count > 0)
                                    {
                                        foreach (string s in TermList)
                                        {
                                            int PolSourceSiteEffectTermID = int.Parse(s);
                                            PolSourceSiteEffectTermModel polSourceSiteEffectTermModel = polSourceSiteEffectTermModelList.Where(c => c.PolSourceSiteEffectTermID == PolSourceSiteEffectTermID).FirstOrDefault();
                                            if (polSourceSiteEffectTermModel != null)
                                            {
                                                polSourceSiteEffectModel.PolSourceSiteEffectTermModelList.Add(polSourceSiteEffectTermModel);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        polSourceSiteEffectModel.PolSourceSiteEffectTermModelList = new List<PolSourceSiteEffectTermModel>();
                                    }
                                }
                            }
                        }

                        ViewBag.PolSourceSiteEffectModelList = polSourceSiteEffectModelList;

                        List<PolSourceSiteModel> polSourceSiteModelList = _PolSourceSiteService.GetPolSourceSiteModelListWithSubsectorTVItemIDDB(tvItemModelSubsector.TVItemID);

                        ViewBag.PolSourceSiteModelList = polSourceSiteModelList;

                        List<MWQMSiteModel> mwqmSiteModelList = _MWQMSiteService.GetMWQMSiteModelListWithSubsectorTVItemIDDB(tvItemModelSubsector.TVItemID);

                        ViewBag.MWQMSiteModelList = mwqmSiteModelList;
                    }
                }
                else if (tvItemModelPolSourceSiteOrInfrastructure.TVType == TVTypeEnum.Infrastructure)
                {
                    TVItemModel tvItemModelMunicipality = _TVItemService.GetTVItemModelWithTVItemIDDB(tvItemModelPolSourceSiteOrInfrastructure.ParentID);
                    if (string.IsNullOrWhiteSpace(tvItemModelMunicipality.Error))
                    {
                        List<UseOfSiteModel> useOfSiteModelList = _UseOfSiteService.GetUseOfSiteModelListWithSiteTVItemIDDB(tvItemModelMunicipality.TVItemID);
                        if (useOfSiteModelList.Count > 0)
                        {
                            TVItemModel tvItemModelSubsector = _TVItemService.GetTVItemModelWithTVItemIDDB(useOfSiteModelList[0].SubsectorTVItemID);
                            if (string.IsNullOrWhiteSpace(tvItemModelSubsector.Error))
                            {

                                List<PolSourceSiteEffectTermModel> polSourceSiteEffectTermModelList = _PolSourceSiteEffectTermService.GetAllPolSourceSiteEffectTerm();

                                ViewBag.PolSourceSiteEffectTermModelAllList = polSourceSiteEffectTermModelList;

                                List<PolSourceSiteEffectModel> polSourceSiteEffectModelList = _PolSourceSiteEffectService.GetPolSourceSiteEffectModelListWithPolSourceSiteOrInfrastructureTVItemIDDB(PolSourceSiteOrInfrastructureTVItemID);

                                if (polSourceSiteEffectModelList.Count > 0)
                                {
                                    foreach (PolSourceSiteEffectModel polSourceSiteEffectModel in polSourceSiteEffectModelList)
                                    {
                                        if (!string.IsNullOrWhiteSpace(polSourceSiteEffectModel.PolSourceSiteEffectTermIDs))
                                        {
                                            List<string> TermList = polSourceSiteEffectModel.PolSourceSiteEffectTermIDs.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                                            if (TermList.Count > 0)
                                            {
                                                foreach (string s in TermList)
                                                {
                                                    int PolSourceSiteEffectTermID = int.Parse(s);
                                                    PolSourceSiteEffectTermModel polSourceSiteEffectTermModel = polSourceSiteEffectTermModelList.Where(c => c.PolSourceSiteEffectTermID == PolSourceSiteEffectTermID).FirstOrDefault();
                                                    if (polSourceSiteEffectTermModel != null)
                                                    {
                                                        polSourceSiteEffectModel.PolSourceSiteEffectTermModelList.Add(polSourceSiteEffectTermModel);
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                polSourceSiteEffectModel.PolSourceSiteEffectTermModelList = new List<PolSourceSiteEffectTermModel>();
                                            }
                                        }
                                    }
                                }

                                ViewBag.PolSourceSiteEffectModelList = polSourceSiteEffectModelList;

                                List<PolSourceSiteModel> polSourceSiteModelList = _PolSourceSiteService.GetPolSourceSiteModelListWithSubsectorTVItemIDDB(tvItemModelSubsector.TVItemID);

                                ViewBag.PolSourceSiteModelList = polSourceSiteModelList;

                                List<MWQMSiteModel> mwqmSiteModelList = _MWQMSiteService.GetMWQMSiteModelListWithSubsectorTVItemIDDB(tvItemModelSubsector.TVItemID);

                                ViewBag.MWQMSiteModelList = mwqmSiteModelList;
                            }
                        }
                    }
                }
                else
                {
                }
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceSiteOrInfrastructureEffectTermsManager()
        {
            ViewBag.PolSourceSiteEffectTermModelAllList = null;

            List<PolSourceSiteEffectTermModel> polSourceSiteEffectTermModelList = _PolSourceSiteEffectTermService.GetAllPolSourceSiteEffectTerm();

            ViewBag.PolSourceSiteEffectTermModelAllList = polSourceSiteEffectTermModelList;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteEffectTermsSaveAllJSON(int PolSourceSiteEffectID, string PolSourceSiteEffectTermIDs)
        {
            PolSourceSiteEffectModel polSourceSiteEffectModel = _PolSourceSiteEffectService.PolSourceSiteEffectTermsSaveAllDB(PolSourceSiteEffectID, PolSourceSiteEffectTermIDs);

            return Json(polSourceSiteEffectModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteEffectTermAddOrModifyJSON(FormCollection fc)
        {
            PolSourceSiteEffectTermModel polSourceSiteEffectTermModel = _PolSourceSiteEffectTermService.PolSourceSiteEffectTermAddOrModifyDB(fc);

            return Json(polSourceSiteEffectTermModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteEffectTermsDeleteJSON(int PolSourceSiteEffectTermID)
        {
            PolSourceSiteEffectTermModel polSourceSiteEffectTermModel = _PolSourceSiteEffectTermService.PostDeletePolSourceSiteEffectTermDB(PolSourceSiteEffectTermID);

            return Json(polSourceSiteEffectTermModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteEffectTermSetIsGroupJSON(int PolSourceSiteEffectTermID, bool IsGroup)
        {
            PolSourceSiteEffectTermModel polSourceSiteEffectTermModel = _PolSourceSiteEffectTermService.PolSourceSiteEffectTermSetIsGroupDB(PolSourceSiteEffectTermID, IsGroup);

            return Json(polSourceSiteEffectTermModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteEffectTermSendToGroupJSON(int PolSourceSiteEffectTermID, int UnderGroupID)
        {
            PolSourceSiteEffectTermModel polSourceSiteEffectTermModel = _PolSourceSiteEffectTermService.PolSourceSiteEffectTermSendToGroupDB(PolSourceSiteEffectTermID, UnderGroupID);

            return Json(polSourceSiteEffectTermModel.Error, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions public
    }
}