(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Waiter"],{"0035":function(t,e,a){"use strict";var l=a("cdb1"),i=a.n(l);i.a},2736:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"Waiter"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col text-center"},[a("div",{staticClass:"align-container"},[a("div",{staticClass:"align-container__item"},[a("div",{staticClass:"call-waiter"},[a("button",{staticClass:"call-waiter__button",class:{"call-waiter__button--calling":t.callWaiterLoading},attrs:{disabled:t.callWaiterLoading},on:{click:function(e){return t.callWaiter()}}},[a("bellWaiterIcon"),a("span",{staticClass:"call-waiter__button-text"},[t._v("Click on me")])],1),a("h3",{staticClass:"call-waiter__title"},[t._v("Сall a waiter")]),a("p",{staticClass:"call-waiter__text"},[t._v("The waiter can help you with questions")]),t.orders.length?a("button",{staticClass:"call-waiter__action",attrs:{disabled:t.callBillLoading},on:{click:function(e){return t.prepareBill()}}},[t.callBillLoading?a("AppLoading",{attrs:{type:"ring"}}):[t._v("Bill request")]],2):t._e()])])])])])])])},i=[],c=(a("d3b7"),a("96cf"),a("1da1")),r=a("5530"),n=a("2f62"),s=a("3b42"),o=a("29e5"),d={components:{bellWaiterIcon:function(){return a.e("chunk-588d0a06").then(a.t.bind(null,"2aad",7))},AppLoading:o["a"]},computed:Object(r["a"])({},Object(n["c"])({callWaiterLoading:"calls/callWaiterLoading",callBillLoading:"calls/callBillLoading",orders:"orders/orders",ordersLoading:"orders/ordersLoading"})),created:function(){this.orders.length||this.getOrders()},methods:Object(r["a"])(Object(r["a"])({},Object(n["b"])({callWaiter:"calls/callWaiter",callBill:"calls/callBill",getOrders:"orders/getOrders",deleteTable:"session/deleteTable"})),{},{prepareBill:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.callBill();case 3:Object(s["c"])("table"),Object(s["c"])("session"),Object(s["c"])("activeOrder"),Object(s["c"])("orders"),t.deleteTable(),t.$router.push({path:"/feedback"}),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()}})},u=d,b=(a("0035"),a("2877")),p=Object(b["a"])(u,l,i,!1,null,null,null);e["default"]=p.exports},cdb1:function(t,e,a){}}]);
//# sourceMappingURL=Waiter.1ebeecfa.js.map