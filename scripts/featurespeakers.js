/* eslint-disable no-undef */
const speakers = [
  {
    imgspkeaker: './Images/speaker1.png',
    name: 'Yochai Benkler',
    studies: 'Berkman Profesor of Entrepreneurial Legal Studies at Harvard Law School',
    topic: 'Benkler studies commons-bassed peer production,and published his seminal book the wealth of networks in 2006.',
  },
  {
    imgspkeaker: './Images/speaker2.png',
    name: 'SohYeong Noh',
    studies: 'Director of Art Center Nabi and a board memeber of CC korea',
    topic: 'As the main venue for new media art production in Korea,Nabi promotes cross-disciplinary collaboration and understanding among science technology,humanities, and the arts.',
  },
  {
    imgspkeaker: './Images/speaker3.png',
    name: 'Lila Tretikov',
    studies: 'Executive Director of the wikimedia Foundation',
    topic: 'Lila Tretikov is the Executive Director of the Wikimedia Foundation,the nonprofit organization that operates wikipedia. wikipedia is freely available in 290 languages and used by nearly half a billion people around the world every month.',
  },
  {
    imgspkeaker: './Images/speaker4.png',
    name: 'Kilnam Chon',
    studies: '',
    topic: 'Kilnam Chon helped bring the internet to Asia and is anoutspoken advocate for the open web and digital commons. In 2012,he was inducted into the inagural class of the internet Society"s (ISOC)Internet Hall of Fame.',
  },
  {
    imgspkeaker: './Images/speaker5.png',
    name: 'Julia Leda',
    studies: 'President of Young Pirates of Europe',
    topic: 'European ingretration,political democracy and participation of youth througth online as her major condem,reda"s report outlining potential changes to EU copyright law was approved by the parliament in July.',
  },
  {
    imgspkeaker: './Images/speaker6.png',
    name: 'Ryan Merkley',
    studies: 'CEO of Creative Commons,ex COO of the Mozilla Foundation',
    topic: 'Ryan had been leading open-source projects at the Mozilla Foundation such as the open source movement.',
  },
];
function speakersection() {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (talker in speakers) {
    const speakerp = speakers[talker].name;
    const imagespeaker = speakers[talker].imgspkeaker;
    const { studies } = speakers[talker];
    const { topic } = speakers[talker];
    const cardspekaker = ` <div class="cardspeaker">
        <img class="speakerstyle" src="${imagespeaker}" alt="">
        <div class="speaker">
            <h5 class="namespeaker"><b>${speakerp}</b></h5>
            <div class="studyies">${studies}</div>
            <div class="line2"></div>
            <div class="topic">${topic}</div>
        </div>
    </div>
    `;
    document.getElementById('wrapper2').insertAdjacentHTML('beforeend', cardspekaker);
  }
}
speakersection();