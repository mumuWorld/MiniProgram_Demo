// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: [],
        emptyCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        if (options.title) {
            wx.setNavigationBarTitle({
                title: options.title,
            });
        }
        if (options.url) {
            wx.getStorage({
                key: options.url,
                success: (result) => {
                    console.log(result)
                    this.data.movies = result.data.concat(result.data).concat(result.data)
                    this.data.movies.pop()
                    this.data.movies.pop()
                    const count = (this.data.movies.length % 3)
                    this.data.emptyCount = count > 0 ? 3 - count : 0;
                    console.log('count-', this.data.emptyCount, ',,,', count)
                    this.setData(this.data)
                    console.log(`获取缓存${ options.title } 成功`)
                },
                fail: () => {},
                complete: () => {}
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})