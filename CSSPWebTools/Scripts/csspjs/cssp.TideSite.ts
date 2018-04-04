module CSSP {
    export class TideSite {
        // Variables

        // Constructors
        constructor() {
        }

        // Functions
        public Init: Function = (): void => {
            $(".TideSiteAddOrModifyForm").each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
}   