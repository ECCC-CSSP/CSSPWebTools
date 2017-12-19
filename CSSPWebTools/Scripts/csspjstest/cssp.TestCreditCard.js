var CSSP;
(function (CSSP) {
    var TestCreditCard = /** @class */ (function () {
        function TestCreditCard() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
                $form.valid();
            };
        }
        return TestCreditCard;
    }());
    CSSP.TestCreditCard = TestCreditCard;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestCreditCard.js.map