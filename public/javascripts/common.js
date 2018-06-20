/**
 * Created by Administrator on 14-11-19.
 */
$(function(){
    //这里用js动态设置了一个header_id头部的宽度/设置宽度为屏幕宽度的70%
    $("#header_id").attr("style","width:"+parseInt((screen.width)*0.7)+"px");
    $("#logo_header_id").attr("style","width:"+parseInt((screen.width)*0.7)+"px");
    $("#index_content").attr("style","width:"+parseInt((screen.width)*0.7)+"px");

});