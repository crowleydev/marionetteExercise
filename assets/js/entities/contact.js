/**
 * 
 */

ContactManager.module("Entities", function(Entities, ContactManager, Backbone,
		Marionette, $, _) {

	// Contact model
	Entities.Contact = Backbone.Model.extend({
		defaults : {
			firstName : "-",
			phoneNumber : "No phone number!"
		}
	});

	// Collection of contacts
	Entities.ContactCollection = Backbone.Collection.extend({
		model : Entities.Contact,
		comparator : function(item) {
			// sorted by firstName and lastName
			return [ item.get("firstName"), item.get("lastName") ]
		}
	});

	var contacts;

	var initalizeContacts = function() {
		contacts = new Entities.ContactCollection([ {
			id : 1,
			firstName : "Daniel",
			lastName : "Najdenovski",
			phoneNumber : "075514950"
		}, {
			id : 2,
			firstName : "Marijan",
			lastName : "Najdenovski",
			phoneNumber : "075522522"
		}, {
			id : 3,
			firstName : "Pece",
			lastName : "Najdenovski",
			phoneNumber : "075520688"
		}, {
			id : 4,
			firstName : "Anita",
			lastName : "Dimovska",
			phoneNumber : "075520688"
		}, {
			id : 5,
			firstName : "Katerina",
			lastName : "Stojanovska",
			phoneNumber : "075520688"
		}, {
			id : 6,
			firstName : "Andre",
			lastName : "Andreevski",
			phoneNumber : "075514950"
		}, {
			id : 7,
			firstName : "Andre",
			lastName : "Terzievski",
			phoneNumber : "075514950"
		}, {
			id : 8,
			firstName : "Daniel",
			lastName : "Apostolov",
			phoneNumber : "075514950"
		} ]);
	};

	var API = {
		getContactEntities : function() {
			if (contacts === undefined) {
				
				initalizeContacts();
			}

			return contacts;
		}
	};
	
	
	ContactManager.reqres.setHandler("contact:entities", function() {
		return API.getContactEntities();
	});

});