using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
using CSSPWebTools.Controllers.Resources;
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
    public class AdminController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public TVItemUserAuthorizationService _TVItemUserAuthorizationService { get; private set; }
        public TVTypeUserAuthorizationService _TVTypeUserAuthorizationService { get; private set; }
        public AdminController _AdminController { get; private set; }
        #endregion Properties

        #region Constructors
        public AdminController()
        {
            _AdminController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _TVItemUserAuthorizationService = new TVItemUserAuthorizationService(LanguageRequest, User);
            _TVTypeUserAuthorizationService = new TVTypeUserAuthorizationService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Views/PartialViews
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _Admin()
        {
            bool isAdmin = _ContactService.IsAdministratorDB(User.Identity.Name);

            ViewBag.IsAdmin = isAdmin;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _TVItemTVAuth(string TVPath)
        {
            bool isAdmin = _ContactService.IsAdministratorDB(User.Identity.Name);
            List<TVTypeNamesAndPath> tvTypeNamesAndPathList = _TVItemService.GetTVTypeNamesAndPathParentsWithTVType(TVPath);
            List<TVItemModel> tvItemModelCountryList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(1, TVTypeEnum.Country);

            ViewBag.IsAdmin = isAdmin;
            ViewBag.TVTypeNamesAndPathList = tvTypeNamesAndPathList;
            ViewBag.TVItemModelCountryList = tvItemModelCountryList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _TVItemTVAuthSelect(int ParentTVItemID, string TVPathNext)
        {
            bool isAdmin = _ContactService.IsAdministratorDB(User.Identity.Name);

            TVTypeEnum tvTypeNext = (TVTypeEnum)(_TVTypeUserAuthorizationService.tvTypeNamesAndPathList.Where(c => c.TVPath == TVPathNext).FirstOrDefault().Index);

            List<TVItemModel> TVItemModelList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(ParentTVItemID, tvTypeNext);

            ViewBag.IsAdmin = isAdmin;
            ViewBag.TVPathNext = TVPathNext;
            ViewBag.TVItemModelList = TVItemModelList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _User(int ContactTVItemID)
        {
            bool isAdmin = _ContactService.IsAdministratorDB(User.Identity.Name);

            ContactModel contactModel = _ContactService.GetContactModelWithContactTVItemIDDB(ContactTVItemID);

            ViewBag.IsAdmin = isAdmin;
            ViewBag.ContactModel = contactModel;

            List<TVItemModel> tvItemModelProvinceList = new List<TVItemModel>();
            TVItemModel tvItemModelRoot = _TVItemService.GetRootTVItemModelDB();
            if (string.IsNullOrWhiteSpace(tvItemModelRoot.Error))
            {
                tvItemModelProvinceList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelRoot.TVItemID, TVTypeEnum.Province);
            }

            List<TVItemModel> tvItemModelSelectedProvinceList = new List<TVItemModel>();
            if (contactModel.SamplingPlanner_ProvincesTVItemID != null && contactModel.SamplingPlanner_ProvincesTVItemID.Length > 0)
            {
                List<int> ProvinceTVItemIDList = contactModel.SamplingPlanner_ProvincesTVItemID.Substring(0, (contactModel.SamplingPlanner_ProvincesTVItemID.Length - 1)).Split(",".ToCharArray(), StringSplitOptions.None).Select(Int32.Parse).ToList();
                foreach (int ProvinceTVItemID in ProvinceTVItemIDList)
                {
                    tvItemModelSelectedProvinceList.Add(_TVItemService.GetTVItemModelWithTVItemIDDB(ProvinceTVItemID));
                }
            }

            ViewBag.TVItemModelProvinceList = tvItemModelProvinceList;
            ViewBag.TVItemModelSelectedProvinceList = tvItemModelSelectedProvinceList;


            return PartialView();
        }

        #endregion Functions View/PartialViews

        #region Functions JSON
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ContactDisabledToggleJSON(int ContactTVItemID)
        {
            if (!CheckIsAdmin())
                return Json(new ContactModel() { Error = ControllerRes.NeedToBeAnAdministrator }, JsonRequestBehavior.AllowGet);

            ContactModel contactModel = _ContactService.PostSetContactDisabledOrEnableForContactTVItemIDDB(ContactTVItemID);

            return Json(contactModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetTVTypeNameAndPathListJSON()
        {
            if (!CheckIsAdmin())
                return Json(new List<TVTypeNamesAndPath>(), JsonRequestBehavior.AllowGet);

            return Json(_ContactService.tvTypeNamesAndPathList.Take(1).ToList().Concat(_ContactService.tvTypeNamesAndPathList.Skip(0).OrderBy(c => c.TVTypeName).ToList()).ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetUserTVItemAuthJSON(int ContactTVItemID)
        {
            if (!CheckIsAdmin())
                return Json(new List<TVItemTVAuth>(), JsonRequestBehavior.AllowGet);

            List<TVItemTVAuth> TVItemTVAuthList = _TVItemUserAuthorizationService.GetTVItemTVAuthWithContactTVItemIDDB(ContactTVItemID);

            return Json(TVItemTVAuthList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetUserTVTypeAuthJSON(int ContactTVItemID)
        {
            if (!CheckIsAdmin())
                return Json(new List<TVTypeUserAuthorizationModel>(), JsonRequestBehavior.AllowGet);

            List<TVTypeUserAuthorizationModel> tvTypeUserAuthorizationModelList = _TVTypeUserAuthorizationService.GetTVTypeUserAuthorizationModelListWithContactTVItemIDDB(ContactTVItemID);

            return Json(tvTypeUserAuthorizationModelList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult RemoveUserJSON(string LoginEmail)
        {
            if (!CheckIsAdmin())
                return Json(ControllerRes.NeedToBeAnAdministrator, JsonRequestBehavior.AllowGet);

            ContactModel contactModel = _ContactService.PostRemoveUserDB(LoginEmail);
            return Json(contactModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult RemoveUserTVItemAuthJSON(int TVItemUserAuthID)
        {
            if (!CheckIsAdmin())
                return Json(ControllerRes.NeedToBeAnAdministrator, JsonRequestBehavior.AllowGet);

            TVItemUserAuthorizationModel tvItemUserAuthorizationModelRet = _TVItemUserAuthorizationService.PostDeleteTVItemUserAuthorizationDB(TVItemUserAuthID);

            return Json(tvItemUserAuthorizationModelRet.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult RemoveUserTVTypeAuthJSON(int ContactTVItemID, TVTypeEnum TVType)
        {
            if (!CheckIsAdmin())
                return Json(ControllerRes.NeedToBeAnAdministrator, JsonRequestBehavior.AllowGet);

            TVTypeUserAuthorizationModel tvTypeUserAuthorizationModelRet = _TVTypeUserAuthorizationService.PostDeleteTVTypeUserAuthorizationWithContactTVItemIDAndTVTypeDB(ContactTVItemID, TVType);

            return Json(tvTypeUserAuthorizationModelRet.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SetAddProvinceJSON(int ContactTVItemID, int ProvinceTVItemID)
        {
            if (!CheckIsAdmin())
                return Json(new TVItemUserAuthorizationModel() { Error = ControllerRes.NeedToBeAnAdministrator }, JsonRequestBehavior.AllowGet);

            ContactModel contactModel = _ContactService.PostSetAddProvinceDB(ContactTVItemID, ProvinceTVItemID);

            return Json(contactModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SetRemoveProvinceJSON(int ContactTVItemID, int ProvinceTVItemID)
        {
            if (!CheckIsAdmin())
                return Json(new TVItemUserAuthorizationModel() { Error = ControllerRes.NeedToBeAnAdministrator }, JsonRequestBehavior.AllowGet);

            ContactModel contactModel = _ContactService.PostSetRemoveProvinceDB(ContactTVItemID, ProvinceTVItemID);

            return Json(contactModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SetUserTVItemAuthJSON(TVItemUserAuthorizationModel tvTypeUserAuthorizationModel)
        {
            if (!CheckIsAdmin())
                return Json(new TVItemUserAuthorizationModel() { Error = ControllerRes.NeedToBeAnAdministrator }, JsonRequestBehavior.AllowGet);

            TVItemUserAuthorizationModel tvItemUserAuthorizationModelRet = _TVItemUserAuthorizationService.PostSetTVItemUserAuthorizationDB(tvTypeUserAuthorizationModel);

            return Json(tvItemUserAuthorizationModelRet, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult SetUserTVTypeAuthJSON(TVTypeUserAuthorizationModel tvTypeUserAuthorizationModel)
        {
            if (!CheckIsAdmin())
                return Json(new TVTypeUserAuthorizationModel() { Error = ControllerRes.NeedToBeAnAdministrator }, JsonRequestBehavior.AllowGet);

            TVTypeUserAuthorizationModel tvTypeUserAuthorizationModelRet = _TVTypeUserAuthorizationService.PostSetTVTypeUserAuthorizationDB(tvTypeUserAuthorizationModel);

            return Json(tvTypeUserAuthorizationModelRet, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions JSON

        #region Functions public Non Action
        [NonAction]
        public bool CheckIsAdmin()
        {
            if (_ContactService.IsAdministratorDB(User.Identity.Name))
                return true;

            return false;
        }
        #endregion Functions public Non Action
    }
}