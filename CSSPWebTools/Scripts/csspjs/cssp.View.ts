module CSSP {
    export class View {
        // Constructors
        constructor() {
        }

        // Functions
        public LoadSelectRecursive: Function = ($select: JQuery, ParentTVItemID: number, TVType: number): void => {
            var command: string = "TVItem/_MovingTVItemSelect";
            $.get(cssp.BaseURL + command, { ParentTVItemID: ParentTVItemID, TVType: TVType })
                .done((ret) => {
                    $select.html(ret);
                    var $selectNext: JQuery = $select.next("select");
                    if ($selectNext.length > 0) {
                        var TVType: number = parseInt($selectNext.data("tvtype"));
                        var ParentTVItemID: number = 0;
                        if ($select.val() != null) {
                            parseInt($select.val());
                        }
                        cssp.View.LoadSelectRecursive($selectNext, ParentTVItemID, TVType);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public Help: Function = ($bjs: JQuery): void => {
            var HelpCode: TVAuthEnum = $bjs.data("helpcode");
            var command: string = "Dialog/_dialogHelp";
            $.get(cssp.BaseURL + command, {
                HelpCode: HelpCode
            }).done((ret) => {
                cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Help, cssp.GetHTMLVariable("#LayoutVariables", "varHelp"), ret));
            })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing  
                });
        };
        public Init: Function = (): void => {
            $(document).off("change", ".MovingTVItemSelect");
            $(document).on("change", ".MovingTVItemSelect", (evt: Event) => {
                var $select: JQuery = $(evt.target);
                var $selectNext: JQuery = $(evt.target).next("select");
                if ($selectNext.length == 0)
                    return;
                var TVType: number = parseInt($selectNext.data("tvtype"));
                var ParentTVItemID: number = parseInt($select.val());
                cssp.View.LoadSelectRecursive($selectNext, ParentTVItemID, TVType);
            });

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public ShowHideSecurity: Function = (): void => {
            if ($(".SecurityHidden").hasClass("hidden")) {
                $(".SecurityHidden").removeClass("hidden")
            }
            else {
                $(".SecurityHidden").addClass("hidden")
            }
        };
        public Permissions: Function = ($bjs: JQuery): void => {
            var tvAuth: TVAuthEnum = $bjs.data("tvauth");
            var command: string = "Dialog/_dialogPermissions";
            $.get(cssp.BaseURL + command, {
                TVAuth: tvAuth
            }).done((ret) => {
                    cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Permissions, cssp.GetHTMLVariable("#LayoutVariables", "varPermissions"), ret));
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing  
                });
        };
        public HideMoveTVItemButton: Function = ($bjs: JQuery): void => {
            $bjs.closest("#ViewDiv").find(".jbTVItemMoveStart").removeClass("hidden").addClass("hidden");
        };
        public ShowMoveTVItemButton: Function = ($bjs: JQuery): void => {
            $bjs.closest("#ViewDiv").find(".jbTVItemMoveStart").removeClass("hidden");
        };
        public TVItemMove: Function = ($bjs: JQuery): void => {
            var TVItemIDToMove: number = parseInt($bjs.closest("#TopMovingDiv").find(".MoveFromTVItemID").eq(0).text());
            var TVItemIDUnder: number = parseInt($bjs.closest("#TopMovingDiv").find("select").last().val());

            var command: string = "TVItem/MoveTVItemJSON";
            $.post(cssp.BaseURL + command, {
                TVItemIDToMove: TVItemIDToMove,
                TVItemIDUnder: TVItemIDUnder,
            }).done((ret) => {
                if (ret == "") {
                    cssp.Helper.PageRefresh();
                    $("#DialogBasicCancel").trigger("click");
                }
                else {
                    cssp.Dialog.ShowDialogErrorWithError(ret);
                }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public TVItemMoveStart: Function = ($bjs: JQuery): void => {
            var TVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));

            var command: string = "TVItem/_MovingTVItem";
            $.get(cssp.BaseURL + command, {
                TVItemID: TVItemID,
            }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.TVItemMoving, cssp.GetHTMLVariable("#LayoutVariables", "varMoving"), ret));
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };

    }
} 