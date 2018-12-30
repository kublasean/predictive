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
            button {
                width: 100px;
                height: 50px;
            }
            textarea {
                border: 1px solid black;
                width: 100%;
                height: 500px;
                margin-top: 13px;
            }
            #body-container {
                background-color: grey;
                border: 1px solid black;
                margin: auto;
                max-width: 1300px;
            }
            #input-area {
                text-align: center;
            }
            #output-area {
                text-align: center;
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
                <textarea id="input"></textarea>
                Options
            <div id="fileSelect-wrapper">
            
    	    <span>Use an example text file?</span>
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
    	    <span>Upload a file?</span>
    	    <input type="file" id="files" name="files[]"/>
            <br>
            <input id="firstword" type="text">first word?</input>
            <input type="checkbox" id="newlines">include newlines?</input>
            <input type="number" id="order" value="2" min="0" max="10">order of chain?</input>
            </div>
            <button onclick="loadit()">load it!</button>
            </div>
            <div class="w3-container w3-half" id="output-area">
                <div style="text-align: left; height: 500px; background-color: white;">                
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
