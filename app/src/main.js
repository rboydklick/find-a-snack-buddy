/* globals define */
define(function(require, exports, module) {

	/*****************************************
	**** Global variabls used in this app ****
	*****************************************/

	//'use strict';
	// import dependencies
	var Engine = require('famous/core/Engine');
	var Modifier = require('famous/core/Modifier');
	var Transform = require('famous/core/Transform');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Surface = require('famous/core/Surface');
	var Lightbox = require('famous/views/Lightbox');

	// "Main Context" -- A div that Famo.us adds the 'surfaces' to
	var mainContext = Engine.createContext();

	// index
	var index = 0;

	// Column surface to add photos too

	var photoColumn = new Surface({
		content: '<p>beebop</p>',
		size: [200,400],
		properties: {
			backgroundColor: '#cccccc'
		}
	});



	/***********************************
	******** Call the functions ********
	***********************************/
	imagesColumn();


	/***********************************
	**** Functions used in this app ****
	***********************************/

	// imageColumn function: takes the images and puts them in a column
	function imagesColumn() {

		// Create a surface for the background
		var background = new Surface({
			properties: {
				backgroundColor: '#000000',
				textAlign: 'center'
			}
		});

		var centerSurface = new Modifier({
			size: [200,'auto'],
    		origin: [0.5, 0.5],
    		align: [0.5, 0.5] 
		});

		// Add the background surface to the main context
		mainContext.add(background);

		// An array of all the images used in the column of peoples' photos
		var imageColumnArray = [
		'doge150x150.png',
		'famous_logo.png'
		];

		var imageColumnContent = "";
		for (var i = 0; i < imageColumnArray.length; i++) {
			imageColumnContent += '<img src="content/images/' + imageColumnArray[i] + '"/>';
			if(i!=imageColumnArray.length - 1){
				imageColumnContent += "<br/>";
			}
		}


		var photos = new Surface({
			content: imageColumnContent,
			properties: {
				backgroundColor: '#cccccc',
				textAlign: 'center',
			}
		});

		mainContext.add(centerSurface).add(photos);

	} // End Images column function


}); // End of define function

