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
using CSSPEnumsDLL.Services;
using System.Web.Helpers;

namespace CSSPWebTools.Controllers
{
    public class DocumentController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public DocumentController _DocumentController { get; private set; }
        public TVFileService _TVFileService { get; private set; }
        public ReportTypeService _ReportTypeService { get; private set; }
        public BaseEnumService _BaseEnumService { get; set; }
        #endregion Properties

        #region Constructors
        public DocumentController()
        {
            _DocumentController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _TVFileService = new TVFileService(LanguageRequest, User);
            _ReportTypeService = new ReportTypeService(LanguageRequest, User);
            _BaseEnumService = new BaseEnumService(LanguageRequest);
        }
        #endregion Overrides

        #region Functions public
        #region Functions Root public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateRootDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateRootKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateRootXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions Root public
  
        #region Functions Area public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateAreaDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateAreaKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateAreaXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions Area public

        #region Functions Country public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateCountryDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateCountryKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateCountryXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions Country public

        #region Functions Infrastructure public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateInfrastructureDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateInfrastructureKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateInfrastructureXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions Infrastructure public

        #region Functions MikeScenario public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMikeScenarioDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMikeScenarioKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMikeScenarioXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions MikeScenario public

        #region Functions MikeSource public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMikeSourceDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMikeSourceKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMikeSourceXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions MikeSource public

        #region Functions Municipality public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMunicipalityDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMunicipalityKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMunicipalityXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions Municipality public

        #region Functions MWQMSite public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMWQMSiteDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMWQMSiteKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMWQMSiteXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions MWQMSite public

        #region Functions PolSourceSite public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGeneratePolSourceSiteDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGeneratePolSourceSiteKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGeneratePolSourceSiteXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions PolSourceSite public

        #region Functions Province public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateProvinceDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateProvinceKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateProvinceXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions Province public

        #region Functions Sector public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateSectorDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateSectorKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateSectorXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions Sector public

        #region Functions Subsector public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateSubsectorDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateSubsectorKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateSubsectorXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions Subsector public

        #region Functions BoxModel public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateBoxModelDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateBoxModelKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateBoxModelXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions BoxModel public

        #region Functions VisualPlumesScenario public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateVisualPlumesScenarioDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateVisualPlumesScenarioKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateVisualPlumesScenarioXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions VisualPlumesScenario public

        #region Functions MWQMRun public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMWQMRunDocx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMWQMRunKMZ(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.ShowSomething = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                //string ShowSomething = GetParameters("SomeParameter", ParamValueList);
                //ViewBag.ShowSomething = ShowSomething;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateMWQMRunXlsx(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;
            ViewBag.HideTable = null;
            ViewBag.HideGraphic = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            if (TVFileTVItemID != 0)
            {
                TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
                ViewBag.TVFileModel = tvFileModel;

                string Parameters = tvFileModel.Parameters;
                List<string> ParamValueList = Parameters.Split("|||".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).ToList();

                string HideTable = GetParameters("HideTable", ParamValueList);
                ViewBag.HideTable = HideTable;
                string HideGraphic = GetParameters("HideGraphic", ParamValueList);
                ViewBag.HideGraphic = HideGraphic;
            }

            return PartialView();
        }
        #endregion Functions MWQMRun public

        #region Functions other public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentGenerateNotImplemented(int ReportTypeID, int FileType, int TVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.FileType = (FileTypeEnum)FileType;
            ViewBag.TVItemID = TVItemID;
            ViewBag.ReportTypeModel = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentList(int ReportTypeID, int TVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileModelList = null;

            List<TVFileModel> tvFileModelList = _TVFileService.GetTVFileModelListWithReportTypeIDAndTVItemIDDB(ReportTypeID, TVItemID);
            ViewBag.TVFileModelList = tvFileModelList;

            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _documentParameters(int ReportTypeID, int TVItemID, int TVFileTVItemID)
        {
            ViewBag.DocumentController = _DocumentController;
            ViewBag.ReportTypeID = ReportTypeID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVFileTVItemID = TVFileTVItemID;
            ViewBag.ReportTypeModel = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            return PartialView();
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        [ValidateAntiForgeryToken]
        public JsonResult DocumentGenerateJSON(FormCollection fc)
        {
            ViewBag.DocumentController = _DocumentController;

            string ret = _TVFileService.CreateDocumentFromParametersDB(fc);

            return Json(ret, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions other public
        #endregion Functions public
    }
}
