import { Farmer, Produce, Buyer, BuyerDemand, SmartPool, DeliveryRoute, Order, DemandPrediction } from '../types';

export const DEMO_FARMER_RAMESH: Farmer = {
  id: 'farmer-1',
  name: 'Ramesh Mondal',
  phone: '+91 98301 24589',
  village: 'Nabapally, Barasat',
  district: 'North 24 Parganas',
  state: 'West Bengal',
  coordinates: { lat: 22.7230, lng: 88.4820 },
  completedOrders: 18,
  fulfillmentRate: 94,
  preferredLanguage: 'en',
  verified: true,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
};

export const DEMO_FARMERS_LIST: Farmer[] = [
  DEMO_FARMER_RAMESH,
  {
    id: 'farmer-2',
    name: 'Suresh Debnath',
    phone: '+91 98312 34567',
    village: 'Duttapukur',
    district: 'North 24 Parganas',
    state: 'West Bengal',
    coordinates: { lat: 22.7580, lng: 88.5410 },
    completedOrders: 24,
    fulfillmentRate: 98,
    preferredLanguage: 'bn',
    verified: true
  },
  {
    id: 'farmer-3',
    name: 'Amit Halder',
    phone: '+91 98325 67890',
    village: 'Habra',
    district: 'North 24 Parganas',
    state: 'West Bengal',
    coordinates: { lat: 22.8350, lng: 88.6320 },
    completedOrders: 12,
    fulfillmentRate: 92,
    preferredLanguage: 'bn',
    verified: true
  },
  {
    id: 'farmer-4',
    name: 'Priya Roy',
    phone: '+91 98336 78912',
    village: 'Ashoknagar',
    district: 'North 24 Parganas',
    state: 'West Bengal',
    coordinates: { lat: 22.8270, lng: 88.6210 },
    completedOrders: 15,
    fulfillmentRate: 96,
    preferredLanguage: 'bn',
    verified: true
  }
];

export const INITIAL_PRODUCE_LIST: Produce[] = [
  {
    id: 'prod-1',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Mondal',
    village: 'Barasat',
    crop: 'Tomato',
    quantity: 120,
    unit: 'kg',
    grade: 'Grade A',
    harvestDate: '2026-09-02',
    availableFrom: '2026-09-03',
    expectedPrice: 28,
    location: 'North 24 Parganas',
    coordinates: { lat: 22.7230, lng: 88.4820 },
    status: 'Matching'
  },
  {
    id: 'prod-2',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Mondal',
    village: 'Barasat',
    crop: 'Potato (Jyoti)',
    quantity: 200,
    unit: 'kg',
    grade: 'Grade A',
    harvestDate: '2026-09-01',
    availableFrom: '2026-09-04',
    expectedPrice: 19,
    location: 'North 24 Parganas',
    coordinates: { lat: 22.7230, lng: 88.4820 },
    status: 'Available'
  },
  {
    id: 'prod-3',
    farmerId: 'farmer-2',
    farmerName: 'Suresh Debnath',
    village: 'Duttapukur',
    crop: 'Tomato',
    quantity: 150,
    unit: 'kg',
    grade: 'Grade A',
    harvestDate: '2026-09-02',
    availableFrom: '2026-09-03',
    expectedPrice: 28,
    location: 'Duttapukur',
    coordinates: { lat: 22.7580, lng: 88.5410 },
    status: 'Pooled'
  },
  {
    id: 'prod-4',
    farmerId: 'farmer-3',
    farmerName: 'Amit Halder',
    village: 'Habra',
    crop: 'Tomato',
    quantity: 80,
    unit: 'kg',
    grade: 'Grade A',
    harvestDate: '2026-09-02',
    availableFrom: '2026-09-03',
    expectedPrice: 28,
    location: 'Habra',
    coordinates: { lat: 22.8350, lng: 88.6320 },
    status: 'Pooled'
  },
  {
    id: 'prod-5',
    farmerId: 'farmer-4',
    farmerName: 'Priya Roy',
    village: 'Ashoknagar',
    crop: 'Tomato',
    quantity: 150,
    unit: 'kg',
    grade: 'Grade A',
    harvestDate: '2026-09-02',
    availableFrom: '2026-09-03',
    expectedPrice: 28,
    location: 'Ashoknagar',
    coordinates: { lat: 22.8270, lng: 88.6210 },
    status: 'Pooled'
  }
];

