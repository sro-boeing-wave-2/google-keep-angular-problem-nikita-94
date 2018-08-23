import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NoteService } from '../note.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { Note } from '../note';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  TempNote: Note;
  input: Note;
  note: Note;
  constructor(
    private noteservice: NoteService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { };
  EditForm = this.fb.group({
    id: [''],
    title: [''],
    text: [''],
    IsPinned: [''],
    checklist: this.fb.array([
      this.fb.group({
        ChecklistItemName: [''],
        // IsChecked: ['']
      })
    ]),
    labels: this.fb.array([
      this.fb.group({
        LabelName: ['']
      })
    ])
  });
  onNoClick(): void {
    this.dialogRef.close();
  }
  get labels() {
    return this.EditForm.get('labels') as FormArray;
  }
  addLabel() {
    this.labels.push(this.fb.group({
      LabelName: ['']
    }));
  }
  get checklist() {
    return this.EditForm.get('checklist') as FormArray;
  }
  addCheckList() {
    this.checklist.push(this.fb.group({
      ChecklistItemName: [''],
      // IsChecked: ['']
    }));
  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit() {
    this.noteservice.getNote(this.data).subscribe(notes => {
      this.note = notes.json();
      console.log(this.note);
    });
  }
  getNote(): void {
    this.noteservice.getNote(this.data).subscribe(notes => {
      this.note = notes.json();
    });
  }
  saveDetails(Id: string) {
    this.input = this.EditForm.value as Note;
    console.log(this.input);
    this.noteservice.putNotes(this.EditForm.value, Id).subscribe(()=> this.dialogRef.close());
  }
}
