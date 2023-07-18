const clientApi = {
  async request(
    api,
    method = "get",
    params = {},
    query = {},
    multipart,
    extraHeaders
  ) {
    let headers = {
      Accept: "application/json",
      // "Connected-wallet": this.connectedWallet || "",
    };
    if (multipart) {
      headers["Content-Type"] = "multipart/form-data";
    }
    if (extraHeaders) {
      headers = Object.assign(headers, extraHeaders);
    }
    try {
      const res = await superagent[method](
        `${_url}${api}`
        // `pls.myqnapcloud.cn:58987/api/v1/${api}`
      )
        .set(headers)
        .query(query)
        .send(params);
      return res.body;
    } catch (error) {
      console.log(error);
    }

  },
}
const loginInfo = {
  userInfo:null,
  loginType:null,
  walletAddress:null,
}

let web3auth = null;
let backLogin = false;
let provider = null;
let baseUrl = window.location.href;
if (baseUrl.indexOf('/') !== baseUrl.length - 1) {
  baseUrl = baseUrl.replaceAll('index.html', '');
}

var date = new Date(1689724800000);
document.getElementById('openDay').innerHTML = date.getDate();
document.getElementById('openHour').innerHTML = date.getHours();

const shareType = GetQueryValue('share');
if(shareType){
  switch (shareType) {
    case 'spectre':
      $('.logoWrap .icon_and').show()
      $('.logoWrap .partnerLogo').addClass(shareType)
      break;

    case 'promisphere':
      $('.logoWrap .icon_and').show()
      $('.logoWrap .partnerLogo').addClass(shareType)
      break;

    case 'thisthing':
      $('.logoWrap .icon_and').show()
      $('.logoWrap .partnerLogo').addClass(shareType)
      break;
  }
    
}
function finalClickHandler() {
  window.open('https://play.byte.city/', '_blank');
}
var countFlag = false;
function AMAcountDown() {
  function addZero(i) {
    return i < 10 ? "0" + i : i;
  }
  let activityText = document.querySelector('#AMAcountDown');
  let timer = null;
  const startTime = 1689724800000;
  
  const endTime = new Date('2023-7-25 23:59:59'.replace(/-/g, "/"));
  // 注：这里是直接使用用户本地系统时间做演示
  const nowTime = Date.now()
  // 当前时间距离活动开始时间的差值
  const beginDiff = parseInt((startTime - nowTime) / 1000);
  //当前时间距离活动结束时间的差值
  const endDiff = parseInt((endTime.getTime() - nowTime) / 1000);
  // 剩余时间
  const leftTime = beginDiff > 0 ? beginDiff : endDiff;
  let day = parseInt(leftTime / (24 * 60 * 60))
  let hour = parseInt(leftTime / (60 * 60) % 24);
  let minute = parseInt(leftTime / 60 % 60);
  let second = parseInt(leftTime % 60);
//   day = addZero(day);
//   hour = addZero(hour);
//   minute = addZero(minute);
//   second = addZero(second);

  if (beginDiff > 0) {
    activityText.innerText = `${day}D ${hour}H ${minute}M ${second}S`;
    timer = setTimeout(AMAcountDown, 1000);
  } else if (leftTime <= 0) {
    activityText.innerText = "";
    countFlag = true;
    clearTimeout(timer);
  } else {
    activityText.innerText = "";
    timer = setTimeout(AMAcountDown, 1000);
  }
}

function copyFn(text){
  let copyInput = document.createElement('input');
  document.body.appendChild(copyInput);
  copyInput.setAttribute('value', text);
  copyInput.select();
  document.execCommand("Copy");
  copyInput.remove();
}

function GetQueryValue(queryName) {
  var query = decodeURI(window.location.search.substring(1));
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == queryName) { return pair[1]; }
  }
  return null;
}

// window.onload = async function init() {
//   try {
//     const clientId = "BO_8ulfTp3vmphhncNLeL4OzknSlhN_2jTvnR-z9pPNRA7qbW0jGmhJkcmoiNyU0221Y2481mj1BcyKY0GZ2CAE";
//     web3auth = new window.Core.Web3AuthCore({
//       clientId,
//       chainConfig: {
//         chainNamespace: "eip155",
//         chainId: "0x1",
//         rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
//       }
//     });
//     const openloginAdapter = new window.OpenloginAdapter.OpenloginAdapter({
//       adapterSettings: {
//         network: "testnet",
//         uxMode: "popup",
//         whiteLabel: {
//           name: "Byte City",
//           logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
//           logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
//           defaultLanguage: "en",
//           dark: true, // whether to enable dark mode. defaultValue: false
//         },
//       },
//       loginSettings: {
//         mfaLevel: "none",
//       },
//     });
//     web3auth.configureAdapter(openloginAdapter);

//     const metamaskAdapter = new window.MetamaskAdapter.MetamaskAdapter({
//       clientId: clientId,
//     });

//     web3auth.configureAdapter(metamaskAdapter);

