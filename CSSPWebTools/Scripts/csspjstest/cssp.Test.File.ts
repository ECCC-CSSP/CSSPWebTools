module CSSP.Test {

    export class File {
        // Variables
        public TSName: string = "cssp.File.ts";
        public appName: string = "cssp.File";
        public EmailTestList: Array<string>;
        public ForgotPasswordTestOK: Array<boolean>;

        // Constructors
        constructor() {
        }

        // Function

        // **********************************************************
        // **********************************************************
        // **********************************************************


        public TestContents: Function = (): void => {
            
            $("#qunit-tests").html("");

            cssp.Test.RunCheckVariablesAndFunctions(this.TSName, this.appName, ["app", "FileImport", "Init", ]);

            QUnit.module("#FileDiv and children");

          
        };
        public TestFields: Function = (): void => {
            
            $("#qunit-tests").html("");
        };


        // **********************************************************
        // **********************************************************
        // **********************************************************




        // Function private
        // _______________________________________________________________________________________
        // _______________________________________________________________________________________
        // Function private

    }
}     