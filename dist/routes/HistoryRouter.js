"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var history_1 = require("../schemas/history");
var HistoryRouter = (function () {
    /**
     * Initialize the HistoryRouter
     */
    function HistoryRouter() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all History.
     */
    HistoryRouter.prototype.getAll = function (req, res, next) {
        history_1.History.find({}, function (err, history) {
            //   if (err) {
            //       res.json({ message: 'Could not find any history entry. Error:', err });
            //   } else {
            //       res.json( {history: history} );
            //   }
            if (err) {
                return next(err);
            }
            if (!history) {
                return next(new Error('Could not find any history entry.'));
            }
            res.json({ history: history });
        });
    };
    HistoryRouter.prototype.addEntry = function (req, res, next) {
        if (req.body.keyword) {
            var entry = new history_1.History({ keyword: req.body.keyword });
            entry.save(function (err) {
                // if (err) {
                //     res.json({ message: 'Could not save history entry. Error:', err });
                // } else {
                //     res.json({ message: 'History entry has been saved.' });
                // }
                if (err) {
                    return next(err);
                }
                res.json({ message: 'History entry has been saved.' });
            });
        }
        else {
            res.json({ message: 'Keyword has not been provided!' });
        }
    };
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    HistoryRouter.prototype.init = function () {
        this.router.get('/', this.getAll);
        this.router.post('/add', this.addEntry);
    };
    return HistoryRouter;
}());
exports.HistoryRouter = HistoryRouter;
// Create the HistoryRouter, and export its configured Express.Router
var historyRoutes = new HistoryRouter();
historyRoutes.init();
exports.default = historyRoutes.router;
