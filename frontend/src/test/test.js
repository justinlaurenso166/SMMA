jest.useFakeTimers();
const axios = require("axios")
const functions = require("./function")
const Dump = require("./dump");
const TestAddJenisMesin = require("./addjenismesin_test");
const TestEditJenisMesin = require("./editjenismesin_test");
const TestEditDetailMesin = require("./editdetailmesin_test");

jest.mock("axios")

//Test case novia
TestAddJenisMesin();

//Test case Justin
TestEditJenisMesin();

//Test Case vartin
TestEditDetailMesin();

//Dump
// Dump();