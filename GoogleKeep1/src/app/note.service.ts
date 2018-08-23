import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Note } from './Note';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private http: Http) {
  }
  notesurl = "https://localhost:44361/api/notes";
  public getNotes() {
    return this.http.get(this.notesurl);
  }
  public SearchByTitle(title:string) {
    return this.http.get(this.notesurl+title);
  }
  public getNote(id:string) {
    return this.http.get("https://localhost:44361/api/notes/"+id);
  }

  public postNotes(note: Note) {
    return this.http.post(this.notesurl, note);
  }
  public deleteNote(id: number) {
    const url = `${this.notesurl}/${id}`;
    return this.http.delete(url);
  }
  public putNotes(note, id){
    return this.http.put("https://localhost:44361/api/notes/"+ id, note);
  }
}
