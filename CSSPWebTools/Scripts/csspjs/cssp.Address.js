var CSSP;
(function (CSSP) {
    var Address = (function () {
        // Constructors
        function Address() {
            // Variables
            this.FormName = ".AddressEditForm";
            // Functions
            this.AddressLocationCrossOnMap = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var Lat = parseFloat($bjs.data("lat"));
                    var Lng = parseFloat($bjs.data("lng"));
                    cssp.GoogleMap.DrawCrossAtLatLng(Lat, Lng);
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    cssp.GoogleMap.DrawCross(-1);
                }
            };
            this.FormSubmitAddOrUpdate = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Address.FormName);
                $form.attr("action", "Address/AddressSaveJSON");
                cssp.Address.FormSubmit($bjs);
            };
            this.FormSubmitDelete = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Address.FormName);
                $form.attr("action", "Address/AddressDeleteJSON");
                cssp.Address.FormSubmit($bjs);
            };
            this.FormSubmitAddOrUpdateInfrastructure = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Address.FormName);
                $form.attr("action", "Address/AddressSaveInfrastructureJSON");
                cssp.Address.FormSubmit($bjs);
            };
            this.FormSubmitDeleteInfrastructure = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Address.FormName);
                $form.attr("action", "Address/AddressDeleteInfrastructureJSON");
                cssp.Address.FormSubmit($bjs);
            };
            this.FormSubmitAddOrUpdatePolSourceSite = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Address.FormName);
                $form.attr("action", "Address/AddressSavePolSourceSiteJSON");
                cssp.Address.FormSubmit($bjs);
            };
            this.FormSubmitDeletePolSourceSite = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Address.FormName);
                $form.attr("action", "Address/AddressDeletePolSourceSiteJSON");
                cssp.Address.FormSubmit($bjs);
            };
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Address.FormName);
                var $ParentLi = $bjs.closest("li.AddressItemTop");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Address.FormName, "contentAddress");
                    return;
                }
                var InfrastructureTVItemID = $form.find("input[name='InfrastructureTVItemID']").val();
                var PolSourceSiteTVItemID = $form.find("input[name='PolSourceSiteTVItemID']").val();
                var ContactTVItemID = $form.find("input[name='ContactTVItemID']").val();
                var StreetName = $form.find("input[name='StreetName']").val();
                var StreetNumber = $form.find("input[name='StreetNumber']").val();
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            if (command == "Address/AddressDeleteJSON") {
                                $ParentLi.remove();
                                cssp.Dialog.ShowDialogSuccess(StreetNumber + " " + StreetName);
                            }
                            else if (command == "Address/AddressSaveInfrastructureJSON") {
                                cssp.Dialog.ShowDialogSuccess("Saved");
                                cssp.Address.ReloadAddressEditInfrastructure(InfrastructureTVItemID);
                            }
                            else if (command == "Address/AddressSavePolSourceSiteJSON") {
                                cssp.Dialog.ShowDialogSuccess("Saved");
                                cssp.Address.ReloadAddressEditPolSourceSite(PolSourceSiteTVItemID);
                            }
                            else if (command == "Address/AddressDeleteInfrastructureJSON") {
                                cssp.Dialog.ShowDialogSuccess("Deleted");
                                cssp.Address.ReloadAddressEditInfrastructure(InfrastructureTVItemID);
                            }
                            else if (command == "Address/AddressDeletePolSourceSiteJSON") {
                                cssp.Dialog.ShowDialogSuccess("Deleted");
                                cssp.Address.ReloadAddressEditPolSourceSite(PolSourceSiteTVItemID);
                            }
                            else {
                                cssp.Address.ReloadAddressEditList(ContactTVItemID);
                            }
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        cssp.Login.CheckIfAdmin();
                    });
                }
            };
            this.GetCivicAddress = function () {
                $(".GoogleAddressText").text(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $("input[name='LatLngText']").val($(".CivicAddressLatLng").val());
                var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $(".CivicAddressLatLng").first().val().replace(" ", ",") + "&key=AIzaSyAwPGpdSM6z0A7DFdWPbS3vIDTk2mxINaA";
                var command = "Address/GetGoogleCivicAddress";
                $.getJSON(cssp.BaseURL + command, { LatLngText: $(".CivicAddressLatLng").first().val().replace(" ", ",") })
                    .done(function (ret) {
                    if (ret.status == "OK") {
                        $(".GoogleAddressText").text(ret.results[0].formatted_address);
                        $("input[name='GoogleAddressText']").val(ret.results[0].formatted_address);
                    }
                    else {
                        cssp.GetHTMLVariable("#LayoutVariables", "varError");
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(url);
                }).always(function () {
                    cssp.Login.CheckIfAdmin();
                });
            };
            this.InitEdit = function () {
                $(cssp.Address.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            CountryTVItemID: {
                                required: true,
                                min: 1,
                            },
                            ProvinceTVItemID: {
                                required: true,
                                min: 1,
                            },
                            MunicipalityTVItemID: {
                                required: true,
                                min: 1,
                            },
                            StreetType: {
                                required: true,
                            },
                            AddressType: {
                                required: true,
                            },
                            StreetName: {
                                required: true,
                                maxlength: 100,
                            },
                            StreetNumber: {
                                required: true,
                                maxlength: 20
                            },
                        },
                        messages: {
                            CountryTVItemID: cssp.GetHTMLVariable("#LayoutVariables", "varPleaseSelectAnItem"),
                            ProvinceTVItemID: cssp.GetHTMLVariable("#LayoutVariables", "varPleaseSelectAnItem"),
                            MunicipalityTVItemID: cssp.GetHTMLVariable("#LayoutVariables", "varPleaseSelectAnItem"),
                        },
                    });
                });
                $(document).off("change", ".CountryTVItemSelect");
                $(document).on("change", ".CountryTVItemSelect", function (evt) {
                    var $selectCountry = $(evt.target);
                    var $selectProv = $(evt.target).closest(".AddressItemTop").find(".ProvinceTVItemSelect");
                    var $selectMuni = $(evt.target).closest(".AddressItemTop").find(".MunicipalityTVItemSelect");
                    var CountryTVItemID = parseInt($selectCountry.val());
                    var ProvinceTVItemID = parseInt($selectProv.val());
                    var $nextSpan = $(evt.target).closest("li").children().eq(0);
                    if (CountryTVItemID == 0) {
                        cssp.Address.LoadCountryList($selectCountry);
                        cssp.Address.LoadProvinceList($selectProv, CountryTVItemID);
                        cssp.Address.LoadMunicipalityList($selectMuni, 0);
                    }
                    else if (CountryTVItemID == -1) {
                        cssp.Dialog.ShowDialogMessage($nextSpan.text());
                    }
                    else {
                        cssp.Address.LoadMunicipalityList($selectMuni, 0);
                        var command = "Address/_ProvinceList";
                        $.get(cssp.BaseURL + command, { CountryTVItemID: CountryTVItemID, ProvinceTVItemID: 0 })
                            .done(function (ret) {
                            $selectProv.replaceWith(ret);
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(function () {
                            // nothing
                        });
                    }
                });
                $(document).off("change", ".ProvinceTVItemSelect");
                $(document).on("change", ".ProvinceTVItemSelect", function (evt) {
                    var $selectProv = $(evt.target);
                    var $selectCountry = $(evt.target).closest(".AddressItemTop").find(".CountryTVItemSelect");
                    var $selectMuni = $(evt.target).closest(".AddressItemTop").find(".MunicipalityTVItemSelect");
                    var ProvinceTVItemID = parseInt($selectProv.val());
                    var CountryTVItemID = parseInt($selectCountry.val());
                    var $nextSpan = $(evt.target).closest("li").children().eq(0);
                    if (ProvinceTVItemID == 0) {
                        cssp.Address.LoadProvinceList($selectProv, CountryTVItemID);
                        cssp.Address.LoadMunicipalityList($selectMuni, ProvinceTVItemID);
                    }
                    else if (ProvinceTVItemID == -1) {
                        cssp.Dialog.ShowDialogMessage($nextSpan.text());
                    }
                    else {
                        var command = "Address/_MunicipalityList";
                        $.get(cssp.BaseURL + command, { ProvinceTVItemID: ProvinceTVItemID, MunicipalityTVItemID: 0 })
                            .done(function (ret) {
                            $selectMuni.replaceWith(ret);
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(function () {
                            // nothing
                        });
                    }
                });
                $(document).off("change", ".MunicipalityTVItemSelect");
                $(document).on("change", ".MunicipalityTVItemSelect", function (evt) {
                    var $selectMuni = $(evt.target);
                    var MunicipalityTVItemID = parseInt($selectMuni.val());
                    var $nextSpan = $(evt.target).closest("li").children().eq(0);
                    if (MunicipalityTVItemID == -1) {
                        cssp.Dialog.ShowDialogMessage($nextSpan.text());
                    }
                });
                //if (cssp.Test) {
                //    cssp.Test.ShowTestButtons();
                //}
            };
            this.LoadCountryList = function ($CountrySelect) {
                var command = "Address/_CountryList";
                $.get(cssp.BaseURL + command, {
                    CountryTVItemID: 0,
                }).done(function (ret) {
                    if (ret) {
                        $CountrySelect.replaceWith(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.LoadProvinceList = function ($ProvinceSelect, CountryTVItemID) {
                var command = "Address/_ProvinceList";
                $.get(cssp.BaseURL + command, {
                    CountryTVItemID: CountryTVItemID,
                    ProvinceTVItemID: 0,
                }).done(function (ret) {
                    if (ret) {
                        $ProvinceSelect.replaceWith(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.LoadMunicipalityList = function ($MunicipalitySelect, ProvinceTVItemID) {
                var command = "Address/_MunicipalityList";
                $.get(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                    MunicipalityTVItemID: 0,
                }).done(function (ret) {
                    if (ret) {
                        $MunicipalitySelect.replaceWith(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReloadAddressEditList = function (ContactTVItemID) {
                var command = "Address/_addressEditList";
                $.get(cssp.BaseURL + command, {
                    ContactTVItemID: ContactTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        $(".AddressEditDiv").html(ret);
                        cssp.Address.InitEdit();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReloadAddressEditInfrastructure = function (InfrastructureTVItemID) {
                var command = "Address/_addressEditInfrastructure";
                $(".AddressDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $.get(cssp.BaseURL + command, { InfrastructureTVItemID: InfrastructureTVItemID })
                    .done(function (ret) {
                    $(".AddressDiv").html(ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    cssp.Login.CheckIfAdmin();
                });
            };
            this.ReloadAddressEditPolSourceSite = function (PolSourceSiteTVItemID) {
                var command = "Address/_addressEditPolSourceSite";
                $(".AddressDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $.get(cssp.BaseURL + command, { PolSourceSiteTVItemID: PolSourceSiteTVItemID })
                    .done(function (ret) {
                    $(".AddressDiv").html(ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    cssp.Login.CheckIfAdmin();
                });
            };
        }
        return Address;
    }());
    CSSP.Address = Address;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Address.js.map