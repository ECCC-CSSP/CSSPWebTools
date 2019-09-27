var CSSP;
(function (CSSP) {
    var TVItem = /** @class */ (function () {
        // Constructors
        function TVItem() {
            // Variables
            this.FormName = "#TVItemEditForm";
            // Functions
            this.AskToDelete = function ($bjs) {
                var TVText = $bjs.closest("li").find(".TVText").text();
                cssp.Dialog.ShowDialogAreYouSure(TVText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.TVItem.SetDialogEvents", $bjs);
            };
            this.EditCancel = function ($bjs) {
                $("#ViewDiv").find(".jbTVItemShowAdd, .jbTVItemShowModify").removeClass("btn-success").addClass("btn-default");
                var $TVItemModify = $("#ViewDiv").find(".TVItemAdd, .TVItemModify").html("");
            };
            this.FormSubmit = function () {
                var $form = $(cssp.TVItem.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.TVItem.FormName, "TVItemListDiv");
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
                    }).always(function () {
                        cssp.Login.CheckIfAdmin();
                    });
                }
            };
            this.Init = function () {
                $(cssp.TVItem.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            ParentTVItemID: {
                                required: true,
                            },
                            TVItemID: {
                                required: true,
                            },
                            TVType: {
                                required: true,
                            },
                            TVText: {
                                required: true,
                                maxlength: 200,
                            },
                            MapInfoPoint: {
                                required: true,
                            },
                        }
                    });
                });
                //if (cssp.Test) {
                //    cssp.Test.ShowTestButtons();
                //}
            };
            this.InitGoogleTopCenter = function () {
                $("#MapBreadCrumb").html($(".breadcrumb").html());
                $("#MapCurrentTab").html($(".AlsoUsedInGoogleTopCenterCurrentTab").html());
                $("#MapOtherTabs").html($(".AlsoUsedInGoogleTopCenterOtherTabs").html());
            };
            this.SetDialogEvents = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
                var TVItemID = parseInt($bjs.closest("li").data("tvitemid"));
                var TVText = $bjs.closest("li").find(".TVText").text();
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var command = "TVItem/TVItemDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            TVItemID: TVItemID
                        }).done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess("[" + TVText + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.ShowAdd = function ($bjs) {
                var ParentTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var TVItemID = 0;
                var TVType = $bjs.closest(".tab-content").data("tvtype");
                if ($bjs.hasClass("btn-default")) {
                    $("#ViewDiv").find(".jbTVItemShowAdd, .jbTVItemShowModify").removeClass("btn-success").addClass("btn-default");
                    $("#ViewDiv").find(".TVItemModify, .TVItemAdd").html("");
                    $("#ViewDiv").find(".TVItemAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var command = "TVItem/_TVItemAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                        TVItemID: TVItemID,
                        TVType: TVType,
                    }).done(function (ret) {
                        if (ret) {
                            $("#ViewDiv").find(".TVItemAdd").html(ret);
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
                    $("#ViewDiv").find(".TVItemModify, .TVItemAdd").html("");
                }
            };
            this.ShowModify = function ($bjs) {
                var ParentTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var TVItemID = parseInt($bjs.closest("li").data("tvitemid"));
                var TVType = $bjs.closest(".tab-content").data("tvtype");
                if ($bjs.hasClass("btn-default")) {
                    $("#ViewDiv").find(".jbTVItemShowAdd, .jbTVItemShowModify").removeClass("btn-success").addClass("btn-default");
                    $("#ViewDiv").find(".TVItemModify, .TVItemAdd").html("");
                    $bjs.closest("li").find(".TVItemModify").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var command = "TVItem/_TVItemAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                        TVItemID: TVItemID,
                        TVType: TVType,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest("li").find(".TVItemModify").html(ret);
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
                    $("#ViewDiv").find(".TVItemModify, .TVItemAdd").html("");
                }
            };
            this.ShowHideEditButtons = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
                $tabContent.find(".jbTVItemShowAdd, .jbTVItemShowModify").removeClass("btn-success").addClass("btn-default");
                if ($bjs.hasClass("btn-default")) {
                    $tabContent.find(".jbTVItemShowHideEditButtons").removeClass("btn-default").addClass("btn-success");
                    $tabContent.find(".jbTVItemShowAdd").removeClass("hidden");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden");
                    cssp.View.ShowMoveTVItemButton($bjs);
                }
                else {
                    $tabContent.find(".jbTVItemShowHideEditButtons").removeClass("btn-success").addClass("btn-default");
                    $tabContent.find(".jbTVItemShowAdd").removeClass("hidden").addClass("hidden");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden").addClass("hidden");
                    cssp.TVItem.EditCancel($bjs);
                    cssp.View.HideMoveTVItemButton($bjs);
                }
            };
        }
        return TVItem;
    }());
    CSSP.TVItem = TVItem;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TVItem.js.map