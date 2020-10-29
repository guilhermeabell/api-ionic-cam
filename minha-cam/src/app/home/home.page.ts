import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  async tirarfoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    var formData = new FormData();
    formData.append("image", this.photo);
    this.http.post<any>('http://127.0.0.1:5000/prediction', formData, 'multipart/form-data'); 
  }
}
