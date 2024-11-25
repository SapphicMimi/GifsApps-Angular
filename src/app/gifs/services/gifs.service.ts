import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey: string = "b1ZzfN6ByPfjRThKfOHBBiISJpHR5x4m";

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
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    // if(tag ==  '') return;

    this.organizeHistory(tag);
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
