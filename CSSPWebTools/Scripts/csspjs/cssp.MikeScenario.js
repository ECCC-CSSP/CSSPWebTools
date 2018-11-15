var CSSP;
(function (CSSP) {
    var MikeScenario = (function () {
        // Constructors
        function MikeScenario() {
            var _this = this;
            // Variables
            this.mapItems = new Array();
            this.AskToRemoveMikeScenario = function ($bjs) {
                var MikeScenarioName = $bjs.closest("#ViewDiv").find(".TVText").text();
                cssp.Dialog.ShowDialogAreYouSure(MikeScenarioName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MikeScenario.SetDialogEvents", $bjs);
            };
            this.AskToRemoveMikeScenarioSource = function ($bjs) {
                var MikeScenarioSourceName = $bjs.closest(".MikeScenarioSourceAddOrModifyForm").find("input[name='SourceName']").text();
                cssp.Dialog.ShowDialogAreYouSure(MikeScenarioSourceName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MikeScenario.SetDialogEventsSource", $bjs);
            };
            this.AskToRemoveMikeScenarioSourceStartEnd = function ($bjs) {
                var MikeScenarioSourceStartEndName = $bjs.closest(".MikeScenarioSourceEdit").find(".StartEndName").text();
                cssp.Dialog.ShowDialogAreYouSure(MikeScenarioSourceStartEndName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MikeScenario.SetDialogEventsSourceStartEnd", $bjs);
            };
            this.InitHideAskToRun = function () {
                $(".jbMikeScenarioAskToRun").removeClass("hidden").addClass("hidden");
                $(".jbMikeScenarioCopy").removeClass("hidden").addClass("hidden");
                $(".jbMikeScenarioDelete").removeClass("hidden").addClass("hidden");
                $(document).off("change", "input.CheckUseDecouplingFiles");
                $(document).on("change", $("input.CheckUseDecouplingFiles"), function (evt) {
                    if ($("input.CheckUseDecouplingFiles").is(":checked")) {
                        $("input.CheckGenerateDecouplingFiles").removeAttr("checked");
                    }
                });
                $(document).off("change", "input.CheckGenerateDecouplingFiles");
                $(document).on("change", $("input.CheckGenerateDecouplingFiles"), function (evt) {
                    if ($("input.CheckGenerateDecouplingFiles").is(":checked")) {
                        $("input.CheckUseDecouplingFiles").removeAttr("checked");
                    }
                });
            };
            this.InitMikeScenarioImport = function () {
                $(".MikeScenarioOtherFileImportForm, .MikeScenarioImportForm").validate({
                    rules: {
                        UploadClientPath: {
                            required: true,
                            maxlength: 250,
                        },
                        UploadFile: {
                            required: true,
                            maxlength: 250,
                        },
                    }
                });
            };
            this.InitMikeScenarioGeneralParametersEdit = function () {
                $("MikeScenarioGeneralParameterForm").validate({
                    rules: {
                        MikeScenarioTVItemID: {
                            required: true,
                        },
                        MikeScenarioName: {
                            required: true,
                            maxlength: 200,
                        },
                        MikeScenarioStartYear: {
                            required: true,
                            minlength: 1975,
                            maxlength: 2500,
                        },
                        MikeScenarioStartMonth: {
                            required: true,
                            minlength: 1,
                            maxlength: 12,
                        },
                        MikeScenarioStartDay: {
                            required: true,
                            minlength: 1,
                            maxlength: 31,
                        },
                        MikeScenarioStartTime: {
                            required: true,
                            minlength: 5,
                            maxlength: 5,
                        },
                        MikeScenarioEndYear: {
                            required: true,
                            minlength: 1975,
                            maxlength: 2500,
                        },
                        MikeScenarioEndMonth: {
                            required: true,
                            minlength: 1,
                            maxlength: 12,
                        },
                        MikeScenarioEndDay: {
                            required: true,
                            minlength: 1,
                            maxlength: 31,
                        },
                        MikeScenarioEndTime: {
                            required: true,
                            minlength: 5,
                            maxlength: 5,
                        },
                        DecayFactor_per_day: {
                            required: true,
                            minlength: 0,
                            maxlength: 5000,
                        },
                        DecayIsConstant: {
                            required: true,
                        },
                        DecayFactorAmplitude: {
                            required: true,
                            minlength: 0,
                            maxlength: 5000,
                        },
                        AmbientTemperature_C: {
                            required: true,
                            minlength: 0,
                            maxlength: 36,
                        },
                        AmbientSalinity_PSU: {
                            required: true,
                            minlength: 0,
                            maxlength: 36,
                        },
                        ResultFrequency_min: {
                            required: true,
                            minlength: 5,
                            maxlength: 60,
                        },
                        ManningNumber: {
                            required: true,
                            minlength: 20,
                            maxlength: 32,
                        },
                        WindSpeed_km_h: {
                            required: true,
                            minlength: 0,
                            maxlength: 100,
                        },
                        WindDirection_deg: {
                            required: true,
                            minlength: 0,
                            maxlength: 360,
                        },
                    }
                });
                $(document).off("change", "#MikeScenarioGeneralParameterForm select");
                $(document).on("change", $("#MikeScenarioGeneralParameterForm").find("select"), function (evt) {
                    var StartYear = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartYear']").val());
                    var StartMonth = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartMonth']").val());
                    var StartDay = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartDay']").val());
                    var StartTime = $("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartTime']").val();
                    var StartHour = 0;
                    var StartMinute = 0;
                    if (StartTime) {
                        StartHour = parseInt(StartTime.substring(0, 2));
                        StartMinute = parseInt(StartTime.substring(3, 5));
                    }
                    var EndYear = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndYear']").val());
                    var EndMonth = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndMonth']").val());
                    var EndDay = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndDay']").val());
                    var EndTime = $("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndTime']").val();
                    var EndHour = 0;
                    var EndMinute = 0;
                    if (EndTime) {
                        EndHour = parseInt(EndTime.substring(0, 2));
                        EndMinute = parseInt(EndTime.substring(3, 5));
                    }
                    var StartDate = new Date(StartYear, StartMonth, StartDay, StartHour, StartMinute);
                    var EndDate = new Date(EndYear, EndMonth, EndDay, EndHour, EndMinute);
                    var dif = EndDate.getTime() - StartDate.getTime(); // number of seconds between the two dates
                    if (dif < 0) {
                        cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("LayoutVariables", "varStartDateIsBiggerThanEndDate"));
                        $(".ScenarioLengthDays").text("-1");
                        $(".ScenarioLengthHours").text("-1");
                        $(".ScenarioLengthMinutes").text("-1");
                        return;
                    }
                    else {
                        var Days = parseInt((dif / 24 / 60 / 60 / 1000).toString());
                        var Hours = parseInt(((dif - (Days * 24 * 60 * 60 * 1000)) / 60 / 60 / 1000).toString());
                        var Minutes = parseInt(((dif - (Days * 24 * 60 * 60 * 1000) - (Hours * 60 * 60 * 1000)) / 60 / 1000).toString());
                        $(".ScenarioLengthDays").text(parseInt(Days.toString()));
                        $(".ScenarioLengthHours").text(parseInt(Hours.toString()));
                        $(".ScenarioLengthMinutes").text(parseInt(Minutes.toString()));
                    }
                });
            };
            this.InitMikeScenarioSource = function () {
                $(".MikeScenarioSourceAddOrModifyForm").each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            MikeScenarioTVItemID: {
                                required: true,
                            },
                            MikeSourceTVItemID: {
                                required: true,
                            },
                            SourceName: {
                                required: true,
                                maxlength: 200,
                            },
                            Lat: {
                                required: true,
                                minlength: -90,
                                maxlength: 90,
                            },
                            Lng: {
                                required: true,
                                minlength: -180,
                                maxlength: 180,
                            },
                        }
                    });
                });
                $(".MikeScenarioSourceStartEndForm").each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            MikeSourceStartEndID: {
                                required: true,
                            },
                            MikeSourceID: {
                                required: true,
                            },
                            MikeSourceTVItemID: {
                                required: true,
                            },
                            SourceFlowStart_m3_day: {
                                required: true,
                            },
                            SourceFlowStart_m3_s: {
                                required: true,
                            },
                            SourcePollutionStart_MPN_100ml: {
                                required: true,
                            },
                            SourceTemperatureStart_C: {
                                required: true,
                            },
                            SourceSalinityStart_PSU: {
                                required: true,
                            },
                            SourceFlowEnd_m3_day: {
                                required: true,
                            },
                            SourceFlowEnd_m3_s: {
                                required: true,
                            },
                            SourcePollutionEnd_MPN_100ml: {
                                required: true,
                            },
                            SourceTemperatureEnd_C: {
                                required: true,
                            },
                            SourceSalinityEnd_PSU: {
                                required: true,
                            },
                        }
                    });
                });
                $(document).off("click", "input[name='IsContinuous']");
                $(document).on("click", "input[name='IsContinuous']", function (evt) {
                    if ($(evt.target).is(":checked")) {
                        $(evt.target).closest(".MikeScenarioSourceEdit").find(".IsContinuous").removeClass("hidden");
                        $(evt.target).closest(".MikeScenarioSourceEdit").find(".IsNotContinuous").removeClass("hidden").addClass("hidden");
                    }
                    else {
                        $(evt.target).closest(".MikeScenarioSourceEdit").find(".IsContinuous").removeClass("hidden").addClass("hidden");
                        $(evt.target).closest(".MikeScenarioSourceEdit").find(".IsNotContinuous").removeClass("hidden");
                    }
                });
                $(document).off("click", "input[name='IsRiver']");
                $(document).on("click", "input[name='IsRiver']", function (evt) {
                    if ($(evt.target).is(":checked")) {
                        $(evt.target).closest(".MikeScenarioSourceEdit").find(".UseHydrometricCheckbox").removeClass("hidden");
                    }
                    else {
                        $(evt.target).closest(".MikeScenarioSourceEdit").find(".UseHydrometricCheckbox").removeClass("hidden").addClass("hidden");
                    }
                });
                $(document).off("click", "input[name='UseHydrometric']");
                $(document).on("click", "input[name='UseHydrometric']", function (evt) {
                    if ($(evt.target).is(":checked")) {
                        $(evt.target).closest(".MikeScenarioSourceEdit").find(".UseHydrometric").removeClass("hidden");
                    }
                    else {
                        $(evt.target).closest(".MikeScenarioSourceEdit").find(".UseHydrometric").removeClass("hidden").addClass("hidden");
                    }
                });
                $(document).off("change keyup paste", "input[name='SourceFlowStart_m3_day']");
                $(document).on("change keyup paste", "input[name='SourceFlowStart_m3_day']", function (evt) {
                    var Flow_m3_d = parseFloat($(evt.target).val());
                    var Flow_m3_s = Flow_m3_d / 3600 / 24;
                    $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowStart_m3_s']").val(Flow_m3_s.toString());
                });
                $(document).off("change keyup paste", "input[name='SourceFlowStart_m3_s']");
                $(document).on("change keyup paste", "input[name='SourceFlowStart_m3_s']", function (evt) {
                    var Flow_m3_s = parseFloat($(evt.target).val());
                    var Flow_m3_d = Flow_m3_s * 3600 * 24;
                    $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowStart_m3_day']").val(Flow_m3_d.toString());
                });
                $(document).off("change keyup paste", "input[name='SourceFlowEnd_m3_day']");
                $(document).on("change keyup paste", "input[name='SourceFlowEnd_m3_day']", function (evt) {
                    var Flow_m3_d = parseFloat($(evt.target).val());
                    var Flow_m3_s = Flow_m3_d / 3600 / 24;
                    $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowEnd_m3_s']").val(Flow_m3_s.toString());
                });
                $(document).off("change keyup paste", "input[name='SourceFlowEnd_m3_s']");
                $(document).on("change keyup paste", "input[name='SourceFlowEnd_m3_s']", function (evt) {
                    var Flow_m3_s = parseFloat($(evt.target).val());
                    var Flow_m3_d = Flow_m3_s * 3600 * 24;
                    $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowEnd_m3_day']").val(Flow_m3_d.toString());
                });
                $(document).off("change", ".MikeScenarioSourceStartForm select");
                $(document).on("change", $(".MikeScenarioSourceStartEndForm").find("select"), function (evt) {
                    var $form = $(evt.target).closest(".MikeScenarioSourceStartEndForm");
                    var StartYear = parseInt($form.find("select[name='MikeSourceStartYear']").val());
                    var StartMonth = parseInt($form.find("select[name='MikeSourceStartMonth']").val());
                    var StartDay = parseInt($form.find("select[name='MikeSourceStartDay']").val());
                    var StartTime = $form.find("select[name='MikeSourceStartTime']").val();
                    var StartHour = parseInt(StartTime.substring(0, 2));
                    var StartMinute = parseInt(StartTime.substring(3, 5));
                    var EndYear = parseInt($form.find("select[name='MikeSourceEndYear']").val());
                    var EndMonth = parseInt($form.find("select[name='MikeSourceEndMonth']").val());
                    var EndDay = parseInt($form.find("select[name='MikeSourceEndDay']").val());
                    var EndTime = $form.find("select[name='MikeSourceEndTime']").val();
                    var EndHour = parseInt(EndTime.substring(0, 2));
                    var EndMinute = parseInt(EndTime.substring(3, 5));
                    var StartDate = new Date(StartYear, StartMonth, StartDay, StartHour, StartMinute);
                    var MikeScenarioStartDate = new Date(parseInt($form.data("mikescenariostartdateyear")), parseInt($form.data("mikescenariostartdatemonth")), parseInt($form.data("mikescenariostartdateday")));
                    if (StartDate < MikeScenarioStartDate) {
                        $form.find(".DateOK").each(function (ind, elem) {
                            $(elem).removeClass("text-success").addClass("text-danger");
                        });
                        //cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varEffluentStartDateIsSmallerThanMikeScenarioStartDate"));
                        return;
                    }
                    else {
                        $form.find(".DateOK").each(function (ind, elem) {
                            $(elem).removeClass("text-danger").addClass("text-success");
                        });
                    }
                    var EndDate = new Date(EndYear, EndMonth, EndDay, EndHour, EndMinute);
                    var MikeScenarioEndDate = new Date(parseInt($form.data("mikescenarioenddateyear")), parseInt($form.data("mikescenarioenddatemonth")), parseInt($form.data("mikescenarioenddateday")));
                    if (EndDate > MikeScenarioEndDate) {
                        $form.find(".DateOK").each(function (ind, elem) {
                            $(elem).removeClass("text-success").addClass("text-danger");
                        });
                        //cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varEffluentEndDateIsBiggerThanMikeScenarioEndDate"));
                        return;
                    }
                    else {
                        $form.find(".DateOK").each(function (ind, elem) {
                            $(elem).removeClass("text-danger").addClass("text-success");
                        });
                    }
                    var dif = EndDate.getTime() - StartDate.getTime(); // number of seconds between the two dates
                    if (dif < 0) {
                        $form.find(".DateOK").each(function (ind, elem) {
                            $(elem).removeClass("text-success").addClass("text-danger");
                        });
                        //cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varStartDateIsBiggerThanEndDate"));
                        $(".SourceStartEndDays").text("-1");
                        $(".SourceStartEndHours").text("-1");
                        $(".SourceStartEndMinutes").text("-1");
                        return;
                    }
                    else {
                        var Days = parseInt((dif / 24 / 60 / 60 / 1000).toString());
                        var Hours = parseInt(((dif - (Days * 24 * 60 * 60 * 1000)) / 60 / 60 / 1000).toString());
                        var Minutes = parseInt(((dif - (Days * 24 * 60 * 60 * 1000) - (Hours * 60 * 60 * 1000)) / 60 / 1000).toString());
                        $(".SourceStartEndDays").text(parseInt(Days.toString()));
                        $(".SourceStartEndHours").text(parseInt(Hours.toString()));
                        $(".SourceStartEndMinutes").text(parseInt(Minutes.toString()));
                    }
                });
                $(document).off("change keyup paste", "input[name='SourceFlowEnd_m3_s']");
                $(document).on("change keyup paste", "input[name='SourceFlowEnd_m3_s']", function (evt) {
                    var Flow_m3_s = parseFloat($(evt.target).val());
                    var Flow_m3_d = Flow_m3_s * 3600 * 24;
                    $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowEnd_m3_day']").val(Flow_m3_d.toString());
                });
            };
            this.MikeScenarioCreateWebTideDataWLFromStartToEndDate = function () {
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MikeScenario/MikeScenarioCreateWebTideDataWLFromStartToEndDateJSON";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioAskToRun = function () {
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MikeScenario/MikeScenarioAskToRunJSON";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioAcceptWebTide = function ($bjs) {
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MikeScenario/AcceptWebTideJSON";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioBCDeleteNode = function ($bjs) {
                if ($(".GlobeIcon").hasClass("btn-default")) {
                    cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varMapShouldBeOpened"));
                    return;
                }
                else {
                    cssp.GoogleMap.infoWindow.close();
                }
                var command = "MikeScenario/DeleteMeshNodeJSON";
                var MapInfoPointID = parseInt($bjs.data("mapinfopointid"));
                $.post(cssp.BaseURL + command, {
                    MapInfoPointID: MapInfoPointID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.MikeScenario.RemoveNodeOnMap($bjs);
                        $bjs.closest(".MeshCoord").remove();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioCopy = function ($bjs) {
                var MikeScenarioTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                $("#content").html(cssp.GetHTMLVariable("#LayoutVariables", "varCopyingCurrentMIKEScenario"));
                var command = "MikeScenario/MikeScenarioCopyJSON";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $("#ViewDiv").find(".breadcrumb").children().last().find("a").trigger("click");
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MikeScenarioGeneralParametersEdit = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $(".jbMikeScenarioCopy").removeClass("hidden");
                    $(".jbMikeScenarioDelete").removeClass("hidden").addClass("hidden");
                    $(".jbMikeScenarioAskToRun").removeClass("hidden").addClass("hidden");
                    $("#MikeScenarioGeneralParametersDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var command = "MikeScenario/_mikeScenarioGeneralParametersEdit";
                    $.get(cssp.BaseURL + command, {
                        MikeScenarioTVItemID: MikeScenarioTVItemID,
                    }).done(function (ret) {
                        $("#MikeScenarioGeneralParametersDiv").html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                        return;
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $(".jbMikeScenarioCopy").addClass("hidden");
                    $(".jbMikeScenarioDelete").addClass("hidden");
                    $("#MikeScenarioGeneralParametersDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    cssp.Helper.PageRefresh();
                }
            };
            this.MikeScenarioGeneralParametersEditCancel = function ($bjs) {
                cssp.Helper.PageRefresh();
            };
            this.MikeScenarioGeneralParametersEditSave = function ($bjs) {
                var $form = $("#MikeScenarioGeneralParameterForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("MikeScenarioGeneralParameterForm", "MikeScenarioGeneralParametersDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
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
            this.MikeScenarioGenerateResultsShowStudyArea = function ($bjs) {
                $bjs.addClass("hidden");
                $(".MikeScenarioGenerateResultsShowStudyArea").removeClass("hidden");
                var mapItems = [];
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MikeScenario/GetStudyAreaContourPolygonListWithMikeScenarioTVItemIDJSON";
                $.get(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done(function (ret) {
                    $.map(ret, function (item) {
                        var tvLoc = new CSSP.tvLocation(item.TVItemID, item.TVText, item.TVType, item.SubTVType, item.MapObjList);
                        mapItems.push(tvLoc);
                    });
                    cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                    $(".MikeScenarioGenerateResultsShowStudyArea").removeClass("hidden").addClass("hidden");
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
                $bjs.removeClass("hidden").addClass("hidden");
            };
            this.MikeScenarioGetDrainageArea = function ($bjs) {
                var MikeSourceTVItemID = parseInt($bjs.data("tvitemid"));
                var DrainageAreaValue = $bjs.closest("form").find(".DrainageAreaValue");
                var command = "MikeScenario/GetDrainageAreaWithTVItemIDJSON";
                $.get(cssp.BaseURL + command, {
                    MikeSourceTVItemID: MikeSourceTVItemID,
                }).done(function (ret) {
                    DrainageAreaValue.html(ret);
                    cssp.GoogleMap.ReadAndShowObjects();
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioGetResults = function ($bjs) {
                var MikeScenarioResultsDiv$ = $bjs.closest("#MikeScenarioGeneralParametersDiv").find(".MikeScenarioResultsDiv");
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    MikeScenarioResultsDiv$.removeClass("hidden");
                    MikeScenarioResultsDiv$.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command_1 = "MikeScenario/MikeScenarioGetResultsJSON";
                    $.get(cssp.BaseURL + command_1, {
                        MikeScenarioTVItemID: MikeScenarioTVItemID,
                    }).done(function (ret) {
                        cssp.MikeScenario.MIKEResult = ret;
                        MikeScenarioResultsDiv$.html(JSON.stringify(ret));
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                        return;
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    MikeScenarioResultsDiv$.removeClass("hidden").addClass("hidden");
                }
            };
            this.MikeScenarioResetDrainageArea = function ($bjs) {
                var MikeSourceTVItemID = parseInt($bjs.data("tvitemid"));
                var KMLDrainageArea = $bjs.closest("form").find("textarea[name='KMLDrainageArea']").val();
                KMLDrainageArea = KMLDrainageArea.replace(/</g, "|||");
                var command = "MikeScenario/ResetDrainageAreaWithTVItemIDJSON";
                $.post(cssp.BaseURL + command, {
                    MikeSourceTVItemID: MikeSourceTVItemID,
                    KMLDrainageArea: KMLDrainageArea,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithFail(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        cssp.GoogleMap.ReadAndShowObjects();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioViewHydrometricData = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var MikeSourceTVItemID = parseInt($bjs.data("mikesourcetvitemid"));
                    var MikeScenarioTVItemID = parseInt($bjs.data("mikescenariotvitemid"));
                    var HydrometricDataP_1 = $bjs.closest(".HydrometricDataDiv").find(".HydrometricData");
                    HydrometricDataP_1.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command_2 = "MikeScenario/_mikeScenarioSourceHydrometricData";
                    $.get(cssp.BaseURL + command_2, {
                        MikeScenarioTVItemID: MikeScenarioTVItemID,
                        MikeSourceTVItemID: MikeSourceTVItemID,
                    }).done(function (ret) {
                        HydrometricDataP_1.html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_2);
                        return;
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    var HydrometricDataP = $bjs.closest(".HydrometricDataDiv").find(".HydrometricData");
                    HydrometricDataP.html("");
                }
            };
            this.MikeScenarioLoadHydrometricData = function ($bjs) {
                var MikeSourceTVItemID = parseInt($bjs.data("mikesourcetvitemid"));
                var MikeScenarioTVItemID = parseInt($bjs.data("mikescenariotvitemid"));
                var LoadHydrometricDataWorking = $bjs.closest(".HydrometricDataDiv").find(".MikeScenarioLoadHydrometricDataWorkingDiv");
                LoadHydrometricDataWorking.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "MikeScenario/LoadHydrometricDataValueJSON";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                    MikeSourceTVItemID: MikeSourceTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $bjs.closest(".HydrometricDataDiv").find(".jbMikeScenarioViewHydrometricData").trigger("click");
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioLoadHydrometricDataRefresh = function ($bjs) {
                $bjs.closest(".HydrometricDataDiv").find(".jbMikeScenarioViewHydrometricData").trigger("click");
            };
            this.MikeScenarioCalculateFactor = function ($bjs) {
                var MikeSourceTVItemID = parseInt($bjs.data("tvitemid"));
                var FactorValue = $bjs.closest("form").find(".FactorValue");
                var SourceDrainageArea = parseFloat($bjs.closest("form").find("input[name='DrainageArea_km2']").val());
                var HydrometricDrainageArea = parseFloat($bjs.closest("form").find(".HydrometricDrainageArea").text());
                FactorValue.html("" + (SourceDrainageArea / HydrometricDrainageArea));
            };
            this.MikeScenarioGenerateWebTideNodes = function ($bjs) {
                var BoundaryConditionName = $(".MikeScenarioBoundaryConditionDiv").first().find(".BoundaryConditionName").first().text();
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var BCMeshTVItemID = parseInt($bjs.closest(".MikeScenarioBoundaryConditionDiv").first().find(".MeshNodeTVItemID").first().text());
                var WebTideNodeNumb = parseInt($bjs.closest(".MikeScenarioBoundaryConditionDiv").first().find("input[name=WebTideNodeNumb]").first().val());
                var command = "MikeScenario/GenerateWebTideJSON";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                    BCMeshTVItemID: BCMeshTVItemID,
                    WebTideNodeNumb: WebTideNodeNumb
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioImport = function ($bjs) {
                var $form = $bjs.closest(".MikeScenarioImportForm").first();
                var bar = $bjs.closest(".ImportNewMikeScenarioDiv").first().find('.bar').first();
                var percent = $bjs.closest(".ImportNewMikeScenarioDiv").first().find('.percent').first();
                var status = $bjs.closest(".ImportNewMikeScenarioDiv").first().find('.status').first();
                $(".MikeScenarioImportProgress").removeClass("hidden");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogError(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFind_"), "MikeScenarioImportForm");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var options = {
                        beforeSend: function () {
                            status.empty();
                            var percentVal = '0%';
                            bar.width(percentVal);
                            percent.html(percentVal);
                        },
                        uploadProgress: function (event, position, total, percentComplete) {
                            var percentVal = percentComplete + '%';
                            bar.width(percentVal);
                            percent.html(percentVal);
                        },
                        success: function () {
                            var percentVal = 'Upload completed';
                            bar.width(percentVal);
                            percent.html(percentVal);
                            cssp.Helper.PageRefresh();
                        },
                        complete: function (xhr) {
                            status.html(xhr.responseText);
                        },
                        url: cssp.BaseURL + $form.attr("action"),
                        data: $form.serializeArray(),
                    };
                    $form.ajaxForm(options);
                    $form.ajaxSubmit(options);
                    return false;
                }
            };
            this.MikeScenarioMeshBCNodeListShowHide = function ($bjs) {
                if ($bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".MeshNodeList").hasClass("hidden")) {
                    $bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".MeshNodeList").removeClass("hidden");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                }
                else {
                    $bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".MeshNodeList").addClass("hidden");
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.MikeScenarioNodesViewOnMap = function ($bjs) {
                if ($(".GlobeIcon").hasClass("btn-default")) {
                    cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varMapShouldBeOpened"));
                    return;
                }
                else {
                    cssp.GoogleMap.infoWindow.close();
                }
                if (cssp.GoogleMap.MarkerTextLength < 2) {
                    cssp.GoogleMap.MarkerTextLength = 2;
                }
                if ($bjs.hasClass("btn-success")) {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
                else {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                }
                cssp.GoogleMap.TVItemObjects.length = 0;
                _this.mapItems = [];
                cssp.GoogleMap.DrawObjects();
                var NullArray = [];
                cssp.GoogleMap.MinLat = 90;
                cssp.GoogleMap.MaxLat = -90;
                cssp.GoogleMap.MinLng = 180;
                cssp.GoogleMap.MaxLng = -180;
                $("#MikeScenarioDiv").find(".jbMikeScenarioNodesViewOnMap").each(function (ind, elemTop) {
                    if ($(elemTop).hasClass("btn-success")) {
                        $(elemTop).closest(".BCUL").find(".MeshCoord").each(function (ind, elem) {
                            var mo = new CSSP.MapObj(-1, CSSP.DrawTypeEnum.Point, [new CSSP.Coord(parseFloat($(elem).data("meshnodelat")), parseFloat($(elem).data("meshnodelng")), parseFloat($(elem).data("meshnodeordinal")))]);
                            var MapObjList = [];
                            MapObjList.push(mo);
                            _this.mapItems.push(new CSSP.tvLocation(parseInt($bjs.closest("#ViewDiv").data("tvitemid")), "" + $(elem).data("meshnodeordinal"), CSSP.TVTypeEnum.MikeBoundaryConditionMesh, CSSP.TVTypeEnum.MikeBoundaryConditionMesh, MapObjList));
                        });
                        $(elemTop).closest(".BCUL").find(".WebTideCoord").each(function (ind, elem) {
                            var mo = new CSSP.MapObj(-1, CSSP.DrawTypeEnum.Point, [new CSSP.Coord(parseFloat($(elem).data("webtidenodelat")), parseFloat($(elem).data("webtidenodelng")), parseFloat($(elem).data("webtidenodeordinal")))]);
                            var MapObjList = [];
                            MapObjList.push(mo);
                            _this.mapItems.push(new CSSP.tvLocation(parseInt($bjs.closest("#ViewDiv").data("tvitemid")), "" + $(elem).data("webtidenodeordinal"), CSSP.TVTypeEnum.MikeBoundaryConditionWebTide, CSSP.TVTypeEnum.MikeBoundaryConditionWebTide, MapObjList));
                        });
                    }
                });
                cssp.GoogleMap.FillTVItemObjects(_this.mapItems, true);
            };
            this.MikeScenarioOtherFileImport = function ($bjs) {
                var $form = $($bjs.closest(".MikeScenarioOtherFileImportForm").first());
                var bar = $form.closest(".MikeScenarioOtherFileImportDiv").first().find('.bar').first();
                var percent = $form.closest(".MikeScenarioOtherFileImportDiv").first().find('.percent').first();
                var status = $form.closest(".MikeScenarioOtherFileImportDiv").first().find('.status').first();
                $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find(".MikeScenarioOtherFileImportProgress").removeClass("hidden");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogError(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFind_"), "MikeScenarioOtherFileImportForm");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var options = {
                        beforeSend: function () {
                            status.empty();
                            var percentVal = '0%';
                            bar.width(percentVal);
                            percent.html(percentVal);
                        },
                        uploadProgress: function (event, position, total, percentComplete) {
                            var percentVal = percentComplete + '%';
                            bar.width(percentVal);
                            percent.html(percentVal);
                        },
                        success: function () {
                            bar.width("100%");
                            percent.html("100%");
                            //C:\CSSP\Modelling\Mike21\New Brunswick\Cap-Pele\External Data\Cap_Pele Current West.dfs0cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varUploadedCompleted"));
                        },
                        complete: function (xhr) {
                            status.html(xhr.responseText);
                        },
                        url: cssp.BaseURL + $form.attr("action"),
                        data: $form.serializeArray(),
                    };
                    $form.ajaxForm(options);
                    $form.ajaxSubmit(options);
                    return false;
                }
            };
            this.MikeScenarioOtherFileNotImport = function ($bjs) {
                var ClientFullFileName = $bjs.closest(".MikeScenarioOtherFileImportDiv").find(".MikeScenarioOtherFileImportForm").first().find("input[name=ClientFullPath]").first().val();
                var TVFileTVItemID = parseInt($bjs.closest(".MikeScenarioOtherFileImportDiv").find(".MikeScenarioOtherFileImportForm").first().find("input[name=TVFileTVItemID]").first().val());
                var bar = $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find('.bar').first();
                var percent = $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find('.percent').first();
                var status = $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find('.status').first();
                var command = "MikeScenario/_mikeScenarioOtherFileNotImport";
                $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find(".MikeScenarioOtherFileImportProgress").removeClass("hidden");
                $.post(cssp.BaseURL + command, {
                    TVFileTVItemID: TVFileTVItemID,
                }).done(function (ret) {
                    bar.width("100%");
                    percent.html("100%");
                    //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varUploadedCompleted"));
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MikeScenarioAdd = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $(".TVItemAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var TVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var command = "MikeScenario/_mikeScenarioAdd";
                    $.get(cssp.BaseURL + command, {
                        TVItemID: TVItemID,
                    }).done(function (ret) {
                        $(".TVItemAdd").html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithError(command);
                        return;
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $(".TVItemAdd").html("");
                }
            };
            this.MikeScenarioReestablishEditing = function () {
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MikeScenario/MikeScenarioReestablishEditing";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioResetWebTide = function ($bjs) {
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "MikeScenario/ResetWebTideJSON";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            };
            this.MikeScenarioSelectPreviousInput = function ($bjs) {
                $(".MikeScenarioClientFullFileName").removeClass("bg-info");
                $bjs.closest("li").find(".MikeScenarioClientFullFileName").addClass("bg-info");
                $bjs.closest("li").find("input.MikeScenarioClientFullFileNameInput").select();
            };
            this.MikeScenarioSetupWebTide = function ($bjs) {
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var WebTideDataSet = $("#ViewDiv").find(".MikeScenarioBoundaryConditionDataPathBC").first().val();
                var command = "MikeScenario/SetupWebTideJSON";
                $.post(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                    WebTideDataSet: WebTideDataSet,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MikeScenarioShowHideErrorInfo = function ($bjs) {
                $bjs.closest(".jsTVItemTop").first().find(".jsMikeScenarioErrorInfoDiv").toggle();
            };
            this.MikeScenarioSourceEditAdd = function ($bjs) {
                var $form = $bjs.closest(".MikeScenarioSourceAddOrModifyForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("MikeScenarioSourceAddOrModifyForm", "MikeScenarioSourcesDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
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
            this.MikeScenarioSourceEditCancel = function ($bjs) {
                $bjs.closest(".MikeScenarioSource").find(".jbMikeScenarioSourceEditShowHide").trigger("click");
            };
            this.MikeScenarioSourceEditSave = function ($bjs) {
                var $form = $bjs.closest(".MikeScenarioSourceAddOrModifyForm");
                var MikeSourceName = $bjs.closest(".MikeScenarioSourceTop").find(".MikeSourceName").text();
                $bjs.closest("form").find("textarea[name='KMLDrainageArea']").val("");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("MikeScenarioSourceAddOrModifyForm", "MikeScenarioSourceEdit");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varModified") + " " + MikeSourceName);
                            cssp.MikeScenario.MikeScenarioSourceReLoad($bjs.closest(".MikeScenarioSourceTop"));
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.MikeScenarioSourceReLoad = function ($bjs) {
                $bjs.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var MikeSourceTVItemID = parseInt($bjs.data("tvitemid"));
                var ReloadMikeSourceFile = $bjs.data("sourcefilename");
                var command = "MikeScenario/" + ReloadMikeSourceFile;
                $.get(cssp.BaseURL + command, { MikeSourceTVItemID: MikeSourceTVItemID })
                    .done(function (ret) {
                    $bjs.html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MikeScenarioSourceStartEndAdd = function ($bjs) {
                var MikeSourceTVItemID = parseInt($bjs.data("tvitemid"));
                var command = "MikeScenario/MikeScenarioSourceStartEndAddJSON";
                $.post(cssp.BaseURL + command, {
                    MikeSourceTVItemID: MikeSourceTVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.MikeScenario.MikeScenarioSourceReLoad($bjs.closest(".MikeScenarioSourceTop"));
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MikeScenarioSourceStartEndSave = function ($bjs) {
                var $form = $bjs.closest(".MikeScenarioSourceStartEndForm");
                var MikeSourceName = $bjs.closest(".MikeScenarioSourceTop").find(".MikeSourceName").text();
                var Effluent = $form.find(".StartEndName").text();
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("MikeScenarioSourceStartEndForm", "MikeScenarioSourceStartEndDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess") + " " + MikeSourceName + " " + Effluent);
                            cssp.MikeScenario.MikeScenarioSourceReLoad($bjs.closest(".MikeScenarioSourceTop"));
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.MikeScenarioSourceEditShowHide = function ($bjs) {
                $(".jbMikeScenarioSourceEditShowHide, .jbMikeScenarioSourceShowHideAdd").each(function (ind, elem) {
                    if ($bjs.closest(".MikeScenarioSource").data("tvitemid") != $(elem).closest(".MikeScenarioSource").data("tvitemid")) {
                        if ($(elem).hasClass("btn-success")) {
                            $(elem).trigger("click");
                        }
                    }
                });
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".MikeScenarioSource").find(".MikeScenarioSourceEdit").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".MikeScenarioSource").find(".MikeScenarioSourceEdit").removeClass("hidden").addClass("hidden");
                }
            };
            this.MikeScenarioSourceStartEndEditShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".MikeScenarioSourceStartEndDiv").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".MikeScenarioSourceStartEndDiv").removeClass("hidden").addClass("hidden");
                }
            };
            this.MikeScenarioSourceEditNameLatLngShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".MikeScenarioSource").find(".MikeScenarioSourceEditNameLatLng").removeClass("hidden");
                    $bjs.closest(".MikeScenarioSource").find(".MikeScenarioTime").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".MikeScenarioSource").find(".MikeScenarioSourceEditNameLatLng").removeClass("hidden").addClass("hidden");
                    $bjs.closest(".MikeScenarioSource").find(".MikeScenarioTime").removeClass("hidden").addClass("hidden");
                }
            };
            this.MikeScenarioSourceInfoShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".MikeScenarioSource").find(".MikeScenarioSourceInfo").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".MikeScenarioSource").find(".MikeScenarioSourceInfo").removeClass("hidden").addClass("hidden");
                }
            };
            this.MikeScenarioWebTideBCNodeListShowHide = function ($bjs) {
                if ($bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".WebTideNodeList").hasClass("hidden")) {
                    $bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".WebTideNodeList").removeClass("hidden");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                }
                else {
                    $bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".WebTideNodeList").addClass("hidden");
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.MikeScenarioWebTideBCNodesViewOnMap = function ($bjs) {
                if ($(".GlobeIcon").hasClass("btn-default")) {
                    cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varMapShouldBeOpened"));
                    return;
                }
                else {
                    cssp.GoogleMap.infoWindow.close();
                }
                if ($bjs.hasClass("btn-success")) {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
                else {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                }
                cssp.GoogleMap.TVItemObjects.length = 0;
                _this.mapItems.length = 0;
                cssp.GoogleMap.DrawObjects();
                var NullArray = [];
                cssp.GoogleMap.MinLat = 90;
                cssp.GoogleMap.MaxLat = -90;
                cssp.GoogleMap.MinLng = 180;
                cssp.GoogleMap.MaxLng = -180;
                $bjs.closest("#MikeScenarioDiv").find(".jbMikeScenarioWebTideBCNodesViewOnMap").each(function (ind, elemTop) {
                    if ($(elemTop).hasClass("btn-success")) {
                        $(elemTop).closest(".MikeScenarioBoundaryConditionDiv").find(".WebTideCoord").each(function (ind, elem) {
                            var MapObjList = [];
                            var mo = new CSSP.MapObj(-1, CSSP.DrawTypeEnum.Point, [new CSSP.Coord(parseFloat($(elem).find(".WebTideNodeLat").first().text().replace(",", ".")), parseFloat($(elem).find(".WebTideNodeLng").first().text().replace(",", ".")), parseInt($(elem).find(".WebTideOrdinal").first().text().replace(",", ".")))]);
                            MapObjList.push(mo);
                            _this.mapItems.push(new CSSP.tvLocation(parseInt($bjs.closest("#ViewDiv").data("tvitemid")), $(elem).find(".WebTideOrdinal").first().text(), CSSP.TVTypeEnum.MikeBoundaryConditionMesh, CSSP.TVTypeEnum.MikeBoundaryConditionMesh, MapObjList));
                        });
                    }
                });
                cssp.GoogleMap.FillTVItemObjects(_this.mapItems, true);
            };
            this.RemoveGeneralParameterEditButton = function ($bjs) {
                $(".jbMikeScenarioGeneralParametersEdit").addClass("hidden");
            };
            this.RemoveNodeOnMap = function ($bjs) {
                for (var i = 0, countItem = cssp.GoogleMap.TVItemObjects.length; i < countItem; i++) {
                    var ordinal = $bjs.data("ordinal");
                    if (ordinal == cssp.GoogleMap.TVItemObjects[i].TVText) {
                        cssp.GoogleMap.TVItemObjects.splice(i, 1);
                        break;
                    }
                }
                cssp.GoogleMap.DrawObjects();
            };
            this.MikeScenarioSourceShowHideAdd = function ($bjs) {
                var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                $(".jbMikeScenarioSourceEditShowHide").each(function (ind, elem) {
                    if ($(elem).hasClass("btn-success")) {
                        $(elem).trigger("click");
                    }
                });
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var command = "MikeScenario/_mikeScenarioSourceAdd";
                    $.get(cssp.BaseURL + command, {
                        MikeScenarioTVItemID: MikeScenarioTVItemID,
                    }).done(function (ret) {
                        $(".MikeScenarioSourceAdd").html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $(".MikeScenarioSourceAdd").html("");
                }
            };
            this.MikeScnenarioShowHideAdd = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
                if ($bjs.hasClass("btn-default")) {
                    $tabContent.find(".jbMikeScenarioShowHideEditButtons").removeClass("btn-default").addClass("btn-success");
                    $tabContent.find(".jbMikeScenarioAdd").removeClass("hidden");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden");
                    cssp.View.ShowMoveTVItemButton($bjs);
                }
                else {
                    $tabContent.find(".jbMikeScenarioShowHideEditButtons").removeClass("btn-success").addClass("btn-default");
                    $tabContent.find(".jbMikeScenarioAdd").removeClass("hidden").addClass("hidden");
                    $tabContent.find(".jbMikeScenarioAdd").removeClass("btn-success").addClass("btn-default");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden").addClass("hidden");
                    $(".MikeScenarioAdd").html("");
                    cssp.TVItem.EditCancel($bjs);
                    cssp.View.HideMoveTVItemButton($bjs);
                }
            };
            this.MikeScnenarioShowHideEditButtons = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
                if ($bjs.hasClass("btn-default")) {
                    $tabContent.find(".jbMikeScenarioShowHideEditButtons").removeClass("btn-default").addClass("btn-success");
                    $tabContent.find(".jbMikeScenarioAdd").removeClass("hidden");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden");
                    cssp.View.ShowMoveTVItemButton($bjs);
                }
                else {
                    $tabContent.find(".jbMikeScenarioShowHideEditButtons").removeClass("btn-success").addClass("btn-default");
                    $tabContent.find(".jbMikeScenarioAdd").removeClass("hidden").addClass("hidden");
                    $tabContent.find(".jbMikeScenarioAdd").removeClass("btn-success").addClass("btn-default");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden").addClass("hidden");
                    $(".MikeScenarioAdd").html("");
                    cssp.TVItem.EditCancel($bjs);
                    cssp.View.HideMoveTVItemButton($bjs);
                }
            };
            this.MikeScenarioShowHideWaterLevels = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".MikeScenarioWaterLevelsTop").find(".MikeScenarioWaterLevels").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".MikeScenarioWaterLevelsTop").find(".MikeScenarioWaterLevels").removeClass("hidden").addClass("hidden");
                }
            };
            this.MikeScnenarioSourceShowHideEditButtons = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $(".jbMikeScenarioSourceEditShowHide").removeClass("hidden");
                }
                else {
                    $(".jbMikeScenarioSourceEditShowHide").removeClass("hidden").addClass("hidden");
                }
            };
            this.SetDialogEvents = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var MikeScenarioTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                        var command = "MikeScenario/MikeScenarioDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            MikeScenarioTVItemID: MikeScenarioTVItemID,
                        }).done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                $("#ViewDiv").find(".breadcrumb").children().last().find("a").trigger("click");
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                            return;
                        });
                    });
                });
            };
            this.SetDialogEventsSource = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var MikeSourceTVItemID = parseInt($bjs.closest(".MikeScenarioSource").data("tvitemid"));
                        var command = "MikeScenario/MikeScenarioSourceDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            MikeSourceTVItemID: MikeSourceTVItemID,
                        }).done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.SetDialogEventsSourceStartEnd = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var MikeSourceStartEndID = parseInt($bjs.data("mikesourcestartendid"));
                        var MikeSourceTVItemID = parseInt($bjs.data("mikesourcetvitemid"));
                        var command = "MikeScenario/MikeScenarioSourceStartEndDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            MikeSourceStartEndID: MikeSourceStartEndID,
                            MikeSourceTVItemID: MikeSourceTVItemID,
                        })
                            .done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.MikeScenario.MikeScenarioSourceReLoad($bjs.closest(".MikeScenarioSourceTop"));
                            }
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
        }
        return MikeScenario;
    }());
    CSSP.MikeScenario = MikeScenario;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.MikeScenario.js.map