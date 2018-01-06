var CSSP;
(function (CSSP) {
    var TestDropDownMenu = /** @class */ (function () {
        function TestDropDownMenu() {
            this.DoTest = function ($cssPath, CurrentCSSPath) {
                test(CurrentCSSPath + " [dropdown]", function () {
                    ok($cssPath.children().length >= 2, "Drop down menu has at least 2 items");
                });
                var $button = $cssPath.children().eq(0);
                var $ul = $cssPath.children().eq(1);
                test(CurrentCSSPath + " [dropdown] [button]", function () {
                    ok($button.is("button"), "Drop down menu has first item button");
                    ok($button.hasClass("dropdown-toggle"), "First Button has class dropdown-toggle");
                    ok($button.attr("type") == "button", "First button has attr type == button");
                    ok($button.attr("id") != undefined, "first button has attr id");
                    ok($button.attr("data-toggle") != undefined, "first button has attr data-toggle");
                    ok($button.attr("data-toggle") == "dropdown", "first button has attr data-toggle equal to dropdown");
                });
                test(CurrentCSSPath + " [dropdown] [ul]", function () {
                    ok($ul.attr("aria-labelledby") != undefined, "ul has attr equal aria-labelledby");
                    ok($button.attr("id") == $ul.attr("aria-labelledby"), "first button id == ul aria-labelledby [" + $ul.attr("aria-labelledby") + "]");
                    ok($ul.hasClass("dropdown-menu"), "ul has class dropdown-menu");
                    ok($ul.attr("role") != undefined, "ul has role");
                    ok($ul.attr("role") == "menu", "ul has role == menu");
                });
                for (var i = 0, count = $ul.children().length; i < count; i++) {
                    var $li = $ul.children().eq(i);
                    test(CurrentCSSPath + " [dropdown] [ul] [li] [" + $li.text() + "]", function () {
                        ok($li.attr("role") != undefined, "ul li has role");
                        ok($li.attr("role") == "presentation", "ul li has role == presentation");
                        if ($li.hasClass("divider")) {
                            ok($li.children().length == 0, "ul li is divider and does not have anything in is (no children)");
                        }
                        else if ($li.hasClass("dropdown-header")) {
                            test(CurrentCSSPath + " [dropdown] [ul] [li] dropdown-header [" + $li.text() + "]", function () {
                                ok($li.text() != "", "ul li with dropdown-header has text [" + $li.text() + "]");
                            });
                        }
                        else {
                            var $a = $li.children().eq(0);
                            test(CurrentCSSPath + " [dropdown] [ul] [li] [a] [" + $a.text() + "]", function () {
                                ok($a.is("a"), "ul li first elem is a [" + $a.text() + "]");
                                ok($a.attr("role") != undefined, "ul li a has role attr");
                                ok($a.attr("role") == "menuitem", "ul li a role attr == menuitem");
                                ok($a.attr("tabindex") != undefined, "ul li a has tabindex attr");
                                ok($a.attr("tabindex") == "-1", "ul li a has tabindex attr == -1");
                            });
                        }
                    });
                }
            };
        }
        return TestDropDownMenu;
    }());
    CSSP.TestDropDownMenu = TestDropDownMenu;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestDropDownMenu.js.map