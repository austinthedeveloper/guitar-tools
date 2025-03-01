import { Component, Input } from '@angular/core';
import { UserProfile } from '@guitar/interfaces';

@Component({
  selector: 'lib-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.scss',
})
export class ProfilePictureComponent {
  @Input() user!: UserProfile;
  @Input() size: number = 50;
}
