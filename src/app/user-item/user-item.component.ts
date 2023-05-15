import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent {
  emEdicao = false;
  @Input() usuario = new Usuario("", "", false);
  @Output() removerUsuario = new EventEmitter();
  @Output() editarUsuario = new EventEmitter();
}
