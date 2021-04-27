require('dotenv').config()

const Routerv2 = artifacts.require("UniswapV2Router02.sol");

const WETH = artifacts.require("IWETH.sol");

module.exports = async function (deployer, network) {
    let weth;
    let factory_address;
    
    if(network ==='mainnet') {
        factory_address = process.env.MAINNET_FACTORY_ADDRESS;
    } else if (network === 'testnet') {
        factory_address = process.env.TESTNET_FACTORY_ADDRESS;
    } else {
        factory_address = process.env.LOCAL_FACTORY_ADDRESS;
    }
    
    if(network === 'mainnet') {
      weth = await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
    } else {
      weth = await WETH.at('0xFf8B4Ca6225A83246101E734c9628C7d0EF186C4');
    }

    await deployer.deploy(Routerv2, factory_address, weth.address).then(function () {
        console.log(`   Routerv2 address: ${Routerv2.address}`);
    });
  
  
};