const calc=require('calc.js')

Page({
  data:{
    num:'0',
    op:''
  },
  lastNum:0,
  isNewNum:false,
  clear(){
    this.isNewNum = true
    this.lastNum = 0
    this.setData({
      num:'0',
      op:''
    })
  },
  numbtn(e){
    let val = e.currentTarget.dataset.val
    let num =this.data.num
    if(num=='0'||this.isNewNum){
      num = val
      this.isNewNum = false
    }else{
      num += val
    }
    this.setData({
      num
    })
  },
  delete(){
    let num = this.data.num
    num = num.substr(0,num.length-1)
    num=num==''?0:num
    this.setData({
      num
    })
  },
  dotbtn(){
    let num = this.data.num
    if(num.indexOf('.')>-1){
      return 
    }
    if(num=='0'){
      num='0.'
    }else{
      num+='.'
    }
    this.setData({
      num
    })
  },
  opbtn(e){
    let val = e.currentTarget.dataset.val
    let op = this.data.op
    let currNum = Number(this.data.num)
    this.setData({
      op:val
    })
    this.isNewNum = true
    if(this.lastNum==0){
      this.lastNum=currNum
      return 
    }
    
    if(op=='+'){
      this.lastNum=calc.add(this.lastNum,currNum)
    }else if(op=='-'){
      this.lastNum=calc.sub(this.lastNum,currNum)
    }else if(op=='*'){
      this.lastNum=calc.mul(this.lastNum,currNum)
    }else if(op=='/'){
      this.lastNum=calc.div(this.lastNum,currNum)
    }else if(op=='%'){
      this.lastNum%=currNum
    }else if(op=='='){
      this.lastNum=currNum
    }else if(op=='平方'){
      this.lastNum=calc.square(this.lastNum)
    }else if(op=='开方'){
      this.lastNum=calc.sqrt(this.lastNum)
    }else if(op=='sin'){
      this.lastNum=calc.sin(this.lastNum)
    }else if(op=='cos'){
      this.lastNum=calc.cos(this.lastNum)
    }
    this.setData({
      num:this.lastNum
    })
  }
})