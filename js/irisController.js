var IrisApp=angular.module('IrisApp',[]);

IrisApp.controller('irisController',irisController);
function irisController($scope, $http, $sce){

	//constants
	const DEFAULT_EVENT_LOGO = "img/events/logo-def.svg";

	//init
	$scope.sponsors;
	$scope.flagshipEvents;
	$scope.culturalEvents;
	$scope.managmentEvents;
	$scope.sports;

	var getSponsors=function(){
		//console.log("a");
		$http.get("php/getSponsors.php")
   			.then(function (response) {
   				$scope.sponsors = response.data;
   			});
	}

	/*
	Event Type: 1-> Flagship
				2-> Managment
				3-> Cultural
	*/
	var getFlagshipEvents=function(){
		$http.get("php/getFlagshipEvents.php")
   			.then(function (response) {
   				$scope.flagshipEvents = response.data;
   				transformToHTML($scope.flagshipEvents);
   			});
	}

	var getCulturalEvents=function(){
		$http.get("php/getCulturalEvents.php")
   			.then(function (response) {
   				$scope.culturalEvents = response.data;
   				transformToHTML($scope.culturalEvents);
   			});
	}

	var getManagmentEvents=function(){
		$http.get("php/getManagmentEvents.php")
   			.then(function (response) {
   				console.log(response);
   				$scope.managmentEvents = response.data;
   				transformToHTML($scope.managmentEvents);
   			});
	}

	var getSports=function(){
		$http.get("php/getSports.php")
   			.then(function (response) {
   				$scope.sports = response.data;
   				transformToHTML($scope.sports);
   			});
	}	

	var transformToHTML=function(array){
		for(var i=0;i<array.length;i++){
			array[i].about=$sce.trustAsHtml(array[i].about);
   			array[i].format=$sce.trustAsHtml(array[i].format);
   			array[i].rules=$sce.trustAsHtml(array[i].rules);
   		}
	}

	var init=function(){
		getSponsors();
		getFlagshipEvents();
		getCulturalEvents();
		getManagmentEvents();
		getSports();
	}

	init();

	$scope.viewEventDetails=function(object){
		//console.log(name);
		$scope.eventDetails=object;
		$('#eventDetails').delay(400).fadeIn(500).addClass("animated fadeIn");
		$('#eventDetails').delay(400).fadeIn(500).removeClass("animated fadeIn");
	}

	$scope.register=function(name){
		console.log('register '+name);
	}

	$scope.close=function(name){
		//console.log("a");
		$('#'+name).delay(400).fadeOut(500).addClass("animated zoomOut");
		$('#'+name).delay(400).fadeOut(500).removeClass("animated zoomOut");
	}
}