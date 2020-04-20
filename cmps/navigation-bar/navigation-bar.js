// cmps/navigation-bar/navigation-bar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: ''
        },
        titleColor: {
            type: String,
            value: '#fff'
        },
        navBarColor: {
            type: String,
            value: '#fff'
        },
        statuBarColor: {
            type: String,
            value: '#fff'
        },
        back: {
            type: String,
            value: 'true'
        },
        home: {
            type: String,
            value: 'true'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        statusBarStyle: '',
        navBarStyle: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        back: function() {
            this.triggerEvent('backTap', { name: 'mj' });
            wx.navigateBack();
        },
        home: function() {
            this.triggerEvent('homeTap', { age: 18 });
            wx.navigateBack({
                delta: 999
            });
        }
    },
    lifetimes: {
        attached: function() {

            const statusBarStyle = `height: ${wx.db.statusBarHeight}px; background-color: ${this.data.statuBarColor}`
            const navBarStyle = `height: ${wx.db.navBarHeight}px; background-color: ${this.data.navBarColor}; color: ${this.data.titleColor}`
            console.log('status-', statusBarStyle, ', navba-', navBarStyle)
            this.setData({
                statusBarStyle: statusBarStyle,
                navBarStyle: navBarStyle
            })
        }
    }
})