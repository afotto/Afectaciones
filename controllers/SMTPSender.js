module.exports = function SMTPSender() {

    // var mandrill = require('mandrill-api/mandrill');
    // mandrill_client = new mandrill.Mandrill('2_l3lpoB9M-Z3Al3Z8s8Aw');
    var mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
    const mandrill_client = mailchimpFactory("2_l3lpoB9M-Z3Al3Z8s8Aw");

    this.send =function (emailbody){
        console(emailbody);
        if(emailbody.toname==='') {
            emailbody.toname=emailbody.toemail;
        }

        var message = {
            "html": "<p>"+emailbody.mensaje+"</p>",
            "text": emailbody.mensaje,
            "subject": "Credito " + emailbody.transactionSTATE ,
            "from_email": emailbody.fromemail,
            "from_name": emailbody.fromname,
            "to": [{
                    "email": emailbody.toemail,
                    "name": emailbody.toname,
                    "type": "to"
                }],
            "important": false,
            "merge": false
        };
        var async = false;
        var ip_pool = "Main Pool";
        var send_at = "2020-05-06 00:00:00";
        
        mandrill_client.messages.send({"message": message, "async": async}, function(result) {
            console.log(result);
        }, function(e) {
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        })


    };
}