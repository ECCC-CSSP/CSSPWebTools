
module CSSP {
    export class RainExceedance {
        // Variables

        // Constructors
        constructor() {

        }

        // Functions
        public FormSubmit: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest(".RainExceedanceAddOrModifyForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".RainExceedanceAddOrModifyForm", "RainExceedanceEditDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public InitEdit: Function = (): void => {
            $(".RainExceedanceAddOrModifyForm").each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            RainMaximum: {
                                required: true,
                                number: true,
                                range: [0, 500],
                            },
                            RainExceedanceName: {
                                required: true,
                                maxlength: 200,
                            },
                            Lat: {
                                required: true,
                                number: true,
                                range: [-90, 90],
                            },
                            Lng: {
                                required: true,
                                number: true,
                                range: [-180, 180],
                            },
                            StartMonth: {
                                required: true,
                                number: true,
                                range: [1, 12],
                            },
                            StartDay: {
                                required: true,
                                number: true,
                                range: [1, 31],
                            },
                            EndMonth: {
                                required: true,
                                number: true,
                                range: [1, 12],
                            },
                            EndDay: {
                                required: true,
                                number: true,
                                range: [1, 31],
                            },
                        }
                    });
            });

        };
        public RainExceedanceListShowHideAdd: Function = ($bjs: JQuery): void => {
            return;
        };
        public RainExceedanceShowHideEditButtons: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest("#ViewDiv").find(".RainExceedanceEditButons").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest("#ViewDiv").find(".RainExceedanceEditButons").removeClass("hidden").addClass("hidden");
            }
        };
        public RainExceedanceShowHideAdd: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").removeClass("hidden");

                $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command: string = "RainExceedance/_rainExceedanceAddOrModify";
                $.get(cssp.BaseURL + command, {
                    RainExceedanceID: 0,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").html("");
                $bjs.closest(".RainExceedanceTopDiv").find(".RainExceedanceAdd").removeClass("hidden").addClass("hidden");
            }
        };
        public RainExceedanceShowAddOrModify: Function = ($bjs: JQuery): void => {
            let ParentTVItemID: number = parseInt($bjs.find("#ViewDiv").data("tvitemid"));
            let RainExceedanceID: number = parseInt($bjs.data("rainexceedanceid"));
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop")
                    .html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));

                var command: string = "RainExceedance/_RainExceedanceAddOrModify";
                $.get(cssp.BaseURL + command, {
                    ParentTVItemID: ParentTVItemID,
                    RainExceedanceID: RainExceedanceID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop").html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".RainExceedanceItem").find(".RainExceedanceAddOrModifyTop").html("");
            }
        };
    }
}