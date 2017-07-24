module CSSP.Test {
    export class Header {
        // Variables
        public TSName: string = "cssp.Header.ts";
        public appName: string = "cssp.Header";

        // Constructor
        constructor() {
        }

        // Function

        // **********************************************************
        // **********************************************************
        // **********************************************************



        public TestContents: Function = (): void => {

            $("#qunit-tests").html("");

            cssp.Test.RunCheckVariablesAndFunctions(this.TSName, this.appName, []);

            QUnit.module("#HeaderDiv and children");

            var $cssPath: JQuery;
            $cssPath = $("#HeaderDiv");
            test("#HeaderDiv attributes", () => {
                equal($cssPath.attr("id"), "HeaderDiv", "id [HeaderDiv]");
            });
            $cssPath = $("#HeaderDiv > nav");
            test("#HeaderDiv > nav attributes", () => {
                equal($cssPath.attr("role"), "navigation", "role [navigation]");
                equal($cssPath.attr("class"), "navbar navbar-inverse headerNav", "class [navbar navbar-inverse headerNav]");
            });
            $cssPath = $("#HeaderDiv > nav > div");
            test("#HeaderDiv > nav > div attributes", () => {
                equal($cssPath.attr("class"), "container-fluid", "class [container-fluid]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0)");
            test("#HeaderDiv > nav > div > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "navbar-header", "class [navbar-header]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > button");
            test("#HeaderDiv > nav > div > div:eq(0) > button attributes", () => {
                equal($cssPath.attr("type"), "button", "type [button]");
                equal($cssPath.attr("class"), "navbar-toggle pull-right", "class [navbar-toggle pull-right]");
                equal($cssPath.attr("data-toggle"), "collapse", "data-toggle [collapse]");
                equal($cssPath.attr("data-target"), "#navbarCollapseID", "data-target [#navbarCollapseID]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > button > span:eq(0)");
            test("#HeaderDiv > nav > div > div:eq(0) > button > span:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "sr-only", "class [sr-only]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > button > span:eq(1)");
            test("#HeaderDiv > nav > div > div:eq(0) > button > span:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "icon-bar", "class [icon-bar]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > button > span:eq(2)");
            test("#HeaderDiv > nav > div > div:eq(0) > button > span:eq(2) attributes", () => {
                equal($cssPath.attr("class"), "icon-bar", "class [icon-bar]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > button > span:eq(3)");
            test("#HeaderDiv > nav > div > div:eq(0) > button > span:eq(3) attributes", () => {
                equal($cssPath.attr("class"), "icon-bar", "class [icon-bar]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > a:eq(0)");
            test("#HeaderDiv > nav > div > div:eq(0) > a:eq(0) attributes", () => {
                equal($cssPath.attr("href"), "#!Home", "href [#!Home]");
                equal($cssPath.attr("class"), "navbar-brand visible-lg visible-md visible-sm", "class [navbar-brand visible-lg visible-md visible-sm]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > a:eq(0) > span");
            test("#HeaderDiv > nav > div > div:eq(0) > a:eq(0) > span attributes", () => {
                equal($cssPath.attr("class"), "text-primary", "class [text-primary]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > a:eq(1)");
            test("#HeaderDiv > nav > div > div:eq(0) > a:eq(1) attributes", () => {
                equal($cssPath.attr("href"), "#!Home", "href [#!Home]");
                equal($cssPath.attr("class"), "navbar-brand visible-xs ", "class [navbar-brand visible-xs ]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(0) > a:eq(1) > span");
            test("#HeaderDiv > nav > div > div:eq(0) > a:eq(1) > span attributes", () => {
                equal($cssPath.attr("class"), "text-primary", "class [text-primary]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1)");
            test("#HeaderDiv > nav > div > div:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "collapse navbar-collapse", "class [collapse navbar-collapse]");
                equal($cssPath.attr("id"), "navbarCollapseID", "id [navbarCollapseID]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "nav navbar-nav navbar-left", "class [nav navbar-nav navbar-left]");
                equal($cssPath.attr("role"), "menu", "role [menu]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "dropdown", "class [dropdown]");
                equal($cssPath.attr("id"), "dropdownTestingID", "id [dropdownTestingID]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > a attributes", () => {
                equal($cssPath.attr("href"), "#", "href [#]");
                equal($cssPath.attr("class"), "dropdown-toggle", "class [dropdown-toggle]");
                equal($cssPath.attr("data-toggle"), "dropdown", "data-toggle [dropdown]");
                equal($cssPath.attr("aria-expanded"), "true", "aria-expanded [true]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > a > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > a > span attributes", () => {
                equal($cssPath.attr("class"), "caret", "class [caret]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul attributes", () => {
                equal($cssPath.attr("class"), "dropdown-menu", "class [dropdown-menu]");
                equal($cssPath.attr("role"), "menu", "role [menu]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(0) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(0) > a attributes", () => {
                equal($cssPath.attr("href"), "#", "href [#]");
                equal($cssPath.attr("class"), "jtTestShow hidden", "class [jtTestShow hidden]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(1) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(1) > a attributes", () => {
                equal($cssPath.attr("href"), "#", "href [#]");
                equal($cssPath.attr("class"), "jtTestHide", "class [jtTestHide]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(2)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(2) attributes", () => {
                equal($cssPath.attr("class"), "divider", "class [divider]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(3) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(3) > a attributes", () => {
                equal($cssPath.attr("href"), "#", "href [#]");
                equal($cssPath.attr("class"), "jtShowGenerateHTMLTestCodeDialog  ", "class [jtShowGenerateHTMLTestCodeDialog  ]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(4)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(4) attributes", () => {
                equal($cssPath.attr("class"), "divider", "class [divider]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(5) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(5) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Testing", "href [#!Testing]");
                equal($cssPath.attr("class"), "jtTesting", "class [jtTesting]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(5) > a > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(0) > ul > li:eq(5) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-time", "class [glyphicon glyphicon-time]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span attributes", () => {
                equal($cssPath.attr("class"), "twitter-typeahead", "class [twitter-typeahead]");
                equal($cssPath.attr("style"), "position: relative; display: inline-block; direction: ltr;", "style [position: relative; display: inline-block; direction: ltr;]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > input:eq(0)");
            cssp.Test.TestInputTypeAhead.DoTest($cssPath, "#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > input:eq(0)");
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > input:eq(1)");
            cssp.Test.TestInputTypeAhead.DoTest($cssPath, "#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > input:eq(1)");
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > pre");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > pre attributes", () => {
                equal($cssPath.attr("aria-hidden"), "true", "aria-hidden [true]");
                equal($cssPath.attr("style"), "position: absolute; visibility: hidden; white-space: pre; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;", "style [position: absolute; visibility: hidden; white-space: pre; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > span attributes", () => {
                equal($cssPath.attr("class"), "tt-dropdown-menu", "class [tt-dropdown-menu]");
                equal($cssPath.attr("style"), "position: absolute; top: 100%; left: 0px; z-index: 100; display: none; right: auto;", "style [position: absolute; top: 100%; left: 0px; z-index: 100; display: none; right: auto;]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > span > div");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(0) > li:eq(1) > span > span > div attributes", () => {
                equal($cssPath.attr("class"), "tt-dataset-res", "class [tt-dataset-res]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "nav navbar-nav navbar-right", "class [nav navbar-nav navbar-right]");
                equal($cssPath.attr("role"), "menu", "role [menu]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(0) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(0) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Home", "href [#!Home]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(0) > a > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(0) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-home", "class [glyphicon glyphicon-home]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(1) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(1) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Administrator", "href [#!Administrator]");
                equal($cssPath.attr("class"), "hidden", "class [hidden]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(1) > a > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(1) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-arrow-down", "class [glyphicon glyphicon-arrow-down]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(2) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(2) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Profile", "href [#!Profile]");
                equal($cssPath.attr("class"), "", "class []");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(2) > a > span:eq(0)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(2) > a > span:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-user", "class [glyphicon glyphicon-user]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(2) > a > span:eq(1)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(2) > a > span:eq(1) attributes", () => {
                equal($cssPath.attr("id"), "UserEmail", "id [UserEmail]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(3)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(3) attributes", () => {
                equal($cssPath.attr("class"), "divider", "class [divider]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(4) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(4) > a attributes", () => {
                equal($cssPath.attr("class"), "jaLanguage", "class [jaLanguage]");
                equal($cssPath.attr("href"), "#!Language/fr-CA", "href [#!Language/fr-CA]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(4) > a > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(4) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-flag", "class [glyphicon glyphicon-flag]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(5)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(5) attributes", () => {
                equal($cssPath.attr("class"), "divider", "class [divider]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(6) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(6) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Login", "href [#!Login]");
                equal($cssPath.attr("class"), "hidden", "class [hidden]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(6) > a > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(6) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-log-in", "class [glyphicon glyphicon-log-in]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(7) > a");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(7) > a attributes", () => {
                equal($cssPath.attr("class"), "jaLogOff", "class [jaLogOff]");
                equal($cssPath.attr("href"), "#", "href [#]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(7) > a > span");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(7) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-log-out", "class [glyphicon glyphicon-log-out]");
            });
            $cssPath = $("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(8)");
            test("#HeaderDiv > nav > div > div:eq(1) > ul:eq(1) > li:eq(8) attributes", () => {
                equal($cssPath.attr("class"), "divider", "class [divider]");
            });
        };
        public TestFields: Function = (): void => {

            $("#qunit-tests").html("");
            cssp.Test.FuncTextArr = [];
            cssp.Test.RunFunc(0);
        };





        // **********************************************************
        // **********************************************************
        // **********************************************************

    }
}   