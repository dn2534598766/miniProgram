Page({
  data:{
    b:50,
    banfei:25
  },
  formReset(){
    this.setData({
      b:50,
      banfei:25
    })
  },
  formSubmit(e){
    let b,banfei
    let a = Number(e.detail.value.property)
    // if(bd<=10000){
    //   fei = 50
    // }else if(bd<=100000&&bd>10000){
    //   fei = 50 + (bd-10000)*0.025
    // }else if(bd<=200000&&bd>100000){
    //   fei = 50 + 90000*0.025 + (bd-100000)*0.02 
    // }else if(bd<=500000&&bd>200000){
    //   fei = 50 + 90000*0.025 + 100000*0.02 + (bd-200000)*0.015
    // }else if(bd<=1000000&&bd>500000){
    //   fei = 50 + 90000*0.025 + 100000*0.02 + 300000*0.015+(bd-500000)*0.01
    // }else if(bd<=2000000&&bd>1000000){
    //   fei = 50 + 90000*0.025 + 100000*0.02 + 300000*0.015+500000*0.01+(bd-1000000)*0.009
    // }
    if(a<=10000){
      b=50;
    }else if(a<=100000&&a>10000){
      b=0.025*a-200
    }else if(a<=200000&&a>100000){
      b=0.02*a+300
    }else if(a<=500000&&a>200000){
      b=0.015*a+1300
    }else if(a<=1000000&&a>500000){
      b=0.01*a+3800
    }else if(a<=2000000&&a>1000000){
      b=0.009*a+4800
    }else if(a<=5000000&&a>2000000){
      b=0.008*a+6800
    }else if(a<=10000000&&a>5000000){
      b=0.007*a+11800
    }else if(a<=20000000&&a>10000000){
      b=0.006*a+21800
    }else if(a>20000000){
      b=0.005*a+41800
    }
    banfei = (b/2).toFixed(2)
    b = b.toFixed(2)
    this.setData({
      b,banfei
    })
  }
})