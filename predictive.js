/* GLOBALS */
var MODELS;
var WORDINDEX;
var EMIT_INTERVAL;
var HIST_ARRAY;
var ORDER;
var PREVIOUS_TEXT;

//on load it! button press
function loadit() {
    var fname = "None";
    document.getElementById("sampleit").hidden = true;
    $('#fileSelect  > option:selected').each(function() {
        fname = $(this).val();
    });
    if (fname != "None") {
        $.ajax({
            url:"./"+fname,
            success:setmodels
        });
    }
    else {
        setmodels(document.getElementById("input").value);
    }
}

//on sample it! button press
function sampleit() {
    WORDINDEX = 0;
    HIST_ARRAY = [document.getElementById("firstword").value];
    ORDER = document.getElementById("order").value;
    document.getElementById("output").innerText = "";
    PREVIOUS_TEXT = "";
    EMIT_INTERVAL = setInterval(emitoutput, 50);
    //document.getElementById("output").innerText = emitoutput(outarray);
}

//set the MODELS glob based
//off text from input
function setmodels(input) {
    var newlines = document.getElementById("newlines").checked;
    var order = document.getElementById("order").value;
    var words = [];

    //clean it
    if (newlines == true) {
        input = input.replace(/ +/, " ");
        var tmp = input.split(/(\W)/);
        for (var i=0; i<tmp.length; i++) {
            if (tmp[i] != null && tmp[i] != " " && tmp[i].length > 0) {
                words.push(tmp[i]);
            }
        }
    }
    else {
        var tmp = input.split(/\s|(\W)/);
        for (var i=0; i<tmp.length; i++) {
            if (tmp[i] != null && tmp[i].length > 0) {
                words.push(tmp[i]);
            }
        }
    }

    //create the models
    var models = [];
    models.push(markov(0, words).get(""));
    for (var i=1; i<=order; i++) {
        models.push(markov(i, words));
    }
    MODELS = models;
    document.getElementById("sampleit").hidden = false;
}

//generate text from the models
function getoutput() {
    var models = MODELS;
    var next = "";
    var order = document.getElementById("order").value;
    var history = [document.getElementById("firstword").value];
    var outarray = [history[0]];
    for (var i=0; i<200; i++) {
        var key = history.join('');
        for (var j=order; j>=0; j--) {
            if (j == 0) {
                next = sample(models[j]);
                break;
            }
            if (models[j].has(key)) {
                next = sample(models[j].get(key));
                break;
            }
        }
        if (history.length >= order) {
            history.shift();
        }
        history.push(next);
        outarray.push(next);
    }
    return outarray;
}

//just get one word instead of all at once
function getword() {
    var key = HIST_ARRAY.join('');
    var next = "";
    for (var j=ORDER; j>=0; j--) {
        if (j == 0) {
            next = sample(MODELS[j]);
            break;
        }
        if (MODELS[j].has(key)) {
            next = sample(MODELS[j].get(key));
            break;
        }
    }
    return next;
}

    
    
    

//create the model of an order
function markov(order, text) {
    var model = new Map();
    for (var i=0; i<text.length-order; i++) {
        var history = "";
        var word = text[i+order];
        for (var j=0; j<order; j++) {
            history += text[i+j];
        }
        if (!model.has(history)) {
            model.set(history, new Map());
        }
        nextwords = model.get(history);
        if (nextwords.has(word)) {
            nextwords.set(word, nextwords.get(word)+1);
        }
        else {
            nextwords.set(word, 1);
        }
    }

    function getprobs(v, k, m) {
        var sum = 0.0;
        function mysum(vv, kk, mm) {
            sum += vv;
        }
        function mydiv(vv, kk, mm) {
            mm.set(kk, vv / sum);
        }
        v.forEach(mysum);
        v.forEach(mydiv);
    }
    model.forEach(getprobs);
    return model;
}

//sample a model
function sample(m) {
    var s = Math.random();
    var prev = 0;
    var it = m.entries();
    for (var i=0; i<m.size; i++) {
        var kv = it.next().value;
        var word = kv[0];
        var prob = kv[1];
        if (s > prev && s < prob+prev) {
            return word;
        }
        prev += prob;
    }
    return null;
}

//create a somewhat formatted text block
//from array of words / puncuation
/*function emitoutput() {
    var output = "";
    var punc = /\W/;
    var word = "";
    var i = WORDINDEX;
    
    console.log(i);
    console.log(words.length);
    
    if (i >= words.length) {
        clearInterval(EMIT_INTERVAL);
    }
    
    //this word is apostrophe
    if (words[i] == "'") {
        word += words[i];
    }
    //this word is newline
    else if (words[i] == "\n") {
        word += "\n";
    }
    //this word is puncuation 
    //space after
    else if (punc.test(words[i])) { 
        word += words[i] + " ";
    }
    //this word is a word
    //space if no punc after it
    else {
        if (punc.test(words[i+1])) {
            word += words[i];
        }
        else {
            word += words[i] + " ";
        }
    }
    //document.getElementById("output").innerText += word;
    WORDINDEX += 1;
}*/

function emitoutput() {
    if (WORDINDEX > 1000) {
        clearInterval(EMIT_INTERVAL);
    }
    var word = getword();
    
    if (WORDINDEX % 5 == 0) {
        if (HIST_ARRAY.length >= ORDER) {
            HIST_ARRAY.shift();
        }
        HIST_ARRAY.push(word);
        document.getElementById("output").innerText = PREVIOUS_TEXT + " " + word;
        PREVIOUS_TEXT = document.getElementById("output").innerText;
    }
    else {
        document.getElementById("output").innerText = PREVIOUS_TEXT + " " + word;
    }
    
    WORDINDEX += 1;

}

