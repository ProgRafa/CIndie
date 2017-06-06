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
                play.children[0].className="pause";
            }else{
                video[0].pause();
                play.children[0].className="";
                play.children[0].className="fa fa-play";
            }
        });
    }

    paraOuRecomecaVideo(video[0], "click");
    paraOuRecomecaVideo(play, "click");
    //paraOuRecomecaVideo(document.body, "keydown");

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
        if(!document.webkitIsFullScreen)
        {
            document.body.webkitRequestFullscreen();
        }
        if(document.webkitIsFullScreen){
            document.webkitCancelFullScreen();
            eFull = true;
        }
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


    /*Variaveis relacionadas ao tempo decorrente do curta e as modificações*/
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
        if(tempo < fim && classe==="pause")
        {
            tempo += 1;
            tam +=pxls;
            barra.style.width=tam+"%";
            document.getElementsByTagName("span")[0].innerText=formatoHMS(tempo);
        }
        if(tempo >= fim){
            console.log("limpou");
            tempo = 0;
            tam = 0;
            video[0].pause();
            play.children[0].className="";
            play.children[0].className="fa fa-play";
            video[0].currentTime = tempo;
            barra.style.width=tam+"%";
            document.getElementsByTagName("span")[0].innerText=formatoHMS(tempo);
        }
    }, 1000);

    /*função recebe o valor total e uma parte para gerar uma porcentagem*/
    function percent(total, parte)
    {
        return parte*100/total;
    }

    /*Barra que controla o tempo do curta dinâmicamente alterável através do click*/
    barraFundo.addEventListener("click", function()
    {
        var modificador, prct;
        prct = percent(barraFundo.offsetWidth, event.offsetX);
        if(event.offsetX > barra.offsetWidth)
        {
            barra.style.width=prct+"%";
            modificador = fim*prct/100;
            tempo = parseInt(modificador);
            tam = prct;
            video[0].currentTime = tempo;
        }else{
            barra.style.width=prct+"%";
            modificador = fim*prct/100;
            tempo = parseInt(modificador);
            tam = prct;
            video[0].currentTime = tempo;
        }
         document.getElementsByTagName("span")[0].innerText=formatoHMS(tempo);
    });

    /*Variaveis para ajuste de volume*/
    var barraTempo = document.getElementById("barra");
    var btnT = document.getElementById("btnAjuste");
    var volume = 1;
    var posBarra;
    /*Ajusta o volume conforme click na barra de volume*/
    barraTempo.addEventListener("click", function()
    {
        audio.children[0].className="fa fa-volume-up";
        btnT.style.transform="translateX("+event.offsetX+"px)";
        volume = event.offsetX/100;
        if(volume > 1)
            volume = 1;
        else if(volume < 0.1){
            volume = 0;
            audio.children[0].className="fa fa-volume-off";  
        }
        video[0].volume = volume;
    });

    /*Ao clicar em cima do ícone de som muta o vídeo, clicando novamente retoma o volume total*/
    audio.children[0].addEventListener("click", function()
    {
        if(audio.children[0].className =="fa fa-volume-up"){
            video[0].volume = 0;
            btnT.style.transform="translateX("+0+"px)";
            audio.children[0].className="";
            audio.children[0].className="fa fa-volume-off";
        }else{
            video[0].volume = 1;
            btnT.style.transform="translateX("+100+"px)";
            audio.children[0].className="";
            audio.children[0].className="fa fa-volume-up";
        }
        
    });

    /*Monitora toda vez que uma tecla é pressionada na tela e faz a 
    respectiva ação*/
    document.body.addEventListener("keydown", function()
    {
        console.log(event.key);
        var tecla = event.key;

        switch(tecla)
        {
            /*Ao pressionar a tecla setaDireita aumenta o volume, caso
            estado anterior do ícone volume fosse mutado atualiza para
            com som e por último atualiza posição do btn na barra volume*/
            case "ArrowRight":
                audio.children[0].className="fa fa-volume-up";
                volume+=0.1;
                if(volume > 1)
                    volume = 1;
                posBarra = 100*volume;
                btnT.style.transform="translateX("+posBarra+"px)";
                video[0].volume = volume;   
                break;
            /*Ao pressionar a tecla setaEsquerda diminui o volume, caso
            estado anterior do ícone volume fosse com som atualiza para
            mutado e por último atualiza posição do btn na barra volume*/    
            case "ArrowLeft":
                volume-=0.1;
                if(volume < 0.1){
                    volume = 0;
                    audio.children[0].className="fa fa-volume-off";
                }
                posBarra = 100*volume;
                btnT.style.transform="translateX("+posBarra+"px)";
                video[0].volume = volume; 
                break;
            /*Caso pressionado a tecla espaço pausa ou inicia curta*/    
            case " ":
                if(video[0].paused)
                {
                    video[0].play();
                    play.children[0].className="";
                    play.children[0].className="pause";
                }else{
                    video[0].pause();
                    play.children[0].className="";
                    play.children[0].className="fa fa-play";
                }
                break;
            case "Escape":
                break;
            default:
        }
    });
}
