window.onload = function()
{
    var audio = document.getElementById("sound");
    var play = document.getElementById("play");
    var video = document.getElementsByTagName("video");
    var controles = document.getElementById("controls"); 
    var fullscreen = document.getElementById("fullscreen");
    var download = document.getElementById("download");

    //Torna a div controls transparente
    function hide(){
        controles.style.opacity="0";
        //document.getElementsByTagName("body")[0].style.cursor="none";
    }

    setTimeout(function(){hide()}, 3000);

    //Ao passar com cursor em cima da div controls faz ela aparecer
    controles.addEventListener("mouseover", function(event)
    {
        controles.style.opacity="1";
    });

    //Após colocar o cursor em cima do vídeo faz com que os controllers do vídeo sumam
    video[0].addEventListener("mouseover", function()
    {
        setTimeout(function(){hide()}, 3000);
    });

    /*Ao clicar em cima do ícone de som muta o vídeo, clicando novamente retoma o volume total*/
    audio.children[0].addEventListener("click", function()
    {
        if(audio.children[0].className =="fa fa-volume-up"){
            video[0].muted = true;
            audio.children[0].className="";
            audio.children[0].className="fa fa-volume-off";
        }else{
            video[0].muted = false;
            audio.children[0].className="";
            audio.children[0].className="fa fa-volume-up";
        }
        
    });

    /*Ao clicar no botão play quando video pausado inicia o video do ponto onde estava
    e muda ícone da div para pause via css, clicando novamente pausa o vídeo e muda 
    ícone para play*/
    function paraOuRecomecaVideo(quemExecuta, evento)
    {
        quemExecuta.addEventListener(evento, function()
        {
            if(video[0].paused)
            {
                video[0].play();
                play.children[0].className="";
                play.children[0].className="fa fa-play";
            }else{
                video[0].pause();
                play.children[0].className="";
                play.children[0].className="pause";
            }
        });
    }

    paraOuRecomecaVideo(video[0], "click");
    paraOuRecomecaVideo(play, "click");
    paraOuRecomecaVideo(document.body, "keydown");

    /*Botão download*/
    download.addEventListener("click", function()
    {
        var query = window.location.search.substring(6);

        document.getElementsByTagName("a")[0].href+=query;    
    });

    /*Ao clicar no botão tela cheia muda status para fullscreen 
    obs: trocar para fullscren com tecla f11*/
    fullscreen.addEventListener("click", function()
    {
        document.body.webkitRequestFullscreen();
        //document.body.mozRequestFullScreen();    
    });

    /*Função recebe tempo em segundos e calcula tempo de vídeo no formato
    hms*/
    function formatoHMS(time)
    {
        var hms;
        var segundos = tempo%60;
        var minutos = parseInt(tempo/60);
        var horas = parseInt(minutos/60);
        
        if(segundos < 10)
            segundos ="0"+segundos;
        if(minutos < 10)
            minutos ="0"+minutos;
        if(horas < 10)
            horas ="0"+horas;        
        
        hms =horas+":"+minutos+":"+segundos;
        return hms;
    }

    var barra = document.getElementById("barraTempo");
    var barraFundo = document.getElementById("timer");

    var tempo = 0;
    var fim = video[0].duration;
    var pxls = 100/parseInt(fim);
    var tam = 0;  

    /*Atualiza o span com tempo do curta, atualiza animação da barra azul
    Verifica se o curta está played ou paused, caso paused para as animações*/
    setInterval(function()
    {
        var classe = play.children[0].getAttribute("class");
        if(tempo < fim && classe==="fa fa-play")
        {
            tempo += 1;
            tam +=pxls;
            barra.style.width=tam+"%";
            document.getElementsByTagName("span")[0].innerText=formatoHMS(tempo);
        }
    }, 1000);
}
