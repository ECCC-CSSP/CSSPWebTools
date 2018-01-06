var CSSP;
(function (CSSP) {
    var VisualPlumes = /** @class */ (function () {
        // Constructors
        function VisualPlumes() {
            // Variables
            this.FormName = "#VPForm";
            // Functions
            this.AskToDelete = function ($bjs) {
                var VPScenarioName = $bjs.closest(".VPTop").find(".VPScenarioName").text();
                cssp.Dialog.ShowDialogAreYouSure(VPScenarioName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.VisualPlumes.SetDialogEvents", $bjs);
            };
            this.CopyVPScenario = function ($bjs) {
                var VPScenarioID = parseInt($bjs.closest(".VPTop").data("vpscenarioid"));
                var command = "VisualPlumes/CopyVPScenarioJSON";
                $.post(cssp.BaseURL + command, {
                    VPScenarioID: VPScenarioID,
                }).done(function (ret) {
                    if (ret == "") {
                        cssp.Helper.PageRefresh();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.CreateVPScenario = function ($bjs) {
                var TVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var command = "VisualPlumes/CreateNewVisualPlumeScenarioJSON";
                $.post(cssp.BaseURL + command, {
                    InfrastructureTVItemID: TVItemID,
                }).done(function (ret) {
                    if (ret == "") {
                        cssp.Helper.PageRefresh();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest(cssp.VisualPlumes.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.VisualPlumes.FormName, "VPTop");
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
                        if (ret == "") {
                            cssp.Helper.PageRefresh();
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.Init = function () {
                $(cssp.VisualPlumes.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            ScenarioName: {
                                required: true,
                                maxlength: 100,
                            },
                            EffluentConcentration_MPN_100ml: {
                                required: true,
                                number: true,
                                range: [0, 15000000],
                            },
                            EffluentFlow_m3_s: {
                                required: true,
                                number: true,
                                range: [0, 1000],
                            },
                            PortDiameter_m: {
                                required: true,
                                number: true,
                                range: [0.0001, 10],
                            },
                            PortElevation_m: {
                                required: true,
                                number: true,
                                range: [0.0001, 10],
                            },
                            PortDepth_m: {
                                required: true,
                                number: true,
                                range: [0.0001, 1000],
                            },
                            EffluentSalinity_PSU: {
                                required: true,
                                number: true,
                                range: [0, 35],
                            },
                            EffluentTemperature_C: {
                                required: true,
                                number: true,
                                range: [0, 35],
                            },
                            VerticalAngle_deg: {
                                required: true,
                                number: true,
                                range: [0, 90],
                            },
                            NumberOfPorts: {
                                required: true,
                                number: true,
                                range: [0, 100],
                            },
                            PortSpacing_m: {
                                required: true,
                                number: true,
                                range: [0, 10000],
                            },
                            MeasurementDepth_m1: {
                                required: true,
                                number: true,
                                range: [0, 10000],
                            },
                            CurrentSpeed_m_s1: {
                                required: true,
                                number: true,
                                range: [0, 10],
                            },
                            CurrentDirection_deg1: {
                                required: true,
                                number: true,
                                range: [0, 90],
                            },
                            AmbientSalinity_PSU1: {
                                required: true,
                                number: true,
                                range: [0, 35],
                            },
                            AmbientTemperature_C1: {
                                required: true,
                                number: true,
                                range: [0, 35],
                            },
                            BackgroundConcentration_MPN_100ml1: {
                                required: true,
                                number: true,
                                range: [0, 1000000],
                            },
                            PollutantDecayRate_per_day1: {
                                required: true,
                                number: true,
                                range: [0, 100],
                            },
                            FarFieldCurrentSpeed_m_s1: {
                                required: true,
                                number: true,
                                range: [0, 10],
                            },
                            FarFieldCurrentDirection_deg1: {
                                required: true,
                                number: true,
                                range: [0, 90],
                            },
                            FarFieldDiffusionCoefficient1: {
                                required: true,
                                number: true,
                                range: [0, 0.001],
                            },
                            MeasurementDepth_m2: {
                                required: true,
                                number: true,
                                range: [0, 10000],
                            },
                            CurrentSpeed_m_s2: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            CurrentDirection_deg2: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            AmbientSalinity_PSU2: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            AmbientTemperature_C2: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            BackgroundConcentration_MPN_100ml2: {
                                required: false,
                                number: true,
                                range: [0, 1000000],
                            },
                            PollutantDecayRate_per_day2: {
                                required: false,
                                number: true,
                                range: [0, 100],
                            },
                            FarFieldCurrentSpeed_m_s2: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            FarFieldCurrentDirection_deg2: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            FarFieldDiffusionCoefficient2: {
                                required: false,
                                number: true,
                                range: [0, 0.001],
                            },
                            MeasurementDepth_m3: {
                                required: false,
                                number: true,
                                range: [0, 10000],
                            },
                            CurrentSpeed_m_s3: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            CurrentDirection_deg3: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            AmbientSalinity_PSU3: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            AmbientTemperature_C3: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            BackgroundConcentration_MPN_100ml3: {
                                required: false,
                                number: true,
                                range: [0, 1000000],
                            },
                            PollutantDecayRate_per_day3: {
                                required: false,
                                number: true,
                                range: [0, 100],
                            },
                            FarFieldCurrentSpeed_m_s3: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            FarFieldCurrentDirection_deg3: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            FarFieldDiffusionCoefficient3: {
                                required: false,
                                number: true,
                                range: [0, 0.001],
                            },
                            MeasurementDepth_m4: {
                                required: false,
                                number: true,
                                range: [0, 10000],
                            },
                            CurrentSpeed_m_s4: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            CurrentDirection_deg4: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            AmbientSalinity_PSU4: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            AmbientTemperature_C4: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            BackgroundConcentration_MPN_100ml4: {
                                required: false,
                                number: true,
                                range: [0, 1000000],
                            },
                            PollutantDecayRate_per_day4: {
                                required: false,
                                number: true,
                                range: [0, 100],
                            },
                            FarFieldCurrentSpeed_m_s4: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            FarFieldCurrentDirection_deg4: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            FarFieldDiffusionCoefficient4: {
                                required: false,
                                number: true,
                                range: [0, 0.001],
                            },
                            MeasurementDepth_m5: {
                                required: false,
                                number: true,
                                range: [0, 10000],
                            },
                            CurrentSpeed_m_s5: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            CurrentDirection_deg5: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            AmbientSalinity_PSU5: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            AmbientTemperature_C5: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            BackgroundConcentration_MPN_100ml5: {
                                required: false,
                                number: true,
                                range: [0, 1000000],
                            },
                            PollutantDecayRate_per_day5: {
                                required: false,
                                number: true,
                                range: [0, 100],
                            },
                            FarFieldCurrentSpeed_m_s5: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            FarFieldCurrentDirection_deg5: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            FarFieldDiffusionCoefficient5: {
                                required: false,
                                number: true,
                                range: [0, 0.001],
                            },
                            MeasurementDepth_m6: {
                                required: false,
                                number: true,
                                range: [0, 10000],
                            },
                            CurrentSpeed_m_s6: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            CurrentDirection_deg6: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            AmbientSalinity_PSU6: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            AmbientTemperature_C6: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            BackgroundConcentration_MPN_100ml6: {
                                required: false,
                                number: true,
                                range: [0, 1000000],
                            },
                            PollutantDecayRate_per_day6: {
                                required: false,
                                number: true,
                                range: [0, 100],
                            },
                            FarFieldCurrentSpeed_m_s6: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            FarFieldCurrentDirection_deg6: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            FarFieldDiffusionCoefficient6: {
                                required: false,
                                number: true,
                                range: [0, 0.001],
                            },
                            MeasurementDepth_m7: {
                                required: false,
                                number: true,
                                range: [0, 10000],
                            },
                            CurrentSpeed_m_s7: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            CurrentDirection_deg7: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            AmbientSalinity_PSU7: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            AmbientTemperature_C7: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            BackgroundConcentration_MPN_100ml7: {
                                required: false,
                                number: true,
                                range: [0, 1000000],
                            },
                            PollutantDecayRate_per_day7: {
                                required: false,
                                number: true,
                                range: [0, 100],
                            },
                            FarFieldCurrentSpeed_m_s7: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            FarFieldCurrentDirection_deg7: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            FarFieldDiffusionCoefficient7: {
                                required: false,
                                number: true,
                                range: [0, 0.001],
                            },
                            MeasurementDepth_m8: {
                                required: false,
                                number: true,
                                range: [0, 10000],
                            },
                            CurrentSpeed_m_s8: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            CurrentDirection_deg8: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            AmbientSalinity_PSU8: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            AmbientTemperature_C8: {
                                required: false,
                                number: true,
                                range: [0, 35],
                            },
                            BackgroundConcentration_MPN_100ml8: {
                                required: false,
                                number: true,
                                range: [0, 1000000],
                            },
                            PollutantDecayRate_per_day8: {
                                required: false,
                                number: true,
                                range: [0, 100],
                            },
                            FarFieldCurrentSpeed_m_s8: {
                                required: false,
                                number: true,
                                range: [0, 10],
                            },
                            FarFieldCurrentDirection_deg8: {
                                required: false,
                                number: true,
                                range: [0, 90],
                            },
                            FarFieldDiffusionCoefficient8: {
                                required: false,
                                number: true,
                                range: [0, 0.001],
                            },
                        }
                    });
                });
            };
            this.LoadVPScenario = function ($bjs) {
                var VPScenarioID = parseInt($bjs.closest(".VPTop").data("vpscenarioid"));
                var command = "VisualPlumes/_visualPlumeScenario";
                $.get(cssp.BaseURL + command, {
                    VPScenarioID: VPScenarioID,
                }).done(function (ret) {
                    $("#VPDiv").html(ret);
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReloadVPList = function ($bjs) {
                cssp.Helper.PageRefresh();
            };
            this.SetDialogEvents = function ($bjs) {
                var VPScenarioID = parseInt($bjs.closest(".VPTop").data("vpscenarioid"));
                var VPScenarioName = $bjs.closest(".VPTop").find(".VPScenarioName").text();
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var command = "VisualPlumes/DeleteVPScenarioJSON";
                        $.post(cssp.BaseURL + command, {
                            VPScenarioID: VPScenarioID
                        }).done(function (ret) {
                            if (ret == "") {
                                cssp.Dialog.ShowDialogSuccess("[" + VPScenarioName + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
                                cssp.Helper.PageRefresh();
                            }
                            else {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.VPScenarioShowChartResult = function ($bjs) {
                var $VPTop = $bjs.closest(".VPTop");
                $VPTop.find(".VPScenarioInputDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioChartResultDiv").removeClass("hidden");
                $VPTop.find(".VPScenarioResultDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioRawResultDiv").removeClass("hidden").addClass("hidden");
            };
            this.VPScenarioShowInput = function ($bjs) {
                var $VPTop = $bjs.closest(".VPTop");
                $VPTop.find(".VPScenarioInputDiv").removeClass("hidden");
                $VPTop.find(".VPScenarioChartResultDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioResultDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioRawResultDiv").removeClass("hidden").addClass("hidden");
            };
            this.VPScenarioShowRawResult = function ($bjs) {
                var $VPTop = $bjs.closest(".VPTop");
                $VPTop.find(".VPScenarioInputDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioChartResultDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioResultDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioRawResultDiv").removeClass("hidden");
            };
            this.VPScenarioShowResult = function ($bjs) {
                var $VPTop = $bjs.closest(".VPTop");
                $VPTop.find(".VPScenarioInputDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioChartResultDiv").removeClass("hidden").addClass("hidden");
                $VPTop.find(".VPScenarioResultDiv").removeClass("hidden");
                $VPTop.find(".VPScenarioRawResultDiv").removeClass("hidden").addClass("hidden");
            };
        }
        return VisualPlumes;
    }());
    CSSP.VisualPlumes = VisualPlumes;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.VisualPlumes.js.map