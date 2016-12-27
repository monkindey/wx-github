var app = getApp();

Page({
	data: {
		detail: {}
	},

	onLoad: function() {
		this.setData({
			detail: wx.getStorageSync(app.storageName) || {}
		})
	}
})