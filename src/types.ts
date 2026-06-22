export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullDetails: string;
  iconName: "business" | "erp" | "ai" | "software";
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  mockupType: "inventory" | "dashboard" | "warehouse" | "tracking";
}

export interface CoreValueItem {
  title: string;
  description: string;
  iconName: string;
}
