module CSSP {
    export class TestForm {
        constructor() {
        }
        public DoTest: Function = ($cssPath: JQuery, CurrentCSSPath: string): void => {
            test(CurrentCSSPath, () => {
                ok($cssPath.children("input[name=__RequestVerificationToken]").length == 1, " Form does contain a hidden __RequestVerificationToken");
                ok($cssPath.attr("method") != undefined, " Form has method [" + $cssPath.attr("method") + "]");
                ok($cssPath.attr("role") != undefined, " Form has role [" + $cssPath.attr("role") + "]");
                ok($cssPath.attr("action") != undefined, " Form has action [" + $cssPath.attr("action") + "]");
            });
        };
    }
} 