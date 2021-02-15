import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Notification } from '../model/notification.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getAllNotifications();
    this.poziviZaTakmicenja = [];  
    this.obavestenjaOKonferencijama = [];
    this.ponudeZaPrakse = [];
    this.ponudeZaPosao = [];
  }

  poziviZaTakmicenja: Notification[];
  obavestenjaOKonferencijama: Notification[];
  ponudeZaPrakse: Notification[];
  ponudeZaPosao: Notification[];

  getAllNotifications() {
    this.service.getAllNotifications().subscribe((notifications: Notification[]) => {
      notifications.forEach(n => {
        if (n.type == "Pozivi za studentska takmicenja") this.poziviZaTakmicenja.push(n);
        else if (n.type == "Obavestenja o konferencijama") this.obavestenjaOKonferencijama.push(n);
        else if (n.type == "Ponude za prakse") this.ponudeZaPrakse.push(n);
        else if (n.type == "Ponude za posao") this.ponudeZaPosao.push(n);
      })
    })
  }

}