//     const torusAdapter = new window.TorusEvmAdapter.TorusWalletAdapter({
//       clientId: clientId,
//     })

//     web3auth.configureAdapter(torusAdapter);

//     const walletConnectV1Adapter = new window.WalletConnectV1Adapter.WalletConnectV1Adapter({
//       adapterSettings: {
//         bridge: "https://bridge.walletconnect.org",
//         qrcodeModal: window.WalletConnectQRCodeModal.default
//       },
//       clientId: clientId,
//     });

//     web3auth.configureAdapter(walletConnectV1Adapter);

//     await web3auth.init();
//     await logback()
//   } catch (error) {
//     console.error(error.message);
//   }
// }

async function logback() {
  try {
    await login(true);
    // backLogin = true;
    // login function checks for user info if user did not logout info stays
    // saved on web3auth if not getUserinfo reverts
  }
  catch(error) {
    return
  }
}

let logginIn = false;

async function login(isBacklogin) {
  const user = await web3auth.getUserInfo();
  const walletAddress = await rpc.getAccounts(web3auth.provider);
  loginInfo['walletAddress'] = walletAddress;
  if ($.isEmptyObject(user)) {
    loginInfo['loginType'] = 'wallet';
  } else {
    loginInfo['loginType'] = 'media';
  }
  loginInfo['userInfo'] = user;
  // user['walletAddress'] = walletAddress;
  loginInfo['userInfo']['share'] = GetQueryValue('share') || 'official';
  loginInfo['userInfo']['walletAddress'] = walletAddress;
  const res = await clientApi.request('booking', 'post', loginInfo['userInfo']);
  // console.log(res , "res")
  loginSuccess();
  logginIn = false;
  backLogin = isBacklogin ? isBacklogin : false;
  switch (res.code) {
    case 1:
      console.log('Parameter error');
      break;
    case 2:
      registerSuccess();
      break;
    case 3:
      registerSuccess('showPanel');     
      break;
  }
}
function emailCheck (emailStr) {
  var emailPat=/^(.+)@(.+)$/;
  var matchArray=emailStr.match(emailPat);
  if (matchArray==null) {
    return false;
  }
  return true;
}

function usernameCheck (str) {
  var usernamePat=/[0-9a-zA-Z_]{1,16}$/;
  var matchArray=str.match(usernamePat);
  if (matchArray==null) {
    return false;
  }
  return true;
}

function showEmailPanel(){
  // $('.foot .email').addClass('active');
  $('.joinNotice').addClass('active')
}


$('.join_btn').on('click',function(){
  if(countFlag) {
    window.open('https://play.byte.city/', '_blank');
  } else {
    $('.joinNotice').addClass('active');
    $('#cover').show();
  }


  // window.open('https://play.byte.city/', '_blank');
})

$('.joinNotice .btnWrap').on('click',function(){
  $('.joinNotice').removeClass('active')
  $('#cover').hide();
})

$("#email_input").bind('input propertychange', function(){
  $('.email_error').hide();
})

$('.email_button').on('click', async function(){
  const email = $("#email_input").val();
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if(re.test(email)){
    let curUrl = window.location.href;
    $('.email_error').hide();
   // $("#email_input").prop("disabled", true);
    //$('.email_button').hide();
    //$('.email_reserved').show();
    //$('.email_input').addClass("backimg");
    $('.d-fl').hide();
    // $('.email_input').css( "background-image","url(../img/frame_002.png)");
    $('.footBtns .tips').show();
    // setTimeout(function(){
    //   $('.footBtns .tips').hide(300);
    // },3000)


    gtag('event', 'click FREE_TICKET button', {click:true})

    const res = await clientApi.request('bookinglee', 'post', {
      url:curUrl,
      email,
    });

  } else {
    $('.email_error').html('INVAILD EMAIL ADDRESS').show();
    setTimeout(function(){
      $('.email_error').hide(300);
    },3000)
  }
})

let checkEmail = false,checkUsername = false;


// $('#email').blur(function(){
//   const email = $('#email').val();
//   if(!emailCheck(email)){
//     $('.error_email').html('please check your email address').show()
//     $('.joinNotice .btn').removeClass('active')
//     return false
//   }
//   checkEmail = true;
//   $('.error_email').hide();
//   if(checkUsername) $('.joinNotice .btn').addClass('active')
// })

// $('#username').blur(function(){
//   const name = $.trim($('#username').val());
//   if(!usernameCheck(name)){
//     $('.error_username').html('please check your username').show();
//     $('.joinNotice .btn').removeClass('active')
//     return false
//   }
//   checkUsername = true ;
//   $('.error_username').hide();
//   if(checkEmail) $('.joinNotice .btn').addClass('active')
// })

// $('.joinNotice .btn').on('click',async function(){
//   if(!$(this).hasClass('active')) return false
//   const email = $('#email').val();
//   const name = $.trim($('#username').val());

