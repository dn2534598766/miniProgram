Page({

  /**
   * 页面的初始数据
   */
  data: {
    blockColor: "#000000",
    colorGamut:"-webkit-linear-gradient(left, #ffffff 0%, #ff0000 100%)",
    colorGray:"-webkit-linear-gradient(left, #000000 0%, #ffffff 100%)",
    colorGamutTip:"#ff0000",
    colorGrayTip:"#ffffff",
    colorValue:0,
    colorGamutValue:0,
    colorGrayValue:0,
    key:'color',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.key&&options.key!=''){
      this.setData({
        ...options
      })
    }
  },
  onUnload(){
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];   //前一个页面
    let feedback = {}
    feedback[this.data.key]=this.data.blockColor
    prevPage.setData({
      ...feedback
    })

  },
  changeCorlor(e) {
    var value = e.detail.value
    var colors = []
    if (value >= 0 && value < 17) {
      colors = this.gradientColors("#ff0000", "#ffff00", 17, 2.2)
      value = value
    } else if (value >= 17 && value < 33) {
      colors = this.gradientColors("#ffff00", "#00ff00", 17, 2.2)
      value = value - 17
    } else if (value >= 33 && value < 50) {
      colors = this.gradientColors("#00ff00", "#00ffff", 17, 2.2)
      value = value - 33
    } else if (value >= 50 && value < 67) {
      colors = this.gradientColors("#00ffff", "#0000ff", 17, 2.2)
      value = value - 50
    } else if (value >= 67 && value < 83) {
      colors = this.gradientColors("#0000ff", "#ff00ff", 17, 2.2)
      value = value - 67
    } else {
      colors = this.gradientColors("#ff00ff", "#ff0000", 17, 2.2)
      value = value - 83
    }
    if (value >= colors.length) {
      value = value - 1
    }
    this.setData({
      colorValue:value,
      colorGamutTip: colors[value],
      colorGamut: "-webkit-linear-gradient(left, #ffffff 0%," + colors[value] + " 100%)"
    })

    var colorGamuts=[]
    colorGamuts = this.gradientColors("#ffffff", this.data.colorGamutTip, 100, 2.2)
    this.setData({
      colorGrayTip: colorGamuts[this.data.colorGamutValue],
      colorGray: "-webkit-linear-gradient(left, #000000 0%," + colorGamuts[this.data.colorGamutValue] + " 100%)"
    })


    var colorGrays=[]
    colorGrays = this.gradientColors("#000000",this.data.colorGrayTip,100,2.2)
    this.setData({
      blockColor:colorGrays[this.data.colorGrayValue]
    })
  },
  changeCorlorGamut(e){
    var value = e.detail.value
    var colorGamuts = []
    colorGamuts = this.gradientColors("#ffffff", this.data.colorGamutTip, 100, 2.2)
    if (value >= colorGamuts.length) {
      value = value - 1
    }
    this.setData({
      colorGamutValue:value,
      colorGrayTip: colorGamuts[value],
      colorGray: "-webkit-linear-gradient(left, #000000 0%," + colorGamuts[value] + " 100%)"
    })

    var colorGrays = []
    colorGrays = this.gradientColors("#000000", this.data.colorGrayTip, 100, 2.2)
    this.setData({
      blockColor: colorGrays[this.data.colorGrayValue]
    })
  },
  changeCorlorGray(e){
    var value = e.detail.value
    var colorGrays = []
    colorGrays = this.gradientColors("#000000", this.data.colorGrayTip, 100, 2.2)
    if (value >= colorGrays.length) {
      value = value - 1
    }
    this.setData({
      colorGrayValue:value,
      blockColor: colorGrays[value],
    })
  },
  
  parseColor: function (hexStr) {
    return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) {
      return 0x11 * parseInt(s, 16);
    }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
      return parseInt(s, 16);
    })
  },

  // zero-pad 1 digit to 2
  pad: function (s) {
    return (s.length === 1) ? '0' + s : s;
  },

  gradientColors: function (start, end, steps, gamma) {
    var i, j, ms, me, output = [],
      so = [];
    gamma = gamma || 1;
    var normalize = function (channel) {
      return Math.pow(channel / 255, gamma);
    };
    start = this.parseColor(start).map(normalize);
    end = this.parseColor(end).map(normalize);
    for (i = 0; i < steps; i++) {
      ms = i / (steps - 1);
      me = 1 - ms;
      for (j = 0; j < 3; j++) {
        so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
      }
      output.push('#' + so.join(''));
    }
    return output;
  }
})
