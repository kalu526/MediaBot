const Telegraf=require('telegraf');

const bot=new Telegraf('2092729886:AAGUJqoUidVe0IIq1AI5OtWDfKuq3hzje_4');
 
const message=`
   Help Reference:
   /start- start the bot
   /newyork or /NewYork- display newyork photo
   /dubai or /Dubai- display dubai photo
   /singapor or /SingaPor-display singapor photo
   /london or London-dispaly london photo
   /cities_list or CitiesList-give you the file contain cities list
   /album-display citiesPhot Album

`
bot.on((ctx)=>{
    
    next();
})
bot.start((ctx)=>{
    ctx.reply(message);
    ctx.reply("Hello " +ctx.from.first_name+ " Welcome To Media Bot");
    
})

bot.command(["newyork","NewYork"],(ctx)=>{
    bot.telegram.sendChatAction(ctx.chat.id,"upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id,{source:"res/NewYork.jpg"
},{
    reply_to_message_id:ctx.from.first_name,
    reply_to_message_id:ctx.message.message_id
}
    
    );
    
})
bot.command(["dubai","Dubai"],(ctx)=>{
    bot.telegram.sendChatAction(ctx.chat.id,"upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id,{source:"res/Dubai.jpg"
},{
    reply_to_message_id:ctx.from.first_name,
    reply_to_message_id:ctx.message.message_id
}
    
    );
})
bot.command(["singapor","SingaPor"],(ctx)=>{
    bot.telegram.sendChatAction(ctx.chat.id,"upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id,{source:"res/HongKong.jpg"
},{
    reply_to_message_id:ctx.from.first_name,
    reply_to_message_id:ctx.message.message_id
}

);
})
bot.command(["london","London"],(ctx)=>{
    bot.telegram.sendChatAction(ctx.chat.id,"upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id,{source:"res/HongKong.jpg"
},{
    reply_to_message_id:ctx.from.first_name,
    reply_to_message_id:ctx.message.message_id
}
);
})
bot.command(["cities_list","CitiesList"],(ctx)=>{
    bot.telegram.sendDocument(ctx.chat.id,
     {
       source:"res/citieslist.txt"
    },
    {
        thumb:{source:"res/HongKong.jpg"}
    },
    )
})
bot.on("message",async ctx=>{
    if(ctx.updateSubTypes[0]=="document"){
        const link= await bot.telegram.getFileLink(ctx.message.document.file_id);
        ctx.reply("Here Is The Download Link " +link);
       
    }
else if(ctx.updateSubTypes[0]=="photo") {
        const link=await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
        ctx.reply("Here IS Your Photo Download Link "+link);
}
   
   
    
    

})


bot.command("album",(ctx)=>{
    let cities=["res/NewYork.jpg","res/Dubai.jpg","res/HongKong.jpg","res/HongKong.jpg","res/Dubai.jpg","res/NewYork.jpg"];
    const result=cities.map(city=>{
        return{
            type:"photo",
            media:{
                source:city
            }
        }
    })
    bot.telegram.sendMediaGroup(ctx.chat.id,result)
})

bot.launch();