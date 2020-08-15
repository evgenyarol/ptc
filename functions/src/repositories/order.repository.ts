import {Connections} from '../utils/connections';
import {Profile} from '../models/profile.model';
import {Event} from '../models/event.model';
import {Order} from '../models/order.model';

const ORDERS_COLLECTIONS = 'orders';

export class OrderRepository {

	public static async create(data: any): Promise<Order> {
		data.id = (await this.getCollection().add(data)).id;

		return data;
	}

	public static async getById(id: string): Promise<Order> {
		const order = (await this.getCollection().doc(id).get()).data();

		return {id, ...order};
	}

	public static async getAll(): Promise<Order[]> {
		const res: Order[] = [];
		await this.getCollection().get()
			.then((snapshot: any) => {
				snapshot.forEach((doc: any) => {
					res.push({id: doc.id, ...doc.data()})
				});
			});
		return res;
	}
	public static async getByUserId(userid: string): Promise<Order[]> {
		const res: Order[] = []
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

	public static async update(id: string, order: any): Promise<Order> {

		await this.getCollection().doc('' + id).update({...order});

		return {id, ...order};
	}

	public static async delete(id: any): Promise<void> {
		await this.getCollection().doc(id).delete();
	}

	private static getCollection(): any {
		return Connections.dbConnection.collection(ORDERS_COLLECTIONS);
	}

}
