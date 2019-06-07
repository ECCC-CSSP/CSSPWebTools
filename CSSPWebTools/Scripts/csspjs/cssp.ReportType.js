var CSSP;
(function (CSSP) {
    var ReportType = (function () {
        // Variables
        // Constructor
        function ReportType() {
            // Function
            this.AskToRemoveReportSection = function ($bjs) {
                var ReportSectionName = $bjs.closest(".ReportSectionTop").find(".ReportSectionName").text();
                cssp.Dialog.ShowDialogAreYouSure(ReportSectionName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.ReportType.SetDialogEvents", $bjs);
            };
            this.AskToRemoveReportSectionYear = function ($bjs) {
                var ReportSectionName = $bjs.closest(".ReportSectionTop").find(".ReportSectionName").text();
                var Year = parseInt($bjs.data("year"));
                cssp.Dialog.ShowDialogAreYouSure(ReportSectionName + "(" + Year + ")");
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.ReportType.SetDialogEventsYear", $bjs);
            };
            this.ReportSectionAddChild = function ($bjs) {
                var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                var command = "ReportType/ReportSectionAddChildJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionAddNewYearForTVItemID = function ($bjs) {
                var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                var TVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var Year = parseInt($bjs.closest(".ReportSectionTop").find("select[name='ReportSectionYear']").val());
                var command = "ReportType/ReportSectionAddNewYearForTVItemIDJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                    TVItemID: TVItemID,
                    Year: Year,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionAddSibling = function ($bjs) {
                var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                var command = "ReportType/ReportSectionAddSiblingJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionAddTop = function ($bjs) {
                var ReportTypeID = parseInt($bjs.closest(".ReportTypeItemTop").data("reporttypeid"));
                var command = "ReportType/ReportSectionAddTopJSON";
                $.post(cssp.BaseURL + command, {
                    ReportTypeID: ReportTypeID,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionChangeIsStatic = function ($bjs, IsStatic) {
                var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                var command = "ReportType/ReportSectionChangeIsStaticJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                    IsStatic: IsStatic,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionConvertToSubSection = function ($bjs) {
                var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                var command = "ReportType/ReportSectionConvertToSubSectionJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionConvertToParent = function ($bjs) {
                var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                var command = "ReportType/ReportSectionConvertToParentJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionOrdinalDown = function ($bjs) {
                var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                var command = "ReportType/ReportSectionOrdinalDownJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionOrdinalUp = function ($bjs) {
                var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                var command = "ReportType/ReportSectionOrdinalUpJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ReportType.ReportSectionReloadList($bjs);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionNameModify = function ($bjs) {
                var $form = $bjs.closest("form.ReportSectionNameForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportSectionNameForm", "Form tag");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command_1 = $form.attr("action");
                    $.post(cssp.BaseURL + command_1, $form.serializeArray())
                        .done(function (ret) {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.ReportType.ReportSectionReloadList($bjs);
                            tinymce.remove();
                            $(".jbReportSectionShowOrHideForm").each(function (ind, elem) {
                                if ($(elem).hasClass("btn-success")) {
                                    $(elem).trigger("click");
                                }
                            });
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
            };
            this.ReportSectionTextModify = function (tinymce) {
                var content = tinymce.activeEditor.getContent();
                var $form = $(tinymce.activeEditor.targetElm).closest("form");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportSectionTextForm", "Form tag");
                    return;
                }
                var ReportSectionID = parseInt($form.find("input[name='ReportSectionID']").val());
                var command = "ReportType/ReportSectionTextModifyJSON";
                $.post(cssp.BaseURL + command, {
                    ReportSectionID: ReportSectionID,
                    ReportSectionText: content,
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        //cssp.ReportType.ReportSectionReloadList($bjs);
                        //tinymce.remove();
                        //$(".jbReportSectionShowOrHideForm").each((ind: number, elem: Element) => {
                        //    if ($(elem).hasClass("btn-success")) {
                        //        $(elem).trigger("click");
                        //    }
                        //});
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportSectionListShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var sectionTop$ = $bjs.closest(".ReportTypeItemTop").find(".ReportSectionListTopDiv");
                    sectionTop$.removeClass("hidden");
                    cssp.ReportType.ReportSectionReloadList($bjs);
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    var sectionTop$ = $bjs.closest(".ReportTypeItemTop").find(".ReportSectionListTopDiv");
                    sectionTop$.removeClass("hidden").addClass("hidden");
                }
            };
            this.ReportSectionShowOrHideForm = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                    var TVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                    var formDiv$_1 = $bjs.closest(".ReportSectionTop").find(".ReportSectionForm").eq(0);
                    formDiv$_1.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    var command_2 = "ReportType/_reportSectionForm";
                    $.get(cssp.BaseURL + command_2, {
                        ReportSectionID: ReportSectionID,
                        TVItemID: TVItemID,
                    }).done(function (ret) {
                        formDiv$_1.html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_2);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    var formDiv$ = $bjs.closest(".ReportSectionTop").find(".ReportSectionForm").eq(0);
                    formDiv$.html("");
                }
            };
            this.ReportSectionShowOrHideNameForm = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".ReportSectionTop").find(".ReportSectionNameForm").eq(0).removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".ReportSectionTop").find(".ReportSectionNameForm").eq(0).removeClass("hidden").addClass("hidden");
                }
            };
            this.ReportSectionReloadList = function ($bjs) {
                var ReportTypeID = parseInt($bjs.closest(".ReportTypeItemTop").data("reporttypeid"));
                var sectionsList$ = $bjs.closest(".ReportTypeItemTop").find(".ReportSectionListDiv");
                var sectionTop$ = $bjs.closest(".ReportTypeItemTop").find(".ReportSectionListTopDiv");
                sectionTop$.removeClass("hidden");
                sectionsList$.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                var command = "ReportType/_reportSectionList";
                $.get(cssp.BaseURL + command, {
                    ReportTypeID: ReportTypeID,
                }).done(function (ret) {
                    sectionsList$.html(ret);
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportTypeAddOrModify = function ($bjs) {
                var IsAdd = $bjs.data("addormodify") == "add" ? true : false;
                var $form = $bjs.closest("form.ReportTypeForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportTypeForm", "Form tag");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command_3 = $form.attr("action");
                    $.post(cssp.BaseURL + command_3, $form.serializeArray())
                        .done(function (ret) {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            if (IsAdd) {
                                cssp.Dialog.ShowDialogSuccess("Added successfully");
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess("Modified successfully");
                                //cssp.ReportType.ReportTypeReload($bjs);
                            }
                            cssp.Helper.PageRefresh();
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_3);
                    });
                }
            };
            this.ReportTypeDetailShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var ReportTypeID = parseInt($bjs.closest(".ReportTypeItemTop").data("reporttypeid"));
                    var TVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                    var docList$_1 = $bjs.closest(".ReportTypeItemTop").find(".DocumentListDiv");
                    var docGenerate$_1 = $bjs.closest(".ReportTypeItemTop").find(".DocumentGenerateDiv");
                    var paramTop$ = $bjs.closest(".ReportTypeItemTop").find(".ParametersTop");
                    paramTop$.removeClass("hidden");
                    docList$_1.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    docGenerate$_1.html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    var command1_1 = "Document/_documentList";
                    $.get(cssp.BaseURL + command1_1, {
                        ReportTypeID: ReportTypeID,
                        TVItemID: TVItemID
                    }).done(function (ret) {
                        docList$_1.html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command1_1);
                    });
                    var command2_1 = "Document/_documentParameters";
                    $.get(cssp.BaseURL + command2_1, {
                        ReportTypeID: ReportTypeID,
                        TVItemID: TVItemID,
                        TVFileTVItemID: 0
                    }).done(function (ret) {
                        docGenerate$_1.html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command2_1);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    var paramTop$ = $bjs.closest(".ReportTypeItemTop").find(".ParametersTop");
                    paramTop$.removeClass("hidden").addClass("hidden");
                }
            };
            this.ReportTypeEdit = function ($bjs) {
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
            this.SetDialogEvents = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var ReportSectionID = parseInt($bjs.closest(".ReportSectionTop").data("reportsectionid"));
                        var command = "ReportType/ReportSectionDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            ReportSectionID: ReportSectionID,
                        }).done(function (ret) {
                            if (ret != "") {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.ReportType.ReportSectionReloadList($bjs);
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.SetDialogEventsYear = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var ReportSectionID = parseInt($bjs.data("reportsectionid"));
                        var command = "ReportType/ReportSectionDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            ReportSectionID: ReportSectionID,
                        }).done(function (ret) {
                            if (ret != "") {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.ReportType.ReportSectionReloadList($bjs);
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.ShowParametersOfFile = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    var ReportTypeID = parseInt($bjs.data("reporttypeid"));
                    var TVItemID = parseInt($bjs.data("tvitemid"));
                    var TVFileTVItemID = parseInt($bjs.data("tvfiletvitemid"));
                    var command_4 = "Document/_documentParameters";
                    $.get(cssp.BaseURL + command_4, {
                        ReportTypeID: ReportTypeID,
                        TVItemID: TVItemID,
                        TVFileTVItemID: TVFileTVItemID,
                    })
                        .done(function (ret) {
                        $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html(ret);
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_4);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html("");
                }
            };
            this.ReportTypeDelete = function ($bjs) {
                var ReportTypeID = parseInt($bjs.data("reporttypeid"));
                var command = "ReportType/ReportTypeDeleteJSON";
                $.post(cssp.BaseURL + command, { ReportTypeID: ReportTypeID })
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
            };
            this.TinymceInit = function () {
                tinymce.init({
                    selector: ".ReportSectionTextArea",
                    height: 200,
                    menubar: true,
                    plugins: "fullpage searchreplace autolink visualblocks visualchars fullscreen table charmap hr insertdatetime advlist lists textcolor contextmenu colorpicker textpattern help save",
                    toolbar: "save undo redo | formatselect | bold italic strikethrough forecolor backcolor alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
                    spellchecker_language: 'en',
                    spellchecker_dialog: true,
                    save_onsavecallback: function () {
                        cssp.ReportType.ReportSectionTextModify(tinymce);
                    }
                });
            };
        }
        return ReportType;
    }());
    CSSP.ReportType = ReportType;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.ReportType.js.map