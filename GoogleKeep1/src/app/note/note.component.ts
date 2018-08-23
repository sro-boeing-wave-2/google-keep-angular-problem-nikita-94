import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../Note';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditComponent } from '../edit/edit.component'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  public Notes: Note[];
  NoteEditForm = this.fb.group({
    NoteId: [''],
    Title: [''],
    Text: [''],
    IsPinned: [''],
    CheckList: this.fb.array([]),
    Label: this.fb.array([])
  });
  NoteToDisplay: Note;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteservice: NoteService,
    private location: Location,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.noteservice.getNotes().subscribe(notes => {
      this.Notes = notes.json();
      console.log(this.Notes);
    })
  }
  delete(id: number) {
    this.noteservice.deleteNote(id).subscribe();
    this.noteservice.getNotes().subscribe(notes => { this.Notes = notes.json() })
  }
  openEdit(Id: string): void {
    let dialog = this.dialog.open(EditComponent, { data: Id });
    dialog.afterClosed().subscribe(()=> this.getNotes() )
  }
}
