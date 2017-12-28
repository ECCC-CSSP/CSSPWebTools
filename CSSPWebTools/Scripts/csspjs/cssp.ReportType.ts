declare var tinymce;

module CSSP {
    export class ReportType {
        // Variables

        // Constructor
        constructor() {
        }

        // Function
        public AskToRemoveReportSection: Function = ($bjs: JQuery): void => {
            let ReportSectionName: string = $bjs.closest(".ReportSectionTop").find(".ReportSectionName").text();
            cssp.Dialog.ShowDialogAreYouSure(ReportSectionName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.ReportType.SetDialogEvents", $bjs);
        };
        public AskToRemoveReportSectionYear: Function = ($bjs: JQuery): void => {
            let ReportSectionName: string = $bjs.closest(".ReportSectionTop").find(".ReportSectionName").text();
            let Year: number = parseInt($bjs.data("year"));
            cssp.Dialog.ShowDialogAreYouSure(ReportSectionName + "(" + Year + ")");
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.ReportType.SetDialogEventsYear", $bjs);
        };
        public ReportSectionAddChild: Function = ($bjs: JQuery): void => {
            let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));

            let command: string = "ReportType/ReportSectionAddChildJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportSectionID: ReportSectionID,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ReportSectionAddNewYearForTVItemID: Function = ($bjs: JQuery): void => {
            let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
            let TVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            let Year: number = parseInt($bjs.closest(".ReportSectionTop").find("select[name='ReportSectionYear']").val());

            let command: string = "ReportType/ReportSectionAddNewYearForTVItemIDJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportSectionID: ReportSectionID,
                    TVItemID: TVItemID,
                    Year: Year,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
     public ReportSectionAddSibling: Function = ($bjs: JQuery): void => {
            let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));

            let command: string = "ReportType/ReportSectionAddSiblingJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportSectionID: ReportSectionID,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ReportSectionAddTop: Function = ($bjs: JQuery): void => {
            let ReportTypeID: number = parseInt($bjs.closest(".ReportTypeItemTop").data("reporttypeid"));

