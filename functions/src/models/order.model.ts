export interface Order {
    id: string;
    userId: string;
    eventId: string;
    cardNumber: string;
    ticket18Count: number;
    ticket6Count: number;
    ticket0Count: number;
    total: number;
    createdAt: number;
    status: string;
    subUsers: [];
    runway: string;
    signatureUrl: string;
}
