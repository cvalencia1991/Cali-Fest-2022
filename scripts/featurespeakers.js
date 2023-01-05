/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
const speakers = [
  {
    imgSpeaker: './Images/jbalvin.jpeg',
    name: 'J balvin',
    studies: 'Most MTV music awards of  reggaeton artist in Colombia',
    topic: 'Regaeton artist',
  },
  {
    imgSpeaker: './Images/willygarcia.jpeg',
    name: 'willy garcia',
    studies: 'Musican salsa artis',
    topic: 'He describe like the most popular artist in our city',
  },
  {
    imgSpeaker: './Images/losvanvan.jpeg',
    name: 'los van van de Cuba',
    studies: 'Most popular artist for Cuba and Colombia',
    topic: 'Best salsa ever in nowdays',
  },
  {
    imgSpeaker: './Images/gilberto.jfif',
    name: 'Gilberto Santa Rosa',
    studies: 'Salsa Artist since 1990',
    topic: 'Romantic Salsa Music',
  },
  {
    imgSpeaker: './Images/rawalejandro.jpg',
    name: 'Raw alejandro',
    studies: 'Reggaeton artist',
    topic: 'Melody artist of urban music nowdays',
  },
  {
    imgSpeaker: './Images/choquiptown.jpg',
    name: 'choquiptown',
    studies: 'urban music',
    topic: 'Urban music of Buenaventura near of Cali.',
  },
];
function speakersection() {
  for (talker in speakers) {
    const speakerp = speakers[talker].name;
    const imageSpeaker = speakers[talker].imgSpeaker;
    const { studies } = speakers[talker];
    const { topic } = speakers[talker];
    const cardSpekaker = ` <div class="cardspeaker">
        <img class="speakerstyle" src="${imageSpeaker}" alt="">
        <div class="speaker">
            <h5 class="namespeaker">${speakerp}</h5>
            <div class="studyies">${studies}</div>
            <div class="line2"></div>
            <div class="topic">${topic}</div>
        </div>
    </div>
    `;
    document.getElementById('wrapper2').insertAdjacentHTML('beforeend', cardSpekaker);
  }
}
speakersection();
