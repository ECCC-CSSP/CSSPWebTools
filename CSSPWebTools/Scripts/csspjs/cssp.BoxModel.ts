module CSSP {
    export class BoxModel {
        // Variables
        public FormName: string = "#BoxModelForm";

        // Constructors
        constructor() {
        }
        public AskToRemoveBoxModel: Function = ($bjs: JQuery): void => {
            var BoxModelScenaroName: string = $bjs.closest(".BoxModelTop").find(".BoxModelScenaroName").text();
            cssp.Dialog.ShowDialogAreYouSure(BoxModelScenaroName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.BoxModel.SetDialogEvents", $bjs);
        };
        public CalculateDecayRate: Function = (): void => {
            var command: string = "BoxModel/CalculateDecayJSON";
            $.post(cssp.BaseURL + command,
                {
                    T90_hour: $("#BoxModelForm input[name=T90_hour]").val(),
                    Temperature_C: $("#BoxModelForm input[name=Temperature_C]").val(),
                }).done((Ret) => {
                    if (Ret.Error == "") {
                        var resCal: string = "" + Ret.Decay;
                        if (Globalize.culture.name.substr(0, 2) == "fr") {
                                resCal = resCal.replace(".", ",");
                            }
                            $("#BoxModelForm input[name=DecayRate_per_day]").val(resCal);
                            $(".decaycalculated").text(resCal);
                        }
                        else {
                            $("#BoxModelForm input[name=DecayRate_per_day]").val("");
                            $(".decaycalculated").text("");
                        }
                    }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public CopyBoxModelScenario: Function = ($bjs: JQuery): void => {
            var BoxModelID: number = parseInt($bjs.closest(".BoxModelTop").data("boxmodelid"));
            $("#BoxModelDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            var command: string = "BoxModel/CopyBoxModelScenarioJSON";
            $.post(cssp.BaseURL + command,
                {
                    BoxModelID: BoxModelID
                }).done((ret: string) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public CreateBoxModelScenario: Function = ($bjs: JQuery): void => {
            var InfrastructureTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            $("#BoxModelDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            var command: string = "BoxModel/CreateNewBoxModelScenarioJSON";
            $.post(cssp.BaseURL + command,
                {
                    InfrastructureTVItemID: InfrastructureTVItemID
                }).done((ret: string) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public FormCancel: Function = ($bjs: JQuery): void => {
            cssp.BoxModel.ShowHideForm($bjs);
        };
        public FormSubmit: Function = ($bjs: JQuery): any => {
            var $form: JQuery = $bjs.closest(cssp.BoxModel.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.BoxModel.FormName, "BoxModelTop");
                return;
            }

            if (!$form.valid || $form.valid()) {
                if (cssp.CheckInputWithNumbers()) {
                    cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                    return;
                }
                if ($("#BoxModelForm input[name=FixLength]").is(":checked") && $("#BoxModelForm input[name=FixWidth]").is(":checked")) {
                    cssp.Dialog.ShowDialogError(cssp.GetHTMLVariable("#BoxModelVariables", "varFixLengthAndFixWidthAreSelected"), cssp.GetHTMLVariable("#BoxModelVariables", "varPleaseSelectOnlyOne"));
                    return;
                }
                if ($("#BoxModelForm input[name=FixLength]").is(":checked")) {
                    var Length: number = $("#BoxModelForm input[name=Length]").val();
                    if (Length < 1) {
                        cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#BoxModelVariables", "varLengthRequiredWhenFixLengthSelected"));
                        return;
                    }
                }
                if ($("#BoxModelForm input[name=FixWidth]").is(":checked")) {
                    var Width: number = $("#BoxModelForm input[name=Width]").val();
                    if (Width < 1) {
                        cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#BoxModelVariables", "varWidthRequiredWhenFixWidthSelected"));
                        return;
                    }
                }
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
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
        public Init: Function = (): void => {
            $(cssp.BoxModel.FormName).each((ind: any, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            ScenarioName: {
                                required: true,
                                maxlength: 100,
                            },
                            T90_hour: {
                                required: true,
                                number: true,
                                range: [0, 10000],
                                onkeypress: () => {
                                    cssp.BoxModel.CalculateDecayRate();
                                },
                            },
                            Temperature_C: {
                                required: true,
                                number: true,
                                range: [0, 35],
                                onkeypress: () => {
                                    cssp.BoxModel.CalculateDecayRate();
                                },
                            },
                            Flow_m3_day: {
                                required: true,
                                number: true,
                                range: [0.00001, 100000],
                            },
                            FlowDuration_hour: {
                                required: true,
                                number: true,
                                range: [0.5, 24],
                            },
                            Dilution: {
                                required: true,
                                number: true,
                                range: [10, 1000000],
                            },
                            Depth_m: {
                                required: true,
                                number: true,
                                range: [0, 10000],
                            },
                            FCUntreated_MPN_100ml: {
                                required: true,
                                number: true,
                                range: [0, 15000000],
                            },
                            FCPreDisinfection_MPN_100ml: {
                                required: true,
                                number: true,
                                range: [0, 15000000],
                            },
                            Concentration_MPN_100ml: {
                                required: true,
                                number: true,
                                range: [0, 10000000],
                            },
                        }
                    });
            });
        };
        public SetDialogEvents: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var BoxModelID: number = parseInt($bjs.closest(".BoxModelTop").data("boxmodelid"));
                    var command: string = "BoxModel/DeleteBoxModelScenarioJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            BoxModelID: BoxModelID
                        }).done((ret: string) => {
                            if (ret == "") {
                                cssp.Helper.PageRefresh();
                            }
                            else {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
        public ShowHideForm: Function = ($bjs: JQuery): void => {
            var $BoxModelTop = $bjs.closest(".BoxModelTop");
            $BoxModelTop.find(".jbBoxModelShowHideForm .jbBoxModelShowHideResult").removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
            var $BoxModelEdit = $BoxModelTop.find(".BoxModelEdit");
            var $BoxModelResults = $BoxModelTop.find(".BoxModelResults");
            $BoxModelResults.html("");
            if ($BoxModelEdit.children().length > 0) {
                $BoxModelEdit.html("");
                $BoxModelEdit.removeClass("hidden").addClass("hidden");
                $BoxModelTop.find(".BoxModelResults").removeClass("hidden").addClass("hidden");
            }
            else {
                $BoxModelEdit.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $BoxModelEdit.removeClass("hidden");
                //$BoxModelTop.find(".BoxModelInfo").removeClass("hidden").addClass("hidden");
                $BoxModelTop.find(".BoxModelResults").removeClass("hidden").addClass("hidden");

                var command: string = "BoxModel/_boxModelEdit";
                var BoxModelID: number = parseInt($BoxModelTop.data("boxmodelid"));
                $.get(cssp.BaseURL + command,
                    {
                        BoxModelID: BoxModelID,
                    }).done((ret) => {
                        $BoxModelEdit.html(ret);
                        $bjs.removeClass("btn-default").addClass("btn-success");
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public ShowHideResults: Function = ($bjs: JQuery): void => {
            var $BoxModelTop = $bjs.closest(".BoxModelTop");
            $BoxModelTop.find(".jbBoxModelShowHideForm .jbBoxModelShowHideResult").removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
            var $BoxModelEdit = $BoxModelTop.find(".BoxModelEdit");
            var $BoxModelResults = $BoxModelTop.find(".BoxModelResults");
            $BoxModelEdit.html("");
            if ($BoxModelResults.children().length > 0) {
                $BoxModelResults.html("");
                $BoxModelResults.removeClass("hidden").addClass("hidden");
                $BoxModelTop.find(".BoxModelEdit").removeClass("hidden").addClass("hidden");
            }
            else {
                $BoxModelResults.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $BoxModelResults.removeClass("hidden");
                $BoxModelTop.find(".BoxModelEdit").removeClass("hidden").addClass("hidden");
                var command: string = "BoxModel/_boxModelResults";
                var BoxModelID: number = parseInt($BoxModelTop.data("boxmodelid"));
                $.get(cssp.BaseURL + command,
                    {
                        BoxModelID: BoxModelID,
                    }).done((data) => {
                        $BoxModelResults.html(data);
                        $bjs.removeClass("btn-default").addClass("btn-success");
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
    }
}