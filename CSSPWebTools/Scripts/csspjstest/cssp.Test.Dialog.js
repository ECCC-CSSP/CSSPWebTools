var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var Dialog = /** @class */ (function () {
            // Constructors
            function Dialog() {
                var _this = this;
                // Variables
                this.TSName = "cssp.Dialog.ts";
                this.appName = "cssp.csspDialog";
                // Functions
                // *****************************************************************
                // *****************************************************************
                // *****************************************************************
                this.TestContents = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.RunCheckVariablesAndFunctions(_this.TSName, _this.appName, ["app", "InitDialogBasic", "ShowDialogBasic", "UpdateDialogBasic",]);
                    QUnit.module("#Dialog and children");
                    var $cssPath;
                    $cssPath = $("#Dialog");
                    cssp.Test.TestModal.DoTest($cssPath, "#Dialog");
                    $cssPath = $("#Dialog > div");
                    test("#Dialog > div attributes", function () {
                        equal($cssPath.attr("class"), "modal-dialog", "class [modal-dialog]");
                    });
                    $cssPath = $("#Dialog > div > div");
                    test("#Dialog > div > div attributes", function () {
                        equal($cssPath.attr("class"), "modal-content", "class [modal-content]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(0)");
                    test("#Dialog > div > div > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "modal-header", "class [modal-header]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(0) > button");
                    test("#Dialog > div > div > div:eq(0) > button attributes", function () {
                        equal($cssPath.attr("type"), "button", "type [button]");
                        equal($cssPath.attr("class"), "close", "class [close]");
                        equal($cssPath.attr("data-dismiss"), "modal", "data-dismiss [modal]");
                        equal($cssPath.attr("aria-hidden"), "true", "aria-hidden [true]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(0) > button > span:eq(0)");
                    test("#Dialog > div > div > div:eq(0) > button > span:eq(0) attributes", function () {
                        equal($cssPath.attr("aria-hidden"), "true", "aria-hidden [true]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(0) > button > span:eq(1)");
                    test("#Dialog > div > div > div:eq(0) > button > span:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "sr-only", "class [sr-only]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(0) > h4");
                    test("#Dialog > div > div > div:eq(0) > h4 attributes", function () {
                        equal($cssPath.attr("class"), "DialogTitle modal-title", "class [DialogTitle modal-title]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(1)");
                    test("#Dialog > div > div > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "modal-body", "class [modal-body]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(1) > p");
                    test("#Dialog > div > div > div:eq(1) > p attributes", function () {
                        equal($cssPath.attr("class"), "text-danger", "class [text-danger]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(1) > p > span:eq(0)");
                    test("#Dialog > div > div > div:eq(1) > p > span:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "DialogIcon glyphicon col-sm-2 glyphicon-warning-sign", "class [DialogIcon glyphicon col-sm-2 glyphicon-warning-sign]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(1) > p > span:eq(1)");
                    test("#Dialog > div > div > div:eq(1) > p > span:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "DialogMessage col-sm-10", "class [DialogMessage col-sm-10]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2)");
                    test("#Dialog > div > div > div:eq(2) attributes", function () {
                        equal($cssPath.attr("class"), "modal-footer", "class [modal-footer]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > button:eq(0)");
                    test("#Dialog > div > div > div:eq(2) > button:eq(0) attributes", function () {
                        equal($cssPath.attr("id"), "DialogYes", "id [DialogYes]");
                        equal($cssPath.attr("type"), "button", "type [button]");
                        equal($cssPath.attr("class"), "btn btn-default hidden", "class [btn btn-default hidden]");
                        equal($cssPath.attr("data-dismiss"), "modal", "data-dismiss [modal]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > button:eq(1)");
                    test("#Dialog > div > div > div:eq(2) > button:eq(1) attributes", function () {
                        equal($cssPath.attr("id"), "DialogNo", "id [DialogNo]");
                        equal($cssPath.attr("type"), "button", "type [button]");
                        equal($cssPath.attr("class"), "btn btn-default hidden", "class [btn btn-default hidden]");
                        equal($cssPath.attr("data-dismiss"), "modal", "data-dismiss [modal]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > button:eq(2)");
                    test("#Dialog > div > div > div:eq(2) > button:eq(2) attributes", function () {
                        equal($cssPath.attr("id"), "DialogOK", "id [DialogOK]");
                        equal($cssPath.attr("type"), "button", "type [button]");
                        equal($cssPath.attr("class"), "btn btn-default hidden", "class [btn btn-default hidden]");
                        equal($cssPath.attr("data-dismiss"), "modal", "data-dismiss [modal]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > button:eq(3)");
                    test("#Dialog > div > div > div:eq(2) > button:eq(3) attributes", function () {
                        equal($cssPath.attr("id"), "DialogSave", "id [DialogSave]");
                        equal($cssPath.attr("type"), "button", "type [button]");
                        equal($cssPath.attr("class"), "btn btn-default hidden", "class [btn btn-default hidden]");
                        equal($cssPath.attr("data-dismiss"), "modal", "data-dismiss [modal]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > button:eq(4)");
                    test("#Dialog > div > div > div:eq(2) > button:eq(4) attributes", function () {
                        equal($cssPath.attr("id"), "DialogCancel", "id [DialogCancel]");
                        equal($cssPath.attr("type"), "button", "type [button]");
                        equal($cssPath.attr("class"), "btn btn-default hidden", "class [btn btn-default hidden]");
                        equal($cssPath.attr("data-dismiss"), "modal", "data-dismiss [modal]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > button:eq(5)");
                    test("#Dialog > div > div > div:eq(2) > button:eq(5) attributes", function () {
                        equal($cssPath.attr("id"), "DialogClose", "id [DialogClose]");
                        equal($cssPath.attr("type"), "button", "type [button]");
                        equal($cssPath.attr("class"), "btn btn-default", "class [btn btn-default]");
                        equal($cssPath.attr("data-dismiss"), "modal", "data-dismiss [modal]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > div:eq(0)");
                    test("#Dialog > div > div > div:eq(2) > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "clearfix", "class [clearfix]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > div:eq(1)");
                    test("#Dialog > div > div > div:eq(2) > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "testing", "class [testing]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > div:eq(1) > span:eq(0)");
                    test("#Dialog > div > div > div:eq(2) > div:eq(1) > span:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "divName", "class [divName]");
                        equal($cssPath.attr("style"), "display: none", "style [display: none]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > div:eq(1) > span:eq(1)");
                    test("#Dialog > div > div > div:eq(2) > div:eq(1) > span:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "appName", "class [appName]");
                        equal($cssPath.attr("style"), "display: none", "style [display: none]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > div:eq(1) > a:eq(0)");
                    test("#Dialog > div > div > div:eq(2) > div:eq(1) > a:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "jtTestDialogContents btn btn-default", "class [jtTestDialogContents btn btn-default]");
                    });
                    $cssPath = $("#Dialog > div > div > div:eq(2) > div:eq(1) > a:eq(1)");
                    test("#Dialog > div > div > div:eq(2) > div:eq(1) > a:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "jtTestDialogFields btn btn-default", "class [jtTestDialogFields btn btn-default]");
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
                // Functions public
                this.InitGenerateHTML = function () {
                    $("#HTMLTestCode").text("");
                    $("#DialogGenerateHTMLTestCode").find(".selectCSSPath").html("");
                    $("#DialogGenerateHTMLTestCode").find(".selectCSSPath").append("<option data-other=\"select one\" value=\"\">select one</option>");
                    $("span.divName").each(function (ind, elem) {
                        if (!$(elem).next("span").hasClass("appName")) {
                            $("#HTMLTestCode").text("\r\nError could not find next span with class appName.\r\n");
                            return;
                        }
                        $("#DialogGenerateHTMLTestCode").find(".selectCSSPath").append("<option data-other=\"" + $(elem).next("span").text() + "\" value=\"" + $(elem).text() + "\">" + $(elem).text() + "</option>");
                    });
                    $("#DialogGenerateHTMLTestCode .selectCSSPath").change(function () {
                        $("#DialogGenerateHTMLTestCode input[name='CSSPath']").val($(this).find(":selected").eq(0).text());
                        $("#DialogGenerateHTMLTestCode .AppName").text($(this).find(":selected").eq(0).data("other"));
                    });
                };
            }
            return Dialog;
        }());
        Test.Dialog = Dialog;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.Dialog.js.map