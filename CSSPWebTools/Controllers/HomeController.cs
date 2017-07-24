using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using CSSPWebTools.Models;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Controllers
{
    public class HomeController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        private TVTypeUserAuthorizationService _TVTypeUserAuthorizationService { get; set; }
        public AppTaskService _AppTaskService { get; private set; }
        HomeController _HomeController;
        #endregion Properties

        #region Constructors
        public HomeController()
        {
            _HomeController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _TVTypeUserAuthorizationService = new TVTypeUserAuthorizationService(LanguageRequest, User);
            _AppTaskService = new AppTaskService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _appTask(int TVItemID, int Seconds)
        {
            ViewBag.TVItemID = TVItemID;
            ViewBag.Seconds = Seconds;
            ViewBag.HomeController = _HomeController;

            List<AppTaskModel> appTaskModelList = _AppTaskService.GetAppTaskModelListWithTVItemIDDB(TVItemID);
            ViewBag.AppTaskModelList = appTaskModelList;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult AppTaskDeleteJSON(int AppTaskID)
        {
            AppTaskModel appTaskModel = _AppTaskService.PostDeleteAppTaskDB(AppTaskID);

            return Json(appTaskModel.Error, JsonRequestBehavior.AllowGet);
        }
        
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _Header()
        {
            if (CultureRequest == "en-CA")
            {
                ViewBag.CultureRequestStr = "Français";
            }
            else if (CultureRequest == "fr-CA")
            {
                ViewBag.CultureRequestStr = "English";
            }
            else
            {
                ViewBag.CultureRequestStr = "Don't know language";
            }

            if (User.Identity.Name != "")
            {
                bool IsAdmin = _ContactService.IsAdministratorDB(User.Identity.Name);
                ViewBag.IsAdmin = IsAdmin;

                bool IsSamplingPlanner = _ContactService.IsSamplingPlannerDB(User.Identity.Name);
                ViewBag.IsSamplingPlanner = IsSamplingPlanner;

                ContactModel contactModel = _TVItemService.GetContactLoggedInDB();
                ViewBag.ContactModel = contactModel;

                List<TVTypeUserAuthorizationModel> tvTypeUserAuthorizationModelList = _TVTypeUserAuthorizationService.GetTVTypeUserAuthorizationModelListWithContactTVItemIDDB(contactModel.ContactTVItemID);
                ViewBag.TVTypeUserAuthorizationModelList = tvTypeUserAuthorizationModelList;
            }
            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _Home()
        {
            SetArgs("");
            ViewBag.URLModel = urlModel;

            TVItemModel tvItemModelRoot = _TVItemService.GetRootTVItemModelDB();

            ViewBag.TVItemModelRoot = tvItemModelRoot;

            List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();

            ViewBag.AdminContactModelList = adminContactModelList;

            ViewBag.HomeController = _HomeController;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ViewResult Index()
        {
            return View();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SearchJSON(int TVItemID, string SearchTerm)
        {
            List<TVItemModel> tvItemModelList = _TVItemService.GetTVItemModelListContainingTVTextDB(TVItemID, SearchTerm);

            return Json(tvItemModelList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _View(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            // getting current
            TVItemModel tvItemModelLocationCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelLocationCurrent = tvItemModelLocationCurrent;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = (tvAuth  == TVAuthEnum.Error ? TVAuthEnum.NoAccess : tvAuth); 

            // getting children 
            List<TVItemModelAndChildCount> tvItemModelLocationChildrenList = _TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], GetChildLocation(tvItemModelLocationCurrent.TVType));

            ViewBag.TVItemModelLocationChildrenList = tvItemModelLocationChildrenList;

            // getting parent
            List<TVItemModel> tvItemModelLocationParentList = _TVItemService.GetParentTVItemModelListWithTVItemIDForLocationDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelLocationParentList = tvItemModelLocationParentList;

            ViewBag.HomeController = _HomeController;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _PermissionRequired()
        {
            List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();

            ViewBag.AdminContactModelList = adminContactModelList;

            return PartialView();
        }


        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _LoginOrRegisterRequired()
        {
            return PartialView();
        }
        #endregion Functions public
    }
}