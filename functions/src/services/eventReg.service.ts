import { EventService } from './event.service';
import { ProfileService } from './profile.service';
import {EventRegistration} from '../models/eventReg.model';
import {EventRegistrationRepository} from '../repositories/eventReg.repository';

export class EventRegistrationService {

	public static async create(eventReg: any): Promise<any> {
		eventReg.createdAt = Date.now();

		const SaveEventReg = await EventRegistrationRepository.create(eventReg);

		return SaveEventReg;
	}

	public static async getById(id: string): Promise<any> {
		const eventReg: any = await EventRegistrationRepository.getById(id);

		eventReg.user = await ProfileService.getByIdWithoutSubUsers(eventReg.userId);
		eventReg.eventName = (await EventService.getById(eventReg.eventId)).name;

		return eventReg;
	}

	public static async getByUserId(userid: string): Promise<any> {
		const eventReg: any = await EventRegistrationRepository.getByUserId(userid);

		return eventReg;
	}


	public static async getAll(): Promise<EventRegistration[]> {
		const orders: any[] = await EventRegistrationRepository.getAll();


		return orders;
	}

	public static async update(eventReg: any): Promise<EventRegistration | null> {
		const {subUsers, id, ...parent} = eventReg;

		await EventRegistrationRepository.update(id, parent);


		for (let subUser of subUsers) {
			const {id, ...subUserData} = subUser;

			if (id) {
				await EventRegistrationRepository.update(id, subUserData);
				continue;
			}

			subUser.createdAt = Date.now();
			subUser.parentId = parent.id;
			const updatedSubUser = await this.createProfile(subUser);
			subUser.id = updatedSubUser.id;
		}

		return eventReg;
	}

	public static async delete(id: string): Promise<void> {
		const eventReg = await this.getById(id);

		if (eventReg.parentId) {
			await EventRegistrationRepository.delete(id);
			return;
		}

		for (let subUser of eventReg.subUsers) {
			await EventRegistrationRepository.delete(subUser.id);
		}

		await EventRegistrationRepository.delete(id);
	}

	private static async createProfile(eventReg: EventRegistration): Promise<EventRegistration> {
		const {id, ...eventRegData} = eventReg;

		return await EventRegistrationRepository.create(eventRegData);
	}

}
