;(function(window) {
	var flickr = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=06477985bb250a134a164fd754d5cbef&user_id=10431905%40N06&per_page=5&format=json&nojsoncallback=1';

	var getPhotoUrl = function(photo) {
		return 	{
			src: 	'https://farm' + photo.farm + 
					'.staticflickr.com/' + photo.server + '/' +
					photo.id + '_' + photo.secret + '_z.jpg',
			page: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id
		};
	};

	var loadPhotos = function(photos) {
		var div = document.getElementsByClassName('photos')[0];

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
	
	document.addEventListener('DOMContentLoaded', function() {
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
				var photos = JSON.parse(httpRequest.responseText).photos.photo.map(getPhotoUrl);
				loadPhotos(photos);
			}
		};

		httpRequest.open('GET', flickr);
		httpRequest.send();

	});
}(window));