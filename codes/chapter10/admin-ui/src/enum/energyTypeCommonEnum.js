export const EnergyTypeEnumBase = [
    {
        text: '电',
        key: "electricity",     //预留字段
        checked: true,          //前端默认选项使用
        typeId: '01',              //后端使用key
        unit: "kWh",
        // default: true,           //默认值 el-ui字段
        label: "电",             //前端使用 el-ui字段
        value: 0                 //前端使用 el-ui字段
    },
    {
        text: '水',
        key: "water",
        typeId: '02',
        unit: "m³",
        label: "水",
        value: 1
    },
    {
        text: '气',
        key: "air",
        typeId: '03',
        unit: "m³",
        label: "气",
        value: 2
    },
]

//能耗基准
export const EnergyBaseStandard = [
    {
        text: "监测数据",
        key: "",
        id: 1,
        label: "监测数据",
        value: 1
    },
    {
        text: "供电局超标数据",
        key: "",
        id: 1,
        label: "供电局超标数据",
        value: 2
    }
]
