const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startBtn = document.querySelector("#start-pause");
const startPauseBtn = document.querySelector("#start-pause span");
const startPauseImg = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");

const audio = new Audio("/sons/luna-rise-part-one.mp3");
const play = new Audio("sons/play.wav");
const pause = new Audio("sons/pause.mp3");
const finish = new Audio("sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

audio.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

focoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBtn.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;

      break;
    case "descanso-curto":
      titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `;

      break;
    case "descanso-longo":
      titulo.innerHTML = `
        Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `;

      break;
    default:
      break;
  }
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    finish.play();
    alert("tempo acabou!!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    pause.play();
    zerar();
    return;
  }
  play.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  startPauseBtn.textContent = "Pausar";
  startPauseImg.setAttribute("src", "/imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
  startPauseBtn.textContent = "Começar";
  startPauseImg.setAttribute("src", "/imagens/play_arrow.png");
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
