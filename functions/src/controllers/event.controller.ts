import {Router} from 'express';

import {EventService} from '../services/event.service';
import { read } from 'fs';

const Busboy = require('busboy');

export class EventController {

	public getRouter(): Router {
		return require('express').Router()
			.post(
				'', async (request: any, response: any) => {
					const busboy = new Busboy({headers: request.headers});

					const fields: any = {};

					// This code will process each non-file field in the form.
					busboy.on('field', (fieldname: any, val: any) => {
						if (["runways", "info"].includes(fieldname)) {
							fields[fieldname] = JSON.parse(val);
						} else {
							fields[fieldname] = val;
						}
					});

					const files: any = [];

					// This code will process each file uploaded.
					busboy.on('file', async (fieldname: any, file: any, filename: string, transferEncoding: string, mimeType: string) => {

						let buffer: any[] = [];
						const extension = filename.match('.[^.]+$') !== null ? filename.match('.[^.]+$')![0] : '';

						const filePromise = new Promise((resolve, reject) => {
								file.on('data', function (d: any) {
									buffer.push(d);
								});
								file.on('end', function () {
									resolve(Buffer.concat(buffer));
								});
							}
						);

						files.push({fieldName: fieldname, filePromise: filePromise, extension: extension, mimeType: mimeType});
					});

					busboy.on('finish', async () => {

						const event = await EventService.create(fields, files).catch((error: any) => {
							console.log(error.stack);
							response.status(500).send(error);
						});

						response.status(201).send(event);
					});

					busboy.end(request.rawBody);
				})
			.put(
				'', async (request: any, response: any) => {
					const busboy = new Busboy({headers: request.headers});

					const fields: any = {};

					// This code will process each non-file field in the form.
					busboy.on('field', (fieldname: any, val: any) => {
						if (["runways", "info"].includes(fieldname)) {
							fields[fieldname] = JSON.parse(val);
						} else {
							fields[fieldname] = val;
						}
					});

					const files: any = [];

					// This code will process each file uploaded.
					busboy.on('file', async (fieldname: any, file: any, filename: string, transferEncoding: string, mimeType: string) => {

						let buffer: any[] = [];
						const extension = filename.match('.[^.]+$') !== null ? filename.match('.[^.]+$')![0] : '';

						const filePromise = new Promise((resolve, reject) => {
								file.on('data', function (d: any) {
									buffer.push(d);
								});
								file.on('end', function () {
									resolve(Buffer.concat(buffer));
								});
							}
						);

						files.push({fieldName: fieldname, filePromise: filePromise, extension: extension, mimeType: mimeType});
					});

					busboy.on('finish', async () => {

						const event = await EventService.update(fields, files).catch((error: any) => {
							console.log(error.stack);
							response.status(500).send(error);
						});

						response.status(200).send(event);
					});

					busboy.end(request.rawBody);
				})
			.delete('/:id', async (request: any, response: any) => {
				const id = request.params.id;

				await EventService.delete(id)
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
