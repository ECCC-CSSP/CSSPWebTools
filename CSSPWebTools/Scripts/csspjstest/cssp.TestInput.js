var CSSP;
(function (CSSP) {
    var TestInput = /** @class */ (function () {
        function TestInput() {
            this.DoTest = function ($cssPath, CurrentCSSPath) {
                test(CurrentCSSPath + " [" + $cssPath.attr("name") + "]", function () {
                    ok($cssPath.next()[0].tagName.toLowerCase() == "span", "[next span does exist]");
                    ok($cssPath.next().hasClass("help-block"), "[next span does exist with class help-block]");
                    ok($cssPath.parent("div").length == 1, "[parent of input is a div]");
                    ok($cssPath.parents("div.form-group"), "[one of parent of input is a div with class form-group]");
                    ok($cssPath.attr("name") != "", "[input with name attribute exist]");
                    ok($cssPath.parents("div.form-group").children().eq(0).is("label"), "[input parent with form-group first child is Label]");
                    ok($cssPath.parents("div.form-group").children().eq(0).hasClass("control-label"), "[input parent with form-group first child has class equal control-label]");
                });
                test(CurrentCSSPath + " [" + $cssPath.attr("name") + "] Validate ", function () {
                    ok($cssPath.parents("form").length == 1, "[Form exist for input]");
                    var isEmpty = true;
                    for (var prop in $cssPath.rules()) {
                        isEmpty = false;
                    }
                    ok(isEmpty == false, " [Form validate exist for input]");
                    for (var propName in $cssPath.rules()) {
                        switch (propName) {
                            case "required":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "remote":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                    ok(eval("$cssPath.rules()." + propName + ".url.length > 0"), "[" + propName + " exist for input]");
                                }
                                break;
                            case "minlength":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "maxlength":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "rangelength":
                                {
                                    equal(eval("$cssPath.rules()." + propName + "[0]"), $cssPath.rules()[propName][0], "[" + propName + " exist for input first value of " + $cssPath.rules()[propName][0] + "]");
                                    equal(eval("$cssPath.rules()." + propName + "[1]"), $cssPath.rules()[propName][1], "[" + propName + " exist for input second value of " + $cssPath.rules()[propName][1] + "]");
                                }
                                break;
                            case "min":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "max":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "range":
                                {
                                    equal(eval("$cssPath.rules()." + propName + "[0]"), $cssPath.rules()[propName][0], "[" + propName + " exist for input first value of " + $cssPath.rules()[propName][0] + "]");
                                    equal(eval("$cssPath.rules()." + propName + "[1]"), $cssPath.rules()[propName][1], "[" + propName + " exist for input second value of " + $cssPath.rules()[propName][1] + "]");
                                }
                                break;
                            case "email":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "url":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "date":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "dateISO":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "number":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "digits":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "creditcard":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                            case "equalTo":
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input]");
                                    ok(eval("$cssPath.parents(\"form\").find(\"" + $cssPath.rules()[propName] + "\").length == 1"), "[" + $cssPath.rules()[propName] + " exist for equal rule of " + propName + " exist for input]");
                                    continue;
                                }
                            default:
                                {
                                    equal(eval("$cssPath.rules()." + propName), $cssPath.rules()[propName], "[" + propName + " exist for input value of " + $cssPath.rules()[propName] + "]");
                                }
                                break;
                        }
                        for (var propName2 in $cssPath.rules()[propName]) {
                            switch (propName2) {
                                case "url":
                                    {
                                        equal(eval("$cssPath.rules()." + propName + "." + propName2), $cssPath.rules()[propName][propName2].replace(/\+/g, "\/").replace(Globalize.culture.name, Globalize.culture.name), "[" + propName + "." + propName2 + " exist for input value of " + $cssPath.rules()[propName][propName2].replace(/\+/g, "\\/").replace(Globalize.culture.name, Globalize.culture.name) + "]");
                                    }
                                    break;
                                case "data":
                                    {
                                        equal(eval("typeof($cssPath.rules()." + propName + "." + propName2 + ")"), "object", "[" + propName + "." + propName2 + " exist for input]");
                                    }
                                    break;
                                default:
                                    {
                                        if (propName == "range" || propName == "rangelength") {
                                        }
                                        else {
                                            equal(eval("$cssPath.rules()." + propName + "." + propName2), $cssPath.rules()[propName][propName2].replace(/\+/g, "\\/"), "[" + propName + "." + propName2 + " exist for input value of " + $cssPath.rules()[propName][propName2].replace(/\+/g, "\\/") + "]");
                                        }
                                    }
                                    break;
                            }
                            if (propName == "range" || propName == "rangelength") {
                            }
                            else {
                                for (var propName3 in $cssPath.rules()[propName][propName2]) {
                                    if (propName2 == "url") {
                                    }
                                    else if (propName2 == "type") {
                                    }
                                    else {
                                        switch (propName3) {
                                            default:
                                                {
                                                    equal(eval("typeof($cssPath.rules()." + propName + "." + propName2 + "." + propName3 + ")"), typeof ($cssPath.rules()[propName][propName2][propName3]), "[" + propName + "." + propName2 + "." + propName3 + " exist for input type of " + typeof ($cssPath.rules()[propName][propName2][propName3]) + "]");
                                                }
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            };
        }
        return TestInput;
    }());
    CSSP.TestInput = TestInput;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestInput.js.map