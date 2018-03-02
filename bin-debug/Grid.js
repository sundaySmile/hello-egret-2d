/**
 * Created by limeiling on 18-3-1
 */
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
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._type = 0;
        _this._imgIco = new egret.Bitmap();
        _this.touchEnabled = true;
        _this.addChild(_this._imgIco);
        return _this;
    }
    Grid.prototype.touchTapHandler = function (evt) {
        //派发一个指定的事件 ‘GridTouchTap’
        this._dispatcher.dispatchEventWith("GridTouchTap", true);
    };
    Grid.prototype.reset = function (index, type, data, scale) {
        this._imgIco.texture = data;
        this._imgIco.scaleX = scale;
        this._imgIco.scaleY = scale;
        this._index = index;
        this._type = type;
    };
    return Grid;
}(egret.DisplayObjectContainer));
__reflect(Grid.prototype, "Grid");
