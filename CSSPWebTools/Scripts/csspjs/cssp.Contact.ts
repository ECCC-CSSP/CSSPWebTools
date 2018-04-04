module CSSP {
    export class Contact {
        // Variables
        public FormName: string = "#ContactEditForm";
        public contactModel: CSSP.ContactModel;
        public ContactSearchRes: Bloodhound<ContactSearchModel>;

        // Constructors
        constructor() {
        }

        // Functions
        public AskToDelete: Function = ($bjs: JQuery): void => {
            var TVText: string = $bjs.closest("li").find(".TVText").text();
            cssp.Dialog.ShowDialogAreYouSure(TVText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.Contact.SetDialogEvents", $bjs);
        };
        public EditCancel: Function = ($bjs: JQuery): void => {
            $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").each((ind: number, elem: Element) => {
                $(elem).html("");
            });
            $bjs.closest("#ViewDiv").find(".jbContactShowHideAdd, .jbContactShowHideModify").removeClass("btn-success").addClass("btn-default");
        };
        public FormSubmit: Function = (): void => {
            var $form: JQuery = $(cssp.Contact.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Contact.FormName, "TVItemListDiv");
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
        public HideEditButtons: Function = ($bjs: JQuery): void => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
            $tabContent.find(".jbContactShowEditButtons").removeClass("hidden");
            $tabContent.find(".jbContactHideEditButtons").removeClass("hidden").addClass("hidden");
            $tabContent.find(".jbContactShowHideAdd").removeClass("hidden").addClass("hidden");
            $tabContent.find(".ContactEditButtons").removeClass("hidden").addClass("hidden");
            cssp.Contact.EditCancel($bjs);
        };
        public Init: Function = (): void => {
            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public InitEdit: Function = (): void => {
            $(cssp.Contact.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            FirstName: {
                                required: true,
                                maxlength: 100,
                            },
                            Initial: {
                                required: false,
                                maxlength: 100,
                            },
                            LastName: {
                                required: true,
                                maxlength: 100,
                            },
                            LoginEmail: {
                                required: true,
                                maxlength: 100,
                                email: true,
                            }
                        }
                    });
            });

            cssp.Contact.SetTypeAheadSearch();

            if ($("#ContactSearch")) {
                $("#ContactSearch").placeholder();
            }

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public LinkUserToParentTVItemID: Function = (ParentTVItemID: number, ContactTVItemID: number): void => {
            var command: string = "Contact/LinkParentTVItemIDAndContactTVItemIDJSON"
            $.post(cssp.BaseURL + command,
                {
                    ParentTVItemID: ParentTVItemID,
                    ContactTVItemID: ContactTVItemID,
                }).done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
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
        };
        public SetTypeAheadSearch: Function = (): void => {
            cssp.Contact.ContactSearchRes = new Bloodhound<ContactSearchModel>(
                {
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("FullName"),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: cssp.BaseURL + "Contact/ContactSearchJSON?SearchTerm=ERROR",
                        replace: function (url, query) {
                            url = cssp.BaseURL + "Contact/ContactSearchJSON?SearchTerm=" + encodeURIComponent($("#ContactSearch").val());
                            return url;
                        }
                    },
                });

            cssp.Contact.ContactSearchRes.initialize();

            $("#ContactSearch").off("typeahead:selected");
            $("#ContactSearch").typeahead(null, {
                name: "res",
                displayKey: "FullName",
                source: cssp.Contact.ContactSearchRes.ttAdapter(),
            }).on("typeahead:selected", function (obj, datum, name) {
                cssp.Contact.contactModel = new CSSP.ContactModel(datum.ContactTVItemID, true, "");
                var ParentTVItemID: number = parseInt($("#ContactSearch").data("parenttvitemid"));
                var ContactTVItemID: number = cssp.Contact.contactModel.ContactTVItemID;
                cssp.Contact.LinkUserToParentTVItemID(ParentTVItemID, ContactTVItemID);
            });
        };
        public SetDialogEvents: Function = ($bjs: JQuery) => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
            var ContactTVItemID: number = parseInt($bjs.closest("li").data("contacttvitemid"));
            var ParentTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            var TVText: string = $bjs.closest("li").find(".TVText").text();
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var command: string = "Contact/ContactDeleteJSON";
                    $.post(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                        ContactTVItemID: ContactTVItemID,
                    }).done((ret) => {
                        if (ret == "") {
                            cssp.Dialog.ShowDialogSuccess("[" + TVText + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
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
        public ContactShowHideAdd: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.closest("#ViewDiv").find(".jbContactShowHideModify").removeClass("btn-success").addClass("btn-default");
                $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").html("");
                $bjs.removeClass("btn-default").addClass("btn-success");

                var ParentTVItemID: number = $bjs.closest("#ViewDiv").data("tvitemid");
                var ContactTVItemID: number = 0;

                $bjs.closest("#ViewDiv").find(".ContactAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command: string = "Contact/_contactAddOrModify";
                $.get(cssp.BaseURL + command, {
                    ParentTVItemID: ParentTVItemID,
                    ContactTVItemID: ContactTVItemID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest("#ViewDiv").find(".ContactAdd").html(ret);
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
                $bjs.closest("#ViewDiv").find(".ContactAdd").each((ind: number, elem: Element) => {
                    $(elem).html("");
                });
            }
        };
        public ContactShowHideModify: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.closest("#ViewDiv").find(".jbContactShowHideAdd").removeClass("btn-success").addClass("btn-default");
                $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").html("");
                $bjs.removeClass("btn-default").addClass("btn-success");

                var ParentTVItemID: number = $bjs.closest("#ViewDiv").data("tvitemid");
                var ContactTVItemID: number = parseInt($bjs.closest("li").data("contacttvitemid"));

                $bjs.closest("#ViewDiv").find(".ContactModify").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command: string = "Contact/_contactAddOrModify";
                $.get(cssp.BaseURL + command, {
                    ParentTVItemID: ParentTVItemID,
                    ContactTVItemID: ContactTVItemID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest("li").find(".ContactModify").html(ret);
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
                $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").each((ind: number, elem: Element) => {
                    $(elem).html("");
                });
            }
        };
        public ShowEditButtons: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest("#ViewDiv").find(".jbContactShowHideAdd").removeClass("hidden");
                $bjs.closest("#ViewDiv").find(".jbContactHideEditButtons").removeClass("hidden");
                $bjs.closest("#ViewDiv").find(".ContactEditButtons").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest("#ViewDiv").find(".jbContactShowHideAdd").addClass("hidden");
                $bjs.closest("#ViewDiv").find(".jbContactHideEditButtons").addClass("hidden");
                $bjs.closest("#ViewDiv").find(".ContactEditButtons").addClass("hidden");
                $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").html("");
                $bjs.closest("#ViewDiv").find(".jbContactShowHideAdd, .jbContactShowHideModify").removeClass("btn-success").addClass("btn-default");

            }
        };
    }
}   