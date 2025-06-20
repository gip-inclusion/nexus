export interface Service {
	id: number;
	name: string;
	status: string;
	perimeter: string;
	lastUpdate: string;
	synchronized: boolean;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export type ServiceStatus = 'active' | 'inactive';

export interface ServicesResponse {
	services: Service[];
	total: number;
}

export interface ServiceTableProps {
	services: Service[];
	onAction: (action: ServiceAction, serviceId: number) => void;
}

export type ServiceAction = 'edit' | 'delete' | 'toggle';

export type ServiceActionEvent = CustomEvent<{ action: ServiceAction; serviceId: number }>;
