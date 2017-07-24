var CSSP;
(function (CSSP) {
    var Helper = (function () {
        // Constructors
        function Helper() {
            var _this = this;
            // Functions
            this.CorrectDecimalForLang = function () {
                // correcting french decimal numbering comma
                $.validator.addMethod("range", function (value, element, param) {
                    if (param === void 0) { param = []; }
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
            this.ElemIDExist = function (idArr) {
                for (var i = 0, Count = idArr.length; i < Count; i++) {
                    if ($("#" + idArr[i])[0] === undefined) {
                        cssp.Dialog.ShowDialogErrorWithError($.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFind_"), idArr[i]));
                        return false;
                    }
                }
                return true;
            };
            this.GetID = function (Path) {
                var RetVal = -1; // will return -1 if an error occured or if there are no parent i.e. tvItem is root
                if (Path != null || Path != undefined) {
                    if (Path.indexOf("p") > -1) {
                        var StrArr = Path.split("p");
                        RetVal = parseInt(StrArr[StrArr.length - 1]);
                    }
                }
                return RetVal;
            };
            this.GetLevel = function (Path) {
                var RetVal = -1; // will return -1 if an error occured or if there are no parent i.e. tvItem is root
                if (Path != null || Path != undefined) {
                    if (Path.indexOf("p") > -1) {
                        var StrArr = Path.split("p");
                        RetVal = StrArr.length - 2;
                    }
                }
                return RetVal;
            };
            this.GetLocalDateAndTime = function (TheDate) {
                var newDate = new Date(TheDate.getTime());
                var offset = TheDate.getTimezoneOffset() / 60;
                var hours = TheDate.getHours();
                newDate.setHours(hours - offset);
                return newDate;
            };
            this.GetParentLevel = function (Path) {
                var RetVal = -1; // will return -1 if an error occured or if there are no parent i.e. tvItem is root
                RetVal = _this.GetLevel(Path);
                if (RetVal > -1) {
                    RetVal -= 1;
                }
                return RetVal;
            };
            this.GetParentID = function (Path) {
                var RetVal = -1; // will return -1 if an error occured or if there are no parent i.e. tvItem is root
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
            this.GetParentPath = function (Path) {
                var RetVal = ""; // will return "" if an error occured or if there are no parent i.e. tvItem is root
                if (Path != null || Path != undefined) {
                    RetVal = Path.substring(0, Path.lastIndexOf("p"));
                }
                return RetVal;
            };
            this.GetUniqueID = function () {
                var CharOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var RetStr = "";
                for (var i = 0; i < 10; i++) {
                    RetStr += CharOptions.charAt(Math.floor(Math.random() * CharOptions.length));
                }
                return RetStr;
            };
            this.Init = function () {
                var helper = _this;
                var SearchRes = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("TVText"),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: cssp.BaseURL + "Home/SearchJSON?TVItemID=1&SearchTerm=ERROR",
                        replace: function (url, query) {
                            var TVItemID = 1;
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
                    var hashString = cssp.Sammy.CreateHashString();
                    var href = document.location.href;
                    var pos = href.indexOf("#");
                    if (pos > -1) {
                        document.location.href = cssp.BaseURL + "#" + hashString;
                    }
                });
            };
            this.LoadPage = function (ReplaceID, href) {
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
                var url = cssp.BaseURL + href;
                if (!_this.ElemIDExist([ReplaceID])) {
                    return;
                }
                var $ReplaceObj = $("#" + ReplaceID);
                if (!$ReplaceObj) {
                    cssp.Dialog.ShowDialogErrorWithError($.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotFindTag_"), ReplaceID));
                    return;
                }
                $ReplaceObj.html("<div class=\"h4\">" + cssp.GetHTMLVariable("#LayoutVariables", "varLoading") + " . . . " + (cssp.URLText == "" ? url : cssp.URLText) + "</div>");
                $.get(url).done(function (data) {
                    $ReplaceObj.html(data);
                    //cssp.GoogleMap.DoShowOrHideMap();
                }).fail(function (ret) {
                    $ReplaceObj.html("<h3>" + $.validator.format(cssp.GetHTMLVariable("#LayoutVariables", "varCouldNotLoad_"), url) + "</h3>");
                });
            };
            this.PageRefresh = function () {
                var newHref = "";
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
            this.ParseJsonDate = function (value) {
                var jsonDateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
                var TempDate = new Date();
                var arr = value && jsonDateRE.exec(value);
                if (arr) {
                    TempDate = new Date(parseInt(arr[1]));
                    return TempDate;
                }
                return value;
            };
            this.Init();
        }
        return Helper;
    }());
    CSSP.Helper = Helper;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Helpers.js.map