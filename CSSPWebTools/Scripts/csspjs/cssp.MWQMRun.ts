
module CSSP {
    export class MWQMRun {
        // variables
        private mapItems: Array<CSSP.tvLocation> = [];

        // Constructors
        constructor() {
        }

        // Functions
        public ShowPart: Function = (objName: string): void => {
            var objNameList: Array<string> = ["MWQMRunData", "MWQMRunInfo"];
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
        };
        public AskToDeleteRun: Function = ($bjs: JQuery): void => {
            var TVText: string = $bjs.closest("#ViewDiv").find(".TVText").text();
            cssp.Dialog.ShowDialogAreYouSure(TVText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MWQMRun.SetDialogEventsRun", $bjs);
        };
        public AskToDeleteRunSample: Function = ($bjs: JQuery): void => {
            var TVText: string = $bjs.closest("tr").find("td").first().find("span").first().text();
            cssp.Dialog.ShowDialogAreYouSure(TVText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MWQMRun.SetDialogEventsRunSample", $bjs);
        };
        public Init: Function = (): void => {
            $(document).off("hover", "a.MWQMRunMoreInfo");
            $(document).on("hover", "a.MWQMRunMoreInfo", () => {
                var TVItemID: number = parseInt($(this).data("tvitemid"));
                if (TVItemID != 0) {
                    cssp.GoogleMap.DrawCross(TVItemID);
                }
            });
        };
        public InitEdit: Function = (): void => {
            if ($("tr.MWQMSample").length > 0) {
                $(".jbMWQMRunDelete").removeClass("hidden");
            }
            $("#MWQMRunAddOrModifyForm").each((ind: number, elem: Element) => {
                $(elem).validate({
                    rules: {
                        MWQMRunTVItemID:
                        {
                            required: true,
                        },
                        ParentTVItemID:
                        {
                            required: true,
                        },
                        RunDateYear:
                        {
                            required: true,
                        },
                        RunDateMonth:
                        {
                            required: true,
                            min: 1,
                            max: 12,
                        },
                        RunDateDay:
                        {
                            required: true,
                            min: 1,
                            max: 31,
                        },
                        RunStartTime:
                        {
                            required: true,
                            minlength: 5,
                            maxlength: 5,
                        },
                        RunEndTime:
                        {
                            required: true,
                            minlength: 5,
                            maxlength: 5,
                        },
                        LabReceivedRunSample:
                        {
                            min: 1,
                            max: 2,
                        },
                        LabReceivedTime:
                        {
                            minlength: 5,
                            maxlength: 5,
                        },
                        TemperatureControl:
                        {
                            min: -15,
                            max: 36,
                        },
                        SeaStateAtStart_BeaufortScale:
                        {
                            min: -1,
                            max: 12,
                        },
                        SeaStateAtEnd_BeaufortScale:
                        {
                            min: -1,
                            max: 12,
                        },
                        WaterLevelAtBrook_m:
                        {
                            min: 0,
                            max: 50,
                        },
                        WaveHightAtStart_m:
                        {
                            min: 0,
                            max: 10,
                        },
                        WaveHightAtEnd_m:
                        {
                            min: 0,
                            max: 10,
                        },
                        SampleCrewInitials:
                        {
                            maxlength: 10,
                        },
                        AnalyzeMethod:
                        {
                            min: 0,
                            max: 100,
                        },
                        SampleMatrix:
                        {
                            min: 0,
                            max: 100,
                        },
                        Laboratory:
                        {
                            min: 0,
                            max: 100,
                        },
                        LabAnalyzeStartIncubationDay:
                        {
                            min: 1,
                            max: 2,
                        },
                        LabAnalyzeStartIncubationTime:
                        {
                            minlength: 5,
                            maxlength: 5,
                        },
                        LabValidator:
                        {
                            min: -1,
                            max: 2000,
                        },
                        LabValidateDateYear:
                        {
                            //required: true,
                        },
                        LabValidateDateMonth:
                        {
                            min: 1,
                            max: 12,
                        },
                        LabValidateDateDay:
                        {
                            min: 1,
                            max: 31,
                        },
                        LabValidateTime:
                        {
                            minlength: 5,
                            maxlength: 5,
                        },
                        RainDay1_mm:
                        {
                            min: 0,
                            max: 1000,
                        },
                        RainDay2_mm:
                        {
                            min: 0,
                            max: 1000,
                        },
                        RainDay3_mm:
                        {
                            min: 0,
                            max: 1000,
                        },
                    }
                });
            });
            $("#MWQMRunSampleEditForm").each((ind: number, elem: Element) => {
                $(elem).validate({
                    rules: {
                        SampleTime: {
                            required: true,
                            maxlength: 5,
                            minlength: 4,
                        },
                        FecCol_MPN_100ml: {
                            required: true,
                            min: 0,
                            max: 100000000,
                        },
                        Salinity_PPT: {
                            min: 0.0,
                            max: 40.0,
                        },
                        WaterTemp_C: {
                            min: -15.0,
                            max: 40.0,
                        },
                        Depth_m: {
                            min: 0,
                            max: 1000,
                        },
                        PH: {
                            min: 0,
                            max: 14,
                        },
                        ProcessedBy: {
                            maxlength: 10,
                        },
                        SampleType: {
                            required: true,
                            min: 1,
                            max: 20,
                        },
                        Comment: {
                            maxlength: 250,
                        },
                    }
                });
            });
        };
        public InitAddOrModify: Function = (): void => {
            $(document).off("change", "select[name='RunDateYear'], select[name='RunDateMonth']");
            $(document).on("change", "select[name='RunDateYear'], select[name='RunDateMonth']", (evt: Event) => {
                let Year: number = parseInt($("select[name='RunDateYear']").val());
                let Month: number = parseInt($("select[name='RunDateMonth']").val());
                let daysInMonth: number = new Date(Year, Month, 0).getDate();
                $("select[name='RunDateDay']").html("");
                let optHTMLArr: Array<string> = [];
                for (var i = 1; i < daysInMonth + 1; i++) {
                    optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                }
                $("select[name='RunDateDay']").html(optHTMLArr.join(""));
            });
            $(document).off("change", "select[name='LabRunSampleApprovalYear'], select[name='LabRunSampleApprovalMonth']");
            $(document).on("change", "select[name='LabRunSampleApprovalYear'], select[name='LabRunSampleApprovalMonth']", (evt: Event) => {
                let Year: number = parseInt($("select[name='LabRunSampleApprovalYear']").val());
                let Month: number = parseInt($("select[name='LabRunSampleApprovalMonth']").val());
                let daysInMonth: number = new Date(Year, Month, 0).getDate();
                $("select[name='LabRunSampleApprovalDay']").html("");
                let optHTMLArr: Array<string> = [];
                for (var i = 1; i < daysInMonth + 1; i++) {
                    optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                }
                $("select[name='LabRunSampleApprovalDay']").html(optHTMLArr.join(""));
            });
        };
        public MWQMRunAddOrModify: Function = (): void => {
            var $form: JQuery = $("#MWQMRunAddOrModifyForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#MWQMRunAddOrModifyForm", "MWQMRunEditDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret.Error) {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            document.location.href = document.location.href.replace("|||" + $("#ViewDiv").data("tvitemid") + "|||", "|||" + ret.MWQMRunTVItemID + "|||");
                            //cssp.Helper.PageRefresh();
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public MWQMSubsectorAddOrModify: Function = (): void => {
            var $form: JQuery = $("#MWQMSubsectorAddOrModifyForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#MWQMSubsectorAddOrModifyForm", "MWQMSubsectorEditDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret.Error) {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public MWQMSubsectorShowEdit: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest("#ViewDiv").find(".MWQMSubsectorInfoDiv").removeClass("hidden").addClass("hidden");
                $bjs.closest("#ViewDiv").find(".MWQMSubsectorEditDiv").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest("#ViewDiv").find(".MWQMSubsectorInfoDiv").removeClass("hidden");
                $bjs.closest("#ViewDiv").find(".MWQMSubsectorEditDiv").removeClass("hidden").addClass("hidden");
            }
        };
        public MWQMRunDelete: Function = ($bjs: JQuery): void => {
            var command: string = "MWQM/MWQMRunDeleteJSON";
            var MWQMRunTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            $.post(cssp.BaseURL + command,
                {
                    MWQMRunTVItemID: MWQMRunTVItemID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $(".breadcrumb").find("li").last().find("a").trigger("click");
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MWQMRunAdd: Function = ($bjs: JQuery): void => {
            var MWQMRunTVItemID: number = 0;
            var SubsectorTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $(".TVItemAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "MWQM/_mwqmRunAddOrModify";
                $.get(cssp.BaseURL + command,
                    {
                        MWQMRunTVItemID: MWQMRunTVItemID,
                        SubsectorTVItemID: SubsectorTVItemID
                    })
                    .done((ret) => {
                        $(".TVItemAdd").html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                cssp.Helper.PageRefresh();
            }
        };
        public MWQMSampleAddOrModify: Function = ($bjs: JQuery): void => {
            var MWQMSampleID: string = $bjs.data("mwqmsampleid");
            var MWQMRunTVItemID: string = $("#MWQMRunAddOrModifyForm").find("input[name='MWQMRunTVItemID']").val();
            var $MWQMSample: JQuery = $bjs.closest("tr.MWQMSample");
            var MWQMSiteTVItemID: string = $MWQMSample.find("select[name='MWQMSiteTVItemID']").val();
            var SampleTime: string = $MWQMSample.find("input[name='SampleTime']").val();

            if (SampleTime.length == 4) {
                SampleTime = SampleTime.substring(0, 2) + ":" + SampleTime.substring(2, 4);
                $MWQMSample.find("input[name='SampleTime']").val(SampleTime);
            }

            var FecCol_MPN_100ml: string = $MWQMSample.find("input[name='FecCol_MPN_100ml']").val();
            var Salinity_PPT: string = $MWQMSample.find("input[name='Salinity_PPT']").val();
            var WaterTemp_C: string = $MWQMSample.find("input[name='WaterTemp_C']").val();
            var Depth_m: string = $MWQMSample.find("input[name='Depth_m']").val();
            var PH: string = $MWQMSample.find("input[name='PH']").val();
            var ProcessedBy: string = $MWQMSample.find("input[name='ProcessedBy']").val();
            var SampleTypes: string = $MWQMSample.find("select[name='SampleTypes']").val();
            var MWQMSampleNote: string = $MWQMSample.find("input[name='MWQMSampleNote']").val();


            if (FecCol_MPN_100ml.indexOf(",") > -1 || FecCol_MPN_100ml.indexOf(".") > -1) {
                cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varFCShouldNotHaveCommaOrDecimal"));
                return;
            }

            var command: string = "MWQM/MWQMRunSampleAddOrModifyJSON";
            $bjs.next("span").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            var $form: JQuery = $("#MWQMRunAddOrModifyForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#MWQMRunAddOrModifyForm", "MWQMRunEditDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                $.post(cssp.BaseURL + command,
                    {
                        MWQMSampleID: MWQMSampleID,
                        MWQMRunTVItemID: MWQMRunTVItemID,
                        MWQMSiteTVItemID: MWQMSiteTVItemID,
                        SampleTime: SampleTime,
                        FecCol_MPN_100ml: FecCol_MPN_100ml,
                        WaterTemp_C: WaterTemp_C,
                        Salinity_PPT: Salinity_PPT,
                        Depth_m: Depth_m,
                        PH: PH,
                        ProcessedBy: ProcessedBy,
                        SampleTypes: SampleTypes,
                        MWQMSampleNote: MWQMSampleNote,
                    })
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            if ($bjs.hasClass("jbMWQMSampleAdd")) {
                                var $OldAdd: JQuery = $bjs.closest("tr.MWQMSample").clone();
                                //$bjs.closest("tr").find(".jbMWQMRunSampleDelete").removeClass("hidden");
                                //$bjs.closest("tr").find(".jbMWQMSampleModify").removeClass("hidden");
                                $bjs.closest("tr").find(".jbMWQMSampleAdd").addClass("hidden");
                                $bjs.closest("tbody").append($OldAdd);
                                $bjs.next("span").html("");
                                $OldAdd.find("input").val("");
                                $OldAdd.next("span").html("");
                                cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                            }
                        }
                        cssp.MWQMRun.InitEdit();
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public MWQMRunSampleDelete: Function = ($bjs: JQuery): void => {
            var command: string = "MWQM/MWQMRunSampleDeleteJSON";
            var MWQMSampleID: number = parseInt($bjs.data("mwqmsampleid"));
            $bjs.next("span").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            $.post(cssp.BaseURL + command,
                {
                    MWQMSampleID: MWQMSampleID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $bjs.closest("tr.MWQMSample").remove();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MWQMRunShowOnMap: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $(".jbMWQMRunShowOnMap").each((ind: number, elem: Element) => {
                    if ($(elem).hasClass("btn-success")) {
                        $(elem).removeClass("btn-success").addClass("btn-default");
                    }
                });
                $bjs.removeClass("btn-default").addClass("btn-success");
                var MWQMRunTVItemID = parseInt($bjs.closest("li.TVItem").data("tvitemid"));
                cssp.GoogleMap.TVItemObjects = [];
                cssp.MWQMRun.mapItems = [];
                var command = "Map/GetMapInfoForMWQMRunJSON";
                $.get(cssp.BaseURL + command, { MWQMRunTVItemID: MWQMRunTVItemID })
                    .done((ret: Array<CSSP.tvLocation>) => {
                        $.map(ret, (item) => {
                            var tvLoc: CSSP.tvLocation = new CSSP.tvLocation(item.TVItemID, item.TVText, item.TVType, item.SubTVType, item.MapObjList);
                            cssp.MWQMRun.mapItems.push(tvLoc);
                        });
                        cssp.GoogleMap.TVItemObjects = [];
                        cssp.GoogleMap.FillTVItemObjects(cssp.MWQMRun.mapItems, false);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public MWQMRunShowHideEdit: Function = ($bjs: JQuery): void => {
            var MWQMRunTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            var SubsectorTVItemID: number = 0;
            if ($bjs.hasClass("btn-default")) {
                $(".jbMWQMRunDelete").removeClass("hidden");
                $bjs.removeClass("btn-default").addClass("btn-success");
                var command = "MWQM/_mwqmRunAddOrModify";
                $.get(cssp.BaseURL + command,
                    {
                        MWQMRunTVItemID: MWQMRunTVItemID,
                        SubsectorTVItemID: SubsectorTVItemID
                    })
                    .done((ret) => {
                        $("#content").html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                cssp.Helper.PageRefresh();
            }
        };
        public MWQMRunShowHideEditButtons: Function = ($bjs: JQuery): void => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
            if ($bjs.hasClass("btn-default")) {
                $tabContent.find(".jbMWQMRunShowHideEditButtons").removeClass("btn-default").addClass("btn-success");
                //$tabContent.find(".TVItemEditButtons").removeClass("hidden");
                cssp.View.ShowMoveTVItemButton($bjs);
            }
            else {
                $tabContent.find(".jbMWQMRunShowHideEditButtons").removeClass("btn-success").addClass("btn-default");
                //$tabContent.find(".TVItemEditButtons").removeClass("hidden").addClass("hidden");
                cssp.TVItem.EditCancel($bjs);
                cssp.View.HideMoveTVItemButton($bjs);
            }
        };
        public SetDialogEventsRun: Function = ($bjs: JQuery) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    cssp.MWQMRun.MWQMRunDelete($bjs);
                });
            });
        };
        public SetDialogEventsRunSample: Function = ($bjs: JQuery) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    cssp.MWQMRun.MWQMRunSampleDelete($bjs);
                });
            });
        };
    }
}
