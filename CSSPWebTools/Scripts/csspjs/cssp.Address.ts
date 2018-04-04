module CSSP {
    export class Address {
        // Variables
        public FormName: string = ".AddressEditForm";

        // Constructors
        constructor() {
        }
        // Functions
        public AddressLocationCrossOnMap: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                var Lat: number = parseFloat($bjs.data("lat"));
                var Lng: number = parseFloat($bjs.data("lng"));
                cssp.GoogleMap.DrawCrossAtLatLng(Lat, Lng);
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                cssp.GoogleMap.DrawCross(-1);
            }
        };
        public FormSubmitAddOrUpdate: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Address.FormName);
            $form.attr("action", "Address/AddressSaveJSON");
            cssp.Address.FormSubmit($bjs);
        };
        public FormSubmitDelete: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Address.FormName);
            $form.attr("action", "Address/AddressDeleteJSON");
            cssp.Address.FormSubmit($bjs);
        };
        public FormSubmitAddOrUpdateInfrastructure: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Address.FormName);
            $form.attr("action", "Address/AddressSaveInfrastructureJSON");
            cssp.Address.FormSubmit($bjs);
        };
        public FormSubmitDeleteInfrastructure: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Address.FormName);
            $form.attr("action", "Address/AddressDeleteInfrastructureJSON");
            cssp.Address.FormSubmit($bjs);
        };
        public FormSubmitAddOrUpdatePolSourceSite: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Address.FormName);
            $form.attr("action", "Address/AddressSavePolSourceSiteJSON");
            cssp.Address.FormSubmit($bjs);
        };
        public FormSubmitDeletePolSourceSite: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Address.FormName);
            $form.attr("action", "Address/AddressDeletePolSourceSiteJSON");
            cssp.Address.FormSubmit($bjs);
        };
        public FormSubmit: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Address.FormName);
            var $ParentLi: JQuery = $bjs.closest("li.AddressItemTop");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Address.FormName, "contentAddress");
                return;
            }

            var InfrastructureTVItemID: string = $form.find("input[name='InfrastructureTVItemID']").val();
            var PolSourceSiteTVItemID: string = $form.find("input[name='PolSourceSiteTVItemID']").val();
            var ContactTVItemID: string = $form.find("input[name='ContactTVItemID']").val();
            var StreetName: string = $form.find("input[name='StreetName']").val();
            var StreetNumber: string = $form.find("input[name='StreetNumber']").val();

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
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
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        cssp.Login.CheckIfAdmin();
                    });
            }
        };
        public GetCivicAddress: Function = (): void => {
            $(".GoogleAddressText").text(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            $("input[name='LatLngText']").val($(".CivicAddressLatLng").val());
            var url: string = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $(".CivicAddressLatLng").first().val().replace(" ", ",") + "&key=AIzaSyAwPGpdSM6z0A7DFdWPbS3vIDTk2mxINaA";
            var command: string = "Address/GetGoogleCivicAddress";
            $.getJSON(cssp.BaseURL + command, { LatLngText: $(".CivicAddressLatLng").first().val().replace(" ", ",") })
                .done((ret) => {
                    if (ret.status == "OK") {
                        $(".GoogleAddressText").text(ret.results[0].formatted_address);
                        $("input[name='GoogleAddressText']").val(ret.results[0].formatted_address);
                    }
                    else {
                        cssp.GetHTMLVariable("#LayoutVariables", "varError");
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(url);
                }).always(() => {
                    cssp.Login.CheckIfAdmin();
                });
        };
        public InitEdit: Function = (): void => {
            $(cssp.Address.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
            $(document).on("change", ".CountryTVItemSelect", (evt: Event) => {
                var $selectCountry: JQuery = $(evt.target);
                var $selectProv: JQuery = $(evt.target).closest(".AddressItemTop").find(".ProvinceTVItemSelect");
                var $selectMuni: JQuery = $(evt.target).closest(".AddressItemTop").find(".MunicipalityTVItemSelect");
                var CountryTVItemID: number = parseInt($selectCountry.val());
                var ProvinceTVItemID: number = parseInt($selectProv.val());
                var $nextSpan: JQuery = $(evt.target).closest("li").children().eq(0);
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
                    var command: string = "Address/_ProvinceList";
                    $.get(cssp.BaseURL + command, { CountryTVItemID: CountryTVItemID, ProvinceTVItemID: 0 })
                        .done((ret) => {
                            $selectProv.replaceWith(ret);
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(() => {
                            // nothing
                        });
                }
            });

            $(document).off("change", ".ProvinceTVItemSelect");
            $(document).on("change", ".ProvinceTVItemSelect", (evt: Event) => {
                var $selectProv: JQuery = $(evt.target);
                var $selectCountry: JQuery = $(evt.target).closest(".AddressItemTop").find(".CountryTVItemSelect");
                var $selectMuni: JQuery = $(evt.target).closest(".AddressItemTop").find(".MunicipalityTVItemSelect");
                var ProvinceTVItemID: number = parseInt($selectProv.val());
                var CountryTVItemID: number = parseInt($selectCountry.val());
                var $nextSpan: JQuery = $(evt.target).closest("li").children().eq(0);
                if (ProvinceTVItemID == 0) {
                    cssp.Address.LoadProvinceList($selectProv, CountryTVItemID);
                    cssp.Address.LoadMunicipalityList($selectMuni, ProvinceTVItemID);
                }
                else if (ProvinceTVItemID == -1) {
                    cssp.Dialog.ShowDialogMessage($nextSpan.text());
                }
                else {
                    var command: string = "Address/_MunicipalityList";
                    $.get(cssp.BaseURL + command, { ProvinceTVItemID: ProvinceTVItemID, MunicipalityTVItemID: 0 })
                        .done((ret) => {
                            $selectMuni.replaceWith(ret);
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        }).always(() => {
                            // nothing
                        });
                }
            });

            $(document).off("change", ".MunicipalityTVItemSelect");
            $(document).on("change", ".MunicipalityTVItemSelect", (evt: Event) => {
                var $selectMuni: JQuery = $(evt.target);
                var MunicipalityTVItemID: number = parseInt($selectMuni.val());
                var $nextSpan: JQuery = $(evt.target).closest("li").children().eq(0);
                if (MunicipalityTVItemID == -1) {
                    cssp.Dialog.ShowDialogMessage($nextSpan.text());
                }
            });

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        public LoadCountryList: Function = ($CountrySelect: JQuery) => {
            var command: string = "Address/_CountryList";
            $.get(cssp.BaseURL + command, {
                CountryTVItemID: 0,
            }).done((ret) => {
                    if (ret) {
                        $CountrySelect.replaceWith(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public LoadProvinceList: Function = ($ProvinceSelect: JQuery, CountryTVItemID: number) => {
            var command: string = "Address/_ProvinceList";
            $.get(cssp.BaseURL + command, {
                CountryTVItemID: CountryTVItemID,
                ProvinceTVItemID: 0,
            }).done((ret) => {
                    if (ret) {
                        $ProvinceSelect.replaceWith(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public LoadMunicipalityList: Function = ($MunicipalitySelect: JQuery, ProvinceTVItemID: number) => {
            var command: string = "Address/_MunicipalityList";
            $.get(cssp.BaseURL + command, {
                ProvinceTVItemID: ProvinceTVItemID,
                MunicipalityTVItemID: 0,
            }).done((ret) => {
                    if (ret) {
                        $MunicipalitySelect.replaceWith(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ReloadAddressEditList: Function = (ContactTVItemID: number) => {
            var command: string = "Address/_addressEditList";
            $.get(cssp.BaseURL + command, {
                ContactTVItemID: ContactTVItemID,
            }).done((ret) => {
                    if (ret) {
                        $(".AddressEditDiv").html(ret);
                        cssp.Address.InitEdit();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ReloadAddressEditInfrastructure: Function = (InfrastructureTVItemID: number) => {
            var command: string = "Address/_addressEditInfrastructure";
            $(".AddressDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            $.get(cssp.BaseURL + command, { InfrastructureTVItemID: InfrastructureTVItemID })
                .done((ret) => {
                    $(".AddressDiv").html(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    cssp.Login.CheckIfAdmin();
                });
        };
        public ReloadAddressEditPolSourceSite: Function = (PolSourceSiteTVItemID: number) => {
            var command: string = "Address/_addressEditPolSourceSite";
            $(".AddressDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            $.get(cssp.BaseURL + command, { PolSourceSiteTVItemID: PolSourceSiteTVItemID })
                .done((ret) => {
                    $(".AddressDiv").html(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    cssp.Login.CheckIfAdmin();
                });
        };
    }
} 