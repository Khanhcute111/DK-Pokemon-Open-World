(()=> {
'use strict';
const $=id=>document.getElementById(id);
const SAVE_KEY='dk-kanto-save-v2';
const species={
 Bulbasaur:{emoji:'🌿',type:'Cỏ/Độc',hp:38,atk:8,def:5,skill:'Roi Mây',color:0x65b96a},
 Charmander:{emoji:'🔥',type:'Lửa',hp:30,atk:11,def:3,skill:'Hỏa Tốc',color:0xef8b45},
 Squirtle:{emoji:'💧',type:'Nước',hp:35,atk:8,def:6,skill:'Súng Nước',color:0x61b9df},
 Pidgey:{emoji:'🪽',type:'Bay',hp:25,atk:7,def:3,skill:'Gió Xoáy',color:0xb9a77e},
 Rattata:{emoji:'🐭',type:'Thường',hp:23,atk:8,def:2,skill:'Cắn Nhanh',color:0x9b80a9},
 Caterpie:{emoji:'🐛',type:'Côn trùng',hp:27,atk:6,def:2,skill:'Tơ Trói',color:0x83c96c},
 Oddish:{emoji:'🌱',type:'Cỏ/Độc',hp:31,atk:7,def:4,skill:'Lá Cắt',color:0x67b66e},
 Psyduck:{emoji:'🦆',type:'Nước',hp:34,atk:9,def:4,skill:'Sóng Siêu Âm',color:0xe6c95d},
 Geodude:{emoji:'🪨',type:'Đá/Đất',hp:40,atk:9,def:8,skill:'Lăn Đá',color:0x9b927e},
 Zubat:{emoji:'🦇',type:'Độc/Bay',hp:29,atk:9,def:3,skill:'Sóng Âm',color:0x7d78b9},
 Diglett:{emoji:'🟤',type:'Đất',hp:27,atk:10,def:4,skill:'Đào Đất',color:0xb98a61},
 Bellsprout:{emoji:'🌿',type:'Cỏ/Độc',hp:36,atk:12,def:4,skill:'Roi Dây',color:0x79b65e},
 Spearow:{emoji:'🐦',type:'Thường/Bay',hp:28,atk:10,def:3,skill:'Mổ',color:0xc68c5b},
 Mewtwo:{emoji:'🧬',type:'Tâm linh',hp:150,atk:25,def:18,skill:'Sóng Tâm Linh',color:0xb18bd1},
 Seel:{emoji:'🦭',type:'Nước',hp:38,atk:9,def:6,skill:'Sóng Băng',color:0x9bd6e8},Lapras:{emoji:'🦕',type:'Nước/Băng',hp:62,atk:13,def:10,skill:'Băng Tuyết',color:0x6aa9c8},Dratini:{emoji:'🐉',type:'Rồng',hp:34,atk:12,def:5,skill:'Đuôi Rồng',color:0x7bb7d8},Sandshrew:{emoji:'🦔',type:'Đất',hp:39,atk:10,def:8,skill:'Cuộn Đất',color:0xd9b36b}
};
const evolution={Bulbasaur:{level:16,to:'Ivysaur',emoji:'🌺',hp:58,atk:13,def:8,skill:'Lá Dao'},Ivysaur:{level:32,to:'Venusaur',emoji:'🌸',hp:82,atk:18,def:12,skill:'Bão Hoa'},Charmander:{level:16,to:'Charmeleon',emoji:'🦎',hp:48,atk:17,def:6,skill:'Hỏa Long'},Charmeleon:{level:36,to:'Charizard',emoji:'🐉',hp:78,atk:23,def:10,skill:'Long Hỏa'},Squirtle:{level:16,to:'Wartortle',emoji:'🐢',hp:58,atk:13,def:10,skill:'Thủy Pháo'},Wartortle:{level:36,to:'Blastoise',emoji:'🐢',hp:84,atk:19,def:16,skill:'Đại Thủy Pháo'}};
const wildByZone={
 route:['Pidgey','Rattata','Caterpie'],
 forest:['Caterpie','Oddish','Pidgey'],
 lake:['Psyduck','Geodude','Oddish'],
 cave:['Geodude','Rattata','Psyduck','Zubat','Diglett'],
 viridian:['Bellsprout','Spearow','Rattata'],
 island:['Seel','Dratini','Sandshrew','Lapras']
};
let state={party:[],dex:[],gold:500,balls:5,potions:3,steps:0,zone:'pallet',quest:0,oakTalk:false,badges:[],trainersDefeated:[]};
try{const old=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(old)state={...state,...old};else{const legacy=JSON.parse(localStorage.getItem('dk-kanto-save')||'null');if(legacy&&legacy.party){const n=legacy.party.name;const starter=n==='Sproutle'?'Bulbasaur':n==='Embercub'?'Charmander':n==='Aquaff'?'Squirtle':species[n]?n:'Bulbasaur';state.party=[makeMon(starter,legacy.party.level||5)];state.gold=legacy.gold||500;state.balls=legacy.balls||5;state.steps=legacy.steps||0;state.dex=[starter];}}}catch{}
state.badges=Array.isArray(state.badges)?state.badges:[];
state.trainersDefeated=Array.isArray(state.trainersDefeated)?state.trainersDefeated:[];state.crystalShards=Array.isArray(state.crystalShards)?state.crystalShards:[];state.crystalQuest=!!state.crystalQuest;state.islandQuest=!!state.islandQuest;state.islandShells=Array.isArray(state.islandShells)?state.islandShells:[];state.islandReward=!!state.islandReward;state.rideUnlocked=!!state.rideUnlocked;state.worldMinutes=Number.isFinite(state.worldMinutes)?state.worldMinutes:540;state.gymClear=!!state.gymClear;
function makeMon(name,lv){const s=species[name]||species.Pidgey;return {name,level:lv||3,xp:0,hp:s.hp+(lv-1)*3,maxHp:s.hp+(lv-1)*3,atk:s.atk+Math.floor((lv-1)*1.2),def:s.def+Math.floor((lv-1)*.5),current:s.hp+(lv-1)*3,skill:s.skill,emoji:s.emoji,type:s.type};}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(state))}catch(e){toast('Không thể lưu: bộ nhớ trình duyệt đầy.')}} 
function toast(t){const el=$('toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2100)}
function hud(){const lead=state.party[0];$('gold').textContent=state.gold;$('balls').textContent=state.balls;$('playerLevel').textContent='Lv. '+(lead?lead.level:1);$('quest').textContent=questText();$('questTitle').textContent='CHƯƠNG '+(state.quest+1)}
function questText(){return ['Gặp Giáo sư Oak tại phòng nghiên cứu ở thị trấn Pallet.','Đi vào bãi cỏ Đường 1 và thắng trận đầu tiên.','Bắt thêm một Pokémon để mở rộng đội hình.','Khám phá Rừng Thanh Mộc ở phía tây nam.','Tìm đường đến Hồ Xanh và nói chuyện với người câu cá.','Bạn đã hoàn thành hành trình mở đầu Kanto!'][Math.min(state.quest,5)]}
function setQuest(n){state.quest=Math.max(state.quest,n);hud();save()}
function show(id){$(id).classList.remove('hidden')}function hide(id){$(id).classList.add('hidden')}
function panel(title,eyebrow,html){$('panelTitle').textContent=title;$('panelEyebrow').textContent=eyebrow;$('panelContent').innerHTML=html;show('panel')}
function spriteFor(name){const map={Bulbasaur:'bulbasaur',Ivysaur:'bulbasaur',Venusaur:'bulbasaur',Charmander:'charmander',Charmeleon:'charmander',Charizard:'charmander',Squirtle:'squirtle',Wartortle:'squirtle',Blastoise:'squirtle',Pidgey:'pidgey',Rattata:'rattata',Caterpie:'caterpie',Oddish:'oddish',Psyduck:'psyduck',Geodude:'geodude','Thủ Lĩnh Đá':'geodude',Zubat:'zubat',Diglett:'diglett',Bellsprout:'bellsprout',Spearow:'spearow',Seel:'seel',Lapras:'lapras',Dratini:'dratini',Sandshrew:'sandshrew',Mewtwo:'mewtwo','Thủ Lĩnh Lá':'bellsprout'};return map[name]?'assets/pokemon/'+map[name]+'.svg':null}
function monArtMarkup(name,emoji){const src=spriteFor(name);return src?'<img src="'+src+'" alt="'+name+'" loading="eager" onerror="this.remove();this.parentElement.textContent=\''+emoji+'\'">':emoji}
function setMonArt(id,name,emoji){const el=$(id);el.innerHTML=monArtMarkup(name,emoji);el.classList.remove('spawn');void el.offsetWidth;el.classList.add('spawn')}
function monRow(m,i){const ev=evolution[m.name];const ready=ev&&m.level>=ev.level;return '<div class="slot"><span class="icon">'+monArtMarkup(m.name,m.emoji)+'</span><div><b>'+m.name+'</b><small>Lv.'+m.level+' · '+m.type+' · HP '+m.current+'/'+m.maxHp+' · XP '+m.xp+'/40'+(ev?' · Tiến hóa Lv.'+ev.level:'')+'</small></div>'+(ready?'<button data-evolve="'+i+'">TIẾN HÓA</button>':'')+'<button data-heal="'+i+'">Thuốc</button></div>'}
function petCompanion(){
 if(!companion||!state.party.length)return toast('Bạn chưa có Pokémon đồng hành.');
 const m=state.party[0],type=String(m.type||'');
 const line=type.includes('Lửa')?'Pokémon của bạn phấn khích, ngọn lửa bừng sáng!':type.includes('Nước')?'Pokémon vui vẻ vẫy đuôi, những giọt nước lấp lánh!':type.includes('Cỏ')?'Pokémon nghiêng đầu, lá trên người rung rinh!':type.includes('Bay')?'Pokémon dang cánh vui vẻ bên bạn!':type.includes('Đá')?'Pokémon khẽ rung mình đầy hào hứng!':m.name+' vui vẻ kêu lên khi được bạn quan tâm!';
 sound('catch');if(companion&&scene){scene.tweens.add({targets:companion,scaleX:1.18,scaleY:1.18,duration:140,yoyo:true,ease:'Back.Out'});const bubble=scene.add.text(companion.x,companion.y-48,'♥ '+m.name,{fontSize:'13px',fontStyle:'bold',color:'#fff',backgroundColor:'#173c32',padding:{x:7,y:4}}).setOrigin(.5).setDepth(9999);scene.tweens.add({targets:bubble,y:bubble.y-30,alpha:0,duration:1100,onComplete:()=>bubble.destroy()})}
 toast(line);
}
function selectCompanion(i){
 if(!Number.isInteger(i)||i<0||i>=state.party.length)return;
 if(i===0)return toast(state.party[0].name+' đang đồng hành cùng bạn.');
 const chosen=state.party.splice(i,1)[0];state.party.unshift(chosen);save();hud();setCompanionMon();openTeam();toast(chosen.name+' đã trở thành Pokémon đồng hành!');
}
function openTeam(){panel('ĐỘI HÌNH','TỐI ĐA 6 POKÉMON','<p>Đồng hành cùng bạn: '+state.party.length+'/6 · Pokédex: '+state.dex.length+'</p><div class="slotlist">'+(state.party.map((m,i)=>'<div class="team-entry '+(i===0?'active-lead':'')+'">'+monRow(m,i)+'<button data-lead="'+i+'" '+(i===0?'disabled':'')+'>'+(i===0?'ĐANG ĐỒNG HÀNH':'CHỌN ĐỒNG HÀNH')+'</button></div>').join('')||'<p>Chưa có Pokémon. Hãy bắt đầu hành trình!</p>')+'</div>');$('panelContent').querySelectorAll('[data-lead]').forEach(b=>b.onclick=()=>selectCompanion(Number(b.dataset.lead)));$('panelContent').querySelectorAll('[data-heal]').forEach(b=>b.onclick=()=>usePotion(Number(b.dataset.heal)));$('panelContent').querySelectorAll('[data-evolve]').forEach(b=>b.onclick=()=>evolveMon(Number(b.dataset.evolve)))}
function evolveMon(i){sound('evolve');const m=state.party[i],ev=m&&evolution[m.name];if(!ev||m.level<ev.level)return toast('Chưa đủ cấp để tiến hóa!');const old=m.name;m.name=ev.to;m.emoji=ev.emoji;m.skill=ev.skill;m.maxHp=ev.hp;m.hp=ev.hp;m.current=ev.hp;m.atk=ev.atk;m.def=ev.def;m.type=m.type+' · Tiến hóa';if(!state.dex.includes(m.name))state.dex.push(m.name);if(i===0)setCompanionMon();save();hud();openTeam();toast('✨ '+old+' đã tiến hóa thành '+m.name+'!')}
function usePotion(i){const m=state.party[i];if(!m||state.potions<1){toast('Bạn không còn thuốc hồi phục!');return}if(m.current>=m.maxHp){toast('Pokémon đang đầy HP.');return}state.potions--;m.current=Math.min(m.maxHp,m.current+20);save();openTeam();toast(m.name+' hồi phục 20 HP.')}
function openBag(){panel('TÚI ĐỒ','VẬT PHẨM CỦA BẠN','<div class="itemrow"><span>🔴 Bóng Poké</span><b>'+state.balls+'</b></div><div class="itemrow"><span>🧪 Thuốc hồi phục</span><b>'+state.potions+'</b></div><div class="itemrow"><span>🪙 Vàng</span><b>'+state.gold+'</b></div><div class="itemrow"><span>🎒 Mua 3 bóng Poké</span><button id="buyBalls">60 vàng</button></div><div class="itemrow"><span>🧪 Mua 1 thuốc</span><button id="buyPotion">45 vàng</button></div>');$('buyBalls').onclick=()=>{if(state.gold<60)return toast('Không đủ vàng!');state.gold-=60;state.balls+=3;save();hud();openBag()};$('buyPotion').onclick=()=>{if(state.gold<45)return toast('Không đủ vàng!');state.gold-=45;state.potions++;save();hud();openBag()}}
function openDex(){const seen=state.dex||[];const cards=Object.entries(species).map(([name,s])=>'<div class="dex-card '+(seen.includes(name)?'seen':'unseen')+'"><span>'+ (seen.includes(name)?monArtMarkup(name,s.emoji):'❔') +'</span><div><b>'+(seen.includes(name)?name:'Chưa khám phá')+'</b><small>'+(seen.includes(name)?s.type+' · '+s.skill:'Gặp Pokémon này để mở khóa')+'</small></div></div>').join('');panel('POKÉDEX','SỔ TAY SINH VẬT KANTO','<p>Đã ghi nhận <b>'+seen.length+'/'+Object.keys(species).length+'</b> loài cơ bản. Các dạng tiến hóa được ghi riêng khi mở khóa.</p><div class="dex-grid">'+cards+'</div>')}
function openQuests(){panel('NHẬT KÝ HÀNH TRÌNH','CỐT TRUYỆN KANTO',['Gặp Giáo sư Oak tại phòng nghiên cứu.','Thắng trận đầu tiên trên Đường 1.','Bắt thêm một Pokémon.','Khám phá Rừng Thanh Mộc.','Đến Hồ Xanh và trò chuyện.','Hoàn thành hành trình mở đầu Kanto.'].map((q,i)=>'<div class="task"><b>'+(i<state.quest?'✓ ':i===state.quest?'◆ ':'○ ')+q+'</b><small>'+(i<state.quest?'Đã hoàn thành':i===state.quest?'Nhiệm vụ hiện tại':'Chưa mở khóa')+'</small></div>').join('')+'<div class="badge-status">🏅 Huy hiệu Đá: '+(state.badges.includes('Đá')?'ĐÃ NHẬN':'CHƯA NHẬN')+'</div><div class="badge-status">🌿 Huy hiệu Rừng: '+(state.badges.includes('Rừng')?'ĐÃ NHẬN':'CHƯA NHẬN')+'</div><button class="primary" id="gymChallenge" '+(state.badges.includes('Đá')?'disabled':'')+'>⚔ '+(state.badges.includes('Đá')?'ĐÃ CHINH PHỤC NHÀ THI ĐẤU':'THỬ THÁCH NHÀ THI ĐẤU')+'</button><small class="muted">Đối thủ cấp 10 · Huy hiệu chỉ nhận một lần</small>');$('gymChallenge').onclick=()=>{hide('panel');startBattle(true)}}
let game,scene,player,keys={},heldDir=null,moveLoop=null,busy=false,lastEncounter=0,nearNpc=false,grassAreas=[],sprintHeld=false;
let audioEnabled=true,audioCtx=null;
function sound(kind){if(!audioEnabled)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;if(!audioCtx)audioCtx=new C();if(audioCtx.state==='suspended')audioCtx.resume();const now=audioCtx.currentTime;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);const tones={hit:[180,95,.12,'square'],special:[320,720,.24,'sawtooth'],catch:[540,880,.22,'sine'],win:[440,660,.34,'triangle'],evolve:[260,980,.55,'sine'],step:[90,70,.035,'triangle']};const t=tones[kind]||tones.hit;o.type=t[3];o.frequency.setValueAtTime(t[0],now);o.frequency.exponentialRampToValueAtTime(t[1],now+t[2]);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.11,now+.015);g.gain.exponentialRampToValueAtTime(.0001,now+t[2]);o.start(now);o.stop(now+t[2]+.02)}catch(e){}}
function setZone(z){state.zone=z;const names={viridian:'THÀNH PHỐ VIRIDIAN · KANTO',caveInterior:'HANG ĐÁ THẠCH ANH · TẦNG SÂU',shop:'CỬA HÀNG PALLET · KANTO',center:'TRUNG TÂM POKÉMON · KANTO',pallet:'THỊ TRẤN PALLET · KANTO',route:'ĐƯỜNG 1 · KANTO',forest:'RỪNG THANH MỘC · KANTO',lake:'HỒ XANH · KANTO',cave:'HANG ĐÁ THẠCH ANH · KANTO'};$('zone').textContent=names[z];$('maptag').textContent=names[z]}
function drawWorld(s){
 const g=s.add.graphics(),W=1500,H=1050;
 g.fillStyle(0x438c59,1);g.fillRect(0,0,W,H);
 for(let y=0;y<H;y+=48)for(let x=0;x<W;x+=48){g.fillStyle(((x/48+y/48)%2)?0x3e8755:0x468f5b,1);g.fillRect(x,y,48,48);if((x*7+y*11)%9===0){g.fillStyle(0xc1d978,1);g.fillRect(x+11,y+17,3,6);g.fillRect(x+28,y+29,3,4)}}
 // Central roads and town square
 g.fillStyle(0xc8b48a,1);g.fillRect(0,440,W,112);g.fillRect(660,0,120,H);g.fillStyle(0xe4d1a6,1);for(let x=0;x<W;x+=44)g.fillRect(x,450,29,4);for(let y=0;y<H;y+=40)g.fillRect(700,y,4,25);
 // Lake
 g.fillStyle(0x2479a5,1);g.fillRoundedRect(1060,680,330,250,36);g.lineStyle(5,0x72c8dc,.9);g.strokeRoundedRect(1060,680,330,250,36);for(let i=0;i<24;i++){g.lineStyle(2,0x9ce3ed,.7);g.lineBetween(1080+(i*47)%285,700+(i*29)%205,1100+(i*47)%285,700+(i*29)%205)}
 // Forest canopy patches
 for(let i=0;i<65;i++){const x=20+(i*197)%570,y=20+(i*113)%390;g.fillStyle(0x285c3e,1);g.fillCircle(x,y,22);g.fillStyle(0x347d4a,1);g.fillCircle(x-9,y-9,19);g.fillStyle(0x4c9a59,1);g.fillCircle(x+7,y-12,12)}
 // Houses
 const house=(x,y,c)=>{g.fillStyle(0x4c4a55,1);g.fillRect(x-8,y+28,150,95);g.fillStyle(c,1);g.fillTriangle(x-18,y+32,x+65,y-28,x+158,y+32);g.fillStyle(0xe5d2a9,1);g.fillRect(x+48,y+65,34,58);g.fillStyle(0x7eb4ca,1);g.fillRect(x+12,y+51,26,25);g.fillRect(x+96,y+51,26,25)};
 house(160,180,0xa64e50);house(380,180,0x477ca1);house(880,160,0x9b704b);
 // Tall grass encounter patches
 const grass=(x,y,w,h)=>{grassAreas.push({x,y,w,h});for(let yy=y;yy<y+h;yy+=13)for(let xx=x;xx<x+w;xx+=13){g.fillStyle(0x267444,1);g.fillRect(xx,yy,11,11);g.fillStyle(0x83c85e,1);g.fillTriangle(xx+1,yy+10,xx+5,yy-2,xx+7,yy+10)}};
 grass(40,600,420,300);grass(810,590,190,270);grass(850,30,190,230);grass(485,820,150,155);
 // Signs and rocks
 for(const [x,y] of [[620,380],[990,530],[500,830],[1180,630]]){g.fillStyle(0x725037,1);g.fillRect(x,y,8,28);g.fillStyle(0xf0c45b,1);g.fillRect(x-12,y-9,32,15)}
 s.add.text(190,115,'THỊ TRẤN PALLET',{fontFamily:'monospace',fontSize:'23px',color:'#fff3cf',stroke:'#26432e',strokeThickness:6});
 s.add.text(75,575,'ĐƯỜNG 1',{fontFamily:'monospace',fontSize:'17px',color:'#fff',stroke:'#244a32',strokeThickness:5});
 s.add.text(35,920,'RỪNG THANH MỘC',{fontFamily:'monospace',fontSize:'16px',color:'#d7f2bd',stroke:'#183d2a',strokeThickness:5});
 s.add.text(1110,950,'HỒ XANH',{fontFamily:'monospace',fontSize:'17px',color:'#d7f5ff',stroke:'#17415c',strokeThickness:5});
}
function addNpc(s,x,y,emoji,label){const t=s.add.text(x,y,emoji,{fontSize:'30px'}).setOrigin(.5);s.add.text(x,y+25,label,{fontSize:'11px',color:'#fff',stroke:'#172b23',strokeThickness:4}).setOrigin(.5);s.tweens.add({targets:t,y:y-4,duration:720+(x%4)*95,yoyo:true,repeat:-1,ease:'Sine.easeInOut',delay:(x+y)%500});return {x,y,obj:t,label}} 
function drawInterior(s,x,y,w,h,title,accent){
 const g=s.add.graphics();g.fillStyle(0x182b39,1);g.fillRect(x,y,w,h);g.fillStyle(0x987b58,1);g.fillRect(x+18,y+18,w-36,h-36);g.fillStyle(0xc8b58e,1);g.fillRect(x+30,y+30,w-60,h-60);
 g.fillStyle(0x344b5b,1);g.fillRect(x+18,y+18,w-36,42);g.fillStyle(accent,1);g.fillRect(x+34,y+31,12,12);
 s.add.text(x+w/2,y+39,title,{fontFamily:'monospace',fontSize:'19px',color:'#fff4d5',stroke:'#263544',strokeThickness:4}).setOrigin(.5);
 g.fillStyle(0x70543b,1);g.fillRect(x+65,y+130,w-130,18);g.fillStyle(0x4c392c,1);g.fillRect(x+75,y+148,w-150,48);
 g.fillStyle(0x3c5d68,1);g.fillRect(x+55,y+h-115,w-110,35);g.fillStyle(0x9ac6bf,1);g.fillRect(x+75,y+h-105,38,14);
 // Outer walls with a walkable doorway at the bottom.
 const wall=(cx,cy,cw,ch)=>{const o=s.add.rectangle(cx,cy,cw,ch,0xffffff,0);s.physics.add.existing(o,true);s.physics.add.collider(player,o)};
 wall(x+w/2,y+8,w,16);wall(x+8,y+h/2,16,h);wall(x+w-8,y+h/2,16,h);wall(x+90,y+h-8,w/2-90,16);wall(x+w-90,y+h-8,w/2-90,16);
 return {x,y,w,h};
}
function drawCaveInterior(s){
 const g=s.add.graphics(),x=3000,y=100,w=650,h=820;g.fillStyle(0x252b35,1);g.fillRect(x,y,w,h);g.fillStyle(0x55515a,1);g.fillRoundedRect(x+18,y+18,w-36,h-36,22);
 for(let i=0;i<95;i++){const px=x+35+(i*83)%575,py=y+75+(i*137)%700;g.fillStyle(i%3===0?0x887e8d:0x68616b,1);g.fillTriangle(px,py+17,px+14,py-15,px+29,py+17);if(i%5===0){g.fillStyle(0x70c9d2,1);g.fillTriangle(px+9,py+12,px+14,py-5,px+19,py+12)}}
 g.fillStyle(0x34303a,1);g.fillRect(x+40,y+90,w-80,h-180);g.fillStyle(0x403b45,1);g.fillRect(x+58,y+110,w-116,h-220);
 s.add.text(x+w/2,y+45,'HANG THẠCH ANH · TẦNG SÂU',{fontFamily:'monospace',fontSize:'18px',color:'#d8f3f5',stroke:'#28232d',strokeThickness:5}).setOrigin(.5);
 const wall=(cx,cy,cw,ch)=>{const o=s.add.rectangle(cx,cy,cw,ch,0xffffff,0);s.physics.add.existing(o,true);s.physics.add.collider(player,o)};
 wall(x+w/2,y+8,w,16);wall(x+8,y+h/2,16,h);wall(x+w-8,y+h/2,16,h);wall(x+90,y+h-8,w/2-90,16);wall(x+w-90,y+h-8,w/2-90,16);
 // Lớp rêu phát sáng là vùng có thể gặp Pokémon trong hang.
 grassAreas.push({x:x+190,y:y+245,w:270,h:390});for(let i=0;i<38;i++){const px=x+210+(i*61)%240,py=y+260+(i*97)%350;g.fillStyle(i%2?0x397e70:0x4b9a85,.8);g.fillCircle(px,py,5);g.fillStyle(0x9be0bd,.8);g.fillCircle(px+2,py-2,2)}
}
function drawViridian(s){
 const g=s.add.graphics(),x=3800,y=80,w=1500,h=960;g.fillStyle(0x4b925b,1);g.fillRect(x,y,w,h);
 for(let yy=y;yy<y+h;yy+=52)for(let xx=x;xx<x+w;xx+=52){g.fillStyle(((xx+yy)/52)%2?0x4c965c:0x478b55,1);g.fillRect(xx,yy,50,50)}
 g.fillStyle(0xc9b58d,1);g.fillRect(x,y+420,w,120);g.fillRect(x+690,y,130,960);
 g.fillStyle(0xead9b3,1);for(let xx=x;xx<x+w;xx+=48)g.fillRect(xx,y+475,28,4);for(let yy=y;yy<y+h;yy+=42)g.fillRect(x+750,yy,4,25);
 const house=(hx,hy,col)=>{g.fillStyle(0x4b4140,1);g.fillRect(hx,hy+35,190,115);g.fillStyle(col,1);g.fillTriangle(hx-15,hy+40,hx+95,hy-35,hx+205,hy+40);g.fillStyle(0xe4d2ad,1);g.fillRect(hx+75,hy+82,40,68);g.fillStyle(0x77b5cb,1);g.fillRect(hx+20,hy+65,35,32);g.fillRect(hx+135,hy+65,35,32)};
 house(x+160,y+150,0x9c5d58);house(x+1100,y+150,0x527da5);house(x+160,y+680,0x98744f);
 g.fillStyle(0x343d4d,1);g.fillRect(x+850,y+230,310,245);g.fillStyle(0x587c57,1);g.fillTriangle(x+820,y+245,x+1005,y+105,x+1190,y+245);g.fillStyle(0xe5d4a8,1);g.fillRect(x+965,y+340,82,135);g.fillStyle(0x9bd16b,1);g.fillCircle(x+1005,y+285,30);g.lineStyle(5,0xe4d9ad,1);g.strokeCircle(x+1005,y+285,30);
 g.fillStyle(0x2d6844,1);g.fillRoundedRect(x+30,y+280,300,230,28);for(let i=0;i<45;i++){g.fillStyle(i%2?0xf2d57c:0xe9a6b0,1);g.fillCircle(x+55+(i*47)%245,y+300+(i*31)%180,4)}
 s.add.text(x+95,y+70,'THÀNH PHỐ VIRIDIAN',{fontFamily:'monospace',fontSize:'25px',color:'#fff3cf',stroke:'#24442d',strokeThickness:6});s.add.text(x+865,y+495,'NHÀ THI ĐẤU VIRIDIAN',{fontFamily:'monospace',fontSize:'16px',color:'#fff',stroke:'#263d2a',strokeThickness:5});
 const grass=(gx,gy,gw,gh)=>{grassAreas.push({x:gx,y:gy,w:gw,h:gh});for(let yy=gy;yy<gy+gh;yy+=13)for(let xx=gx;xx<gx+gw;xx+=13){g.fillStyle(0x267444,1);g.fillRect(xx,yy,11,11);g.fillStyle(0x9bcf65,1);g.fillTriangle(xx+1,yy+10,xx+5,yy-2,xx+7,yy+10)}};
 grass(x+340,y+640,330,220);
 const wall=(cx,cy,cw,ch)=>{const o=s.add.rectangle(cx,cy,cw,ch,0xffffff,0);s.physics.add.existing(o,true);s.physics.add.collider(player,o)};
 wall(x+w/2,y+8,w,16);wall(x+8,y+h/2,16,h);wall(x+w-8,y+h/2,16,h);wall(x+w/2,y+h-8,w,16);
}
function createPlayer(s,x,y){
 player=s.add.container(x,y);
 const shadow=s.add.ellipse(0,25,31,10,0x173d2a,.42);
 const legs=s.add.container(0,0);
 const legL=s.add.rectangle(-6,17,9,17,0x24334b).setOrigin(.5,0);
 const legR=s.add.rectangle(6,17,9,17,0x24334b).setOrigin(.5,0);
 const bootL=s.add.rectangle(-6,31,12,6,0x302a2b),bootR=s.add.rectangle(6,31,12,6,0x302a2b);
 legs.add([legL,legR,bootL,bootR]);
 const body=s.add.container(0,0);
 const pack=s.add.rectangle(-14,1,8,19,0x9b4938).setStrokeStyle(2,0x542e2b);
 const coat=s.add.rectangle(0,2,23,25,0x294d91).setStrokeStyle(2,0x172a52);
 const scarf=s.add.rectangle(0,-4,13,4,0xf1c64f);
 const neck=s.add.rectangle(0,-13,8,6,0xe8b58f);
 const face=s.add.rectangle(0,-22,19,18,0xf1c49e).setStrokeStyle(2,0x704a3b);
 const hair=s.add.rectangle(0,-31,21,7,0x342a2a);
 const cap=s.add.rectangle(0,-35,27,7,0xc94442).setStrokeStyle(2,0x762d32);
 const brim=s.add.rectangle(7,-31,18,3,0xe45a4d);
 const eyes=s.add.rectangle(4,-22,3,3,0x202a39);
 body.add([pack,coat,scarf,neck,face,hair,cap,brim,eyes]);
 player.add([shadow,legs,body]);player.setDepth(y);
 player.walkParts={legs,legL,legR,body,shadow,bootL,bootR};
 s.physics.add.existing(player);player.body.setSize(20,25);player.body.setOffset(-10,5);player.body.setCollideWorldBounds(true);player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(15,15,7080,1370));
 s.tweens.add({targets:body,y:-1,duration:390,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
 s.cameras.main.setBounds(0,0,5400,1100);s.cameras.main.startFollow(player,true,.12,.12);return player
}
let companion=null,companionArt=null,companionName='';
function setCompanionMon(){
 if(!scene||!companion||!state.party.length)return;
 const mon=state.party[0],name=mon.name,emoji=mon.emoji||'🐾';
 if(companionName===name&&companionArt)return;
 companionName=name;
 if(companionArt){companionArt.destroy();companionArt=null}
 const fallback=scene.add.text(0,-5,emoji,{fontSize:'27px'}).setOrigin(.5);
 companion.add(fallback);companionArt=fallback;
 const src=spriteFor(name);if(!src)return;
 const key='dk-follow-'+name.toLowerCase().replace(/[^a-z0-9]/g,'');
 if(scene.textures.exists(key)){fallback.destroy();const img=scene.add.image(0,-5,key).setDisplaySize(42,42);companion.add(img);companionArt=img;return}
 scene.load.image(key,src);
 scene.load.once('filecomplete-image-'+key,()=>{
  if(!companion||!companion.active||companionName!==name)return;
  if(companionArt)companionArt.destroy();
  const img=scene.add.image(0,-5,key).setDisplaySize(42,42);
  companion.add(img);companionArt=img;
 });
 scene.load.start();
}
function createCompanion(s){
 companion=s.add.container(player.x-34,player.y+12);
 const shade=s.add.ellipse(0,15,27,8,0x10251c,.42);
 companion.add(shade);companion.setDepth(player.y+1);
 companion.setAlpha(.98);
 setCompanionMon();
}
function updateCompanion(vx,vy){
 if(!companion||!player||!companion.active)return;
 if(state.party.length&&companionName!==state.party[0].name)setCompanionMon();
 const moving=!!(vx||vy),dx=moving?vx*34:(player.walkParts&&player.walkParts.body.scaleX<0?34:-34);
 const dy=moving?(vy>0?-17:vy<0?24:12):12;
 const tx=player.x-dx,ty=player.y+dy;
 companion.x=Phaser.Math.Linear(companion.x,tx,.16);
 companion.y=Phaser.Math.Linear(companion.y,ty,.16);
 if(companionArt&&companionArt.type==='Image'){
  companionArt.setAngle(moving?Math.sin(Date.now()/95)*5:0);
  companionArt.setScale(1+(moving?Math.abs(Math.sin(Date.now()/105))*.06:0));
 }else if(companionArt){
  companionArt.y=-5+(moving?Math.abs(Math.sin(Date.now()/105))*2:Math.sin(Date.now()/420)*2);
 }
 companion.setDepth(player.y+1);
}
function createGame(){if(!window.Phaser){toast('Không tải được thư viện game. Kiểm tra Internet rồi tải lại.');return}const config={type:Phaser.AUTO,parent:'game',backgroundColor:'#438c59',scale:{mode:Phaser.Scale.RESIZE,width:900,height:560},pixelArt:true,physics:{default:'arcade',arcade:{debug:false}},scene:{create(){scene=this;grassAreas=[];drawWorld(this);const oak=addNpc(this,300,340,'🧑‍🔬','GIÁO SƯ OAK');const fisher=addNpc(this,1020,735,'🎣','NGƯỜI CÂU CÁ');const trainers=[{id:'route-ace',x:540,y:500,emoji:'🧢',label:'HUẤN LUYỆN VIÊN MINH',mon:'Rattata',level:5,reward:90},{id:'forest-ace',x:390,y:760,emoji:'🥾',label:'NHÀ THÁM HIỂM LAN',mon:'Caterpie',level:7,reward:130},{id:'cave-ace',x:650,y:900,emoji:'⛏️',label:'THỢ MỎ NAM',mon:'Geodude',level:9,reward:180}];trainers.forEach(t=>{t.obj=addNpc(this,t.x,t.y,t.emoji,state.trainersDefeated.includes(t.id)?'ĐÃ THÁCH ĐẤU':t.label)});const shopDoor=addNpc(this,230,390,'🚪','CỬA HÀNG PALLET');const centerDoor=addNpc(this,520,390,'🏥','TRUNG TÂM POKÉMON');
createPlayer(this,330,390);createCompanion(this);createWorldClock(this);this.physics.world.setBounds(0,0,7100,1400);player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(15,15,7080,1370));
drawInterior(this,1650,120,600,700,'CỬA HÀNG PALLET',0xe5b65b);drawInterior(this,2300,120,500,700,'TRUNG TÂM POKÉMON',0x71d5c2);drawCaveInterior(this);drawViridian(this);drawSeaIsland(this);
const captain=addNpc(this,5050,830,'⛵','THUYỀN TRƯỞNG');const islandGuide=addNpc(this,6250,450,'🧭','NGƯỜI GIỮ ĐẢO');const shell1=addNpc(this,5940,250,'🐚','NGỌC TRAI 1');const shell2=addNpc(this,6500,720,'🐚','NGỌC TRAI 2');const shell3=addNpc(this,6800,300,'🐚','NGỌC TRAI 3');
const researcher=addNpc(this,3440,480,'🧑‍🔬','NHÀ NGHIÊN CỨU');const crystalA=addNpc(this,3160,300,'💎','TINH THỂ CỔ 1');const crystalB=addNpc(this,3450,650,'💎','TINH THỂ CỔ 2');const crystalC=addNpc(this,3550,330,'💎','TINH THỂ CỔ 3');
const shopkeeper=addNpc(this,1950,420,'🧑‍💼','CHỦ CỬA HÀNG');const shopExit=addNpc(this,1950,770,'🚪','CỬA RA THỊ TRẤN');const nurse=addNpc(this,2550,420,'👩‍⚕️','Y TÁ JOY');const centerExit=addNpc(this,2550,770,'🚪','CỬA RA THỊ TRẤN');const caveGate=addNpc(this,500,955,'🕳️','LỐI VÀO HANG SÂU');const caveExit=addNpc(this,3325,850,'🚪','RA KHỎI HANG');const cityGate=addNpc(this,1390,500,'🏙️','CỔNG THÀNH PHỐ VIRIDIAN');const cityExit=addNpc(this,4550,990,'🚪','CỔNG VỀ ĐƯỜNG 1');const viridianGym=addNpc(this,4805,430,'🏟️','NHÀ THI ĐẤU VIRIDIAN');const cityGuide=addNpc(this,4200,520,'🧑‍🌾','NGƯỜI DẪN ĐƯỜNG');
this.npcs=[oak,fisher,...trainers,captain,islandGuide,shell1,shell2,shell3,researcher,crystalA,crystalB,crystalC,shopDoor,centerDoor,shopkeeper,shopExit,nurse,centerExit,caveGate,caveExit,cityGate,cityExit,viridianGym,cityGuide];this.trainers=trainers;
const solids=[[227,282,150,70],[447,282,150,70],[947,262,150,70],[1225,805,330,250],[700,40,90,80]];solids.forEach(v=>{const wall=this.add.rectangle(v[0],v[1],v[2],v[3],0xffffff,0);this.physics.add.existing(wall,true);this.physics.add.collider(player,wall)});this.add.text(20,1010,'Di chuyển bằng phím hoặc cụm nút cảm ứng',{fontSize:'12px',color:'#fff',stroke:'#1a3c2c',strokeThickness:4});},update(){if(!player||busy)return;let vx=0,vy=0;const running=sprintHeld||keys.Shift;const speed=rideActive?330:running?245:155;if(keys.left||keys.a||keys.ArrowLeft)vx=-1;if(keys.right||keys.d||keys.ArrowRight)vx=1;if(keys.up||keys.w||keys.ArrowUp)vy=-1;if(keys.down||keys.s||keys.ArrowDown)vy=1;if(heldDir){if(heldDir==='left')vx=-1;if(heldDir==='right')vx=1;if(heldDir==='up')vy=-1;if(heldDir==='down')vy=1}if(vx&&vy){vx*=.707;vy*=.707}player.body.setVelocity(vx*speed,vy*speed);if(player.walkParts){const w=player.walkParts;const walking=!!(vx||vy),phase=Date.now()/(running?48:85);w.legL.rotation=walking?Math.sin(phase)*.34:0;w.legR.rotation=walking?-Math.sin(phase)*.34:0;w.bootL.rotation=w.legL.rotation*.55;w.bootR.rotation=w.legR.rotation*.55;w.body.y=walking?Math.abs(Math.sin(phase))*(running?2.4:.9):0;w.body.x=walking?Math.sin(Date.now()/(running?55:90))*(running?2.1:1.2):0;if(vx<0)w.body.scaleX=-1;else if(vx>0)w.body.scaleX=1;}updateCompanion(vx,vy);if(vx||vy){state.steps++;if(state.steps%18===0){save();if(inGrass(player.x,player.y)&&Date.now()-lastEncounter>5000&&Math.random()<.18)startBattle()}}updateLocation();}}};game=new Phaser.Game(config);game.events.once('ready',()=>{});}
let rideActive=false,rideBadge=null;
function toggleRide(){if(!state.rideUnlocked){toast('Hoàn thành nhiệm vụ Đảo San Hô để mở khóa cưỡi Lapras!');return}if(!player||busy)return;rideActive=!rideActive;if(rideActive){if(!rideBadge){rideBadge=scene.add.text(0,23,'🌊',{fontSize:'30px'}).setOrigin(.5);player.addAt(rideBadge,0)}rideBadge.setVisible(true);$('ride').textContent='🌊 XUỐNG KHỎI LAPRAS';toast('Lapras đưa bạn lướt đi! Tốc độ tăng lên.')}else{if(rideBadge)rideBadge.setVisible(false);$('ride').textContent='🌊 CƯỠI LAPRAS';toast('Bạn đã xuống khỏi Lapras.')}};
function drawSeaIsland(s){
 const g=s.add.graphics(),x=5500,y=0,w=1600,h=1400;
 g.fillStyle(0x287eaa,1);g.fillRect(x,y,w,h);
 for(let i=0;i<150;i++){const px=x+((i*173)%w),py=(i*97)%h;g.fillStyle(i%2?0x4ba4c4:0x1e6e9d,.45);g.fillEllipse(px,py,35,9)}
 g.fillStyle(0xd9c58e,1);g.fillEllipse(6300,700,1180,820);g.fillStyle(0x72a95d,1);g.fillEllipse(6300,680,1040,700);g.fillStyle(0x4f8d50,1);g.fillEllipse(6300,680,870,570);
 for(let i=0;i<22;i++){const px=5850+(i*137)%900,py=420+(i*83)%520;g.fillStyle(0x326b43,1);g.fillCircle(px,py,18);g.fillStyle(0x5b9d5c,1);g.fillCircle(px-7,py-8,13)}
 g.fillStyle(0xc5a36c,1);g.fillRect(6110,920,370,38);g.fillStyle(0x72523c,1);g.fillRect(6280,880,30,80);g.fillStyle(0xf1e0b7,1);g.fillTriangle(6295,875,6295,810,6355,875);
 s.add.text(6300,180,'ĐẢO SAN HÔ',{fontFamily:'monospace',fontSize:'26px',color:'#fff3cf',stroke:'#31536a',strokeThickness:6}).setOrigin(.5);
 const wall=(cx,cy,cw,ch)=>{const o=s.add.rectangle(cx,cy,cw,ch,0xffffff,0);s.physics.add.existing(o,true);s.physics.add.collider(player,o)};
 wall(6300,18,1600,30);wall(6300,1380,1600,30);wall(5518,700,30,1400);wall(7082,700,30,1400);
 grassAreas.push({x:6000,y:480,w:620,h:400});
}
function createWorldClock(s){
 const shade=s.add.rectangle(0,0,900,560,0x08152f,0).setOrigin(0).setScrollFactor(0).setDepth(99990);
 const label=s.add.text(12,34,'09:00 · TRỜI QUANG',{fontFamily:'monospace',fontSize:'11px',color:'#fff7d6',backgroundColor:'#102b3dcc',padding:{x:7,y:5}}).setScrollFactor(0).setDepth(99991);
 const rain=[];for(let i=0;i<34;i++){const line=s.add.rectangle(Math.random()*900,Math.random()*560,1.5,12,0xb9e8ff,.55).setScrollFactor(0).setDepth(99989);rain.push(line)}
 const refresh=()=>{const mins=state.worldMinutes%1440,h=Math.floor(mins/60),m=mins%60;const night=h<6||h>=19,dusk=h>=17&&h<19||h>=6&&h<7;shade.setFillStyle(night?0x07152f:0x13243c);shade.setAlpha(night?.42:dusk?.18:.02);label.setText(String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+' · '+(night?'BAN ĐÊM':dusk?'HOÀNG HÔN':'BAN NGÀY')+(state.weather==='rain'?' · MƯA':' · TRỜI QUANG'));rain.forEach(p=>p.setVisible(state.weather==='rain'&&!night));};
 s.scale.on('resize',(size)=>{shade.setSize(size.width,size.height);});
 s.events.on('update',()=>{if(state.weather==='rain')rain.forEach(p=>{p.y+=5;if(p.y>600){p.y=-12;p.x=Math.random()*1000}})});
 s.time.addEvent({delay:60000,loop:true,callback:()=>{state.worldMinutes=(state.worldMinutes+30)%1440;if(Math.random()<.16)state.weather=state.weather==='rain'?'clear':'rain';refresh();save()}});
 state.weather=state.weather==='rain'?'rain':'clear';refresh();
}
function typeEffect(attacker,defender){const a=String(attacker||''),d=String(defender||'');let mult=1;const has=(s,k)=>s.includes(k);if((has(a,'Lửa')&&(has(d,'Cỏ')||has(d,'Côn trùng'))) || (has(a,'Nước')&&has(d,'Lửa')) || (has(a,'Cỏ')&&has(d,'Nước')) || (has(a,'Đá')&&(has(d,'Bay')||has(d,'Lửa'))))mult=1.5;else if((has(a,'Lửa')&&has(d,'Nước'))||(has(a,'Nước')&&has(d,'Cỏ'))||(has(a,'Cỏ')&&has(d,'Lửa'))||(has(a,'Thường')&&has(d,'Đá')))mult=.7;return {multiplier:mult}}
function inGrass(x,y){return grassAreas.some(a=>x>=a.x&&x<=a.x+a.w&&y>=a.y&&y<=a.y+a.h)}
function updateLocation(){if(!player)return;let z='route';if(player.x>=5500&&player.x<7100)z='island';else if(player.x>=3800&&player.x<5300)z='viridian';else if(player.x>=3000&&player.x<3700)z='caveInterior';else if(player.x>=2300)z='center';else if(player.x>=1600)z='shop';else if(player.x<680&&player.y<440)z='pallet';else if(player.x>485&&player.x<650&&player.y>805)z='cave';else if(player.x<650&&player.y>560)z='forest';else if(player.x>1030&&player.y>660)z='lake';if(z!==state.zone){setZone(z);if(z==='forest'&&state.quest===3){setQuest(4);toast('Đã khám phá Rừng Thanh Mộc!')}if(z==='lake'&&state.quest===4){setQuest(5);toast('Đã đến Hồ Xanh! Hãy trò chuyện với người câu cá.')}}}

