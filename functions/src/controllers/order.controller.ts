import { Router } from 'express';

import { OrderService } from '../services/order.service';

export class OrderController {

	public getRouter(): Router {
		return require('express').Router()
			.post(
				'', async (request: any, response: any) => {
					const order = request.body;

					await OrderService.create(order)
						.then((result) => {
							response.status(201).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
			.get(
				'', async (request: any, response: any) => {
					await OrderService.getAll()
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
			.get(
				'/:id', async (request: any, response: any) => {
					const id = request.params.id;

					await OrderService.getById(id)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
			.get(
				'/user/:userid', async (request: any, response: any) => {
					const userid = request.params.userid;

					await OrderService.getByUserId(userid)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(404).send("No User");
						});
				})
			.put(
				'', async (request: any, response: any) => {
					const order = request.body;

					await OrderService.update(order)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
	}

}
