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
		var repoUrl = 'https://api.github.com/users/' + this.data.name + '/repos?per_page=1000';
		var prUrl = 'https://api.github.com/search/issues?q=type:pr+is:merged+author:'
					+ this.data.name
		var me = this;

		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 20000
		});

		var tasks = [userUrl, repoUrl, prUrl].map(function(url) {
			return function() {
				return fetch(url)
			}
		});

		parallel(tasks, function(user, repo, pr) {
			wx.hideToast();
			wx.setStorageSync(app.storageName, {
				user: user,
				repo: repo,
				pr: pr
			});
			wx.navigateTo({
				url: '../detail/detail'
			})
		})
	}
})