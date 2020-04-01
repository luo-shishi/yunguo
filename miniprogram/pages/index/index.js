//index.js
const app = getApp()
const db = wx.cloud.database({
  env: 'new-luoshishi-pe6zm'
})
const db1=db.collection('goods')
const db2=db.collection('carts')

Page({
 data:{
   imgUrl: [
     "../../images/swiper/swiper1.png",
     "../../images/swiper/swiper2.png",
     "../../images/swiper/swiper3.png"
     ],
   list:[],
   _page:0,
   hasMore:true
 },
  onLoad: function (options) {
    this.setTabBar()
    this.lodeListData()
  },
  //加载数据
  async lodeListData(){
    const limit=5
    let {_page,list}=this.data
  //加载提示框
   await wx.showLoading({
      title: 'Loading...',
      success: function(res){

      }
    })
    //加载数据
    let res=await db1.limit(limit).skip(_page*limit).get()
    //隐藏提示框
    await wx.hideLoading()
    //手动停止下拉刷新
    wx.stopPullDownRefresh()
    this.setData({
      list:[...list,...res.data],
      _page:++_page,
      hasMore:res.data.length===limit
    })
  },
  async onReachBottom() {
    if(!this.data.hasMore){
      await wx.showToast({
        title:'没有更多数据了',
        icon: 'none',
        success: function(res){

        }
      })
      return console.log('没有更多数据')
    }
    console.log('上拉刷新')
    this.lodeListData()
  },
  onPullDownRefresh(){
    console.log('下拉刷新')
    //1. 重置
    this.setData({
      list: [],
      _page: 0,
      hasMore: true
    })
    //2. 加载最新的数据
    this.lodeListData()
  },
  async addCarts(e){
    let {item} = e.currentTarget.dataset
    try{
      let res = await db2.doc(item._id).get()
      await db2.doc(item._id).update({
        data: {
          num: db.command.inc(1)
        }
      })  

    }catch{
      //没有值 把该商品添加到购物车里面去
      await db2.add({
        data: {
          _id: item._id,
          img: item.img,
          price: item.price,
          title: item.title,
          singlePrice:item.singlePrice,
          num: 1,
          selected: true
        }
      })
    }
    this.setTabBar()
    await wx.showToast({
      title: '下单成功',
      success:function(res){}
    })
  },
  async setTabBar(){
    let total=0
    let res=await db2.get()
    res.data.forEach(v =>{
      total +=v.num
    })
    if(total===0){ return }
    wx.setTabBarBadge({
      index: 1,
      text: total+''
    })
  }
 
})
