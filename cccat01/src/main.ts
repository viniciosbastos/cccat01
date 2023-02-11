import express, { Request, Response } from "express";
import Checkout from "./Checkout";

const app = express();
app.use(express.json())

app.post("/checkout", function(req: Request, res: Response) {
    try {
        const checkout = new Checkout();
        const response = checkout.execute(req.body);
        res.json(response);
    } catch(e: any) {
        res.status(422).json({
            message: e.message
        })
    }
});

app.listen(3000);