/**
 * Created by limeiling on 18-3-1
 */

/**
 * egret
 * egret.SpriteSheet 是一张由多个子位图拼接而成的集合位图
 */
class GameView extends egret.DisplayObjectContainer {

    public _gridLvArr:number[]=[2,3,3,4,4,5,5,6,6,7,7,7,8,8,8,8,8,9];
    public _gridTypeArr:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    public _scoreLvDes:string[]=["无药可救","重度脸盲","中度脸盲","轻度脸盲","顿足捶胸","手疾眼快","火眼金睛"];
    public _scoreLv:Array<number>=[21,31,41,51,56,60];

    public _currentLv: number = 0;
    public _score:number=0;
    public _totalTime:number = 30 * 1000;
    /**
     * Timer 类是计时器的接口，它使您能按指定的时间序列运行代码。使用 start() 方法来启动计时器。
     * 使用stop停止计时器。
     */
    public _gameTimer = new egret.Timer(1, 30);
    public _runTime:number = 0;

    public _res:egret.SpriteSheet;
    public _startBtn:ImgBtn;
    public _moreBtn:ImgBtn;

    public _restartBtn: ImgBtn;

    public _gameDesLable1:eui.Label;
    public _gameDesLable2:eui.Label;
    public _lvDesLable:eui.Label;
    public _gridContainer: egret.Sprite;
    public _gridPool:Array<Grid>;
    public _scoreLaber:eui.Label;
    public _timeLabel:eui.Label;

    public _zxh:egret.Bitmap=new egret.Bitmap();

    public _shareImgtDown: egret.Texture;
    public _shareImgtUp: egret.Texture;

    public __title:string="测测你有脸盲症吗！";
    public __desc:string="你以为你躲起来就找不到你了吗，没有用的！";
    public __iconLink:string="http://egret-game.b0.upaiyun.com/icons/10000007.jpg";

    public constructor() {
        super();
    }

    public createGame(res: egret.SpriteSheet) {

        this._res = res;
        this._startBtn = new ImgBtn();
        this._startBtn.x = 85;
        this._startBtn.y = 385;
        this._startBtn.createBtn(this._res.getTexture("start1"), this._res.getTexture("start2"), this);
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.firstStartGame, this);

        this._zxh.texture = this._res.getTexture("zxh");

