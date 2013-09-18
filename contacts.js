Contacts = new Meteor.Collection("contacts")

if (Meteor.isClient) {

    var contacts = [
        {
            name: "Bharath"
        },
        {
            name: "Bharani"
        }
    ]

    Session.set("contacts", contacts);

    Template.contact_list.contacts = function () {
        //return Session.get("contacts")
        return Contacts.find()
    }

    Template.add_contact.events({
        "submit form": function (e, t) {
            e.preventDefault()
            //alert("submitting")

            var fullname = t.find(".fullname").value
            //alert(fullname)

            Contacts.insert ({name: fullname})

            /*var contacts = Session.get("contacts")
            contacts.push({name: fullname})
            Session.set("contacts", contacts)*/
        }
    })

    Template.contact_item.events({
        "click .delete": function(e, t) {
            Contacts.remove(this._id)
        },

        "click .edit": function(e, t) {
            Session.set("currentlyEditing", this._id)
        },

        "click .cancel": function(e, t) {
            Session.set("currentlyEditing", false)
        },

        "submit form": function(e, t) {
            e.preventDefault()
            var fullname = t.find(".fullname").value
            Contacts.update({_id: this._id}, {
                name: fullname
            })
            Session.set("currentlyEditing", false)
        }
    })

    Template.contact_item.isEditing = function() {
        return Session.get("currentlyEditing", this._id)
    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
