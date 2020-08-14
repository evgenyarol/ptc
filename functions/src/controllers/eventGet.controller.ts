import { Router } from 'express';

import { EventService } from '../services/event.service';


export class EventGetController {

	public getRouter(): Router {
		return require('express').Router()
			.get(
				'', async (request: any, response: any) => {
					await EventService.getAll()
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

					await EventService.getById(id)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})

	}
}
