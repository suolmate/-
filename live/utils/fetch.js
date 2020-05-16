module.exports=(url,data)=>{
  return new Promise((resolve,reject) => {
    wx.request({
      url: `https://locally.uieee.com/${url}`,
      success:resolve,
      data:data,
      fail:reject
    })
  })
}