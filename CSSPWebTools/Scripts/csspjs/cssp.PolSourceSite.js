var CSSP;
(function (CSSP) {
    var PolSourceSite = (function () {
        // Constructors
        function PolSourceSite() {
            var _this = this;
            // Variables
            this.FormName = "#PolSourceSiteAddOrModifyForm";
            this.PolSourcePrevSelected = [];
            this.IssueOrdinal = 0;
            this.GetAllPolSourceSiteInfoUnderSubsectorForMark = function ($bjs) {
                $bjs.text("Working ... Can take a few seconds");
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "PolSource/GetAllPolSourceSiteInfoUnderSubsectorForMark";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess("Pollution Source Site Information Downloaded OK. Check under files.");
                    }
                    $bjs.text("MARK");
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    $bjs.text("MARK");
                });
            };
            // Functions
            this.PolSourceObservationAskToDelete = function ($bjs) {
                var PolObservationDateText = $bjs.closest(".PolSourceObservationTopDiv").find(".PolSourceObservationDateText").text();
                cssp.Dialog.ShowDialogAreYouSure(PolObservationDateText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSite.SetDialogEventsDeleteObservation", $bjs);
            };
            this.SetDialogEventsDeleteObservation = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var PolSourceObservationID = parseInt($bjs.data("polsourceobservationid"));
                        var command = "PolSource/PolSourceObservationDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            PolSourceObservationID: PolSourceObservationID,
                        })
                            .done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                                cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                            }
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.PolSourceObservationIssueAskToDelete = function ($bjs) {
                var PolObservationDateText = $bjs.closest(".PolSourceObservationIssueTop").find(".PolSourceObservationIssueText").text();
                cssp.Dialog.ShowDialogAreYouSure(PolObservationDateText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSite.SetDialogEventsDeleteObservationIssue", $bjs);
            };
            this.PolSourceObservationIssueMoveDown = function ($bjs) {
                var PolSourceObservationIssueID = parseInt($bjs.data("polsourceobservationissueid"));
                var command = "PolSource/PolSourceObservationIssueMoveDownJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceObservationIssueID: PolSourceObservationIssueID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                        cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceObservationIssueMoveUp = function ($bjs) {
                var PolSourceObservationIssueID = parseInt($bjs.data("polsourceobservationissueid"));
                var command = "PolSource/PolSourceObservationIssueMoveUpJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceObservationIssueID: PolSourceObservationIssueID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                        cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.SetDialogEventsDeleteObservationIssue = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var PolSourceObservationID = parseInt($bjs.data("polsourceobservationid"));
                        var PolSourceObservationIssueID = parseInt($bjs.data("polsourceobservationissueid"));
                        var command = "PolSource/PolSourceObservationIssueDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            PolSourceObservationIssueID: PolSourceObservationIssueID,
                        }).done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                                cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.FormSubmit = function ($bjs) {
                var $form = $(cssp.PolSourceSite.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.PolSourceSite.FormName, "PolSourceSiteTopDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    if (cssp.CheckInputWithNumbers()) {
                        cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                        return;
                    }
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
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
            this.FormSubmitIssue = function ($bjs) {
                var $form = $(".IssueModifyForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".IssueModifyForm", "IssueModifyDiv");
                    return;
                }
                var PolSourceObservationID = parseInt($bjs.data("polsourceobservationid"));
                var PolSourceObservationIssueID = parseInt($bjs.closest("form.IssueModifyForm").find("input[name='PolSourceObservationIssueID']").val());
                var $elem;
                $(".jbPolSourceEditIssue").each(function (ind, elem) {
                    if (parseInt($(elem).data("issueordinal")) == _this.IssueOrdinal) {
                        $elem = $(elem);
                    }
                });
                if (!$form.valid || $form.valid()) {
                    if (cssp.CheckInputWithNumbers()) {
                        cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                        return;
                    }
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                            cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, $elem);
                            cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.Init = function () {
                $(".FileEditButtons").removeClass("hidden");
                $(".FileEditButtons").find(".jbFileEditShowHide").addClass("hidden");
                $(".FileEditButtons").find(".jbFileAskToDelete").addClass("hidden");
                setTimeout(function () {
                    cssp.PolSourceSite.PolSourceSiteShowHideOnMap();
                }, 1000);
            };
            this.InitAddOrModify = function () {
                $(cssp.PolSourceSite.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            Lat: {
                                required: true,
                                number: true,
                                range: [-90, 90],
                            },
                            Lng: {
                                required: true,
                                number: true,
                                range: [-180, 180],
                            },
                        }
                    });
                });
                $(document).off("click", "input[name='IsActive']");
                $(document).on("click", "input[name='IsActive']", function (evt) {
                    $("input[name='InactiveReason']").removeAttr("checked");
                    if ($(evt.target).is(":checked")) {
                        $(".Inactive").removeClass("hidden").addClass("hidden");
                    }
                    else {
                        $(".Inactive").removeClass("hidden");
                    }
                });
                $(document).off("change", "select[name='ObsYear'], select[name='ObsMonth']");
                $(document).on("change", "select[name='ObsYear'], select[name='ObsMonth']", function (evt) {
                    var Year = parseInt($("select[name='ObsYear']").val());
                    var Month = parseInt($("select[name='ObsMonth']").val());
                    var daysInMonth = new Date(Year, Month, 0).getDate();
                    $("select[name='ObsDay']").html("");
                    var optHTMLArr = [];
                    for (var i = 1; i < daysInMonth + 1; i++) {
                        optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                    }
                    $("select[name='ObsDay']").html(optHTMLArr.join(""));
                });
            };
            this.InitIssueModify = function () {
                $(document).off("click", ".PolSourceGroupSelected input[type='radio'].polsourceinput");
                $(document).on("click", ".PolSourceGroupSelected input[type='radio'].polsourceinput", function (evt) {
                    var cls = "ElementSelected";
                    $(evt.target).closest(".polsourceinputdiv").find("label").removeClass(cls);
                    $(evt.target).parent().addClass(cls);
                    $(evt.target).closest(".polsourceinputdiv").nextAll().remove();
                    var childElemStr = $(evt.target).data("psc");
                    $(evt.target).closest(".PolSourceGroupSelected").append($(".PolSourceGroupingTop ." + childElemStr).html());
                    var hideText = $(evt.target).data("hide");
                    if (hideText.substring(hideText.length - 1) != ",") {
                        hideText = hideText + ",";
                    }
                    var hideList = hideText.split(",");
                    var nextPolSourcInputDiv = $(evt.target).closest(".polsourceinputdiv").next(".polsourceinputdiv");
                    nextPolSourcInputDiv.find("input.polsourceinput").each(function (ind, elem) {
                        $(elem).closest("div").removeClass("hidden");
                    });
                    nextPolSourcInputDiv.find("input.polsourceinput").each(function (ind, elem) {
                        for (var i = 0, count = hideList.length; i < count; i++) {
                            if (hideList[i] == $(elem).val()) {
                                $(elem).closest("div").removeClass("hidden").addClass("hidden");
                            }
                        }
                    });
                    $(".jaPopover").popover();
                });
                $(".PolSourceGroupSelected").html("");
                var ObservationInfo = $(".IssueModifyDiv").find("span.ObservationInfo").text().split(",");
                if (ObservationInfo[0].length == 0) {
                    $(".PolSourceGroupSelected").append($(".PolSourceGroupingTop").find(".c10100").html());
                }
                var _loop_1 = function (i, count) {
                    if (ObservationInfo[i].length > 0) {
                        $(".PolSourceGroupSelected").append($(".PolSourceGroupingTop").find(".c" + ObservationInfo[i].substring(0, 3) + "00").html());
                        var cls_1 = "ElementSelected";
                        $(".PolSourceGroupSelected").find("input[name='c" + ObservationInfo[i].substring(0, 3) + "00']").each(function (ind, elem) {
                            $(elem).find("input[name='c" + ObservationInfo[i] + "']").parent().addClass(cls_1);
                            if ($(elem).val() == ObservationInfo[i]) {
                                $(elem).parent().addClass(cls_1);
                            }
                        });
                    }
                };
                for (var i = 0, count = ObservationInfo.length; i < count; i++) {
                    _loop_1(i, count);
                }
                $("label.ElementSelected").each(function (ind, elem) {
                    var input$ = $(elem).find("input.polsourceinput");
                    var hideText = input$.data("hide");
                    if (hideText.substring(hideText.length - 1) != ",") {
                        hideText = hideText + ",";
                    }
                    var hideList = hideText.split(",");
                    var nextPolSourcInputDiv = input$.closest(".polsourceinputdiv").next(".polsourceinputdiv");
                    nextPolSourcInputDiv.find("input.polsourceinput").each(function (ind, elem) {
                        $(elem).closest("div").removeClass("hidden");
                    });
                    nextPolSourcInputDiv.find("input.polsourceinput").each(function (ind, elem) {
                        for (var i = 0, count = hideList.length; i < count; i++) {
                            if (hideList[i] == $(elem).val()) {
                                $(elem).closest("div").removeClass("hidden").addClass("hidden");
                            }
                        }
                    });
                });
            };
            this.InitIssueList = function () {
                // nothing for now
            };
            this.PolSourceAddIssue = function ($bjs) {
                var PolSourceObservationID = parseInt($bjs.data("polsourceobservationid"));
                _this.IssueOrdinal = parseInt($bjs.data("issueordinal")) + 1;
                var command = "PolSource/PolSourceIssueAddJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceObservationID: PolSourceObservationID,
                    NextIssueOrdinal: _this.IssueOrdinal,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                        cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceEditIssue = function ($bjs) {
                if ($bjs) {
                    var PolSourceObservationID = parseInt($bjs.data("polsourceobservationid"));
                    _this.IssueOrdinal = parseInt($bjs.data("issueordinal"));
                    cssp.PolSourceSite.PolSourceIssueListReload(PolSourceObservationID, _this.IssueOrdinal);
                }
            };
            this.PolSourceSaveIssue = function ($bjs) {
                var PolSourceObservationID = parseInt($bjs.data("polsourceobservationid"));
                var PolSourceObservationIssueID = parseInt($bjs.data("polsourceobservationissueid"));
                var $elem;
                $(".jbPolSourceEditIssue").each(function (ind, elem) {
                    if (parseInt($(elem).data("issueordinal")) == _this.IssueOrdinal) {
                        $elem = $(elem);
                    }
                });
                var command = "PolSource/PolSourceIssueDeleteJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceObservationID: PolSourceObservationIssueID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                        cssp.PolSourceSite.PolSourceEditIssue($elem);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceIssueListReload = function (PolSourceObservationID, IssueOrdinal) {
                var command = "PolSource/_polSourceIssueList";
                $.get(cssp.BaseURL + command, {
                    PolSourceObservationID: PolSourceObservationID,
                    IssueOrdinal: IssueOrdinal,
                }).done(function (ret) {
                    if (ret) {
                        $(".PolSourceIssueListTopDiv").html(ret);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceObservationChangeDate = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $("#PolSourceObservationAddOrModifyForm").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $("#PolSourceObservationAddOrModifyForm").removeClass("hidden").addClass("hidden");
                }
            };
            this.PolSourceObservationCopy = function ($bjs) {
                var PolSourceObservationID = parseInt($bjs.data("polsourceobservationid"));
                var IssueOrdinal = 0;
                $(".PolSourceIssueListTopDiv").find(".jbPolSourceEditIssue").each(function (ind, elem) {
                    if ($(elem).hasClass("btn-success")) {
                        IssueOrdinal = parseInt($(elem).data("issueordinal"));
                    }
                });
                var command = "PolSource/PolSourceObservationCopyJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceObservationID: PolSourceObservationID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                        cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varCopied"));
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceObservationListReload = function (PolSourceSiteTVItemID, $elem) {
                var command = "PolSource/_polSourceObservationList";
                $(".PolSourceSiteTopDiv").find(".PolSourceObservationListDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                $.get(cssp.BaseURL + command, {
                    PolSourceSiteTVItemID: PolSourceSiteTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        $("#PolSourceSiteDiv").html(ret);
                        try {
                            cssp.PolSourceSite.PolSourceEditIssue($elem);
                        }
                        catch (e) {
                            // nothing
                        }
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceObservationEditSave = function ($bjs) {
                var $form = $("#PolSourceObservationAddOrModifyForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#PolSourceObservationAddOrModifyForm", "PolSourceObservationTopDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    if (cssp.CheckInputWithNumbers()) {
                        cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                        return;
                    }
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                            cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.PolSourceSiteShowHideOnMap = function () {
                if ($(".jbPolSourceSiteShowHideOnMap").hasClass("btn-default")) {
                    var TVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    if (TVItemID != 0) {
                        cssp.GoogleMap.DrawCross(TVItemID);
                        $(".jbPolSourceSiteShowHideOnMap").removeClass("btn-default").addClass("btn-success");
                    }
                }
                else {
                    cssp.GoogleMap.DrawCross(-1);
                    $(".jbPolSourceSiteShowHideOnMap").removeClass("btn-success").addClass("btn-default");
                }
            };
            this.PolSourceSiteActiveOnly = function ($bjs) {
                cssp.Dialog.ShowDialogMessage("Not Implemented yet");
            };
            this.PolSourceSiteAddCancel = function ($bjs) {
                $(".jbPolSourceSiteAddShowHide").trigger("click");
            };
            this.PolSourceSiteModifyCancel = function ($bjs) {
                $bjs.closest("li").find(".jbPolSourceSiteModifyShowHide").trigger("click");
                $(".jbPolSourceSiteEdit").trigger("click");
            };
            this.PolSourceSiteAddOrModifyShowHide = function ($bjs) {
                var ParentTVItemID = 0;
                var PolSourceSiteTVItemID = 0;
                var ShouldOpen = $bjs.hasClass("btn-default");
                var $tabContent = $bjs.closest(".tab-content");
                $tabContent.find(".TVItemAdd").html("");
                $tabContent.find(".TVItemModify").html("");
                $(".jbPolSourceSiteAddShowHide").removeClass("btn-success").addClass("btn-default");
                $(".jbPolSourceSiteModifyShowHide").removeClass("btn-success").addClass("btn-default");
                var $TVItemEdit = $tabContent.find(".TVItemAdd");
                var $ViewDiv = $bjs.closest("#ViewDiv");
                if ($ViewDiv)
                    ParentTVItemID = $ViewDiv.data("tvitemid");
                var $ParentLi = $bjs.closest("li");
                if (!$bjs.hasClass("jbPolSourceSiteAddShowHide")) {
                    if ($ParentLi.length > 0) {
                        PolSourceSiteTVItemID = parseInt($ParentLi.data("tvitemid"));
                        $TVItemEdit = $ParentLi.find(".TVItemModify");
                    }
                }
                if (ShouldOpen) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var command = "PolSource/_polSourceSiteAddOrModify";
                    $TVItemEdit.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    $.get(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                        PolSourceSiteTVItemID: PolSourceSiteTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $TVItemEdit.html(ret);
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
                    $TVItemEdit.html("");
                }
            };
            this.PolSourceSiteEdit = function ($bjs) {
                var ParentTVItemID = 0;
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var PolSourceSiteTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    cssp.Helper.PageRefresh();
                }
            };
            this.PolSourceSiteToggleActive = function ($bjs) {
                var TVItemID = parseInt($bjs.data("tvitemid"));
                var IsActiveTxt = $bjs.data("isactive");
                var IsNotActiveTxt = $bjs.data("isnotactive");
                var WorkingTxt = $bjs.data("working");
                var bjsText = $bjs.text().trim();
                var SetActive = false;
                if (bjsText === IsActiveTxt) {
                    SetActive = true;
                }
                $bjs.text(WorkingTxt);
                var command = "PolSource/PolSourceSiteSetActiveJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                    SetActive: (SetActive === true ? false : true),
                }).done(function (ret) {
                    if (ret === "") {
                        if (SetActive === true) {
                            $bjs.text(IsNotActiveTxt);
                            $bjs.removeClass("btn-success").addClass("btn-default");
                            $bjs.closest("li.TVItem").find("span.TVText").addClass("text-strikeThrough");
                        }
                        else {
                            $bjs.text(IsActiveTxt);
                            $bjs.removeClass("btn-default").addClass("btn-success");
                            $bjs.closest("li.TVItem").find("span.TVText").removeClass("text-strikeThrough");
                        }
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceShowHideOnMap = function () {
                if (cssp.GoogleMap.CrossVisible) {
                    cssp.GoogleMap.DrawObjects();
                    $(".jbPolSourceSiteShowHideOnMap").removeClass("btn-success").addClass("btn-default");
                }
                else {
                    var TVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    if (TVItemID != 0) {
                        cssp.GoogleMap.DrawCross(TVItemID);
                        $(".jbPolSourceSiteShowHideOnMap").removeClass("btn-default").addClass("btn-success");
                    }
                }
            };
            this.ShowHideEditButtons = function ($bjs) {
                var $tabContent = $bjs.closest(".tab-content");
                $tabContent.find(".jbPolSourceSiteAddShowHide").removeClass("btn-success").addClass("btn-default");
                if ($bjs.hasClass("btn-default")) {
                    $tabContent.find(".jbPolSourceSiteShowHideEditButtons").removeClass("btn-default").addClass("btn-success");
                    $tabContent.find(".jbPolSourceSiteAddShowHide").removeClass("hidden");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden");
                    cssp.View.ShowMoveTVItemButton($bjs);
                }
                else {
                    $tabContent.find(".jbPolSourceSiteShowHideEditButtons").removeClass("btn-success").addClass("btn-default");
                    $tabContent.find(".jbPolSourceSiteAddShowHide").removeClass("hidden").addClass("hidden");
                    $tabContent.find(".TVItemEditButtons").removeClass("hidden").addClass("hidden");
                    cssp.TVItem.EditCancel($bjs);
                    cssp.View.HideMoveTVItemButton($bjs);
                }
            };
        }
        return PolSourceSite;
    }());
    CSSP.PolSourceSite = PolSourceSite;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.PolSourceSite.js.map