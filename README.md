# com-chilipeppr-widget-backuprestoretinyg
This widget does backup and restore of TinyG Configurations to/from PC file

![alt text](screenshot.png "Screenshot")

## ChiliPeppr Widget / Backup and Restore TinyG

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-widget-backuprestoretinyg |
| Name                  | Widget / Backup and Restore TinyG |
| Description           | This widget does backup and restore of TinyG Configurations to/from PC file |
| chilipeppr.load() URL | https://raw.githubusercontent.com/chilipeppr/widget-backuprestoretinyg/master/auto-generated-widget.html |
| Edit URL              | (Local dev. No edit URL) |
| Github URL            | https://github.com/chilipeppr/widget-backuprestoretinyg |
| Test URL              | http://localhost:9003/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget 
inside a workspace or from another widget. The key is that you need to load 
your widget inlined into a div so the DOM can parse your HTML, CSS, and 
Javascript. Then you use cprequire() to find your widget's Javascript and get 
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivWidgetBackuprestoretinyg"><' + '/div>');

chilipeppr.load(
  "#myDivWidgetBackuprestoretinyg",
  "https://raw.githubusercontent.com/chilipeppr/widget-backuprestoretinyg/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivWidgetBackuprestoretinyg
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-widget-backuprestoretinyg"], // the id you gave your widget
      function(myObjWidgetBackuprestoretinyg) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Widget / Backup and Restore TinyG just got loaded.", myObjWidgetBackuprestoretinyg);
        myObjWidgetBackuprestoretinyg.init();
      }
    );
  }
);

```

## Publish

This widget/element publishes the following signals. These signals are owned by this widget/element and are published to all objects inside the ChiliPeppr environment that listen to them via the 
chilipeppr.subscribe(signal, callback) method. 
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-pub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Subscribe

This widget/element subscribes to the following signals. These signals are owned by this widget/element. Other objects inside the ChiliPeppr environment can publish to these signals via the chilipeppr.publish(signal, data) method. 
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-sub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Foreign Publish

This widget/element publishes to the following signals that are owned by other objects. 
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignpub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>/com-chilipeppr-widget-backuprestoretinyg/com-chilipeppr-widget-serialport/send</td><td>Update this for backuprestoretinyg</td></tr>    
      </tbody>
  </table>

## Foreign Subscribe

This widget/element publishes to the following signals that are owned by other objects.
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignsub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>/com-chilipeppr-widget-backuprestoretinyg/com-chilipeppr-widget-serialport/recvline</td><td>Update this for backuprestoretinyg</td></tr>    
      </tbody>
  </table>

## Methods / Properties

The table below shows, in order, the methods and properties inside the widget/element.

  <table id="com-chilipeppr-elem-methodsprops" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Method / Property</th>
              <th>Type</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-widget-backuprestoretinyg"</td></tr><tr valign="top"><td>url</td><td>string</td><td>"https://raw.githubusercontent.com/chilipeppr/widget-backuprestoretinyg/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"(Local dev. No edit URL)"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"https://github.com/chilipeppr/widget-backuprestoretinyg"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://localhost:9003/widget.html"</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Widget / Backup and Restore TinyG"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"This widget does backup and restore of TinyG Configurations to/from PC file"</td></tr><tr valign="top"><td>publish</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>subscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>foreignPublish</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>foreignSubscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>isInitted</td><td>boolean</td><td></td></tr><tr valign="top"><td>readTinyG</td><td>boolean</td><td></td></tr><tr valign="top"><td>okToClose</td><td>boolean</td><td></td></tr><tr valign="top"><td>cjmDownloadRunning</td><td>boolean</td><td></td></tr><tr valign="top"><td>init</td><td>function</td><td>function () </td></tr><tr valign="top"><td>show</td><td>function</td><td>function () </td></tr><tr valign="top"><td>hide</td><td>function</td><td>function ()  //Executed on close</td></tr><tr valign="top"><td>btnSetup</td><td>function</td><td>function () </td></tr><tr valign="top"><td>closeDialog</td><td>function</td><td>function () </td></tr><tr valign="top"><td>saveTextAsFile</td><td>function</td><td>function () </td></tr><tr valign="top"><td>destroyClickedElement</td><td>function</td><td>function (event) </td></tr><tr valign="top"><td>loadFileAsText</td><td>function</td><td>function () </td></tr><tr valign="top"><td>downloadTinyGconfigs</td><td>function</td><td>function () </td></tr><tr valign="top"><td>sendDataElement</td><td>function</td><td>function (index) </td></tr><tr valign="top"><td>sendCommandGetResponse</td><td>function</td><td>function (cmd, timeout) </td></tr><tr valign="top"><td>cmdVerify</td><td>function</td><td>function (cmd, sendVal, recvVal, sendTime, recvTime, isVerified, respTime) </td></tr><tr valign="top"><td>dispArray</td><td>function</td><td>function () </td></tr><tr valign="top"><td>saveTextAsFile_Restore</td><td>function</td><td>function () </td></tr><tr valign="top"><td>uploadTinyGconfigs</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onRecvCmdcjm</td><td>function</td><td>function (recvline) </td></tr><tr valign="top"><td>getAllParametersFromTinyG</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setDefaultValue</td><td>function</td><td>function () </td></tr><tr valign="top"><td>parseConfigParamFile</td><td>function</td><td>function () </td></tr><tr valign="top"><td>cjmsendConfig</td><td>function</td><td>function (cfg, timeout) </td></tr><tr valign="top"><td>processConfigReport</td><td>function</td><td>function (report, panel) </td></tr><tr valign="top"><td>forkSetup</td><td>function</td><td>function () </td></tr>
      </tbody>
  </table>


## About ChiliPeppr

[ChiliPeppr](http://chilipeppr.com) is a hardware fiddle, meaning it is a 
website that lets you easily
create a workspace to fiddle with your hardware from software. ChiliPeppr provides
a [Serial Port JSON Server](https://github.com/johnlauer/serial-port-json-server) 
that you run locally on your computer, or remotely on another computer, to connect to 
the serial port of your hardware like an Arduino or other microcontroller.

You then create a workspace at ChiliPeppr.com that connects to your hardware 
by starting from scratch or forking somebody else's
workspace that is close to what you are after. Then you write widgets in
Javascript that interact with your hardware by forking the base template 
widget or forking another widget that
is similar to what you are trying to build.

ChiliPeppr is massively capable such that the workspaces for 
[TinyG](http://chilipeppr.com/tinyg) and [Grbl](http://chilipeppr.com/grbl) CNC 
controllers have become full-fledged CNC machine management software used by
tens of thousands.

ChiliPeppr has inspired many people in the hardware/software world to use the
browser and Javascript as the foundation for interacting with hardware. The
Arduino team in Italy caught wind of ChiliPeppr and now
ChiliPeppr's Serial Port JSON Server is the basis for the 
[Arduino's new web IDE](https://create.arduino.cc/). If the Arduino team is excited about building on top
of ChiliPeppr, what
will you build on top of it?