function stopMove(){heldDir=null;sprintHeld=false;const b=$('sprint');if(b)b.classList.remove('active')}
function startBattle(mode=false){const gym=mode&&typeof mode==='object'&&mode.kind==='gym'?mode:null;const isGym=mode===true||!!gym;const trainer=mode&&typeof mode==='object'&&!gym?mode:null;if(busy||!state.party.length)return;if(isGym&&state.badges.includes(gym?gym.badge:'Đá'))return toast('Bạn đã sở hữu huy hiệu '+(gym?gym.badge:'Đá')+'!');if(trainer&&state.trainersDefeated.includes(trainer.id))return toast('Bạn đã thắng huấn luyện viên này rồi!');lastEncounter=Date.now();busy=true;const zone=state.zone==='forest'?'forest':state.zone==='lake'?'lake':state.zone==='cave'||state.zone==='caveInterior'?'cave':state.zone==='viridian'?'viridian':state.zone==='island'?'island':'route';const pool=wildByZone[zone]||wildByZone.route;const name=isGym?'Geodude':trainer?trainer.mon:pool[Math.floor(Math.random()*pool.length)];const wild=makeMon(name,isGym?(gym?gym.level:10):trainer?trainer.level:2+Math.floor(Math.random()*4));if(trainer){wild.name=trainer.mon;if(trainer.legendary){wild.maxHp=wild.hp=trainer.hp||150;wild.current=wild.maxHp;wild.atk=trainer.atk||25;wild.def=trainer.def||18;wild.type='Tâm linh';}}if(isGym){wild.name=gym?gym.boss:'Thủ Lĩnh Đá';wild.emoji=gym?gym.emoji:'🗿';wild.maxHp=wild.hp=gym?gym.hp:95;wild.current=wild.maxHp;wild.atk=gym?gym.atk:14;wild.def=gym?gym.def:8;wild.type=gym?gym.type:'Đá/Đất';}wild.current=wild.maxHp;let ended=false,turn=false;$('enemyName').textContent=wild.name;$('enemyLv').textContent='Lv. '+wild.level;setMonArt('enemyEmoji',wild.name,wild.emoji);$('allyName').textContent=state.party[0].name;$('allyLv').textContent='Lv. '+state.party[0].level;setMonArt('allyEmoji',state.party[0].name,state.party[0].emoji);$('enemyHp').style.width='100%';$('allyHp').style.width=(state.party[0].current/state.party[0].maxHp*100)+'%';$('battleText').textContent='Một '+wild.name+' hoang dã nhảy ra từ bụi cỏ!';$('battleWeather').textContent=isGym?'NHÀ THI ĐẤU ĐÁ':trainer?'ĐẤU HUẤN LUYỆN VIÊN':zone==='forest'?'RỪNG THANH MỘC':zone==='lake'?'HỒ XANH':(zone==='cave'||zone==='caveInterior')?'HANG ĐÁ THẠCH ANH':zone==='viridian'?'THÀNH PHỐ VIRIDIAN':'ĐƯỜNG 1';show('battle');
 const movesEl=$('battle').querySelector('.moves');
 movesEl.insertAdjacentHTML('beforeend','<button id="switchMon" class="battle-extra">🔄 ĐỔI POKÉMON</button><button id="battlePotion" class="battle-extra">🧪 DÙNG THUỐC ('+state.potions+')</button>');
 const refreshLead=()=>{const lead=state.party[0];$('allyName').textContent=lead.name;$('allyLv').textContent='Lv. '+lead.level;setMonArt('allyEmoji',lead.name,lead.emoji);$('allyHp').style.width=(lead.current/lead.maxHp*100)+'%'};
 $('switchMon').onclick=()=>{if(ended||turn)return;const idx=state.party.findIndex((m,i)=>i>0&&m.current>0);if(idx<1){$('battleText').textContent='Không còn Pokémon khỏe mạnh để đổi!';return}const next=state.party.splice(idx,1)[0];state.party.push(state.party.shift());state.party.unshift(next);setCompanionMon();refreshLead();$('battleText').textContent='Bạn gọi '+next.name+' ra sân!';turn=true;save();setTimeout(enemyTurn,550)};
 $('battlePotion').onclick=()=>{if(ended||turn)return;const m=state.party[0];if(state.potions<1){$('battleText').textContent='Bạn đã hết thuốc hồi phục!';return}if(m.current>=m.maxHp){$('battleText').textContent=m.name+' đang đầy HP.';return}state.potions--;m.current=Math.min(m.maxHp,m.current+30);$('battlePotion').textContent='🧪 DÙNG THUỐC ('+state.potions+')';$('allyHp').style.width=(m.current/m.maxHp*100)+'%';$('battleText').textContent=m.name+' hồi phục 30 HP! Đối thủ có cơ hội phản công.';turn=true;save();hud();setTimeout(enemyTurn,550)};
 const end=()=>{if(ended)return;ended=true;hide('battle');busy=false;stopMove();save();hud()};
 const enemyTurn=()=>{if(ended)return;const m=state.party[0];sound('hit');$('enemyEmoji').classList.remove('enemy-lunge');void $('enemyEmoji').offsetWidth;$('enemyEmoji').classList.add('enemy-lunge');$('allyEmoji').classList.remove('hit-flash');void $('allyEmoji').offsetWidth;$('allyEmoji').classList.add('hit-flash');const eff=typeEffect(wild.type,m.type);const dmg=Math.max(1,Math.floor((wild.atk-m.def)*eff.multiplier));m.current=Math.max(0,m.current-dmg);$('allyHp').style.width=(m.current/m.maxHp*100)+'%';if(m.current<=0){$('battleText').textContent=m.name+' tạm thời kiệt sức! Được đưa về Trung tâm Pokémon.';m.current=m.maxHp;setTimeout(end,1500)}else{$('battleText').textContent=wild.name+' phản công, gây '+dmg+' sát thương!';turn=false}};
 const playerHit=(power,label)=>{if(ended||turn)return;turn=true;sound(label.includes('✨')?'special':'hit');const m=state.party[0];$('allyEmoji').classList.remove('attack-lunge');$('enemyEmoji').classList.remove('hit-flash');void $('allyEmoji').offsetWidth;void $('enemyEmoji').offsetWidth;$('allyEmoji').classList.add('attack-lunge');$('enemyEmoji').classList.add('hit-flash');$('battle').dataset.move=label.includes('✨')?'special':(m.type.includes('Lửa')?'fire':m.type.includes('Nước')?'water':m.type.includes('Cỏ')?'grass':'normal');const arena=$('battle').querySelector('.battlefield');arena.classList.remove('impact');void arena.offsetWidth;arena.classList.add('impact');setTimeout(()=>arena.classList.remove('impact'),420);const burst=document.createElement('div');burst.className='move-burst '+$('battle').dataset.move;for(let i=0;i<10;i++){const shard=document.createElement('i');shard.style.setProperty('--angle',(i*36)+'deg');shard.style.setProperty('--delay',(i*18)+'ms');burst.appendChild(shard)}arena.appendChild(burst);setTimeout(()=>burst.remove(),850);const eff=typeEffect(m.type,wild.type);const critical=Math.random()<.08;const baseDamage=Math.max(2,power+Math.floor(Math.random()*4)-Math.floor(wild.def/2));const damage=Math.max(1,Math.floor(baseDamage*eff.multiplier*(critical?1.6:1)));wild.current=Math.max(0,wild.current-damage);$('enemyHp').style.width=(wild.current/wild.maxHp*100)+'%';$('battleText').textContent=label+' gây '+damage+' sát thương!'+(critical?' ĐÒN CHÍ MẠNG!':'')+(eff.multiplier>1?' Hiệu quả rất tốt!':eff.multiplier<1?' Không hiệu quả lắm...':'');if(wild.current<=0){sound('win');const reward=isGym?(gym?gym.reward:300):trainer?trainer.reward:25+wild.level*8;state.gold+=reward;m.xp+=trainer?30:isGym?40:18;if(m.xp>=40){m.xp-=40;m.level++;m.maxHp+=4;m.hp=m.maxHp;m.atk+=2;m.def+=1;m.current=m.maxHp;$('battleText').textContent=m.name+' lên cấp '+m.level+'! Nhận '+reward+' vàng.';if(evolution[m.name]&&m.level>=evolution[m.name].level)$('battleText').textContent+=' Có thể tiến hóa trong Đội hình!'}else $('battleText').textContent=wild.name+' đã bị đánh bại! Nhận '+reward+' vàng.';if(state.quest===1)setQuest(2);if(isGym){const badge=gym?gym.badge:'Đá';state.gymClear=true;if(!state.badges.includes(badge))state.badges.push(badge);$('battleText').textContent='🏆 CHIẾN THẮNG NHÀ THI ĐẤU! Nhận '+reward+' vàng và Huy hiệu '+badge+'!'}else if(trainer){if(!state.trainersDefeated.includes(trainer.id))state.trainersDefeated.push(trainer.id);$('battleText').textContent='🏅 Đã thắng '+trainer.label+'! Nhận '+trainer.reward+' vàng.'}hud();setTimeout(end,1400);return}setTimeout(enemyTurn,650);hud()};
 $('attack').onclick=()=>playerHit(state.party[0].atk,'Đòn đánh thường');$('special').onclick=()=>playerHit(state.party[0].atk+7,'✨ '+state.party[0].skill);
 $('catch').onclick=()=>{if(isGym||trainer){$('battleText').textContent=isGym?'Không thể bắt Pokémon của Nhà Thi Đấu!':'Không thể bắt Pokémon của huấn luyện viên!';return}if(ended||turn)return;if(state.balls<1){$('battleText').textContent='Bạn đã hết bóng Poké!';return}state.balls--;hud();const chance=Math.min(.92,.24+(1-wild.current/wild.maxHp)*.62+(wild.current/wild.maxHp<.25?.12:0));if(Math.random()<chance){sound('catch');if(state.party.length<6){state.party.push({...wild,current:wild.maxHp});$('battleText').textContent='Bắt thành công '+wild.name+'! Pokémon đã gia nhập đội.'}else{$('battleText').textContent='Đội hình đã đủ 6. '+wild.name+' được ghi vào Pokédex.'}if(!state.dex.includes(wild.name))state.dex.push(wild.name);state.gold+=10;if(state.quest===2)setQuest(3);hud();setTimeout(end,1350)}else{$('battleText').textContent=wild.name+' thoát khỏi bóng!';turn=true;setTimeout(enemyTurn,650)}save()};
 $('run').onclick=()=>{if(ended||turn)return;if(Math.random()<.82){end();toast('Bạn đã rút lui an toàn.')}else{$('battleText').textContent='Không thể chạy thoát! Đối thủ chặn đường.';turn=true;setTimeout(enemyTurn,550)}};
}
function interact(){if(!player||busy)return;const n=scene.npcs.find(n=>Phaser.Math.Distance.Between(player.x,player.y,n.x,n.y)<95);if(!n){if(companion&&Phaser.Math.Distance.Between(player.x,player.y,companion.x,companion.y)<125){petCompanion();return}toast('Không có ai ở gần. Hãy đến gần NPC hoặc Pokémon đồng hành.');return}if(n.label.startsWith('NGỌC TRAI')){if(!state.islandQuest){toast('Hãy nói chuyện với Người Giữ Đảo trước.');return}const id=n.label.slice(-1);if(state.islandShells.includes(id)){toast('Bạn đã nhặt ngọc trai này rồi.');return}state.islandShells.push(id);save();toast('Đã tìm được ngọc trai '+state.islandShells.length+'/3!');if(state.islandShells.length===3)toast('Đủ 3 viên! Hãy quay lại Người Giữ Đảo.');return}
if(n.label==='NGƯỜI GIỮ ĐẢO'){if(!state.islandQuest){state.islandQuest=true;save();panel('TRUYỀN THUYẾT ĐẢO SAN HÔ','CHƯƠNG MỚI · NHIỆM VỤ','<p>Đảo San Hô từng được bảo vệ bởi một Pokémon biển hiền lành. Hãy tìm ba viên ngọc trai thất lạc quanh đảo.</p><p>Quay lại gặp ta sau khi thu thập đủ.</p><button class="primary" id="islandStart">NHẬN NHIỆM VỤ</button>');$('islandStart').onclick=()=>hide('panel');return}if(state.islandShells.length<3){panel('TRUYỀN THUYẾT ĐẢO SAN HÔ','TIẾN ĐỘ','<p>Ngọc trai đã tìm: '+state.islandShells.length+'/3.</p><button class="primary" id="islandClose">TIẾP TỤC</button>');$('islandClose').onclick=()=>hide('panel');return}if(!state.islandReward){state.islandReward=true;state.gold+=700;state.balls+=4;state.rideUnlocked=true;save();hud();panel('LỜI HỨA CỦA BIỂN','NHIỆM VỤ HOÀN THÀNH','<p>Ngươi đã khôi phục báu vật của đảo. Nhận 700 vàng, 4 bóng Poké và khả năng cưỡi Lapras vượt biển!</p><p>Thuyền trưởng ở bến cảng có thể đưa ngươi về Viridian.</p><button class="primary" id="islandDone">TUYỆT VỜI</button>');$('islandDone').onclick=()=>hide('panel');return}toast('Biển cả đã mở lối cho bạn. Hãy khám phá đảo!');return}
if(n.label==='THUYỀN TRƯỞNG'){if(!state.rideUnlocked){panel('BẾN CẢNG VIRIDIAN','CHUYẾN ĐI BIỂN','<p>Ta có thể đưa bạn đến Đảo San Hô. Người giữ đảo đang cần giúp đỡ.</p><button class="primary" id="sailOut">ĐẾN ĐẢO SAN HÔ</button>');$('sailOut').onclick=()=>{hide('panel');player.setPosition(5700,680);scene.cameras.main.setBounds(5480,0,1620,1400);setZone('island');toast('Con thuyền cập bến Đảo San Hô!')};return}player.setPosition(4950,900);scene.cameras.main.setBounds(3780,60,3320,1340);setZone('viridian');toast('Thuyền đã đưa bạn về Viridian.');return}
if(n.label.startsWith('TINH THỂ CỔ')){const shard=n.label.slice(-1);if(!state.crystalQuest){toast('Hãy nói chuyện với Nhà Nghiên Cứu trước.');return}if(state.crystalShards.includes(shard)){toast('Mảnh tinh thể này đã được thu thập.');return}state.crystalShards.push(shard);save();toast('Đã thu thập tinh thể '+state.crystalShards.length+'/3!');if(state.crystalShards.length===3)toast('Đủ 3 tinh thể! Hãy quay lại Nhà Nghiên Cứu.');return}
if(n.label==='NHÀ NGHIÊN CỨU'){if(!state.crystalQuest){state.crystalQuest=true;save();panel('BÍ MẬT HANG THẠCH ANH','NHIỆM VỤ HUYỀN THOẠI','<p>Ba mảnh tinh thể cổ đang phát sáng trong hang. Hãy tìm và thu thập cả ba, rồi quay lại đây.</p><p>Phần thưởng: mở khóa cuộc chạm trán Pokémon huyền thoại.</p><button class="primary" id="crystalOk">NHẬN NHIỆM VỤ</button>');$('crystalOk').onclick=()=>hide('panel');return}if(state.crystalShards.length<3){panel('BÍ MẬT HANG THẠCH ANH','TIẾN ĐỘ NHIỆM VỤ','<p>Đã tìm thấy '+state.crystalShards.length+'/3 mảnh tinh thể. Hãy khám phá các góc hang còn lại.</p><button class="primary" id="crystalClose">TIẾP TỤC</button>');$('crystalClose').onclick=()=>hide('panel');return}const guardian={id:'crystal-guardian',mon:'Mewtwo',level:18,reward:900,legendary:true,hp:150,atk:25,def:18,label:'HỘ VỆ TINH THỂ'};if(state.trainersDefeated.includes(guardian.id)){toast('Bí mật tinh thể đã được bảo vệ. Cảm ơn Nhà Huấn Luyện!');return}panel('CỔNG NĂNG LƯỢNG','POKÉMON HUYỀN THOẠI','<p>Ba tinh thể hợp nhất, mở ra một thực thể tâm linh cực mạnh: Mewtwo cấp 18.</p><p>Chuẩn bị đội hình trước khi bước vào trận đấu!</p><button class="primary" id="guardianFight">ĐỐI ĐẦU MEWTWO</button>');$('guardianFight').onclick=()=>{hide('panel');startBattle(guardian)};return}
if(n.label==='LỐI VÀO HANG SÂU'){player.setPosition(3325,760);scene.cameras.main.setBounds(2980,80,690,860);setZone('caveInterior');toast('Bạn đã tiến vào tầng sâu Hang Thạch Anh.');return}
if(n.label==='RA KHỎI HANG'){player.setPosition(565,835);scene.cameras.main.setBounds(0,0,5400,1100);setZone('cave');toast('Bạn đã trở lại cửa hang.');return}
if(n.label==='CỔNG THÀNH PHỐ VIRIDIAN'){player.setPosition(4550,900);scene.cameras.main.setBounds(3780,60,3320,1340);setZone('viridian');toast('Chào mừng đến Thành phố Viridian!');return}
if(n.label==='CỔNG VỀ ĐƯỜNG 1'){player.setPosition(1380,500);scene.cameras.main.setBounds(0,0,7100,1400);setZone('route');toast('Bạn đã trở lại Đường 1.');return}
if(n.label==='NHÀ THI ĐẤU VIRIDIAN'){const gym2={kind:'gym',badge:'Rừng',boss:'Thủ Lĩnh Lá',emoji:'🌿',level:14,hp:125,atk:17,def:9,reward:500,type:'Cỏ/Độc',title:'NHÀ THI ĐẤU VIRIDIAN · HỆ CỎ'};if(!state.badges.includes('Đá')){panel('NHÀ THI ĐẤU VIRIDIAN','CHƯA ĐỦ ĐIỀU KIỆN','<p>Hãy chinh phục Nhà Thi Đấu Đá tại Kanto trước khi thách đấu Viridian.</p><button class="primary" id="gym2Locked">ĐÃ HIỂU</button>');$('gym2Locked').onclick=()=>hide('panel');return}if(state.badges.includes('Rừng')){toast('Bạn đã có Huy hiệu Rừng!');return}panel('NHÀ THI ĐẤU VIRIDIAN','THỬ THÁCH HỆ CỎ','<p>Thủ lĩnh Lá sử dụng Pokémon hệ Cỏ. Đối thủ cấp 14, HP 125.</p><p>Phần thưởng: 500 vàng và Huy hiệu Rừng.</p><button class="primary" id="gym2Fight">THÁCH ĐẤU THỦ LĨNH LÁ</button>');$('gym2Fight').onclick=()=>{hide('panel');startBattle(gym2)};return}
if(n.label==='NGƯỜI DẪN ĐƯỜNG'){panel('NGƯỜI DẪN ĐƯỜNG','THÀNH PHỐ VIRIDIAN','<p>Phía bắc là Nhà Thi Đấu Viridian. Bãi cỏ phía nam có Bellsprout và Spearow. Hãy chuẩn bị đội hình trước khi thách đấu!</p><button class="primary" id="guideClose">ĐÃ HIỂU</button>');$('guideClose').onclick=()=>hide('panel');return}
if(n.label==='CỬA HÀNG PALLET'){player.setPosition(1950,700);scene.cameras.main.setBounds(1600,100,700,740);setZone('shop');toast('Đã vào Cửa hàng Pallet.');return}
if(n.label==='TRUNG TÂM POKÉMON'){player.setPosition(2550,700);scene.cameras.main.setBounds(2250,100,600,740);setZone('center');toast('Đã vào Trung tâm Pokémon.');return}
if(n.label==='CỬA RA THỊ TRẤN'){player.setPosition(370,390);scene.cameras.main.setBounds(0,0,5400,1100);setZone('pallet');toast('Trở lại Thị trấn Pallet.');return}
if(n.label==='CHỦ CỬA HÀNG'){panel('CỬA HÀNG PALLET','VẬT PHẨM HÀNH TRÌNH','<p>Mua vật phẩm để chuẩn bị cho chuyến phiêu lưu.</p><div class="itemrow"><span>🔴 3 bóng Poké</span><button id="shopBalls">60 vàng</button></div><div class="itemrow"><span>🧪 1 thuốc hồi phục</span><button id="shopPotion">45 vàng</button></div><p class="muted">Số vàng hiện có: '+state.gold+'</p>');$('shopBalls').onclick=()=>{if(state.gold<60)return toast('Không đủ vàng!');state.gold-=60;state.balls+=3;save();hud();interactShopRefresh()};$('shopPotion').onclick=()=>{if(state.gold<45)return toast('Không đủ vàng!');state.gold-=45;state.potions++;save();hud();interactShopRefresh()};return}
if(n.label==='Y TÁ JOY'){state.party.forEach(m=>m.current=m.maxHp);save();openTeam();toast('Y tá Joy đã hồi phục toàn bộ đội hình!');return}
if(n.label==='GIÁO SƯ OAK'){if(!state.oakTalk){state.oakTalk=true;if(state.quest===0)setQuest(1);panel('GIÁO SƯ OAK','PHÒNG NGHIÊN CỨU','<p>Chào mừng đến với Kanto! Thế giới này rộng lớn và đầy những Pokémon kỳ thú.</p><p>Hãy đi vào bãi cỏ Đường 1, chiến đấu và kết bạn với Pokémon. Ta sẽ chờ tin tốt từ con!</p><button class="primary" id="oakOk">ĐÃ HIỂU</button>');$('oakOk').onclick=()=>hide('panel')}else{panel('GIÁO SƯ OAK','LỜI KHUYÊN','<p>Hãy quan sát bãi cỏ, chuẩn bị bóng Poké và chăm sóc đội hình của con.</p><button class="primary" id="oakOk">ĐÓNG</button>');$('oakOk').onclick=()=>hide('panel')}}else if(n.label==='NGƯỜI CÂU CÁ'){if(state.quest>=5)toast('Người câu cá: Chúc mừng Nhà Huấn Luyện! Hồ này còn nhiều bí mật.');else{setQuest(4);panel('NGƯỜI CÂU CÁ','BỜ HỒ XANH','<p>Nước hồ trong veo lắm! Hãy chuẩn bị đội hình trước khi khám phá sâu hơn.</p><button class="primary" id="fishOk">CẢM ƠN</button>');$('fishOk').onclick=()=>hide('panel')}}else{const t=scene.trainers&&scene.trainers.find(t=>t.id===n.id);if(t){if(state.trainersDefeated.includes(t.id)){toast('Bạn đã đánh bại '+t.label+' rồi.');return}panel(t.label,'THÁCH ĐẤU HUẤN LUYỆN VIÊN','<p>'+t.label+' muốn so tài với bạn. Đối thủ: '+t.mon+' · Lv.'+t.level+'</p><p>Phần thưởng khi thắng: '+t.reward+' vàng.</p><button class="primary" id="trainerFight">BẮT ĐẦU ĐẤU</button>');$('trainerFight').onclick=()=>{hide('panel');startBattle(t)}}}}
function interactShopRefresh(){panel('CỬA HÀNG PALLET','VẬT PHẨM HÀNH TRÌNH','<p>Vật phẩm đã được cập nhật.</p><div class="itemrow"><span>🔴 3 bóng Poké</span><button id="shopBalls">60 vàng</button></div><div class="itemrow"><span>🧪 1 thuốc hồi phục</span><button id="shopPotion">45 vàng</button></div><p class="muted">Số vàng hiện có: '+state.gold+'</p>');$('shopBalls').onclick=()=>{if(state.gold<60)return toast('Không đủ vàng!');state.gold-=60;state.balls+=3;save();hud();interactShopRefresh()};$('shopPotion').onclick=()=>{if(state.gold<45)return toast('Không đủ vàng!');state.gold-=45;state.potions++;save();hud();interactShopRefresh()}}
function bindControls(){const sprint=$('sprint');if(sprint){const begin=e=>{e.preventDefault();sprintHeld=true;sprint.classList.add('active');try{sprint.setPointerCapture(e.pointerId)}catch{}};const finish=()=>{sprintHeld=false;sprint.classList.remove('active')};sprint.addEventListener('pointerdown',begin);['pointerup','pointercancel','lostpointercapture','pointerleave'].forEach(ev=>sprint.addEventListener(ev,finish));sprint.addEventListener('contextmenu',e=>e.preventDefault())}const audioBtn=$('audioToggle');if(audioBtn)audioBtn.onclick=()=>{audioEnabled=!audioEnabled;audioBtn.textContent=audioEnabled?'ÂM THANH: BẬT':'ÂM THANH: TẮT';if(audioEnabled)sound('win')};document.querySelectorAll('[data-dir]').forEach(b=>{const d=b.dataset.dir;b.addEventListener('pointerdown',e=>{e.preventDefault();heldDir=d;try{b.setPointerCapture(e.pointerId)}catch{}});['pointerup','pointercancel','lostpointercapture','pointerleave'].forEach(ev=>b.addEventListener(ev,stopMove))});window.addEventListener('keydown',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;keys[k]=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()});window.addEventListener('keyup',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;keys[k]=false});window.addEventListener('blur',()=>{keys={};stopMove()});$('team').onclick=openTeam;const pet=$('pet');if(pet)pet.onclick=petCompanion;const ride=$('ride');if(ride)ride.onclick=toggleRide;$('dex').onclick=openDex;$('bag').onclick=openBag;$('quests').onclick=openQuests;$('interact').onclick=interact;$('closePanel').onclick=()=>hide('panel');}
$('start').onclick=()=>{hide('welcome');if(!state.party.length)show('starter');else toast('Chào mừng trở lại Kanto!')};
document.querySelectorAll('[data-starter]').forEach(b=>{const n=b.dataset.starter;const art=b.querySelector('.creature');if(art)art.innerHTML=monArtMarkup(n,species[n].emoji)});
document.querySelectorAll('[data-starter]').forEach(b=>b.onclick=()=>{const m=makeMon(b.dataset.starter,5);state.party=[m];state.dex=[m.name];setCompanionMon();hide('starter');hud();save();toast(m.name+' đã trở thành bạn đồng hành!');if(state.quest===0)setQuest(0)});
bindControls();hud();createGame();if(state.party.length)$('start').textContent='TIẾP TỤC HÀNH TRÌNH';else show('welcome');
})();