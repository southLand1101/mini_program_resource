export async function onRequestPost(context) {

    try {

        // 获取前端提交的数据
        const body = await context.request.json();
        const {
            name,
            phone,
            message
        } = body;

        // 调用 Resend 发送邮件
        const response = await fetch(
            "https://api.mailjet.com/v3.1/send",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Basic " + btoa(env.MJ_API_KEY + ":" + env.MJ_SECRET_KEY)
                },
                body: JSON.stringify({
                    from:"yanpeng19971101@gmail.com",
                    to:[
                        "south_land@sina.com"
                    ],


                    subject:"收到新的摄影咨询",


                    html:
                    `
                    <h2>新的客户咨询</h2>

                    <p>
                    <strong>姓名：</strong>
                    ${name}
                    </p>


                    <p>
                    <strong>电话：</strong>
                    ${phone}
                    </p>


                    <p>
                    <strong>留言：</strong>
                    </p>


                    <p>
                    ${message}
                    </p>
                    `

                })

            }
        );



        const result =
        await response.json();



        console.log(
            "Resend result:",
            result
        );



        if(!response.ok){

            return Response.json(
                {
                    success:false,
                    error:result
                },
                {
                    status:500
                }
            );

        }



        return Response.json({

            success:true,

            message:
            "邮件发送成功"

        });



    } catch(error){


        console.error(
            error
        );


        return Response.json(
            {

                success:false,

                message:
                "服务器错误"

            },
            {
                status:500
            }
        );

    }

}