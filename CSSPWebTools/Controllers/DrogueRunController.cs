using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSSPWebTools.Controllers.Resources;
using CSSPDBDLL.Services;
using CSSPDBDLL.Models;
using System.Web.UI;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Controllers
{
    public class DrogueRunController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public DrogueRunService _DrogueRunService { get; private set; }
        public DrogueRunPositionService _DrogueRunPositionService { get; private set; }
        public DrogueRunController _DrogueController { get; private set; }
        #endregion Properties

        #region Constructors
        public DrogueRunController()
        {
            _DrogueController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _DrogueRunService = new DrogueRunService(LanguageRequest, User);
            _DrogueRunPositionService = new DrogueRunPositionService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _DrogueRunForSubsector(int SubsectorTVItemID)
        {
            ViewBag.DrogueRunModelList = new List<DrogueRunModel>();
            ViewBag.DrogueRunPositionModelList = new List<DrogueRunPositionModel>();
            ViewBag.SubsectorTVItemID = SubsectorTVItemID;

            List<DrogueRunModel> drogueRunModelList = _DrogueRunService.GetDrogueRunModelListWithSubsectorTVItemIDDB(SubsectorTVItemID);
            ViewBag.DrogueRunModelList = drogueRunModelList;

            List<DrogueRunPositionModel> drogueRunPositionModelList = new List<DrogueRunPositionModel>();
            foreach (DrogueRunModel drogueRunModel in drogueRunModelList)
            {
                List<DrogueRunPositionModel> PartDrogueRunPositionModelList = _DrogueRunPositionService.GetDrogueRunPositionModelListWithDrogueRunIDDB(drogueRunModel.DrogueRunID);
                foreach (DrogueRunPositionModel drogueRunPositionModel in PartDrogueRunPositionModelList)
                {
                    drogueRunPositionModelList.Add(drogueRunPositionModel);
                }
            }

            ViewBag.DrogueRunPositionModelList = drogueRunPositionModelList;

            return PartialView();
        }
        [HttpPost]
        [ValidateInput(false)]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult DrogueRunSaveJSON(FormCollection fc)
        {
            DrogueRunModel DrogueRunModel = _DrogueRunService.PostAddOrModifyDB(fc);

            return Json(DrogueRunModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult DrogueRunDeleteJSON(int DrogueRunID)
        {
            DrogueRunModel DrogueRunModel = _DrogueRunService.PostDeleteDrogueRunDB(DrogueRunID);

            return Json(DrogueRunModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public
    }
}