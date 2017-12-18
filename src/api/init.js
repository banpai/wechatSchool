import axios from 'axios'
import { host } from './config'
import weui from 'weui.js'
import router from './../router'
import store from './../store'

// 获取地址上的参数
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 封装参数
function changeData(data) {
  var code = getQueryString('code')
  var openid = '';
  if (localStorage.getItem('openid')) {
    openid = localStorage.getItem('openid')
    data.openid = openid
    data.code = code
    data.baseurl = location.href.split('#')[0]
    return Promise.resolve(data)
  } else {
    router.replace('/loading')
  }
}


// 获取jssd初始化接口
export function getJssdk() {
  var url = host + '/api/clockPunch/jssdk'
  return changeData({}).then(data => {
    var loading = weui.loading('加载中……', {
      className: 'custom-classname'
    });
    return axios.post(url, data).then((res) => {
      loading.hide(function () {
        console.log('`loading` has been hidden');
      });
      return Promise.resolve(res.data)
    })
  })
}

// 初始化列表接口
export function discList() {
  var url = host + '/api/clockPunch/discList'
  return changeData({}).then(data => {
    return axios.post(url, data).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}

// 判断有没有参加打卡活动
export function isHasOpenid() {
  var url = host + '/api/clockPunch/isHasOpenid'
  var openid = '';
  if (localStorage.getItem('openid')) {
    openid = localStorage.getItem('openid');
  }
  var code = getQueryString('code')
  var data = {
    baseurl: location.href.split('#')[0],
    code: code,
    openid: openid
  }
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 初始化我要参加页面的数据
export function getProjectData() {
  var url = host + '/api/clockPunch/cms/getProgectData';
  var loading = weui.loading('加载中……', {
    className: 'custom-classname'
  });
  return axios.post(url, {}).then((res) => {
    loading.hide(function () {
      console.log('`loading` has been hidden');
    });
    console.log(res)
    if(res.data.error_code === 60002){
      // 没有配置数据，跳转404页面
      console.log(res.data.msg)
      store.state.msg = res.data.msg
      router.replace('/error')
    }else{
      res.data.host = host;
      return Promise.resolve(res.data)
    }
  })
}

// 点击我要参加该活动，添加数据
export function joinProject() {
  var url = host + '/api/clockPunch/joinProject'
  return changeData({}).then(data => {
    var loading = weui.loading('参加中……', {
      className: 'custom-classname'
    });
    return axios.post(url, data).then((res) => {
      loading.hide(function () {
        console.log('`loading` has been hidden');
      });
      return Promise.resolve(res.data)
    })
  })
}

// 点击打卡接口
export function punchDay() {
  var url = host + '/api/clockPunch/punchDay'
  return changeData({}).then(data => {
    var loading = weui.loading('打卡中……', {
      className: 'custom-classname'
    });
    return axios.post(url, data).then((res) => {
      loading.hide(function () {
        console.log('`loading` has been hidden');
      });
      return Promise.resolve(res.data)
    })
  })
}

// 点击点赞接口
export function likeDay(o) {
  var url = host + '/api/clockPunch/likeDay'
  return changeData({}).then(data => {
    data.otheropenid = o
    var loading = weui.loading('点赞中……', {
      className: 'custom-classname'
    });
    return axios.post(url, data).then((res) => {
      loading.hide(function () {
        console.log('`loading` has been hidden');
      });
      return Promise.resolve(res.data)
    })
  })
}

// 初始化打卡数据页面的接口
export function punchInit() {
  var url = host + '/api/clockPunch/punchInit'
  return changeData({}).then(data => {
    var userInfoFlag = false;
    if (localStorage.getItem('userInfo')) {
      userInfoFlag = true;
    }
    data.userInfoFlag = userInfoFlag
    var loading = weui.loading('初始化……', {
      className: 'custom-classname'
    });
    return axios.post(url, data).then((res) => {
      loading.hide(function () {
        console.log('`loading` has been hidden');
      });
      return Promise.resolve(res.data)
    })
  })
}

// 点击提醒
export function warnTip(m) {
  var url = host + '/api/clockPunch/warn'
  return changeData(m).then(data => {
    var userInfoFlag = false;
    if (localStorage.getItem('userInfo')) {
      userInfoFlag = true;
    }
    data.userInfoFlag = userInfoFlag;
    var loading = weui.loading('提醒中……', {
      className: 'custom-classname'
    });
    return axios.post(url, data).then((res) => {
      loading.hide(function () {
        console.log('`loading` has been hidden');
      });
      return Promise.resolve(res.data)
    })
  }) 
}

// 点击发送邀请卡
export function sendInvitationCard(m) {
  var url = host + '/api/clockPunch/sendInvitationCard'
  return changeData(m).then(data => {
    var userInfoFlag = false;
    if (localStorage.getItem('userInfo')) {
      userInfoFlag = true;
    }
    data.userInfoFlag = userInfoFlag;
    return axios.post(url, data).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}

// 点击发送打卡图
export function sendPunchCard(m) {
  var url = host + '/api/clockPunch/sendPunchCard'
  return changeData(m).then(data => {
    var userInfoFlag = false;
    if (localStorage.getItem('userInfo')) {
      userInfoFlag = true;
    }
    data.userInfoFlag = userInfoFlag;
    return axios.post(url, data).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}

// 测试调用微信服务器的接口
export function sendTest(m) {
  var url = host + '/api/clockPunch/sendImg';
  return changeData(m).then(data => {
    var userInfoFlag = false;
    if (localStorage.getItem('userInfo')) {
      userInfoFlag = true;
    }
    data.userInfoFlag = userInfoFlag;
    return axios.post(url, data).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}

// 测试调用微信服务器的接口
export function ceAPI() {
  var url = 'http://192.168.0.106:8080/RhSys?merId=777290058110048&txnAmt=1000';
  return axios.post(url, {}).then((res) => {
    return Promise.resolve(res.data)
  })
}