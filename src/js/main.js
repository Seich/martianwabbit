;(function(window) {
	var flickr = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=06477985bb250a134a164fd754d5cbef&user_id=10431905%40N06&per_page=5&format=json&nojsoncallback=1';
	var behance = 'http://www.behance.net/v2/users/seich/wips?client_id=30sND6cPqPURn4aatiwWHfsG3TypOYXp&sort=published_date&page=1&time=all';

	var getPhotoUrl = function(photo) {
		return 	{
			src: 	'https://farm' + photo.farm + 
					'.staticflickr.com/' + photo.server + '/' +
					photo.id + '_' + photo.secret + '_z.jpg',
			page: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id
		};
	};

	window.jsonFlickrApi = function(photos) {
		var div = document.getElementsByClassName('photos')[0];
		photos = photos.photos.photo.map(getPhotoUrl);

		photos.forEach(function(photo) {
			var a = document.createElement('a');
			a.href = photo.page;

			var img = document.createElement('img');
			img.src = photo.src;

			a.appendChild(img);

			div.appendChild(a);
		});

		var show = Array.prototype.slice.call(document.getElementsByClassName('show'));

		show.forEach(function(el) {
			el.style.display = 'block';
			el.style.opacity = 1;
		});
	};

	var get = function(url, cb) {
		var httpRequest;

		if (window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try	{
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}

		if (!httpRequest) { return; }

		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState === 4 && httpRequest.status === 200) {
				cb(httpRequest.responseText);
			}
		};

		httpRequest.open('GET', url);
		httpRequest.send();
	};
	

	window.loadShots = function() {
		console.log(arguments);
	};
}(window));