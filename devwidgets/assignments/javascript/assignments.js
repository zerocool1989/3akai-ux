/*
 * Licensed to the Sakai Foundation (SF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The SF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/*global $, sdata, Config */

var sakai = sakai || {};

sakai.assignments = function(tuid, placement, showSettings){


	//////////////////////
	// CONFIG VARIABLES //
	//////////////////////

	var rootel = $("#" + tuid);

	var assignments = "#assignments";
	var assignmentsListButtonsDiv = ".assignments .assignments_list .assignments_list_buttons div";
	var assignmentsListHover = "assignements_list_hover";
	var $assignmentsMainContainer = $(assignments + "_main_container");


	/**
	 * Add binding to several elements
	 */

	var addBinding = function(){

		/**
		 * Add a hover function for the buttons
		 */
		$(assignmentsListButtonsDiv).hover(function(){
			
			// Check if there is an a tag 
			if($(this).find("a").length > 0){
				$(this).addClass(assignmentsListHover);
			}
		}, function(){
			$(this).removeClass(assignmentsListHover);
		});
		
		$(".assignments_list_button_people", rootel).click(function(){
			
			if($(".assignments_list_button_people_selected").length > 0){
				$(".assignments_list_button_people_selected").removeClass("assignments_list_button_people_selected");
				$(".assignments_list_people_info").hide();

			}else{
				$(this).addClass("assignments_list_button_people_selected");
				$(".assignments_list_people_info", $(this).closest(".assignments_list_item")).show();
			}
			
			
		});
		
	};

	/**
	 * Initialization function
	 */
	var init = function(){
		
		$assignmentsMainContainer.show();
		
		addBinding();
	};

	init();
};

sdata.widgets.WidgetLoader.informOnLoad("assignments");