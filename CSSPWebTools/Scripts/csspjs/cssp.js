var CSSP;
(function (CSSP) {
    var app = (function () {
        // Constructors
        function app() {
            var _this = this;
            this.IsShowMoreInfo = false;
            this.URLText = "";
            // Functions
            this.CheckInputWithNumbers = function () {
                var dotFound = false;
                var IndexOfStr = ",";
                var ErrMessage = "varPleaseUseCommaOrDotForDecimal";
                if (Globalize.culture.name.substr(0, 2) == "fr") {
                    IndexOfStr = ".";
                    ErrMessage = "varPleaseUseCommaOrDotForDecimal";
                }
                $("input.isnumber").each(function (ind, elem) {
                    if ($(elem).val().indexOf(IndexOfStr) > -1) {
                        dotFound = true;
                        $(elem).closest(".form-group").removeClass("has-error").addClass("has-error");
                        $(elem).next("span.help-block").html(cssp.GetHTMLVariable("#LayoutVariables", ErrMessage));
                    }
                });
                return dotFound;
            };
            this.ClearLastUpdateAndName = function () {
                var $LastUpdateAndNameList = $(".LastUpdateAndName").each(function (ind, elem) {
                    $(elem).html("");
                });
            };
            this.FillLastUpdateAndTVText = function ($elem, table, id) {
                var command = "Base/_GetLastUpdateAndTVText";
                var date = new Date();
                var offset_min = date.getTimezoneOffset();
                $elem.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $.get(cssp.BaseURL + command, {
                    Table: table,
                    ID: id,
                    Offset_min: offset_min,
                }).done(function (ret) {
                    $elem.html(ret);
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.GetHTMLVariable = function (selector, varName) {
                var retVar = $(selector).find("span." + varName).text();
                if (retVar) {
                    return retVar;
                }
                else {
                    return "Error: Variable [" + varName + "] does not exist in [" + selector + "]";
                }
            };
            this.GetLastUpdateAndTVText = function () {
                var $LastUpdateAndTVText = $(".LastUpdateAndTVText");
                if ($LastUpdateAndTVText.length > 0) {
                    if ($LastUpdateAndTVText.eq(0).children().length > 0) {
                        var $LastUpdateAndNameList = $(".LastUpdateAndTVText").each(function (ind, elem) {
                            $(elem).html("");
                        });
                    }
                    else {
                        var $LastUpdateAndNameList = $(".LastUpdateAndTVText").each(function (ind, elem) {
                            cssp.FillLastUpdateAndTVText($(elem), $(elem).data("table"), $(elem).data("id"));
                        });
                    }
                }
            };
            this.GetMoreInfo = function (elem) {
                if (!$(elem).html().length) {
                    var TVItemID = parseInt($(elem).data("tvitemid"));
                    var NumberOfSample = parseInt($(elem).data("numberofsample"));
                    $(elem).html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    var command = "TVItem/_TVItemMoreInfo";
                    $.get(cssp.BaseURL + command, {
                        Q: "!View/" + cssp.Variables.URL,
                        TVItemID: TVItemID,
                        NumberOfSample: NumberOfSample,
                    }).done(function (ret) {
                        $(elem).html(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.GetURLVarShowNumber = function (ordinal) {
                var keys = Object.keys(CSSP.URLVarShowEnum);
                return parseInt(keys[ordinal]);
            };
            this.Init = function () {
                cssp.Variables = new CSSP.Variables();
                cssp.Helper = new CSSP.Helper();
                cssp.GoogleMap = new CSSP.GoogleMap();
                if (cssp.GetHTMLVariable("#LayoutVariables", "varDebug") == "Y") {
                    //cssp.Test = new CSSP.Test.app();
                    //cssp.Test.Init();
                }
                cssp.SetVisibility();
                if (jQuery.validator) {
                    jQuery.validator.setDefaults({
                        debug: true,
                        errorClass: 'has-error',
                        validClass: 'has-success',
                        ignore: "",
                        highlight: function (element, errorClass, validClass) {
                            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                        },
                        unhighlight: function (element, errorClass, validClass) {
                            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                            $(element).closest('.form-group').find('.help-block').text('');
                        },
                        errorPlacement: function (error, element) {
                            $(element).closest('.form-group').find('.help-block').text(error.text());
                        }
                    });
                }
                cssp.Helper.CorrectDecimalForLang();
                if ($("#TopSearch")) {
                    $("#TopSearch").placeholder();
                }
                $(document).off("click", "a[href^='#!View']");
                $(document).on("click", "a[href^='#!View']", function (evt) {
                    var $a = $(evt.target);
                    if (!$a.is("a")) {
                        $a = $a.closest("a");
                    }
                    $a.find(".badge").remove();
                    cssp.URLText = $a.text();
                    cssp.URLText = cssp.URLText.trim();
                    if (cssp.URLText.length == 0) {
                        cssp.URLText = cssp.GetHTMLVariable("#LayoutVariables", "varSamePage");
                    }
                });
            };
            this.IsScrolledIntoView = function (elem) {
                var $elem = $(elem);
                var $window = $(window);
                var docViewTop = $window.scrollTop();
                var docViewBottom = docViewTop + $window.height();
                var elemTop = $elem.offset().top;
                var elemBottom = elemTop + $elem.height();
                return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
            };
            this.LoadMoreInfo = function () {
                $(".moreInfo").each(function (ind, elem) {
                    if (cssp.IsScrolledIntoView(elem)) {
                        cssp.GetMoreInfo(elem);
                    }
                });
            };
            this.SetIsShowMoreInfo = function (isShowMoreInfo) {
                cssp.IsShowMoreInfo = isShowMoreInfo;
                if (cssp.IsShowMoreInfo) {
                    cssp.LoadMoreInfo();
                    $(window).off("scroll");
                    $(window).on("scroll", function () {
                        cssp.LoadMoreInfo();
                    });
                    $("#content").off("scroll");
                    $("#content").on("scroll", function () {
                        cssp.LoadMoreInfo();
                    });
                }
                else {
                    $(window).off("scroll");
                }
            };
            this.SetVisibility = function () {
                if (cssp.Variables.LoginEmail != "") {
                    $("a[href='#!Login']").addClass("hidden");
                    $("a.jaLogOff").removeClass("hidden");
                    $("a[href='#!Profile']").removeClass("hidden");
                }
                else {
                    $("a[href='#!Login']").removeClass("hidden");
                    $("a.jaLogOff").addClass("hidden");
                    $("a[href='#!Profile']").addClass("hidden");
                }
                $("#UserEmail").text(cssp.Variables.LoginEmail);
                if (cssp.Variables.IsAdmin == "true") {
                    $("a[href='#!Administrator']").removeClass("hidden");
                }
                else {
                    $("a[href='#!Administrator']").addClass("hidden");
                }
                if (cssp.Variables.IsSamplingPlanner == "true") {
                    $("a[href='#!SamplingPlans']").removeClass("hidden");
                }
                else {
                    $("a[href='#!SamplingPlans']").addClass("hidden");
                }
                if (_this.Variables.VariableShow.charAt(CSSP.URLVarShowEnum.ShowTesting) == "1") {
                    $(".jtTestShow").addClass("hidden");
                    $(".jtTestHide").removeClass("hidden");
                    $(".TestView").removeClass("hidden");
                }
                else {
                    $(".jtTestShow").removeClass("hidden");
                    $(".jtTestHide").addClass("hidden");
                    $(".TestView").addClass("hidden");
                }
            };
        }
        return app;
    }());
    CSSP.app = app;
})(CSSP || (CSSP = {}));
var cssp = new CSSP.app();
cssp.StartDir = "";
//cssp.StartDir = "/csspwebtools"; 
//cssp.StartDir = "/csspwebtoolsjoe"; 
cssp.BaseURL = cssp.StartDir + "/" + Globalize.culture.name + "/";
cssp.Init();
cssp.Address = new CSSP.Address();
cssp.Admin = new CSSP.Admin();
cssp.BoxModel = new CSSP.BoxModel();
cssp.ClimateSite = new CSSP.ClimateSite();
cssp.Contact = new CSSP.Contact();
cssp.Dialog = new CSSP.Dialog();
cssp.Document = new CSSP.Document();
cssp.DocumentAEvents = new CSSP.DocumentAEvents();
cssp.DocumentButtonEvents = new CSSP.DocumentButtonEvents();
cssp.DrogueRun = new CSSP.DrogueRun();
cssp.Email = new CSSP.Email();
cssp.EmailDistributionList = new CSSP.EmailDistributionList();
cssp.File = new CSSP.File();
cssp.ForgotPassword = new CSSP.ForgotPassword();
cssp.ForgotPasswordEmailSent = new CSSP.ForgotPasswordEmailSent();
cssp.Infrastructure = new CSSP.Infrastructure();
cssp.HelpDoc = new CSSP.HelpDoc();
cssp.Home = new CSSP.Home();
cssp.HydrometricSite = new CSSP.HydrometricSite();
cssp.Login = new CSSP.Login();
cssp.MikeScenario = new CSSP.MikeScenario();
cssp.MWQMSite = new CSSP.MWQMSite();
cssp.MWQMRun = new CSSP.MWQMRun();
cssp.OpenData = new CSSP.OpenData();
cssp.PolSourceSite = new CSSP.PolSourceSite();
cssp.ProvinceTools = new CSSP.ProvinceTools();
cssp.Profile = new CSSP.Profile();
cssp.RainExceedance = new CSSP.RainExceedance();
cssp.Register = new CSSP.Register();
cssp.ReportType = new CSSP.ReportType();
cssp.Sammy = new CSSP.Sammy();
cssp.SamplingPlan = new CSSP.SamplingPlan();
cssp.SubsectorTools = new CSSP.SubsectorTools();
cssp.Tel = new CSSP.Tel();
cssp.Testing = new CSSP.Testing();
cssp.TideSite = new CSSP.TideSite();
cssp.TVItem = new CSSP.TVItem();
cssp.View = new CSSP.View();
cssp.VisualPlumes = new CSSP.VisualPlumes();
//# sourceMappingURL=cssp.js.map