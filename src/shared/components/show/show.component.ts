import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  dataKeys: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dataKeys = Object.keys(data)
    console.log(data);

  }

  ngOnInit(): void {  }
}
