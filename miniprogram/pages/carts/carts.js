// pages/carts/carts.js
const db=wx.cloud.database({
  env:'new-luoshishi-pe6zm'
})
const db2=db.collection('carts')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    totalCount: 0,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.lodeCartsData()
  },
  async lodeCartsData(){
    let res=await db2.get()
    this.setData({
      carts:res.data
    })
    this.setCart(res.data)
  },
  // 统计总价格和总数量
  setCart(carts) {

    let totalCount = 0
    let totalPrice = 0

    carts.forEach(v => {
      totalCount += v.num
      totalPrice += v.num * v.singlePrice
    })


    this.setData({
      totalCount,
      totalPrice
    })

  },
  async addCount(e){
    let id=e.currentTarget.dataset.id
    let res=await db2.doc(id).update({
      data:{
        num:db.command.inc(1)
      }
    })
    this.lodeCartsData()
    await wx.showToast({
      title: '添加成功'
    })
  },
  onTabItemTap() {
    wx.setTabBarBadge({
      index: 1,
      text: '',
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