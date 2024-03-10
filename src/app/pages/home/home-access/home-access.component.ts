import { BreakpointObserver } from '@angular/cdk/layout';

import {
  Component,
  OnInit,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

interface itemNav {
  name: String,
  icon: String,
  navigate: String
}

@Component({
  selector: 'app-home-access',
  templateUrl: './home-access.component.html',
  styleUrl: './home-access.component.scss'
})

export class HomeAccessComponent implements OnInit {
  [x: string]: any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;


  navItens: Array<itemNav> = [
    { name: "Início", icon: "home", navigate: "/home" },
    { name: "Dashboard", icon: "dashboard", navigate: "/home/dashboard" },
    { name: "Entrada/Saída", icon: "attach_money", navigate: "/home/transacao" },
    { name: "Carteira", icon: "wallet", navigate: "/home/carteira" },
    { name: "Configuração", icon: "settings", navigate: "/home/configuracao" },
    { name: "Sair", icon: "logout", navigate: "#" }
  ]

  constructor(private observer: BreakpointObserver, private _route: Router,) { }

  ngOnInit() {

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

  }

  collapsed = signal(false);
  sidNavWidth = computed(() => this.collapsed() ? '75px' : '250px')
}
