import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  photo: SafeResourceUrl;
  
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
    ) {}

  async tirarfoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data; charset=utf-8');
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
    var formData = new FormData();
    formData.append("image", this.photo);
    return this.http.post<any>('http://127.0.0.1:5000/prediction', formData); 
  }
}