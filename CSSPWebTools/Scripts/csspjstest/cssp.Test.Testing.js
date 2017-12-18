var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var Testing = /** @class */ (function () {
            // Constructors
            function Testing() {
                var _this = this;
                // Variables
                this.TSName = "csspp.Testing.ts";
                this.appName = "cssp.Testing";
                // Functions
                // *****************************************************************
                // *****************************************************************
                // *****************************************************************
                this.TestContents = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.RunCheckVariablesAndFunctions(_this.TSName, _this.appName, ["app", "Init", "TestingFormSubmit",]);
                    QUnit.module("#TestingDiv and children");
                    var $cssPath;
                    $cssPath = $("#TestingDiv");
                    test("#TestingDiv attributes", function () {
                        equal($cssPath.attr("id"), "TestingDiv", "id [TestingDiv]");
                        equal($cssPath.attr("class"), "container", "class [container]");
                    });
                    $cssPath = $("#TestingDiv > div");
                    cssp.Test.TestAccordion.DoTest($cssPath, "#TestingDiv > div");
                    $cssPath = $("#TestingDiv > div > div:eq(0)");
                    test("#TestingDiv > div > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "panel panel-default", "class [panel panel-default]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(0)");
                    test("#TestingDiv > div > div:eq(0) > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "panel-heading", "class [panel-heading]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(0) > h4");
                    test("#TestingDiv > div > div:eq(0) > div:eq(0) > h4 attributes", function () {
                        equal($cssPath.attr("class"), "panel-title", "class [panel-title]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(0) > h4 > a");
                    test("#TestingDiv > div > div:eq(0) > div:eq(0) > h4 > a attributes", function () {
                        equal($cssPath.attr("data-toggle"), "collapse", "data-toggle [collapse]");
                        equal($cssPath.attr("data-parent"), "#accordion", "data-parent [#accordion]");
                        equal($cssPath.attr("href"), "#collapseOne", "href [#collapseOne]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(1)");
                    test("#TestingDiv > div > div:eq(0) > div:eq(1) attributes", function () {
                        equal($cssPath.attr("id"), "collapseOne", "id [collapseOne]");
                        equal($cssPath.attr("class"), "panel-collapse collapse in", "class [panel-collapse collapse in]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(0) > div:eq(1) > div");
                    test("#TestingDiv > div > div:eq(0) > div:eq(1) > div attributes", function () {
                        equal($cssPath.attr("class"), "panel-body", "class [panel-body]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(1)");
                    test("#TestingDiv > div > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "panel panel-default", "class [panel panel-default]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(0)");
                    test("#TestingDiv > div > div:eq(1) > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "panel-heading", "class [panel-heading]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(0) > h4");
                    test("#TestingDiv > div > div:eq(1) > div:eq(0) > h4 attributes", function () {
                        equal($cssPath.attr("class"), "panel-title", "class [panel-title]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(0) > h4 > a");
                    test("#TestingDiv > div > div:eq(1) > div:eq(0) > h4 > a attributes", function () {
                        equal($cssPath.attr("data-toggle"), "collapse", "data-toggle [collapse]");
                        equal($cssPath.attr("data-parent"), "#accordion", "data-parent [#accordion]");
                        equal($cssPath.attr("href"), "#collapseTwo", "href [#collapseTwo]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(1)");
                    test("#TestingDiv > div > div:eq(1) > div:eq(1) attributes", function () {
                        equal($cssPath.attr("id"), "collapseTwo", "id [collapseTwo]");
                        equal($cssPath.attr("class"), "panel-collapse collapse", "class [panel-collapse collapse]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(1) > div:eq(1) > div");
                    test("#TestingDiv > div > div:eq(1) > div:eq(1) > div attributes", function () {
                        equal($cssPath.attr("class"), "panel-body", "class [panel-body]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(2)");
                    test("#TestingDiv > div > div:eq(2) attributes", function () {
                        equal($cssPath.attr("class"), "panel panel-default", "class [panel panel-default]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(0)");
                    test("#TestingDiv > div > div:eq(2) > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "panel-heading", "class [panel-heading]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(0) > h4");
                    test("#TestingDiv > div > div:eq(2) > div:eq(0) > h4 attributes", function () {
                        equal($cssPath.attr("class"), "panel-title", "class [panel-title]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(0) > h4 > a");
                    test("#TestingDiv > div > div:eq(2) > div:eq(0) > h4 > a attributes", function () {
                        equal($cssPath.attr("data-toggle"), "collapse", "data-toggle [collapse]");
                        equal($cssPath.attr("data-parent"), "#accordion", "data-parent [#accordion]");
                        equal($cssPath.attr("href"), "#collapseThree", "href [#collapseThree]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(1)");
                    test("#TestingDiv > div > div:eq(2) > div:eq(1) attributes", function () {
                        equal($cssPath.attr("id"), "collapseThree", "id [collapseThree]");
                        equal($cssPath.attr("class"), "panel-collapse collapse", "class [panel-collapse collapse]");
                    });
                    $cssPath = $("#TestingDiv > div > div:eq(2) > div:eq(1) > div");
                    test("#TestingDiv > div > div:eq(2) > div:eq(1) > div attributes", function () {
                        equal($cssPath.attr("class"), "panel-body", "class [panel-body]");
                    });
                };
                this.TestFields = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.FuncTextArr = [];
                    cssp.Test.RunFunc(0);
                };
                // *****************************************************************
                // *****************************************************************
                // *****************************************************************
                this.TestSendFormLoop = function (i) {
                    if (i == 0) {
                        $("#qunit-tests").html("");
                        QUnit.module("Testing Send Form tests");
                        _this.ResetTestVariables(Test.app);
                    }
                    _this.FillAndExecuteFormLoop(i);
                };
                // Functions private
                // _______________________________________________________________________________________
                // _______________________________________________________________________________________
                // Functions private
                this.DoNextItem = function (i) {
                    i++;
                    if (i < cssp.Test.Testing.StringTestList.length) {
                        cssp.Test.Testing.TestSendFormLoop(i);
                    }
                    else {
                        test("Finished", function () {
                            equal(true, true);
                        });
                    }
                };
                this.FillAndExecuteFormLoop = function (i) {
                    var $Form = $("#TestingForm");
                    var $EmailInput = $Form.find("input[name=Email]").val(cssp.Test.Testing.StringTestList[i]);
                    $Form.submit();
                    setTimeout(function () {
                        _this.DoNextItem(i);
                    }, 500);
                };
                this.ResetTestVariables = function () {
                    cssp.Test.Testing.StringTestList = [];
                    cssp.Test.Testing.StringTestOK = [];
                    cssp.Test.Testing.StringTestList.push("charles.leblanc2@canada.ca");
                    cssp.Test.Testing.StringTestOK.push(true);
                    cssp.Test.Testing.StringTestList.push("charles.leblanc2@canada.ca");
                    cssp.Test.Testing.StringTestOK.push(false);
                };
            }
            return Testing;
        }());
        Test.Testing = Testing;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.Testing.js.map