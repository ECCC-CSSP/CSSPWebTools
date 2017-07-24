using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
using CSSPWebToolsDBDLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class DialogController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public DialogController _DialogController {get; set; }
        #endregion Properties

        #region Constructors
        public DialogController()
        {
            _DialogController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _dialogBasic()
        {
            return PartialView();
        }
         
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _dialogPermissions(TVAuthEnum TVAuth)
        {
            ViewBag.TVAuth = TVAuth;

            List<ContactModel> adminContactModelList = _ContactService.GetAdminContactModelListDB();

            ViewBag.AdminContactModelList = adminContactModelList;

            ViewBag.DialogController = _DialogController;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _dialogHelp(string HelpCode)
        {
            ViewBag.DialogController = _DialogController;
            ViewBag.HelpCode = HelpCode;

            return PartialView();
        }

        #endregion Functions public
    }
}