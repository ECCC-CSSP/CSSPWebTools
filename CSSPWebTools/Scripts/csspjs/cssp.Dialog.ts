module CSSP {
    export class Dialog {
        // Variables

        // Constructor
        constructor() {
        }
         
        // Functions
        public InitDialogBasic: Function = (): void => {
            
            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        // Functions
        public CheckDialogAndButtonsExist: Function = (SelectorArr: Array<string>, LoopCount: number, EvalDialogEvent: string, $ajs: JQuery): number => {
            var AllExist: boolean = true;
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
                    case "cssp.DrogueRun.SetDialogEvents":
                        cssp.DrogueRun.SetDialogEvents($ajs);
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
                    case "cssp.PolSourceSite.SetDialogEventsEditSave":
                        cssp.PolSourceSite.SetDialogEventsEditSave($ajs);
                        break;
                    case "cssp.PolSourceSite.SetDialogEventsDeleteObservation":
                        cssp.PolSourceSite.SetDialogEventsDeleteObservation($ajs);
                        break;
                    case "cssp.PolSourceSiteEffect.SetDialogEventsIsGroup":
                        cssp.PolSourceSiteEffect.SetDialogEventsIsGroup($ajs);
                        break;
                    case "cssp.PolSourceSite.SetDialogEventsDeleteObservationIssue":
                        cssp.PolSourceSite.SetDialogEventsDeleteObservationIssue($ajs);
                        break;
                    case "cssp.RainExceedance.SetDialogEvents":
                        cssp.RainExceedance.SetDialogEvents($ajs);
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
                    case "cssp.SamplingPlanEmail.SetDialogEvents":
                        cssp.SamplingPlan.SetDialogEventsEmail($ajs);
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
                setInterval(() => {
                    LoopCount = this.CheckDialogAndButtonsExist(SelectorArr, LoopCount - 1, EvalDialogEvent, $ajs);
                }, 500);
            }
        };
        public ShowDialogHelp: Function = (Title: string, HelpDocHTMLText: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Message, Title, HelpDocHTMLText));
        };
        public ShowDialogMessage: Function = (Message: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Message, cssp.GetHTMLVariable("#LayoutVariables", "varMessage"), Message));
        };
        public ShowDialogContinueSaving: Function = (ContinueSavingObjText: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.ContinueSaving, cssp.GetHTMLVariable("#LayoutVariables", "varContinueSaving") + " " + ContinueSavingObjText, cssp.GetHTMLVariable("#LayoutVariables", "varContinueSaving")));
        };
        public ShowDialogAreYouSureChangeGroup: Function = (EffectTermText: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.AreYouSure, cssp.GetHTMLVariable("#LayoutVariables", "varChangingIsGroup") + " " + EffectTermText, cssp.GetHTMLVariable("#LayoutVariables", "varAreYouSure")));
        };
        public ShowDialogAreYouSure: Function = (DeleteObjText: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.AreYouSure, cssp.GetHTMLVariable("#LayoutVariables", "varDeleting") + " " + DeleteObjText, cssp.GetHTMLVariable("#LayoutVariables", "varAreYouSure")));            
        };
        public ShowDialogAreYouSureNoDelete: Function = (DeleteObjText: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.AreYouSure, DeleteObjText, cssp.GetHTMLVariable("#LayoutVariables", "varAreYouSure")));
        };
        public ShowDialogError: Function = (Title: string, Message: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Error, Title, Message));
        };
        public ShowDialogErrorWithError: Function = (Message: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varError"), Message));
        };
        public ShowDialogErrorWithFail: Function = (FailMessage: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varFail"), FailMessage));
        };
        public ShowDialogErrorWithCouldNotFind_Within_: Function = (FindText: string, WithinText: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varError"),
                $.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFind_Within_"), FindText, WithinText)));
        };
        public ShowDialogErrorWithCouldNotLoad_: Function = (command: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varError"),
                $.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotLoad_"), command)));
        };
        public ShowDialogErrorWithPleaseEnterValidNumber: Function = (ErrorMessage: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Error, cssp.GetHTMLVariable("#LayoutVariables", "varPleaseEnterValidNumber"), ErrorMessage));
        };
        public ShowDialogSuccess: Function = (SuccessMessage: string) => {
            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Success, cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"), SuccessMessage));
        };
        public ShowDialogBasic: Function = (dialogModel: DialogModel): void => {
            
            var $Dialog = $("#DialogBasic");
            if ($Dialog.length == 1) {
                cssp.Dialog.UpdateDialogBasic($Dialog, dialogModel);
                $Dialog.modal("show");
            }
            else {
                $.get(cssp.BaseURL + "Dialog/_DialogBasic")
                    .done((html) => {
                        $("#dialogs-content").append(html);
                        $Dialog = $("#DialogBasic");
                        cssp.Dialog.UpdateDialogBasic($Dialog, dialogModel);
                        $Dialog.modal("show");
                    })
                    .fail(() => {
                        alert(cssp.GetHTMLVariable("#DialogBasicVariables", "varUnknownError"));
                    });
            }
        };
        public UpdateDialogBasic: Function = ($Dialog: JQuery, dialogModel: DialogModel): void => {
            
            $Dialog.find("#DialogBasicYes, #DialogBasicNo, #DialogBasicCancel, #DialogBasicClose, #DialogBasicOK, #DialogBasicSave").addClass("hidden");
            $Dialog.find(".DialogTitleColor, .DialogIconColor").removeClass("text-danger").removeClass("text-info").removeClass("text-success").removeClass("text-primary").removeClass("text-warning");
            $Dialog.find(".DialogHeaderBGColor").removeClass("bg-danger").removeClass("bg-info").removeClass("bg-success").removeClass("bg-primary").removeClass("bg-warning");
            $Dialog.find(".DialogBasicIcon").removeClass("glyphicon-warning-sign").removeClass("glyphicon-ok").removeClass("glyphicon-question-sign");
            var IconClass: string = "";
            var TitleColor: string = "";
            var BGColor: string = "";
            var IconColor: string = "";
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
            $Dialog.find(".DialogBasicTitleColor").addClass(TitleColor)
            $Dialog.find(".DialogHeaderBGColor").addClass(BGColor)
            $Dialog.find(".DialogIconColor").addClass(IconColor)
            $Dialog.find(".DialogBasicTitle").text(dialogModel.Title);
            $Dialog.find(".DialogBasicMessage").html(dialogModel.Message);
            cssp.Dialog.InitDialogBasic();
        };
    }
} 