// pages/list/list.js
const fetch=require('../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops:[],
    categroise:{},
    pageIndex:0,
    pageSize:20,
    hasMore:true,
    flag:true
  },
//数据刷新
upMore() {
  this.setData({flag:false})
  if (!this.data.hasMore) return
  let {pageIndex,pageSize}=this.data;
  const params={_pages:++pageIndex,_limit:pageSize}
  return fetch(`categories/${this.data.categroise.id}/shops`,params)
  .then(res=>{
    const shops=this.data.shops.concat(res.data)
    const total = parseInt(res.header['x-total-count']) 
    const hasMore=pageIndex*pageSize<total
    const flag=!this.data.flag;
    this.setData({shops,pageIndex,hasMore,flag});
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`categories/${options.cat}`).then(res=>{
      this.setData({categroise:res.data});
      wx.setNavigationBarTitle({
        title:res.data.name
      });
      this.upMore()
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
    this.setData({shops:[],pageIndex:0,hasMore:true});
    this.upMore().then(()=>wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.flag) {
      this.upMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})