/**
 * 并行处理异步操作
 */
export default function parallel(tasks, callback) {
	var len = tasks.length;
	var results = [];
	tasks.forEach(function(task) {
		// 去fetch每一个url
		task().then(function(res) {
			if(res.ok) {
				return res.json();
			}
		}).then(function(json) {
			len--;
			results.push(json);
			if(len === 0) {
				callback.apply(null, results);
			}
		})
	})
}