 var MAXIMUM_NUMBER = 99999999999.99;
 var CN_ZERO = "零";
 var CN_ONE = "壹";
 var CN_TWO = "贰";
 var CN_THREE = "叁";
 var CN_FOUR = "肆";
 var CN_FIVE = "伍";
 var CN_SIX = "陆";
 var CN_SEVEN = "柒";
 var CN_EIGHT = "捌";
 var CN_NINE = "玖";
 var CN_TEN = "拾";
 var CN_HUNDRED = "佰";
 var CN_THOUSAND = "仟";
 var CN_TEN_THOUSAND = "万";
 var CN_HUNDRED_MILLION = "亿";
 var CN_DOLLAR = "元";
 var CN_TEN_CENT = "角";
 var CN_CENT = "分";
 var CN_INTEGER = "整";
 var digitArr = [CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE],
     radiceArr = ["", CN_TEN, CN_HUNDRED, CN_THOUSAND],
     bigRadiceArr = ["", CN_TEN_THOUSAND, CN_HUNDRED_MILLION];



 /**
  * 输入数字转人民币大写 1688-- - > 壹仟陆佰捌拾捌元整
  * @param {*} value [Number/String] String:'2,508,598.46'
  */
 function transferRMB(value) {
     if (!/number|string/.test(typeof value)) throw ('Illegal value, expected value is of type number or string')
     var formatValue = String(value).replace(/,/g, "").replace(/^0+/, "")
     if (isNaN(formatValue)) throw ('Illegal value, expected value is of type number or string')
     if (Math.abs(formatValue) > MAXIMUM_NUMBER) throw ("The maximum converted value has been exceeded");
     var parts = String(Math.abs(formatValue)).split('.')
     var integral, // 整数 
         decimal, // 小数位
         zeroCount = 0, //统计0出现的次数
         quotient,
         modulus,
         i, p, d, ds,
         result = ''; //输出的值
     if (parts.length < 2) {
         integral = parts[0];
         decimal = "";
     } else {
         integral = parts[0];
         decimal = parts[1].substr(0, 2);
     }
     //  整数位
     if (integral) {
         for (i = 0; i < integral.length; i++) {
             p = integral.length - 1 - i
             d = integral.substr(i, 1)
             quotient = p / 4
             modulus = p % 4
             if (d == 0) {
                 zeroCount++
                 if (modulus == 0) zeroCount = 0
             } else {
                 if (zeroCount > 0) result += digitArr[0]
                 zeroCount = 0
                 result += digitArr[d] + radiceArr[modulus]
             }
             if (modulus == 0) {
                 result += bigRadiceArr[quotient]
             }
         }
         result += CN_DOLLAR
     }
     //  小数位
     if (decimal) {
         var d1 = decimal.substr(0, 1)
         var d2 = decimal.substr(1, 1)
         if (Number(d1)) {
             result += digitArr[d1] + CN_TEN_CENT
         }
         if (Number(d2)) {
             if (!d1) result += digitArr[0]
             result += digitArr[d2] + CN_CENT
         }
     }
     if (!result) {
         result = CN_ZERO + CN_DOLLAR;
     }
     if (!decimal) {
         result += CN_INTEGER;
     }
     return result
 }

 module.exports = transferRMB