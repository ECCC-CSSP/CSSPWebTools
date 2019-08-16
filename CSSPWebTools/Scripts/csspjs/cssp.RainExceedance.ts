
module CSSP {
    export class RainExceedance {
        // Variables

        // Constructors
        constructor() {

        }

        // Functions
        public RainExceedanceAskToDelete: Function = ($bjs: JQuery): void => {
            var RainExceedanceName: string = $bjs.data("rainexceedancename");
            cssp.Dialog.ShowDialogAreYouSure(RainExceedanceName);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.RainExceedance.SetDialogEvents", $bjs);
        };
        public FormSubmit: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest(".RainExceedanceAddOrModifyForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".RainExceedanceAddOrModifyForm", "RainExceedanceEditDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
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
        public Init: Function = (): void => {
            if ($("a.GlobeIcon").hasClass("btn-default")) {
                $(".jbMapShowItem").removeClass("hidden").addClass("hidden");
            }
            else {
                $(".jbMapShowItem").removeClass("hidden");
            }
            cssp.RainExceedance.RainExceedanceShowLocationOnMap();
        };
        public InitEdit: Function = (): void => {
            $(".RainExceedanceAddOrModifyForm").each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            RainMaximum: {
                                required: true,
                                number: true,
                                range: [0, 500],
                            },
                            RainExceedanceName: {
                                required: true,
                                maxlength: 200,
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
                            StartMonth: {
                                required: true,
                                number: true,
                                range: [1, 12],
                            },
                            StartDay: {
                                required: true,
                                number: true,
                                range: [1, 31],
                            },
                            EndMonth: {
                                required: true,
                                number: true,
                                range: [1, 12],
                            },
                            EndDay: {
                                required: true,
                                number: true,
                                range: [1, 31],
                            },
                        }
                    });
            });

        };
        public RainExceedanceAddUseOfClimateSite: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                let RainExceedanceTVItemID = parseInt($bjs.data("rainexceedancetvitemid"));
                let ClimateSiteTVItemID = parseInt($bjs.data("climatesitetvitemid"));
                let Use = true;
                let command: string = "RainExceedance/RainExceedanceAddUseClimateSiteJSON";
                $.post(cssp.BaseURL + command, {
                    RainExceedanceTVItemID: RainExceedanceTVItemID,
                    ClimateSiteTVItemID: ClimateSiteTVItemID,
                    Use: Use,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $bjs.removeClass("btn-default").addClass("btn-success");
                        cssp.RainExceedance.RainExceedanceShowLocationOnMap();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                let RainExceedanceTVItemID = parseInt($bjs.data("rainexceedancetvitemid"));
                let ClimateSiteTVItemID = parseInt($bjs.data("climatesitetvitemid"));
                let Use = false;
                let command: string = "RainExceedance/RainExceedanceAddUseClimateSiteJSON";
                $.post(cssp.BaseURL + command, {
                    RainExceedanceTVItemID: RainExceedanceTVItemID,
                    ClimateSiteTVItemID: ClimateSiteTVItemID,
                    Use: Use,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $bjs.removeClass("btn-success").addClass("btn-default");
                        cssp.RainExceedance.RainExceedanceShowLocationOnMap();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
        };
        public RainExceedanceShowAddOrModify: Function = ($bjs: JQuery): void => {
            let ParentTVItemID: number = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
            let RainExceedanceTVItemID: number = parseInt($bjs.data("rainexceedancetvitemid"));
            if ($bjs.hasClass("btn-default")) {
                $bjs.closest(".RainExceedanceItem").find(".RainExceedanceShowTop").removeClass("hidden").addClass("hidden");
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop")
                    .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));

                var command: string = "RainExceedance/_rainExceedanceAddOrModify";
                $.get(cssp.BaseURL + command, {
                    ParentTVItemID: ParentTVItemID,
                    RainExceedanceTVItemID: RainExceedanceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop").html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                        $bjs.closest(".RainExceedanceItem").find(".RainExceedanceShowTop").removeClass("hidden");
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    $bjs.closest(".RainExceedanceItem").find(".RainExceedanceShowTop").removeClass("hidden");
                });

            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop").html("");
                $bjs.closest(".RainExceedanceItem").find(".RainExceedanceShowTop").removeClass("hidden");
            }
        };
        public RainExceedanceShowClimateSite: Function = ($bjs: JQuery): void => {
            let RainExceedanceTVItemID: number = parseInt($bjs.data("rainexceedancetvitemid"));
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".RainExceedanceClimateSitesTop").find(".RainExceedanceClimateSites")
                    .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));

                var command: string = "RainExceedance/_rainExceedanceClimateSite";
                $.get(cssp.BaseURL + command, {
                    RainExceedanceTVItemID: RainExceedanceTVItemID,
                    Radius_km: 50
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".RainExceedanceClimateSitesTop").find(".RainExceedanceClimateSites").html(ret);
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
                $bjs.closest(".RainExceedanceClimateSitesTop").find(".RainExceedanceClimateSites").html("");
            }
        };
        public RainExceedanceShowEmailDistributionListContact: Function = ($bjs: JQuery): void => {
            let EmailDistributionListID: number = parseInt($bjs.data("emaildistributionlist"));
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".EmailDistributionListTop").find(".EmailDistributionList")
                    .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));

                var command: string = "EmailDistributionList/_emailDistributionListContact";
                $.get(cssp.BaseURL + command, {
                    EmailDistributionListID: EmailDistributionListID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".EmailDistributionListTop").find(".EmailDistributionList").html(ret);
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
                $bjs.closest(".EmailDistributionListTop").find(".EmailDistributionList").html("");
            }
        };
        public RainExceedanceClimateSitesFindWithinDistance: Function = ($bjs): void => {
            let RainExceedanceTVItemID: number = $bjs.data("rainexceedancetvitemid");
            let Radius_km: number = parseInt($bjs.closest(".RainExceedanceAddOrModify").find("input[name='Radius_km']").val());

            let command: string = "RainExceedance/_rainExceedanceClimateSite";
            $.get(cssp.BaseURL + command,
                {
                    RainExceedanceTVItemID: RainExceedanceTVItemID,
                    Radius_km: Radius_km
                })
                .done((ret) => {
                    $bjs.closest(".RainExceedanceAddOrModify").find(".RainExceedanceClimateSites").html(ret);
                    //cssp.RainExceedance.RainExceedanceShowLocationOnMap();
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public RainExceedanceShowLocationOnMap: Function = (): void => {
            cssp.GoogleMap.MarkerTextLength = 3;
            let mapItems: Array<CSSP.tvLocation> = [];
            $(".ClimateSiteUsedAndWithinDistance").each((ind: number, elem: Element) => {
                let tvItemID: number = parseInt($(elem).data("climatesitetvitemid"));
                let tvText: string = $(elem).data("climatesitecount").toString();
                let tvType: TVTypeEnum = TVTypeEnum.MWQMSite;
                let tvSubType: TVTypeEnum = $(elem).find(".jbRainExceedanceAddUseOfClimateSite").hasClass("btn-default") ? TVTypeEnum.Failed : TVTypeEnum.Passed;
                let mapObjList: Array<MapObj> = [];
                let mapInfoID: number = parseInt($(elem).data("mapinfoid"));
                let coordList: Array<Coord> = [];
                let lat: number = $(elem).data("lat");
                let lng: number = $(elem).data("lng");
                coordList.push(new Coord(lat, lng, 0));
                let mapObj: MapObj = new MapObj(mapInfoID, DrawTypeEnum.Point, coordList)
                mapObjList.push(mapObj)
                let tvLoc: CSSP.tvLocation = new CSSP.tvLocation(tvItemID, tvText, tvType, tvSubType, mapObjList);
                mapItems.push(tvLoc);
            });
            cssp.GoogleMap.FillTVItemObjects(mapItems, true);
        };
        public SetDialogEvents: Function = ($bjs: JQuery) => {
            var RainExceedanceTVItemID: number = parseInt($bjs.data("rainexceedancetvitemid"));
            var RainExceedanceName: string = $bjs.data("rainexceedancetname");
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    var command: string = "RainExceedance/RainExceedanceDeleteJSON";
                    $.post(cssp.BaseURL + command, {
                        RainExceedanceTVItemID: RainExceedanceTVItemID
                    }).done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogSuccess("[" + RainExceedanceName + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
                            cssp.Helper.PageRefresh();
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                });
            });
        };
    }
}