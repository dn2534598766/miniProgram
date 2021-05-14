Page({
  data:{
    isincome:true,
    incomelist:[],
    paylist:[],
    isinput:false,
    incometotal:0,
    paytotal:0,
    input:'',
    date:'',
    obj:{},
    obj2:{},
    incomelist2:[],
    paylist2:[],
  },
  click(e){
    console.log(e)
    if(e.currentTarget.dataset.name=='income'){
      this.setData({
        isincome:true
      })
    }else{
      this.setData({
        isincome:false
      })
    }
  },
  add(){
    this.setData({
      isinput:!this.data.isinput
    })
  },
  input(e){
    if(e.detail.value.trim()!=''){
      let isincome=this.data.isincome
      console.log(isincome)
      let val = Number(e.detail.value)
      let dateString=this.data.date
      let obj=this.data.obj
      let obj2=this.data.obj2
      let dateString2=this.data.date
      let dateString3=dateString2.toString().split('').splice(0,7).join('')
      console.log(dateString3)
      

      if(isincome){
        

        if(obj2.hasOwnProperty(dateString3)){
          console.log('有这个键')
          obj2[dateString3][0]+=val
        }else{
  
          obj2[dateString3]=[val,0]
        }
        
        console.log(obj2)
        let incomelist=this.data.incomelist
        let incomelist2=this.data.incomelist2
          incomelist.push(dateString+' '+val)
          incomelist2.push(val)
          let incometotal=incomelist2.reduce((sum,v)=>{
            return sum+=v
          })
        this.setData({
          incomelist:incomelist,
          incomelist2:incomelist2,
          incometotal,
          input:'',
          obj,
          obj2,
        })
      }else{
        // if(obj.hasOwnProperty(dateString)){
        //   console.log('有这个键')
        //   obj[dateString]-=val
        // }else{
  
        //   obj[dateString]-=val
        // }
        if(obj2.hasOwnProperty(dateString3)){
          console.log('有这个键')
          obj2[dateString3][1]+=val
        }else{
  
          obj2[dateString3]=[0,val]
        }

       
        let paylist=this.data.paylist
        let paylist2=this.data.paylist2

        paylist.push(dateString+' '+val)
        paylist2.push(val)
        let paytotal=paylist2.reduce((sum,v)=>{
          return sum+=v
        })
        this.setData({
              paylist:paylist,
              paylist2:paylist2,
              paytotal,
              input:'',
              obj,
              obj2
         })
      }
      

      // console.log(obj)
      // console.log(dateString)
      // if(this.data.isincome){
      //   let incomelist=this.data.incomelist
      //   incomelist.push(val)
      //   let incometotal=incomelist.reduce((sum,v)=>{
      //     return sum+=v
      //   })
      //   this.setData({
      //     incomelist:incomelist,
      //     incometotal,
      //     input:'',
      //     obj
      //   })
      // }else{
      //   let paylist=this.data.paylist
      //   paylist.push(val)
      //   let paytotal=paylist.reduce((sum,v)=>{
      //     return sum+=v
      //   })
      //   this.setData({
      //     paylist:paylist,
      //     paytotal,
      //     input:'',
      //     obj
      //   })
      // }
    }
  },
  onHide(){
    let store=[this.data.incomelist,this.data.paylist,this.data.incometotal,this.data.paytotal,this.data.obj2,this.data.date]
    wx.setStorage({
      data: store,
      key: 'money',
    })
  },
  onShow(){
    wx.getStorage({
      key: 'money',
    }).then(res=>{
      this.setData({
        incomelist:res.data[0],
        paylist:res.data[1],
        incometotal:res.data[2],
        paytotal:res.data[3],
        obj2:res.data[4],
        date:res.data[5]
      })
    }).catch(res=>{
      console.log(res)
    })
  },
  onUnload(){
    this.onHide()
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }
})