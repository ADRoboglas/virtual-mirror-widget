document.addEventListener("DOMContentLoaded", function(event) {    
    function CE(tag){
        return document.createElement(tag);
    }
var choosen = document.cookie['glass'];
var rotate_val;
var on = true;
    const main                                  = document.getElementById('virtual-mirror-widget');//Куда сувать
        const camopt                            = CE('div');
            const camera                        = CE('div');//подложка камеры
                const canvas                    = CE('canvas');//картинка
                const myVideo                   = CE('video');//стрим с камеры
                const err_message               = CE('div');//Камеру включи!
                const btn_readFiles             = CE('button');//как взять фотку с компа
                    const btn_openfile          = CE('button');//взять фотку с компа
                    const btn_stream            = CE('button');//стрим вкл/выкл
                    const btn_create_photo      = CE('button');//сделать фотку
            const main_item                     = CE('div');
                const Name                      = CE('span');
                const image_item                = CE('div');
                const btn_buy                   = CE('div');
                const descript                  = CE('span');
            const options                       = CE('div');//Настройки фотки и очков
                const PG                        = CE('div');
                    pg_inp = document.getElementById('pg');
                const rotate                    = CE('div');
                    rotate_inp = document.getElementById('rotate');
                const size                      = CE('div');
                    size_inp = document.getElementById('size');
        const menu                              = CE('div');//основная подложка
            const item                          = CE('ul');
    

    fetch('https://optimaxdev.github.io/volga-it/response.json')
    .then(res => res.json())
    .then(data => {
        addItemsInItem(data);
    })

    //компановка
    main.append(camopt,menu);
    camopt.append(camera,options,main_item);
    camera.append(err_message,myVideo,btn_create_photo);
    options.append(PG,rotate,size);
    main_item.append(Name,image_item,btn_buy,descript);
    function addItemsInItem(data){
        for(let i=0;i<data.count;i++){
            if(i==choosen){
                Name.innerHTML=data.items[i].name;
                image_item.innerHTML ="<img width=100% src=\""+data.items[i].image+"\">";
                descript.innerHTML= data.items[i].description; 
                continue;
            }
            console.log(data.items[i])
            item.innerHTML += "<li id=\"item_"+i+"\" style=\"margin-left:1em;margin-right:1em;display:inline-block; text-align:center;\"><img style='display:block; margin-left:auto;margin-right:auto;' width=250 src=\""+data.items[i].image+"\"/><span style=\"font-size:125%;display:block\">"+data.items[i].name+"</span></li>";
            menu.append(item)
        }
    }
    //EDIT this!!!!!!!!!!!!!!
    main.style = "background:white;border:solid 1px #ddd;border-radius:10px;height:100%;width:100%";
    
    camopt.style = "display:flex;justify-content:space-between; width:100%; height:60%;";
    camera.style = 'border-radius:10px;'
    err_message.style="background:#f5f5f5;border-radius:10px;width:100%;top:0; height:100%;object-fit:cover;";
    myVideo.style = "border-radius:10px;object-fit:cover;transform:rotate("+rotate_val+"deg);";
    btn_create_photo.style="position:relative;left:-50%;top:2.3%;padding:10px, 0, 10px, 0;border-radius:45px;font-size:150%;align-text:center;justify-content:center;border:2px solid gray";
    btn_create_photo.innerHTML = "<img src='https://icons.iconarchive.com/icons/iconsmind/outline/32/Old-Camera-icon.png'>Upload"
    menu.style = 'width:100%;height:40%;background:#ddd';
    options.style = 'background:white;position:relative;right:1;margin:15px; wight:40%';

    PG.innerHTML = "<button style=\"background-color:white;border:0px\"> < BACK </button><br> <span style=\"Font-size:170%\"><b>Adjust the image</b></span><br><span style=\"Font-size:150%\"><b>1. </b>Drag the RED targets to the center of your eyes<br><b>2. </b>Drag to reposition photo<br><b>3. </b>set your PD,if you know it.<br><input id=\"pg\" value=62 style=\"width:25px;margin-left:20%;border:1px solid black;border-radius:5px; font-size:70%;\"><br><b>4</b>Adjust the photo with the controls.</span>";
    rotate.innerHTML="<span style=\"Font-size:125%\">Photo size:</span><br><input id=\"rotate\" type=range value='1' max=359>";
    size.innerHTML="<span style=\"Font-size:125%\">Photo rotation:</span><br><input id=\"size\" type=range value='1' max=100>";
    item.style = "width:9999999px;padding:0;display:block";
    
    
    if(rotate_inp){
        rotate_val=rotate_inp.value;
    }else{
        rotate_val = 90;
    }


    
    btn_create_photo.addEventListener('click', function(ev){
        on = !on;
        isplay(myVideo);
        ev.preventDefault();
    }, false);

    //управление камерой
    navigator.mediaDevices.getUserMedia(
        {
            video:{
                facingMode:"user"
            }
        })
        .then(
            stream=>{
                err_message.remove();
                addVideoStream(myVideo,stream);
            }
        )
        .catch(function(err) {
            adderrmess(myVideo);
            console.log("An error occurred: " + err);
        });
    function adderrmess(video){
        err_message.innerHTML = "<span style=\"Font-size:150%\" align=center><b>Allow camera acces</b></span>";
        btn_create_photo.remove();
        myVideo.remove();
    }
    function isplay(video){
        if (on==true){
            video.play();
        }else{
            video.pause()
            camera.append(canvas);
        }
    }
    function addVideoStream(video,stream){
        video.srcObject = stream;
        video.addEventListener('loadedmetadata',()=>{
            return isplay(video);
        })
        camera.prepend(video);
    }
});
