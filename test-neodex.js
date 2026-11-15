// lancé par le test « local » de NeoDex : un tri rapide jusqu'au bout, une recherche dichotomique, A* sur la grille
module.exports = async ({ pj, sleep }) => {
  const click = q => pj(`document.querySelector(${JSON.stringify(q)}).click(), 0`);
  const stats = () => pj(`document.getElementById('af_stats').textContent`);
  const msg = () => pj(`document.querySelector('.afMsg').textContent`);
  await sleep(500);
  await click('[data-mode=sort]'); await click('[data-algo=quick]'); await click('#af_end'); await sleep(100);
  const s = await stats(), m = /Étape ([0-9]+) \/ ([0-9]+)/.exec(s);
  if (!m || m[1] !== m[2] || +m[2] < 100 || !/trié/.test(await msg())) throw new Error('tri rapide : ' + s + ' / ' + await msg());
  await click('[data-mode=search]'); await click('[data-algo=binary]'); await click('#af_end'); await sleep(100);
  if (!/trouvée/.test(await msg())) throw new Error('dichotomie : ' + await msg());
  await click('[data-mode=graph]'); await click('[data-algo=astar]'); await click('#af_end'); await sleep(100);
  if (!/Chemin trouvé/.test(await msg())) throw new Error('A* : ' + await msg());
  await click('[data-algo=dijkstra]'); await click('#af_play'); await sleep(1500);
  // la course : tri à bulles contre tri rapide sur le même tableau au hasard, le tri rapide doit gagner
  await click('[data-mode=race]'); await click('[data-race="0bubble"]'); await click('[data-race="1quick"]'); await click('#af_end'); await sleep(100);
  if (!/^Tri rapide gagne/.test(await msg())) throw new Error('course : ' + await msg());
  await click('#af_play'); await sleep(1500);
  return 'tri rapide, dichotomie, A*, Dijkstra et course ok';
};
