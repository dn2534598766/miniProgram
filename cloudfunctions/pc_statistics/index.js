// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'xly-psniq'
})

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const collectionDirection = db.collection('pc_direction')
  const $ = db.command.aggregate
  const directions = await collectionDirection.get()
  console.log(directions)

  const collectionStudent = db.collection('pc_student')
  let res = await collectionStudent.aggregate()
    .unwind({
      path: "$choosen",
      includeArrayIndex: 'index'
    })
    .project({
      _id: 0
    })
    .sort({
      choosen: 1,
      index: 1,
      score: -1
    })
    .group({
      _id: '$choosen',
      students: $.push({
        index: "$index",
        name: '$name',
        score: '$score',
        sn: '$sn'
      })
    })
    .unwind({
      path: '$students',
      includeArrayIndex: 'rank'
    })
    .project({
      _id: 0,
      choosen: '$_id',
      rank: $.add(['$rank', 1]),
      index: '$students.index',
      score: '$students.score',
      name: '$students.name',
      sn: '$students.sn'
    })
    .sort({
      choosen: 1,
      index: 1,
      rank: 1
    })
    .limit(1000)
    .end()
  console.log(res)
  //全部方向选择列表690条
  let list = res.list

  let count = 0
  let ll = []
  for (let pid = 0; pid < directions.data.length; pid++) {
    ll = list.slice(0)
    for (let i = pid; i < list.length; i++) {
      //方向限额
      let num = directions.data.find(v => {
        return v.name == list[i].choosen
      }).num
      //找到第x志愿在限额内的同学，清除他的其他志愿记录
      if (list[i].index == pid && list[i].rank <= num) {
        ll = ll.filter(v => {
          return !(v.name == list[i].name && v.index != pid)
        })
      }
    }
    //重排序
    let o = {}
    ll.forEach(v => {
      o[v.choosen] = o[v.choosen] ? o[v.choosen] + 1 : 1
      v.rank = o[v.choosen]
    })
    list = ll.slice(0)
  }
  console.log(list)

  return {
    list
  }
}