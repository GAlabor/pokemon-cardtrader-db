const token = process.env.CARDTRADER_TOKEN;

if (!token) {
  throw new Error('CARDTRADER_TOKEN mancante');
}

console.log('Token trovato.');
console.log('Script build-db avviato correttamente.');