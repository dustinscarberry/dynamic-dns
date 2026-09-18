#!/usr/bin/env node

import cloudflareApi from './src/cloudflare-api.js';
import ipifyApi from './src/ipify-api.js';

const runner = async () => {
  try {
    const apiKey = process.env.API_KEY;
    const hostname = process.env.HOSTNAME;
    const dynamicDNSType = process.env.DYNAMIC_DNS_TYPE;

    // check if ddns config is valid
    if (hostname == '' || dynamicDNSType == '')
      process.exit();

    // get current external ip
    const publicIP = await ipifyApi.getPublicIP();

    if (dynamicDNSType == 'cloudflare') {
      await cloudflareApi.updateDomainARecord(apiKey, hostname, publicIP);
      console.log('Cloudflare DNS record for ' + hostname + ' updated with IP: ' + publicIP);
    } else if (dynamicDNSType == 'digitalocean') {
      // TODO: Not currently implemented
    }
  } catch (err) {
    // TODO
  }

  process.exit();
}

runner();