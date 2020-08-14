import {Connections} from '../utils/connections';
import {Profile} from '../models/profile.model';

const PROFILES_COLLECTIONS = 'profiles';

export class ProfileRepository {

	public static async create(data: any): Promise<Profile> {
		data.id = (await this.getCollection().add(data)).id;

		return data;
	}

	public static async getById(id: string): Promise<Profile> {
		const profile = (await this.getCollection().doc(id).get()).data();

		profile.id = id;

		return profile;
	}

	public static async getByParentId(parentId: string): Promise<Profile[]> {
		const subUsers: Profile[] = [];

		await this.getCollection().where('parentId', '==', parentId)
			.get()
			.then((snapshot: any) => {
				snapshot.forEach((doc: any) => {
					subUsers.push({ id: doc.id, ...doc.data() })
				});
			});

		return subUsers;
	}

	public static async getByUid(uid: string): Promise<Profile> {
		return await this.getCollection().where('uid', '==', uid)
			.get()
			.then((snapshot: any) => {
				if (snapshot.empty) {
					throw new Error('Profile was not found');
				}

				return {id: snapshot.id, ...snapshot.data()}
			})
			.catch((error: any) => {
				throw new Error(error.message);
			});
	}

	public static async getByPhone(phone: string): Promise<Profile[]> {
		const res: Profile[] = []
		await this.getCollection().where('phone', '==', phone).get()
		.then((snapshot: any) => {
			if (snapshot.empty) {
				throw new Error('Profile was not found');
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

	public static async getAll(): Promise<Profile[]> {
		const res: Profile[] = [];
		await this.getCollection().get()
			.then((snapshot: any) => {
				snapshot.forEach((doc: any) => {
					res.push({id: doc.id, ...doc.data()})
				});
			});
		return res;
	}

	public static async update(id: string, profileData: any): Promise<Profile> {

		await this.getCollection().doc('' + id).update({...profileData});

		return {id, ...profileData};
	}

	public static async delete(id: any): Promise<void> {
		await this.getCollection().doc(id).delete();
	}

	private static getCollection(): any {
		return Connections.dbConnection.collection(PROFILES_COLLECTIONS);
	}

}
