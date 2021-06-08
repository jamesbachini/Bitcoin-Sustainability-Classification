# Bitcoin Sustainability Classification

Demo Tracing application to find original Bitcoin miner

Original blog post: https://jamesbachini.com/bitcoin-mining-sustainability/

This is just a demo/MVP there's a lot that would need doing to put it into production.

- Rate limited to one query per 10 seconds on Bitcoin.com API
- Needs to track each input and transaction independently
- More data on Bitcoin miners, pools and energy sources

## Requirements

Node.js
Node-Fetch npm module installed via npm install (see below)

## Setup

git clone https://github.com/jamesbachini/Bitcoin-Sustainability-Classification.git
cd Bitcoin-Sustainability-Classification
npm install
node tracer.js 3D2HTvUn3fpFU3mp9a7LWa9YC75dcN5BAM