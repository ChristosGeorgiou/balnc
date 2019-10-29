import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import { Order } from '../models/order'

@Injectable()
export class OrdersService extends CommonService<Order> {

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.type = 'order'
  }
}
