import fs from 'fs/promises';

const token = process.env.CARDTRADER_TOKEN;
const API_BASE = 'https://api.cardtrader.com/api/v2';

if (!token) {
  throw new Error('CARDTRADER_TOKEN mancante');
}

async function api(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Errore API ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  console.log('Recupero informazioni API...');
  const info = await api('/info');

  const meta = {
    updatedAt: new Date().toISOString(),
    apiStatus: 'online',
    info
  };

  await fs.mkdir('./data', { recursive: true });

  await fs.writeFile(
    './data/pokemon-index-meta.json',
    JSON.stringify(meta, null, 2)
  );

  console.log('File meta creato con successo.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});