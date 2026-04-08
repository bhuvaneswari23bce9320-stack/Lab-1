// Exercise 3: Node.js Event-Driven Programming using EventEmitter
// Demonstrates custom events, listeners, and asynchronous event-driven architecture

// Step 1: Import the built-in events module using require()
const EventEmitter = require('events');

console.log('==================================================');
console.log(' Node.js Event-Driven Programming - Exercise 3   ');
console.log('==================================================\n');

// -------------------------------------------------------
// PART A: Basic EventEmitter Setup
// -------------------------------------------------------

// Step 2: Create an event emitter object (instance of EventEmitter)
const myEmitter = new EventEmitter();

// Step 3: Register event listeners using the on() method
// on(eventName, callback) - registers a listener for a named event

// Listener 1: Greet event
myEmitter.on('greet', (name) => {
    console.log(`[Listener 1] Hello, ${name}! Welcome to Node.js Event-Driven Programming.`);
});

// Listener 2: Multiple listeners on the same event 'greet'
myEmitter.on('greet', (name) => {
    console.log(`[Listener 2] Greetings, ${name}! This is a second listener on the same 'greet' event.`);
});

// Step 4: Emit (trigger) the 'greet' event with data (arguments passed to listeners)
console.log('--- Emitting "greet" event with name "Alice" ---');
myEmitter.emit('greet', 'Alice');

console.log();

// -------------------------------------------------------
// PART B: Custom Events with Data
// -------------------------------------------------------

// Register listener for a custom 'orderPlaced' event
myEmitter.on('orderPlaced', (order) => {
    console.log(`[orderPlaced] New Order Received!`);
    console.log(`  Order ID   : ${order.id}`);
    console.log(`  Item       : ${order.item}`);
    console.log(`  Quantity   : ${order.quantity}`);
    console.log(`  Total Price: ₹${order.price}`);
});

// Register a second listener for the same 'orderPlaced' event
myEmitter.on('orderPlaced', (order) => {
    console.log(`[orderPlaced - Logger] Order #${order.id} logged at ${new Date().toLocaleTimeString()}`);
});

// Emit 'orderPlaced' event with an object as data
console.log('--- Emitting "orderPlaced" event ---');
myEmitter.emit('orderPlaced', { id: 101, item: 'Laptop', quantity: 1, price: 75000 });

console.log();

// -------------------------------------------------------
// PART C: once() - Listener that fires only ONE time
// -------------------------------------------------------

// once(eventName, callback) - the listener is removed after the first trigger
myEmitter.once('startup', () => {
    console.log('[startup] Server started! This message appears only ONCE.');
});

console.log('--- Emitting "startup" event twice (listener fires only once) ---');
myEmitter.emit('startup'); // Fires
myEmitter.emit('startup'); // Does NOT fire (listener already removed)

console.log();

// -------------------------------------------------------
// PART D: Error Event Handling
// -------------------------------------------------------

// Always handle 'error' events to prevent app crashes
myEmitter.on('error', (err) => {
    console.log(`[error] Error caught: ${err.message}`);
});

console.log('--- Emitting "error" event ---');
myEmitter.emit('error', new Error('Something went wrong in the system!'));

console.log();

// -------------------------------------------------------
// PART E: Asynchronous Event-Driven Architecture
// -------------------------------------------------------

// Simulating asynchronous behavior with events and setTimeout
const asyncEmitter = new EventEmitter();

asyncEmitter.on('dataFetched', (data) => {
    console.log(`[dataFetched] Data received asynchronously: "${data}"`);
    console.log(`[dataFetched] Processing complete at ${new Date().toLocaleTimeString()}`);
});

asyncEmitter.on('dataFetched', (data) => {
    console.log(`[dataFetched - Logger] Audit log: Data "${data}" was fetched and handled.`);
});

console.log('--- Async Event: Simulating delayed data fetch (1 second delay) ---');
console.log('[Main Thread] Continuing execution while waiting for data...');

// setTimeout simulates an async operation (like a DB call or API request)
setTimeout(() => {
    console.log('\n[Async] Data fetch complete. Emitting "dataFetched" event...');
    asyncEmitter.emit('dataFetched', 'Student Records from Database');
}, 1000);

// -------------------------------------------------------
// PART F: Removing a Listener using removeListener()
// -------------------------------------------------------

const tempHandler = (msg) => {
    console.log(`[tempEvent] Temporary listener fired: ${msg}`);
};

myEmitter.on('tempEvent', tempHandler);

console.log('\n--- Emitting "tempEvent" before removing listener ---');
myEmitter.emit('tempEvent', 'First trigger');

// Remove the listener
myEmitter.removeListener('tempEvent', tempHandler);

console.log('--- Emitting "tempEvent" after removing listener (no output expected) ---');
myEmitter.emit('tempEvent', 'Second trigger'); // Will NOT fire

console.log('\n[Main Thread] All synchronous events emitted. Async event pending...');
console.log('==================================================');
console.log('Event Summary:');
console.log('  greet        → 2 listeners, data passed as argument');
console.log('  orderPlaced  → 2 listeners, object data passed');
console.log('  startup      → once() listener, fires only one time');
console.log('  error        → error handling listener');
console.log('  dataFetched  → async event with setTimeout');
console.log('  tempEvent    → listener removed with removeListener()');
console.log('==================================================');
