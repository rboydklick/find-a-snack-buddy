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

	var theSelectedFew = [];
	var peoplesPhotos = [];

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
	var windowWidth = $(window).width();
	var backgroundWidth = windowWidth*2.5;

	// An array of all the images used in the column of peoples' photos
	var imageColumnArray = [
		'4355_2257.jpg',
		'4541_2523.jpg',
		'4603_2645.jpg',
		'5042_2603.jpg',
		'5049_2505.jpg',
		'5077_2633.jpg',
		'4355_2257.jpg',
		'4541_2523.jpg',
		'4603_2645.jpg',
		'5042_2603.jpg',
		'5049_2505.jpg',
		'5077_2633.jpg'
	];



	/***********************************
	******** Call the functions ********
	***********************************/
	rotatingBackground();
	addHeading();
	getGenomePics();
	addSlotMachine();


	/***********************************
	**** Functions used in this app ****
	***********************************/

	// imageColumn function: takes the images and puts them in a column

	function rotatingBackground() {		

		// Create a surface for the background
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

	function addHeading() {
		var titleWidth = windowWidth*0.5;
		var titleHeight = titleWidth*0.1398;
		var heading = new Surface({

			size: [titleWidth, titleHeight],
			properties: {
				background: 'url(content/images/title.png) no-repeat center center',
				backgroundSize: 'cover',
				textAlign: 'center'
			}
		});

		var headingModifier = new Modifier({
			origin: [0.5, 0.1]
		});

		mainContext.add(headingModifier).add(heading);
	}

	function getGenomePics() {
		$.ajax(
		'http://genome.klick.com/api/User?ForAutocompleter=true&Enabled=true&IsNotAPerson=false&format=JSON',
		{
			xhrFields: {
				withCredentials: true 
			},
			success : function(data){

				parseGenomeData(data);
			},
			error : function(){
				console.log('error loading JSON data');
			}
		}
	);
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

		// Take contents of that array, put it into a variable as HTML content that has <br> tags in between <img> tags
		var imageColumnContent = "";
		for (var i = 0; i < peoplesPhotos.length; i++) {
			imageColumnContent += '<img src="http://genome.klick.com/' + peoplesPhotos[i] + '"/>';
			if(i!=peoplesPhotos.length - 1){
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
		var photoStripModifier = new StateModifier({
			align: [0.5, -5.70],
			origin: [0.5, -5.70]
		});

		// Modifier to center the column of photos
		var centerPhotoContainer = new StateModifier({
			align: [0.5, 0.5],
			origin: [0.5, 0.5]
		});


		// Create transform to animate the column
		photoStripModifier.setTransform(
		  Transform.translate(0, 1820, 0),
		  { duration : 2000, curve: Easing.outSine }
		);

		photos.addClass('photos');

		var photosContainer = new ContainerSurface({
			size:[300, 300],
			properties: {
				backgroundColor: '#ffffff',
				overflow: 'hidden'
			}
		});

		// Add 'photos' surface to mainContext, add modifier that center aligns the 'photos' surface
		photosContainer.add(photoStripModifier).add(photos);

		mainContext.add(centerPhotoContainer).add(photosContainer);


	} // End Images column function

	function parseGenomeData(genomeData) {

		// Get number of entries in Json object

		var totalGenomeEntries = genomeLength(genomeData.Entries);

		//

	

		for (i=0;i<9;i++){
			var randomEntry = getRandomArbitrary(0,totalGenomeEntries);

			// Puts name into an array
			theSelectedFew.push(genomeData.Entries[0].Name);
			
			$.ajax(
				'http://genome.klick.com:80/api/User/{UserID}?UserID='+genomeData.Entries[randomEntry].UserID+'&format=JSON',
				{
					xhrFields: {
						withCredentials: true 
					},
					success : function(data){
						peoplesPhotos.push(data.Entries[0].PhotoPath);

					},
					error : function(){
						console.log('error loading JSON data');
					}
				}
			);

			//exclude people:
				// yourself?
				// people who are away? (Might need another web service for this)
				// US employees?
				// people who are on mat leave?
		}
	}

	// Get number of entries (i.e., people) in Genome
	function genomeLength(obj){
	  var i=0;
	  for (var x in obj){
	    if(obj.hasOwnProperty(x)){
	      i++;
	    }
	  } 
	  return i;
	}

	// Generate a random number within a range
	function getRandomArbitrary(min, max) {
	    return Math.floor(Math.random() * (max - min) + min);
	}

	/*function addPeoplesPhotos() {
		for (i=0;i<peoplesPhotos.length;i++) {

		}
	}*/



}); // End of define function

		