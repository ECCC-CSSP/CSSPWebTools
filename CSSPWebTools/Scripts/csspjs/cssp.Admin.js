var CSSP;
(function (CSSP) {
    var Admin = (function () {
        // Constructor
        function Admin() {
            var _this = this;
            this.TVTypeNamesAndTVPathList = [];
            this.TVTypeNamesAndTVPathCount = 0;
            this.TVTypeNameHTML = "";
            this.TVItemTVAuthList = [];
            this.TVTypeTVAuthList = [];
            // Function
            this.ReportTypeAddOrModify = function ($bjs) {
                var IsAdd = $bjs.data("addormodify") == "add" ? true : false;
                var $form = $bjs.closest("form.ReportTypeForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportTypeForm", "Form tag");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command_1 = $form.attr("action");
                    $.post(cssp.BaseURL + command_1, $form.serializeArray())
                        .done(function (ret) {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            if (IsAdd) {
                                cssp.Helper.PageRefresh();
                                cssp.Dialog.ShowDialogSuccess("Added successfully");
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess("Modified successfully");
                            }
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
            };
            this.ReportTypeDelete = function ($bjs) {
                var ReportTypeID = parseInt($bjs.data("reporttypeid"));
                var command = "ReportType/ReportTypeDeleteJSON";
                $.post(cssp.BaseURL + command, { ReportTypeID: ReportTypeID })
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
            };
            this.AskToRemoveUser = function ($ajs) {
                cssp.Dialog.ShowDialogAreYouSure(cssp.Admin.contactModel.LoginEmail);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.Admin.SetDialogEvents", $ajs);
            };
            this.ContactDisabledToggle = function () {
                var command = "Admin/ContactDisabledToggleJSON";
                $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID })
                    .done(function (ret) {
                    if (ret.Error) {
                        cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                    }
                    else {
                        cssp.Admin.LoadUser(cssp.Admin.contactModel.ContactTVItemID);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.CreateChildTVTypeLoop = function (ParentTVTypeAndTVPath, $ParentBlockquote) {
                for (var j = 0; j < cssp.Admin.TVTypeNamesAndTVPathCount; j++) {
                    var ChildTVType = cssp.Admin.TVTypeNamesAndTVPathList[j];
                    if (ChildTVType.ParentIndex == ParentTVTypeAndTVPath.Index) {
                        $ParentBlockquote.append(cssp.Admin.BlockquoteTVTypeTemplate);
                        var $Blockquote = $ParentBlockquote.find("blockquote").last();
                        $Blockquote.attr("data-tvtypename", ChildTVType.TVTypeName);
                        $Blockquote.attr("data-index", ChildTVType.Index);
                        $Blockquote.attr("data-tvpath", ChildTVType.TVPath);
                        $Blockquote.find("span").eq(0).text(ChildTVType.TVTypeName);
                        $Blockquote.find(".adminTVItemsSelected").html("");
                        cssp.Admin.CreateChildTVTypeLoop(ChildTVType, $Blockquote);
                    }
                }
            };
            this.CreateTVItem = function () {
                for (var i = 0, count = cssp.Admin.TVItemTVAuthList.length; i < count; i++) {
                    $(".adminBlock[data-tvtypename='" + cssp.Admin.TVItemTVAuthList[i].TVTypeStr + "']").find(".adminTVItemsSelected").eq(0).append(_this.BlockquoteTVItemTemplate);
                    var $TVItem = $(".adminBlock[data-tvtypename='" + cssp.Admin.TVItemTVAuthList[i].TVTypeStr + "']").children(".adminTVItems").eq(0).find(".adminTVItemsSelectedTemp").last();
                    $TVItem.find("span").eq(0).text(cssp.Admin.TVItemTVAuthList[i].TVText);
                    $TVItem.attr("data-tvitemid", cssp.Admin.TVItemTVAuthList[i].TVItemID1);
                    $TVItem.attr("data-tvitemuserauthid", cssp.Admin.TVItemTVAuthList[i].TVItemUserAuthID);
                    $TVItem.find("button.jbTVTypeAuthAdmin, button.jbTVTypeAuthDelete, button.jbTVTypeAuthCreate, button.jbTVTypeAuthEdit, button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess").removeClass("btn-success").addClass("btn-default");
                    var selector = "";
                    switch (cssp.Admin.TVItemTVAuthList[i].TVAuth) {
                        case 6:
                            selector = "button.jbTVItemAuthAdmin, button.jbTVItemAuthDelete, button.jbTVItemAuthCreate, button.jbTVItemAuthEdit, button.jbTVItemAuthRead, button.jbTVItemAuthNoAccess";
                            break;
                        case 5:
                            selector = "button.jbTVItemAuthDelete, button.jbTVItemAuthCreate, button.jbTVItemAuthEdit, button.jbTVItemAuthRead, button.jbTVItemAuthNoAccess";
                            break;
                        case 4:
                            selector = "button.jbTVItemAuthCreate, button.jbTVItemAuthEdit, button.jbTVItemAuthRead, button.jbTVItemAuthNoAccess";
                            break;
                        case 3:
                            selector = "button.jbTVItemAuthEdit, button.jbTVItemAuthRead, button.jbTVItemAuthNoAccess";
                            break;
                        case 2:
                            selector = "button.jbTVItemAuthRead, button.jbTVItemAuthNoAccess";
                            break;
                        case 1:
                            selector = "button.jbTVItemAuthNoAccess";
                            break;
                        default:
                            break;
                    }
                    $TVItem.find(selector).removeClass("btn-default").addClass("btn-success");
                }
            };
            this.GenerateTVTypeHTML = function () {
                var RootTVType = cssp.Admin.TVTypeNamesAndTVPathList[0];
                var $TVType = $("#TVTypeNamesAndPath");
                $TVType.html("").append(cssp.Admin.BlockquoteTVTypeTemplate);
                var $Blockquote = $("#TVTypeNamesAndPath blockquote").eq(0);
                $Blockquote.attr("data-tvtypename", RootTVType.TVTypeName);
                $Blockquote.attr("data-index", RootTVType.Index);
                $Blockquote.attr("data-tvpath", RootTVType.TVPath);
                $Blockquote.find("span").eq(0).text(RootTVType.TVTypeName);
                cssp.Admin.CreateChildTVTypeLoop(RootTVType, $Blockquote);
                cssp.Admin.UpdateHTMLTVAuth();
                cssp.Admin.CreateTVItem();
                $(".jbTVTypeAuthRemove").eq(1).removeClass("hidden").addClass("hidden");
            };
            this.Init = function () {
                cssp.Admin.BlockquoteTVTypeTemplate = $("#AdminAuthTVTypeTemp").html();
                cssp.Admin.BlockquoteTVItemTemplate = $("#AdminAuthTVItemTemp").html();
                cssp.Admin.SetTypeAheadSearch();
                cssp.Admin.LoadTVTypeNamesAndPathList();
                $(document).off("change", ".AdminTVItemSelect");
                $(document).on("change", ".AdminTVItemSelect", function (evt) {
                    var $select = $(evt.target);
                    var $selectNext = $(evt.target).next("select");
                    if ($selectNext.length > 0) {
                        var TVPathNext = $selectNext.data("tvpath");
                        var ParentTVItemID = parseInt($select.val());
                        var command = "Admin/_TVItemTVAuthSelect";
                        $.get(cssp.BaseURL + command, { ParentTVItemID: ParentTVItemID, TVPathNext: TVPathNext })
                            .done(function (ret) {
                            $selectNext.replaceWith(ret);
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(function () {
                            // nothing
                        });
                    }
                    else {
                        var TVItemID1 = parseInt($select.val());
                        var command = "Admin/SetUserTVItemAuthJSON";
                        setTimeout(function () {
                            $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, TVItemID1: TVItemID1, TVAuth: CSSP.TVAuthEnum.NoAccess })
                                .done(function (ret) {
                                if (ret.Error != "") {
                                    cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                                }
                            })
                                .fail(function () {
                                cssp.Dialog.ShowDialogErrorWithFail(command);
                            }).always(function () {
                                cssp.Admin.LoadUser();
                            });
                        }, 500);
                    }
                });
                if ($("#AdminContactSearch")) {
                    $("#AdminContactSearch").placeholder();
                }
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            this.InitUser = function (ContactTVItemID, Disabled, LoginEmail) {
                _this.contactModel = new CSSP.ContactModel(ContactTVItemID, Disabled, LoginEmail);
                $(document).off("click", "input.province");
                $(document).on("click", "input.province", function (evt) {
                    $(evt.target).closest(".ProvinceDiv").find("input.province").attr("disabled", "disabled");
                    var command = "Admin/SetRemoveProvinceJSON";
                    if ($(evt.target).is(":checked")) {
                        command = "Admin/SetAddProvinceJSON";
                    }
                    var ProvinceTVItemID = parseInt($(evt.target).val());
                    $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, ProvinceTVItemID: ProvinceTVItemID })
                        .done(function (ret) {
                        if (ret.length > 0) {
                            cssp.Dialog.ShowDialogErrorWithFail(ret);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        $(evt.target).closest(".ProvinceDiv").find("input.province").removeAttr("disabled");
                    });
                });
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            this.LoadTVTypeNamesAndPathList = function () {
                var command = "Admin/GetTVTypeNameAndPathListJSON";
                cssp.Admin.TVTypeNamesAndTVPathList = [];
                $.post(cssp.BaseURL + command)
                    .done(function (ret) {
                    cssp.Admin.TVTypeNamesAndTVPathCount = ret.length;
                    for (var i = 0; i < cssp.Admin.TVTypeNamesAndTVPathCount; i++) {
                        cssp.Admin.TVTypeNamesAndTVPathList.push(new CSSP.TVTypeNamesAndTVPath(ret[i].TVTypeName, ret[i].Index, ret[i].TVPath, cssp.Helper.GetParentID(ret[i].TVPath)));
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.LoadUser = function () {
                var command = "Admin/_User";
                $.get(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID })
                    .done(function (ret) {
                    $("#CurrentUser").html(ret);
                    cssp.Admin.LoadUserTVTypeAuth();
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.LoadUserTVItemAuth = function () {
                var command = "Admin/GetUserTVItemAuthJSON";
                cssp.Admin.TVItemTVAuthList = [];
                cssp.Admin.TVTypeNameHTML = "";
                $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID })
                    .done(function (ret) {
                    cssp.Admin.TVItemTVAuthCount = ret.length;
                    for (var i = 0; i < cssp.Admin.TVItemTVAuthCount; i++) {
                        cssp.Admin.TVItemTVAuthList.push(new CSSP.TVItemTVAuth(ret[i].TVItemUserAuthID, ret[i].TVText, ret[i].TVItemID1, ret[i].TVTypeStr, ret[i].TVAuth));
                    }
                    cssp.Admin.GenerateTVTypeHTML();
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.LoadUserTVTypeAuth = function () {
                var command = "Admin/GetUserTVTypeAuthJSON";
                cssp.Admin.TVTypeTVAuthList = [];
                cssp.Admin.TVTypeNameHTML = "";
                $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID })
                    .done(function (ret) {
                    cssp.Admin.TVTypeTVAuthCount = ret.length;
                    for (var i = 0; i < cssp.Admin.TVTypeTVAuthCount; i++) {
                        cssp.Admin.TVTypeTVAuthList.push(new CSSP.TVTypeTVAuth(ret[i].TVTypeUserAuthID, ret[i].TVType, ret[i].TVPath, ret[i].TVAuth, cssp.Helper.GetLevel(ret[i].TVPath)));
                    }
                    cssp.Admin.LoadUserTVItemAuth();
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.RemoveUserTVItemAuth = function ($ajs) {
                var command = "Admin/RemoveUserTVItemAuthJSON";
                var TVItemUserAuthID = $ajs.closest("blockquote.adminTVItemsSelectedTemp").data("tvitemuserauthid");
                $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
                $.post(cssp.BaseURL + command, { TVItemUserAuthID: TVItemUserAuthID })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    cssp.Admin.LoadUser();
                });
            };
            this.RemoveUserTVTypeAuth = function ($ajs) {
                var command = "Admin/RemoveUserTVTypeAuthJSON";
                var tvType = $ajs.closest("blockquote").data("index");
                $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
                $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, TVType: tvType })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    cssp.Admin.LoadUser();
                });
            };
            this.SetDialogEvents = function ($ajs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var command = "Admin/RemoveUserJSON";
                        $("#CurrentUser").html("");
                        $("#AdminContactSearch").val("");
                        cssp.Admin.AdminContactSearchRes.clearRemoteCache();
                        $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
                        $.post(cssp.BaseURL + command, { LoginEmail: cssp.Admin.contactModel.LoginEmail })
                            .done(function (ret) {
                            if (ret.Error != "") {
                                cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess("[" + cssp.Admin.contactModel.LoginEmail + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
                            }
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(function () {
                            $("#TVTypeNamesAndPath").html("");
                        });
                    });
                });
            };
            this.SetTypeAheadSearch = function () {
                cssp.Admin.AdminContactSearchRes = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("FullName"),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: cssp.BaseURL + "Contact/ContactSearchJSON?SearchTerm=ERROR",
                        replace: function (url, query) {
                            url = cssp.BaseURL + "Contact/ContactSearchJSON?SearchTerm=" + encodeURIComponent($("#AdminContactSearch").val());
                            return url;
                        }
                    },
                });
                cssp.Admin.AdminContactSearchRes.initialize();
                $("#AdminContactSearch").off("typeahead:selected");
                $("#AdminContactSearch").typeahead(null, {
                    name: "res",
                    displayKey: "FullName",
                    source: cssp.Admin.AdminContactSearchRes.ttAdapter(),
                }).on("typeahead:selected", function (obj, datum, name) {
                    cssp.Admin.contactModel = new CSSP.ContactModel(datum.ContactTVItemID, true, "");
                    cssp.Admin.LoadUser();
                });
            };
            this.SetUserTVItemAuth = function ($ajs, TVAuth) {
                var command = "Admin/SetUserTVItemAuthJSON";
                var tvItemID1 = $ajs.closest(".adminTVItemsSelectedTemp").data("tvitemid");
                var TVItemUserAuthID = $ajs.closest(".adminTVItemsSelectedTemp").data("tvitemuserauthid");
                $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
                setTimeout(function () {
                    $.post(cssp.BaseURL + command, { TVItemUserAuthorizationID: TVItemUserAuthID, ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, TVItemID1: tvItemID1, TVAuth: TVAuth })
                        .done(function (ret) {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        cssp.Admin.LoadUser();
                    });
                }, 500);
            };
            this.SetUserTVTypeAuth = function ($ajs, TVAuth) {
                var command = "Admin/SetUserTVTypeAuthJSON";
                var tvType = $ajs.closest("blockquote").data("index");
                $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
                setTimeout(function () {
                    $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, TVType: tvType, TVAuth: TVAuth })
                        .done(function (ret) {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        cssp.Admin.LoadUser();
                    });
                }, 500);
            };
            this.TVItemAuthShowHideAdd = function ($ajs) {
                $ajs.closest("blockquote").find(".adminTVItemList").html("");
                if ($ajs.closest("blockquote").find(".jbTVItemAuthShowAdd").eq(0).hasClass("hidden")) {
                    $ajs.closest("blockquote").find(".jbTVItemAuthShowAdd").eq(0).removeClass("hidden");
                    $ajs.closest("blockquote").find(".jbTVItemAuthHideAdd").eq(0).addClass("hidden");
                }
                else {
                    $ajs.closest("blockquote").find(".jbTVItemAuthShowAdd").eq(0).addClass("hidden");
                    $ajs.closest("blockquote").find(".jbTVItemAuthHideAdd").eq(0).removeClass("hidden");
                    var $AdminTVItemList = $ajs.closest("blockquote").find(".adminTVItemList").eq(0);
                    $AdminTVItemList.html($("#AdminWorking").html());
                    var command = "Admin/_TVItemTVAuth";
                    var TVPath = $ajs.closest("blockquote").data("tvpath");
                    $.get(cssp.BaseURL + command, { TVPath: TVPath })
                        .done(function (ret) {
                        if (ret != "") {
                            $AdminTVItemList.html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        // 
                    });
                }
            };
            this.UpdateHTMLTVAuth = function () {
                for (var level = 0; level < 20; level++) {
                    for (var i = 0; i < cssp.Admin.TVTypeTVAuthCount; i++) {
                        if (cssp.Admin.TVTypeTVAuthList[i].Level == level) {
                            var $TVBlock = $("#TVTypeNamesAndPath").find("blockquote[data-tvpath='" + cssp.Admin.TVTypeTVAuthList[i].TVPath + "'], blockquote[data-tvpath^='" + cssp.Admin.TVTypeTVAuthList[i].TVPath + "p']");
                            $TVBlock.find("button.jbTVTypeAuthRemove").addClass("hidden");
                            $TVBlock.find("button.jbTVTypeAuthAdmin, button.jbTVTypeAuthDelete, button.jbTVTypeAuthCreate, button.jbTVTypeAuthEdit, button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess").removeClass("btn-success").addClass("btn-default");
                            var selector = "";
                            switch (cssp.Admin.TVTypeTVAuthList[i].TVAuth) {
                                case 6:
                                    selector = "button.jbTVTypeAuthAdmin, button.jbTVTypeAuthDelete, button.jbTVTypeAuthCreate, button.jbTVTypeAuthEdit, button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess";
                                    break;
                                case 5:
                                    selector = "button.jbTVTypeAuthDelete, button.jbTVTypeAuthCreate, button.jbTVTypeAuthEdit, button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess";
                                    break;
                                case 4:
                                    selector = "button.jbTVTypeAuthCreate, button.jbTVTypeAuthEdit, button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess";
                                    break;
                                case 3:
                                    selector = "button.jbTVTypeAuthEdit, button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess";
                                    break;
                                case 2:
                                    selector = "button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess";
                                    break;
                                case 1:
                                    selector = "button.jbTVTypeAuthNoAccess";
                                    break;
                                default:
                                    break;
                            }
                            $TVBlock.find(selector).removeClass("btn-default").addClass("btn-success");
                        }
                    }
                }
                for (var i = 0; i < cssp.Admin.TVTypeTVAuthCount; i++) {
                    $("blockquote[data-tvpath^='" + cssp.Admin.TVTypeTVAuthList[i].TVPath + "']").find("button.jbTVTypeAuthRemove").eq(0).removeClass("hidden");
                }
            };
        }
        return Admin;
    }());
    CSSP.Admin = Admin;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Admin.js.map