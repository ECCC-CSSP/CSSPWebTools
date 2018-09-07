using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using System.Web.Routing;
using System.Security.Principal;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Models;
using CSSPWebToolsDBDLL.Services.Resources;
using System.Web.UI;
using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;

namespace CSSPWebTools.Controllers
{
    public class BaseController : Controller
    {
        #region Variables
        #endregion Variables

        #region Properties
        public List<string> CultureListAllowable { get; private set; }

        public ContactService _ContactService { get; private set; }
        public RequestContext _RequestContext { get; private set; }
        public TVItemService _TVItemService { get; private set; }
        public TVItemStatService _TVItemStatService { get; private set; }
        //public MikeScenarioService _MikeScenarioService { get; private set; }

        public string CultureRequest { get; private set; }
        public LanguageEnum LanguageRequest { get; private set; }
        public bool IsAdmin { get; private set; }
        public bool IsSamplingPlanner { get; private set; }
        public bool Debug { get; private set; }

        public URLModel urlModel { get; set; }
        #endregion Properties

        #region Constructors
        public BaseController()
        {
            //Thread.Sleep(1000); 

            this.CultureListAllowable = new List<string>() { "en-CA", "fr-CA" };
            this.CultureRequest = "en-CA";
            this.LanguageRequest = LanguageEnum.en;
            this.IsAdmin = false;
            this.IsSamplingPlanner = false;
            this.Debug = false;

            _ContactService = new ContactService(this.LanguageRequest, User);
            _TVItemService = new TVItemService(this.LanguageRequest, User);
            _TVItemStatService = new TVItemStatService(this.LanguageRequest, User);
            urlModel = new URLModel();
        }
        #endregion Constructors

        #region Functions (private)
        #endregion Functions (private)

        #region Functions (protected)
        protected override void Initialize(RequestContext requestContext)
        {
            this.CultureRequest = requestContext.RouteData.Values["culture"].ToString();
            if (!CultureListAllowable.Contains(this.CultureRequest))
            {
                this.CultureRequest = "en-CA";
                requestContext.RouteData.Values.Remove("culture");
                requestContext.RouteData.Values.Add("culture", this.CultureRequest);
            }

            ViewBag.Culture = this.CultureRequest;
            ViewBag.Language = (this.CultureRequest.Substring(0, 2) == "fr" ? LanguageEnum.fr : LanguageEnum.en);
            CultureInfo ci = new CultureInfo(CultureRequest);
            Thread.CurrentThread.CurrentCulture = ci;
            Thread.CurrentThread.CurrentUICulture = ci;
            this.LanguageRequest = (ci.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);
            this.IsAdmin = false;

            if (requestContext.HttpContext.User != null)
            {
                _ContactService = new ContactService(this.LanguageRequest, requestContext.HttpContext.User);
                _TVItemService = new TVItemService(this.LanguageRequest, requestContext.HttpContext.User);
                _TVItemStatService = new TVItemStatService(this.LanguageRequest, requestContext.HttpContext.User);
                if (requestContext.HttpContext.User.Identity.IsAuthenticated)
                {
                    this.IsAdmin = _ContactService.IsAdministratorDB(requestContext.HttpContext.User.Identity.Name);
                    this.IsSamplingPlanner = _ContactService.IsSamplingPlannerDB(requestContext.HttpContext.User.Identity.Name);
                }
            }
            ViewBag.IsAdmin = this.IsAdmin;
            ViewBag.IsSamplingPlanner = this.IsSamplingPlanner;
            ViewBag.Debug = this.Debug;

            base.Initialize(requestContext);
        }
        #endregion Functions (protected)

        #region Functions (public)
        public virtual void SetRequestContext(RequestContext requestContext)
        {
            _RequestContext = requestContext;
            Initialize(_RequestContext);
        }

        #region Functions View
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _GetLastUpdateAndTVText(string Table, int ID, int Offset_min)
        {
            LastUpdateAndTVText lastUpdateAndTVText = _ContactService.GetLastUpdateAndDateDB(Table, ID, Offset_min);

            ViewBag.LastUpdateAndTVText = lastUpdateAndTVText;

            return PartialView();
        }

        #endregion Functions View

