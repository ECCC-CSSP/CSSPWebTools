var CSSP;
(function (CSSP) {
    var File = (function () {
        // Constructors
        function File() {
            // Variables 
            this.FormUploadName = "#FileUploadForm";
            this.FormEditName = "#FileEditForm";
            this.AskToDelete = function ($bjs) {
                var TVText = $bjs.closest(".TVFileItem").find(".TVText").text();
                cssp.Dialog.ShowDialogAreYouSure(TVText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.File.SetDialogEvents", $bjs);
            };
            this.AskToRefreshPage = function ($bjs) {
                var TVText = $bjs.closest("#FileUploadForm").find("input[name='UploadFileName']").val();
                cssp.Dialog.ShowDialogSuccess(TVText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicClose"], 5, "cssp.File.SetDialogEvents2", $bjs);
            };
            this.FileDownload = function ($bjs) {
                var TVFileTVItemID = $bjs.data("tvfiletvitemid");
                window.document.location.href = cssp.BaseURL + "File/FileDownload?TVFileTVItemID=" + TVFileTVItemID;
            };
            this.FileEditCancel = function ($bjs) {
                $bjs.closest(".TVFileItem").find(".jbFileEditShowHide").trigger("click");
            };
            this.FileEditSave = function ($ajb) {
                var $form = $ajb.closest(cssp.File.FormEditName).first();
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.File.FormEditName, "FileDiv");
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
                        if (ret.Error) {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
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
            this.FileEditShowHide = function ($bjs) {
                if ($bjs.closest(".TVFileItem").find(".FileEdit").children().length == 0) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var TVFileTVItemID = $bjs.data("tvfiletvitemid");
                    var command = "File/_fileEdit";
                    $.get(cssp.BaseURL + command, {
                        TVFileTVItemID: TVFileTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".TVFileItem").find(".FileEdit").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithError($.validator.format(cssp.GetHTMLVariable("#FileVariables", "var_fileEditReturnedEmpty")));
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $bjs.closest(".TVFileItem").find(".FileEdit").html("");
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.CreateDocumentFromTemplate = function ($bjs) {
                var TVItemID = parseInt($bjs.data("tvitemid"));
                var DocTemplateID = parseInt($bjs.data("doctemplateid"));
                var command = "File/CreateDocumentFromTemplateJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                    DocTemplateID: DocTemplateID
                })
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
            };
            this.CreateDocumentShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var TVItemID = $bjs.closest("#ViewDiv").data("tvitemid");
                    var command = "File/_createDocument";
                    $.get(cssp.BaseURL + command, {
                        TVItemID: TVItemID,
                    }).done(function (ret) {
                        $("#FileDiv").find(".CreateDocument").html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $("#FileDiv").find(".CreateDocument").html("");
                }
            };
            this.CreateDocxPDF = function ($bjs) {
                var TVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var TVFileTVItemID = parseInt($bjs.data("tvfiletvitemid"));
                var command = "File/CreateDocxPDFJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                    TVFileTVItemID: TVFileTVItemID,
                })
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
            };
            this.CreateXlsxPDF = function ($bjs) {
                var TVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var TVFileTVItemID = parseInt($bjs.data("tvfiletvitemid"));
                var command = "File/CreateXlsxPDFJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                    TVFileTVItemID: TVFileTVItemID,
                })
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
            };
            this.FileImportShowHide = function ($bjs) {
                if ($("#FileDiv").find(".FileImport").children().length == 0) {
                    $("#FileDiv").find(".FileImport").removeClass("hidden");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    if ($("#FileDiv").find(".FileImport").children().length == 0) {
                        var ParentTVItemID = $bjs.closest("#ViewDiv").data("tvitemid");
                        var command = "File/_fileImport";
                        $.get(cssp.BaseURL + command, {
                            ParentTVItemID: ParentTVItemID,
                        }).done(function (ret) {
                            $("#FileDiv").find(".FileImport").html(ret);
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    }
                }
                else {
                    $("#FileDiv").find(".FileImport").html("");
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.FileUpload = function () {
                var $form = $(cssp.File.FormUploadName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.File.FormUploadName, "FileDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    if (cssp.CheckInputWithNumbers()) {
                        cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                        return;
                    }
                    var options = {
                        url: cssp.BaseURL + $form.attr("action"),
                        target: $form.find(".FileImportRes"),
                        success: function () {
                            if ($form.find(".FileImportRes").children().length > 0) {
                                cssp.Dialog.ShowDialogErrorWithError($form.find(".FileImportRes").children().text());
                            }
                            else {
                                cssp.File.AskToRefreshPage($(".jbFileUpload").eq(0));
                            }
                        }
                    };
                    $form.ajaxForm(options);
                    $form.ajaxSubmit(options);
                    return false;
                }
            };
            this.FileUploadCancel = function () {
                $(".jbFileImportShowHide").trigger("click");
            };
            this.Init = function () {
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            this.InitEdit = function () {
                $(cssp.File.FormEditName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            FileDescription: {
                                required: true,
                                maxlength: 10000,
                            },
                            SaveAsFileName: {
                                required: true,
                                maxlength: 100,
                            },
                        }
                    });
                });
                $(document).off("change", "select[name='FilePurpose']");
                $(document).on("change", "select[name='FilePurpose']", function (evt) {
                    if ($(evt.target).val() == $(".PictureEnum").text()) {
                        $(".FromWaterDiv").removeClass("hidden");
                    }
                    else {
                        $(".FromWaterDiv").removeClass("hidden").addClass("hidden");
                    }
                });
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            this.InitUpload = function () {
                $(cssp.File.FormUploadName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            FileDescription: {
                                required: true,
                                maxlength: 10000,
                            },
                            UploadFileName: {
                                required: true,
                                maxlength: 250,
                            },
                        }
                    });
                });
                $(document).off("click", "input[name='KeepFileName']");
                $(document).on("click", "input[name='KeepFileName']", function (evt) {
                    if ($(evt.target).is(":checked")) {
                        $(".SaveAsFileNameDiv").removeClass("hidden").addClass("hidden");
                    }
                    else {
                        $(".SaveAsFileNameDiv").removeClass("hidden");
                    }
                });
                $(document).off("change", "select[name='FilePurpose']");
                $(document).on("change", "select[name='FilePurpose']", function (evt) {
                    if ($(evt.target).val() == $(".PictureEnum").text()) {
                        $(".FromWaterDiv").removeClass("hidden");
                    }
                    else {
                        $(".FromWaterDiv").removeClass("hidden").addClass("hidden");
                    }
                });
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            this.GetParentLatLng = function ($ajs) {
                var $FormImportFile = $ajs.closest("#FileUploadForm");
                $FormImportFile.find("input[name=Lat]").val("Searching...");
                $FormImportFile.find("input[name=Lng]").val("Searching...");
                var TVItemID = $ajs.closest("#ViewDiv").data("tvitemid");
                var command = "File/GetParentLatLng";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                }).done(function (ret) {
                    if (ret.Error == "") {
                        if (Globalize.culture.name.substr(0, 2) == "fr") {
                            $FormImportFile.find("input[name=Lat]").val(ret.Lat.toString().replace(".", ","));
                            $FormImportFile.find("input[name=Lng]").val(ret.Lng.toString().replace(".", ","));
                        }
                        else {
                            $FormImportFile.find("input[name=Lat]").val(ret.Lat);
                            $FormImportFile.find("input[name=Lng]").val(ret.Lng);
                        }
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenGoogleEarth = function ($ajs) {
                window.document.location.href = cssp.BaseURL + "File/OpenGoogleEarth";
            };
            this.SetDialogEvents = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var TVFileTVItemID = parseInt($bjs.data("tvfiletvitemid"));
                        var command = "File/FileRemoveJSON";
                        $.post(cssp.BaseURL + command, {
                            TVFileTVItemID: TVFileTVItemID,
                        }).done(function (ret) {
                            if (ret == "") {
                                cssp.Dialog.ShowDialogSuccess($bjs.closest(".TVFileItem").find(".TVText").text());
                                $bjs.closest(".TVFileItem").html("");
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
            this.SetDialogEvents2 = function ($bjs) {
                $("#DialogBasicClose").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        cssp.Helper.PageRefresh();
                    });
                });
            };
            this.ShowHideEditButtons = function ($bjs) {
                $(".FileImport").html("");
                $(".FileEdit").html("");
                var $tabContent = $bjs.closest(".tab-content");
                $tabContent.find(".jbFileImportShowHide").removeClass("hidden");
                $tabContent.find(".jbFileEditShowHide").removeClass("hidden");
                if ($bjs.hasClass("btn-default")) {
                    $tabContent.find(".jbFileShowHideEditButtons").removeClass("btn-default").addClass("btn-success");
                    $tabContent.find(".jbFileImportShowHide").removeClass("hidden");
                    $tabContent.find(".FileEditButtons").removeClass("hidden");
                    cssp.View.ShowMoveTVItemButton($bjs);
                }
                else {
                    $tabContent.find(".jbFileShowHideEditButtons").removeClass("btn-success").addClass("btn-default");
                    $tabContent.find(".jbFileImportShowHide").removeClass("hidden").addClass("hidden");
                    $tabContent.find(".FileEditButtons").removeClass("hidden").addClass("hidden");
                    $tabContent.find(".FileEdit").removeClass("hidden");
                    cssp.TVItem.EditCancel($bjs);
                    cssp.View.HideMoveTVItemButton($bjs);
                }
            };
        }
        return File;
    }());
    CSSP.File = File;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.File.js.map