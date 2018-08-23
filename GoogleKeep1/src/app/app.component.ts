import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from './Note';
import { label } from './Label';
import { checklist } from './Checklist';
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { NoteService } from './note.service';
import { Router } from '@angular/router';
import { EditComponent } from './edit/edit.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  note: Note;
  id: number;
  constructor(public dialog: MatDialog) { }


  openDialog(): void {
    this.dialog.open(DialogOverviewExampleDialog, { width: '450px', data: { id: this.id } });
  }


}

@Component({
  selector: 'dialogoverview',
  templateUrl: 'dialogoverview.html',
})
export class DialogOverviewExampleDialog {
  CreateNoteDF: FormGroup;
  note: Note;
  Notes: Note[];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteservice: NoteService, private fb: FormBuilder, private router: Router) {
    this.CreateNoteDF = fb.group({

      title: [''],
      text: [''],
      IsPinned: [''],
      Label: this.fb.array([
        this.fb.group({
          labelName: ['']
        })
      ]),
      CheckList: this.fb.array([
        this.fb.group({
          ChecklistItemName: ['']
        })
      ])
    });
  }
  get Label() {
    return this.CreateNoteDF.get('Label') as FormArray;
  }
  addLabel() {
    this.Label.push(this.fb.group({
      labelName: ['']
    }));
  }

  addCheckList() {
    this.CheckList.push(this.fb.group({ ChecklistItemName: [''] }));
  }
  get CheckList() {
    return this.CreateNoteDF.get('CheckList') as FormArray;
  }
  onSubmit(): void {
    this.GenerateNote();
    this.router.navigate(['']);
  }
  GenerateNote(): void {
    console.log(this.CreateNoteDF.value);
    this.noteservice.postNotes(this.CreateNoteDF.value as Note).subscribe();
    this.noteservice.getNotes().subscribe(notes => { this.Notes = notes.json() })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addmore(): void {
    document.getElementById("Note_Label").innerHTML += `<label>Label</label>
   <input type="text" class="form-control" formControlName="Label">`;
  }
  ngOnInit() {
  }
}
