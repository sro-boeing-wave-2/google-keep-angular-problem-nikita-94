import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  giventitle='';
  note;
  onClick(title) {
    this.giventitle = title;
    this.service.SearchByTitle(this.giventitle)
        .subscribe(data => this.note = data);
  }
  constructor(private service: NoteService) { }

  ngOnInit() {

  }

}
