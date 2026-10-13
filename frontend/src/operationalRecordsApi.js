const OPERATIONAL_RECORDS_URL = `${import.meta.env.VITE_API_BASE_URL || 'https://civicpulse-backend-143e.onrender.com'}/api/operational-records`;

export async function fetchOperationalRecords(recordType) {
  const response = await fetch(`${OPERATIONAL_RECORDS_URL}/${encodeURIComponent(recordType)}`);
  if (!response.ok) throw new Error(`MongoDB read failed (${response.status})`);
  return response.json();
}

export async function saveOperationalRecord(recordType, record) {
  if (!record?.id) throw new Error('Operational record id is required');

  const { id, recordType: ignoredRecordType, _mongoCreatedAt, _mongoUpdatedAt, ...fields } = record;
  const response = await fetch(`${OPERATIONAL_RECORDS_URL}/${encodeURIComponent(recordType)}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
  if (!response.ok) throw new Error(`MongoDB write failed (${response.status})`);
  return response.json();
}