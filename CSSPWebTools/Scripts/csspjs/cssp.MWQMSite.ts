
module CSSP {
    export class MWQMSite {
        // variables
        public MWQMSiteByDate: boolean = true;
        public IsLog: boolean = false;
        public chartTable: google.visualization.Table;
        public TableView: google.visualization.DataView;
        public StatView: google.visualization.DataView;
        public SalTempView: google.visualization.DataView;
        public FCView: google.visualization.DataView;
        public data: any;
        public ChartHeight: number = 200;
        public ChartWidth: number = 600;
        public CurrentMovingAverage: number = 30;
        public CurrentShowStartYear: number = 1980;
        public AllRainChecked: boolean = false;
        public RainMissingText: string = "";

        // for subsector analysis
        public mwqmSubsectorAnalysisModel: MWQMSubsectorAnalysisModel = null;
        public MWQMRun$: JQuery = null; // $("#AnalysisTable").find("td.MWQMRun")
        public MWQMRainDay$: JQuery[] = [];
        public MWQMStartTide$: JQuery = null; // $("#AnalysisTable").find("td.StartTide")
        public MWQMEndTide$: JQuery = null; // $("#AnalysisTable").find("td.EndTide")
        public MWQMSite$: JQuery = null; // $("#AnalysisTable").find("td.MWQMSite")
        public MWQMSiteActive$: JQuery = null; // $("#AnalysisTable").find("td.MWQMSite").filter("[data-isactive='True']");
        public MWQMSamplesCount$: JQuery = null;  // $("#AnalysisTable").find("td.SamplesCount")
        public MWQMPeriod$: JQuery = null;  // $("#AnalysisTable").find("td.Period")
        public MWQMMinFC$: JQuery = null;  // $("#AnalysisTable").find("td.MinFC")
        public MWQMMaxFC$: JQuery = null;  // $("#AnalysisTable").find("td.MaxFC")
        public MWQMGMean$: JQuery = null;  // $("#AnalysisTable").find("td.GMean")
        public MWQMMedian$: JQuery = null;  // $("#AnalysisTable").find("td.Median")
        public MWQMP90$: JQuery = null;  // $("#AnalysisTable").find("td.P90")
        public MWQMPercOver43$: JQuery = null;  // $("#AnalysisTable").find("td.PercOver43")
        public MWQMPercOver260$: JQuery = null;  // $("#AnalysisTable").find("td.PercOver260")
        public MWQMColorAndLetter$: JQuery = null;  // $("#AnalysisTable").find("td.ColorAndLetter")
        public MWQMSampleList$: JQuery[] = []; // loop $("#AnalysisTable").find("td.MWQMSample[data-sitecount='" + i + "']")
        public StopRecalculation: boolean = false;
        // Constructors
        constructor() {
        }

