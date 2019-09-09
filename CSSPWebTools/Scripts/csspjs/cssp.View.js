var CSSP;
(function (CSSP) {
    var View = (function () {
        // Constructors
        function View() {
            // Functions
            this.LoadSelectRecursive = function ($select, ParentTVItemID, TVType) {
                var command = "TVItem/_MovingTVItemSelect";
                $.get(cssp.BaseURL + command, { ParentTVItemID: ParentTVItemID, TVType: TVType })
                    .done(function (ret) {
                    $select.html(ret);
                    var $selectNext = $select.next("select");
                    if ($selectNext.length > 0) {
                        var TVType = parseInt($selectNext.data("tvtype"));
                        var ParentTVItemID = 0;
                        if ($select.val() != null) {
                            parseInt($select.val());
                        }
                        cssp.View.LoadSelectRecursive($selectNext, ParentTVItemID, TVType);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.Help = function ($bjs) {
                var HelpCode = $bjs.data("helpcode");
                var command = "Dialog/_dialogHelp";
                $.get(cssp.BaseURL + command, {
                    HelpCode: HelpCode
                }).done(function (ret) {
                    cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Help, cssp.GetHTMLVariable("#LayoutVariables", "varHelp"), ret));
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing  
                });
            };
            this.Init = function () {
                $(document).off("change", ".MovingTVItemSelect");
                $(document).on("change", ".MovingTVItemSelect", function (evt) {
                    var $select = $(evt.target);
                    var $selectNext = $(evt.target).next("select");
                    if ($selectNext.length == 0)
                        return;
                    var TVType = parseInt($selectNext.data("tvtype"));
                    var ParentTVItemID = parseInt($select.val());
                    cssp.View.LoadSelectRecursive($selectNext, ParentTVItemID, TVType);
                });
                //if (cssp.Test) {
                //    cssp.Test.ShowTestButtons();
                //}
            };
            this.ShowHideSecurity = function () {
                if ($(".SecurityHidden").hasClass("hidden")) {
                    $(".SecurityHidden").removeClass("hidden");
                }
                else {
                    $(".SecurityHidden").addClass("hidden");
                }
            };
            this.Permissions = function ($bjs) {
                var tvAuth = $bjs.data("tvauth");
                var command = "Dialog/_dialogPermissions";
                $.get(cssp.BaseURL + command, {
                    TVAuth: tvAuth
                }).done(function (ret) {
                    cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Permissions, cssp.GetHTMLVariable("#LayoutVariables", "varPermissions"), ret));
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing  
                });
            };
            this.HideMoveTVItemButton = function ($bjs) {
                $bjs.closest("#ViewDiv").find(".jbTVItemMoveStart").removeClass("hidden").addClass("hidden");
            };
            this.ShowMoveTVItemButton = function ($bjs) {
                $bjs.closest("#ViewDiv").find(".jbTVItemMoveStart").removeClass("hidden");
            };
            this.TVItemMove = function ($bjs) {
                var TVItemIDToMove = parseInt($bjs.closest("#TopMovingDiv").find(".MoveFromTVItemID").eq(0).text());
                var TVItemIDUnder = parseInt($bjs.closest("#TopMovingDiv").find("select").last().val());
                var command = "TVItem/MoveTVItemJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemIDToMove: TVItemIDToMove,
                    TVItemIDUnder: TVItemIDUnder,
                }).done(function (ret) {
                    if (ret == "") {
                        cssp.Helper.PageRefresh();
                        $("#DialogBasicCancel").trigger("click");
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.TVItemMoveStart = function ($bjs) {
                var TVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var command = "TVItem/_MovingTVItem";
                $.get(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.TVItemMoving, cssp.GetHTMLVariable("#LayoutVariables", "varMoving"), ret));
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
        }
        return View;
    }());
    CSSP.View = View;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.View.js.map