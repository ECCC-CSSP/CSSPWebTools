var CSSP;
(function (CSSP) {
    var SamplingPlan = (function () {
        // Constructor
        function SamplingPlan() {
            // Variables
            this.mapItems = [];
            // Functions
            this.FormSubmitTopInfo = function ($bjs) {
                var $form = $("#SamplingPlanEditForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#SamplingPlanEditForm", "SamplingPlanModify");
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
            this.FormSubmitSubsector = function ($bjs) {
                $bjs.find(".SamplingPlanMWQMSiteSave").text("Working...");
                var $form = $bjs.closest(".SamplingPlanSubsectorEditForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".SamplingPlanSubsectorEditForm", "SamplingPlanSubsectorTop");
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
                            $bjs.find(".SamplingPlanMWQMSiteSave").text("Saved");
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.Init = function () {
                $(document).off("click", "input.province");
                $(document).on("click", "input.province", function (evt) {
                    var cls = "ElementSelected";
                    $(evt.target).closest(".provinceall").find("label").removeClass(cls);
                    $(evt.target).parent().addClass(cls);
                    var $SamplingPlanByProvince = $(evt.target).closest(".SamplingPlanTop").find(".SamplingPlanByProvince");
                    $SamplingPlanByProvince.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var ProvinceTVItemID = parseInt($(evt.target).val());
                    var command = "SamplingPlan/_SamplingPlanByProvince";
                    $.get(cssp.BaseURL + command, { ProvinceTVItemID: ProvinceTVItemID })
                        .done(function (ret) {
                        $SamplingPlanByProvince.html(ret);
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        // nothing
                    });
                });
                $(document).off("keyup", "input[name='ForGroupName'], input[name='Year']");
                $(document).on("keyup", "input[name='ForGroupName'], input[name='Year']", function (evt) {
                    cssp.SamplingPlan.ChangeSamplingPlanName();
                });
                $(document).off("change", "select[name='SamplingPlanType']");
                $(document).on("change", "select[name='SamplingPlanType']", function (evt) {
                    var SelectText = $("select[name='SamplingPlanType']").find(":checked").text().trim();
                    if (SelectText != "Subsector") {
                        cssp.Dialog.ShowDialogMessage(SelectText + " sampling plan type is not implemented yet.");
                    }
                    else {
                        cssp.SamplingPlan.ChangeSamplingPlanName();
                    }
                });
                $(document).off("change", "select[name='SampleType']");
                $(document).on("change", "select[name='SampleType']", function (evt) {
                    var SelectText = $("select[name='SampleType']").find(":checked").text().trim();
                    var SelectVal = $("select[name='SampleType']").find(":checked").val().trim();
                    if (SelectVal == "109" // Routine
                        || SelectVal == "105" //Rain CMP Routine
                        || SelectVal == "106" // Rain run
                        || SelectVal == "107" // Reopening emergency rain
                        || SelectVal == "108" // Reopening spill
                        || SelectVal == "111" // Study
                    ) {
                        cssp.SamplingPlan.ChangeSamplingPlanName();
                    }
                    else {
                        cssp.Dialog.ShowDialogMessage(SelectText + " sample type is not implemented yet.");
                    }
                });
                $(document).off("change", "select[name='LabSheetType']");
                $(document).on("change", "select[name='LabSheetType']", function (evt) {
                    var SelectText = $("select[name='LabSheetType']").find(":checked").text().trim();
                    if (SelectText != "A1") {
                        cssp.Dialog.ShowDialogMessage(SelectText + " lab sheet type is not implemented yet.");
                    }
                    else {
                        cssp.SamplingPlan.ChangeSamplingPlanName();
                    }
                });
                $(document).off("click", "input.mwqmsite");
                $(document).on("click", "input.mwqmsite", function (evt) {
                    var cls = "ElementSelected";
                    var $Item = $(evt.target);
                    if ($Item.is(":checked")) {
                        $Item.parent().addClass(cls);
                        $Item.closest(".mwqmsiteall").find(".mwqmsiteduplicate").append("<option value='" + $Item.val() + "'>Site " + $Item.parent().text() + "</option>");
                    }
                    else {
                        $Item.parent().removeClass(cls);
                        var $ElemToDelete = null;
                        $Item.closest(".mwqmsiteall").find(".mwqmsiteduplicate").children().each(function (ind, elem) {
                            if ($(elem).val() == $Item.val()) {
                                $ElemToDelete = $(elem);
                            }
                        });
                        $ElemToDelete.remove();
                    }
                    cssp.SamplingPlan.ResetCountMWQMSiteSelected($Item);
                    cssp.SamplingPlan.SamplingPlanArrangeMapItems($(evt.target));
                });
                $(document).off("change", "input[name='IncludeLaboratoryQAQC']");
                $(document).on("change", "input[name='IncludeLaboratoryQAQC']", function (evt) {
                    if ($("input[name='IncludeLaboratoryQAQC']").is(":checked")) {
                        $(".IncludeLaboratoryQAQCInfoDiv").removeClass("hidden");
                    }
                    else {
                        $(".IncludeLaboratoryQAQCInfoDiv").removeClass("hidden").addClass("hidden");
                    }
                });
                $("#SamplingPlanEditForm").each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            ParentTVItemID: {
                                required: true,
                            },
                            SamplingPlanID: {
                                required: true,
                            },
                            SamplingPlanName: {
                                required: true,
                                minlength: 3,
                                maxlength: 100,
                            },
                            ForGroupName: {
                                required: true,
                                minlength: 3,
                                maxlength: 100,
                            },
                            Year: {
                                required: true,
                                minlength: 4,
                                maxlength: 4,
                            },
                            AccessCode: {
                                required: true,
                                minlength: 3,
                                maxlength: 10,
                            },
                            DuplicatePrecisionCriteria: {
                                required: true,
                                min: 0,
                                max: 1,
                            },
                        }
                    });
                });
                $(".mwqmsitecount").each(function (ind, elem) {
                    if ($(elem).text() != "0") {
                        $(elem).closest(".jbSamplingPlanShowMWQMSites").trigger("click");
                    }
                });
                window.setTimeout(function () {
                    $(".jbSamplingPlanEditSave").removeClass("hidden");
                }, 5000);
            };
            this.InitNoPermission = function () {
                $(".jbSamplingPlanEditShowHide").removeClass("hidden").addClass("hidden");
            };
            this.SamplingPlanAdd = function ($bjs) {
                var ShouldLoad = $bjs.hasClass("btn-default");
                $(".SamplingPlanModify").html("");
                $(".SamplingPlanAdd").html("");
                $(".jbSamplingPlanEdit").removeClass("btn-success").addClass("btn-default");
                $(".jbSamplingPlanAdd").removeClass("btn-success").addClass("btn-default");
                var $SamplingPlanAdd = $bjs.closest("#ViewDiv").find(".SamplingPlanAdd");
                if (ShouldLoad) {
                    $(".SamplingPlanModify").html("");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $SamplingPlanAdd.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var SamplingPlanID = 0;
                    var ProvinceTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                    var command = "SamplingPlan/_SamplingPlanAddOrModify";
                    $.get(cssp.BaseURL + command, { ProvinceTVItemID: ProvinceTVItemID, SamplingPlanID: SamplingPlanID })
                        .done(function (ret) {
                        $SamplingPlanAdd.html(ret);
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        // nothing
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $SamplingPlanAdd.html("");
                }
            };
            this.SamplingPlanArrangeMapItems = function ($bjs) {
                var $allSubsectorMWQMSite = $bjs.closest(".subsectortop").find(".mwqmsiteall");
                for (var i = 0, count = cssp.SamplingPlan.mapItems.length; i < count; i++) {
                    $allSubsectorMWQMSite.find(".mwqmsite").each(function (ind, elem) {
                        if (cssp.SamplingPlan.mapItems[i].TVItemID == parseInt($(elem).val())) {
                            cssp.SamplingPlan.mapItems[i].TVText = $(elem).next().text();
                            if ($(elem).parent().hasClass("ElementSelected")) {
                                cssp.SamplingPlan.mapItems[i].SubTVType = CSSP.TVTypeEnum.Passed;
                            }
                            else {
                                cssp.SamplingPlan.mapItems[i].SubTVType = CSSP.TVTypeEnum.Failed;
                            }
                        }
                    });
                }
                cssp.GoogleMap.TVItemObjects = [];
                cssp.GoogleMap.FillTVItemObjects(cssp.SamplingPlan.mapItems, false);
            };
            this.SamplingPlanCopy = function ($bjs) {
                var SamplingPlanID = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
                var command = "SamplingPlan/SamplingPlanCopyJSON";
                $.post(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithFail(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.SamplingPlanEmailAddOrModify = function ($bjs) {
                var SamplingPlanID = parseInt($bjs.data("samplingplanid"));
                var SamplingPlanEmailID = parseInt($bjs.data("samplingplanemailid"));
                var tr$ = $bjs.closest("tr");
                var Email = $bjs.closest("tr").find("input[name='Email']").val();
                var IsContractor = $bjs.closest("tr").find("input[name='IsContractor']").is(":checked") ? true : false;
                var LabSheetHasValueOver500 = $bjs.closest("tr").find("input[name='LabSheetHasValueOver500']").is(":checked") ? true : false;
                var LabSheetReceived = $bjs.closest("tr").find("input[name='LabSheetReceived']").is(":checked") ? true : false;
                var LabSheetAccepted = $bjs.closest("tr").find("input[name='LabSheetAccepted']").is(":checked") ? true : false;
                var LabSheetRejected = $bjs.closest("tr").find("input[name='LabSheetRejected']").is(":checked") ? true : false;
                var FridayReminderAt14h = $bjs.closest("tr").find("input[name='FridayReminderAt14h']").is(":checked") ? true : false;
                var command = "SamplingPlan/SamplingPlanEmailAddOrModifyJSON";
                $.post(cssp.BaseURL + command, {
                    SamplingPlanID: SamplingPlanID,
                    SamplingPlanEmailID: SamplingPlanEmailID,
                    Email: Email,
                    IsContractor: IsContractor,
                    LabSheetHasValueOver500: LabSheetHasValueOver500,
                    LabSheetReceived: LabSheetReceived,
                    LabSheetAccepted: LabSheetAccepted,
                    LabSheetRejected: LabSheetRejected,
                    FridayReminderAt14h: FridayReminderAt14h,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.SamplingPlanGenerateSamplingPlan = function ($bjs) {
                var SamplingPlanID = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
                var command = "SamplingPlan/SamplingPlanGenerateSamplingPlanJSON";
                $.post(cssp.BaseURL + command, {
                    SamplingPlanID: SamplingPlanID
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithFail(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.SamplingPlanAskToDelete = function ($bjs) {
                var SamplingPlanName = $bjs.closest(".SamplingPlanTitlePanel").find(".SamplingPlanName").text();
                cssp.Dialog.ShowDialogAreYouSure(SamplingPlanName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.SamplingPlan.SetDialogEvents", $bjs);
            };
            this.SetDialogEvents = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var SamplingPlanID = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
                        var command = "SamplingPlan/SamplingPlanDeleteJSON";
                        $.post(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID })
                            .done(function (ret) {
                            if (ret.length > 0) {
                                cssp.Dialog.ShowDialogErrorWithFail(ret);
                            }
                            else {
                                cssp.Helper.PageRefresh();
                            }
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(function () {
                            // nothing
                        });
                    });
                });
            };
            this.SamplingPlanEmailAskToDelete = function ($bjs) {
                var SamplingPlanEmailName = $bjs.closest("tr").find("input[name='Email']").val();
                cssp.Dialog.ShowDialogAreYouSure(SamplingPlanEmailName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.SamplingPlanEmail.SetDialogEvents", $bjs);
            };
            this.SetDialogEventsEmail = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var SamplingPlanEmailID = parseInt($bjs.data("samplingplanemailid"));
                        var tr$ = $bjs.closest("tr");
                        var command = "SamplingPlan/SamplingPlanEmailDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            SamplingPlanEmailID: SamplingPlanEmailID,
                        }).done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogError(ret);
                            }
                            else {
                                tr$.remove();
                                cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(function () {
                            // nothing
                        });
                    });
                });
            };
            this.SamplingPlanAskToDeleteFile = function ($bjs) {
                var SamplingPlanID = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
                var command = "SamplingPlan/SamplingPlanDeleteFileJSON";
                $.post(cssp.BaseURL + command, {
                    SamplingPlanID: SamplingPlanID
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithFail(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    // nothing
                });
            };
            this.SamplingPlanEdit = function ($bjs) {
                //if ($("a.GlobeIcon").hasClass("btn-default")) {
                //    cssp.Dialog.ShowDialogMessage("Please click the globe icon to show the map");
                //    return;
                //}
                var ShouldLoad = $bjs.hasClass("btn-default");
                $(".SamplingPlanModify").html("");
                $(".SamplingPlanAdd").html("");
                $(".jbSamplingPlanEdit").removeClass("btn-success").addClass("btn-default");
                $(".jbSamplingPlanAdd").removeClass("btn-success").addClass("btn-default");
                if (ShouldLoad) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".SamplingPlanExisting").find(".SamplingPlanModify").html("");
                    var $SamplingPlanEdit = $bjs.closest(".SamplingPlanItem").find(".SamplingPlanModify");
                    $SamplingPlanEdit.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var SamplingPlanID = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
                    var ProvinceTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                    var command = "SamplingPlan/_SamplingPlanAddOrModify";
                    $.get(cssp.BaseURL + command, { ProvinceTVItemID: ProvinceTVItemID, SamplingPlanID: SamplingPlanID })
                        .done(function (ret) {
                        $SamplingPlanEdit.html(ret);
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        // nothing
                    });
                    $bjs.closest(".SamplingPlanItem").find(".SamplingPlanFileDiv").removeClass("hidden").addClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".SamplingPlanItem").find(".SamplingPlanModify").html("");
                    $bjs.closest(".SamplingPlanItem").find(".SamplingPlanFileDiv").removeClass("hidden");
                }
            };
            this.SamplingPlanEditCancel = function ($bjs) {
                $(".jbSamplingPlanEdit").trigger("click");
            };
            this.SamplingPlanEditShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $(".jbSamplingPlanAdd").removeClass("hidden");
                    $(".SamplingPlanEditButons").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $(".jbSamplingPlanAdd").addClass("hidden");
                    $(".SamplingPlanEditButons").addClass("hidden");
                    $(".SamplingPlanModify").html("");
                    $(".SamplingPlanAdd").html("");
                    $(".jbSamplingPlanEdit").removeClass("btn-success").addClass("btn-default");
                    $(".jbSamplingPlanAdd").removeClass("btn-success").addClass("btn-default");
                }
            };
            this.SamplingPlanShowOnMap = function ($bjs) {
                var SubsectorTVItemID = parseInt($bjs.data("subsectortvitemid"));
                cssp.GoogleMap.TVItemObjects = [];
                cssp.SamplingPlan.mapItems = [];
                var command = "Map/GetMapInfoForSamplingPlanJSON";
                $.get(cssp.BaseURL + command, { SubsectorTVItemID: SubsectorTVItemID })
                    .done(function (ret) {
                    $.map(ret, function (item) {
                        var tvLoc = new CSSP.tvLocation(item.TVItemID, item.TVText, item.TVType, item.SubTVType, item.MapObjList);
                        cssp.SamplingPlan.mapItems.push(tvLoc);
                    });
                    cssp.GoogleMap.TVItemObjects = [];
                    cssp.GoogleMap.FillTVItemObjects(cssp.SamplingPlan.mapItems, true);
                    cssp.SamplingPlan.SamplingPlanArrangeMapItems($bjs);
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.SamplingPlanShowMWQMSites = function ($bjs) {
                if ($bjs.closest(".subsectortop").find(".mwqmsiteall").children().length == 0) {
                    var SamplingPlanID = parseInt($bjs.data("samplingplanid"));
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var SubsectorTVItemID = parseInt($bjs.data("subsectortvitemid"));
                    var command = "SamplingPlan/_SamplingPlanMWQMSites";
                    $.get(cssp.BaseURL + command, {
                        SamplingPlanID: SamplingPlanID,
                        ProvinceTVItemID: ProvinceTVItemID,
                        SubsectorTVItemID: SubsectorTVItemID
                    })
                        .done(function (ret) {
                        $bjs.closest(".subsectortop").find(".mwqmsiteall").html(ret);
                        if ($bjs.closest(".subsectortop").find(".mwqmsite").length > 0) {
                            cssp.SamplingPlan.ResetCountMWQMSiteSelected($bjs.closest(".subsectortop").find(".mwqmsite").eq(0));
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.SamplingPlanShowHistoryLabSheetDetail = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var SamplingPlanID = parseInt($bjs.data("samplingplanid"));
                    var LabSheetID = parseInt($bjs.data("labsheetid"));
                    var $LabSheetHistoryDetailDiv = $bjs.closest(".LabSheetListTop").find(".LabSheetHistoryDetailDiv").eq(0);
                    $LabSheetHistoryDetailDiv.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "SamplingPlan/_LabSheetsHistoryDetail";
                    $.get(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID, LabSheetID: LabSheetID })
                        .done(function (ret) {
                        $LabSheetHistoryDetailDiv.html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".LabSheetListTop").find(".LabSheetHistoryDetailDiv").eq(0).html("");
                }
            };
            this.ShowHistoryLabSheets = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var $SamplingPlanItem = $bjs.closest(".SamplingPlanItem");
                    var SamplingPlanID = parseInt($SamplingPlanItem.data("samplingplanid"));
                    var $LabSheetsHistoryDiv = $SamplingPlanItem.find(".LabSheetsHistoryDiv");
                    $LabSheetsHistoryDiv.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "SamplingPlan/_LabSheetsHistory";
                    $.get(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID })
                        .done(function (ret) {
                        $LabSheetsHistoryDiv.html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".SamplingPlanItem").find(".LabSheetsHistoryDiv").html("");
                }
            };
            this.ShowTransferredLabSheets = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var $SamplingPlanItem = $bjs.closest(".SamplingPlanItem");
                    var SamplingPlanID = parseInt($SamplingPlanItem.data("samplingplanid"));
                    var $LabSheetsTransferredDiv = $SamplingPlanItem.find(".LabSheetsTransferredDiv");
                    $LabSheetsTransferredDiv.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "SamplingPlan/_LabSheetsTranferred";
                    $.get(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID })
                        .done(function (ret) {
                        $LabSheetsTransferredDiv.html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".SamplingPlanItem").find(".LabSheetsTransferredDiv").html("");
                }
            };
            this.SubsectorSelectAll = function ($bjs) {
                var textHolder = $bjs.text();
                $bjs.text("Working ...");
                $bjs.closest(".mwqmsiteall").find(".mwqmsite").each(function (ind, elem) {
                    $(elem).not(":checked").click();
                });
                $bjs.text(textHolder);
                if ($bjs.closest(".mwqmsiteall").find(".mwqmsite").length > 0) {
                    cssp.SamplingPlan.ResetCountMWQMSiteSelected($bjs.closest(".mwqmsiteall").find(".mwqmsite").eq(0));
                }
            };
            this.SubsectorUnSelectAll = function ($bjs) {
                var textHolder = $bjs.text();
                $bjs.text("Working ...");
                $bjs.closest(".mwqmsiteall").find(".mwqmsite").each(function (ind, elem) {
                    if ($(elem).is(":checked"))
                        $(elem).click();
                });
                $bjs.text(textHolder);
                if ($bjs.closest(".mwqmsiteall").find(".mwqmsite").length > 0) {
                    cssp.SamplingPlan.ResetCountMWQMSiteSelected($bjs.closest(".mwqmsiteall").find(".mwqmsite").eq(0));
                }
            };
            this.SamplingPlanAcceptLabSheet = function ($bjs) {
                var AnalyzeMethod = parseInt($bjs.closest(".LabSheetItem").find("select[name='AnalyzeMethod']").val());
                var SampleMatrix = parseInt($bjs.closest(".LabSheetItem").find("select[name='SampleMatrix']").val());
                var Laboratory = parseInt($bjs.closest(".LabSheetItem").find("select[name='Laboratory']").val());
                var LabSheetID = parseInt($bjs.data("labsheetid"));
                var ChangeRunSamplingType = "";
                $bjs.closest(".LabSheetItem").find("select[name='ChangeRunSamplingType']").each(function (ind, elem) {
                    ChangeRunSamplingType = ChangeRunSamplingType + $(elem).val();
                });
                for (var i = 0; i < 20; i++) {
                    ChangeRunSamplingType = ChangeRunSamplingType.replace(",", "|");
                }
                var date = new Date();
                var TimeOffsetMinutes = date.getTimezoneOffset();
                var OriginalText = $bjs.text();
                $bjs.text(cssp.GetHTMLVariable("#LayoutVariables", "varSaving"));
                var command = "SamplingPlan/LabSheetAcceptedJSON";
                $.post(cssp.BaseURL + command, {
                    LabSheetID: LabSheetID,
                    TimeOffsetMinutes: TimeOffsetMinutes,
                    AnalyzeMethod: AnalyzeMethod,
                    SampleMatrix: SampleMatrix,
                    Laboratory: Laboratory,
                    ChangeRunSamplingType: ChangeRunSamplingType,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        //cssp.Helper.PageRefresh();
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $(".LabSheetsTransferredDiv").find(".LabSheetItem[data-labsheetid='" + LabSheetID.toString() + "']").remove();
                    }
                    $bjs.text(OriginalText);
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.SamplingPlanRejectLabSheet = function ($bjs) {
                var LabSheetID = parseInt($bjs.data("labsheetid"));
                var command = "SamplingPlan/LabSheetRejectJSON";
                $.post(cssp.BaseURL + command, { LabSheetID: LabSheetID })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        //cssp.Helper.PageRefresh();
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $(".LabSheetsTransferredDiv").find(".LabSheetItem[data-labsheetid='" + LabSheetID.toString() + "']").remove();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
        }
        SamplingPlan.prototype.ChangeSamplingPlanName = function () {
            $("input[name='SamplingPlanName']").val("C:\\CSSPLabSheets\\SamplingPlan" +
                "_" + $("select[name='SamplingPlanType']").find(":checked").text().trim().replace(" ", "_") +
                "_" + $("select[name='SampleType']").find(":checked").text().trim().replace(" ", "_") +
                "_" + $("select[name='LabSheetType']").find(":checked").text().trim().replace(" ", "_") +
                "_" + $("input[name='Year']").val().trim().replace(" ", "_") +
                "_" + $("input[name='ForGroupName']").val().trim().replace(" ", "_") + ".txt");
            $("#GeneratedSamplingPlanName").text($("input[name='SamplingPlanName']").val());
        };
        ;
        SamplingPlan.prototype.ResetCountMWQMSiteSelected = function ($Item) {
            var CountMWQMSiteSelected = 0;
            $Item.closest(".subsectortop").find("input.mwqmsite").each(function (ind, elem) {
                if ($(elem).is(":checked")) {
                    CountMWQMSiteSelected += 1;
                }
            });
            $Item.closest(".subsectortop").find(".mwqmsitecount").text(CountMWQMSiteSelected.toString());
            if (CountMWQMSiteSelected == 0) {
                $Item.closest(".subsectortop").find(".jbSamplingPlanShowMWQMSites").removeClass("ElementSelected");
            }
            else {
                $Item.closest(".subsectortop").find(".jbSamplingPlanShowMWQMSites").removeClass("ElementSelected").addClass("ElementSelected");
            }
            //$Item.closest(".SamplingPlanSubsectorEditForm").find(".SamplingPlanMWQMSiteSave").text("Save");
            $Item.closest(".mwqmsiteall").each(function (ind, elem) {
                var $select = $(elem).find(".mwqmsiteduplicate");
                var OptArr = [];
                OptArr.push("<option value='0'>None</option>");
                $(elem).find(".mwqmsite").each(function (ind2, elem2) {
                    if ($(elem2).is(":checked")) {
                        if ($(elem2).data("isduplicate") == "T") {
                            OptArr.push("<option value=\"" + $(elem2).val() + "\" selected=\"selected\">Site " + $(elem2).next().text() + "</option>");
                        }
                        else {
                            OptArr.push("<option value='" + $(elem2).val() + "'>Site " + $(elem2).next().text() + "</option>");
                        }
                    }
                });
                $select.html(OptArr.join(""));
            });
        };
        ;
        return SamplingPlan;
    }());
    CSSP.SamplingPlan = SamplingPlan;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.SamplingPlan.js.map