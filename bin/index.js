#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var open = require("open");
var extract_1 = require("./extract");
var arc_1 = require("./arc");
var cascade_1 = require("./cascade");
var graphviz_1 = require("./graphviz");
var mermaid_1 = require("./mermaid");
var helper_1 = require("./helper");
var myArgs = process.argv.slice(2);
// include .ts and .tsx files
// const onlyTypescript: string[] = myArgs.filter(file => file.endsWith('ts'));
var onlyTypescript = myArgs.filter(function (file) { return file.endsWith('ts') || file.endsWith('tsx'); });
var withoutNodeModules = onlyTypescript.filter(function (file) { return !file.includes('node_modules'); });
if (withoutNodeModules.length) {
    console.log(withoutNodeModules);
    var inquirer = require('inquirer');
    inquirer
        .prompt([{
            type: 'confirm',
            name: 'want',
            message: 'Are these the files you want to analyze?',
            "default": true
        }])
        .then(function (answer) {
        if (answer.want) {
            proceed();
        }
    });
}
else {
    helper_1.showHelpMessage();
}
/**
 * If user confirms the files they want to analyze, proceed
 */
function proceed() {
    var functions = extract_1.processFiles(withoutNodeModules);
    startServer(functions.all, functions.called);
}
/**
 * Start Express server with static files and API endpoints
 * @param functionMap
 */
function startServer(allFunctions, functionMap) {
    var express = require('express');
    var app = express();
    var path = require('path');
    app.use(express.static(path.join(__dirname, '..', 'graphing')));
    app.use('/arc', express.static(path.join(__dirname, '..', 'graphing/arc')));
    app.use('/cascade', express.static(path.join(__dirname, '..', 'graphing/cascade')));
    app.use('/graphviz', express.static(path.join(__dirname, '..', 'graphing/graphviz')));
    app.use('/mermaid', express.static(path.join(__dirname, '..', 'graphing/mermaid')));
    app.use('/vendor', express.static(path.join(__dirname, '..', 'graphing/vendor')));
    // API endpoints
    app.use('/all', function (req, res) { res.json(allFunctions); });
    app.get('/arcAPI', function (req, res) { res.json(arc_1.convertForArc(allFunctions, functionMap)); });
    app.get('/cascadeAPI/:startFunc', function (req, res) {
        res.json(cascade_1.convertForCascade(functionMap, req.params.startFunc));
    });
    app.get('/graphvizAPI', function (req, res) { res.json(graphviz_1.convertForGraphViz(functionMap)); });
    app.get('/mermaidAPI', function (req, res) { res.json(mermaid_1.convertForMermaid(functionMap)); });
    app.listen(3210);
    var filePath = 'http://localhost:3210';
    helper_1.showServerRunning(filePath);
    open(filePath);
}
