export const DateTypeEnumMonthYear ={
    radius: "28px",
    bgColor: "blue",
    styleWidth: "monospaced",
    dataArr: [
        {
            text: '月',
            dateType: "month",
            typeId: 4,
            checked: true
        },
        {
            text: '年',
            dateType: "year",
            typeId: 5,
            checked: false
        }
    ]
}
export const DateTypeEnumBase = [{
        text: '日',
        dateType: "date",
        typeId: 2, //后端接口使用key
        checked: true //前段默认选项字段
    },
    {
        text: '月',
        dateType: "month",
        typeId: 4,
    }
]
export const DateTypeEnums = [{
        text: '时',
        dateType: "hour",
        typeId: 1, //后端接口使用key

    }, {
        text: '日',
        dateType: "date",
        typeId: 2, //后端接口使用key
        checked: true //前段默认选项字段
    },
    {
        text: '月',
        dateType: "month",
        typeId: 4,
    },
    {
        text: '年',
        dateType: "year",
        typeId: 5,
    }
]
