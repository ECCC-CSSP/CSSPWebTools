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
using System.Web.Helpers;

namespace CSSPWebTools.Controllers
{
    public class ChartController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public BoxModelService _BoxModelService { get; private set; }
        public BoxModelResultService _BoxModelResultService { get; private set; }
        public ChartController _ChartController { get; private set; }
        public List<string> ChartTypeList = new List<string>()
        {
"Area",
"Bar",
"BoxPlot",
"Bubble",
"Candlestick",
"Column",
"Doughnut",
"ErrorBar",
"FastLine",
"FastPoint",
"Funnel",
"Kagi",
"Line",
"Pie",
"Point",
"PointAndFigure",
"Polar",
"Pyramid",
"Radar",
"Range",
"RangeBar",
"RangeColumn",
"Renko",
"Spline",
"SplineArea",
"SplineRange",
"StackedArea",
"StackedArea100",
"StackedBar",
"StackedBar100",
"StackedColumn",
"StackedColumn100",
"StepLine",
"Stock",
"ThreeLineBreak",
        };
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
            _BoxModelService = new BoxModelService(LanguageRequest, User);
            _BoxModelResultService = new BoxModelResultService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult CreateBar(string ChartType)
        {
            var chart = new Chart(width: 600, height: 400).AddTitle("Bonjour")
                .AddLegend("allo", "testing")
                .SetXAxis("X axis title", -10, 200)
                .SetYAxis("Y axis title", -30, 300)
                .AddSeries(chartType: ChartType,
                            xValue: new[] { "10 ", "50", "30 ", "70" },
                            yValues: new[] { "50", "70", "90", "110" })
                            .GetBytes("png");
            return File(chart, "image/bytes");
        }

        #endregion Functions public
    }
}
