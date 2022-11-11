function main() {
    if ( !Function.prototype.bind1 ) {
        Function.prototype.bind1 = function (oThis) {
            debugger
            if (typeof this !== 'function') {
                throw new TypeError('Function.prototype.bind1 - what is trying to be bound is not callable.');
            }
            // aArgs获取bind1携带的参数列表，第一个参数为this指向，所以从第二个参数开始截取
            var aArgs = Array.prototype.slice.call( arguments, 1 ),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(
                    this instanceof fNOP && oThis ? this : oThis,
                    aArgs.concat( Array.prototype.slice.call( arguments ) )
                )
            }
            // 这里的this指向是Foo,因为调用Foo.bind1这个函数，this指向就是Foo
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        }
    }
    
    function Foo() {
        return this.a;
    }
    var o = {
        a: 1
    }
    var foo = Foo.bind1(o);
    console.log('res', foo());
}
main();

