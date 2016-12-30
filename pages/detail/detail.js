var formate = require('../../utils/formate');
var getYear = formate.getYear;
var computePopularity = formate.computePopularity;
var app = getApp();


Page({
	data: {
		user: {},
		repo: []
	},

	onShareAppMessage: function() {
		return {
			title: '自定义分享标题',
			desc: '自定义分享描述',
			path: '/page/user?id=123'
		}
	},

	onLoad: function() {
		var detail = wx.getStorageSync(app.storageName) || {};
		var repo = detail.repo.filter(function(r) {
			return !r.fork
		});

		console.log(detail.pr);

		detail.user.year = getYear(detail.user.created_at);

		repo.sort(function(p, c) {
			return (computePopularity(p) > computePopularity(c))
		}).reverse();

		this.setData({
			user: detail.user,
			repo: repo.slice(0, 5)
		})
	}
})