module CSSP {
    export class Helper {

        // Constructors
        constructor() {
            this.Init();
        }
        // Functions
        public CorrectDecimalForLang: Function = (): void => {
            // correcting french decimal numbering comma
            $.validator.addMethod("range", function (value, element, param = []) {
                var globalizedValue = value.replace(",", ".");
                return this.optional(element) || (globalizedValue >= param[0] && globalizedValue <= param[1]);
            });
            $.validator.addMethod("number", function (value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
            });
            $.validator.addMethod("TelCan", function (phone_number, element) { 
                phone_number = phone_number.replace(/\s+/g, "");
                return this.optional(element) || phone_number.length > 6 &&
                    phone_number.match(/^[ 0-9()-]+$/);
            }, cssp.GetHTMLVariable("#LayoutVariables", "varPleaseEnterValidTelNumber"));
        };
        public ElemIDExist: Function = (idArr: any): boolean => {
            for (var i = 0, Count = idArr.length; i < Count; i++) {
                if ($("#" + idArr[i])[0] === undefined) {
                    cssp.Dialog.ShowDialogErrorWithError($.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFind_"), idArr[i]));
                    return false;
                }
            }
            return true;
        };
        public GetID: Function = (Path: string): number => {
            var RetVal: number = -1; // will return -1 if an error occured or if there are no parent i.e. tvItem is root
            if (Path != null || Path != undefined) {
                if (Path.indexOf("p") > -1) {
                    var StrArr = Path.split("p");
                    RetVal = parseInt(StrArr[StrArr.length - 1]);
                }
            }

            return RetVal;
        };
        public GetLevel: Function = (Path: string): number => {
            var RetVal: number = -1; // will return -1 if an error occured or if there are no parent i.e. tvItem is root
            if (Path != null || Path != undefined) {
                if (Path.indexOf("p") > -1) {
                    var StrArr = Path.split("p");
                    RetVal = StrArr.length - 2;
                }
            }

            return RetVal;
        };
        public GetLocalDateAndTime: Function = (TheDate: any) => {
            var newDate = new Date(TheDate.getTime());
            var offset = TheDate.getTimezoneOffset() / 60;
            var hours = TheDate.getHours();
            newDate.setHours(hours - offset);
            return newDate;
        };
        public GetParentLevel: Function = (Path: string): number => {
            var RetVal: number = -1; // will return -1 if an error occured or if there are no parent i.e. tvItem is root
            RetVal = this.GetLevel(Path);
            if (RetVal > -1) {
                RetVal -= 1;
            }
            return RetVal;
        };
        public GetParentID: Function = (Path: string): number => {
            var RetVal: number = -1; // will return -1 if an error occured or if there are no parent i.e. tvItem is root
            if (Path != null || Path != undefined) {
                if (Path.indexOf("p") > -1) {
                    var StrArr = Path.split("p");
                    if (StrArr.length > 1) {
                        RetVal = parseInt(StrArr[StrArr.length - 2]);
                    }
                }
            }

            return RetVal;
        };
        public GetParentPath: Function = (Path: string): string => {
            var RetVal: string = ""; // will return "" if an error occured or if there are no parent i.e. tvItem is root
            if (Path != null || Path != undefined) {
                RetVal = Path.substring(0, Path.lastIndexOf("p"));
            }

            return RetVal;
        };
        public GetUniqueID: Function = (): string => {
            var CharOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var RetStr = "";
            for (var i = 0; i < 10; i++) {
                RetStr += CharOptions.charAt(Math.floor(Math.random() * CharOptions.length));
            }

            return RetStr;
        };
        public Init: Function = (): void => {
            var helper: CSSP.Helper = this;
            var SearchRes = new Bloodhound<TVItemModel>(
                {
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("TVText"),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: cssp.BaseURL + "Home/SearchJSON?TVItemID=1&SearchTerm=ERROR",
                        replace: function (url, query) {
                            var TVItemID: number = 1;
                            if ($("#ViewDiv").data("tvitemid")) {
                                TVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                            }
                            url = cssp.BaseURL + "Home/SearchJSON?TVItemID=" + TVItemID + "&SearchTerm=" + encodeURIComponent($("#TopSearch").val());
                            return url;
                        }
                    }
                });

            SearchRes.initialize();

            $("#TopSearch").off("typeahead:selected");
            $("#TopSearch").typeahead(null, {
                name: "res",
                displayKey: "TVText",
                source: SearchRes.ttAdapter(),
            }).on("typeahead:selected", function (obj, datum, name) {
                    cssp.Variables.TVTextList[0] = "!View";
                    cssp.Variables.TVTextList[1] = datum.TVText;
                    cssp.Variables.TVItemIDList[0] = datum.TVItemID;
                    var hashString: string = cssp.Sammy.CreateHashString();
                    var href = document.location.href;
                    var pos = href.indexOf("#");
                    if (pos > -1) {
                        document.location.href = cssp.BaseURL + "#" + hashString;
                    }
            });
        };
        public LoadPage: Function = (ReplaceID: string, href: string): void => {
            $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));

            $("#navbarCollapseID").removeClass("in");
            if (ReplaceID === "") {
                cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varReplaceIDShouldNotBeEmpty"));
                return;
            }

            if (ReplaceID === "all") {
                location.href = cssp.BaseURL + href;
                return;
            }

            if (href === "") {
                cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varHrefShouldNotBeEmpty"));
                return;
            }

            var url: string = cssp.BaseURL + href;

            if (!this.ElemIDExist([ReplaceID])) {
                return;
            }
            var $ReplaceObj: JQuery = $("#" + ReplaceID);
            if (!$ReplaceObj) {
                cssp.Dialog.ShowDialogErrorWithError($.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFindTag_"), ReplaceID));
                return;
            }

            $ReplaceObj.html("<div class=\"h4\">" + cssp.GetHTMLVariable("#LayoutVariables", "varLoading") + " . . . " + (cssp.URLText == "" ? url : cssp.URLText) + "</div>");

            $.get(url).done((data) => {
                $ReplaceObj.html(data);
                //cssp.GoogleMap.DoShowOrHideMap();
            }).fail((ret) => {
                $ReplaceObj.html("<h3>" + $.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotLoad_"), url) + "</h3>");
                });
        };
        public PageRefresh: Function = (): void => {
            var newHref: string = "";
            for (var i = 0, hrefLength = document.location.href.length; i < hrefLength; i++) {
                if (document.location.href[i] == "?") {
                    break;
                }
                newHref += document.location.href[i];
            }
            if (document.location.href == newHref) {
                document.location.href = newHref + "?";
            }
            else {
                document.location.href = newHref;
            }
        };
        public ParseJsonDate: Function = (value: string): any => {
            var jsonDateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
            var TempDate = new Date();
            var arr = value && jsonDateRE.exec(value);
            if (arr) {
                TempDate = new Date(parseInt(arr[1]));
                    return TempDate
                }
            return value;
        };
    }
}