// 使用jq操作
(function(){

    // 轮播图
    (function(){
        let $banner = $("#banner");
        // var $li = $("#banner ul li");
        let $li = $banner.find("ul li");   // 这样性能更好
        let $span = $banner.find(".btn span");
        let count = 0; 
        let time = 0;
        let timer = null;

        // let arrAnimate = [
        //     "tb",    // 上到下移动
        //     "lr",    // 左到右移动  
        //     "bt",    // 下到上移动
        //     "fade",  // 淡入淡出
        //     "tbr",   // 上到下的翻转
        //     "btr",   // 下到上的翻转
        //     "tbc",   // 上到下中心翻转
        //     "btc",   // 下到上中心翻转
        //     "rlc",   // 右到左中心翻转
        //     "lrc",   // 左到右中心翻转
        //     "zon",   // 缩放
        //     "lrr",   // 左到右翻转
        //     "rlr",   // 右到左翻转
        //     ];
        // // 随机切换动画
        // function animate(index){       
        //     var rod = Math.floor(Math.random() * (arrAnimate.length - 1)); 
        //     $li.eq(index).prop("class", arrAnimate[rod] + "A");
        //     $li.eq(!index + 0).prop("class",arrAnimate[rod] + "B");   
        // }  

        // 使用闭包优化自动切换动画
        let animate = (function(){
            let arrAnimate = [
                "tb",    // 上到下移动
                "lr",    // 左到右移动  
                "bt",    // 下到上移动
                "fade",  // 淡入淡出
                "tbr",   // 上到下的翻转
                "btr",   // 下到上的翻转
                "tbc",   // 上到下中心翻转
                "btc",   // 下到上中心翻转
                "rlc",   // 右到左中心翻转
                "lrc",   // 左到右中心翻转
                "zon",   // 缩放
                "lrr",   // 左到右翻转
                "rlr",   // 右到左翻转
                ];
            return function(index){
                var rod = Math.floor(Math.random() * arrAnimate.length); 
                $li.eq(index).prop("class", arrAnimate[rod] + "A");
                $li.eq(!index + 0).prop("class",arrAnimate[rod] + "B");   
            }
        })();

        // 点击事件
        $span.click(function(){
            // 获取点击按钮的索引
            if(new Date() - time < 500) return;
            time = new Date();
            let index = $(this).index();   
            // console.log(index);
            if(index == count) return;
            count = index;   // 保存当前点击按钮
            // 给当前点击加样式    給自己兄弟元素移除样式
            $(this).addClass("on").siblings().removeClass("on");
            animate(count);
        });
       
        // 自动轮播
        function moveAuto(){
            clearInterval(timer);
            timer = setInterval(() => {
                time = new Date();
                count = !count + 0;
                $span.eq(count).addClass("on").siblings().removeClass("on"); 
                animate(count);
            }, 4000);
        }
        moveAuto();
        // 鼠标在图片上暂停
        $banner.hover(function(){
            clearInterval(timer);
        },function(){
            moveAuto();
        });

    })();
    
    // 选项卡
    (function(){
        let $li = $("#sell-well .hot-product .products .product-left .product-list ul li");
        let $content = $("#sell-well .hot-product .products .product-left .contenting");
        let count = 0;
        // 事件监听
        $li.click(function(){
            var index = $(this).index();
            console.log(index);
            count = index;
            // 列表区
            $(this).prop("class","hot-cake").siblings().prop("class","list-cake");
            // 类名的添加移除操作
            // $(this).addClass("hot-cake").siblings().removeClass("hot-cake");
            // 图片区
            $content.eq(count).show().siblings().hide();
        });

    })();
    
    // 侧边栏
    (function(){

        var $btn = $("#onbtn");
        var $ul = $("#sidebar .main");
        var $prev = $("#sidebar .main .prev-btn");
        var $next = $("#sidebar .main .next-btn");
        var bool = false;
    
        // 点击隐藏功能
        $btn.click(function(){
            bool = !bool;
            if(bool){
                $ul.css("right","-100%");
                $(this).addClass("on")
            }else{
                $ul.css("right","0%");
                $(this).removeClass("on");
            }
        });
        // 上点击功能(一定要先移动才能用)
        $(window).scroll(function(){
            let top = $(window).scrollTop() || $("html").scrollTop();
            // console.log(top);
            $prev.click(function(){
                var totop = top - 500;
                if(totop < 0) return;
                $("html")
                .stop()
                .animate({scrollTop : totop},500);
            });
            // 下点击功能
            $next.click(function(){
                var tobut = top + 500;
                    $("html")
                    .stop()
                    .animate({scrollTop : tobut},500);
            });
        });
        

    })();

    // 返回顶部
    (function(){
        let $btn = $("#backTop");
        // 滚轮事件
        $(window).scroll(function(){   
            let backTop = $(window).scrollTop() || $("html").scrollTop();
            let winTop = window.innerHeight;
            if(backTop > winTop){
                $btn.css("display","block");
            }else{
                $btn.css("display","none");
            }
        });
        // 点击事件
        $btn.click(function(){
            $("html")
            .stop()
            .animate({scrollTop : 0},600);
            //         要到达的高度
        });
    })();

    // 使用原生写返回顶部
    // (function(){
    //     var oBtn = document.getElementById("backTop");
    //     var timer = null;
    //     var bool = false;     // 加锁用于返回顶部触发滚轮事件
    //     // 滚轮事件
    //     window.onscroll = function(){
    //         var toTop = document.documentElement.scrollTop || document.body.scrollTop;
    //         // console.log(toTop);
    //         var winHeight = window.innerHeight;
    //         if(toTop > winHeight){
    //             oBtn.style.display = "block";
    //         }else{
    //             oBtn.style.display = "none";
    //         }
    //         if(!bool){
    //             clearInterval(timer);
    //         }else{
    //             bool = false;    // 当返回顶部拉动滚动条触发
    //         }
    //     }
    //     // 点击返回顶部
    //     oBtn.onclick = function(){
    //         // 防止点击多次开启多次
    //         clearInterval(timer);
    //         timer = setInterval(() => {
    //             var toTop = document.documentElement.scrollTop || document.body.scrollTop;
    //             console.log(toTop);
    //             var spend = Math.floor(toTop/6);
    //             // console.log(spend);
    //             document.documentElement.scrollTop = toTop - spend;
    //             bool = true;
    //             if(toTop < 20){
    //                 clearInterval(timer);
    //             }
    //         }, 30);         
    //     }
    // })();

})();