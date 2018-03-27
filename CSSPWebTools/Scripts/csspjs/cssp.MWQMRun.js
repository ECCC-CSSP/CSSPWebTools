var CSSP;
(function (CSSP) {
    var MWQMRun = (function () {
        // Constructors
        function MWQMRun() {
            var _this = this;
            // variables
            this.mapItems = [];
            // Functions
            this.ShowPart = function (objName) {
                var objNameList = ["MWQMRunData", "MWQMRunInfo"];
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
            };
            this.AskToDeleteRun = function ($bjs) {
                var TVText = $bjs.closest("#ViewDiv").find(".TVText").text();
                cssp.Dialog.ShowDialogAreYouSure(TVText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MWQMRun.SetDialogEventsRun", $bjs);
            };
            this.AskToDeleteRunSample = function ($bjs) {
                var TVText = $bjs.closest("tr").find("td").first().find("span").first().text();
                cssp.Dialog.ShowDialogAreYouSure(TVText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MWQMRun.SetDialogEventsRunSample", $bjs);
            };
            this.Init = function () {
                $(document).off("hover", "a.MWQMRunMoreInfo");
                $(document).on("hover", "a.MWQMRunMoreInfo", function () {
                    var TVItemID = parseInt($(_this).data("tvitemid"));
                    if (TVItemID != 0) {
                        cssp.GoogleMap.DrawCross(TVItemID);
                    }
                });
            };
            this.InitEdit = function () {
                if ($("tr.MWQMSample").length > 0) {
                    $(".jbMWQMRunDelete").removeClass("hidden");
                }
                $("#MWQMRunAddOrModifyForm").each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            MWQMRunTVItemID: {
                                required: true,
                            },
                            ParentTVItemID: {
                                required: true,
                            },
                            RunDateYear: {
                                required: true,
                            },
                            RunDateMonth: {
                                required: true,
                                min: 1,
                                max: 12,
                            },
                            RunDateDay: {
                                required: true,
                                min: 1,
                                max: 31,
                            },
                            RunStartTime: {
                                required: true,
                                minlength: 5,
                                maxlength: 5,
                            },
                            RunEndTime: {
                                required: true,
                                minlength: 5,
                                maxlength: 5,
                            },
                            LabReceivedRunSample: {
                                min: 1,
                                max: 2,
                            },
                            LabReceivedTime: {
                                minlength: 5,
                                maxlength: 5,
                            },
                            TemperatureControl: {
                                min: -15,
                                max: 36,
                            },
                            SeaStateAtStart_BeaufortScale: {
                                min: -1,
                                max: 12,
                            },
                            SeaStateAtEnd_BeaufortScale: {
                                min: -1,
                                max: 12,
                            },
                            WaterLevelAtBrook_m: {
                                min: 0,
                                max: 50,
                            },
                            WaveHightAtStart_m: {
                                min: 0,
                                max: 10,
                            },
                            WaveHightAtEnd_m: {
                                min: 0,
                                max: 10,
                            },
                            SampleCrewInitials: {
                                maxlength: 10,
                            },
                            AnalyzeMethod: {
                                min: 0,
                                max: 100,
                            },
                            SampleMatrix: {
                                min: 0,
                                max: 100,
                            },
                            Laboratory: {
                                min: 0,
                                max: 100,
                            },
                            LabAnalyzeStartIncubationDay: {
                                min: 1,
                                max: 2,
                            },
                            LabAnalyzeStartIncubationTime: {
                                minlength: 5,
                                maxlength: 5,
                            },
                            LabValidator: {
                                min: -1,
                                max: 2000,
                            },
                            LabValidateDateYear: {},
                            LabValidateDateMonth: {
                                min: 1,
                                max: 12,
                            },
                            LabValidateDateDay: {
                                min: 1,
                                max: 31,
                            },
                            LabValidateTime: {
                                minlength: 5,
                                maxlength: 5,
                            },
                            RainDay1_mm: {
                                min: 0,
                                max: 1000,
                            },
                            RainDay2_mm: {
                                min: 0,
                                max: 1000,
                            },
                            RainDay3_mm: {
                                min: 0,
                                max: 1000,
                            },
                        }
                    });
                });
                $("#MWQMRunSampleEditForm").each(function (ind, elem) {
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
            this.InitAddOrModify = function () {
                $(document).off("change", "select[name='RunDateYear'], select[name='RunDateMonth']");
                $(document).on("change", "select[name='RunDateYear'], select[name='RunDateMonth']", function (evt) {
                    var Year = parseInt($("select[name='RunDateYear']").val());
                    var Month = parseInt($("select[name='RunDateMonth']").val());
                    var daysInMonth = new Date(Year, Month, 0).getDate();
                    $("select[name='RunDateDay']").html("");
                    var optHTMLArr = [];
                    for (var i = 1; i < daysInMonth + 1; i++) {
                        optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                    }
                    $("select[name='RunDateDay']").html(optHTMLArr.join(""));
                });
                $(document).off("change", "select[name='LabRunSampleApprovalYear'], select[name='LabRunSampleApprovalMonth']");
                $(document).on("change", "select[name='LabRunSampleApprovalYear'], select[name='LabRunSampleApprovalMonth']", function (evt) {
                    var Year = parseInt($("select[name='LabRunSampleApprovalYear']").val());
                    var Month = parseInt($("select[name='LabRunSampleApprovalMonth']").val());
                    var daysInMonth = new Date(Year, Month, 0).getDate();
                    $("select[name='LabRunSampleApprovalDay']").html("");
                    var optHTMLArr = [];
                    for (var i = 1; i < daysInMonth + 1; i++) {
                        optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                    }
                    $("select[name='LabRunSampleApprovalDay']").html(optHTMLArr.join(""));
                });
            };
            this.MWQMRunAddOrModify = function () {
                var $form = $("#MWQMRunAddOrModifyForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#MWQMRunAddOrModifyForm", "MWQMRunEditDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret.Error) {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            document.location.href = document.location.href.replace("|||" + $("#ViewDiv").data("tvitemid") + "|||", "|||" + ret.MWQMRunTVItemID + "|||");
                            //cssp.Helper.PageRefresh();
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.MWQMSubsectorAddOrModify = function () {
                var $form = $("#MWQMSubsectorAddOrModifyForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#MWQMSubsectorAddOrModifyForm", "MWQMSubsectorEditDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret.Error) {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.MWQMSubsectorShowEdit = function ($bjs) {
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
            this.MWQMRunDelete = function ($bjs) {
                var command = "MWQM/MWQMRunDeleteJSON";
                var MWQMRunTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                $.post(cssp.BaseURL + command, {
                    MWQMRunTVItemID: MWQMRunTVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $(".breadcrumb").find("li").last().find("a").trigger("click");
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MWQMRunAdd = function ($bjs) {
                var MWQMRunTVItemID = 0;
                var SubsectorTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $(".TVItemAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "MWQM/_mwqmRunAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        MWQMRunTVItemID: MWQMRunTVItemID,
                        SubsectorTVItemID: SubsectorTVItemID
                    })
                        .done(function (ret) {
                        $(".TVItemAdd").html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    cssp.Helper.PageRefresh();
                }
            };
            this.MarkAllRoutineSamplesAsValidated = function ($bjs) {
                var MWQMRunTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MWQM/MarkAllRoutineSamplesAsValidatedJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMRunTVItemID: MWQMRunTVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        $("select[name='SampleTypes']").each(function (index, elem) {
                            var value = $(elem).val();
                            if (value.indexOf("109") > -1) {
                                $(elem).closest("td").next("td").find("input[name='Validated']").removeAttr("checked").attr("checked", "checked");
                            }
                        });
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MarkAllRoutineSamplesAsNotValidated = function ($bjs) {
                var MWQMRunTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MWQM/MarkAllRoutineSamplesAsNotValidatedJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMRunTVItemID: MWQMRunTVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        $("select[name='SampleTypes']").each(function (index, elem) {
                            var value = $(elem).val();
                            if (value.indexOf("109") > -1) {
                                $(elem).closest("td").next("td").find("input[name='Validated']").removeAttr("checked");
                            }
                        });
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MarkAllRoutineSamplesAsIsSensitive = function ($bjs) {
                var MWQMRunTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MWQM/MarkAllRoutineSamplesAsIsSensitiveJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMRunTVItemID: MWQMRunTVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        $("select[name='SampleTypes']").each(function (index, elem) {
                            var value = $(elem).val();
                            if (value.indexOf("109") > -1) {
                                $(elem).closest("td").next("td").next("td").find("input[name='IsSensitive']").removeAttr("checked").attr("checked", "checked");
                            }
                        });
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MarkAllRoutineSamplesAsNotSensitive = function ($bjs) {
                var MWQMRunTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MWQM/MarkAllRoutineSamplesAsNotSensitiveJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMRunTVItemID: MWQMRunTVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        $("select[name='SampleTypes']").each(function (index, elem) {
                            var value = $(elem).val();
                            if (value.indexOf("109") > -1) {
                                $(elem).closest("td").next("td").next("td").find("input[name='IsSensitive']").removeAttr("checked");
                            }
                        });
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MWQMSampleAddOrModify = function ($bjs) {
                var MWQMSampleID = $bjs.data("mwqmsampleid");
                var MWQMRunTVItemID = $("#MWQMRunAddOrModifyForm").find("input[name='MWQMRunTVItemID']").val();
                var $MWQMSample = $bjs.closest("tr.MWQMSample");
                var MWQMSiteTVItemID = $MWQMSample.find("select[name='MWQMSiteTVItemID']").val();
                var SampleTime = $MWQMSample.find("input[name='SampleTime']").val();
                if (SampleTime.length == 4) {
                    SampleTime = SampleTime.substring(0, 2) + ":" + SampleTime.substring(2, 4);
                    $MWQMSample.find("input[name='SampleTime']").val(SampleTime);
                }
                var FecCol_MPN_100ml = $MWQMSample.find("input[name='FecCol_MPN_100ml']").val();
                var Salinity_PPT = $MWQMSample.find("input[name='Salinity_PPT']").val();
                var WaterTemp_C = $MWQMSample.find("input[name='WaterTemp_C']").val();
                var Depth_m = $MWQMSample.find("input[name='Depth_m']").val();
                var PH = $MWQMSample.find("input[name='PH']").val();
                var ProcessedBy = $MWQMSample.find("input[name='ProcessedBy']").val();
                var SampleTypes = $MWQMSample.find("select[name='SampleTypes']").val();
                var Validated = $MWQMSample.find("input[name='Validated']").is(":checked") ? true : false;
                var IsSensitive = $MWQMSample.find("input[name='IsSensitive']").is(":checked") ? true : false;
                var MWQMSampleNote = $MWQMSample.find("input[name='MWQMSampleNote']").val();
                if (FecCol_MPN_100ml.indexOf(",") > -1 || FecCol_MPN_100ml.indexOf(".") > -1) {
                    cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varFCShouldNotHaveCommaOrDecimal"));
                    return;
                }
                var command = "MWQM/MWQMRunSampleAddOrModifyJSON";
                $bjs.next("span").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var $form = $("#MWQMRunAddOrModifyForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#MWQMRunAddOrModifyForm", "MWQMRunEditDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    $.post(cssp.BaseURL + command, {
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
                        Validated: Validated,
                        IsSensitive: IsSensitive,
                        MWQMSampleNote: MWQMSampleNote,
                    })
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            if ($bjs.hasClass("jbMWQMSampleAdd")) {
                                var $OldAdd = $bjs.closest("tr.MWQMSample").clone();
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
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.MWQMRunSampleDelete = function ($bjs) {
                var command = "MWQM/MWQMRunSampleDeleteJSON";
                var MWQMSampleID = parseInt($bjs.data("mwqmsampleid"));
                $bjs.next("span").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $.post(cssp.BaseURL + command, {
                    MWQMSampleID: MWQMSampleID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $bjs.closest("tr.MWQMSample").remove();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MWQMRunShowOnMap = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $(".jbMWQMRunShowOnMap").each(function (ind, elem) {
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
                        .done(function (ret) {
                        $.map(ret, function (item) {
                            var tvLoc = new CSSP.tvLocation(item.TVItemID, item.TVText, item.TVType, item.SubTVType, item.MapObjList);
                            cssp.MWQMRun.mapItems.push(tvLoc);
                        });
                        cssp.GoogleMap.TVItemObjects = [];
                        cssp.GoogleMap.FillTVItemObjects(cssp.MWQMRun.mapItems, false);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.MWQMRunShowHideEdit = function ($bjs) {
                var MWQMRunTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var SubsectorTVItemID = 0;
                if ($bjs.hasClass("btn-default")) {
                    $(".jbMWQMRunDelete").removeClass("hidden");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var command = "MWQM/_mwqmRunAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        MWQMRunTVItemID: MWQMRunTVItemID,
                        SubsectorTVItemID: SubsectorTVItemID
                    })
                        .done(function (ret) {
                        $("#content").html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    cssp.Helper.PageRefresh();
                }
            };
            this.MWQMRunShowHideEditButtons = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
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
            this.SetDialogEventsRun = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        cssp.MWQMRun.MWQMRunDelete($bjs);
                    });
                });
            };
            this.SetDialogEventsRunSample = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        cssp.MWQMRun.MWQMRunSampleDelete($bjs);
                    });
                });
            };
        }
        return MWQMRun;
    }());
    CSSP.MWQMRun = MWQMRun;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.MWQMRun.js.map