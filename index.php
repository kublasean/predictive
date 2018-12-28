<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="predictive.js"></script>
        <link rel="stylesheet" href="w3.css">
        <style>
            html, body, div {
                margin: 0;
                padding: 0;
            }
            textarea {
                border: 1px solid black;
                width: 100%;
                height: 60%;
            }
            #body-container {
                background-color: grey;
                border: 1px solid black;
                margin: auto;
                width: 95%;
            }
            #input-area {
                text-align: center;
                height: 500px;
            }
            #output-area {
                text-align: center;
                height: 500px;
            } 
            #order {
                width: 40px;
            }
            #fileSelect-wrapper {
                text-align: left;
                border: 1px solid white;
                padding: 10px;
                margin: 10px 0px;
            }
        </style>
        <title>Text Generator</title>
    </head>
    <body>
        <h1 class="w3-center">Markov Chain Text Generator</h1>
        <div class="w3-row" id="body-container">
            <div class="w3-container w3-half w3-blue" id="input-area">
                paste your text
                <textarea id="input"></textarea>
                <input id="firstword" type="text">first word?</input>
                <input type="checkbox" id="newlines">include newlines?</input>
                <input type="number" id="order" value="2" min="0" max="10">order of chain?</input>
            <div id="fileSelect-wrapper">
    	    <span>Select file from this directory </span>
            <select id="fileSelect">
            <option>None</option>
    	    <?php //----- php code to create html selection with local files

            $files = glob("example_text/*.txt"); //find all .txt files in current directory
            $beginFile = "";
            foreach ($files as $filename) {
        	    echo "<option>$filename</option>\n\t";
            }
    	    ?>
    	    </select>
    	    <br />
    	    <span>Or upload a local file here:</span>
    	    <input type="file" id="files" name="files[]"/>
            </div>
            <button onclick="loadit()">load it!</button>
            </div>
            <div class="w3-container w3-half" id="output-area">
                <div style="text-align: left; height: 400px; background-color: white;">                
                <p id="output"></p>
                </div>
                <button id="sampleit" onclick="sampleit()">sample it!</button>
            </div>
        </div>
	    <script>
        document.getElementById("sampleit").hidden = true;
    </script>
    </body>
</html>
