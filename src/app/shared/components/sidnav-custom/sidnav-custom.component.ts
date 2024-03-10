import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule} from '@angular/router';


interface itemNav {
  name: String,
  icon: String,
  navigate?: String
}

@Component({
  selector: 'app-sidnav-custom',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './sidnav-custom.component.html',
  styleUrl: './sidnav-custom.component.scss'
})
export class SidnavCustomComponent {
  sidNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sidNavCollapsed.set(val)
  }


  navItens: Array<itemNav> = [
    // { name: "Início", icon: "home", navigate: "/home" },
    { name: "Dashboard", icon: "dashboard", navigate: "/home/dashboard" },
    { name: "Entrada/Saída", icon: "attach_money", navigate: "/home/transacao" },
    { name: "Carteira", icon: "wallet", navigate: "/home/carteira" },
    { name: "Configuração", icon: "settings", navigate: "/home/configuracao" },
    { name: "Sair", icon: "logout", navigate: "#" }
  ]

  profilePicSize = computed(() => this.sidNavCollapsed() ? '32' : '100');

}
