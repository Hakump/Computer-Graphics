// let a = 1;
// function one() {
//     let a=2;
//     function addA(x) {
//         console.log(a+x);
//         if (x>1) {
//             let a = 3;
//         }
//         a=4;
//     }
//     a = 5;
//     return addA;
// }
// a=6;
// let f = one();
// f(2);

console.log("1");
window.onclick = function() { console.log("2"); };
console.log("3");
window.onload = function() { console.log("4"); };
console.log("5");
window.onload = function () { console.log("6") };
console.log("7");
