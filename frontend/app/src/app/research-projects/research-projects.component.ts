import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-research-projects',
  templateUrl: './research-projects.component.html',
  styleUrls: ['./research-projects.component.css']
})
export class ResearchProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.projects = [
      {
        title: 'Softversko inzenjerstvo i nove tehnologije u racunarstvu (SINTRA)',
        head: 'Drazen Draskovic',
        type: 'Projekti - Razvoj visokog obrazovanja',
        partner: 'Ministarstvo prosvete, nauke i tehnoloskog razvoja',
        startDate: '14.10.2019.'
      },
      {
        title: 'Projekat za prekvalifikacije u IT sektoru',
        head: 'Bosko Nikolic',
        type: 'Medjunarodne donacije',
        partner: 'Ministarstvo prosvete, nauke i tehnoloskog razvoja',
        startDate: '04.02.2019.'
      },
      {
        title: 'Strucno-ekspertska analiza',
        head: 'Bosko Nikolic',
        type: 'Vestacenja',
        partner: 'Ministarstvo drzavne uprave i lokalne samouprave',
        startDate: '11.04.2017.'
      },
      {
        title: 'Vestacenja',
        head: 'Goran Kvascev',
        type: 'Vestacenja',
        partner: 'Privredni sud u Beogradu',
        startDate: '31.10.2013.'
      },
      {
        title: 'Održavanja LINUX servera',
        head: 'Bosko Nikolic',
        type: 'Komercijalnli projekti sa javnim preduzecima',
        partner: 'Institut za onkologiju i radiologiju Srbije',
        startDate: '06.06.2013.'
      },
      {
        title: 'Projekat za prekvalifikacije u IT sektoru',
        head: 'Bosko Nikolic',
        type: 'Ujedinjene nacije program za razvoj',
        partner: 'Ministarstvo prosvete, nauke i tehnoloskog razvoja',
        startDate: '04.02.2019.'
      },
      {
        title: 'Information Security Services Education in Serbia',
        head: 'Igor Tartalja',
        type: 'ERAZMUS + K2',
        partner: 'Univerzitet u Beogradu',
        startDate: '14.02.2018.'
      },
      {
        title: 'Razvoj digitalnih tehnologija umrezenih servisa u sistemima sa ugradjenim elektronskim komponentama',
        head: 'Zaharije Radivojevic',
        type: 'Nauka - Projekti NIO',
        partner: 'Ministarstvo prosvete, nauke i tehnoloskog razvoja',
        startDate: '24.02.2020.'
      },
      {
        title: 'Elektromagnetska kompatibilnost i pratece simulacije',
        head: 'Dragan Olcan',
        type: 'Ostali domaci komercijalni projekti',
        partner: 'DAD DRAXLMAIER AUTOMOTIVE DOO ZRENJANIN',
        startDate: '16.04.2019.'
      },
    ];
  }

  projects: Array<Object>;

}
