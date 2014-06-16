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
	var StateModifier = require('famous/modifiers/StateModifier');
	var Easing = require('famous/transitions/Easing');

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

		// Add the background surface to the main context
		mainContext.add(background);

		// An array of all the images used in the column of peoples' photos
		var imageColumnArray = [
		'doge150x150.png',
		'famous_logo.png'
		];

		// Take contents of that array, put it into a variable as HTML content that has <br> tags in between <img> tags
		var imageColumnContent = "";
		for (var i = 0; i < imageColumnArray.length; i++) {
			imageColumnContent += '<img src="content/images/' + imageColumnArray[i] + '"/>';
			if(i!=imageColumnArray.length - 1){
				imageColumnContent += "<br/>";
			}
		}

		// Create new surface, add HTML content from imageColumnContent into the surface
		var photos = new Surface({
			content: imageColumnContent,
			size: [200, imageColumnArray.length*200],
			properties: {
				backgroundColor: '#cccccc',
				textAlign: 'center',
			}
		});

		// Modifier to center the column of photos
		var stateModifier = new StateModifier({
			align: [0.5, 0],
			origin: [0.5, 0.5]
		});

		// Create transform to animate the column
		stateModifier.setTransform(
		  Transform.translate(0, 500, 0),
		  { duration : 1000, curve: Easing.inOutBack }
		);

		// Add 'photos' surface to mainContext, add modifier that center aligns the 'photos' surface
		mainContext.add(stateModifier).add(photos);

	} // End Images column function


}); // End of define function

