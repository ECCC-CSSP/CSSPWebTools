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
using System.IO;

namespace CSSPWebTools.Controllers
{
    public class ChartController : BaseController
    {
        #region Variables
        //public List<string> ChartTypeList = new List<string>()
        //{ "Area", "Bar", "BoxPlot", "Bubble", "Candlestick", "Column", "Doughnut", "ErrorBar", "FastLine", "FastPoint", "Funnel",
        //    "Kagi", "Line", "Pie", "Point", "PointAndFigure", "Polar", "Pyramid", "Radar", "Range", "RangeBar", "RangeColumn", "Renko",
        //    "Spline", "SplineArea", "SplineRange", "StackedArea", "StackedArea100", "StackedBar", "StackedBar100", "StackedColumn",
        //    "StackedColumn100", "StepLine", "Stock", "ThreeLineBreak",
        //};
        #endregion Variables

        #region Properties
        public TVFileService _TVFileService { get; private set; }
        public ChartController _ChartController { get; private set; }

        #endregion Properties

        #region Constructors
        public ChartController()
        {
            _ChartController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _TVFileService = new TVFileService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult SummaryStatisticsOfFCUsedRuns(string Years)
        {
            List<int> YearList = Years.Split("_".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).Select(c => int.Parse(c)).ToList();

            List<int> YearDistinct = YearList.Distinct().ToList();
            List<int> CountPerYear = new List<int>();
            foreach (int Year in YearDistinct)
            {
                CountPerYear.Add(YearList.Where(c => c == Year).Count());
            }

            var chart = new Chart(width: 600, height: 100)
                .SetXAxis(ControllerRes.YearsWithSamplesUsed, 1980)
                .AddSeries(chartType: "Column",
                            xValue: YearDistinct,
                            yValues: CountPerYear)
                            .GetBytes("png");

            return File(chart, "image/bytes");
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult GetImageAsFile(int TVFileTVItemID)
        {
            TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);

            FileInfo fi = new FileInfo(tvFileModel.ServerFilePath + tvFileModel.ServerFileName);

            return File(fi.FullName, "image/bytes");
        }
        #endregion Functions public
    }
}
