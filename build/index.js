"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
// initialize configuration
dotenv_1.default.config();
var PORT = process.env.PORT || 8001;
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/:id', function (req, res) {
    console.log(req.params.id);
    res.send('<h1>Hi there!</h1>');
});
app.listen(PORT, function () {
    console.log('App started on port ', PORT);
});
