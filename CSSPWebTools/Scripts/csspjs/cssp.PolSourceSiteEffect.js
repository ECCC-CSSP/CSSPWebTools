var CSSP;
(function (CSSP) {
    var PolSourceSiteEffect = /** @class */ (function () {
        // Variables
        // Constructors
        function PolSourceSiteEffect() {
            // Functions
            this.PolSourceSiteEffectTermsDelete = function ($bjs) {
                var EffectTermEN = $bjs.data("effecttermen");
                cssp.Dialog.ShowDialogAreYouSure(EffectTermEN);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.PolSourceSiteEffect.SetDialogEventsDeleteEffectTerm", $bjs);
            };
            this.PolSourceSiteEffectLoadAnalysesTool = function () {
                var PolSourceSiteOrInfrastructureTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "PolSourceSiteEffect/_polSourceSiteOrInfrastructureEffect";
                $(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $.get(cssp.BaseURL + command, {
                    PolSourceSiteOrInfrastructureTVItemID: PolSourceSiteOrInfrastructureTVItemID
                })
                    .done(function (ret) {
                    $(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html(ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceSiteEffectLoadEffectTermsManager = function () {
                var PolSourceSiteOrInfrastructureTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "PolSourceSiteEffect/_polSourceSiteOrInfrastructureEffectTermsManager";
                $(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $.get(cssp.BaseURL + command, {
                    PolSourceSiteOrInfrastructureTVItemID: PolSourceSiteOrInfrastructureTVItemID
                })
                    .done(function (ret) {
                    $(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").html(ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceSiteEffectShowHideAnalysesTool = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadAnalysesTool();
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".PolSourceSiteAnalysesTop").find(".PolSourceSiteAnalyses").html("");
                }
            };
            this.PolSourceSiteEffectTermsShowHideManage = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".PolSourceSiteEffectTermsTop").find(".PolSourceSiteEffectTerms").html("");
                }
            };
            this.PolSourceSiteEffectTermsSendToGroup = function ($bjs) {
                var UnderGroupIDText = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='UnderGroupID']").val();
                if (!UnderGroupIDText) {
                    cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varGroupIDIsRequired"));
                    return;
                }
                var UnderGroupID = parseInt(UnderGroupIDText);
                if (isNaN(UnderGroupID)) {
                    cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varGroupIDIsRequired"));
                    return;
                }
                var PolSourceSiteEffectTermID = parseInt($bjs.data("polsourcesiteeffecttermid"));
                var command = "PolSourceSiteEffect/PolSourceSiteEffectTermSendToGroupJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    UnderGroupID: UnderGroupID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceSiteEffectTermsModify = function ($bjs) {
                var PolSourceSiteEffectTermID = parseInt($bjs.data("polsourcesiteeffecttermid"));
                var EffectTermEN = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='EffectTermEN']").val();
                var EffectTermFR = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='EffectTermFR']").val();
                var IsGroup = $bjs.data("isgroup");
                var UnderGroupID = parseInt($bjs.data("undergroupid"));
                var command = "PolSourceSiteEffect/PolSourceSiteEffectTermAddOrModifyJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    EffectTermEN: EffectTermEN,
                    EffectTermFR: EffectTermFR,
                    IsGroup: IsGroup,
                    UnderGroupID: UnderGroupID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceSiteEffectTermsAdd = function ($bjs) {
                var PolSourceSiteEffectTermID = 0;
                var EffectTermEN = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='EffectTermEN']").val();
                var EffectTermFR = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='EffectTermFR']").val();
                var IsGroup = $bjs.closest(".PolSourceSiteEffectTerm").find("input[name='IsGroup']").is(":checked");
                var UnderGroupID = parseInt($bjs.closest(".PolSourceSiteEffectTerm").find("input[name='UnderGroupID']").val());
                var command = "PolSourceSiteEffect/PolSourceSiteEffectTermAddOrModifyJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    EffectTermEN: EffectTermEN,
                    EffectTermFR: EffectTermFR,
                    IsGroup: IsGroup,
                    UnderGroupID: UnderGroupID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceSiteEffectTermsSave = function ($bjs) {
                var PolSourceSiteEffectID = $bjs.data("polsourcesiteeffectid");
                var PolSourceSiteEffectTermIDs = "";
                $bjs.closest(".PolSourceSiteEffect").find("input[name='EffectTerm']").each(function (index, elem) {
                    if ($(elem).is(":checked")) {
                        PolSourceSiteEffectTermIDs = PolSourceSiteEffectTermIDs + "" + $(elem).val() + "|";
                    }
                });
                var command = "PolSourceSiteEffect/PolSourceSiteEffectTermsSaveAllJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceSiteEffectID: PolSourceSiteEffectID,
                    PolSourceSiteEffectTermIDs: PolSourceSiteEffectTermIDs,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadAnalysesTool();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.PolSourceSiteEffectTermsSetIsGroup = function ($bjs) {
                var IsGroup = ($bjs.data("isgroup") == "True");
                var PolSourceSiteEffectTermID = $bjs.data("polsourcesiteeffecttermid");
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
                        cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.SetDialogEventsDeleteEffectTerm = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var PolSourceSiteEffectTermID = parseInt($bjs.data("polsourcesiteeffecttermid"));
                        var command = "PolSourceSiteEffect/PolSourceSiteEffectTermsDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                        })
                            .done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.PolSourceSiteEffect.PolSourceSiteEffectLoadEffectTermsManager();
                            }
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.PolSourceSiteEffectCommentTinymceInit = function () {
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
            this.PolSourceSiteEffectCommentSave = function (tinymce) {
                var content = tinymce.activeEditor.getContent();
                var PolSourceSiteEffectTermID = parseInt(tinymce.activeEditor.closest(".PolSourceSiteEffectComment").data("polsourcesiteeffectid"));
                var DocHTMLText = content;
                var command = "PolSourceSiteEffect/PolSourceSiteEffectCommentSaveJSON";
                $.post(cssp.BaseURL + command, {
                    PolSourceSiteEffectTermID: PolSourceSiteEffectTermID,
                    DocHTMLText: DocHTMLText
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
        }
        return PolSourceSiteEffect;
    }());
    CSSP.PolSourceSiteEffect = PolSourceSiteEffect;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.PolSourceSiteEffect.js.map