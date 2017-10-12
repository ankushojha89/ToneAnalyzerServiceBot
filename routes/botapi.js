//config files
const {conversation,tone_analyzer} = require('./../config/serverconfig');
const  JobDomain=require('./../models/jobdomain');
const  Applicant=require('./../models/applicant');
const  _=require('lodash');
var express = require('express');
var router = express.Router();


/* Start Bot using GET method. */
router.get('/', function(req, res, next) {   
    
    conversation.message({}, (err, response)=>{
        console.log(JSON.stringify(response,undefined,2));
        if (err) {
            // console.error(err); // something went wrong
            console.log(JSON.stringify(err,undefined,2));     
             return res.status(400).send({messages:"Error"});
           }
           res.status(200).send({response});
    });       
});

/* Talking Bot using Post method. */
router.post('/', function(req, res, next) {  
  
    var str;
    Object.keys(req.body).forEach(function(key) {
        str=key;       
    });

   
    
    conversation.message({
        input: { text: JSON.parse(str).message },    
        context : JSON.parse(str).context ,
      }, (err, response)=>{     
        if (err) {        
                 return res.status(400).send({messages:"Error"});
        }

       if (response.output.toneAnalyze == true) {  
        var customerTone= {
            "utterances": [
              {   "text": JSON.parse(str).message, "user": "customer"     }        
            ]
        }; 

        tone_analyzer.tone_chat(customerTone, function(toneError, toneData) {
            if (toneError){
                res.status(400).send({toneError});
            }             
            response.output.tone=toneData;
            console.log(JSON.stringify(response,undefined,2));  
              res.status(200).send({response});
            }            
          );     
        }
        else{ 
            console.log(JSON.stringify(response,undefined,2));            
            res.status(200).send({response});
        }

                
    }); 

});


/* Talking Bot using Post method. */
router.post('/tone', function(req, res, next) {     
     
      tone_analyzer.tone({ text: req.body.message },
      function(err, tone) {
        if (err){
            console.log(err);
            return  res.status(400).send({tone:"Error"});
        }          
        else{
            console.log('Tone',JSON.stringify(tone, null, 2));
            return  res.status(200).send({tone});
        }
          
    });
});




 module.exports = router;