        #region Functions Helper public
        [NonAction]
        public List<int> ConvertToInt(List<string> stringList)
        {
            List<int> TVItemIDList = new List<int>();
            foreach (string s in stringList)
            {
                int intValue;
                int.TryParse(s, out intValue);
                TVItemIDList.Add(intValue);
            }

            return TVItemIDList;
        }
        [NonAction]
        public string CreateHashURL(int ID)
        {
            urlModel.TVTextList[1] = GetBaseTVText(ID);
            urlModel.TVItemIDList[0] = ID;

            string retStr = "#";
            for (int i = 0, count = urlModel.TVTextList.Count; i < count; i++)
            {
                retStr += urlModel.TVTextList[i];
                if (i != count - 1)
                {
                    retStr += "/";
                }
            }
            if (urlModel.TVItemIDList.Count > 0)
            {
                retStr += "|||";
                for (int i = 0, count = urlModel.TVItemIDList.Count; i < count; i++)
                {
                    retStr += urlModel.TVItemIDList[i];
                    if (i != count - 1)
                    {
                        retStr += "/";
                    }
                }
            }
            if (urlModel.VariableShow.Length > 0)
            {
                retStr += "|||" + urlModel.VariableShow.Replace(" ", "0");
            }
            return retStr;
        }
        [NonAction]
        public string CreateTempVariableShowHashURL(URLVarShowEnum urlShowVar, string value, string oldValue)
        {
            string URL = "";
            SetVariableShow(urlShowVar, value);
            URL = CreateHashURL(urlModel.TVItemIDList[0]);
            SetVariableShow(urlShowVar, oldValue);
            return URL;
        }
        [NonAction]
        public string CreateVariableShowHashURL(URLVarShowEnum urlShowVar, string value)
        {
            SetVariableShow(urlShowVar, value);
            return CreateHashURL(urlModel.TVItemIDList[0]);
        }
        [NonAction]
        public List<List<IconInfo>> FillClimateSiteIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillEmailDistributionListEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbEmailDistributionListShowHideEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillEmailDistributionListIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillEmailDistributionListEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillFileEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbFileShowHideEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbFileImportShowHide btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillFileGenerateIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbCreateDocumentShowHide btn btn-default",
                    Icon = "glyphicon glyphicon-cog",
                    ToolTip = ControllerRes.ShowGenerateReport,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillHydrometricSiteIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillHydrometricSiteEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillHydrometricSiteEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbHydrometricSiteShowEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbHydrometricSiteShowHideAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillInfrastructureBoxModelAddIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbBoxModelScenarioCreate btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.AddNewBoxModelScenario,
                });
            }
            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillInfrastructureBoxModelIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillViewTVItemInfoListWithMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconListList.Add(FillInfrastructureBoxModelAddIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillInfrastructureEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbInfrastructureEdit btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillInfrastructureInformationIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillViewTVItemInfoListWithMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillInfrastructureEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillInfrastructureVisualPlumeAddIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbVPScenarioCreate btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillInfrastructureVisualPlumeIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            // viewTVItemIconListList.Add(FillViewTVItemInfoListWithMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconListList.Add(FillInfrastructureVisualPlumeAddIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillMikeScenarioEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMikeScenarioAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillMikeScenarioImportEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Delete)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMikeScenarioDelete btn btn-default",
                    Icon = "glyphicon glyphicon-trash",
                    ToolTip = ControllerRes.Delete,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillMikeScenarioImportIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Delete)
            {
                viewTVItemIconListList.Add(FillMikeScenarioImportEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillMikeScenarioGeneralParametersEditIcons(TVAuthEnum TVAuth, MikeScenarioModel mikeScenarioModel)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                if (mikeScenarioModel.ScenarioStatus == ScenarioStatusEnum.Changed)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMikeScenarioGeneralParametersEdit btn btn-default",
                        Icon = "glyphicon glyphicon-edit",
                        ToolTip = ControllerRes.Edit,
                    });
                }
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                if (mikeScenarioModel.ScenarioStatus == ScenarioStatusEnum.Completed)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMikeScenarioCopy btn btn-default",
                        Icon = "glyphicon glyphicon-duplicate",
                        ToolTip = ControllerRes.Copy,
                    });
                }
                if (mikeScenarioModel.ScenarioStatus == ScenarioStatusEnum.Changed)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMikeScenarioAskToRun btn btn-default",
                        Icon = "glyphicon glyphicon-play",
                        ToolTip = ControllerRes.AskToRun,
                    });
                }
            }

            if (TVAuth >= TVAuthEnum.Delete)
            {
                if (mikeScenarioModel.ScenarioStatus != ScenarioStatusEnum.Running)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMikeScenarioDelete btn btn-default",
                        Icon = "glyphicon glyphicon-trash",
                        ToolTip = ControllerRes.Delete + " " + ControllerRes.MikeScenario,
                    });
                }
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillMikeScenarioGeneralParametersIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel, MikeScenarioModel mikeScenarioModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillMikeScenarioGeneralParametersEditIcons(TVAuth, mikeScenarioModel));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<List<IconInfo>> FillMikeScenarioInputSummaryIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            //if (TVAuth >= TVAuthEnum.Write)
            //{
            //    viewTVItemIconListList.Add(FillMikeScenarioInputSummaryEditIcons(TVAuth));
            //}

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillMikeScenarioSourcesEditIcons(TVAuthEnum TVAuth, MikeScenarioModel mikeScenarioModel)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (mikeScenarioModel.ScenarioStatus == ScenarioStatusEnum.Changed)
            {
                if (TVAuth >= TVAuthEnum.Create)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMikeScenarioSourceShowHideAdd btn btn-default",
                        Icon = "glyphicon glyphicon-plus",
                        ToolTip = ControllerRes.Add + " " + ControllerRes.MikeSource,
                    });
                }
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillMikeScenarioSourcesIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel, MikeScenarioModel mikeScenarioModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconListList.Add(FillMikeScenarioSourcesEditIcons(TVAuth, mikeScenarioModel));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<List<IconInfo>> FillMikeScenarioToolsIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillMikeScenarioToolsEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillMikeScenarioToolsEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMikeScenarioShowHideEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbMikeScenarioSourceEditAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillMunicipalityContactIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillMunicipalityContactEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillMunicipalityContactEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbContactShowEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbContactShowHideAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillMunicipalityEditIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbTVItemShowHideEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (tvItemModel.TVType == TVTypeEnum.Subsector)
            {
                if (TVAuth >= TVAuthEnum.Create)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = false,
                        jbClassName = "jbTVItemShowAdd btn btn-default",
                        Icon = "glyphicon glyphicon-plus",
                        ToolTip = ControllerRes.Add,
                    });
                }
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillRainExceedanceEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbRainExceedanceShowHideEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillRainExceedanceIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillRainExceedanceEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillSamplingPlanEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbSamplingPlanEditShowHide btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbSamplingPlanAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillMWQMRunEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMWQMRunShowHideEdit btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Delete)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbMWQMRunDelete btn btn-default",
                    Icon = "glyphicon glyphicon-trash",
                    ToolTip = ControllerRes.Delete,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillMWQMRunMapIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel, TVTypeEnum showType)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            string ShowMap = GetURLVarShowEnumStr(URLVarShowEnum.ShowMap);
            if (ShowMap == "0")
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"),
                    IsVisible = true,
                    jbClassName = "GlobeIcon btn btn-default",
                    Icon = "glyphicon glyphicon-globe",
                    ToolTip = ControllerRes.ShowMap,
                });
            }
            else
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"),
                    IsVisible = true,
                    jbClassName = "GlobeIcon btn btn-success",
                    Icon = "glyphicon glyphicon-globe",
                    ToolTip = ControllerRes.HideMap,
                });
                if (tvItemModel.TVType == TVTypeEnum.MWQMRun)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMWQMRunShowHideOnMap btn btn-default",
                        Icon = "glyphicon glyphicon-map-marker",
                        ToolTip = ControllerRes.MWQMRunShowOnMap,
                    });
                }
                if (showType == TVTypeEnum.MWQMRun)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMWQMSiteShowSiteText btn btn-default",
                        Icon = "glyphicon glyphicon-text-width",
                        ToolTip = ControllerRes.ShowSiteText,
                    });
                }
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMapSizeBigger btn btn-default",
                    Icon = "glyphicon glyphicon-circle-arrow-left",
                    ToolTip = ControllerRes.ShowBiggerMap,
                });
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMapSizeSmaller btn btn-default",
                    Icon = "glyphicon glyphicon-circle-arrow-right",
                    ToolTip = ControllerRes.ShowSmallerMap,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillMWQMRunIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel, TVTypeEnum showType)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillMWQMRunEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillMWQMRunMapIcons(TVAuth, tvItemModel, showType));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillMWQMSiteEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMWQMSiteEdit btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillMWQMSiteIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel, TVTypeEnum showType)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillMWQMSiteEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillMWQMSiteMapIcons(TVAuth, tvItemModel, showType));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillMWQMSiteMapIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel, TVTypeEnum showType)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            string ShowMap = GetURLVarShowEnumStr(URLVarShowEnum.ShowMap);
            if (ShowMap == "0")
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"),
                    IsVisible = true,
                    jbClassName = "GlobeIcon btn btn-default",
                    Icon = "glyphicon glyphicon-globe",
                    ToolTip = ControllerRes.ShowMap,
                });
            }
            else
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"),
                    IsVisible = true,
                    jbClassName = "GlobeIcon btn btn-success",
                    Icon = "glyphicon glyphicon-globe",
                    ToolTip = ControllerRes.HideMap,
                });
                if (tvItemModel.TVType == TVTypeEnum.MWQMSite)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMWQMSiteShowHideOnMap btn btn-default",
                        Icon = "glyphicon glyphicon-map-marker",
                        ToolTip = ControllerRes.MWQMSiteShowOnMap,
                    });
                }
                if (showType == TVTypeEnum.MWQMSite)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMWQMSiteShowSiteText btn btn-default",
                        Icon = "glyphicon glyphicon-text-width",
                        ToolTip = ControllerRes.ShowSiteText,
                    });
                }
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMapSizeBigger btn btn-default",
                    Icon = "glyphicon glyphicon-circle-arrow-left",
                    ToolTip = ControllerRes.ShowBiggerMap,
                });
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMapSizeSmaller btn btn-default",
                    Icon = "glyphicon glyphicon-circle-arrow-right",
                    ToolTip = ControllerRes.ShowSmallerMap,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillPolSourceSiteMapIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            string ShowMap = GetURLVarShowEnumStr(URLVarShowEnum.ShowMap);
            if (ShowMap == "0")
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"),
                    IsVisible = true,
                    jbClassName = "GlobeIcon btn btn-default",
                    Icon = "glyphicon glyphicon-globe",
                    ToolTip = ControllerRes.ShowMap,
                });
            }
            else
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"),
                    IsVisible = true,
                    jbClassName = "GlobeIcon btn btn-success",
                    Icon = "glyphicon glyphicon-globe",
                    ToolTip = ControllerRes.HideMap,
                });
                if (tvItemModel.TVType == TVTypeEnum.PolSourceSite)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbPolSourceSiteShowHideOnMap btn btn-default",
                        Icon = "glyphicon glyphicon-map-marker",
                        ToolTip = ControllerRes.PolSourceSiteShowOnMap,
                    });
                }
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMWQMSiteShowSiteText btn btn-default",
                    Icon = "glyphicon glyphicon-text-width",
                    ToolTip = ControllerRes.ShowSiteText,
                });
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMapSizeBigger btn btn-default",
                    Icon = "glyphicon glyphicon-circle-arrow-left",
                    ToolTip = ControllerRes.ShowBiggerMap,
                });
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMapSizeSmaller btn btn-default",
                    Icon = "glyphicon glyphicon-circle-arrow-right",
                    ToolTip = ControllerRes.ShowSmallerMap,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTideSiteIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillTideSiteEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<List<IconInfo>> FillLogBookIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillLogBookEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillLogBookEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMWQMSubsectorShowEdit btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillTideSiteEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbTideSiteShowEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbTideSiteShowHideAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<IconInfo> FillTVItemEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbTVItemShowHideEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbTVItemShowAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemFileIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillFileEditIcons(TVAuth));

                viewTVItemIconListList.Add(FillFileGenerateIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillTVItemEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillTVItemInfrastructureEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbInfrastructureShowHideEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbInfrastructureCreateShowHide btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemInfrastructuresIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillTVItemInfrastructureEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillTVItemMapIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            string ShowMap = GetURLVarShowEnumStr(URLVarShowEnum.ShowMap);
            if (ShowMap == "0")
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "1", "0"),
                    IsVisible = true,
                    jbClassName = "GlobeIcon btn btn-default",
                    Icon = "glyphicon glyphicon-globe",
                    ToolTip = ControllerRes.ShowMap,
                });
            }
            else
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMap, "0", "1"),
                    IsVisible = true,
                    jbClassName = "GlobeIcon btn btn-success",
                    Icon = "glyphicon glyphicon-globe",
                    ToolTip = ControllerRes.HideMap,
                });
                if (tvItemModel.TVType == TVTypeEnum.MWQMSite)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbMWQMSiteShowSiteText btn btn-default",
                        Icon = "glyphicon glyphicon-text-width",
                        ToolTip = ControllerRes.ShowSiteText,
                    });
                }
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMapSizeBigger btn btn-default",
                    Icon = "glyphicon glyphicon-circle-arrow-left",
                    ToolTip = ControllerRes.ShowBiggerMap,
                });
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMapSizeSmaller btn btn-default",
                    Icon = "glyphicon glyphicon-circle-arrow-right",
                    ToolTip = ControllerRes.ShowSmallerMap,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemMikeScenarioIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconListList.Add(FillMikeScenarioEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillTVItemMoreInfoIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            string ShowMoreInfo = GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo);
            if (ShowMoreInfo == "0")
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "1", "0"),
                    IsVisible = true,
                    jbClassName = "btn btn-default",
                    Icon = "glyphicon glyphicon-info-sign",
                    ToolTip = ControllerRes.ShowBasicInformation,
                });
            }
            else
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowMoreInfo, "0", "1"),
                    IsVisible = true,
                    jbClassName = "btn btn-success",
                    Icon = "glyphicon glyphicon-info-sign",
                    ToolTip = ControllerRes.ShowMoreInformation,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemMunicipalityIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillMunicipalityEditIcons(TVAuth, tvItemModel));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemOpenDataIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            //if (TVAuth >= TVAuthEnum.Write)
            //{
            //    viewTVItemIconListList.Add(FillOpenDataEditIcons(TVAuth));
            //}

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemOpenDataNationalIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            //if (TVAuth >= TVAuthEnum.Write)
            //{
            //    viewTVItemIconListList.Add(FillOpenDataEditIcons(TVAuth));
            //}

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemProvinceToolsIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            //if (TVAuth >= TVAuthEnum.Write)
            //{
            //    viewTVItemIconListList.Add(FillProvinceToolsEditIcons(TVAuth));
            //}

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemSamplingPlanIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            //viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillSamplingPlanEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillTVItemMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillTVItemMWQMRunEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMWQMRunAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemMWQMRunIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel, TVTypeEnum showType)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconListList.Add(FillTVItemMWQMRunEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillMWQMRunMapIcons(TVAuth, tvItemModel, showType));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillTVItemMWQMSiteEditIcons(TVAuthEnum TVAuth)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = true,
                    jbClassName = "jbMWQMSiteShowHideEditButtons btn btn-default",
                    Icon = "glyphicon glyphicon-edit",
                    ToolTip = ControllerRes.Edit,
                });
            }

            if (TVAuth >= TVAuthEnum.Create)
            {
                viewTVItemIconList.Add(new IconInfo()
                {
                    URL = "",
                    IsVisible = false,
                    jbClassName = "jbMWQMSiteAdd btn btn-default",
                    Icon = "glyphicon glyphicon-plus",
                    ToolTip = ControllerRes.Add,
                });
            }

            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemMWQMSiteIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel, TVTypeEnum showType)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillTVItemMWQMSiteEditIcons(TVAuth));
            }

            viewTVItemIconListList.Add(FillMWQMSiteMapIcons(TVAuth, tvItemModel, showType));

            return viewTVItemIconListList;
        }
        [NonAction]
        public List<IconInfo> FillTVItemPolSourceSiteEditIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<IconInfo> viewTVItemIconList = new List<IconInfo>();

            if (tvItemModel.TVType == TVTypeEnum.Subsector)
            {
                if (TVAuth >= TVAuthEnum.Write)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbPolSourceSiteShowHideEditButtons btn btn-default",
                        Icon = "glyphicon glyphicon-edit",
                        ToolTip = ControllerRes.Edit,
                    });
                }

                if (TVAuth >= TVAuthEnum.Create)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = false,
                        jbClassName = "jbPolSourceSiteAddShowHide btn btn-default",
                        Icon = "glyphicon glyphicon-plus",
                        ToolTip = ControllerRes.Add,
                    });
                }
            }
            else if (tvItemModel.TVType == TVTypeEnum.PolSourceSite)
            {
                if (TVAuth >= TVAuthEnum.Write)
                {
                    viewTVItemIconList.Add(new IconInfo()
                    {
                        URL = "",
                        IsVisible = true,
                        jbClassName = "jbPolSourceSiteEdit btn btn-default",
                        Icon = "glyphicon glyphicon-edit",
                        ToolTip = ControllerRes.Edit,
                    });
                }
            }
            return viewTVItemIconList;
        }
        [NonAction]
        public List<List<IconInfo>> FillTVItemPolSourceSiteIcons(TVAuthEnum TVAuth, TVItemModel tvItemModel)
        {
            List<List<IconInfo>> viewTVItemIconListList = new List<List<IconInfo>>();

            viewTVItemIconListList.Add(FillTVItemMoreInfoIcons(TVAuth));

            if (TVAuth >= TVAuthEnum.Write)
            {
                viewTVItemIconListList.Add(FillTVItemPolSourceSiteEditIcons(TVAuth, tvItemModel));
            }

            viewTVItemIconListList.Add(FillPolSourceSiteMapIcons(TVAuth, tvItemModel));

            return viewTVItemIconListList;
        }
        [NonAction]
        public string GetURLVarShowEnumStr(URLVarShowEnum urlShowVar)
        {
            return urlModel.VariableShow.Substring((int)urlShowVar, 1);
        }
        [NonAction]
        public string GetBaseTVText(int TVItemID)
        {
            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemID);
            if (!string.IsNullOrWhiteSpace(tvItemModel.Error))
                return tvItemModel.Error;

            List<TVItemModel> tvItemModelParentList = _TVItemService.GetParentTVItemModelListWithTVItemIDForLocationDB(TVItemID);
            if (tvItemModelParentList.Count != tvItemModel.TVLevel)
                return string.Format(ServiceRes.TVItemModelParentListCountShoulBe_, tvItemModel.TVLevel);

            switch (tvItemModel.TVType)
            {
                case TVTypeEnum.Area:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Province).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                case TVTypeEnum.Country:
                    return tvItemModel.TVText;
                case TVTypeEnum.Infrastructure:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Municipality).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                case TVTypeEnum.MWQMRun:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Subsector).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                case TVTypeEnum.MWQMSite:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Subsector).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                case TVTypeEnum.MikeScenario:
                    {
                        foreach (TVItemModel tvItemModelParent in tvItemModelParentList)
                        {
                            if (tvItemModelParent.TVType == TVTypeEnum.Municipality)
                            {
                                return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Municipality).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                            }
                            else if (tvItemModelParent.TVType == TVTypeEnum.Sector)
                            {
                                return tvItemModel.TVText;
                            }
                        }
                        return "EEEEEEEEEEEEE";
                    }
                case TVTypeEnum.Municipality:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Province).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                case TVTypeEnum.PolSourceSite:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Subsector).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                case TVTypeEnum.Province:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Country).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                case TVTypeEnum.Root:
                    return tvItemModel.TVText;
                case TVTypeEnum.Sector:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Area).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                case TVTypeEnum.Subsector:
                    return tvItemModelParentList.Where(c => c.TVType == TVTypeEnum.Sector).FirstOrDefault().TVText + " - " + tvItemModel.TVText;
                default:
                    return ServiceRes.Error;
            }
        }
        [NonAction]
        public TVTypeEnum GetChildLocation(TVTypeEnum TVType)
        {
            switch (TVType)
            {
                case TVTypeEnum.Area: return TVTypeEnum.Sector;
                case TVTypeEnum.Country: return TVTypeEnum.Province;
                case TVTypeEnum.Province: return TVTypeEnum.Area;
                case TVTypeEnum.Root: return TVTypeEnum.Country;
                case TVTypeEnum.Sector: return TVTypeEnum.Subsector;
                case TVTypeEnum.Subsector: return TVTypeEnum.MWQMSite;
                default: return TVTypeEnum.Root;
            }
        }
        [NonAction]
        public ContentActionAndController GetContentActionAndController(TVItemModel tvItemModelLocationCurrent, List<TabInfo> tab1ViewTVItemInfoList)
        {
            switch (tvItemModelLocationCurrent.TVType)
            {
                case TVTypeEnum.Area:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Sectors
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "1": // Area Municipalities 
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "2": // Area Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.Country:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Provinces
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "1": // Country Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            case "2": // Open Data National
                                {
                                    return new ContentActionAndController() { Action = "_OpenDataDocumentsNational", Controller = "OpenData" };
                                }
                            case "3": // EmailDistributionList
                                {
                                    return new ContentActionAndController() { Action = "_emailDistributionList", Controller = "EmailDistributionList" };
                                }
                            case "4": // RainExceedance
                                {
                                    return new ContentActionAndController() { Action = "_rainExceedance", Controller = "RainExceedance" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.Infrastructure:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Information
                                {
                                    return new ContentActionAndController() { Action = "_infrastructureInfo", Controller = "Infrastructure" };
                                }
                            case "1": // Infrastructure Box Model List
                                {
                                    return new ContentActionAndController() { Action = "_boxModelList", Controller = "BoxModel" };
                                }
                            case "2": // Infrastructure Visual Plumes List
                                {
                                    return new ContentActionAndController() { Action = "_visualPlumesList", Controller = "VisualPlumes" };
                                }
                            case "3": // Infrastructure Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.MWQMRun:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // MWQM Run Sample
                                {
                                    return new ContentActionAndController() { Action = "_mwqmRun", Controller = "MWQM" };
                                }
                            case "1": // MWQM Run Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.MWQMSite:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // MWQM Site Stat Chart and Table
                                {
                                    return new ContentActionAndController() { Action = "_mwqmSite", Controller = "MWQM" };
                                }
                            case "1": // MWQM Site Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.MikeScenario:
                    {
                        MikeScenarioService mikeScenarioService = new MikeScenarioService(_TVItemService.LanguageRequest, _TVItemService.User);

                        MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelLocationCurrent.TVItemID);
                        if (!string.IsNullOrWhiteSpace(mikeScenarioModel.Error))
                        {
                            foreach (TabInfo tabInfo in tab1ViewTVItemInfoList)
                            {
                                tabInfo.Active = "0";
                            }
                            return new ContentActionAndController() { Action = "_mikeScenario", Controller = "MikeScenario" };
                        }
                        else
                        {
                            if (mikeScenarioModel.ScenarioStatus <= ScenarioStatusEnum.Copied)
                            {
                                foreach (TabInfo tabInfo in tab1ViewTVItemInfoList)
                                {
                                    tabInfo.Active = "0";
                                }
                                return new ContentActionAndController() { Action = "_mikeScenario", Controller = "MikeScenario" };
                            }
                            else
                            {
                                switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                                {
                                    case "0": // Mike Scenario Input General Parameters
                                        {
                                            return new ContentActionAndController() { Action = "_mikeScenarioGeneralParameters", Controller = "MikeScenario" };
                                        }
                                    case "1": // Mike Scenario Input Sources
                                        {
                                            return new ContentActionAndController() { Action = "_mikeScenarioSources", Controller = "MikeScenario" };
                                        }
                                    case "2": // Mike Scenario Input Summary
                                        {
                                            return new ContentActionAndController() { Action = "_mikeScenarioInputSummary", Controller = "MikeScenario" };
                                        }
                                    case "3": // Mike Scnenario Files
                                        {
                                            return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                        }
                                    case "4": // Mike Scenario Generate Results
                                        {
                                            return new ContentActionAndController() { Action = "_mikeScenarioGenerateResults", Controller = "MikeScenario" };
                                        }
                                    default:
                                        {
                                            return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                        }
                                }
                            }
                        }
                    }
                case TVTypeEnum.Municipality:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Infrastructure List
                                {
                                    return new ContentActionAndController() { Action = "_infrastructureList", Controller = "Infrastructure" };
                                }
                            case "1": // Mike Scenarios
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "2": // Municipality Contacts
                                {
                                    return new ContentActionAndController() { Action = "_contactList", Controller = "Contact" };
                                }
                            case "3": // Municipality Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.PolSourceSite:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Pollution Source Site Information
                                {
                                    return new ContentActionAndController() { Action = "_polSourceSite", Controller = "PolSource" };
                                }
                            case "1": // Pollution Source Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.Province:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Areas
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "1": // Province Municipalities
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "2": // Province Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            case "3": // Sampling Plans
                                {
                                    return new ContentActionAndController() { Action = "_SamplingPlanByProvince", Controller = "SamplingPlan" };
                                }
                            case "4": // Open Data
                                {
                                    return new ContentActionAndController() { Action = "_OpenDataTopPage", Controller = "OpenData" };
                                }
                            case "5": // Province Tools
                                {
                                    return new ContentActionAndController() { Action = "_ProvinceToolsTopPage", Controller = "ProvinceTools" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.Root:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Countries
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "1": // Root Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            case "2": // Exports to Arc GIS
                                {
                                    return new ContentActionAndController() { Action = "_exportArcGIS", Controller = "File" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.Sector:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Subsectors
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "1": // Sector Municipalities
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "2": // Sector Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            case "3": // Mike Scenarios
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                case TVTypeEnum.Subsector:
                    {
                        switch (tab1ViewTVItemInfoList.FirstOrDefault().Active)
                        {
                            case "0": // Subsector MWQMSites
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "1": // Subsector MWQMSites Analysis
                                {
                                    return new ContentActionAndController() { Action = "_mwqmSubsectorAnalysis", Controller = "MWQM" };
                                }
                            case "2": // Subsector Runs
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "3": // Subsector Municipalities
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "4": // Subsector PolSourceSites
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                            case "5": // Subsector Files
                                {
                                    return new ContentActionAndController() { Action = "_fileList", Controller = "File" };
                                }
                            case "6": // Subsector ClimateSite
                                {
                                    return new ContentActionAndController() { Action = "_climateSiteTopPage", Controller = "ClimateSite" };
                                }
                            case "7": // Subsector HydrometricSite
                                {
                                    return new ContentActionAndController() { Action = "_hydrometricSiteList", Controller = "HydrometricSite" };
                                }
                            case "8": // Subsector TideSite
                                {
                                    return new ContentActionAndController() { Action = "_tideSiteList", Controller = "TideSite" };
                                }
                            case "9": // Subsector LogBook
                                {
                                    return new ContentActionAndController() { Action = "_mwqmSubsector", Controller = "MWQM" };
                                }
                            default:
                                {
                                    return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                                }
                        }
                    }
                default:
                    {
                        return new ContentActionAndController() { Action = "_content", Controller = "TVItem" };
                    }
            }
        }
        [NonAction]
        public List<TabInfo> GetTab1ViewTVItemInfoDB(TVItemModel tvItemModelLocationCurrent, TVAuthEnum TVAuth)
        {
            List<TabInfo> ViewTVItemInfoList = new List<TabInfo>();
            string TempVarShow = urlModel.VariableShow;
            switch (tvItemModelLocationCurrent.TVType)
            {
                case TVTypeEnum.Area:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowAreaTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowAreaTab, "0"),
                            Text = ControllerRes.Sectors,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Sector,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Sector).ChildCount,
                            viewTVItemIconListList = FillTVItemIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowAreaTab, "1"),
                            Text = ControllerRes.Municipalities,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Municipality,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Municipality).ChildCount,
                            viewTVItemIconListList = FillTVItemMunicipalityIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowAreaTab, "2"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.Country:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowCountryTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowCountryTab, "0"),
                            Text = ControllerRes.Provinces,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Province,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Province).ChildCount,
                            viewTVItemIconListList = FillTVItemIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowCountryTab, "1"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowCountryTab, "2"),
                            Text = ControllerRes.OpenDataNational,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.OpenDataNational,
                            Stat = 0,
                            viewTVItemIconListList = FillTVItemOpenDataNationalIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowCountryTab, "3"),
                            Text = ControllerRes.EmailDistributionList,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.EmailDistributionList,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.EmailDistributionList).ChildCount,
                            viewTVItemIconListList = FillEmailDistributionListIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowCountryTab, "4"),
                            Text = ControllerRes.RainExceedance,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.RainExceedance,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.RainExceedance).ChildCount,
                            viewTVItemIconListList = FillRainExceedanceIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.Infrastructure:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowInfrastructureTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowInfrastructureTab, "0"),
                            Text = ControllerRes.Information,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Infrastructure,
                            Stat = -1,
                            viewTVItemIconListList = FillInfrastructureInformationIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowInfrastructureTab, "1"),
                            Text = ControllerRes.BoxModels,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.BoxModel,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.BoxModel).ChildCount,
                            viewTVItemIconListList = FillInfrastructureBoxModelIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowInfrastructureTab, "2"),
                            Text = ControllerRes.VisualPlumes,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.VisualPlumesScenario,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.VisualPlumesScenario).ChildCount,
                            viewTVItemIconListList = FillInfrastructureVisualPlumeIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowInfrastructureTab, "3"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.MikeScenario:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowMikeScenarioTab);

                        MikeScenarioService mikeScenarioService = new MikeScenarioService(_TVItemService.LanguageRequest, _TVItemService.User);

                        MikeScenarioModel mikeScenarioModel = mikeScenarioService.GetMikeScenarioModelWithMikeScenarioTVItemIDDB(tvItemModelLocationCurrent.TVItemID);
                        if (!string.IsNullOrWhiteSpace(mikeScenarioModel.Error))
                        {
                            ViewTVItemInfoList.Add(new TabInfo()
                            {
                                URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "0"),
                                Text = ControllerRes.Import,
                                Icon = "",
                                Active = tabActive,
                                ToolTip = "",
                                Action = "_content",
                                Controller = "TVItem",
                                ShowTVType = TVTypeEnum.MikeScenario,
                                Stat = -1,
                                viewTVItemIconListList = FillMikeScenarioImportIcons(TVAuth, tvItemModelLocationCurrent),
                            });
                        }
                        else
                        {
                            if (mikeScenarioModel.ScenarioStatus <= ScenarioStatusEnum.Copied)
                            {
                                ViewTVItemInfoList.Add(new TabInfo()
                                {
                                    URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "0"),
                                    Text = ControllerRes.Import,
                                    Icon = "",
                                    Active = tabActive,
                                    ToolTip = "",
                                    Action = "_content",
                                    Controller = "TVItem",
                                    ShowTVType = TVTypeEnum.MikeScenario,
                                    Stat = -1,
                                    viewTVItemIconListList = FillMikeScenarioImportIcons(TVAuth, tvItemModelLocationCurrent),
                                });
                            }
                            else
                            {
                                ViewTVItemInfoList.Add(new TabInfo()
                                {
                                    URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "0"),
                                    Text = ControllerRes.GeneralParameters,
                                    Icon = "",
                                    Active = tabActive,
                                    ToolTip = "",
                                    Action = "_content",
                                    Controller = "TVItem",
                                    ShowTVType = TVTypeEnum.MikeScenario,
                                    Stat = -1,
                                    viewTVItemIconListList = FillMikeScenarioGeneralParametersIcons(TVAuth, tvItemModelLocationCurrent, mikeScenarioModel),
                                });
                                ViewTVItemInfoList.Add(new TabInfo()
                                {
                                    URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "1"),
                                    Text = ControllerRes.Sources,
                                    Icon = "",
                                    Active = tabActive,
                                    ToolTip = "",
                                    Action = "_content",
                                    Controller = "TVItem",
                                    ShowTVType = TVTypeEnum.MikeScenario,
                                    Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.MikeSource).ChildCount,
                                    viewTVItemIconListList = FillMikeScenarioSourcesIcons(TVAuth, tvItemModelLocationCurrent, mikeScenarioModel),
                                });
                                ViewTVItemInfoList.Add(new TabInfo()
                                {
                                    URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "2"),
                                    Text = ControllerRes.InputSummary,
                                    Icon = "",
                                    Active = tabActive,
                                    ToolTip = "",
                                    Action = "_content",
                                    Controller = "TVItem",
                                    ShowTVType = TVTypeEnum.MikeScenario,
                                    Stat = -1,
                                    viewTVItemIconListList = FillMikeScenarioInputSummaryIcons(TVAuth, tvItemModelLocationCurrent),
                                });
                                ViewTVItemInfoList.Add(new TabInfo()
                                {
                                    URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "3"),
                                    Text = ControllerRes.Files,
                                    Icon = "",
                                    Active = tabActive,
                                    ToolTip = "",
                                    Action = "_content",
                                    Controller = "TVItem",
                                    ShowTVType = TVTypeEnum.File,
                                    Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                                    Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                                    viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                                });
                                ViewTVItemInfoList.Add(new TabInfo()
                                {
                                    URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMikeScenarioTab, "4"),
                                    Text = ControllerRes.GenerateResults,
                                    Icon = "",
                                    Active = tabActive,
                                    ToolTip = "",
                                    Action = "_content",
                                    Controller = "TVItem",
                                    ShowTVType = TVTypeEnum.MikeScenario,
                                    Stat = -1,
                                    viewTVItemIconListList = FillMikeScenarioToolsIcons(TVAuth, tvItemModelLocationCurrent),
                                });
                            }
                        }
                    }
                    break;
                case TVTypeEnum.Municipality:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowMunicipalityTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMunicipalityTab, "0"),
                            Text = ControllerRes.Infrastructures,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Infrastructure,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Infrastructure).ChildCount,
                            viewTVItemIconListList = FillTVItemInfrastructuresIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMunicipalityTab, "1"),
                            Text = ControllerRes.MikeScenarios,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.MikeScenario,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.MikeScenario).ChildCount,
                            viewTVItemIconListList = FillTVItemMikeScenarioIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMunicipalityTab, "2"),
                            Text = ControllerRes.Contacts,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Contact,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Contact).ChildCount,
                            viewTVItemIconListList = FillMunicipalityContactIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMunicipalityTab, "3"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.MWQMRun:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowMWQMRunsTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMWQMRunsTab, "0"),
                            Text = ControllerRes.Information,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.MWQMRun,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.MWQMSiteSample).ChildCount,
                            viewTVItemIconListList = FillMWQMRunIcons(TVAuth, tvItemModelLocationCurrent, TVTypeEnum.MWQMRun),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMWQMRunsTab, "1"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.MWQMSite:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowMWQMSitesTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMWQMSitesTab, "0"),
                            Text = ControllerRes.Information,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.MWQMSite,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.MWQMSiteSample).ChildCount,
                            viewTVItemIconListList = FillMWQMSiteIcons(TVAuth, tvItemModelLocationCurrent, TVTypeEnum.MWQMSite),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowMWQMSitesTab, "1"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.PolSourceSite:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowPolSourceSiteTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowPolSourceSiteTab, "0"),
                            Text = ControllerRes.Information,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.PolSourceSite,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.PolSourceSite).ChildCount,
                            viewTVItemIconListList = FillTVItemPolSourceSiteIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowPolSourceSiteTab, "1"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.Province:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowProvinceTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "0"),
                            Text = ControllerRes.Areas,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Area,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Area).ChildCount,
                            viewTVItemIconListList = FillTVItemIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "1"),
                            Text = ControllerRes.Municipalities,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Municipality,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Municipality).ChildCount,
                            viewTVItemIconListList = FillTVItemMunicipalityIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "2"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "3"),
                            Text = ControllerRes.SamplingPlan,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.SamplingPlan,
                            Stat = 0,
                            viewTVItemIconListList = FillTVItemSamplingPlanIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "4"),
                            Text = ControllerRes.OpenData,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.OpenData,
                            Stat = 0,
                            viewTVItemIconListList = FillTVItemOpenDataIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowProvinceTab, "5"),
                            Text = ControllerRes.ProvinceTools,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.ProvinceTools,
                            Stat = 0,
                            viewTVItemIconListList = FillTVItemProvinceToolsIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.Root:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowRootTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowRootTab, "0"),
                            Text = ControllerRes.Countries,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Country,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Country).ChildCount,
                            viewTVItemIconListList = FillTVItemIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowRootTab, "1"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowRootTab, "2"),
                            Text = ControllerRes.ExportArcGIS,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_exportArcGIS",
                            Controller = "File",
                            ShowTVType = TVTypeEnum.File,
                            Stat = 0,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.Sector:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowSectorTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSectorTab, "0"),
                            Text = ControllerRes.Subsectors,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Subsector,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Subsector).ChildCount,
                            viewTVItemIconListList = FillTVItemIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSectorTab, "1"),
                            Text = ControllerRes.Municipalities,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Municipality,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Municipality).ChildCount,
                            viewTVItemIconListList = FillTVItemMunicipalityIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSectorTab, "2"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSectorTab, "3"),
                            Text = ControllerRes.MikeScenarios,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.MikeScenario,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.MikeScenario).ChildCount,
                            viewTVItemIconListList = FillTVItemMikeScenarioIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                case TVTypeEnum.Subsector:
                    {
                        string tabActive = GetURLVarShowEnumStr(URLVarShowEnum.ShowSubsectorTab);
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "0"),
                            Text = ControllerRes.MWQMSites,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.MWQMSite,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.MWQMSite).ChildCount,
                            viewTVItemIconListList = FillTVItemMWQMSiteIcons(TVAuth, tvItemModelLocationCurrent, TVTypeEnum.MWQMSite),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "1"),
                            Text = ControllerRes.Analysis,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_mwqmSubsectorAnalysis",
                            Controller = "MWQM",
                            ShowTVType = TVTypeEnum.MWQMSite,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.MWQMSite).ChildCount,
                            viewTVItemIconListList = FillTVItemMWQMSiteIcons(TVAuth, tvItemModelLocationCurrent, TVTypeEnum.MWQMSite),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "2"),
                            Text = ControllerRes.MWQMRuns,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.MWQMRun,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.MWQMRun).ChildCount,
                            viewTVItemIconListList = FillTVItemMWQMRunIcons(TVAuth, tvItemModelLocationCurrent, TVTypeEnum.MWQMRun),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "3"),
                            Text = ControllerRes.PolSourceSites,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.PolSourceSite,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.PolSourceSite).ChildCount,
                            viewTVItemIconListList = FillTVItemPolSourceSiteIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "4"),
                            Text = ControllerRes.Municipalities,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.Municipality,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.Municipality).ChildCount,
                            viewTVItemIconListList = FillTVItemMunicipalityIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "5"),
                            Text = ControllerRes.Files,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.File,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.File).ChildCount,
                            Stat2 = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TotalFile).ChildCount,
                            viewTVItemIconListList = FillTVItemFileIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "6"),
                            Text = ControllerRes.ClimateSites,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.ClimateSite,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.ClimateSite).ChildCount,
                            viewTVItemIconListList = FillClimateSiteIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "7"),
                            Text = ControllerRes.HydrometricSites,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.HydrometricSite,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.HydrometricSite).ChildCount,
                            viewTVItemIconListList = FillHydrometricSiteIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "8"),
                            Text = ControllerRes.TideSites,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.TideSite,
                            Stat = _TVItemStatService.GetTVItemStatModelWithTVItemIDAndTVTypeDB(tvItemModelLocationCurrent.TVItemID, TVTypeEnum.TideSite).ChildCount,
                            viewTVItemIconListList = FillTideSiteIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                        ViewTVItemInfoList.Add(new TabInfo()
                        {
                            URL = CreateVariableShowHashURL(URLVarShowEnum.ShowSubsectorTab, "9"),
                            Text = ControllerRes.LogBook,
                            Icon = "",
                            Active = tabActive,
                            ToolTip = "",
                            Action = "_content",
                            Controller = "TVItem",
                            ShowTVType = TVTypeEnum.MWQMSite,
                            Stat = 0,
                            viewTVItemIconListList = FillLogBookIcons(TVAuth, tvItemModelLocationCurrent),
                        });
                    }
                    break;
                default:
                    break;
            }

            urlModel.VariableShow = TempVarShow;
            return ViewTVItemInfoList;
        }
        [NonAction]
        public string ReplaceNonDigitsAndSpaceBy0(string TempStr)
        {
            if (string.IsNullOrEmpty(TempStr))
                return "";

            TempStr = TempStr.Replace(" ", "0");
            for (int i = 0, count = TempStr.Length; i < count; i++)
            {
                if (TempStr[i] < "0".ToCharArray()[0] || TempStr[i] > "9".ToCharArray()[0])
                {
                    if (i == 0)
                    {
                        TempStr = "0" + TempStr.Substring(i + 1);
                    }
                    else
                    {
                        TempStr = TempStr.Substring(0, i) + "0" + TempStr.Substring(i + 1);
                    }
                }
            }

            return TempStr;
        }
        [NonAction]
        public void SetArgs(string Q)
        {
            urlModel.Error = "";
            urlModel.Q = Q;
            urlModel.TVTextList = new List<string>() { "!Home", ServiceRes.AllLocations };
            urlModel.TVItemIDList = new List<int>() { 1 };
            urlModel.VariableShow = "30" + new String("0".ToCharArray()[0], 30).ToString();

            List<string> URLParts = Q.Split(new string[] { "|||" }, StringSplitOptions.None).ToList<string>();
            if (URLParts.Count > 0)
            {
                List<string> TVTextList2 = URLParts[0].Split("/".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList<string>();
                if (TVTextList2.Count > 0)
                {
                    urlModel.TVTextList[0] = TVTextList2[0];
                }
                if (TVTextList2.Count > 1)
                {
                    urlModel.TVTextList[1] = TVTextList2[1];
                }
                if (URLParts.Count > 1)
                {
                    List<int> TVItemIDList2 = ConvertToInt(URLParts[1].Split("/".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList<string>());
                    if (TVItemIDList2.Count > 0)
                    {
                        urlModel.TVItemIDList[0] = TVItemIDList2[0];
                    }
                    if (URLParts.Count > 2)
                    {
                        int VarShowLength = urlModel.VariableShow.Length;
                        string TempShow = URLParts[2];
                        if (TempShow.Length < VarShowLength)
                        {
                            TempShow = TempShow + urlModel.VariableShow.Substring(URLParts[2].Length);
                        }
                        urlModel.VariableShow = ReplaceNonDigitsAndSpaceBy0(TempShow);
                    }
                }
            }
        }
        [NonAction]
        public void SetVariableShow(URLVarShowEnum urlShowVar, string value)
        {
            urlModel.VariableShow = urlModel.VariableShow.Remove((int)urlShowVar, 1);
            urlModel.VariableShow = urlModel.VariableShow.Insert((int)urlShowVar, value);
            urlModel.VariableShow = urlModel.VariableShow.Replace(" ", "0");
        }
        [NonAction]
        public string GetParameters(string Parameter, List<string> ParamValueList)
        {
            foreach (string pv in ParamValueList)
            {
                List<string> ParamValue = pv.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();
                if (ParamValue.Count != 2)
                {
                    return "";
                }
                if (Parameter == ParamValue[0])
                {
                    return ParamValue[1];
                }
            }

            return "";
        }

        #endregion Functions Helper public

        #endregion Functions (public)
    }
}
