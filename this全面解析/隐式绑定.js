function foo() {
    console.log( this.a );
}
var obj = {
    a: 12,
    foo: foo
}
obj.foo();

var obj1 = {
    a: 42,
    obj: obj
}
obj1.obj.foo();

// 隐式绑定丢失
function foo1() {
    console.log( this.a );
}
var obj2 = {
    a: 2,
    foo: foo1
}
var bar = obj2.foo;
var a = 33;
bar();

function foo2() {
    console.log( this.a1 );
}
function doFoo(fn) {
    fn();
}
var obj3 = {
    a1: 2,
    foo: foo2
}
var a1  = 'oops, global';
doFoo( obj3.foo );



function foo3() {
    console.log( this.a );
}
var obj4 = {
    a: 2,
    foo: foo3
}
var a = 'oops, global';
setTimeout( obj4.foo, 100 );

