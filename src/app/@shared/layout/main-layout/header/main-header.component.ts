import { Component, OnInit, Input } from '@angular/core';
import { UserInfo } from '@shared/entities/user-info';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.less']
})
export class MainHeaderComponent implements OnInit {
    private _userInfo: UserInfo;

    @Input() set userInfo(userInfo: UserInfo) {
        this._userInfo = userInfo;
        this.userImage = (userInfo && userInfo.imageUrl) ? userInfo.imageUrl : this.defaultImage;
    }

    get userInfo(): UserInfo {
        return this._userInfo;
    }

    userImage: string;
    private readonly defaultImage = '/assets/app/img/default-user-image.png';

    constructor() { }

    ngOnInit() {
    }
}
