import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'

@Component({
  selector: 'app-core-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menu: any
  profile: any

  data = {
    customers: [{ name: 'customers', value: 55403 }]
  }

  constructor(
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.profile = this.configService.profile
  }
}