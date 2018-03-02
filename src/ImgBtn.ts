/**
 * Created by limeiling on 18-3-1
 */
class ImgBtn extends egret.Sprite {
    private _downImg:egret.Bitmap;
    private _upImg:egret.Bitmap;
    private _dispatcher:egret.EventDispatcher;

    public constructor() {
        super();
    }

    public createBtn(upData: any, downData: any, dispatcher: egret.DisplayObject) {
        this._downImg=new egret.Bitmap();
        this._upImg=new egret.Bitmap();
        this._downImg.texture=downData;
        this._upImg.texture=upData;
        this.touchEnabled=true;
        this._dispatcher=dispatcher
        this.addChild(this._downImg);
        this.addChild(this._upImg);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.upHandler, this);
    }

    public downHandler(evt: egret.TouchEvent) {
        this._downImg.visible = true;
        this._upImg.visible = false;
    }

    public upHandler(evt: egret.TouchEvent) {
        this._downImg.visible = false;
        this._upImg.visible = true;
        //
    }
}