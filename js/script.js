(function(){

	var frag = document.createDocumentFragment('frag'),

			imageCont = document.getElementById('images');

		var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d');

		var count = 0;

	function handleFileSelect(evt) {

		var files = evt.target.files,
				f;

				count = files.length;

		for (var i = 0; i < files.length; i++) {

			f = files[i];

			var reader = new FileReader();

			reader.addEventListener('load', function(theFile) {

				var svgSource = theFile.target.result,
						img = document.createElement('img');

				img.src = svgSource;

				canvas.height = img.height;
				canvas.width = img.width;

				ctx.drawImage(img, 0, 0);

				img.src = canvas.toDataURL('image/png');
				console.log(img.src);

				frag.appendChild(img);

				if (i === count) {

					imageCont.appendChild(frag);

				}


			}, false);

			/*reader.onload = (function(theFile) {

				return function(e) {

					var zip = new JSZip();
					var image = zip.folder('images');
					var content,
						theFile,
						newImage = new Image();

					img.src = e.target.result;


					img.onload = function(){

						canvas.height = img.height;
						canvas.width = img.width;
						ctx.drawImage(img, 0, 0);

						newImage.src = canvas.toDataURL('image/png');

					};

					newImage.onload = function(){

						document.getElementById('container').appendChild(newImage);
						var dataURL = newImage.src.replace(/^data:image\/(png|jpg);base64,/, "");
						var zip = new JSZip();

						var img = zip.folder("images");
						img.file("image.png", dataURL, {base64: true});
						var content = zip.generate();
						document.getElementById('download').href = "data:application/zip;base64,"+content;

					};

					frag.appendChild(canvas);
					document.getElementById('container').appendChild(frag);

				};

			})(f);*/

			reader.readAsDataURL(f);
			console.log(images);
		}
	}

	document.getElementById('files').addEventListener('change', handleFileSelect, false);

})();
