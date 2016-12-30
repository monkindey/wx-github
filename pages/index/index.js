var parallel = require('../../utils/parallel').default;
var app = getApp();

Page({
	data: {
		name: '',
		detail: {}
	},

	bindInputName: function(e) {
		this.setData({
			name: e.detail.value
		})
	},

	bindSearch: function() {
		var userUrl = 'https://api.github.com/users/' + this.data.name;
		var repoUrl = 'https://api.github.com/users/' + this.data.name + '/repos?per_page=100';
		var me = this;

		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 20000
		});

		var tasks = [userUrl, repoUrl].map(function(url) {
			return function() {
				return fetch(url)
			}
		});

		parallel(tasks, function(user, repo) {
			wx.hideToast();
			wx.setStorageSync(app.storageName, {
				user: user,
				repo: repo
			});
			wx.navigateTo({
				url: '../detail/detail'
			})
		})
	}
})