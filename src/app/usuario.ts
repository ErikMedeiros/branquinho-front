export class Usuario {
  _id: string | undefined;
  nome: string;
  senha: string;
  admin: boolean;

  constructor(nome: string, senha: string, admin: boolean) {
    this.nome = nome;
    this.senha = senha;
    this.admin = admin;
  }
}