//   const res = await clientApi.request('email', 'post', {
//     address:loginInfo.walletAddress,
//     email,
//     name
//   });
//   if(res.code == 0){
//     $('.joinNotice').removeClass('active');
//     // $('.foot .email').removeClass('active');
//   }

// })
// $('.joinNotice .btn_close').on('click',function(){
//   $('.joinNotice').removeClass('active')
// })

function loginSuccess() {
  const { loginType, userInfo, walletAddress } = loginInfo;
  if (loginType == 'wallet') {
    $('.walletWrap .walletAddr').html(ellipseAddress(walletAddress));
    $('.walletWrap .wallet').addClass('active');
  } else {
    $('.walletWrap .walletAddr').html(ellipseAddress(walletAddress));
    $('.walletWrap .email').html(userInfo.email || '');
    $('.walletWrap .media').addClass('active');
  }
  // $('.logWrap .login').removeClass('active')
  $('.logWrap').addClass('active')
  $("#myModal").hide();
}

function registerSuccess(showPanl) {
  if(!backLogin){
    $('.register').addClass("active");
    setTimeout(function() {
      $('.register').removeClass("active");
      if(showPanl) showEmailPanel()
    },1500)
  }else{
    backLogin = false;
    setTimeout(function() {
      $('.register').addClass("active");
    },800)
    setTimeout(function() {
      $('.register').removeClass("active");
      if(showPanl) showEmailPanel()
    },2300)
  }
  $('.foot .sub').removeClass("active");
  $('.foot .subed').addClass("active");
}

function ellipseAddress(address, size = 6) {
  return `${address.slice(0, size)}...${address.slice(0 - size)}`;
}

$('.login').on('click', function () {
})

$('.register .enterOkey').on('click', function () {
  $('.register').removeClass("active")
})
function ShowWebPanel() {
  $('.loadAfter').show(800);
  
}

$('.foot .sub').on('click', async function () {
  $("#myModal").show();
})

$('.metamask-image').on('click', async function () {
  if (logginIn) return;
  logginIn = true;
  try {
    await web3auth.connectTo("metamask", {});
  } catch(e) {
    // already connected
    if(e.code != 5111){
      $("#metamaskModal").show();
    }
    console.log(e);
    logginIn = false;
    
  }
  await login()
  
})

$('.walletconnect-image').on('click', async function () {
  if (logginIn) return;
  logginIn = true;
  try {
  await web3auth.connectTo("wallet-connect-v1", {});
  } catch(e) {
    // already connected
    console.log(e);
    logginIn = false;
  }
  await login()
})

$('.torus-image').on('click', async function () {
  if (logginIn) return;
  logginIn = true;
  try {
  await web3auth.connectTo("torus-evm", {});
  } catch(e) {
    // already connected
    console.log(e)
    logginIn = false;
  }
  await login()
})

let googleReady = false;

$('.in-email').on('paste keyup', async function () {
  const email = $(".in-email").val();
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (re.test(email)) {
    googleReady = true;
    $('.connect-email').addClass("ready")
  } else {
    googleReady = false;
    $('.connect-email').removeClass("ready")
  }
})

$('.connect-email').on('click', async function () {
  if (logginIn) return;
  logginIn = true;
  if (googleReady) {
    const email = $(".in-email").val();
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    try {
    await web3auth.connectTo("openlogin", {
      loginSettings: {
        mfaLevel: "none",
      },
      loginProvider: "email_passwordless",
      extraLoginOptions: {
        login_hint: email,
      },
    });
    } catch(e) {
      console.log(e)
      logginIn = false;
      // already connected
    }
    await login()
  }
})


$('.social-login').on('click', async function () {
  if (logginIn) return;
  logginIn = true;
  try {
    await web3auth.connectTo("openlogin", {
      loginSettings: {
        mfaLevel: "none",
      },
      loginProvider: "google",
    });
  } catch(e) {
    console.log(e);
    logginIn = false;
    // already connected
  }
  await login()
})

$('.modal-close').on('click', async function () {
  $("#myModal").hide();
})
$('.error-close').on('click', async function () {
  $("#metamaskModal").hide();
})
$('.download-button').on('click', async function () {
  $("#metamaskModal").hide();
})

$('.logout').on('click', async function () {
  try {
    await web3auth.logout();
    $('.walletWrap .walletAddr').html('');
    $('.walletWrap .email').html('');
    $('.logWrap').removeClass('active')
    $('.walletWrap>div').removeClass('active');
    loginInfo.walletAddress = null;
    loginInfo.loginType = null;
    loginInfo.userInfo = null;
    walletAddress = '';
    $('.foot .subWrap .item').removeClass("active");
    $('.foot .email').removeClass('active');
    $('.foot .sub').addClass("active");
  } catch (error) {
    console.log(error);
  }
})

$('.icon_copy').on('click', function () {
  copyFn(loginInfo['walletAddress'])
})

function isMobile() {
  let flag = navigator.userAgent.match(
      /(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

