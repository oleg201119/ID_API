/**
 * Transformation for responses
 *
 * @param ret
 * @param res
 * @param data
 * @returns {*|Response}
 */
var log = global.inspector;
const label = 'transformers/responseTransformer';

exports.resp = function(ret,res,data) {
    var jsonResponse = {};
    var status = 0;
    jsonResponse.code = ret;
    switch(ret) {        
        case 'TestArrived':
            status = 200;
            jsonResponse.message = 'We arrived at the api! Success!';
            break;
        case 'Home':
            status = 200;
            jsonResponse.message = 'ID v0.1';
            break;
        case 'InputValidationErrors':
            status = 422;
            jsonResponse.message = 'Errors on input were detected!';
            if (data) jsonResponse = objectMerge(jsonResponse, data);
            break;
        case 'CreateIDSuccessful':
            status = 200;
            jsonResponse.message = 'ID created successfully.';
            if (data) jsonResponse = objectMerge(jsonResponse, data);
            break;
        case 'IDAlreadyExists':
            status = 401;
            jsonResponse.message = 'A id already exists.';
            break;
        case 'IDNotFound':
            status = 404;
            jsonResponse.message = 'ID not found.';
            break;
        case 'RemoveIDSuccessful':
            status = 200;
            jsonResponse.message = 'ID removed successfully.';           
            break;
    }

    if (jsonResponse) {
        return res
            .status(status)
            .header('Content-Type', 'application/json')
            .json(jsonResponse);

    } else {
        return res.status(status);
    }

};

function objectMerge(){
    for (var i=1; i<arguments.length; i++)
        for (var a in arguments[i])
            arguments[0][a] = arguments[i][a];
    return arguments[0];
}
