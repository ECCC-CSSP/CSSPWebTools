module CSSP {
    export class Home {
        public AppTaskTimeout: any;

        // Constructors
        constructor() {
        }

        // Functions
        public AppTaskDelete: Function = ($bjs: JQuery): void => {
            clearTimeout(cssp.Home.AppTaskTimeout);
            var AppTaskID: number = parseInt($bjs.data("apptaskid"));
            var command: string = "Home/AppTaskDeleteJSON";
            $.post(cssp.BaseURL + command,
                {
                    AppTaskID: AppTaskID,
                }).done((ret: string) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public AppTaskRefresh: Function = ($bjs: JQuery): void => {
            clearTimeout(cssp.Home.AppTaskTimeout);
            cssp.Helper.PageRefresh();
        };
        public AppTaskRefreshStart: Function = ($bjs: JQuery): void => {
            $(".jbAppTaskRefresh, .jbAppTaskRefreshStop").removeClass("hidden");
            $(".jbAppTaskRefreshStart").removeClass("hidden").addClass("hidden");
            cssp.Home.InitAppTask();
        };
        public AppTaskRefreshStop: Function = ($bjs: JQuery): void => {
            $(".jbAppTaskRefresh, .jbAppTaskRefreshStop").removeClass("hidden").addClass("hidden");
            $(".jbAppTaskRefreshStart").removeClass("hidden");
            clearTimeout(cssp.Home.AppTaskTimeout);
        };
        public Init: Function = (): void => { 
            if (cssp.Test) {
                cssp.Test.ShowTestButtons();
            }
        };
        public InitAppTask: Function = (): void => {
            cssp.Home.AppTaskTimeout = setTimeout(() => {
                var Seconds: number = parseInt($(".secondsToRefresh").text());
                Seconds = Seconds - 1;
                if (Seconds > 0) {
                    $(".secondsToRefresh").text(Seconds.toString());
                    cssp.Home.InitAppTask();
                }
                else {
                    $(".jbAppTaskRefresh").trigger("click");
                }
            }, 1000);
        };
    } 
}