// new_components/toast/toast.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    menu: {
      type: Array,
      value: [],
      observer(select) {
        // this.setData({
        //   swiperHeight: '0px'
        // })
        // if(select.length>0){
        //   setTimeout(()=>{
        //     this.setSwiperHeight();
        //   },200)
        // }
      },
    },
    menuStyle: {
      type: String,
      value: ''
    },
    menuShow:{
      type: Boolean,
      value: true
    },
    height:{
      type: Number,
      value: 0,
      observer(nh,h) {
        if(nh>0){
          this.setData({
            swiperHeight: nh+'rpx'
          })
        }
      }
    },
    index:{
      type: Number,
      value: 0,
      observer(val) {
        if(val===0 && this.data.swiperIndex>0){ // 中途切换到0
          this.checkFirst(val);
        } else if(val>0 && this.data.swiperIndex===0){ // 直接设置了大于0的参数
          this.changeType = 'click';
          this.checkFirst(val);
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperHeight: '0',
    menuFlag:{
      left:'',
      width:''
    },
    swiperIndex: 0,
  },
  lifetimes: {
    attached: function() {
      setTimeout(()=>{
        let {index} = this.properties;
        if(index===0){ // 首次进入默认0
          this.checkFirst(index);
        }
      },100)
      this.menuPosition=[]; // 菜单位置集合
      this.changeType = ''; // 切换swiper的方式，滑动move，点击click
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 首次进入
    checkFirst(swiperIndex){
      if(this.setTime){
        clearTimeout(this.setTime);
        this.setTime = null;
      }
      this.setTime = setTimeout(()=>{
        this.getMenuPostion(()=>{
          this.setData({
            swiperIndex,
            menuFlag: Object.assign({},this.menuPosition[swiperIndex])
          })
          this.setSwiperHeight();
        });
      },200)
    },
    // 菜单点击
    swiperClick({currentTarget:{dataset:{index}}}){
      // 设置位置
      const {menuShow}=this.properties;
      const {menuPosition} = this;
      if(menuShow && menuPosition.length>0){
        this.changeType = 'click';
        this.setData({
          swiperIndex: index,
          menuFlag: Object.assign({},menuPosition[index])
        })
      }
    },
    // 滚动开始
    swiperStart(){
      if(!this.changeType){
        this.changeType = 'move'
      }
    },
    // 滑动结束 
    swiperFinish({detail:{current}}) {
      this.setData({
        swiperIndex: current
      })
      this.changeType='';
      this.setSwiperHeight();
      this.triggerEvent('swiperChange',{index: current,height: this.data.swiperHeight});
    },

    // 设置swiper高度
    setSwiperHeight(){
      if(this.properties.height){
        console.log(this.properties.height,'-----888')

        return;
      }
      const {swiperIndex=0}=this.data;
      const query = wx.createSelectorQuery().in(this);
      query.select('.swiper-item-'+swiperIndex).boundingClientRect(rect=> {
        if(rect && rect.height){
          const height = rect.height;
          this.setData({
            swiperHeight: height+'px'
          })
        }
      }).exec();
    },
    // 获取菜单位置
    getMenuPostion(fun){
      const {menu,menuShow} = this.properties;
      const menuLeng = menu.length;
      if(!menuShow || menuLeng<1){
        return
      }
      const {menuPosition} = this;
      if(menuPosition.length>0){
        fun && fun();
        return;
      }
      for(let i=0; i<menuLeng; i++){
        const query = wx.createSelectorQuery().in(this);
        query.select('.menu-item-'+i).boundingClientRect(rect=>{
          if(rect){
            menuPosition[i] = {
              left: rect.left,
              width: rect.width,
            }
            if(i==(menuLeng-1)){
              this.menuPosition = menuPosition;
              fun && fun();
            }
          }
        }).exec();
      }
    },
    // swiper 移动
    swiperMoving({detail:{dx}}){
      const {swiperIndex}=this.data;
      const {menuPosition} = this;
      if(this.changeType==='click'){
        this.setData({
          menuFlag: Object.assign({},menuPosition[swiperIndex]),
        })
        return;
      }
      let aim = swiperIndex+1;
      if(dx<0){
        aim = swiperIndex-1;
      }
      if(menuPosition[aim]){
        let _left_add = (dx/375).toFixed(4) * Math.abs(menuPosition[aim].left - menuPosition[swiperIndex].left);
        let left = menuPosition[swiperIndex].left + _left_add.toFixed(4)*1;
        this.setData({
          ['menuFlag.left']: left
        })
      }
    }
  },
});
