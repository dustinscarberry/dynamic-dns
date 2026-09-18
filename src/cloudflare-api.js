export const updateDomainARecord = async (apiKey, hostname, ip) => {
  try {
    // get zones for api key
    const dnsZones = await getZones(apiKey);

    // find zone that contains hostname
    const matchingDNSZone = dnsZones.filter(zone => hostname.includes(zone.name));
    const zoneId = matchingDNSZone[0].id;

    // get records for matching zone
    const recordsRsp = await fetch('https://api.cloudflare.com/client/v4/zones/' + zoneId + '/dns_records', { headers: getAuthHeaders(apiKey) });

    if (!recordsRsp.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await recordsRsp.json();

    // find exact dns record
    const recordToUpdate = data.result.filter(item => {
      return item.name == hostname;
    });

    if (!recordToUpdate || recordToUpdate.length != 1)
      throw new Error('No valid record found to update');

    // update dns record with ip address
    const updateRsp = await fetch('https://api.cloudflare.com/client/v4/zones/' + zoneId + '/dns_records/' + recordToUpdate[0].id, {
      method: 'PATCH',
      headers: getAuthHeaders(apiKey),
      body: JSON.stringify({
        type: 'A',
        name: hostname,
        content: ip
      })
    });

    if (!updateRsp.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    return await updateRsp.json();
  } catch (err) {
    throw err;
  }
}

export const getZones = async (apiKey) => {
  try {
    const rsp = await fetch('https://api.cloudflare.com/client/v4/zones', { headers: getAuthHeaders(apiKey) });

    if (!rsp.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await rsp.json();
    return data.result;
  } catch (err) {
    throw err;
  }
}

const getAuthHeaders = (apiKey) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiKey
  };
}

export default { updateDomainARecord, getZones }