        this._restartBtn = new ImgBtn();
        this._restartBtn.x = 85;
        this._restartBtn.y = 385;
        this._restartBtn.createBtn(this._res.getTexture("restart1"), this._res.getTexture("restart2"), this);
        this._restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);

        this._moreBtn=new ImgBtn();
        this._moreBtn.createBtn(this._res.getTexture("more1"),this._res.getTexture("more2"),this);
        this._moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.more,this);
        this._moreBtn.x=85;
        this._moreBtn.y=500;

        this._gameDesLable1 = new eui.Label();
        this._gameDesLable1.text= "茫茫人海中";
        this._gameDesLable1.x = 175;
        this._gameDesLable1.y = 70;

        this._gameDesLable2 = new eui.Label();
        this._gameDesLable2.text = "你的小伙伴在哪里？";
        this._gameDesLable2.x = 126;
        this._gameDesLable2.y = 120;

        this._lvDesLable=new eui.Label();
        this._lvDesLable.text="";
        this._lvDesLable.size=30;
        this._lvDesLable.x=20;
        this._lvDesLable.y=320;

        this._scoreLaber=new eui.Label();
        this._scoreLaber.text="得分："+this._score.toString();
        this._scoreLaber.x=30;
        this._scoreLaber.y=35;

        this._timeLabel=new eui.Label();
        this._timeLabel.x=220;
        this._timeLabel.y=35;
        this._timeLabel.text="60";

        this._gridContainer = new egret.Sprite();
        this._gridContainer.y = 140;
        this._gridContainer.x = 0;
        this._gridContainer.width = this.width;
        this._gridContainer.height = this.width;
        this._gridContainer.graphics.beginFill(0xffffff);
        this._gridContainer.graphics.drawRect(0, 0, this._gridContainer.width, this._gridContainer.height);
        this._gridContainer.graphics.endFill();

        this.initGameStartView();
        this.initGridPool();
    }

    private initGameStartView() {
        this.addChild(this._gameDesLable1);
        this.addChild(this._gameDesLable2);
        this.addChild(this._startBtn);
        this.addChild(this._moreBtn);

        this._zxh.x = 195;
        this._zxh.y = 200;
        this.addChild(this._zxh);
    }

    public initGridPool() {
        this._gridPool = [];
        for (let i:number = 0; i < 81; i++) {
            const grid:Grid = new Grid();
            this._gridPool.push(grid);
        }
    }

    public firstStartGame() {
        this.removeChild(this._gameDesLable1);
        this.removeChild(this._gameDesLable2);
        this.removeChild(this._startBtn);
        this.removeChild(this._zxh);
        this.removeChild(this._moreBtn);

        this.startGame();
    }

    private more() {
        //
    }

    public startGame() {
        this.addChild(this._scoreLaber);
        this.addChild(this._timeLabel);
        this.addChild(this._gridContainer);
        this.createGrids(this.getGridLv(this._currentLv));

        // egret.Ticker 已作废
        // egret.Ticker.getInstance().register(this.loop, this);
        /**
         * egret.TimerEvent 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
         * egret.TimerEvent.TIMER 每当 Timer 对象达到根据 Timer.delay 属性指定的间隔时调度。
         * egret.TimerEvent.TIMER_COMPLETE 每当 Timer 每当它完成 Timer.repeatCount 设置的请求数后调度。
         */
        // this._gameTimer.addEventListener(egret.TimerEvent.TIMER, this.loop, this);
        // this._gameTimer.start();
    }

    /**
     * getGridLv
     */
    public getGridLv(lv: number) {
        if(lv > this._gridLvArr.length - 1) {
            return 9;
        }
        return this._gridLvArr[lv];
    }

    public _space:number = 13.5;
    public _row:number = 3;
    public _line:number = 3;
    public _size:number;
    public _difPos:number;
    public createGrids(gridLv:number) {
        this.destroyGrids();
        this._row = gridLv;
        this._line = gridLv;
        this._size = (this._gridContainer.width - (gridLv + 1) * this._space) / gridLv;
        const difArr: Array<any> = this.getDifTypeAndPos(gridLv);
        let grid: Grid;
        for (let i:number = 0; i < this._row; i++) {
            for (let j:number = 0; j < this._line; j++) {
                if (i > this._row) {
                    console.log('i', i);
                }
                const index = this._row * i + j + 1;
                if (index === difArr[2]) {
                    grid = this.getGrid(index, difArr[1], j, i, true);
                } else {
                    grid = this.getGrid(index, difArr[0], j, i);
                }
                this._gridContainer.addChild(grid);
                grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gridTouchTapHandler, this);
            }
        }
    }

    public destroyGrids() {
        while(this._gridContainer.numChildren) {
            this._gridPool.push(<Grid>this._gridContainer.removeChildAt(0));
        }
    }

    public getDifTypeAndPos(gridLv:number) {
        const typelg:number = this._gridTypeArr.length;
        const type:number = Math.floor(Math.random() * typelg + 1);
        let diftype:number = Math.floor(Math.random() * typelg + 1);
        if (type === diftype) {
            diftype = type === 1 ? 2 : type - 1;
        }
        const pos:number = Math.floor(Math.random() * gridLv * gridLv + 1);
        this._difPos = pos;
        return [type, diftype, pos];
    }

    /**
     * getGrid
     */
    public getGrid(index:number, type:number, posX:number, posY:number, b?:boolean) {
        let grid:Grid = this._gridPool.shift();
        let dataName:string = String(type);
        const data:egret.Texture = this._res.getTexture(dataName);
        grid.width = this._size;
        grid.height = this._size;
        const scale:number = this._size / 142;
        grid.x = (posX + 1) * this._space + posX * this._size;
        grid.y = (posY + 1) * this._space + posY * this._size;
        grid._dispatcher = this;
        grid.reset(index, type, data, scale);

        return grid;
    }

    /**
     * gridTouchTapHandler
     */
    public gridTouchTapHandler(evt:egret.TouchEvent) {
        if (evt.target._index === this._difPos) {
            this._currentLv++;
            this._score++;
            this._scoreLaber.text = `得分：${this._score.toString()}`;
            this.nextGridLv();
        }
    }

    /**
     * nextGridLv
     */
    public nextGridLv() {
        this.createGrids(this.getGridLv(this._currentLv));
    }
    /**
     * loop
     */
    public loop(spaceTime: number = 5) {
        this._runTime = this._runTime + spaceTime;
        if (this._runTime > this._totalTime) {
            // egret.Ticker.getInstance().unregister(this.loop,this);
            this._gameTimer.stop();
            this.gameOver();
        }
        const tipTime:number = Math.floor((this._totalTime - this._runTime) / 1000);
        this._timeLabel.text = String(tipTime);
    }
    public gameOver() {
        this.getLvDesByScore(this._score);
        this.initGameOverView();
    }

    /**
     * public getLvDesByScore(
     */
    public _num: number;
    public getLvDesByScore(score: number) {
        this._num = Math.floor(Math.random() * 7);
        this._lvDesLable.text = `我闯过了${score}关，被认定为${this._scoreLvDes[this._num]}`;
    }
    /**
     * initGameOverView
     */
    public initGameOverView() {
        
        this.removeChild(this._timeLabel);
        this.removeChild(this._scoreLaber);
        this.removeChild(this._gridContainer);
        this._zxh.x = 195;
        this._zxh.y = 120;
        this.addChild(this._zxh);
        this.addChild(this._lvDesLable);
        this.addChild(this._restartBtn);

        this.__title = "测测你有脸盲症吗？";
        this.__desc = `我闯过了${this._score}关，被认定为${this._scoreLvDes[this._num]}, 不服来战！`;
    }

    /**
     * restartGame
     */
    public restartGame(evt: any) {
        this._runTime = 0;
        this._score = 0;
        this._currentLv = 0;
        this._scoreLaber.text = "得分： 0";
        this._timeLabel.text = "60";
        this.removeChild(this._lvDesLable);
        this.removeChild(this._zxh);
        this.removeChild(this._restartBtn);
        this.startGame();
    }
}
