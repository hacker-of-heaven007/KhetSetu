import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  Produce,
  Buyer,
  BuyerDemand,
  SmartPool,
  DeliveryRoute,
  Order,
  Farmer
} from '../types';
import {
  DEMO_FARMER_RAMESH,
  DEMO_FARMERS_LIST,
  INITIAL_PRODUCE_LIST,
  DEMO_BUYERS,
  INITIAL_BUYER_DEMANDS,
  DEMO_SMART_POOL,
  DEMO_DELIVERY_ROUTE,
  DEMO_ORDER
} from '../data/demoData';

interface DemoContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentFarmer: Farmer;
  produceList: Produce[];
  activeProduce: Produce;
  buyers: Buyer[];
  demands: BuyerDemand[];
  selectedBuyerId: string;
  selectedBuyer: Buyer;
  activeDemand: BuyerDemand;
  smartPool: SmartPool;
  deliveryRoute: DeliveryRoute;
  activeOrder: Order;
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoLoaded: boolean;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  loadSIHDemo: () => void;
  selectBuyer: (buyerId: string) => void;
  addProduce: (newProduce: Omit<Produce, 'id' | 'farmerId' | 'farmerName' | 'village' | 'coordinates' | 'status'>) => Produce;
  confirmOrder: () => void;
  acceptBuyerSupply: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('FARMER');
  const [currentFarmer] = useState<Farmer>(DEMO_FARMER_RAMESH);
  const [produceList, setProduceList] = useState<Produce[]>(INITIAL_PRODUCE_LIST);
  const [activeProduce, setActiveProduce] = useState<Produce>(INITIAL_PRODUCE_LIST[0]);
  const [buyers] = useState<Buyer[]>(DEMO_BUYERS);
  const [demands, setDemands] = useState<BuyerDemand[]>(INITIAL_BUYER_DEMANDS);
  
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>('buyer-1');
  const [activeDemand, setActiveDemand] = useState<BuyerDemand>(INITIAL_BUYER_DEMANDS[0]);
  const [smartPool, setSmartPool] = useState<SmartPool>(DEMO_SMART_POOL);
  const [deliveryRoute, setDeliveryRoute] = useState<DeliveryRoute>(DEMO_DELIVERY_ROUTE);
  const [activeOrder, setActiveOrder] = useState<Order>(DEMO_ORDER);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [isDemoLoaded, setIsDemoLoaded] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const selectedBuyer = buyers.find(b => b.id === selectedBuyerId) || buyers[0];

  const selectBuyer = (buyerId: string) => {
    setSelectedBuyerId(buyerId);
    const targetDemand = demands.find(d => d.buyerId === buyerId) || demands[0];
    const targetBuyer = buyers.find(b => b.id === buyerId) || buyers[0];
    setActiveDemand(targetDemand);

    if (buyerId === 'buyer-2') {
      // Green Fork Agro-Kitchen / Green Restaurant (300 kg Tomato @ ₹29/kg - 10 km)
      const greenPool: SmartPool = {
        id: 'pool-2',
        poolCode: 'POOL #KS-1002',
        demandId: 'demand-2',
        buyerId: 'buyer-2',
        buyerName: 'Green Fork Agro-Kitchen',
        buyerType: 'Restaurant',
        crop: 'Tomato',
        requiredQuantity: 300,
        collectedQuantity: 300,
        unit: 'kg',
        grade: 'Grade A',
        agreedPrice: 29,
        deliveryDate: '2026-09-03',
        deliveryLocation: 'Sector V, Salt Lake',
        destinationCoordinates: { lat: 22.5800, lng: 88.4350 },
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
            allocatedLogisticsCost: 72,
            estimatedNetPayout: 3120,
            status: 'Confirmed'
          },
          {
            farmerId: 'farmer-2',
            farmerName: 'Suresh Debnath',
            village: 'Duttapukur',
            quantity: 100,
            grade: 'Grade A',
            coordinates: { lat: 22.7580, lng: 88.5410 },
            pickupOrder: 2,
            allocatedLogisticsCost: 60,
            estimatedNetPayout: 2600,
            status: 'Confirmed'
          },
          {
            farmerId: 'farmer-3',
            farmerName: 'Amit Halder',
            village: 'Habra',
            quantity: 80,
            grade: 'Grade A',
            coordinates: { lat: 22.8350, lng: 88.6320 },
            pickupOrder: 3,
            allocatedLogisticsCost: 48,
            estimatedNetPayout: 2080,
            status: 'Confirmed'
          }
        ],
        shortfallKg: 0,
        completionPercentage: 100
      };

      const greenRoute: DeliveryRoute = {
        id: 'route-2',
        poolId: 'pool-2',
        stops: [
          { id: 'stop-1', name: 'Ramesh Mondal', role: 'FARMER', village: 'Barasat', quantityKg: 120, lat: 22.7230, lng: 88.4820, sequence: 1, arrivalEstimate: '07:00 AM' },
          { id: 'stop-2', name: 'Suresh Debnath', role: 'FARMER', village: 'Duttapukur', quantityKg: 100, lat: 22.7580, lng: 88.5410, sequence: 2, arrivalEstimate: '07:25 AM' },
          { id: 'stop-3', name: 'Amit Halder', role: 'FARMER', village: 'Habra', quantityKg: 80, lat: 22.8350, lng: 88.6320, sequence: 3, arrivalEstimate: '07:50 AM' },
          { id: 'stop-4', name: 'Green Fork Kitchen', role: 'BUYER', village: 'Sector V, Salt Lake', lat: 22.5800, lng: 88.4350, sequence: 4, arrivalEstimate: '08:35 AM' }
        ],
        optimizedDistanceKm: 22.4,
        individualDistanceKm: 44.0,
        distanceSavedKm: 21.6,
        distanceReductionPercent: 49.0,
        estimatedTimeMinutes: 42,
        estimatedLogisticsCost: 180,
        estimatedCostSaved: 320,
        estimatedWastageReductionPercent: 1.4,
        vehicleType: 'Mahindra Bolero Maxi Truck',
        vehicleCapacityKg: 1000,
        fuelSavedLiters: 3.6,
        co2SavedKg: 9.8
      };

      const greenOrder: Order = {
        id: 'ord-1002',
        orderNumber: 'ORD-KS-2026-092',
        poolId: 'pool-2',
        poolCode: 'POOL #KS-1002',
        buyerId: 'buyer-2',
        buyerName: 'Green Fork Agro-Kitchen',
        buyerType: 'Restaurant',
        crop: 'Tomato',
        totalQuantityKg: 300,
        grade: 'Grade A',
        agreedPricePerKg: 29,
        estimatedNetRealizationPerKg: 26.00,
        totalGrossAmount: 8700,
        totalFarmersCount: 3,
        deliveryLocation: 'Sector V, Salt Lake',
        optimizedDistanceKm: 22.4,
        estimatedDeliveryTime: '42 mins',
        status: 'CONFIRMED',
        createdAt: '2026-09-01T14:30:00Z',
        pickupDate: '2026-09-03',
        deliveryDate: '2026-09-03',
        timeline: [
          { id: 't-1', label: 'Match Found', description: 'AI matched 3 farmers to Green Fork Kitchen (86% Compatibility - Best Net)', status: 'completed', timestamp: '02 Sep, 10:15 AM' },
          { id: 't-2', label: 'Pool Created', description: 'POOL #KS-1002 initialized (300 kg aggregate target)', status: 'completed', timestamp: '02 Sep, 10:45 AM' },
          { id: 't-3', label: 'Pool Complete', description: '100% capacity secured from Ramesh, Suresh, Amit', status: 'completed', timestamp: '02 Sep, 11:30 AM' },
          { id: 't-4', label: 'Route Optimized', description: '22.4 km multi-stop route generated via OR-Tools engine', status: 'completed', timestamp: '02 Sep, 12:00 PM' },
          { id: 't-5', label: 'Order Confirmed', description: 'Accepted by Green Fork Kitchen at ₹29/kg with Best Net Realization', status: 'completed', timestamp: '02 Sep, 12:30 PM' },
          { id: 't-6', label: 'Pickup', description: 'Scheduled for 03 Sept, starting 07:00 AM from Ramesh Mondal', status: 'pending' },
          { id: 't-7', label: 'In Transit', description: 'En-route to Sector V, Salt Lake', status: 'pending' },
          { id: 't-8', label: 'Delivered', description: 'Delivery sign-off, digital weight receipt & instant payout', status: 'pending' }
        ],
        predictionComparison: { predictedKg: 300, actualKg: 310, errorKg: 10, percentageError: 3.3 }
      };

      setSmartPool(greenPool);
      setDeliveryRoute(greenRoute);
      setActiveOrder(greenOrder);
    } else if (buyerId === 'buyer-3') {
      // Bengal Wholesale Traders / Local Wholesale (700 kg Tomato @ ₹31/kg - 26 km)
      const wholesalePool: SmartPool = {
        id: 'pool-3',
        poolCode: 'POOL #KS-1003',
        demandId: 'demand-3',
        buyerId: 'buyer-3',
        buyerName: 'Bengal Wholesale Traders',
        buyerType: 'Wholesaler',
        crop: 'Tomato',
        requiredQuantity: 700,
        collectedQuantity: 700,
        unit: 'kg',
        grade: 'Grade A',
        agreedPrice: 31,
        deliveryDate: '2026-09-04',
        deliveryLocation: 'Koley Market, Sealdah',
        destinationCoordinates: { lat: 22.5680, lng: 88.3710 },
        status: 'POOL_COMPLETE',
        farmers: [
          { farmerId: 'farmer-1', farmerName: 'Ramesh Mondal', village: 'Nabapally, Barasat', quantity: 120, grade: 'Grade A', coordinates: { lat: 22.7230, lng: 88.4820 }, pickupOrder: 1, allocatedLogisticsCost: 82, estimatedNetPayout: 2964, status: 'Confirmed' },
          { farmerId: 'farmer-2', farmerName: 'Suresh Debnath', village: 'Duttapukur', quantity: 150, grade: 'Grade A', coordinates: { lat: 22.7580, lng: 88.5410 }, pickupOrder: 2, allocatedLogisticsCost: 102, estimatedNetPayout: 3705, status: 'Confirmed' },
          { farmerId: 'farmer-4', farmerName: 'Priya Roy', village: 'Ashoknagar', quantity: 150, grade: 'Grade A', coordinates: { lat: 22.8270, lng: 88.6210 }, pickupOrder: 3, allocatedLogisticsCost: 102, estimatedNetPayout: 3705, status: 'Confirmed' },
          { farmerId: 'farmer-3', farmerName: 'Amit Halder', village: 'Habra', quantity: 80, grade: 'Grade A', coordinates: { lat: 22.8350, lng: 88.6320 }, pickupOrder: 4, allocatedLogisticsCost: 54, estimatedNetPayout: 1976, status: 'Confirmed' },
          { farmerId: 'farmer-5', farmerName: 'Bikash Roy', village: 'Singur', quantity: 200, grade: 'Grade A', coordinates: { lat: 22.8100, lng: 88.2300 }, pickupOrder: 5, allocatedLogisticsCost: 140, estimatedNetPayout: 4940, status: 'Confirmed' }
        ],
        shortfallKg: 0,
        completionPercentage: 100
      };

      const wholesaleRoute: DeliveryRoute = {
        id: 'route-3',
        poolId: 'pool-3',
        stops: [
          { id: 'stop-1', name: 'Ramesh Mondal', role: 'FARMER', village: 'Barasat', quantityKg: 120, lat: 22.7230, lng: 88.4820, sequence: 1, arrivalEstimate: '06:00 AM' },
          { id: 'stop-2', name: 'Suresh Debnath', role: 'FARMER', village: 'Duttapukur', quantityKg: 150, lat: 22.7580, lng: 88.5410, sequence: 2, arrivalEstimate: '06:25 AM' },
          { id: 'stop-3', name: 'Priya Roy', role: 'FARMER', village: 'Ashoknagar', quantityKg: 150, lat: 22.8270, lng: 88.6210, sequence: 3, arrivalEstimate: '06:50 AM' },
          { id: 'stop-4', name: 'Amit Halder', role: 'FARMER', village: 'Habra', quantityKg: 80, lat: 22.8350, lng: 88.6320, sequence: 4, arrivalEstimate: '07:15 AM' },
          { id: 'stop-5', name: 'Bikash Roy', role: 'FARMER', village: 'Singur', quantityKg: 200, lat: 22.8100, lng: 88.2300, sequence: 5, arrivalEstimate: '07:50 AM' },
          { id: 'stop-6', name: 'Koley Market Terminal', role: 'BUYER', village: 'Sealdah, Kolkata', lat: 22.5680, lng: 88.3710, sequence: 6, arrivalEstimate: '08:50 AM' }
        ],
        optimizedDistanceKm: 48.2,
        individualDistanceKm: 78.0,
        distanceSavedKm: 29.8,
        distanceReductionPercent: 38.2,
        estimatedTimeMinutes: 95,
        estimatedLogisticsCost: 480,
        estimatedCostSaved: 520,
        estimatedWastageReductionPercent: 1.2,
        vehicleType: 'Eicher Pro (3T Payload)',
        vehicleCapacityKg: 3000,
        fuelSavedLiters: 6.2,
        co2SavedKg: 16.4
      };

      const wholesaleOrder: Order = {
        id: 'ord-1003',
        orderNumber: 'ORD-KS-2026-095',
        poolId: 'pool-3',
        poolCode: 'POOL #KS-1003',
        buyerId: 'buyer-3',
        buyerName: 'Bengal Wholesale Traders',
        buyerType: 'Wholesaler',
        crop: 'Tomato',
        totalQuantityKg: 700,
        grade: 'Grade A',
        agreedPricePerKg: 31,
        estimatedNetRealizationPerKg: 24.70,
        totalGrossAmount: 21700,
        totalFarmersCount: 5,
        deliveryLocation: 'Koley Market, Sealdah',
        optimizedDistanceKm: 48.2,
        estimatedDeliveryTime: '1h 35m',
        status: 'CONFIRMED',
        createdAt: '2026-09-01T14:30:00Z',
        pickupDate: '2026-09-04',
        deliveryDate: '2026-09-04',
        timeline: [
          { id: 't-1', label: 'Match Found', description: 'AI matched 5 farmers to Bengal Wholesale Traders (79% Compatibility)', status: 'completed', timestamp: '02 Sep, 10:15 AM' },
          { id: 't-2', label: 'Pool Created', description: 'POOL #KS-1003 initialized (700 kg aggregate target)', status: 'completed', timestamp: '02 Sep, 10:45 AM' },
          { id: 't-3', label: 'Pool Complete', description: '100% capacity secured from Ramesh, Suresh, Priya, Amit, Bikash', status: 'completed', timestamp: '02 Sep, 11:30 AM' },
          { id: 't-4', label: 'Route Optimized', description: '48.2 km multi-stop route generated via OR-Tools engine', status: 'completed', timestamp: '02 Sep, 12:00 PM' },
          { id: 't-5', label: 'Order Confirmed', description: 'Accepted by Bengal Wholesale Traders at ₹31/kg guaranteed agreement', status: 'completed', timestamp: '02 Sep, 12:30 PM' },
          { id: 't-6', label: 'Pickup', description: 'Scheduled for 04 Sept, starting 06:00 AM from Ramesh Mondal', status: 'pending' },
          { id: 't-7', label: 'In Transit', description: 'En-route to Koley Market Sealdah', status: 'pending' },
          { id: 't-8', label: 'Delivered', description: 'Delivery sign-off, digital weight receipt & instant payout', status: 'pending' }
        ],
        predictionComparison: { predictedKg: 700, actualKg: 720, errorKg: 20, percentageError: 2.8 }
      };

      setSmartPool(wholesalePool);
      setDeliveryRoute(wholesaleRoute);
      setActiveOrder(wholesaleOrder);
    } else {
      // Default: FreshMart Superstores
      setSmartPool(DEMO_SMART_POOL);
      setDeliveryRoute(DEMO_DELIVERY_ROUTE);
      setActiveOrder(DEMO_ORDER);
    }
  };

  const loadSIHDemo = () => {
    setUserRole('FARMER');
    setProduceList(INITIAL_PRODUCE_LIST);
    setActiveProduce(INITIAL_PRODUCE_LIST[0]);
    setDemands(INITIAL_BUYER_DEMANDS);
    selectBuyer('buyer-1');
    setDemoStep(1);
    setIsDemoLoaded(true);
  };

  const addProduce = (
    data: Omit<Produce, 'id' | 'farmerId' | 'farmerName' | 'village' | 'coordinates' | 'status'>
  ): Produce => {
    const newProd: Produce = {
      ...data,
      id: `prod-${Date.now()}`,
      farmerId: currentFarmer.id,
      farmerName: currentFarmer.name,
      village: currentFarmer.village,
      coordinates: currentFarmer.coordinates,
      status: 'Matching'
    };

    setProduceList(prev => [newProd, ...prev]);
    setActiveProduce(newProd);
    selectBuyer('buyer-1');
    setDemoStep(2); // Advance to Match step
    return newProd;
  };

  const confirmOrder = () => {
    setActiveOrder(prev => ({
      ...prev,
      status: 'CONFIRMED'
    }));
    setDemoStep(6); // Step 6: Order Confirmed
  };

  const acceptBuyerSupply = () => {
    setDemands(prev =>
      prev.map(d => (d.id === activeDemand.id ? { ...d, status: 'Fulfilled' } : d))
    );
    setSmartPool(prev => ({
      ...prev,
      status: 'READY_FOR_DELIVERY'
    }));
    setActiveOrder(prev => ({
      ...prev,
      status: 'CONFIRMED'
    }));
  };

  return (
    <DemoContext.Provider
      value={{
        userRole,
        setUserRole,
        currentFarmer,
        produceList,
        activeProduce,
        buyers,
        demands,
        selectedBuyerId,
        selectedBuyer,
        activeDemand,
        smartPool,
        deliveryRoute,
        activeOrder,
        demoStep,
        setDemoStep,
        isDemoLoaded,
        isOffline,
        setIsOffline,
        loadSIHDemo,
        selectBuyer,
        addProduce,
        confirmOrder,
        acceptBuyerSupply
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
