
(function() {
	// CHARACTER ID & ACCESS TOKEN
	var characterId   = "1009368";
	var accessToken   = "d566589cc20ed0dde37964dfc305aab9";

	function getCharacter() {

		fetch('https://gateway.marvel.com:443/v1/public/characters/' + characterId + '?apikey=' + accessToken)
		.then((response) => response.json())
		.then((item) => {
			// FORMATS API DATA
			let results 	  = item.data.results[0];
			let description   = results.description;
			let thumbnailPath = results.thumbnail.path;
			let thumbnailExt  = results.thumbnail.extension;
			let thumbnailImg  = '<img src="' + thumbnailPath + '.' + thumbnailExt + '">';
			// RENDERS DATA TO DOM
			document.querySelector('.featured-hero-img').innerHTML = thumbnailImg;
			document.querySelector('.description').innerHTML = description;

		})
	}

	function getComicList() {

		fetch('https://gateway.marvel.com:443/v1/public/characters/' + characterId + '/comics?limit=20&apikey=' + accessToken)
		.then((response) => response.json())
		.then((item) => {
			// FORMATS API DATA
			let output = '';
			let result = item.data.results;
			// RUN THROUGH ARRAY TO CREATE IMG LIST
	        result.forEach(function(item) {
	          output += `
	              <li><img src="${item.thumbnail.path}.jpg" /></li>
	          `;
	        });
	        // RENDERS LIST TO DOM
	        document.querySelector('.comics-list').innerHTML = output;
	        comicSlider();
		})
	}

	//INITIALIZE SLICK 
	function comicSlider() {
		
		if($(window).width() > 599) {
			$('.comics-list').slick({
			  infinite: true,
			  slidesToShow: 5,
			  slidesToScroll: 1,
			  centerMode: true,
	          arrows: false,
	          focusOnSelect: true,
	          initialSlide: 15,
			  responsive: [
			    {
			      breakpoint: 599,
			      settings: {
			        slidesToShow: 1,
			      }
			    }
			  ]
			});
		} else {
			$('.comics-list').slick({
			  infinite: true,
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  centerMode: true,
	          arrows: false,
	          focusOnSelect: true,
	          mobileFirst: true,
	          initialSlide: 15,
			});
		}
	}

	getCharacter();
	getComicList(comicSlider);

})();
