// (function rec(a: string) {
//     console.log(a)
//     return rec(a)
// })("O Bernardo é meu amigo");

function fibo(times: number, atual: number = 1, proximo: number = 1) {
    if(!times) return 0;
    let temp = proximo + atual
    // console.log("atual: ", atual);
    // console.log("proximo", proximo);
    // console.log('--------------------------------------')
    proximo = atual;
    atual = temp;
    
    return fibo(--times, atual, proximo )
}
console.time('teste')
fibo(1500);
console.timeEnd("teste");