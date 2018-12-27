function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

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

function emitoutput(words) {
    var output = "";
    var punc = /\W/;
    for (var i=0; i<words.length-1; i++) {
        //this word is apostrophe
        //no space if next is 's'
        if (words[i] == "'") {
            output += words[i];
            if (words[i+1] != "s") {
                output += " ";
            }
        }
        //this word is newline
        //<br>
        else if (words[i] == "\n") {
            output += "\n";
        }
        //this word is puncuation 
        //space after
        else if (punc.test(words[i])) { 
            output += words[i] + " ";
        }
        //this word is a word
        //space if no punc after it
        else {
            if (punc.test(words[i+1])) {
                output += words[i];
            }
            else {
                output += words[i] + " ";
            }
        }
    }
    return output;
}

function textgen() {
    var input = document.getElementById("input").value;
    var output = document.getElementById("output");
    var newlines = document.getElementById("newlines").checked;
    var order = document.getElementById("order").value;
    var words = [];

    //split the text by whitespace and punctuation
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

    console.log(order);
    var models = [];
    models.push(markov(0, words).get(""));
    for (var i=1; i<=order; i++) {
        models.push(markov(i, words));
    }
    console.log(models);

    var history = [""];
    var outarray = [];
    for (var i=0; i<300; i++) {
        var key = history.join('');
        var next = "";
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
        history.shift();
        history.push(next);
        outarray.push(next);
    }

    output.innerText = emitoutput(outarray);
    
    return;
}