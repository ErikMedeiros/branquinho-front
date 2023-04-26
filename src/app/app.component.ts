import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'TODOapp';
    arrayDeTarefas: Tarefa[] = [];
    apiURL: string;

    constructor(private http: HttpClient) {
        this.apiURL = process.env['API_URL'] ?? 'localhost:3000',
        this.READ_tarefas();
    }
    CREATE_tarefa(descricaoNovaTarefa: string) {
        var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
        this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
            resultado => { console.log(resultado); this.READ_tarefas(); });
    }
    READ_tarefas() {
        this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
            resultado => this.arrayDeTarefas = resultado);
    }
    REMOVER_TAREFA(tarefa: Tarefa) {
        var indice = this.arrayDeTarefas.indexOf(tarefa);
        var id = this.arrayDeTarefas[indice]._id;
        this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
            resultado => { console.log(resultado); this.READ_tarefas(); });
    }
    UPDATE_tarefa(tarefa: Tarefa) {
        var indice = this.arrayDeTarefas.indexOf(tarefa);
        var id = this.arrayDeTarefas[indice]._id;
        this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefa)
            .subscribe(resultado => { console.log(resultado); this.READ_tarefas(); });
    }
}
