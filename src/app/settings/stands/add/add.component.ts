import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError, Observable, of, tap } from 'rxjs';
import { BackendService } from '../../../backend.service';
import { Stand } from '../../../models/stand';
 


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
  
})


export class AddComponent {

  loading=false;
  
  standForm = this.formBuilder.group<Stand>(<Stand>{
    identification: '', 
    columns: null, 
    rows: null, 
    type: null
  });
  
  constructor( 
    private formBuilder: FormBuilder,
    private backend: BackendService,
  ) {
     

  }


   makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async onSubmit(): Promise<void> {
    
 
  

    this.loading = true;
    
    this.backend.addStand(this.standForm.value as Stand).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => {
        this.loading = false;
      }
    })
  
    this.standForm.reset();

    return ;
  }

  

 

  total(){
    const columns = this.standForm.value.columns;
    const rows = this.standForm.value.rows;
    return (columns?columns:0) * (rows?rows:0); 
  }

  generate():void{  
    let value = this.makeid(5);
    const type = this.standForm.value.type?this.standForm.value.type.toUpperCase():''; 
    this.standForm.patchValue({identification:type+"-"+value})  
  }

  qrCode():string{
    return this.standForm.value.identification;
  }

}
