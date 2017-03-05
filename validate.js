/**
 * @author xzzzzz
 * 
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) { // AMD
        define(factory);
    } else if (typeof exports === 'object') { // CMD
        module.exports = factory();
    } else { // window
        root.validate = factory();
    }
}(this,function() {

    // 策略类 提供具体的验证方法
    var check = {
        'maxLength': function(value, length) {
            var numReg = /^\d+$/; // 验证解析的length是一个完全的整数
            var isNumber = numReg.test(length);
            console.log(isNumber);
            var lengthNum;
            if (isNumber) {
               lengthNum = parseInt(length, 10);
            } else {
                throw new TypeError('你输入的不全是数字');
            }
            console.log(value, length);
            if (length >= 0) {
                return value.length <= length;
            } else {
                throw new TypeError('你输入的数字有误');
            }
        },

        'max': function() {
            if (arguments.length === 0) {

            } else if(arguments.length === 1 && (typeof arguments[0] === 'number') && (arguments > 0)) {

            }
        },
        email: function(value) {
            // var reg = //;
            // return reg.test();
        },
        age: function() {
            // ....
        },
        black: function() {
            // ..... // to be continue....
        }
    }

    /**
     * validate Func
     * @param  {string} method    -方法类型
     * @param  {any} value     [description]
     * @param  {func} errorFn   [description]
     * @param  {func]} successFn [description]
     * @return {[type]}           [description]
     */
    function validate(method, value, errorFn, successFn) {
        var Ary = method.split('|');
        console.log(Ary);
        var result;
        if (Ary.length === 1 && (typeof Ary[0] === 'string')) {
            console.log('hello');
            result = check[method](value);
           
        } else if (Ary.length === 2) {
            result = check[Ary[0]](value, Ary[1]);
        } else {
            throw new Error('请输入正确的参数值');
        }
        judge(result, errorFn, successFn);
    }

    /**
     * [isValidFuncton description]
     * @param  {[type]}  methodName [description]
     * @param  {[type]}  obj        [description]
     * @return {Boolean}            [description]
     */
    function isValidFuncton(methodName, obj) { // 验证是否是有效的参数名
        var methodsAry = Object.keys(obj);
        return methodsAry.some(function(ele) {
            return methodName === ele;
        });
    };

    function judge(isRight, errorFn, successFn) {
        console.log('111i ' + isRight);
        if (!isRight) {
            if(errorFn) {
                errorFn();
            }
        } else {
            if(successFn) {
                successFn();
            }
        }
    }
    return validate;
});
