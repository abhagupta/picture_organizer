var fs = require("fs");
var mkdirp = require("mkdirp")
var argv = require('yargs').argv
var rootPath =   argv.s;    //'/Users/agupt13/Didi_Camera_San_Fransisco';
var defaultNewPath = argv.t;    //'/Users/agupt13/Pictures_new/';

module.exports = {
 organizeDir : function (path){
    processDirectory(path)
}

}

var processDirectory = function(path) {
    fs.readdir(path, function(err, files) {
        if (err) {
            return console.log(err);
        }

        files.forEach(function(file) {
            readFileStats(path, file);
        })

    });
}


function readFileStats(path, dirItem) {

    fs.stat(path + '/' + dirItem, function(err, stats) {
        if (stats && stats.isDirectory()) {
            processDirectory(path+"/"+dirItem)
        } else {
            var newPath = defaultNewPath + stats.mtime.getFullYear() + '/' + stats.mtime.getMonth();
            mkdirp(newPath, function(errFolder) {
                if (!errFolder) {
                    var newFileName = newPath + '/' + dirItem;
                    copyFile(path + '/' + dirItem, newFileName, function(err) {
                        if (!err) {
                            console.log("Copied successfully " + newFileName);
                        } else {
                            console.log("Failed" + newFileName + "with error :" + err);
                        }
                    })
                } else {
                    console.log("Failed" + newPath + "while creating folder :" + errFolder);
                }
            })
        }
    })

    return true;
}

function copyFile(source, target, cb) {
    var cbCalled = false;

    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        done(err);
    });
    wr.on("close", function(ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}


