/**
 * Created by limeiling on 18-3-1
 */


class Grid extends egret.DisplayObjectContainer {

    public _index:number = 0;
    public _type:number = 0;
    public _imgIco:egret.Bitmap;

    /**
     * egret.EventDispatcher 是egret的事件派发器类，负责进行事件的发送和侦听
     */
    public _dispatcher:egret.EventDispatcher;

    constructor() {
        super();

        this._imgIco = new egret.Bitmap();
        this.touchEnabled = true;
        this.addChild(this._imgIco);
    }

    public touchTapHandler(evt: egret.TouchEvent) {
        //派发一个指定的事件 ‘GridTouchTap’
        this._dispatcher.dispatchEventWith("GridTouchTap", true);
    }

    public reset(index:number, type: number, data:any, scale:number) {
        this._imgIco.texture = data;
        this._imgIco.scaleX = scale;
        this._imgIco.scaleY = scale;
        this._index = index;
        this._type = type;
    }
}