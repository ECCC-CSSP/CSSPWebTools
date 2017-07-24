var CSSP;
(function (CSSP) {
    var TestModal = (function () {
        function TestModal() {
            this.DoTest = function ($cssPath, CurrentCSSPath) {
                test(CurrentCSSPath + " [modal]", function () {
                    ok($cssPath.children().length == 1, "modal has 1 child div");
                });
                var $DivModalDialog = $cssPath.children().eq(0);
                test(CurrentCSSPath + " [modal] [modal-dialog]", function () {
                    ok($DivModalDialog.is("div"), "modal-dialog is div");
                    ok($DivModalDialog.hasClass("modal-dialog"), "div has class modal-dialog");
                });
                var $DivModelContent = $DivModalDialog.children().eq(0);
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content]", function () {
                    ok($DivModelContent.is("div"), "modal-content is div");
                    ok($DivModelContent.hasClass("modal-content"), "div has class modal-content");
                });
                var $DivModelHeader = $DivModelContent.children().eq(0);
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-header]", function () {
                    ok($DivModelHeader.is("div"), "modal-header is div");
                    ok($DivModelHeader.hasClass("modal-header"), "div has class modal-header");
                });
                var $DivModelHeaderButton = $DivModelHeader.children().eq(0);
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-header] [button]", function () {
                    ok($DivModelHeaderButton.is("button"), "modal-header first item is button");
                    ok($DivModelHeaderButton.hasClass("close"), "button has class close");
                    ok($DivModelHeaderButton.attr("type") != undefined, "button has attr type ");
                    ok($DivModelHeaderButton.attr("type") == "button", "button has attr type == button");
                    ok($DivModelHeaderButton.attr("data-dismiss") != undefined, "button has attr data-dismiss ");
                    ok($DivModelHeaderButton.attr("data-dismiss") == "modal", "button has attr data-dismiss == modal");
                });
                var $DivModelHeaderButtonSpan1 = $DivModelHeaderButton.children().eq(0);
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-header] [button] [first span]", function () {
                    ok($DivModelHeaderButtonSpan1.is("span"), "button has first span");
                    ok($DivModelHeaderButtonSpan1.attr("aria-hidden") != undefined, "first span has attr aria-hidden ");
                    ok($DivModelHeaderButtonSpan1.attr("aria-hidden") == "true", "first span has attr aria-hidden == true");
                    ok($DivModelHeaderButtonSpan1.text().length > 0, "first span has text length > 0");
                });
                var $DivModelHeaderButtonSpan2 = $DivModelHeaderButton.children().eq(1);
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-header] [button] [second span]", function () {
                    ok($DivModelHeaderButtonSpan2.is("span"), "button has second span");
                    ok($DivModelHeaderButtonSpan2.hasClass("sr-only"), "second span has class == sr-only");
                });
                var $DivModelHeaderH4 = $DivModelHeader.children().eq(1);
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-header] [h4]", function () {
                    ok($DivModelHeaderH4.is("h4"), "modal-header title is h4");
                    ok($DivModelHeaderH4.hasClass("modal-title"), "modal-header title has class == modal-title");
                    ok($DivModelHeaderH4.text().length > 0, "modal-header title has text");
                });
                var $DivModelBody = $DivModelContent.children().eq(1);
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-body]", function () {
                    ok($DivModelBody.is("div"), "modal-body is div");
                    ok($DivModelBody.hasClass("modal-body"), "div has class modal-body");
                });
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-body] [has tag p, div, form or span]", function () {
                    ok($DivModelBody.is("div") || $DivModelBody.is("span") || $DivModelBody.is("p") || $DivModelBody.is("form"), "modal-body has first tag == p, div, form or span");
                    ok($DivModelBody.children().eq(0).text().length > 0, "modal-body has text");
                });
                var $DivModelFooter = $DivModelContent.children().eq(2);
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-footer]", function () {
                    ok($DivModelFooter.is("div"), "modal-footer is div");
                    ok($DivModelFooter.hasClass("modal-footer"), "div has class modal-footer");
                });
                test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-footer] [buttons]", function () {
                    ok($DivModelFooter.children("button").length > 0, "modal-footer has at least one button");
                });
                for (var i = 0, count = $DivModelFooter.children("button").length; i < count; i++) {
                    var $DivModelFooterButton = $DivModelFooter.children("button").eq(i);
                    test(CurrentCSSPath + " [modal] [modal-dialog] [modal-content] [modal-footer] [button] [" + $DivModelFooterButton.text() + "]", function () {
                        ok($DivModelFooterButton.attr("type") != undefined, "button has attr type ");
                        ok($DivModelFooterButton.attr("type") == "button", "button has attr type == button");
                        ok($DivModelFooterButton.attr("data-dismiss") != undefined, "button has attr data-dismiss ");
                        ok($DivModelFooterButton.attr("data-dismiss") == "modal", "button has attr data-dismiss == modal");
                    });
                }
            };
        }
        return TestModal;
    }());
    CSSP.TestModal = TestModal;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestModal.js.map