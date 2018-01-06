var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var File = /** @class */ (function () {
            // Constructors
            function File() {
                var _this = this;
                // Variables
                this.TSName = "cssp.File.ts";
                this.appName = "cssp.File";
                // Function
                // **********************************************************
                // **********************************************************
                // **********************************************************
                this.TestContents = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.RunCheckVariablesAndFunctions(_this.TSName, _this.appName, ["app", "FileImport", "Init",]);
                    QUnit.module("#FileDiv and children");
                };
                this.TestFields = function () {
                    $("#qunit-tests").html("");
                };
            }
            return File;
        }());
        Test.File = File;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.File.js.map