export const DEMO_BUYERS: Buyer[] = [
  {
    id: 'buyer-1',
    businessName: 'FreshMart Superstores',
    buyerType: 'Retailer',
    location: 'Kolkata Wholesale Terminal, Ultadanga',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    contact: '+91 98300 11223',
    verified: true,
    successfulTransactions: 45,
    totalVolumeProcuredKg: 38500,
    reliabilityScore: 96
  },
  {
    id: 'buyer-2',
    businessName: 'Green Fork Agro-Kitchen',
    buyerType: 'Restaurant',
    location: 'Sector V, Salt Lake',
    coordinates: { lat: 22.5800, lng: 88.4350 },
    contact: '+91 98311 44556',
    verified: true,
    successfulTransactions: 31,
    totalVolumeProcuredKg: 14200,
    reliabilityScore: 91
  },
  {
    id: 'buyer-3',
    businessName: 'Bengal Wholesale Traders',
    buyerType: 'Wholesaler',
    location: 'Koley Market, Sealdah',
    coordinates: { lat: 22.5680, lng: 88.3710 },
    contact: '+91 98322 77889',
    verified: true,
    successfulTransactions: 78,
    totalVolumeProcuredKg: 95000,
    reliabilityScore: 84
  },
  {
    id: 'buyer-4',
    businessName: 'KisanPure Food Processors',
    buyerType: 'Processor',
    location: 'Dankuni Food Park',
    coordinates: { lat: 22.6800, lng: 88.3000 },
    contact: '+91 98333 99001',
    verified: true,
    successfulTransactions: 52,
    totalVolumeProcuredKg: 64000,
    reliabilityScore: 94
  }
];

export const INITIAL_BUYER_DEMANDS: BuyerDemand[] = [
  {
    id: 'demand-1',
    buyerId: 'buyer-1',
    buyerName: 'FreshMart Superstores',
    buyerType: 'Retailer',
    crop: 'Tomato',
    requiredQuantity: 500,
    unit: 'kg',
    quality: 'Grade A',
    targetPrice: 30,
    requiredDate: '2026-09-03',
    deliveryLocation: 'Kolkata Wholesale Terminal, Ultadanga',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    status: 'Matching',
    reliabilityScore: 96
  },
  {
    id: 'demand-2',
    buyerId: 'buyer-2',
    buyerName: 'Green Fork Agro-Kitchen',
    buyerType: 'Restaurant',
    crop: 'Tomato',
    requiredQuantity: 300,
    unit: 'kg',
    quality: 'Grade A',
    targetPrice: 29,
    requiredDate: '2026-09-03',
    deliveryLocation: 'Sector V, Salt Lake',
    coordinates: { lat: 22.5800, lng: 88.4350 },
    status: 'Open',
    reliabilityScore: 91
  },
  {
    id: 'demand-3',
    buyerId: 'buyer-3',
    buyerName: 'Bengal Wholesale Traders',
    buyerType: 'Wholesaler',
    crop: 'Tomato',
    requiredQuantity: 700,
    unit: 'kg',
    quality: 'Grade A',
    targetPrice: 31,
    requiredDate: '2026-09-04',
    deliveryLocation: 'Koley Market, Sealdah',
    coordinates: { lat: 22.5680, lng: 88.3710 },
    status: 'Open',
    reliabilityScore: 84
  }
];

