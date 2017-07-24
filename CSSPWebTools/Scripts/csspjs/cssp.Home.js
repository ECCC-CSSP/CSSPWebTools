var CSSP;
(function (CSSP) {
    var Home = (function () {
        // Constructors
        function Home() {
            // Functions
            this.AppTaskDelete = function ($bjs) {
                clearTimeout(cssp.Home.AppTaskTimeout);
                var AppTaskID = parseInt($bjs.data("apptaskid"));
                var command = "Home/AppTaskDeleteJSON";
                $.post(cssp.BaseURL + command, {
                    AppTaskID: AppTaskID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.AppTaskRefresh = function ($bjs) {
                clearTimeout(cssp.Home.AppTaskTimeout);
                cssp.Helper.PageRefresh();
            };
            this.AppTaskRefreshStart = function ($bjs) {
                $(".jbAppTaskRefresh, .jbAppTaskRefreshStop").removeClass("hidden");
                $(".jbAppTaskRefreshStart").removeClass("hidden").addClass("hidden");
                cssp.Home.InitAppTask();
            };
            this.AppTaskRefreshStop = function ($bjs) {
                $(".jbAppTaskRefresh, .jbAppTaskRefreshStop").removeClass("hidden").addClass("hidden");
                $(".jbAppTaskRefreshStart").removeClass("hidden");
                clearTimeout(cssp.Home.AppTaskTimeout);
            };
            this.Init = function () {
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            this.InitAppTask = function () {
                cssp.Home.AppTaskTimeout = setTimeout(function () {
                    var Seconds = parseInt($(".secondsToRefresh").text());
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
        return Home;
    }());
    CSSP.Home = Home;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Home.js.map