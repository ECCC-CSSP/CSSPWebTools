var CSSP;
(function (CSSP) {
    var app = (function () {
        // Constructors
        function app() {
            var _this = this;
            // Variables
            this.appBaseURL = "";
            this.appStartDir = "";
            // Functions
            this.Init = function () {
                _this.appVariables = new App.Variables();

                _this.appHelper = new App.Helper(_this);

                //this.appHeader = new App.Header(this);
                //this.appHeader.Init();
                //this.appLang = new App.Lang(this);
                _this.appGoogleMap = new App.GoogleMap(_this);

                _this.SetVisibility();

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

                _this.appHelper.CorrectDecimalForLang();
            };
            this.GetHTMLVariable = function (selector, varName) {
                var retVar = $(selector).find("span." + varName).text();
                if (retVar) {
                    return retVar;
                } else {
                    return "Error: Variable [" + varName + "] does not exist in [" + selector + "]";
                }
            };
            this.GetURLVarShowNumber = function (ordinal) {
                var keys = Object.keys(URLVarShowEnum);
                return parseInt(keys[ordinal]);
            };
            this.SetVisibility = function () {
                if (_this.appVariables.LoginEmail != "") {
                    $("a[href='#!Login']").addClass("hidden");
                    $("a.jaLogOff").removeClass("hidden");
                    $("a[href='#!Profile']").removeClass("hidden");
                } else {
                    $("a[href='#!Login']").removeClass("hidden");
                    $("a.jaLogOff").addClass("hidden");
                    $("a[href='#!Profile']").addClass("hidden");
                }
                $("#UserEmail").text(_this.appVariables.LoginEmail);
                if (_this.appVariables.IsAdmin == "true") {
                    $("a[href='#!Administrator']").removeClass("hidden");
                } else {
                    $("a[href='#!Administrator']").addClass("hidden");
                }
                if (_this.appVariables.VariableShow.charAt(URLVarShowEnum.ShowTesting) == "1") {
                    $(".jtTestShow").addClass("hidden");
                    $(".jtTestHide").removeClass("hidden");
                    $(".TestView").removeClass("hidden");
                } else {
                    $(".jtTestShow").removeClass("hidden");
                    $(".jtTestHide").addClass("hidden");
                    $(".TestView").addClass("hidden");
                }
            };
            // Variables
            this.appBaseURL = this.appStartDir + "/" + Globalize.culture.name + "/";

            this.Init();
        }
        return app;
    })();
    CSSP.app = app;
})(CSSP || (CSSP = {}));

var app = new App.app();

// loading in the app.Init
//app.appLang = new App.Lang(app);
//app.appTVItemsFullPath = new App.TVItemsFullPath(app);
//app.appGoogleMap = new App.GoogleMap(app);
//app.appHelper = new App.Helper(app);
if ($(".TestView").length == 1) {
    // Testing component
    app.appTest = new App.Test(app);
    app.appTest.Init();
}

app.appAdmin = new App.Admin(app);

//app.appArea = new App.Area(app);
app.appBoxModel = new App.BoxModel(app);

//app.appContact = new App.Contact(app);
//app.appDoc = new App.Doc(app);
app.appDialog = new App.Dialog(app);
app.appDocumentAEvents = new App.DocumentAEvents(app);
app.appDocumentButtonEvents = new App.DocumentButtonEvents(app);
app.appFile = new App.File(app);
app.appForgotPassword = new App.ForgotPassword(app);
app.appForgotPasswordEmailSent = new App.ForgotPasswordEmailSent(app);

//app.appGetSecurityForUser = new App.GetSecurityForUser(app);
app.appInfrastructure = new App.Infrastructure(app);

//app.appHeader = new App.Header(app);
app.appHome = new App.Home(app);
app.appLogin = new App.Login(app);
app.appTesting = new App.Testing(app);

//app.appMenu = new App.Menu(app);
app.appMikeScenario = new App.MikeScenario(app);

//app.appMikeScenarioDocumentation = new App.MikeScenarioDocumentation(app);
//app.appMikeScenarioInputs = new App.MikeScenarioInputs(app);
//app.appMikeScenarioTools = new App.MikeScenarioTools(app);
//app.appMoreInfo = new App.MoreInfo(app);
//app.appMunicipality = new App.Municipality(app);
//app.appPolSourceSite = new App.PolSourceSite(app);
//app.appPrecHydroTide = new App.PrecHydroTide(app);
app.appProfile = new App.Profile(app);

//app.appProvince = new App.Province(app);
app.appRegister = new App.Register(app);

//app.appRoot = new App.Root(app);
app.appSammy = new App.Sammy(app);

//app.appSector = new App.Sector(app);
//app.appSubsector = new App.Subsector(app);
app.appTVItemsList = new App.TVItemsList(app);

//app.appTVItemsMenu = new App.TVItemsMenu(app);
//app.appTVItemsSelect = new App.TVItemsSelect(app);
app.appView = new App.View(app);
//app.appVisualPlumes = new App.VisualPlumes(app);
//app.appMWQMSite = new App.MWQMSite(app);
//# sourceMappingURL=CSSP.App.js.map
