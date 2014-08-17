(function(){

	var frag = document.createDocumentFragment('frag'),
		canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		can2 = document.createElement('canvas'),
		can2ctx = can2.getContext('2d'),
		img = new Image();



	function handleFileSelect(evt) {

		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			var reader = new FileReader(),
				results = [];

			reader.onload = (function(theFile) {

				return function(e) {

					var zip = new JSZip();
					var image = zip.folder('images');
					var content,
						theFile,
						newImage = new Image();

		//newImage.src = 'svg/img.svg';

					//ctx.drawImage(e.target.result, 0, 0);
					img.src = e.target.result;


					img.onload = function(){

						canvas.height = img.height;
						canvas.width = img.width;
						ctx.drawImage(img, 0, 0);

						newImage.src = canvas.toDataURL('image/png');
						//newImage.src = 'svg/img.svg';

						/*
						var x = document.createElement('p');
						x.textContent = escape(dataURL);
						document.getElementById('container').appendChild(x);*/

					};



					//img.src = e.target.result;
					newImage.onload = function(){

						document.getElementById('container').appendChild(newImage);
						var dataURL = newImage.src.replace(/^data:image\/(png|jpg);base64,/, "");
						var zip = new JSZip();

						//zip.file("Hello.txt", "Hello World\n"); //replace with css

						var img = zip.folder("images");
						img.file("image.png", dataURL, {base64: true});
						var content = zip.generate();
						document.getElementById('download').href = "data:application/zip;base64,"+content;
						//location.href="data:application/zip;base64,"+content;

					};





					//console.log(theFile);


					//onsole.log(canvas.toDataURL('image/png'));


					frag.appendChild(canvas);
					document.getElementById('container').appendChild(frag);


					/*var source = document.getElementById('theSrc');
					results.push(e.target.result);

					if ( results.length === 1 ){

						source.setAttribute('src', e.target.result);
						source.parentNode.load();

					}else{

						console.log(results.length);

					}*/
					//console.log(img);
					//canvg('canvas', e.target);



				};

			})(f);

			reader.readAsDataURL(f);
		}
	}

	document.getElementById('files').addEventListener('change', handleFileSelect, false);

})();
