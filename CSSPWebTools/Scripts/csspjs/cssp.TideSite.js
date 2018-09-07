var CSSP;
(function (CSSP) {
    var TideSite = (function () {
        // Variables
        // Constructors
        function TideSite() {
            // Functions
            this.Init = function () {
                $(".TideSiteAddOrModifyForm").each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            SomeVariable: {
                                required: true,
                                maxlength: 150,
                                email: true,
                            },
                        }
                    });
                });
                //if (cssp.Test) {
                //    cssp.Test.ShowTestButtons();
                //}
            };
        }
        return TideSite;
    }());
    CSSP.TideSite = TideSite;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TideSite.js.map