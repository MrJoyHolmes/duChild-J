// pages/home/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    title: ["新闻动态", "公益活动", "康复教育","专家机构"],
    currentIndex:0   //改变index的值，设置当前的active页面
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchBottomTab(e){
      let index = parseInt(e.currentTarget.dataset.index); // 点击对象的index
      this.setData({  //改变currentIndex的值 控制左侧边栏的显示
        currentIndex: index
      })
    },
    changeView(e){
      const self = this;
      let index = parseInt(e.currentTarget.dataset.index); // 点击对象的index
      // console.log(e);
       this.setData({
          currentIndex: e.detail.current,
       });
    }
  }
})
