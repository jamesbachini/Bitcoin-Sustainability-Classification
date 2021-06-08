const fetch = require('node-fetch');

const btcInput = process.argv[2]; // first command line argument

const checkPreviousInputs = async (btcAddress) => {
  console.log(`Checking address ${btcAddress}`);
  const res1 = await fetch(`https://blockchain.info/rawaddr/${btcAddress}`).catch(err => utils.errorLog(err));
  const json = await res1.json().catch(err => utils.errorLog(err));
  if (json.txs && json.txs[0] && json.txs[0].inputs.addr) {
    console.log(`Previously sent from ${json.txs[0].inputs.addr}`);
    checkPreviousInputs(json.txs[0].inputs.addr);
  } else {
    await new Promise(r => setTimeout(r, 2000));
    checkKnownAddresses(btcAddress);
  }
}

const checkKnownAddresses = (btcAddress) => {
  const knownMiners = {
    '1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY' : { name: 'F2POOL', sustainability: 'UNKNOWN' },
    '12dRugNcdxK39288NjcDV4GX7rMsKCGn6B' : { name: 'ANTPOOL', sustainability: 'UNKNOWN' },
    '191sNkKTG8pzUsNgZYKo7DH2odg39XDAGo' : { name: 'POOLIN', sustainability: 'UNKNOWN' },
    '18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX' : { name: 'BTC.TOP', sustainability: 'UNKNOWN' },
    '1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE' : { name: 'SLUSH', sustainability: 'UNKNOWN' },
    '18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX' : { name: 'VIABTC', sustainability: 'UNKNOWN' },
    
  }
  if (knownMiners[btcAddress]) {
    console.log(`Bitcoin originally mined by: ${btcAddress} (${knownMiners[btcAddres].name})`);
  } else {
    console.log(`Bitcoin originally mined by: ${btcAddress} (UNKNOWN)`);
  }
}

checkPreviousInputs(btcInput);