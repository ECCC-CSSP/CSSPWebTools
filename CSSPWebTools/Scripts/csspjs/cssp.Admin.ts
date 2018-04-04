module CSSP {
    export class Admin {
        // Variables
        public contactModel: CSSP.ContactModel;
        public AdminContactSearchRes: Bloodhound<ContactSearchModel>;
        public TVTypeNamesAndTVPathList: Array<TVTypeNamesAndTVPath> = [];
        public TVTypeNamesAndTVPathCount: number = 0;
        public TVTypeNameHTML: string = "";
        public TVItemTVAuthList: Array<TVItemTVAuth> = [];
        public TVItemTVAuthCount: number;
        public TVTypeTVAuthList: Array<TVTypeTVAuth> = [];
        public TVTypeTVAuthCount: number;
        public BlockquoteTVTypeTemplate: string;
        public BlockquoteTVItemTemplate: string;
        public AddTVItemTemplate: string;

        // Constructor
        constructor() {
        }

        // Function

        public AskToRemoveUser: Function = ($ajs: JQuery): void => {
            cssp.Dialog.ShowDialogAreYouSure(cssp.Admin.contactModel.LoginEmail);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.Admin.SetDialogEvents", $ajs);
        };
        public ContactDisabledToggle: Function = (): void => {
            var command: string = "Admin/ContactDisabledToggleJSON";
            $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID })
                .done((ret) => {
                    if (ret.Error) {
                        cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                    }
                    else {
                        cssp.Admin.LoadUser(cssp.Admin.contactModel.ContactTVItemID);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public CreateChildTVTypeLoop: Function = (ParentTVTypeAndTVPath: CSSP.TVTypeNamesAndTVPath, $ParentBlockquote: JQuery): void => {
            for (var j = 0; j < cssp.Admin.TVTypeNamesAndTVPathCount; j++) {
                var ChildTVType = cssp.Admin.TVTypeNamesAndTVPathList[j];
                if (ChildTVType.ParentIndex == ParentTVTypeAndTVPath.Index) {
                    $ParentBlockquote.append(cssp.Admin.BlockquoteTVTypeTemplate);
                    var $Blockquote: JQuery = $ParentBlockquote.find("blockquote").last();
                    $Blockquote.attr("data-tvtypename", ChildTVType.TVTypeName);
                    $Blockquote.attr("data-index", ChildTVType.Index);
                    $Blockquote.attr("data-tvpath", ChildTVType.TVPath);
                    $Blockquote.find("span").eq(0).text(ChildTVType.TVTypeName);
                    $Blockquote.find(".adminTVItemsSelected").html("");
                    cssp.Admin.CreateChildTVTypeLoop(ChildTVType, $Blockquote);
                }
            }
        };
        public CreateTVItem: Function = (): void => {
            for (var i = 0, count = cssp.Admin.TVItemTVAuthList.length; i < count; i++) {
                $(".adminBlock[data-tvtypename='" + cssp.Admin.TVItemTVAuthList[i].TVTypeStr + "']").find(".adminTVItemsSelected").eq(0).append(this.BlockquoteTVItemTemplate);
                var $TVItem = $(".adminBlock[data-tvtypename='" + cssp.Admin.TVItemTVAuthList[i].TVTypeStr + "']").children(".adminTVItems").eq(0).find(".adminTVItemsSelectedTemp").last();
                $TVItem.find("span").eq(0).text(cssp.Admin.TVItemTVAuthList[i].TVText);
                $TVItem.attr("data-tvitemid", cssp.Admin.TVItemTVAuthList[i].TVItemID1);
                $TVItem.attr("data-tvitemuserauthid", cssp.Admin.TVItemTVAuthList[i].TVItemUserAuthID);
                $TVItem.find("button.jbTVTypeAuthAdmin, button.jbTVTypeAuthDelete, button.jbTVTypeAuthCreate, button.jbTVTypeAuthEdit, button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess").removeClass("btn-success").addClass("btn-default");
                var selector: string = "";
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
        public GenerateTVTypeHTML: Function = (): void => {
            var RootTVType: CSSP.TVTypeNamesAndTVPath = cssp.Admin.TVTypeNamesAndTVPathList[0];
            var $TVType: JQuery = $("#TVTypeNamesAndPath");
            $TVType.html("").append(cssp.Admin.BlockquoteTVTypeTemplate);
            var $Blockquote: JQuery = $("#TVTypeNamesAndPath blockquote").eq(0);
            $Blockquote.attr("data-tvtypename", RootTVType.TVTypeName);
            $Blockquote.attr("data-index", RootTVType.Index);
            $Blockquote.attr("data-tvpath", RootTVType.TVPath);
            $Blockquote.find("span").eq(0).text(RootTVType.TVTypeName);
            cssp.Admin.CreateChildTVTypeLoop(RootTVType, $Blockquote);
            cssp.Admin.UpdateHTMLTVAuth();
            cssp.Admin.CreateTVItem();
            $(".jbTVTypeAuthRemove").eq(1).removeClass("hidden").addClass("hidden");
        };
        public Init: Function = (): void => {
            cssp.Admin.BlockquoteTVTypeTemplate = $("#AdminAuthTVTypeTemp").html();
            cssp.Admin.BlockquoteTVItemTemplate = $("#AdminAuthTVItemTemp").html();
            cssp.Admin.SetTypeAheadSearch();
            cssp.Admin.LoadTVTypeNamesAndPathList();

            $(document).off("change", ".AdminTVItemSelect");
            $(document).on("change", ".AdminTVItemSelect", (evt: Event) => {
                var $select: JQuery = $(evt.target);
                var $selectNext: JQuery = $(evt.target).next("select");
                if ($selectNext.length > 0) {
                    var TVPathNext: string = $selectNext.data("tvpath");
                    var ParentTVItemID: number = parseInt($select.val());
                    var command: string = "Admin/_TVItemTVAuthSelect";
                    $.get(cssp.BaseURL + command, { ParentTVItemID: ParentTVItemID, TVPathNext: TVPathNext })
                        .done((ret) => {
                            $selectNext.replaceWith(ret);
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(() => {
                            // nothing
                        });
                }
                else {
                    var TVItemID1: number = parseInt($select.val());
                    var command: string = "Admin/SetUserTVItemAuthJSON";
                    setTimeout(() => {
                        $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, TVItemID1: TVItemID1, TVAuth: TVAuthEnum.NoAccess })
                            .done((ret) => {
                                if (ret.Error != "") {
                                    cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                                }
                            })
                            .fail(() => {
                                cssp.Dialog.ShowDialogErrorWithFail(command);
                            }).always(() => {
                                cssp.Admin.LoadUser();
                            });
                    }, 500);
                }
            });

            if ($("#AdminContactSearch")) {
                $("#AdminContactSearch").placeholder();
            }

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public InitUser: Function = (ContactTVItemID: number, Disabled: boolean, LoginEmail: string): void => {
            this.contactModel = new CSSP.ContactModel(ContactTVItemID, Disabled, LoginEmail);

            $(document).off("click", "input.province");
            $(document).on("click", "input.province", (evt: Event) => {
                $(evt.target).closest(".ProvinceDiv").find("input.province").attr("disabled", "disabled");
                var command: string = "Admin/SetRemoveProvinceJSON";
                if ($(evt.target).is(":checked")) {
                    command = "Admin/SetAddProvinceJSON";
                }
                var ProvinceTVItemID: number = parseInt($(evt.target).val());
                $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, ProvinceTVItemID: ProvinceTVItemID })
                    .done((ret: string) => {
                        if (ret.length > 0) {
                            cssp.Dialog.ShowDialogErrorWithFail(ret);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        $(evt.target).closest(".ProvinceDiv").find("input.province").removeAttr("disabled");
                    });
            });

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public LoadTVTypeNamesAndPathList: Function = (): void => {
            var command: string = "Admin/GetTVTypeNameAndPathListJSON";
            cssp.Admin.TVTypeNamesAndTVPathList = [];
            $.post(cssp.BaseURL + command)
                .done((ret: Array<TVTypeNamesAndTVPath>) => {
                    cssp.Admin.TVTypeNamesAndTVPathCount = ret.length;
                    for (var i = 0; i < cssp.Admin.TVTypeNamesAndTVPathCount; i++) {
                        cssp.Admin.TVTypeNamesAndTVPathList.push(new TVTypeNamesAndTVPath(ret[i].TVTypeName, ret[i].Index, ret[i].TVPath, cssp.Helper.GetParentID(ret[i].TVPath)));
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public LoadUser: Function = (): void => {
            var command: string = "Admin/_User";
            $.get(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID })
                .done((ret) => {
                    $("#CurrentUser").html(ret);
                    cssp.Admin.LoadUserTVTypeAuth();
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public LoadUserTVItemAuth: Function = (): void => {
            var command: string = "Admin/GetUserTVItemAuthJSON";
            cssp.Admin.TVItemTVAuthList = [];
            cssp.Admin.TVTypeNameHTML = "";
            $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID })
                .done((ret: Array<TVItemTVAuth>) => {
                    cssp.Admin.TVItemTVAuthCount = ret.length;
                    for (var i = 0; i < cssp.Admin.TVItemTVAuthCount; i++) {
                        cssp.Admin.TVItemTVAuthList.push(new TVItemTVAuth(ret[i].TVItemUserAuthID, ret[i].TVText, ret[i].TVItemID1, ret[i].TVTypeStr, ret[i].TVAuth));
                    }
                    cssp.Admin.GenerateTVTypeHTML();
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public LoadUserTVTypeAuth: Function = (): void => {
            var command: string = "Admin/GetUserTVTypeAuthJSON";
            cssp.Admin.TVTypeTVAuthList = [];
            cssp.Admin.TVTypeNameHTML = "";
            $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID })
                .done((ret: Array<TVTypeTVAuth>) => {
                    cssp.Admin.TVTypeTVAuthCount = ret.length;
                    for (var i = 0; i < cssp.Admin.TVTypeTVAuthCount; i++) {
                        cssp.Admin.TVTypeTVAuthList.push(new TVTypeTVAuth(ret[i].TVTypeUserAuthID, ret[i].TVType, ret[i].TVPath, ret[i].TVAuth, cssp.Helper.GetLevel(ret[i].TVPath)));
                    }
                    cssp.Admin.LoadUserTVItemAuth();
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public RemoveUserTVItemAuth: Function = ($ajs: JQuery): void => {

            var command: string = "Admin/RemoveUserTVItemAuthJSON";
            var TVItemUserAuthID: number = $ajs.closest("blockquote.adminTVItemsSelectedTemp").data("tvitemuserauthid");
            $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
            $.post(cssp.BaseURL + command, { TVItemUserAuthID: TVItemUserAuthID })
                .done((ret: string) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    cssp.Admin.LoadUser();
                });
        };
        public RemoveUserTVTypeAuth: Function = ($ajs: JQuery): void => {
            var command: string = "Admin/RemoveUserTVTypeAuthJSON";
            var tvType: number = $ajs.closest("blockquote").data("index");
            $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
            $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, TVType: tvType })
                .done((ret: string) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    cssp.Admin.LoadUser();
                });
        };
        public SetDialogEvents: Function = ($ajs: JQuery) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var command: string = "Admin/RemoveUserJSON";
                    $("#CurrentUser").html("");
                    $("#AdminContactSearch").val("");
                    cssp.Admin.AdminContactSearchRes.clearRemoteCache();
                    $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
                    $.post(cssp.BaseURL + command, { LoginEmail: cssp.Admin.contactModel.LoginEmail })
                        .done((ret) => {
                            if (ret.Error != "") {
                                cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess("[" + cssp.Admin.contactModel.LoginEmail + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
                            }
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(() => {
                            $("#TVTypeNamesAndPath").html("");

                        });
                });
            });
        };
        public SetTypeAheadSearch: Function = (): void => {
            cssp.Admin.AdminContactSearchRes = new Bloodhound<ContactSearchModel>(
                {
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
        public SetUserTVItemAuth: Function = ($ajs: JQuery, TVAuth: number): void => {
            var command: string = "Admin/SetUserTVItemAuthJSON";
            var tvItemID1: number = $ajs.closest(".adminTVItemsSelectedTemp").data("tvitemid");
            var TVItemUserAuthID: number = $ajs.closest(".adminTVItemsSelectedTemp").data("tvitemuserauthid");
            $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
            setTimeout(() => {
                $.post(cssp.BaseURL + command, { TVItemUserAuthorizationID: TVItemUserAuthID, ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, TVItemID1: tvItemID1, TVAuth: TVAuth })
                    .done((ret) => {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        cssp.Admin.LoadUser();
                    });
            }, 500);
        };
        public SetUserTVTypeAuth: Function = ($ajs: JQuery, TVAuth: number): void => {
            var command: string = "Admin/SetUserTVTypeAuthJSON";
            var tvType: number = $ajs.closest("blockquote").data("index");
            $("#TVTypeNamesAndPath").html($("#AdminWorking").html());
            setTimeout(() => {
                $.post(cssp.BaseURL + command, { ContactTVItemID: cssp.Admin.contactModel.ContactTVItemID, TVType: tvType, TVAuth: TVAuth })
                    .done((ret) => {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        cssp.Admin.LoadUser();
                    });
            }, 500);
        };
        public TVItemAuthShowHideAdd: Function = ($ajs: JQuery): void => {
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
                var command: string = "Admin/_TVItemTVAuth";
                var TVPath: string = $ajs.closest("blockquote").data("tvpath");
                $.get(cssp.BaseURL + command, { TVPath: TVPath })
                    .done((ret: string) => {
                        if (ret != "") {
                            $AdminTVItemList.html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        // 
                    });
            }
        };
        public UpdateHTMLTVAuth: Function = () => {
            for (var level = 0; level < 20; level++) {
                for (var i = 0; i < cssp.Admin.TVTypeTVAuthCount; i++) {
                    if (cssp.Admin.TVTypeTVAuthList[i].Level == level) {
                        var $TVBlock: JQuery = $("#TVTypeNamesAndPath").find("blockquote[data-tvpath='" + cssp.Admin.TVTypeTVAuthList[i].TVPath + "'], blockquote[data-tvpath^='" + cssp.Admin.TVTypeTVAuthList[i].TVPath + "p']");
                        $TVBlock.find("button.jbTVTypeAuthRemove").addClass("hidden");
                        $TVBlock.find("button.jbTVTypeAuthAdmin, button.jbTVTypeAuthDelete, button.jbTVTypeAuthCreate, button.jbTVTypeAuthEdit, button.jbTVTypeAuthRead, button.jbTVTypeAuthNoAccess").removeClass("btn-success").addClass("btn-default");
                        var selector: string = "";
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
}