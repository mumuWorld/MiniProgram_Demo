// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    getCityStr: function(success) {
        wx.getLocation({
            type: 'wgs84',
            altitude: false,
            success: (result) => {
                console.log('res->', result)
                var key = 'a5c9bdf39bcf75f5f13dd29d476eb02a'
                var url = 'https://restapi.amap.com/v3/geocode/regeo?output=json&key=' + key
                url += '&location=' + result.longitude + ',' + result.latitude
                console.log('url->', url)
                let reqTask = wx.request({
                    url: url,
                    data: {},
                    header: { 'content-type': 'application/json' },
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: (result) => {
                        console.log('res->', result)
                        let city = result.data.regeocode.addressComponent.province
                        city = city.substring(0, city.length - 1)
                        console.log('res->', city)
                        success && success(city)
                    },
                    fail: () => {
                        console.log('请求失败')
                    },
                    complete: () => {
                        console.log('请求完成')
                    }
                });
            },
            fail: () => {
                console.log('获取失败')
            },
            complete: () => {
                console.log('获取完程')
            }
        });


    },
    getNewMovies: function(city) {
        var baseUrl = 'https://douban.uieee.com'
        let new_movies = '/v2/movie/in_theaters'
        var reqTask = wx.request({
            url: baseUrl + new_movies,
            data: {
                city: city
            },
            header: { 'content-type': 'json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log('res->', result)
                    // common
            },
            fail: () => {
                console.log('失败')
            },
            complete: () => {
                console.log('完成')
            }
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('加载完毕')
        wx.db.toast('正在获取当前上映电影')
            //获取经纬度
        this.getCityStr((city) => {
            console.log('city=', city)
            this.getNewMovies(city)
        })

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