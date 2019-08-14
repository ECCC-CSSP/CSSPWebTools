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
    public class RainExceedanceController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public RainExceedanceController _RainExceedanceController { get; private set; }
        public RainExceedanceService _RainExceedanceService { get; private set; }
        public EmailDistributionListService _EmailDistributionListService { get; private set; }
        #endregion Properties

        #region Constructors
        public RainExceedanceController()
        {
            _RainExceedanceController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _RainExceedanceService = new RainExceedanceService(LanguageRequest, User);
            _EmailDistributionListService = new EmailDistributionListService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Views/PartialViews
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _rainExceedance(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.ParentTVItemID = urlModel.TVItemIDList[0];
            ViewBag.RainExceedanceModelList = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);

            List<RainExceedanceModel> rainExceedanceModelList = _RainExceedanceService.GetRainExceedanceModelListDB();

            ViewBag.RainExceedanceModelList = rainExceedanceModelList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _rainExceedanceClimateSite(string ClimateSiteTVItemIDs)
        {
            ViewBag.ClimateSiteTVItemIDs = ClimateSiteTVItemIDs;
            ViewBag.ClimateSiteTVItemIDsList = null;
            ViewBag.TVItemModelList = null;

            List<int> climateSiteTVItemIDsList = ClimateSiteTVItemIDs.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList().Select(c => int.Parse(c)).ToList();

            List<TVItemModel> tvItemModelList = _TVItemService.GetTVItemModelListWithTVItemIDListDB(climateSiteTVItemIDsList);

            ViewBag.TVItemModelList = tvItemModelList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _rainExceedanceAddOrModify(int ParentTVItemID, int RainExceedanceID)
        {
            ViewBag.RainExceedanceModel = null;
            ViewBag.ParentTVItemID = ParentTVItemID;
            ViewBag.EmailDistributionListModelList = null;

            if (RainExceedanceID != 0)
            {
                RainExceedanceModel rainExceedanceModel = _RainExceedanceService.GetRainExceedanceModelWithRainExceedanceIDDB(RainExceedanceID);

                ViewBag.RainExceedanceModel = rainExceedanceModel;
            }

            List<EmailDistributionListModel> emailDistributionListModelList = _EmailDistributionListService.GetEmailDistributionListModelWithParentTVItemIDDB(ParentTVItemID);

            ViewBag.EmailDistributionListModelList = emailDistributionListModelList;

            return PartialView();
        }

        #endregion Functions View/PartialViews 

        #region Functions JSON
        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult RainExceedanceSaveJSON(FormCollection fc)
        {
            RainExceedanceModel rainExceedanceModel = _RainExceedanceService.PostRainExceedanceSaveDB(fc);

            return Json(rainExceedanceModel.Error, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions JSON

        #region Functions public Non Action
        #endregion Functions public Non Action
    }
}