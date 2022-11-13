function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
}
foo.call( obj );

function foo1() {
    console.log( this.a );
}
var obj1 = {
    a: 2
}
var bar = function() {
    foo1.call( obj1 );
}
bar();
setTimeout( bar, 100 );
bar.call( window );


function foo2(something) {
    console.log( this.a, something );
    return this.a + something;
}
var obj2 = {
    a: 2
}
var bar1 = function() {
    return foo2.apply( obj2, arguments );
}
var b1 = bar1( 3 );
console.log( b1 );

function foo3(something) {
    console.log( 'foo3', this.a, something );
    return this.a;
}
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    }
}
var obj3 = {
    a: 2
}
var bar3 = bind( foo, obj3 );
var b2 = bar( 3 );
console.log( b2 );
