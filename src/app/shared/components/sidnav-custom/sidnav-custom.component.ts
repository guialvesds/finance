import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';


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
export class SidnavCustomComponent implements OnInit {
  sidNavCollapsed = signal(true);
  @Input() set collapsed(val: boolean) {
    this.sidNavCollapsed.set(val)
  }

  navItens: Array<itemNav> = [
    { name: "Início", icon: "home", navigate: "/home/initial" },
    { name: "Dashboard", icon: "dashboard", navigate: "/home/dashboard" },
    { name: "Entrada/Saída", icon: "attach_money", navigate: "/home/transacao" },
    // { name: "Carteira", icon: "wallet", navigate: "/home/carteira" },
    // { name: "Configuração", icon: "settings", navigate: "/home/configuracao" },
    { name: "Sair", icon: "logout", navigate: "#" }
  ]

 public profilePicSize = computed(() => this.sidNavCollapsed() ? '32' : '100');

 public hoursNow: string = '';

  ngOnInit(): void {

    this.dayAndNigth();
  }
  
  dayAndNigth(): String {

    const hours: string = new Date().toLocaleTimeString().substring(0, 2);

    if (hours >= '05' && hours <= '11') {
      this.hoursNow = 'Bom dia!'
    } else if (hours >= '12' && hours <= '17') {
      this.hoursNow = 'Boa tarde!'
    } else {
      this.hoursNow = 'Boa noite!'
    }
    return this.hoursNow;
  }
}
