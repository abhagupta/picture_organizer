var fs = require("fs");
var mkdirp = require("mkdirp")
var fileUtils = require("./fileUtils")
var argv = require('yargs').argv
var rootPath =   argv.s;    //'/Users/agupt13/Didi_Camera_San_Fransisco';
var defaultNewPath = argv.t;   //'/Users/agupt13/Pictures_new/';


if(rootPath !=undefined && defaultNewPath !=undefined ){
    fileUtils.organizeDir(rootPath)
}else{
    console.log("Missing Parameter for source or target folder");
}


