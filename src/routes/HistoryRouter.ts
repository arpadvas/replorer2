import {Router, Request, Response, NextFunction} from 'express';
import {History, IHistoryModel} from '../schemas/history';

export class HistoryRouter {
  router: Router

  /**
   * Initialize the HistoryRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all History.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
      History.find( { }, (err, history: IHistoryModel) => {
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
        res.json( {history: history} );
      });
  }

  public addEntry(req: Request, res: Response, next: NextFunction) {
      if (req.body.keyword) {
        let entry = new History({ keyword: req.body.keyword });
        entry.save((err) => {
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
      } else {
          res.json({ message: 'Keyword has not been provided!' });
      }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.post('/add', this.addEntry);
  }

}

// Create the HistoryRouter, and export its configured Express.Router
const historyRoutes = new HistoryRouter();
historyRoutes.init();

export default historyRoutes.router;