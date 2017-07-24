module CSSP.Test {
    export class Profile {
        // Constructor
        constructor() {
        }

        // Function
        public TestProfileContents: Function = (): void => {
            $("#qunit-tests").html("");

            QUnit.module("_Profile tests");

            test("_Profile contents", () => {
                equal($("#ProfileDiv").length, 1, "#ProfileDiv exist");
                equal(true, true, "Not complete");
            });

            test("Finished", () => {
                equal(true, true);
            });

        };
    }
}    