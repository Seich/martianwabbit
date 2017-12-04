;(function(window) {
	var appendTo = function(div, items, show) {
		items.forEach(function(item) {
			var a = document.createElement('a');
			a.href = item.page;

			var img = document.createElement('img');
			img.src = item.src;

			a.appendChild(img);

			div.appendChild(a);
		});

		var show = Array.prototype.slice.call(document.querySelectorAll(show));

		show.forEach(function(el) {
			el.style.display = 'flex';
			el.style.display = '-webkit-flex';
			el.style.opacity = 1;
		});	
	};
	
	var getShotUrl = function(shot) {
		return { 
			src: shot.covers['230'],  
			page: shot.url
		};
	};

	window.loadShots = function(shots) {
		if (shots.http_code !== 200) { return };

		var div = document.querySelectorAll('.shots')[0];
		shots = shots.projects.map(getShotUrl);
		shots = shots.splice(0, 3);
		
		appendTo(div, shots, '.shots.show, .shot-title')
	};
}(window));
