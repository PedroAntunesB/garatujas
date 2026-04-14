let x: number = 10;

function identity<Type>(arg: Type): Type {
  return arg;
}

interface IPessoa {
    nome: string,
}

class Pessoa implements IPessoa {
    public nome: string;
    protected cpf: string;
    constructor(nome: string, cpf: string) {
        this.nome = nome;
        this.cpf = cpf;
    }
}

console.log(identity<String>("Ola mundo"))
