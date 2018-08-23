import {label} from './Label';
import {checklist} from './Checklist';
export class Note{
  id: string;
  heading: string;
  pinned: boolean;
  text: string;
  label: label[];
  Checklist: checklist[];
}
