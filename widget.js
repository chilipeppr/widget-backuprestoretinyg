/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

requirejs.config({
    /*
    Dependencies can be defined here. ChiliPeppr uses require.js so
    please refer to http://requirejs.org/docs/api.html for info.
    
    Most widgets will not need to define Javascript dependencies.
    
    Make sure all URLs are https and http accessible. Try to use URLs
    that start with // rather than http:// or https:// so they simply
    use whatever method the main page uses.
    
    Also, please make sure you are not loading dependencies from different
    URLs that other widgets may already load like jquery, bootstrap,
    three.js, etc.
    
    You may slingshot content through ChiliPeppr's proxy URL if you desire
    to enable SSL for non-SSL URL's. ChiliPeppr's SSL URL is
    https://i2dcui.appspot.com which is the SSL equivalent for
    http://chilipeppr.com
    */
    paths: {
        // Example of how to define the key (you make up the key) and the URL
        // Make sure you DO NOT put the .js at the end of the URL
        // SmoothieCharts: '//smoothiecharts.org/smoothie',
    },
    shim: {
        // See require.js docs for how to define dependencies that
        // should be loaded before your script/widget.
    }
});

//cjm Working HTML Editor Window
cprequire_test(["inline:com-chilipeppr-widget-backuprestoretinyg"], function (ls) {
    console.log("test running of " + ls.id);

    // Serial Port Selector
    // http://jsfiddle.net/chilipeppr/4RgrS/
    // NEW VERSION for SPJS v1.7 http://jsfiddle.net/chilipeppr/vetj5fvx/
    $('body').append('<div id="testDivForSpjsWidget"></div>');

    chilipeppr.load("#testDivForSpjsWidget",
        "https://raw.githubusercontent.com/chilipeppr/widget-spjs/master/auto-generated-widget.html",
        // "http://fiddle.jshell.net/chilipeppr/vetj5fvx/show/light/",

    function () {
        cprequire(
        ["inline:com-chilipeppr-widget-serialport"],

        function (sp) {
            sp.setSingleSelectMode();
            sp.init(null, "tinyg", 115200);
            setTimeout(function () {
                ls.init();
            }, 2000); //startup delay (ms) for spjs connection to get going during debug
        });

    });
    // Serial Port Console Log Window
    // http://jsfiddle.net/chilipeppr/JB2X7/
    // NEW VERSION http://jsfiddle.net/chilipeppr/rczajbx0/
    // The new version supports onQueue, onWrite, onComplete
    $('body').append('<div id="testDivForSpconsoleWidget"></div>');

    chilipeppr.load("#testDivForSpconsoleWidget",
        "https://raw.githubusercontent.com/chilipeppr/widget-console/master/auto-generated-widget.html",
        // "http://fiddle.jshell.net/chilipeppr/rczajbx0/show/light/",

    function () {
        cprequire(
        ["inline:com-chilipeppr-widget-spconsole"],

        function (spc) {
            // pass in regular expression filter as 2nd parameter
            // to enable filter button and clean up how much
            // data is shown
            spc.init(true, /^{/);

            // resize this console on a browser resize
            $(window).on('resize', function (evt) {
                //console.log("serial-port-console. resize evt:", evt);
                if ($.isWindow(evt.target)) {
                    //console.log("resize was window. so resizing");
                    spc.resize();
                } else {
                    //console.log("resize was not window, so ignoring");
                }
            });
            // resize this console if we get a publish
            // from the gcode viewer widget
            chilipeppr.subscribe("/com-chilipeppr-widget-gcode/resize", spc, spc.resize);

        });
    });

    ls.okToClose = false;

} /*end_test*/ );

cpdefine("inline:com-chilipeppr-widget-backuprestoretinyg", ["chilipeppr_ready"], function () {
    return {
        id: "com-chilipeppr-widget-backuprestoretinyg",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Widget / Backup and Restore TinyG",
        desc: "This widget does backup and restore of TinyG Configurations to/from PC file",
        publish: {},
        subscribe: {},
        foreignPublish: {
            "/com-chilipeppr-widget-serialport/send": "Update this for backuprestoretinyg"


        },
        foreignSubscribe: {

            "/com-chilipeppr-widget-serialport/recvline": "Update this for backuprestoretinyg"

        },
        isInitted: false, // keep track of our one-time init
        readTinyG: false, // keep track of when the TinyG data has been read
        okToClose: true, // default to closing allowed
        cjmDownloadRunning: false, // control reaction to tinyG Parameter Download running

        init: function () {
            if (!this.isInitted) {
                console.log("Initializing config widget");
                var me = this;
                $('#com-chilipeppr-widget-backuprestoretinyg').on('hide.bs.modal', function (e) {
                    if (!me.okToClose) return e.preventDefault();
                });
                this.btnSetup();
                this.forkSetup();
                this.setDefaultValue(); //cjm create and populate the default download file name
                this.isInitted = true;
                this.cjmDownloadRunning = false; // initialize Download Running Semaphore
            }
            this.show();
            console.log(this.name + " done loading.");
        },
        show: function () {
            $("#com-chilipeppr-widget-backuprestoretinyg").modal('show'); //Shows Window
            setTimeout(this.initValuesFromTinyG, 100); //What does this do? 
        },
        hide: function () { //Executed on close
            chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/recvline");
            $("#com-chilipeppr-widget-backuprestoretinyg").modal('hide'); //Hides window
        },
        btnSetup: function () {

            // chevron hide body
            var that = this;
            $('#com-chilipeppr-widget-backuprestoretinyg .tinyg-closeConfig').click(this.closeDialog.bind(this));
            //cjm buttons
            $('#com-chilipeppr-widget-backuprestoretinyg .loadFileAsText').click(this.loadFileAsText.bind(this));
            $('#com-chilipeppr-widget-backuprestoretinyg .saveTextAsFile').click(this.saveTextAsFile.bind(this));
            $('#com-chilipeppr-widget-backuprestoretinyg .saveTextAsFile_Restore').click(this.saveTextAsFile_Restore.bind(this));
            $('#com-chilipeppr-widget-backuprestoretinyg .uploadTinyGconfigs').click(this.uploadTinyGconfigs.bind(this));
            $('#com-chilipeppr-widget-backuprestoretinyg .downloadTinyGconfigs').click(this.downloadTinyGconfigs.bind(this));
            //cjm buttons
            $('#com-chilipeppr-widget-backuprestoretinyg .btn-toolbar .btn').popover({
                delay: 500,
                animation: true,
                placement: "auto",
                trigger: "hover",
                container: 'body'
            });
        },
        closeDialog: function () {
	  //clean up work areas
	  document.getElementById("inputTextToSaveRestore").value = "";
	  document.getElementById("inputTextToSaveBackup").value = "";
            if (this.okToClose) this.hide();
        },
        // cjm code paste
        saveTextAsFile: function () {
            var textToWrite = document.getElementById("inputTextToSaveBackup").value;
            var textFileAsBlob = new Blob([textToWrite], {
                type: 'text/plain'
            });
            var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
            var downloadLink = document.createElement("a");

            fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL !== null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            } else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }

            downloadLink.click();
        },
        destroyClickedElement: function (event) {
            document.body.removeChild(event.target);
        },
        loadFileAsText: function () {
            var fileToLoad = document.getElementById("fileToLoad").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                document.getElementById("inputTextToSaveRestore").value = textFromFileLoaded;
            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        },
        /* Kevin's relieable write via json starts here -----  */
        downloadTinyGconfigs: function () {
            var that = this;
            /*            var this.pdlArray = [
            ]; */
            this.cjmDownloadRunning = true; //Semaphore controlls Readers Subs 
            //Parse input file into  (Command.parameter) pairs that are writeable
            this.parseConfigParamFile();
            console.log("confCmd =", cmdDownList);
            console.log("Commands to be sent=", countCmd, "Commands Filtered =", countFlt);
            //Send param at a time // wait for confirmation // report progress
            // Build the array of objects based on number of commands to be sent
            // Reference http://stackoverflow.com/questions/15742442/declaring-array-of-objects
            this.pdlArray = []; // this array will be same length as cmdDownList when built 
            for (i = 0; i < cmdDownList.length; i++) {
                this.pdlArray.push(new this.cmdVerify());
                this.pdlArray[i].cmd = cmdDownList[i][0];
                this.pdlArray[i].sendVal = cmdDownList[i][1];
            }
            var index = 0;
            this.sendDataElement(index);
        },
        sendDataElement: function (index) {
            if (index >= this.pdlArray.length) {
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Restore TinyG from ArchiveFile", "TinyG Parameters Restored.");
                //Populate the report area
                this.dispArray();
                this.cjmDownloadRunning = false; //Semaphore controlls Readers Subs 
                // this.hide();
                return;
            }
            var that = this;
            // var item = dataToSend[index];
            // item = JSON.stringify({this.pdlArray[index].cmd : this.pdlArray[index].sendVal})
            var A1 = this.pdlArray[index].cmd;
            var A2 = Number(this.pdlArray[index].sendVal);
            var item = {};
            item[A1] = A2;
            console.log("Carl 210:A1 = ", A1, "A2 = ", A2);
            // var item = {itemdata.cmd,itemdata.value};
            // Create js Object from cmd.value pair from this.pdlArray
            console.log("Carl 213: item: ", item);
            this.pdlArray[index].recvVal = this.pdlArray[index].sendVal; //for now, pre-suppose success
            this.pdlArray[index].sendTime = new Date();
            /*           if (index >0){
	    timeSinceLast = this.pdlArray[index].sendTime.getTime() - this.pdlArray[index-1].sendTime.getTime() ;
	    console.log("Carl 217: Index= ",index,"Launch Interval = ",timeSinceLast, " ms");
	    } */
            that.sendCommandGetResponse(item)
                .done(function (result) {
                //add housekeeping here
                that.pdlArray[index].recvTime = new Date();
                console.log("Carl 224: in .Done, ready to increnment index =", index);
                that.sendDataElement(index + 1);
            })
                .fail(function () {
                console.log("Carl 228: In .Fail, about to flashmsg Failure index = ", index);
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Restore TinyG from ArchiveFile", "Parameter" + item.cmd + " failed to save.");
            });
        },
        sendCommandGetResponse: function (cmd, timeout) {
            var defer = new $.Deferred();
            var cmdName = Object.keys(cmd)[0];
            console.log("Carl 235: cmdName = ", cmdName);
            var timeoutval = 5000;
            if (typeof timeout !== "unspecified" && timeout != null) timeoutval = timeout;
            setTimeout(function () {
                console.log("Carl 240 setting Timeout to =", timeoutval);
                chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/recvline");
                defer.reject("timeout");
            }, timeoutval);
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/recvline", this, function (msg) {
                //verify response matches cmd
                if (!(msg.dataline)) return;
                var result = msg.dataline;
                console.log("Carl 247: result = ", result);
                if (result.match(/^{/)) {
                    // it is json
                    d = $.parseJSON(result);
                    if (d.r && d.r.hasOwnProperty(cmdName)) {
                        console.log("Carl 252: inResolve d.r = ", d.r);
                        chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/recvline");
                        defer.resolve(d.r);
                    }
                }
            });
            console.log("Carl 255 cmd: ", JSON.stringify(cmd));
            chilipeppr.publish("/com-chilipeppr-widget-serialport/send", JSON.stringify(cmd).concat("\n"));
            return defer.promise();
        },
        /* Kevin's relieable write via json endss here -----  */

        cmdVerify: function (cmd, sendVal, recvVal, sendTime, recvTime, isVerified, respTime) {
            this.cmd = "command";
            this.sendVal = 100;
            this.recvVal = 200;
            this.sendTime = Date.now(); // Gets time in continuous miliseconds
            this.recvTime = Date.now(); // Gets time in continuous miliseconds
            this.isVerified = function (c) {
                return (this.sendVal == this.recvVal); // type-tolerant equivalence e.g. 5 = "5" OK
            };
            this.respTime = function (c) {
                return (this.recvTime - this.sendTime); // elapsed time in ms between events
            };
        },
        //Parameter download complete
        dispArray: function () {
            //function to populate display area with Paramater Upload Results
            // append a row of formatted text for each row of array  to string, then write string to display area

            textAccumulator = "Summary of Parameter Updates \n";
            launchInterval = 0; //compute time between command sends
            for (i = 0; i < cmdDownList.length; i++) {
                if (i > 0) {
                    launchInterval = this.pdlArray[i].sendTime.getTime() - this.pdlArray[i - 1].sendTime.getTime();
                }
                writeDelay = this.pdlArray[i].recvTime.getTime() - this.pdlArray[i].sendTime.getTime();
                workingString = ("Parameter = " + this.pdlArray[i].cmd + "\t\tWrite Verified\tlaunchInt = " + launchInterval + " ms\tresponseInt " + writeDelay + " ms \n");
                //workingString = ("Parameter = " + this.pdlArray[i].cmd + "  Write Verified ? ->" + this.pdlArray[i].isVerified() + " respTime " + this.pdlArray[i].respTime() + " ms \n");
                //workingString = ("Parameter = " + this.pdlArray[i].cmd + "  Write Verified ? -> \n" );
                console.log(workingString);
                textAccumulator = textAccumulator.concat(workingString);
            }
            workingString = ("Parameters written = " + cmdDownList.length + "\n");
            console.log("Parameters written = " + cmdDownList.length + "\n");
            textAccumulator = textAccumulator.concat(workingString);
            console.log("textAccumulator ->", textAccumulator);
            document.getElementById("inputTextToSaveRestore").value = textAccumulator;
            // end of dispArray
        },
        saveTextAsFile_Restore: function () {
            var textToWrite = document.getElementById("inputTextToSaveRestore").value;
            var textFileAsBlob = new Blob([textToWrite], {
                type: 'text/plain'
            });
            var downloadLink = document.createElement("a");
            var d = new Date();
            var fileNameToSaveAs = (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "_" + d.getHours() + "t" + d.getMinutes() + "t" + d.getSeconds() + "ArchiveResults" + ".txt");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL !== null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            } else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }

            downloadLink.click();
        },

        uploadTinyGconfigs: function () {
            //add uploader here
            //           uploadWorkarea = getElementById("inputTextToSaveBackup").value;
            uploadWorkarea = document.getElementById("inputTextToSaveBackup").value; //inputTextToSaveBackup Defined in HTML Code
            chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/recvline"); // close Kevin's receiveline but show: remains running- sideeffects?
            console.log("unsubscribed from recvline");

            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/recvline", this, function (msg) {
                this.onRecvCmdcjm(msg); // get a per line command from the serial port server via pubsub
            });
            console.log("onRecvCmdcjm. recvline: subscription opened");
            setTimeout(this.getAllParametersFromTinyG, 100); //What does this do? give getAllParametersFromTinyG only 100 ms to execute?
        },
        onRecvCmdcjm: function (recvline) {
            // get a per line command from the serial port server via pubsub
            console.log("onRecvCmdcjm. recvline:", recvline);
            if (!(recvline.dataline)) {
                console.log("got recvline but it's not a dataline, so returning.");
                return;
            }
            if (this.cjmDownloadRunning) { //don't process return messages intended for Download Parameter processing
                return;
            }
            var msg = recvline.dataline;
            console.log("msg is=", msg);

            var endOfParameterDump = new RegExp(/tinyg \x5Bmm\x5D ok>/);
            if (msg.match(endOfParameterDump)) {
                decision = 1;
            } else {
                decision = 0;
            }
            console.log("decision =", decision);

            if (msg.match(endOfParameterDump)) { // Watch for End of Response Critera of 'tinyg [mm] ok>'
                console.log("End of Response = tinyG [mm] ok> Received ");
                document.getElementById("inputTextToSaveBackup").value = cmdResponse; //write accumulated commands to uploadWorkarea
                console.log("cmdResponse=", cmdResponse);
                chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/recvline");
                console.log("unsubscribed from recvline");
                //exit
            }
            cmdResponse += msg; // accumulate response lines in this string
            tinyGParameterLinesRead++; //increment line count
            console.log("tinyGParameterLinesRead", tinyGParameterLinesRead);

        },
        getAllParametersFromTinyG: function () {
            chilipeppr.publish("/com-chilipeppr-widget-serialport/send", '$$\n'); //Send $$ command
        },
        setDefaultValue: function () {
            //cjm Automatic globals
            tinyGParameterLinesRead = 0;
            cmdResponse = "// Response from $$ Command\n";
            //cjm Automatic globals end
            var that = this;
            var d = new Date();
            this.sendCommandGetResponse({
                "fb": ""
            })
                .done(function (result) {
                console.log("Carl 391: result = ", result, "result.fb = ", result.fb);
                if (result.fb != null) {
                    that.tinyGfw = result.fb;
                } else that.tinyGfw = "$fb";

                console.log("Carl 395: in setDefaultValue tinyGfw = ", that.tinyGfw);
                var filename1 = (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "_" + d.getHours() + "t" + d.getMinutes() + "t" + d.getSeconds() + "_tinyG_" + that.tinyGfw + ".conf");

                var defaultfileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value = filename1;
            });
        },
        parseConfigParamFile: function () {
            // This parsing build on a Python script from Google tinyG Groups - credit: Scott Carlsen
            // This parsing is based on the reverse engineered structure of $$ response from tinyG and tinyG2
            // Lines in file with no integer or float numbers found using !(isNaN) will be skipped (--> no 'text' parameter values)
            // Parsing is triggered looking left to right for a parameter value (integer or float)
            // If a line contaings a valid parameter, it is assumed to begin with ^["command"] 
            // Parameters that are ReadOnly in tinyG are filtered by the command_filter string
            // Lines in file starting in Col[0] with '//' will be ignored --> "^//This is a comment 1.0" will be ignored as a comment
            // Lines with //mycomment anywhere to the right of the parameter value will be parsed and command sent
            //
            command_filter = ['fb', 'fv', 'hp', 'hv', 'id', 'ej', 'jv', 'js', 'baud']; //$id self filters -> the parameter filed is non-numeric and not found  with isNaN()
            countCmd = 0; //confCmds to be sent
            countFlt = 0; //confCmds filtered (RO, otherwise)
            commentPat = /^\/\//; // RegExp search for // at front of line == Comment Line
            confVal = [];
            confName = "parm";
            confCmd = ["param", "value"];
            cmdDownList = [confCmd]; //Parse leaves an array of cmd,param pairs here ready for download to tinyG

            configFileToUpload = document.getElementById("inputTextToSaveRestore").value; //the HTML defined work area
            //python: for line in confFile {
            cmdArray = configFileToUpload.split(/\x0A/); // convert work are to array of lines (nl=0x0A)
            for (i = 0; i < cmdArray.length; i++) { //parse each line for cmd, parameter pairs
                confLine = cmdArray[i].split(" "); //yields an array of elements separated by ' '
                //typical confline:[baud] USB baud rate              5 [1=9600,2=19200,3=38400,4=57600,5=115200,6=230400]
                //  confline.split:[baud],USB,baud,rate,,,,,,,,,,,,,,5,[1=9600,2=19200,3=38400,4=57600,5=115200,6=230400]    
                foundVal = false;
                //pythonfor confVal in confLine {
                console.log("confLine:", confLine);
                for (j = 0; j < confLine.length; j++) {
                    if (commentPat.test(confLine[0])) { //first two charters on line are commentPatt
                        j = confLine.length; //This is a comment line, skip it
                    } else if (!isNaN(confLine[j]) && !foundVal && confLine[j] !== "") { //isNaN("") returns false, must manually skip nulls in array
                        foundVal = true;
                        console.log("confLine[j]=", confLine[j], "isNaN():", isNaN(confLine[j]), "foundVal:", foundVal);
                        console.log("found parameter at j=", j, "in line i=", i);
                        confName = (confLine[0].match(/\x5B(.*)\x5D/)).slice(1); //extract characters between [] in first element of array confLine
                        console.log("confName=", confName);
                        if (command_filter.indexOf(confName[0]) == -1) { //-1 means not on filter list ; Must use confName[0]
                            confCmd = [(confName[0]), (confLine[j].trim())];
                            cmdDownList[countCmd] = confCmd;
                            console.log("confCmd added to Send queue:", cmdDownList[countCmd]);
                            countCmd += 1;
                        } else {
                            console.log("command_filter.indexOf(confName)=", command_filter.indexOf(confName));
                            console.log("Filtered:", confName);
                            countFlt += 1;
                        }
                    }
                }
            }
        },
        cjmsendConfig: function (cfg, timeout) {
            //            console.log(JSON.stringify(cfg));
            // The setTimeout() method will wait the specified number of milliseconds, and then execute the specified function.
            setTimeout(chilipeppr.publish("/com-chilipeppr-widget-serialport/send", cfg.concat("\n")), timeout);
        },
        // cjm code paste end        
        processConfigReport: function (report, panel) {
            this.readTinyG = true;
            for (var prop in report) {
                var idName = "#" + prop;
                var v = panel.find(idName);
                if (v !== null) v.val(report[prop]);
            }
        },
        forkSetup: function () {
            var topCssSelector = '#com-chilipeppr-widget-backuprestoretinyg';

            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 200,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });

            var that = this;
            chilipeppr.load("http://raw.githubusercontent.com/chilipeppr/widget-pubsubviewer/master/auto-generated-widget.html", function() {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($('#com-chilipeppr-widget-backuprestoretinyg .modal-header .dropdown-menu'), that);
                });
            });

        },
    }
    // This is the working version at http://jsfiddle.net/cmcgrath5035/f7kk0che/39 on 2/5/15 
    // This code was set as Base http://jsfiddle.net/cmcgrath5035/f7kk0che/ on 2/5/15
    // After major debug, Download now working and report written to textbox.
    // ToDO : split into two tabs , get delayed writes working so that instrumentation works.
    // Now with additions for verification and timing revisions 41 and beyond
    // Bulk of Kevin's Code removed revision 42 and beyond
    // Revision 45 set as new base 2Feb2015 7:21 EST
    // Revisions beyond 47 will change widget name to backuprestoretinyg
    //Set as base for revision 49 Now Rev v0.33
    //Set as base for revision 62 Now Rev v0.4
    //Set as base for revision 65 Now Rev v0.42
    //Now revision 66, implement json vased reliable write
    //Now revision 70, json based reliable write working
    //Now revision 71, responseTime now working
    //Now revision 78, added fb to default name
    //Now revision 81, clean up close and GUI
    //Rev 82 set as base, all functionality ready for beta test
    //Rev 85 set as base,ver 0.51 add baud to filter list
});