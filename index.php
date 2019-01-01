<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="predictive.js"></script>
        <link rel="stylesheet" href="w3.css">
        <style>
            html, body {
                margin: 0;
                padding: 0;
                background-color: grey;
            }
            button {
                width: 100px;
                height: 50px;
            }
            #input {
                border: 1px solid black;
                width: 100%;
                height: 200px;
                background-color: white;
                color: black;
                text-align: left;
            }
            #body-container {
                text-align: center;
                max-width: 500px;
                margin: auto;
                padding: 20px;
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
            <div class="w3-blue" id="body-container">
            <h1 class="w3-center">Markov Chain Text Generator</h1>
            Paste some source text 
                <textarea id="input"></textarea>
                Options
            <div id="fileSelect-wrapper">
            
    	    <span>Use an example text source file?</span>
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
            <br>First word?
            <input id="firstword" type="text"></input>
            <br>Include newlines?
            <input type="checkbox" id="newlines"></input>
            <br>Order of chain?
            <input type="number" id="order" value="2" min="0" max="10"></input>
            </div>
            <button onclick="loadit()">load it!</button>
            <div style="text-align: left; background-color: white; color: black;">                
            <p id="output"></p>
            </div>
            <button id="sampleit" onclick="sampleit()">sample it!</button>
            </div>
	    <script>
        document.getElementById("sampleit").hidden = true;
    </script>
    </body>
</html>
