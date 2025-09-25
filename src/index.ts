// 1. Addition simple
function add(a: number, b: number): number {
  return a + b;
}
console.log("Addition:", add(3, 5)); // 8

// 2. Paramètre optionnel
function greet(name?: string): void {
  if (name) {
    console.log(`Hello, ${name}.`);
  } else {
    console.log("Hello, Guest.");
  }
}
greet("Alice"); // Hello, Alice.
greet(); // Hello, Guest.

// 3. Fonction fléchée typée
const multiply = (a: number, b: number): number => a * b;
console.log("Multiplication:", multiply(4, 5)); // 20

// 4. Callback avec map
const numbers: number[] = [1, 2, 3];
const doubled: number[] = numbers.map((num: number) => num * 2);
console.log("Tableau doublé:", doubled); // [2, 4, 6]

// 5. Fonction générique identité
function identity<T>(arg: T): T {
  return arg;
}
const str = identity<string>("Hello");
const num = identity<number>(42);

console.log("Identité string:", str);
console.log("Identité number:", num);

// 6. Premier élément d'un tableau
function first<T>(arr: T[]): T {
    return arr[0];
}
console.log("Premier élément (number):", first<number>([10, 20, 30])); // 10
console.log("Premier élément (string):", first<string>(["Alice", "Bob"])); // Alice

// 7. Union et narrowing
function printId(id: number | string): void {
    if (typeof id === "number") {
        console.log(`ID: ${id}`);
    } else {
        console.log(`User: ${id}`);
    }
}
printId(123);       // ID: 123
printId("Charlie"); // User: Charlie

// 8. Paramètre par défaut + retour typé
function pow(base: number, exponent: number = 2): number {
    return Math.pow(base, exponent);
}
console.log("2^2 =", pow(2));      // 4
console.log("3^3 =", pow(3, 3));   // 27

// exorcices 2

// Partie 1 : User
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  vip?: boolean;
}

// Exemple
const user: User = {
  id: 101,
  name: "Alice",
  email: "alice@example.com",
  phone: "0601020304",
  vip: true
};


// Partie 2 : Ride
interface Person {
  id: number;
  name: string;
}

interface Ride {
  id: number;
  client: Person;
  driver: Person;
  startLocation: string;
  endLocation: string;
  distanceKm: number;
  price: number;
}

// Exemple
const ride: Ride = {
  id: 1001,
  client: { id: 101, name: "Alice" },
  driver: { id: 201, name: "Bob" },
  startLocation: "Paris",
  endLocation: "Versailles",
  distanceKm: 20,
  price: 35.5
};


// Partie 3 : Payment
interface CardInfo {
  number: string;
  expiration: string;
}

interface Payment {
  id: number;
  courseId: number;
  amount: number;
  method: string;
  status: string;
  card?: CardInfo;
}

// Exemple
const payment: Payment = {
  id: 5001,
  courseId: 1001,
  amount: 35.5,
  method: "card",
  status: "paid",
  card: {
    number: "**** **** **** 1234",
    expiration: "12/26"
  }
};


// Partie 5 : Loyalty Program 
interface Benefit {
  type: string;
  value?: number;
}

interface LoyaltyProgram {
  clientId: number;
  tier: string;   // ex: "gold", "silver"
  points: number;
  benefits: Benefit[];
  validUntil: string;
}

// Exemple
const loyalty: LoyaltyProgram = {
  clientId: 101,
  tier: "gold",
  points: 1200,
  benefits: [
    { type: "discount", value: 10 },
    { type: "prioritySupport" }
  ],
  validUntil: "2026-01-01"
};

// Part 6 : Shared Ride

interface Person {
  id: number;
  name: string;
}

interface Passenger extends Person {
  pickup: string;
}

interface Stop {
  location: string;
  eta: string;
}

interface Route {
  stops: Stop[];
}

interface SharedRide {
  id: number;
  driver: Person;
  passengers: Passenger[];
  route: Route;
  farePerPassenger: number;
}

// Exemple
const sharedRide: SharedRide = {
  id: 1002,
  driver: { id: 201, name: "Bob" },
  passengers: [
    { id: 101, name: "Alice", pickup: "Paris" },
    { id: 102, name: "Charlie", pickup: "La Défense" }
  ],
  route: {
    stops: [
      { location: "Paris", eta: "2025-09-24T08:00:00Z" },
      { location: "La Défense", eta: "2025-09-24T08:20:00Z" },
      { location: "Versailles", eta: "2025-09-24T09:00:00Z" }
    ]
  },
  farePerPassenger: 18.0
};

// Part 7 : Support Ticket

interface Agent {
  id: number;
  name: string;
}

interface Message {
  from: string;
  text: string;
  sentAt: string;
  agent?: Agent;
}

interface SupportTicket {
  id: number;
  clientId: number;
  category: string;
  messages: Message[];
  status: string;
}

// Exemple
const ticket: SupportTicket = {
  id: 9001,
  clientId: 101,
  category: "payment",
  messages: [
    {
      from: "client",
      text: "My payment didn't go through yesterday",
      sentAt: "2025-09-23T10:00:00Z"
    },
    {
      from: "support",
      text: "We are checking the issue",
      sentAt: "2025-09-23T10:15:00Z",
      agent: { id: 301, name: "Sophie" }
    }
  ],
  status: "open"
};

// Part 8 : Wallet

interface Transaction {
  id: number;
  type: string;   // "topup" | "payment"
  amount: number;
  date: string;
}

interface Wallet {
  balance: number;        
  currency: string;      
  transactions: Transaction[];
}

interface ClientWallet {
  clientID: number;
  wallet: Wallet;
}

// Exemple
const clientWallet: ClientWallet = {
  clientID: 101,
  wallet: {
    balance: 50.0,
    currency: "EUR",
    transactions: [
      { id: 6001, type: "topup", amount: 20.0, date: "2025-09-20" },
      { id: 6002, type: "payment", amount: -15.5, date: "2025-09-21" }
    ]
  }
};

// Part 9 : Client History

interface RideHistory {
  type: "ride";
  courseId: number;
  date: string;
}

interface PaymentHistory {
  type: "payment";
  paymentId: number;
  amount: number;
  date: string;
}

interface SupportHistory {
  type: "support";
  ticketId: number;
  resolved: boolean;
  date: string;
}

type HistoryEvent = RideHistory | PaymentHistory | SupportHistory;

interface ClientHistory {
  clientId: number;
  history: HistoryEvent[];
}

// Exemple
const clientHistory: ClientHistory = {
  clientId: 101,
  history: [
    { type: "ride", courseId: 1001, date: "2025-09-20" },
    { type: "payment", paymentId: 5001, amount: 35.5, date: "2025-09-20" },
    { type: "support", ticketId: 9001, resolved: false, date: "2025-09-21" }
  ]
};

// Part 10 : Payment Methods

// Méthodes de paiement possibles
type PaymentMethod = "card" | "paypal" | "applePay";

// Détails pour paiement par carte
interface CardPaymentDetails {
  last4Digits: string;  // seulement les 4 derniers chiffres
  expiration: string;
}

// Détails pour paiement par PayPal
interface PayPalPaymentDetails {
  paypalId: string;
}

// Détails pour paiement par ApplePay
interface ApplePayPaymentDetails {
  last4Digits: string;
}

// Union des types de détails selon la méthode
type PaymentDetails = CardPaymentDetails | PayPalPaymentDetails | ApplePayPaymentDetails;

// Payment principal
interface Payment {
  id: number;
  courseId: number;
  amount: number;
  method: PaymentMethod;
  status: string;
  details: PaymentDetails;
}