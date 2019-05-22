
module CSSP {
    export class PolSourceSite {
        // Variables
        public FormName: string = "#PolSourceSiteAddOrModifyForm";
        public PolSourcePrevSelected: Array<string> = [];
        public IssueOrdinal: number = 0;

        // Constructors
        constructor() {
        }
      
        // Functions
        public PolSourceObservationAskToDelete: Function = ($bjs: JQuery): void => {
            var PolObservationDateText: string = $bjs.closest(".PolSourceObservationTopDiv").find(".PolSourceObservationDateText").text();
            cssp.Dialog.ShowDialogAreYouSure(PolObservationDateText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSite.SetDialogEventsDeleteObservation", $bjs);
        };
        public SetDialogEventsDeleteObservation: Function = ($bjs: JQuery): void => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var PolSourceObservationID: number = parseInt($bjs.data("polsourceobservationid"));
                    var command: string = "PolSource/PolSourceObservationDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            PolSourceObservationID: PolSourceObservationID,
                        })
                        .done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                                cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                            }
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
        public PolSourceObservationIssueAskToDelete: Function = ($bjs: JQuery): void => {
            var PolObservationDateText: string = $bjs.closest(".PolSourceObservationIssueTop").find(".PolSourceObservationIssueText").text();
            cssp.Dialog.ShowDialogAreYouSure(PolObservationDateText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSite.SetDialogEventsDeleteObservationIssue", $bjs);
        };
        public PolSourceObservationIssueMoveDown: Function = ($bjs: JQuery): void => {
            var PolSourceObservationIssueID: number = parseInt($bjs.data("polsourceobservationissueid"));
            var command: string = "PolSource/PolSourceObservationIssueMoveDownJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceObservationIssueID: PolSourceObservationIssueID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                        cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public PolSourceObservationIssueMoveUp: Function = ($bjs: JQuery): void => {
            var PolSourceObservationIssueID: number = parseInt($bjs.data("polsourceobservationissueid"));
            var command: string = "PolSource/PolSourceObservationIssueMoveUpJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceObservationIssueID: PolSourceObservationIssueID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                        cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public SetDialogEventsDeleteObservationIssue: Function = ($bjs: JQuery): void => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var PolSourceObservationID: number = parseInt($bjs.data("polsourceobservationid"));
                    var PolSourceObservationIssueID: number = parseInt($bjs.data("polsourceobservationissueid"));
                    var command: string = "PolSource/PolSourceObservationIssueDeleteJSON";
                    $.post(cssp.BaseURL + command, {
                        PolSourceObservationIssueID: PolSourceObservationIssueID,
                    }).done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                            cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                });
            });
        };
        public FormSubmit: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $(cssp.PolSourceSite.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.PolSourceSite.FormName, "PolSourceSiteTopDiv");
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
        public FormSubmitIssue: Function = ($bjs: JQuery): void => {
            let $form: JQuery = $(".IssueModifyForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".IssueModifyForm", "IssueModifyDiv");
                return;
            }
            let PolSourceObservationID: number = parseInt($bjs.data("polsourceobservationid"));
            let PolSourceObservationIssueID: number = parseInt($bjs.closest("form.IssueModifyForm").find("input[name='PolSourceObservationIssueID']").val());

            var $elem: JQuery;
            $(".jbPolSourceEditIssue").each((ind: number, elem: Element) => {
                if (parseInt($(elem).data("issueordinal")) == this.IssueOrdinal) {
                    $elem = $(elem);
                }
            });

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
                            var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                            cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, $elem);
                            cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public Init: Function = (): void => {
            $(".FileEditButtons").removeClass("hidden");
            $(".FileEditButtons").find(".jbFileEditShowHide").addClass("hidden");
            $(".FileEditButtons").find(".jbFileAskToDelete").addClass("hidden");
            //setTimeout(() => {
            //    cssp.PolSourceSite.PolSourceSiteShowHideOnMap();
            //}, 1000);
        };
        public InitAddOrModify: Function = (): void => {
            $(cssp.PolSourceSite.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
            $(document).on("click", "input[name='IsActive']", (evt: Event) => {
                $("input[name='InactiveReason']").removeAttr("checked");
                if ($(evt.target).is(":checked")) {
                    $(".Inactive").removeClass("hidden").addClass("hidden");
                }
                else {
                    $(".Inactive").removeClass("hidden");
                }
            });

            $(document).off("change", "select[name='ObsYear'], select[name='ObsMonth']");
            $(document).on("change", "select[name='ObsYear'], select[name='ObsMonth']", (evt: Event) => {
                var Year: number = parseInt($("select[name='ObsYear']").val());
                var Month: number = parseInt($("select[name='ObsMonth']").val());
                var daysInMonth: number = new Date(Year, Month, 0).getDate();
                $("select[name='ObsDay']").html("");
                var optHTMLArr: Array<string> = [];
                for (var i = 1; i < daysInMonth + 1; i++) {
                    optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                }
                $("select[name='ObsDay']").html(optHTMLArr.join(""));
            });
        };
        public InitIssueModify: Function = (): void => {
            $(document).off("click", ".PolSourceGroupSelected input[type='radio'].polsourceinput");
            $(document).on("click", ".PolSourceGroupSelected input[type='radio'].polsourceinput", (evt: Event) => {
                let cls = "ElementSelected";
                $(evt.target).closest(".polsourceinputdiv").find("label").removeClass(cls);
                $(evt.target).parent().addClass(cls);
                $(evt.target).closest(".polsourceinputdiv").nextAll().remove();
                let childElemStr: string = $(evt.target).data("psc");
                $(evt.target).closest(".PolSourceGroupSelected").append($(".PolSourceGroupingTop ." + childElemStr).html());
                let hideText: string = $(evt.target).data("hide");
                if (hideText.substring(hideText.length - 1) != ",") {
                    hideText = hideText + ",";
                }
                let hideList: string[] = hideText.split(",");
                let nextPolSourcInputDiv: JQuery = $(evt.target).closest(".polsourceinputdiv").next(".polsourceinputdiv");
                nextPolSourcInputDiv.find("input.polsourceinput").each((ind: number, elem: HTMLElement) => {
                    $(elem).closest("div").removeClass("hidden");
                });
                nextPolSourcInputDiv.find("input.polsourceinput").each((ind: number, elem: HTMLElement) => {
                    for (let i = 0, count = hideList.length; i < count; i++) {
                        if (hideList[i] == $(elem).val()) {
                            $(elem).closest("div").removeClass("hidden").addClass("hidden");
                        }
                    }
                });
                $(".jaPopover").popover();
            });

            $(".PolSourceGroupSelected").html("");
            let ObservationInfo: Array<string> = $(".IssueModifyDiv").find("span.ObservationInfo").text().split(",");
            if (ObservationInfo[0].length == 0) {
                $(".PolSourceGroupSelected").append($(".PolSourceGroupingTop").find(".c10100").html());
            }
            for (let i = 0, count = ObservationInfo.length; i < count; i++) {
                if (ObservationInfo[i].length > 0) {
                    $(".PolSourceGroupSelected").append($(".PolSourceGroupingTop").find(".c" + ObservationInfo[i].substring(0, 3) + "00").html());
                    let cls = "ElementSelected";
                    $(".PolSourceGroupSelected").find("input[name='c" + ObservationInfo[i].substring(0, 3) + "00']").each((ind: number, elem: Element) => {
                        $(elem).find("input[name='c" + ObservationInfo[i] + "']").parent().addClass(cls);
                        if ($(elem).val() == ObservationInfo[i]) {
                            $(elem).parent().addClass(cls);
                        }
                    });
                }
            }

            $("label.ElementSelected").each((ind: number, elem: HTMLElement) => {
                let input$: JQuery = $(elem).find("input.polsourceinput");
                let hideText: string = input$.data("hide");
                if (hideText.substring(hideText.length - 1) != ",") {
                    hideText = hideText + ",";
                }
                let hideList: string[] = hideText.split(",");
                let nextPolSourcInputDiv: JQuery = input$.closest(".polsourceinputdiv").next(".polsourceinputdiv");
                nextPolSourcInputDiv.find("input.polsourceinput").each((ind: number, elem: HTMLElement) => {
                    $(elem).closest("div").removeClass("hidden");
                });
                nextPolSourcInputDiv.find("input.polsourceinput").each((ind: number, elem: HTMLElement) => {
                    for (let i = 0, count = hideList.length; i < count; i++) {
                        if (hideList[i] == $(elem).val()) {
                            $(elem).closest("div").removeClass("hidden").addClass("hidden");
                        }
                    }
                });
            });

        };
        public InitIssueList: Function = (): void => {
            // nothing for now
        };
        public PolSourceAddIssue: Function = ($bjs: JQuery) => {
            var PolSourceObservationID: number = parseInt($bjs.data("polsourceobservationid"));
            this.IssueOrdinal = parseInt($bjs.data("issueordinal")) + 1;
            var command: string = "PolSource/PolSourceIssueAddJSON";
            $.post(cssp.BaseURL + command, {
                PolSourceObservationID: PolSourceObservationID,
                NextIssueOrdinal: this.IssueOrdinal,
            }).done((ret) => {
                if (ret) {
                    cssp.Dialog.ShowDialogError(ret);
                }
                else {
                    var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                    cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public PolSourceEditIssue: Function = ($bjs: JQuery) => {
            if ($bjs) {
                var PolSourceObservationID: number = parseInt($bjs.data("polsourceobservationid"));
                this.IssueOrdinal = parseInt($bjs.data("issueordinal"));
                cssp.PolSourceSite.PolSourceIssueListReload(PolSourceObservationID, this.IssueOrdinal);
            }
        };
        public PolSourceSaveIssue: Function = ($bjs: JQuery) => {
            var PolSourceObservationID: number = parseInt($bjs.data("polsourceobservationid"));
            var PolSourceObservationIssueID: number = parseInt($bjs.data("polsourceobservationissueid"));

            var $elem: JQuery;
            $(".jbPolSourceEditIssue").each((ind: number, elem: Element) => {
                if (parseInt($(elem).data("issueordinal")) == this.IssueOrdinal) {
                    $elem = $(elem);
                }
            });

            var command: string = "PolSource/PolSourceIssueDeleteJSON";
            $.post(cssp.BaseURL + command, {
                PolSourceObservationID: PolSourceObservationIssueID,
            }).done((ret) => {
                if (ret) {
                    cssp.Dialog.ShowDialogError(ret);
                }
                else {
                    var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                    cssp.PolSourceSite.PolSourceEditIssue($elem);
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public PolSourceIssueListReload: Function = (PolSourceObservationID: number, IssueOrdinal: number) => {
            var command: string = "PolSource/_polSourceIssueList";
            $.get(cssp.BaseURL + command, {
                PolSourceObservationID: PolSourceObservationID,
                IssueOrdinal: IssueOrdinal,
            }).done((ret) => {
                if (ret) {
                    $(".PolSourceIssueListTopDiv").html(ret);
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public PolSourceObservationChangeDate: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $("#PolSourceObservationAddOrModifyForm").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $("#PolSourceObservationAddOrModifyForm").removeClass("hidden").addClass("hidden");
            }
        };
        public PolSourceObservationCopy: Function = ($bjs: JQuery): void => {
            var PolSourceObservationID: number = parseInt($bjs.data("polsourceobservationid"));
            var IssueOrdinal: number = 0;
            $(".PolSourceIssueListTopDiv").find(".jbPolSourceEditIssue").each((ind: number, elem: Element) => {
                if ($(elem).hasClass("btn-success")) {
                    IssueOrdinal = parseInt($(elem).data("issueordinal"));
                }
            });
            var command: string = "PolSource/PolSourceObservationCopyJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceObservationID: PolSourceObservationID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                        cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varCopied"));
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };

        public PolSourceObservationListReload: Function = (PolSourceSiteTVItemID: number, $elem: JQuery) => {
            var command: string = "PolSource/_polSourceObservationList";
            $(".PolSourceSiteTopDiv").find(".PolSourceObservationListDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
            $.get(cssp.BaseURL + command, {
                PolSourceSiteTVItemID: PolSourceSiteTVItemID,
            }).done((ret) => {
                if (ret) {
                    $("#PolSourceSiteDiv").html(ret);

                    try {
                        cssp.PolSourceSite.PolSourceEditIssue($elem);
                    } catch (e) {
                        // nothing
                    }
                }
                else {
                    cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public PolSourceObservationEditAskToSave: Function = ($bjs: JQuery): void => {
            let OldYear: string = $bjs.closest("form").find("#ObsDateYear").text();
            let OldMonth: string = $bjs.closest("form").find("#ObsDateMonth").text();
            let OldDay: string = $bjs.closest("form").find("#ObsDateDay").text();

            let NewYear: string = $bjs.closest("form").find("select[name='ObsYear']").val();
            let NewMonth: string = $bjs.closest("form").find("select[name='ObsMonth']").val();
            let NewDay: string = $bjs.closest("form").find("select[name='ObsDay']").val();

            if (OldYear == NewYear && OldMonth == NewMonth && OldDay == NewDay) {
                cssp.PolSourceSite.PolSourceObservationEditSave($bjs);
                return;
            }

            let PolObservationMessageText: string = $bjs.closest("form").find("#AreYouSureYouDidNotWantToMakeACopyOfTheObservation").text() + "\r\n" + $bjs.closest("form").find("#AreYouSureYouWantToChangeDateOfCurrentObservation").text();
            cssp.Dialog.ShowDialogAreYouSureNoDelete(PolObservationMessageText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSite.SetDialogEventsEditSave", $bjs);
        };
        public SetDialogEventsEditSave: Function = ($bjs: JQuery): void => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    cssp.PolSourceSite.PolSourceObservationEditSave($bjs);
                });
            });
        };
    public PolSourceObservationEditSave: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $("#PolSourceObservationAddOrModifyForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("#PolSourceObservationAddOrModifyForm", "PolSourceObservationTopDiv");
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
                            var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                            cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public PolSourceSiteShowHideOnMap: Function = (): void => {
            if ($(".jbPolSourceSiteShowHideOnMap").hasClass("btn-default")) {
                var TVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
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
        public PolSourceSiteActiveOnly: Function = ($bjs: JQuery): void => {
            cssp.Dialog.ShowDialogMessage("Not Implemented yet");
        };
        public PolSourceSiteAddCancel: Function = ($bjs: JQuery): void => {
            $(".jbPolSourceSiteAddShowHide").trigger("click");
        };
        public PolSourceSiteModifyCancel: Function = ($bjs: JQuery): void => {
            $bjs.closest("li").find(".jbPolSourceSiteModifyShowHide").trigger("click");
            $(".jbPolSourceSiteEdit").trigger("click");
        };
        public PolSourceSiteAddOrModifyShowHide: Function = ($bjs: JQuery): void => {
            var ParentTVItemID: number = 0;
            var PolSourceSiteTVItemID: number = 0;
            var ShouldOpen: boolean = $bjs.hasClass("btn-default");

            var $tabContent: JQuery = $bjs.closest(".tab-content");

            $tabContent.find(".TVItemAdd").html("");
            $tabContent.find(".TVItemModify").html("");
            $(".jbPolSourceSiteAddShowHide").removeClass("btn-success").addClass("btn-default");
            $(".jbPolSourceSiteModifyShowHide").removeClass("btn-success").addClass("btn-default");

            var $TVItemEdit: JQuery = $tabContent.find(".TVItemAdd");

            var $ViewDiv: JQuery = $bjs.closest("#ViewDiv");
            if ($ViewDiv)
                ParentTVItemID = $ViewDiv.data("tvitemid");

            var $ParentLi: JQuery = $bjs.closest("li");
            if (!$bjs.hasClass("jbPolSourceSiteAddShowHide")) {
                if ($ParentLi.length > 0) {
                    PolSourceSiteTVItemID = parseInt($ParentLi.data("tvitemid"));
                    $TVItemEdit = $ParentLi.find(".TVItemModify");
                }
            }
            if (ShouldOpen) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                var command: string = "PolSource/_polSourceSiteAddOrModify";
                $TVItemEdit.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                $.get(cssp.BaseURL + command, {
                    ParentTVItemID: ParentTVItemID,
                    PolSourceSiteTVItemID: PolSourceSiteTVItemID,
                }).done((ret) => {
                    if (ret) {
                        $TVItemEdit.html(ret);
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
                $TVItemEdit.html("");
            }
        };
        public PolSourceSiteEdit: Function = ($bjs: JQuery): void => {
            var ParentTVItemID: number = 0;
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                var PolSourceSiteTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                cssp.PolSourceSite.PolSourceObservationListReload(PolSourceSiteTVItemID, null);
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                cssp.Helper.PageRefresh();
            }
        };
        public PolSourceSiteToggleActive: Function = ($bjs: JQuery): void => {
            var TVItemID: number = parseInt($bjs.data("tvitemid"));
            var IsActiveTxt: string = $bjs.data("isactive");
            var IsNotActiveTxt: string = $bjs.data("isnotactive");
            var WorkingTxt: string = $bjs.data("working");
            var bjsText: string = $bjs.text().trim();
            var SetActive: boolean = false;

            if (bjsText === IsActiveTxt) {
                SetActive = true;
            }

            $bjs.text(WorkingTxt);
            var command: string = "PolSource/PolSourceSiteSetActiveJSON";
            $.post(cssp.BaseURL + command, {
                TVItemID: TVItemID,
                SetActive: (SetActive === true ? false : true),
            }).done((ret) => {
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
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public PolSourceShowHideOnMap: Function = (): void => {
            if (cssp.GoogleMap.CrossVisible) {
                cssp.GoogleMap.DrawObjects();
                $(".jbPolSourceSiteShowHideOnMap").removeClass("btn-success").addClass("btn-default");
            }
            else {
                var TVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                if (TVItemID != 0) {
                    cssp.GoogleMap.DrawCross(TVItemID);
                    $(".jbPolSourceSiteShowHideOnMap").removeClass("btn-default").addClass("btn-success");
                }
            }
        };
        public ShowHideEditButtons: Function = ($bjs: JQuery): void => {
            var $tabContent: JQuery = $bjs.closest(".tab-content");
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
} 