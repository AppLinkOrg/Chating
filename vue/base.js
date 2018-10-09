
var base = {
    el: '#app',
    methods: {
        onMyLoad: function () {
            console.log("on my load");
        },
        onMyShow: function () {
            console.log("on my show");
        },
        getAllMyRooms(callback){
            this.loadapi("room","list",{myrooms:"Y"},(list)=>{
                this.myrooms=list;
                if(callback!=undefined){
                    callback(list);
                }
            });
        },
        loadapi:function(modu,action,postData,callback){
            var url=this.api+modu+"/"+action;
            $.getJSON(url,postData,function(data){
                if(callback!=undefined){
                    callback(data);
                }
            });
        }
    },
    data: {
        api:"https://cmsdev.app-link.org/alucard263096/chating/api/",
        uploadpath:"https://alioss.app-link.org/alucard263096/chating/",
        fileupload:"https://cmsdev.app-link.org/alucard263096/chating/fileupload",
        name: "云易创沟通管理",
        titlename: "云易创",
        projectname: "沟通管理",
        message: 'Hello Vue!',
        myrooms:[]
    },
    created: function () {
        this.onMyLoad();
    },
    mounted: function () {
        this.getAllMyRooms();
        this.onMyShow();
    }

};
