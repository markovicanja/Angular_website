import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.projects = [
      {
        title: 'Mobilna aplikacija za praćenje informacija o poridičnom stablu',
        subject: 'Programiranje mobilnih uređaja',
        contact: 'dr Zaharije Radivojević, vanredni profesor',
        date: '2020-06-05',
        description: 'Potrebno je realizovati mobilnu aplikaciju koja korisnicima omogućava unos podata o porodičnom stablu. Osoba preko mobilnog uređaja unosi podatke kojie se odnose na osobe. Ti podaci sadrže testualne tapise, slike video zapise. Aplikacija treba da omogući povezivanje osoba, grupa osoba, događaja i mesta. Zapisi se mogu pratiti u vidu vremenske ose ili u vidu stabla. Aplikacija podatke može čuvati lokalno i na internetu. Moguće je spajati zapise koje su unosili različite osobe. Moguće je pretraživati sadržaj po različitim kriterijumima.'
      },
      {
        title: 'Implementacija elektronskog vodiča za reagovanje u vanrednim situacijama',
        subject: 'Programiranje, baze podataka',
        contact: 'dr Marko Mišić, docent',
        date: '2020-01-23',
        description: 'Implementacija aplikacije koja će predstavljati elektronsku verziju vodiča za reagovanje u vanrednim situacijama sa opasnim materijama. Implementacija veb ili desktop verzije.'
      },
      {
        title: 'Homomorfna enkripcija',
        subject: 'Zaštita podataka',
        contact: 'dr Pavle Vuletić, vanredni profesor',
        date: '2019-03-25',
        description: 'Rad u kojem će student analizirati principe funkcionisanja homomorfnih algoritama enkripcije, koji su u poslednje vreme postali aktuelni kao rešenje za realizaciju bezbednih aplikacija na u klaud okruženjima i posebno matematičkog izračunavanja nad kriptovanim podacima. Analiza i testiranje postojećih algoritama i rešenja.'
      },
      {
        title: 'Prevodilac za programski jezik pico C++',
        subject: 'Operativni sistemi, Programski prevodioci, Sistemsko programiranje',
        contact: 'dr Dragan Milićev, redovni profesor',
        date: '2018-05-14',
        description: 'Dugoročni plan unapređenja metode nastave na predmetima Operativni sistemi 1 i 2 predviđa kreiranje veb-bazirane platforme (softvera) za interaktivno, praktično savladavanje i uvežbavanje gradiva. U ovom projektu potrebno je realizovati prevodilac za programski jezik pico C++, jedan od sastavnih delova ove platforme, prema već postojećoj specifikaciji i gramatici. Opis cele ideje, konteksta, platforme, kao i specifikacija i gramatika jezika pico C++ dostupni su na adresi http://afrodita.rcub.bg.ac.rs/~dmilicev/#News. Tema je predviđena za timski rad dva kandidata.'
      },
      {
        title: 'Softverski alat za analizu rada DDR memorije',
        subject: ' Implementacija: po izboru/dogovoru (C++, Perl, Python, ...)',
        contact: 'Dr Saša Stojanović, docent, Dr Milo Tomašević, r.prof.',
        date: '2017-05-11',
        description: 'Treba napisati alat koji bi omogucio vizuelizaciju (prethodno generisanih) podataka u vezi sa saobracajem na DDR magistrali i omogucio analizu dobijenih rezultata.'
      },
      {
        title: 'Primena mašinskog prevođenja u analizi sentimenta tekstova na srpskom',
        subject: 'Procesiranje prirodnih jezika (NLP – Natural Language Processing)',
        contact: 'Dr Boško Nikolić, r.prof.',
        date: '2016-06-21',
        description: 'Jedan od većih problema u analizi sentimenta tekstova na srpskom predstavlja nedostatak tekstualnih resursa potrebnih za izgradnju modela. Cilj ovog projekta je procena mogućnosti mašinskog prevođenja obimnih postojećih resursa na engleskom jeziku i njihovog korišćenja u analizi sentimenta tekstova na srpskom.'
      },
      {
        title: 'Personalizacija ponude prodavnice (razvoj softvera u saradnji sa Enetel Solutions)',
        subject: 'Objektno-orijentisano projektovanje i programiranje veb aplikacija',
        contact: 'Dr Igor Tartalja, v.prof.',
        date: '2016-05-16',
        description: 'Zadatak je razviti veb aplikaciju koja preporučuje proizvode kupcima u skladu sa njihovim preferencijama. Aplikacija ima bazu kategorizovanih proizvoda koji se nalaze u ponudi i nudi ih autentifikovanim kupcima. Kategorije čiji su proizvodi komplementarni su međusobno povezane. Aplikacija integracijom sa Google Analytics i Facebook servisima beleži broj pregleda proizvoda (broj otvaranja strane), odnosno broj korisnika kojima se stranica sviđa (broj lajkova). Osnovni cilj rada je napraviti sistem koji će autorizovanom kupcu preporučivati proizvode. Serverska strana treba da ima sledeće osobine: Programski jezik po izboru u skladu sa dogovorom Podaci se skladište u nekoj od relacionih baza Filtriranje (generisanje preporuka) se može vršiti u realnom vremenu ili u pozadinskom procesu koji se pokreće periodično/na zahtev.'
      },
      {
        title: 'Softverski sistem za obradu rezultata ankete',
        subject: 'softverski alati, obrada podataka',
        contact: 'Dr Jelica Protić, asistent Marko Mišić',
        date: '2015-03-15',
        description: 'Tema bi obuhvatala razvoj informacionog sistema za obradu podataka studentske ankete. Anketa je realizovana elektronski, a na osnovu sirovih podataka je potrebno generisati odgovarajuće izveštaje i grafikone. Moguća je i implementacija naprednih tehnika u pravcu dublje interpretacije dobijenih anketnih rezultata.'
      },
      {
        title: 'Automatizacija testiranja HW primera za FT90x arhitekturu (razvoj aplikacije i procedura)',
        subject: 'Sistemsko programiranje',
        contact: 'dr Dragan Bojic, docent/Sasa Stojanovic, asistent',
        date: '2015-03-15',
        description: 'Rad se realizuje u saradnji sa kompanijom Mikroelektronika, koja po potrebi obezbeddjuje radno okruzenje i strucne savete.'
      },
      {
        title: 'Implementacija web crawlera u Javi',
        subject: 'Artificial Intelligence',
        contact: 'Dr Boško Nikolić, vanredni prof. / Dražen Drašković, asistent',
        date: '2015-03-15',
        description: 'Napredna web pretraživanja koriste danas specijalizovane programe koji se nazivaju web crawleri. Cilj rada je da se realizuje nekoliko web crawlera koji služe za pretraživanje pojednih foruma, da se prikaže njihova struktura i da se uporede performanse. Za više detalja o samoj realizaciji, kao i o alatima potrebnim za realizaciju, obratiti se putem e-pošte drazen.draskovic@etf.rs. Ovakvi algoritmi imaju primenu kada je sa određenog sajta ili grupe sajtova potrebno da dobijamo nove informacije, pronalaženje novih artikala na sajtu, praćenje da li ima na stanju, da li je došlo do promene cene, i sve to u što kraćem vremenskom intervalu.'
      }
    ];
  }

  projects: Array<Object>;

}
