(function(){

	var frag = document.createDocumentFragment('frag'),
			imageCont = document.getElementById('images');


		var count = 0;

		var items = [];


			function listItems(number) {
				var img,
						cv,
						ctx,
						link;

				if (items.length === number) {
					for (var i = 0, l = items.length; i < l; i++) {
						img = document.createElement('img');
						cv = document.createElement('canvas');
						ctx = cv.getContext('2d');

						link = document.createElement('a');
						link.setAttribute('download', 'image.png');

						img.src = items[i];

						cv.height = img.height;
						cv.width = img.width;

						ctx.drawImage(img, 0, 0);

						img.src = cv.toDataURL('image/png');
						link.href = cv.toDataURL('image/png');
						link.appendChild(img);

						imageCont.appendChild(link);

					}
				}
			}

	function handleFileSelect(evt) {

		var files = evt.target.files,
				f;

				count = files.length;

		for (var i = 0; i < files.length; i++) {

			f = files[i];

			var reader = new FileReader();

			reader.addEventListener('load', function(theFile) {

				var svgSource = theFile.target.result;

				items.push(svgSource);

			listItems(count);
			}, false);

			reader.readAsDataURL(f);
		}

	}

	document.getElementById('files').addEventListener('change', handleFileSelect, false);

})();
