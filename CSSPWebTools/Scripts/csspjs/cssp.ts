
module CSSP {
    export class app {
        // Variables
        public BaseURL: string;
        public StartDir: string;
        public IsShowMoreInfo: boolean = false;

        // Variables page objects
        public Address: CSSP.Address;
        public Admin: CSSP.Admin;
        public BoxModel: CSSP.BoxModel;
        public ClimateSite: CSSP.ClimateSite;
        public Contact: CSSP.Contact;
        public Dialog: CSSP.Dialog;
        public DocumentAEvents: CSSP.DocumentAEvents;
        public DocumentButtonEvents: CSSP.DocumentButtonEvents;
        public Email: CSSP.Email;
        public EmailDistributionList: CSSP.EmailDistributionList;
        public File: CSSP.File;
        public ForgotPassword: CSSP.ForgotPassword;
        public ForgotPasswordEmailSent: CSSP.ForgotPasswordEmailSent;
        public GoogleMap: CSSP.GoogleMap;
        public Helper: CSSP.Helper;
        public Home: CSSP.Home;
        public HydrometricSite: CSSP.HydrometricSite;
        public Infrastructure: CSSP.Infrastructure;
        public Login: CSSP.Login;
        public MikeScenario: CSSP.MikeScenario;
        public SamplingPlan: CSSP.SamplingPlan;
        public MWQMRun: CSSP.MWQMRun;
        public MWQMSite: CSSP.MWQMSite;
        public PolSourceSite: CSSP.PolSourceSite;
        public Profile: CSSP.Profile;
        public RainExceedance: CSSP.RainExceedance;
        public Register: CSSP.Register;
        public Sammy: CSSP.Sammy;
        public Tel: CSSP.Tel;
        public Testing: CSSP.Testing;
        public TideSite: CSSP.TideSite;
        public TVItem: CSSP.TVItem;
        public Variables: CSSP.Variables;
        public View: CSSP.View;
        public VisualPlumes: CSSP.VisualPlumes;
        public URLText: string = "";

        // Required when testing otherwise empty
        public Test: CSSP.Test.app;

        public Sammyjs: Sammy.Application;

