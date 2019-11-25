import React, { Component } from 'react'
import icon_moovit from '../../img/moovit.svg'
import icon_googleMaps from '../../img/googleMaps.svg'

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div>
            <h4>Ambiente EaD Ufes</h4>
            <ul>
              <li><a href="http://sead.ufes.br" target="_blank">Portal Sead</a></li>
              <li><a href="http://acervo.sead.ufes.br" target="_blank">Acervo Digital</a></li>
              <li><a href="http://www.ead.ufes.br/" target="_blank">AVA Graduação</a></li>
              <li><a href="http://www.especializacao.aperfeicoamento.ufes.br/" target="_blank">AVA Especialização e Aperfeiçoamento</a></li>
              <li><a href="http://videos.ufes.br/sead" target="_blank">Canal em Vídeos Ufes</a></li>
              <li><a href="https://calendar.google.com/calendar/embed?src=webconf.ufes%40gmail.com&ctz=America/Sao_Paulo" target="_blank">Agenda de Webconferências</a></li>
            </ul>
          </div>

          <div>
            <h4>Fale conosco</h4>
            <p>Telefone: (27) 4009-2208</p>
            <p>E-mail: diretoria.sead@ufes.br</p>
            <p>Av. Fernando Ferrari, 514, Vitória - ES <br/> Térreo do Teatro Universitário - Ufes Campus Goiabeiras</p>
            <p class="enderecoLink">
              <span>
                <img src={icon_googleMaps} alt=""/>
                <a href="https://goo.gl/maps/fLngzGoNbzq" target="_blank" title="Abrir endereço no Google Maps em nova aba"><span>Abrir endereço no Google Maps</span></a>
              </span>
              <span>
                <img src={icon_moovit} alt=""/>
                <a href="https://moovit.com/?to=Teatro%20Universitário&tll=-20.27756_-40.301771&metroId=4794&lang=pt-br" target="_blank" title="Ver rotas de ônibus no Moovit em nova aba"><span>Ver rotas de ônibus no Moovit</span></a>
              </span>
            </p>
          </div>
          </div>

        <div id="copyright">Copyright &copy; {new Date().getFullYear()} SEAD SPS</div>
      </footer>
    )
  }
}

export default Footer
