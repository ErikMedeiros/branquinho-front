import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Usuario } from './usuario';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'TODOapp';
    arrayDeTarefas: Tarefa[] = [];
    arrayDeUsuarios: Usuario[] = [];
    apiURL: string;
    usuarioLogado = false;
    admin = false;
    tela: 'tarefa' | 'usuario' = 'tarefa';
    tokenJWT = '{ "token":"","admin":false}';

    constructor(private http: HttpClient) {
        this.apiURL = 'https://branquinho-back.vercel.app';
        this.READ_tarefas();
    }
    CREATE_tarefa(descricaoNovaTarefa: string) {
        const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);

        var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
        this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa, { headers: idToken }).subscribe(
            resultado => { console.log(resultado); this.READ_tarefas(); });
    }
    READ_tarefas() {
        const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
        this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { headers: idToken }).subscribe(
            (resultado) => { this.arrayDeTarefas = resultado; this.usuarioLogado = true },
            (error) => { this.usuarioLogado = false }
        );
    }
    REMOVER_TAREFA(tarefa: Tarefa) {
        const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);

        var indice = this.arrayDeTarefas.indexOf(tarefa);
        var id = this.arrayDeTarefas[indice]._id;
        this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`, { headers: idToken }).subscribe(
            resultado => { console.log(resultado); this.READ_tarefas(); });
    }
    UPDATE_tarefa(tarefa: Tarefa) {
        const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);

        var indice = this.arrayDeTarefas.indexOf(tarefa);
        var id = this.arrayDeTarefas[indice]._id;
        this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefa, { headers: idToken })
            .subscribe(resultado => { console.log(resultado); this.READ_tarefas(); });
    }
    login(username: string, password: string) {
        var credenciais = { "nome": username, "senha": password }
        this.http.post(`${this.apiURL}/api/login`, credenciais).subscribe(resultado => {
            this.tokenJWT = JSON.stringify(resultado);
            this.admin = JSON.parse(this.tokenJWT).admin;
            this.READ_tarefas();
            if (this.admin) this.READ_usuarios();
        })
    }

    CREATE_USUARIO(nome: string, senha: string) {
        const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
        var usuario = new Usuario(nome, senha, false);

        this.http.post<Usuario>(`${this.apiURL}/api/user`, usuario, { headers: idToken }).subscribe(
            resultado => { console.log(resultado); this.READ_usuarios(); });
    }

    READ_usuarios() {
        const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
        this.http.get<Usuario[]>(`${this.apiURL}/api/user`, { headers: idToken }).subscribe(
            (resultado) => { this.arrayDeUsuarios = resultado; })
    }

    REMOVER_USUARIO(usuario: Usuario) {
        const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
        this.http.delete<Usuario>(`${this.apiURL}/api/user/${usuario._id}`, { headers: idToken }).subscribe(
            (resultado) => {console.log(resultado); this.READ_usuarios() }
        )
    }

    UPDATE_USUARIO(usuario:Usuario) {
        const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
        this.http.patch<Tarefa>(`${this.apiURL}/api/user/${usuario._id}`, usuario, { headers: idToken })
            .subscribe(resultado => { console.log(resultado); this.READ_usuarios(); });
    }
}