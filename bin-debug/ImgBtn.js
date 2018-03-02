var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by limeiling on 18-3-1
 */
var ImgBtn = (function (_super) {
    __extends(ImgBtn, _super);
    function ImgBtn() {
        return _super.call(this) || this;
    }
    ImgBtn.prototype.createBtn = function (upData, downData, dispatcher) {
        this._downImg = new egret.Bitmap();
        this._upImg = new egret.Bitmap();
        this._downImg.texture = downData;
        this._upImg.texture = upData;
        this.touchEnabled = true;
        this._dispatcher = dispatcher;
        this.addChild(this._downImg);
        this.addChild(this._upImg);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.upHandler, this);
    };
    ImgBtn.prototype.downHandler = function (evt) {
        this._downImg.visible = true;
        this._upImg.visible = false;
    };
    ImgBtn.prototype.upHandler = function (evt) {
        this._downImg.visible = false;
        this._upImg.visible = true;
        //
    };
    return ImgBtn;
}(egret.Sprite));
__reflect(ImgBtn.prototype, "ImgBtn");
