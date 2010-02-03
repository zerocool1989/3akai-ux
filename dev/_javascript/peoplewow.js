/*
 * Licensed to the Sakai Foundation (SF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The SF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/*global $, Config, sdata */

var sakai = sakai || {};
sakai.peoplewow = function() {

  
  
	/////////////////////////////
	// Configuration variables //
	/////////////////////////////

	//var rootel = $("#" + tuid);
	//var numberContacts = 6; // The number of files that will be shown
	
	// - ID
	var mycontacts = "#peoplewow_contacts";
	var mygroups = "#peoplewow_groups";
	
	// Error
	//var myfilesError = myfiles + "_error";
	//var myfilesErrorContactserver = myfilesError + "_contactserver";
	
	// List
	var mycontactsList = mycontacts + "_list";
	var mygroupsList = mygroups + "_list";
	
	// Templates
	var mycontactsListTemplate = "peoplewow_contacts_list_template";
	var mygroupsListTemplate = "peoplewow_groups_list_template";
  
  
    ///////////////////////////
    // Get & process contacts and groups //
    ///////////////////////////
  
  
   /**
    * Process the information for each contact
    * @param {Object} files JSON object containing all the contacts the current user
    */
    var doProcessing = function(contacts){
        var jsonContacts = {};
        
        // Array that will contain a specified number of contacts of the current user
        jsonContacts.items = [];
        
        /*if (contacts.results) {
            // Run process each contact
            for (var i = 0; i < contacts.results.length; i++) {
                var contact = contacts.results[i];
                // Set the id of the contact
                contact.id = "test contact"; //contact.target;
                // Add the file to the array
                jsonContacts.items.push(contact);
            }
        }
        */
 
        if (contacts) {
            jsonContacts.items.push("Fred Nurk");
            jsonContacts.items.push("Joe Blogs");
            jsonContacts.items.push("John Smith");
            jsonContacts.items.push("someone");
            jsonContacts.items.push("someone else");
            jsonContacts.items.push("contact 6");
        }
 
        // Render the template with the contacts
        //$(mycontactsList, rootel).html($.Template.render(mycontactsListTemplate, jsonContacts));
        $(mycontactsList).html($.Template.render(mycontactsListTemplate, jsonContacts));
    };
  
  
    /**
     * Get all the contacts for the current user.
     */
    var getContacts = function(){
 
        /*$.ajax({
            url: "",
            cache: false,
            success: function(data){
                // Parse the data into a JSON object
                var files = $.evalJSON(data);
                // Process the contacts: username, picture, ...
                doProcessing(contacts);
            },
            error: function(xhr, textStatus, thrownError) {
                // Show the contact error
                $(mycontactsErrorContactserver, rootel).show();
            }
        });*/
 
        var qs = new Querystring();
        doProcessing(qs.contains("my_contacts"));
 
    };
  
  
  

	///////////////////////
	// Utility functions //
	///////////////////////
  
  
	/**
	 * Initilise and process contacts/groups menu
	 */
  
  function initMenu() {
    $('#peoplewow_items_list_nav ul').hide();
    $('#peoplewow_items_list_nav li a').click(
      function() {
        $(this).next().slideToggle('normal');
        //$('#peoplewow_items_list_nav').css("background-image", "url(../../_images/add-icon-profile.png)"); 
        }
      );
      
        $('div.peoplewow_items_list_top').toggleClass('peoplewow_items_list_active');
    };
    
    
  
	/////////////////////////
	// Initialise Function //
	/////////////////////////


	
	var doInit = function() {
  
		// Get the contacts for the current user
		//getContacts();
		//getGroups();
    $(document).ready(function() {initMenu();});
    
	//var simpleTreeCollection = $('.simpleTree').simpleTree({
	//	autoclose: false,
	//	drag: false
    
	//});

	};
  //alert("running");
	doInit();
  //alert("finished");
};
sdata.container.registerForLoad("sakai.peoplewow");