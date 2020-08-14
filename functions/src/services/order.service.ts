import {OrderRepository} from '../repositories/order.repository';
import {Order} from '../models/order.model';
import {ProfileService} from './profile.service';
import {EventService} from './event.service';

export class OrderService {

	public static async create(order: any): Promise<Order> {

		order.createdAt = Date.now();

		const savedOrder = await OrderRepository.create(order);

		if (savedOrder.eventId) {
			const event = await EventService.getById(savedOrder.eventId);

			event.ordersCount = event.ordersCount ? event.ordersCount + 1 : 1;

			await EventService.update(event, []);
		}

		return savedOrder;
	}

	public static async getById(id: string): Promise<any> {
		const order: any = await OrderRepository.getById(id);

		return order;
	}

	public static async getAll(): Promise<any[]> {
		const orders: any[] = await OrderRepository.getAll();

		for (let order of orders) {
			order.user = await ProfileService.getByIdWithoutSubUsers(order.userId);
			order.eventName = (await EventService.getById(order.eventId)).name;
		}

		return orders;
	}

	public static async update(order: any): Promise<Order> {
		const {id, ...orderData} = order;

		return await OrderRepository.update(id, orderData);
	}

}
