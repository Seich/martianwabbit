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
			el.style.display = 'block';
			el.style.opacity = 1;
		});	
	};

	var getPhotoUrl = function(photo) {
		return 	{
			src: 	'https://farm' + photo.farm + 
					'.staticflickr.com/' + photo.server + '/' +
					photo.id + '_' + photo.secret + '_z.jpg',
			page: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id
		};
	};

	window.jsonFlickrApi = function(photos) {
		var div = document.querySelectorAll('.photos')[0];
		photos = photos.photos.photo.map(getPhotoUrl);

		appendTo(div, photos, '.photos.show, .photo-title');
	};
	
	var getShotUrl = function(shot) {
		revision = shot.revisions[Object.keys(shot.revisions)[0]];

		return { 
			src: revision.images.thumb_240.url,  
			page: shot.url
		};
	};

	window.loadShots = function(shots) {
		if (shots.http_code !== 200) { return };

		var div = document.querySelectorAll('.shots')[0];
		shots = shots.wips.map(getShotUrl);
		shots = shots.splice(0, 3);
		
		appendTo(div, shots, '.shots.show, .shot-title')
	};
}(window));