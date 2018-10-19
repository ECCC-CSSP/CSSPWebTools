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
    public class TelController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public TelController _TelController { get; private set; }
        public TelService _TelService { get; private set; }
        public TVItemLinkService _TVItemLinkService { get; set; }
        #endregion Properties

        #region Constructors
        public TelController()
        {
            _TelController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _TelService = new TelService(LanguageRequest, User);
            _TVItemLinkService = new TVItemLinkService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _telEditList(int ContactTVItemID)
        {
            ContactModel contactModel = _ContactService.GetContactModelWithContactTVItemIDDB(ContactTVItemID);

            ViewBag.ContactModel = contactModel;

            List<TVItemLinkModel> tvItemLinkModelList = _TVItemLinkService.GetTVItemLinkModelListWithFromTVItemIDDB(ContactTVItemID).Where(c => c.ToTVType == TVTypeEnum.Tel).ToList();

            List<TelModel> telModelList = new List<TelModel>();

            foreach (TVItemLinkModel tvItemLinkModel in tvItemLinkModelList)
            {
                telModelList.Add(_TelService.GetTelModelWithTelTVItemIDDB(tvItemLinkModel.ToTVItemID));
            }

            ViewBag.TelModelList = telModelList;

            ViewBag.TelController = _TelController;

            return PartialView();
        }       
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult TelSaveJSON(FormCollection fc)
        {
            TelModel telModel = _TelService.PostAddOrModifyDB(fc);

            return Json(telModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult TelDeleteJSON(FormCollection fc)
        {
            TelModel telModel = _TelService.PostDeleteTelUnderContactTVItemIDDB(fc);

            return Json(telModel.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public
    }
}