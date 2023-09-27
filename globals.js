// const { fileURLToPath } = require('url');

// const MongoClient = require('mongodb').MongoClient,
//     fs = require("fs"),
//     mongoDBurl = '' + (fs.readFileSync('conf/dbconf.txt', 'utf8')).trim(),
//     mongoOption = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     },
//     async = require("async");

// function excludeus(excluders, data, _cb) {
//     if (excluders.length > 0) {
//         if (Array.isArray(data)) {
//             data.forEach((r, i) => {
//                 excluders.forEach(e => {
//                     delete r[e];
//                 });
//                 if (i + 1 >= data.length) {
//                     return _cb(data);
//                 }
//             });
//         } else {
//             excluders.forEach(e => {
//                 delete data[e];
//             });
//         }
//     } else {
//         return _cb(data);
//     }
// }

// module.exports = {
//     groupBy: function (xs, key) {
//         return xs.reduce(function (rv, x) {
//             (rv[x[key]] = rv[x[key]] || []).push(x);
//             return rv;
//         }, {});
//     },
//     valuesExclude: function (excluders, data, _cb) {
//         return excludeus(excluders, data, _cb);
//     },
//     getdtstamp: function () {
//         let ddf = new Date();
//         return { date: `${ddf.getDate() < 10 ? "0" + ddf.getDate() : ddf.getDate()}/${(ddf.getMonth() + 1) < 10 ? "0" + (ddf.getMonth() + 1) : (ddf.getMonth() + 1)}/${ddf.getFullYear()}`, time: `${ddf.getHours() < 10 ? "0" + ddf.getHours() : ddf.getHours()}:${ddf.getMinutes() < 10 ? "0" + ddf.getMinutes() : ddf.getMinutes()}:${ddf.getSeconds() < 10 ? "0" + ddf.getSeconds() : ddf.getSeconds()}` };
//     },
//     get_counter: function (dataBase, dataTable, counterField, _cb) {
//         //db.all_surveys.find().projection({sn:1,_id:0}).sort({sn:-1}).limit(1)
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//             let prj = {};
//             prj[counterField] = -1;
//             prj["_id"] = 0;

//             let srt = {};
//             srt[counterField] = 1;
//             db.db(dataBase).collection(dataTable).aggregate({ $group: { _id: null, "snocounter": { $max: "$snocounter" } } }).toArray(function (err, result) {
//                 if (err) throw err;
//                 db.close();
//                 if (result && result.length > 0) {
//                     return _cb(result[result.length - 1][counterField]);
//                 } else {
//                     return _cb("");
//                 }
//             });
//         });
//     },
//     fetch_data: function (dataBase, dataTable, query, sort, limit, excludefields, _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//             let excluders = {
//                 _id: 0
//             }
//             excludefields.forEach(e => {
//                 excluders[e] = 0;
//             });

//             db.db(dataBase).collection(dataTable).find(query, {
//                 projection: excluders
//             }).sort(sort).limit(limit).toArray(function (err, result) {
//                 if (err) throw err;
//                 db.close();
//                 return _cb(result);
//             });
//         });
//     },
//     fetch_data_by_group: function (dataBase, dataTable, matches, groupby, sort, limit, excludefields, _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//             let excluders = {
//                 _id: 0
//             }
//             excludefields.forEach(e => {
//                 excluders[e] = 0;
//             });

//             db.db(dataBase).collection(dataTable).aggregate({ $match: matches }, { $group: { _id:`$${groupby}`, "data": { "$last": "$$ROOT" }} },{$project:{_id:0}}).toArray(function (err, result) {
//                 if (err) throw err;
//                 db.close();
//                 return _cb(result);
//             });
//         });
//     },
//     count_data: function (dataBase, dataTable, query, _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }

//             db.db(dataBase).collection(dataTable).countDocuments(query, {}, function (err, result) {
//                 if (err) throw err;
//                 db.close();
//                 return _cb(result);
//             });
//         });
//     },
//     field_sum_data: function (dataBase, dataTable, fields, groupbyfield, _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }

