import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-truewallet',
  templateUrl: './truewallet.component.html',
  styleUrls: ['./truewallet.component.css']
})
export class TruewalletComponent implements OnInit {

  constructor(private todoServcie:TodoService,private router:Router) { }
  truewallet_cash:any;
  true_id:any;
  image_name:any;
  image_type:any;
  ngOnInit() {
    this.todoServcie.getTrueWalletId().subscribe((response)=>{
      if(response.success==true){
        this.true_id = response.data.website_text;
      }
    });
    this.todoServcie.getQrTrueImage().subscribe((response)=>{
      if(response.success==true){
        if(response.data!=null){
          this.image_name = response.data['pupn_image_filename'];
          this.image_type = response.data['pupn_image_type'];
        }
      }
    });
  }
  onSubmit(form: NgForm): void {
    if(form.value.truewallet_cash!=null&&form.value.truewallet_cash!=""){
      if(confirm("ยืนยันการเติมเครดิท?")){
        this.todoServcie.cashTrueWallet(this.true_id,form.value.truewallet_cash).subscribe((response)=>{
            if(response.success==true){
              if(response.data.totalAmount!=null){
                this.todoServcie.updateCredit(response.data.totalAmount).subscribe((response)=>{
                  if(response.success==true){
                    alert('เติม credit เรียบร้อยแล้ว');
                    this.router.navigate(['/home']);
                  }else{
                    alert('error! ');
                  }
                })
              }else{
                alert('รหัสบัตรเงินสดไม่ถูกต้อง');
              }
            }
        });
      }
    }else{
      alert('กรุณากรอกหมายเลขบัตรเงินสด');
    }
  }
}
