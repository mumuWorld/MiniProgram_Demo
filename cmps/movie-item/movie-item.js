// cmps/movie-item/movie-item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        name: {
            type: String,
            value: ''
        },
        size: {
            type: Number,
            value: 0
        },
        movie: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        showDetail: function() {
            const json = JSON.stringify(this.data.movie)
            const obj = JSON.parse(json)
            wx.navigateTo({
                url: '/pages/detail/detail',
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });

        }
    }
})