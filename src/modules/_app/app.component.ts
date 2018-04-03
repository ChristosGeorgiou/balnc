import { Component, OnInit } from '@angular/core'
import { ProdNotifComponent } from '@blnc/core/common/components/prod-notif/prod-notif.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  constructor(
    private modal: NgbModal,
    private router: Router,
  ) { }

  async ngOnInit() {
    const productionWarnign = localStorage.getItem("productionWarnign")
    if (!productionWarnign) {
      console.log("productionWarnign")
      const result = await this.modal.open(ProdNotifComponent, {
        backdrop: "static"
      }).result
      if (result === "OK") {
        localStorage.setItem("productionWarnign", "OK")
      }
    }
  }
}
