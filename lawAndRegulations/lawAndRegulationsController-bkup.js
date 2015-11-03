(function(){
	'use strict';

	angular.module('satApplication')
		.controller('lawAndRegulationsController',["$scope", "$http", "$location", 'dataservice', "$timeout", lawAndRegulationsController])
		.directive('onFinishRender', function ($timeout) {
		    return {
		        restrict: 'A',
		        link: function (scope, element, attr) {
		            if (scope.$last === true) {
		                $timeout(function () {
		                   // scope.$emit('ngRepeatFinished');
		                    scope.$eval(attr.onFinishRender);
		                });
		            }
		        }
		    }
	    });
		//lawAndRegulationsController.$inject = ['dataservice'];

		var fetchFlag = false;


		function lawAndRegulationsController($scope,$http,$location, dataservice, $timeout){

			var vm = this;

			vm.categoryInfo = null;
			vm.catData = null;
			vm.localStorageKeyName = 'cat_law_regulation';
			vm.questions = {};
			vm.ngRepeatFinished = ngRepeatFinished;
			

			/*
				Request the service for question data
			*/
			//var serviceURL = 'data/Wet-en-regelgeving.JSON';
			/*if(!fetchFlag){
				fetchFlag = true;
				activate();
			} Not working between tab navigation
			*/
			activate();

			$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
				$timeout(function(){
					ngRepeatFinished();
				});
			});

			function ngRepeatFinished(){

				//Binding prettyCheckable				
				/*angular.element('input:checkbox, input:radio').each(function(){
					angular.element(this).prettyCheckable();
				});*/
/*
				angular.element('[data-toggle="popover"]').popover({
			    	html: true
			    }); */

			}

			function activate(){
				/**
			     * Step 1
			     * Ask the fetchData function for the
			     * category data and wait for the promise
			     */
				return fetchData().then(function() {
					/**
			         * Step 4
			         * Perform an action on resolve of final promise
			        */
					setToLocalStorage();
				});				
			}

			function fetchData(){
				/**
		       * Step 2
		       * Ask the data service for the data and wait
		       * for the promise
		       */

		       return dataservice.getCategory()
		       			.then(function(data){
		       				/**
			               * Step 3
			               * set the data and resolve the promise
			               */
		            	vm.categoryInfo = data;
						vm.catData = vm.categoryInfo.category;

						vm.vQuestions = vm.catData.questions;

						//console.log(vm.vQuestions);

						angular.forEach(vm.vQuestions, function(question, key){
							
							//console.log(question);

							angular.forEach(question, function(val, key){
								//console.log(key + ' <<>> ' +val);
								
							});
						});
						
	       			});	
			
			}

			function setToLocalStorage(){
				if(window.localStorage){

					if(vm.categoryInfo){

						var category = JSON.stringify(vm.categoryInfo.category), 
							catName = vm.localStorageKeyName;

						localStorage.setItem(catName,category);
					}
				}
				else{
					alert('Sorry, There is no support for localStorage available on browser.');
				}
			}

		}
})();

		/*
		setTimeout(function() {
		    
		   jq('input:checkbox, input:radio').each(function(){
				jq(this).prettyCheckable();
			});

		}, 100)*/