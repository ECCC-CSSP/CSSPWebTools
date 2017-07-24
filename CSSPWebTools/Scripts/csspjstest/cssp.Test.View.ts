module CSSP.Test {
    export class View {
        // Variables
        public TSName: string = "cssp.View.ts";
        public appName: string = "cssp.View";


        // Constructors
        constructor() {
        }

        // Functions

        // *****************************************************************
        // *****************************************************************
        // *****************************************************************




        public TestContents: Function = (): void => {

            $("#qunit-tests").html("");

            cssp.Test.RunCheckVariablesAndFunctions(this.TSName, this.appName, ["Init", "ShowHideSecurity", "Permissions", ]);

            QUnit.module("#ViewDiv and children");

            var $cssPath: JQuery;
            $cssPath = $("#ViewDiv");
            test("#ViewDiv attributes", () => {
                equal($cssPath.attr("id"), "ViewDiv", "id [ViewDiv]");
                equal($cssPath.attr("data-tvitemid"), "1", "data-tvitemid [1]");
                equal($cssPath.attr("data-tvtype"), "root", "data-tvtype [root]");
            });
            $cssPath = $("#ViewDiv > ol");
            test("#ViewDiv > ol attributes", () => {
                equal($cssPath.attr("class"), "breadcrumb", "class [breadcrumb]");
            });
            $cssPath = $("#ViewDiv > div");
            test("#ViewDiv > div attributes", () => {
                equal($cssPath.attr("class"), "container-fluid", "class [container-fluid]");
            });
            $cssPath = $("#ViewDiv > div > div");
            test("#ViewDiv > div > div attributes", () => {
                equal($cssPath.attr("class"), "panel panel-default", "class [panel panel-default]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(0)");
            test("#ViewDiv > div > div > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "panel-heading", "class [panel-heading]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(0) > div");
            test("#ViewDiv > div > div > div:eq(0) > div attributes", () => {
                equal($cssPath.attr("class"), "panel-title", "class [panel-title]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(0) > div > div > div");
            test("#ViewDiv > div > div > div:eq(0) > div > div > div attributes", () => {
                equal($cssPath.attr("class"), "pull-right", "class [pull-right]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(0) > div > div > div > button");
            test("#ViewDiv > div > div > div:eq(0) > div > div > div > button attributes", () => {
                equal($cssPath.attr("class"), "jbSecurity btn btn-default", "class [jbSecurity btn btn-default]");
                equal($cssPath.attr("data-tvauth"), "1", "data-tvauth [1]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(0) > div > div > div > button > span");
            test("#ViewDiv > div > div > div:eq(0) > div > div > div > button > span attributes", () => {
                equal($cssPath.attr("class"), "text-success", "class [text-success]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(0) > div > div > div > button > span > span");
            test("#ViewDiv > div > div > div:eq(0) > div > div > div > button > span > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-", "class [glyphicon glyphicon-]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1)");
            test("#ViewDiv > div > div > div:eq(1) attributes", () => {
                equal($cssPath.attr("id"), "tabContent", "id [tabContent]");
                equal($cssPath.attr("class"), "panel-body", "class [panel-body]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "dropdown-toggle hidden-lg hidden-md", "class [dropdown-toggle hidden-lg hidden-md]");
                equal($cssPath.attr("data-toggle"), "collapse", "data-toggle [collapse]");
                equal($cssPath.attr("data-target"), "#tablistCollapseID", "data-target [#tablistCollapseID]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div");
            cssp.Test.TestDropDownMenu.DoTest($cssPath, "#ViewDiv > div > div > div:eq(1) > div:eq(0) > div");
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > button");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > button attributes", () => {
                equal($cssPath.attr("class"), "btn btn-danger dropdown-toggle", "class [btn btn-danger dropdown-toggle]");
                equal($cssPath.attr("type"), "button", "type [button]");
                equal($cssPath.attr("id"), "tablistDropdown", "id [tablistDropdown]");
                equal($cssPath.attr("data-toggle"), "dropdown", "data-toggle [dropdown]");
                equal($cssPath.attr("aria-expanded"), "true", "aria-expanded [true]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > button > span:eq(0) > span");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > button > span:eq(0) > span attributes", () => {
                equal($cssPath.attr("class"), "badge", "class [badge]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > button > span:eq(1)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > button > span:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "caret", "class [caret]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul attributes", () => {
                equal($cssPath.attr("class"), "dropdown-menu", "class [dropdown-menu]");
                equal($cssPath.attr("role"), "menu", "role [menu]");
                equal($cssPath.attr("aria-labelledby"), "tablistDropdown", "aria-labelledby [tablistDropdown]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(0)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(0) attributes", () => {
                equal($cssPath.attr("role"), "presentation", "role [presentation]");
                equal($cssPath.attr("class"), "", "class []");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(0) > a");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(0) > a attributes", () => {
                equal($cssPath.attr("href"), "#!View/All locations/A|||1/1|||10000000000000000000000000000000000000000000000000|||20101970", "href [#!View/All locations/A|||1/1|||10000000000000000000000000000000000000000000000000|||20101970]");
                equal($cssPath.attr("role"), "menuitem", "role [menuitem]");
                equal($cssPath.attr("tabindex"), "-1", "tabindex [-1]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(0) > a > span");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(0) > a > span attributes", () => {
                equal($cssPath.attr("class"), "badge", "class [badge]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(1)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(1) attributes", () => {
                equal($cssPath.attr("role"), "presentation", "role [presentation]");
                equal($cssPath.attr("class"), "active", "class [active]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(1) > a");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(1) > a attributes", () => {
                equal($cssPath.attr("href"), "#!View/All locations/A|||1/1|||10010000000000000000000000000000000000000000000000|||20101970", "href [#!View/All locations/A|||1/1|||10010000000000000000000000000000000000000000000000|||20101970]");
                equal($cssPath.attr("role"), "menuitem", "role [menuitem]");
                equal($cssPath.attr("tabindex"), "-1", "tabindex [-1]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(1) > a > span");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(0) > div > ul > li:eq(1) > a > span attributes", () => {
                equal($cssPath.attr("class"), "badge", "class [badge]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(1)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "visible-lg visible-md", "class [visible-lg visible-md]");
                equal($cssPath.attr("role"), "tabpanel", "role [tabpanel]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul attributes", () => {
                equal($cssPath.attr("class"), "nav nav-tabs ", "class [nav nav-tabs ]");
                equal($cssPath.attr("role"), "tablist", "role [tablist]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(0)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "", "class []");
                equal($cssPath.attr("role"), "presentation", "role [presentation]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(0) > a");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(0) > a attributes", () => {
                equal($cssPath.attr("href"), "#!View/All locations/A|||1/1|||10000000000000000000000000000000000000000000000000|||20101970", "href [#!View/All locations/A|||1/1|||10000000000000000000000000000000000000000000000000|||20101970]");
                equal($cssPath.attr("role"), "tab", "role [tab]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(0) > a > span");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(0) > a > span attributes", () => {
                equal($cssPath.attr("class"), "badge", "class [badge]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(1)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "active", "class [active]");
                equal($cssPath.attr("role"), "presentation", "role [presentation]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(1) > a");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(1) > a attributes", () => {
                equal($cssPath.attr("href"), "#!View/All locations/A|||1/1|||10010000000000000000000000000000000000000000000000|||20101970", "href [#!View/All locations/A|||1/1|||10010000000000000000000000000000000000000000000000|||20101970]");
                equal($cssPath.attr("role"), "tab", "role [tab]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(1) > a > span");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(1) > ul > li:eq(1) > a > span attributes", () => {
                equal($cssPath.attr("class"), "badge", "class [badge]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) attributes", () => {
                equal($cssPath.attr("class"), "container-fluid", "class [container-fluid]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div attributes", () => {
                equal($cssPath.attr("class"), "container paraBlock", "class [container paraBlock]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div attributes", () => {
                equal($cssPath.attr("class"), "row", "class [row]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div attributes", () => {
                equal($cssPath.attr("class"), "panel panel-info ", "class [panel panel-info ]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(0)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "panel-heading", "class [panel-heading]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(0) > h4");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(0) > h4 attributes", () => {
                equal($cssPath.attr("class"), "panel-title", "class [panel-title]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1)");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "panel-body", "class [panel-body]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul attributes", () => {
                equal($cssPath.attr("class"), "list-inline blockMargin", "class [list-inline blockMargin]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul > li:eq(0) > a");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul > li:eq(0) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Login", "href [#!Login]");
                equal($cssPath.attr("class"), "btn btn-primary", "class [btn btn-primary]");
                equal($cssPath.attr("role"), "button", "role [button]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul > li:eq(0) > a > span");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul > li:eq(0) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-log-in", "class [glyphicon glyphicon-log-in]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul > li:eq(1) > a");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul > li:eq(1) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Register", "href [#!Register]");
                equal($cssPath.attr("class"), "btn btn-primary", "class [btn btn-primary]");
                equal($cssPath.attr("role"), "button", "role [button]");
            });
            $cssPath = $("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul > li:eq(1) > a > span");
            test("#ViewDiv > div > div > div:eq(1) > div:eq(2) > div > div > div > div:eq(1) > ul > li:eq(1) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-asterisk", "class [glyphicon glyphicon-asterisk]");
            });
        };
        public TestFields: Function = (): void => {

            $("#qunit-tests").html("");
            cssp.Test.FuncTextArr = [];
            cssp.Test.RunFunc(0);
        };







        // *****************************************************************
        // *****************************************************************
        // *****************************************************************


    }
}       