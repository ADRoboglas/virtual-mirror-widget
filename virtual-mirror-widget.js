document.addEventListener("DOMContentLoaded", function(event) {     
const main = document.getElementById('virtual-mirror-widget');
const camera = document.createElement('div');
const myVideo = document.createElement('video');
const options = document.createElement('div');
const menu = document.createElement('div');
const btn_openfile = document.createElement('button');
const btn_create_photo = document.createElement('button');
main.append(camera,options,menu);
camera.append(myVideo,btn_create_photo);
btn_create_photo.addEventListener('click', function(ev){
    takepicture();
    ev.preventDefault();
  }, false);
if(streaming){
    navigator.mediaDevices.getUserMedia(
        {
            video:{
                facingMode:"user"
            }
        })
        .then(
            stream=>{
                addVideoStream(myVideo,stream)
            }
        )
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });

    function addVideoStream(video,stream){
        video.srcObject = stream;
        video.addEventListener('loadedmetadata',()=>{
            video.play()
        })
        camera.append(video);
    }
}
});