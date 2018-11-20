
module CSSP {
    export class MikeScenario {
        // Variables
        public mapItems: Array<CSSP.tvLocation> = new Array<CSSP.tvLocation>();
        public MIKEResult: MIKEResult;
        public DataViewMWQMSite: google.visualization.DataView;
        public DataViewMikeSource: google.visualization.DataView;
        public ChartHeight: number = 500;
        public ChartWidth: number = 800;

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
        public MikeScenarioShowMWQMSitesOnMap: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");

                let mapItems: tvLocation[] = [];

                for (let i = 0, count = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList.length; i < count; i++)
                {
                    let tvLoc: tvLocation = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[i].TVLocation;
                    mapItems.push(tvLoc);
                }

                cssp.GoogleMap.FillTVItemObjects(mapItems, true);

                cssp.GoogleMap.DrawObjects();
            }
            else {

                for (let i = 0, count = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList.length; i < count; i++) {
                    for (let j = 0, count = cssp.GoogleMap.TVItemObjects.length; j < count; j++) {
                        if (cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[i].MWQMSiteTVItemID == cssp.GoogleMap.TVItemObjects[j].TVItemID) {
                            const index = cssp.GoogleMap.TVItemObjects.indexOf(cssp.GoogleMap.TVItemObjects[j], 0);
                            if (index > -1) {
                                cssp.GoogleMap.TVItemObjects.splice(index, 1);
                            }
                            break;
                        }
                    }
                }

                cssp.GoogleMap.DrawObjects();

                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public MikeScenarioResetTextSizeOnMap: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                cssp.GoogleMap.MarkerTextLength = 10;
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                cssp.GoogleMap.MarkerTextLength = 1;
            }

