import { cli } from './bin/parser.mjs';
import { update } from './bin/client.mjs';

async function launch() {
 await update();
 
 cli();
}

launch()
