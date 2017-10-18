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
using CSSPEnumsDLL.Services;
using System.Web.Helpers;

namespace CSSPWebTools.Controllers
{
    public class ReportTypeController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public ReportTypeService _ReportTypeService { get; private set; }
        public ReportTypeLanguageService _ReportTypeLanguageService { get; private set; }
        public ReportTypeController _ReportTypeController { get; private set; }
        public TVFileService _TVFileService { get; private set; }
        public BaseEnumService _BaseEnumService { get; set; }
        #endregion Properties

        #region Constructors
        public ReportTypeController()
        {
            _ReportTypeController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _ReportTypeService = new ReportTypeService(LanguageRequest, User);
            _ReportTypeLanguageService = new ReportTypeLanguageService(LanguageRequest, User);
            _TVFileService = new TVFileService(LanguageRequest, User);
            _BaseEnumService = new BaseEnumService(LanguageRequest);
        }
        #endregion Overrides

        #region Functions public

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _reportTypeAllEdit()
        {
            ViewBag.ReportTypeController = _ReportTypeController;
            ViewBag.ReportTypeModelList = null;
            ViewBag.TVTypeEnumTextOrderedList = null;
            ViewBag.FileTypeEnumTextOrderedList = null;

            List<ReportTypeModel> reportTypeModelList = _ReportTypeService.GetReportTypeModelListAllDB();

            ViewBag.ReportTypeModelList = reportTypeModelList;

            List<TVTypeEnumTextOrdered> tvTypeEnumTextOrderedList = GetReportTypesAvailable();
            ViewBag.TVTypeEnumTextOrderedList = tvTypeEnumTextOrderedList;

            List<FileTypeEnumTextOrdered> fileTypeEnumTextOrderedList = GetFileTypesAvailable();
            ViewBag.FileTypeEnumTextOrderedList = fileTypeEnumTextOrderedList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _reportTypeEdit(int ReportTypeID, int TVItemID)
        {
            ViewBag.ReportTypeController = _ReportTypeController;
            ViewBag.TVItemID = TVItemID;
            ViewBag.ReportTypeModel = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _reportTypeList(int TVType, int TVItemID)
        {
            ViewBag.ReportTypeController = _ReportTypeController;
            ViewBag.ReportTypeModelList = null;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVType = (TVTypeEnum)TVType;

            List<ReportTypeModel> reportTypeModelList = _ReportTypeService.GetReportTypeModelListWithTVTypeDB((TVTypeEnum)TVType);
            ViewBag.ReportTypeModelList = reportTypeModelList;

            return PartialView();
        }


        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportTypeAddOrModifyJSON(FormCollection fc)
        {
            ReportTypeModel reportTypeModel = _ReportTypeService.PostAddOrModifyReportTypeDB(fc);

            return Json(reportTypeModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportTypeDeleteJSON(int ReportTypeID)
        {
            ReportTypeModel reportTypeModel = _ReportTypeService.PostDeleteReportTypeWithReportTypeIDDB(ReportTypeID);

            return Json(reportTypeModel, JsonRequestBehavior.AllowGet);
        }


        #endregion Functions public

        private List<TVTypeEnumTextOrdered> GetReportTypesAvailable()
        {
            List<TVTypeEnumTextOrdered> tvTypeEnumTextOrderedListAll = _BaseEnumService.GetTVTypeEnumTextOrderedList();
            List<TVTypeEnumTextOrdered> tvTypeEnumTextOrderedListAvailable = new List<TVTypeEnumTextOrdered>()
            {
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.Root },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.Country },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.Province },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.Area },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.Sector },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.Subsector },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.Municipality },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.Infrastructure },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.BoxModel },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.VisualPlumesScenario },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.MikeScenario },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.MikeSource },
                new TVTypeEnumTextOrdered() { TVType = TVTypeEnum.PolSourceSite },
            };

            return (from c in tvTypeEnumTextOrderedListAll
                    from c2 in tvTypeEnumTextOrderedListAvailable
                    where c.TVType == c2.TVType
                    select c).ToList();
        }
        private List<FileTypeEnumTextOrdered> GetFileTypesAvailable()
        {
            List<FileTypeEnumTextOrdered> fileTypeEnumTextOrderedListAll = _BaseEnumService.GetFileTypeEnumTextOrderedList();
            List<FileTypeEnumTextOrdered> fileTypeEnumTextOrderedListAvailable = new List<FileTypeEnumTextOrdered>()
            {
                new FileTypeEnumTextOrdered() { FileType = FileTypeEnum.DOCX },
                new FileTypeEnumTextOrdered() { FileType = FileTypeEnum.XLSX },
                new FileTypeEnumTextOrdered() { FileType = FileTypeEnum.KMZ },
            };

            return (from c in fileTypeEnumTextOrderedListAll
                    from c2 in fileTypeEnumTextOrderedListAvailable
                    where c.FileType == c2.FileType
                    select c).ToList();
        }
    }
}
