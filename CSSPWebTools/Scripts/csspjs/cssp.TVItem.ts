
module CSSP {
    export class TVItem {
        // Variables
        private FormName: string = "#TVItemEditForm";

        // Constructors
        constructor() {
        }

        // Functions
        public AskToDelete: Function = ($bjs: JQuery): void => {
            var TVText: string = $bjs.closest("li").find(".TVText").text();
            cssp.Dialog.ShowDialogAreYouSure(TVText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.TVItem.SetDialogEvents", $bjs);
        };
        public EditCancel: Function = ($bjs: JQuery): void => {
            $("#ViewDiv").find(".jbTVItemShowAdd, .jbTVItemShowModify").removeClass("btn-success").addClass("btn-default");
            var $TVItemModify: JQuery = $("#ViewDiv").find(".TVItemAdd, .TVItemModify").html("");
        };
        public FormSubmit: Function = (): void => {
            var $form: JQuery = $(cssp.TVItem.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.TVItem.FormName, "TVItemListDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        cssp.Login.CheckIfAdmin();
                    });
            }
        };
        public Init: Function = (): void => {
            $(cssp.TVItem.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
        public InitGoogleTopCenter: Function = (): void => {
            $("#MapBreadCrumb").html($(".breadcrumb").html());
            $("#MapCurrentTab").html($(".AlsoUsedInGoogleTopCenterCurrentTab").html());
            $("#MapOtherTabs").html($(".AlsoUsedInGoogleTopCenterOtherTabs").html());
        };
        public SetDialogEvents: Function = ($bjs: JQuery): void => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
            var TVItemID: number = parseInt($bjs.closest("li").data("tvitemid"));
            var TVText: string = $bjs.closest("li").find(".TVText").text();
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var command: string = "TVItem/TVItemDeleteJSON";
                    $.post(cssp.BaseURL + command, {
                        TVItemID: TVItemID
                    }).done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess("[" + TVText + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
        public ShowAdd: Function = ($bjs: JQuery): void => {
            var ParentTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var TVItemID: number = 0;
            var TVType: TVTypeEnum = $bjs.closest(".tab-content").data("tvtype");

            if ($bjs.hasClass("btn-default")) {
                $("#ViewDiv").find(".jbTVItemShowAdd, .jbTVItemShowModify").removeClass("btn-success").addClass("btn-default");
                $("#ViewDiv").find(".TVItemModify, .TVItemAdd").html("");
                $("#ViewDiv").find(".TVItemAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $bjs.removeClass("btn-default").addClass("btn-success");
                var command: string = "TVItem/_TVItemAddOrModify";
                $.get(cssp.BaseURL + command, {
                    ParentTVItemID: ParentTVItemID,
                    TVItemID: TVItemID,
                    TVType: TVType,
                }).done((ret) => {
                        if (ret) {
                            $("#ViewDiv").find(".TVItemAdd").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $("#ViewDiv").find(".TVItemModify, .TVItemAdd").html("");
            }
        };
        public ShowModify: Function = ($bjs: JQuery): void => {
            var ParentTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var TVItemID: number = parseInt($bjs.closest("li").data("tvitemid"));
            var TVType: TVTypeEnum = $bjs.closest(".tab-content").data("tvtype");

            if ($bjs.hasClass("btn-default")) {
                $("#ViewDiv").find(".jbTVItemShowAdd, .jbTVItemShowModify").removeClass("btn-success").addClass("btn-default");
                $("#ViewDiv").find(".TVItemModify, .TVItemAdd").html("");
                $bjs.closest("li").find(".TVItemModify").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $bjs.removeClass("btn-default").addClass("btn-success");
                var command: string = "TVItem/_TVItemAddOrModify";
                $.get(cssp.BaseURL + command, {
                    ParentTVItemID: ParentTVItemID,
                    TVItemID: TVItemID,
                    TVType: TVType,
                }).done((ret) => {
                        if (ret) {
                            $bjs.closest("li").find(".TVItemModify").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $("#ViewDiv").find(".TVItemModify, .TVItemAdd").html("");
            }
        };
        public ShowHideEditButtons: Function = ($bjs: JQuery): void => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
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
}