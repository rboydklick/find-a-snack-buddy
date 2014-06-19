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
	var ContainerSurface    = require("famous/surfaces/ContainerSurface");
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
		content: '',
		size: [200,400],
		properties: {
			backgroundColor: '#cccccc'
		}
	});


	var photoColumnHeight = 0;


	/***********************************
	******** Call the functions ********
	***********************************/
	rotatingBackground();
	addSlotMachine();


	/***********************************
	**** Functions used in this app ****
	***********************************/

	// imageColumn function: takes the images and puts them in a column

	function rotatingBackground() {		

		// Create a surface for the background
		var backgroundWidth = $(window).width()*1.5;
		var background = new Surface({

			size: [backgroundWidth, backgroundWidth],
			properties: {
				background: 'url(content/images/retro_burst_vector.svg) no-repeat center center',
				backgroundSize: 'cover',
				textAlign: 'center'
			}
		});


		var initialTime = Date.now();
		var rotate = new Modifier({
			origin: [0.5, 0.5],
		    transform : function() {
		      return Transform.rotateZ(.0001 * (Date.now() - initialTime));
		    } 
		});


		// Add the background surface to the main context
		mainContext.add(rotate).add(background);

	}


	function addSlotMachine() {

		var positionSlotMachine = new StateModifier({
			align: [0.5, 0.5],
			origin: [0.5, 0.5]
		});

		var positionSlotMachineHandle = new StateModifier({
			align: [0.5, 0.5],
			origin: [0.5, 0.5],
			transform: Transform.translate(205, 40, 0)
		});

		// Create suface for slot machine graphic
		var slotMachine = new Surface({
			content: '<img src="content/images/slotMachine.png" alt="Slot Machine" />',
			size: [412, 387],
		});

		mainContext.add(positionSlotMachine).add(slotMachine);
		slotMachine.addClass('slotMachine');

		// Create suface for slot machine's handle
		var slotMachineHandle = new Surface({
			content: '<img src="content/images/slotMachineHandle.png" alt="Slot Machine Handle" />',
			size: [49, 209],
		});

		mainContext.add(positionSlotMachineHandle).add(slotMachineHandle);
		slotMachineHandle.addClass('slotMachineHandle');
		slotMachineHandle.on('click',imagesColumn);

	}


	function imagesColumn() {

		// An array of all the images used in the column of peoples' photos
		var imageColumnArray = [
		'4355_2257.jpg',
		'4541_2523.jpg',
		'4603_2645.jpg',
		'5042_2603.jpg',
		'5049_2505.jpg',
		'5077_2633.jpg'
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
			size: [200, ''],
			properties: {
				backgroundColor: '#ffffff',
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
		  Transform.translate(0, 200, 0),
		  { duration : 1000, curve: Easing.inOutBack }
		);

		photos.addClass('photos');

		// Add 'photos' surface to mainContext, add modifier that center aligns the 'photos' surface
		mainContext.add(stateModifier).add(photos);


	} // End Images column function

}); // End of define function

		