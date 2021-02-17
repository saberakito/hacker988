import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
interface registerData{
  success:boolean,
  message:string,
  data:string,
  register_text_detail:string,
  type:string
}
interface myData{
  success:boolean,
  message:string
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  loggedInStatus = true;
  public member_id:any;
  public member_name:any;
  constructor(private http:Http, private http2: HttpClient) { 
    if(JSON.parse(localStorage.getItem('data'))!=null){
      this.member_id = JSON.parse(localStorage.getItem('data')).member_id;
      this.member_name = JSON.parse(localStorage.getItem('data')).member_name;
     }
  }

  setLoggedIn(value: boolean){
    localStorage.setItem("login", 'success');
    this.loggedInStatus = value;
  }
  get isLoggedIn(){
    return this.loggedInStatus
  }


private local = window.location.origin;
//private local = "http://localhost:80";
  saveBet(predict,result){
   
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"saveBet",m_id:this.member_id,predict:predict,result:result}).pipe(map((res)=>res.json()));
  }

  getBet(){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getBet",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getCredit(){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getCredit",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getTruemoneyStatus(){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getTruemoneyStatus",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getTextQr(){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getTextQr",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getAds(){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getAds",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getQrImage(){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getQrImage",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getTrueWalletId(){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getTrueWalletId",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getQrTrueImage(){
   
    return this.http2.post<contactData>(this.local+'/api/dataAdjustBacara.php',{ac:"getQrTrueImage",type:'6'});
  }

  cashTrueWallet(phone_number,cash_number){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"cashTrueWallet",m_id:this.member_id,phone_number:phone_number,cash_number:cash_number}).pipe(map((res)=>res.json()));
  }
  updateCredit(data_credit){
    if(JSON.parse(localStorage.getItem('data'))!=null){
      var member_id = JSON.parse(localStorage.getItem('data')).member_id;
     }
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"updateCredit",m_id:this.member_id,data_credit:data_credit}).pipe(map((res)=>res.json()));
  }


  getBetToday(){
    if(JSON.parse(localStorage.getItem('data'))!=null){
      var member_id = JSON.parse(localStorage.getItem('data')).member_id;
     }
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getBetToday",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getBetAll(){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getBetAll",m_id:this.member_id}).pipe(map((res)=>res.json()));
  }

  getSetting(type){
    return this.http.post(this.local+'/api/dataAdjustBacara.php',{ac:"getSettingWeb",type:type}).pipe(map((res)=>res.json()));
  }

  saveMember(data:string){
    return this.http2.post<contactData>(this.local+'/api/dataAdjustBacara.php',{ac:"saveMember",data:data});
  }

  ValidateUser(username:string,password:string){
    return this.http2.post<myData>(this.local+'/api/dataAdjustBacara.php',{ac:'login',username:username,password:password});
    //return {success:true};
  }
 

  logout(){
    localStorage.clear()
  }








  getTodoList(data){
    if(data==1){
      return this.http.get(this.local+"/api/getNews.php?type=1&ac=all").pipe(map((res)=>res.json()));
    }else{
      return this.http.get(this.local+"/api/getNews.php?type=1").pipe(map((res)=>res.json()));
    }
  }
  getDetailNews(id){
    return this.http.get(this.local+"/api/dataAdjust.php?ac=getDetailNew&id="+id).pipe(map((res)=>res.json()));
  }

  getTextRegister(){
    //return this.http.get("http://conner888.com/api/dataAdjust.php?ac=getRegisterText").pipe(map((res)=>res.json()));
    return this.http.get(this.local+"/api/dataAdjust.php?ac=getRegisterText").pipe(map((res)=>res.json()));
  }

  getTextContext(){
    //return this.http.get("http://conner888.com/api/dataAdjust.php?ac=getContactText").pipe(map((res)=>res.json()));
    return this.http.get(this.local+"/api/dataAdjust.php?ac=getContactText").pipe(map((res)=>res.json()));
  }

  getTextPromotion(){
    return this.http.post(this.local+"/api/dataAdjust.php",{ac:"getPromotion",type:2}).pipe(map((res)=>res.json()));
  }

  getTextHowtoplay(){
    return this.http.get(this.local+"/api/dataAdjust.php?ac=getHowtoplayText").pipe(map((res)=>res.json()));
  }
 
  getMenu(){
    // return this.http.post<adjustpageData>(this.host_config+'/api/dataAdjust.php',{ac:"saveAdjustPage",data:data});
    return this.http.post(this.local+'/api/dataAdjust.php',{ac:"getMenu",type:'1'}).pipe(map((res)=>res.json()));;
  }
  getDataPage(data){
      return this.http.post(this.local+"/api/dataAdjust.php",{ac:"getDataPage",data:data}).pipe(map((res)=>res.json()));
  }

  getSlide(){
    // return this.http.post<adjustpageData>(this.host_config+'/api/dataAdjust.php',{ac:"saveAdjustPage",data:data});
    return this.http.post(this.local+'/api/dataAdjust.php',{ac:"getSlide",type:'1'}).pipe(map((res)=>res.json()));;
  }
  
  getPopup(){
    // return this.http.post<adjustpageData>(this.host_config+'/api/dataAdjust.php',{ac:"saveAdjustPage",data:data});
    return this.http.post(this.local+'/api/dataAdjust.php',{ac:"getPopup"}).pipe(map((res)=>res.json()));;
  }

  // getSetting(){
  //   return this.http.post(this.local+'/api/dataAdjust.php',{ac:"getSetting"}).pipe(map((res)=>res.json()));
  // }
 
 
  

  
 





  saveLink(data,link){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"save_link",data:data,link:link});
  }
  getDataLink(link){
    return this.http2.get<contactData>('http://localhost:3000/getContent/'+encodeURIComponent(link),{});
  }
  getDataLike(link,data_id){
    return this.http2.post<contactData>('http://localhost:3000/getLike/'+encodeURIComponent(link),{data_id:data_id});
  }
  getDataLike_from_mysql(data_id){
    return this.http2.post(this.local+'/api_nubshare/dataAdjust.php',{ac:"get_user_like",data_id:data_id});
  }
  saveDataLike(data_id,data_array_user_like){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"save_like",data_id:data_id,data_array_user_like:data_array_user_like});
  }
  saveUserWin(data_id,user_id,user_name){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"save_user_win",data_id:data_id,user_id:user_id,user_name:user_name});
  }
  getUserWin(data_id){
    return this.http2.post<contactData>(this.local+'/api_nubshare/dataAdjust.php',{ac:"get_user_win",data_id:data_id});
  }
}
interface contactData{
  success:boolean,
  post_message:string,
  dp_id:string,
  data_id:string,
  image_link:string,
  all_likes:string,
  image_post:string,
  all_comments:string,
  dp_name_page:string,
  dp_link_like:string,
  data_user_like:string,
  message:string,
  data:string,
  contact_text_detail:string,
  type:string,
  status_link:boolean
}


