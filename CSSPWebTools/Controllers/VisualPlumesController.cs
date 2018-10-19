using CSSPDBDLL.Models;
using CSSPDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSSPWebTools.Controllers.Resources;
using System.Web.UI;
using System.Security.Principal;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Controllers
{
    public class VisualPlumesController : BaseController
    {
         #region Variables
        #endregion Variables

        #region Properties
        public VPScenarioService _VPScenarioService { get; private set; }
        #endregion Properties

        #region Constructors
        public VisualPlumesController()
        {
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _VPScenarioService = new VPScenarioService(LanguageRequest, User);
        }
        #endregion Overrides
         
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CopyVPScenarioJSON(int VPScenarioID)
        {
            VPScenarioModel vpScenarioModel = _VPScenarioService.PostCopyVPScenarioDB(VPScenarioID);

            return Json(vpScenarioModel.Error, JsonRequestBehavior.AllowGet);
        }
         
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CreateNewVisualPlumeScenarioJSON(int InfrastructureTVItemID)
        {
            VPScenarioModel vpScenarioModel = _VPScenarioService.PostCreateNewVPScenarioDB(InfrastructureTVItemID);

            return Json(vpScenarioModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult DeleteVPScenarioJSON(int VPScenarioID)
        {
            VPScenarioModel vpScenarioModelRet = _VPScenarioService.PostDeleteVPScenarioDB(VPScenarioID);

            // if ErrorOrSuccess == "" then successful otherwise contains error message
            return Json(vpScenarioModelRet.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetNextVPScenarioToRunJSON()
        {
            // used for the VPAuto Desktop application

            // anybody can get this information
            // No login required

            VPFullModel vpf = _VPScenarioService.GetNextVPScenarioToRunDB();
            
            return Json(vpf, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SaveVPScenarioJSON(FormCollection fc)
        {
            VPScenarioModel vpScenarioModel = _VPScenarioService.PostSaveVPScenarioDB(fc);

            return Json(vpScenarioModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SaveVPScenarioRawResultsJSON(VPScenarioIDAndRawResults vpScenarioIDAndRawResults)
        {
            // used for the VPAuto Desktop application

            // anybody can get this information   
            // No login required

            IPrincipal user = new GenericPrincipal(new GenericIdentity("charles.leblanc2@canada.ca", "Forms"), null);

            VPScenarioService vpScenarioService = new VPScenarioService(LanguageEnum.en, user);

            //int VPScenarioID = int.Parse(uploadString.Substring(0, uploadString.IndexOf("|||")));
            //string RawResults = uploadString.Substring(uploadString.IndexOf("|||") + 3);

            VPScenarioModel vpScenarioModel = vpScenarioService.PostSaveResultsInDB(vpScenarioIDAndRawResults.VPScenarioID, vpScenarioIDAndRawResults.RawResults);
            return Json(vpScenarioModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumeAmbient(int VPScenarioID)
        {
            List<VPAmbientModel> vpAmbientModelList = _VPScenarioService._VPAmbientService.GetVPAmbientModelListWithVPScenarioIDDB(VPScenarioID);

            ViewBag.VPAmbientModelList = vpAmbientModelList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumeScenario(int VPScenarioID)
        {
            VPFullModel vpFullModel = _VPScenarioService.GetVPScenarioFullDB(VPScenarioID);

            ViewBag.VPFullModel = vpFullModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumeScenarioChartResults(int VPScenarioID)
        {
            VPFullModel vpFullModel = _VPScenarioService.GetVPScenarioFullDB(VPScenarioID);

            ViewBag.VPFullModel = vpFullModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumeScenarioEditAmbient(int VPScenarioID)
        {
            VPFullModel vpFullModel = _VPScenarioService.GetVPScenarioFullDB(VPScenarioID);

            ViewBag.VPFullModel = vpFullModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumeScenarioEditDiffuser(int VPScenarioID)
        {
            VPFullModel vpFullModel = _VPScenarioService.GetVPScenarioFullDB(VPScenarioID);

            ViewBag.VPFullModel = vpFullModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumeScenarioInput(int VPScenarioID)
        {
            VPFullModel vpFullModel = _VPScenarioService.GetVPScenarioFullDB(VPScenarioID);

            ViewBag.VPFullModel = vpFullModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumeScenarioRawResults(int VPScenarioID)
        {
            VPFullModel vpFullModel = _VPScenarioService.GetVPScenarioFullDB(VPScenarioID);

            ViewBag.VPFullModel = vpFullModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumeScenarioResults(int VPScenarioID)
        {
            VPFullModel vpFullModel = _VPScenarioService.GetVPScenarioFullDB(VPScenarioID);

            ViewBag.VPFullModel = vpFullModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _visualPlumesList(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            List<VPScenarioModel> vpScenarioModelList = _VPScenarioService.GetVPScenarioModelListWithInfrastructureTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.VPScenarioModelList = vpScenarioModelList;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            return PartialView();
        }

    }
}
