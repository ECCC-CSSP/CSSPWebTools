var CSSP;
(function (CSSP) {
    var EmailDistributionList = (function () {
        // Variables
        // Constructors
        function EmailDistributionList() {
            // Functions
            this.EmailDistributionListAskToDelete = function ($bjs) {
                var RegionName = $bjs.data("regionname");
                cssp.Dialog.ShowDialogAreYouSure(RegionName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.EmailDistributionList.SetDialogEvents", $bjs);
            };
            this.EmailDistributionListContactAskToDelete = function ($bjs) {
                var ContactName = $bjs.data("name");
                cssp.Dialog.ShowDialogAreYouSure(ContactName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.EmailDistributionList.SetDialogEventsContact", $bjs);
            };
            this.FormContactSubmit = function ($bjs) {
                var $form = $bjs.closest(".EmailDistributionListContactEditForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".EmailDistributionListContactEditForm", "EmailDistributionListContactTopDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.EmailDistributionList.LoadEmailDistributionListContact($bjs);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest(".EmailDistributionListEditForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".EmailDistributionListEditForm", "EmailDistributionListTopDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
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
                $(".EmailDistributionListEditForm").each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            RegionName: {
                                required: true,
                                maxlength: 100
                            }
                        }
                    });
                });
            };
            this.EmailDistributionListShowHideEditButtons = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest("#ViewDiv").find(".EmailDistributionListEditButons").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest("#ViewDiv").find(".EmailDistributionListEditButons").removeClass("hidden").addClass("hidden");
                }
            };
            this.EmailDistributionListListShowHideAdd = function ($bjs) {
                var CountryTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").removeClass("hidden");
                    $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "EmailDistributionList/_emailDistributionListAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        CountryTVItemID: CountryTVItemID,
                        EmailDistributionListID: 0,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").html(ret);
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
                    $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").html("");
                    $bjs.closest(".EmailDistributionListTopDiv").find(".EmailDistributionListAdd").removeClass("hidden").addClass("hidden");
                }
            };
            this.EmailDistributionListGenerateExcelFile = function ($bjs) {
                var CountryTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var command = "EmailDistributionList/EmailDistributionListGenerateExcelFileJSON";
                $.post(cssp.BaseURL + command, {
                    CountryTVItemID: CountryTVItemID
                }).done(function (ret) {
                    if (ret == "") {
                        cssp.Helper.PageRefresh();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.EmailDistributionListMoveDown = function ($bjs) {
                var CountryTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var EmailDistributionListID = parseInt($bjs.data("emaildistributionlistid"));
                var command = "EmailDistributionList/EmailDistributionListMoveDownJSON";
                $.post(cssp.BaseURL + command, {
                    CountryTVItemID: CountryTVItemID,
                    EmailDistributionListID: EmailDistributionListID,
                }).done(function (ret) {
                    if (ret == "") {
                        cssp.Helper.PageRefresh();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.EmailDistributionListMoveUp = function ($bjs) {
                var CountryTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var EmailDistributionListID = parseInt($bjs.data("emaildistributionlistid"));
                var command = "EmailDistributionList/EmailDistributionListMoveUpJSON";
                $.post(cssp.BaseURL + command, {
                    CountryTVItemID: CountryTVItemID,
                    EmailDistributionListID: EmailDistributionListID,
                }).done(function (ret) {
                    if (ret == "") {
                        cssp.Helper.PageRefresh();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.LoadEmailDistributionListAddOrModify = function ($bjs) {
                var CountryTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var EmailDistributionListID = 0;
                if ($bjs.hasClass("jbEmailDistributionListEdit")) {
                    EmailDistributionListID = parseInt($bjs.closest(".EmailDistributionListItem").data("emaildistributionlistid"));
                }
                parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".EmailDistributionListItem").find(".EmailDistributionListEdit").removeClass("hidden")
                        .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "EmailDistributionList/_emailDistributionListAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        CountryTVItemID: CountryTVItemID,
                        EmailDistributionListID: EmailDistributionListID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".EmailDistributionListItem").find(".EmailDistributionListEdit").html(ret);
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
                    $bjs.closest(".EmailDistributionListItem").find(".EmailDistributionListEdit").removeClass("hidden").addClass("hidden");
                    cssp.TVItem.EditCancel($bjs);
                }
            };
            this.LoadEmailDistributionListContact = function ($bjs) {
                var EmailDistributionListID = parseInt($bjs.closest(".EmailDistributionListItem").data("emaildistributionlistid"));
                var ContactTopDiv$ = $bjs.closest(".EmailDistributionListContactTopDiv");
                ContactTopDiv$.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "EmailDistributionList/_emailDistributionListContact";
                $.get(cssp.BaseURL + command, {
                    EmailDistributionListID: EmailDistributionListID,
                }).done(function (ret) {
                    if (ret) {
                        ContactTopDiv$.html(ret);
                        ContactTopDiv$.closest("#ViewDiv").find(".EmailDistributionListEditButons").removeClass("hidden");
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.LoadEmailDistributionListContactAddOrModify = function ($bjs) {
                var EmailDistributionListID = parseInt($bjs.closest(".EmailDistributionListItem").data("emaildistributionlistid"));
                var EmailDistributionListContactID = parseInt($bjs.closest(".EmailDistributionListContactItem").data("emaildistributionlistcontactid"));
                var RowEditWithID$ = $(".RowEdit" + EmailDistributionListContactID);
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    RowEditWithID$.removeClass("hidden");
                    RowEditWithID$.find(".EmailDistributionListContactEdit").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "EmailDistributionList/_emailDistributionListContactAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        EmailDistributionListID: EmailDistributionListID,
                        EmailDistributionListContactID: EmailDistributionListContactID,
                    }).done(function (ret) {
                        if (ret) {
                            RowEditWithID$.find(".EmailDistributionListContactEdit").html(ret);
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
                    RowEditWithID$.removeClass("hidden").addClass("hidden");
                    RowEditWithID$.find(".EmailDistributionListContactEdit").html("");
                    cssp.TVItem.EditCancel($bjs);
                }
            };
            this.ShowHideEmailDistributionListContactAdd = function ($bjs) {
                var EmailDistributionListID = parseInt($bjs.closest(".EmailDistributionListContactItem").data("emaildistributionlistid"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".EmailDistributionListContactItem").find(".EmailDistributionListContactEdit").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".EmailDistributionListContactItem").find(".EmailDistributionListContactEdit").removeClass("hidden").addClass("hidden");
                }
            };
            this.SetDialogEvents = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var EmailDistributionListID = parseInt($bjs.closest(".EmailDistributionListItem").data("emaildistributionlistid"));
                        var command = "EmailDistributionList/EmailDistributionListDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            EmailDistributionListID: EmailDistributionListID
                        }).done(function (ret) {
                            if (ret == "") {
                                $bjs.closest(".EmailDistributionListItem").remove();
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
            this.SetDialogEventsContact = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var EmailDistributionListContactID = parseInt($bjs.closest(".EmailDistributionListContactItem").data("emaildistributionlistcontactid"));
                        var command = "EmailDistributionList/EmailDistributionListContactDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            EmailDistributionListContactID: EmailDistributionListContactID
                        }).done(function (ret) {
                            if (ret == "") {
                                $bjs.closest("li").remove();
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
        }
        return EmailDistributionList;
    }());
    CSSP.EmailDistributionList = EmailDistributionList;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.EmailDistributionList.js.map