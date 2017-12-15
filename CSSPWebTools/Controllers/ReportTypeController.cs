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
        public ReportSectionService _ReportSectionService { get; private set; }
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
            _ReportSectionService = new ReportSectionService(LanguageRequest, User);
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
        public PartialViewResult _reportTypeList(int TVType)
        {
            ViewBag.ReportTypeController = _ReportTypeController;
            ViewBag.ReportTypeModelList = null;
            ViewBag.TVType = (TVTypeEnum)TVType;

            List<ReportTypeModel> reportTypeModelList = _ReportTypeService.GetReportTypeModelListWithTVTypeDB((TVTypeEnum)TVType);
            ViewBag.ReportTypeModelList = reportTypeModelList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _reportSectionList(int ReportTypeID)
        {
            ViewBag.ReportTypeController = _ReportTypeController;
            ViewBag.ReportTypeModel = null;
            ViewBag.ReportSectionYearList = null;
            ViewBag.ReportSectionModelList = null;

            ReportTypeModel reportTypeModel = _ReportTypeService.GetReportTypeModelWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportTypeModel = reportTypeModel;

            List<int?> reportSectionYearList = _ReportSectionService.GetReportSectionYearListWithReportTypeIDDB(ReportTypeID);
            ViewBag.ReportSectionYearList = reportSectionYearList;

            List<ReportSectionModel> reportSectionModelList = _ReportSectionService.GetReportSectionModelListWithReportTypeIDAndTVItemIDNoReportSectionTextDB(ReportTypeID, null);
            ViewBag.ReportSectionModelList = reportSectionModelList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _reportSectionForm(int ReportSectionID, int TVItemID)
        {
            ViewBag.ReportSectionModelList = null;

            List<ReportSectionModel> reportSectionModelList = new List<ReportSectionModel>();
            ReportSectionModel reportSectionModel = _ReportSectionService.GetReportSectionModelWithReportSectionIDDB(ReportSectionID);

            reportSectionModelList.Add(reportSectionModel);

            List<ReportSectionModel> reportSectionModelLinkList = _ReportSectionService.GetReportSectionModelListWithReportSectionIDTemplateLinkAndTVItemIDForAllYearsDB(ReportSectionID, TVItemID);

            foreach (ReportSectionModel reportSectionModelLink in reportSectionModelLinkList)
            {
                reportSectionModelList.Add(reportSectionModelLink);
            }

            ViewBag.ReportSectionModelList = reportSectionModelList;

            return PartialView();
        }


        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionAddChildJSON(int ReportSectionID)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionAddChildDB(ReportSectionID);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionAddNewYearForTVItemIDJSON(int ReportSectionID, int TVItemID, int Year)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionAddNewYearForTVItemIDDB(ReportSectionID, TVItemID, Year);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionAddSiblingJSON(int ReportSectionID)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionAddSiblingDB(ReportSectionID);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionAddTopJSON(int ReportTypeID)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionAddTopDB(ReportTypeID);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionChangeIsStaticJSON(int ReportSectionID, bool IsStatic)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionChangeIsStaticDB(ReportSectionID, IsStatic);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionChangeLockedJSON(int ReportTypeID, bool Locked)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionChangeLockedDB(ReportTypeID, Locked);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionConvertToParentJSON(int ReportSectionID)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionConvertToParentDB(ReportSectionID);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionConvertToSubSectionJSON(int ReportSectionID)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionConvertToSubSectionDB(ReportSectionID);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionDeleteJSON(int ReportSectionID)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostDeleteReportSectionWithReportSectionIDDB(ReportSectionID);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(false)]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionNameModifyJSON(FormCollection fc)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionNameModifyDB(fc);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(false)]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionTextModifyJSON(FormCollection fc)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionTextModifyDB(fc);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionOrdinalDownJSON(int ReportSectionID)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionOrdinalDownDB(ReportSectionID);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportSectionOrdinalUpJSON(int ReportSectionID)
        {
            ReportSectionModel reportSectionModel = _ReportSectionService.PostReportSectionOrdinalUpDB(ReportSectionID);

            return Json(reportSectionModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportTypeAddOrModifyJSON(FormCollection fc)
        {
            ReportTypeModel reportTypeModel = _ReportTypeService.PostAddOrModifyReportTypeDB(fc);

            return Json(reportTypeModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ReportTypeDeleteJSON(int ReportTypeID)
        {
            ReportTypeModel reportTypeModel = _ReportTypeService.PostDeleteReportTypeWithReportTypeIDDB(ReportTypeID);

            return Json(reportTypeModel.Error, JsonRequestBehavior.AllowGet);
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
