using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSSPWebTools.Controllers.Resources;
using CSSPWebToolsDBDLL.Services;
using CSSPWebToolsDBDLL.Models;
using System.Web.UI;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Controllers
{
    public class BoxModelController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public BoxModelService _BoxModelService { get; private set; }
        public BoxModelResultService _BoxModelResultService { get; private set; }
        public BoxModelController _BoxModelController { get; private set; }
        #endregion Properties

        #region Constructors
        public BoxModelController()
        {
            _BoxModelController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _BoxModelService = new BoxModelService(LanguageRequest, User);
            _BoxModelResultService = new BoxModelResultService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _boxModelEdit(int BoxModelID)
        {
            BoxModelModel boxModelModel = _BoxModelService.GetBoxModelModelWithBoxModelIDDB(BoxModelID);

            ViewBag.BoxModelModel = boxModelModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _boxModelList(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            List<BoxModelModel> boxModelModelList = _BoxModelService.GetBoxModelModelOrderByScenarioNameDB(urlModel.TVItemIDList[0]);

            ViewBag.BoxModelModelList = boxModelModelList;

            ViewBag.BoxModelController = _BoxModelController;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _boxModelResults(int BoxModelID)
        {
            List<BoxModelResultModel> boxModelResultModelList = _BoxModelResultService.GetBoxModelResultModelListWithBoxModelIDOrderByResultTypeDB(BoxModelID);

            ViewBag.BoxModelResultModelList = boxModelResultModelList;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CopyBoxModelScenarioJSON(int BoxModelID = 0)
        {
            BoxModelModel boxModelModelRet = _BoxModelService.CopyBoxModelScenarioDB(BoxModelID);

            return Json(boxModelModelRet.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CalculateDecayJSON(double T90_hour, double Temperature_C)
        {
            CalDecay calDecay = _BoxModelService.CalculateDecayDB(T90_hour, Temperature_C);

            return Json(calDecay, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CreateNewBoxModelScenarioJSON(int InfrastructureTVItemID)
        {
            BoxModelModel boxModelModelRet = _BoxModelService.CreateNewBMScenarioDB(InfrastructureTVItemID);

            return Json(boxModelModelRet.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult DeleteBoxModelScenarioJSON(int BoxModelID)
        {
            BoxModelModel boxModelModelRet = _BoxModelService.PostDeleteBoxModelDB(BoxModelID);

            return Json(boxModelModelRet.Error, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SaveBoxModelScenarioJSON(FormCollection fc)
        {
            BoxModelModel boxModelModelRet = _BoxModelService.SaveBoxModelScenarioDB(fc);

            return Json(boxModelModelRet.Error, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions public
    }
}
