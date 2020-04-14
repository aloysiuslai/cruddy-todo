const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => { //If not found, err = true. Else fileData = true or exist
    if (err) {
      // we don't want readFile to end with an error
      // so instead, change count 0.
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      error('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (cb) => {

  readCounter((err, count) => {
    if (err) {
      Error('Cannot Read')
    } else {
       count++
    }
    // err = null, count = 0
    // increment count here if success?
    // count++
    writeCounter(count, (err, counterString)=> {
      if (err) {
        Error('Cannot Write')
      } else {
        cb(null, counterString);
      }
    })
  })

  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
};

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');

// console.log(zeroPaddedNumber(2))