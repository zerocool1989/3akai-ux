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

/*global $, Config, sdata, fluid */

var sakai = sakai || {};
sakai.events = function(){

    /////////////////////////////
    // Configuration variables //
    /////////////////////////////

    var limit = 10;

    var $eventContainerMain = $("#events_container_list");
    
    // Templates
    var eventsContainerMainTemplate = "events_container_list_template";


    //////////////////////////
    // Render functionality //
    //////////////////////////

    /**
     * Render the talks and show it to the user
     * @param {Object} results The JSON results object
     */
    var renderTalks = function(results){
        $eventContainerMain.html($.Template.render(eventsContainerMainTemplate, results));
    };


    ////////////////////////
    // Date functionality //
    ////////////////////////

    /**
     * Parse the start and end date in an approriate format
     * e.g. Friday 26th February 2010, 17:30-18:30
     * @param {Date} startDate The start date object
     * @param {Date} endDate The end date object
     */
    var parseDate = function(startDate, endDate){
        return dateFormat(startDate, "dddd dS mmmm yyyy, HH:MM") + "-" + dateFormat(endDate, "HH:MM");
    };

    /**
     * Parse a date to a shorter format
     * e.g. Sun 28 Feb 2010
     * @param {Date} date The date you want to shorten
     */
    var parseShortDate = function(date){
        return dateFormat(date, "ddd dd mmm yyyy");
    };

    /**
     * Parse the talks into a more usable format for the template
     * @param {Object|Boolean} data 
     * If the data is false it means that there was an error.
     * If it is an object then we should parse it to JSON
     */
    var parseTalks = function(data){
        if(data){
            var json = $.evalJSON(data);
            if (json && json.query && json.query.results && json.query.results.list){

                var talks = json.query.results.list, talk;

                if(!json.query.results.list.talk){
                    for (var i=0, il=talks.length; i<il; i++) {
                        talk = json.query.results.list[i].talk;
                        json.query.results.list[i].talk.parse_date = parseDate(talk.start_time, talk.end_time);
                    }
                } else{
                    talk = json.query.results.list.talk;
                    json.query.results.list.talk.parse_date = parseDate(talk.start_time, talk.end_time);
                }

                renderTalks(json.query.results);
            } else {
                fluid.log("No featured talks were found");
            }
        } 
        else {
            fluid.log("Could not get the data from talks.cam.ac.uk");
        }
    };

    /**
     * Get the featured talks from talks.cam.ac.uk
     */
    var getTalks = function(){
        var data = {
            limit: limit
        };
        $.ajax({
            data: $.param(data),
            url: "/var/proxy/talks/featured_talks.json",
            success: function(data){
                parseTalks(data);
            },
            error: function(){
                parseTalks(false);
            }
        });
    };

    /**
     * Bind the change event to the dropdown box where you can
     * select how many items you want
     */
    $(".main_content_container select").live("change", function(){
        limit = $(".main_content_container select").val();
        getTalks();
    });

    /**
     * Show shorter date beneath the input field
     */
    var showShortDate = function(){
        var $el = $(this);
        var date = $el.datepicker("getDate");
        
        if(date){
            $("#" + $el.attr("id") + "_formatted").text(parseShortDate(date));
        }
    };

    /**
     * Initialise the datepickers
     */
    var initDatepicker = function(){
        var d = new Date();
        $("#events_start_date").datepicker({
            buttonText: "Please select a start date",
            dateFormat: 'dd/mm/y',
            defaultDate: d,
            onClose: showShortDate
        });

        $("#events_end_date").datepicker({
            buttonText: "Please select an end date",
            dateFormat: 'dd/mm/y',
            // We set the default date for the stop date to a week later
            defaultDate: +7,
            onClose: showShortDate
        });
    };

    ////////////////////
    // Initialisation //
    ////////////////////

    /**
     * Initialisation function
     */
    var init = function(){
        
        // Get the featured talks
        getTalks();
        
        // Initialise the datepickers
        initDatepicker();
    };
    
    init();
};
sdata.container.registerForLoad("sakai.events");