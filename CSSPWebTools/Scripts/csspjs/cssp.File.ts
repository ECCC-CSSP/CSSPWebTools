module CSSP {
    export class File {
        // Variables 
        public FormUploadName = "#FileUploadForm";
        public FormEditName = "#FileEditForm";

        // Constructors
        constructor() {
        }
        public ExportToArcGIS: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let ProvinceTVItemIDText: string = "";

            $("select[name='Province']").find(":selected").each((ind: number, elem: Element) => {
                ProvinceTVItemIDText = ProvinceTVItemIDText + "_" + $(elem).val();
            });
            let Active: boolean = $("input[name='Active']").is(":checked");
            let Inactive: boolean = $("input[name='Inactive']").is(":checked");
            let DocType: string = $bjs.data("doctype");

            let command: string = "File/CreateArcGISDocumentJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
                    ProvinceTVItemIDText: ProvinceTVItemIDText,
                    Active: Active,
                    Inactive: Inactive,
                    DocType: DocType,
                })
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
         };
        public AskToDelete: Function = ($bjs: JQuery): void => {
            let TVText: string = $bjs.closest(".TVFileItem").find(".TVText").text();
            cssp.Dialog.ShowDialogAreYouSure(TVText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.File.SetDialogEvents", $bjs);
        };
        public AskToRefreshPage: Function = ($bjs: JQuery): void => {
            let TVText: string = $bjs.closest("#FileUploadForm").find("input[name='UploadFileName']").val();
            cssp.Dialog.ShowDialogSuccess(TVText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicClose"], 5, "cssp.File.SetDialogEvents2", $bjs);
        };
        public FileDownload: Function = ($bjs: JQuery): void => {
            let TVFileTVItemID: string = $bjs.data("tvfiletvitemid");
            window.document.location.href = cssp.BaseURL + "File/FileDownload?TVFileTVItemID=" + TVFileTVItemID;
        };
        public FileEditCancel: Function = ($bjs: JQuery): void => {
            $bjs.closest(".TVFileItem").find(".jbFileEditShowHide").trigger("click");
        };
        public FileEditSave: Function = ($ajb: JQuery): void => {
            let $form: JQuery = $ajb.closest(cssp.File.FormEditName).first();
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.File.FormEditName, "FileDiv");
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
                        if (ret.Error) {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
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
        public FileEditShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.closest(".TVFileItem").find(".FileEdit").children().length == 0) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let TVFileTVItemID: string = $bjs.data("tvfiletvitemid");
                let command: string = "File/_fileEdit";
                $.get(cssp.BaseURL + command, {
                    TVFileTVItemID: TVFileTVItemID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".TVFileItem").find(".FileEdit").html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithError($.validator.format(cssp.GetHTMLVariable("#FileVariables", "var_fileEditReturnedEmpty")));
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.closest(".TVFileItem").find(".FileEdit").html("");
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public CreateDocumentFromTemplate: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($bjs.data("tvitemid"));
            let DocTemplateID: number = parseInt($bjs.data("doctemplateid"));

            let command: string = "File/CreateDocumentFromTemplateJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
                    DocTemplateID: DocTemplateID
                })
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
        };
        public CreateDocumentShowHide: Function = ($bjs: JQuery): any => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let TVItemID: string = $bjs.closest("#ViewDiv").data("tvitemid");
                let command: string = "File/_createDocument";
                $.get(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                }).done((ret) => {
                    $("#FileDiv").find(".CreateDocument").html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $("#FileDiv").find(".CreateDocument").html("");
            }
        };
        public CreateDocxPDF: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            let TVFileTVItemID: number = parseInt($bjs.data("tvfiletvitemid"));

            let command: string = "File/CreateDocxPDFJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
                    TVFileTVItemID: TVFileTVItemID,
                })
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
        };
        public CreateXlsxPDF: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            let TVFileTVItemID: number = parseInt($bjs.data("tvfiletvitemid"));

            let command: string = "File/CreateXlsxPDFJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
                    TVFileTVItemID: TVFileTVItemID,
                })
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
        };
        public FileImportShowHide: Function = ($bjs: JQuery): any => {
            if ($("#FileDiv").find(".FileImport").children().length == 0) {
                $("#FileDiv").find(".FileImport").removeClass("hidden");
                $bjs.removeClass("btn-default").addClass("btn-success");
                if ($("#FileDiv").find(".FileImport").children().length == 0) {
                    let ParentTVItemID: string = $bjs.closest("#ViewDiv").data("tvitemid");
                    let command: string = "File/_fileImport";
                    $.get(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                    }).done((ret) => {
                        $("#FileDiv").find(".FileImport").html(ret);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            }
            else {
                $("#FileDiv").find(".FileImport").html("");
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public FileUpload: Function = (): any => {
            var $form: JQuery = $(cssp.File.FormUploadName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.File.FormUploadName, "FileDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                if (cssp.CheckInputWithNumbers()) {
                    cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                    return;
                }
                let options: JQueryFormOptions = {
                    url: cssp.BaseURL + $form.attr("action"),
                    target: $form.find(".FileImportRes"),
                    success: () => {
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
        public FileUploadCancel: Function = (): void => {
            $(".jbFileImportShowHide").trigger("click");
        };
        public Init: Function = (): void => {
            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public InitEdit: Function = (): void => {
            $(cssp.File.FormEditName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
            $(document).on("change", "select[name='FilePurpose']", (evt: Event) => {
                if ($(evt.target).val() == $(".PictureEnum").text()) {
                    $(".FromWaterDiv").removeClass("hidden");
                }
                else {
                    $(".FromWaterDiv").removeClass("hidden").addClass("hidden");
                }
            });

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public InitUpload: Function = (): void => {
            $(cssp.File.FormUploadName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
            $(document).on("click", "input[name='KeepFileName']", (evt: Event) => {
                if ($(evt.target).is(":checked")) {
                    $(".SaveAsFileNameDiv").removeClass("hidden").addClass("hidden");
                }
                else {
                    $(".SaveAsFileNameDiv").removeClass("hidden");
                }
            });

            $(document).off("change", "select[name='FilePurpose']");
            $(document).on("change", "select[name='FilePurpose']", (evt: Event) => {
                if ($(evt.target).val() == $(".PictureEnum").text()) {
                    $(".FromWaterDiv").removeClass("hidden");
                }
                else {
                    $(".FromWaterDiv").removeClass("hidden").addClass("hidden");
                }
            });

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public GetParentLatLng: Function = ($ajs: JQuery): void => {
            let $FormImportFile = $ajs.closest("#FileUploadForm");

            $FormImportFile.find("input[name=Lat]").val("Searching...");
            $FormImportFile.find("input[name=Lng]").val("Searching...");

            let TVItemID: string = $ajs.closest("#ViewDiv").data("tvitemid");
            let command: string = "File/GetParentLatLng";
            $.post(cssp.BaseURL + command, {
                TVItemID: TVItemID,
            }).done((ret) => {
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
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public OpenGoogleEarth: Function = ($ajs: JQuery): void => {
            window.document.location.href = cssp.BaseURL + "File/OpenGoogleEarth";
        };
        public SetDialogEvents: Function = ($bjs: JQuery) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var TVFileTVItemID: number = parseInt($bjs.data("tvfiletvitemid"));
                    var command: string = "File/FileRemoveJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            TVFileTVItemID: TVFileTVItemID,
                        }).done((ret) => {
                            if (ret == "") {
                                cssp.Dialog.ShowDialogSuccess($bjs.closest(".TVFileItem").find(".TVText").text());                               
                                $bjs.closest(".TVFileItem").html("");
                            }
                            else {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
        public SetDialogEvents2: Function = ($bjs: JQuery) => {
            $("#DialogBasicClose").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    cssp.Helper.PageRefresh();
                });
            });
        };
        public ShowHideEditButtons: Function = ($bjs: JQuery): void => {
            $(".FileImport").html("");
            $(".FileEdit").html("");
            let $tabContent: JQuery = $bjs.closest(".tab-content");
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
} 