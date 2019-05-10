var CSSP;
(function (CSSP) {
    var Contact = (function () {
        // Constructors
        function Contact() {
            // Variables
            this.FormName = "#ContactEditForm";
            // Functions
            this.AskToDelete = function ($bjs) {
                var TVText = $bjs.closest("li").find(".TVText").text();
                cssp.Dialog.ShowDialogAreYouSure(TVText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.Contact.SetDialogEvents", $bjs);
            };
            this.EditCancel = function ($bjs) {
                $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").each(function (ind, elem) {
                    $(elem).html("");
                });
                $bjs.closest("#ViewDiv").find(".jbContactShowHideAdd, .jbContactShowHideModify").removeClass("btn-success").addClass("btn-default");
            };
            this.FormSubmit = function () {
                var $form = $(cssp.Contact.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Contact.FormName, "TVItemListDiv");
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
            this.HideEditButtons = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
                $tabContent.find(".jbContactShowEditButtons").removeClass("hidden");
                $tabContent.find(".jbContactHideEditButtons").removeClass("hidden").addClass("hidden");
                $tabContent.find(".jbContactShowHideAdd").removeClass("hidden").addClass("hidden");
                $tabContent.find(".ContactEditButtons").removeClass("hidden").addClass("hidden");
                cssp.Contact.EditCancel($bjs);
            };
            this.Init = function () {
                //if (cssp.Test) {
                //    cssp.Test.ShowTestButtons();
                //}
            };
            this.InitEdit = function () {
                $(cssp.Contact.FormName).each(function (ind, elem) {
                    $(elem).validate({
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
            this.LinkUserToParentTVItemID = function (ParentTVItemID, ContactTVItemID) {
                var command = "Contact/LinkParentTVItemIDAndContactTVItemIDJSON";
                $.post(cssp.BaseURL + command, {
                    ParentTVItemID: ParentTVItemID,
                    ContactTVItemID: ContactTVItemID,
                }).done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
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
            };
            this.SetTypeAheadSearch = function () {
                cssp.Contact.ContactSearchRes = new Bloodhound({
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
                    var ParentTVItemID = parseInt($("#ContactSearch").data("parenttvitemid"));
                    var ContactTVItemID = cssp.Contact.contactModel.ContactTVItemID;
                    cssp.Contact.LinkUserToParentTVItemID(ParentTVItemID, ContactTVItemID);
                });
            };
            this.SetDialogEvents = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
                var ContactTVItemID = parseInt($bjs.closest("li").data("contacttvitemid"));
                var ParentTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var TVText = $bjs.closest("li").find(".TVText").text();
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var command = "Contact/ContactDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            ParentTVItemID: ParentTVItemID,
                            ContactTVItemID: ContactTVItemID,
                        }).done(function (ret) {
                            if (ret == "") {
                                cssp.Dialog.ShowDialogSuccess("[" + TVText + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
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
            this.ContactShowHideAdd = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.closest("#ViewDiv").find(".jbContactShowHideModify").removeClass("btn-success").addClass("btn-default");
                    $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").html("");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var ParentTVItemID = $bjs.closest("#ViewDiv").data("tvitemid");
                    var ContactTVItemID = 0;
                    $bjs.closest("#ViewDiv").find(".ContactAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "Contact/_contactAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                        ContactTVItemID: ContactTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest("#ViewDiv").find(".ContactAdd").html(ret);
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
                    $bjs.closest("#ViewDiv").find(".ContactAdd").each(function (ind, elem) {
                        $(elem).html("");
                    });
                }
            };
            this.ContactShowHideModify = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.closest("#ViewDiv").find(".jbContactShowHideAdd").removeClass("btn-success").addClass("btn-default");
                    $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").html("");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var ParentTVItemID = $bjs.closest("#ViewDiv").data("tvitemid");
                    var ContactTVItemID = parseInt($bjs.closest("li").data("contacttvitemid"));
                    $bjs.closest("#ViewDiv").find(".ContactModify").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "Contact/_contactAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                        ContactTVItemID: ContactTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest("li").find(".ContactModify").html(ret);
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
                    $bjs.closest("#ViewDiv").find(".ContactAdd, .ContactModify").each(function (ind, elem) {
                        $(elem).html("");
                    });
                }
            };
            this.ShowEditButtons = function ($bjs) {
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
        return Contact;
    }());
    CSSP.Contact = Contact;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Contact.js.map