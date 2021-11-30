define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Helpers = void 0;
    class Helpers {
        static toCurrency(price, currencyUnit, position = "left") {
            if (position == "left") {
                return currencyUnit + " " + price;
            }
            else if (position == "right") {
                return price + " " + currencyUnit;
            }
        }
    }
    exports.Helpers = Helpers;
});
