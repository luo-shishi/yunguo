// pages/detail/detail.js
const db=wx.cloud.database({
  env:'new-luoshishi-pe6zm'
})
const db1=db.collection('goods')
const db2=db.collection('carts')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fluid:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var id=options.id
       this.lodeFluidData(id)
  },
  async lodeFluidData(id){
   let res=await db1.doc(id).get()
   this.setData({
     fluid:res.data
   })
   console.log('调用fluid成功',res)
  },
  previewimg(){
      wx.previewImage({
        urls: [this.data.fluid.img],
      })
  },
  async addCarts(e){
    const {item} =e.currentTarget.dataset
    try {
      let res = await db2.doc(item._id).get()
      await db2.doc(item._id).update({
        data: {
          num: db.command.inc(1)
        }
      })

    } catch{
      //没有值 把该商品添加到购物车里面去
      await db2.add({
        data: {
          _id: item._id,
          img: item.img,
          price: item.price,
          title: item.title,
          singlePrice: item.singlePrice,
          num: 1,
          selected: true
        }
      })
    }
    await wx.showToast({
      title: '下单成功',
      success: function (res) { }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})