import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadfileserService } from 'src/app/core/services/uploadfileser.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent {
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;
  images: any;
  multipleImages: any;
  selectedFile: any;
  url: any
  selectedFileBLOB: any;

  constructor(
    private http: HttpClient,
    private uploadser: UploadfileserService,
    private sanitizer: DomSanitizer

  ) { }




  selectImage(event: any) {
    this.selectedFile = event.target.files[0];
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log('File you selected is ', file);
      const reader = new FileReader()
      reader.onloadend = () => {
        var base64string = reader.result;
        this.url = base64string ;
        let blob = new Blob(event.target.files, { type: event.target.files[0].type });
        let blobur1 = window.URL.createObjectURL(blob);
        this.selectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(blobur1);
        console.log(blobur1)

      }
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }


  onUpload() {
    //post request to express backend
    this.uploadser.fileUpload(this.selectedFile).subscribe((res: any) => {
      console.log(res)
      if (res) {
        const reader = new FileReader()
        const binaryString = reader.readAsDataURL(res);
        console.log(binaryString)
        reader.onloadend = () => {
          const base64string = reader.result;
          console.log(base64string)
        }
      } else {
        console.log('getting some problem')
      }
    })
  }
}
