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
using System.Web.Helpers;

namespace CSSPWebTools.Controllers
{
    public class KMZController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public KMZService _KMZService { get; private set; }
        public KMZController _KMZController { get; private set; }
        #endregion Properties

        #region Constructors
        public KMZController()
        {
            _KMZController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _KMZService = new KMZService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public string GetKMLJSON(int TVItemID)
        {
            string kml = _KMZService.GetKML(TVItemID);

            return kml;
        }

        #endregion Functions public
    }
}