            let command: string = "ReportType/ReportSectionAddTopJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportTypeID: ReportTypeID,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
        public ReportSectionChangeIsStatic: Function = ($bjs: JQuery, IsStatic: boolean): void => {
            let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));

            let command: string = "ReportType/ReportSectionChangeIsStaticJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportSectionID: ReportSectionID,
                    IsStatic: IsStatic,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
        public ReportSectionConvertToSubSection: Function = ($bjs: JQuery): void => {
            let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));

            let command: string = "ReportType/ReportSectionConvertToSubSectionJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportSectionID: ReportSectionID,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
        public ReportSectionConvertToParent: Function = ($bjs: JQuery): void => {
            let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));

            let command: string = "ReportType/ReportSectionConvertToParentJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportSectionID: ReportSectionID,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
        public ReportSectionOrdinalDown: Function = ($bjs: JQuery): void => {
            let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));

            let command: string = "ReportType/ReportSectionOrdinalDownJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportSectionID: ReportSectionID,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
        public ReportSectionOrdinalUp: Function = ($bjs: JQuery): void => {
            let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));

            let command: string = "ReportType/ReportSectionOrdinalUpJSON";
            $.post(cssp.BaseURL + command,
                {
                    ReportSectionID: ReportSectionID,
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
        public ReportSectionNameModify: Function = ($bjs: JQuery): void => {
            tinymce.triggerSave();
            let $form: JQuery = $bjs.closest("form.ReportSectionNameForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportSectionNameForm", "Form tag");
                return;
            }

            if (!$form.valid || $form.valid()) {
                let command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.ReportType.ReportSectionReloadList($bjs);
                            tinymce.remove();
                            $(".jbReportSectionShowOrHideForm").each((ind: number, elem: Element) => {
                                if ($(elem).hasClass("btn-success")) {
                                    $(elem).trigger("click");
                                }
                            });
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public ReportSectionTextModify: Function = ($bjs: JQuery): void => {
            tinymce.triggerSave();
            tinymce.triggerSave();
            tinymce.triggerSave();
            let $form: JQuery = $bjs.closest("form.ReportSectionTextForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportSectionTextForm", "Form tag");
                return;
            }

            if (!$form.valid || $form.valid()) {
                let command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.ReportType.ReportSectionReloadList($bjs);
                            tinymce.remove();
                            $(".jbReportSectionShowOrHideForm").each((ind: number, elem: Element) => {
                                if ($(elem).hasClass("btn-success")) {
                                    $(elem).trigger("click");
                                }
                            });
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public ReportSectionListShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let sectionTop$ = $bjs.closest(".ReportTypeItemTop").find(".ReportSectionListTopDiv");

                sectionTop$.removeClass("hidden");
                cssp.ReportType.ReportSectionReloadList($bjs);
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                let sectionTop$ = $bjs.closest(".ReportTypeItemTop").find(".ReportSectionListTopDiv");

                sectionTop$.removeClass("hidden").addClass("hidden");
            }
        };
        public ReportSectionShowOrHideForm: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                let TVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                let formDiv$: JQuery = $bjs.closest(".ReportSectionTop").find(".ReportSectionForm").eq(0);

                formDiv$.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));

                let command: string = "ReportType/_reportSectionForm";
                $.get(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                    TVItemID: TVItemID,
                }).done((ret) => {
                    formDiv$.html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                let formDiv$: JQuery = $bjs.closest(".ReportSectionTop").find(".ReportSectionForm").eq(0);

                formDiv$.html(""); 
            }
        };
        public ReportSectionShowOrHideNameForm: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".ReportSectionTop").find(".ReportSectionNameForm").eq(0).removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".ReportSectionTop").find(".ReportSectionNameForm").eq(0).removeClass("hidden").addClass("hidden");
            }
        };
        public ReportSectionReloadList: Function = ($bjs: JQuery): void => {
            let ReportTypeID: number = parseInt($bjs.closest(".ReportTypeItemTop").data("reporttypeid"));
            let sectionsList$ = $bjs.closest(".ReportTypeItemTop").find(".ReportSectionListDiv");
            let sectionTop$ = $bjs.closest(".ReportTypeItemTop").find(".ReportSectionListTopDiv");

            sectionTop$.removeClass("hidden");

            sectionsList$.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));

            let command: string = "ReportType/_reportSectionList";
            $.get(cssp.BaseURL + command, {
                ReportTypeID: ReportTypeID,
            }).done((ret) => {
                sectionsList$.html(ret);
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public ReportTypeAddOrModify: Function = ($bjs: JQuery): void => {
            let IsAdd: boolean = $bjs.data("addormodify") == "add" ? true : false;
            let $form: JQuery = $bjs.closest("form.ReportTypeForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportTypeForm", "Form tag");
                return;
            }

            if (!$form.valid || $form.valid()) {
                let command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
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
                                cssp.ReportType.ReportTypeRelaod($bjs);
                            }
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public ReportTypeDetailShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let ReportTypeID: number = parseInt($bjs.closest(".ReportTypeItemTop").data("reporttypeid"));
                let TVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                let docList$ = $bjs.closest(".ReportTypeItemTop").find(".DocumentListDiv");
                let docGenerate$ = $bjs.closest(".ReportTypeItemTop").find(".DocumentGenerateDiv");
                let paramTop$ = $bjs.closest(".ReportTypeItemTop").find(".ParametersTop");

                paramTop$.removeClass("hidden");

                docList$.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                docGenerate$.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));

                let command1: string = "Document/_documentList";
                $.get(cssp.BaseURL + command1, {
                    ReportTypeID: ReportTypeID,
                    TVItemID: TVItemID
                }).done((ret) => {
                    docList$.html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command1);
                });

                let command2: string = "Document/_documentParameters";
                $.get(cssp.BaseURL + command2, {
                    ReportTypeID: ReportTypeID,
                    TVItemID: TVItemID,
                    TVFileTVItemID: 0
                }).done((ret) => {
                    docGenerate$.html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command2);
                });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                let paramTop$ = $bjs.closest(".ReportTypeItemTop").find(".ParametersTop");

                paramTop$.removeClass("hidden").addClass("hidden");
            }
        };
        public ReportTypeEdit: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".ReportTypeItemTop").find(".ReportTypeEdit").removeClass("hidden");
                $bjs.closest(".ReportTypeItemTop").find(".ParametersTop").removeClass("hidden").addClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".ReportTypeItemTop").find(".ReportTypeEdit").removeClass("hidden").addClass("hidden");
                $bjs.closest(".ReportTypeItemTop").find(".ParametersTop").removeClass("hidden");
            }
        };
        public SetDialogEvents: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    let ReportSectionID: number = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));

                    let command: string = "ReportType/ReportSectionDeleteJSON";
                    $.post(cssp.BaseURL + command, {
                        ReportSectionID: ReportSectionID,
                    }).done((ret) => {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.ReportType.ReportSectionReloadList($bjs);
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                });
            });
        };
        public SetDialogEventsYear: Function = ($bjs) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    let ReportSectionID: number = parseInt($bjs.data("reportsectionid"));

                    let command: string = "ReportType/ReportSectionDeleteJSON";
                    $.post(cssp.BaseURL + command, {
                        ReportSectionID: ReportSectionID,
                    }).done((ret) => {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.ReportType.ReportSectionReloadList($bjs);
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                });
            });
        };
        public ShowParametersOfFile: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                let ReportTypeID: number = parseInt($bjs.data("reporttypeid"));
                let TVItemID: number = parseInt($bjs.data("tvitemid"));
                let TVFileTVItemID: number = parseInt($bjs.data("tvfiletvitemid"));
                let command: string = "Document/_documentParameters";
                $.get(cssp.BaseURL + command,
                    {
                        ReportTypeID: ReportTypeID,
                        TVItemID: TVItemID,
                        TVFileTVItemID: TVFileTVItemID,
                    })
                    .done((ret) => {
                        $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html(ret);
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html("");
            }
        };
        public ReportTypeDelete: Function = ($bjs: JQuery): void => {
            let ReportTypeID: number = parseInt($bjs.data("reporttypeid"));

            let command: string = "ReportType/ReportTypeDeleteJSON";
            $.post(cssp.BaseURL + command, { ReportTypeID: ReportTypeID })
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
                });
        }; public ReportTypeRelaod: Function = ($bjs: JQuery): void => {
            let TVType: number = parseInt($bjs.data("tvtype"));

            let command: string = "ReportType/_reportTypeList";
            $.get(cssp.BaseURL + command,
                {
                    TVType: TVType,
                })
                .done((ret) => {
                    $bjs.closest(".ReportTypeListTopDiv").html(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
    }
}