export const DEMO_SMART_POOL: SmartPool = {
  id: 'pool-1',
  poolCode: 'POOL #KS-1001',
  demandId: 'demand-1',
  buyerId: 'buyer-1',
  buyerName: 'FreshMart Superstores',
  buyerType: 'Retailer',
  crop: 'Tomato',
  requiredQuantity: 500,
  collectedQuantity: 500,
  unit: 'kg',
  grade: 'Grade A',
  agreedPrice: 30,
  deliveryDate: '2026-09-03',
  deliveryLocation: 'Kolkata Wholesale Terminal, Ultadanga',
  destinationCoordinates: { lat: 22.5726, lng: 88.3639 },
  status: 'POOL_COMPLETE',
  farmers: [
    {
      farmerId: 'farmer-1',
      farmerName: 'Ramesh Mondal',
      village: 'Nabapally, Barasat',
      quantity: 120,
      grade: 'Grade A',
      coordinates: { lat: 22.7230, lng: 88.4820 },
      pickupOrder: 1,
      allocatedLogisticsCost: 139.2,
      estimatedNetPayout: 3114,
      status: 'Confirmed'
    },
    {
      farmerId: 'farmer-3',
      farmerName: 'Amit Halder',
      village: 'Habra',
      quantity: 80,
      grade: 'Grade A',
      coordinates: { lat: 22.8350, lng: 88.6320 },
      pickupOrder: 2,
      allocatedLogisticsCost: 92.8,
      estimatedNetPayout: 2076,
      status: 'Confirmed'
    },
    {
      farmerId: 'farmer-4',
      farmerName: 'Priya Roy',
      village: 'Ashoknagar',
      quantity: 150,
      grade: 'Grade A',
      coordinates: { lat: 22.8270, lng: 88.6210 },
      pickupOrder: 3,
      allocatedLogisticsCost: 174.0,
      estimatedNetPayout: 3892,
      status: 'Confirmed'
    },
    {
      farmerId: 'farmer-2',
      farmerName: 'Suresh Debnath',
      village: 'Duttapukur',
      quantity: 150,
      grade: 'Grade A',
      coordinates: { lat: 22.7580, lng: 88.5410 },
      pickupOrder: 4,
      allocatedLogisticsCost: 174.0,
      estimatedNetPayout: 3892,
      status: 'Confirmed'
    }
  ],
  shortfallKg: 0,
  completionPercentage: 100
};

export const DEMO_DELIVERY_ROUTE: DeliveryRoute = {
  id: 'route-1',
  poolId: 'pool-1',
  stops: [
    {
      id: 'stop-1',
      name: 'Ramesh Mondal',
      role: 'FARMER',
      village: 'Barasat',
      quantityKg: 120,
      lat: 22.7230,
      lng: 88.4820,
      sequence: 1,
      arrivalEstimate: '06:30 AM'
    },
    {
      id: 'stop-2',
      name: 'Amit Halder',
      role: 'FARMER',
      village: 'Habra',
      quantityKg: 80,
      lat: 22.8350,
      lng: 88.6320,
      sequence: 2,
      arrivalEstimate: '07:05 AM'
    },
    {
      id: 'stop-3',
      name: 'Priya Roy',
      role: 'FARMER',
      village: 'Ashoknagar',
      quantityKg: 150,
      lat: 22.8270,
      lng: 88.6210,
      sequence: 3,
      arrivalEstimate: '07:25 AM'
    },
    {
      id: 'stop-4',
      name: 'Suresh Debnath',
      role: 'FARMER',
      village: 'Duttapukur',
      quantityKg: 150,
      lat: 22.7580,
      lng: 88.5410,
      sequence: 4,
      arrivalEstimate: '07:50 AM'
    },
    {
      id: 'stop-5',
      name: 'FreshMart Terminal',
      role: 'BUYER',
      village: 'Ultadanga Hub, Kolkata',
      lat: 22.5726,
      lng: 88.3639,
      sequence: 5,
      arrivalEstimate: '08:42 AM'
    }
  ],
  optimizedDistanceKm: 39.4,
  individualDistanceKm: 65.0,
  distanceSavedKm: 25.6,
  distanceReductionPercent: 39.4,
  estimatedTimeMinutes: 72,
  estimatedLogisticsCost: 580,
  estimatedCostSaved: 420,
  estimatedWastageReductionPercent: 1.1,
  vehicleType: 'Tata Ace (1.5T Payload)',
  vehicleCapacityKg: 1500,
  fuelSavedLiters: 4.8,
  co2SavedKg: 12.6
};

