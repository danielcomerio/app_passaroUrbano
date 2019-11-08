import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { CarrinhoService } from '../carrinho.service'
import { Observable, Observer, Subscription, interval } from 'rxjs';

import { Oferta } from '../shared/oferta.model'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  //private tempoObservableSubscription: Subscription
  //private meuObservableTesteSubscription: Subscription

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
      
      this.ofertasService.getOfertaPorId(parametros.id)
      .then(( oferta: Oferta ) => {
        this.oferta = oferta
        //console.log(this.oferta)
      })
    })



    /*
    this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })
    */
  }

    /*
    this.route.params.subscribe(
      (parametro: any) => { console.log(parametro) },
      (erro: any) => console.log(erro),
      () => console.log('Processamento foi classificado como concluído!')
    )

    

    let tempo = interval(2000)

    this.tempoObservableSubscription = tempo.subscribe((intervalo:number) => {
      console.log(intervalo)
    })


    //observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<string>) => {
      observer.next('Primeiro evento da stream'),
      observer.next('a'),
      //observer.error(''),
      observer.complete(),
      observer.next('b')
    })

    //observable (observador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: any) => console.log(resultado),
      (erro: any) => console.log(erro),
      () => console.log('Stream de eventos foi finalizada')
    )

  ngOnDestroy() {
    this.tempoObservableSubscription.unsubscribe()
    this.meuObservableTesteSubscription.unsubscribe()
  }
  */

  ngOnDestroy() {

  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
  }

}
