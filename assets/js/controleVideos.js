/*Lista de filmes que será renderizada na tela*/
var baseUrl="assets/videos/";
var page= "visualizarFilmes.html";
var atual = [0, 0, 0];
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

/*Transformando cabeçálio fixed ao rolar o scroll*/
function movimentouScroll()
{
	document.getElementsByTagName("header")[0].style.position="fixed";
	document.getElementById("sideMenu").className="";
}


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
			fixDiv.style.background="rgba(0, 170, 106, 0.8)";
			
			movieContent[0].hidden=true;
			movieContent[1].hidden=true;
			movieContent[2].hidden=true;
			
			showNewDiv.style.fontSize="2em";
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
			fixDiv.style.height="2100px";
			fixDiv.style.background="rgba(0, 170, 106, 0.8)";
			
			movieContent[0].hidden=false;
			movieContent[1].hidden=false;
			movieContent[2].hidden=false;
			
			showNewDiv.hidden=true;
		}
	});
	

	/*Mapeamento dos botões próximo (next) e anterior (previous) das div que possuem filmes
	para percorrer o array de filmes vindo do banco de dados */
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

	/*Verifica que tipo de ação tomar (next ou previous) e sob qual das divs executar(lançamentos, 
	mais assistdos...)*/
	function QualDivEstouModificando(idDiv, action)
	{
		if(action=="next" && atual[idDiv] < lancamentos.length-1){
			atual[idDiv]++;
			MeDeUmCurta(atual[idDiv], idDiv);
		}else if(action=="previous" && atual[idDiv] > 0){
			atual[idDiv]--;
			MeDeUmCurta(atual[idDiv], idDiv);
		}
	}
	
	function iniciarCurtas(div)
	{
		var newMovie = document.createElement("video");
		//var link = document.createElement("A");

		//link.href=page;
		newMovie.src=baseUrl+lancamentos[0].url;
		newMovie.name=lancamentos[0].url;
		newMovie.className="curtas";
		newMovie.currentTime=5;

		document.getElementsByClassName("video")[div].appendChild(newMovie);
		//link.className="linkCurta";
		//link.appendChild(newMovie);
		newMovie.setAttribute('name', div);
	}

	/*Cria as tags vídeo dinamicamente, adicionando os vídeos dos arraylists*/
	function MeDeUmCurta(qualID, qualDiv){
		//var link = document.getElementsByClassName("linkCurta");
		var newMovie = document.getElementsByClassName("curtas");

		//link[qualDiv].href="";
		//link[qualDiv].href=baseUrl+lancamentos[qualID].url;

		newMovie[qualDiv].src=baseUrl+lancamentos[qualID].url;
		newMovie[qualDiv].name=lancamentos[qualID].url;	
		newMovie[qualDiv].currentTime=5;
	}

	iniciarCurtas(0);
	iniciarCurtas(1);
	iniciarCurtas(2);	

	var curtas = document.getElementsByClassName("curtas");
	/*Atualiza situação do vídeo conforme ação do mouse, enquanto mouse estiver sobre
	vídeo ação reload e play, quando mouse sair ação pause e reload*/
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

	/**/
	var icones = document.getElementsByClassName("btn-icon");
	for(var i=0; i < icones.length; i++)
	{
		icones[i].addEventListener("mouseover", function()
		{
			var caixa = document.createElement("div");
			caixa.innerText=this.getAttribute("name");
			caixa.className="caixa";
			this.appendChild(caixa);
		});

		icones[i].addEventListener("mouseout", function()
		{
			this.removeChild(this.childNodes[3]);
		});
	}

	/*Quando clicado em um curta enviar sua url pelo browser*/
	var linkCurtas = document.getElementsByClassName("curtas");
	for(var i = 0;i < linkCurtas.length; i++)
	{
		linkCurtas[i].addEventListener("click", function()
		{
			window.location="visualizarFilmes.html?name="+this.name;
		});
	}
}