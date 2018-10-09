base.data.allrooms=[];

base.methods.onMyShow=function(){
    var that=this;
    this.loadapi("room","list",{},(list)=>{
        this.allrooms=list;
        //alert(list.length);
    });

};


var app = new Vue(base);