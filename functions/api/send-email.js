export async function onRequestPost(context) {

    const body = await context.request.json();

    console.log(body);


    return Response.json({
        success:true,
        message:"收到数据"
    });
}