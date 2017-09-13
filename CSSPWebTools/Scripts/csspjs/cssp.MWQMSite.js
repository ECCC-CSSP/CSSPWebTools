var CSSP;
(function (CSSP) {
    var MWQMSite = (function () {
        // Constructors
        function MWQMSite() {
            var _this = this;
            // variables
            this.MWQMSiteByDate = true;
            this.IsLog = false;
            this.ChartHeight = 200;
            this.ChartWidth = 600;
            this.CurrentMovingAverage = 30;
            this.CurrentShowStartYear = 1980;
            this.AllRainChecked = false;
            this.RainMissingText = "";
            // for subsector analysis
            this.mwqmSubsectorAnalysisModel = null;
            this.MWQMRun$ = null; // $("#AnalysisTable").find("td.MWQMRun")
            this.MWQMRainDay$ = [];
            this.MWQMStartTide$ = null; // $("#AnalysisTable").find("td.StartTide")
            this.MWQMEndTide$ = null; // $("#AnalysisTable").find("td.EndTide")
            this.MWQMSite$ = null; // $("#AnalysisTable").find("td.MWQMSite")
            this.MWQMSiteActive$ = null; // $("#AnalysisTable").find("td.MWQMSite").filter("[data-isactive='True']");
            this.MWQMSamplesCount$ = null; // $("#AnalysisTable").find("td.SamplesCount")
            this.MWQMPeriod$ = null; // $("#AnalysisTable").find("td.Period")
            this.MWQMMinFC$ = null; // $("#AnalysisTable").find("td.MinFC")
            this.MWQMMaxFC$ = null; // $("#AnalysisTable").find("td.MaxFC")
            this.MWQMGMean$ = null; // $("#AnalysisTable").find("td.GMean")
            this.MWQMMedian$ = null; // $("#AnalysisTable").find("td.Median")
            this.MWQMP90$ = null; // $("#AnalysisTable").find("td.P90")
            this.MWQMPercOver43$ = null; // $("#AnalysisTable").find("td.PercOver43")
            this.MWQMPercOver260$ = null; // $("#AnalysisTable").find("td.PercOver260")
            this.MWQMColorAndLetter$ = null; // $("#AnalysisTable").find("td.ColorAndLetter")
            this.MWQMSampleList$ = []; // loop $("#AnalysisTable").find("td.MWQMSample[data-sitecount='" + i + "']")
            // Functions
            this.AfterLoadUpdate = function (objName) {
                var objNameList = ["MWQMSiteData", "MWQMSiteCharts", "MWQMSiteOtherMWQMSites"];
                for (var i = 0, count = objNameList.length; i < count; i++) {
                    var $obj = $(".jb" + objNameList[i] + "Load");
                    if ($obj.hasClass("btn-success")) {
                        $obj.removeClass("btn-success").addClass("btn-default");
                    }
                    var $objID = $("#" + objNameList[i] + "ID");
                    if (!$objID.hasClass("hidden")) {
                        $objID.addClass("hidden");
                    }
                }
                for (var i = 0, count = objNameList.length; i < count; i++) {
                    if (objName == objNameList[i]) {
                        var $obj = $(".jb" + objName + "Load");
                        $obj.removeClass("btn-default").addClass("btn-success");
                        var $objID = $("#" + objNameList[i] + "ID");
                        $objID.removeClass("hidden");
                    }
                }
                if ("MWQMSiteCharts" == objName) {
                    $("select[name='MWQMSiteStartYear']").val(cssp.MWQMSite.CurrentShowStartYear.toString());
                    $("select[name='MovingAverage']").val(cssp.MWQMSite.CurrentMovingAverage.toString());
                    $("select[name='MWQMSiteStartYear']").off("change");
                    $("select[name='MWQMSiteStartYear']").on("change", function () {
                        cssp.MWQMSite.CurrentShowStartYear = parseInt($("select[name='MWQMSiteStartYear']").val());
                        cssp.MWQMSite.DrawCharts();
                    });
                    $("select[name='MovingAverage']").off("change");
                    $("select[name='MovingAverage']").on("change", function () {
                        cssp.MWQMSite.CurrentMovingAverage = parseInt($("select[name='MovingAverage']").val());
                        cssp.MWQMSite.LoadData();
                    });
                    $("#MWQMSiteChartProp").find("input[name='MWQMSiteByDate']").off("change");
                    $("#MWQMSiteChartProp").find("input[name='MWQMSiteByDate']").on("change", function (evt) {
                        if ($(evt.target).val() == "1") {
                            cssp.MWQMSite.MWQMSiteByDate = true;
                        }
                        else {
                            cssp.MWQMSite.MWQMSiteByDate = false;
                        }
                        cssp.MWQMSite.DrawCharts();
                    });
                    $("#MWQMSiteChartProp").find("input[name='MWQMSiteLog']").off("change");
                    $("#MWQMSiteChartProp").find("input[name='MWQMSiteLog']").on("change", function (evt) {
                        if ($(evt.target).val() == "1") {
                            cssp.MWQMSite.IsLog = true;
                        }
                        else {
                            cssp.MWQMSite.IsLog = false;
                        }
                        cssp.MWQMSite.DrawCharts();
                    });
                    setTimeout(function () {
                        cssp.MWQMSite.MWQMShowHideOnMap(true);
                        if ("MWQMSiteCharts" == objName) {
                            cssp.MWQMSite.ChartWidth = $("#MWQMCharts").width();
                            cssp.MWQMSite.DrawCharts();
                        }
                    }, 1000);
                }
                else if ("MWQMSiteData" == objName) {
                    $("#MWQMSiteDataID").find("input").off("change");
                    $("#MWQMSiteDataID").find("input").on("change", function () {
                        var ColArr = [0, 1, 2];
                        $("#MWQMSiteDataID").find("input").each(function (ind, elem) {
                            if ($(elem).is(":checked") == true) {
                                ColArr.push(parseInt($(elem).data("colnumb")));
                            }
                        });
                        cssp.MWQMSite.TableView.setColumns(ColArr);
                        cssp.MWQMSite.chartTable.draw(cssp.MWQMSite.TableView, {
                            showRowNumber: true,
                            allowHtml: true
                        });
                    });
                }
            };
            this.ChartBiggerHeight = function () {
                cssp.MWQMSite.ChartHeight = cssp.MWQMSite.ChartHeight + 100;
                cssp.MWQMSite.DrawCharts();
            };
            this.ChartSmallerHeight = function () {
                cssp.MWQMSite.ChartHeight = cssp.MWQMSite.ChartHeight - 100;
                if (cssp.MWQMSite.ChartHeight < 200) {
                    cssp.MWQMSite.ChartHeight = 200;
                }
                cssp.MWQMSite.DrawCharts();
            };
            this.ChartBiggerWidth = function () {
                cssp.MWQMSite.ChartWidth = cssp.MWQMSite.ChartWidth + 100;
                cssp.MWQMSite.DrawCharts();
            };
            this.ChartSmallerWidth = function () {
                cssp.MWQMSite.ChartWidth = cssp.MWQMSite.ChartWidth - 100;
                if (cssp.MWQMSite.ChartWidth < 400) {
                    cssp.MWQMSite.ChartWidth = 400;
                }
                cssp.MWQMSite.DrawCharts();
            };
            this.DrawCharts = function () {
                var tdataFC = new google.visualization.DataTable();
                var tdataSalTemp = new google.visualization.DataTable();
                var tdataStat = new google.visualization.DataTable();
                var SampleDate = cssp.GetHTMLVariable("#MWQMSiteVariables", "varSampleDate");
                var NumberOfSample = cssp.GetHTMLVariable("#MWQMSiteVariables", "varNumberOfSample");
                var hAxisTitle = SampleDate;
                if (!cssp.MWQMSite.MWQMSiteByDate) {
                    hAxisTitle = NumberOfSample;
                }
                // Stat
                tdataStat.addColumn("date", SampleDate);
                tdataStat.addColumn("number", NumberOfSample);
                var Depth = cssp.GetHTMLVariable("#MWQMSiteVariables", "varDepth");
                var FC = cssp.GetHTMLVariable("#MWQMSiteVariables", "varFC");
                var GM = cssp.GetHTMLVariable("#MWQMSiteVariables", "varGM");
                var Med = cssp.GetHTMLVariable("#MWQMSiteVariables", "varMed");
                var pH = cssp.GetHTMLVariable("#MWQMSiteVariables", "varpH");
                var Sal = cssp.GetHTMLVariable("#MWQMSiteVariables", "varSal");
                var Temp = cssp.GetHTMLVariable("#MWQMSiteVariables", "varTemp");
                tdataStat.addColumn("number", $("<span>" + GM + " &le; 14</span>").html());
                tdataStat.addColumn("number", $("<span>" + Med + " &le; 14</span>").html());
                tdataStat.addColumn("number", $("<span>P90 &le; 43</span>").html());
                tdataStat.addColumn("number", ">43 " + $("<span> &le; 10%</span>").html());
                tdataStat.addColumn("number", "" + GM + " > 14");
                tdataStat.addColumn("number", "" + Med + " > 14");
                tdataStat.addColumn("number", "P90 > 43");
                tdataStat.addColumn("number", ">43 > 10%");
                // FC
                tdataFC.addColumn("date", SampleDate);
                tdataFC.addColumn("number", NumberOfSample);
                tdataFC.addColumn("number", cssp.GetHTMLVariable("#MWQMSiteVariables", "varFecalColiformsLessOrEqualThan14"));
                tdataFC.addColumn("number", cssp.GetHTMLVariable("#MWQMSiteVariables", "varFecalColiformsMoreThan14"));
                // Sal and Temp
                tdataSalTemp.addColumn("date", SampleDate);
                tdataSalTemp.addColumn("number", NumberOfSample);
                tdataSalTemp.addColumn("number", cssp.GetHTMLVariable("#MWQMSiteVariables", "varSalinityPPT"));
                tdataSalTemp.addColumn("number", cssp.GetHTMLVariable("#MWQMSiteVariables", "varTemperatureC"));
                var GeoMeanOver = false;
                var MedianOver = false;
                var P90Over43 = false;
                var P90Over260 = false;
                var PercOver43Over = false;
                var PercOver260Over = false;
                for (var i = 0; i < cssp.MWQMSite.data.length; i++) {
                    // Stat
                    tdataStat.addRow([new Date(parseInt(cssp.MWQMSite.data[i].SampleDate.substr(6))),
                        (i + 1),
                        (cssp.MWQMSite.data[i].GeoMean > 14 ? (!GeoMeanOver ? cssp.MWQMSite.data[i].GeoMean : null) : cssp.MWQMSite.data[i].GeoMean),
                        (cssp.MWQMSite.data[i].Median > 14 ? (!MedianOver ? cssp.MWQMSite.data[i].Median : null) : cssp.MWQMSite.data[i].Median),
                        (cssp.MWQMSite.data[i].P90 > 43 ? (!P90Over43 ? cssp.MWQMSite.data[i].P90 : null) : cssp.MWQMSite.data[i].P90),
                        (cssp.MWQMSite.data[i].PercOver43 > 10 ? (!PercOver43Over ? cssp.MWQMSite.data[i].PercOver43 : null) : cssp.MWQMSite.data[i].PercOver43),
                        (cssp.MWQMSite.data[i].GeoMean <= 14 ? (GeoMeanOver ? cssp.MWQMSite.data[i].GeoMean : null) : cssp.MWQMSite.data[i].GeoMean),
                        (cssp.MWQMSite.data[i].Median <= 14 ? (MedianOver ? cssp.MWQMSite.data[i].Median : null) : cssp.MWQMSite.data[i].Median),
                        (cssp.MWQMSite.data[i].P90 <= 43 ? (P90Over43 ? cssp.MWQMSite.data[i].P90 : null) : cssp.MWQMSite.data[i].P90),
                        (cssp.MWQMSite.data[i].PercOver43 <= 10 ? (PercOver43Over ? cssp.MWQMSite.data[i].PercOver43 : null) : cssp.MWQMSite.data[i].PercOver43)]);
                    // FC
                    tdataFC.addRow([new Date(parseInt(cssp.MWQMSite.data[i].SampleDate.substr(6))),
                        (i + 1),
                        (cssp.MWQMSite.data[i].FC > 14 ? null : cssp.MWQMSite.data[i].FC),
                        (cssp.MWQMSite.data[i].FC <= 14 ? null : cssp.MWQMSite.data[i].FC)]);
                    // Sal and Temp
                    tdataSalTemp.addRow([new Date(parseInt(cssp.MWQMSite.data[i].SampleDate.substr(6))),
                        (i + 1),
                        cssp.MWQMSite.data[i].Sal,
                        cssp.MWQMSite.data[i].Temp]);
                    if (cssp.MWQMSite.data[i].GeoMean > 14) {
                        GeoMeanOver = true;
                    }
                    else {
                        GeoMeanOver = false;
                    }
                    if (cssp.MWQMSite.data[i].Median > 14) {
                        MedianOver = true;
                    }
                    else {
                        MedianOver = false;
                    }
                    if (cssp.MWQMSite.data[i].P90 > 43) {
                        P90Over43 = true;
                    }
                    else {
                        P90Over43 = false;
                    }
                    if (cssp.MWQMSite.data[i].P90 > 260) {
                        P90Over260 = true;
                    }
                    else {
                        P90Over260 = false;
                    }
                    if (cssp.MWQMSite.data[i].PercOver43 > 10) {
                        PercOver43Over = true;
                    }
                    else {
                        PercOver43Over = false;
                    }
                    if (cssp.MWQMSite.data[i].PercOver260 > 10) {
                        PercOver260Over = true;
                    }
                    else {
                        PercOver260Over = false;
                    }
                }
                // Stat
                cssp.MWQMSite.StatView = new google.visualization.DataView(tdataStat);
                if (cssp.MWQMSite.MWQMSiteByDate) {
                    cssp.MWQMSite.StatView.hideColumns([1]);
                }
                else {
                    cssp.MWQMSite.StatView.hideColumns([0]);
                }
                var ShowChartFromYear = parseInt($("select[name='MWQMSiteStartYear']").val());
                cssp.MWQMSite.StatView.setRows(tdataStat.getFilteredRows([{ column: 0, minValue: new Date(ShowChartFromYear, 0, 1) }]));
                var chartAvg = new google.visualization.LineChart($('#MWQMSiteChartStatID')[0]);
                chartAvg.draw(cssp.MWQMSite.StatView, {
                    hAxis: { title: hAxisTitle, titleTextStyle: { bold: false, italic: false } },
                    vAxis: { logScale: cssp.MWQMSite.IsLog },
                    pointSize: 4,
                    legend: { position: 'top', maxLines: 2 },
                    colors: ['#008000', '#6B8E23', '#32CD32', '#ADFF2F', "#8B0000", "#DC143C", "#FF4500", '#FF8C00'],
                    width: cssp.MWQMSite.ChartWidth,
                    height: cssp.MWQMSite.ChartHeight,
                });
                google.visualization.events.addListener(chartAvg, "select", function () {
                    if (cssp.MWQMSite.MWQMSiteByDate) {
                        var RunDate = cssp.MWQMSite.StatView.getValue(chartAvg.getSelection()[0].row, 0);
                        cssp.MWQMSite.GetMWQMRunTVItemIDWithDate(RunDate);
                    }
                });
                // FC 
                cssp.MWQMSite.FCView = new google.visualization.DataView(tdataFC);
                if (cssp.MWQMSite.MWQMSiteByDate) {
                    cssp.MWQMSite.FCView.hideColumns([1]);
                }
                else {
                    cssp.MWQMSite.FCView.hideColumns([0]);
                }
                _this.FCView.setRows(tdataFC.getFilteredRows([{ column: 0, minValue: new Date(ShowChartFromYear, 0, 1) }]));
                var chartFC = new google.visualization.ScatterChart($('#MWQMSiteChartFCID')[0]);
                chartFC.draw(cssp.MWQMSite.FCView, {
                    hAxis: { title: hAxisTitle, titleTextStyle: { bold: false, italic: false } },
                    vAxis: { logScale: cssp.MWQMSite.IsLog },
                    pointSize: 4,
                    legend: { position: 'top' },
                    colors: ['#00ff00', "#ff0000"],
                    width: cssp.MWQMSite.ChartWidth,
                    height: cssp.MWQMSite.ChartHeight,
                });
                google.visualization.events.addListener(chartFC, "select", function () {
                    if (cssp.MWQMSite.MWQMSiteByDate) {
                        var RunDate = cssp.MWQMSite.FCView.getValue(chartFC.getSelection()[0].row, 0);
                        cssp.MWQMSite.GetMWQMRunTVItemIDWithDate(RunDate);
                    }
                });
                // Sal and Temp
                cssp.MWQMSite.SalTempView = new google.visualization.DataView(tdataSalTemp);
                if (cssp.MWQMSite.MWQMSiteByDate) {
                    cssp.MWQMSite.SalTempView.hideColumns([1]);
                }
                else {
                    cssp.MWQMSite.SalTempView.hideColumns([0]);
                }
                cssp.MWQMSite.SalTempView.setRows(tdataSalTemp.getFilteredRows([{ column: 0, minValue: new Date(ShowChartFromYear, 0, 1) }]));
                var chartSalTemp = new google.visualization.ScatterChart($('#MWQMSiteChartSalTempID')[0]);
                chartSalTemp.draw(cssp.MWQMSite.SalTempView, {
                    hAxis: { title: hAxisTitle, titleTextStyle: { bold: false, italic: false } },
                    vAxis: { logScale: cssp.MWQMSite.IsLog },
                    pointSize: 4,
                    legend: { position: 'top' },
                    colors: ['#008080', '#8B008B'],
                    width: cssp.MWQMSite.ChartWidth,
                    height: cssp.MWQMSite.ChartHeight,
                });
                google.visualization.events.addListener(chartSalTemp, "select", function () {
                    if (cssp.MWQMSite.MWQMSiteByDate) {
                        var RunDate = cssp.MWQMSite.SalTempView.getValue(chartSalTemp.getSelection()[0].row, 0);
                        cssp.MWQMSite.GetMWQMRunTVItemIDWithDate(RunDate);
                    }
                });
            };
            this.DrawTable = function () {
                var tdataTable = new google.visualization.DataTable();
                var SampleDate = cssp.GetHTMLVariable("#MWQMSiteVariables", "varSampleDate");
                var NumberOfSample = cssp.GetHTMLVariable("#MWQMSiteVariables", "varNumberOfSample");
                var hAxisTitle = SampleDate;
                if (!cssp.MWQMSite.MWQMSiteByDate) {
                    hAxisTitle = NumberOfSample;
                }
                var Depth = cssp.GetHTMLVariable("#MWQMSiteVariables", "varDepth");
                var FC = cssp.GetHTMLVariable("#MWQMSiteVariables", "varFC");
                var GM = cssp.GetHTMLVariable("#MWQMSiteVariables", "varGM");
                var Med = cssp.GetHTMLVariable("#MWQMSiteVariables", "varMed");
                var pH = cssp.GetHTMLVariable("#MWQMSiteVariables", "varpH");
                var Sal = cssp.GetHTMLVariable("#MWQMSiteVariables", "varSal");
                var Temp = cssp.GetHTMLVariable("#MWQMSiteVariables", "varTemp");
                // Table
                tdataTable.addColumn("number", "#");
                tdataTable.addColumn("date", SampleDate);
                tdataTable.addColumn("number", FC);
                tdataTable.addColumn("number", Sal);
                tdataTable.addColumn("number", Temp);
                tdataTable.addColumn("number", pH);
                tdataTable.addColumn("number", Depth);
                tdataTable.addColumn("number", "<span title='" + cssp.GetHTMLVariable("#MWQMSiteVariables", "varGeometricMean") + "'>" + GM + "</span>");
                tdataTable.addColumn("number", Med);
                tdataTable.addColumn("number", "P90");
                tdataTable.addColumn("number", ">43 (%)");
                tdataTable.addColumn("number", ">260 (%)");
                var GeoMeanOver = false;
                var MedianOver = false;
                var P90Over43 = false;
                var P90Over260 = false;
                var PercOver43Over = false;
                var PercOver260Over = false;
                for (var i = 0; i < cssp.MWQMSite.data.length; i++) {
                    // Table
                    var CurrDate = new Date(parseInt(cssp.MWQMSite.data[i].SampleDate.substr(6)));
                    var Year = CurrDate.getFullYear();
                    var Month = CurrDate.getMonth() + 1;
                    var Day = CurrDate.getDate();
                    var TVPath = $("#MWQMSiteDiv").first().find(".jbTVItemDiv").first().find(".jbTVPath").first().text();
                    var TVPathParent = TVPath.substr(0, TVPath.lastIndexOf("p"));
                    var style = "";
                    if (cssp.MWQMSite.data[i].FC > 499) {
                        style = "style='color:red; font-weight:700; border:1px solid red;'";
                    }
                    else if (cssp.MWQMSite.data[i].FC > 259) {
                        style = "style='color:red; text-decoration:underline; font-weight:700;'";
                    }
                    else if (cssp.MWQMSite.data[i].FC > 43) {
                        style = "style='color:red; font-weight:700;'";
                    }
                    tdataTable.addRow([
                        (i + 1),
                        {
                            v: CurrDate, f: "<span style=\"color:blue; text-decoration:underline;\">" + Globalize.format(CurrDate, "yyyy MM dd", Globalize.culture.name.substr(0, 2)) + "</span>"
                        },
                        {
                            v: cssp.MWQMSite.data[i].FC, f: "<span " + style + ">" + (cssp.MWQMSite.data[i].FC == null ? "" : (cssp.MWQMSite.data[i].FC < 2.0 ? "<2" : cssp.MWQMSite.data[i].FC.toString())) + "</span>",
                        },
                        cssp.MWQMSite.data[i].Sal,
                        cssp.MWQMSite.data[i].Temp,
                        cssp.MWQMSite.data[i].PH,
                        cssp.MWQMSite.data[i].Depth,
                        { v: cssp.MWQMSite.data[i].GeoMean, f: (cssp.MWQMSite.data[i].GeoMean > 14 ? (cssp.MWQMSite.data[i].GeoMean > 88 ? "<span style='color:purple'>" : "<span style='color:red'>") + (cssp.MWQMSite.data[i].GeoMean == null ? "" : (cssp.MWQMSite.data[i].GeoMean < 2.0 ? "<2" : Globalize.format(cssp.MWQMSite.data[i].GeoMean, "n0"))) + "</span>" : (cssp.MWQMSite.data[i].GeoMean == null ? "" : (cssp.MWQMSite.data[i].GeoMean < 2.0 ? "<2" : Globalize.format(cssp.MWQMSite.data[i].GeoMean, "n0")))) },
                        { v: cssp.MWQMSite.data[i].Median, f: (cssp.MWQMSite.data[i].Median > 14 ? (cssp.MWQMSite.data[i].Median > 88 ? "<span style='color:purple'>" : "<span style='color:red'>") + (cssp.MWQMSite.data[i].Median == null ? "" : (cssp.MWQMSite.data[i].Median < 2.0 ? "<2" : Globalize.format(cssp.MWQMSite.data[i].Median, "n0"))) + "</span>" : (cssp.MWQMSite.data[i].Median == null ? "" : (cssp.MWQMSite.data[i].Median < 2.0 ? "<2" : Globalize.format(cssp.MWQMSite.data[i].Median, "n0")))) },
                        { v: cssp.MWQMSite.data[i].P90, f: (cssp.MWQMSite.data[i].P90 > 43 ? (cssp.MWQMSite.data[i].P90 > 260 ? "<span style='color:purple'>" : "<span style='color:red'>") + (cssp.MWQMSite.data[i].P90 == null ? "" : Globalize.format(cssp.MWQMSite.data[i].P90, "n0")) + "</span>" : (cssp.MWQMSite.data[i].P90 == null ? "" : Globalize.format(cssp.MWQMSite.data[i].P90, "n0"))) },
                        { v: cssp.MWQMSite.data[i].PercOver43, f: (cssp.MWQMSite.data[i].PercOver43 > 10 ? "<span style='color:red'>" + (cssp.MWQMSite.data[i].PercOver43 == null ? "" : Globalize.format(cssp.MWQMSite.data[i].PercOver43, "n1")) + "</span>" : (cssp.MWQMSite.data[i].PercOver43 == null ? "" : Globalize.format(cssp.MWQMSite.data[i].PercOver43, "n1"))) },
                        { v: cssp.MWQMSite.data[i].PercOver260, f: (cssp.MWQMSite.data[i].PercOver260 > 10 ? "<span style='color:purple'>" + (cssp.MWQMSite.data[i].PercOver260 == null ? "" : Globalize.format(cssp.MWQMSite.data[i].PercOver260, "n1")) + "</span>" : (cssp.MWQMSite.data[i].PercOver260 == null ? "" : Globalize.format(cssp.MWQMSite.data[i].PercOver260, "n1"))) },
                    ]);
                    if (cssp.MWQMSite.data[i].GeoMean > 14) {
                        GeoMeanOver = true;
                    }
                    else {
                        GeoMeanOver = false;
                    }
                    if (cssp.MWQMSite.data[i].Median > 14) {
                        MedianOver = true;
                    }
                    else {
                        MedianOver = false;
                    }
                    if (cssp.MWQMSite.data[i].P90 > 43) {
                        P90Over43 = true;
                    }
                    else {
                        P90Over43 = false;
                    }
                    if (cssp.MWQMSite.data[i].P90 > 260) {
                        P90Over260 = true;
                    }
                    else {
                        P90Over260 = false;
                    }
                    if (cssp.MWQMSite.data[i].PercOver43 > 10) {
                        PercOver43Over = true;
                    }
                    else {
                        PercOver43Over = false;
                    }
                    if (cssp.MWQMSite.data[i].PercOver260 > 10) {
                        PercOver260Over = true;
                    }
                    else {
                        PercOver260Over = false;
                    }
                }
                tdataTable.sort([{ column: 0, desc: true }]);
                // Table
                cssp.MWQMSite.TableView = new google.visualization.DataView(tdataTable);
                var chartTable = new google.visualization.Table($('#MWQMSiteTableDataID')[0]);
                chartTable.draw(cssp.MWQMSite.TableView, {
                    showRowNumber: false,
                    allowHtml: true,
                });
                cssp.MWQMSite.chartTable = chartTable;
                google.visualization.events.addListener(chartTable, "select", function () {
                    var RunDate = cssp.MWQMSite.TableView.getValue(chartTable.getSelection()[0].row, 1);
                    cssp.MWQMSite.GetMWQMRunTVItemIDWithDate(RunDate);
                });
            };
            this.GetMWQMRunTVItemIDWithDate = function (RunDate) {
                var MWQMSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var Year = RunDate.getFullYear();
                var Month = RunDate.getMonth() + 1;
                var Day = RunDate.getDate();
                var command = "MWQM/GetMWQMRunTVItemIDWithMWQMSiteTVItemIDAndRunDateJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMSiteTVItemID: MWQMSiteTVItemID,
                    Year: Year,
                    Month: Month,
                    Day: Day,
                }).done(function (ret) {
                    if (ret) {
                        var MWQMTVItemID = parseInt(ret);
                        if (MWQMTVItemID != 0) {
                            document.location.href = document.location.href.replace(cssp.Variables.TVItemIDList[0].toString(), MWQMTVItemID.toString());
                        }
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.Init = function (MWQMSiteTVItemID) {
                cssp.MWQMSite.LoadData(MWQMSiteTVItemID);
            };
            this.InitEdit = function () {
                $("#MWQMSiteAddOrModifyForm").each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            SubsectorTVItemID: {
                                required: true,
                            },
                            MWQMSiteTVItemID: {
                                required: true,
                            },
                            MWQMSiteTVText: {
                                required: true,
                                minlength: 3,
                                maxlength: 200,
                            },
                            MWQMSiteNumber: {
                                required: true,
                                minlength: 1,
                                maxlength: 8,
                            },
                            MWQMSiteDescription: {
                                maxlength: 200,
                            },
                            Lat: {
                                required: true,
                                number: true,
                                min: -90,
                                max: 90,
                            },
                            Lng: {
                                required: true,
                                number: true,
                                min: -180,
                                max: 180,
                            },
                        }
                    });
                });
            };
            this.InitOtherMWQMSites = function () {
                if ($(".GlobeIcon").hasClass("btn-success")) {
                    $(".jbMapShowItem").removeClass("hidden");
                }
                else {
                    $(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                }
            };
            this.LoadData = function () {
                var MWQMSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var MovingAverage = parseInt($("a.numberofsample").data("numberofsample"));
                var command = "MWQM/MWQMSiteSampleMovingAverageStatJSON";
                $.get(cssp.BaseURL + command, {
                    MWQMSiteTVItemID: MWQMSiteTVItemID,
                    MovingAverage: MovingAverage,
                }).done(function (ret) {
                    cssp.MWQMSite.data = ret;
                    cssp.MWQMSite.LoadMWQMSiteTable();
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.LoadOtherMWQMSites = function () {
                if ($("#MWQMSiteOtherMWQMSitesID").children().length == 0) {
                    var MWQMSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var command = "MWQM/_otherMWQMSites";
                    $.get(cssp.BaseURL + command, {
                        Q: "!View/" + cssp.Variables.URL,
                    }).done(function (ret) {
                        $("#MWQMSiteOtherMWQMSitesID").html(ret);
                        cssp.MWQMSite.AfterLoadUpdate("MWQMSiteOtherMWQMSites");
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    cssp.MWQMSite.AfterLoadUpdate("MWQMSiteOtherMWQMSites");
                }
            };
            this.LoadMWQMSiteTable = function () {
                if ($("#MWQMSiteDataID").children().length == 0) {
                    var MWQMSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var command = "MWQM/_mwqmSiteTable";
                    $.get(cssp.BaseURL + command, {
                        MWQMSiteTVItemID: MWQMSiteTVItemID,
                    }).done(function (ret) {
                        $("#MWQMSiteDataID").html(ret);
                        cssp.MWQMSite.AfterLoadUpdate("MWQMSiteData");
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    cssp.MWQMSite.AfterLoadUpdate("MWQMSiteData");
                }
            };
            this.LoadMWQMSiteCharts = function () {
                if ($("#MWQMSiteChartsID").children().length == 0) {
                    var MWQMSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var command = "MWQM/_mwqmSiteCharts";
                    $.get(cssp.BaseURL + command, {
                        MWQMSiteTVItemID: MWQMSiteTVItemID,
                    }).done(function (ret) {
                        $("#MWQMSiteChartsID").html(ret);
                        cssp.MWQMSite.AfterLoadUpdate("MWQMSiteCharts");
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    cssp.MWQMSite.AfterLoadUpdate("MWQMSiteCharts");
                }
            };
            this.MWQMShowHideOnMap = function (Show) {
                if ($(".jbMWQMSiteShowHideOnMap").hasClass("btn-default")) {
                    var TVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    if (TVItemID != 0) {
                        cssp.GoogleMap.DrawCross(TVItemID);
                        $(".jbMWQMSiteShowHideOnMap").removeClass("btn-default").addClass("btn-success");
                    }
                }
                else {
                    cssp.GoogleMap.DrawCross(-1);
                    $(".jbMWQMSiteShowHideOnMap").removeClass("btn-success").addClass("btn-default");
                    if (Show) {
                        cssp.MWQMSite.MWQMShowHideOnMap(true);
                    }
                }
            };
            this.MWQMSiteEdit = function ($bjs) {
                if ($(".jbMWQMSiteEdit").hasClass("btn-default")) {
                    $("#MWQMSiteAddOrModifyDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    $(".jbMWQMSiteEdit").removeClass("btn-default").addClass("btn-success");
                    var SubsectorTVItemID = parseInt($("#MWQMSiteDiv").data("subsectortvitemid"));
                    var MWQMSiteTVItemID = parseInt($("#MWQMSiteDiv").data("mwqmsitetvitemid"));
                    var command = "MWQM/_mwqmSiteAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        SubsectorTVItemID: SubsectorTVItemID,
                        MWQMSiteTVItemID: MWQMSiteTVItemID,
                    })
                        .done(function (ret) {
                        $("#MWQMSiteAddOrModifyDiv").html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $(".jbMWQMSiteEdit").removeClass("btn-success").addClass("btn-default");
                    $("#MWQMSiteAddOrModifyDiv").html("");
                }
            };
            this.MWQMSiteEditSave = function ($bjs) {
                var $form = $bjs.closest("#MWQMSiteAddOrModifyForm");
                if ($form.length === 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#MWQMSiteAddOrModifyForm", "MWQMSiteTopEditDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    if (cssp.CheckInputWithNumbers()) {
                        cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                        return;
                    }
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.MWQMSiteInfoShowHide = function ($ajs) {
                if ($ajs.closest("li").find(".MWQMSiteDiv").children().length > 0) {
                    $ajs.closest("li").find(".MWQMSiteDiv").html("");
                    $ajs.removeClass("btn-success").addClass("btn-default");
                }
                else {
                    $(".MWQMSiteDiv").html("");
                    var MWQMSiteTVItemID = parseInt($ajs.closest("li").data("tvitemid"));
                    var command = "MWQM/_mwqmSite";
                    $.get(cssp.BaseURL + command, {
                        MWQMSiteTVItemID: MWQMSiteTVItemID,
                    }).done(function (ret) {
                        $ajs.closest("li").find(".MWQMSiteDiv").html(ret);
                        $ajs.removeClass("btn-default").addClass("btn-success");
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.MWQMSiteAddOrModifyShowHide = function ($bjs) {
                var SubsectorTVItemID = 0;
                var MWQMSiteTVItemID = 0;
                var ShouldOpen = $bjs.hasClass("btn-default");
                var $tabContent = $bjs.closest(".tab-content");
                $tabContent.find(".TVItemAdd").html("");
                $tabContent.find(".TVItemModify").html("");
                $(".jbMWQMSiteAdd").removeClass("btn-success").addClass("btn-default");
                $(".jbMWQMSiteModifyShowHide").removeClass("btn-success").addClass("btn-default");
                var $TVItemEdit = $tabContent.find(".TVItemAdd");
                var $ViewDiv = $bjs.closest("#ViewDiv");
                if ($ViewDiv) {
                    SubsectorTVItemID = $ViewDiv.data("tvitemid");
                }
                var $ParentLi = $bjs.closest("li");
                if (!$bjs.hasClass("jbMWQMSiteAdd")) {
                    if ($ParentLi.length > 0) {
                        MWQMSiteTVItemID = parseInt($ParentLi.data("tvitemid"));
                        $TVItemEdit = $ParentLi.find(".TVItemModify");
                    }
                }
                if (ShouldOpen) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var command = "MWQM/_mwqmSiteAddOrModify";
                    $TVItemEdit.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    $.get(cssp.BaseURL + command, {
                        SubsectorTVItemID: SubsectorTVItemID,
                        MWQMSiteTVItemID: MWQMSiteTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $TVItemEdit.html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $TVItemEdit.html("");
                }
            };
            this.MWQMSubsectorAnalysisBeforeRecalculation = function () {
                window.setTimeout(function () {
                    if ($(".jbMWQMSubsectorAnalysisShowHideRunsNotUsed").hasClass("btn-success")) {
                        cssp.MWQMSite.MWQMSubsectorAnalysisShowHideRunsNotUsed($(".jbMWQMSubsectorAnalysisShowHideRunsNotUsed"));
                    }
                    cssp.MWQMSite.MWQMSubsectorAnalysisLoadVariables();
                    cssp.MWQMSite.MWQMSubsectorAnalysisRecalculate();
                }, 10);
            };
            this.MWQMSubsectorAnalysisRemoveFromStat = function ($bjs) {
                var runcount = parseInt($bjs.closest("td").data("runcount"));
                if ($bjs.hasClass("btn-danger")) {
                    cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[runcount].RemoveFromStat = false;
                    $bjs.removeClass("btn-danger").addClass("btn-success");
                }
                else {
                    cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[runcount].RemoveFromStat = true;
                    $bjs.removeClass("btn-success").removeClass("btn-info").addClass("btn-danger");
                }
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            };
            this.MWQMSubsectorAnalysisInit = function () {
                cssp.MWQMSite.mwqmSubsectorAnalysisModel = null;
                cssp.MWQMSite.MWQMRun$ = null;
                cssp.MWQMSite.MWQMRainDay$ = [];
                cssp.MWQMSite.MWQMStartTide$ = null;
                cssp.MWQMSite.MWQMEndTide$ = null;
                cssp.MWQMSite.MWQMSite$ = null;
                cssp.MWQMSite.MWQMSiteActive$ = null;
                cssp.MWQMSite.MWQMSamplesCount$ = null;
                cssp.MWQMSite.MWQMPeriod$ = null;
                cssp.MWQMSite.MWQMMinFC$ = null;
                cssp.MWQMSite.MWQMMaxFC$ = null;
                cssp.MWQMSite.MWQMGMean$ = null;
                cssp.MWQMSite.MWQMMedian$ = null;
                cssp.MWQMSite.MWQMP90$ = null;
                cssp.MWQMSite.MWQMPercOver43$ = null;
                cssp.MWQMSite.MWQMPercOver260$ = null;
                cssp.MWQMSite.MWQMColorAndLetter$ = null;
                cssp.MWQMSite.MWQMSampleList$ = [];
                cssp.MWQMSite.AllRainChecked = false;
                cssp.MWQMSite.RainMissingText = "";
                $(document).off("change", "select.MWQMSubsectorAnalysisStartDate");
                $(document).on("change", "select.MWQMSubsectorAnalysisStartDate", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("change", "select.MWQMSubsectorAnalysisEndDate");
                $(document).on("change", "select.MWQMSubsectorAnalysisEndDate", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("change", "select.MWQMSubsectorAnalysisRuns");
                $(document).on("change", "select.MWQMSubsectorAnalysisRuns", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("change", "select.MWQMSubsectorAnalysisCalculateType");
                $(document).on("change", "select.MWQMSubsectorAnalysisCalculateType", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                // to be removed in the future
                $(document).off("change", "input.SelectFullYear");
                $(document).on("change", "input.SelectFullYear", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("change", "select.MWQMSubsectorAnalysisHighlightSalinityDeviationFromAverage");
                $(document).on("change", "select.MWQMSubsectorAnalysisHighlightSalinityDeviationFromAverage", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("change", "input.MWQMAnalysisTableDataType");
                $(document).on("change", "input.MWQMAnalysisTableDataType", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisShowUpdateTable();
                });
                $(document).off("click", "input[name='ShortRange']");
                $(document).on("click", "input[name='ShortRange']", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisShortRangeChanged();
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("click", "input[name='MidRange']");
                $(document).on("click", "input[name='MidRange']", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisMidRangeChanged();
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("change", "select.MWQMAnalysisUpperRainLimitStillConsideredDry");
                $(document).on("change", "select.MWQMAnalysisUpperRainLimitStillConsideredDry", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("change", "select.MWQMAnalysisLowerRainLimitConsideredRain");
                $(document).on("change", "select.MWQMAnalysisLowerRainLimitConsideredRain", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                $(document).off("change", "select.MWQMSubsectorAnalysisCalculateType");
                $(document).on("change", "select.MWQMSubsectorAnalysisCalculateType", function (evt) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
                });
                var NeedRecal$ = $("#MWQMSubsectorAnalysisDiv").find(".NeedRecal");
                NeedRecal$.text(NeedRecal$.data("needrecalculation"));
                $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport").text("");
                window.setTimeout(function () {
                    cssp.MWQMSite.MWQMSubsectorAnalysisFillJQueryVariables();
                    cssp.MWQMSite.MWQMSubsectorAnalysisLoadVariables();
                    cssp.MWQMSite.MWQMSubsectorAnalysisRecalculate();
                    cssp.MWQMSite.MWQMSubsectorAnalysisShortRangeChanged();
                    cssp.MWQMSite.MWQMSubsectorAnalysisMidRangeChanged();
                }, 100);
            };
            this.MWQMSubsectorAnalysisShortRangeChanged = function () {
                var ShortRangeEnd = parseInt($("input[name='ShortRange']:checked").val());
                var MidRangeStart = parseInt($("input[name='MidRange']:checked").val());
                $("span.MidRangeStart").text(ShortRangeEnd - 1);
                $("input[name='MidRange']").each(function (ind, elem) {
                    var li$ = $(elem).closest("li");
                    var liValue = parseInt(li$.data("value"));
                    if (liValue > (ShortRangeEnd - 1)) {
                        li$.removeClass("hidden").addClass("hidden");
                    }
                    else {
                        li$.removeClass("hidden");
                    }
                });
                for (var i = 1; i < 11; i++) {
                    cssp.MWQMSite.MWQMRainDay$[i].removeClass("rainRange");
                }
                $(".RainDay" + (ShortRangeEnd * -1).toString()).removeClass("rainRange").addClass("rainRange");
                if (ShortRangeEnd <= MidRangeStart) {
                    $("input.MidRange" + ((ShortRangeEnd - 1) * -1).toString() + "").trigger("click");
                    $(".RainDay" + ((ShortRangeEnd - 1) * -1).toString()).removeClass("rainRange").addClass("rainRange");
                }
                else {
                    $(".RainDay" + ((MidRangeStart) * -1).toString()).removeClass("rainRange").addClass("rainRange");
                }
            };
            this.MWQMSubsectorAnalysisMidRangeChanged = function () {
                var ShortRangeEnd = parseInt($("input[name='ShortRange']:checked").val());
                var MidRangeStart = parseInt($("input[name='MidRange']:checked").val());
                if (ShortRangeEnd > -2) {
                    cssp.MWQMSite.MWQMRainDay$[2].removeClass("rainRange");
                }
                if (ShortRangeEnd > -3) {
                    cssp.MWQMSite.MWQMRainDay$[3].removeClass("rainRange");
                }
                if (ShortRangeEnd > -4) {
                    cssp.MWQMSite.MWQMRainDay$[4].removeClass("rainRange");
                }
                if (ShortRangeEnd > -5) {
                    cssp.MWQMSite.MWQMRainDay$[5].removeClass("rainRange");
                }
                for (var i = 6; i < 11; i++) {
                    cssp.MWQMSite.MWQMRainDay$[i].removeClass("rainRange");
                }
                $(".RainDay" + (MidRangeStart * -1).toString()).removeClass("rainRange").addClass("rainRange");
            };
            this.MWQMSubsectorAnalysisShowHideRainRows = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $("#AnalysisTable").find("tr.CanHide").each(function (ind, elem) {
                        if (ind > 0 && ind < 12) {
                            $(elem).removeClass("hidden").addClass("hidden");
                        }
                    });
                    if ($(".jbMWQMSubsectorAnalysisShowHideTideRows").hasClass("btn-default")) {
                        $("#AnalysisTable").find(".FirstTH").attr("rowspan", 3);
                    }
                    else {
                        $("#AnalysisTable").find(".FirstTH").attr("rowspan", 1);
                    }
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $("#AnalysisTable").find("tr.CanHide").each(function (ind, elem) {
                        if (ind > 0 && ind < 12) {
                            $(elem).removeClass("hidden");
                        }
                    });
                    if ($(".jbMWQMSubsectorAnalysisShowHideTideRows").hasClass("btn-default")) {
                        $("#AnalysisTable").find(".FirstTH").attr("rowspan", 14);
                    }
                    else {
                        $("#AnalysisTable").find(".FirstTH").attr("rowspan", 12);
                    }
                }
            };
            this.MWQMSubsectorAnalysisShowHideTideRows = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $("#AnalysisTable").find("tr.CanHide").each(function (ind, elem) {
                        if (ind > 11 && ind < 14) {
                            $(elem).removeClass("hidden").addClass("hidden");
                        }
                    });
                    if ($(".jbMWQMSubsectorAnalysisShowHideRainRows").hasClass("btn-default")) {
                        $("#AnalysisTable").find(".FirstTH").attr("rowspan", 12);
                    }
                    else {
                        $("#AnalysisTable").find(".FirstTH").attr("rowspan", 1);
                    }
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $("#AnalysisTable").find("tr.CanHide").each(function (ind, elem) {
                        if (ind > 11 && ind < 14) {
                            $(elem).removeClass("hidden");
                        }
                    });
                    if ($(".jbMWQMSubsectorAnalysisShowHideRainRows").hasClass("btn-default")) {
                        $("#AnalysisTable").find(".FirstTH").attr("rowspan", 14);
                    }
                    else {
                        $("#AnalysisTable").find(".FirstTH").attr("rowspan", 3);
                    }
                }
            };
            this.MWQMSubsectorAnalysisShowHideQueryTool = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $("#AnalysisTable").find(".QueryTool").removeClass("hidden").addClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $("#AnalysisTable").find(".QueryTool").removeClass("hidden");
                }
            };
            this.MWQMSubsectorAnalysisShowHideRunsNotUsed = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $(".jbMWQMSubsectorAnalysisRemoveFromStat").each(function (ind, elem) {
                        if ($(elem).hasClass("btn-default") || $(elem).hasClass("btn-danger")) {
                            var RunCount = parseInt($(elem).closest("td.MWQMRun").data("runcount"));
                            $("td.MWQMRun[data-runcount='" + RunCount.toString() + "']").removeClass("hidden").addClass("hidden");
                            for (var i = 0; i < 11; i++) {
                                $("td.RainDay" + i.toString() + "[data-runcount='" + RunCount.toString() + "']").removeClass("hidden").addClass("hidden");
                            }
                            $("td.StartTide[data-runcount='" + RunCount.toString() + "']").removeClass("hidden").addClass("hidden");
                            $("td.EndTide[data-runcount='" + RunCount.toString() + "']").removeClass("hidden").addClass("hidden");
                            $("td.MWQMSample[data-runcount='" + RunCount.toString() + "']").removeClass("hidden").addClass("hidden");
                        }
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $(".jbMWQMSubsectorAnalysisRemoveFromStat").each(function (ind, elem) {
                        if ($(elem).hasClass("btn-default") || $(elem).hasClass("btn-danger")) {
                            var RunCount = parseInt($(elem).closest("td.MWQMRun").data("runcount"));
                            $("td.MWQMRun[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                            for (var i = 0; i < 11; i++) {
                                $("td.RainDay" + i.toString() + "[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                            }
                            $("td.StartTide[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                            $("td.EndTide[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                            $("td.MWQMSample[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                        }
                    });
                }
            };
            this.MWQMSubsectorAnalysisShowUpdateTable = function () {
                var SalChildNumber = 0;
                var P90ChildNumber = 0;
                var GMChildNumber = 0;
                var MedChildNumber = 0;
                var P43ChildNumber = 0;
                var P260ChildNumber = 0;
                var HighlightSalNumber = parseInt($("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisHighlightSalinityDeviationFromAverage").val());
                var DataTypeFC = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeFC']:checked");
                var DataTypeFCText = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeFC']").closest("label").attr("title");
                var DataTypeTemp = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeTemp']:checked");
                var DataTypeTempText = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeTemp']").closest("label").attr("title");
                var DataTypeSal = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeSal']:checked");
                var DataTypeSalText = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeSal']").closest("label").attr("title");
                var DataTypeP90 = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP90']:checked");
                var DataTypeP90Text = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP90']").closest("label").attr("title");
                var DataTypeGM = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeGM']:checked");
                var DataTypeGMText = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeGM']").closest("label").attr("title");
                var DataTypeMed = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeMed']:checked");
                var DataTypeMedText = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeMed']").closest("label").attr("title");
                var DataTypeP43 = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP43']:checked");
                var DataTypeP43Text = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP43']").closest("label").attr("title");
                var DataTypeP260 = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP260']:checked");
                var DataTypeP260Text = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP260']").closest("label").attr("title");
                for (var i = 0, count = cssp.MWQMSite.MWQMSiteActive$.length; i < count; i++) {
                    for (var j = 0, count_1 = cssp.MWQMSite.MWQMRun$.length; j < count_1; j++) {
                        if (DataTypeFC.length > 0) {
                            var FC = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].FC;
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).html((FC == -1 ? "--" : (FC == 1.9 ? "<2" : FC.toString()))).removeClass("bg-danger bg-warning bg-info");
                            if (FC > 500) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("bg-danger");
                            }
                            else if (FC > 43) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("bg-warning");
                            }
                            else if (FC == -1) {
                                //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                            }
                        }
                        if (DataTypeTemp.length > 0) {
                            var Temp = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].Temp;
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br />" + (Temp == -1 ? "--" : Temp.toString())) /*.removeClass("bg-danger bg-warning bg-info")*/;
                            if (Temp == -1) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                            }
                        }
                        if (DataTypeSal.length > 0) {
                            //let MoreOrLess: number = HighlightSalNumber;
                            var Sal = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].Sal;
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (Sal == -1 ? "--" : Sal.toString()) + "</span>") /*.removeClass("bg-danger bg-warning bg-info")*/;
                            var MWQMSiteSalAvg = -1;
                            var Total = 0;
                            var CountRun = 0;
                            for (var k = 0, count_2 = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList.length; k < count_2; k++) {
                                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[k].Sal != -1) {
                                    Total += cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[k].Sal;
                                    CountRun += 1;
                                }
                            }
                            MWQMSiteSalAvg = Total / CountRun;
                            if (Sal == -1) {
                                //cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(2).addClass("");
                            }
                            else if (Math.abs(MWQMSiteSalAvg - Sal) >= HighlightSalNumber) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(SalChildNumber - 1).addClass("BorderRed");
                            }
                        }
                        if (DataTypeP90.length > 0) {
                            var P90 = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].P90;
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (P90 == -1 ? "--" : P90.toString()) + "</span>") /*.removeClass("bg-danger bg-warning bg-info")*/;
                            if (P90 > 43) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(P90ChildNumber - 1).addClass("BorderRed");
                            }
                            else if (P90 == -1) {
                                //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                            }
                        }
                        if (DataTypeGM.length > 0) {
                            var GM = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].GeoMean;
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (GM == -1 ? "--" : GM.toString()) + "</span>") /*.removeClass("bg-danger bg-warning bg-info")*/;
                            if (GM > 14) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(GMChildNumber - 1).addClass("BorderRed");
                            }
                            else if (GM == -1) {
                                //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                            }
                        }
                        if (DataTypeMed.length > 0) {
                            var Med = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].Median;
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (Med == -1 ? "--" : Med.toString()) + "</span>") /*.removeClass("bg-danger bg-warning bg-info")*/;
                            if (Med > 14) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(MedChildNumber - 1).addClass("BorderRed");
                            }
                            else if (Med == -1) {
                                //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                            }
                        }
                        if (DataTypeP43.length > 0) {
                            var PercOver43 = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].PercOver43;
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (PercOver43 == -1 ? "--" : PercOver43.toString()) + "</span>") /*.removeClass("bg-danger bg-warning bg-info")*/;
                            if (PercOver43 > 20) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(P43ChildNumber - 1).addClass("BorderDarkRed");
                            }
                            else if (PercOver43 > 10) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(P43ChildNumber - 1).addClass("BorderRed");
                            }
                            else if (PercOver43 == -1) {
                                //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                            }
                        }
                        if (DataTypeP260.length > 0) {
                            var PercOver260 = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].PercOver260;
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (PercOver260 == -1 ? "--" : PercOver260.toString()) + "</span>") /*.removeClass("bg-danger bg-warning bg-info")*/;
                            if (PercOver260 > 10) {
                                cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(P260ChildNumber - 1).addClass("BorderRed");
                            }
                            else if (PercOver260 == -1) {
                                //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                            }
                        }
                    }
                }
            };
            this.MWQMSubsectorAnalysisFillJQueryVariables = function () {
                cssp.MWQMSite.MWQMRun$ = $("#AnalysisTable").find("td.MWQMRun");
                for (var i = 0; i < 11; i++) {
                    cssp.MWQMSite.MWQMRainDay$.push($("#AnalysisTable").find("td.RainDay" + i.toString()));
                }
                cssp.MWQMSite.MWQMStartTide$ = $("#AnalysisTable").find("td.StartTide");
                cssp.MWQMSite.MWQMEndTide$ = $("#AnalysisTable").find("td.EndTide");
                cssp.MWQMSite.MWQMSite$ = $("#AnalysisTable").find("td.MWQMSite");
                cssp.MWQMSite.MWQMSiteActive$ = cssp.MWQMSite.MWQMSite$.filter("[data-isactive='True']");
                cssp.MWQMSite.MWQMSamplesCount$ = $("#AnalysisTable").find("td.SamplesCount");
                cssp.MWQMSite.MWQMPeriod$ = $("#AnalysisTable").find("td.Period");
                cssp.MWQMSite.MWQMMinFC$ = $("#AnalysisTable").find("td.MinFC");
                cssp.MWQMSite.MWQMMaxFC$ = $("#AnalysisTable").find("td.MaxFC");
                cssp.MWQMSite.MWQMGMean$ = $("#AnalysisTable").find("td.GMean");
                cssp.MWQMSite.MWQMMedian$ = $("#AnalysisTable").find("td.Median");
                cssp.MWQMSite.MWQMP90$ = $("#AnalysisTable").find("td.P90");
                cssp.MWQMSite.MWQMPercOver43$ = $("#AnalysisTable").find("td.PercOver43");
                cssp.MWQMSite.MWQMPercOver260$ = $("#AnalysisTable").find("td.PercOver260");
                cssp.MWQMSite.MWQMColorAndLetter$ = $("#AnalysisTable").find("td.ColorAndLetter");
                cssp.MWQMSite.MWQMSampleList$ = [];
                cssp.MWQMSite.MWQMSite$.each(function (ind, elem) {
                    var SiteCount = parseInt($(elem).data("sitecount"));
                    cssp.MWQMSite.MWQMSampleList$.push($("#AnalysisTable").find("td.MWQMSample[data-sitecount='" + SiteCount + "']"));
                });
            };
            this.MWQMSubsectorAnalysisLoadVariables = function () {
                cssp.MWQMSite.mwqmSubsectorAnalysisModel = null;
                var CalculationDataType = $("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisCalculateType").val();
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var StartDateText = $("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisStartDate").val();
                var StartYear = parseInt(StartDateText.substr(0, 4));
                var StartMonth = parseInt(StartDateText.substr(5, 2));
                var StartDay = parseInt(StartDateText.substr(8, 2));
                var StartDate = new Date(StartYear, StartMonth - 1, StartDay);
                var EndDateText = $("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisEndDate").val();
                var EndYear = parseInt(EndDateText.substr(0, 4));
                var EndMonth = parseInt(EndDateText.substr(5, 2));
                var EndDay = parseInt(EndDateText.substr(8, 2));
                var EndDate = new Date(EndYear, EndMonth - 1, EndDay);
                var Runs = parseInt($("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisRuns").val());
                var ShortRangeEnd = (-1 * parseInt($("input[name='ShortRange']:checked").val()));
                var MidRangeEnd = (-1 * parseInt($("input[name='MidRange']:checked").val()));
                var UpperRainLimitStillConsideredDry1 = parseFloat($("select[name='UpperRainLimitStillConsideredDry1']").val());
                var UpperRainLimitStillConsideredDry2 = parseFloat($("select[name='UpperRainLimitStillConsideredDry2']").val());
                var UpperRainLimitStillConsideredDry3 = parseFloat($("select[name='UpperRainLimitStillConsideredDry3']").val());
                var UpperRainLimitStillConsideredDry4 = parseFloat($("select[name='UpperRainLimitStillConsideredDry4']").val());
                var LowerRainLimitConsideredRain1 = parseFloat($("select[name='LowerRainLimitConsideredRain1']").val());
                var LowerRainLimitConsideredRain2 = parseFloat($("select[name='LowerRainLimitConsideredRain2']").val());
                var LowerRainLimitConsideredRain3 = parseFloat($("select[name='LowerRainLimitConsideredRain3']").val());
                var LowerRainLimitConsideredRain4 = parseFloat($("select[name='LowerRainLimitConsideredRain4']").val());
                var SelectFullYear = $("#MWQMSubsectorAnalysisDiv").find("input.SelectFullYear").is(":checked") ? true : false;
                var mwqmSubsectorModel = new CSSP.MWQMSubsectorModel(SubsectorTVItemID, ShortRangeEnd, MidRangeEnd, UpperRainLimitStillConsideredDry1, UpperRainLimitStillConsideredDry2, UpperRainLimitStillConsideredDry3, UpperRainLimitStillConsideredDry4, LowerRainLimitConsideredRain1, LowerRainLimitConsideredRain2, LowerRainLimitConsideredRain3, LowerRainLimitConsideredRain4, StartDate, EndDate, Runs, CalculationDataType, SelectFullYear, StartDate.getFullYear(), EndDate.getFullYear());
                var mwqmRunAnalysisModelList = [];
                var mwqmSiteAnalysisModelList = [];
                if (CalculationDataType != "All_All_All") {
                    if (cssp.MWQMSite.RainMissingText) {
                        cssp.Dialog.ShowDialogErrorWithError("Rain Day missing [" + cssp.MWQMSite.RainMissingText + "]");
                        CalculationDataType = "All_All_All";
                        $("select.MWQMSubsectorAnalysisCalculateType").val("All_All_All");
                    }
                }
                for (var i = 0, count = cssp.MWQMSite.MWQMRun$.length; i < count; i++) {
                    var IsOKRun = false;
                    var dateText = cssp.MWQMSite.MWQMRun$.eq(i).data("date");
                    var year = parseInt(dateText.substr(0, 4));
                    var month = parseInt(dateText.substr(5, 2));
                    var day = parseInt(dateText.substr(8, 2));
                    var RunDate = new Date(year, month - 1, day);
                    var runid = parseInt(cssp.MWQMSite.MWQMRun$.eq(i).data("runid"));
                    var CountRun = parseInt(cssp.MWQMSite.MWQMRun$.eq(i).data("runcount"));
                    var RemoveFromStat = cssp.MWQMSite.MWQMRun$.eq(i).data("removefromstat");
                    var UseRunAndRainValueArr = [];
                    if (CalculationDataType == "All_All_All") {
                        for (var j = 0; j < 11; j++) {
                            var UseRun = false;
                            var Rain$ = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                            Rain$.removeClass("bg-info").removeClass("bg-danger");
                            var RainValue = Rain$.data("rainday" + j.toString());
                            if (RainValue !== -1) {
                                UseRun = true;
                            }
                            else {
                                cssp.MWQMSite.RainMissingText = cssp.MWQMSite.MWQMRun$.eq(i).data("date") + " (-" + j + ")";
                            }
                            UseRunAndRainValueArr.push(new CSSP.UseRunAndRainValue(UseRun, RainValue));
                        }
                        IsOKRun = true;
                    }
                    else if (CalculationDataType == "Wet_All_All") {
                        var TotalRain = 0;
                        for (var j = 0; j < 11; j++) {
                            var UseRun = false;
                            var Rain$ = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                            Rain$.removeClass("bg-info").removeClass("bg-danger");
                            var RainValue = Rain$.data("rainday" + j.toString());
                            if (RainValue !== -1) {
                                if (j > 0) {
                                    TotalRain = TotalRain + RainValue;
                                }
                                if (j <= ShortRangeEnd && j > 0) {
                                    if (j == 1) {
                                        if (LowerRainLimitConsideredRain1 < TotalRain) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == 2) {
                                        if (LowerRainLimitConsideredRain2 < TotalRain) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == 3) {
                                        if (LowerRainLimitConsideredRain3 < TotalRain) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else {
                                        if (LowerRainLimitConsideredRain4 < TotalRain) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                }
                                else {
                                    UseRun = true;
                                }
                            }
                            UseRunAndRainValueArr.push(new CSSP.UseRunAndRainValue(UseRun, RainValue));
                        }
                        var ShortOK = false;
                        for (var j = 1; j < 11; j++) {
                            if (j <= ShortRangeEnd) {
                                if (UseRunAndRainValueArr[j].UseRun == true) {
                                    ShortOK = true;
                                    break;
                                }
                            }
                        }
                        if (ShortOK) {
                            IsOKRun = true;
                        }
                    }
                    else if (CalculationDataType == "Dry_All_All") {
                        var TotalRain = 0;
                        for (var j = 0; j < 11; j++) {
                            var UseRun = false;
                            var Rain$ = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                            Rain$.removeClass("bg-info").removeClass("bg-danger");
                            var RainValue = Rain$.data("rainday" + j.toString());
                            if (RainValue !== -1) {
                                if (j > 0) {
                                    TotalRain = TotalRain + RainValue;
                                }
                                if (j <= ShortRangeEnd && j > 0) {
                                    if (j == 1) {
                                        if (UpperRainLimitStillConsideredDry1 > TotalRain) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == 2) {
                                        if (UpperRainLimitStillConsideredDry2 > TotalRain) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == 3) {
                                        if (UpperRainLimitStillConsideredDry3 > TotalRain) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else {
                                        if (UpperRainLimitStillConsideredDry4 > TotalRain) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                }
                                else {
                                    UseRun = true;
                                }
                            }
                            UseRunAndRainValueArr.push(new CSSP.UseRunAndRainValue(UseRun, RainValue));
                        }
                        var ShortOK = true;
                        for (var j = 1; j < 11; j++) {
                            if (j <= ShortRangeEnd) {
                                if (UseRunAndRainValueArr[j].UseRun != true) {
                                    ShortOK = false;
                                    break;
                                }
                            }
                        }
                        if (ShortOK) {
                            IsOKRun = true;
                        }
                    }
                    else if (CalculationDataType == "Wet_Wet_All") {
                        var TotalRainShort = 0;
                        var TotalRainMid = 0;
                        for (var j = 0; j < 11; j++) {
                            var UseRun = false;
                            var Rain$ = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                            Rain$.removeClass("bg-info").removeClass("bg-danger");
                            var RainValue = Rain$.data("rainday" + j.toString());
                            if (RainValue !== -1) {
                                if (j <= ShortRangeEnd && j > 0) {
                                    TotalRainShort = TotalRainShort + RainValue;
                                    if (j == 1) {
                                        if (LowerRainLimitConsideredRain1 < TotalRainShort) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == 2) {
                                        if (LowerRainLimitConsideredRain2 < TotalRainShort) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == 3) {
                                        if (LowerRainLimitConsideredRain3 < TotalRainShort) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else {
                                        if (LowerRainLimitConsideredRain4 < TotalRainShort) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                }
                                else if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                    TotalRainMid = TotalRainMid + RainValue;
                                    if (j == (ShortRangeEnd + 1)) {
                                        if (LowerRainLimitConsideredRain1 < TotalRainMid) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == (ShortRangeEnd + 2)) {
                                        if (LowerRainLimitConsideredRain2 < TotalRainMid) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == (ShortRangeEnd + 3)) {
                                        if (LowerRainLimitConsideredRain3 < TotalRainMid) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else {
                                        if (LowerRainLimitConsideredRain4 < TotalRainMid) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                }
                                else {
                                    UseRun = true;
                                }
                            }
                            UseRunAndRainValueArr.push(new CSSP.UseRunAndRainValue(UseRun, RainValue));
                        }
                        var ShortOK = false;
                        var MidOK = false;
                        for (var j = 1; j < 11; j++) {
                            if (j <= ShortRangeEnd) {
                                if (UseRunAndRainValueArr[j].UseRun == true) {
                                    ShortOK = true;
                                    break;
                                }
                            }
                        }
                        if (ShortOK) {
                            MidOK = false;
                            for (var j = 1; j < 11; j++) {
                                if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                    if (UseRunAndRainValueArr[j].UseRun == true) {
                                        MidOK = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (ShortOK && MidOK) {
                            IsOKRun = true;
                        }
                    }
                    else if (CalculationDataType == "Dry_Dry_All") {
                        var TotalRainShort = 0;
                        var TotalRainMid = 0;
                        for (var j = 0; j < 11; j++) {
                            var UseRun = false;
                            var Rain$ = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                            Rain$.removeClass("bg-info").removeClass("bg-danger");
                            var RainValue = Rain$.data("rainday" + j.toString());
                            if (RainValue !== -1) {
                                if (j <= ShortRangeEnd && j > 0) {
                                    TotalRainShort = TotalRainShort + RainValue;
                                    if (j == 1) {
                                        if (UpperRainLimitStillConsideredDry1 > TotalRainShort) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == 2) {
                                        if (UpperRainLimitStillConsideredDry2 > TotalRainShort) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == 3) {
                                        if (UpperRainLimitStillConsideredDry3 > TotalRainShort) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else {
                                        if (UpperRainLimitStillConsideredDry4 > TotalRainShort) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                }
                                else if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                    TotalRainMid = TotalRainMid + RainValue;
                                    if (j == (ShortRangeEnd + 1)) {
                                        if (UpperRainLimitStillConsideredDry1 > TotalRainMid) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == (ShortRangeEnd + 2)) {
                                        if (UpperRainLimitStillConsideredDry2 > TotalRainMid) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == (ShortRangeEnd + 3)) {
                                        if (UpperRainLimitStillConsideredDry3 > TotalRainMid) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else {
                                        if (UpperRainLimitStillConsideredDry4 > TotalRainMid) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                }
                                else {
                                    UseRun = true;
                                }
                            }
                            UseRunAndRainValueArr.push(new CSSP.UseRunAndRainValue(UseRun, RainValue));
                        }
                        var ShortAndMidOK = true;
                        for (var j = 1; j < 11; j++) {
                            if (j <= MidRangeEnd) {
                                if (UseRunAndRainValueArr[j].UseRun != true) {
                                    ShortAndMidOK = false;
                                    break;
                                }
                            }
                        }
                        if (ShortAndMidOK) {
                            IsOKRun = true;
                        }
                    }
                    else if (CalculationDataType == "Wet_Dry_All") {
                        var TotalRainShort = 0;
                        var TotalRainMid = 0;
                        for (var j = 0; j < 11; j++) {
                            var UseRun = false;
                            var Rain$ = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                            Rain$.removeClass("bg-info").removeClass("bg-danger");
                            var RainValue = Rain$.data("rainday" + j.toString());
                            if (RainValue !== -1) {
                                if (j <= ShortRangeEnd && j > 0) {
                                    TotalRainShort = TotalRainShort + RainValue;
                                    if (j == 1) {
                                        if (LowerRainLimitConsideredRain1 < TotalRainShort) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == 2) {
                                        if (LowerRainLimitConsideredRain2 < TotalRainShort) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == 3) {
                                        if (LowerRainLimitConsideredRain3 < TotalRainShort) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else {
                                        if (LowerRainLimitConsideredRain4 < TotalRainShort) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                }
                                else if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                    TotalRainMid = TotalRainMid + RainValue;
                                    if (j == (ShortRangeEnd + 1)) {
                                        if (UpperRainLimitStillConsideredDry1 > TotalRainMid) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == (ShortRangeEnd + 2)) {
                                        if (UpperRainLimitStillConsideredDry2 > TotalRainMid) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == (ShortRangeEnd + 3)) {
                                        if (UpperRainLimitStillConsideredDry3 > TotalRainMid) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else {
                                        if (UpperRainLimitStillConsideredDry4 > TotalRainMid) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                }
                                else {
                                    UseRun = true;
                                }
                            }
                            UseRunAndRainValueArr.push(new CSSP.UseRunAndRainValue(UseRun, RainValue));
                        }
                        var ShortOK = false;
                        var MidOK = true;
                        for (var j = 1; j < 11; j++) {
                            if (j <= ShortRangeEnd) {
                                if (UseRunAndRainValueArr[j].UseRun == true) {
                                    ShortOK = true;
                                    break;
                                }
                            }
                        }
                        if (ShortOK) {
                            MidOK = true;
                            for (var j = 1; j < 11; j++) {
                                if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                    if (UseRunAndRainValueArr[j].UseRun != true) {
                                        MidOK = false;
                                        break;
                                    }
                                }
                            }
                        }
                        if (ShortOK && MidOK) {
                            IsOKRun = true;
                        }
                    }
                    else if (CalculationDataType == "Dry_Wet_All") {
                        var TotalRainShort = 0;
                        var TotalRainMid = 0;
                        for (var j = 0; j < 11; j++) {
                            var UseRun = false;
                            var Rain$ = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                            Rain$.removeClass("bg-info").removeClass("bg-danger");
                            var RainValue = Rain$.data("rainday" + j.toString());
                            if (RainValue !== -1) {
                                if (j <= ShortRangeEnd && j > 0) {
                                    TotalRainShort = TotalRainShort + RainValue;
                                    if (j == 1) {
                                        if (UpperRainLimitStillConsideredDry1 > TotalRainShort) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == 2) {
                                        if (UpperRainLimitStillConsideredDry2 > TotalRainShort) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else if (j == 3) {
                                        if (UpperRainLimitStillConsideredDry3 > TotalRainShort) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                    else {
                                        if (UpperRainLimitStillConsideredDry4 > TotalRainShort) {
                                            UseRun = true;
                                        }
                                        else {
                                            Rain$.addClass("bg-danger");
                                        }
                                    }
                                }
                                else if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                    TotalRainMid = TotalRainMid + RainValue;
                                    if (j == (ShortRangeEnd + 1)) {
                                        if (LowerRainLimitConsideredRain1 < TotalRainMid) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == (ShortRangeEnd + 2)) {
                                        if (LowerRainLimitConsideredRain2 < TotalRainMid) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else if (j == (ShortRangeEnd + 3)) {
                                        if (LowerRainLimitConsideredRain3 < TotalRainMid) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                    else {
                                        if (LowerRainLimitConsideredRain4 < TotalRainMid) {
                                            Rain$.addClass("bg-info");
                                            UseRun = true;
                                        }
                                    }
                                }
                                else {
                                    UseRun = true;
                                }
                            }
                            UseRunAndRainValueArr.push(new CSSP.UseRunAndRainValue(UseRun, RainValue));
                        }
                        var ShortOK = true;
                        var MidOK = false;
                        for (var j = 1; j < 11; j++) {
                            if (j <= ShortRangeEnd) {
                                if (UseRunAndRainValueArr[j].UseRun != true) {
                                    ShortOK = false;
                                    break;
                                }
                            }
                        }
                        if (ShortOK) {
                            MidOK = false;
                            for (var j = 1; j < 11; j++) {
                                if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                    if (UseRunAndRainValueArr[j].UseRun == true) {
                                        MidOK = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (ShortOK && MidOK) {
                            IsOKRun = true;
                        }
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithError("Error CalculationDataType not found [" + CalculationDataType + "]");
                        return;
                    }
                    var StartTideText = cssp.MWQMSite.MWQMStartTide$.eq(i).data("starttide");
                    var EndTideText = cssp.MWQMSite.MWQMEndTide$.eq(i).data("endtide");
                    var mwqmRunAnalysisModel = new CSSP.MWQMRunAnalysisModel(CountRun, runid, IsOKRun, RemoveFromStat, RunDate, UseRunAndRainValueArr[0].RainValue, UseRunAndRainValueArr[1].RainValue, UseRunAndRainValueArr[2].RainValue, UseRunAndRainValueArr[3].RainValue, UseRunAndRainValueArr[4].RainValue, UseRunAndRainValueArr[5].RainValue, UseRunAndRainValueArr[6].RainValue, UseRunAndRainValueArr[7].RainValue, UseRunAndRainValueArr[8].RainValue, UseRunAndRainValueArr[9].RainValue, UseRunAndRainValueArr[10].RainValue, StartTideText, EndTideText, false, RunDate.getFullYear());
                    mwqmRunAnalysisModelList.push(mwqmRunAnalysisModel);
                }
                cssp.MWQMSite.AllRainChecked = true;
                for (var i = 0, count = cssp.MWQMSite.MWQMSite$.length; i < count; i++) {
                    var siteid = parseInt(cssp.MWQMSite.MWQMSite$.eq(i).data("tvitemid"));
                    var SiteCount = parseInt(cssp.MWQMSite.MWQMSite$.eq(i).data("sitecount"));
                    var isActive = cssp.MWQMSite.MWQMSite$.eq(i).data("isactive") == "True" ? true : false;
                    var mwqmSampleAnalysisModelList = [];
                    for (var j = 0, count_3 = cssp.MWQMSite.MWQMSampleList$[i].length; j < count_3; j++) {
                        var RunCount = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("runcount"));
                        var MWQMSiteTVItemID = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("siteid"));
                        var MWQMRunTVItemID = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("runid"));
                        var SampleTypeText = cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("sampletypetext");
                        var FC = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("fc"));
                        if (FC == 1) {
                            FC = 1.9;
                        }
                        var Temp = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("temp"));
                        var Sal = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("sal"));
                        var dateText = cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("date");
                        var year = parseInt(dateText.substr(0, 4));
                        var month = parseInt(dateText.substr(5, 2));
                        var day = parseInt(dateText.substr(8, 2));
                        var SampleDate = new Date(year, month - 1, day);
                        var mwqmSampleAnalysisModel = new CSSP.MWQMSampleAnalysisModel(SiteCount, RunCount, MWQMRunTVItemID, SampleTypeText, FC, Temp, Sal, -1, -1, -1, -1, -1, SampleDate, false, SampleDate.getFullYear());
                        mwqmSampleAnalysisModelList.push(mwqmSampleAnalysisModel);
                        cssp.MWQMSite.MWQMSampleList$[i].eq(j).removeClass("usedInStat");
                    }
                    var mwqmSiteAnalysisModel = new CSSP.MWQMSiteAnalysisModel(SiteCount, siteid, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, mwqmSampleAnalysisModelList, new CSSP.ColorAndLetter("", ""), isActive);
                    mwqmSiteAnalysisModelList.push(mwqmSiteAnalysisModel);
                }
                cssp.MWQMSite.mwqmSubsectorAnalysisModel = new CSSP.MWQMSubsectorAnalysisModel(mwqmSubsectorModel, mwqmSiteAnalysisModelList, mwqmRunAnalysisModelList);
            };
            this.MWQMSubsectorAnalysisLoadForReport = function () {
                var SavingForReport$ = $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport");
                SavingForReport$.text(SavingForReport$.data("saving"));
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var RunsToRemoveFromStatList = [];
                for (var i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList.length; i < count; i++) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RemoveFromStat) {
                        RunsToRemoveFromStatList.push(new CSSP.RunsToRemoveFromStat(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RemoveFromStat, cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].MWQMRunTVItemID));
                    }
                }
                var command = "MWQM/MWQMSubsectorAnalysisSaveForReportJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    RunsToRemoveFromStatList: RunsToRemoveFromStatList
                }).done(function (ret) {
                    $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport").text("");
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                }).fail(function () {
                    $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport").text("");
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MWQMSubsectorAnalysisExportToExcelDocument = function () {
                cssp.Dialog.ShowDialogMessage("Not implemented yet");
            };
            this.MWQMSubsectorAnalysisSaveForFutureReportProduction = function () {
                cssp.Dialog.ShowDialogMessage("Not implemented yet");
                //let SavingForReport$ = $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport");
                //SavingForReport$.text(SavingForReport$.data("saving"));
                //let SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                //let ShortRange: number = parseInt($("#MWQMSubsectorAnalysisDiv").find("input[name='ShortRange']:checked").val());
                //let MidRange: number = parseInt($("#MWQMSubsectorAnalysisDiv").find("input[name='MidRange']:checked").val());
                //let UpperRainLimitStillConsideredDry: number = parseInt($("#MWQMSubsectorAnalysisDiv").find("select[name='UpperRainLimitStillConsideredDry']").val());
                //let LowerRainLimitConsideredRain: number = parseInt($("#MWQMSubsectorAnalysisDiv").find("input[name='LowerRainLimitConsideredRain']").val());
                //let RunsToRemoveFromStatList: RunsToRemoveFromStat[] = [];
                //for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList.length; i < count; i++) {
                //    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RemoveFromStat) {
                //        RunsToRemoveFromStatList.push(new RunsToRemoveFromStat(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RemoveFromStat, cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].MWQMRunTVItemID));
                //    }
                //}
                //var command: string = "MWQM/MWQMSubsectorAnalysisSaveRainAndRunsToRemoveFromStatForReportJSON";
                //$.post(cssp.BaseURL + command, {
                //    SubsectorTVItemID: SubsectorTVItemID,
                //    ShortRange: ShortRange,
                //    MidRange: MidRange,
                //    UpperRainLimitStillConsideredDry: UpperRainLimitStillConsideredDry,
                //    LowerRainLimitConsideredRain: LowerRainLimitConsideredRain,
                //    RunsToRemoveFromStatList: RunsToRemoveFromStatList
                //}).done((ret) => {
                //    $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport").text("");
                //    if (ret) {
                //        cssp.Dialog.ShowDialogErrorWithError(ret);
                //    }
                //}).fail(() => {
                //    $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport").text("");
                //    cssp.Dialog.ShowDialogErrorWithFail(command);
                //});
            };
            this.MWQMSubsectorAnalysisRecalculate = function () {
                var UsedRunIndexList = [];
                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel == null) {
                    cssp.Dialog.ShowDialogMessage("cssp.MWQMSite.mwqmSubsectorAnalysisModel == null in MWQMSubsectorAnalysisRecalculate");
                }
                var NeedRecal$ = $("#MWQMSubsectorAnalysisDiv").find(".NeedRecal");
                NeedRecal$.text(NeedRecal$.data("inprogress"));
                for (var i = 0, count = cssp.MWQMSite.MWQMRun$.length; i < count; i++) {
                    if (!cssp.MWQMSite.MWQMRun$.eq(i).find("button.jbMWQMSubsectorAnalysisRemoveFromStat").hasClass("btn-danger")) {
                        cssp.MWQMSite.MWQMRun$.eq(i).find("button.jbMWQMSubsectorAnalysisRemoveFromStat").removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
                    }
                }
                for (var j = 0, count = cssp.MWQMSite.MWQMSiteActive$.length; j < count; j++) {
                    var ValRunList = [];
                    var SampleCount = 0;
                    var MinYear = -1;
                    var MaxYear = -1;
                    var MinFC = -1;
                    var MaxFC = -1;
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].isActive) {
                        for (var rc = 0, count_4 = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel.length; rc < count_4; rc++) {
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].GeoMean = -1;
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].Median = -1;
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].P90 = -1;
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].PercOver43 = -1;
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].PercOver260 = -1;
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].UseInStat = false;
                        }
                        ValRunList = [];
                        var SampleCountMaxYear = 0;
                        var FirstTimeDone = false;
                        for (var i = 0, count_5 = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel.length; i < count_5; i++) {
                            if (!cssp.MWQMSite.MWQMRun$.eq(i).find("button.jbMWQMSubsectorAnalysisRemoveFromStat").hasClass("btn-danger")) {
                                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].IsOKRun) {
                                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RunYear <= cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSubsectorModel.StartYear
                                        && cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RunYear >= cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSubsectorModel.EndYear) {
                                        if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSubsectorModel.SelectFullYear) {
                                            if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC != -1) {
                                                SampleCount += 1;
                                                if (SampleCount == cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSubsectorModel.Runs) {
                                                    SampleCountMaxYear = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                }
                                                if (SampleCount <= cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSubsectorModel.Runs
                                                    || cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RunYear >= SampleCountMaxYear) {
                                                    ValRunList.push(new CSSP.ValRun(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC, i));
                                                    cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].UseInStat = true;
                                                    cssp.MWQMSite.MWQMSampleList$[j].eq(i).addClass("usedInStat");
                                                    cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].UseInStat = true;
                                                    var tempMinYear = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                    var tempMaxYear = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                    var tempMinFC = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC;
                                                    var tempMaxFC = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC;
                                                    if (!FirstTimeDone) {
                                                        MinYear = tempMinYear;
                                                        MaxYear = tempMaxYear;
                                                        MinFC = tempMinFC;
                                                        MaxFC = tempMaxFC;
                                                        FirstTimeDone = true;
                                                    }
                                                    else {
                                                        if (MinYear > tempMinYear) {
                                                            MinYear = tempMinYear;
                                                        }
                                                        if (MaxYear < tempMaxYear) {
                                                            MaxYear = tempMaxYear;
                                                        }
                                                        if (MinFC > tempMinFC) {
                                                            MinFC = tempMinFC;
                                                        }
                                                        if (MaxFC < tempMaxFC) {
                                                            MaxFC = tempMaxFC;
                                                        }
                                                    }
                                                    var found = false;
                                                    for (var j_1 = 0, count_6 = UsedRunIndexList.length; j_1 < count_6; j_1++) {
                                                        if (UsedRunIndexList[j_1] == i) {
                                                            found = true;
                                                            break;
                                                        }
                                                    }
                                                    if (!found) {
                                                        UsedRunIndexList.push(i);
                                                    }
                                                }
                                                else {
                                                    SampleCount -= 1;
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RunDate <= cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSubsectorModel.StartDate
                                                && cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RunDate >= cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSubsectorModel.EndDate) {
                                                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC != -1) {
                                                    SampleCount += 1;
                                                    if (SampleCount <= cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSubsectorModel.Runs) {
                                                        ValRunList.push(new CSSP.ValRun(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC, i));
                                                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].UseInStat = true;
                                                        cssp.MWQMSite.MWQMSampleList$[j].eq(i).addClass("usedInStat");
                                                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].UseInStat = true;
                                                        var tempMinYear = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                        var tempMaxYear = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                        var tempMinFC = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC;
                                                        var tempMaxFC = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC;
                                                        if (!FirstTimeDone) {
                                                            MinYear = tempMinYear;
                                                            MaxYear = tempMaxYear;
                                                            MinFC = tempMinFC;
                                                            MaxFC = tempMaxFC;
                                                            FirstTimeDone = true;
                                                        }
                                                        else {
                                                            if (MinYear > tempMinYear) {
                                                                MinYear = tempMinYear;
                                                            }
                                                            if (MaxYear < tempMaxYear) {
                                                                MaxYear = tempMaxYear;
                                                            }
                                                            if (MinFC > tempMinFC) {
                                                                MinFC = tempMinFC;
                                                            }
                                                            if (MaxFC < tempMaxFC) {
                                                                MaxFC = tempMaxFC;
                                                            }
                                                        }
                                                        var found = false;
                                                        for (var j_2 = 0, count_7 = UsedRunIndexList.length; j_2 < count_7; j_2++) {
                                                            if (UsedRunIndexList[j_2] == i) {
                                                                found = true;
                                                                break;
                                                            }
                                                        }
                                                        if (!found) {
                                                            UsedRunIndexList.push(i);
                                                        }
                                                    }
                                                    else {
                                                        SampleCount -= 1;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var SamplesText = "--";
                        if (SampleCount != -1) {
                            SamplesText = SampleCount.toFixed(0).toString();
                        }
                        cssp.MWQMSite.MWQMSamplesCount$.eq(j).text(SamplesText).removeClass("bg-warning");
                        if (SampleCount < 10) {
                            cssp.MWQMSite.MWQMSamplesCount$.eq(j).text(SamplesText).addClass("bg-warning");
                        }
                        var PeriodText = "--";
                        if (MinYear != -1) {
                            PeriodText = MaxYear.toFixed(0).toString() + "-" + MinYear.toFixed(0).toString();
                        }
                        cssp.MWQMSite.MWQMPeriod$.eq(j).text(PeriodText);
                        var MinFCText = "--";
                        if (MinFC != -1) {
                            MinFCText = (MinFC < 2 ? "<2" : MinFC.toFixed(0)).toString();
                        }
                        cssp.MWQMSite.MWQMMinFC$.eq(j).text(MinFCText);
                        var MaxFCText = "--";
                        if (MaxFC != -1) {
                            MaxFCText = (MaxFC < 2 ? "<2" : MaxFC.toFixed(0)).toString();
                        }
                        cssp.MWQMSite.MWQMMaxFC$.eq(j).text(MaxFCText);
                        var ValRunResList = cssp.MWQMSite.MWQMSubsectorAnalysisGeometricMean(ValRunList);
                        var GMeanText = "--";
                        if (ValRunResList.length > 0 && ValRunResList[0].val != -1) {
                            GMeanText = (ValRunResList[0].val < 1.95 ? "<2" : ValRunResList[0].val.toFixed(0)).toString();
                        }
                        cssp.MWQMSite.MWQMGMean$.eq(j).text(GMeanText).removeClass("bg-warning");
                        if (ValRunResList.length > 0 && ValRunResList[0].val > 14) {
                            cssp.MWQMSite.MWQMGMean$.eq(j).addClass("bg-warning");
                        }
                        while (ValRunResList.length > 0) {
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[ValRunResList[0].run].GeoMean = parseInt(ValRunResList[0].val.toFixed(0).toString());
                            ValRunResList.shift();
                        }
                        ValRunResList = cssp.MWQMSite.MWQMSubsectorAnalysisGetMedian(ValRunList);
                        var MedianText = "--";
                        if (ValRunResList.length > 0 && ValRunResList[0].val != -1) {
                            MedianText = (ValRunResList[0].val < 2 ? "<2" : ValRunResList[0].val.toFixed(0)).toString();
                        }
                        cssp.MWQMSite.MWQMMedian$.eq(j).text(MedianText).removeClass("bg-warning");
                        if (ValRunResList.length > 0 && ValRunResList[0].val > 14) {
                            cssp.MWQMSite.MWQMMedian$.eq(j).addClass("bg-warning");
                        }
                        while (ValRunResList.length > 0) {
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[ValRunResList[0].run].Median = parseInt(ValRunResList[0].val.toFixed(0).toString());
                            ValRunResList.shift();
                        }
                        ValRunResList = [];
                        ValRunResList = cssp.MWQMSite.MWQMSubsectorAnalysisGetP90(ValRunList);
                        var P90Text = "--";
                        if (ValRunResList.length > 0 && ValRunResList[0].val != -1) {
                            P90Text = ValRunResList[0].val.toFixed(0).toString();
                        }
                        cssp.MWQMSite.MWQMP90$.eq(j).text(P90Text).removeClass("bg-warning");
                        if (ValRunResList.length > 0 && ValRunResList[0].val > 43) {
                            cssp.MWQMSite.MWQMP90$.eq(j).addClass("bg-warning");
                        }
                        while (ValRunResList.length > 0) {
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[ValRunResList[0].run].P90 = parseInt(ValRunResList[0].val.toFixed(0).toString());
                            ValRunResList.shift();
                        }
                        ValRunResList = [];
                        ValRunResList = cssp.MWQMSite.MWQMSubsectorAnalysisPercOver43(ValRunList);
                        var PercOver43Text = "--";
                        if (ValRunResList.length > 0 && ValRunResList[0].val != -1) {
                            PercOver43Text = ValRunResList[0].val.toFixed(0).toString();
                        }
                        cssp.MWQMSite.MWQMPercOver43$.eq(j).text(PercOver43Text).removeClass("bg-warning");
                        if (ValRunResList.length > 0 && ValRunResList[0].val > 10) {
                            cssp.MWQMSite.MWQMPercOver43$.eq(j).addClass("bg-warning");
                        }
                        while (ValRunResList.length > 0) {
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[ValRunResList[0].run].PercOver43 = parseInt(ValRunResList[0].val.toFixed(0).toString());
                            ValRunResList.shift();
                        }
                        ValRunResList = [];
                        ValRunResList = cssp.MWQMSite.MWQMSubsectorAnalysisPercOver260(ValRunList);
                        var PercOver260Text = "--";
                        if (ValRunResList.length > 0 && ValRunResList[0].val != -1) {
                            PercOver260Text = ValRunResList[0].val.toFixed(0).toString();
                        }
                        cssp.MWQMSite.MWQMPercOver260$.eq(j).text(PercOver260Text).removeClass("bg-warning");
                        if (ValRunResList.length > 0 && ValRunResList[0].val > 10) {
                            cssp.MWQMSite.MWQMPercOver260$.eq(j).addClass("bg-warning");
                        }
                        while (ValRunResList.length > 0) {
                            cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[ValRunResList[0].run].PercOver260 = parseInt(ValRunResList[0].val.toFixed(0).toString());
                            ValRunResList.shift();
                        }
                        var FirstWithCalculation = 0;
                        for (var i = 0, count_8 = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList.length; i < count_8; i++) {
                            if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].P90 != -1) {
                                FirstWithCalculation = i;
                                break;
                            }
                        }
                        var colorAndLetter = cssp.MWQMSite.MWQMSubsectorAnalysisGetColorAndLetter(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].P90, cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].GeoMean, cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].Median, cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].PercOver43, cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].PercOver260);
                        var clearClasses = ["bggreena", "bggreenb", "bggreenc", "bggreend", "bggreene", "bggreenf", "bgreda", "bgredb", "bgredc", "bgredd", "bgrede", "bgredf", "bgbluea", "bgblueb", "bgbluec", "bgblued", "bgbluee", "bgbluef"];
                        if (SampleCount < 10) {
                            cssp.MWQMSite.MWQMColorAndLetter$.eq(j).removeClass("notEnoughData");
                            for (var i = 0, count_9 = clearClasses.length; i < count_9; i++) {
                                cssp.MWQMSite.MWQMColorAndLetter$.eq(j).removeClass(clearClasses[i]);
                            }
                            cssp.MWQMSite.MWQMColorAndLetter$.eq(j).addClass("notEnoughData").html((SampleCount < 0 ? "0" : SampleCount.toString()));
                        }
                        else {
                            cssp.MWQMSite.MWQMColorAndLetter$.eq(j).removeClass("notEnoughData");
                            for (var i = 0, count_10 = clearClasses.length; i < count_10; i++) {
                                cssp.MWQMSite.MWQMColorAndLetter$.eq(j).removeClass(clearClasses[i]);
                            }
                            cssp.MWQMSite.MWQMColorAndLetter$.eq(j).addClass(colorAndLetter.color).html(colorAndLetter.letter);
                        }
                    }
                }
                cssp.MWQMSite.MWQMSubsectorAnalysisShowUpdateTable();
                NeedRecal$.text(NeedRecal$.data("completed"));
                window.setTimeout(function () {
                    NeedRecal$.text("");
                }, 100);
                for (var i = 0, count = UsedRunIndexList.length; i < count; i++) {
                    if (!cssp.MWQMSite.MWQMRun$.eq(UsedRunIndexList[i]).hasClass("btn-danger")) {
                        cssp.MWQMSite.MWQMRun$.eq(UsedRunIndexList[i]).find("button.jbMWQMSubsectorAnalysisRemoveFromStat").removeClass("btn-default").addClass("btn-success");
                    }
                }
            };
            this.MWQMSubsectorAnalysisShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $("#TVItemListDiv").find(".MovingStats").hide();
                    $("#content").find(".TVItemAdd").hide();
                    $("#content").find(".list-group").hide();
                    $("#content").find(".MWQMSiteAnalysis").show();
                    $("#content").find(".MWQMSiteAnalysis").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    var SubsectorTVItemID = $bjs.closest("#ViewDiv").data("tvitemid");
                    var command_1 = "MWQM/_mwqmSubsectorAnalysis";
                    $.get(cssp.BaseURL + command_1, {
                        SubsectorTVItemID: SubsectorTVItemID
                    }).done(function (ret) {
                        if (ret) {
                            $("#content").find(".MWQMSiteAnalysis").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command_1);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $("#TVItemListDiv").find(".MovingStats").show();
                    $("#content").find(".TVItemAdd").show();
                    $("#content").find(".list-group").show();
                    $("#content").find(".MWQMSiteAnalysis").hide();
                }
            };
            this.MWQMSubsectorAnalysisShowHideColorAndLetterHelp = function ($bjs) {
                if ($(".jbMWQMSubsectorAnalysisShowHideColorAndLetterHelp").hasClass("btn-default")) {
                    $(".jbMWQMSubsectorAnalysisShowHideColorAndLetterHelp").removeClass("btn-default").addClass("btn-success");
                    $(".ColorAndLetterSchema").removeClass("hidden");
                }
                else {
                    $(".jbMWQMSubsectorAnalysisShowHideColorAndLetterHelp").removeClass("btn-success").addClass("btn-default");
                    $(".ColorAndLetterSchema").addClass("hidden");
                }
            };
            this.MWQMSubsectorAnalysisSamples = function (SiteCount) {
                var data = [];
                var Samples = -1;
                for (var i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                        if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                            data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC);
                        }
                    }
                }
                if (data.length > 0) {
                    Samples = data.length;
                }
                return Samples;
            };
            this.MWQMSubsectorAnalysisPercOver43 = function (ValRunList) {
                var ValRunResList = [];
                var ValRunLocalList = [];
                for (var _i = 0, ValRunList_1 = ValRunList; _i < ValRunList_1.length; _i++) {
                    var val = ValRunList_1[_i];
                    ValRunLocalList.push(val);
                }
                while (ValRunLocalList.length > 9) {
                    var PercOver43 = -1;
                    var dataOver43 = [];
                    for (var _a = 0, ValRunLocalList_1 = ValRunLocalList; _a < ValRunLocalList_1.length; _a++) {
                        var d = ValRunLocalList_1[_a];
                        if (d.val > 43) {
                            dataOver43.push(d.val);
                        }
                    }
                    PercOver43 = (dataOver43.length / ValRunLocalList.length) * 100;
                    ValRunResList.push(new CSSP.ValRun(PercOver43, ValRunLocalList[0].run));
                    ValRunLocalList.shift();
                }
                return ValRunResList;
            };
            this.MWQMSubsectorAnalysisPercOver260 = function (ValRunList) {
                var ValRunResList = [];
                var ValRunLocalList = [];
                for (var _i = 0, ValRunList_2 = ValRunList; _i < ValRunList_2.length; _i++) {
                    var val = ValRunList_2[_i];
                    ValRunLocalList.push(val);
                }
                while (ValRunLocalList.length > 9) {
                    var PercOver260 = -1;
                    var dataOver260 = [];
                    for (var _a = 0, ValRunLocalList_2 = ValRunLocalList; _a < ValRunLocalList_2.length; _a++) {
                        var d = ValRunLocalList_2[_a];
                        if (d.val > 260) {
                            dataOver260.push(d.val);
                        }
                    }
                    PercOver260 = (dataOver260.length / ValRunLocalList.length) * 100;
                    ValRunResList.push(new CSSP.ValRun(PercOver260, ValRunLocalList[0].run));
                    ValRunLocalList.shift();
                }
                return ValRunResList;
            };
            this.MWQMSubsectorAnalysisMinYear = function (SiteCount) {
                var data = [];
                var MinYear = 10000;
                for (var i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                        if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                            data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].SampleDate.getFullYear());
                        }
                    }
                }
                if (data.length > 0) {
                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                        var d = data_1[_i];
                        if (MinYear > d) {
                            MinYear = d;
                        }
                    }
                }
                else {
                    MinYear = -1;
                }
                return MinYear;
            };
            this.MWQMSubsectorAnalysisMaxYear = function (SiteCount) {
                var data = [];
                var MaxYear = 0;
                for (var i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                        if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                            data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].SampleDate.getFullYear());
                        }
                    }
                }
                if (data.length > 0) {
                    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                        var d = data_2[_i];
                        if (MaxYear < d) {
                            MaxYear = d;
                        }
                    }
                }
                else {
                    MaxYear = -1;
                }
                return MaxYear;
            };
            this.MWQMSubsectorAnalysisMaxFC = function (SiteCount) {
                var data = [];
                var MaxFC = 0;
                for (var i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                        if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                            data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC);
                        }
                    }
                }
                if (data.length > 0) {
                    for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                        var d = data_3[_i];
                        if (MaxFC < d) {
                            MaxFC = d;
                        }
                    }
                }
                else {
                    MaxFC = -1;
                }
                return MaxFC;
            };
            this.MWQMSubsectorAnalysisMinFC = function (SiteCount) {
                var data = [];
                var MinFC = 1000000;
                for (var i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                        if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                            data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC);
                        }
                    }
                }
                if (data.length > 0) {
                    for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
                        var d = data_4[_i];
                        if (MinFC > d) {
                            MinFC = d;
                        }
                    }
                }
                else {
                    MinFC = -1;
                }
                return MinFC;
            };
            this.MWQMSubsectorAnalysisGeometricMean = function (ValRunList) {
                var ValRunResList = [];
                var ValRunLocalList = [];
                for (var _i = 0, ValRunList_3 = ValRunList; _i < ValRunList_3.length; _i++) {
                    var val = ValRunList_3[_i];
                    ValRunLocalList.push(val);
                }
                while (ValRunLocalList.length > 9) {
                    var GMean = 0;
                    var prod = 0;
                    prod = 1.0;
                    for (var _a = 0, ValRunLocalList_3 = ValRunLocalList; _a < ValRunLocalList_3.length; _a++) {
                        var d = ValRunLocalList_3[_a];
                        prod *= d.val;
                    }
                    GMean = Math.pow(prod, (1.0 / ValRunLocalList.length));
                    ValRunResList.push(new CSSP.ValRun(GMean, ValRunLocalList[0].run));
                    ValRunLocalList.shift();
                }
                return ValRunResList;
            };
            this.MWQMSubsectorAnalysisGetColorAndLetter = function (P90, GeoMean, Median, PercOver43, PercOver260) {
                var colorAndLetter = new CSSP.ColorAndLetter("", "");
                if (!Median) {
                    return colorAndLetter;
                }
                if ((GeoMean > 88) || (Median > 88) || (P90 > 260) || (PercOver260 > 10)) {
                    if ((GeoMean > 181.33) || (Median > 181.33) || (P90 > 460.0) || (PercOver260 > 18.33)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgbluef", "F");
                    }
                    else if ((GeoMean > 162.67) || (Median > 162.67) || (P90 > 420.0) || (PercOver260 > 16.67)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgbluee", "E");
                    }
                    else if ((GeoMean > 144.0) || (Median > 144.0) || (P90 > 380.0) || (PercOver260 > 15.0)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgblued", "D");
                    }
                    else if ((GeoMean > 125.33) || (Median > 125.33) || (P90 > 340.0) || (PercOver260 > 13.33)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgbluec", "C");
                    }
                    else if ((GeoMean > 106.67) || (Median > 106.67) || (P90 > 300.0) || (PercOver260 > 11.67)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgblueb", "B");
                    }
                    else {
                        colorAndLetter = new CSSP.ColorAndLetter("bgbluea", "A");
                    }
                }
                else if ((GeoMean > 14) || (Median > 14) || (P90 > 43) || (PercOver43 > 10)) {
                    if ((GeoMean > 75.67) || (Median > 75.67) || (P90 > 223.83) || (PercOver43 > 26.67)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgredf", "F");
                    }
                    else if ((GeoMean > 63.33) || (Median > 63.33) || (P90 > 187.67) || (PercOver43 > 23.33)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgrede", "E");
                    }
                    else if ((GeoMean > 51.0) || (Median > 51.0) || (P90 > 151.5) || (PercOver43 > 20.0)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgredd", "D");
                    }
                    else if ((GeoMean > 38.67) || (Median > 38.67) || (P90 > 115.33) || (PercOver43 > 16.67)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgredc", "C");
                    }
                    else if ((GeoMean > 26.33) || (Median > 26.33) || (P90 > 79.17) || (PercOver43 > 13.33)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bgredb", "B");
                    }
                    else {
                        colorAndLetter = new CSSP.ColorAndLetter("bgreda", "A");
                    }
                }
                else {
                    if ((GeoMean > 11.67) || (Median > 11.67) || (P90 > 35.83) || (PercOver43 > 8.33)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bggreenf", "F");
                    }
                    else if ((GeoMean > 9.33) || (Median > 9.33) || (P90 > 28.67) || (PercOver43 > 6.67)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bggreene", "E");
                    }
                    else if ((GeoMean > 7.0) || (Median > 7.0) || (P90 > 21.5) || (PercOver43 > 5.0)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bggreend", "D");
                    }
                    else if ((GeoMean > 4.67) || (Median > 4.67) || (P90 > 14.33) || (PercOver43 > 3.33)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bggreenc", "C");
                    }
                    else if ((GeoMean > 2.33) || (Median > 2.33) || (P90 > 7.17) || (PercOver43 > 1.67)) {
                        colorAndLetter = new CSSP.ColorAndLetter("bggreenb", "B");
                    }
                    else {
                        colorAndLetter = new CSSP.ColorAndLetter("bggreena", "A");
                    }
                }
                return colorAndLetter;
            };
            this.MWQMSubsectorAnalysisGetMedian = function (ValRunList) {
                var ValRunResList = [];
                var ValRunLocalList = [];
                var ValRunForSortList = [];
                for (var _i = 0, ValRunList_4 = ValRunList; _i < ValRunList_4.length; _i++) {
                    var val = ValRunList_4[_i];
                    ValRunLocalList.push(val);
                    ValRunForSortList.push(val);
                }
                while (ValRunLocalList.length > 9) {
                    var median = -1;
                    var sortedData = ValRunForSortList.sort(function (n1, n2) { return n1.val - n2.val; });
                    var size = sortedData.length;
                    var mid = parseInt((size / 2).toString());
                    median = (size % 2 != 0) ? sortedData[mid].val : (sortedData[mid].val + sortedData[mid - 1].val) / 2;
                    ValRunResList.push(new CSSP.ValRun(median, ValRunLocalList[0].run));
                    ValRunLocalList.shift();
                }
                return ValRunResList;
            };
            this.MWQMSubsectorAnalysisGetP90 = function (ValRunList) {
                var ValRunResList = [];
                var ValRunLocalList = [];
                for (var _i = 0, ValRunList_5 = ValRunList; _i < ValRunList_5.length; _i++) {
                    var val = ValRunList_5[_i];
                    ValRunLocalList.push(val);
                }
                while (ValRunLocalList.length > 9) {
                    var P90 = -1.0;
                    var fcLogList = [];
                    for (var _a = 0, ValRunLocalList_4 = ValRunLocalList; _a < ValRunLocalList_4.length; _a++) {
                        var d = ValRunLocalList_4[_a];
                        fcLogList.push(Math.log(d.val) / Math.LN10);
                    }
                    var Average = 0.0;
                    var Sum = 0.0;
                    for (var _b = 0, fcLogList_1 = fcLogList; _b < fcLogList_1.length; _b++) {
                        var d = fcLogList_1[_b];
                        Sum += d;
                    }
                    Average = Sum / ValRunLocalList.length;
                    var SD = cssp.MWQMSite.MWQMSubsectorAnalysisGetStandardDeviation(fcLogList);
                    var P90Log = (SD * 1.28) + Average;
                    P90 = Math.pow(10, P90Log);
                    ValRunResList.push(new CSSP.ValRun(P90, ValRunLocalList[0].run));
                    ValRunLocalList.shift();
                }
                return ValRunResList;
            };
            this.MWQMSubsectorAnalysisGetStandardDeviation = function (fcList) {
                if (fcList.length == 0) {
                    return -1;
                }
                var avg = 0;
                var total = 0;
                for (var _i = 0, fcList_1 = fcList; _i < fcList_1.length; _i++) {
                    var d = fcList_1[_i];
                    total = total + d;
                }
                avg = total / fcList.length;
                var sum = 0;
                for (var _a = 0, fcList_2 = fcList; _a < fcList_2.length; _a++) {
                    var value = fcList_2[_a];
                    sum += (value - avg) * (value - avg);
                }
                return Math.sqrt((sum) / (fcList.length - 1));
            };
            this.RefreshChartsAfterOneSecond = function () {
                window.setTimeout(function () {
                    $(".jbMWQMSiteRefresh").trigger("click");
                }, 1000);
            };
            this.ShowHideEditButtons = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
                if ($bjs.hasClass("btn-default")) {
                    $tabContent.find(".jbMWQMSiteShowHideEditButtons").removeClass("btn-default").addClass("btn-success");
                    $tabContent.find(".jbMWQMSiteAdd").removeClass("hidden");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden");
                    cssp.View.ShowMoveTVItemButton($bjs);
                }
                else {
                    $tabContent.find(".jbMWQMSiteShowHideEditButtons").removeClass("btn-success").addClass("btn-default");
                    $tabContent.find(".jbMWQMSiteAdd").removeClass("hidden").addClass("hidden");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden").addClass("hidden");
                    cssp.TVItem.EditCancel($bjs);
                    cssp.View.HideMoveTVItemButton($bjs);
                }
            };
        }
        return MWQMSite;
    }());
    CSSP.MWQMSite = MWQMSite;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.MWQMSite.js.map