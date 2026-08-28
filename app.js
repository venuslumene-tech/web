const product = { name: 'Thinking of You', detail: 'A6 · Blank inside', price: 7 };
const getBag = () => JSON.parse(localStorage.getItem('vl-bag') || '[]');
const saveBag = bag => localStorage.setItem('vl-bag', JSON.stringify(bag));
const count = () => getBag().reduce((total, item) => total + item.qty, 0);
const money = amount => `$${amount.toFixed(2)}`;
document.querySelectorAll('a').forEach(link => { const routes = { Journal:'journal.html', 'Read our story →':'journal.html', 'Wholesale & collaborations':'contact.html', 'Shipping & returns':'shipping.html' }; if(routes[link.textContent.trim()]) link.href=routes[link.textContent.trim()]; if(link.textContent.trim().startsWith('Bag')) link.href='bag.html'; });
const updateBags = () => document.querySelectorAll('[data-bag-count], .nav-actions a:last-child').forEach(el => el.textContent = `Bag (${count()})`);
updateBags();
const cardGrid = document.querySelector('#cards .products');
if (cardGrid) {
  const extraCards = [
    ['sand', 'for<br>your<br>tender heart', 'Tender Heart'],
    ['plum', 'a little<br>love note', 'A Little Love Note'],
    ['', 'you are<br>so loved', 'So Loved'],
    ['plum', 'the best<br>is ahead', 'The Best Is Ahead'],
    ['sand', 'your light<br>is felt', 'Your Light Is Felt'],
    ['', 'thank you<br>for being<br>you', 'For Being You']
  ];
  cardGrid.insertAdjacentHTML('beforeend', extraCards.map(([tone, message, name]) => `<article class="product"><div class="card-image ${tone}"><div class="greeting-card">${message}</div></div><div class="product-info"><div><h3>${name}</h3><p>A6 · Blank inside</p></div><span class="price">$7</span></div><button class="button" data-shop>Add to bag</button></article>`).join(''));
  const total = document.querySelector('#cards .section-head .eyebrow'); if (total) total.textContent = '9 pieces';
}
document.addEventListener('click', event => { const button = event.target.closest('[data-shop]'); if (!button) return; const card = button.closest('.product'); const item = { name: card.querySelector('h3').textContent, detail: card.querySelector('.product-info p').textContent, price: Number(card.querySelector('.price').textContent.replace('$','')) }; const bag=getBag(), found=bag.find(entry=>entry.name===item.name); if(found)found.qty++;else bag.push({...item,qty:1});saveBag(bag);updateBags();button.textContent='Added to bag';setTimeout(()=>button.textContent='Add to bag',1500); });
const renderBag=()=>{const holder=document.querySelector('[data-bag-items]');if(!holder)return;const bag=getBag(),subtotal=bag.reduce((sum,item)=>sum+item.price*item.qty,0);holder.innerHTML=bag.length?bag.map((item,index)=>`<div class="bag-item"><div class="mini-card">✳<br><em>thinking<br>of you</em></div><div class="bag-detail"><h3>${item.name}</h3><p>${item.detail}</p><button class="remove" data-remove="${index}">Remove</button></div><div class="quantity"><button data-quantity="${index}" data-delta="-1">−</button><span>${item.qty}</span><button data-quantity="${index}" data-delta="1">+</button></div><strong>${money(item.price*item.qty)}</strong></div>`).join(''):'<div class="empty-bag"><span class="eyebrow">Your bag is waiting</span><h2>A little room for a beautiful thing.</h2><a class="button" href="cards.html">Explore the cards</a></div>';document.querySelectorAll('[data-subtotal]').forEach(el=>el.textContent=money(subtotal));document.querySelectorAll('[data-quantity]').forEach(button=>button.onclick=()=>{const bag=getBag(),item=bag[+button.dataset.quantity];item.qty+=+button.dataset.delta;if(item.qty<1)bag.splice(+button.dataset.quantity,1);saveBag(bag);updateBags();renderBag()});document.querySelectorAll('[data-remove]').forEach(button=>button.onclick=()=>{const bag=getBag();bag.splice(+button.dataset.remove,1);saveBag(bag);updateBags();renderBag()})};renderBag();
