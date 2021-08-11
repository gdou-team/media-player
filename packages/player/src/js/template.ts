import Player from "../constructor";
import { t } from "../locale";
import templateTpl from "../template/layout.art";

import {
  HtmlElementProp,
  HTMLVideoElementProp,
  NodeListElement,
  PlayerOptions
} from "../types/index";
import { CustomEvents } from "./event";

interface OptionsParams extends PlayerOptions {
  instance: Player;
}

class Template {
  private options: OptionsParams;

  containerElement: HtmlElementProp;

  playElement: HtmlElementProp;

  videoElement: HTMLVideoElementProp;

  currentTimeElement: HtmlElementProp;

  totalTimeElement: HtmlElementProp;

  videoLoadedElement: HtmlElementProp;

  videoPlayedElement: HtmlElementProp;

  progressMaskElement: HtmlElementProp;

  progressBallElement: HtmlElementProp;

  videoMaskElement: HtmlElementProp;

  fullscreenBrowserElement: HtmlElementProp;

  fullscreenWebElement: HtmlElementProp;

  loadingWrapperElement: HtmlElementProp;

  processTimeElement: HtmlElementProp;

  volumeMaskElement: HtmlElementProp;

  volumeBallElement: HtmlElementProp;

  volumeButtonElement: HtmlElementProp;

  volumeWrapperElement: HtmlElementProp;

  volumeProcessElement: HtmlElementProp;

  volumeContainerElement: HtmlElementProp;

  volumeAnimationElement: HtmlElementProp;

  speedWrapperElement: HtmlElementProp;

  speedLabelElement: HtmlElementProp;

  speedItemsElement: NodeListElement;

  definitionWrapperElement: HtmlElementProp;

  definitionLabelElement: HtmlElementProp;

  definitionItemsElement: NodeListElement;

  tipElement: HtmlElementProp;

  controlsElement: HtmlElementProp;

  constructor(options: OptionsParams) {
    this.options = options;
    this.initTemplate();
    this.initElement();
    this.initListener();
  }

  private initTemplate() {
    const el = this.options.el as HTMLElement;
    const html = templateTpl({
      ...this.options,
      liveTip: t("live")
    });
    el.innerHTML = html;
  }

  private initElement() {
    const el = this.options.el as HTMLElement;
    this.containerElement = el.querySelector(".player-container");
    this.videoElement = el.querySelector(".player-video");
    this.videoMaskElement = el.querySelector(".player-video-mask");
    this.playElement = el.querySelector(".player-status-button");
    this.currentTimeElement = el.querySelector(".player-currentTime");
    this.totalTimeElement = el.querySelector(".player-totalTime");
    this.videoLoadedElement = el.querySelector(".player-process-loaded");
    this.videoPlayedElement = el.querySelector(".player-process-played");
    this.progressMaskElement = el.querySelector(".player-process-mask");
    this.progressBallElement = el.querySelector(".player-process-ball");
    this.processTimeElement = el.querySelector(".player-process-time");
    this.fullscreenBrowserElement = el.querySelector(
      ".player-fullscreen-browser"
    );
    this.fullscreenWebElement = el.querySelector(".player-fullscreen-web");
    this.loadingWrapperElement = el.querySelector(".player-loading-container");
    this.volumeMaskElement = el.querySelector(".player-volume-mask");
    this.volumeBallElement = el.querySelector(".player-volume-ball");
    this.volumeButtonElement = el.querySelector(".player-volume-button");
    this.volumeWrapperElement = el.querySelector(".player-volume-wrapper");
    this.volumeProcessElement = el.querySelector(".player-volume-process");
    this.volumeContainerElement = el.querySelector(".player-volume-container");
    this.volumeAnimationElement = el.querySelector(".player-volume-animation");
    this.speedWrapperElement = el.querySelector(".player-speed-wrapper");
    this.speedLabelElement = el.querySelector(".player-speed-label");
    this.speedItemsElement = el.querySelectorAll(".player-speed-item");
    this.definitionWrapperElement = el.querySelector(
      ".player-definition-wrapper"
    );
    this.definitionLabelElement = el.querySelector(".player-definition-label");
    this.definitionItemsElement = el.querySelectorAll(
      ".player-definition-item"
    );
    this.tipElement = el.querySelector(".player-tip");
    this.controlsElement = el.querySelector(".player-controls");
  }

  private initListener() {
    const instance = this.options.instance;
    instance.$on(
      CustomEvents.SWITCH_DEFINITION_END,
      this.onElementReload.bind(this)
    );
  }

  private onElementReload() {
    const el = this.options.el as HTMLElement;
    this.videoElement = el.querySelector(".player-video");
  }

  private resetData() {
    this.containerElement = null;
    this.playElement = null;
    this.videoElement = null;
    this.currentTimeElement = null;
    this.totalTimeElement = null;
    this.videoLoadedElement = null;
    this.videoPlayedElement = null;
    this.progressMaskElement = null;
    this.progressBallElement = null;
    this.videoMaskElement = null;
    this.fullscreenBrowserElement = null;
    this.fullscreenWebElement = null;
    this.loadingWrapperElement = null;
    this.processTimeElement = null;
    this.volumeMaskElement = null;
    this.volumeBallElement = null;
    this.volumeButtonElement = null;
    this.volumeWrapperElement = null;
    this.volumeProcessElement = null;
    this.volumeContainerElement = null;
    this.volumeAnimationElement = null;
    this.speedWrapperElement = null;
    this.speedLabelElement = null;
    this.speedItemsElement = null;
    this.definitionWrapperElement = null;
    this.definitionLabelElement = null;
    this.definitionItemsElement = null;
    this.tipElement = null;
    this.controlsElement = null;
  }

  destroy() {
    this.resetData();
  }
}

export default Template;
