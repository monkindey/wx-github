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
		var prefixUrl = 'https://api.github.com/users/';
		var me = this;
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 10000
		});

		fetch(prefixUrl + this.data.name).then(function(res) {
			if(res.ok) {
				return res.json();
			}
		}).then(function(res) {
			wx.hideToast();
			wx.setStorageSync(app.storageName, res);
			wx.navigateTo({
				url: '../detail/detail'
			})
		})
	}
})