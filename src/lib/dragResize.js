const DragResize = {
    minW: 100,
    minH: 100,
    init(params = {}) {
        let {
            dragDom,
            resizeDom,
            minW,
            minH
        } = params;

        minW && (this.minW = minW);
        minH && (this.minH = minH);

        dragDom.onmousedown = function (ev) {
            console.log(ev);
            var disX = ev.clientX - dragDom.offsetLeft;
            var disY = ev.clientY - dragDom.offsetTop;

            var resizeDomW = resizeDom.offsetWidth;
            var resizeDomH = resizeDom.offsetHeight;

            console.log('resize dom size : ', resizeDomW, resizeDomH)

            console.log(this.minH, this.minW);

            document.onmousemove = function (ev) {
                var wDiff = ev.clientX - disX;
                var hDiff = ev.clientY - disY;

                console.log('diff : ', wDiff, hDiff);

                // let newH = resizeDomH + hDiff;
                // let newW = resizeDomW + wDiff;

                let newH = hDiff >= DragResize.minH ? hDiff : DragResize.minH;
                let newW = wDiff >= DragResize.minW ? wDiff : DragResize.minW;

                console.log('new size : ', newH, newW);

                resizeDom.style.height = newH + "px";
                resizeDom.style.width = newW + "px";
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
}

export default DragResize;
