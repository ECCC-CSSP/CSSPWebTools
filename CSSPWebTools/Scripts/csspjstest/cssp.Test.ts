module CSSP.Test {
    export class FuncField {
        // Constructors
        constructor(public funcName: string, public fieldName: string, public formCSSPath: string) {
        }
    }
    export class app {
        // Variables
        public EmailTestList: Array<string>;
        public EmailTestExistList: Array<boolean>;
        public EmailTestNotWellFormedList: Array<boolean>;
        public StringTestList: Array<string>;
        public NumberTestList: Array<number>;
        public TestOKList: Array<boolean>;
        public $TextArea: JQuery;
        public FuncTextArr: Array<FuncField>;
        public Dialog: Test.Dialog;
        public DocumentEvent: Test.DocumentAEvents;
        public ForgotPassword: Test.ForgotPassword;
        public ForgotPasswordEmailSent: Test.ForgotPasswordEmailSent;
        public Header: Test.Header;
        public Home: Test.Home;
        public Login: Test.Login;
        public Profile: Test.Profile;
        public Register: Test.Register;
        public Testing: Test.Testing;
        public View: Test.View;

        public _DoesNotExist: string = "{0} does not exist.";
        public _IsAlreadyTaken: string = "{0} is already taken"
        public IsRunning: boolean = false;
        public AppName: string = "cssp";

        // Variables Testers
        public TestAccordion: CSSP.TestAccordion;
        public TestCreditCard: CSSP.TestCreditCard;
        public TestDate: CSSP.TestDate;
        public TestDateISO: CSSP.TestDateISO;
        public TestDigits: CSSP.TestDigits;
        public TestDropDownMenu: CSSP.TestDropDownMenu;
        public TestEmail: CSSP.TestEmail;
        public TestEqualTo: CSSP.TestEqualTo;
        public TestForm: CSSP.TestForm;
        public TestInput: CSSP.TestInput;
        public TestInputTypeAhead: CSSP.TestInputTypeAhead;
        public TestMax: CSSP.TestMax;
        public TestMaxLength: CSSP.TestMaxLength;
        public TestMin: CSSP.TestMin;
        public TestMinLength: CSSP.TestMinLength;
        public TestModal: CSSP.TestModal;
        public TestNumber: CSSP.TestNumber;
        public TestRange: CSSP.TestRange;
        public TestRangeLength: CSSP.TestRangeLength;
        public TestRemote: CSSP.TestRemote;
        public TestRequired: CSSP.TestRequired;
        public TestURL: CSSP.TestURL;

        // Constructor
        constructor() {
        }

        // Functions public
        public Init: Function = (): void => {
            if (Globalize.culture.name.substring(0, 2) == "fr") {
                cssp.Test._DoesNotExist = "[{0}] n'existe pas.";
                cssp.Test._IsAlreadyTaken = "{0} est déjà dans le système";
            }

            cssp.Test.Dialog = new Test.Dialog();
            cssp.Test.DocumentEvent = new Test.DocumentAEvents();
            cssp.Test.ForgotPassword = new Test.ForgotPassword();
            cssp.Test.ForgotPasswordEmailSent = new Test.ForgotPasswordEmailSent();
            cssp.Test.Header = new Test.Header();
            cssp.Test.Home = new Test.Home();
            cssp.Test.Login = new Test.Login();
            cssp.Test.Profile = new Test.Profile();
            cssp.Test.Register = new Test.Register();
            cssp.Test.Testing = new Test.Testing();
            cssp.Test.View = new Test.View();

            // Testers setup
            cssp.Test.TestAccordion = new CSSP.TestAccordion();
            cssp.Test.TestCreditCard = new CSSP.TestCreditCard();
            cssp.Test.TestDate = new CSSP.TestDate();
            cssp.Test.TestDateISO = new CSSP.TestDateISO();
            cssp.Test.TestDigits = new CSSP.TestDigits();
            cssp.Test.TestDropDownMenu = new CSSP.TestDropDownMenu();
            cssp.Test.TestEmail = new CSSP.TestEmail();
            cssp.Test.TestEqualTo = new CSSP.TestEqualTo();
            cssp.Test.TestForm = new CSSP.TestForm();
            cssp.Test.TestInput = new CSSP.TestInput();
            cssp.Test.TestInputTypeAhead = new CSSP.TestInputTypeAhead();
            cssp.Test.TestMax = new CSSP.TestMax();
            cssp.Test.TestMaxLength = new CSSP.TestMaxLength();
            cssp.Test.TestMin = new CSSP.TestMin();
            cssp.Test.TestMinLength = new CSSP.TestMinLength();
            cssp.Test.TestModal = new CSSP.TestModal();
            cssp.Test.TestNumber = new CSSP.TestNumber();
            cssp.Test.TestRange = new CSSP.TestRange();
            cssp.Test.TestRangeLength = new CSSP.TestRangeLength();
            cssp.Test.TestRemote = new CSSP.TestRemote();
            cssp.Test.TestRequired = new CSSP.TestRequired();
            cssp.Test.TestURL = new CSSP.TestURL();
        };
        public GenerateHTMLTestCode: Function = (): void => {
            cssp.Test.FuncTextArr = [];
            var $Dialog = $("#DialogGenerateHTMLTestCode");
            if ($Dialog) {
                var CSSPPath: string = $Dialog.find("input[name='CSSPath']").val();
                var AppName: string = $Dialog.find(".AppName").text();
                if (CSSPPath.length == 0) {
                    alert("Please enter starting CSSP Path");
                    return;
                }
                var $CSSPPath = $(CSSPPath);
                if ($CSSPPath) {
                    cssp.Test.$TextArea = $("#HTMLTestCode");
                    cssp.Test.$TextArea.text("").append("\r\n");

                    if ($(CSSPPath).length == 0) {
                        cssp.Test.$TextArea.append("Could not find element [" + CSSPPath + "]");
                    }
                    else {
                        cssp.Test.$TextArea.append("public TestContents: Function = (): void => {\r\n");
                        cssp.Test.$TextArea.append("\r\n");
                        cssp.Test.$TextArea.append("$(\"#qunit-tests\").html(\"\");\r\n\r\n");

                        cssp.Test.$TextArea.append("cssp.Test.RunCheckVariablesAndFunctions(this.TSName, this.appName, [");
                        for (var varAndFunc in eval(AppName)) {
                            cssp.Test.$TextArea.append("\"" + varAndFunc + "\", ");
                        }
                        cssp.Test.$TextArea.append("]);\r\n\r\n");
                        cssp.Test.$TextArea.append("QUnit.module(\"" + CSSPPath + " and children\");\r\n\r\n");
                        cssp.Test.$TextArea.append("var $cssPath: JQuery;\r\n");
                        cssp.Test.DoGenerateContentLoop($CSSPPath, CSSPPath);

                        cssp.Test.$TextArea.append("};\r\n");

                        cssp.Test.WriteTestFields();
                    }
                }
                else {
                    $("#HTMLTestCode").html("Could not find element with CSSP Path [" + CSSPPath + "]");
                }
            }
        };
        public RandomString: Function = (numbOfChar: number): string => {
            var RS = "";
            var possible = "abcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < numbOfChar; i++) {
                RS += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return RS;
        };
        public RunCheckVariablesAndFunctions: Function = (tsFileName: string, objStr: string, VarAndFuncList: Array<string>): void => {
            
            QUnit.module(tsFileName + " check variables");

            var objDone: Array<string> = [];
            for (var varAndFunc in eval(objStr)) {
                objDone.push(varAndFunc);
                test("Check if [" + varAndFunc + "] object or function exist [" + typeof (eval(objStr + "." + varAndFunc)) + "]", () => {
                    ok($.inArray(varAndFunc, VarAndFuncList) > -1, varAndFunc + " exist");
                    ok((typeof (eval(objStr + "." + varAndFunc)) == "undefined" ? false : true), " " + objStr + "." + varAndFunc + " exist");
                });
            }
            for (var i = 0, count = VarAndFuncList.length; i < count; i++) {
                if ($.inArray(VarAndFuncList[i], objDone) < 0) {
                    test("Check if [" + VarAndFuncList[i] + "] object or function exist [" + typeof (eval(objStr + "." + VarAndFuncList[i])) + "]", () => {
                        ok((typeof (eval(objStr + "." + VarAndFuncList[i])) == "undefined" ? false : true), " " + objStr + "." + VarAndFuncList[i] + " exist");
                    });
                }
            }
        };
        public RunFunc: Function = (RunNumb: number) => {
            
            cssp.Test.IsRunning = true;
            var $Form = $(cssp.Test.FuncTextArr[RunNumb].formCSSPath).parents("form");
            if ($Form.length != 1) {
                test("Error while trying to find '#" + $Form.attr("id"), () => {
                    ok(false, "Error in DoInputTag function");
                });
            }
            var $Input: JQuery = $Form.find("input[name='" + cssp.Test.FuncTextArr[RunNumb].fieldName + "']");
            if ($Input.length != 1) {
                test("Error while trying to find (\"input[name='" + cssp.Test.FuncTextArr[RunNumb].fieldName + "']\")", () => {
                    ok(false, "Error in DoInputTag function");
                });
            }
            var $NextSpan: JQuery = $Form.find("input[name='" + cssp.Test.FuncTextArr[RunNumb].fieldName + "']").next("span");
            if ($NextSpan.length != 1) {
                test("Error while trying to find (\"input[name='" + cssp.Test.FuncTextArr[RunNumb].fieldName + "']\").next(\"span\")", () => {
                    ok(false, "Error in DoInputTag function");
                });
            }
            cssp.Test.CleanFormVisibleInput($Form);
            setTimeout(() => {
                $Form.resetForm();
                setTimeout(() => {
                    eval("cssp.Test." + cssp.Test.FuncTextArr[RunNumb].funcName + ".DoTest($Form, $Input, $NextSpan, 0)");
                    cssp.Test.WaitingLoop(RunNumb);
                }, 100);
            }, 100);
        };
        public ShowGenerateHTMLTestCodeDialog: Function = (): void => {
            
            var $Dialog = $("#DialogGenerateHTMLTestCode");
            if ($Dialog.length == 1) {
                $Dialog.modal("show");
            }
            else {
                $.get(cssp.BaseURL + "Test/_dialogGenerateHTMLTestCode")
                    .done((html) => {
                        $("#dialogs-content").append(html);
                        $Dialog = $("#DialogGenerateHTMLTestCode");
                        $Dialog.modal("show");
                    })
                    .fail(() => {
                        alert(cssp.GetHTMLVariable("TestVariables", "varUnknownError"));
                    });
            }
            cssp.Test.Dialog.InitGenerateHTML();
        };
        public TestHide: Function = ($ajs: JQuery): void => {
            
            var URLVarShowNumber = cssp.GetURLVarShowNumber(URLVarShowEnum.ShowTesting);
            var temp: string = cssp.Variables.VariableShow;
            temp = temp.substr(0, URLVarShowNumber) + "0" + temp.substr(URLVarShowNumber + 1);
            cssp.Variables.VariableShow = temp;
            cssp.SetVisibility();
            var hashString = cssp.Sammy.CreateHashString();
            cssp.Sammy.Download(hashString);

        };

        public TestShow: Function = ($ajs: JQuery): void => {
            
            var URLVarShowNumber = cssp.GetURLVarShowNumber(URLVarShowEnum.ShowTesting);
            var temp: string = cssp.Variables.VariableShow;
            temp = temp.substr(0, URLVarShowNumber) + "1" + temp.substr(URLVarShowNumber + 1);
            cssp.Variables.VariableShow = temp;
            cssp.SetVisibility();
            var hashString = cssp.Sammy.CreateHashString();
            cssp.Sammy.Download(hashString);

        };
        public AddValueInInput: Function = ($input: JQuery, $nextSpan: JQuery, theValue: string): void => {
            $nextSpan.text("");
            for (var nn = 0; nn < 3; nn++) {
                $input.val("");
                $input.focus();
                $input.blur();
            }
            $input.val(theValue);
            $input.focus();
            $input.blur();
        };
        public CleanFormVisibleInput: Function = ($form: JQuery): void => {
            $form.find("input").each((ind: number, elem: Element) => {
                if ($(elem).attr("type") != "hidden") {
                    $(elem).val("aaa");
                    $(elem).focus();
                    $(elem).blur();
                    $(elem).val("");
                }
            });
        };
        public ShowTestButtons: Function = (): void => {
            
            if (cssp.Variables.VariableShow.charAt(URLVarShowEnum.ShowTesting) == "1") {
                $(".testing").removeClass("hidden");
            }
            else {
                $(".testing").addClass("hidden");
            }
        };


        // Functions private
        private DoGenerateContentLoop: Function = ($cssPath: JQuery, CurrentCSSPath: string): void => {
            if ($cssPath) {
                if ($cssPath[0].attributes.length > 0) {
                    if ($cssPath.is("input")) {
                        if ($cssPath.attr("type") != "hidden") {
                            cssp.Test.$TextArea.append("$cssPath = $(\"" + CurrentCSSPath + "\");\r\n");
                            if ($cssPath.hasClass("typeahead")) {
                                cssp.Test.$TextArea.append("cssp.Test.TestInputTypeAhead.DoTest($cssPath, \"" + CurrentCSSPath + "\");\r\n");
                            }
                            else {
                                cssp.Test.FillFuncTextArr($cssPath, CurrentCSSPath);
                                cssp.Test.$TextArea.append("cssp.Test.TestInput.DoTest($cssPath, \"" + CurrentCSSPath + "\");\r\n");
                            }
                        }
                        else {
                            cssp.Test.$TextArea.append("$cssPath = $(\"" + CurrentCSSPath + "\");\r\n");
                            cssp.Test.$TextArea.append("test(\"" + CurrentCSSPath +
                                ($cssPath.is("input") ? (" [" + $cssPath.attr("name") + "]") : "")
                                + " attributes\", () => {\r\n");
                            for (var i = 0, count = $cssPath[0].attributes.length; i < count; i++) {
                                if ($cssPath.attr("name") == "__RequestVerificationToken") {
                                    if ($cssPath[0].attributes[i].nodeName == "value") {
                                        cssp.Test.$TextArea.append("ok($(\"" + CurrentCSSPath + "\").attr(\"" +
                                            $cssPath[0].attributes[i].nodeName + "\").length > 0, " + "\"" +
                                            $cssPath[0].attributes[i].nodeName +
                                            " [does exist]\");\r\n");
                                        continue;
                                    }
                                }
                                cssp.Test.$TextArea.append("equal($cssPath.attr(\"" +
                                    $cssPath[0].attributes[i].nodeName + "\"), \"" +
                                    $cssPath[0].attributes[i].nodeValue + "\"," + "\"" +
                                    $cssPath[0].attributes[i].nodeName +
                                    " [" + $cssPath[0].attributes[i].nodeValue + "]\");\r\n");
                            }
                            cssp.Test.$TextArea.append("});\r\n");
                        }
                    }
                    else if ($cssPath.is("form")) {
                        cssp.Test.$TextArea.append("$cssPath = $(\"" + CurrentCSSPath + "\");\r\n");
                        cssp.Test.$TextArea.append("cssp.Test.TestForm.DoTest($cssPath, \"" + CurrentCSSPath + "\");\r\n");
                    }
                    else if ($cssPath.is("div.dropdown")) {
                        cssp.Test.$TextArea.append("$cssPath = $(\"" + CurrentCSSPath + "\");\r\n");
                        cssp.Test.$TextArea.append("cssp.Test.TestDropDownMenu.DoTest($cssPath, \"" + CurrentCSSPath + "\");\r\n");
                    }
                    else if ($cssPath.is("div.modal")) {
                        cssp.Test.$TextArea.append("$cssPath = $(\"" + CurrentCSSPath + "\");\r\n");
                        cssp.Test.$TextArea.append("cssp.Test.TestModal.DoTest($cssPath, \"" + CurrentCSSPath + "\");\r\n");
                    }
                    else if ($cssPath.is("div.panel-group")) {
                        cssp.Test.$TextArea.append("$cssPath = $(\"" + CurrentCSSPath + "\");\r\n");
                        cssp.Test.$TextArea.append("cssp.Test.TestAccordion.DoTest($cssPath, \"" + CurrentCSSPath + "\");\r\n");
                    }
                    else {
                        cssp.Test.$TextArea.append("$cssPath = $(\"" + CurrentCSSPath + "\");\r\n");
                        cssp.Test.$TextArea.append("test(\"" + CurrentCSSPath +
                            ($cssPath[0].tagName.toLocaleLowerCase() == "input" ? (" [" + $cssPath.attr("name") + "]") : "")
                            + " attributes\", () => {\r\n");
                        for (var i = 0, count = $cssPath[0].attributes.length; i < count; i++) {
                            cssp.Test.$TextArea.append("equal($cssPath.attr(\"" +
                                $cssPath[0].attributes[i].nodeName + "\"), \"" +
                                $cssPath[0].attributes[i].nodeValue + "\"," + "\"" +
                                $cssPath[0].attributes[i].nodeName +
                                " [" + $cssPath[0].attributes[i].nodeValue + "]\");\r\n");
                        }
                        cssp.Test.$TextArea.append("});\r\n");
                    }
                }
                var DiffTags: Array<string> = cssp.Test.FillDiffTags($cssPath);
                for (var k = 0, countk = DiffTags.length; k < countk; k++) {
                    var $SameTags: JQuery = $cssPath.children(DiffTags[k].toLowerCase());
                    if ($SameTags.length == 1) {
                        cssp.Test.DoGenerateContentLoop($($SameTags[0]), CurrentCSSPath + " > " + $SameTags[0].tagName.toLowerCase());
                    }
                    else {
                        for (var i = 0, count = $SameTags.length; i < count; i++) {
                            cssp.Test.DoGenerateContentLoop($($SameTags[i]), CurrentCSSPath + " > " + $SameTags[i].tagName.toLowerCase() + ":eq(" + i + ")");
                        }
                    }
                }
            }
        };
        private FillDiffTags: Function = ($cssPath: JQuery): Array<string> => {
            var DiffTags: Array<string> = [];
            for (var i = 0, count = $cssPath[0].children.length; i < count; i++) {
                var exist: boolean = false;
                for (var j = 0, countj = DiffTags.length; j < countj; j++) {
                    if (DiffTags[j] == $cssPath[0].children[i].tagName.toLowerCase()) {
                        exist = true;
                    }
                }
                if (!exist) {
                    DiffTags.push($cssPath[0].children[i].tagName.toLowerCase());
                }
            }
            return DiffTags;
        };
        private FillFuncTextArr: Function = ($cssPath: JQuery, CurrentCSSPath: string): void => {
            
            if ($cssPath.hasClass("typeahead")) {
                return; // no need to verify input with typeahead class at this time
            }
            try {
                $cssPath.rules();
            }
            catch (e) {
                if ($cssPath) {
                    if ($cssPath.attr("name") == undefined) {
                        $("#GenerateHTMLTestCodeStatus").text("Please add name attribute and rule to [" + $cssPath + "]");
                    }
                    else {
                        $("#GenerateHTMLTestCodeStatus").text("Please add rule for [" + $cssPath + "]");
                    }
                }
                else {
                    $("#GenerateHTMLTestCodeStatus").text("Error while " + $cssPath);
                }
                return;
            }
            for (var propName in $cssPath.rules()) {
                switch (propName) {
                    case "required":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestRequired", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "remote":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestRemote", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "minlength":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestMinLength", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "maxlength":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestMaxLength", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "rangelength":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestRangeLength", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "min":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestMin", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "max":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestMax", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "range":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestRange", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "email":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestEmail", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "url":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestURL", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "date":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestDate", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "dateISO":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestDateISO", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "number":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestNumber", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "digits":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestDigits", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "creditcard":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestCreditCard", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    case "equalTo":
                        {
                            cssp.Test.FuncTextArr.push(new CSSP.Test.FuncField("TestEqualTo", $cssPath.attr("name"), CurrentCSSPath));
                        }
                        break;
                    default:
                        {
                        }
                        break;
                }
                for (var propName2 in $cssPath.rules()[propName]) {
                    switch (propName2) {
                        case "url":
                            {
                            }
                            break;
                        case "data":
                            {
                            }
                            break;
                        default:
                            {
                            }
                            break;
                    }
                    for (var propName3 in $cssPath.rules()[propName][propName2]) {
                        if (propName2 == "url") {
                        }
                        else if (propName2 == "type") {
                        }
                        else {
                            switch (propName3) {
                                default:
                                    {
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
        };
        private WaitingLoop: Function = (RunNumb): void => {
            
            setTimeout(() => {
                if (cssp.Test.IsRunning) {
                    cssp.Test.WaitingLoop(RunNumb);
                }
                else {
                    RunNumb++;
                    if (RunNumb < cssp.Test.FuncTextArr.length) {
                        cssp.Test.RunFunc(RunNumb);
                    }
                }
            }, 300);
        };
        private WriteTestFields: Function = (): void => {
            
            cssp.Test.$TextArea.append("public TestFields: Function = (): void => {\r\n");
            cssp.Test.$TextArea.append(" \r\n");
            cssp.Test.$TextArea.append(" $(\"#qunit-tests\").html(\"\");\r\n");
            cssp.Test.$TextArea.append(" cssp.Test.FuncTextArr = [");
            for (var i = 0, count = cssp.Test.FuncTextArr.length; i < count; i++) {
                cssp.Test.$TextArea.append("new CSSP.Test.FuncField("
                    + "\"" + cssp.Test.FuncTextArr[i].funcName + "\", "
                    + "\"" + cssp.Test.FuncTextArr[i].fieldName + "\", "
                    + "\"" + cssp.Test.FuncTextArr[i].formCSSPath + "\"),\r\n");
            }
            cssp.Test.$TextArea.append(" ];\r\n");
            cssp.Test.$TextArea.append("cssp.Test.RunFunc(0);\r\n");
            cssp.Test.$TextArea.append("};\r\n");
        };
    }
} 