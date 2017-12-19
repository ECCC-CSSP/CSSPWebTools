var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var Profile = (function () {
            // Constructor
            function Profile() {
                // Function
                this.TestProfileContents = function () {
                    $("#qunit-tests").html("");
                    QUnit.module("_Profile tests");
                    test("_Profile contents", function () {
                        equal($("#ProfileDiv").length, 1, "#ProfileDiv exist");
                        equal(true, true, "Not complete");
                    });
                    test("Finished", function () {
                        equal(true, true);
                    });
                };
            }
            return Profile;
        }());
        Test.Profile = Profile;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.Profile.js.map