export const DEMO_ORDER: Order = {
  id: 'ord-1001',
  orderNumber: 'ORD-KS-2026-089',
  poolId: 'pool-1',
  poolCode: 'POOL #KS-1001',
  buyerId: 'buyer-1',
  buyerName: 'FreshMart Superstores',
  buyerType: 'Retailer',
  crop: 'Tomato',
  totalQuantityKg: 500,
  grade: 'Grade A',
  agreedPricePerKg: 30,
  estimatedNetRealizationPerKg: 25.95,
  totalGrossAmount: 15000,
  totalFarmersCount: 4,
  deliveryLocation: 'Kolkata Wholesale Terminal, Ultadanga',
  optimizedDistanceKm: 39.4,
  estimatedDeliveryTime: '1h 12m',
  status: 'CONFIRMED',
  createdAt: '2026-09-01T14:30:00Z',
  pickupDate: '2026-09-03',
  deliveryDate: '2026-09-03',
  timeline: [
    {
      id: 't-1',
      label: 'Match Found',
      description: 'AI matched 4 farmers to FreshMart requirement (94% Compatibility)',
      status: 'completed',
      timestamp: '02 Sep, 10:15 AM'
    },
    {
      id: 't-2',
      label: 'Pool Created',
      description: 'POOL #KS-1001 initialized (500 kg aggregate target)',
      status: 'completed',
      timestamp: '02 Sep, 10:45 AM'
    },
    {
      id: 't-3',
      label: 'Pool Complete',
      description: '100% capacity secured from Ramesh, Suresh, Amit, Priya',
      status: 'completed',
      timestamp: '02 Sep, 11:30 AM'
    },
    {
      id: 't-4',
      label: 'Route Optimized',
      description: '39.4 km multi-stop route generated via OR-Tools engine',
      status: 'completed',
      timestamp: '02 Sep, 12:00 PM'
    },
    {
      id: 't-5',
      label: 'Order Confirmed',
      description: 'Accepted by FreshMart at ₹30/kg guaranteed purchase agreement',
      status: 'completed',
      timestamp: '02 Sep, 12:30 PM'
    },
    {
      id: 't-6',
      label: 'Pickup',
      description: 'Scheduled for 03 Sept, starting 06:30 AM from Ramesh Mondal',
      status: 'pending'
    },
    {
      id: 't-7',
      label: 'In Transit',
      description: 'En-route to Kolkata Wholesale Terminal',
      status: 'pending'
    },
    {
      id: 't-8',
      label: 'Delivered',
      description: 'Delivery sign-off, digital weight receipt & instant payout',
      status: 'pending'
    }
  ],
  predictionComparison: {
    predictedKg: 1250,
    actualKg: 1340,
    errorKg: 90,
    percentageError: 6.7
  }
};

export const DEMO_DEMAND_PREDICTION: DemandPrediction = {
  crop: 'Tomato',
  region: 'Kolkata Metropolitan & North 24 Parganas',
  expectedDemandKg: 1250,
  trend: 'Increasing ↑',
  confidenceScore: 78,
  recommendedSupplyKg: '400 - 500 kg',
  keyFactors: [
    {
      factor: 'Recent Institutional Inquiries',
      impact: 'positive',
      description: '3 new restaurant and retail chains entered weekly tomato procurement.'
    },
    {
      factor: 'Seasonal Festival Demand',
      impact: 'positive',
      description: 'Upcoming festive celebrations typically elevate culinary fresh produce demand by 28%.'
    },
    {
      factor: 'Historical Mandi Arrivals',
      impact: 'positive',
      description: 'September arrival velocity traditionally rises in Kolkata wholesale hubs.'
    },
    {
      factor: 'Local Available Supply',
      impact: 'negative',
      description: 'Temporary deficit in open market supplies creates strong price floor.'
    }
  ],
  priceForecastPerKg: {
    current: 30,
    nextWeek: 32,
    nextMonth: 34
  }
};
