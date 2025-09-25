"use strict";
// 1. Addition simple
function add(a, b) {
    return a + b;
}
console.log("Addition:", add(3, 5)); // 8
// 2. Paramètre optionnel
function greet(name) {
    if (name) {
        console.log(`Hello, ${name}.`);
    }
    else {
        console.log("Hello, Guest.");
    }
}
greet("Alice"); // Hello, Alice.
greet(); // Hello, Guest.
// 3. Fonction fléchée typée
const multiply = (a, b) => a * b;
console.log("Multiplication:", multiply(4, 5)); // 20
// 4. Callback avec map
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log("Tableau doublé:", doubled); // [2, 4, 6]
// 5. Fonction générique identité
function identity(arg) {
    return arg;
}
const str = identity("Hello");
const num = identity(42);
console.log("Identité string:", str);
console.log("Identité number:", num);
// 6. Premier élément d'un tableau
function first(arr) {
    return arr[0];
}
console.log("Premier élément (number):", first([10, 20, 30])); // 10
console.log("Premier élément (string):", first(["Alice", "Bob"])); // Alice
// 7. Union et narrowing
function printId(id) {
    if (typeof id === "number") {
        console.log(`ID: ${id}`);
    }
    else {
        console.log(`User: ${id}`);
    }
}
printId(123); // ID: 123
printId("Charlie"); // User: Charlie
// 8. Paramètre par défaut + retour typé
function pow(base, exponent = 2) {
    return Math.pow(base, exponent);
}
console.log("2^2 =", pow(2)); // 4
console.log("3^3 =", pow(3, 3)); // 27
// Exemple
const user = {
    id: 101,
    name: "Alice",
    email: "alice@example.com",
    phone: "0601020304",
    vip: true
};
// Exemple
const ride = {
    id: 1001,
    client: { id: 101, name: "Alice" },
    driver: { id: 201, name: "Bob" },
    startLocation: "Paris",
    endLocation: "Versailles",
    distanceKm: 20,
    price: 35.5
};
// Exemple
const payment = {
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
// Exemple
const loyalty = {
    clientId: 101,
    tier: "gold",
    points: 1200,
    benefits: [
        { type: "discount", value: 10 },
        { type: "prioritySupport" }
    ],
    validUntil: "2026-01-01"
};
// Exemple
const sharedRide = {
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
// Exemple
const ticket = {
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
// Exemple
const clientWallet = {
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
// Exemple
const clientHistory = {
    clientId: 101,
    history: [
        { type: "ride", courseId: 1001, date: "2025-09-20" },
        { type: "payment", paymentId: 5001, amount: 35.5, date: "2025-09-20" },
        { type: "support", ticketId: 9001, resolved: false, date: "2025-09-21" }
    ]
};
