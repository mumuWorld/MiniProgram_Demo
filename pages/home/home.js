// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 所有数据
        allMovies: [{
                title: '影院热映',
                movies: [],
                url: '/v2/movie/in_theaters'
            },
            {
                title: '豆瓣新片榜',
                movies: [],
                url: '/v2/movie/new_movies'
            },
            {
                title: '口碑榜',
                movies: [],
                url: '/v2/movie/weekly'
            },
            {
                title: '北美票房榜',
                movies: [],
                url: '/v2/movie/us_box'
            },
            {
                title: 'Top250',
                movies: [],
                url: 'v2/movie/top250'
            },
        ]
    },
    // 获取城市逆地理
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

    // 更新电影星级数据
    updateMovie: function(movie) {
        let stars = parseInt(movie.rating.stars)
        if (stars == 0) { return }
        let onStar = parseInt(stars / 10)
        let halfStar = parseInt(stars % 10) > 0
        let offStar = parseInt((50 - stars) / 10)
        movie.stars = {}
        movie.stars.onStar = onStar
        movie.stars.halfStar = halfStar
        movie.stars.offStar = offStar
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('加载完毕')
        wx.db.toast('正在获取当前上映电影')
        this.loadLocalCache()
            //获取经纬度
            // this.getCityStr((city) => {
            //     console.log('city=', city)
            //         // this.getNewMovies(city)
            //     this.requestMovies(0, { city: city })
            // })
            // this.requestMovies(1);
            // this.requestMovies(2);
            // this.requestMovies(3);
            // this.requestMovies(4);
    },
    // 请求电影数据
    requestMovies: function(index, params) {
        let obj = this.data.allMovies[index]
        let new_movies = wx.db.url(obj.url)
        let reqTask = wx.request({
            url: new_movies,
            data: params,
            header: { 'content-type': 'json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log('res->', result)
                    // 电影信息
                const movies = result.data.subjects
                for (let index = 0; index < movies.length; index++) {
                    // js神奇语法
                    let movie = movies[index].subject || movies[index];
                    this.updateMovie(movie)
                    obj.movies.push(movie)
                }
                this.setData(this.data)
                wx.setStorage({
                    key: obj.url,
                    data: obj.movies,
                    success: (result) => {
                        console.log(`${obj.title}缓存成功,`, result)
                    },
                    fail: () => {},
                    complete: () => {}
                });
            },
            fail: () => {
                wx.db.onShow(`获取 ${ obj.title } 失败`)
                console.log(`获取 ${ obj.title } 失败`)
            },
            complete: () => {
                console.log(`获取 ${ obj.title } 完成`)
            }
        });
    },

    loadLocalCache: function() {
        for (let index = 0; index < this.data.allMovies.length; index++) {
            const obj = this.data.allMovies[index]
            wx.getStorage({
                key: obj.url,
                success: (result) => {
                    console.log(result)
                    console.log(`获取 ${ obj.title } 缓存成功`)
                    obj.movies = result.data
                    this.setData(this.data)
                },
                fail: () => {
                    if (index == 0) {
                        this.getCityStr((city) => {
                            console.log('city=', city)
                            this.requestMovies(index, { city: city })
                        })
                    } else {
                        this.requestMovies(index)
                    }
                },
                complete: () => {}
            });
        }
        this.setData(this.data)
    },

    clickMore: function(evt) {
        console.log('evt-', evt)
        const dataset = evt.currentTarget.dataset
        const url = `/pages/list/list?url=${dataset.url}&title=${dataset.title}`
        wx.navigateTo({
            url: url,
            success: (result) => {},
            fail: () => {},
            complete: () => {}
        });

    }
})