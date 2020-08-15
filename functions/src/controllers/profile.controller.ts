import {Router} from 'express';

import {ProfileService} from '../services/profile.service';

export class ProfileController {

	public getRouter(): Router {
		return require('express').Router()
			.post(
				'', async (request: any, response: any) => {
					const profiles = request.body;

					await ProfileService.create(profiles)
						.then((result) => {
							response.status(201).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
				.post(
					'/subuser', async (request: any, response: any) => {
						const profiles = request.body;
						if (!request.body.parentId) {
							return response.status(404).send('No ParentId')
						}
	
						await ProfileService.createSubUsers(profiles)
							.then((result) => {
								response.status(201).send(result);
							})
							.catch((error) => {
								response.status(500).send(error);
							});
					})
			.get(
				'', async (request: any, response: any) => {
					await ProfileService.getAll()
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

					await ProfileService.getById(id)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
			.get(
				'/uid/:uid', async (request: any, response: any) => {
					const uid = request.params.uid;

					await ProfileService.getByUid(uid)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
			.get(
				'/phone/:phone', async (request: any, response: any) => {
					const phone = request.params.phone;

					await ProfileService.getByPhone(phone)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							console.log(error.stack)
							response.status(500).send(error.message);
						});
				})
			.put(
				'', async (request: any, response: any) => {
					const profile = request.body;

					await ProfileService.update(profile)
						.then((result) => {
							response.status(200).send(result);
						})
						.catch((error) => {
							response.status(500).send(error);
						});
				})
			.delete('/:id', async (request: any, response: any) => {
				const id = request.params.id;

				await ProfileService.delete(id)
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
