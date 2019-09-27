var CSSP;
(function (CSSP) {
    var RainExceedance = /** @class */ (function () {
        // Variables
        // Constructors
        function RainExceedance() {
            // Functions
            this.RainExceedanceAskToDelete = function ($bjs) {
                var RainExceedanceName = $bjs.data("rainexceedancename");
                cssp.Dialog.ShowDialogAreYouSure(RainExceedanceName);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.RainExceedance.SetDialogEvents", $bjs);
            };
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest(".RainExceedanceAddOrModifyForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".RainExceedanceAddOrModifyForm", "RainExceedanceEditDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
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
            this.Init = function () {
                if ($("a.GlobeIcon").hasClass("btn-default")) {
                    $(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                }
                else {
                    $(".jbMapShowItem").removeClass("hidden");
                }
                cssp.RainExceedance.RainExceedanceShowLocationOnMap();
            };
            this.InitEdit = function () {
                $(".RainExceedanceAddOrModifyForm").each(function (ind, elem) {
                    $(elem).validate({
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
            this.RainExceedanceAddUseOfClimateSite = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    var RainExceedanceTVItemID = parseInt($bjs.data("rainexceedancetvitemid"));
                    var ClimateSiteTVItemID = parseInt($bjs.data("climatesitetvitemid"));
                    var Use = true;
                    var command_1 = "RainExceedance/RainExceedanceAddUseClimateSiteJSON";
                    $.post(cssp.BaseURL + command_1, {
                        RainExceedanceTVItemID: RainExceedanceTVItemID,
                        ClimateSiteTVItemID: ClimateSiteTVItemID,
                        Use: Use,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            $bjs.removeClass("btn-default").addClass("btn-success");
                            cssp.RainExceedance.RainExceedanceShowLocationOnMap();
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
                else {
                    var RainExceedanceTVItemID = parseInt($bjs.data("rainexceedancetvitemid"));
                    var ClimateSiteTVItemID = parseInt($bjs.data("climatesitetvitemid"));
                    var Use = false;
                    var command_2 = "RainExceedance/RainExceedanceAddUseClimateSiteJSON";
                    $.post(cssp.BaseURL + command_2, {
                        RainExceedanceTVItemID: RainExceedanceTVItemID,
                        ClimateSiteTVItemID: ClimateSiteTVItemID,
                        Use: Use,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            $bjs.removeClass("btn-success").addClass("btn-default");
                            cssp.RainExceedance.RainExceedanceShowLocationOnMap();
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_2);
                    });
                }
            };
            this.RainExceedanceShowAddOrModify = function ($bjs) {
                var ParentTVItemID = parseInt($bjs.closest("#ViewDiv").data("tvitemid"));
                var RainExceedanceTVItemID = parseInt($bjs.data("rainexceedancetvitemid"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.closest(".RainExceedanceItem").find(".RainExceedanceShowTop").removeClass("hidden").addClass("hidden");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop")
                        .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "RainExceedance/_rainExceedanceAddOrModify";
                    $.get(cssp.BaseURL + command, {
                        ParentTVItemID: ParentTVItemID,
                        RainExceedanceTVItemID: RainExceedanceTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                            $bjs.closest(".RainExceedanceItem").find(".RainExceedanceShowTop").removeClass("hidden");
                        }
                    }).fail(function () {
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
            this.RainExceedanceShowClimateSite = function ($bjs) {
                var RainExceedanceTVItemID = parseInt($bjs.data("rainexceedancetvitemid"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".RainExceedanceClimateSitesTop").find(".RainExceedanceClimateSites")
                        .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "RainExceedance/_rainExceedanceClimateSite";
                    $.get(cssp.BaseURL + command, {
                        RainExceedanceTVItemID: RainExceedanceTVItemID,
                        Radius_km: 50
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".RainExceedanceClimateSitesTop").find(".RainExceedanceClimateSites").html(ret);
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
                    $bjs.closest(".RainExceedanceClimateSitesTop").find(".RainExceedanceClimateSites").html("");
                }
            };
            this.RainExceedanceShowEmailDistributionListContact = function ($bjs) {
                var EmailDistributionListID = parseInt($bjs.data("emaildistributionlist"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".EmailDistributionListTop").find(".EmailDistributionList")
                        .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var command = "EmailDistributionList/_emailDistributionListContact";
                    $.get(cssp.BaseURL + command, {
                        EmailDistributionListID: EmailDistributionListID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".EmailDistributionListTop").find(".EmailDistributionList").html(ret);
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
                    $bjs.closest(".EmailDistributionListTop").find(".EmailDistributionList").html("");
                }
            };
            this.RainExceedanceClimateSitesFindWithinDistance = function ($bjs) {
                var RainExceedanceTVItemID = $bjs.data("rainexceedancetvitemid");
                var Radius_km = parseInt($bjs.closest(".RainExceedanceAddOrModify").find("input[name='Radius_km']").val());
                var command = "RainExceedance/_rainExceedanceClimateSite";
                $.get(cssp.BaseURL + command, {
                    RainExceedanceTVItemID: RainExceedanceTVItemID,
                    Radius_km: Radius_km
                })
                    .done(function (ret) {
                    $bjs.closest(".RainExceedanceAddOrModify").find(".RainExceedanceClimateSites").html(ret);
                    //cssp.RainExceedance.RainExceedanceShowLocationOnMap();
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.RainExceedanceShowLocationOnMap = function () {
                cssp.GoogleMap.MarkerTextLength = 3;
                var mapItems = [];
                $(".ClimateSiteUsedAndWithinDistance").each(function (ind, elem) {
                    var tvItemID = parseInt($(elem).data("climatesitetvitemid"));
                    var tvText = $(elem).data("climatesitecount").toString();
                    var tvType = CSSP.TVTypeEnum.MWQMSite;
                    var tvSubType = $(elem).find(".jbRainExceedanceAddUseOfClimateSite").hasClass("btn-default") ? CSSP.TVTypeEnum.Failed : CSSP.TVTypeEnum.Passed;
                    var mapObjList = [];
                    var mapInfoID = parseInt($(elem).data("mapinfoid"));
                    var coordList = [];
                    var lat = $(elem).data("lat");
                    var lng = $(elem).data("lng");
                    coordList.push(new CSSP.Coord(lat, lng, 0));
                    var mapObj = new CSSP.MapObj(mapInfoID, CSSP.DrawTypeEnum.Point, coordList);
                    mapObjList.push(mapObj);
                    var tvLoc = new CSSP.tvLocation(tvItemID, tvText, tvType, tvSubType, mapObjList);
                    mapItems.push(tvLoc);
                });
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
            };
            this.SetDialogEvents = function ($bjs) {
                var RainExceedanceTVItemID = parseInt($bjs.data("rainexceedancetvitemid"));
                var RainExceedanceName = $bjs.data("rainexceedancetname");
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var command = "RainExceedance/RainExceedanceDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            RainExceedanceTVItemID: RainExceedanceTVItemID
                        }).done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess("[" + RainExceedanceName + "] " + cssp.GetHTMLVariable("#LayoutVariables", "varRemovedSuccessfully"));
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
        }
        return RainExceedance;
    }());
    CSSP.RainExceedance = RainExceedance;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.RainExceedance.js.map