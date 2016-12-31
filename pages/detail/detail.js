var formate = require('../../utils/formate');
var getYear = formate.getYear;
var computePopularity = formate.computePopularity;
var app = getApp();


Page({
	data: {
		user: {},
		repo: [],
		prs: []
	},

	onShareAppMessage: function() {
		return {
			title: '自定义分享标题',
			desc: '自定义分享描述',
			path: '/page/user?id=123'
		}
	},

	collectPr: function(prs) {
		prs = prs.reduce(function(p, c) {
			if(!p[c.repository_url]) {
				p[c.repository_url] = {
					popularity: 1
				};
			}else {
				p[c.repository_url].popularity += 1; 
			}
			return p;
		}, {});

		return Object.keys(prs).map(function(v) {
			return {
				name: v.replace('https://api.github.com/repos/', ''),
				popularity: prs[v].popularity
			}
		});

	},

	onLoad: function() {
		var detail = wx.getStorageSync(app.storageName) || {};
		var repo = detail.repo.filter(function(r) {
			return !r.fork
		});

		var prs = this.collectPr(detail.pr.items);

		detail.user.year = getYear(detail.user.created_at);

		repo.sort(function(p, c) {
			return (computePopularity(p) > computePopularity(c))
		}).reverse();

		prs.sort(function(p, c) {
			return p.popularity > c.popularity;
		}).reverse();

		this.setData({
			user: detail.user,
			repo: repo.slice(0, 5),
			prs: prs.slice(0, 5)
		})
	}
})