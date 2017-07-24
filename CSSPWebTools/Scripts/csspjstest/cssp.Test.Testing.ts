module CSSP.Test {
    export class Testing {
        // Variables
        public TSName: string = "csspp.Testing.ts";
        public appName: string = "cssp.Testing";
        public StringTestList: Array<string>;
        public StringTestOK: Array<boolean>;

        // Constructors
        constructor() {
        }

        // Functions

        // *****************************************************************
        // *****************************************************************
        // *****************************************************************




        public TestContents: Function = (): void => {
            
            $("#qunit-tests").html("");

            cssp.Test.RunCheckVariablesAndFunctions(this.TSName, this.appName, ["app", "Init", "TestingFormSubmit", ]);

            QUnit.module("#TestingDiv and children");

            var $cssPath: JQuery;
            $cssPath = $("#TestingDiv");
            test("#TestingDiv attributes", () => {
                equal($cssPath.attr("id"), "TestingDiv", "id [TestingDiv]");
                equal($cssPath.attr("class"), "container", "class [container]");
            });
            $cssPath = $("#TestingDiv > div");
            cssp.Test.TestAccordion.DoTest($cssPath, "#TestingDiv > div");
            $cssPath = $("#TestingDiv > div > div:eq(0)");
            test("#TestingDiv > div > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "panel panel-default", "class [panel panel-default]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(0)");
            test("#TestingDiv > div > div:eq(0) > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "panel-heading", "class [panel-heading]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(0) > h4");
            test("#TestingDiv > div > div:eq(0) > div:eq(0) > h4 attributes", () => {
                equal($cssPath.attr("class"), "panel-title", "class [panel-title]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(0) > h4 > a");
            test("#TestingDiv > div > div:eq(0) > div:eq(0) > h4 > a attributes", () => {
                equal($cssPath.attr("data-toggle"), "collapse", "data-toggle [collapse]");
                equal($cssPath.attr("data-parent"), "#accordion", "data-parent [#accordion]");
                equal($cssPath.attr("href"), "#collapseOne", "href [#collapseOne]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(1)");
            test("#TestingDiv > div > div:eq(0) > div:eq(1) attributes", () => {
                equal($cssPath.attr("id"), "collapseOne", "id [collapseOne]");
                equal($cssPath.attr("class"), "panel-collapse collapse in", "class [panel-collapse collapse in]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(1) > div");
            test("#TestingDiv > div > div:eq(0) > div:eq(1) > div attributes", () => {
                equal($cssPath.attr("class"), "panel-body", "class [panel-body]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(1)");
            test("#TestingDiv > div > div:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "panel panel-default", "class [panel panel-default]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(0)");
            test("#TestingDiv > div > div:eq(1) > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "panel-heading", "class [panel-heading]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(0) > h4");
            test("#TestingDiv > div > div:eq(1) > div:eq(0) > h4 attributes", () => {
                equal($cssPath.attr("class"), "panel-title", "class [panel-title]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(0) > h4 > a");
            test("#TestingDiv > div > div:eq(1) > div:eq(0) > h4 > a attributes", () => {
                equal($cssPath.attr("data-toggle"), "collapse", "data-toggle [collapse]");
                equal($cssPath.attr("data-parent"), "#accordion", "data-parent [#accordion]");
                equal($cssPath.attr("href"), "#collapseTwo", "href [#collapseTwo]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(1)");
            test("#TestingDiv > div > div:eq(1) > div:eq(1) attributes", () => {
                equal($cssPath.attr("id"), "collapseTwo", "id [collapseTwo]");
                equal($cssPath.attr("class"), "panel-collapse collapse", "class [panel-collapse collapse]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(1) > div");
            test("#TestingDiv > div > div:eq(1) > div:eq(1) > div attributes", () => {
                equal($cssPath.attr("class"), "panel-body", "class [panel-body]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(2)");
            test("#TestingDiv > div > div:eq(2) attributes", () => {
                equal($cssPath.attr("class"), "panel panel-default", "class [panel panel-default]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(0)");
            test("#TestingDiv > div > div:eq(2) > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "panel-heading", "class [panel-heading]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(0) > h4");
            test("#TestingDiv > div > div:eq(2) > div:eq(0) > h4 attributes", () => {
                equal($cssPath.attr("class"), "panel-title", "class [panel-title]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(0) > h4 > a");
            test("#TestingDiv > div > div:eq(2) > div:eq(0) > h4 > a attributes", () => {
                equal($cssPath.attr("data-toggle"), "collapse", "data-toggle [collapse]");
                equal($cssPath.attr("data-parent"), "#accordion", "data-parent [#accordion]");
                equal($cssPath.attr("href"), "#collapseThree", "href [#collapseThree]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(1)");
            test("#TestingDiv > div > div:eq(2) > div:eq(1) attributes", () => {
                equal($cssPath.attr("id"), "collapseThree", "id [collapseThree]");
                equal($cssPath.attr("class"), "panel-collapse collapse", "class [panel-collapse collapse]");
            });
            $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(1) > div");
            test("#TestingDiv > div > div:eq(2) > div:eq(1) > div attributes", () => {
                equal($cssPath.attr("class"), "panel-body", "class [panel-body]");
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


        public TestSendFormLoop: Function = (i: number): void => {
            if (i == 0) {
                $("#qunit-tests").html("");

                QUnit.module("Testing Send Form tests");

                this.ResetTestVariables(app);
            }
            this.FillAndExecuteFormLoop(i);
        };


        // Functions private
        // _______________________________________________________________________________________
        // _______________________________________________________________________________________
        // Functions private

        private DoNextItem: Function = (i: number): void => {
            i++;
            if (i < cssp.Test.Testing.StringTestList.length) {
                cssp.Test.Testing.TestSendFormLoop(i);
            }
            else {
                test("Finished", () => {
                    equal(true, true);
                });
            }
        };
        private FillAndExecuteFormLoop: Function = (i: number): void => {
            var $Form: JQuery = $("#TestingForm");
            var $EmailInput: JQuery = $Form.find("input[name=Email]").val(cssp.Test.Testing.StringTestList[i]);
            $Form.submit();
            setTimeout(() => {
                this.DoNextItem(i);
            }, 500);
        };
        private ResetTestVariables: Function = (): void => {
            cssp.Test.Testing.StringTestList = [];
            cssp.Test.Testing.StringTestOK = [];
            cssp.Test.Testing.StringTestList.push("charles.leblanc2@canada.ca");
            cssp.Test.Testing.StringTestOK.push(true);
            cssp.Test.Testing.StringTestList.push("charles.leblanc2@canada.ca");
            cssp.Test.Testing.StringTestOK.push(false);
        };
    }
}     