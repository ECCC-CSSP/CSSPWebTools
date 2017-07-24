
module CSSP {
    export class Sammy {
        // Constructors
        constructor() {
            this.Init();
        }

        // Functions
        public CreateHashString: Function = (): string => {
            var hashString: string = "";
            for (var i: number = 0, count: number = cssp.Variables.TVTextList.length; i < count; i++) {
                hashString += cssp.Variables.TVTextList[i];
                if (i != count - 1) {
                    hashString += "/";
                }
            }
            if (cssp.Variables.TVItemIDList.length > 0) {
                hashString += "|||";
                for (var i: number = 0, count: number = cssp.Variables.TVItemIDList.length; i < count; i++) {
                    hashString += cssp.Variables.TVItemIDList[i];
                    if (i != count - 1) {
                        hashString += "/";
                    }
                }

                if (cssp.Variables.VariableShow.length > 0) {
                    hashString += "|||" + cssp.Variables.VariableShow;
                }
            }

            return hashString;
        };
        public Download: Function = (hashString: string): void => {
            var Controller: string = "Home";
            var File: string = "_Home";
            switch (cssp.Variables.TVTextList[0]) {
                case "!Administrator":
                    {
                        Controller = "Admin";
                        File = "_Admin";
                    }
                    break;
                case "!Chart":
                    {
                        Controller = "Home";
                        File = "_Chart";
                    }
                    break;
                case "!ForgotPassword":
                    {
                        Controller = "Account";
                        File = "_ForgotPassword";
                    }
                    break;
                case "!Home":
                    {
                        Controller = "Home";
                        File = "_Home";
                    }
                    break;
                case "!Login":
                    {
                        Controller = "Account";
                        File = "_Login";
                    }
                    break;
                case "!SamplingPlans":
                    {
                        Controller = "SamplingPlan";
                        File = "_SamplingPlanInfo";
                    }
                    break;
                case "!Profile":
                    {
                        Controller = "Profile";
                        File = "_Profile";
                    }
                    break;
                case "!ProfileEdit":
                    {
                        Controller = "Profile";
                        File = "_ProfileEdit";
                    }
                    break;
                case "!Ranking":
                    {
                        Controller = "Home";
                        File = "_Ranking";
                    }
                    break;
                case "!Register":
                    {
                        Controller = "Account";
                        File = "_Register";
                    }
                    break;
                case "!View":
                    {
                        Controller = "Home";
                        File = "_View";
                    }
                    break;
                case "!Table":
                    {
                        Controller = "Home";
                        File = "_Table";
                    }
                    break;
                case "!Testing":
                    {
                        Controller = "Test";
                        File = "_Testing";
                    }
                    break;
                case "!View":
                    {
                        Controller = "View";
                        File = "_View";
                    }
                    break;
                default:
                    {
                    }
                    break;
            }
            cssp.Helper.LoadPage("level0-content", Controller + "/" + File + "?Q=" + hashString);
        };
        public Init: Function = (): void => {
            cssp.Sammyjs = $.sammy();

            cssp.Sammyjs.route("get", /\#(.*)/, (context: Sammy.EventContext) => {
                this.LoadVariables(context.params["splat"][0]);
                var hashString: string = this.CreateHashString();
                this.Download(hashString);
            });
            cssp.Sammyjs.run(cssp.BaseURL + "#!Home");
        };
        public LoadVariables: Function = (splat: string): boolean => {
            var ShouldReload: boolean = false;

            if (cssp.Variables.URL != cssp.BaseURL + "#" + splat) {
                ShouldReload = true;
            }
            cssp.Variables.URL = cssp.BaseURL + "#" + splat;

            var URLParts: Array<string> = splat.split("|||");
            cssp.Variables.TVTextList = URLParts[0].split("/");
            if (cssp.Variables.TVTextList[0] == "Language") {
                if (cssp.Variables.TVTextList.length > 1) {
                    if (cssp.Variables.Culture != cssp.Variables.TVTextList[1]) {
                        ShouldReload = true;
                    }
                    var OldCultureName = Globalize.culture.name;
                    cssp.Variables.Culture = cssp.Variables.TVTextList[1];
                    Globalize.culture.name = cssp.Variables.TVTextList[1];
                    document.location.href = cssp.BaseURL.replace(OldCultureName, Globalize.culture.name);
                }
                return false;
            }
            else {
                if (URLParts.length > 1) {
                    cssp.Variables.TVItemIDList = URLParts[1].split("/");
                }
                if (URLParts.length > 2) {
                    cssp.Variables.VariableShow = URLParts[2];
                }

                return ShouldReload;
            }
        };
    }
} 