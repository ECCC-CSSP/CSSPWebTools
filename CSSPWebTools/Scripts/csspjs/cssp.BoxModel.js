var CSSP;
(function (CSSP) {
    var BoxModel = (function () {
        // Constructors
        function BoxModel() {
            // Variables
            this.FormName = "#BoxModelForm";
            this.AskToRemoveBoxModel = function ($bjs) {
                var BoxModelScenaroName = $bjs.closest(".BoxModelTop").find(".BoxModelScenaroName").text();
                cssp.Dialog.ShowDialogAreYouSure(BoxModelScenaroName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.BoxModel.SetDialogEvents", $bjs);
            };
            this.CalculateDecayRate = function () {
                var command = "BoxModel/CalculateDecayJSON";
                $.post(cssp.BaseURL + command, {
                    T90_hour: $("#BoxModelForm input[name=T90_hour]").val(),
                    Temperature_C: $("#BoxModelForm input[name=Temperature_C]").val(),
                }).done(function (Ret) {
                    if (Ret.Error == "") {
                        var resCal = "" + Ret.Decay;
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
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.CopyBoxModelScenario = function ($bjs) {
                var BoxModelID = parseInt($bjs.closest(".BoxModelTop").data("boxmodelid"));
                $("#BoxModelDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "BoxModel/CopyBoxModelScenarioJSON";
                $.post(cssp.BaseURL + command, {
                    BoxModelID: BoxModelID
                }).done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.Helper.PageRefresh();
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.CreateBoxModelScenario = function ($bjs) {
                var InfrastructureTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                $("#BoxModelDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "BoxModel/CreateNewBoxModelScenarioJSON";
                $.post(cssp.BaseURL + command, {
                    InfrastructureTVItemID: InfrastructureTVItemID
                }).done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.Helper.PageRefresh();
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.FormCancel = function ($bjs) {
                cssp.BoxModel.ShowHideForm($bjs);
            };
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest(cssp.BoxModel.FormName);
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
                        var Length = $("#BoxModelForm input[name=Length]").val();
                        if (Length < 1) {
                            cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#BoxModelVariables", "varLengthRequiredWhenFixLengthSelected"));
                            return;
                        }
                    }
                    if ($("#BoxModelForm input[name=FixWidth]").is(":checked")) {
                        var Width = $("#BoxModelForm input[name=Width]").val();
                        if (Width < 1) {
                            cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#BoxModelVariables", "varWidthRequiredWhenFixWidthSelected"));
                            return;
                        }
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
                $(cssp.BoxModel.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            ScenarioName: {
                                required: true,
                                maxlength: 100,
                            },
                            T90_hour: {
                                required: true,
                                number: true,
                                range: [0, 10000],
                                onkeypress: function () {
                                    cssp.BoxModel.CalculateDecayRate();
                                },
                            },
                            Temperature_C: {
                                required: true,
                                number: true,
                                range: [0, 35],
                                onkeypress: function () {
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
            this.SetDialogEvents = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var BoxModelID = parseInt($bjs.closest(".BoxModelTop").data("boxmodelid"));
                        var command = "BoxModel/DeleteBoxModelScenarioJSON";
                        $.post(cssp.BaseURL + command, {
                            BoxModelID: BoxModelID
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
                    });
                });
            };
            this.ShowHideForm = function ($bjs) {
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
                    var command = "BoxModel/_boxModelEdit";
                    var BoxModelID = parseInt($BoxModelTop.data("boxmodelid"));
                    $.get(cssp.BaseURL + command, {
                        BoxModelID: BoxModelID,
                    }).done(function (ret) {
                        $BoxModelEdit.html(ret);
                        $bjs.removeClass("btn-default").addClass("btn-success");
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.ShowHideResults = function ($bjs) {
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
                    var command = "BoxModel/_boxModelResults";
                    var BoxModelID = parseInt($BoxModelTop.data("boxmodelid"));
                    $.get(cssp.BaseURL + command, {
                        BoxModelID: BoxModelID,
                    }).done(function (data) {
                        $BoxModelResults.html(data);
                        $bjs.removeClass("btn-default").addClass("btn-success");
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
        }
        return BoxModel;
    }());
    CSSP.BoxModel = BoxModel;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.BoxModel.js.map