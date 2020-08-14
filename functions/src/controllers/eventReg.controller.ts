import {Router} from 'express';

import {EventRegistrationService} from '../services/eventReg.service';

export class EventRegistrationController {

	public getRouter(): Router {
		return require('express').Router()
			.post(
				'', async (request: any, response: any) => {
					const eventReg = request.body;

					await EventRegistrationService.create(eventReg)
						.then((result) => {
							response.status(201).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
			.get(
				'', async (request: any, response: any) => {
					await EventRegistrationService.getAll()
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

					await EventRegistrationService.getById(id)
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
	
						await EventRegistrationService.getByUserId(userid)
							.then((result) => {
								response.status(200).send(result);
							})
							.catch((error) => {
								response.status(500).send(error);
							});
					})
			.put(
				'', async (request: any, response: any) => {
					const eventReg = request.body;

					await EventRegistrationService.update(eventReg)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
			.delete('/:id', async (request: any, response: any) => {
				const id = request.params.id;

				await EventRegistrationService.delete(id)
					.then(() =>
						response.status(200).send()
					)
					.catch((e) => {
						console.log(e.stack);
						response.status(500).send(e.message);
					})
			})
	}

}
