document.addEventListener("DOMContentLoaded", function(event) {    
    function CE(tag){
        return document.createElement(tag);
    }
var choosen = 0
var rotate_val;
var on = true;
    const main                                  = document.getElementById('virtual-mirror-widget');//Куда сувать
        const camopt                            = CE('div');
            const camera                        = CE('div');//подложка камеры
                const canvas                    = CE('canvas');//картинка
                const myVideo                   = CE('video');//стрим с камеры
                const err_message               = CE('div');//Камеру включи!
                const btn_create_photo          = CE('button');//сделать фотку
            const main_item                     = CE('div');
                const Name                      = CE('span');
                const image_item                = CE('div');
                const btn_buy                   = CE('button');
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
            const btn_menu                      = CE('div');
    

    fetch('https://optimaxdev.github.io/volga-it/response.json')
    .then(res => res.json())
    .then(data => {

    //компановка
    main.append(camopt,menu);
    camopt.append(camera);
    camera.append(err_message,myVideo,btn_create_photo);
    options.append(PG,rotate,size);
    main_item.append(Name,image_item,btn_buy,descript);
    for(let i=0;i<data.count;i++){
        if(i==choosen){
            Name.innerHTML="<h1>"+data.items[i].name+"</h1>";
            image_item.innerHTML ="<img width=100% src=\""+data.items[i].image+"\">";
            btn_buy.innerHTML = "Choose Lenses";
            btn_buy.style = "Font-size:175%;border-radius:45px;background:black;color:white"
            btn_buy.addEventListener('click',function(){
                window.open(data.items[i].url)
            });
            descript.innerHTML="<h3>"+ data.items[i].description+"</h3>"; 
            continue;
        }
        item.innerHTML += "<li id=\"item_"+i+"\" style=\"margin-left:1em;margin-right:1em;display:inline-block; text-align:center;\"><img style='display:block; margin-left:auto;margin-right:auto;' width=250 src=\""+data.items[i].image+"\"/><span style=\"font-size:125%;display:block\">"+data.items[i].name+"</span></li>";
        menu.append(item);
    }
    //EDIT this!!!!!!!!!!!!!!
    main.style = "background:white;border:solid 1px #ddd;border-radius:10px;height:100%;width:100%";
    
    camopt.style = "display:flex;justify-content:flex-start; width:100%; height:60%;";
    camera.style = 'display:flex;flex-direction:column;align-items:center;border-radius:10px;'
    err_message.style="background:#f5f5f5;border-radius:10px;width:100%;top:0; height:100%;object-fit:cover;";
    myVideo.style = "border-radius:10px;object-fit:cover;transform:rotate("+rotate_val+"deg);";
    btn_create_photo.style="display:flex;algn-items:center;padding:2px 5px;position:relative;top:-4.3%;padding:10px, 0, 10px, 0;border-radius:45px;font-size:150%;align-text:center;justify-content:center;border:2px solid gray";
    btn_create_photo.innerHTML = "<img src='https://icons.iconarchive.com/icons/iconsmind/outline/32/Old-Camera-icon.png'>Upload"
    menu.style = 'width:100%;height:40%;';
    main_item.style = "display:flex;flex-direction:column;padding-left:15px"
    options.style = 'display:flex;flex-direction:column;background:white;position:relative;margin:15px; wight:40%; height:100%';
    btn_menu.innerHTML ="<button id='glasses' style=\"font-size:250%;padding:5px 20px;background:black;color:white;border:1px black solid;border-radius:45px\">Try on Glasses</button><button style=\"font-size:150%;background:white;border:0;text-decoration:underline;\">reset ajaments</button>"
    btn_menu.style = "display:flex;flex-direction:column;align-items:center;margin-right:40%;" 
    canvas.style = "border-radius:10px;"
    PG.innerHTML = "<button style=\"background-color:white;border:0px\"> < BACK </button><br> <span style=\"Font-size:170%\"><b>Adjust the image</b></span><br><span style=\"Font-size:150%\"><b>1. </b>Drag the RED targets to the center of your eyes<br><b>2. </b>Drag to reposition photo<br><b>3. </b>set your PD,if you know it.<br><input id=\"pg\" value=62 style=\"width:25px;margin-left:20%;border:1px solid black;border-radius:5px; font-size:70%;\"><br><b>4</b>Adjust the photo with the controls.</span>";
    rotate.innerHTML="<span style=\"Font-size:125%\">Photo size:</span><br><input id=\"rotate\" type=range value='1' max=359>";
    size.innerHTML="<span style=\"Font-size:125%\">Photo rotation:</span><br><input id=\"size\" type=range value='1' max=100>";
    item.style = "width:100%;padding:0;display:block";
    

    //ok
    btn_create_photo.addEventListener('click', function(ev){
        on = !on;
        isplay(myVideo);
        ev.preventDefault();
    }, false);

    function draw(canvas,video,item){
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        canvas.setAttribute('width',video.offsetWidth);
        canvas.setAttribute('height',video.offsetHeight)
        ctx.drawImage(video,0,0);



        btn_glasses = document.getElementById("glasses");
        if(btn_glasses){
            btn_glasses.addEventListener('click',function(ev){
                let image = new Image()
                image.src = item.mirror_frame;
                image.addEventListener('load',function(){
                    var startX = 0;
                    var startY = 0;

                    var rectangle = new drawImage(image,0,0);
                    rectangle.render(ctx);


                    var mtt = new MouseTouchTracker(canvas,
                    function(evtType, x, y) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        switch(evtType) {

                        case 'down':
                            startX = x;
                            startY = y;
                            if (isHit(rectangle, x, y)) {
                            rectangle.isDragging = true;
                            }
                            break;

                        case 'up':
                            rectangle.isDragging = false;
                            break;

                        case 'move':
                            var dx = x - startX;
                            var dy = y - startY;
                            startX = x;
                            startY = y;

                            if (rectangle.isDragging) {
                            rectangle.x += dx;
                            rectangle.y += dy;
                            }
                            break;
                        }

                        circle.render(ctx);
                        rectangle.render(ctx);
                    }
                    );
                                    },false);
                            ev.preventDefault();    
                        },false);
                    };
                
        
        
                
      } else {
        console.log('error!!!!');
      }
    }

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
        err_message.innerHTML = "<span style=\"Font-size:150%;\" align=center><br><br><br><br><b>      Allow camera acces      </b><br><br><br><br></span>";
        btn_create_photo.remove();
        myVideo.remove();
    }
    function isplay(video){
        if (on==true){
            video.play();
            btn_create_photo.before(myVideo);
            camopt.append(main_item);
            menu.append(item)
            options.remove();
            btn_menu.remove();
            canvas.remove();
        }else{
            video.pause();
            draw(canvas,myVideo,data.items[choosen]);
            item.remove();
            main_item.remove();
            camopt.append(options);
            myVideo.before(canvas);
            myVideo.remove()
            menu.append(btn_menu);
        }
    }
    function addVideoStream(video,stream){
        video.srcObject = stream;
        video.addEventListener('loadedmetadata',()=>{
            return isplay(video);
        })
        camera.prepend(video);
    }
})
});
