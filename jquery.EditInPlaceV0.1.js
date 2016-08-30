
//<input type="text" class="user_push btn btn-default btn-xs" value="{$row['push']}" user="{$row['id']}"/>
//    <span>{$row['push']}</span>

(function($){
    $.fn.EditInPlace = function(options){

        var defaults = {
            url:"",
            idAttr:"",
            editedName:""
        }

        var options = $.extend(defaults, options);

        this.each(function(){
            var before = $(this).text();
            $(this).on('click',function () {

                before = $(this).text();
                var html='<input type="text" class="edit_input btn btn-default btn-xs"/>'
                $(this).empty();
                $(this).append(html);
                var input = $(this).children('.edit_input');
                input.val(before);
                input.css('background-color','white');
                input.focus();
                input.select();
            })


            $(this).on('blur change','.edit_input',function(){
                var value = $(this).val();
                var td = $(this).parent();
                td.empty();
                td.html(value);
                if(value != before){
                    var url = options.url;
                    var num = td.text();
                    var idAttr = options.idAttr;
                    var editedName = options.editedName;
                    var data = {};
                    data['id'] = td.attr(idAttr);
                    data[editedName] = num;

                    if(!(/^\d*$/.test(num))){
                        layer.msg('请输入数字！', {icon: 5, time: 1000});
                        that.text(before);
                        return false;
                    }
                    layer.msg('载入中，请稍等。', {icon: 3});
                    $.getJSON(url,data,function (res) {
                        if(res){
                            layer.msg('修改完成！', {icon: 6, time: 1000});
                        }else{
                            layer.msg('修改失败！', {icon: 5, time: 1000});
                            that.text(before);
                        }
                    });
                }
            })
        });
    };
})(jQuery);