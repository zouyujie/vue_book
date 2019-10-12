// 引入mockjs
const Mock = require("mockjs");

const swiperSlidesData = {
  code: "200",
  data: [
    {
      id: 1,
      img_url: require("./imgs/sliders/1.bmp") //'/imgs/sliders/1.bmp'
    },
    {
      id: 2,
      img_url: require("./imgs/sliders/2.png") //'/imgs/sliders/2.png'
    },
    {
      id: 3,
      img_url: require("./imgs/me.jpg")
    }
  ]
};
//获取首页侧滑导航数据
Mock.mock("/homePage/sildes", "get", swiperSlidesData);

const getBookCategorylist = {
  code: "200",
  data: [
    {
      id: 1,
      img_url: require("./imgs/book/c1.jpg"), //"../../imgs/book/c1.jpg"
      title: "青春文学",
      msg: " 影视写真、穿越/重生/架空、玄幻/新武侠/魔幻/科幻"
    },
    {
      id: 2,
      img_url: require("./imgs/book/c2.jpg"), //"../../imgs/book/c2.jpg"
      title: "软件编程",
      msg: " C#、PHP、Java、Android、iOS"
    }
  ]
};
const ProgramBookSubCategory = {
  code: "200",
  data: [
    { id: 1, name: "C" },
    { id: 2, name: "C+" },
    { id: 3, name: "C#" },
    { id: 4, name: "JAVA" },
    { id: 5, name: "PHP" },
    { id: 6, name: "Python" },
    { id: 7, name: "前端" }
  ]
};
const getPhotosByCateId = function(options) {
  console.log("options", options);
  let res = [];
  switch (options.url) {
    case "/book/getPhotosByCateId/3":
      res = [
        {
          id: 31,
          title: "《ASP.NET MVC企业级实战》",
          url:
            "https://img10.360buyimg.com/n1/jfs/t3241/218/7464122794/123894/c38682fd/58b66b59N182bacd9.jpg",
          msg:
            "邹琼俊，《H5+跨平台移动应用实战开发》、《ASP.NET MVC企业级实战》作者，湖南人，.NET高级工程师，CSDN学院讲师，专注于.NETWeb开发，对.NETWeb开发有较深研究。 "
        },
        {
          id: 32,
          url:
            "https://img11.360buyimg.com/n1/jfs/t1/65264/32/246/274572/5ce74729E5ffefca8/69813fd6f99ab34e.jpg",
          title: "《零基础学C#》",
          msg:
            "《零基础学C#》是针对零基础编程学习者全新研发的C#入门教程。从初学者角度出发，通过通俗易懂的语言、流行有趣的实例，详细地介绍了使用C语言进行程序开发需要掌握的知识和技术。"
        },
        {
          id: 33,
          url:
            "http://img14.360buyimg.com/n1/jfs/t1/56557/22/798/81618/5ce79145Ebf15f608/f7dc41d561559dad.jpg",
          title: "《C# 7.0本质论 》",
          msg:
            "作为历年来深受各层次开发人员欢迎的C#指南，本书讨论了从C# 3.0到7.0的*重要的C#特性，强调了现代编程模式，可帮助读者编写简洁、强大、健壮、安全和易于维护的C#代码。"
        },
        {
          id: 34,
          title: "《深入理解C#(第3版)》",
          url:
            "https://img10.360buyimg.com/n1/g13/M05/09/17/rBEhUlNfE4cIAAAAAAUcCj-MfJEAAMnOwImCHMABRwi614.jpg",
          msg:
            "Jon Skeet，谷歌软件工程师，微软资深C# MVP，拥有10余年C#项目开发经验。自2002年以来，他一直是C#社区、新闻组、国际会议和Stack Overflow网站上非常活跃的技术专家，回答了数以万计的C#和.NET相关问题。"
        },
        {
          id: 35,
          title: "《CLR via C#（第4版）》",
          url:
            "https://img12.360buyimg.com/n1/jfs/t592/202/456590821/98535/18de523d/546b126cNda1ef951.jpg",
          msg:
            "作者Jeffrey Richter，全球知名的.NET和Windows大师和专业，经典畅销书《Windows核心编程》和《CLR》系列的作者，其著作曾因其专业性和影响力荣获中国书刊业发行协会“全行业畅销书品种”称号。"
        }
      ];
      break;
    default:
      break;
  }
  return {
    code: "200",
    data: res
  };
};
//获取图书分类数据
Mock.mock("/book/getAllCategory", "get", getBookCategorylist);
//获取编程子分类数据
Mock.mock("/book/getProgramBookSubCategory", "get", ProgramBookSubCategory);
//根据分类ID获取图片列表
Mock.mock(RegExp("/book/getPhotosByCateId" + ".*"), "get", getPhotosByCateId);
//根据图书ID获取图书详情
Mock.mock(RegExp("/book/getDetail" + ".*"), "get", function(options) {
  if ((options.url = "/book/getDetail/31")) {
    return {
      code: "200",
      data: {
        title: "ASP.NET MVC企业级实战",
        price: 89.00,
        sellPrice: 79,
        stockQuantity: 1000,
        goodsNo: "12047765",
        publishTime: "2017-03-01",
        swiperData: [
          {
            id: 1,
            img_url:
              "https://img30.360buyimg.com/shaidan/s616x405_jfs/t17680/299/503133577/263416/d049e932/5a903308N59e56f58.jpg"
          },
          {
            id: 2,
            img_url:
              "https://img30.360buyimg.com/shaidan/s616x405_jfs/t10909/206/2294541379/133868/ca726d65/59f3f159Ne6a16a2c.jpg"
          }
        ]
      }
    };
  } else {
    return {
      code: "401",
      data: {}
    };
  }
});
//所有图书列表数据
const bookListData = [
  {
    id: 31,
    thumbnail:
      "https://img10.360buyimg.com/n1/s200x200_jfs/t3241/218/7464122794/123894/c38682fd/58b66b59N182bacd9.jpg",
    sellPrice: 79,
    title: "ASP.NET MVC企业级实战"
  },
  {
    id: 32,
    thumbnail:
      "https://img12.360buyimg.com/n1/s200x200_jfs/t1/39634/38/5579/168439/5cce76c5E91840de2/7d4f43307346eff4.jpg",
    sellPrice: 69,
    title: "H5+跨平台移动应用实战开发"
  }
];
//根据图书ID集合（字符串拼接）获取图书列表
Mock.mock("/book/getshopcartlist", "post", function(options) {
  console.log("options", options);
  var body = JSON.parse(options.body);
  var _data = [];
  if (body.ids) {
    _data = bookListData.filter(n => {
      if (n.id == body.ids) {
        return n;
      }
    });
  }
  return {
    code: "200",
    data: _data
  };
});
