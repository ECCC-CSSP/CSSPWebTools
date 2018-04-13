using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Models;
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
    public class ProvinceToolsController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public ProvinceToolsController _ProvinceToolsController { get; private set; }
        public ProvinceToolsService _ProvinceToolsService { get; private set; }
        #endregion Properties

        #region Constructors
        public ProvinceToolsController()
        {
            _ProvinceToolsController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _ProvinceToolsService = new ProvinceToolsService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Views/PartialViews
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _ProvinceToolsTopPage(string Q)
        {
            SetArgs(Q);
            ViewBag.ProvinceTVItemID = urlModel.TVItemIDList[0];

            return PartialView();
        }
        #endregion Functions View/PartialViews 

        #region Functions JSON
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult FillRunPrecipByClimateSitePriorityForYearJSON(int ProvinceTVItemID, int Year)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.FillRunPrecipByClimateSitePriorityForYearDB(ProvinceTVItemID, Year);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult FindMissingPrecipForProvinceJSON(int ProvinceTVItemID)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.FindMissingPrecipForProvinceDB(ProvinceTVItemID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetAllPrecipitationForYearJSON(int ProvinceTVItemID, int Year)
        {
            AppTaskModel appTaskModel = _ProvinceToolsService.GetAllPrecipitationForYearDB(ProvinceTVItemID, Year);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions JSON

        #region Functions public Non Action
        #endregion Functions public Non Action
    }

}