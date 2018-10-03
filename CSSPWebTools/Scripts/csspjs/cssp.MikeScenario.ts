
module CSSP {
    export class MikeScenario {
        // Variables
        public mapItems: Array<CSSP.tvLocation> = new Array<CSSP.tvLocation>();

        // Constructors
        constructor() {
        }
        public AskToRemoveMikeScenario: Function = ($bjs: JQuery): void => {
            var MikeScenarioName: string = $bjs.closest("#ViewDiv").find(".TVText").text();
            cssp.Dialog.ShowDialogAreYouSure(MikeScenarioName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MikeScenario.SetDialogEvents", $bjs);
        };
        public AskToRemoveMikeScenarioSource: Function = ($bjs: JQuery): void => {
            var MikeScenarioSourceName: string = $bjs.closest(".MikeScenarioSourceAddOrModifyForm").find("input[name='SourceName']").text();
            cssp.Dialog.ShowDialogAreYouSure(MikeScenarioSourceName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MikeScenario.SetDialogEventsSource", $bjs);
        };
        public AskToRemoveMikeScenarioSourceStartEnd: Function = ($bjs: JQuery): void => {
            var MikeScenarioSourceStartEndName: string = $bjs.closest(".MikeScenarioSourceEdit").find(".StartEndName").text();
            cssp.Dialog.ShowDialogAreYouSure(MikeScenarioSourceStartEndName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.MikeScenario.SetDialogEventsSourceStartEnd", $bjs);
        };
        public InitMikeScenarioImport: Function = (): void => {
            $(".MikeScenarioOtherFileImportForm, .MikeScenarioImportForm").validate(
                {
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
        public InitMikeScenarioGeneralParametersEdit: Function = (): void => {
            $("MikeScenarioGeneralParameterForm").validate(
                {
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
            $(document).on("change", $("#MikeScenarioGeneralParameterForm").find("select"), (evt: Event) => {
                var StartYear: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartYear']").val());
                var StartMonth: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartMonth']").val());
                var StartDay: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartDay']").val());
                var StartTime: string = $("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartTime']").val();
                var StartHour: number = parseInt(StartTime.substring(0, 2));
                var StartMinute: number = parseInt(StartTime.substring(3, 5));

                var EndYear: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndYear']").val());
                var EndMonth: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndMonth']").val());
                var EndDay: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndDay']").val());
                var EndTime: string = $("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndTime']").val();
                var EndHour: number = parseInt(EndTime.substring(0, 2));
                var EndMinute: number = parseInt(EndTime.substring(3, 5));

                var StartDate: Date = new Date(StartYear, StartMonth, StartDay, StartHour, StartMinute);
                var EndDate: Date = new Date(EndYear, EndMonth, EndDay, EndHour, EndMinute);

                var dif: number = EndDate.getTime() - StartDate.getTime(); // number of seconds between the two dates

                if (dif < 0) {
                    cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("LayoutVariables", "varStartDateIsBiggerThanEndDate"));
                    $(".ScenarioLengthDays").text("-1");
                    $(".ScenarioLengthHours").text("-1");
                    $(".ScenarioLengthMinutes").text("-1");
                    return;
                }
                else {
                    var Days: number = parseInt((dif / 24 / 60 / 60 / 1000).toString());
                    var Hours: number = parseInt(((dif - (Days * 24 * 60 * 60 * 1000)) / 60 / 60 / 1000).toString());
                    var Minutes: number = parseInt(((dif - (Days * 24 * 60 * 60 * 1000) - (Hours * 60 * 60 * 1000)) / 60 / 1000).toString());
                    $(".ScenarioLengthDays").text(parseInt(Days.toString()));
                    $(".ScenarioLengthHours").text(parseInt(Hours.toString()));
                    $(".ScenarioLengthMinutes").text(parseInt(Minutes.toString()));
                }

            });
        };
        public InitMikeScenarioSource: Function = (): void => {
            $(".MikeScenarioSourceAddOrModifyForm").each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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

            $(".MikeScenarioSourceStartEndForm").each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
            $(document).on("click", "input[name='IsContinuous']", (evt: Event) => {
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
            $(document).on("click", "input[name='IsRiver']", (evt: Event) => {
                if ($(evt.target).is(":checked")) {
                    $(evt.target).closest(".MikeScenarioSourceEdit").find(".UseHydrometricCheckbox").removeClass("hidden");
                }
                else {
                    $(evt.target).closest(".MikeScenarioSourceEdit").find(".UseHydrometricCheckbox").removeClass("hidden").addClass("hidden");
                }
            });

            $(document).off("click", "input[name='UseHydrometric']");
            $(document).on("click", "input[name='UseHydrometric']", (evt: Event) => {
                if ($(evt.target).is(":checked")) {
                    $(evt.target).closest(".MikeScenarioSourceEdit").find(".UseHydrometric").removeClass("hidden");
                }
                else {
                    $(evt.target).closest(".MikeScenarioSourceEdit").find(".UseHydrometric").removeClass("hidden").addClass("hidden");
                }
            });

            $(document).off("change keyup paste", "input[name='SourceFlowStart_m3_day']");
            $(document).on("change keyup paste", "input[name='SourceFlowStart_m3_day']", (evt: Event) => {
                var Flow_m3_d: number = parseFloat($(evt.target).val());
                var Flow_m3_s: number = Flow_m3_d / 3600 / 24;
                $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowStart_m3_s']").val(Flow_m3_s.toString());
            });

            $(document).off("change keyup paste", "input[name='SourceFlowStart_m3_s']");
            $(document).on("change keyup paste", "input[name='SourceFlowStart_m3_s']", (evt: Event) => {
                var Flow_m3_s: number = parseFloat($(evt.target).val());
                var Flow_m3_d: number = Flow_m3_s * 3600 * 24;
                $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowStart_m3_day']").val(Flow_m3_d.toString());
            });

            $(document).off("change keyup paste", "input[name='SourceFlowEnd_m3_day']");
            $(document).on("change keyup paste", "input[name='SourceFlowEnd_m3_day']", (evt: Event) => {
                var Flow_m3_d: number = parseFloat($(evt.target).val());
                var Flow_m3_s: number = Flow_m3_d / 3600 / 24;
                $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowEnd_m3_s']").val(Flow_m3_s.toString());
            });

            $(document).off("change keyup paste", "input[name='SourceFlowEnd_m3_s']");
            $(document).on("change keyup paste", "input[name='SourceFlowEnd_m3_s']", (evt: Event) => {
                var Flow_m3_s: number = parseFloat($(evt.target).val());
                var Flow_m3_d: number = Flow_m3_s * 3600 * 24;
                $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowEnd_m3_day']").val(Flow_m3_d.toString());
            });

            $(document).off("change", ".MikeScenarioSourceStartForm select");
            $(document).on("change", $(".MikeScenarioSourceStartEndForm").find("select"), (evt: Event) => {
                var $form: JQuery = $(evt.target).closest(".MikeScenarioSourceStartEndForm");
                var StartYear: number = parseInt($form.find("select[name='MikeSourceStartYear']").val());
                var StartMonth: number = parseInt($form.find("select[name='MikeSourceStartMonth']").val());
                var StartDay: number = parseInt($form.find("select[name='MikeSourceStartDay']").val());
                var StartTime: string = $form.find("select[name='MikeSourceStartTime']").val();
                var StartHour: number = parseInt(StartTime.substring(0, 2));
                var StartMinute: number = parseInt(StartTime.substring(3, 5));

                var EndYear: number = parseInt($form.find("select[name='MikeSourceEndYear']").val());
                var EndMonth: number = parseInt($form.find("select[name='MikeSourceEndMonth']").val());
                var EndDay: number = parseInt($form.find("select[name='MikeSourceEndDay']").val());
                var EndTime: string = $form.find("select[name='MikeSourceEndTime']").val();
                var EndHour: number = parseInt(EndTime.substring(0, 2));
                var EndMinute: number = parseInt(EndTime.substring(3, 5));

                var StartDate: Date = new Date(StartYear, StartMonth, StartDay, StartHour, StartMinute);

                var MikeScenarioStartYear: number = parseInt($form.find(".MikeScenarioStartYear").text());
                var MikeScenarioStartMonth: number = parseInt($form.find(".MikeScenarioStartMonth").text());
                var MikeScenarioStartDay: number = parseInt($form.find(".MikeScenarioStartDay").text());
                var MikeScenarioStartHour: number = parseInt($form.find(".MikeScenarioStartHour").text());
                var MikeScenarioStartMinute: number = parseInt($form.find(".MikeScenarioStartMinute").text());
                if (StartDate < new Date(MikeScenarioStartYear, MikeScenarioStartMonth, MikeScenarioStartDay, MikeScenarioStartHour, MikeScenarioStartMinute)) {
                    cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varEffluentStartDateIsSmallerThanMikeScenarioStartDate"));
                    return;
                }

                var EndDate: Date = new Date(EndYear, EndMonth, EndDay, EndHour, EndMinute);

                var MikeScenarioEndYear: number = parseInt($form.find(".MikeScenarioEndYear").text());
                var MikeScenarioEndMonth: number = parseInt($form.find(".MikeScenarioEndMonth").text());
                var MikeScenarioEndDay: number = parseInt($form.find(".MikeScenarioEndDay").text());
                var MikeScenarioEndHour: number = parseInt($form.find(".MikeScenarioEndHour").text());
                var MikeScenarioEndMinute: number = parseInt($form.find(".MikeScenarioEndMinute").text());

                if (EndDate > new Date(MikeScenarioEndYear, MikeScenarioEndMonth, MikeScenarioEndDay, MikeScenarioEndHour, MikeScenarioEndMinute)) {
                    cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varEffluentEndDateIsBiggerThanMikeScenarioEndDate"));
                    return;
                }

                var dif: number = EndDate.getTime() - StartDate.getTime(); // number of seconds between the two dates

                if (dif < 0) {
                    cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varStartDateIsBiggerThanEndDate"));
                    $(".SourceStartEndDays").text("-1");
                    $(".SourceStartEndHours").text("-1");
                    $(".SourceStartEndMinutes").text("-1");
                    return;
                }
                else {
                    var Days: number = parseInt((dif / 24 / 60 / 60 / 1000).toString());
                    var Hours: number = parseInt(((dif - (Days * 24 * 60 * 60 * 1000)) / 60 / 60 / 1000).toString());
                    var Minutes: number = parseInt(((dif - (Days * 24 * 60 * 60 * 1000) - (Hours * 60 * 60 * 1000)) / 60 / 1000).toString());
                    $(".SourceStartEndDays").text(parseInt(Days.toString()));
                    $(".SourceStartEndHours").text(parseInt(Hours.toString()));
                    $(".SourceStartEndMinutes").text(parseInt(Minutes.toString()));
                }

            });

            $(document).off("change keyup paste", "input[name='SourceFlowEnd_m3_s']");
            $(document).on("change keyup paste", "input[name='SourceFlowEnd_m3_s']", (evt: Event) => {
                var Flow_m3_s: number = parseFloat($(evt.target).val());
                var Flow_m3_d: number = Flow_m3_s * 3600 * 24;
                $(evt.target).closest(".MikeScenarioSourceStartEndForm").find("input[name='SourceFlowEnd_m3_day']").val(Flow_m3_d.toString());
            });
        };
        public MikeScenarioCreateWebTideDataWLFromStartToEndDate: Function = (): void => {
            var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var command: string = "MikeScenario/MikeScenarioCreateWebTideDataWLFromStartToEndDateJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioAskToRun: Function = (): void => {
            var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var command: string = "MikeScenario/MikeScenarioAskToRunJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioAcceptWebTide: Function = ($bjs): void => {
            var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var command: string = "MikeScenario/AcceptWebTideJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioBCDeleteNode: Function = ($bjs): void => {
            if ($(".GlobeIcon").hasClass("btn-default")) {
                cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varMapShouldBeOpened"));
                return;
            }
            else {
                cssp.GoogleMap.infoWindow.close();
            }
            var command: string = "MikeScenario/DeleteMeshNodeJSON";
            var MapInfoPointID: number = parseInt($bjs.data("mapinfopointid"));
            $.post(cssp.BaseURL + command,
                {
                    MapInfoPointID: MapInfoPointID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.MikeScenario.RemoveNodeOnMap($bjs);
                        $bjs.closest(".MeshCoord").remove();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioCopy: Function = ($bjs): void => {
            var MikeScenarioTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            $("#content").html(cssp.GetHTMLVariable("#LayoutVariables", "varCopyingCurrentMIKEScenario"))
            var command: string = "MikeScenario/MikeScenarioCopyJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $("#ViewDiv").find(".breadcrumb").children().last().find("a").trigger("click");
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MikeScenarioGeneralParametersEdit: Function = ($bjs): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $(".jbMikeScenarioCopy").removeClass("hidden");
                $(".jbMikeScenarioDelete").removeClass("hidden").addClass("hidden");
                $(".jbMikeScenarioAskToRun").removeClass("hidden").addClass("hidden");
                $("#MikeScenarioGeneralParametersDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                var command: string = "MikeScenario/_mikeScenarioGeneralParametersEdit";
                $.get(cssp.BaseURL + command,
                    {
                        MikeScenarioTVItemID: MikeScenarioTVItemID,
                    }).done((ret) => {
                        $("#MikeScenarioGeneralParametersDiv").html(ret);
                    }).fail(() => {
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
        public MikeScenarioGeneralParametersEditCancel: Function = ($bjs): void => {
            cssp.Helper.PageRefresh();
        };
        public MikeScenarioGeneralParametersEditSave: Function = ($bjs): void => {
            var $form: JQuery = $("#MikeScenarioGeneralParameterForm");

            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("MikeScenarioGeneralParameterForm", "MikeScenarioGeneralParametersDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
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
        public MikeScenarioGenerateResultsShowStudyArea: Function = ($bjs: JQuery): void => {
            $bjs.addClass("hidden");
            $(".MikeScenarioGenerateResultsShowStudyArea").removeClass("hidden");

            let mapItems: Array<CSSP.tvLocation> = [];
            let MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let command: string = "MikeScenario/GetStudyAreaContourPolygonListWithMikeScenarioTVItemIDJSON";
            $.get(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret: Array<CSSP.tvLocation>) => {
                    $.map(ret, (item) => {
                        var tvLoc: CSSP.tvLocation = new CSSP.tvLocation(item.TVItemID, item.TVText, item.TVType, item.SubTVType, item.MapObjList);
                        mapItems.push(tvLoc);
                    });
                    cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                    $(".MikeScenarioGenerateResultsShowStudyArea").removeClass("hidden").addClass("hidden");
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
            $bjs.removeClass("hidden").addClass("hidden");
        };
        public MikeScenarioGetDrainageArea: Function = ($bjs: JQuery): void => {
            let MikeSourceTVItemID: number = parseInt($bjs.data("tvitemid"));
            let DrainageAreaValue: JQuery = $bjs.closest("form").find(".DrainageAreaValue");
            let command: string = "MikeScenario/GetDrainageAreaWithTVItemIDJSON";
            $.get(cssp.BaseURL + command,
                {
                    MikeSourceTVItemID: MikeSourceTVItemID,
                }).done((ret) => {
                    DrainageAreaValue.html(ret);
                    cssp.GoogleMap.ReadAndShowObjects();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioResetDrainageArea: Function = ($bjs: JQuery): void => {
            let MikeSourceTVItemID: number = parseInt($bjs.data("tvitemid"));
            let KMLDrainageArea: string = $bjs.closest("form").find("textarea[name='KMLDrainageArea']").val();
            KMLDrainageArea = KMLDrainageArea.replace(/</g, "|||");
            let command: string = "MikeScenario/ResetDrainageAreaWithTVItemIDJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeSourceTVItemID: MikeSourceTVItemID,
                    KMLDrainageArea: KMLDrainageArea,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithFail(ret);
                    }
                    else
                    {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        cssp.GoogleMap.ReadAndShowObjects();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioViewHydrometricData: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let MikeSourceTVItemID: number = parseInt($bjs.data("mikesourcetvitemid"));
                let MikeScenarioTVItemID: number = parseInt($bjs.data("mikescenariotvitemid"));
                let HydrometricDataP: JQuery = $bjs.closest(".HydrometricDataDiv").find(".HydrometricData");
                HydrometricDataP.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                let command: string = "MikeScenario/_mikeScenarioSourceHydrometricData";
                $.get(cssp.BaseURL + command,
                    {
                        MikeScenarioTVItemID: MikeScenarioTVItemID,
                        MikeSourceTVItemID: MikeSourceTVItemID,
                    }).done((ret) => {
                        HydrometricDataP.html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                        return;
                    });

            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                let HydrometricDataP: JQuery = $bjs.closest(".HydrometricDataDiv").find(".HydrometricData");
                HydrometricDataP.html("");
            }
        };
        public MikeScenarioLoadHydrometricData: Function = ($bjs: JQuery): void => {
            let MikeSourceTVItemID: number = parseInt($bjs.data("mikesourcetvitemid"));
            let MikeScenarioTVItemID: number = parseInt($bjs.data("mikescenariotvitemid"));
            let LoadHydrometricDataWorking: JQuery = $bjs.closest(".HydrometricDataDiv").find(".MikeScenarioLoadHydrometricDataWorkingDiv");
            LoadHydrometricDataWorking.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            let command: string = "MikeScenario/LoadHydrometricDataValueJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                    MikeSourceTVItemID: MikeSourceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $bjs.closest(".HydrometricDataDiv").find(".jbMikeScenarioViewHydrometricData").trigger("click");
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioLoadHydrometricDataRefresh: Function = ($bjs: JQuery): void => {
            $bjs.closest(".HydrometricDataDiv").find(".jbMikeScenarioViewHydrometricData").trigger("click");
        };
        public MikeScenarioCalculateFactor: Function = ($bjs: JQuery): void => {
            let MikeSourceTVItemID: number = parseInt($bjs.data("tvitemid"));
            let FactorValue: JQuery = $bjs.closest("form").find(".FactorValue");
            let SourceDrainageArea: number = parseFloat($bjs.closest("form").find("input[name='DrainageArea_km2']").val());
            let HydrometricDrainageArea: number = parseFloat($bjs.closest("form").find(".HydrometricDrainageArea").text());
            FactorValue.html("" + (SourceDrainageArea / HydrometricDrainageArea));
        };
        public MikeScenarioGenerateWebTideNodes: Function = ($bjs: JQuery): void => {
            var BoundaryConditionName = $(".MikeScenarioBoundaryConditionDiv").first().find(".BoundaryConditionName").first().text();
            var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var BCMeshTVItemID: number = parseInt($bjs.closest(".MikeScenarioBoundaryConditionDiv").first().find(".MeshNodeTVItemID").first().text());
            var WebTideNodeNumb: number = parseInt($bjs.closest(".MikeScenarioBoundaryConditionDiv").first().find("input[name=WebTideNodeNumb]").first().val());
            var command: string = "MikeScenario/GenerateWebTideJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                    BCMeshTVItemID: BCMeshTVItemID,
                    WebTideNodeNumb: WebTideNodeNumb
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioImport: Function = ($bjs: JQuery): any => {
            var $form: JQuery = $bjs.closest(".MikeScenarioImportForm").first();
            var bar = $bjs.closest(".ImportNewMikeScenarioDiv").first().find('.bar').first();
            var percent = $bjs.closest(".ImportNewMikeScenarioDiv").first().find('.percent').first();
            var status = $bjs.closest(".ImportNewMikeScenarioDiv").first().find('.status').first();

            $(".MikeScenarioImportProgress").removeClass("hidden");

            if ($form.length == 0) {
                cssp.Dialog.ShowDialogError(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFind_"), "MikeScenarioImportForm");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var options: JQueryFormOptions = {
                    beforeSend: () => {
                        status.empty();
                        var percentVal = '0%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                    },
                    uploadProgress: (event, position, total, percentComplete) => {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                    },
                    success: () => {
                        var percentVal = 'Upload completed';
                        bar.width(percentVal);
                        percent.html(percentVal);
                        cssp.Helper.PageRefresh();
                    },
                    complete: (xhr) => {
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
        public MikeScenarioMeshBCNodeListShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".MeshNodeList").hasClass("hidden")) {
                $bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".MeshNodeList").removeClass("hidden");
                $bjs.removeClass("btn-default").addClass("btn-success");
            }
            else {
                $bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".MeshNodeList").addClass("hidden");
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public MikeScenarioNodesViewOnMap: Function = ($bjs: JQuery): void => {
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
            this.mapItems = [];
            cssp.GoogleMap.DrawObjects();

            var NullArray = [];

            cssp.GoogleMap.MinLat = 90;
            cssp.GoogleMap.MaxLat = -90;
            cssp.GoogleMap.MinLng = 180;
            cssp.GoogleMap.MaxLng = -180;

            $("#MikeScenarioDiv").find(".jbMikeScenarioNodesViewOnMap").each((ind: number, elemTop: Element) => {
                if ($(elemTop).hasClass("btn-success")) {
                    $(elemTop).closest(".BCUL").find(".MeshCoord").each((ind: any, elem: Element) => {
                        let mo: MapObj = new CSSP.MapObj(-1, DrawTypeEnum.Point, [new Coord(parseFloat($(elem).data("meshnodelat")), parseFloat($(elem).data("meshnodelng")), parseFloat($(elem).data("meshnodeordinal")))]);
                        let MapObjList: Array<MapObj> = [];
                        MapObjList.push(mo);
                        this.mapItems.push(new tvLocation(parseInt($bjs.closest("#ViewDiv").data("tvitemid")), "" + $(elem).data("meshnodeordinal"), TVTypeEnum.MikeBoundaryConditionMesh, TVTypeEnum.MikeBoundaryConditionMesh, MapObjList));
                    });
                    $(elemTop).closest(".BCUL").find(".WebTideCoord").each((ind: any, elem: Element) => {
                        let mo: MapObj = new CSSP.MapObj(-1, DrawTypeEnum.Point, [new Coord(parseFloat($(elem).data("webtidenodelat")), parseFloat($(elem).data("webtidenodelng")), parseFloat($(elem).data("webtidenodeordinal")))]);
                        let MapObjList: Array<MapObj> = [];
                        MapObjList.push(mo);
                        this.mapItems.push(new tvLocation(parseInt($bjs.closest("#ViewDiv").data("tvitemid")), "" + $(elem).data("webtidenodeordinal"), TVTypeEnum.MikeBoundaryConditionWebTide, TVTypeEnum.MikeBoundaryConditionWebTide, MapObjList));
                    });
                }
            });

            cssp.GoogleMap.FillTVItemObjects(this.mapItems, true);
        };
        public MikeScenarioOtherFileImport: Function = ($bjs): any => {
            var $form: JQuery = $($bjs.closest(".MikeScenarioOtherFileImportForm").first());
            var bar = $form.closest(".MikeScenarioOtherFileImportDiv").first().find('.bar').first();
            var percent = $form.closest(".MikeScenarioOtherFileImportDiv").first().find('.percent').first();
            var status = $form.closest(".MikeScenarioOtherFileImportDiv").first().find('.status').first();

            $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find(".MikeScenarioOtherFileImportProgress").removeClass("hidden");

            if ($form.length == 0) {
                cssp.Dialog.ShowDialogError(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFind_"), "MikeScenarioOtherFileImportForm");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var options: JQueryFormOptions = {
                    beforeSend: () => {
                        status.empty();
                        var percentVal = '0%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                    },
                    uploadProgress: (event, position, total, percentComplete) => {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                    },
                    success: () => {
                        bar.width("100%");
                        percent.html("100%");
                        //C:\CSSP\Modelling\Mike21\New Brunswick\Cap-Pele\External Data\Cap_Pele Current West.dfs0cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varUploadedCompleted"));
                    },
                    complete: (xhr) => {
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
        public MikeScenarioOtherFileNotImport: Function = ($bjs: JQuery): void => {
            var ClientFullFileName = $bjs.closest(".MikeScenarioOtherFileImportDiv").find(".MikeScenarioOtherFileImportForm").first().find("input[name=ClientFullPath]").first().val();
            var TVFileTVItemID: number = parseInt($bjs.closest(".MikeScenarioOtherFileImportDiv").find(".MikeScenarioOtherFileImportForm").first().find("input[name=TVFileTVItemID]").first().val());
            var bar = $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find('.bar').first();
            var percent = $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find('.percent').first();
            var status = $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find('.status').first();
            var command: string = "MikeScenario/_mikeScenarioOtherFileNotImport";

            $bjs.closest(".MikeScenarioOtherFileImportDiv").first().find(".MikeScenarioOtherFileImportProgress").removeClass("hidden");

            $.post(cssp.BaseURL + command,
                {
                    TVFileTVItemID: TVFileTVItemID,
                }).done((ret) => {
                    bar.width("100%");
                    percent.html("100%");
                    //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varUploadedCompleted"));
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MikeScenarioAdd: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $(".TVItemAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var TVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                var command: string = "MikeScenario/_mikeScenarioAdd";
                $.get(cssp.BaseURL + command,
                    {
                        TVItemID: TVItemID,
                    }).done((ret) => {
                        $(".TVItemAdd").html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithError(command);
                        return;
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $(".TVItemAdd").html("");
            }
        };
        public MikeScenarioResetWebTide: Function = ($bjs): void => {
            var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var command: string = "MikeScenario/ResetWebTideJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioSelectPreviousInput: Function = ($bjs): void => {
            $(".MikeScenarioClientFullFileName").removeClass("bg-info");
            $bjs.closest("li").find(".MikeScenarioClientFullFileName").addClass("bg-info");
            $bjs.closest("li").find("input.MikeScenarioClientFullFileNameInput").select();
        };
        public MikeScenarioSetupWebTide: Function = ($bjs): void => {
            var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var WebTideDataSet: string = $("#ViewDiv").find(".MikeScenarioBoundaryConditionDataPathBC").first().val();
            var command: string = "MikeScenario/SetupWebTideJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                    WebTideDataSet: WebTideDataSet,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MikeScenarioShowHideErrorInfo: Function = ($bjs: JQuery): void => {
            $bjs.closest(".jsTVItemTop").first().find(".jsMikeScenarioErrorInfoDiv").toggle();
        };
        public MikeScenarioSourceEditAdd: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest(".MikeScenarioSourceAddOrModifyForm");

            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("MikeScenarioSourceAddOrModifyForm", "MikeScenarioSourcesDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
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
        public MikeScenarioSourceEditCancel: Function = ($bjs: JQuery): void => {
            $bjs.closest(".MikeScenarioSource").find(".jbMikeScenarioSourceEditShowHide").trigger("click");
        };
        public MikeScenarioSourceEditSave: Function = ($bjs: JQuery): void => {
            let $form: JQuery = $bjs.closest(".MikeScenarioSourceAddOrModifyForm");
            let MikeSourceName: string = $bjs.closest(".MikeScenarioSourceTop").find(".MikeSourceName").text();
            $bjs.closest("form").find("textarea[name='KMLDrainageArea']").val("");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("MikeScenarioSourceAddOrModifyForm", "MikeScenarioSourceEdit");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            //cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varModified") + " " + MikeSourceName);
                            cssp.MikeScenario.MikeScenarioSourceReLoad($bjs.closest(".MikeScenarioSourceTop"));
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public MikeScenarioSourceReLoad: Function = ($bjs: JQuery): void => {
            $bjs.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            let MikeSourceTVItemID: number = parseInt($bjs.data("tvitemid"));
            let ReloadMikeSourceFile: string = $bjs.data("sourcefilename");
            var command: string = "MikeScenario/" + ReloadMikeSourceFile;

            $.get(cssp.BaseURL + command, { MikeSourceTVItemID: MikeSourceTVItemID })
                .done((ret) => {
                    $bjs.html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MikeScenarioSourceStartEndAdd: Function = ($bjs: JQuery): void => {
            var MikeSourceTVItemID: number = parseInt($bjs.data("tvitemid"));

            var command: string = "MikeScenario/MikeScenarioSourceStartEndAddJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeSourceTVItemID: MikeSourceTVItemID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.MikeScenario.MikeScenarioSourceReLoad($bjs.closest(".MikeScenarioSourceTop"));
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MikeScenarioSourceStartEndSave: Function = ($bjs: JQuery): void => {
            let $form: JQuery = $bjs.closest(".MikeScenarioSourceStartEndForm");
            let MikeSourceName: string = $bjs.closest(".MikeScenarioSourceTop").find(".MikeSourceName").text();
            let Effluent: string = $form.find(".StartEndName").text();

            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("MikeScenarioSourceStartEndForm", "MikeScenarioSourceStartEndDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            //cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess") + " " + MikeSourceName + " " + Effluent);
                            cssp.MikeScenario.MikeScenarioSourceReLoad($bjs.closest(".MikeScenarioSourceTop"));
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public MikeScenarioSourceEditShowHide: Function = ($bjs: JQuery): void => {
            $(".jbMikeScenarioSourceEditShowHide, .jbMikeScenarioSourceShowHideAdd").each((ind: number, elem: Element) => {
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
        public MikeScenarioSourceStartEndEditShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".MikeScenarioSourceStartEndDiv").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".MikeScenarioSourceStartEndDiv").removeClass("hidden").addClass("hidden");
            }
        };
        public MikeScenarioSourceEditNameLatLngShowHide: Function = ($bjs: JQuery): void => {
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
        public MikeScenarioSourceInfoShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".MikeScenarioSource").find(".MikeScenarioSourceInfo").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".MikeScenarioSource").find(".MikeScenarioSourceInfo").removeClass("hidden").addClass("hidden");
            }
        };
        public MikeScenarioWebTideBCNodeListShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".WebTideNodeList").hasClass("hidden")) {
                $bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".WebTideNodeList").removeClass("hidden");
                $bjs.removeClass("btn-default").addClass("btn-success");
            }
            else {
                $bjs.closest(".MikeScenarioBoundaryConditionDiv").find(".WebTideNodeList").addClass("hidden");
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public MikeScenarioWebTideBCNodesViewOnMap: Function = ($bjs: JQuery): void => {
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
            this.mapItems.length = 0;
            cssp.GoogleMap.DrawObjects();

            var NullArray = [];

            cssp.GoogleMap.MinLat = 90;
            cssp.GoogleMap.MaxLat = -90;
            cssp.GoogleMap.MinLng = 180;
            cssp.GoogleMap.MaxLng = -180;

            $bjs.closest("#MikeScenarioDiv").find(".jbMikeScenarioWebTideBCNodesViewOnMap").each((ind: number, elemTop: Element) => {
                if ($(elemTop).hasClass("btn-success")) {
                    $(elemTop).closest(".MikeScenarioBoundaryConditionDiv").find(".WebTideCoord").each((ind: any, elem: Element) => {
                        var MapObjList: Array<MapObj> = [];
                        var mo: MapObj = new CSSP.MapObj(-1, DrawTypeEnum.Point, [new Coord(parseFloat($(elem).find(".WebTideNodeLat").first().text().replace(",", ".")), parseFloat($(elem).find(".WebTideNodeLng").first().text().replace(",", ".")), parseInt($(elem).find(".WebTideOrdinal").first().text().replace(",", ".")))]);
                        MapObjList.push(mo);
                        this.mapItems.push(new tvLocation(parseInt($bjs.closest("#ViewDiv").data("tvitemid")), $(elem).find(".WebTideOrdinal").first().text(), TVTypeEnum.MikeBoundaryConditionMesh, TVTypeEnum.MikeBoundaryConditionMesh, MapObjList));
                    });
                }
            });

            cssp.GoogleMap.FillTVItemObjects(this.mapItems, true);
        };
        public RemoveGeneralParameterEditButton: Function = ($bjs): void => {
            $(".jbMikeScenarioGeneralParametersEdit").addClass("hidden");
        };
        public RemoveNodeOnMap: Function = ($bjs): void => {
            for (var i = 0, countItem = cssp.GoogleMap.TVItemObjects.length; i < countItem; i++) {
                var ordinal: string = $bjs.data("ordinal");
                if (ordinal == cssp.GoogleMap.TVItemObjects[i].TVText) {
                    cssp.GoogleMap.TVItemObjects.splice(i, 1);
                    break;
                }
            }
            cssp.GoogleMap.DrawObjects();
        };
        public MikeScenarioSourceShowHideAdd: Function = ($bjs: JQuery): void => {
            var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));

            $(".jbMikeScenarioSourceEditShowHide").each((ind: number, elem: Element) => {
                if ($(elem).hasClass("btn-success")) {
                    $(elem).trigger("click");
                }
            });
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                var command: string = "MikeScenario/_mikeScenarioSourceAdd";
                $.get(cssp.BaseURL + command, {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret) => {
                    $(".MikeScenarioSourceAdd").html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $(".MikeScenarioSourceAdd").html("");
            }
        };
        public MikeScnenarioShowHideAdd: Function = ($bjs: JQuery): void => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
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
        public MikeScnenarioShowHideEditButtons: Function = ($bjs: JQuery): void => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
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
        public MikeScenarioShowHideWaterLevels: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".MikeScenarioWaterLevelsTop").find(".MikeScenarioWaterLevels").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".MikeScenarioWaterLevelsTop").find(".MikeScenarioWaterLevels").removeClass("hidden").addClass("hidden");
            }
        };
        public MikeScnenarioSourceShowHideEditButtons: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $(".jbMikeScenarioSourceEditShowHide").removeClass("hidden");
            }
            else {
                $(".jbMikeScenarioSourceEditShowHide").removeClass("hidden").addClass("hidden");
            }
        };
        public SetDialogEvents: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                    var command: string = "MikeScenario/MikeScenarioDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            MikeScenarioTVItemID: MikeScenarioTVItemID,
                        }).done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                $("#ViewDiv").find(".breadcrumb").children().last().find("a").trigger("click");
                            }
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                            return;
                        });
                });
            });
        };
        public SetDialogEventsSource: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var MikeSourceTVItemID: number = parseInt($bjs.closest(".MikeScenarioSource").data("tvitemid"));
                    var command: string = "MikeScenario/MikeScenarioSourceDeleteJSON";
                    $.post(cssp.BaseURL + command, {
                        MikeSourceTVItemID: MikeSourceTVItemID,
                    }).done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                });
            });
        };
        public SetDialogEventsSourceStartEnd: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var MikeSourceStartEndID: number = parseInt($bjs.data("mikesourcestartendid"));
                    var MikeSourceTVItemID: number = parseInt($bjs.data("mikesourcetvitemid"));

                    var command: string = "MikeScenario/MikeScenarioSourceStartEndDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            MikeSourceStartEndID: MikeSourceStartEndID,
                            MikeSourceTVItemID: MikeSourceTVItemID,
                        })
                        .done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.MikeScenario.MikeScenarioSourceReLoad($bjs.closest(".MikeScenarioSourceTop"));
                            }
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
    }
}