        // Constructors
        constructor() {

        }
        // Functions
        public CheckInputWithNumbers = (): boolean => {
            var dotFound: boolean = false;
            var IndexOfStr: string = ",";
            var ErrMessage: string = "varPleaseUseCommaOrDotForDecimal";
            if (Globalize.culture.name.substr(0, 2) == "fr") {
                IndexOfStr = ".";
                ErrMessage = "varPleaseUseCommaOrDotForDecimal";
            }
            $("input.isnumber").each((ind: any, elem: Element) => {
                if ($(elem).val().indexOf(IndexOfStr) > -1) {
                    dotFound = true;
                    $(elem).closest(".form-group").removeClass("has-error").addClass("has-error");
                    $(elem).next("span.help-block").html(cssp.GetHTMLVariable("#LayoutVariables", ErrMessage));
                }
            });

            return dotFound;
        };
        public ClearLastUpdateAndName: Function = () => {
            var $LastUpdateAndNameList = $(".LastUpdateAndName").each((ind: number, elem: Element) => {
                $(elem).html("");
            });
        };
        public FillLastUpdateAndTVText: Function = ($elem: JQuery, table: string, id: number): void => {
            var command: string = "Base/_GetLastUpdateAndTVText";
            var date = new Date();
            var offset_min: number = date.getTimezoneOffset();
            $elem.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            $.get(cssp.BaseURL + command,
                {
                    Table: table,
                    ID: id,
                    Offset_min: offset_min,
                }).done((ret) => {
                    $elem.html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public GetHTMLVariable: Function = (selector: string, varName: string): string => {
            var retVar: string = $(selector).find("span." + varName).text();
            if (retVar) {
                return retVar;
            }
            else {
                return "Error: Variable [" + varName + "] does not exist in [" + selector + "]";
            }
        };
        public GetLastUpdateAndTVText: Function = () => {
            var $LastUpdateAndTVText = $(".LastUpdateAndTVText");
            if ($LastUpdateAndTVText.length > 0) {
                if ($LastUpdateAndTVText.eq(0).children().length > 0) {
                    var $LastUpdateAndNameList = $(".LastUpdateAndTVText").each((ind: number, elem: Element) => {
                        $(elem).html("")
                    });
                }
                else {
                    var $LastUpdateAndNameList = $(".LastUpdateAndTVText").each((ind: number, elem: Element) => {
                        cssp.FillLastUpdateAndTVText($(elem), $(elem).data("table"), $(elem).data("id"));
                    });
                }
            }
        };
        public GetMoreInfo: Function = (elem: Element): void => {
            if (!$(elem).html().length) {
                var TVItemID: number = parseInt($(elem).data("tvitemid"));
                var NumberOfSample: number = parseInt($(elem).data("numberofsample"));
                $(elem).html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                var command: string = "TVItem/_TVItemMoreInfo";
                $.get(cssp.BaseURL + command, {
                    Q: "!View/" + cssp.Variables.URL,
                    TVItemID: TVItemID,
                    NumberOfSample: NumberOfSample,
                }).done((ret) => {
                    $(elem).html(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
        };
        public GetURLVarShowNumber: Function = (ordinal: number): number => {
            var keys = Object.keys(URLVarShowEnum);
            return parseInt(keys[ordinal]);
        };
        public Init: Function = (): void => {
            cssp.Variables = new CSSP.Variables();
            cssp.Helper = new CSSP.Helper();
            cssp.GoogleMap = new CSSP.GoogleMap();

            if (cssp.GetHTMLVariable("#LayoutVariables", "varDebug") == "Y") {
                cssp.Test = new CSSP.Test.app();
                cssp.Test.Init();
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
            $(document).on("click", "a[href^='#!View']", (evt: Event) => {
                var $a = $(evt.target);
                if (!$a.is("a")) {
                    $a = $a.closest("a");
                }
                $a.find(".badge").remove();
                cssp.URLText = $a.text();
                cssp.URLText = cssp.URLText.trim();
                if (cssp.URLText.length == 0) {
                    cssp.URLText = cssp.GetHTMLVariable("#LayoutVariables", "varSamePage")
                }
            });
        };
        public IsScrolledIntoView: Function = (elem: Element): boolean => {
            var $elem = $(elem);
            var $window = $(window);

            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();

            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }
        public LoadMoreInfo: Function = (): void => {
            $(".moreInfo").each((ind: number, elem: Element) => {
                if (cssp.IsScrolledIntoView(elem)) {
                    cssp.GetMoreInfo(elem);
                }
            });
        };
        public SetIsShowMoreInfo: Function = (isShowMoreInfo: boolean): void => {
            cssp.IsShowMoreInfo = isShowMoreInfo;
            if (cssp.IsShowMoreInfo) {
                cssp.LoadMoreInfo();
                $(window).off("scroll");
                $(window).on("scroll", () => {
                    cssp.LoadMoreInfo();
                })
                $("#content").off("scroll");
                $("#content").on("scroll", () => {
                    cssp.LoadMoreInfo();
                })
            }
            else {
                $(window).off("scroll");
             }
        };
        public SetVisibility: Function = (): void => {
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
            if (this.Variables.VariableShow.charAt(URLVarShowEnum.ShowTesting) == "1") {
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
}

    
var cssp = new CSSP.app();

cssp.StartDir = "";
//cssp.StartDir = "/csspwebtools"; 
cssp.BaseURL = cssp.StartDir + "/" + Globalize.culture.name + "/";

cssp.Init();

cssp.Address = new CSSP.Address();
cssp.Admin = new CSSP.Admin();
cssp.BoxModel = new CSSP.BoxModel();
cssp.ClimateSite = new CSSP.ClimateSite();
cssp.Contact = new CSSP.Contact();
cssp.Dialog = new CSSP.Dialog();
cssp.DocumentAEvents = new CSSP.DocumentAEvents();
cssp.DocumentButtonEvents = new CSSP.DocumentButtonEvents();
cssp.Email = new CSSP.Email();
cssp.EmailDistributionList = new CSSP.EmailDistributionList();
cssp.File = new CSSP.File();
cssp.ForgotPassword = new CSSP.ForgotPassword();
cssp.ForgotPasswordEmailSent = new CSSP.ForgotPasswordEmailSent();
cssp.Infrastructure = new CSSP.Infrastructure();
cssp.Home = new CSSP.Home();
cssp.HydrometricSite = new CSSP.HydrometricSite();
cssp.Login = new CSSP.Login();
cssp.MikeScenario = new CSSP.MikeScenario();
cssp.SamplingPlan = new CSSP.SamplingPlan();
cssp.MWQMSite = new CSSP.MWQMSite();
cssp.MWQMRun = new CSSP.MWQMRun();
cssp.PolSourceSite = new CSSP.PolSourceSite();
cssp.Profile = new CSSP.Profile();
cssp.RainExceedance = new CSSP.RainExceedance();
cssp.Register = new CSSP.Register();
cssp.Sammy = new CSSP.Sammy();
cssp.Tel = new CSSP.Tel();
cssp.Testing = new CSSP.Testing();
cssp.TideSite = new CSSP.TideSite();
cssp.TVItem = new CSSP.TVItem();
cssp.View = new CSSP.View();
cssp.VisualPlumes = new CSSP.VisualPlumes();

