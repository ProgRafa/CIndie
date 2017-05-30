/*Lista de filmes que será renderizada na tela*/
var baseUrl="assets/videos/";
var atual = 0;
var lancamentos = [
	{
		title: "xxxx", 
		description: "xxxxxxxxxx",
		position: 0,
		url: "wimm.mp4"
	},
	{
		title: "YYYY", 
		description: "YYYYYYYYY",
		position: 1,
		url: "mw.mp4"
	},
	{
		title: "wwww", 
		description: "wwwwwwww",
		position: 2,
		url: "hmn.mp4"
	},
	{
		title: "aaaa", 
		description: "aaaaaaaaaa",
		position: 3,
		url: "panda.mp4"
	}
];


window.onload = function()
{	
	var videoPlay = document.getElementsByClassName("video");
	var campoDeBusca = document.getElementById("busca");
	var movieContent = document.getElementsByClassName("videos_dinamicos");
	var fixDiv = document.getElementById("conteudoFilmes");
	var showNewDiv = document.getElementById("escondida");
	var next = document.getElementsByClassName("right");
	var previous = document.getElementsByClassName("left");
	
	/*Quando busca é selecionado aumenta tamanho do campo*/
	campoDeBusca.addEventListener("focus", function()
	{
		campoDeBusca.style.width="60%";
		campoDeBusca.style.border="2px solid lightblue";
	});
	
	/*Toda vez que um conteúdo for digitado dentro da área de texto,
	remove os conteúdos das divs videos_dinamicos e insere o conteúdo de busca
	+ vídeos encontrados pelo select do banco */
	campoDeBusca.addEventListener("input", function()
	{
		if(campoDeBusca.value != "")
		{
			campoDeBusca.style.width="60%";
			campoDeBusca.style.border="2px solid lightblue";
			
			fixDiv.style.animationName="none";
			fixDiv.style.height="600px";
			fixDiv.style.background="black";
			
			movieContent[0].hidden=true;
			movieContent[1].hidden=true;
			movieContent[2].hidden=true;
			
			showNewDiv.hidden=false;
			showNewDiv.innerHTML="Busca "+campoDeBusca.value;
		}
	});
	
	/*verifica se há conteúdo dentro do texto e se deve manter a caixa de texto
	grande*/
	campoDeBusca.addEventListener("blur", function()
	{
		if(campoDeBusca.value == "")
		{
			campoDeBusca.style.width="40%";
			campoDeBusca.style.border="none";
			
			fixDiv.style.animationName="mudaCoresDivPrincipal";
			fixDiv.style.height="1700px";
			
			movieContent[0].hidden=false;
			movieContent[1].hidden=false;
			movieContent[2].hidden=false;
			
			showNewDiv.hidden=true;
		}
	});
	
	for(var i = 0; i < next.length; i++)
	{
		next[i].addEventListener("click", function()
		{
			var id = event.currentTarget.getAttribute('name');
	
			QualDivEstouModificando(id, "next");
		});
		previous[i].addEventListener("click", function()
		{
			var id = event.currentTarget.getAttribute('name');

			QualDivEstouModificando(id, "previous");
		});
	}

	/**/
	function QualDivEstouModificando(idDiv, action)
	{
		if(action=="next" && atual < lancamentos.length-1){
			atual++;
			MeDeUmCurta(atual, idDiv);
		}else if(action=="previous" && atual > 0){
			atual--;
			MeDeUmCurta(atual, idDiv);
		}
	}
	
	function iniciarCurtas(div)
	{
		var newMovie = document.createElement("video");
		var link = document.createElement("A");

		link.href=baseUrl+lancamentos[0].url;
		newMovie.src=baseUrl+lancamentos[0].url;
		newMovie.className="curtas";
		newMovie.currentTime=5;

		document.getElementsByClassName("video")[div].appendChild(link);
		link.className="linkCurta";
		link.appendChild(newMovie);
		newMovie.setAttribute('name', div);
	}

	/*Cria as tags vídeo dinamicamente, adicionando os vídeos dos arraylists*/
	function MeDeUmCurta(qualID, qualDiv){
		var link = document.getElementsByClassName("linkCurta");
		var newMovie = document.getElementsByClassName("curtas");

		link[qualDiv].href="";
		link[qualDiv].href=baseUrl+lancamentos[qualID].url;

		newMovie[qualDiv].src=baseUrl+lancamentos[qualID].url;
		newMovie[qualDiv].currentTime=5;
	}

	iniciarCurtas(0);
	iniciarCurtas(1);
	iniciarCurtas(2);	

	var curtas = document.getElementsByClassName("curtas");
	/**/
	for(var i = 0; i < curtas.length; i++)
	{
		curtas[i].addEventListener("mouseover", function()
		{
			var j =  event.currentTarget.getAttribute('name');
			curtas[j].currentTime = 5;
			curtas[j].play();
		});

		curtas[i].addEventListener("mouseout", function()
        {
            var j =  event.currentTarget.getAttribute('name');
			
            curtas[j].pause();
			curtas[j].currentTime = 5;
        });
	}
}