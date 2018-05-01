import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '@blnc/core/profile/data/profile';
import { ProfileService } from '@blnc/core/profile/services/profile.service';
import { ConfigService } from '@blnc/core/common/services/config.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: "./status-bar.component.html",
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  profileName: string
  user: string
  appVersion: string

  constructor(
    private configService: ConfigService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    const profile = this.profileService.getCurrent()
    this.profileName = (profile.name)
    this.user = (profile.database) ? profile.database.user : ""
    this.appVersion = this.configService.version
  }

}