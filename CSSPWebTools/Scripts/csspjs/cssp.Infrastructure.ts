
module CSSP {
    export class Infrastructure {
        // variables
        public FormName_NameAndMap: string = ".InfrastructureAddOrModify";
        public FormName_EditAll: string = ".InfrastructureEditAllForm";
        public ChildTVItemID: number = 0;

        // constructor
        constructor() {
        }

        // Functions
        public AddOrModifyCancel: Function = ($bjs: JQuery): void => {
            $bjs.closest("#ViewDiv").find(".InfrastructureAdd, .InfrastructureAddOrModify").each((ind: number, elem: Element) => {
                $(elem).html("");
            });
        };
        public AskToDelete: Function = ($bjs: JQuery): void => {
            var TVText: string = $bjs.closest("li").find(".TVText").text();
            cssp.Dialog.ShowDialogAreYouSure(TVText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.Infrastructure.SetDialogEvents", $bjs);
        };
        public FormSubmitEditAll: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $(cssp.Infrastructure.FormName_EditAll);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Infrastructure.FormName_EditAll, "InfrastructureTopDiv");
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
        public FormSubmitNameAndMap: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest(cssp.Infrastructure.FormName_NameAndMap);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Infrastructure.FormName_NameAndMap, "InfrastructureTopDiv or ViewDiv");
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
        public InitAddOrModify: Function = (): void => {
            $(cssp.Infrastructure.FormName_NameAndMap).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            TVItemIDMunicipality: {
                                required: true,
                            },
                            InfrastructureTVItemID: {
                                required: true,
                            },
                            InfrastructureTVText: {
                                required: true,
                                maxlength: 150,
                            },
                            InfrastructureType: {
                                required: true,
                                range: [1, 100],
                            },
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
                        },
                        messages: {
                            InfrastructureType:
                            {
                                range: cssp.GetHTMLVariable("#LayoutVariables", "varPleaseSelectAnItem"),
                            },
                        }
                    });
            });

            $(document).off("change", ".InfrastructureTypeSelect");
            $(document).on("change", ".InfrastructureTypeSelect", (evt: Event) => {
                var $selectInfrastructureType: JQuery = $(evt.target);
                var InfrastructureType: number = parseInt($selectInfrastructureType.val());
                if (InfrastructureType == CSSP.InfrastructureTypeEnum.SeeOther) {
                    $(".SeeOtherTVItemID").removeClass("hidden");
                }
                else {
                    $(".SeeOtherTVItemID").removeClass("hidden").addClass("hidden");
                }
            });

            $(document).off("change", ".SeeOtherTVItemID");
            $(document).on("change", ".SeeOtherTVItemID", (evt: Event) => {
                $("input[name='Lat']").val(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $("input[name='Lng']").val(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var MunicipalityTVItemID: number = parseInt($("select[name='SeeOtherTVItemID']").val());
                var command: string = "Infrastructure/GetMunicipalityLatLngJSON";
                $.get(cssp.BaseURL + command,
                    {
                        MunicipalityTVItemID: MunicipalityTVItemID,
                    }).done((ret) => {
                        $("input[name='Lat']").val(ret.Lat);
                        $("input[name='Lng']").val(ret.Lng);
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            });
        };
        public InitEdit: Function = (): void => {
            $(cssp.Infrastructure.FormName_EditAll).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            InfrastructureTVText: {
                                required: true,
                                maxlength: 150,
                            },
                            InfrastructureType: {
                                required: true,
                                range: [1, 100],
                            },
                            DesignFlow_m3_day: {
                                number: true,
                                range: [0, 100000],
                            },
                            AverageFlow_m3_day: {
                                number: true,
                                range: [0, 100000],
                            },
                            PeakFlow_m3_day: {
                                number: true,
                                range: [0, 100000],
                            },
                            PercFlowOfTotal: {
                                number: true,
                                range: [0, 100],
                            },
                            PopServed: {
                                number: true,
                                range: [5, 10000000],
                            },
                            TimeOffset_hour: {
                                number: true,
                                range: [-12, 12],
                            },
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
                            LatOutfall: {
                                required: true,
                                number: true,
                                range: [-90, 90],
                            },
                            LngOutfall: {
                                required: true,
                                number: true,
                                range: [-180, 180],
                            },
                            AverageDepth_m: {
                                number: true,
                                range: [0, 1000],
                            },
                            DecayRate_per_day: {
                                number: true,
                                range: [0, 10000],
                            },
                            DistanceFromShore_m: {
                                number: true,
                                range: [0, 10000],
                            },
                            FarFieldVelocity_m_s: {
                                number: true,
                                range: [0, 10],
                            },
                            HorizontalAngle_deg: {
                                number: true,
                                range: [-180, 180],
                            },
                            NearFieldVelocity_m_s: {
                                number: true,
                                range: [0, 10],
                            },
                            NumberOfPorts: {
                                number: true,
                                range: [1, 100],
                            },
                            PortDiameter_m: {
                                number: true,
                                range: [0, 10],
                            },
                            PortElevation_m: {
                                number: true,
                                range: [0, 1000],
                            },
                            PortSpacing_m: {
                                number: true,
                                range: [0, 1000],
                            },
                            ReceivingWater_MPN_per_100ml: {
                                number: true,
                                range: [0, 20000000],
                            },
                            ReceivingWaterSalinity_PSU: {
                                number: true,
                                range: [0, 35],
                            },
                            ReceivingWaterTemperature_C: {
                                number: true,
                                range: [-10, 40],
                            },
                            VerticalAngle_deg: {
                                number: true,
                                range: [-90, 90],
                            },
                        },
                        messages: {
                            InfrastructureType:
                            {
                                range: cssp.GetHTMLVariable("#LayoutVariables", "varPleaseSelectAnItem"),
                            },
                        }
                    });
            });

            $(document).off("change", "select[name='FacilityType']");
            $(document).on("change", "select[name='FacilityType']", (evt: Event) => {
                if ($(evt.target).val() == "0") { // 0 == not lagoon or plant, 1 == Lagoon, 2 == Plant
                    $(".lagoon").removeClass("hidden").addClass("hidden");
                    $(".plant").removeClass("hidden").addClass("hidden");
                    $(".notlagoonorplant").removeClass("hidden");
                }
                else if ($(evt.target).val() == "1") { // 1 == Lagoon, 2 == Plant
                    $(".lagoon").removeClass("hidden");
                    $(".plant").removeClass("hidden").addClass("hidden");
                    $(".notlagoonorplant").removeClass("hidden").addClass("hidden");
                }
                else {
                    $(".lagoon").removeClass("hidden").addClass("hidden");
                    $(".plant").removeClass("hidden");
                    $(".notlagoonorplant").removeClass("hidden").addClass("hidden");
                }
            });
        };
        public MoveCancel: Function = ($bjs: JQuery): void => {
            var $AllItems = $bjs.closest("#InfrastructureTopDiv");
            $bjs.closest(".InfrastructureItem").removeClass("bg-danger");
            $AllItems.find(".InfrastructureAdd").html("");
            $AllItems.find(".jbInfrastructureMoveStart").removeClass("hidden");
            $AllItems.find(".jbInfrastructureShowAdd").removeClass("hidden");
            $AllItems.find(".jbInfrastructureMoveTo").removeClass("hidden").addClass("hidden");
            $AllItems.find(".jbInfrastructureMoveCancel").removeClass("hidden").addClass("hidden");
        };
        public MoveTo: Function = ($bjs: JQuery): void => {
            var ParentTVItemID: number = parseInt($bjs.closest(".InfrastructureItem").data("infrastructuretvitemid"));
            var command: string = "Infrastructure/SetInfrastructureChildParentJSON";
            $.post(cssp.BaseURL + command,
                {
                    ChildTVItemID: cssp.Infrastructure.ChildTVItemID,
                    ParentTVItemID: ParentTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MoveToTop: Function = ($bjs: JQuery): void => {
            var InfrastructureTVItemID = parseInt($bjs.closest(".InfrastructureItem").data("infrastructuretvitemid"));
            var command: string = "Infrastructure/SetInfrastructureChildParentJSON";
            $.post(cssp.BaseURL + command,
                {
                    ChildTVItemID: InfrastructureTVItemID,
                    ParentTVItemID: -1,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MoveStart: Function = ($bjs: JQuery): void => {
            var $AllItems = $bjs.closest("#InfrastructureTopDiv");
            $bjs.closest(".InfrastructureItem").addClass("bg-danger");
            $AllItems.find(".InfrastructureAdd").html("");
            $AllItems.find(".jbInfrastructureMoveStart").removeClass("hidden").addClass("hidden");
            $AllItems.find(".jbInfrastructureShowAdd").removeClass("hidden").addClass("hidden");
            cssp.Infrastructure.ChildTVItemID = parseInt($bjs.closest(".InfrastructureItem").data("infrastructuretvitemid"));
            $AllItems.find(".jbInfrastructureMoveCancel").each((ind: number, elem: Element) => {
                if ($(elem).closest(".InfrastructureItem").data("infrastructuretvitemid") == $bjs.closest(".InfrastructureItem").data("infrastructuretvitemid")) {
                    $(elem).closest(".InfrastructureItem").find(".jbInfrastructureMoveCancel").removeClass("hidden");
                }
            });
            $AllItems.find(".jbInfrastructureMoveTo").each((ind: number, elem: Element) => {
                if ($(elem).closest(".InfrastructureItem").data("infrastructuretvitemid") != $bjs.closest(".InfrastructureItem").data("infrastructuretvitemid")) {
                    $(elem).closest(".InfrastructureItem").find(".jbInfrastructureMoveTo").removeClass("hidden");
                }
            });
        };
        public SetDialogEvents: Function = ($bjs: JQuery) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var InfrastructureTVItemID: number = parseInt($bjs.closest(".InfrastructureItem").data("infrastructuretvitemid"));
                    var command: string = "Infrastructure/InfrastructureDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            InfrastructureTVItemID: InfrastructureTVItemID,
                        }).done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
        public ShowEdit: Function = ($bjs: JQuery): void => {
            var $content: JQuery = $bjs.closest("#TVItemListDiv").find("#content");
            var inputLength: number = $content.find("input").length;
            $content.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            if (inputLength > 0) {
                cssp.Helper.PageRefresh();
            }
            else {
                var InfrastructureTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var command: string = "Infrastructure/_infrastructureEditAll";
                $.get(cssp.BaseURL + command,
                    {
                        InfrastructureTVItemID: InfrastructureTVItemID,
                    }).done((ret) => {
                        $content.html(ret);
                        cssp.Infrastructure.InitEdit();
                        $bjs.removeClass("btn-default").addClass("btn-success");
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                cssp.View.ShowMoveTVItemButton($bjs);
            }
        };
        public ShowInfo: Function = ($bjs: JQuery): void => {
            cssp.Helper.PageRefresh();
        };
        public ShowHideAddOrModify: Function = ($bjs: JQuery, IsAdd: boolean, IsCreate: boolean): void => {
            if (IsCreate) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var TVItemIDMunicipality: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                    var InfrastructureTVItemID: number = 0;
                    var TVText: string = "";
                    $bjs.closest("#ViewDiv").find(".InfrastructureAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command: string = "Infrastructure/_infrastructureAddOrModify";
                    $.get(cssp.BaseURL + command,
                        {
                            TVItemIDMunicipality: TVItemIDMunicipality,
                            InfrastructureTVItemID: InfrastructureTVItemID,
                            TVText: TVText,
                            IsAdd: true,
                        }).done((ret) => {
                            $bjs.closest("#ViewDiv").find(".InfrastructureAdd").html(ret);
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest("#ViewDiv").find(".InfrastructureAdd").html("");
                }
            }
            else {
                $bjs.closest(".InfrastructureEditButtons").find(".jbInfrastructureShowHideAdd, .jbInfrastructureShowHideModify").removeClass("btn-success").addClass("btn-default");
                var $InfAddOrModify = $bjs.closest(".InfrastructureItem").find(".InfrastructureAddOrModify");
                if ($InfAddOrModify.children().length > 0) {
                    $InfAddOrModify.html("");
                }
                else {
                    $InfAddOrModify.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var TVItemIDMunicipality: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                    var InfrastructureTVItemID: number = parseInt($bjs.closest(".InfrastructureItem").data("infrastructuretvitemid"));
                    var TVText: string = $bjs.closest(".InfrastructureItem").find(".TVTextA").text();
                    var command: string = "Infrastructure/_infrastructureAddOrModify";
                    $InfAddOrModify.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    $.get(cssp.BaseURL + command,
                        {
                            TVItemIDMunicipality: TVItemIDMunicipality,
                            InfrastructureTVItemID: InfrastructureTVItemID,
                            TVText: TVText,
                            IsAdd: IsAdd,
                        }).done((ret) => {
                            $InfAddOrModify.html(ret);
                            $bjs.removeClass("btn-default").addClass("btn-success");
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                }
            }
        };
        public ShowHideEditButtons: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $("#ViewDiv").find(".jbInfrastructureCreateShowHide").removeClass("hidden");
                $bjs.closest("#ViewDiv").find(".InfrastructureEditButtons").removeClass("hidden");
                cssp.View.ShowMoveTVItemButton($bjs);
                $bjs.removeClass("btn-default").addClass("btn-success");
            }
            else {
                $("#ViewDiv").find(".jbInfrastructureCreateShowHide").addClass("hidden");
                $bjs.closest("#ViewDiv").find(".InfrastructureEditButtons").removeClass("hidden").addClass("hidden");
                cssp.View.HideMoveTVItemButton($bjs);
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
    }
}