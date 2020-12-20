// const s = () => {
//     console.log(123);
// };
// s();
// const arr = [1, 2, 3];
// console.log(arr.includes(1));

// class A {
//     constructor () {
//         this.a = 123;
//     }
// }
// const b = new A();
// console.log(b.a);

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("执行定时器");
        resolve();
        reject();
    }, 1000);
});
console.log(promise);
// function s(a, bc) { console.log(a, bc); }
// const dd = 1312;
// const st = 12312;