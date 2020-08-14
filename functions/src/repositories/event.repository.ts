import {Connections} from '../utils/connections';
import {Profile} from '../models/profile.model';
import {Event} from '../models/event.model';

const EVENTS_COLLECTIONS = 'events';

export class EventRepository {

	public static async create(data: any): Promise<Event> {
		data.id = (await this.getCollection().add(data)).id;

		return data;
	}

	public static async getById(id: string): Promise<Event> {
		const event = (await this.getCollection().doc(id).get()).data();

		event.id = id;

		return event;
	}

	public static async getAll(): Promise<Event[]> {
		const res: Event[] = [];
		await this.getCollection().get()
			.then((snapshot: any) => {
				snapshot.forEach((doc: any) => {
					res.push({id: doc.id, ...doc.data()})
				});
			});
		return res;
	}

	public static async update(id: string, eventData: any): Promise<Event> {

		await this.getCollection().doc('' + id).update({...eventData});

		return {id, ...eventData};
	}

	public static async delete(id: any): Promise<void> {
		await this.getCollection().doc(id).delete();
	}

	private static getCollection(): any {
		return Connections.dbConnection.collection(EVENTS_COLLECTIONS);
	}

}
