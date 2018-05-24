const label = 'libraries/crypt';

var service = function(privateKey) {
    this.privateKey = privateKey;
    this.logger = global.inspector;
    this.logger.info(label,'Loading!');
};

service.prototype = {
    privateKey: '',
    logger: null,
    cryptjs: require("crypto"),


    cipher: function(message, key) {
        var cryptkey   = this.cryptjs.createHash('sha256').update(key).digest();
        var cipher = this.cryptjs.createCipheriv("aes-256-cbc", cryptkey, this.privateKey);
        // var keystring = this.privateKey.toString('hex').slice(0, 16);
        // var cipher = this.cryptjs.createCipheriv("aes-256-cbc", key, this.privateKey);
        
        if (typeof message === "object") {
            message = JSON.stringify(data);
        }
        cipher.update(message, "ascii");
        return cipher.final("base64");
    },

    decipher: function(encrypted, key) {
        this.logger.info(label, 'Deciphering '+encrypted+' with '+ key);
        var decipher = this.cryptjs.createDecipheriv("aes-256-cbc", key, this.privateKey);
        decipher.update(encrypted, "base64");
        var result = decipher.final("ascii");
        this.logger.info(label, 'Result: '+result);
        return result;
    },

    compare: function(encrypted, str, key) {
        return this.cipher(str, key) === encrypted;
    }

};

module.exports = function(key) {
    return new service(key);
};