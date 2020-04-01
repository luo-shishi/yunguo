// pages/detail/detail.js
const db=wx.cloud.database({
  env:'new-luoshishi-pe6zm'
}).collection('goods')
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
   let res=await db.doc(id).get()
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