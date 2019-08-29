using CSSPEnumsDLL.Enums;
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
            _BaseEnumService = new BaseEnumService(LanguageRequest);
        }
        #endregion Overrides

        #region Functions public

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceSiteEffect(int PolSourceSiteTVItemID)
        {
            ViewBag.PolSourceSiteTVItemID = PolSourceSiteTVItemID;
            ViewBag.PolSourceSiteEffectModelList = null;
            ViewBag.PolSourceSiteEffectTermModelAllList = null;
            ViewBag.PolSourceSiteModel = null;
            ViewBag.MWQMSiteModelList = null;

            if (PolSourceSiteTVItemID == 0)
            {
                return PartialView();
            }

            TVItemModel tvItemModelPolSourceSite = _TVItemService.GetTVItemModelWithTVItemIDDB(PolSourceSiteTVItemID);

            if (string.IsNullOrWhiteSpace(tvItemModelPolSourceSite.Error))
            {
                TVItemModel tvItemModelSubsector = _TVItemService.GetTVItemModelWithTVItemIDDB(tvItemModelPolSourceSite.ParentID);
                if (string.IsNullOrWhiteSpace(tvItemModelSubsector.Error))
                {

                    List<PolSourceSiteEffectTermModel> polSourceSiteEffectTermModelList = _PolSourceSiteEffectTermService.GetAllPolSourceSiteEffectTerm();

                    ViewBag.PolSourceSiteEffectTermModelAllList = polSourceSiteEffectTermModelList;

                    List<PolSourceSiteEffectModel> polSourceSiteEffectModelList = _PolSourceSiteEffectService.GetPolSourceSiteEffectModelListWithPolSourceSiteTVItemIDDB(PolSourceSiteTVItemID);

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
                }
            }

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteAddOrModifyJSON(FormCollection fc)
        {
            PolSourceSiteEffectModel polSourceSiteEffectModel = _PolSourceSiteEffectService.PolSourceSiteEffectAddOrModifyDB(fc);

            return Json(polSourceSiteEffectModel.Error, JsonRequestBehavior.AllowGet);
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
        public JsonResult PolSourceSiteEffectTermSendToGroupJSON(int PolSourceSiteEffectTermID, int PolSourceSiteEffectTermIDGroup)
        {
            PolSourceSiteEffectTermModel polSourceSiteEffectTermModel = _PolSourceSiteEffectTermService.PolSourceSiteEffectTermSendToGroupDB(PolSourceSiteEffectTermID, PolSourceSiteEffectTermIDGroup);

            return Json(polSourceSiteEffectTermModel.Error, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions public
    }
}