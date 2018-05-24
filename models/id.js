// Logger
var log = global.inspector;
const label  = 'models/id';

// Generate a v1 UUID (time-based)
const uuidV1 = require('uuid/v1');

/*
 * ID Model
 *
 * Instead of following the traditional Mongoose examples, I'm
 * using a function to provide both private and public methods to
 * this model to keep things more organized!
 */

var ID = function(){
    var mongoose = require('mongoose');
    // Kinda redundant, but needed
    var Schema = require('mongoose').Schema;

    // Mongoose schema so Mongoose can make effective queries
    var idSchema = new Schema({
        uuid: { type: String, index: { unique: true, required: true }},
        userid: { type: String, required: true },
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        mnames: { type: String, required: true },
        gender: { type: String, required: true },        
        photo: { type: String, required: true },
        address: { type: String },
        idcard: { type: String },
        driverlic: { type: String }, 
        passport: { type: String }
    });

    

    // Declaring a private user model for internal methods
    var _idModel = mongoose.model('id', idSchema);


    // Creating a create method for convenience
    var _create = function(data, success, fail) {
        _idModel.create(
            {
                uuid: data.uuid,
                userid: data.userid,
                fname: data.fname,
                lname: data.lname,
                mnames: data.mnames,
                gender: data.gender,        
                photo: data.photo,
                address: data.address,
                idcard: data.idcard,
                driverlic: data.driverlic, 
                passport: data.passport
            },
            function(e, doc) {
                if(e) {
                    fail(e);
                } else {
                    success(doc);
                }
            }
        );
    };

    // Creating a findByIdentity method for convenience
    var _findIDByIdentity = function(identity,success, fail) {
        _idModel.findOne(
            {
                userid: identity
            },
            function(e, doc) {
                if(e) {
                    fail(e);
                } else {
                    success(doc);
                }
            }
        );
    };

    // Creating an remove method for convenience
    var _remove = function(identity, success, fail) {
        _idModel.remove(
            {
                userid: identity
            },
            function(e, doc){
                if(e) {
                    fail(e);
                } else {
                    success(doc);
                }
            });
    };
    


    // Returning properties and methods we'd like to be public
    return {
        id: idSchema,        
        create: _create,
        remove: _remove,
        findIDByIdentity: _findIDByIdentity
    }

    // Validate the model for save

}();

module.exports = ID;