export async function onRequestPost(context) {

    const apiKey = "re_WFaA4oTi_6bPPawkwRdynUoNoJWu4JQGX";

    console.log("key length:", apiKey.length);
    console.log("key start:", apiKey.substring(0, 8));


    const response = await fetch(
        "https://api.resend.com/emails",
        {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                from: "onboarding@resend.dev",

                to: [
                    "你的Resend注册邮箱"
                ],

                subject: "Cloudflare测试",

                html: `
                    <h1>Hello</h1>
                    <p>测试邮件</p>
                `
            })
        }
    );


    const text = await response.text();

    console.log("Resend response:", text);


    return new Response(text, {
        status: response.status,
        headers:{
            "Content-Type":"application/json"
        }
    });
}