function run(a: number)
function run(a: string, b: number)
function run() {

}

run(1)



function res() {
    try {
        a.b = 1;
        return 1;
    } catch (e) {
        return 2;
    }
}
console.log(res()); // 2 
function res() {
    try {
        a.b = 1;
        return 1;
    } catch (e) {
        return 2;
    } finally {
        return 3;
    }
}
console.log(res()); // 3
