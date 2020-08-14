import {Connections} from '../utils/connections';
import {EventRegistration} from '../models/eventReg.model';

const EVENTREGISTRATIONS_COLLECTIONS = 'eventregistrations';

export class EventRegistrationRepository {

	public static async create(data: any): Promise<EventRegistration> {
		data.id = (await this.getCollection().add(data)).id;

		return data;
	}

	public static async getById(id: string): Promise<EventRegistration> {
		const eventReg = (await this.getCollection().doc(id).get()).data();

		eventReg.id = id;

		return eventReg;
	}
	public static async getByUserId(userid: string): Promise<EventRegistration[]> {
		const res: EventRegistration[] = []
		await this.getCollection().where('userId', '==', userid).get()
		.then((snapshot: any) => {
			if (snapshot.empty) {
				throw new Error('EventRegistration was not found');
			}
			snapshot.forEach((doc: any) => {
				res.push({id: doc.id, ...doc.data()})
			  });
		})
		.catch((error: any) => {
			throw new Error(error.message);
		});
		return res;	
	}


	public static async getAll(): Promise<EventRegistration[]> {
		const res: EventRegistration[] = [];
		await this.getCollection().get()
			.then((snapshot: any) => {
				snapshot.forEach((doc: any) => {
					res.push({id: doc.id, ...doc.data()})
				});
			});
		return res;
	}

	public static async update(id: string, eventRegData: any): Promise<EventRegistration> {

		await this.getCollection().doc('' + id).update({...eventRegData});

		return {id, ...eventRegData};
	}

	public static async delete(id: any): Promise<void> {
		await this.getCollection().doc(id).delete();
	}

	private static getCollection(): any {
		return Connections.dbConnection.collection(EVENTREGISTRATIONS_COLLECTIONS);
	}

}
