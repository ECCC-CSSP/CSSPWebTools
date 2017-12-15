var CSSP;
(function (CSSP) {
    var Dialog = (function () {
        // Variables
        // Constructor
        function Dialog() {
            var _this = this;
            // Functions
            this.InitDialogBasic = function () {
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            // Functions
            this.CheckDialogAndButtonsExist = function (SelectorArr, LoopCount, EvalDialogEvent, $ajs) {
                var AllExist = true;
                if (LoopCount < 1)
                    return 0;
                for (var i = 0, count = SelectorArr.length; i < count; i++) {
                    if ($(SelectorArr[i]).length == 0) {
                        AllExist = false;
                    }
                }
                if (AllExist) {
                    switch (EvalDialogEvent) {
                        case "cssp.Admin.SetDialogEvents":
                            cssp.Admin.SetDialogEvents($ajs);
                            break;
                        case "cssp.BoxModel.SetDialogEvents":
                            cssp.BoxModel.SetDialogEvents($ajs);
                            break;
                        case "cssp.ClimateSite.ClimateSiteRainEnteredSave":
                            cssp.ClimateSite.ClimateSiteRainEnteredSave($ajs);
                            break;
                        case "cssp.Contact.SetDialogEvents":
                            cssp.Contact.SetDialogEvents($ajs);
                            break;
                        case "cssp.File.SetDialogEvents":
                            cssp.File.SetDialogEvents($ajs);
                            break;
                        case "cssp.File.SetDialogEvents2":
                            cssp.File.SetDialogEvents2($ajs);
                            break;
                        case "cssp.Infrastructure.SetDialogEvents":
                            cssp.Infrastructure.SetDialogEvents($ajs);
                            break;
                        case "cssp.MikeScenario.SetDialogEvents":
                            cssp.MikeScenario.SetDialogEvents($ajs);
                            break;
                        case "cssp.MikeScenario.SetDialogEventsSource":
                            cssp.MikeScenario.SetDialogEventsSource($ajs);
                            break;
                        case "cssp.MikeScenario.SetDialogEventsSourceStartEnd":
                            cssp.MikeScenario.SetDialogEventsSourceStartEnd($ajs);
                            break;
                        case "cssp.MWQMSite.SetDialogEvents":
                            cssp.MWQMSite.SetDialogEvents($ajs);
                            break;
                        case "cssp.MWQMRun.SetDialogEventsRun":
                            cssp.MWQMRun.SetDialogEventsRun($ajs);
                            break;
                        case "cssp.MWQMRun.SetDialogEventsRunSample":
                            cssp.MWQMRun.SetDialogEventsRunSample($ajs);
                            break;
                        case "cssp.PolSourceSite.SetDialogEventsDeleteObservation":
                            cssp.PolSourceSite.SetDialogEventsDeleteObservation($ajs);
                            break;
                        case "cssp.PolSourceSite.SetDialogEventsDeleteObservationIssue":
                            cssp.PolSourceSite.SetDialogEventsDeleteObservationIssue($ajs);
                            break;
                        case "cssp.ReportType.SetDialogEvents":
                            cssp.ReportType.SetDialogEvents($ajs);
                            break;
                        case "cssp.ReportType.SetDialogEventsYear":
                            cssp.ReportType.SetDialogEventsYear($ajs);
                            break;
                        case "cssp.SamplingPlan.SetDialogEvents":
                            cssp.SamplingPlan.SetDialogEvents($ajs);
                            break;
                        case "cssp.TVItem.SetDialogEvents":
                            cssp.TVItem.SetDialogEvents($ajs);
                            break;
                        case "cssp.VisualPlumes.SetDialogEvents":
                            cssp.VisualPlumes.SetDialogEvents($ajs);
                            break;
                        case "cssp.EmailDistributionList.SetDialogEventsContact":
                            cssp.EmailDistributionList.SetDialogEventsContact($ajs);
                            break;
                        case "cssp.EmailDistributionList.SetDialogEvents":
                            cssp.EmailDistributionList.SetDialogEvents($ajs);
                            break;
                        default:
                            alert("Error could not find and run [" + EvalDialogEvent + "]");
                            break;
                    }
                    return 0;
                }
                else {
                    setInterval(function () {
                        LoopCount = _this.CheckDialogAndButtonsExist(SelectorArr, LoopCount - 1, EvalDialogEvent, $ajs);
                    }, 500);
                }
            };
            this.ShowDialogMessage = function (Message) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Message, cssp.GetHTMLVariable("#LayoutVariables", "varMessage"), Message));
            };
            this.ShowDialogContinueSaving = function (ContinueSavingObjText) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.ContinueSaving, cssp.GetHTMLVariable("#LayoutVariables", "varContinueSaving") + " " + ContinueSavingObjText, cssp.GetHTMLVariable("#LayoutVariables", "varContinueSaving")));
            };
            this.ShowDialogAreYouSure = function (DeleteObjText) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.AreYouSure, cssp.GetHTMLVariable("#LayoutVariables", "varDeleting") + " " + DeleteObjText, cssp.GetHTMLVariable("#LayoutVariables", "varAreYouSure")));
            };
            this.ShowDialogError = function (Title, Message) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, Title, Message));
            };
            this.ShowDialogErrorWithError = function (Message) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varError"), Message));
            };
            this.ShowDialogErrorWithFail = function (FailMessage) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varFail"), FailMessage));
            };
            this.ShowDialogErrorWithCouldNotFind_Within_ = function (FindText, WithinText) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varError"), $.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFind_Within_"), FindText, WithinText)));
            };
            this.ShowDialogErrorWithCouldNotLoad_ = function (command) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varError"), $.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotLoad_"), command)));
            };
            this.ShowDialogErrorWithPleaseEnterValidNumber = function (ErrorMessage) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varPleaseEnterValidNumber"), ErrorMessage));
            };
            this.ShowDialogSuccess = function (SuccessMessage) {
                cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Success, cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"), SuccessMessage));
            };
            this.ShowDialogBasic = function (dialogModel) {
                var $Dialog = $("#DialogBasic");
                if ($Dialog.length == 1) {
                    cssp.Dialog.UpdateDialogBasic($Dialog, dialogModel);
                    $Dialog.modal("show");
                }
                else {
                    $.get(cssp.BaseURL + "Dialog/_DialogBasic")
                        .done(function (html) {
                        $("#dialogs-content").append(html);
                        $Dialog = $("#DialogBasic");
                        cssp.Dialog.UpdateDialogBasic($Dialog, dialogModel);
                        $Dialog.modal("show");
                    })
                        .fail(function () {
                        alert(cssp.GetHTMLVariable("#DialogBasicVariables", "varUnknownError"));
                    });
                }
            };
            this.UpdateDialogBasic = function ($Dialog, dialogModel) {
                $Dialog.find("#DialogBasicYes, #DialogBasicNo, #DialogBasicCancel, #DialogBasicClose, #DialogBasicOK, #DialogBasicSave").addClass("hidden");
                $Dialog.find(".DialogTitleColor, .DialogIconColor").removeClass("text-danger").removeClass("text-info").removeClass("text-success").removeClass("text-primary").removeClass("text-warning");
                $Dialog.find(".DialogHeaderBGColor").removeClass("bg-danger").removeClass("bg-info").removeClass("bg-success").removeClass("bg-primary").removeClass("bg-warning");
                $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-warning-sign").removeClass("glyphicon-ok").removeClass("glyphicon-question-sign");
                var IconClass = "";
                var TitleColor = "";
                var BGColor = "";
                var IconColor = "";
                switch (dialogModel.DialogModelType) {
                    case CSSP.DialogModelTypeEnum.AreYouSure:
                        {
                            IconClass = "glyphicon-question-sign";
                            BGColor = "bg-warning";
                            TitleColor = "panel-title";
                            IconColor = "text-warning";
                            $Dialog.find("#DialogBasicYes, #DialogBasicCancel").removeClass("hidden");
                        }
                        break;
                    case CSSP.DialogModelTypeEnum.ContinueSaving:
                        {
                            IconClass = "glyphicon-question-sign";
                            BGColor = "bg-warning";
                            TitleColor = "panel-title";
                            IconColor = "text-warning";
                            $Dialog.find("#DialogBasicYes, #DialogBasicCancel").removeClass("hidden");
                        }
                        break;
                    case CSSP.DialogModelTypeEnum.Error:
                        {
                            IconClass = "glyphicon-alert";
                            BGColor = "bg-danger";
                            TitleColor = "panel-title";
                            IconColor = "text-danger";
                            $Dialog.find("#DialogBasicClose").removeClass("hidden");
                        }
                        break;
                    case CSSP.DialogModelTypeEnum.Help:
                        {
                            IconClass = "glyphicon-question-sign";
                            BGColor = "bg-default";
                            TitleColor = "panel-title";
                            IconColor = "text-default";
                            $Dialog.find("#DialogBasicClose").removeClass("hidden");
                        }
                        break;
                    case CSSP.DialogModelTypeEnum.Success:
                        {
                            IconClass = "glyphicon-ok";
                            BGColor = "bg-success";
                            TitleColor = "panel-title";
                            IconColor = "text-success";
                            $Dialog.find("#DialogBasicClose").removeClass("hidden");
                        }
                        break;
                    case CSSP.DialogModelTypeEnum.Permissions:
                        {
                            IconClass = "glyphicon-star";
                            BGColor = "bg-warning";
                            TitleColor = "panel-title";
                            IconColor = "text-warning";
                            $Dialog.find("#DialogBasicOK").removeClass("hidden");
                        }
                        break;
                    case CSSP.DialogModelTypeEnum.Message:
                        {
                            IconClass = "glyphicon-comment";
                            BGColor = "bg-primary";
                            TitleColor = "panel-title";
                            IconColor = "text-primary";
                            $Dialog.find("#DialogBasicOK").removeClass("hidden");
                        }
                        break;
                    case CSSP.DialogModelTypeEnum.TVItemMoving:
                        {
                            IconClass = "glyphicon-sort-by-attributes";
                            BGColor = "bg-primary";
                            TitleColor = "panel-title";
                            IconColor = "text-primary";
                            $Dialog.find("#DialogBasicCancel").removeClass("hidden");
                        }
                        break;
                    default:
                        {
                            IconClass = "glyphicon-modal-window";
                            TitleColor = "panel-title";
                            BGColor = "bg-info";
                            IconColor = "text-info";
                            $Dialog.find("#DialogBasicClose").removeClass("hidden");
                        }
                        break;
                }
                $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-alert");
                $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-ok");
                $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-question-sign");
                $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-sort-by-attributes");
                $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-modal-window");
                $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-comment");
                $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-star");
                $Dialog.find(".DialogBasicIcon").addClass(IconClass);
                $Dialog.find(".DialogBasicTitleColor").addClass(TitleColor);
                $Dialog.find(".DialogHeaderBGColor").addClass(BGColor);
                $Dialog.find(".DialogIconColor").addClass(IconColor);
                $Dialog.find(".DialogBasicTitle").text(dialogModel.Title);
                $Dialog.find(".DialogBasicMessage").html(dialogModel.Message);
                cssp.Dialog.InitDialogBasic();
            };
        }
        return Dialog;
    }());
    CSSP.Dialog = Dialog;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Dialog.js.map