import { Component, NgZone, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { mergeMap } from 'rxjs/operators'
import { Contact } from '../_shared/models/contacts'
import { ContactsService } from '../_shared/services/contacts.service'
import { OrdersService } from '../_shared/services/orders.service'
import { StateService } from '../_shared/services/state.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  host: { 'class': 'page' }
})
export class OrderComponent implements OnInit {

  order$: any
  contact$: any

  menu = {
    selected: 'overview',
    items: [{
      id: 'overview',
      label: 'Overview'
    }, {
      id: 'raw',
      label: 'Raw',
      right: true
    }]
  }

  contact: Contact

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private contactsService: ContactsService,
    private ordersService: OrdersService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.order$ = this.route
      .params
      .pipe(
        mergeMap(async params => {
          const order = await this.ordersService.get(params['id'])
          if (order) {
            this.contact = await this.contactsService.get(order.data.customer)
            return order
          }
        })
      )
  }

}
