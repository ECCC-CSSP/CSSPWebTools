module CSSP {
    export class TestInputTypeAhead {
        constructor() {
        }
        public DoTest: Function = ($cssPath: JQuery, CurrentCSSPath: string): void => {
            
            test(CurrentCSSPath + " [typeahead]", () => {
                var $parent: JQuery = $cssPath.closest("span");
                ok($parent.hasClass("twitter-typeahead"), "[parent tag of input is span with class twitter-typeahead]");
                ok($parent.children("input").length == 2, "[parent tag has 2 input tag as children]");
            });
        };
    }
} 