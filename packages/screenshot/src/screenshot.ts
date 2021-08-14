import "./style/index.scss";
import { EventManager, isUndef, logError } from "@media/utils";
import { ScreenshotOptions } from "./types";
import { downloadBase64 } from "./js/utils";
import { ClassNameEnum, CustomEvents, PlayerEvents } from "./config/enum";
import { downloadPicName } from "./config/constant";

const defaultOptions = {
  open: true,
  download: true
};

class Screenshot {
  // 插件名称.
  static pluginName = "Screenshot";
  // 播放器的dom
  private el: HTMLElement;
  // 播放器实例
  private instance: any;
  // 播放器构造函数
  private Player: any;
  // dom元素
  private element: HTMLElement | null;
  // 事件管理器
  private eventManager: EventManager | null;
  // 参数
  private options: ScreenshotOptions;

  constructor(el: HTMLElement, instance: any, Player: any) {
    // 保存一下播放器给来的参数
    this.el = el;
    this.instance = instance;
    this.Player = Player;
    // 合并默认参数
    const options = this.instance.options?.screenshotOptions ?? {};
    this.options = { ...defaultOptions, ...options };
    // 初始化
    this.handleInit();
  }

  private handleInit() {
    // 功能关闭的情况下不进行初始化
    if (this.options.open) {
      this.initVar();
      // 给播放器实例扩展方法
      this.extendMethods();
      // 初始化dom
      this.initElement();
      // 销毁
      this.instance.$on(PlayerEvents.DESTROY, () => {
        this.destroy();
      });
    }
  }

  private initVar() {
    this.eventManager = new EventManager();
  }

  // 扩展方法
  private extendMethods() {
    this.instance.extend({
      screenshot: () => this.onClick()
    });
  }

  // 渲染小图标
  private initElement() {
    const span = document.createElement("span");
    span.className = ClassNameEnum.ICON;
    const parentNode = this.el.querySelector(".player-controls-right");
    parentNode?.insertBefore(span, parentNode?.firstElementChild);
    this.element = span;
    // 监听事件
    this.initListener();
  }

  private initListener() {
    this.eventManager?.addEventListener({
      element: this.element,
      eventName: "click",
      handler: this.onClick.bind(this)
    });
  }

  private removeListener() {
    this.eventManager?.removeEventListener();
  }

  private onClick() {
    const imageSrc = this.getVideoImage();
    // 广播事件
    this.instance.$emit(CustomEvents.SCREENSHOT, imageSrc);
    if (this.options.download && !isUndef(imageSrc)) {
      // 下载图片
      this.downloadImage(imageSrc);
    }
  }

  private downloadImage(imageSrc: string) {
    downloadBase64(this.options.picName || downloadPicName, imageSrc);
  }

  private getVideoImage() {
    const videoElement = this.el.querySelector(
      ".player-video"
    ) as HTMLVideoElement;
    if (!isUndef(videoElement)) {
      try {
        // 截图视频
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        // 获取视频宽高
        const videoInfo = this.getVideoInfo(videoElement);
        canvas.width = videoInfo.width;
        canvas.height = videoInfo.height;
        ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL() || null;
      } catch (error) {
        logError(error);
        return null;
      }
    }
    return null;
  }

  // 获取视频宽高，视频的真实宽高不一定等于容器的宽高，需要通过公式计算出来
  private getVideoInfo(videoElement: HTMLVideoElement) {
    const videoRatio = videoElement.videoWidth / videoElement.videoHeight;
    let width = videoElement.offsetWidth;
    let height = videoElement.offsetHeight;
    const elementRatio = width / height;
    if (elementRatio > videoRatio) width = height * videoRatio;
    else height = width / videoRatio;
    return {
      width: width,
      height: height
    };
  }

  private destroy() {
    this.removeListener();
  }
}

export default Screenshot;
