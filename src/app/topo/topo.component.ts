import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';

import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  private subjectPesquisa: Subject<string> = new Subject<string>()

  public ofertas: Observable<Oferta[]>

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .pipe(debounceTime(1000)) //executa a ação do switchMap após 1 segundo)
      .pipe(switchMap((termo: string) => {
        console.log('requisição http para api')
        return this.ofertasService.pesquisaOfertas(termo)
      }))
    
    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
  }

  /*
  public pesquisa(event: Event): void {
    console.log((<HTMLInputElement>event.target).value)
  }
  */

  public pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

}