        // Functions
        public AskToRemoveMWQMAnalysisReportParameter: Function = ($bjs: JQuery): void => {
            var AnalysisName: string = $bjs.closest(".MWQMAnalysisReportParameter").find(".AnalysisName").text();
            var AnalysisReportYear: string = $bjs.closest(".MWQMAnalysisReportParameter").find(".AnalysisReportYear").text();
            var Command: string = $bjs.closest(".MWQMAnalysisReportParameter").find(".Command").text();
            if (Command == "Report") {
                cssp.Dialog.ShowDialogAreYouSure("[" + AnalysisReportYear + "] - " + AnalysisName);
            }
            else {
                cssp.Dialog.ShowDialogAreYouSure("[Excel] - " + AnalysisName);
            }
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MWQMSite.SetDialogEvents", $bjs);
        };
        public SetDialogEvents: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    cssp.MWQMSite.MWQMSubsectorAnalysisReportParameterOrExcelDelete($bjs);
                });
            });
        };
        public MWQMSiteFileDownload: Function = ($bjs: JQuery): void => {
            var TVFileTVItemID: string = $bjs.data("tvfiletvitemid");
            window.document.location.href = cssp.BaseURL + "File/FileDownload?TVFileTVItemID=" + TVFileTVItemID;
        };
        public AfterLoadParameter: Function = (): void => {
            $("select[name='MWQMAnalysisReportParameterSaveCreateOrExportToExcel']").off("change");
            $("select[name='MWQMAnalysisReportParameterSaveCreateOrExportToExcel']").on("change", () => {
                let value: string = $("select[name='MWQMAnalysisReportParameterSaveCreateOrExportToExcel']").val();
                if (value == "Empty") {
                    let MWQMAnalysisReportParameterID: number = 0;
                    $(".InputAnalysisNameDiv").removeClass("hidden").addClass("hidden");
                    $(".jbMWQMSubsectorAnalysisSaveCreateOrExportToExcel").removeClass("hidden").addClass("hidden");
                    cssp.MWQMSite.ShowOnlyTheSelectedMWQMAnalysisReportParameter(MWQMAnalysisReportParameterID);
                }
                else if (value == "Save" || value == "Export") {
                    let MWQMAnalysisReportParameterID: number = 0;
                    $(".InputAnalysisNameDiv").removeClass("hidden");
                    $("button.jbMWQMSubsectorAnalysisSaveCreateOrExportToExcel").removeClass("hidden");
                    if (value == "Save") {
                        $(".jbMWQMSubsectorAnalysisSaveCreateOrExportToExcel").html(cssp.GetHTMLVariable("#LayoutVariables", "varSaveForReport"));
                        $(".InputAnalysisNameDiv").find("label.InputAnalysisName").html(cssp.GetHTMLVariable("#LayoutVariables", "varNewAnalysisName"));
                        $(".AnalysisReportYearDiv").removeClass("hidden");
                    }
                    else {
                        $(".jbMWQMSubsectorAnalysisSaveCreateOrExportToExcel").html(cssp.GetHTMLVariable("#LayoutVariables", "varExportToExcelDocument"));
                        $(".InputAnalysisNameDiv").find("label.InputAnalysisName").html(cssp.GetHTMLVariable("#LayoutVariables", "varNewExcelFileName"));
                        $(".AnalysisReportYearDiv").removeClass("hidden").addClass("hidden");
                    }
                    cssp.MWQMSite.ShowOnlyTheSelectedMWQMAnalysisReportParameter(MWQMAnalysisReportParameterID);
                }
                else if (value.substring(0, 4) == "View") {
                    let MWQMAnalysisReportParameterID: number = parseInt(value.replace("View_", ""));
                    let TextShown: string = $("select[name='MWQMAnalysisReportParameterSaveCreateOrExportToExcel']").text();
                    if (TextShown.substring(TextShown.length - 7) == "[Excel]") {
                        $(".jbMWQMSubsectorAnalysisReportParameterOrExcelDelete").html(cssp.GetHTMLVariable("#LayoutVariables", "varDeleteExcelDocument"));
                    }
                    else {
                        $(".jbMWQMSubsectorAnalysisReportParameterOrExcelDelete").html(cssp.GetHTMLVariable("#LayoutVariables", "varDeleteAnalysis"));
                    }
                    $(".jbMWQMSubsectorAnalysisSaveCreateOrExportToExcel").html(cssp.GetHTMLVariable("#LayoutVariables", "varView"));
                    $(".InputAnalysisNameDiv").removeClass("hidden").addClass("hidden");
                    cssp.MWQMSite.ShowOnlyTheSelectedMWQMAnalysisReportParameter(MWQMAnalysisReportParameterID);
                }
                else {
                    cssp.Dialog.ShowDialogError("value should be one of Save, Export or start with View. It is [" + value + "]");
                }
            });
        };
        public ShowOnlyTheSelectedMWQMAnalysisReportParameter: Function = (MWQMAnalysisReportParameterID: number): void => {
            $(".MWQMAnalysisReportParameter").each((ind: number, elem: Element) => {
                let id: number = parseInt($(elem).data("parameterid"));
                if (id == MWQMAnalysisReportParameterID) {
                    $(elem).removeClass("hidden");
                    let RunsToOmitText: string = $(elem).find(".RunsToOmit").text();
                    let RunsIDs: string[] = RunsToOmitText.split(",");
                    RunsToOmitText = "";
                    for (let i = 0, count = RunsIDs.length; i < count; i++) {
                        if (RunsIDs[i].length > 0) {
                            RunsToOmitText = RunsToOmitText + "<span>" + $("#AnalysisTable").find("td.MWQMRun[data-runid='" + RunsIDs[i].trim() + "']").eq(0).data("date") + "&nbsp;&nbsp;&nbsp;</span>";
                        }
                    }
                    if (RunsToOmitText.length > 0) {
                        $(elem).find(".RunsToOmitShowDates").html(cssp.GetHTMLVariable("#LayoutVariables", "varRunsOmitted") + " : " + RunsToOmitText);
                    }

                }
                else {
                    if (!$(elem).hasClass("hidden")) {
                        $(elem).addClass("hidden");
                        $(elem).find(".RunsToOmitShowDates").html("");
                    }
                }
            });
        };
        public MWQMSubsectorAnalysisReportParameterOrExcelDelete: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let MWQMAnalysisReportParameterID: number = parseInt($bjs.closest(".MWQMAnalysisReportParameter").data("parameterid"));
            let command: string = "MWQM/PostDeleteMWQMAnalysisReportParameterJSON";
            $.post(cssp.BaseURL + command,
                {
                    MWQMAnalysisReportParameterID: MWQMAnalysisReportParameterID
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varDeleted"));
                        cssp.MWQMSite.ReloadAnalysisReportParameter();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MWQMSubsectorAnalysisReportParameterOrExcelLoad: Function = ($bjs: JQuery): void => {
            cssp.Dialog.ShowDialogMessage("Not implemented yet...")
            return;
            //cssp.MWQMSite.StopRecalculation = true;
            //$(".jbMWQMSubsectorAnalysisRemoveFromStat").each((ind: number, elem: Element) => {
            //    if ($(elem).hasClass("btn-danger")) {
            //        $(elem).removeClass("btn-danger")
            //    }
            //});
            //$("select.MWQMSubsectorAnalysisStartDate").val($bjs.closest(".MWQMAnalysisReportParameter").find(".StartDate").data("startdate"));
            //$("select.MWQMSubsectorAnalysisEndDate").val($bjs.closest(".MWQMAnalysisReportParameter").find(".EndDate").data("enddate"));
            //$("select.MWQMSubsectorAnalysisRuns").val($bjs.closest(".MWQMAnalysisReportParameter").find(".NumberOfRuns").data("numberofruns"));
            //$("select.MWQMSubsectorAnalysisCalculateType").val($bjs.closest(".MWQMAnalysisReportParameter").find(".AnalysisCalculationType").data("analysiscalculationtype"));
            //$("select.MWQMSubsectorAnalysisHighlightSalinityDeviationFromAverage").val($bjs.closest(".MWQMAnalysisReportParameter").find(".SalinityHighlightDeviationFromAverage").data("salinityhighlightdeviationfromaverage"));
            //$("select[name='UpperRainLimitStillConsideredDry1']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".DryLimit24h").data("drylimit24h"));
            //$("select[name='UpperRainLimitStillConsideredDry2']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".DryLimit48h").data("drylimit48h"));
            //$("select[name='UpperRainLimitStillConsideredDry3']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".DryLimit72h").data("drylimit72h"));
            //$("select[name='UpperRainLimitStillConsideredDry4']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".DryLimit96h").data("drylimit96h"));
            //$("select[name='UpperRainLimitStillConsideredWet1']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".WetLimit24h").data("wetlimit24h"));
            //$("select[name='UpperRainLimitStillConsideredWet2']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".WetLimit48h").data("wetlimit48h"));
            //$("select[name='UpperRainLimitStillConsideredWet3']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".WetLimit72h").data("wetlimit72h"));
            //$("select[name='UpperRainLimitStillConsideredWet4']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".WetLimit96h").data("wetlimit96h"));
            //if ($bjs.closest(".MWQMAnalysisReportParameter").find(".FullYear").data("fullyear") == "True") {
            //    $("input.SelectFullYear").attr("checked", "checked");
            //}
            //else {
            //    $("input.SelectFullYear").attr("checked", "");
            //}
            //$("input[name='ShortRange']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".ShortRangeNumberOfDays").data("shortrangenumberofdays"));
            //$("input[name='ShortRange']").val($bjs.closest(".MWQMAnalysisReportParameter").find(".MidRangeNumberOfDays").data("midrangenumberofdays"));
            //let allRunsToOmit: string = $(".RunsToOmit").data("runstoomit");
            //let RunsToOmitList: string[] = allRunsToOmit.split(",");
            //for (let i = 0, count = RunsToOmitList.length; i < count; i++)
            //{
            //    if (RunsToOmitList[i].length > 0) {
            //        $("td.MWQMRun").each((int: number, elem: Element) => {
            //            if ($(elem).data("runid") == RunsToOmitList[i]) {
            //                $(elem).find("button.jbMWQMSubsectorAnalysisRemoveFromStat").eq(0).removeClass("btn-success").removeClass("btn-default").addClass("btn-danger");
            //                return;
            //            }
            //        })
            //    }
            //}
            //$("input.MWQMAnalysisTableDataType[name='DataTypeTemp']").removeAttr("checked");
            //$("input.MWQMAnalysisTableDataType[name='DataTypeSal']").removeAttr("checked");
            //$("input.MWQMAnalysisTableDataType[name='DataTypeP90']").removeAttr("checked");
            //$("input.MWQMAnalysisTableDataType[name='DataTypeGM']").removeAttr("checked");
            //$("input.MWQMAnalysisTableDataType[name='DataTypeMed']").removeAttr("checked");
            //$("input.MWQMAnalysisTableDataType[name='DataTypeP43']").removeAttr("checked");
            //$("input.MWQMAnalysisTableDataType[name='DataTypeP260']").removeAttr("checked");

            //let ShowDataTypes: string = $bjs.closest(".MWQMAnalysisReportParameter").find(".ShowDataTypes").data("showdatatypes");
            //let ShowDataTypeList: string[] = ShowDataTypes.split(",");
            //for (let i = 0, count = ShowDataTypeList.length; i < count; i++) {
            //    if (ShowDataTypeList[i].length > 0) {
            //        if (ShowDataTypeList[i] == "2") {
            //            $("input.MWQMAnalysisTableDataType[name='DataTypeTemp']").attr("checked", "checked");
            //        }
            //        if (ShowDataTypeList[i] == "3") {
            //            $("input.MWQMAnalysisTableDataType[name='DataTypeSal']").attr("checked", "checked");
            //        }
            //        if (ShowDataTypeList[i] == "4") {
            //            $("input.MWQMAnalysisTableDataType[name='DataTypeP90']").attr("checked", "checked");
            //        }
            //        if (ShowDataTypeList[i] == "5") {
            //            $("input.MWQMAnalysisTableDataType[name='DataTypeGM']").attr("checked", "checked");
            //        }
            //        if (ShowDataTypeList[i] == "6") {
            //            $("input.MWQMAnalysisTableDataType[name='DataTypeMed']").attr("checked", "checked");
            //        }
            //        if (ShowDataTypeList[i] == "7") {
            //            $("input.MWQMAnalysisTableDataType[name='DataTypeP43']").attr("checked", "checked");
            //        }
            //        if (ShowDataTypeList[i] == "8") {
            //            $("input.MWQMAnalysisTableDataType[name='DataTypeP260']").attr("checked", "checked");
            //        }
            //    }
            //}
            //cssp.MWQMSite.StopRecalculation = false;
            //window.setTimeout(() => {
            //    cssp.MWQMSite.MWQMSubsectorAnalysisFillJQueryVariables();
            //    cssp.MWQMSite.MWQMSubsectorAnalysisLoadVariables();
            //    cssp.MWQMSite.MWQMSubsectorAnalysisRecalculate();
            //    cssp.MWQMSite.MWQMSubsectorAnalysisShortRangeChanged();
            //    cssp.MWQMSite.MWQMSubsectorAnalysisMidRangeChanged();
            //}, 100);

        };
        public MWQMSubsectorAnalysisSaveCreateOrExportToExcel: Function = ($bjs: JQuery): void => {
            let value = $bjs.closest(".MWQMAnalysisReportParameterTopDiv").find("select[name='MWQMAnalysisReportParameterSaveCreateOrExportToExcel']").val();
            let MWQMAnalysisReportParameterID = parseInt(value);

            if (value == "Export" || value == "Save") {
                // need to collect all information to send to 
                let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                let AnalysisName: string = $("input[name='InputAnalysisName']").val();
                if (!AnalysisName) {
                    cssp.Dialog.ShowDialogError(cssp.GetHTMLVariable("#LayoutVariables", "varAnalysisNameRequired"));
                }
                let AnalysisReportYear: string = $("select[name='AnalysisReportYear']").val();
                let StartDate = $("select.MWQMSubsectorAnalysisStartDate").val();
                let EndDate = $("select.MWQMSubsectorAnalysisEndDate").val();
                let AnalysisCalculationType = $("select.MWQMSubsectorAnalysisCalculateType").val();
                let NumberOfRuns = $("select.MWQMSubsectorAnalysisRuns").val();
                let FullYear = $("input.SelectFullYear").is(":Checked") ? true : false;
                let SalinityHighlightDeviationFromAverage = $("select.MWQMSubsectorAnalysisHighlightSalinityDeviationFromAverage").val();
                let ShortRangeNumberOfDays = $("input[name='ShortRange']:checked").val();
                let MidRangeNumberOfDays = $("input[name='MidRange']:checked").val();
                let DryLimit24h = $("select[name='UpperRainLimitStillConsideredDry1']").val();
                let DryLimit48h = $("select[name='UpperRainLimitStillConsideredDry2']").val();
                let DryLimit72h = $("select[name='UpperRainLimitStillConsideredDry3']").val();
                let DryLimit96h = $("select[name='UpperRainLimitStillConsideredDry4']").val();
                let WetLimit24h = $("select[name='LowerRainLimitConsideredRain1']").val();
                let WetLimit48h = $("select[name='LowerRainLimitConsideredRain2']").val();
                let WetLimit72h = $("select[name='LowerRainLimitConsideredRain3']").val();
                let WetLimit96h = $("select[name='LowerRainLimitConsideredRain4']").val();
                let RunsToOmit = ",";
                $(".jbMWQMSubsectorAnalysisRemoveFromStat").each((ind: number, elem: Element) => {
                    if ($(elem).hasClass("btn-danger")) {
                        RunsToOmit = RunsToOmit + $(elem).closest("td.MWQMRun").data("runid") + ",";
                    }
                });
                let ShowDataTypes = ",";
                ShowDataTypes = ShowDataTypes + ($("input.MWQMAnalysisTableDataType[name='DataTypeFC']").is(":checked") ? "1," /* FC */ : "");
                ShowDataTypes = ShowDataTypes + ($("input.MWQMAnalysisTableDataType[name='DataTypeTemp']").is(":checked") ? "2," /* Temperature */ : "");
                ShowDataTypes = ShowDataTypes + ($("input.MWQMAnalysisTableDataType[name='DataTypeSal']").is(":checked") ? "3," /* Salinity */ : "");
                ShowDataTypes = ShowDataTypes + ($("input.MWQMAnalysisTableDataType[name='DataTypeP90']").is(":checked") ? "4," /* P90 */ : "");
                ShowDataTypes = ShowDataTypes + ($("input.MWQMAnalysisTableDataType[name='DataTypeGM']").is(":checked") ? "5," /* Geometric Mean */ : "");
                ShowDataTypes = ShowDataTypes + ($("input.MWQMAnalysisTableDataType[name='DataTypeMed']").is(":checked") ? "6," /* Median */ : "");
                ShowDataTypes = ShowDataTypes + ($("input.MWQMAnalysisTableDataType[name='DataTypeP43']").is(":checked") ? "7," /* % of P90 > 43 */ : "");
                ShowDataTypes = ShowDataTypes + ($("input.MWQMAnalysisTableDataType[name='DataTypeP260']").is(":checked") ? "8," /* % of P90 > 260 */ : "");
                let Command = (value == "Save" ? 1 /* Report */ : 2 /* Excel */);
                let command: string = "MWQM/PostAddFormMWQMAnalysisReportParameterJSON";
                $.post(cssp.BaseURL + command,
                    {
                        SubsectorTVItemID: SubsectorTVItemID,
                        AnalysisName: AnalysisName,
                        AnalysisReportYear: AnalysisReportYear,
                        StartDate: StartDate,
                        EndDate: EndDate,
                        AnalysisCalculationType: AnalysisCalculationType,
                        NumberOfRuns: NumberOfRuns,
                        FullYear: FullYear,
                        SalinityHighlightDeviationFromAverage: SalinityHighlightDeviationFromAverage,
                        ShortRangeNumberOfDays: ShortRangeNumberOfDays,
                        MidRangeNumberOfDays: MidRangeNumberOfDays,
                        DryLimit24h: DryLimit24h,
                        DryLimit48h: DryLimit48h,
                        DryLimit72h: DryLimit72h,
                        DryLimit96h: DryLimit96h,
                        WetLimit24h: WetLimit24h,
                        WetLimit48h: WetLimit48h,
                        WetLimit72h: WetLimit72h,
                        WetLimit96h: WetLimit96h,
                        RunsToOmit: RunsToOmit,
                        ShowDataTypes: ShowDataTypes,
                        Command: Command
                    }).done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSaved"));
                            cssp.MWQMSite.ReloadAnalysisReportParameter();
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            //else if (value == "View") {
            //    cssp.Dialog.ShowDialogMessage("Export to Excel not implemented yet");
            //    return;
            //}
            else {
                let MWQMAnalysisReportParameterID: number = parseInt(value);
                $(".jbMWQMSubsectorAnalysisSaveCreateOrExportToExcel").html(cssp.GetHTMLVariable("#LayoutVariables", "varView"));
                $(".InputAnalysisNameDiv").removeClass("hidden").addClass("hidden");
            }
        };
        public ReloadAnalysisReportParameter: Function = (): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let command: string = "MWQM/_mwqmAnalysisReportParameter";
            $.get(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID
                }).done((ret) => {
                    $(".MWQMAnalysisReportParameterTopDiv").html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public AfterLoadUpdate: Function = (objName: string): void => {
            var objNameList: Array<string> = ["MWQMSiteData", "MWQMSiteCharts", "MWQMSiteOtherMWQMSites"];
            for (var i = 0, count = objNameList.length; i < count; i++) {
                var $obj: JQuery = $(".jb" + objNameList[i] + "Load");
                if ($obj.hasClass("btn-success")) {
                    $obj.removeClass("btn-success").addClass("btn-default");
                }

                var $objID: JQuery = $("#" + objNameList[i] + "ID");
                if (!$objID.hasClass("hidden")) {
                    $objID.addClass("hidden");
                }
            }
            for (var i = 0, count = objNameList.length; i < count; i++) {
                if (objName == objNameList[i]) {
                    var $obj: JQuery = $(".jb" + objName + "Load");
                    $obj.removeClass("btn-default").addClass("btn-success");
                    var $objID: JQuery = $("#" + objNameList[i] + "ID");
                    $objID.removeClass("hidden");
                }
            }
            if ("MWQMSiteCharts" == objName) {
                $("select[name='MWQMSiteStartYear']").val(cssp.MWQMSite.CurrentShowStartYear.toString());
                $("select[name='MovingAverage']").val(cssp.MWQMSite.CurrentMovingAverage.toString());

                $("select[name='MWQMSiteStartYear']").off("change");
                $("select[name='MWQMSiteStartYear']").on("change", () => {
                    cssp.MWQMSite.CurrentShowStartYear = parseInt($("select[name='MWQMSiteStartYear']").val());
                    cssp.MWQMSite.DrawCharts();
                });

                $("select[name='MovingAverage']").off("change");
                $("select[name='MovingAverage']").on("change", () => {
                    cssp.MWQMSite.CurrentMovingAverage = parseInt($("select[name='MovingAverage']").val());
                    cssp.MWQMSite.LoadData();
                });

                $("#MWQMSiteChartProp").find("input[name='MWQMSiteByDate']").off("change");
                $("#MWQMSiteChartProp").find("input[name='MWQMSiteByDate']").on("change", (evt: Event) => {
                    if ($(evt.target).val() == "1") {
                        cssp.MWQMSite.MWQMSiteByDate = true;
                    }
                    else {
                        cssp.MWQMSite.MWQMSiteByDate = false;
                    }
                    cssp.MWQMSite.DrawCharts();
                });

                $("#MWQMSiteChartProp").find("input[name='MWQMSiteLog']").off("change");
                $("#MWQMSiteChartProp").find("input[name='MWQMSiteLog']").on("change", (evt: Event) => {
                    if ($(evt.target).val() == "1") {
                        cssp.MWQMSite.IsLog = true;
                    }
                    else {
                        cssp.MWQMSite.IsLog = false;
                    }
                    cssp.MWQMSite.DrawCharts();
                });

                setTimeout(() => {
                    cssp.MWQMSite.MWQMShowHideOnMap(true);
                    if ("MWQMSiteCharts" == objName) {
                        cssp.MWQMSite.ChartWidth = $("#MWQMCharts").width();
                        cssp.MWQMSite.DrawCharts();
                    }
                }, 1000);

            }
            else if ("MWQMSiteData" == objName) {
                $("#MWQMSiteDataID").find("input").off("change");
                $("#MWQMSiteDataID").find("input").on("change", () => {
                    var ColArr: Array<number> = [0, 1, 2];
                    $("#MWQMSiteDataID").find("input").each((ind: number, elem: Element) => {
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
        public ChartBiggerHeight: Function = (): void => {
            cssp.MWQMSite.ChartHeight = cssp.MWQMSite.ChartHeight + 100;
            cssp.MWQMSite.DrawCharts();
        };
        public ChartSmallerHeight: Function = (): void => {
            cssp.MWQMSite.ChartHeight = cssp.MWQMSite.ChartHeight - 100;
            if (cssp.MWQMSite.ChartHeight < 200) {
                cssp.MWQMSite.ChartHeight = 200;
            }
            cssp.MWQMSite.DrawCharts();
        };
        public ChartBiggerWidth: Function = (): void => {
            cssp.MWQMSite.ChartWidth = cssp.MWQMSite.ChartWidth + 100;
            cssp.MWQMSite.DrawCharts();
        };
        public ChartSmallerWidth: Function = (): void => {
            cssp.MWQMSite.ChartWidth = cssp.MWQMSite.ChartWidth - 100;
            if (cssp.MWQMSite.ChartWidth < 400) {
                cssp.MWQMSite.ChartWidth = 400;
            }
            cssp.MWQMSite.DrawCharts();
        };
        public DrawCharts: Function = (): void => {
            var tdataFC: google.visualization.DataTable = new google.visualization.DataTable();
            var tdataSalTemp: google.visualization.DataTable = new google.visualization.DataTable();
            var tdataStat: google.visualization.DataTable = new google.visualization.DataTable();

            var SampleDate: string = cssp.GetHTMLVariable("#MWQMSiteVariables", "varSampleDate");
            var NumberOfSample: string = cssp.GetHTMLVariable("#MWQMSiteVariables", "varNumberOfSample");
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

            var ShowChartFromYear: number = parseInt($("select[name='MWQMSiteStartYear']").val());
            cssp.MWQMSite.StatView.setRows(tdataStat.getFilteredRows([{ column: 0, minValue: new Date(ShowChartFromYear, 0, 1) }]));

            var chartAvg: google.visualization.LineChart = new google.visualization.LineChart($('#MWQMSiteChartStatID')[0]);
            chartAvg.draw(cssp.MWQMSite.StatView, {
                hAxis: { title: hAxisTitle, titleTextStyle: { bold: false, italic: false } },
                vAxis: { logScale: cssp.MWQMSite.IsLog },
                pointSize: 4,
                legend: { position: 'top', maxLines: 2 },
                colors: ['#008000', '#6B8E23', '#32CD32', '#ADFF2F', "#8B0000", "#DC143C", "#FF4500", '#FF8C00'],
                width: cssp.MWQMSite.ChartWidth,
                height: cssp.MWQMSite.ChartHeight,

            });

            google.visualization.events.addListener(chartAvg, "select", () => {
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

            this.FCView.setRows(tdataFC.getFilteredRows([{ column: 0, minValue: new Date(ShowChartFromYear, 0, 1) }]));

            var chartFC: google.visualization.ScatterChart = new google.visualization.ScatterChart($('#MWQMSiteChartFCID')[0]);
            chartFC.draw(cssp.MWQMSite.FCView, {
                hAxis: { title: hAxisTitle, titleTextStyle: { bold: false, italic: false } },
                vAxis: { logScale: cssp.MWQMSite.IsLog },
                pointSize: 4,
                legend: { position: 'top' },
                colors: ['#00ff00', "#ff0000"],
                width: cssp.MWQMSite.ChartWidth,
                height: cssp.MWQMSite.ChartHeight,
            });

            google.visualization.events.addListener(chartFC, "select", () => {
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

            var chartSalTemp: google.visualization.ScatterChart = new google.visualization.ScatterChart($('#MWQMSiteChartSalTempID')[0]);
            chartSalTemp.draw(cssp.MWQMSite.SalTempView, {
                hAxis: { title: hAxisTitle, titleTextStyle: { bold: false, italic: false } },
                vAxis: { logScale: cssp.MWQMSite.IsLog },
                pointSize: 4,
                legend: { position: 'top' },
                colors: ['#008080', '#8B008B'],
                width: cssp.MWQMSite.ChartWidth,
                height: cssp.MWQMSite.ChartHeight,
            });

            google.visualization.events.addListener(chartSalTemp, "select", () => {
                if (cssp.MWQMSite.MWQMSiteByDate) {
                    var RunDate = cssp.MWQMSite.SalTempView.getValue(chartSalTemp.getSelection()[0].row, 0);
                    cssp.MWQMSite.GetMWQMRunTVItemIDWithDate(RunDate);
                }
            });


        };
        public DrawTable: Function = (): void => {
            var tdataTable = new google.visualization.DataTable();

            var SampleDate: string = cssp.GetHTMLVariable("#MWQMSiteVariables", "varSampleDate");
            var NumberOfSample: string = cssp.GetHTMLVariable("#MWQMSiteVariables", "varNumberOfSample");
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
                var CurrDate: Date = new Date(parseInt(cssp.MWQMSite.data[i].SampleDate.substr(6)));
                var Year: number = CurrDate.getFullYear();
                var Month: number = CurrDate.getMonth() + 1;
                var Day: number = CurrDate.getDate();
                var TVPath: string = $("#MWQMSiteDiv").first().find(".jbTVItemDiv").first().find(".jbTVPath").first().text();
                var TVPathParent = TVPath.substr(0, TVPath.lastIndexOf("p"));
                var style: string = "";
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

            google.visualization.events.addListener(chartTable, "select", () => {
                var RunDate = cssp.MWQMSite.TableView.getValue(chartTable.getSelection()[0].row, 1);
                cssp.MWQMSite.GetMWQMRunTVItemIDWithDate(RunDate);
            });
        };
        public GetMWQMRunTVItemIDWithDate: Function = (RunDate: Date): void => {
            var MWQMSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var Year: number = RunDate.getFullYear();
            var Month: number = RunDate.getMonth() + 1;
            var Day: number = RunDate.getDate();
            var command: string = "MWQM/GetMWQMRunTVItemIDWithMWQMSiteTVItemIDAndRunDateJSON";
            $.post(cssp.BaseURL + command, {
                MWQMSiteTVItemID: MWQMSiteTVItemID,
                Year: Year,
                Month: Month,
                Day: Day,
            }).done((ret) => {
                if (ret) {
                    var MWQMTVItemID: number = parseInt(ret);
                    if (MWQMTVItemID != 0) {
                        document.location.href = document.location.href.replace(cssp.Variables.TVItemIDList[0].toString(), MWQMTVItemID.toString());
                    }
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public Init: Function = (MWQMSiteTVItemID: number): void => {
            cssp.MWQMSite.LoadData(MWQMSiteTVItemID);
        };
        public InitEdit: Function = (): void => {
            $("#MWQMSiteAddOrModifyForm").each((ind: any, elem: Element) => {
                $(elem).validate(
                    {
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
        public InitOtherMWQMSites: Function = (): void => {
            if ($(".GlobeIcon").hasClass("btn-success")) {
                $(".jbMapShowItem").removeClass("hidden");
            }
            else {
                $(".jbMapShowItem").removeClass("hidden").addClass("hidden");
            }
        };
        public LoadData: Function = (): void => {
            var MWQMSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var MovingAverage: number = parseInt($("a.numberofsample").data("numberofsample"));
            var command: string = "MWQM/MWQMSiteSampleMovingAverageStatJSON";

            $.get(cssp.BaseURL + command, {
                MWQMSiteTVItemID: MWQMSiteTVItemID,
                MovingAverage: MovingAverage,
            }).done((ret) => {
                cssp.MWQMSite.data = ret;
                cssp.MWQMSite.LoadMWQMSiteTable();
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public LoadOtherMWQMSites: Function = (): void => {
            if ($("#MWQMSiteOtherMWQMSitesID").children().length == 0) {
                var MWQMSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                var command: string = "MWQM/_otherMWQMSites";
                $.get(cssp.BaseURL + command, {
                    Q: "!View/" + cssp.Variables.URL,
                }).done((ret) => {
                    $("#MWQMSiteOtherMWQMSitesID").html(ret);
                    cssp.MWQMSite.AfterLoadUpdate("MWQMSiteOtherMWQMSites");
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.MWQMSite.AfterLoadUpdate("MWQMSiteOtherMWQMSites");
            }
        };
        public LoadMWQMSiteTable: Function = (): void => {
            if ($("#MWQMSiteDataID").children().length == 0) {
                var MWQMSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                var command: string = "MWQM/_mwqmSiteTable";
                $.get(cssp.BaseURL + command, {
                    MWQMSiteTVItemID: MWQMSiteTVItemID,
                }).done((ret) => {
                    $("#MWQMSiteDataID").html(ret);
                    cssp.MWQMSite.AfterLoadUpdate("MWQMSiteData");
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.MWQMSite.AfterLoadUpdate("MWQMSiteData");
            }
        };
        public LoadMWQMSiteCharts: Function = (): void => {
            if ($("#MWQMSiteChartsID").children().length == 0) {
                var MWQMSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                var command: string = "MWQM/_mwqmSiteCharts";
                $.get(cssp.BaseURL + command, {
                    MWQMSiteTVItemID: MWQMSiteTVItemID,
                }).done((ret) => {
                    $("#MWQMSiteChartsID").html(ret);
                    cssp.MWQMSite.AfterLoadUpdate("MWQMSiteCharts");
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.MWQMSite.AfterLoadUpdate("MWQMSiteCharts");
            }
        };
        public MWQMSiteEdit: Function = ($bjs: JQuery): void => {
            if ($(".jbMWQMSiteEdit").hasClass("btn-default")) {
                $("#MWQMSiteAddOrModifyDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $(".jbMWQMSiteEdit").removeClass("btn-default").addClass("btn-success");
                var SubsectorTVItemID: number = parseInt($("#MWQMSiteDiv").data("subsectortvitemid"));
                var MWQMSiteTVItemID: number = parseInt($("#MWQMSiteDiv").data("mwqmsitetvitemid"));
                var command: string = "MWQM/_mwqmSiteAddOrModify";
                $.get(cssp.BaseURL + command,
                    {
                        SubsectorTVItemID: SubsectorTVItemID,
                        MWQMSiteTVItemID: MWQMSiteTVItemID,
                    })
                    .done((ret: string) => {
                        $("#MWQMSiteAddOrModifyDiv").html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $(".jbMWQMSiteEdit").removeClass("btn-success").addClass("btn-default");
                $("#MWQMSiteAddOrModifyDiv").html("");
            }
        };
        public MWQMSiteEditSave: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("#MWQMSiteAddOrModifyForm");
            if ($form.length === 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#MWQMSiteAddOrModifyForm", "MWQMSiteTopEditDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                if (cssp.CheckInputWithNumbers()) {
                    cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                    return;
                }
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public MWQMSiteInfoShowHide: Function = ($ajs: JQuery): void => {
            if ($ajs.closest("li").find(".MWQMSiteDiv").children().length > 0) {
                $ajs.closest("li").find(".MWQMSiteDiv").html("");
                $ajs.removeClass("btn-success").addClass("btn-default");
            }
            else {
                $(".MWQMSiteDiv").html("");
                var MWQMSiteTVItemID: number = parseInt($ajs.closest("li").data("tvitemid"));
                var command: string = "MWQM/_mwqmSite";
                $.get(cssp.BaseURL + command, {
                    MWQMSiteTVItemID: MWQMSiteTVItemID,
                }).done((ret) => {
                    $ajs.closest("li").find(".MWQMSiteDiv").html(ret);
                    $ajs.removeClass("btn-default").addClass("btn-success");
                })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public MWQMSiteAddOrModifyShowHide: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = 0;
            let MWQMSiteTVItemID: number = 0;
            let ShouldOpen: boolean = $bjs.hasClass("btn-default");

            let $tabContent: JQuery = $bjs.closest(".tab-content");

            $tabContent.find(".TVItemAdd").html("");
            $tabContent.find(".TVItemModify").html("");
            $(".jbMWQMSiteAdd").removeClass("btn-success").addClass("btn-default");
            $(".jbMWQMSiteModifyShowHide").removeClass("btn-success").addClass("btn-default");

            var $TVItemEdit: JQuery = $tabContent.find(".TVItemAdd");

            var $ViewDiv: JQuery = $bjs.closest("#ViewDiv");
            if ($ViewDiv) {
                SubsectorTVItemID = $ViewDiv.data("tvitemid");
            }

            var $ParentLi: JQuery = $bjs.closest("li");
            if (!$bjs.hasClass("jbMWQMSiteAdd")) {
                if ($ParentLi.length > 0) {
                    MWQMSiteTVItemID = parseInt($ParentLi.data("tvitemid"));
                    $TVItemEdit = $ParentLi.find(".TVItemModify");
                }
            }
            if (ShouldOpen) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                var command: string = "MWQM/_mwqmSiteAddOrModify";
                $TVItemEdit.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    MWQMSiteTVItemID: MWQMSiteTVItemID,
                }).done((ret) => {
                    if (ret) {
                        $TVItemEdit.html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $TVItemEdit.html("");
            }
        };
        public MWQMShowHideOnMap: Function = (Show: boolean): void => {
            if ($(".jbMWQMSiteShowHideOnMap").hasClass("btn-default")) {
                var TVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
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
        public ShowSiteText: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                if (cssp.GoogleMap.MarkerTextLength < 8) {
                    cssp.GoogleMap.MarkerTextLength = 8;
                    cssp.GoogleMap.DrawObjects();
                }
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                if (cssp.GoogleMap.MarkerTextLength > 1) {
                    cssp.GoogleMap.MarkerTextLength = 1;
                    cssp.GoogleMap.DrawObjects();
                }
            }
        };
        public MWQMSubsectorAnalysisBeforeRecalculation: Function = (): void => {
            if (cssp.MWQMSite.StopRecalculation) {
                return;
            }
            window.setTimeout(() => {
                if ($(".jbMWQMSubsectorAnalysisShowHideRunsNotUsed").hasClass("btn-success")) {
                    cssp.MWQMSite.MWQMSubsectorAnalysisShowHideRunsNotUsed($(".jbMWQMSubsectorAnalysisShowHideRunsNotUsed"));
                }
                cssp.MWQMSite.MWQMSubsectorAnalysisLoadVariables();
                cssp.MWQMSite.MWQMSubsectorAnalysisRecalculate();
            }, 10);
        };
        public MWQMSubsectorAnalysisRemoveFromStat: Function = ($bjs: JQuery): void => {
            let runcount: number = parseInt($bjs.closest("td").data("runcount"));
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
        public MWQMSubsectorAnalysisInit: Function = (): void => {
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
            $(document).on("change", "select.MWQMSubsectorAnalysisStartDate", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });
            $(document).off("change", "select.MWQMSubsectorAnalysisEndDate");
            $(document).on("change", "select.MWQMSubsectorAnalysisEndDate", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });
            $(document).off("change", "select.MWQMSubsectorAnalysisRuns");
            $(document).on("change", "select.MWQMSubsectorAnalysisRuns", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });
            $(document).off("change", "select.MWQMSubsectorAnalysisCalculateType");
            $(document).on("change", "select.MWQMSubsectorAnalysisCalculateType", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });
            // to be removed in the future

            $(document).off("change", "input.SelectFullYear");
            $(document).on("change", "input.SelectFullYear", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });

            $(document).off("change", "select.MWQMSubsectorAnalysisHighlightSalinityDeviationFromAverage");
            $(document).on("change", "select.MWQMSubsectorAnalysisHighlightSalinityDeviationFromAverage", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });

            $(document).off("change", "input.MWQMAnalysisTableDataType");
            $(document).on("change", "input.MWQMAnalysisTableDataType", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisShowUpdateTable();
            });

            $(document).off("click", "input[name='ShortRange']");
            $(document).on("click", "input[name='ShortRange']", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisShortRangeChanged();
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });

            $(document).off("click", "input[name='MidRange']");
            $(document).on("click", "input[name='MidRange']", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisMidRangeChanged();
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });

            $(document).off("change", "select.MWQMAnalysisUpperRainLimitStillConsideredDry");
            $(document).on("change", "select.MWQMAnalysisUpperRainLimitStillConsideredDry", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });

            $(document).off("change", "select.MWQMAnalysisLowerRainLimitConsideredRain");
            $(document).on("change", "select.MWQMAnalysisLowerRainLimitConsideredRain", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });

            $(document).off("change", "select.MWQMSubsectorAnalysisCalculateType");
            $(document).on("change", "select.MWQMSubsectorAnalysisCalculateType", (evt: Event) => {
                cssp.MWQMSite.MWQMSubsectorAnalysisBeforeRecalculation();
            });

            let NeedRecal$ = $("#MWQMSubsectorAnalysisDiv").find(".NeedRecal")
            NeedRecal$.text(NeedRecal$.data("needrecalculation"));
            $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport").text("");

            window.setTimeout(() => {
                cssp.MWQMSite.MWQMSubsectorAnalysisFillJQueryVariables();
                cssp.MWQMSite.MWQMSubsectorAnalysisLoadVariables();
                cssp.MWQMSite.MWQMSubsectorAnalysisRecalculate();
                cssp.MWQMSite.MWQMSubsectorAnalysisShortRangeChanged();
                cssp.MWQMSite.MWQMSubsectorAnalysisMidRangeChanged();
            }, 100);
        };
        public MWQMSubsectorAnalysisShortRangeChanged: Function = (): void => {
            let ShortRangeEnd: number = parseInt($("input[name='ShortRange']:checked").val());
            let MidRangeStart: number = parseInt($("input[name='MidRange']:checked").val());
            $("span.MidRangeStart").text(ShortRangeEnd - 1);
            $("input[name='MidRange']").each((ind: number, elem: Element) => {
                let li$: JQuery = $(elem).closest("li");
                let liValue: number = parseInt(li$.data("value"));
                if (liValue > (ShortRangeEnd - 1)) {
                    li$.removeClass("hidden").addClass("hidden");
                }
                else {
                    li$.removeClass("hidden");
                }
            });
            for (let i = 1; i < 11; i++) {
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
        public MWQMSubsectorAnalysisMidRangeChanged: Function = (): void => {
            let ShortRangeEnd: number = parseInt($("input[name='ShortRange']:checked").val());
            let MidRangeStart: number = parseInt($("input[name='MidRange']:checked").val());
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
            for (let i = 6; i < 11; i++) {
                cssp.MWQMSite.MWQMRainDay$[i].removeClass("rainRange");
            }

            $(".RainDay" + (MidRangeStart * -1).toString()).removeClass("rainRange").addClass("rainRange");
        };
        public MWQMSubsectorAnalysisShowHideRainRows: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $("#AnalysisTable").find("tr.CanHide").each((ind: number, elem: Element) => {
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
                $("#AnalysisTable").find("tr.CanHide").each((ind: number, elem: Element) => {
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
        public MWQMSubsectorAnalysisShowHideTideRows: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $("#AnalysisTable").find("tr.CanHide").each((ind: number, elem: Element) => {
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
                $("#AnalysisTable").find("tr.CanHide").each((ind: number, elem: Element) => {
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
        public MWQMSubsectorAnalysisShowHideQueryTool: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $("#AnalysisTable").find(".QueryTool").removeClass("hidden").addClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $("#AnalysisTable").find(".QueryTool").removeClass("hidden");
            }
        };
        public MWQMSubsectorAnalysisShowHideRunsNotUsed: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $(".jbMWQMSubsectorAnalysisRemoveFromStat").each((ind: number, elem: Element) => {
                    if ($(elem).hasClass("btn-default") || $(elem).hasClass("btn-danger")) {
                        let RunCount: number = parseInt($(elem).closest("td.MWQMRun").data("runcount"));
                        $("td.MWQMRun[data-runcount='" + RunCount.toString() + "']").removeClass("hidden").addClass("hidden");
                        for (let i = 0; i < 11; i++) {
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
                $(".jbMWQMSubsectorAnalysisRemoveFromStat").each((ind: number, elem: Element) => {
                    if ($(elem).hasClass("btn-default") || $(elem).hasClass("btn-danger")) {
                        let RunCount: number = parseInt($(elem).closest("td.MWQMRun").data("runcount"));
                        $("td.MWQMRun[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                        for (let i = 0; i < 11; i++) {
                            $("td.RainDay" + i.toString() + "[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                        }
                        $("td.StartTide[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                        $("td.EndTide[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                        $("td.MWQMSample[data-runcount='" + RunCount.toString() + "']").removeClass("hidden");
                    }
                });
            }
        };
        public MWQMSubsectorAnalysisShowUpdateTable: Function = (): void => {
            let SalChildNumber: number = 0;
            let P90ChildNumber: number = 0;
            let GMChildNumber: number = 0;
            let MedChildNumber: number = 0;
            let P43ChildNumber: number = 0;
            let P260ChildNumber: number = 0;
            let HighlightSalNumber: number = parseInt($("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisHighlightSalinityDeviationFromAverage").val());
            let DataTypeFC: JQuery = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeFC']:checked");
            let DataTypeFCText: string = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeFC']").closest("label").attr("title");
            let DataTypeTemp: JQuery = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeTemp']:checked");
            let DataTypeTempText: string = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeTemp']").closest("label").attr("title");
            let DataTypeSal: JQuery = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeSal']:checked");
            let DataTypeSalText: string = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeSal']").closest("label").attr("title");
            let DataTypeP90: JQuery = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP90']:checked");
            let DataTypeP90Text: string = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP90']").closest("label").attr("title");
            let DataTypeGM: JQuery = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeGM']:checked");
            let DataTypeGMText: string = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeGM']").closest("label").attr("title");
            let DataTypeMed: JQuery = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeMed']:checked");
            let DataTypeMedText: string = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeMed']").closest("label").attr("title");
            let DataTypeP43: JQuery = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP43']:checked");
            let DataTypeP43Text: string = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP43']").closest("label").attr("title");
            let DataTypeP260: JQuery = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP260']:checked");
            let DataTypeP260Text: string = $("#MWQMSubsectorAnalysisDiv").find("input[name='DataTypeP260']").closest("label").attr("title");

            for (let i = 0, count = cssp.MWQMSite.MWQMSiteActive$.length; i < count; i++) {
                for (let j = 0, count = cssp.MWQMSite.MWQMRun$.length; j < count; j++) {
                    if (DataTypeFC.length > 0) {
                        let FC: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].FC;
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
                        let Temp: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].Temp;
                        cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br />" + (Temp == -1 ? "--" : Temp.toString()))/*.removeClass("bg-danger bg-warning bg-info")*/;
                        if (Temp == -1) {
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                        }
                    }
                    if (DataTypeSal.length > 0) {
                        //let MoreOrLess: number = HighlightSalNumber;
                        let Sal: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].Sal;
                        cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (Sal == -1 ? "--" : Sal.toString()) + "</span>")/*.removeClass("bg-danger bg-warning bg-info")*/;

                        let MWQMSiteSalAvg: number = -1;
                        let Total: number = 0;
                        let CountRun: number = 0;
                        for (let k = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList.length; k < count; k++) {
                            if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[k].Sal != -1) {
                                Total += cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[k].Sal
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
                        let P90: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].P90;
                        cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (P90 == -1 ? "--" : P90.toString()) + "</span>")/*.removeClass("bg-danger bg-warning bg-info")*/;
                        if (P90 > 43) {
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(P90ChildNumber - 1).addClass("BorderRed");
                        }
                        else if (P90 == -1) {
                            //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                        }
                    }
                    if (DataTypeGM.length > 0) {
                        let GM: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].GeoMean;
                        cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (GM == -1 ? "--" : GM.toString()) + "</span>")/*.removeClass("bg-danger bg-warning bg-info")*/;
                        if (GM > 14) {
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(GMChildNumber - 1).addClass("BorderRed");
                        }
                        else if (GM == -1) {
                            //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                        }
                    }
                    if (DataTypeMed.length > 0) {
                        let Med: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].Median;
                        cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (Med == -1 ? "--" : Med.toString()) + "</span>")/*.removeClass("bg-danger bg-warning bg-info")*/;
                        if (Med > 14) {
                            cssp.MWQMSite.MWQMSampleList$[i].eq(j).children().eq(MedChildNumber - 1).addClass("BorderRed");
                        }
                        else if (Med == -1) {
                            //cssp.MWQMSite.MWQMSampleList$[i].eq(j).addClass("");
                        }
                    }
                    if (DataTypeP43.length > 0) {
                        let PercOver43: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].PercOver43;
                        cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (PercOver43 == -1 ? "--" : PercOver43.toString()) + "</span>")/*.removeClass("bg-danger bg-warning bg-info")*/;
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
                        let PercOver260: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[i].mwqmSampleAnalysisModel[j].PercOver260;
                        cssp.MWQMSite.MWQMSampleList$[i].eq(j).html(cssp.MWQMSite.MWQMSampleList$[i].eq(j).html() + "<br /><span>" + (PercOver260 == -1 ? "--" : PercOver260.toString()) + "</span>")/*.removeClass("bg-danger bg-warning bg-info")*/;
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
        public MWQMSubsectorAnalysisFillJQueryVariables: Function = (): void => {
            cssp.MWQMSite.MWQMRun$ = $("#AnalysisTable").find("td.MWQMRun");
            for (let i = 0; i < 11; i++) {
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

            cssp.MWQMSite.MWQMSite$.each((ind: number, elem: Element) => {
                let SiteCount: number = parseInt($(elem).data("sitecount"));
                cssp.MWQMSite.MWQMSampleList$.push($("#AnalysisTable").find("td.MWQMSample[data-sitecount='" + SiteCount + "']"));
            });

        };
        public MWQMSubsectorAnalysisLoadVariables: Function = (): void => {
            cssp.MWQMSite.mwqmSubsectorAnalysisModel = null;
            let CalculationDataType: string = $("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisCalculateType").val();
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let StartDateText: string = $("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisStartDate").val();
            let StartYear: number = parseInt(StartDateText.substr(0, 4));
            let StartMonth: number = parseInt(StartDateText.substr(5, 2));
            let StartDay: number = parseInt(StartDateText.substr(8, 2));
            let StartDate: Date = new Date(StartYear, StartMonth - 1, StartDay);
            let EndDateText: string = $("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisEndDate").val();
            let EndYear: number = parseInt(EndDateText.substr(0, 4));
            let EndMonth: number = parseInt(EndDateText.substr(5, 2));
            let EndDay: number = parseInt(EndDateText.substr(8, 2));
            let EndDate: Date = new Date(EndYear, EndMonth - 1, EndDay);
            let Runs: number = parseInt($("#MWQMSubsectorAnalysisDiv").find("select.MWQMSubsectorAnalysisRuns").val());
            let ShortRangeEnd: number = (-1 * parseInt($("input[name='ShortRange']:checked").val()));
            let MidRangeEnd: number = (-1 * parseInt($("input[name='MidRange']:checked").val()));
            let UpperRainLimitStillConsideredDry1: number = parseFloat($("select[name='UpperRainLimitStillConsideredDry1']").val());
            let UpperRainLimitStillConsideredDry2: number = parseFloat($("select[name='UpperRainLimitStillConsideredDry2']").val());
            let UpperRainLimitStillConsideredDry3: number = parseFloat($("select[name='UpperRainLimitStillConsideredDry3']").val());
            let UpperRainLimitStillConsideredDry4: number = parseFloat($("select[name='UpperRainLimitStillConsideredDry4']").val());
            let LowerRainLimitConsideredRain1: number = parseFloat($("select[name='LowerRainLimitConsideredRain1']").val());
            let LowerRainLimitConsideredRain2: number = parseFloat($("select[name='LowerRainLimitConsideredRain2']").val());
            let LowerRainLimitConsideredRain3: number = parseFloat($("select[name='LowerRainLimitConsideredRain3']").val());
            let LowerRainLimitConsideredRain4: number = parseFloat($("select[name='LowerRainLimitConsideredRain4']").val());
            let SelectFullYear: boolean = $("#MWQMSubsectorAnalysisDiv").find("input.SelectFullYear").is(":checked") ? true : false;
            let mwqmSubsectorModel: MWQMSubsectorModel = new MWQMSubsectorModel(SubsectorTVItemID, ShortRangeEnd, MidRangeEnd,
                UpperRainLimitStillConsideredDry1, UpperRainLimitStillConsideredDry2, UpperRainLimitStillConsideredDry3,
                UpperRainLimitStillConsideredDry4, LowerRainLimitConsideredRain1, LowerRainLimitConsideredRain2,
                LowerRainLimitConsideredRain3, LowerRainLimitConsideredRain4, StartDate, EndDate, Runs, CalculationDataType,
                SelectFullYear, StartDate.getFullYear(), EndDate.getFullYear());

            let mwqmRunAnalysisModelList: MWQMRunAnalysisModel[] = [];
            let mwqmSiteAnalysisModelList: MWQMSiteAnalysisModel[] = [];

            if (CalculationDataType != "All_All_All") {
                if (cssp.MWQMSite.RainMissingText) {
                    cssp.Dialog.ShowDialogErrorWithError("Rain Day missing [" + cssp.MWQMSite.RainMissingText + "]");
                    CalculationDataType = "All_All_All";
                    $("select.MWQMSubsectorAnalysisCalculateType").val("All_All_All");
                }
            }

            for (let i = 0, count = cssp.MWQMSite.MWQMRun$.length; i < count; i++) {
                let IsOKRun: boolean = false;
                let dateText: string = cssp.MWQMSite.MWQMRun$.eq(i).data("date");
                let year: number = parseInt(dateText.substr(0, 4));
                let month: number = parseInt(dateText.substr(5, 2));
                let day: number = parseInt(dateText.substr(8, 2));
                let RunDate: Date = new Date(year, month - 1, day);
                let runid: number = parseInt(cssp.MWQMSite.MWQMRun$.eq(i).data("runid"));
                let CountRun: number = parseInt(cssp.MWQMSite.MWQMRun$.eq(i).data("runcount"));
                let RemoveFromStat: boolean = cssp.MWQMSite.MWQMRun$.eq(i).data("removefromstat");
                let UseRunAndRainValueArr: UseRunAndRainValue[] = [];

                if (CalculationDataType == "All_All_All") {
                    for (let j = 0; j < 11; j++) {
                        let UseRun: boolean = false;
                        let Rain$: JQuery = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                        Rain$.removeClass("bg-info").removeClass("bg-danger");
                        let RainValue: number = Rain$.data("rainday" + j.toString());
                        if (RainValue !== -1) {
                            UseRun = true;
                        }
                        else {
                            cssp.MWQMSite.RainMissingText = cssp.MWQMSite.MWQMRun$.eq(i).data("date") + " (-" + j + ")";
                        }

                        UseRunAndRainValueArr.push(new UseRunAndRainValue(UseRun, RainValue));
                    }
                    IsOKRun = true;
                }
                else if (CalculationDataType == "Wet_All_All") {
                    let TotalRain: number = 0;
                    for (let j = 0; j < 11; j++) {
                        let UseRun: boolean = false;
                        let Rain$: JQuery = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                        Rain$.removeClass("bg-info").removeClass("bg-danger");
                        let RainValue: number = Rain$.data("rainday" + j.toString());
                        if (RainValue !== -1) {
                            if (j > 0) {
                                TotalRain = TotalRain + RainValue;
                            }
                            if (j <= ShortRangeEnd && j > 0) {
                                if (j == 1) {
                                    if (LowerRainLimitConsideredRain1 <= TotalRain) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == 2) {
                                    if (LowerRainLimitConsideredRain2 <= TotalRain) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == 3) {
                                    if (LowerRainLimitConsideredRain3 <= TotalRain) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else {
                                    if (LowerRainLimitConsideredRain4 <= TotalRain) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                            }
                            else {
                                UseRun = true;
                            }
                        }

                        UseRunAndRainValueArr.push(new UseRunAndRainValue(UseRun, RainValue));
                    }

                    let ShortOK: boolean = false;
                    for (let j = 1; j < 11; j++) {
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
                    let TotalRain: number = 0;
                    for (let j = 0; j < 11; j++) {
                        let UseRun: boolean = false;
                        let Rain$: JQuery = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                        Rain$.removeClass("bg-info").removeClass("bg-danger");
                        let RainValue: number = Rain$.data("rainday" + j.toString());
                        if (RainValue !== -1) {
                            if (j > 0) {
                                TotalRain = TotalRain + RainValue;
                            }
                            if (j <= ShortRangeEnd && j > 0) {
                                if (j == 1) {
                                    if (UpperRainLimitStillConsideredDry1 >= TotalRain) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == 2) {
                                    if (UpperRainLimitStillConsideredDry2 >= TotalRain) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == 3) {
                                    if (UpperRainLimitStillConsideredDry3 >= TotalRain) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else {
                                    if (UpperRainLimitStillConsideredDry4 >= TotalRain) {
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

                        UseRunAndRainValueArr.push(new UseRunAndRainValue(UseRun, RainValue));
                    }

                    let ShortOK: boolean = true;
                    for (let j = 1; j < 11; j++) {
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
                    let TotalRainShort: number = 0;
                    let TotalRainMid: number = 0;
                    for (let j = 0; j < 11; j++) {
                        let UseRun: boolean = false;
                        let Rain$: JQuery = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                        Rain$.removeClass("bg-info").removeClass("bg-danger");
                        let RainValue: number = Rain$.data("rainday" + j.toString());
                        if (RainValue !== -1) {
                            if (j <= ShortRangeEnd && j > 0) {
                                TotalRainShort = TotalRainShort + RainValue;
                                if (j == 1) {
                                    if (LowerRainLimitConsideredRain1 <= TotalRainShort) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == 2) {
                                    if (LowerRainLimitConsideredRain2 <= TotalRainShort) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == 3) {
                                    if (LowerRainLimitConsideredRain3 <= TotalRainShort) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else {
                                    if (LowerRainLimitConsideredRain4 <= TotalRainShort) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                            }
                            else if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                TotalRainMid = TotalRainMid + RainValue;
                                if (j == (ShortRangeEnd + 1)) {
                                    if (LowerRainLimitConsideredRain1 <= TotalRainMid) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == (ShortRangeEnd + 2)) {
                                    if (LowerRainLimitConsideredRain2 <= TotalRainMid) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == (ShortRangeEnd + 3)) {
                                    if (LowerRainLimitConsideredRain3 <= TotalRainMid) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else {
                                    if (LowerRainLimitConsideredRain4 <= TotalRainMid) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                            }
                            else {
                                UseRun = true;
                            }
                        }

                        UseRunAndRainValueArr.push(new UseRunAndRainValue(UseRun, RainValue));
                    }

                    let ShortOK: boolean = false;
                    let MidOK: boolean = false;
                    for (let j = 1; j < 11; j++) {
                        if (j <= ShortRangeEnd) {
                            if (UseRunAndRainValueArr[j].UseRun == true) {
                                ShortOK = true;
                                break;
                            }
                        }
                    }
                    if (ShortOK) {
                        MidOK = false;
                        for (let j = 1; j < 11; j++) {
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
                    let TotalRainShort: number = 0;
                    let TotalRainMid: number = 0;
                    for (let j = 0; j < 11; j++) {
                        let UseRun: boolean = false;
                        let Rain$: JQuery = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                        Rain$.removeClass("bg-info").removeClass("bg-danger");
                        let RainValue: number = Rain$.data("rainday" + j.toString());
                        if (RainValue !== -1) {
                            if (j <= ShortRangeEnd && j > 0) {
                                TotalRainShort = TotalRainShort + RainValue;
                                if (j == 1) {
                                    if (UpperRainLimitStillConsideredDry1 >= TotalRainShort) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == 2) {
                                    if (UpperRainLimitStillConsideredDry2 >= TotalRainShort) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == 3) {
                                    if (UpperRainLimitStillConsideredDry3 >= TotalRainShort) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else {
                                    if (UpperRainLimitStillConsideredDry4 >= TotalRainShort) {
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
                                    if (UpperRainLimitStillConsideredDry1 >= TotalRainMid) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == (ShortRangeEnd + 2)) {
                                    if (UpperRainLimitStillConsideredDry2 >= TotalRainMid) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == (ShortRangeEnd + 3)) {
                                    if (UpperRainLimitStillConsideredDry3 >= TotalRainMid) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else {
                                    if (UpperRainLimitStillConsideredDry4 >= TotalRainMid) {
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

                        UseRunAndRainValueArr.push(new UseRunAndRainValue(UseRun, RainValue));
                    }

                    let ShortAndMidOK: boolean = true;
                    for (let j = 1; j < 11; j++) {
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
                    let TotalRainShort: number = 0;
                    let TotalRainMid: number = 0;
                    for (let j = 0; j < 11; j++) {
                        let UseRun: boolean = false;
                        let Rain$: JQuery = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                        Rain$.removeClass("bg-info").removeClass("bg-danger");
                        let RainValue: number = Rain$.data("rainday" + j.toString());
                        if (RainValue !== -1) {
                            if (j <= ShortRangeEnd && j > 0) {
                                TotalRainShort = TotalRainShort + RainValue;
                                if (j == 1) {
                                    if (LowerRainLimitConsideredRain1 <= TotalRainShort) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == 2) {
                                    if (LowerRainLimitConsideredRain2 <= TotalRainShort) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == 3) {
                                    if (LowerRainLimitConsideredRain3 <= TotalRainShort) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else {
                                    if (LowerRainLimitConsideredRain4 <= TotalRainShort) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                            }
                            else if (j > ShortRangeEnd && j <= MidRangeEnd) {
                                TotalRainMid = TotalRainMid + RainValue;
                                if (j == (ShortRangeEnd + 1)) {
                                    if (UpperRainLimitStillConsideredDry1 >= TotalRainMid) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == (ShortRangeEnd + 2)) {
                                    if (UpperRainLimitStillConsideredDry2 >= TotalRainMid) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == (ShortRangeEnd + 3)) {
                                    if (UpperRainLimitStillConsideredDry3 >= TotalRainMid) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else {
                                    if (UpperRainLimitStillConsideredDry4 >= TotalRainMid) {
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

                        UseRunAndRainValueArr.push(new UseRunAndRainValue(UseRun, RainValue));
                    }

                    let ShortOK: boolean = false;
                    let MidOK: boolean = true;
                    for (let j = 1; j < 11; j++) {
                        if (j <= ShortRangeEnd) {
                            if (UseRunAndRainValueArr[j].UseRun == true) {
                                ShortOK = true;
                                break;
                            }
                        }
                    }
                    if (ShortOK) {
                        MidOK = true;
                        for (let j = 1; j < 11; j++) {
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
                    let TotalRainShort: number = 0;
                    let TotalRainMid: number = 0;
                    for (let j = 0; j < 11; j++) {
                        let UseRun: boolean = false;
                        let Rain$: JQuery = cssp.MWQMSite.MWQMRainDay$[j].eq(i);
                        Rain$.removeClass("bg-info").removeClass("bg-danger");
                        let RainValue: number = Rain$.data("rainday" + j.toString());
                        if (RainValue !== -1) {
                            if (j <= ShortRangeEnd && j > 0) {
                                TotalRainShort = TotalRainShort + RainValue;
                                if (j == 1) {
                                    if (UpperRainLimitStillConsideredDry1 >= TotalRainShort) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == 2) {
                                    if (UpperRainLimitStillConsideredDry2 >= TotalRainShort) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else if (j == 3) {
                                    if (UpperRainLimitStillConsideredDry3 >= TotalRainShort) {
                                        UseRun = true;
                                    }
                                    else {
                                        Rain$.addClass("bg-danger");
                                    }
                                }
                                else {
                                    if (UpperRainLimitStillConsideredDry4 >= TotalRainShort) {
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
                                    if (LowerRainLimitConsideredRain1 <= TotalRainMid) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == (ShortRangeEnd + 2)) {
                                    if (LowerRainLimitConsideredRain2 <= TotalRainMid) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else if (j == (ShortRangeEnd + 3)) {
                                    if (LowerRainLimitConsideredRain3 <= TotalRainMid) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                                else {
                                    if (LowerRainLimitConsideredRain4 <= TotalRainMid) {
                                        Rain$.addClass("bg-info");
                                        UseRun = true;
                                    }
                                }
                            }
                            else {
                                UseRun = true;
                            }
                        }

                        UseRunAndRainValueArr.push(new UseRunAndRainValue(UseRun, RainValue));
                    }

                    let ShortOK: boolean = true;
                    let MidOK: boolean = false;
                    for (let j = 1; j < 11; j++) {
                        if (j <= ShortRangeEnd) {
                            if (UseRunAndRainValueArr[j].UseRun != true) {
                                ShortOK = false;
                                break;
                            }
                        }
                    }

                    if (ShortOK) {
                        MidOK = false;
                        for (let j = 1; j < 11; j++) {
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

                let StartTideText: string = cssp.MWQMSite.MWQMStartTide$.eq(i).data("starttide");
                let EndTideText: string = cssp.MWQMSite.MWQMEndTide$.eq(i).data("endtide");

                let mwqmRunAnalysisModel: MWQMRunAnalysisModel = new MWQMRunAnalysisModel(CountRun, runid, IsOKRun, RemoveFromStat,
                    RunDate, UseRunAndRainValueArr[0].RainValue, UseRunAndRainValueArr[1].RainValue,
                    UseRunAndRainValueArr[2].RainValue, UseRunAndRainValueArr[3].RainValue, UseRunAndRainValueArr[4].RainValue,
                    UseRunAndRainValueArr[5].RainValue, UseRunAndRainValueArr[6].RainValue, UseRunAndRainValueArr[7].RainValue,
                    UseRunAndRainValueArr[8].RainValue, UseRunAndRainValueArr[9].RainValue, UseRunAndRainValueArr[10].RainValue,
                    StartTideText, EndTideText, false, RunDate.getFullYear());
                mwqmRunAnalysisModelList.push(mwqmRunAnalysisModel);
            }

            cssp.MWQMSite.AllRainChecked = true;

            for (let i = 0, count = cssp.MWQMSite.MWQMSite$.length; i < count; i++) {
                let siteid: number = parseInt(cssp.MWQMSite.MWQMSite$.eq(i).data("tvitemid"));
                let SiteCount: number = parseInt(cssp.MWQMSite.MWQMSite$.eq(i).data("sitecount"));
                let isActive: boolean = cssp.MWQMSite.MWQMSite$.eq(i).data("isactive") == "True" ? true : false;

                let mwqmSampleAnalysisModelList: MWQMSampleAnalysisModel[] = [];
                for (let j = 0, count = cssp.MWQMSite.MWQMSampleList$[i].length; j < count; j++) {
                    let RunCount: number = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("runcount"));
                    let MWQMSiteTVItemID: number = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("siteid"));
                    let MWQMRunTVItemID: number = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("runid"));
                    let SampleTypeText: string = cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("sampletypetext");
                    let FC: number = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("fc"));
                    if (FC == 1) {
                        FC = 1.9;
                    }
                    let Temp: number = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("temp"));
                    let Sal: number = parseInt(cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("sal"));
                    let dateText: string = cssp.MWQMSite.MWQMSampleList$[i].eq(j).data("date");
                    let year: number = parseInt(dateText.substr(0, 4));
                    let month: number = parseInt(dateText.substr(5, 2));
                    let day: number = parseInt(dateText.substr(8, 2));
                    let SampleDate: Date = new Date(year, month - 1, day);
                    let mwqmSampleAnalysisModel: MWQMSampleAnalysisModel = new MWQMSampleAnalysisModel(
                        SiteCount, RunCount, MWQMRunTVItemID, SampleTypeText, FC, Temp, Sal, -1, -1, -1, -1, -1,
                        SampleDate, false, SampleDate.getFullYear());
                    mwqmSampleAnalysisModelList.push(mwqmSampleAnalysisModel);
                    cssp.MWQMSite.MWQMSampleList$[i].eq(j).removeClass("usedInStat");
                }

                let mwqmSiteAnalysisModel: MWQMSiteAnalysisModel = new MWQMSiteAnalysisModel(
                    SiteCount, siteid, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, mwqmSampleAnalysisModelList, new ColorAndLetter("", ""), isActive);
                mwqmSiteAnalysisModelList.push(mwqmSiteAnalysisModel);
            }

            cssp.MWQMSite.mwqmSubsectorAnalysisModel = new MWQMSubsectorAnalysisModel(mwqmSubsectorModel, mwqmSiteAnalysisModelList, mwqmRunAnalysisModelList);
        };
        public MWQMSubsectorAnalysisLoadForReport: Function = (): void => {
            let SavingForReport$ = $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport");
            SavingForReport$.text(SavingForReport$.data("saving"));

            let SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
            let RunsToRemoveFromStatList: RunsToRemoveFromStat[] = [];

            for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList.length; i < count; i++) {
                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RemoveFromStat) {
                    RunsToRemoveFromStatList.push(new RunsToRemoveFromStat(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].RemoveFromStat, cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].MWQMRunTVItemID));
                }
            }

            var command: string = "MWQM/MWQMSubsectorAnalysisSaveForReportJSON";

            $.post(cssp.BaseURL + command, {
                SubsectorTVItemID: SubsectorTVItemID,
                RunsToRemoveFromStatList: RunsToRemoveFromStatList
            }).done((ret) => {
                $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport").text("");
                if (ret) {
                    cssp.Dialog.ShowDialogErrorWithError(ret);
                }
            }).fail(() => {
                $("#MWQMSubsectorAnalysisDiv").find(".SavingForReport").text("");
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public MWQMSubsectorAnalysisRecalculate: Function = (): void => {
            let UsedRunIndexList: number[] = [];
            if (cssp.MWQMSite.mwqmSubsectorAnalysisModel == null) {
                cssp.Dialog.ShowDialogMessage("cssp.MWQMSite.mwqmSubsectorAnalysisModel == null in MWQMSubsectorAnalysisRecalculate");
            }

            let NeedRecal$ = $("#MWQMSubsectorAnalysisDiv").find(".NeedRecal")
            NeedRecal$.text(NeedRecal$.data("inprogress"));

            for (let i = 0, count = cssp.MWQMSite.MWQMRun$.length; i < count; i++) {
                if (!cssp.MWQMSite.MWQMRun$.eq(i).find("button.jbMWQMSubsectorAnalysisRemoveFromStat").hasClass("btn-danger")) {
                    cssp.MWQMSite.MWQMRun$.eq(i).find("button.jbMWQMSubsectorAnalysisRemoveFromStat").removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
                }
            }

            for (let j = 0, count = cssp.MWQMSite.MWQMSiteActive$.length; j < count; j++) {
                let ValRunList: ValRun[] = [];
                let SampleCount: number = 0;
                let MinYear: number = -1;
                let MaxYear: number = -1;
                let MinFC: number = -1;
                let MaxFC: number = -1;

                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].isActive) {
                    for (let rc = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel.length; rc < count; rc++) {
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].GeoMean = -1;
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].Median = -1;
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].P90 = -1;
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].PercOver43 = -1;
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].PercOver260 = -1;
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[rc].UseInStat = false;
                    }

                    ValRunList = [];
                    let SampleCountMaxYear: number = 0;
                    let FirstTimeDone: boolean = false;
                    for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel.length; i < count; i++) {
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
                                                ValRunList.push(new ValRun(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC, i));
                                                cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].UseInStat = true;
                                                cssp.MWQMSite.MWQMSampleList$[j].eq(i).addClass("usedInStat");
                                                cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].UseInStat = true;
                                                let tempMinYear: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                let tempMaxYear: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                let tempMinFC: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC;
                                                let tempMaxFC: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC;
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
                                                let found: boolean = false;
                                                for (let j = 0, count = UsedRunIndexList.length; j < count; j++) {
                                                    if (UsedRunIndexList[j] == i) {
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
                                                    ValRunList.push(new ValRun(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC, i));
                                                    cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].UseInStat = true;
                                                    cssp.MWQMSite.MWQMSampleList$[j].eq(i).addClass("usedInStat");
                                                    cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList[i].UseInStat = true;
                                                    let tempMinYear: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                    let tempMaxYear: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].SampleDate.getFullYear();
                                                    let tempMinFC: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC;
                                                    let tempMaxFC: number = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].FC;
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
                                                    let found: boolean = false;
                                                    for (let j = 0, count = UsedRunIndexList.length; j < count; j++) {
                                                        if (UsedRunIndexList[j] == i) {
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

                    let SamplesText: string = "--";
                    if (SampleCount != -1) {
                        SamplesText = SampleCount.toFixed(0).toString();
                    }
                    cssp.MWQMSite.MWQMSamplesCount$.eq(j).text(SamplesText).removeClass("bg-warning");
                    if (SampleCount < 10) {
                        cssp.MWQMSite.MWQMSamplesCount$.eq(j).text(SamplesText).addClass("bg-warning");
                    }

                    let PeriodText: string = "--";
                    if (MinYear != -1) {
                        PeriodText = MaxYear.toFixed(0).toString() + "-" + MinYear.toFixed(0).toString();
                    }
                    cssp.MWQMSite.MWQMPeriod$.eq(j).text(PeriodText);

                    let MinFCText: string = "--";
                    if (MinFC != -1) {
                        MinFCText = (MinFC < 2 ? "<2" : MinFC.toFixed(0)).toString();
                    }
                    cssp.MWQMSite.MWQMMinFC$.eq(j).text(MinFCText);

                    let MaxFCText: string = "--";
                    if (MaxFC != -1) {
                        MaxFCText = (MaxFC < 2 ? "<2" : MaxFC.toFixed(0)).toString();
                    }
                    cssp.MWQMSite.MWQMMaxFC$.eq(j).text(MaxFCText);

                    let ValRunResList: ValRun[] = cssp.MWQMSite.MWQMSubsectorAnalysisGeometricMean(ValRunList);
                    let GMeanText: string = "--";
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
                    let MedianText: string = "--";
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
                    let P90Text: string = "--";
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
                    let PercOver43Text: string = "--";
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
                    let PercOver260Text: string = "--";
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

                    let FirstWithCalculation = 0;
                    for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmRunAnalysisModelList.length; i < count; i++) {
                        if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[i].P90 != -1) {
                            FirstWithCalculation = i;
                            break;
                        }
                    }

                    let colorAndLetter: ColorAndLetter = cssp.MWQMSite.MWQMSubsectorAnalysisGetColorAndLetter(
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].P90,
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].GeoMean,
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].Median,
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].PercOver43,
                        cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[j].mwqmSampleAnalysisModel[FirstWithCalculation].PercOver260
                    );

                    let clearClasses: string[] = ["bggreena", "bggreenb", "bggreenc", "bggreend", "bggreene", "bggreenf", "bgreda", "bgredb", "bgredc", "bgredd", "bgrede", "bgredf", "bgbluea", "bgblueb", "bgbluec", "bgblued", "bgbluee", "bgbluef"];
                    if (SampleCount < 10) {
                        cssp.MWQMSite.MWQMColorAndLetter$.eq(j).removeClass("notEnoughData");
                        for (let i = 0, count = clearClasses.length; i < count; i++) {
                            cssp.MWQMSite.MWQMColorAndLetter$.eq(j).removeClass(clearClasses[i]);
                        }
                        cssp.MWQMSite.MWQMColorAndLetter$.eq(j).addClass("notEnoughData").html((SampleCount < 0 ? "0" : SampleCount.toString()));
                    }
                    else {
                        cssp.MWQMSite.MWQMColorAndLetter$.eq(j).removeClass("notEnoughData")
                        for (let i = 0, count = clearClasses.length; i < count; i++) {
                            cssp.MWQMSite.MWQMColorAndLetter$.eq(j).removeClass(clearClasses[i]);
                        }
                        cssp.MWQMSite.MWQMColorAndLetter$.eq(j).addClass(colorAndLetter.color).html(colorAndLetter.letter);
                    }
                }
            }

            cssp.MWQMSite.MWQMSubsectorAnalysisShowUpdateTable();

            NeedRecal$.text(NeedRecal$.data("completed"));
            window.setTimeout(() => {
                NeedRecal$.text("");
            }, 100);

            for (let i = 0, count = UsedRunIndexList.length; i < count; i++) {
                if (!cssp.MWQMSite.MWQMRun$.eq(UsedRunIndexList[i]).hasClass("btn-danger")) {
                    cssp.MWQMSite.MWQMRun$.eq(UsedRunIndexList[i]).find("button.jbMWQMSubsectorAnalysisRemoveFromStat").removeClass("btn-default").addClass("btn-success");
                }
            }
        };
        public MWQMSubsectorAnalysisShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $("#TVItemListDiv").find(".MovingStats").hide();
                $("#content").find(".TVItemAdd").hide();
                $("#content").find(".list-group").hide();
                $("#content").find(".MWQMSiteAnalysis").show();
                $("#content").find(".MWQMSiteAnalysis").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                let SubsectorTVItemID = $bjs.closest("#ViewDiv").data("tvitemid");
                let command: string = "MWQM/_mwqmSubsectorAnalysis";
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID
                }).done((ret) => {
                    if (ret) {
                        $("#content").find(".MWQMSiteAnalysis").html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
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
        public MWQMSubsectorAnalysisShowHideColorAndLetterHelp: Function = ($bjs: JQuery): void => {
            if ($(".jbMWQMSubsectorAnalysisShowHideColorAndLetterHelp").hasClass("btn-default")) {
                $(".jbMWQMSubsectorAnalysisShowHideColorAndLetterHelp").removeClass("btn-default").addClass("btn-success");
                $(".ColorAndLetterSchema").removeClass("hidden");
            }
            else {
                $(".jbMWQMSubsectorAnalysisShowHideColorAndLetterHelp").removeClass("btn-success").addClass("btn-default");
                $(".ColorAndLetterSchema").addClass("hidden");
            }
        };
        public MWQMSubsectorAnalysisSamples: Function = (SiteCount: number): number => {
            let data: number[] = [];
            let Samples: number = -1;
            for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
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
        }
        public MWQMSubsectorAnalysisPercOver43: Function = (ValRunList: ValRun[]): ValRun[] => {
            let ValRunResList: ValRun[] = [];
            let ValRunLocalList: ValRun[] = [];

            for (let val of ValRunList) {
                ValRunLocalList.push(val);
            }

            while (ValRunLocalList.length > 9) {
                let PercOver43: number = -1;
                let dataOver43: number[] = [];
                for (let d of ValRunLocalList) {
                    if (d.val > 43) {
                        dataOver43.push(d.val);
                    }
                }

                PercOver43 = (dataOver43.length / ValRunLocalList.length) * 100;

                ValRunResList.push(new ValRun(PercOver43, ValRunLocalList[0].run));

                ValRunLocalList.shift();
            }

            return ValRunResList;
        }
        public MWQMSubsectorAnalysisPercOver260: Function = (ValRunList: ValRun[]): ValRun[] => {
            let ValRunResList: ValRun[] = [];
            let ValRunLocalList: ValRun[] = [];

            for (let val of ValRunList) {
                ValRunLocalList.push(val);
            }

            while (ValRunLocalList.length > 9) {
                let PercOver260: number = -1;
                let dataOver260: number[] = [];
                for (let d of ValRunLocalList) {
                    if (d.val > 260) {
                        dataOver260.push(d.val);
                    }
                }

                PercOver260 = (dataOver260.length / ValRunLocalList.length) * 100;

                ValRunResList.push(new ValRun(PercOver260, ValRunLocalList[0].run));

                ValRunLocalList.shift();
            }
            return ValRunResList;
        }
        public MWQMSubsectorAnalysisMinYear: Function = (SiteCount: number): number => {
            let data: number[] = [];
            let MinYear: number = 10000;

            for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                        data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].SampleDate.getFullYear());
                    }
                }
            }

            if (data.length > 0) {
                for (let d of data) {
                    if (MinYear > d) {
                        MinYear = d;
                    }
                }
            }
            else {
                MinYear = -1;
            }

            return MinYear;
        }
        public MWQMSubsectorAnalysisMaxYear: Function = (SiteCount: number): number => {
            let data: number[] = [];
            let MaxYear: number = 0;

            for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                        data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].SampleDate.getFullYear());
                    }
                }
            }

            if (data.length > 0) {
                for (let d of data) {
                    if (MaxYear < d) {
                        MaxYear = d;
                    }
                }
            }
            else {
                MaxYear = -1;
            }

            return MaxYear;
        }
        public MWQMSubsectorAnalysisMaxFC: Function = (SiteCount: number): number => {
            let data: number[] = [];
            let MaxFC: number = 0;

            for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                        data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC);
                    }
                }
            }

            if (data.length > 0) {
                for (let d of data) {
                    if (MaxFC < d) {
                        MaxFC = d;
                    }
                }
            }
            else {
                MaxFC = -1;
            }

            return MaxFC;
        }
        public MWQMSubsectorAnalysisMinFC: Function = (SiteCount: number): number => {
            let data: number[] = [];
            let MinFC: number = 1000000;

            for (let i = 0, count = cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel.length; i < count; i++) {
                if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].UseInStat) {
                    if (cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC != -1) {
                        data.push(cssp.MWQMSite.mwqmSubsectorAnalysisModel.mwqmSiteAnalysisModelList[SiteCount].mwqmSampleAnalysisModel[i].FC);
                    }
                }
            }

            if (data.length > 0) {
                for (let d of data) {
                    if (MinFC > d) {
                        MinFC = d;
                    }
                }
            }
            else {
                MinFC = -1;
            }

            return MinFC;
        }
        public MWQMSubsectorAnalysisGeometricMean: Function = (ValRunList: ValRun[]): ValRun[] => {
            let ValRunResList: ValRun[] = [];
            let ValRunLocalList: ValRun[] = [];

            for (let val of ValRunList) {
                ValRunLocalList.push(val);
            }

            while (ValRunLocalList.length > 9) {

                let GMean: number = 0;
                let prod: number = 0;

                prod = 1.0;

                for (let d of ValRunLocalList) {
                    prod *= d.val;
                }
                GMean = Math.pow(prod, (1.0 / ValRunLocalList.length));

                ValRunResList.push(new ValRun(GMean, ValRunLocalList[0].run));

                ValRunLocalList.shift();
            }

            return ValRunResList;
        }
        public MWQMSubsectorAnalysisGetColorAndLetter: Function = (P90: number, GeoMean: number, Median: number, PercOver43: number, PercOver260: number): ColorAndLetter => {
            let colorAndLetter: ColorAndLetter = new ColorAndLetter("", "");
            if (!Median) {
                return colorAndLetter;
            }
            if ((GeoMean > 88) || (Median > 88) || (P90 > 260) || (PercOver260 > 10)) {
                if ((GeoMean > 181.33) || (Median > 181.33) || (P90 > 460.0) || (PercOver260 > 18.33)) {
                    colorAndLetter = new ColorAndLetter("bgbluef", "F");
                }
                else if ((GeoMean > 162.67) || (Median > 162.67) || (P90 > 420.0) || (PercOver260 > 16.67)) {
                    colorAndLetter = new ColorAndLetter("bgbluee", "E");
                }
                else if ((GeoMean > 144.0) || (Median > 144.0) || (P90 > 380.0) || (PercOver260 > 15.0)) {
                    colorAndLetter = new ColorAndLetter("bgblued", "D");
                }
                else if ((GeoMean > 125.33) || (Median > 125.33) || (P90 > 340.0) || (PercOver260 > 13.33)) {
                    colorAndLetter = new ColorAndLetter("bgbluec", "C");
                }
                else if ((GeoMean > 106.67) || (Median > 106.67) || (P90 > 300.0) || (PercOver260 > 11.67)) {
                    colorAndLetter = new ColorAndLetter("bgblueb", "B");
                }
                else {
                    colorAndLetter = new ColorAndLetter("bgbluea", "A");
                }
            }
            else if ((GeoMean > 14) || (Median > 14) || (P90 > 43) || (PercOver43 > 10)) {
                if ((GeoMean > 75.67) || (Median > 75.67) || (P90 > 223.83) || (PercOver43 > 26.67)) {
                    colorAndLetter = new ColorAndLetter("bgredf", "F");
                }
                else if ((GeoMean > 63.33) || (Median > 63.33) || (P90 > 187.67) || (PercOver43 > 23.33)) {
                    colorAndLetter = new ColorAndLetter("bgrede", "E");
                }
                else if ((GeoMean > 51.0) || (Median > 51.0) || (P90 > 151.5) || (PercOver43 > 20.0)) {
                    colorAndLetter = new ColorAndLetter("bgredd", "D");
                }
                else if ((GeoMean > 38.67) || (Median > 38.67) || (P90 > 115.33) || (PercOver43 > 16.67)) {
                    colorAndLetter = new ColorAndLetter("bgredc", "C");
                }
                else if ((GeoMean > 26.33) || (Median > 26.33) || (P90 > 79.17) || (PercOver43 > 13.33)) {
                    colorAndLetter = new ColorAndLetter("bgredb", "B");
                }
                else {
                    colorAndLetter = new ColorAndLetter("bgreda", "A");
                }
            }
            else {
                if ((GeoMean > 11.67) || (Median > 11.67) || (P90 > 35.83) || (PercOver43 > 8.33)) {
                    colorAndLetter = new ColorAndLetter("bggreenf", "F");
                }
                else if ((GeoMean > 9.33) || (Median > 9.33) || (P90 > 28.67) || (PercOver43 > 6.67)) {
                    colorAndLetter = new ColorAndLetter("bggreene", "E");
                }
                else if ((GeoMean > 7.0) || (Median > 7.0) || (P90 > 21.5) || (PercOver43 > 5.0)) {
                    colorAndLetter = new ColorAndLetter("bggreend", "D");
                }
                else if ((GeoMean > 4.67) || (Median > 4.67) || (P90 > 14.33) || (PercOver43 > 3.33)) {
                    colorAndLetter = new ColorAndLetter("bggreenc", "C");
                }
                else if ((GeoMean > 2.33) || (Median > 2.33) || (P90 > 7.17) || (PercOver43 > 1.67)) {
                    colorAndLetter = new ColorAndLetter("bggreenb", "B");
                }
                else {
                    colorAndLetter = new ColorAndLetter("bggreena", "A");
                }
            }

            return colorAndLetter;
        }
        public MWQMSubsectorAnalysisGetMedian: Function = (ValRunList: ValRun[]): ValRun[] => {
            let ValRunResList: ValRun[] = [];
            let ValRunLocalList: ValRun[] = [];
            let ValRunForSortList: ValRun[] = [];

            for (let val of ValRunList) {
                ValRunLocalList.push(val);
                ValRunForSortList.push(val);
            }

            while (ValRunLocalList.length > 9) {
                let median: number = -1;

                let sortedData: ValRun[] = ValRunForSortList.sort((n1, n2) => n1.val - n2.val);

                let size: number = sortedData.length;
                let mid = parseInt((size / 2).toString());
                median = (size % 2 != 0) ? sortedData[mid].val : (sortedData[mid].val + sortedData[mid - 1].val) / 2;

                ValRunResList.push(new ValRun(median, ValRunLocalList[0].run));

                ValRunLocalList.shift();
            }

            return ValRunResList;
        }
        public MWQMSubsectorAnalysisGetP90: Function = (ValRunList: ValRun[]): ValRun[] => {
            let ValRunResList: ValRun[] = [];
            let ValRunLocalList: ValRun[] = [];

            for (let val of ValRunList) {
                ValRunLocalList.push(val);
            }

            while (ValRunLocalList.length > 9) {
                let P90: number = -1.0;
                let fcLogList: number[] = [];
                for (let d of ValRunLocalList) {
                    fcLogList.push(Math.log(d.val) / Math.LN10);
                }

                let Average = 0.0;
                let Sum = 0.0;
                for (let d of fcLogList) {
                    Sum += d
                }
                Average = Sum / ValRunLocalList.length;
                let SD: number = cssp.MWQMSite.MWQMSubsectorAnalysisGetStandardDeviation(fcLogList);
                let P90Log = (SD * 1.28) + Average;
                P90 = Math.pow(10, P90Log);

                ValRunResList.push(new ValRun(P90, ValRunLocalList[0].run));

                ValRunLocalList.shift();
            }

            return ValRunResList;
        }
        public MWQMSubsectorAnalysisGetStandardDeviation: Function = (fcList: number[]): number => {
            if (fcList.length == 0) {
                return -1;
            }

            let avg: number = 0;
            let total: number = 0;
            for (let d of fcList) {
                total = total + d;
            }
            avg = total / fcList.length;

            let sum: number = 0;
            for (let value of fcList) {
                sum += (value - avg) * (value - avg);
            }

            return Math.sqrt((sum) / (fcList.length - 1));
        }
        public RefreshChartsAfterOneSecond: Function = (): void => {
            window.setTimeout(() => {
                $(".jbMWQMSiteRefresh").trigger("click");
            }, 1000);
        };
        public ShowHideEditButtons: Function = ($bjs: JQuery): void => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
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
}
