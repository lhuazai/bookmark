import events from './events';
const TYPE_ENUM = {
  PING: 'ping', // 心跳ping
  PONG: 'pong' // 心跳pong
};
const SOCKET_MESSAGE_PROCESS_TYPE_ENUM = {
  BUSINESS_PROCESS: 'business_process', // 业务处理
  REMIND: 'remind', // 消息通知(右侧弹出，自动关闭)
  POPUP_REMIND: 'popup_remind' // 消息通知(中间弹出，手动关闭)
};
const MESSAGE_TYPE_ENUM = {
  WX_LOGIN_QR_CODE: 'wx_login_qr_code', // 微信授权成功
};
const WS = {
  // socket实例
  ws: null,
  // 心跳定时器
  pingInterval: null,
  // 检测心跳响应定时器
  pingTimeout: null,
  reconnectionTimeout: null,
  // 是否是重连标识
  isReconnection: false,
  // 挂载
  install: function (Vue) {
    Vue.prototype.$createSocket = this.createSocket.bind(this);
    Vue.prototype.$socket = this.socket.bind(this)();
  },
  // ws实例 & 绑定消息监听
  socket: function () {
    return {
      ws: this.ws,
      on: this.on,
      sendMessage: this.sendMessage.bind(this),
      reconnectionSuccess: this.reconnectionSuccess.bind(this)
    };
  },
  // 创建WebSocket
  async createSocket (opts) {
    const url = `${opts.url}-${new Date().getTime()}`;
    this.ws = new WebSocket(url);
    this.ws.onopen = () => this.onWebsocketOpen(opts);
    this.ws.onmessage = this.onWebsocketMessage.bind(this);
    this.ws.onerror = () => this.onWebsocketError(opts);
    this.ws.onclose = () => this.onWebsocketClose(opts);
  },
  /** 监听消息
   * @param {string} messageType 监听socket消息的类型
   */
  on: function (messageType) {
    return {
      message: function () {
        const callback = arguments[0];
        // 设置消息监听
        events.on(messageType, (data) => {
          callback.call(this, data);
        });
        // 设置可链式调用
        return WS.socket();
      }.bind(this)
    };
  },
  /**
   * 发送数据
   * @param {any} message 需要发送的数据
   */
  sendMessage (message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) { // 链接已打开
      this.ws.send(JSON.stringify({
        type: '',
        data: message
      }));
    } else if (this.ws && this.ws.readyState === WebSocket.CONNECTING) { // 建立链接中...
      setTimeout(() => {
        this.sendMessage(message);
      }, 100);
    }
  },
  /** WebSocket打开成功
   * @param {object} opts 配置参数
   */
  onWebsocketOpen (opts) {
    this.initPingHeartbeat(opts.time, opts.ping);
    // 派发重连成功消息
    if (this.isReconnection) {
      this.dispatchReconnectionSuccess();
    }
  },
  /** 发送心跳
   * @param {number} time 心跳间隔毫秒 默认30000
   * @param {string} ping 心跳名称 默认字符串ping
   */
  initPingHeartbeat (time = 30000, ping = 'ping') {
    this.pingInterval && clearInterval(this.pingInterval);
    this.pingInterval = setInterval(() => {
      // 发送心跳
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          type: ping,
          data: ''
        }));
      }
      // 定时检测心跳有无响应
      this.pingTimeout = setTimeout(() => {
        if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
          console.warn('=主动关闭websocket链接=');
          clearInterval(this.pingInterval);
          this.ws.close();
        }
      }, 3000);
    }, time);
  },
  /**
   * 收到消息
   * @param {object} ws 消息内容
   * */
  onWebsocketMessage (ws) {
    try {
      // 清除关闭socket定时器
      this.pingTimeout && clearTimeout(this.pingTimeout);
      // 处理接收到的数据
      let data = {};
      try {
        data = JSON.parse(ws.data);
      } catch (err) {
        console.error(err);
      }
      // 服务端发送心跳回应
      if (data.type === TYPE_ENUM.PING && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          type: 'pong',
          data: ''
        }));
        return;
      }

      // 前端发送心跳响应，无需处理
      if (data.type === TYPE_ENUM.PONG) return;

      const smpt = data.socketMessageProcessType;

      // 判断消息类型（右侧弹出方式）
      if (smpt === SOCKET_MESSAGE_PROCESS_TYPE_ENUM.REMIND) {
        events.emit(SOCKET_MESSAGE_PROCESS_TYPE_ENUM.REMIND, data);
        return;
      }

      // 判断消息类型（中间弹出方式）
      if (smpt === SOCKET_MESSAGE_PROCESS_TYPE_ENUM.POPUP_REMIND) {
        events.emit(SOCKET_MESSAGE_PROCESS_TYPE_ENUM.POPUP_REMIND, data);
        return;
      }

      // 拦截未经定义的消息归类
      const messageProcessType = smpt && smpt.toUpperCase();
      if (!SOCKET_MESSAGE_PROCESS_TYPE_ENUM[messageProcessType]) return;

      // 事件派发
      const mst = data.socketMessageType;
      const messageType = mst && mst.toUpperCase();
      if (MESSAGE_TYPE_ENUM[messageType]) {
        events.emit(mst, JSON.parse(data.data));
      } else {
        // 消息种类不在枚举列表或消息错误
        events.emit('socket_message_error', data.data);
      }
    } catch (err) {
      console.error(err);
    }
  },
  /** 链接错误
   * @param {object} opts 配置参数
   */
  onWebsocketError (opts) {
    console.warn('=websocket链接错误=');
    this.reconnection(opts);
  },
  /** 链接被关闭
   * @param {object} opts 配置参数
   */
  onWebsocketClose (opts) {
    console.warn('=websocket被关闭=');
    this.reconnection(opts);
  },
  /** 重连
   * @param {object} opts 配置参数
   */
  reconnection (opts) {
    // 设置延迟避免请求过多
    this.reconnectionTimeout && clearTimeout(this.reconnectionTimeout);
    this.reconnectionTimeout = setTimeout(() => {
      // 判断socket状态
      if (this.ws && this.ws.readyState !== WebSocket.CLOSED && this.ws.readyState !== WebSocket.CONNECTING) {
        clearInterval(this.pingInterval);
        this.ws.close();
      }
      // 重新建立链接
      console.log('重新建立链接');
      this.isReconnection = true;
      this.createSocket(opts);
    }, 2000);
  },
  /**
   * 重连成功派发消息
   */
  dispatchReconnectionSuccess () {
    events.emit('reconnection-success');
    this.isReconnection = false;
  },
  /**
   * 执行重连成功回调函数
   */
  reconnectionSuccess: function () {
    const callback = arguments[0];
    events.on('reconnection-success', () => {
      callback.call(this);
    });
    return this.socket();
  }
};

export default WS;