//             let query = [];
//             let $match = {};
//             let $group = { _id: '' };
//             let $project = { _id: 0 };

//             if (groupbyfield) {
//                 // let ids = {};
//                 // ids = `$${groupbyfield}`;
//                 $group._id = `$${groupbyfield}`; //ids
//                 $project._id = 1;
//             }

//             fields.forEach(f => {
//                 $match[f] = {
//                     "$exists": true,
//                     "$ne": ""
//                 };

//                 $group[f] = { $sum: { $toInt: `$${f}` } };
//                 $project[f] = 1;
//             });

//             query = [
//                 {
//                     "$match": $match
//                 },
//                 {
//                     $group
//                 },
//                 {
//                     $project: $project
//                 }
//             ];

//             db.db(dataBase).collection(dataTable).aggregate(query).toArray(function (err, result) {
//                 if (err) throw err;
//                 db.close();
//                 return _cb(result);
//             });
//         });
//     },
//     //ok
//     //run kar
//     update_data: function (dataBase, dataTable, query, dataobj, excludefields = [], _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
           
//             db.db(dataBase).collection(dataTable).findOneAndUpdate(query, { $set: dataobj }, { returnOriginal: false }, function (err, result) {
//                 if (err) throw err;
//                 db.close();
//                 excludeus(excludefields, result.value, function (resval) {
//                     return _cb(resval);
//                 })
//             });
//         });
//     },

//     update_multiple_data: function (dataBase, dataTable, query, dataobj, excludefields = [], _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//             db.db(dataBase).collection(dataTable).updateMany(query, { $set: dataobj }, { returnOriginal: false }, function (err, result) {
//                 if (err) throw err;
//                 db.close();
//                 excludeus(excludefields, result.value, function (resval) {
//                     return _cb(resval);
//                 })
//             });
//         });
//     },

//     create_data: function (dataBase, dataTable, dataobj, excludefields = [], _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//             excludeus(excludefields, dataobj, function (datao) {
//                 db.db(dataBase).collection(dataTable).insertOne(datao, function (err, result) {
//                     if (err) throw err;
//                     db.close();
//                     return _cb(result);
//                 });
//             })

//         });
//     },

//     delete_data: function(dataBase, dataTable, dataobj, excludefields = [],_cb){
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//             excludeus(excludefields, dataobj, function (datao) {
//                 db.db(dataBase).collection(dataTable).deleteOne(datao, function (err, result) {
//                     if (err) throw err;
//                     db.close();
//                     return _cb(result);
//                 });
//             })

//         });
//     },

//     delete_multiple_data: function(dataBase, dataTable, dataobj, excludefields = [],_cb){
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//             excludeus(excludefields, dataobj, function (datao) {
//                 db.db(dataBase).collection(dataTable).deleteMany(datao, function (err, result) {
//                     if (err) throw err;
//                     db.close();
//                     return _cb(result);
//                 });
//             })

//         });
//     },

//     create_Multiple_data: function (dataBase, dataTable, dataobj, excludefields = [], _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//                 db.db(dataBase).collection(dataTable).insertMany(dataobj, function (err, result) {
//                     if (err) throw err;
//                     db.close();
//                     return _cb(result);
//                 });
            
//         });
//     },
//     create_data_if_not_exists: function (dataBase, dataTable, query, dataobj, excludefields = [], _cb) {
//         MongoClient.connect(mongoDBurl, mongoOption, function (err, db) {
//             if (err) {
//                 throw err;
//             }
//             excludeus(excludefields, dataobj, function (datao) {
//                 db.db(dataBase).collection(dataTable).findOneAndUpdate(query, { $set: datao }, { returnOriginal: false, upsert: true }, function (err, result) {
//                     if (err) throw err;
//                     db.close();
//                     return _cb(result);
//                 });
//             })

//         });
//     }
// };
