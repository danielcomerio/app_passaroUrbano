import { Oferta } from './shared/oferta.model'
import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { URL_API } from './app.api'
import { Observable } from 'rxjs'
import { map, retry } from 'rxjs/operators';
//import 'rxjs/add/operator/toPromise'


@Injectable()
export class OfertasService {

    constructor(private http: Http) {}

    //public ofertas: Oferta[]

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    
    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }
    
    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => { return resposta.json()[0]})
    }
    
    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao
            })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json()[0].descricao)
    }
    
    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10))
            .pipe(map((resposta: Response) => resposta.json()))
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /**
    public getOfertas2(): Promise<Oferta[]> {

        return new Promise((resolve, reject) =>{
            //algum tipo de processamento, que ao finalizar, chama a função resolve ou a função reject

            let deu_certo = true
            if(deu_certo) {
                //resolve( this.ofertas )
                setTimeout(() => resolve( this.ofertas ), 3000)
            } else {
                reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado XYZ' })
            }
        })
        
        .then(( ofertas: Oferta[] ) => {
            //fazer alguma tratativa
            console.log('primeiro then')
            return ofertas
        })

        .then(( ofertas: Oferta[]) => {
            //fazer uma outra tratativa
            console.log('segundo then')
            return new Promise((resolve2, reject2) => {
                setTimeout(() => { resolve2( ofertas ) }, 3000)
            })
        })

        .then( ( ofertas: Oferta[] ) => {
            console.log('terciero then executado após 3 segundos porque estava aguardando uma promise ser resolvida')
            return ofertas
        })
    }
    */
}