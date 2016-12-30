var getYear = require('../../utils/formate').getYear;
var app = getApp();


Page({
	data: {
		user: {},
		repo: []
	},

	onLoad: function() {
		var detail = wx.getStorageSync(app.storageName) || {};
		var repo = detail.repo.filter(function(r) {
			return !r.fork
		});

		detail.user.year = getYear(detail.user.created_at);

		repo.sort(function(p, c) {
			return (p.stargazers_count * 2 + parseInt(p.forks_count)) > (c.stargazers_count * 2 + parseInt(c.forks_count))
		}).reverse();

		this.setData({
			user: detail.user,
			repo: repo.slice(0, 5)
		})
	}
})