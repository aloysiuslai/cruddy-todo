const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
  counter.getNextUniqueId((err, id) => {
    if (err) {
      callback(error);
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err)=>{
        if (err) {
          Error('Cannot Write')
        } else {

          callback(null, {id, text})
          // items.id = id;
          // items.text = text;
          // callback(null, items)
          // console.log({id, text});
        }
      })
    }
  })
};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
  // For now, we need to build a list of ids
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      Error('Cannot ReadAll')
    } else {
      // console.log(files);
      callback(null, files);
    }
  })
};

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
  fs.readFile(`${exports.dataDir}/${id}.txt`,'utf8', (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      // console.log(fileData)
      callback(null, {id: id, text: fileData});
    }
  })
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  fs.readFile(`${exports.dataDir}/${id}.txt`,'utf8', (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err)  {
          error('Cannot Update')
        } else {
          callback(null, {id, text})
        }
      })
    }
  })
};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }

  fs.readFile(`${exports.dataDir}/${id}.txt`,'utf8', (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.unlink(`${exports.dataDir}/${id}.txt`, (err) => {
        if (err)  {
          error('Cannot Delete')
        } else {
          callback(err); //err parameter isnt really needed. No difference with callback();
        }
      })
    }
  })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
