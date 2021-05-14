Page({
  data:{
    condition:false
  },
  switch (e) {
    console.log(e)
    this.setData({
      condition:e.detail.value
    })
  },
  formReset(){
    this.setData({
      fei:300,
      banfei:150
    })
  },
  formSubmit(e){
    let fei,banfei
    let bd = Number(e.detail.value.property)
    fei = 300
    if(bd>200000){
      fei+=(bd-200000)*0.005
    }
    fei = fei.toFixed(2)
    banfei = (fei/2).toFixed(2)
    this.setData({
      fei,banfei
    })
  }
})