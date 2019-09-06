var CSSP;
(function (CSSP) {
    var PolSourceSiteEffect = (function () {
        // Variables
        // Constructors
        function PolSourceSiteEffect() {
            // Functions
            this.PolSourceSiteEffectTermsIsGroup = function ($bjs) {
                var EffectTermEN = $bjs.data("effecttermen");
                cssp.Dialog.ShowDialogAreYouSureChangeGroup(EffectTermEN);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSiteEffect.SetDialogEventsIsGroup", $bjs);
            };
            this.PolSourceSiteEffectShowAnalysesTool = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var PolSourceSiteOrInfrastructureTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var command_1 = "PolSourceSiteEffect/_polSourceSiteOrInfrastructureEffect";
                    $bjs.closest(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    $.get(cssp.BaseURL + command_1, {
                        PolSourceSiteOrInfrastructureTVItemID: PolSourceSiteOrInfrastructureTVItemID
                    })
                        .done(function (ret) {
                        $bjs.closest(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html(ret);
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html("");
                }
            };
            this.PolSourceSiteEffectTermsShowHide = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").removeClass("hidden").addClass("hidden");
                }
            };
            this.PolSourceSiteEffectTermsSendToGroup = function ($bjs) {
                var PolSourceSiteEffectTermIDGroup = parseInt($bjs.closest(".PolSourceSiteEffectTerm").find(".PolSourceSiteEffectTermSendToGroup").val());
                var PolSourceSiteEffectTermID = parseInt($bjs.data("polsourcesiteeffecttermid"));
                var command = "PolSourceSiteEffect/PolSourceSiteEffectTermSendToGroupJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    PolSourceSiteEffectTermIDGroup: PolSourceSiteEffectTermIDGroup,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $bjs.closest(".PolSourceSiteAnalysesTop").find(".jbPolSourceEffectShowAnalysesTool").trigger("click");
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.SetDialogEventsIsGroup = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var IsGroup = ($bjs.data("polsourcesiteeffecttermisgroup") == "true");
                        var PolSourceSiteEffectTermID = $bjs.data("polsourcesiteeffecttermid");
                        var EffectTermEN = $bjs.data("effecttermen");
                        var command = "PolSourceSiteEffect/PolSourceSiteEffectTermSetIsGroupJSON";
                        $.post(cssp.BaseURL + command, {
                            PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                            IsGroup: !IsGroup,
                        })
                            .done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                $bjs.closest(".PolSourceSiteAnalysesTop").find(".jbPolSourceEffectShowAnalysesTool").trigger("click");
                            }
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
        }
        return PolSourceSiteEffect;
    }());
    CSSP.PolSourceSiteEffect = PolSourceSiteEffect;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.PolSourceSiteEffect.js.map