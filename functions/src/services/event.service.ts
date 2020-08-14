import {EventRepository} from '../repositories/event.repository';
import {Event} from '../models/event.model';
import {FileService} from './file.service';

export class EventService {

	public static async create(event: any, files: any): Promise<any> {
		for (let file of files) {
			event[file.fieldName] = await FileService.getImageLink(file.filePromise, file.extension, file.mimeType);
		}

		event.ordersCount = 0;

		for (let field in event) {
			if (field.includes('[')) {
				let fieldName = field.substring(0, field.indexOf('['));
				let subFieldName = field.substring(field.indexOf('[') + 1, field.indexOf(']'))

				if (!event[fieldName]) {
					event[fieldName] = {};
				}

				event[fieldName][subFieldName] = event[field];
				delete event[field];
			}
		}

		return await EventRepository.create(event);
	}

	public static async getById(id: string): Promise<Event> {
		return await EventRepository.getById(id);
	}

	public static async getAll(): Promise<Event[]> {
		return await EventRepository.getAll();
	}

	public static async update(event: any, files: any): Promise<Event> {
		const {id, ...eventData} = event;

		const oldEvent = await this.getById(id);

		eventData.ordersCount = oldEvent.ordersCount ? oldEvent.ordersCount : 0;

		for (let file of files) {
			eventData[file.fieldName] = await FileService.getImageLink(file.filePromise, file.extension, file.mimeType);
		}

		for (let field in event) {
			if (field.includes('[')) {
				let fieldName = field.substring(0, field.indexOf('['));
				let subFieldName = field.substring(field.indexOf('[') + 1, field.indexOf(']'))

				if (!event[fieldName]) {
					event[fieldName] = {};
				}

				event[fieldName][subFieldName] = event[field];
				delete event[field];
			}
		}

		return await EventRepository.update(id, eventData);
	}

	public static async delete(id: string): Promise<void> {
		await EventRepository.delete(id);
	}

}
