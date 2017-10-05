module CSSP {
    export class SamplingPlan {
        // Variables
        private mapItems: Array<CSSP.tvLocation> = [];

        // Constructor
        constructor() {
        }

        // Functions
        public FormSubmitTopInfo: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $("#SamplingPlanEditForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#SamplingPlanEditForm", "SamplingPlanModify");
                return;
            }

            if (!$form.valid || $form.valid()) {
                if (cssp.CheckInputWithNumbers()) {
                    cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                    return;
                }
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
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
        public FormSubmitSubsector: Function = ($bjs: JQuery): void => {
            $bjs.find(".SamplingPlanMWQMSiteSave").text("Working...");
            var $form: JQuery = $bjs.closest(".SamplingPlanSubsectorEditForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".SamplingPlanSubsectorEditForm", "SamplingPlanSubsectorTop");
                return;
            }

            if (!$form.valid || $form.valid()) {
                if (cssp.CheckInputWithNumbers()) {
                    cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                    return;
                }
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            $bjs.find(".SamplingPlanMWQMSiteSave").text("Saved");
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public ChangeSamplingPlanName() {
            $("input[name='SamplingPlanName']").val("C:\\CSSPLabSheets\\SamplingPlan" + 
                "_" + $("select[name='SamplingPlanType']").find(":checked").text().trim().replace(" ", "_") +
                "_" + $("select[name='SampleType']").find(":checked").text().trim().replace(" ", "_") +
                "_" + $("select[name='LabSheetType']").find(":checked").text().trim().replace(" ", "_") +
                "_" + $("input[name='Year']").val().trim().replace(" ", "_") +
                "_" + $("input[name='ForGroupName']").val().trim().replace(" ", "_") + ".txt");

            $("#GeneratedSamplingPlanName").text($("input[name='SamplingPlanName']").val());
        };
        public Init: Function = (): void => {
            $(document).off("click", "input.province");
            $(document).on("click", "input.province", (evt: Event) => {
                var cls = "ElementSelected";
                $(evt.target).closest(".provinceall").find("label").removeClass(cls);
                $(evt.target).parent().addClass(cls);
                var $SamplingPlanByProvince: JQuery = $(evt.target).closest(".SamplingPlanTop").find(".SamplingPlanByProvince");
                $SamplingPlanByProvince.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var ProvinceTVItemID: number = parseInt($(evt.target).val());
                var command = "SamplingPlan/_SamplingPlanByProvince";
                $.get(cssp.BaseURL + command, { ProvinceTVItemID: ProvinceTVItemID })
                    .done((ret) => {
                        $SamplingPlanByProvince.html(ret);
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        // nothing
                    });
            });

            $(document).off("keyup", "input[name='ForGroupName'], input[name='Year']");
            $(document).on("keyup", "input[name='ForGroupName'], input[name='Year']", (evt: Event) => {
                cssp.SamplingPlan.ChangeSamplingPlanName();
            });

            $(document).off("change", "select[name='SamplingPlanType']");
            $(document).on("change", "select[name='SamplingPlanType']", (evt: Event) => {
                var SelectText: string = $("select[name='SamplingPlanType']").find(":checked").text().trim();
                if (SelectText != "Subsector") {
                    cssp.Dialog.ShowDialogMessage(SelectText + " sampling plan type is not implemented yet.");
                }
                else {
                    cssp.SamplingPlan.ChangeSamplingPlanName();
                }
            });

            $(document).off("change", "select[name='SampleType']");
            $(document).on("change", "select[name='SampleType']", (evt: Event) => {
                var SelectText: string = $("select[name='SampleType']").find(":checked").text().trim();
                var SelectVal: string = $("select[name='SampleType']").find(":checked").val().trim();
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
            $(document).on("change", "select[name='LabSheetType']", (evt: Event) => {
                var SelectText: string = $("select[name='LabSheetType']").find(":checked").text().trim();
                if (SelectText != "A1") {
                    cssp.Dialog.ShowDialogMessage(SelectText + " lab sheet type is not implemented yet.");
                }
                else {
                    cssp.SamplingPlan.ChangeSamplingPlanName();
                }
            });

            $(document).off("click", "input.mwqmsite");
            $(document).on("click", "input.mwqmsite", (evt: Event) => {
                var cls = "ElementSelected";
                var $Item: JQuery = $(evt.target);
                if ($Item.is(":checked")) {
                    $Item.parent().addClass(cls);
                    $Item.closest(".mwqmsiteall").find(".mwqmsiteduplicate").append("<option value='" + $Item.val() + "'>Site " + $Item.parent().text() + "</option>");
                }
                else {
                    $Item.parent().removeClass(cls);
                    var $ElemToDelete: JQuery = null;
                    $Item.closest(".mwqmsiteall").find(".mwqmsiteduplicate").children().each((ind: number, elem: Element) => {
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
            $(document).on("change", "input[name='IncludeLaboratoryQAQC']", (evt: Event) => {
                if ($("input[name='IncludeLaboratoryQAQC']").is(":checked")) {
                    $(".IncludeLaboratoryQAQCInfoDiv").removeClass("hidden");
                }
                else {
                    $(".IncludeLaboratoryQAQCInfoDiv").removeClass("hidden").addClass("hidden");
                }
            });

            $("#SamplingPlanEditForm").each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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

            $(".mwqmsitecount").each((ind: number, elem: Element) => {
                if ($(elem).text() != "0") {
                    $(elem).closest(".jbSamplingPlanShowMWQMSites").trigger("click");
                }
            });

            window.setTimeout(() => {
                $(".jbSamplingPlanEditSave").removeClass("hidden");
            }, 5000);
        };
        public ResetCountMWQMSiteSelected($Item: JQuery) {
            var CountMWQMSiteSelected = 0;
            $Item.closest(".subsectortop").find("input.mwqmsite").each((ind: number, elem: Element) => {
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

            $Item.closest(".mwqmsiteall").each((ind: number, elem: Element) => {
                var $select: JQuery = $(elem).find(".mwqmsiteduplicate");
                var OptArr: Array<string> = [];
                OptArr.push("<option value='0'>None</option>");
                $(elem).find(".mwqmsite").each((ind2: number, elem2: Element) => {
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
        public InitNoPermission: Function = (): void => {
            $(".jbSamplingPlanEditShowHide").removeClass("hidden").addClass("hidden");
        };
        public SamplingPlanAdd: Function = ($bjs: JQuery): void => {
            var ShouldLoad: boolean = $bjs.hasClass("btn-default");
            $(".SamplingPlanModify").html("");
            $(".SamplingPlanAdd").html("");
            $(".jbSamplingPlanEdit").removeClass("btn-success").addClass("btn-default");
            $(".jbSamplingPlanAdd").removeClass("btn-success").addClass("btn-default");
            var $SamplingPlanAdd: JQuery = $bjs.closest("#ViewDiv").find(".SamplingPlanAdd");
            if (ShouldLoad) {
                $(".SamplingPlanModify").html("");
                $bjs.removeClass("btn-default").addClass("btn-success");
                $SamplingPlanAdd.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var SamplingPlanID: number = 0;
                var ProvinceTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var command = "SamplingPlan/_SamplingPlanAddOrModify";
                $.get(cssp.BaseURL + command, { ProvinceTVItemID: ProvinceTVItemID, SamplingPlanID: SamplingPlanID })
                    .done((ret) => {
                        $SamplingPlanAdd.html(ret);
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        // nothing
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $SamplingPlanAdd.html("");
            }
        };
        public SamplingPlanArrangeMapItems: Function = ($bjs: JQuery): void => {
            var $allSubsectorMWQMSite = $bjs.closest(".subsectortop").find(".mwqmsiteall");
            for (var i = 0, count = cssp.SamplingPlan.mapItems.length; i < count; i++) {
                $allSubsectorMWQMSite.find(".mwqmsite").each((ind: number, elem: Element) => {
                    if (cssp.SamplingPlan.mapItems[i].TVItemID == parseInt($(elem).val())) {
                        cssp.SamplingPlan.mapItems[i].TVText = $(elem).next().text();
                        if ($(elem).parent().hasClass("ElementSelected")) {
                            cssp.SamplingPlan.mapItems[i].SubTVType = TVTypeEnum.Passed;
                        }
                        else {
                            cssp.SamplingPlan.mapItems[i].SubTVType = TVTypeEnum.Failed;
                        }
                    }
                });
            }
            cssp.GoogleMap.TVItemObjects = [];
            cssp.GoogleMap.FillTVItemObjects(cssp.SamplingPlan.mapItems, false);
        };
        public SamplingPlanCopy: Function = ($bjs: JQuery): void => {
            var SamplingPlanID: number = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
            var command = "SamplingPlan/SamplingPlanCopyJSON";
            $.post(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithFail(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public SamplingPlanGenerateSamplingPlan: Function = ($bjs: JQuery): void => {
            var SamplingPlanID: number = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
            var command = "SamplingPlan/SamplingPlanGenerateSamplingPlanJSON";
            $.post(cssp.BaseURL + command,
                {
                    SamplingPlanID: SamplingPlanID
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithFail(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public SamplingPlanAskToDelete: Function = ($bjs: JQuery): void => {
            var SamplingPlanName: string = $bjs.closest(".SamplingPlanTitlePanel").find(".SamplingPlanName").text();
            cssp.Dialog.ShowDialogAreYouSure(SamplingPlanName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.SamplingPlan.SetDialogEvents", $bjs);
        };
        public SetDialogEvents: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var SamplingPlanID: number = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
                    var command = "SamplingPlan/SamplingPlanDeleteJSON";
                    $.post(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID })
                        .done((ret) => {
                            if (ret.length > 0) {
                                cssp.Dialog.ShowDialogErrorWithFail(ret);
                            }
                            else {
                                cssp.Helper.PageRefresh();
                            }
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(() => {
                            // nothing
                        });
                });
            });
        };
        public SamplingPlanAskToDeleteFile: Function = ($bjs: JQuery): void => {
            var SamplingPlanID: number = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
            var command = "SamplingPlan/SamplingPlanDeleteFileJSON";
            $.post(cssp.BaseURL + command,
                {
                    SamplingPlanID: SamplingPlanID
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithFail(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    // nothing
                });
        };
        public SamplingPlanEdit: Function = ($bjs: JQuery): void => {
            //if ($("a.GlobeIcon").hasClass("btn-default")) {
            //    cssp.Dialog.ShowDialogMessage("Please click the globe icon to show the map");
            //    return;
            //}

            var ShouldLoad: boolean = $bjs.hasClass("btn-default");
            $(".SamplingPlanModify").html("");
            $(".SamplingPlanAdd").html("");
            $(".jbSamplingPlanEdit").removeClass("btn-success").addClass("btn-default");
            $(".jbSamplingPlanAdd").removeClass("btn-success").addClass("btn-default");
            if (ShouldLoad) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".SamplingPlanExisting").find(".SamplingPlanModify").html("");
                var $SamplingPlanEdit: JQuery = $bjs.closest(".SamplingPlanItem").find(".SamplingPlanModify");
                $SamplingPlanEdit.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var SamplingPlanID: number = parseInt($bjs.closest(".SamplingPlanItem").data("samplingplanid"));
                var ProvinceTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var command = "SamplingPlan/_SamplingPlanAddOrModify";
                $.get(cssp.BaseURL + command, { ProvinceTVItemID: ProvinceTVItemID, SamplingPlanID: SamplingPlanID })
                    .done((ret) => {
                        $SamplingPlanEdit.html(ret);
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
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
        public SamplingPlanEditCancel: Function = ($bjs: JQuery): void => {
            $(".jbSamplingPlanEdit").trigger("click");
        };
        public SamplingPlanEditShowHide: Function = ($bjs: JQuery): void => {
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
        public SamplingPlanShowOnMap: Function = ($bjs: JQuery): void => {
            var SubsectorTVItemID = parseInt($bjs.data("subsectortvitemid"));
            cssp.GoogleMap.TVItemObjects = [];
            cssp.SamplingPlan.mapItems = [];
            var command = "Map/GetMapInfoForSamplingPlanJSON";
            $.get(cssp.BaseURL + command, { SubsectorTVItemID: SubsectorTVItemID })
                .done((ret: Array<CSSP.tvLocation>) => {
                    $.map(ret, (item) => {
                        var tvLoc: CSSP.tvLocation = new CSSP.tvLocation(item.TVItemID, item.TVText, item.TVType, item.SubTVType, item.MapObjList);
                        cssp.SamplingPlan.mapItems.push(tvLoc);
                    });
                    cssp.GoogleMap.TVItemObjects = [];
                    cssp.GoogleMap.FillTVItemObjects(cssp.SamplingPlan.mapItems, true);
                    cssp.SamplingPlan.SamplingPlanArrangeMapItems($bjs);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public SamplingPlanShowMWQMSites: Function = ($bjs: JQuery): void => {
            if ($bjs.closest(".subsectortop").find(".mwqmsiteall").children().length == 0) {
                var SamplingPlanID = parseInt($bjs.data("samplingplanid"));
                var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                var SubsectorTVItemID = parseInt($bjs.data("subsectortvitemid"));
                var command = "SamplingPlan/_SamplingPlanMWQMSites";
                $.get(cssp.BaseURL + command,
                    {
                        SamplingPlanID: SamplingPlanID,
                        ProvinceTVItemID: ProvinceTVItemID,
                        SubsectorTVItemID: SubsectorTVItemID
                    })
                    .done((ret) => {
                        $bjs.closest(".subsectortop").find(".mwqmsiteall").html(ret);
                        if ($bjs.closest(".subsectortop").find(".mwqmsite").length > 0) {
                            cssp.SamplingPlan.ResetCountMWQMSiteSelected($bjs.closest(".subsectortop").find(".mwqmsite").eq(0));
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public SamplingPlanShowHistoryLabSheetDetail: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                var SamplingPlanID = parseInt($bjs.data("samplingplanid"));
                var LabSheetID = parseInt($bjs.data("labsheetid"));
                var $LabSheetHistoryDetailDiv = $bjs.closest(".LabSheetListTop").find(".LabSheetHistoryDetailDiv").eq(0);
                $LabSheetHistoryDetailDiv.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "SamplingPlan/_LabSheetsHistoryDetail";
                $.get(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID, LabSheetID: LabSheetID })
                    .done((ret) => {
                        $LabSheetHistoryDetailDiv.html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".LabSheetListTop").find(".LabSheetHistoryDetailDiv").eq(0).html("");
            }
        };
        public ShowHistoryLabSheets: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                var $SamplingPlanItem = $bjs.closest(".SamplingPlanItem");
                var SamplingPlanID = parseInt($SamplingPlanItem.data("samplingplanid"));
                var $LabSheetsHistoryDiv = $SamplingPlanItem.find(".LabSheetsHistoryDiv");
                $LabSheetsHistoryDiv.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "SamplingPlan/_LabSheetsHistory";
                $.get(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID })
                    .done((ret) => {
                        $LabSheetsHistoryDiv.html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".SamplingPlanItem").find(".LabSheetsHistoryDiv").html("");
            }
        };
        public ShowTransferredLabSheets: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                var $SamplingPlanItem = $bjs.closest(".SamplingPlanItem");
                var SamplingPlanID = parseInt($SamplingPlanItem.data("samplingplanid"));
                var $LabSheetsTransferredDiv = $SamplingPlanItem.find(".LabSheetsTransferredDiv");
                $LabSheetsTransferredDiv.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "SamplingPlan/_LabSheetsTranferred";
                $.get(cssp.BaseURL + command, { SamplingPlanID: SamplingPlanID })
                    .done((ret) => {
                        $LabSheetsTransferredDiv.html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".SamplingPlanItem").find(".LabSheetsTransferredDiv").html("");
            }
        };
        public SubsectorSelectAll: Function = ($bjs: JQuery): void => {
            var textHolder: string = $bjs.text();
            $bjs.text("Working ...");
            $bjs.closest(".mwqmsiteall").find(".mwqmsite").each((ind: number, elem: Element) => {
                $(elem).not(":checked").click();
            });
            $bjs.text(textHolder);
            if ($bjs.closest(".mwqmsiteall").find(".mwqmsite").length > 0) {
                cssp.SamplingPlan.ResetCountMWQMSiteSelected($bjs.closest(".mwqmsiteall").find(".mwqmsite").eq(0));
            }
        };
        public SubsectorUnSelectAll: Function = ($bjs: JQuery): void => {
            var textHolder: string = $bjs.text();
            $bjs.text("Working ...");
            $bjs.closest(".mwqmsiteall").find(".mwqmsite").each((ind: number, elem: Element) => {
                if ($(elem).is(":checked"))
                    $(elem).click();
            });
            $bjs.text(textHolder);
            if ($bjs.closest(".mwqmsiteall").find(".mwqmsite").length > 0) {
                cssp.SamplingPlan.ResetCountMWQMSiteSelected($bjs.closest(".mwqmsiteall").find(".mwqmsite").eq(0));
            }
        };
        public SamplingPlanAcceptLabSheet: Function = ($bjs: JQuery): void => {
            let AnalyzeMethod: number = parseInt($bjs.closest(".LabSheetItem").find("select[name='AnalyzeMethod']").val());
            let SampleMatrix: number = parseInt($bjs.closest(".LabSheetItem").find("select[name='SampleMatrix']").val());
            let Laboratory: number = parseInt($bjs.closest(".LabSheetItem").find("select[name='Laboratory']").val());
            let LabSheetID: number = parseInt($bjs.data("labsheetid"));
            //let ChangeRunSamplingType: string = "";
            //$bjs.closest(".LabSheetItem").find("select[name='ChangeRunSamplingType']").each((ind: number, elem: Element) => {
            //    ChangeRunSamplingType = ChangeRunSamplingType + $(elem).val();
            //});
            //for (let i = 0; i < 20; i++) {
            //    ChangeRunSamplingType = ChangeRunSamplingType.replace(",", "|");
            //}
            let date: any = new Date();
            let TimeOffsetMinutes: number = date.getTimezoneOffset();
            let OriginalText: string = $bjs.text();
            $bjs.text(cssp.GetHTMLVariable("#LayoutVariables", "varSaving"));
            let command = "SamplingPlan/LabSheetAcceptedJSON";
            $.post(cssp.BaseURL + command,
                {
                    LabSheetID: LabSheetID,
                    TimeOffsetMinutes: TimeOffsetMinutes,
                    AnalyzeMethod: AnalyzeMethod,
                    SampleMatrix: SampleMatrix,
                    Laboratory: Laboratory,
                    //ChangeRunSamplingType: ChangeRunSamplingType,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        //cssp.Helper.PageRefresh();
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $(".LabSheetsTransferredDiv").find(".LabSheetItem[data-labsheetid='" + LabSheetID.toString() + "']").remove();
                    }
                    $bjs.text(OriginalText);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public SamplingPlanRejectLabSheet: Function = ($bjs: JQuery): void => {
            var LabSheetID: number = parseInt($bjs.data("labsheetid"));
            var command = "SamplingPlan/LabSheetRejectJSON";
            $.post(cssp.BaseURL + command, { LabSheetID: LabSheetID })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        //cssp.Helper.PageRefresh();
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $(".LabSheetsTransferredDiv").find(".LabSheetItem[data-labsheetid='" + LabSheetID.toString() + "']").remove();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
    }
}  