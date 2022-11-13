/*
 * @Author: 陈银 chenyin151@163.com
 * @Date: 2022-11-13 23:19:36
 * @LastEditors: 陈银 chenyin151@163.com
 * @LastEditTime: 2022-11-14 00:54:21
 * @FilePath: /youdontknowjs-test/this全面解析/new绑定.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function foo(a) {
    this.a = a;
}
var bar = new foo(2);
console.log(bar.a);

//  显式优先级更高，然后是隐式绑定，最后是默认绑定
function foo1() {
    console.log('foo1', this.a );
}
var obj1 = {
    a: 2,
    foo: foo1
}
var obj2 = {
    a: 3,
    foo: foo1
}
obj1.foo();
obj2.foo();
obj1.foo.call( obj2 );
obj2.foo.call( obj1 );


function foo2(something) {
    this.a = something;
}
var obj3 = {
    foo: foo2
}
var obj4 = {}
obj3.foo(2);
console.log( 'obj1.a', obj1.a );
obj3.foo.call( obj4, 3 );
console.log( 'obj4.a', obj4.a );
var bar = new obj3.foo(4);
console.log('obj3.a', obj3.a);
console.log( 'bar.a', bar.a);



function foo3(something) {
    this.a = something;
}
var obj5 = {}
var bar = foo3.bind( obj5 );
bar( 2 );
console.log( 'obj5.a', obj5.a );
var baz = new bar( 3 );
console.log('obj5.a', obj5.a );
console.log('baz.a', baz.a );


function bind( fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    }
}
function foo4(something) {
    return this.a + something;
}
var obj4 = { 
    a: 2
}
var bar4 = bind(foo4, obj4);
var res = new bar4(4);;
console.log('res', res)

function main() {
    if (!Function.prototype.bind1) {
        Function.prototype.bind1 = function(oThis) {
            if (typeof this !== 'function') {
                throw new TypeError('Function.prototype.bind1 - what is trying to be bound is not callable');
            }
            var aArgs = Array.prototype.slice.call( arguments, 1 ),
                fToBind = this,
                fNOP = function() {}
                fBound = function() {
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        }
    }
    function foo5() {
        return this.a;
    }
    var o = {
        a: 2
    }
    var fo = foo5.bind1(o);
    console.log('foo5', fo())
}
main()
