const fetch = require('node-fetch');

const btcInput = process.argv[2]; // first command line argument

const checkPreviousInputs = async (btcAddress) => {
  console.log(`Checking address ${btcAddress}`);
  const res1 = await fetch(`https://blockchain.info/rawaddr/${btcAddress}`).catch(err => console.error(err));
  const json = await res1.json().catch(err => console.error(err));
  let previousAddress = false;
  // need to add handling for multiple inputs here
  json.txs.forEach((tx) => {
    if (!tx.inputs || tx.result <= 0) return false;
    tx.inputs.forEach((input) => {
       if (input.prev_out.addr) previousAddress = input.prev_out.addr;
    });
  });
  if (previousAddress) {
    console.log(`Previously sent from ${previousAddress}`);
    await new Promise(r => setTimeout(r, 10000)); // avoid rate limits
    checkPreviousInputs(previousAddress);
  } else {
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