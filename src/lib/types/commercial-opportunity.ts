export interface CommercialOpportunity {
	id: number;
	title: string;
	type: OpportunityType;
	status: OpportunityStatus;
	location: string;
	deadline?: string;
	lastUpdate: string;
	description?: string;
	requirements?: string;
	createdAt?: string;
}

export type OpportunityType = 'PROJET_ACHAT' | 'APPEL_OFFRES';
export type OpportunityStatus = 'active' | 'closed' | 'pending';
export type OpportunityAction = 'edit' | 'delete' | 'view';

export interface CommercialOpportunityResponse {
	opportunities: CommercialOpportunity[];
	total: number;
}

export interface OpportunityTableProps {
	opportunities: CommercialOpportunity[];
	onAction: (action: OpportunityAction, opportunityId: number) => void;
}

export type OpportunityActionEvent = CustomEvent<{
	action: OpportunityAction;
	opportunityId: number;
}>;
