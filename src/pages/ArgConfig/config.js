export const TreeData = [
    {
        id: 1,
        label: "车间连接系统",
        children: [
            {
                id: "buffer",
                label: "缓冲器型号",
                children: [
                    {
                        id: "/page/arg-cfg/buffer-curve",
                        url: "/page/arg-cfg/buffer-curve",
                        label: "描点法设置"
                    },
                    {
                        id: "/page/arg-cfg/buffer-piecewise",
                        url: "/page/arg-cfg/buffer-piecewise",
                        label: "分段函数法设置"
                    },
                    {
                        id: "/page/arg-cfg/bgf",
                        url: "/page/arg-cfg/bgf",
                        label: "本构法设置"
                    }
                ]
            },
            {
                id: "ykgTmpe",
                label: "压溃管",
                url: "/page/arg-cfg/ykg"
            }
            // {
            //     id: "tcsd",
            //     label: "牵引力曲线",
            //     url: "/page/arg-cfg/tcsd"
            // }
        ]
    }
];
