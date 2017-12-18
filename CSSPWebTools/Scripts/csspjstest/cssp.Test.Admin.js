var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var Admin = /** @class */ (function () {
            // Constructor
            function Admin() {
                // Function
                this.Init = function () {
                    QUnit.module("cssp.Admin tests");
                    test("Init", function () {
                        equal(document.title, "");
                        // Act  
                        cssp.Admin.Init();
                        // Assert
                        equal(document.title, "bonjossdfsdfurs");
                    });
                };
            }
            return Admin;
        }());
        Test.Admin = Admin;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.Admin.js.map