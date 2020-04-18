// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [{
                icon: 'ic_cat_movie.png',
                title: '观影分析',
                count: 0,
                has: '看过',
                mark: '标记10部影片\n开启观影分析'
            },
            {
                icon: 'ic_cat_book.png',
                title: '读书分析',
                count: 0,
                has: '读过',
                mark: '标记10本书\n开启观影分析'
            },
            {
                icon: 'ic_cat_music.png',
                title: '音乐分析',
                count: 0,
                has: '听过',
                mark: '标记10部音乐\n开启观影分析'
            },
        ]
    },

    begin: function(evt) {
        console.log('开启', evt)
        var index = evt.currentTarget.dataset.index
        console.log('开启', evt.currentTarget.id, 'index-', index)
    },

    login: function(events) {
        console.log('登录')
        wx.navigateTo({
          url: '/pages/login/login',
          complete: (res) => {},
          events: events,
          fail: (res) => {},
          success: (result) => {},
        })
    }


})