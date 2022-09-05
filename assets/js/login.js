$(function(){
    // 点击“去注册账号”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从 layui 中获取form对象
    var form=layui.form
    // 从 layui 中获取layer 弹出层
    var layer=layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个叫做pwd校验规则
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        // 校验两次密码是否一致的规则
        repwd:function(value){
            var pwd=$('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form-reg').on('submit',function(e){
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2.发起ajax的请求

        const data={username:$('.reg-box [name=username]').val(),password:$('.reg-box [name=password]').val()}

        $.post('http://www.liulongbin.top:3007/api/reguser',data,function(res){
            if(res.status!==0){
                // 利用layer提示成功或失败
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
            // 模拟点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form-login').submit(function(e){
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                // 将登录成功得到的 token 字符串，保存到 localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='/index.html'
            }
        })
    })
})