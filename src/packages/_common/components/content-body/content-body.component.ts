import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'common-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.scss']
})
export class ContentBodyComponent implements OnInit {

  @Input() fullWidth = false
  // @HostBinding('class.container') container = true;

  constructor (private cdRef: ChangeDetectorRef) { }

  ngOnInit () {
    // this.container = !this.fullWidth;
  }

}
