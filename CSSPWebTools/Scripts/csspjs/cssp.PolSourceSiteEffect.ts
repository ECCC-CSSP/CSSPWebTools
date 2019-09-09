
module CSSP {
    export class PolSourceSiteEffect {
        // Variables

        // Constructors
        constructor() {
        }

        // Functions
        public PolSourceSiteEffectTermsDelete: Function = ($bjs: JQuery): void => {
            var EffectTermEN: string = $bjs.data("effecttermen");
            cssp.Dialog.ShowDialogAreYouSure(EffectTermEN);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSiteEffect.SetDialogEventsDeleteEffectTerm", $bjs);
        };
        public PolSourceSiteEffectLoadAnalysesTool: Function = (): void => {
            let PolSourceSiteOrInfrastructureTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let command: string = "PolSourceSiteEffect/_polSourceSiteOrInfrastructureEffect";

            $(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            $.get(cssp.BaseURL + command, {
                PolSourceSiteOrInfrastructureTVItemID: PolSourceSiteOrInfrastructureTVItemID
            })
                .done((ret) => {
                    $(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public PolSourceSiteEffectLoadEffectTermsManager: Function = (): void => {
            let PolSourceSiteOrInfrastructureTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let command: string = "PolSourceSiteEffect/_polSourceSiteOrInfrastructureEffectTermsManager";

            $(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            $.get(cssp.BaseURL + command, {
                PolSourceSiteOrInfrastructureTVItemID: PolSourceSiteOrInfrastructureTVItemID
            })
                .done((ret) => {
                    $(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").html(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public PolSourceSiteEffectShowHideAnalysesTool: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");

                cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadAnalysesTool();
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html("");
            }
        };
        public PolSourceSiteEffectTermsShowHideManage: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");

                cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").html("");
            }
        };
        public PolSourceSiteEffectTermsSendToGroup: Function = ($bjs: JQuery): void => {
            let UnderGroupIDText = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='UnderGroupID']").val();
            if (!UnderGroupIDText) {
                cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varGroupIDIsRequired"));
                return;
            }

            let UnderGroupID: number = parseInt(UnderGroupIDText);
            if (isNaN(UnderGroupID)) {
                cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varGroupIDIsRequired"));
                return;
            }
            let PolSourceSiteEffectTermID: number = parseInt($bjs.data("polsourcesiteeffecttermid"));

            let command: string = "PolSourceSiteEffect/PolSourceSiteEffectTermSendToGroupJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    UnderGroupID: UnderGroupID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public PolSourceSiteEffectTermsModify: Function = ($bjs: JQuery): void => {
            let PolSourceSiteEffectTermID: number = parseInt($bjs.data("polsourcesiteeffecttermid"));
            let EffectTermEN: string = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='EffectTermEN']").val();
            let EffectTermFR: string = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='EffectTermFR']").val();
            let IsGroup: boolean = $bjs.data("isgroup");
            let UnderGroupID: number = parseInt($bjs.data("undergroupid"));

            let command: string = "PolSourceSiteEffect/PolSourceSiteEffectTermAddOrModifyJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    EffectTermEN: EffectTermEN,
                    EffectTermFR: EffectTermFR,
                    IsGroup: IsGroup,
                    UnderGroupID: UnderGroupID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public PolSourceSiteEffectTermsAdd: Function = ($bjs: JQuery): void => {
            let PolSourceSiteEffectTermID: number = 0;
            let EffectTermEN: string = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='EffectTermEN']").val();
            let EffectTermFR: string = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='EffectTermFR']").val();
            let IsGroup: boolean = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='IsGroup']").is(":checked");
            let UnderGroupID: number = parseInt($bjs.closest(".PolSourceSiteEffectTerm").find("input[name='UnderGroupID']").val());

            let command: string = "PolSourceSiteEffect/PolSourceSiteEffectTermAddOrModifyJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    EffectTermEN: EffectTermEN,
                    EffectTermFR: EffectTermFR,
                    IsGroup: IsGroup,
                    UnderGroupID: UnderGroupID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public PolSourceSiteEffectTermsSave: Function = ($bjs: JQuery): void => {
            let PolSourceSiteEffectID: number = $bjs.data("polsourcesiteeffectid");            
            let PolSourceSiteEffectTermIDs: string = "";

            $bjs.closest(".PolSourceSiteEffect").find("input[name='EffectTerm']").each((index: number, elem: Element) => {
                if ($(elem).is(":checked")) {
                    PolSourceSiteEffectTermIDs = PolSourceSiteEffectTermIDs + "" + $(elem).val() + "|";
                }
            });

            let command: string = "PolSourceSiteEffect/PolSourceSiteEffectTermsSaveAllJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceSiteEffectID: PolSourceSiteEffectID,
                    PolSourceSiteEffectTermIDs: PolSourceSiteEffectTermIDs,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadAnalysesTool();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public PolSourceSiteEffectTermsSetIsGroup: Function = ($bjs: JQuery): void => {
            let IsGroup: boolean = ($bjs.data("isgroup") == "True");
            let PolSourceSiteEffectTermID: number = $bjs.data("polsourcesiteeffecttermid");

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
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public SetDialogEventsDeleteEffectTerm: Function = ($bjs: JQuery): void => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    let PolSourceSiteEffectTermID: number = parseInt($bjs.data("polsourcesiteeffecttermid"));

                    let command: string = "PolSourceSiteEffect/PolSourceSiteEffectTermsDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                        })
                        .done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                            }
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
        public PolSourceSiteEffectCommentTinymceInit: Function = (): void => {
            tinymce.init({
                selector: ".PolSourceSiteEffectComment",
                height: 300,
                menubar: true,
                plugins: "fullpage searchreplace autolink visualblocks visualchars fullscreen table charmap hr insertdatetime advlist lists textcolor contextmenu colorpicker textpattern help save",
                toolbar: "save undo redo | formatselect | bold italic strikethrough forecolor backcolor alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
                spellchecker_language: 'en',
                spellchecker_dialog: true,

                save_onsavecallback: function () {
                    cssp.PolSourceSiteEffect.PolSourceSiteEffectCommentSave(tinymce);
                }
            });
        };
        public PolSourceSiteEffectCommentSave: Function = (tinymce: any): void => {
            let content = tinymce.activeEditor.getContent();

            let PolSourceSiteEffectTermID: number = parseInt(tinymce.activeEditor.closest(".PolSourceSiteEffectComment").data("polsourcesiteeffectid"));
            let DocHTMLText: string = content;
            let command: string = "PolSourceSiteEffect/PolSourceSiteEffectCommentSaveJSON";
            $.post(cssp.BaseURL + command,
                {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    DocHTMLText: DocHTMLText
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
    }
} 