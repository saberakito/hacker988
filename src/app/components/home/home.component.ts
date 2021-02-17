import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { TodoService } from 'src/app/service/todo.service';
import { IImage } from 'ng-simple-slideshow';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
// import * as M from '../../../assets/script/materialize/js/materialize.min.js';
import * as $ from 'jquery';
import * as AOS from 'aos';


declare  var testHoldon,HoldOn,validURL:  any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public user_name:string;
  public user_tel:string;
  public user_line:string;
  public dp_link:string = 'https://www.facebook.com/ejan2016/posts/1471403766353958';
  public text_return:string = ''; 
  
  public dp_id:string;
  public image_link:string;
  public all_likes:string;
  public all_comments:string;
  public image_post:string;
  public post_message:string;
  public name_page:string;
  public link_like:string;
  public data_user_like:any;
  public user_win:any;
  public user_win_id:any;
  public data_user_win:any;
  
  images = [  
    // { img: "/assets/images/bg_slide/slide.gif" },  
     //{ img: "/assets/images/bg_slide/slide1.jpg" },
  ];  
  
  slideConfig = {
    "slidesToShow": 1,  
    "dots": false,  
    "infinite": true ,
    "autoplay":true ,
    "autoplaySpeed":7000,
    mobileFirst: true,
    centerMode: true,
    arrows: false,
    centerPadding: '0.1px',
  };
  height: string = '';
  imageSize:{width:600, height: 300};
  arrowSize: string = '30px';
  showArrows: boolean = false;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 7000;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = '100% 100%';
  backgroundPosition: string = 'top center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = false;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = true;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  imageObject: Array<object> = [{
      // image: '/assets/images/bg_slide/Slide2.jpg',
      // thumbImage: '/assets/images/bg_slide/Slide2.jpg'
  }, 

  
  // {
  //     image: '/assets/images/content/slide2.jpg',
  //     thumbImage: '/assets/images/content/slide2.jpg',
  //     //title: 'Image with title' //Optional: You can use this key if you want to show title
  // },{
  //     image: '/assets/images/content/slide3.jpg',
  //     thumbImage: '/assets/images/content/slide3.jpg',
  //     //title: 'Image with title' //Optional: You can use this key if you want to show title
  // }
  ];
  prevImageClick() {
      this.slider.prev();
  }

  nextImageClick() {
      this.slider.next();
  }

  // imageUrls: (string | IImage)[] = [
  //   { url: '/assets/images/bg_slide/Slide2.jpg' },
  //   // { url: '/assets/images/bg_slide/slide3.jpg' },
  //   // { url: '/assets/images/content/slide3.jpg' }
  // ];
  imageUrls = [
    // { img: "/assets/images/bg_slide/slide1.jpg" },  
    // { img: "/assets/images/bg_slide/slide2.jpg" },
  ];
  public slideData:slideData[];
  constructor(private todoServcie:TodoService,private router:Router) { }
  @ViewChild('nav') slider: NgImageSliderComponent;
  public todoList:Todo[];

  options = {
    fullWidth: true
  };
  public username:any;
  public member_credit:any;
  public login_status_check:any;
  public trueStatus:any;
  public trueWalletId:any;
  public textQrCode:any;
  public image_name_ads:any;
  public image_type_ads:any;
  public image_name_qr:any;
  public image_type_qr:any;
  ngOnInit() {
    if(localStorage.getItem("login")=="success"){
      this.login_status_check = '1';
      this.username = JSON.parse(localStorage.getItem('data')).member_name;
      
    }
    
    this.todoServcie.getTruemoneyStatus().subscribe((response)=>{
      if(response.success==true){
        this.trueStatus = response.data['website_status'];
        if(this.trueStatus=='2'){
          this.trueWalletId = response.data['website_text'];
        }
      }else{
        console.log('failed! getTruemoneyStatus');
      }
    });
    this.todoServcie.getTextQr().subscribe((response)=>{
      if(response.success==true){
        this.textQrCode = response.data['website_text'];
      }else{
        console.log('failed! getTextQr');
      }
    });
    this.todoServcie.getAds().subscribe((response)=>{
      if(response.success==true){
        this.image_name_ads = response.data['pupn_image_filename'];
        this.image_type_ads = response.data['pupn_image_type'];
        
      }else{
        console.log('failed! getAds');
      }
    });
    this.todoServcie.getQrImage().subscribe((response)=>{
      if(response.success==true){
        this.image_name_qr = response.data['pupn_image_filename'];
        this.image_type_qr = response.data['pupn_image_type'];
        
      }else{
        console.log('failed! getQrImage');
      }
    });
    



    this.todoServcie.getCredit().subscribe((data_credit)=>{
      this.member_credit = data_credit.credit;
      this.currentCredit = data_credit.credit;
    });
    this.getBetData();
    // var elems = document.querySelectorAll('.carousel');
    // var instances = M.Carousel.init(elems,this.options);

    
    // this.todoServcie.getTodoList(0).subscribe((response)=>{
    //  // console.log(response);
    //   this.todoList = response;
    // });
    

    
    // this.todoServcie.getSlide().subscribe((response)=>{
    //     var arraySlide = [];
    //     for(var i =0; i<response.length;i++){
    //       arraySlide.push({ img: '/upload/files/'+response[i].adjust_page_image_name+'.'+response[i].adjust_page_image_type+'?v=1.2' });
    //       //arraySlide.push({ url: '/upload/files/'+response[i].adjust_page_image_name+'.'+response[i].adjust_page_image_type+'?v=1.2' });
    //     }
        
    //   this.imageUrls = arraySlide;
    // });
  }
  contentLoad(data) {
    if (data == 'deposit') {
        $("." + data).addClass('active');
        $(".withdraw").removeClass('active');
        $('.deposit_area').css('display', 'block');
        $('.withdraw_area').css('display', 'none');
    }
    if (data != 'deposit') {
      $(".withdraw").addClass('active');
      $(".deposit").removeClass('active');
      $('.deposit_area').css('display', 'none');
      $('.withdraw_area').css('display', 'block');
    }
};
 
  public $index=0;
  public $indexTr=0
  public $number:number=0;
  public $sbet_id=0;
  public $numberArr =[];
  public $indexArr=[];
  public $indexTrArr=[];
  public $number_mod=0;
  public $randbet:number;
  public $letter_bet="";
  public $letterbet="";
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  getRandomArbitrary2() {
    return Math.floor(Math.random() * 2) + 1;
  }
  public indexTd = 0;
  public indexTr = 1;
  public arrayTr:[];
  public indexTrTd = [];
  public countingBet = 0;
  beep() { 
    var snd = new Audio("/assets/sound/chime.wav");  
    //var snd = new Audio("/assets/sound/chime.wav");  
    snd.play();
  }
  delBetStat(){
    if(this.indexTr==1){
      this.indexTr = 9;
      this.indexTd--;
    }
    $($('.tr'+(this.indexTr-1)).find('td')[this.indexTd]).html('<div _ngcontent-kde-c2="" class="empty_"></div>');
    this.indexTr = this.indexTr-1;
    this.countingBet--;
  }
  reload(){
    window.location.reload();
  }

  login_fn(){
    this.router.navigate(['/login']);
  }

  logout_fn(){
    this.todoServcie.logout();
    window.location.reload();
  }
  public member_id:any;
  public counting_p:any = 0;
  public counting_t:any = 0;
  public counting_b:any = 0;

  public percent_p:any = 0;
  public percent_t:any = 0;
  public percent_b:any = 0;
  public currentCredit:any;
  betStat(data_type){
    this.todoServcie.getCredit().subscribe((data_credit)=>{
      this.member_credit = data_credit.credit;
    
    if(this.member_credit>0){
      if(JSON.parse(localStorage.getItem('data'))!=null){
        this.member_id = JSON.parse(localStorage.getItem('data')).member_id;
      }else{
        this.member_id = null;
      }
      if(this.member_id==null){
        this.router.navigate(['/login']);
        return;
      }
        this.countingBet++;
    
        if(data_type=='player'){
          $($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_player" style="background-image: url(/assets/images/icon/P.png); background-size: 30px 30px; width:30px;height:30px; margin: 4px;">&nbsp;</div>');
        // $($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_player" style="background-image: url(/assets/images/icon/P.png); background-size: 30px 30px; width:30px;height:30px; margin: 4px;">&nbsp;</div>');
          $($('.tr'+this.indexTr).find('td')[this.indexTd]).select();
          this.counting_p++;
        // this.percent_p = (this.countingBet/100)*this.counting_p;

          this.percent_p = (1/((this.countingBet/100)/this.counting_p)).toFixed(0);
          this.percent_t = (1/((this.countingBet/100)/this.counting_t)).toFixed(0);
          this.percent_b = (1/((this.countingBet/100)/this.counting_b)).toFixed(0);
          
        }else if(data_type=='tie'){
          $($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_banker" style="background-image: url(/assets/images/icon/T.png); width:30px;height:30px;   background-size: 30px 30px;  margin: 4px;">&nbsp;</div>');
          //$($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_banker" style="background-image: url(/assets/images/icon/T.png); width:30px;height:30px;   background-size: 30px 30px;  margin: 4px;">&nbsp;</div>');
          $($('.tr'+this.indexTr).find('td')[this.indexTd]).select();
          this.counting_t++;

          this.percent_p = (1/((this.countingBet/100)/this.counting_p)).toFixed(0);
          this.percent_t = (1/((this.countingBet/100)/this.counting_t)).toFixed(0);
          this.percent_b = (1/((this.countingBet/100)/this.counting_b)).toFixed(0);
        }else if(data_type=='banker'){
          $($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_tie" style="background-image: url(/assets/images/icon/B.png); width:30px;height:30px;  background-size: 30px 30px;  margin: 4px;">&nbsp;</div>');
          //$($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_tie" style="background-image: url(/assets/images/icon/B.png); width:30px;height:30px;  background-size: 30px 30px;  margin: 4px;">&nbsp;</div>');
          $($('.tr'+this.indexTr).find('td')[this.indexTd]).select();
          this.counting_b++;
          this.percent_p = (1/((this.countingBet/100)/this.counting_p)).toFixed(0);
          this.percent_t = (1/((this.countingBet/100)/this.counting_t)).toFixed(0);
          this.percent_b = (1/((this.countingBet/100)/this.counting_b)).toFixed(0);
        }
        if(this.indexTrTd[this.indexTr]==null&&this.indexTd!=1){
          this.indexTrTd[this.indexTr] = [];
          this.indexTrTd[this.indexTr]  = this.indexTd;
          this.indexTd = 0;
        }else{
          this.indexTrTd[this.indexTr]  = this.indexTd;
        }
        this.indexTr++;
        if(this.indexTr==9){
          this.indexTr = 1;
          this.indexTd ++;
        }
        if(this.indexTd==16){
          this.indexTd = 0;
        }
        
        if(this.countingBet>6){
          
          
          this.todoServcie.saveBet(this.predict_win,data_type).subscribe((response)=>{
            this.getBetData();
            if(response.data_win=='1'){
              this.todoServcie.getCredit().subscribe((data_credit)=>{
                this.currentCredit = data_credit.credit;
                $("#member_credit").html(data_credit.credit);
              });
            }
            // console.log(response);
            // this.todoList = response;
          });
        }
        if(this.countingBet>5&&this.member_credit>0){
          this.beep();
          this.resultBet();
        }
    }else{
      alert('เครดิตไม่พอ');
    }
  });
  }
  public count_win;
  public count_lose;
  public count_draw;

  public count_win_all;
  public count_lose_all;
  public count_draw_all;
  getBetData(){
    this.todoServcie.getBet().subscribe((response)=>{
      this.todoList = response.data;
    });
    this.todoServcie.getBetToday().subscribe((response)=>{
      this.count_win = response.count_win;
      this.count_lose = response.count_lose;
      this.count_draw = response.count_draw;
    });

    this.todoServcie.getBetAll().subscribe((response)=>{
      this.count_win_all = response.count_win_all;
      this.count_lose_all = response.count_lose_all;
      this.count_draw_all = response.count_draw_all;
    });
     
  }
  public predict_win = '';
  public percentWin:any;
  public type_win:any;
  resultBet(){
    var percentPredic = this.getRandomArbitrary(80,95);
    var typeWin =this.getRandomArbitrary2();
    this.percentWin = parseInt(percentPredic);
    this.type_win = typeWin;
    if( typeWin==1){
      this.predict_win = 'Player';
      //$("#resultLabel").html('<div id="letter_player" style="padding: 25px;background: #02687F;">**Player** '+parseInt(percentPredic)+'% </div>');
      $("#resultLabel").html('<span class="badge-primary" style="padding-left:20px;padding-right:20px; border-radius:5px;">เพลเยอร์</span>');
      
    }else{
      this.predict_win = 'Banker';
      //$("#resultLabel").html('<div id="letter_banker" style="padding: 25px; background: #C30;">**Banker** '+parseInt(percentPredic)+'%</div>');
      $("#resultLabel").html('<span class="badge-danger" style="padding-left:20px;padding-right:20px; border-radius:5px;">แบงเกอร์</span>');
    }


  }
  


}
interface Todo{
  bcrh_id:number;
  bcrh_date:string;
  bcrh_m:string;
  bcrh_predict:string;
  bcrh_result:string;
  bcrh_win:string;
  bcrh_create_date:string;
  bcrh_update_date:any;
}

interface slideData {
  adjust_page_id :string;
  adjust_page_type :string;
  adjust_page_title :string;
  adjust_page_description :string;
  adjust_page_short_description :string;
  adjust_page_image_name :string;
  adjust_page_image_type :string;
  adjust_page_sort :string;
  adjust_page_hide :string;
  adjust_page_delete :string;
  adjust_page_create_by :string;
  adjust_page_create_date :string;
  adjust_page_update_date :string;
}

