
var click = true;

// contact model
ContactManager.Contact = Backbone.Model.extend({
	defaults : {
		firstName : "-",
		phoneNumber : "No phone number!"
	}
});

// collection of contacts
ContactManager.ContactCollection = Backbone.Collection.extend({
	model : ContactManager.Contact,
	comparator : function(item) {
		return [item.get("firstName"), item.get("lastName")]
	}
});

// view: for one contact
ContactManager.ContactItemView = Marionette.ItemView.extend({
	tagName : "li",
	template : Handlebars.compile($("#contact-list-item").html()),
	events : {
		"click" : "alertPhoneNumber",
	},

	alertPhoneNumber : function() {
		alert(this.model.escape("phoneNumber"));
	}
});

// view: list all contacts
ContactManager.ContactsView = Marionette.CollectionView.extend({
	tagName : "ul",
	childView : ContactManager.ContactItemView
});

ContactManager.on("before:start", function() {
	console.log("Contact Manager started");

	var RegionContainer = Marionette.LayoutView.extend({
		el : "#app-container",

		regions : {
			main : "#main-region"
		}
	});

	ContactManager.regions = new RegionContainer();
});

ContactManager.on("start", function() {

	var listOfContacts = new ContactManager.Entities.ContactCollection([ {
		firstName : "Daniel",
		lastName : "Najdenovski",
		phoneNumber : "075514950"
	}, {
		firstName : "Marijan",
		lastName : "Najdenovski",
		phoneNumber : "075522522"
	}, {
		firstName : "Pece",
		lastName : "Najdenovski",
		phoneNumber : "075520688"
	},
	{
		firstName : "Anita",
		lastName : "Dimovska",
		phoneNumber : "075520688"
	},
	{
		firstName : "Katerina",
		lastName : "Stojanovska",
		phoneNumber : "075520688"
	},
	{
		firstName : "Andre",
		lastName : "Andreevski",
		phoneNumber : "075514950"
	},
	{
		firstName : "Andre",
		lastName : "Terzievski",
		phoneNumber : "075514950"
	},
	{
		firstName : "Daniel",
		lastName : "Apostolov",
		phoneNumber : "075514950"
	}]);

	var previewContacts = new ContactManager.ContactsView({
		collection : listOfContacts
	});

	ContactManager.regions.main.show(previewContacts);

});

/*
 * $(window).on("click", function() {
 * 
 * if (click) {
 * 
 * var sV = new ContactManager.StaticView({ id : "newItem", tagName : "span",
 * className : "newClass", template : "#static-template" });
 * 
 * click = false; } else {
 * 
 * var george = new ContactManager.Contact({ lastName: "Maverick", phoneNumber:
 * "123456789" });
 * 
 * var sV = new ContactManager.ContactView({ model: george }); click = true; }
 * 
 * ContactManager.regions.main.show(sV); });
 */
ContactManager.start();