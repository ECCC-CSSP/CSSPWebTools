
module CSSP {
    export class DocumentAEvents {
        // Constructor
        constructor() {
            this.Init();
        } 

        // Functions
        public Init: Function = (): void => {

            $(document).off("click", "a[class^='ja']");
            $(document).on("click", "a[class^='ja']", (evt: Event) => {
                var $aja = $(evt.target);
                if (!$aja.is("a")) {
                    $aja = $aja.closest("a");
                }
                switch ($aja.attr("class").split(" ")[0]) {
                    case "":
                        {
                        }
                        break;
                    case "jaContactDelete":
                        {
                            cssp.Admin.AskToRemoveUser();
                        }
                        break;
                    case "jaContactDisabledToggle":
                        {
                            cssp.Admin.ContactDisabledToggle();
                        }
                        break;
                    case "jaHelp":
                        {
                            cssp.View.Help($aja);
                        }
                        break;
                    case "jaLanguage":
                        {
                            var temp = $aja.attr("href").replace("#!Language/", "");
                            document.location.href = document.location.href.replace(Globalize.culture.name, temp);
                        }
                        break;
                    case "jaLogOff":
                        {
                            cssp.Login.LogOff();
                        }
                        break;
                    case "jaSamplingPlanEdit":
                        {
                            cssp.SamplingPlan.SamplingPlanEdit($aja);
                            return true;
                        }
                    case "jaOpenGoogleEarth":
                        {
                            cssp.File.OpenGoogleEarth($aja);
                        }
                        break;
                    case "jaPageRefresh":
                        {
                            cssp.Helper.PageRefresh();
                        }
                        break;
                    case "jaPopover": 
                        {
                            // no action
                        }
                        break;
                    default:
                        {
                            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Error, $aja.attr("class").split(" ")[0], cssp.GetHTMLVariable("#LayoutVariables", "varNotImplemented")));
                        }
                        break;
                }
                return false;
            });
        };
    }
}