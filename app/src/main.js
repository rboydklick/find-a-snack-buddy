/* globals define */
define(function(require, exports, module) {
	//'use strict';
	// import dependencies
	var Engine = require('famous/core/Engine');
	var Modifier = require('famous/core/Modifier');
	var Transform = require('famous/core/Transform');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Surface = require('famous/core/Surface');
	var Lightbox = require('famous/views/Lightbox');

	var mainContext = Engine.createContext();

	// An array with peoples' photos in it
	var peoplesPhotos = [];
	// index
	var index = 0;

	// Run functions
	imagesColumn();

	// Functions
	function imagesColumn() {
		var imagesColumnContent = [
		'<img src="content/images/famous_logo.png" />',
		'<img src="content/images/doge150x150.png" />'
		];



		var background = new Surface({
			properties: {
				backgroundColor: '#000000'
			}
		});


		mainContext.add(background);

		for (var i = 0; i < imagesColumnContent.length; i++) {
			var slide = new Surface({
				content: imagesColumnContent[i],
				properties: {
					color: 'white',
					lineHeight: '200%',
					textAlign: 'center',
					fontSize: '36px',
				}
			});

			peoplesPhotos.push(slide);

		} // End For loop

		mainContext.add(slide);

	} // End Images column function

});
