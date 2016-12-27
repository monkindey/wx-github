var getYear = require('../../utils/formate').getYear;
var app = getApp();


Page({
	data: {
		detail: {}
	},

	onLoad: function() {
		var detail = wx.getStorageSync(app.storageName) || {};
		detail.year = getYear(detail.created_at);
		console.log(detail.year);
		this.setData({
			detail: detail
		})
	}
})