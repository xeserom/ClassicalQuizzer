import musicData from '@/assets/music-data.json'; 

export default class MusicQuiz {
  public composer: string;
  public piece: string;
  public filename: string;
  public playat: number[][];

  constructor() {
    const randomComposer =
      musicData[Math.floor(Math.random() * musicData.length)];

    const randomPiece =
      randomComposer.pieces[Math.floor(Math.random() * randomComposer.pieces.length)];

    this.composer = randomComposer.name;
    this.piece = randomPiece.name;
    this.filename = randomPiece.filename;
    this.playat = randomPiece.playat;
  }

  checkAnswer(composer: string, piece: string) {
    return [composer === this.composer, piece === this.piece];
  }
}