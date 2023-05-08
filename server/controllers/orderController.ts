import { Request, Response } from 'express';
import orders from '../data/orders.json';
import users from '../data/users.json';

export function handleGetOrders(req: Request, res: Response): void {
  res.json(orders);
}

export function handlePatchOrder(req: Request, res: Response): Response | void {
  const { orderId } = req.params;
  const { body, user } = req;

  if (!orderId || !body) {
    return res.sendStatus(400);
  }

  const foundUser = users.find((u) => u.id === Number(user));
  if (!foundUser) {
    return res.sendStatus(500);
  }
  if (foundUser?.role !== 'admin') {
    return res.sendStatus(403);
  }

  const foundOrder = orders.find((order) => order.id === Number(orderId));
  if (!foundOrder) {
    return res.sendStatus(404);
  }

  Object.keys(body).forEach((prop) => {
    const value = body[prop];

    if (prop === 'status' && value === 'Выполнен') {
      if (foundOrder.status !== 'Выполнен') {
        foundOrder.status = 'Выполнен';
      }

      res.status(200).json(foundOrder);
    }
  });
}

export function handleDelete(req: Request, res: Response): Response {
  const { id } = req.params;
  const { user } = req;

  if (!id) {
    return res.sendStatus(400);
  }

  const foundUser = users.find((u) => u.id === Number(user));
  if (!foundUser) {
    return res.sendStatus(500);
  }
  if (foundUser?.role !== 'admin') {
    return res.sendStatus(403);
  }

  const foundIdx = orders.findIndex((order) => order.id === Number(id));
  if (foundIdx === -1) {
    return res.sendStatus(400);
  }

  orders.splice(foundIdx, 1);

  return res.sendStatus(200);
}

export function handleAddOrder(req: Request, res: Response): Response | void {
  const { body } = req;

  if (!body) {
    return res.sendStatus(400);
  }

  const lastId = orders.at(-1)?.id ?? 0;
  const newOrder = { id: lastId + 1, ...body };
  orders.push(newOrder);

  res.status(201).json(newOrder);
}
