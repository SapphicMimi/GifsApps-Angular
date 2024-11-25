import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})

export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'b1ZzfN6ByPfjRThKfOHBBiISJpHR5x4m';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
  }

  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    // if(tag ==  '') return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '15')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.gifList = resp.data;
      })

    // Esto es con Java, cosa que queremos hacerlo con Angular
    /*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=b1ZzfN6ByPfjRThKfOHBBiISJpHR5x4m&q=valorant&limit=15')
      .then(resp => resp.json())
      .then(data => console.log(data));
    */
    /*
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=b1ZzfN6ByPfjRThKfOHBBiISJpHR5x4m&q=valorant&limit=15');
    const data = await resp.json();
    console.log(data);
    */
  }

  // Como yo lo he hecho
  /*
  private _insertTag(tag: string): void {
    if(this._tagsHistory.includes(tag.toLowerCase())) {
      this._tagsHistory.splice(this._tagsHistory.indexOf(tag), 1)
      this._tagsHistory.unshift(tag.toLowerCase());
    } else {
      this._tagsHistory.unshift(tag.toLowerCase());
    }
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;

    this._insertTag(tag);

    if(this._tagsHistory.length == 11) {
      this._tagsHistory.pop();
    }
  }
  */

  // Version Mejorada del método
  /*
  private _insertTag(tag: string): void {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory.splice(this._tagsHistory.indexOf(tag), 1)
    }

    this._tagsHistory.unshift(tag);
  }
  */
}
