var CSSP;
(function (CSSP) {
    var HydrometricSite = (function () {
        // Variables
        // Constructors
        function HydrometricSite() {
            // Functions
            this.Init = function () {
                $(".HydrometricSiteAddOrModifyForm").each(function (ind, elem) {
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
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
        }
        return HydrometricSite;
    }());
    CSSP.HydrometricSite = HydrometricSite;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.HydrometricSite.js.map