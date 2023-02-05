import express, { Request, Response } from "express";
import CpfValidator from "./CpfValidator";
import Order from "./Order";

const app = express();
app.use(express.json())

interface CustomRequest<T> extends Request {
    body: T
}

app.post("/checkout", function(req: CustomRequest<Order>, res: Response) {
    const data: Order = req.body;
    // console.log(data.)
    if (!CpfValidator.validate(data.cpf))
        res.json({message: "CPF Invalido"})
    let order = new Order(data.cpf, data.items, data.coupons);
    console.log(order);
    let output = {valor: order.getTotal()};
    res.json(output);
});

app.listen(3000);