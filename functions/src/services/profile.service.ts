import {Profile} from '../models/profile.model';
import {ProfileRepository} from '../repositories/profile.repository';

export class ProfileService {

	public static async create(profile: any): Promise<any> {
		const {subUsers, ...profileData} = profile;
		profileData.createdAt = Date.now();
		const parentProfile = await this.createProfile(profileData);

		const createdSubUsers = [];

		for (let subUser of subUsers) {
			subUser.createdAt = Date.now();
			subUser.parentId = parentProfile.id;
			createdSubUsers.push(await this.createProfile(subUser));
		}

		return {...parentProfile, subUsers: createdSubUsers};
	}

	public static async getById(id: string): Promise<any> {
		const profile = await ProfileRepository.getById(id);
		return {...profile, subUsers: await ProfileRepository.getByParentId(profile.id)};
	}
	public static async getByIdWithoutSubUsers(id: string): Promise<any> {
		const profile = await ProfileRepository.getById(id);
		return profile;
	}

	public static async getByUid(uid: string): Promise<any> {
		return await ProfileRepository.getByUid(uid);
		
	}

	public static async getByPhone(phone: string): Promise<any> {
		return await ProfileRepository.getByPhone(phone);
		
	}

	
	public static async getAll(): Promise<Profile[]> {
		const profiles = await ProfileRepository.getAll();

		const parents: any = profiles.filter(profile => !profile.parentId);

		for (let parent of parents) {
			parent.subUsers = profiles.filter(profile => profile.parentId === parent.id);
		}

		console.log(parents);

		return parents;
	}

	public static async update(profile: any): Promise<Profile | null> {
		const {subUsers, id, ...parent} = profile;

		await ProfileRepository.update(id, parent);


		for (let subUser of subUsers) {
			const {id, ...subUserData} = subUser;

			if (id) {
				await ProfileRepository.update(id, subUserData);
				continue;
			}

			subUser.createdAt = Date.now();
			subUser.parentId = parent.id;
			const updatedSubUser = await this.createProfile(subUser);
			subUser.id = updatedSubUser.id;
		}

		return profile;
	}

	public static async delete(id: string): Promise<void> {
		const profile = await this.getById(id);

		if (profile.parentId) {
			await ProfileRepository.delete(id);
			return;
		}

		for (let subUser of profile.subUsers) {
			await ProfileRepository.delete(subUser.id);
		}

		await ProfileRepository.delete(id);
	}

	private static async createProfile(profile: Profile): Promise<Profile> {
		const {id, ...profileData} = profile;

		return await ProfileRepository.create(profileData);
	}

}