            cssp.GoogleMap.DrawObjects();
        };
        public DrawCharts: Function = (): void => {
            let dataMWQMSite: google.visualization.DataTable = new google.visualization.DataTable();
            let dataMikeSource: google.visualization.DataTable = new google.visualization.DataTable();
            let dateArr: Date[] = [];
            let FC: number[] = [];
            let Sal: number[] = [];
            let Temp: number[] = [];
            let Prec: number[] = [];
            let WL: number[] = [];
            let FCValue: number[] = [];
            let SalValue: number[] = [];
            let TempValue: number[] = [];
            let selectedMWQMSite: number = parseInt($("#MIKEScenarioSelectMWQMSiteID").val());
            let selectedMikeSource: number = parseInt($("#MIKEScenarioSelectMikeSourceID").val());
            let SampleDate: string = "Date";
            let hAxisTitle = SampleDate;
            let ValueOfFC: number;
            let ValueOfSal: number;
            let ValueOfTemp: number;
            let GotValue: boolean = false;
            let DateTimeOfSample: Date;
            let DoFC: boolean = $("input[name='FC']").is(":checked");
            let DoSal: boolean = $("input[name='Sal']").is(":checked");
            let DoTemp: boolean = $("input[name='Temp']").is(":checked");
            let DoPrec: boolean = $("input[name='Prec']").is(":checked");
            let DoWL: boolean = $("input[name='WL']").is(":checked");
            let ShowArr: number[] = [];
            let Discharge: number[] = [];
            let Concentration: number[] = [];

            ShowArr.push(0); // for Date
            if (DoFC) {
                ShowArr.push(1);
                ShowArr.push(6);
            }
            if (DoSal) {
                ShowArr.push(2);
                ShowArr.push(7);
            }
            if (DoTemp) {
                ShowArr.push(3);
                ShowArr.push(8);
            }
            if (DoPrec) {
                ShowArr.push(4);
            }
            if (DoWL) {
                ShowArr.push(5);
            }

            let MWQMSiteIndex: number = -1;

            for (let i = 0; i < cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList.length; i++) {
                if (cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[i].MWQMSiteTVItemID == selectedMWQMSite) {
                    MWQMSiteIndex = i;
                    break;
                }
            }

            if (MWQMSiteIndex != -1) {
                dataMWQMSite.addColumn("date", SampleDate);

                dataMWQMSite.addColumn("number", "FC");
                dataMWQMSite.addColumn("number", "Sal");
                dataMWQMSite.addColumn("number", "Temp");
                dataMWQMSite.addColumn("number", "Prec");
                dataMWQMSite.addColumn("number", "WL(X10)");
                dataMWQMSite.addColumn("number", "FCValue");
                dataMWQMSite.addColumn("number", "SalValue");
                dataMWQMSite.addColumn("number", "TempValue");

                for (let i = 0; i < cssp.MikeScenario.MIKEResult.TimeStepDateTimeList.length; i++) {
                    dateArr.push(new Date(parseInt(cssp.MikeScenario.MIKEResult.TimeStepDateTimeList[i].toString().substr(6))));
                }

                FC = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].MIKETransResult.FCList;
                Sal = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].MIKEHydroResult.SalinityList;
                Temp = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].MIKEHydroResult.TemperatureList;
                Prec = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].MIKEHydroResult.PrecipitationList;
                WL = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].MIKEHydroResult.SurfaceElevationList;

                DateTimeOfSample = new Date(parseInt(cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].SampleDateTime.toString().substr(6)));
                for (let i = 0; i < cssp.MikeScenario.MIKEResult.TimeStepDateTimeList.length; i++) {
                    if (i > 0 && dateArr[i] >= DateTimeOfSample && GotValue == false) {
                        GotValue = true;
                        ValueOfFC = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].FC;
                        ValueOfSal = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].Salinity;
                        ValueOfTemp = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].Temperature;
                    }
                    else {
                        ValueOfFC = null;
                        ValueOfSal = null;
                        ValueOfTemp = null;
                    }
                    dataMWQMSite.addRow(<any>[dateArr[i], FC[i], Sal[i], Temp[i], Prec[i], WL[i] * 10, ValueOfFC, ValueOfSal, ValueOfTemp]);
                }

                cssp.MikeScenario.DataViewMWQMSite = new google.visualization.DataView(dataMWQMSite);

                cssp.MikeScenario.DataViewMWQMSite.setColumns(ShowArr);

                let chart: google.visualization.LineChart = new google.visualization.LineChart($('.MIKEScenarioHydroResultDiv')[0]);
                chart.draw(cssp.MikeScenario.DataViewMWQMSite, {
                    hAxis: { title: hAxisTitle, titleTextStyle: { bold: false, italic: false } },
                    pointSize: 4,
                    legend: { position: 'top', maxLines: 2 },
                    colors: ['#008800', '#aa0000', '#0000aa', '#00ffaa', '#cccccc', '#ffff33', '#0000ff', '#00bbbb'],
                    width: cssp.MikeScenario.ChartWidth,
                    height: cssp.MikeScenario.ChartHeight,
                });
            }

            // ----------------------------------------------------------
            // source
            // ----------------------------------------------------------
            let MikeSourceIndex: number = -1;

            for (let i = 0; i < cssp.MikeScenario.MIKEResult.MIKESourceResultList.length; i++) {
                if (cssp.MikeScenario.MIKEResult.MIKESourceResultList[i].MWQMSourceTVItemID == selectedMikeSource) {
                    MikeSourceIndex = i;
                    break;
                }
            }

            if (MikeSourceIndex != -1) {
                dataMikeSource.addColumn("date", SampleDate);
                dataMikeSource.addColumn("number", "Discharge (m3/d)");
                dataMikeSource.addColumn("number", "FC (MPN/100 mL)");


                Discharge = cssp.MikeScenario.MIKEResult.MIKESourceResultList[MikeSourceIndex].DischargeList;
                Concentration = cssp.MikeScenario.MIKEResult.MIKESourceResultList[MikeSourceIndex].FCList;

                DateTimeOfSample = new Date(parseInt(cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[MWQMSiteIndex].SampleDateTime.toString().substr(6)));

                for (let i = 0; i < cssp.MikeScenario.MIKEResult.TimeStepDateTimeList.length; i++) {

                    dataMikeSource.addRow(<any>[dateArr[i], Discharge[i] * 3600 * 24, Concentration[i]]);
                }
            }

            cssp.MikeScenario.DataViewMikeSource = new google.visualization.DataView(dataMikeSource);

            let chart2: google.visualization.LineChart = new google.visualization.LineChart($('.MIKEScenarioTransResultDiv')[0]);
            chart2.draw(cssp.MikeScenario.DataViewMikeSource, {
                hAxis: { title: hAxisTitle, titleTextStyle: { bold: false, italic: false } },
                pointSize: 4,
                legend: { position: 'top', maxLines: 2 },
                colors: ['#008800', '#aa0000', '#0000aa'],
                width: cssp.MikeScenario.ChartWidth,
                height: cssp.MikeScenario.ChartHeight,
            });

            //google.visualization.events.addListener(chart, "select", () => {
            //    if (cssp.MikeScenario.MIKEResult.TimeStepDateTimeList) {
            //        var RunDate = cssp.MWQMSite.FCView.getValue(chart.getSelection()[0].row, 0);
            //        cssp.MWQMSite.GetMWQMRunTVItemIDWithDate(RunDate);
            //    }
            //});

        };
        public InitHideAskToRun: Function = (): void => {
            $(".jbMikeScenarioAskToRun").removeClass("hidden").addClass("hidden");
            $(".jbMikeScenarioCopy").removeClass("hidden").addClass("hidden");
            $(".jbMikeScenarioDelete").removeClass("hidden").addClass("hidden");

            $(document).off("change", "input.CheckUseDecouplingFiles");
            $(document).on("change", $("input.CheckUseDecouplingFiles"), (evt: Event) => {
                if ($("input.CheckUseDecouplingFiles").is(":checked")) {
                    $("input.CheckGenerateDecouplingFiles").removeAttr("checked");
                }
            });

            $(document).off("change", "input.CheckGenerateDecouplingFiles");
            $(document).on("change", $("input.CheckGenerateDecouplingFiles"), (evt: Event) => {
                if ($("input.CheckGenerateDecouplingFiles").is(":checked")) {
                    $("input.CheckUseDecouplingFiles").removeAttr("checked");
                }
            });
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
                let StartYear: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartYear']").val());
                let StartMonth: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartMonth']").val());
                let StartDay: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartDay']").val());
                let StartTime: string = $("#MikeScenarioGeneralParameterForm select[name='MikeScenarioStartTime']").val();
                let StartHour: number = 0;
                let StartMinute: number = 0;
                if (StartTime) {
                    StartHour = parseInt(StartTime.substring(0, 2));
                    StartMinute = parseInt(StartTime.substring(3, 5));
                }


                let EndYear: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndYear']").val());
                let EndMonth: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndMonth']").val());
                let EndDay: number = parseInt($("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndDay']").val());
                let EndTime: string = $("#MikeScenarioGeneralParameterForm select[name='MikeScenarioEndTime']").val();
                let EndHour: number = 0;
                let EndMinute: number = 0;
                if (EndTime) {
                    EndHour = parseInt(EndTime.substring(0, 2));
                    EndMinute = parseInt(EndTime.substring(3, 5));
                }

                let StartDate: Date = new Date(StartYear, StartMonth, StartDay, StartHour, StartMinute);
                let EndDate: Date = new Date(EndYear, EndMonth, EndDay, EndHour, EndMinute);

                let dif: number = EndDate.getTime() - StartDate.getTime(); // number of seconds between the two dates

                if (dif < 0) {
                    cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("LayoutVariables", "varStartDateIsBiggerThanEndDate"));
                    $(".ScenarioLengthDays").text("-1");
                    $(".ScenarioLengthHours").text("-1");
                    $(".ScenarioLengthMinutes").text("-1");
                    return;
                }
                else {
                    let Days: number = parseInt((dif / 24 / 60 / 60 / 1000).toString());
                    let Hours: number = parseInt(((dif - (Days * 24 * 60 * 60 * 1000)) / 60 / 60 / 1000).toString());
                    let Minutes: number = parseInt(((dif - (Days * 24 * 60 * 60 * 1000) - (Hours * 60 * 60 * 1000)) / 60 / 1000).toString());
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
                let $form: JQuery = $(evt.target).closest(".MikeScenarioSourceStartEndForm");
                let StartYear: number = parseInt($form.find("select[name='MikeSourceStartYear']").val());
                let StartMonth: number = parseInt($form.find("select[name='MikeSourceStartMonth']").val());
                let StartDay: number = parseInt($form.find("select[name='MikeSourceStartDay']").val());
                let StartTime: string = $form.find("select[name='MikeSourceStartTime']").val();
                let StartHour: number = parseInt(StartTime.substring(0, 2));
                let StartMinute: number = parseInt(StartTime.substring(3, 5));

                let EndYear: number = parseInt($form.find("select[name='MikeSourceEndYear']").val());
                let EndMonth: number = parseInt($form.find("select[name='MikeSourceEndMonth']").val());
                let EndDay: number = parseInt($form.find("select[name='MikeSourceEndDay']").val());
                let EndTime: string = $form.find("select[name='MikeSourceEndTime']").val();
                let EndHour: number = parseInt(EndTime.substring(0, 2));
                let EndMinute: number = parseInt(EndTime.substring(3, 5));

                let StartDate: Date = new Date(StartYear, StartMonth, StartDay, StartHour, StartMinute);

                let MikeScenarioStartDate: Date = new Date(parseInt($form.data("mikescenariostartdateyear")), parseInt($form.data("mikescenariostartdatemonth")), parseInt($form.data("mikescenariostartdateday")));
                if (StartDate < MikeScenarioStartDate) {
                    $form.find(".DateOK").each((ind: number, elem: Element) => {
                        $(elem).removeClass("text-success").addClass("text-danger");
                    });
                    //cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varEffluentStartDateIsSmallerThanMikeScenarioStartDate"));
                    return;
                }
                else {
                    $form.find(".DateOK").each((ind: number, elem: Element) => {
                        $(elem).removeClass("text-danger").addClass("text-success");
                    });
                }
                let EndDate: Date = new Date(EndYear, EndMonth, EndDay, EndHour, EndMinute);

                let MikeScenarioEndDate: Date = new Date(parseInt($form.data("mikescenarioenddateyear")), parseInt($form.data("mikescenarioenddatemonth")), parseInt($form.data("mikescenarioenddateday")));
                if (EndDate > MikeScenarioEndDate) {
                    $form.find(".DateOK").each((ind: number, elem: Element) => {
                        $(elem).removeClass("text-success").addClass("text-danger");
                    });
                    //cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varEffluentEndDateIsBiggerThanMikeScenarioEndDate"));
                    return;
                }
                else {
                    $form.find(".DateOK").each((ind: number, elem: Element) => {
                        $(elem).removeClass("text-danger").addClass("text-success");
                    });
                }

                var dif: number = EndDate.getTime() - StartDate.getTime(); // number of seconds between the two dates

                if (dif < 0) {
                    $form.find(".DateOK").each((ind: number, elem: Element) => {
                        $(elem).removeClass("text-success").addClass("text-danger");
                    });
                    //cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varStartDateIsBiggerThanEndDate"));
                    $(".SourceStartEndDays").text("-1");
                    $(".SourceStartEndHours").text("-1");
                    $(".SourceStartEndMinutes").text("-1");
                    return;
                }
                else {
                    let Days: number = parseInt((dif / 24 / 60 / 60 / 1000).toString());
                    let Hours: number = parseInt(((dif - (Days * 24 * 60 * 60 * 1000)) / 60 / 60 / 1000).toString());
                    let Minutes: number = parseInt(((dif - (Days * 24 * 60 * 60 * 1000) - (Hours * 60 * 60 * 1000)) / 60 / 1000).toString());
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
        public InitMikeScenarioResultsHTML: Function = (): void => {
            let AllMWQMSiteList: string[] = [];
            let AllMWQMSourceList: string[] = [];

            for (let i = 0, count = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList.length; i < count; i++) {
                let mikeMWQMSiteResult: MIKEMWQMSiteResult = cssp.MikeScenario.MIKEResult.MIKEMWQMSiteResultList[i];
                let optionText = `<option value="${mikeMWQMSiteResult.MWQMSiteTVItemID}">${mikeMWQMSiteResult.MWQMSiteTVText}</option>`;
                AllMWQMSiteList.push(optionText);
            }

            for (let i = 0, count = cssp.MikeScenario.MIKEResult.MIKESourceResultList.length; i < count; i++) {
                let mikeSourceResult: MIKESourceResult = cssp.MikeScenario.MIKEResult.MIKESourceResultList[i];
                let optionText = `<option value="${mikeSourceResult.MWQMSourceTVItemID}">${mikeSourceResult.MWQMSourceTVText}</option>`;
                AllMWQMSourceList.push(optionText);
            }

            $("#MIKEScenarioSelectMWQMSiteID").html(AllMWQMSiteList.join(" "));
            $("#MIKEScenarioSelectMikeSourceID").html(AllMWQMSourceList.join(" "));

            $(document).off("change", "#MIKEScenarioSelectMWQMSiteID");
            $(document).on("change", $("#MIKEScenarioSelectMWQMSiteID"), (evt: Event) => {
                cssp.MikeScenario.DrawCharts();
            });

            $(document).off("change", "#MIKEScenarioSelectMikeSourceID");
            $(document).on("change", $("#MIKEScenarioSelectMikeSourceID"), (evt: Event) => {
                cssp.MikeScenario.DrawCharts();
            });

            $(document).off("change", ".ParamShow");
            $(document).on("change", $(".ParamShow"), (evt: Event) => {
                cssp.MikeScenario.DrawCharts();
            });

            cssp.MikeScenario.DrawCharts();
        };
        public MikeScenarioResizeBiggerWidth: Function = (): void => {
            cssp.MikeScenario.ChartWidth += 100;
            cssp.MikeScenario.DrawCharts();
        };
        public MikeScenarioResizeSmallerWidth: Function = (): void => {
            cssp.MikeScenario.ChartWidth -= 100;
            cssp.MikeScenario.DrawCharts();
        };
        public MikeScenarioResizeBiggerHeight: Function = (): void => {
            cssp.MikeScenario.ChartHeight += 100;
            cssp.MikeScenario.DrawCharts();
        };
        public MikeScenarioResizeSmallerHeight: Function = (): void => {
            cssp.MikeScenario.ChartHeight -= 100;
            cssp.MikeScenario.DrawCharts();
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
        public MikeScenarioGetResults: Function = ($bjs: JQuery): void => {
            let MikeScenarioResultsDiv$: JQuery = $bjs.closest("#MikeScenarioGeneralParametersDiv").find(".MikeScenarioResultsDiv");
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                MikeScenarioResultsDiv$.removeClass("hidden");
                MikeScenarioResultsDiv$.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                let command: string = "MikeScenario/MikeScenarioGetResultsJSON";
                $.get(cssp.BaseURL + command,
                    {
                        MikeScenarioTVItemID: MikeScenarioTVItemID,
                    }).done((ret) => {
                        cssp.MikeScenario.MIKEResult = ret;
                        cssp.MikeScenario.MikeScenarioGetResultsHTML($bjs);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                        return;
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                MikeScenarioResultsDiv$.removeClass("hidden").addClass("hidden");
            }
        };
        public MikeScenarioGetResultsHTML: Function = ($bjs: JQuery): void => {
            let MikeScenarioResultsDiv$: JQuery = $bjs.closest("#MikeScenarioGeneralParametersDiv").find(".MikeScenarioResultsDiv");
            let MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let command: string = "MikeScenario/_mikeScenarioResultsHTML";
            $.get(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret) => {
                    MikeScenarioResultsDiv$.html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    return;
                });
        };
        public MikeScenarioPrepareResults: Function = ($bjs: JQuery): void => {
            let MikeScenarioResultsDiv$: JQuery = $bjs.closest("#MikeScenarioGeneralParametersDiv").find(".MikeScenarioResultsDiv");
            let MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            MikeScenarioResultsDiv$.removeClass("hidden");
            MikeScenarioResultsDiv$.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            let command: string = "MikeScenario/MikeScenarioPrepareResultsJSON";
            $.post(cssp.BaseURL + command,
                {
                    MikeScenarioTVItemID: MikeScenarioTVItemID,
                }).done((ret) => {
                    if (ret == "") {
                        cssp.Helper.PageRefresh();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                        MikeScenarioResultsDiv$.removeClass("hidden").addClass("hidden");
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    MikeScenarioResultsDiv$.removeClass("hidden").addClass("hidden");
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
                    else {
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
        public MikeScenarioReestablishEditing: Function = (): void => {
            var MikeScenarioTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var command: string = "MikeScenario/MikeScenarioReestablishEditing";
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
                            cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varModified") + " " + MikeSourceName);
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
                            cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess") + " " + MikeSourceName + " " + Effluent);
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