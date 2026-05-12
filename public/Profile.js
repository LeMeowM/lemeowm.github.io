import { asciify } from 'asciify-engine';

const canvas = document.getElementById('ascii');

await asciify('your-image.jpg', canvas, { options: {

  fontSize: 24,

  charset: ' .\'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',

  colorMode: 'fullcolor',

  chromaKey: '#cacaca',

  chromaKeyTolerance: 10

} });