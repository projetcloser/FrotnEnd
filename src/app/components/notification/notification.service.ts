import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // private successSound = new Howl({
  //   src: ['/assets/sounds/success.mp3']
  // });

  // private errorSound = new Howl({
  //   src: ['/assets/sounds/error.mp3']
  // });

  // constructor(private toastr: ToastrService) {}

  // success(message: string): void {
  //   this.successSound.play();
  //   this.toastr.success(message);
  // }

  // error(message: string): void {
  //   this.errorSound.play();
  //   this.toastr.error(message);
  // }
}
