var CSSP;
(function (CSSP) {
    var RainExceedance = (function () {
        // Variables
        // Constructors
        function RainExceedance() {
            // Functions
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest(".RainExceedanceAddOrModifyForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".RainExceedanceAddOrModifyForm", "RainExceedanceEditDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret.Error != "") {
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
            this.InitEdit = function () {
                $(".RainExceedanceAddOrModifyForm").each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            RainMaximum: {
                                required: true,
                                number: true,
                                range: [0, 500],
                            },
                            RainExceedanceName: {
                                required: true,
                                maxlength: 200,
                            },
                            Lat: {
                                required: true,
                                number: true,
                                range: [-90, 90],
                            },
                            Lng: {
                                required: true,
                                number: true,
                                range: [-180, 180],
                            },
                            StartMonth: {
                                required: true,
                                number: true,
                                range: [1, 12],
                            },
                            StartDay: {
                                required: true,
                                number: true,
                                range: [1, 31],
                            },
                            EndMonth: {
                                required: true,
                                number: true,
                                range: [1, 12],
                            },
                            EndDay: {
                                required: true,
                                number: true,
                                range: [1, 31],
                            },
                        }
                    });
                });
            };
            this.RainExceedanceListShowHideAdd = function ($bjs) {
                return;
            };
            this.RainExceedanceShowHideEditButtons = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest("#ViewDiv").find(".RainExceedanceEditButons").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest("#ViewDiv").find(".RainExceedanceEditButons").removeClass("hidden").addClass("hidden");
                }
            };
            this.RainExceedanceShowHideAdd = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").removeClass("hidden");
                    $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "RainExceedance/_rainExceedanceAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        RainExceedanceID: 0,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").html(ret);
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
                    $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").html("");
                    $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").removeClass("hidden").addClass("hidden");
                }
            };
            this.RainExceedanceShowAddOrModify = function ($bjs) {
                var ParentTVItemID = parseInt($bjs.find("#ViewDiv").data("tvitemid"));
                var RainExceedanceID = parseInt($bjs.data("rainexceedanceid"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop")
                        .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "RainExceedance/_RainExceedanceAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                        RainExceedanceID: RainExceedanceID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop").html(ret);
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
                    $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop").html("");
                }
            };
        }
        return RainExceedance;
    }());
    CSSP.RainExceedance = RainExceedance;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.RainExceedance.js.map