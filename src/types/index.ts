export type UserRole = 'FARMER' | 'BUYER' | 'ADMIN';

export type CropGrade = 'Grade A' | 'Grade B' | 'Grade C';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  coordinates: Coordinates;
  completedOrders: number;
  fulfillmentRate: number;
  preferredLanguage: 'en' | 'bn' | 'hi';
  verified: boolean;
  avatar?: string;
}

export interface Produce {
  id: string;
  farmerId: string;
  farmerName: string;
  village: string;
  crop: string;
  quantity: number;
  unit: string;
  grade: CropGrade;
  harvestDate: string;
  availableFrom: string;
  expectedPrice: number;
  location: string;
  coordinates: Coordinates;
  status: 'Available' | 'Matching' | 'Pooled' | 'Sold';
}

export type BuyerType = 'Retailer' | 'Restaurant' | 'Processor' | 'Wholesaler' | 'Institution';

export interface Buyer {
  id: string;
  businessName: string;
  buyerType: BuyerType;
  location: string;
  coordinates: Coordinates;
  contact: string;
  verified: boolean;
  successfulTransactions: number;
  totalVolumeProcuredKg: number;
  reliabilityScore: number; // e.g. 96 (%)
}

export interface BuyerDemand {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: BuyerType;
  crop: string;
  requiredQuantity: number;
  unit: string;
  quality: CropGrade;
  targetPrice: number;
  requiredDate: string;
  deliveryLocation: string;
  coordinates: Coordinates;
  status: 'Open' | 'Matching' | 'Pooled' | 'Fulfilled';
  reliabilityScore: number;
}

export interface MatchScoreBreakdown {
  cropCompat: number; // max 35
  quantityCompat: number; // max 20
  qualityCompat: number; // max 15
  distanceCompat: number; // max 15
  priceCompat: number; // max 10
  reliabilityCompat: number; // max 5
}

export interface BuyerOpportunity {
  buyer: Buyer;
  demand: BuyerDemand;
  matchScore: number; // 0 - 100
  breakdown: MatchScoreBreakdown;
  distanceKm: number;
  reasons: string[];
  warnings: string[];
  recommendation: string;
  estimatedLogistics: number;
  estimatedLoss: number;
  netRealizationPerKg: number;
  isBestNetRealization: boolean;
}

export interface FarmerContribution {
  farmerId: string;
  farmerName: string;
  village: string;
  quantity: number;
  grade: CropGrade;
  coordinates: Coordinates;
  pickupOrder: number;
  allocatedLogisticsCost: number;
  estimatedNetPayout: number;
  status: 'Confirmed' | 'Collected' | 'In Transit';
}

export interface SmartPool {
  id: string;
  poolCode: string; // e.g. "KS-1001"
  demandId: string;
  buyerId: string;
  buyerName: string;
  buyerType: BuyerType;
  crop: string;
  requiredQuantity: number;
  collectedQuantity: number;
  unit: string;
  grade: CropGrade;
  agreedPrice: number;
  deliveryDate: string;
  deliveryLocation: string;
  destinationCoordinates: Coordinates;
  status: 'POOLING' | 'POOL_COMPLETE' | 'READY_FOR_DELIVERY' | 'IN_TRANSIT' | 'DELIVERED';
  farmers: FarmerContribution[];
  shortfallKg: number;
  completionPercentage: number;
}

export interface NetRealizationSummary {
  crop: string;
  farmerName: string;
  quantityKg: number;
  buyerGrossPricePerKg: number;
  grossSaleValue: number;
  logisticsCost: number;
  handlingCost: number;
  platformFee: number;
  expectedLoss: number;
  totalDeductions: number;
  estimatedNetValue: number;
  netRealizationPerKg: number;
  middlemanComparison: {
    middlemanPricePerKg: number;
    middlemanGross: number;
    middlemanNet: number;
    extraEarningsWithKhetSetu: number;
    percentageIncrease: number;
  };
}

export interface RouteStop {
  id: string;
  name: string;
  role: 'FARMER' | 'BUYER';
  village?: string;
  quantityKg?: number;
  lat: number;
  lng: number;
  sequence: number;
  arrivalEstimate: string;
}

export interface DeliveryRoute {
  id: string;
  poolId: string;
  stops: RouteStop[];
  optimizedDistanceKm: number;
  individualDistanceKm: number;
  distanceSavedKm: number;
  distanceReductionPercent: number;
  estimatedTimeMinutes: number;
  estimatedLogisticsCost: number;
  estimatedCostSaved: number;
  estimatedWastageReductionPercent: number;
  vehicleType: string;
  vehicleCapacityKg: number;
  fuelSavedLiters: number;
  co2SavedKg: number;
}

export interface OrderTimelineItem {
  id: string;
  label: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "ORD-KS-2026-089"
  poolId: string;
  poolCode: string;
  buyerId: string;
  buyerName: string;
  buyerType: BuyerType;
  crop: string;
  totalQuantityKg: number;
  grade: CropGrade;
  agreedPricePerKg: number;
  estimatedNetRealizationPerKg: number;
  totalGrossAmount: number;
  totalFarmersCount: number;
  deliveryLocation: string;
  optimizedDistanceKm: number;
  estimatedDeliveryTime: string;
  status: 'MATCHED' | 'POOLING' | 'POOL_READY' | 'CONFIRMED' | 'PICKUP' | 'IN_TRANSIT' | 'DELIVERED';
  createdAt: string;
  pickupDate: string;
  deliveryDate: string;
  timeline: OrderTimelineItem[];
  predictionComparison?: {
    predictedKg: number;
    actualKg: number;
    errorKg: number;
    percentageError: number;
  };
}

export interface DemandPrediction {
  crop: string;
  region: string;
  expectedDemandKg: number;
  trend: 'Increasing ↑' | 'Stable →' | 'Decreasing ↓';
  confidenceScore: number; // e.g. 78 (%)
  recommendedSupplyKg: string;
  keyFactors: {
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
  priceForecastPerKg: {
    current: number;
    nextWeek: number;
    nextMonth: number;
  };
}
