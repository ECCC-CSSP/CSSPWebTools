module CSSP.Test {
    export class Admin {
        // Constructor
        constructor() {
        }

        // Function
        public Init: Function = (): void => {
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
}  