
module CSSP {
    export class EmailDistributionList {
        // Variables

        // Constructors
        constructor() {

        }

        // Functions
        public EmailDistributionListAskToDelete: Function = ($bjs: JQuery): void => {
            var RegionName: string = $bjs.data("regionname");
            cssp.Dialog.ShowDialogAreYouSure(RegionName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.EmailDistributionList.SetDialogEvents", $bjs);
        };
        public EmailDistributionListContactAskToDelete: Function = ($bjs: JQuery): void => {
            var ContactName: string = $bjs.data("name");
            cssp.Dialog.ShowDialogAreYouSure(ContactName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.EmailDistributionList.SetDialogEventsContact", $bjs);
        };
        public FormContactSubmit: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest(".EmailDistributionListContactEditForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".EmailDistributionListContactEditForm", "EmailDistributionListContactTopDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.EmailDistributionList.LoadEmailDistributionListContact($bjs);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public FormSubmit: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest(".EmailDistributionListEditForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".EmailDistributionListEditForm", "EmailDistributionListTopDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret != "") {
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
        public InitEdit: Function = (): void => {
            $(".EmailDistributionListEditForm").each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            RegionName: {
                                required: true,
                                maxlength: 100
                            }
                        }
                    });
            });

        };
        public EmailDistributionListShowHideEditButtons: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest("#ViewDiv").find(".EmailDistributionListEditButons").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest("#ViewDiv").find(".EmailDistributionListEditButons").removeClass("hidden").addClass("hidden");
            }
        };
        public EmailDistributionListListShowHideAdd: Function = ($bjs: JQuery): void => {
            var CountryTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").removeClass("hidden");

                $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command: string = "EmailDistributionList/_emailDistributionListAddOrModify";
                $.get(cssp.BaseURL + command, {
                    CountryTVItemID: CountryTVItemID,
                    EmailDistributionListID: 0,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").html(ret);
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
                $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").html("");
                $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").removeClass("hidden").addClass("hidden");
            }
        };
        public EmailDistributionListGenerateExcelFile: Function = ($bjs: JQuery): void => {
            var CountryTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));

            var command: string = "EmailDistributionList/EmailDistributionListGenerateExcelFileJSON";
            $.post(cssp.BaseURL + command, {
                CountryTVItemID: CountryTVItemID
            }).done((ret) => {
                if (ret == "") {
                    cssp.Helper.PageRefresh();
                }
                else {
                    cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public EmailDistributionListMoveDown: Function = ($bjs: JQuery): void => {
            var CountryTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            var EmailDistributionListID: number = parseInt($bjs.data("emaildistributionlistid"));

            var command: string = "EmailDistributionList/EmailDistributionListMoveDownJSON";
            $.post(cssp.BaseURL + command, {
                CountryTVItemID: CountryTVItemID,
                EmailDistributionListID: EmailDistributionListID,
            }).done((ret) => {
                if (ret == "") {
                    cssp.Helper.PageRefresh();
                }
                else {
                    cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public EmailDistributionListMoveUp: Function = ($bjs: JQuery): void => {
            var CountryTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            var EmailDistributionListID: number = parseInt($bjs.data("emaildistributionlistid"));

            var command: string = "EmailDistributionList/EmailDistributionListMoveUpJSON";
            $.post(cssp.BaseURL + command, {
                CountryTVItemID: CountryTVItemID,
                EmailDistributionListID: EmailDistributionListID,
            }).done((ret) => {
                if (ret == "") {
                    cssp.Helper.PageRefresh();
                }
                else {
                    cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public LoadEmailDistributionListAddOrModify: Function = ($bjs: JQuery): void => {
            var CountryTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            var EmailDistributionListID: number = 0;
            if ($bjs.hasClass("jbEmailDistributionListEdit")) {
                EmailDistributionListID = parseInt($bjs.closest(".EmailDistributionListItem").data("emaildistributionlistid"));
            }
            parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".EmailDistributionListItem").find(".EmailDistributionListEdit").removeClass("hidden")
                    .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));

                var command: string = "EmailDistributionList/_emailDistributionListAddOrModify";
                $.get(cssp.BaseURL + command, {
                    CountryTVItemID: CountryTVItemID,
                    EmailDistributionListID: EmailDistributionListID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".EmailDistributionListItem").find(".EmailDistributionListEdit").html(ret);
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
                $bjs.closest(".EmailDistributionListItem").find(".EmailDistributionListEdit").removeClass("hidden").addClass("hidden");
                cssp.TVItem.EditCancel($bjs);
            }
        };
        public LoadEmailDistributionListContact: Function = ($bjs: JQuery): void => {
            var EmailDistributionListID: number = parseInt($bjs.closest(".EmailDistributionListItem").data("emaildistributionlistid"));

            var ContactTopDiv$ = $bjs.closest(".EmailDistributionListContactTopDiv");

            ContactTopDiv$.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));

            var command: string = "EmailDistributionList/_emailDistributionListContact";
            $.get(cssp.BaseURL + command, {
                EmailDistributionListID: EmailDistributionListID,
            }).done((ret) => {
                if (ret) {
                    ContactTopDiv$.html(ret);
                    ContactTopDiv$.closest("#ViewDiv").find(".EmailDistributionListEditButons").removeClass("hidden");
                }
                else {
                    cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public LoadEmailDistributionListContactAddOrModify: Function = ($bjs: JQuery): void => {
            var EmailDistributionListID: number = parseInt($bjs.closest(".EmailDistributionListItem").data("emaildistributionlistid"));
            var EmailDistributionListContactID: number = parseInt($bjs.closest(".EmailDistributionListContactItem").data("emaildistributionlistcontactid"));
            var RowEditWithID$ = $(".RowEdit" + EmailDistributionListContactID);

            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                RowEditWithID$.removeClass("hidden");
                RowEditWithID$.find(".EmailDistributionListContactEdit").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));

                var command: string = "EmailDistributionList/_emailDistributionListContactAddOrModify";
                $.get(cssp.BaseURL + command, {
                    EmailDistributionListID: EmailDistributionListID,
                    EmailDistributionListContactID: EmailDistributionListContactID,
                }).done((ret) => {
                    if (ret) {
                        RowEditWithID$.find(".EmailDistributionListContactEdit").html(ret);
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
                RowEditWithID$.removeClass("hidden").addClass("hidden");
                RowEditWithID$.find(".EmailDistributionListContactEdit").html("");
                cssp.TVItem.EditCancel($bjs);
            }
        };
        public SetDialogEvents: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var EmailDistributionListID: number = parseInt($bjs.closest(".EmailDistributionListItem").data("emaildistributionlistid"));
                    var command: string = "EmailDistributionList/EmailDistributionListDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            EmailDistributionListID: EmailDistributionListID
                        }).done((ret: string) => {
                            if (ret == "") {
                                $bjs.closest(".EmailDistributionListItem").remove();
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
        public SetDialogEventsContact: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var EmailDistributionListContactID: number = parseInt($bjs.closest(".EmailDistributionListContactItem").data("emaildistributionlistcontactid"));
                    var command: string = "EmailDistributionList/EmailDistributionListContactDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            EmailDistributionListContactID: EmailDistributionListContactID
                        }).done((ret: string) => {
                            if (ret == "") {
                                $bjs.closest("li").remove();
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

    }
}