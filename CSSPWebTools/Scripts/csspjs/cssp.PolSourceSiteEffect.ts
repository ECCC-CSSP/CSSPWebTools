
module CSSP {
    export class PolSourceSiteEffect {
        // Variables

        // Constructors
        constructor() {
        }

        // Functions
        public PolSourceSiteEffectTermsIsGroup: Function = ($bjs: JQuery): void => {
            var EffectTermEN: string = $bjs.data("effecttermen");
            cssp.Dialog.ShowDialogAreYouSureChangeGroup(EffectTermEN);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSiteEffect.SetDialogEventsIsGroup", $bjs);
        };
        public PolSourceSiteEffectShowAnalysesTool: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");

                let PolSourceSiteOrInfrastructureTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                let command: string = "PolSourceSiteEffect/_polSourceSiteOrInfrastructureEffect";

                $bjs.closest(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $.get(cssp.BaseURL + command, {
                    PolSourceSiteOrInfrastructureTVItemID: PolSourceSiteOrInfrastructureTVItemID
                })
                    .done((ret) => {
                        $bjs.closest(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html(ret);
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html("");
            }
        };
        public PolSourceSiteEffectTermsShowHide: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").removeClass("hidden").addClass("hidden");
            }
        };
        public PolSourceSiteEffectTermsSendToGroup: Function = ($bjs: JQuery): void => {
            let PolSourceSiteEffectTermIDGroup: number = parseInt($bjs.closest(".PolSourceSiteEffectTerm").find(".PolSourceSiteEffectTermSendToGroup").val());
            let PolSourceSiteEffectTermID: number = parseInt($bjs.data("polsourcesiteeffecttermid"));
            let command: string = "PolSourceSiteEffect/PolSourceSiteEffectTermSendToGroupJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    PolSourceSiteEffectTermIDGroup: PolSourceSiteEffectTermIDGroup,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $bjs.closest(".PolSourceSiteAnalysesTop").find(".jbPolSourceEffectShowAnalysesTool").trigger("click");
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public SetDialogEventsIsGroup: Function = ($bjs: JQuery): void => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    let IsGroup: boolean = ($bjs.data("polsourcesiteeffecttermisgroup") == "true");
                    let PolSourceSiteEffectTermID: number = $bjs.data("polsourcesiteeffecttermid");
                    let EffectTermEN: string = $bjs.data("effecttermen");
                    let command: string = "PolSourceSiteEffect/PolSourceSiteEffectTermSetIsGroupJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                            IsGroup: !IsGroup,
                        })
                        .done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                $bjs.closest(".PolSourceSiteAnalysesTop").find(".jbPolSourceEffectShowAnalysesTool").trigger("click");
                            }
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
    }
} 