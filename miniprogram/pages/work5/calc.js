function add(arg1,arg2){
  let t1=0
  if(arg1.toString().indexOf('.')>-1){
    t1=arg1.toString().split('.')[1].length
  }
  let t2=0
  if(arg2.toString().indexOf('.')>-1){
    t2=arg2.toString().split('.')[1].length
  }
  let m=Math.max(t1,t2)
  return (mul(arg1,Math.pow(10,m))+mul(arg2,Math.pow(10,m)))/Math.pow(10,m)
}
function sub(arg1,arg2){
  let t1=0
  if(arg1.toString().indexOf('.')>-1){
    t1=arg1.toString().split('.')[1].length
  }
  let t2=0
  if(arg2.toString().indexOf('.')>-1){
    t2=arg2.toString().split('.')[1].length
  }
  let m=Math.max(t1,t2)
  return (mul(arg1,Math.pow(10,m))-mul(arg2,Math.pow(10,m)))/Math.pow(10,m)
}
function mul(arg1,arg2){
  let t1=0
  if(arg1.toString().indexOf('.')>-1){
    t1=arg1.toString().split('.')[1].length
  }
  let t2=0
  if(arg2.toString().indexOf('.')>-1){
    t2=arg2.toString().split('.')[1].length
  }
  let k1=Number(arg1.toString().replace('.',''))
  let k2=Number(arg2.toString().replace('.',''))
  return k1*k2/Math.pow(10,t1+t2)
}
function div(arg1,arg2){
  let t1=0
  if(arg1.toString().indexOf('.')>-1){
    t1=arg1.toString().split('.')[1].length
  }
  let t2=0
  if(arg2.toString().indexOf('.')>-1){
    t2=arg2.toString().split('.')[1].length
  }
  let k1=Number(arg1.toString().replace('.',''))
  let k2=Number(arg2.toString().replace('.',''))
  return k1*k2*Math.pow(10,t1-t2)
}

function square(arg1){
  let arg2=arg1
  let t1=0
  
  if(arg1.toString().indexOf('.')>-1){
    t1=arg1.toString().split('.')[1].length
  }
  let t2=0
  if(arg2.toString().indexOf('.')>-1){
    t2=arg2.toString().split('.')[1].length
  }
  let k1=Number(arg1.toString().replace('.',''))
  let k2=Number(arg2.toString().replace('.',''))
  return k1*k2/Math.pow(10,t1+t2)
}
function sqrt(arg1){
  return Math.sqrt(arg1)
}
function sin(arg1){
  return Math.sin(arg1)
}
function cos(arg1){
  return Math.cos(arg1)
}
module.exports={
  add,sub,mul,div,square,sqrt,sin,cos
}